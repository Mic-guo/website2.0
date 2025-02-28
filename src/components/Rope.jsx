import React, { useRef, useEffect, useState, useCallback } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useTexture } from "@react-three/drei";

export function Rope({
  physicsWorld,
  yOffset,
  onRopeReady,
  ropeSegments,
  ropeLength,
}) {
  const ropeMeshRef = useRef();
  const [softBody, setSoftBody] = useState(null);
  const initialSegmentLength = ropeLength / (ropeSegments - 1);
  const allModels = useRef(new Map());

  // Track which nodes are being dragged by user interaction
  const draggedNodes = useRef(new Set());

  // Load rope texture using drei's useTexture
  const ropeTexture = useTexture("src/textures/white_string.jpg");
  useEffect(() => {
    ropeTexture.wrapS = THREE.RepeatWrapping;
    ropeTexture.wrapT = THREE.RepeatWrapping;
    ropeTexture.repeat.set(1, 1);
  }, [ropeTexture]);

  // Initialize physics
  useEffect(() => {
    if (!physicsWorld) return;

    // Create soft body
    const softBodyHelpers = new Ammo.btSoftBodyHelpers();
    const ropeStart = new Ammo.btVector3(-8, yOffset, 0);
    const ropeEnd = new Ammo.btVector3(8, yOffset, 0);

    const newSoftBody = softBodyHelpers.CreateRope(
      physicsWorld.getWorldInfo(),
      ropeStart,
      ropeEnd,
      ropeSegments - 1,
      0
    );

    const sbConfig = newSoftBody.get_m_cfg();
    sbConfig.set_viterations(20); // Velocity iterations
    sbConfig.set_piterations(20); // Position iterations
    sbConfig.set_kDP(0.01); // Damping coefficient
    sbConfig.set_kLF(0.01); // Resistance to movement

    // Set additional parameters to control rope stiffness
    sbConfig.set_kVC(0.1); // Volume conservation coefficient (controls stretchiness)
    sbConfig.set_kSRHR_CL(0.1); // Additional strength for structural constraints
    sbConfig.set_kSKHR_CL(0.1); // Additional strength for flex constraints

    // Set collision flags for better interaction
    newSoftBody.setCollisionFlags(0);

    // Fix end points
    const nodes = newSoftBody.get_m_nodes();
    const firstNode = nodes.at(0);
    const lastNode = nodes.at(nodes.size() - 1);

    // Fix end points by setting inverse mass to 0
    firstNode.set_m_im(0);
    lastNode.set_m_im(0);

    // Make sure the softBody is initially active
    newSoftBody.activate(true);

    physicsWorld.addSoftBody(newSoftBody, 1, -1);
    newSoftBody.setTotalMass(0.01, false);

    setSoftBody(newSoftBody);
    if (onRopeReady) {
      onRopeReady({
        softBody: newSoftBody,
        setModelDragging, // Provide the new function to models
        attachModel,
      });
    }

    // Cleanup
    return () => {
      if (physicsWorld && newSoftBody) {
        physicsWorld.removeSoftBody(newSoftBody);
      }
    };
  }, [physicsWorld, yOffset, ropeSegments]);

  // Update rope visuals
  useFrame(() => {
    if (!softBody || !ropeMeshRef.current) return;

    const nodes = softBody.get_m_nodes();

    // Update models, but only those that are NOT being dragged
    allModels.current.forEach((model, nodeIndex) => {
      // Skip updating models that are being actively dragged
      if (draggedNodes.current.has(nodeIndex)) return;

      const node = nodes.at(nodeIndex);
      const pos = node.get_m_x();
      model.updatePosition(new THREE.Vector3(pos.x(), pos.y(), pos.z()));
    });

    // Update rope segments
    for (let i = 0; i < nodes.size() - 1; i++) {
      const node = nodes.at(i);
      const nextNode = nodes.at(i + 1);
      const pos = node.get_m_x();
      const nextPos = nextNode.get_m_x();

      const position = new THREE.Vector3(pos.x(), pos.y(), pos.z());
      const direction = new THREE.Vector3(
        nextPos.x() - pos.x(),
        nextPos.y() - pos.y(),
        nextPos.z() - pos.z()
      );

      const currentLength = direction.length();
      const quaternion = new THREE.Quaternion();
      const up = new THREE.Vector3(0, 1, 0);
      quaternion.setFromUnitVectors(up, direction.normalize());

      const scale = new THREE.Vector3(
        1,
        currentLength / initialSegmentLength,
        1
      );

      const matrix = new THREE.Matrix4();
      matrix.compose(position, quaternion, scale);
      ropeMeshRef.current.setMatrixAt(i, matrix);
    }

    ropeMeshRef.current.instanceMatrix.needsUpdate = true;
  });

  // Function to set a node as being dragged or not
  const setModelDragging = useCallback((nodeIndex, isDragging) => {
    if (isDragging) {
      draggedNodes.current.add(nodeIndex);
    } else {
      draggedNodes.current.delete(nodeIndex);
    }
  }, []);

  const attachModel = useCallback((model, nodeIndex) => {
    allModels.current.set(nodeIndex, model);
  }, []);

  // Create instanced mesh for rope segments
  return (
    <instancedMesh ref={ropeMeshRef} args={[null, null, ropeSegments - 1]}>
      <cylinderGeometry args={[0.02, 0.02, initialSegmentLength, 8]}>
        <cylinderGeometry
          attach="translate"
          args={[0, initialSegmentLength / 2, 0]}
        />
      </cylinderGeometry>
      <meshPhongMaterial
        map={ropeTexture}
        bumpMap={ropeTexture}
        bumpScale={0.1}
        color="#ffffff"
      />
    </instancedMesh>
  );
}
