import React, { useRef, useEffect, useCallback, useState } from "react";
import { useLoader, useFrame, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import { useTexture } from "@react-three/drei";
import { useControlsStore } from "../stores/controlsStore";
import { useLoadingStore } from "../stores/loadingStore";
// Default values as constants
const DEFAULT_POSITION = [0, 2, 0];
const DEFAULT_SCALE = [0.5, 0.5, 0.5];
const DEFAULT_ROTATION = [0, 0, 0];

export function Model({ path, texturePath, rope, positionOnRope }) {
  const groupRef = useRef();
  const materialRef = useRef(null);
  const clonedSceneRef = useRef(null);

  const gltf = useLoader(GLTFLoader, path);

  // Use useTexture hook for texture loading
  const texture = texturePath
    ? useTexture(texturePath, (texture) => {
        texture.encoding = THREE.sRGBEncoding;
        texture.anisotropy = 16;
        texture.minFilter = THREE.LinearMipmapLinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.generateMipmaps = true;
        texture.center.set(0.5, 0.5);
        texture.rotation = Math.PI;
        // Increase texture definition and sharpness
        texture.anisotropy = Math.min(16, gl.capabilities.getMaxAnisotropy());
        texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
      })
    : null;

  // Add state for dragging
  const [isDragging, setIsDragging] = useState(false);
  const { camera, pointer, raycaster, gl } = useThree();
  const dragPlaneZ = 0;

  const setEnableRotate = useControlsStore((state) => state.setEnableRotate);

  // Handle mouse interactions
  const onPointerDown = useCallback(
    (e) => {
      e.stopPropagation();
      setIsDragging(true);

      // Disable rotation while dragging the model
      setEnableRotate(false);

      // Capture pointer to track it even when it leaves the canvas
      gl.domElement.setPointerCapture(e.pointerId);

      // Add a global pointer up handler
      const handleGlobalPointerUp = () => {
        setIsDragging(false);

        // Re-enable rotation when done dragging
        setEnableRotate(true);

        document.removeEventListener("pointerup", handleGlobalPointerUp);
        if (e.pointerId) gl.domElement.releasePointerCapture(e.pointerId);
      };

      document.addEventListener("pointerup", handleGlobalPointerUp);
    },
    [gl, rope, positionOnRope, setEnableRotate]
  );

  // Apply texture and setup model
  useEffect(() => {
    if (!texturePath || !groupRef.current || !gltf || !texture) return;

    // Clone the scene
    clonedSceneRef.current = gltf.scene.clone(true);

    // Setup the new material with increased brightness and definition
    materialRef.current = new THREE.MeshStandardMaterial({
      map: texture,
      side: THREE.DoubleSide,
      roughness: 0.2,
      metalness: 0.2,
    });

    // Apply material and improvements
    clonedSceneRef.current.traverse((child) => {
      if (child.isMesh) {
        if (child.name === "Plane") {
          child.material = materialRef.current;
          child.castShadow = true;
          child.material.needsUpdate = true;
        }
        if (child.geometry) {
          child.geometry.computeVertexNormals();
        }
        if (child.material) {
          child.material.precision = "highp";
          child.material.flatShading = false;
          child.castShadow = true;
          child.receiveShadow = true;
        }
      }
    });

    // Update the scene
    if (groupRef.current) {
      // Remove old scene if it exists
      while (groupRef.current.children.length > 0) {
        groupRef.current.remove(groupRef.current.children[0]);
      }
      // Add new scene
      groupRef.current.add(clonedSceneRef.current);
    }
  }, [texturePath, gltf, texture]);

  // Update model based on rope physics
  useFrame(() => {
    if (!groupRef.current || !rope || !rope.softBody) return;

    const nodes = rope.softBody.get_m_nodes();
    if (!nodes || positionOnRope >= nodes.size()) {
      console.warn("Invalid node access attempt:", {
        positionOnRope,
        nodesSize: nodes?.size(),
      });
      return;
    }

    const prevNode = nodes.at(positionOnRope - 1);
    const node = nodes.at(positionOnRope);

    const nodePos = node.get_m_x();
    const prevNodePos = prevNode.get_m_x();

    // Calculate direction for rotation
    const direction = new THREE.Vector3(
      nodePos.x() - prevNodePos.x(),
      nodePos.y() - prevNodePos.y(),
      0
    ).normalize();

    // Calculate quaternion
    const quaternion = new THREE.Quaternion();
    const up = new THREE.Vector3(0, 1, 0);
    quaternion.setFromUnitVectors(up, direction);

    // Apply additional rotations
    const rotationX = new THREE.Quaternion().setFromAxisAngle(
      new THREE.Vector3(0, 0, 1),
      Math.PI / 2
    );
    const rotationY = new THREE.Quaternion().setFromAxisAngle(
      new THREE.Vector3(0, 1, 0),
      Math.PI
    );

    quaternion.multiply(rotationX);
    quaternion.multiply(rotationY);

    // Apply the rotation
    groupRef.current.quaternion.copy(quaternion);
  });

  // Update model position during drag
  useFrame(() => {
    if (isDragging && groupRef.current && rope) {
      const distanceFromCamera = camera.position.z - dragPlaneZ;
      const pointerWorld = new THREE.Vector3(pointer.x, pointer.y, 0)
        .unproject(camera)
        .sub(camera.position)
        .normalize()
        .multiplyScalar(distanceFromCamera)
        .add(camera.position);

      if (rope.softBody) {
        const nodes = rope.softBody.get_m_nodes();
        if (nodes && positionOnRope < nodes.size()) {
          const node = nodes.at(positionOnRope);

          // Add constraint checking
          const prevNode = nodes.at(Math.max(0, positionOnRope - 1));
          const nextNode = nodes.at(
            Math.min(nodes.size() - 1, positionOnRope + 1)
          );

          // Get current positions
          const prevPos = new THREE.Vector3(
            prevNode.get_m_x().x(),
            prevNode.get_m_x().y(),
            prevNode.get_m_x().z()
          );

          const nextPos = new THREE.Vector3(
            nextNode.get_m_x().x(),
            nextNode.get_m_x().y(),
            nextNode.get_m_x().z()
          );

          // Calculate maximum allowed movement
          const maxStretch = 2.0; // Maximum stretch factor
          const restLength = rope.ropeLength / (nodes.size() - 1);

          // Constrain the new position
          const toPrev = prevPos.clone().sub(pointerWorld);
          const toNext = nextPos.clone().sub(pointerWorld);

          if (toPrev.length() > restLength * maxStretch) {
            pointerWorld
              .copy(prevPos)
              .sub(toPrev.normalize().multiplyScalar(restLength * maxStretch));
          }
          if (toNext.length() > restLength * maxStretch) {
            pointerWorld
              .copy(nextPos)
              .sub(toNext.normalize().multiplyScalar(restLength * maxStretch));
          }

          // Apply damping
          const currentPos = new THREE.Vector3(
            node.get_m_x().x(),
            node.get_m_x().y(),
            node.get_m_x().z()
          );

          const dampingFactor = 0.5; // Reduced from 1 for smoother movement
          const newPos = new THREE.Vector3().lerpVectors(
            currentPos,
            pointerWorld,
            dampingFactor
          );

          // Update the node position
          const pos = new Ammo.btVector3(newPos.x, newPos.y, newPos.z);
          node.set_m_x(pos);
          Ammo.destroy(pos);
        }
      }
    }
  });

  // Method to update position
  const updatePosition = useCallback((newPosition) => {
    if (groupRef.current) {
      groupRef.current.position.copy(newPosition);
    }
  }, []);

  const { updateProgress } = useLoadingStore();

  // Ensure the model is properly attached to the rope
  useEffect(() => {
    if (rope && rope.attachModel && typeof rope.attachModel === "function") {
      console.log("Attaching model to rope at position:", positionOnRope);
      rope.attachModel({ updatePosition }, positionOnRope);
      updateProgress();
    } else if (rope) {
      console.warn("attachModel is not a function in the rope object", rope);
    }
  }, [rope, positionOnRope, updatePosition]);

  return (
    <group
      ref={groupRef}
      position={DEFAULT_POSITION}
      scale={DEFAULT_SCALE}
      rotation={DEFAULT_ROTATION}
      onPointerDown={onPointerDown}
    />
  );
}
