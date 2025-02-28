import React, { useRef, useEffect, useCallback, useState } from "react";
import { useLoader, useFrame, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import { useTexture } from "@react-three/drei";

export function Model({ path, texturePath, rope, positionOnRope }) {
  // Default values as constants
  const DEFAULT_POSITION = [0, 2, 0];
  const DEFAULT_SCALE = [0.5, 0.5, 0.5];
  const DEFAULT_ROTATION = [0, 0, 0];

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
      })
    : null;

  // Add state for dragging
  const [isDragging, setIsDragging] = useState(false);
  const { camera, pointer, raycaster, gl } = useThree();
  const dragPlaneZ = 0;

  // Handle mouse interactions
  const onPointerDown = useCallback(
    (e) => {
      e.stopPropagation();
      setIsDragging(true);

      // Notify rope that this model is being dragged (allows rope to stop updating it)
      if (rope && rope.setModelDragging) {
        rope.setModelDragging(positionOnRope, true);
      } else if (rope) {
        console.warn(
          "setModelDragging is not available in the rope object",
          rope
        );
      }

      // Capture pointer to track it even when it leaves the canvas
      gl.domElement.setPointerCapture(e.pointerId);

      // Add a global pointer up handler
      const handleGlobalPointerUp = () => {
        setIsDragging(false);

        // Notify rope that this model is no longer being dragged
        if (rope && rope.setModelDragging) {
          rope.setModelDragging(positionOnRope, false);
        }

        document.removeEventListener("pointerup", handleGlobalPointerUp);
        if (e.pointerId) gl.domElement.releasePointerCapture(e.pointerId);
      };

      document.addEventListener("pointerup", handleGlobalPointerUp);
    },
    [gl, rope, positionOnRope]
  );

  // Apply texture and setup model
  useEffect(() => {
    if (!texturePath || !groupRef.current || !gltf || !texture) return;

    // Clone the scene
    clonedSceneRef.current = gltf.scene.clone(true);

    // Setup the new material
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
      // Calculate the point where the ray intersects with the Z plane
      const distanceFromCamera = camera.position.z - dragPlaneZ;
      const pointerWorld = new THREE.Vector3(pointer.x, pointer.y, 0)
        .unproject(camera)
        .sub(camera.position)
        .normalize()
        .multiplyScalar(distanceFromCamera)
        .add(camera.position);

      // Create a delayed position with lerping
      const lerpFactor = 0.5;
      const currentPos = groupRef.current.position;
      const newPosition = new THREE.Vector3().lerpVectors(
        currentPos,
        pointerWorld,
        lerpFactor
      );

      // Update position of the model directly
      groupRef.current.position.copy(newPosition);

      // Control the rope with a higher force when dragging
      if (rope.softBody) {
        const nodes = rope.softBody.get_m_nodes();
        if (nodes && positionOnRope < nodes.size()) {
          const node = nodes.at(positionOnRope);

          // Force-based approach with a very high factor
          const forceFactorDragging = 1; // Very strong force when dragging

          // Set position directly
          const pos = new Ammo.btVector3(
            newPosition.x,
            newPosition.y,
            newPosition.z
          );
          node.set_m_x(pos);

          // Apply a strong impulse/velocity
          const velocity = new Ammo.btVector3(
            (newPosition.x - currentPos.x) * forceFactorDragging,
            (newPosition.y - currentPos.y) * forceFactorDragging,
            (newPosition.z - currentPos.z) * forceFactorDragging
          );
          node.set_m_v(velocity);

          // Activate the softBody
          rope.softBody.activate(true);
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

  // Ensure the model is properly attached to the rope
  useEffect(() => {
    if (rope && rope.attachModel && typeof rope.attachModel === "function") {
      console.log("Attaching model to rope at position:", positionOnRope);
      rope.attachModel({ updatePosition }, positionOnRope);
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
