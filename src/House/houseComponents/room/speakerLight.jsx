export default function SpeakerLight({ nodes, materials }) {
  return (
    <group
      name="Lamp + light"
      position={[323.78, -88.49, -256.83]}
      scale={[0.38, 0.37, 0.38]}
    >
      <group
        name="Big Loudspeaker"
        position={[29.74, -424.97, -50.26]}
        rotation={[0, -Math.PI / 4, 0]}
        scale={2.07}
      >
        <mesh
          name="base"
          geometry={nodes.base.geometry}
          material={materials.white}
          castShadow
          receiveShadow
          position={[3.4, 6.84, 23.73]}
          scale={1.08}
        />
        <mesh
          name="body1"
          geometry={nodes.body1.geometry}
          material={materials.white}
          castShadow
          receiveShadow
          position={[2.9, 86.43, 23]}
          scale={1.66}
        />
        <group name="speacker" position={[2.93, 226.26, 27.16]} scale={2.18}>
          <mesh
            name="Cube 25"
            geometry={nodes["Cube 25"].geometry}
            material={materials.black}
            castShadow
            receiveShadow
            position={[0, 0, 14.62]}
            rotation={[Math.PI, 0, -Math.PI]}
            scale={[0.69, 0.74, 0.02]}
          />
          <mesh
            name="Cube4"
            geometry={nodes.Cube4.geometry}
            material={materials.greydarker}
            castShadow
            receiveShadow
            position={[0, 0, -0.44]}
            scale={0.76}
          />
        </group>
      </group>
      <group
        name="Miffy_Lamp_fbxFBX"
        position={[70.76, 211.42, 74.65]}
        rotation={[0, -0.7, 0]}
        scale={2.69}
      >
        <pointLight
          name="Point Light"
          castShadow
          intensity={0.25}
          decay={6}
          distance={4574}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-near={100}
          shadow-camera-far={100000}
          color="#fee5bc"
          position={[-38.89, 37.83, 2.17]}
          rotation={[0, 0.93, 0.01]}
          scale={0.37}
        />
        <group
          name="Large"
          position={[-40, 0, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[-4.66, 4.66, 4.66]}
        >
          <mesh
            name="Miffy_XL_Lamp_H80cm_legs_stoppers_0"
            geometry={nodes.Miffy_XL_Lamp_H80cm_legs_stoppers_0.geometry}
            material={nodes.Miffy_XL_Lamp_H80cm_legs_stoppers_0.material}
            castShadow
            receiveShadow
          />
          <mesh
            name="Miffy_XL_Lamp_H80cm_Julian_chair_0"
            geometry={nodes.Miffy_XL_Lamp_H80cm_Julian_chair_0.geometry}
            material={nodes.Miffy_XL_Lamp_H80cm_Julian_chair_0.material}
            castShadow
            receiveShadow
          />
        </group>
      </group>
    </group>
  );
}