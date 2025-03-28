export default function Calendar({ nodes, materials }) {
  return (
    <group
      name="Calendar"
      position={[371.18, 63.37, 101.41]}
      rotation={[Math.PI, -1.57, Math.PI]}
      scale={[0.61, 0.59, 0.62]}
    >
      <group name="thread" position={[-0.59, 140.31, -5.36]} scale={1.92}>
        <mesh
          name="Cube 41"
          geometry={nodes["Cube 41"].geometry}
          material={materials.brown}
          castShadow
          receiveShadow
          position={[-18.27, -0.58, 0.79]}
          rotation={[2.26, 0.56, -1.98]}
          scale={[0.66, 0.66, 3.08]}
        />
        <mesh
          name="Cube 35"
          geometry={nodes["Cube 35"].geometry}
          material={materials.brown}
          castShadow
          receiveShadow
          position={[17.17, 0.75, -0.1]}
          rotation={[0.4, -0.29, 0.99]}
          scale={[0.66, 0.66, 3.74]}
        />
      </group>
      <group name="pins" position={[0.91, 142.36, -3.68]} scale={1.92}>
        <mesh
          name="Cylinder 34"
          geometry={nodes["Cylinder 34"].geometry}
          material={materials.darkblue}
          castShadow
          receiveShadow
          position={[-35.38, -13.95, -0.38]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[0.25, 0.46, 0.25]}
        />
        <mesh
          name="Cylinder 22"
          geometry={nodes["Cylinder 22"].geometry}
          material={materials.darkblue}
          castShadow
          receiveShadow
          position={[35.38, -13.95, -0.38]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[0.25, 0.46, 0.25]}
        />
        <mesh
          name="Cylinder2"
          geometry={nodes.Cylinder2.geometry}
          material={materials.darkblue}
          castShadow
          receiveShadow
          position={[-1.29, 12.93, 0.69]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[0.42, 0.41, 0.42]}
        />
      </group>
      <mesh
        name="Cube 27"
        geometry={nodes["Cube 27"].geometry}
        material={materials.yellow}
        castShadow
        receiveShadow
        position={[0, 86.61, -1.09]}
        rotation={[Math.PI, 0, -Math.PI]}
        scale={[-1.22, 0.31, 0.01]}
      />
      <mesh
        name="Text"
        geometry={nodes.Text.geometry} // December in calendar
        material={materials.metal}
        castShadow
        receiveShadow
        position={[2.2, 80.54, 1.15]}
        rotation={[0, 0, 0]}
        scale={1.27}
      />
      <group name="days" position={[-0.68, 17.48, -0.55]} scale={1.92}>
        <mesh
          name="Merged Geometry1"
          geometry={nodes["Merged Geometry1"].geometry}
          material={materials.pink}
          castShadow
          receiveShadow
          position={[-9.83, 19.87, 0]}
          scale={0.52}
        />
        <mesh
          name="Merged Geometry 2"
          geometry={nodes["Merged Geometry 2"].geometry}
          material={materials.red}
          castShadow
          receiveShadow
          position={[25.01, 19.87, 0]}
          scale={0.52}
        />
        <mesh
          name="Merged Geometry 3"
          geometry={nodes["Merged Geometry 3"].geometry}
          material={materials.pink}
          castShadow
          receiveShadow
          position={[0, -2.11, 0]}
          scale={0.52}
        />
      </group>
      <mesh
        name="bodycalendar"
        geometry={nodes.bodycalendar.geometry}
        material={materials.white}
        castShadow
        receiveShadow
        position={[0, 40.15, -1.52]}
        rotation={[Math.PI, 0, -Math.PI]}
        scale={[-1.27, 1.27, 0.01]}
      />
    </group>
  );
}
