export default function Desk({ nodes, materials }) {
  return (
    <group
      name="Desk"
      position={[271.44, -134.57, 206.25]}
      rotation={[Math.PI, -1.57, Math.PI]}
      scale={[0.28, 0.27, 0.29]}
    >
      <group
        name="notebook"
        position={[342.07, 193.2, 157.32]}
        rotation={[-1.57, 0, -0.1]}
        scale={0.28}
      >
        <mesh
          name="paper"
          geometry={nodes.paper.geometry}
          material={materials.paper}
          castShadow
          receiveShadow
          position={[20.15, 1.35, -5.37]}
          rotation={[-Math.PI, 0, 0]}
          scale={[1, 1.01, 0.99]}
        />
        <group name="covers" position={[16.53, 0, -5.89]}>
          <mesh
            name="coverback"
            geometry={nodes.coverback.geometry}
            material={materials.cover}
            castShadow
            receiveShadow
            position={[0, 0, -14.08]}
            scale={[-1, 1, 0.44]}
          />
          <mesh
            name="coverfront"
            geometry={nodes.coverfront.geometry}
            material={materials.cover}
            castShadow
            receiveShadow
            position={[0, 0, 14.71]}
            scale={[-1, 1, 0.36]}
          />
        </group>
        <group name="rings10" position={[-202.97, -255.69, 0]}>
          <mesh
            name="ring10_down"
            geometry={nodes.ring10_down.geometry}
            material={materials.rings}
            castShadow
            receiveShadow
            position={[0, -5.08, 0]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={[-0.43, 0.43, 0.43]}
          />
          <mesh
            name="ring10_up"
            geometry={nodes.ring10_up.geometry}
            material={materials.rings}
            castShadow
            receiveShadow
            position={[0, 5.08, 0]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={[-0.43, 0.43, 0.43]}
          />
        </group>
        <group name="rings9" position={[-202.97, -193.24, 0]}>
          <mesh
            name="ring9_down"
            geometry={nodes.ring9_down.geometry}
            material={materials.rings}
            castShadow
            receiveShadow
            position={[0, -5.08, 0]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={[-0.43, 0.43, 0.43]}
          />
          <mesh
            name="ring9_up"
            geometry={nodes.ring9_up.geometry}
            material={materials.rings}
            castShadow
            receiveShadow
            position={[0, 5.08, 0]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={[-0.43, 0.43, 0.43]}
          />
        </group>
        <group name="rings8" position={[-202.97, -132.27, 0]}>
          <mesh
            name="ring8_down"
            geometry={nodes.ring8_down.geometry}
            material={materials.rings}
            castShadow
            receiveShadow
            position={[0, -5.08, 0]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={[-0.43, 0.43, 0.43]}
          />
          <mesh
            name="ring8_up"
            geometry={nodes.ring8_up.geometry}
            material={materials.rings}
            castShadow
            receiveShadow
            position={[0, 5.08, 0]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={[-0.43, 0.43, 0.43]}
          />
        </group>
        <group name="rings7" position={[-202.97, -69.51, 0]}>
          <mesh
            name="ring7_down"
            geometry={nodes.ring7_down.geometry}
            material={materials.rings}
            castShadow
            receiveShadow
            position={[0, -5.08, 0]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={[-0.43, 0.43, 0.43]}
          />
          <mesh
            name="ring7_up"
            geometry={nodes.ring7_up.geometry}
            material={materials.rings}
            castShadow
            receiveShadow
            position={[0, 5.08, 0]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={[-0.43, 0.43, 0.43]}
          />
        </group>
        <group name="rings6" position={[-202.97, -9.04, 0]}>
          <mesh
            name="ring6_down"
            geometry={nodes.ring6_down.geometry}
            material={materials.rings}
            castShadow
            receiveShadow
            position={[0, -5.08, 0]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={[-0.43, 0.43, 0.43]}
          />
          <mesh
            name="ring6_up"
            geometry={nodes.ring6_up.geometry}
            material={materials.rings}
            castShadow
            receiveShadow
            position={[0, 5.08, 0]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={[-0.43, 0.43, 0.43]}
          />
        </group>
        <group name="rings5" position={[-202.97, 44.72, 0]}>
          <mesh
            name="ring5_down"
            geometry={nodes.ring5_down.geometry}
            material={materials.rings}
            castShadow
            receiveShadow
            position={[0, -5.08, 0]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={[-0.43, 0.43, 0.43]}
          />
          <mesh
            name="ring5_up"
            geometry={nodes.ring5_up.geometry}
            material={materials.rings}
            castShadow
            receiveShadow
            position={[0, 5.08, 0]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={[-0.43, 0.43, 0.43]}
          />
        </group>
        <group name="rings4" position={[-202.97, 106.63, 0]}>
          <mesh
            name="ring4_down"
            geometry={nodes.ring4_down.geometry}
            material={materials.rings}
            castShadow
            receiveShadow
            position={[0, -5.08, 0]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={[-0.43, 0.43, 0.43]}
          />
          <mesh
            name="ring4_up"
            geometry={nodes.ring4_up.geometry}
            material={materials.rings}
            castShadow
            receiveShadow
            position={[0, 5.08, 0]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={[-0.43, 0.43, 0.43]}
          />
        </group>
        <group name="rings3" position={[-202.97, 162.31, 0]}>
          <mesh
            name="ring3_down"
            geometry={nodes.ring3_down.geometry}
            material={materials.rings}
            castShadow
            receiveShadow
            position={[0, -5.08, 0]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={[-0.43, 0.43, 0.43]}
          />
          <mesh
            name="ring3_up"
            geometry={nodes.ring3_up.geometry}
            material={materials.rings}
            castShadow
            receiveShadow
            position={[0, 5.08, 0]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={[-0.43, 0.43, 0.43]}
          />
        </group>
        <group name="rings2" position={[-202.97, 218.39, 0]}>
          <mesh
            name="ring2_down"
            geometry={nodes.ring2_down.geometry}
            material={materials.rings}
            castShadow
            receiveShadow
            position={[0, -5.08, 0]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={[-0.43, 0.43, 0.43]}
          />
          <mesh
            name="ring2_up"
            geometry={nodes.ring2_up.geometry}
            material={materials.rings}
            castShadow
            receiveShadow
            position={[0, 5.08, 0]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={[-0.43, 0.43, 0.43]}
          />
        </group>
        <group name="rings1" position={[-202.97, 274.72, 0]}>
          <mesh
            name="ring1_down"
            geometry={nodes.ring1_down.geometry}
            material={materials.rings}
            castShadow
            receiveShadow
            position={[0, -5.08, 0]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={[-0.43, 0.43, 0.43]}
          />
          <mesh
            name="ring1_up"
            geometry={nodes.ring1_up.geometry}
            material={materials.rings}
            castShadow
            receiveShadow
            position={[0, 5.08, 0]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={[-0.43, 0.43, 0.43]}
          />
        </group>
      </group>
      <group
        name="sticky note"
        position={[358.85, 184.35, -136.01]}
        rotation={[0, -0.71, 0]}
        scale={[1.35, 1.35, 1.34]}
      >
        <mesh
          name="paper1"
          geometry={nodes.paper1.geometry}
          material={materials.yellow}
          castShadow
          receiveShadow
          position={[0, 15.33, 1.11]}
          rotation={[0, 0, 0]}
          scale={[1, 0.02, 1]}
        />
        <mesh
          name="contourpiece"
          geometry={nodes.contourpiece.geometry}
          material={materials.orange}
          castShadow
          receiveShadow
          position={[0, 7.5, -20.41]}
          scale={[1, 1, 0.07]}
        />
        <mesh
          name="body"
          geometry={nodes.body.geometry}
          material={materials.yellow}
          castShadow
          receiveShadow
          position={[0, 7.5, 1.11]}
          scale={1}
        />
      </group>
      <group
        name="Office Chair"
        position={[91.51, -424.03, 515.22]}
        rotation={[-Math.PI, 0.05, -Math.PI]}
        scale={2.83}
      >
        <group
          name="l_armrest Instance"
          position={[67.95, 158.52, 6.07]}
          scale={2.04}
        >
          <mesh
            name="Cube 51"
            geometry={nodes["Cube 51"].geometry}
            material={materials.greydarker}
            castShadow
            receiveShadow
            position={[0, 16.25, 4.88]}
            rotation={[Math.PI / 2, 0, -Math.PI / 2]}
            scale={[0.82, 0.36, 0.09]}
          />
          <mesh
            name="Cube 32"
            geometry={nodes["Cube 32"].geometry}
            material={materials.metal}
            castShadow
            receiveShadow
            position={[0.57, -3.12, -4.3]}
            scale={[2.68, 26.54, 0.92]}
          />
        </group>
        <group name="l_armrest" position={[-67.46, 158.52, 6.07]} scale={2.04}>
          <mesh
            name="Cube 52"
            geometry={nodes["Cube 52"].geometry}
            material={materials.greydarker}
            castShadow
            receiveShadow
            position={[0, 16.25, 4.88]}
            rotation={[Math.PI / 2, 0, -Math.PI / 2]}
            scale={[0.82, 0.36, 0.09]}
          />
          <mesh
            name="Cube 33"
            geometry={nodes["Cube 33"].geometry}
            material={materials.metal}
            castShadow
            receiveShadow
            position={[0.57, -3.12, -4.3]}
            scale={[2.68, 26.54, 0.92]}
          />
        </group>
        <group name="wheels" position={[0.03, 23.96, -0.64]} scale={2.04}>
          <group
            name="wheel1 Instance 2"
            position={[27.1, 0, -0.11]}
            rotation={[0, Math.PI / 2, 0]}
            scale={0.88}
          >
            <mesh
              name="Cylinder 8"
              geometry={nodes["Cylinder 8"].geometry}
              material={materials.grey}
              castShadow
              receiveShadow
              position={[-0.12, 5.41, 0.87]}
            />
            <mesh
              name="Cube 6"
              geometry={nodes["Cube 6"].geometry}
              material={materials.black}
              castShadow
              receiveShadow
              position={[0, 2.25, 0]}
              rotation={[0, Math.PI / 2, 0]}
              scale={0.75}
            />
            <mesh
              name="Cylinder 5"
              geometry={nodes["Cylinder 5"].geometry}
              material={materials.metal}
              castShadow
              receiveShadow
              position={[2.76, -3.62, 0.1]}
              rotation={[0, 0, Math.PI / 2]}
              scale={[1.16, 0.34, 1.16]}
            />
            <mesh
              name="Cylinder 7"
              geometry={nodes["Cylinder 7"].geometry}
              material={materials.black}
              castShadow
              receiveShadow
              position={[4.35, -3.62, 0.1]}
              rotation={[0, 0, Math.PI / 2]}
              scale={[0.61, 0.18, 0.61]}
            />
            <mesh
              name="Cylinder 6"
              geometry={nodes["Cylinder 6"].geometry}
              material={materials.black}
              castShadow
              receiveShadow
              position={[-4.59, -3.62, 0.1]}
              rotation={[0, 0, Math.PI / 2]}
              scale={[0.61, 0.18, 0.61]}
            />
            <mesh
              name="Cylinder 4"
              geometry={nodes["Cylinder 4"].geometry}
              material={materials.metal}
              castShadow
              receiveShadow
              position={[-2.94, -3.62, 0.1]}
              rotation={[0, 0, Math.PI / 2]}
              scale={[1.16, 0.34, 1.16]}
            />
            <mesh
              name="Cylinder 3"
              geometry={nodes["Cylinder 3"].geometry}
              material={materials.greydarker}
              castShadow
              receiveShadow
              position={[0.19, -3.62, 0.1]}
              rotation={[0, 0, Math.PI / 2]}
              scale={[1, 0.3, 1]}
            />
          </group>
          <group
            name="wheel1 Instance"
            position={[0.67, 0, 26.32]}
            scale={0.88}
          >
            <mesh
              name="Cylinder 81"
              geometry={nodes["Cylinder 81"].geometry}
              material={materials.grey}
              castShadow
              receiveShadow
              position={[-0.12, 5.41, 0.87]}
            />
            <mesh
              name="Cube 61"
              geometry={nodes["Cube 61"].geometry}
              material={materials.black}
              castShadow
              receiveShadow
              position={[0, 2.25, 0]}
              rotation={[0, Math.PI / 2, 0]}
              scale={0.75}
            />
            <mesh
              name="Cylinder 51"
              geometry={nodes["Cylinder 51"].geometry}
              material={materials.metal}
              castShadow
              receiveShadow
              position={[2.76, -3.62, 0.1]}
              rotation={[0, 0, Math.PI / 2]}
              scale={[1.16, 0.34, 1.16]}
            />
            <mesh
              name="Cylinder 71"
              geometry={nodes["Cylinder 71"].geometry}
              material={materials.black}
              castShadow
              receiveShadow
              position={[4.35, -3.62, 0.1]}
              rotation={[0, 0, Math.PI / 2]}
              scale={[0.61, 0.18, 0.61]}
            />
            <mesh
              name="Cylinder 61"
              geometry={nodes["Cylinder 61"].geometry}
              material={materials.black}
              castShadow
              receiveShadow
              position={[-4.59, -3.62, 0.1]}
              rotation={[0, 0, Math.PI / 2]}
              scale={[0.61, 0.18, 0.61]}
            />
            <mesh
              name="Cylinder 41"
              geometry={nodes["Cylinder 41"].geometry}
              material={materials.metal}
              castShadow
              receiveShadow
              position={[-2.94, -3.62, 0.1]}
              rotation={[0, 0, Math.PI / 2]}
              scale={[1.16, 0.34, 1.16]}
            />
            <mesh
              name="Cylinder 31"
              geometry={nodes["Cylinder 31"].geometry}
              material={materials.greydarker}
              castShadow
              receiveShadow
              position={[0.19, -3.62, 0.1]}
              rotation={[0, 0, Math.PI / 2]}
              scale={[1, 0.3, 1]}
            />
          </group>
          <group
            name="wheel1 Instance1"
            position={[-25.76, 0, -0.11]}
            rotation={[0, Math.PI / 2, 0]}
            scale={0.88}
          >
            <mesh
              name="Cylinder 82"
              geometry={nodes["Cylinder 82"].geometry}
              material={materials.grey}
              castShadow
              receiveShadow
              position={[-0.12, 5.41, 0.87]}
            />
            <mesh
              name="Cube 62"
              geometry={nodes["Cube 62"].geometry}
              material={materials.black}
              castShadow
              receiveShadow
              position={[0, 2.25, 0]}
              rotation={[0, Math.PI / 2, 0]}
              scale={0.75}
            />
            <mesh
              name="Cylinder 52"
              geometry={nodes["Cylinder 52"].geometry}
              material={materials.metal}
              castShadow
              receiveShadow
              position={[2.76, -3.62, 0.1]}
              rotation={[0, 0, Math.PI / 2]}
              scale={[1.16, 0.34, 1.16]}
            />
            <mesh
              name="Cylinder 72"
              geometry={nodes["Cylinder 72"].geometry}
              material={materials.black}
              castShadow
              receiveShadow
              position={[4.35, -3.62, 0.1]}
              rotation={[0, 0, Math.PI / 2]}
              scale={[0.61, 0.18, 0.61]}
            />
            <mesh
              name="Cylinder 62"
              geometry={nodes["Cylinder 62"].geometry}
              material={materials.black}
              castShadow
              receiveShadow
              position={[-4.59, -3.62, 0.1]}
              rotation={[0, 0, Math.PI / 2]}
              scale={[0.61, 0.18, 0.61]}
            />
            <mesh
              name="Cylinder 42"
              geometry={nodes["Cylinder 42"].geometry}
              material={materials.metal}
              castShadow
              receiveShadow
              position={[-2.94, -3.62, 0.1]}
              rotation={[0, 0, Math.PI / 2]}
              scale={[1.16, 0.34, 1.16]}
            />
            <mesh
              name="Cylinder 32"
              geometry={nodes["Cylinder 32"].geometry}
              material={materials.greydarker}
              castShadow
              receiveShadow
              position={[0.19, -3.62, 0.1]}
              rotation={[0, 0, Math.PI / 2]}
              scale={[1, 0.3, 1]}
            />
          </group>
          <group name="wheel1" position={[0.67, 0, -26.54]} scale={0.88}>
            <mesh
              name="Cylinder 83"
              geometry={nodes["Cylinder 83"].geometry}
              material={materials.grey}
              castShadow
              receiveShadow
              position={[-0.12, 5.41, 0.87]}
            />
            <mesh
              name="Cube 63"
              geometry={nodes["Cube 63"].geometry}
              material={materials.black}
              castShadow
              receiveShadow
              position={[0, 2.25, 0]}
              rotation={[0, Math.PI / 2, 0]}
              scale={0.75}
            />
            <mesh
              name="Cylinder 53"
              geometry={nodes["Cylinder 53"].geometry}
              material={materials.metal}
              castShadow
              receiveShadow
              position={[2.76, -3.62, 0.1]}
              rotation={[0, 0, Math.PI / 2]}
              scale={[1.16, 0.34, 1.16]}
            />
            <mesh
              name="Cylinder 73"
              geometry={nodes["Cylinder 73"].geometry}
              material={materials.black}
              castShadow
              receiveShadow
              position={[4.35, -3.62, 0.1]}
              rotation={[0, 0, Math.PI / 2]}
              scale={[0.61, 0.18, 0.61]}
            />
            <mesh
              name="Cylinder 63"
              geometry={nodes["Cylinder 63"].geometry}
              material={materials.black}
              castShadow
              receiveShadow
              position={[-4.59, -3.62, 0.1]}
              rotation={[0, 0, Math.PI / 2]}
              scale={[0.61, 0.18, 0.61]}
            />
            <mesh
              name="Cylinder 43"
              geometry={nodes["Cylinder 43"].geometry}
              material={materials.metal}
              castShadow
              receiveShadow
              position={[-2.94, -3.62, 0.1]}
              rotation={[0, 0, Math.PI / 2]}
              scale={[1.16, 0.34, 1.16]}
            />
            <mesh
              name="Cylinder 33"
              geometry={nodes["Cylinder 33"].geometry}
              material={materials.greydarker}
              castShadow
              receiveShadow
              position={[0.19, -3.62, 0.1]}
              rotation={[0, 0, Math.PI / 2]}
              scale={[1, 0.3, 1]}
            />
          </group>
        </group>
        <group
          name="centralpiecechair"
          position={[1.52, 73.5, 1.01]}
          scale={2.04}
        >
          <mesh
            name="Merged Geometry"
            geometry={nodes["Merged Geometry"].geometry}
            material={materials.greydarker}
            castShadow
            receiveShadow
            position={[0, -16.93, 0]}
            scale={0.49}
          />
          <mesh
            name="Cylinder 21"
            geometry={nodes["Cylinder 21"].geometry}
            material={materials.black}
            castShadow
            receiveShadow
            position={[-0.34, -9.06, 0.08]}
            scale={[0.8, 0.17, 0.8]}
          />
          <mesh
            name="Cylinder1"
            geometry={nodes.Cylinder1.geometry}
            material={materials.metal}
            castShadow
            receiveShadow
            position={[-0.34, 0.03, 0.08]}
            scale={[0.5, 0.2, 0.5]}
          />
        </group>
        <group name="bodychair" position={[0.51, 223.3, 6.21]} scale={2.04}>
          <mesh
            name="Cube 21"
            geometry={nodes["Cube 21"].geometry}
            material={materials.greydarker}
            castShadow
            receiveShadow
            position={[0.02, 6, -29.92]}
            scale={[0.82, 0.88, 0.25]}
          />
          <mesh
            name="Cube 34"
            geometry={nodes["Cube 34"].geometry}
            material={materials.greydarker}
            castShadow
            receiveShadow
            position={[0.02, -39.56, 6.68]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={[0.82, 0.88, 0.25]}
          />
          <mesh
            name="Cube1"
            geometry={nodes.Cube1.geometry}
            material={materials.greydarker}
            castShadow
            receiveShadow
            position={[0.02, 37.42, -25.97]}
            scale={[0.81, 0.88, 0.25]}
          />
          <mesh
            name="Cube2"
            geometry={nodes.Cube2.geometry}
            material={materials.black}
            castShadow
            receiveShadow
            position={[-0.23, 3.09, -35.21]}
            scale={[0.79, 0.88, 0.03]}
          />
        </group>
      </group>
      <group name="Top" position={[-0.29, 130, -0.16]} scale={1}>
        <group
          name="Plant_06"
          position={[-338.57, 41.55, -129.97]}
          scale={1.06}
        >
          <mesh
            name="leaf"
            geometry={nodes.leaf.geometry}
            material={materials.green}
            castShadow
            receiveShadow
            position={[-0.25, 121.78, -0.72]}
            scale={0.59}
          />
          <mesh
            name="earth"
            geometry={nodes.earth.geometry}
            material={materials.brown}
            castShadow
            receiveShadow
            position={[-0.72, 63.21, 1.4]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={0.79}
          />
          <mesh
            name="Cylinder 54"
            geometry={nodes["Cylinder 54"].geometry}
            material={materials.pink}
            castShadow
            receiveShadow
            position={[-0.72, 6.25, 1.4]}
            scale={0.79}
          />
          <mesh
            name="Boolean 2"
            geometry={nodes["Boolean 2"].geometry}
            material={materials.pink}
            castShadow
            receiveShadow
            position={[-0.72, 15.95, -3.22]}
            scale={0.71}
          />
        </group>
        <group
          name="Plant Tea-1"
          position={[-415.67, 52.01, -214.81]}
          rotation={[0, 0, 0]}
          scale={1.18}
        >
          <mesh
            name="Cube 26"
            geometry={nodes["Cube 26"].geometry}
            material={materials.green}
            castShadow
            receiveShadow
            position={[60.3, 137.14, 8.16]}
            rotation={[-1.65, 0.96, -2.32]}
            scale={[-0.26, 0.29, 0.25]}
          />
          <mesh
            name="Cube 23"
            geometry={nodes["Cube 23"].geometry}
            material={materials.green}
            castShadow
            receiveShadow
            position={[-60.15, 200.94, 24.06]}
            rotation={[-1.38, -0.75, 0.97]}
            scale={[-0.27, 0.26, 0.25]}
          />
          <mesh
            name="Cube 22"
            geometry={nodes["Cube 22"].geometry}
            material={materials.green}
            castShadow
            receiveShadow
            position={[33.46, 183.96, -50.1]}
            rotation={[-2.37, 0.47, -0.53]}
            scale={[-0.29, 0.28, 0.28]}
          />
          <mesh
            name="Cube 24"
            geometry={nodes["Cube 24"].geometry}
            material={materials.brown}
            castShadow
            receiveShadow
            position={[-0.97, 64.07, -0.96]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={[1, 1, 0.68]}
          />
          <mesh
            name="Cube3"
            geometry={nodes.Cube3.geometry}
            material={materials.pink}
            castShadow
            receiveShadow
            position={[0, 39.13, 0]}
          />
        </group>
        <group name="laptop" position={[25.23, 51.88, -57.6]} scale={2.72}>
          <mesh
            name="Rectangle 2"
            geometry={nodes["Rectangle 2"].geometry}
            material={materials.Metal}
            castShadow
            receiveShadow
            position={[0, 51.16, -44.62]}
            rotation={[-0.17, 0, 0]}
            scale={[0.61, 0.66, 0.66]}
          />
          <mesh
            name="Boolean"
            geometry={nodes.Boolean.geometry}
            material={nodes.Boolean.material}
            castShadow
            receiveShadow
            position={[0, 4.1, 44.19]}
          />
          <mesh
            name="Rectangle2"
            geometry={nodes.Rectangle2.geometry}
            material={materials.pink}
            castShadow
            receiveShadow
            position={[0, 48.22, -47.93]}
            rotation={[-0.17, 0, 0]}
            scale={[0.61, 0.66, 0.66]}
          />
        </group>
        <mesh
          name="wood"
          geometry={nodes.wood.geometry}
          material={materials["Wood  Noise Pattern 02"]}
          castShadow
          receiveShadow
          position={[0, 0.58, -2.86]}
          rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
          scale={1}
        />
      </group>
      <group name="leg Instance" position={[534.97, -136.61, 1.35]}>
        <group name="Group" position={[-67.42, 0, 0]}>
          <mesh
            name="Rectangle 4"
            geometry={nodes["Rectangle 4"].geometry}
            material={materials.Metal}
            castShadow
            receiveShadow
            position={[-1.63, -183.5, -7.41]}
            rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
            scale={1}
          />
          <mesh
            name="Rectangle 3"
            geometry={nodes["Rectangle 3"].geometry}
            material={materials.Metal}
            castShadow
            receiveShadow
            position={[-1.63, -207.5, -7.41]}
            rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
            scale={1}
          />
          <mesh
            name="Rectangle 21"
            geometry={nodes["Rectangle 21"].geometry}
            material={materials.Metal}
            castShadow
            receiveShadow
            position={[-1.63, -231.5, -7.41]}
            rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
            scale={1}
          />
          <mesh
            name="Rectangle3"
            geometry={nodes.Rectangle3.geometry}
            material={materials.Metal}
            castShadow
            receiveShadow
            position={[0, -266.5, 0]}
            rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
            scale={1}
          />
        </group>
      </group>
      <group name="leg" position={[-400.13, -136.61, 1.35]}>
        <group name="Group1" position={[-67.42, 0, 0]}>
          <mesh
            name="Rectangle 41"
            geometry={nodes["Rectangle 41"].geometry}
            material={materials.Metal}
            castShadow
            receiveShadow
            position={[-1.63, -183.5, -7.41]}
            rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
            scale={1}
          />
          <mesh
            name="Rectangle 31"
            geometry={nodes["Rectangle 31"].geometry}
            material={materials.Metal}
            castShadow
            receiveShadow
            position={[-1.63, -207.5, -7.41]}
            rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
            scale={1}
          />
          <mesh
            name="Rectangle 22"
            geometry={nodes["Rectangle 22"].geometry}
            material={materials.Metal}
            castShadow
            receiveShadow
            position={[-1.63, -231.5, -7.41]}
            rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
            scale={1}
          />
          <mesh
            name="Rectangle4"
            geometry={nodes.Rectangle4.geometry}
            material={materials.Metal}
            castShadow
            receiveShadow
            position={[0, -266.5, 0]}
            rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
            scale={1}
          />
        </group>
      </group>
    </group>
  );
}
