export default function Pig({ nodes, materials }) {
  return (
    <group
      name="pig"
      position={[175, -45.67, -28.23]}
      rotation={[0, -0.24, 0]}
      scale={0.1}
    >
      <group name="Text2" position={[-169.64, 226.93, -141.79]} scale={1.5}>
        <mesh
          name="z 3"
          geometry={nodes["z 3"].geometry}
          material={materials["z 3 Material"]}
          castShadow
          receiveShadow
          position={[3.31, 3.86, 150.26]}
          rotation={[0.02, 0.34, 0.48]}
          scale={1.52}
        />
        <mesh
          name="z 2"
          geometry={nodes["z 2"].geometry}
          material={materials["z 2 Material"]}
          castShadow
          receiveShadow
          position={[11.01, -36.59, 147.35]}
          rotation={[0, 0.34, -0.38]}
          scale={2.6}
        />
        <mesh
          name="z"
          geometry={nodes.z.geometry}
          material={materials["z Material"]}
          castShadow
          receiveShadow
          position={[-1.86, -104.19, 151.91]}
          rotation={[0, 0.34, 0.19]}
          scale={3.54}
        />
      </group>
      <mesh
        name="Cube 65"
        geometry={nodes["Cube 65"].geometry}
        material={materials["Cube 65 Material"]}
        castShadow
        receiveShadow
        position={[167.65, -152.58, -178.74]}
        rotation={[-2.81, 0.95, 2.45]}
        scale={1.04}
      />
      <mesh
        name="Cube 54"
        geometry={nodes["Cube 54"].geometry}
        material={materials["Cube 54 Material"]}
        castShadow
        receiveShadow
        position={[-29.35, -167.45, -266.58]}
        rotation={[3, -0.19, 2.58]}
        scale={1.04}
      />
      <mesh
        name="Cube 71"
        geometry={nodes["Cube 71"].geometry}
        material={materials["Cube 71 Material"]}
        castShadow
        receiveShadow
        position={[217.47, -168.06, -10.36]}
        rotation={[2.54, 1.09, -2.53]}
        scale={1.04}
      />
      <mesh
        name="Cube 43"
        geometry={nodes["Cube 43"].geometry}
        material={materials["Cube 43 Material"]}
        castShadow
        receiveShadow
        position={[-188.55, -183.01, 29.42]}
        rotation={[0.53, -0.71, 0.76]}
        scale={1.04}
      />
      <mesh
        name="Helix"
        geometry={nodes.Helix.geometry}
        material={materials["Helix Material"]}
        castShadow
        receiveShadow
        position={[75.7, 67.2, -129.32]}
        scale={1.16}
      />
      <mesh
        name="Ellipse 2"
        geometry={nodes["Ellipse 2"].geometry}
        material={materials["Ellipse 2 Material"]}
        castShadow
        receiveShadow
        position={[-32.38, -155.19, 319.79]}
        rotation={[0.16, -0.21, 0.21]}
        scale={1.8}
      />
      <mesh
        name="Ellipse"
        geometry={nodes.Ellipse.geometry}
        material={materials["Ellipse Material"]}
        castShadow
        receiveShadow
        position={[-77.17, -163.33, 308.62]}
        rotation={[0.16, -0.21, 0.21]}
        scale={1.8}
      />
      <mesh
        name="Cube 44"
        geometry={nodes["Cube 44"].geometry}
        material={materials["Cube 44 Material"]}
        castShadow
        receiveShadow
        position={[-9.67, -146.38, -182.81]}
        rotation={[1.27, -0.06, -0.38]}
        scale={[-1.11, 1.27, 1.28]}
      />
      <mesh
        name="Cube 45"
        geometry={nodes["Cube 45"].geometry}
        material={materials["Cube 45 Material"]}
        castShadow
        receiveShadow
        position={[98.04, -150.27, -125.52]}
        rotation={[1.18, 0.09, 0.92]}
        scale={1.29}
      />
      <mesh
        name="Cube 46"
        geometry={nodes["Cube 46"].geometry}
        material={materials["Cube 46 Material"]}
        castShadow
        receiveShadow
        position={[-125.33, -146.38, -11.98]}
        rotation={[1.35, 0.27, -1.74]}
        scale={[-1.41, 1.16, 1.34]}
      />
      <mesh
        name="Cube 47"
        geometry={nodes["Cube 47"].geometry}
        material={materials["Cube 47 Material"]}
        castShadow
        receiveShadow
        position={[146.68, -152.11, 38.05]}
        rotation={[1.18, 0.09, 0.92]}
        scale={1.29}
      />
      <mesh
        name="Cube 28"
        geometry={nodes["Cube 28"].geometry}
        material={materials["Cube 28 Material"]}
        castShadow
        receiveShadow
        position={[19.73, -87.44, -57.83]}
        rotation={[3.14, 0.24, 2.96]}
        scale={[3.72, 3.51, 3.72]}
      />
      <mesh
        name="Torus"
        geometry={nodes.Torus.geometry}
        material={materials["Torus Material"]}
        castShadow
        receiveShadow
        position={[-100.7, -86.33, 210.43]}
        rotation={[-0.39, -0.68, -2.44]}
        scale={[-1.74, 1.77, 1.78]}
      />
      <mesh
        name="Torus1"
        geometry={nodes.Torus1.geometry}
        material={materials["Torus1 Material"]}
        castShadow
        receiveShadow
        position={[9.65, -65.36, 237.77]}
        rotation={[-0.44, 0.11, 2.59]}
        scale={1.8}
      />
      <mesh
        name="Cube 13"
        geometry={nodes["Cube 13"].geometry}
        material={materials["Cube 13 Material"]}
        castShadow
        receiveShadow
        position={[-105.73, -43.01, 88.67]}
        rotation={[1.11, -0.98, 1.7]}
        scale={[-2.41, 2.07, 2.15]}
      />
      <mesh
        name="Cube 131"
        geometry={nodes["Cube 131"].geometry}
        material={materials["Cube 131 Material"]}
        castShadow
        receiveShadow
        position={[47.14, -13.14, 126.4]}
        rotation={[0.36, 0.76, -0.71]}
        scale={[2.35, 1.9, 1.9]}
      />
      <mesh
        name="Cube 37"
        geometry={nodes["Cube 37"].geometry}
        material={materials["Cube 37 Material"]}
        castShadow
        receiveShadow
        position={[-22.8, -105.58, 148.31]}
        rotation={[-0.01, -0.24, 0.18]}
        scale={1.8}
      />
      <mesh
        name="Cube7"
        geometry={nodes.Cube7.geometry}
        material={materials["Cube7 Material"]}
        castShadow
        receiveShadow
        position={[-18.96, -105.66, 132.88]}
        rotation={[-0.01, -0.24, 0.18]}
        scale={1.8}
      />
    </group>
  );
}
