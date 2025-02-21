import React, { useRef, useEffect, useCallback } from "react";
import { useLoader, useFrame } from "@react-three/fiber";
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

  // Cleanup function for materials and scene
  const cleanup = useCallback(() => {
    if (materialRef.current) {
      materialRef.current.dispose();
      materialRef.current = null;
    }

    if (clonedSceneRef.current) {
      clonedSceneRef.current.traverse((child) => {
        if (child.isMesh) {
          if (child.material) {
            child.material.dispose();
          }
          if (child.geometry) {
            child.geometry.dispose();
          }
        }
      });
      clonedSceneRef.current = null;
    }
  }, []);

  // Apply texture and setup model
  useEffect(() => {
    if (!texturePath || !groupRef.current || !gltf || !texture) return;

    // Clean up previous instance
    cleanup();

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

    return cleanup;
  }, [texturePath, gltf, texture, cleanup]);

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

  // Method to update position
  const updatePosition = useCallback((newPosition) => {
    if (groupRef.current) {
      groupRef.current.position.copy(newPosition);
    }
  }, []);

  useEffect(() => {
    if (rope) {
      rope.attachModel({ updatePosition }, positionOnRope);
    }
  }, [rope, positionOnRope, updatePosition]);

  return (
    <group
      ref={groupRef}
      position={DEFAULT_POSITION}
      scale={DEFAULT_SCALE}
      rotation={DEFAULT_ROTATION}
    />
  );
}
