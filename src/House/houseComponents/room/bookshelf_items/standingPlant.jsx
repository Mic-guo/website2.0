export default function StandingPlant({ nodes, materials }) {
  return (
    <group
      name="Plant"
      position={[-208.42, -234.29, -19.21]}
      scale={[0.54, 0.61, 0.54]}
    >
      <mesh
        name="plant"
        geometry={nodes.plant.geometry}
        material={materials.green_v1}
        castShadow
        receiveShadow
        position={[2.6, 135.83, 4.26]}
      />
      <mesh
        name="ground"
        geometry={nodes.ground.geometry}
        material={materials.brown_v2}
        castShadow
        receiveShadow
        position={[-0.09, 94.39, 3.13]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.95}
      />
      <group name="legs" position={[-0.98, 37.96, 3.26]} scale={1.74}>
        <mesh
          name="Cylinder 44"
          geometry={nodes["Cylinder 44"].geometry}
          material={materials.brown_v1}
          castShadow
          receiveShadow
          position={[-17.07, 0, -14.16]}
          scale={0.75}
        />
        <mesh
          name="Cylinder 35"
          geometry={nodes["Cylinder 35"].geometry}
          material={materials.brown_v1}
          castShadow
          receiveShadow
          position={[17.13, 0, -15.43]}
          scale={0.75}
        />
        <mesh
          name="Cylinder 45"
          geometry={nodes["Cylinder 45"].geometry}
          material={materials.brown_v1}
          castShadow
          receiveShadow
          position={[-17.13, 0, 14.84]}
          scale={0.75}
        />
        <mesh
          name="Cylinder 23"
          geometry={nodes["Cylinder 23"].geometry}
          material={materials.brown_v1}
          castShadow
          receiveShadow
          position={[17.13, 0, 15.43]}
          scale={0.75}
        />
      </group>
      <mesh
        name="flowerpot"
        geometry={nodes.flowerpot.geometry}
        castShadow
        receiveShadow
        position={[-0.23, 70.95, 3.45]}
        scale={1.08}
      >
        <meshStandardMaterial color="#5C3C24" roughness={0.9} metalness={0} />
      </mesh>
    </group>
  );
}
