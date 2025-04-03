export default function PolaroidModel({ nodes, materials }) {
  return (
    <group
      name="PolaroidLine"
      position={[390.89, 157.84, -96.69]}
      scale={[0.38, 0.37, 0.38]}
    >
      <group name="PolaroidLine 2" position={[0, -203.75, 0]}>
        <group name="PolaroidLine 21" position={[0, -205.29, 0]}>
          <group
            name="BlenderLine"
            position={[43.45, -126.88, 0]}
            rotation={[0, -Math.PI / 2, 0]}
            scale={1.12}
          >
            <mesh
              name="Test"
              geometry={nodes.Test.geometry}
              material={nodes.Test.material}
              castShadow
              receiveShadow
              rotation={[-Math.PI / 2, 0, 0]}
              scale={100}
            />
          </group>
          <group
            name="Polaroids on line"
            position={[-37.68, 14.33, -1.63]}
            rotation={[0, -Math.PI / 2, 0]}
          >
            <group
              name="1stPic"
              position={[-485.26, 8.31, 0.94]}
              rotation={[Math.PI / 2, -0.11, 0]}
              scale={0.35}
            >
              <group
                name="Paper Clip2"
                position={[-10.58, -1.24, -191.11]}
                rotation={[-0.01, 0, 0]}
                scale={[1.54, 1, 1.08]}
              >
                <mesh
                  name="Path2"
                  geometry={nodes.Path2.geometry}
                  material={materials["Path2 Material"]}
                  castShadow
                  receiveShadow
                  position={[-9.73, 6.54, 15.11]}
                  rotation={[-1.65, 0.06, 0.01]}
                  scale={[0.62, 0.95, 1.03]}
                />
                <mesh
                  name="Cube 216"
                  geometry={nodes["Cube 216"].geometry}
                  material={materials["Cube 216 Material"]}
                  castShadow
                  receiveShadow
                  position={[0, 4.28, -0.2]}
                  rotation={[-0.09, 0, 0]}
                  scale={[1, 1.01, 0.68]}
                />
                <mesh
                  name="Cube13"
                  geometry={nodes.Cube13.geometry}
                  material={materials["Cube13 Material"]}
                  castShadow
                  receiveShadow
                  position={[0, -7.79, 0.65]}
                  rotation={[0.1, 0, 0]}
                  scale={[1, 1, 0.69]}
                />
              </group>
              <mesh
                name="Polaroid Frame2"
                geometry={nodes["Polaroid Frame2"].geometry}
                material={materials["Polaroid Frame2 Material"]}
                castShadow
                receiveShadow
                position={[0, -10.71, 0]}
                rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
                scale={1}
              />
            </group>
            <group
              name="2ndPic"
              position={[-359.93, -11.98, 1.14]}
              rotation={[Math.PI / 2, -0.05, 0]}
              scale={0.35}
            >
              <group
                name="Paper Clip3"
                position={[39.69, -1.2, -185.56]}
                rotation={[0.04, -0.1, 0.01]}
                scale={[1.54, 1, 1.08]}
              >
                <mesh
                  name="Path3"
                  geometry={nodes.Path3.geometry}
                  material={materials["Path3 Material"]}
                  castShadow
                  receiveShadow
                  position={[-9.73, 6.54, 15.11]}
                  rotation={[-1.65, 0.06, 0.01]}
                  scale={[0.62, 0.95, 1.03]}
                />
                <mesh
                  name="Cube 217"
                  geometry={nodes["Cube 217"].geometry}
                  material={materials["Cube 217 Material"]}
                  castShadow
                  receiveShadow
                  position={[0, 4.28, -0.2]}
                  rotation={[-0.09, 0, 0]}
                  scale={[1, 1.01, 0.68]}
                />
                <mesh
                  name="Cube14"
                  geometry={nodes.Cube14.geometry}
                  material={materials["Cube14 Material"]}
                  castShadow
                  receiveShadow
                  position={[0, -7.79, 0.65]}
                  rotation={[0.1, 0, 0]}
                  scale={[1, 1, 0.69]}
                />
              </group>
              <mesh
                name="Polaroid Frame3"
                geometry={nodes["Polaroid Frame3"].geometry}
                material={materials["Polaroid Frame3 Material"]}
                castShadow
                receiveShadow
                position={[4.6, -14.71, 12.8]}
                rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
                scale={1}
              />
            </group>
            <group
              name="3rdPic"
              position={[-241.96, -28.44, 0.83]}
              rotation={[Math.PI / 2, -0.05, 0]}
              scale={0.35}
            >
              <group
                name="Paper Clip4"
                position={[20.5, -0.7, -190.22]}
                rotation={[-0.01, 0.14, 0]}
                scale={[1.54, 1, 1.08]}
              >
                <mesh
                  name="Path4"
                  geometry={nodes.Path4.geometry}
                  material={materials["Path4 Material"]}
                  castShadow
                  receiveShadow
                  position={[-9.73, 6.54, 15.11]}
                  rotation={[-1.65, 0.06, 0.01]}
                  scale={[0.62, 0.95, 1.03]}
                />
                <mesh
                  name="Cube 218"
                  geometry={nodes["Cube 218"].geometry}
                  material={materials["Cube 218 Material"]}
                  castShadow
                  receiveShadow
                  position={[0, 4.79, -0.24]}
                  rotation={[-0.09, 0, 0]}
                  scale={[1, 1.01, 0.68]}
                />
                <mesh
                  name="Cube15"
                  geometry={nodes.Cube15.geometry}
                  material={materials["Cube15 Material"]}
                  castShadow
                  receiveShadow
                  position={[0, -7.79, 0.65]}
                  rotation={[0.1, 0, 0]}
                  scale={[1, 1, 0.69]}
                />
              </group>
              <mesh
                name="Polaroid Frame4"
                geometry={nodes["Polaroid Frame4"].geometry}
                material={materials["Polaroid Frame4 Material"]}
                castShadow
                receiveShadow
                position={[20.46, -10.71, 0]}
                rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
                scale={1}
              />
            </group>
            <group
              name="4thPic"
              position={[-113.38, -34.01, 1.4]}
              rotation={[Math.PI / 2, 0.02, 0]}
              scale={0.35}
            >
              <group
                name="Paper Clip5"
                position={[-10.58, -1.24, -191.11]}
                rotation={[-0.01, -0.05, 0]}
                scale={[1.54, 1, 1.08]}
              >
                <mesh
                  name="Path5"
                  geometry={nodes.Path5.geometry}
                  material={materials["Path5 Material"]}
                  castShadow
                  receiveShadow
                  position={[-9.73, 6.54, 15.11]}
                  rotation={[-1.65, 0.06, 0.01]}
                  scale={[0.62, 0.95, 1.03]}
                />
                <mesh
                  name="Cube 219"
                  geometry={nodes["Cube 219"].geometry}
                  material={materials["Cube 219 Material"]}
                  castShadow
                  receiveShadow
                  position={[0, 4.28, -0.2]}
                  rotation={[-0.09, 0, 0]}
                  scale={[1, 1.01, 0.68]}
                />
                <mesh
                  name="Cube16"
                  geometry={nodes.Cube16.geometry}
                  material={materials["Cube16 Material"]}
                  castShadow
                  receiveShadow
                  position={[0, -7.79, 0.65]}
                  rotation={[0.1, 0, 0]}
                  scale={[1, 1, 0.69]}
                />
              </group>
              <mesh
                name="Polaroid Frame5"
                geometry={nodes["Polaroid Frame5"].geometry}
                material={materials["Polaroid Frame5 Material"]}
                castShadow
                receiveShadow
                position={[0, -10.71, 0]}
                rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
                scale={1}
              />
            </group>
            <group
              name="Center"
              position={[-1.34, -39.96, 1.25]}
              rotation={[Math.PI / 2, 0.01, 0]}
              scale={0.35}
            >
              <group
                name="Paper Clip6"
                position={[12.53, -1.33, -202.7]}
                rotation={[-0.01, -0.09, 0]}
                scale={[1.54, 1, 1.08]}
              >
                <mesh
                  name="Path6"
                  geometry={nodes.Path6.geometry}
                  material={materials["Path6 Material"]}
                  castShadow
                  receiveShadow
                  position={[-9.73, 6.54, 15.11]}
                  rotation={[-1.65, 0.06, 0.01]}
                  scale={[0.62, 0.95, 1.03]}
                />
                <mesh
                  name="Cube 220"
                  geometry={nodes["Cube 220"].geometry}
                  material={materials["Cube 220 Material"]}
                  castShadow
                  receiveShadow
                  position={[0, 4.28, -0.2]}
                  rotation={[-0.09, 0, 0]}
                  scale={[1, 1.01, 0.68]}
                />
                <mesh
                  name="Cube17"
                  geometry={nodes.Cube17.geometry}
                  material={materials["Cube17 Material"]}
                  castShadow
                  receiveShadow
                  position={[0, -7.79, 0.65]}
                  rotation={[0.1, 0, 0]}
                  scale={[1, 1, 0.69]}
                />
              </group>
              <mesh
                name="Polaroid Frame6"
                geometry={nodes["Polaroid Frame6"].geometry}
                material={materials["Polaroid Frame6 Material"]}
                castShadow
                receiveShadow
                position={[0, -10.71, 0]}
                rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
                scale={1}
              />
            </group>
            <group
              name="6thPic"
              position={[127.4, -36.86, 1.2]}
              rotation={[Math.PI / 2, 0.09, 0]}
              scale={0.35}
            >
              <group
                name="Paper Clip7"
                position={[2.29, -1.25, -192.35]}
                rotation={[-0.01, 0.1, 0]}
                scale={[1.54, 1, 1.08]}
              >
                <mesh
                  name="Path7"
                  geometry={nodes.Path7.geometry}
                  material={materials["Path7 Material"]}
                  castShadow
                  receiveShadow
                  position={[-9.73, 6.54, 15.11]}
                  rotation={[-1.65, 0.06, 0.01]}
                  scale={[0.62, 0.95, 1.03]}
                />
                <mesh
                  name="Cube 222"
                  geometry={nodes["Cube 222"].geometry}
                  material={materials["Cube 222 Material"]}
                  castShadow
                  receiveShadow
                  position={[0, 4.28, -0.2]}
                  rotation={[-0.09, 0, 0]}
                  scale={[1, 1.01, 0.68]}
                />
                <mesh
                  name="Cube18"
                  geometry={nodes.Cube18.geometry}
                  material={materials["Cube18 Material"]}
                  castShadow
                  receiveShadow
                  position={[0, -7.79, 0.65]}
                  rotation={[0.1, 0, 0]}
                  scale={[1, 1, 0.69]}
                />
              </group>
              <mesh
                name="Polaroid Frame7"
                geometry={nodes["Polaroid Frame7"].geometry}
                material={materials["Polaroid Frame7 Material"]}
                castShadow
                receiveShadow
                position={[0, -10.71, 0]}
                rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
                scale={1}
              />
            </group>
            <group
              name="7thPic"
              position={[245.02, -32.51, 1.16]}
              rotation={[Math.PI / 2, 0.12, 0]}
              scale={0.35}
            >
              <group
                name="Paper Clip8"
                position={[11.79, -1.24, -191.11]}
                rotation={[-0.01, 0, 0]}
                scale={[1.54, 1, 1.08]}
              >
                <mesh
                  name="Path8"
                  geometry={nodes.Path8.geometry}
                  material={materials["Path8 Material"]}
                  castShadow
                  receiveShadow
                  position={[-9.73, 6.54, 15.11]}
                  rotation={[-1.65, 0.06, 0.01]}
                  scale={[0.62, 0.95, 1.03]}
                />
                <mesh
                  name="Cube 223"
                  geometry={nodes["Cube 223"].geometry}
                  material={materials["Cube 223 Material"]}
                  castShadow
                  receiveShadow
                  position={[0, 4.28, -0.2]}
                  rotation={[-0.09, 0, 0]}
                  scale={[1, 1.01, 0.68]}
                />
                <mesh
                  name="Cube19"
                  geometry={nodes.Cube19.geometry}
                  material={materials["Cube19 Material"]}
                  castShadow
                  receiveShadow
                  position={[0, -7.79, 0.65]}
                  rotation={[0.1, 0, 0]}
                  scale={[1, 1, 0.69]}
                />
              </group>
              <mesh
                name="Polaroid Frame8"
                geometry={nodes["Polaroid Frame8"].geometry}
                material={materials["Polaroid Frame8 Material"]}
                castShadow
                receiveShadow
                position={[0, -10.71, 0]}
                rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
                scale={1}
              />
            </group>
            <group
              name="8thPic"
              position={[386.32, -16.01, 0.86]}
              rotation={[Math.PI / 2, 0.04, 0]}
              scale={0.35}
            >
              <group
                name="Paper Clip9"
                position={[-50.67, -1.28, -194.67]}
                rotation={[-0.01, -0.16, 0]}
                scale={[1.54, 1, 1.08]}
              >
                <mesh
                  name="Path9"
                  geometry={nodes.Path9.geometry}
                  material={materials["Path9 Material"]}
                  castShadow
                  receiveShadow
                  position={[-9.73, 6.54, 15.11]}
                  rotation={[-1.65, 0.06, 0.01]}
                  scale={[0.62, 0.95, 1.03]}
                />
                <mesh
                  name="Cube 224"
                  geometry={nodes["Cube 224"].geometry}
                  material={materials["Cube 224 Material"]}
                  castShadow
                  receiveShadow
                  position={[0, 4.37, 0.63]}
                  rotation={[-0.09, 0, 0]}
                  scale={[1, 1.01, 0.68]}
                />
                <mesh
                  name="Cube20"
                  geometry={nodes.Cube20.geometry}
                  material={materials["Cube20 Material"]}
                  castShadow
                  receiveShadow
                  position={[0, -7.79, 0.65]}
                  rotation={[0.1, 0, 0]}
                  scale={[1, 1, 0.69]}
                />
              </group>
              <mesh
                name="Polaroid Frame9"
                geometry={nodes["Polaroid Frame9"].geometry}
                material={materials["Polaroid Frame9 Material"]}
                castShadow
                receiveShadow
                position={[-64.24, -10.71, 0]}
                rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
                scale={1}
              />
            </group>
            <group
              name="9thPic"
              position={[487.85, 4.62, 0.73]}
              rotation={[Math.PI / 2, 0.07, 0]}
              scale={0.35}
            >
              <group
                name="Paper Clip10"
                position={[-32.21, -1.63, -188.22]}
                rotation={[-0.06, 0.13, 0.01]}
                scale={[1.54, 1, 1.08]}
              >
                <mesh
                  name="Path10"
                  geometry={nodes.Path10.geometry}
                  material={materials["Path10 Material"]}
                  castShadow
                  receiveShadow
                  position={[-9.73, 6.54, 15.11]}
                  rotation={[-1.65, 0.06, 0.01]}
                  scale={[0.62, 0.95, 1.03]}
                />
                <mesh
                  name="Cube 225"
                  geometry={nodes["Cube 225"].geometry}
                  material={materials["Cube 225 Material"]}
                  castShadow
                  receiveShadow
                  position={[0, 5.29, 0.42]}
                  rotation={[-0.08, 0, 0]}
                  scale={[1, 1.01, 0.68]}
                />
                <mesh
                  name="Cube21"
                  geometry={nodes.Cube21.geometry}
                  material={materials["Cube21 Material"]}
                  castShadow
                  receiveShadow
                  position={[0, -7.79, 0.65]}
                  rotation={[0.14, 0, 0]}
                  scale={[1, 1, 0.69]}
                />
              </group>
              <mesh
                name="Polaroid Frame10"
                geometry={nodes["Polaroid Frame10"].geometry}
                material={materials["Polaroid Frame10 Material"]}
                castShadow
                receiveShadow
                position={[0, -10.71, 0]}
                rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
                scale={1}
              />
            </group>
          </group>
        </group>
        <group
          name="BlenderLine1"
          position={[43.45, -126.88, 0]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={1.12}
        >
          <mesh
            name="Test1"
            geometry={nodes.Test1.geometry}
            material={nodes.Test1.material}
            castShadow
            receiveShadow
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
        </group>
        <group
          name="Polaroids on line1"
          position={[-37.68, 14.33, -1.63]}
          rotation={[0, -Math.PI / 2, 0]}
        >
          <group
            name="1stPic1"
            position={[-485.26, 8.31, 0.94]}
            rotation={[Math.PI / 2, -0.11, 0]}
            scale={0.35}
          >
            <group
              name="Paper Clip11"
              position={[-10.58, -1.24, -191.11]}
              rotation={[-0.01, 0, 0]}
              scale={[1.54, 1, 1.08]}
            >
              <mesh
                name="Path11"
                geometry={nodes.Path11.geometry}
                material={materials["Path11 Material"]}
                castShadow
                receiveShadow
                position={[-9.73, 6.54, 15.11]}
                rotation={[-1.65, 0.06, 0.01]}
                scale={[0.62, 0.95, 1.03]}
              />
              <mesh
                name="Cube 226"
                geometry={nodes["Cube 226"].geometry}
                material={materials["Cube 226 Material"]}
                castShadow
                receiveShadow
                position={[0, 4.28, -0.2]}
                rotation={[-0.09, 0, 0]}
                scale={[1, 1.01, 0.68]}
              />
              <mesh
                name="Cube22"
                geometry={nodes.Cube22.geometry}
                material={materials["Cube22 Material"]}
                castShadow
                receiveShadow
                position={[0, -7.79, 0.65]}
                rotation={[0.1, 0, 0]}
                scale={[1, 1, 0.69]}
              />
            </group>
            <mesh
              name="Polaroid Frame11"
              geometry={nodes["Polaroid Frame11"].geometry}
              material={materials["Polaroid Frame11 Material"]}
              castShadow
              receiveShadow
              position={[0, -10.71, 0]}
              rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
              scale={1}
            />
          </group>
          <group
            name="2ndPic1"
            position={[-359.93, -11.98, 1.14]}
            rotation={[Math.PI / 2, -0.05, 0]}
            scale={0.35}
          >
            <group
              name="Paper Clip12"
              position={[39.69, -1.2, -185.56]}
              rotation={[0.04, -0.1, 0.01]}
              scale={[1.54, 1, 1.08]}
            >
              <mesh
                name="Path12"
                geometry={nodes.Path12.geometry}
                material={materials["Path12 Material"]}
                castShadow
                receiveShadow
                position={[-9.73, 6.54, 15.11]}
                rotation={[-1.65, 0.06, 0.01]}
                scale={[0.62, 0.95, 1.03]}
              />
              <mesh
                name="Cube 227"
                geometry={nodes["Cube 227"].geometry}
                material={materials["Cube 227 Material"]}
                castShadow
                receiveShadow
                position={[0, 4.28, -0.2]}
                rotation={[-0.09, 0, 0]}
                scale={[1, 1.01, 0.68]}
              />
              <mesh
                name="Cube23"
                geometry={nodes.Cube23.geometry}
                material={materials["Cube23 Material"]}
                castShadow
                receiveShadow
                position={[0, -7.79, 0.65]}
                rotation={[0.1, 0, 0]}
                scale={[1, 1, 0.69]}
              />
            </group>
            <mesh
              name="Polaroid Frame12"
              geometry={nodes["Polaroid Frame12"].geometry}
              material={materials["Polaroid Frame12 Material"]}
              castShadow
              receiveShadow
              position={[4.6, -14.71, 12.8]}
              rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
              scale={1}
            />
          </group>
          <group
            name="3rdPic1"
            position={[-241.96, -28.44, 0.83]}
            rotation={[Math.PI / 2, -0.05, 0]}
            scale={0.35}
          >
            <group
              name="Paper Clip13"
              position={[20.5, -0.7, -190.22]}
              rotation={[-0.01, 0.14, 0]}
              scale={[1.54, 1, 1.08]}
            >
              <mesh
                name="Path13"
                geometry={nodes.Path13.geometry}
                material={materials["Path13 Material"]}
                castShadow
                receiveShadow
                position={[-9.73, 6.54, 15.11]}
                rotation={[-1.65, 0.06, 0.01]}
                scale={[0.62, 0.95, 1.03]}
              />
              <mesh
                name="Cube 228"
                geometry={nodes["Cube 228"].geometry}
                material={materials["Cube 228 Material"]}
                castShadow
                receiveShadow
                position={[0, 4.79, -0.24]}
                rotation={[-0.09, 0, 0]}
                scale={[1, 1.01, 0.68]}
              />
              <mesh
                name="Cube24"
                geometry={nodes.Cube24.geometry}
                material={materials["Cube24 Material"]}
                castShadow
                receiveShadow
                position={[0, -7.79, 0.65]}
                rotation={[0.1, 0, 0]}
                scale={[1, 1, 0.69]}
              />
            </group>
            <mesh
              name="Polaroid Frame13"
              geometry={nodes["Polaroid Frame13"].geometry}
              material={materials["Polaroid Frame13 Material"]}
              castShadow
              receiveShadow
              position={[20.46, -10.71, 0]}
              rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
              scale={1}
            />
          </group>
          <group
            name="4thPic1"
            position={[-113.38, -34.01, 1.4]}
            rotation={[Math.PI / 2, 0.02, 0]}
            scale={0.35}
          >
            <group
              name="Paper Clip14"
              position={[-10.58, -1.24, -191.11]}
              rotation={[-0.01, -0.05, 0]}
              scale={[1.54, 1, 1.08]}
            >
              <mesh
                name="Path14"
                geometry={nodes.Path14.geometry}
                material={materials["Path14 Material"]}
                castShadow
                receiveShadow
                position={[-9.73, 6.54, 15.11]}
                rotation={[-1.65, 0.06, 0.01]}
                scale={[0.62, 0.95, 1.03]}
              />
              <mesh
                name="Cube 229"
                geometry={nodes["Cube 229"].geometry}
                material={materials["Cube 229 Material"]}
                castShadow
                receiveShadow
                position={[0, 4.28, -0.2]}
                rotation={[-0.09, 0, 0]}
                scale={[1, 1.01, 0.68]}
              />
              <mesh
                name="Cube25"
                geometry={nodes.Cube25.geometry}
                material={materials["Cube25 Material"]}
                castShadow
                receiveShadow
                position={[0, -7.79, 0.65]}
                rotation={[0.1, 0, 0]}
                scale={[1, 1, 0.69]}
              />
            </group>
            <mesh
              name="Polaroid Frame14"
              geometry={nodes["Polaroid Frame14"].geometry}
              material={materials["Polaroid Frame14 Material"]}
              castShadow
              receiveShadow
              position={[0, -10.71, 0]}
              rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
              scale={1}
            />
          </group>
          <group
            name="Center1"
            position={[-1.34, -39.96, 1.25]}
            rotation={[Math.PI / 2, 0.01, 0]}
            scale={0.35}
          >
            <group
              name="Paper Clip15"
              position={[12.53, -1.33, -202.7]}
              rotation={[-0.01, -0.09, 0]}
              scale={[1.54, 1, 1.08]}
            >
              <mesh
                name="Path15"
                geometry={nodes.Path15.geometry}
                material={materials["Path15 Material"]}
                castShadow
                receiveShadow
                position={[-9.73, 6.54, 15.11]}
                rotation={[-1.65, 0.06, 0.01]}
                scale={[0.62, 0.95, 1.03]}
              />
              <mesh
                name="Cube 230"
                geometry={nodes["Cube 230"].geometry}
                material={materials["Cube 230 Material"]}
                castShadow
                receiveShadow
                position={[0, 4.28, -0.2]}
                rotation={[-0.09, 0, 0]}
                scale={[1, 1.01, 0.68]}
              />
              <mesh
                name="Cube26"
                geometry={nodes.Cube26.geometry}
                material={materials["Cube26 Material"]}
                castShadow
                receiveShadow
                position={[0, -7.79, 0.65]}
                rotation={[0.1, 0, 0]}
                scale={[1, 1, 0.69]}
              />
            </group>
            <mesh
              name="Polaroid Frame15"
              geometry={nodes["Polaroid Frame15"].geometry}
              material={materials["Polaroid Frame15 Material"]}
              castShadow
              receiveShadow
              position={[0, -10.71, 0]}
              rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
              scale={1}
            />
          </group>
          <group
            name="6thPic1"
            position={[127.4, -36.86, 1.2]}
            rotation={[Math.PI / 2, 0.09, 0]}
            scale={0.35}
          >
            <group
              name="Paper Clip16"
              position={[2.29, -1.25, -192.35]}
              rotation={[-0.01, 0.1, 0]}
              scale={[1.54, 1, 1.08]}
            >
              <mesh
                name="Path16"
                geometry={nodes.Path16.geometry}
                material={materials["Path16 Material"]}
                castShadow
                receiveShadow
                position={[-9.73, 6.54, 15.11]}
                rotation={[-1.65, 0.06, 0.01]}
                scale={[0.62, 0.95, 1.03]}
              />
              <mesh
                name="Cube 232"
                geometry={nodes["Cube 232"].geometry}
                material={materials["Cube 232 Material"]}
                castShadow
                receiveShadow
                position={[0, 4.28, -0.2]}
                rotation={[-0.09, 0, 0]}
                scale={[1, 1.01, 0.68]}
              />
              <mesh
                name="Cube27"
                geometry={nodes.Cube27.geometry}
                material={materials["Cube27 Material"]}
                castShadow
                receiveShadow
                position={[0, -7.79, 0.65]}
                rotation={[0.1, 0, 0]}
                scale={[1, 1, 0.69]}
              />
            </group>
            <mesh
              name="Polaroid Frame16"
              geometry={nodes["Polaroid Frame16"].geometry}
              material={materials["Polaroid Frame16 Material"]}
              castShadow
              receiveShadow
              position={[0, -10.71, 0]}
              rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
              scale={1}
            />
          </group>
          <group
            name="7thPic1"
            position={[245.02, -32.51, 1.16]}
            rotation={[Math.PI / 2, 0.12, 0]}
            scale={0.35}
          >
            <group
              name="Paper Clip17"
              position={[11.79, -1.24, -191.11]}
              rotation={[-0.01, 0, 0]}
              scale={[1.54, 1, 1.08]}
            >
              <mesh
                name="Path17"
                geometry={nodes.Path17.geometry}
                material={materials["Path17 Material"]}
                castShadow
                receiveShadow
                position={[-9.73, 6.54, 15.11]}
                rotation={[-1.65, 0.06, 0.01]}
                scale={[0.62, 0.95, 1.03]}
              />
              <mesh
                name="Cube 233"
                geometry={nodes["Cube 233"].geometry}
                material={materials["Cube 233 Material"]}
                castShadow
                receiveShadow
                position={[0, 4.28, -0.2]}
                rotation={[-0.09, 0, 0]}
                scale={[1, 1.01, 0.68]}
              />
              <mesh
                name="Cube28"
                geometry={nodes.Cube28.geometry}
                material={materials["Cube28 Material"]}
                castShadow
                receiveShadow
                position={[0, -7.79, 0.65]}
                rotation={[0.1, 0, 0]}
                scale={[1, 1, 0.69]}
              />
            </group>
            <mesh
              name="Polaroid Frame17"
              geometry={nodes["Polaroid Frame17"].geometry}
              material={materials["Polaroid Frame17 Material"]}
              castShadow
              receiveShadow
              position={[0, -10.71, 0]}
              rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
              scale={1}
            />
          </group>
          <group
            name="8thPic1"
            position={[386.32, -16.01, 0.86]}
            rotation={[Math.PI / 2, 0.04, 0]}
            scale={0.35}
          >
            <group
              name="Paper Clip18"
              position={[-50.67, -1.28, -194.67]}
              rotation={[-0.01, -0.16, 0]}
              scale={[1.54, 1, 1.08]}
            >
              <mesh
                name="Path18"
                geometry={nodes.Path18.geometry}
                material={materials["Path18 Material"]}
                castShadow
                receiveShadow
                position={[-9.73, 6.54, 15.11]}
                rotation={[-1.65, 0.06, 0.01]}
                scale={[0.62, 0.95, 1.03]}
              />
              <mesh
                name="Cube 234"
                geometry={nodes["Cube 234"].geometry}
                material={materials["Cube 234 Material"]}
                castShadow
                receiveShadow
                position={[0, 4.37, 0.63]}
                rotation={[-0.09, 0, 0]}
                scale={[1, 1.01, 0.68]}
              />
              <mesh
                name="Cube29"
                geometry={nodes.Cube29.geometry}
                material={materials["Cube29 Material"]}
                castShadow
                receiveShadow
                position={[0, -7.79, 0.65]}
                rotation={[0.1, 0, 0]}
                scale={[1, 1, 0.69]}
              />
            </group>
            <mesh
              name="Polaroid Frame18"
              geometry={nodes["Polaroid Frame18"].geometry}
              material={materials["Polaroid Frame18 Material"]}
              castShadow
              receiveShadow
              position={[-64.24, -10.71, 0]}
              rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
              scale={1}
            />
          </group>
          <group
            name="9thPic1"
            position={[487.85, 4.62, 0.73]}
            rotation={[Math.PI / 2, 0.07, 0]}
            scale={0.35}
          >
            <group
              name="Paper Clip19"
              position={[-32.21, -1.63, -188.22]}
              rotation={[-0.06, 0.13, 0.01]}
              scale={[1.54, 1, 1.08]}
            >
              <mesh
                name="Path19"
                geometry={nodes.Path19.geometry}
                material={materials["Path19 Material"]}
                castShadow
                receiveShadow
                position={[-9.73, 6.54, 15.11]}
                rotation={[-1.65, 0.06, 0.01]}
                scale={[0.62, 0.95, 1.03]}
              />
              <mesh
                name="Cube 235"
                geometry={nodes["Cube 235"].geometry}
                material={materials["Cube 235 Material"]}
                castShadow
                receiveShadow
                position={[0, 5.29, 0.42]}
                rotation={[-0.08, 0, 0]}
                scale={[1, 1.01, 0.68]}
              />
              <mesh
                name="Cube30"
                geometry={nodes.Cube30.geometry}
                material={materials["Cube30 Material"]}
                castShadow
                receiveShadow
                position={[0, -7.79, 0.65]}
                rotation={[0.14, 0, 0]}
                scale={[1, 1, 0.69]}
              />
            </group>
            <mesh
              name="Polaroid Frame19"
              geometry={nodes["Polaroid Frame19"].geometry}
              material={materials["Polaroid Frame19 Material"]}
              castShadow
              receiveShadow
              position={[0, -10.71, 0]}
              rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
              scale={1}
            />
          </group>
        </group>
      </group>
      <group
        name="BlenderLine2"
        position={[43.45, -126.88, 0]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={1.12}
      >
        <mesh
          name="Test2"
          geometry={nodes.Test2.geometry}
          material={nodes.Test2.material}
          castShadow
          receiveShadow
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />
      </group>
      <group
        name="Polaroids on line2"
        position={[-37.68, 14.33, -1.63]}
        rotation={[0, -Math.PI / 2, 0]}
      >
        <group
          name="1stPic2"
          position={[-485.26, 8.31, 0.94]}
          rotation={[Math.PI / 2, -0.11, 0]}
          scale={0.35}
        >
          <group
            name="Paper Clip20"
            position={[-10.58, -1.24, -191.11]}
            rotation={[-0.01, 0, 0]}
            scale={[1.54, 1, 1.08]}
          >
            <mesh
              name="Path20"
              geometry={nodes.Path20.geometry}
              material={materials["Path20 Material"]}
              castShadow
              receiveShadow
              position={[-9.73, 6.54, 15.11]}
              rotation={[-1.65, 0.06, 0.01]}
              scale={[0.62, 0.95, 1.03]}
            />
            <mesh
              name="Cube 236"
              geometry={nodes["Cube 236"].geometry}
              material={materials["Cube 236 Material"]}
              castShadow
              receiveShadow
              position={[0, 4.28, -0.2]}
              rotation={[-0.09, 0, 0]}
              scale={[1, 1.01, 0.68]}
            />
            <mesh
              name="Cube31"
              geometry={nodes.Cube31.geometry}
              material={materials["Cube31 Material"]}
              castShadow
              receiveShadow
              position={[0, -7.79, 0.65]}
              rotation={[0.1, 0, 0]}
              scale={[1, 1, 0.69]}
            />
          </group>
          <mesh
            name="Polaroid Frame20"
            geometry={nodes["Polaroid Frame20"].geometry}
            material={materials["Polaroid Frame20 Material"]}
            castShadow
            receiveShadow
            position={[0, -10.71, 0]}
            rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
            scale={1}
          />
        </group>
        <group
          name="2ndPic2"
          position={[-359.93, -11.98, 1.14]}
          rotation={[Math.PI / 2, -0.05, 0]}
          scale={0.35}
        >
          <group
            name="Paper Clip21"
            position={[39.69, -1.2, -185.56]}
            rotation={[0.04, -0.1, 0.01]}
            scale={[1.54, 1, 1.08]}
          >
            <mesh
              name="Path21"
              geometry={nodes.Path21.geometry}
              material={materials["Path21 Material"]}
              castShadow
              receiveShadow
              position={[-9.73, 6.54, 15.11]}
              rotation={[-1.65, 0.06, 0.01]}
              scale={[0.62, 0.95, 1.03]}
            />
            <mesh
              name="Cube 237"
              geometry={nodes["Cube 237"].geometry}
              material={materials["Cube 237 Material"]}
              castShadow
              receiveShadow
              position={[0, 4.28, -0.2]}
              rotation={[-0.09, 0, 0]}
              scale={[1, 1.01, 0.68]}
            />
            <mesh
              name="Cube32"
              geometry={nodes.Cube32.geometry}
              material={materials["Cube32 Material"]}
              castShadow
              receiveShadow
              position={[0, -7.79, 0.65]}
              rotation={[0.1, 0, 0]}
              scale={[1, 1, 0.69]}
            />
          </group>
          <mesh
            name="Polaroid Frame21"
            geometry={nodes["Polaroid Frame21"].geometry}
            material={materials["Polaroid Frame21 Material"]}
            castShadow
            receiveShadow
            position={[4.6, -14.71, 12.8]}
            rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
            scale={1}
          />
        </group>
        <group
          name="3rdPic2"
          position={[-241.96, -28.44, 0.83]}
          rotation={[Math.PI / 2, -0.05, 0]}
          scale={0.35}
        >
          <group
            name="Paper Clip22"
            position={[20.5, -0.7, -190.22]}
            rotation={[-0.01, 0.14, 0]}
            scale={[1.54, 1, 1.08]}
          >
            <mesh
              name="Path22"
              geometry={nodes.Path22.geometry}
              material={materials["Path22 Material"]}
              castShadow
              receiveShadow
              position={[-9.73, 6.54, 15.11]}
              rotation={[-1.65, 0.06, 0.01]}
              scale={[0.62, 0.95, 1.03]}
            />
            <mesh
              name="Cube 238"
              geometry={nodes["Cube 238"].geometry}
              material={materials["Cube 238 Material"]}
              castShadow
              receiveShadow
              position={[0, 4.79, -0.24]}
              rotation={[-0.09, 0, 0]}
              scale={[1, 1.01, 0.68]}
            />
            <mesh
              name="Cube33"
              geometry={nodes.Cube33.geometry}
              material={materials["Cube33 Material"]}
              castShadow
              receiveShadow
              position={[0, -7.79, 0.65]}
              rotation={[0.1, 0, 0]}
              scale={[1, 1, 0.69]}
            />
          </group>
          <mesh
            name="Polaroid Frame22"
            geometry={nodes["Polaroid Frame22"].geometry}
            material={materials["Polaroid Frame22 Material"]}
            castShadow
            receiveShadow
            position={[20.46, -10.71, 0]}
            rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
            scale={1}
          />
        </group>
        <group
          name="4thPic2"
          position={[-113.38, -34.01, 1.4]}
          rotation={[Math.PI / 2, 0.02, 0]}
          scale={0.35}
        >
          <group
            name="Paper Clip23"
            position={[-10.58, -1.24, -191.11]}
            rotation={[-0.01, -0.05, 0]}
            scale={[1.54, 1, 1.08]}
          >
            <mesh
              name="Path23"
              geometry={nodes.Path23.geometry}
              material={materials["Path23 Material"]}
              castShadow
              receiveShadow
              position={[-9.73, 6.54, 15.11]}
              rotation={[-1.65, 0.06, 0.01]}
              scale={[0.62, 0.95, 1.03]}
            />
            <mesh
              name="Cube 239"
              geometry={nodes["Cube 239"].geometry}
              material={materials["Cube 239 Material"]}
              castShadow
              receiveShadow
              position={[0, 4.28, -0.2]}
              rotation={[-0.09, 0, 0]}
              scale={[1, 1.01, 0.68]}
            />
            <mesh
              name="Cube34"
              geometry={nodes.Cube34.geometry}
              material={materials["Cube34 Material"]}
              castShadow
              receiveShadow
              position={[0, -7.79, 0.65]}
              rotation={[0.1, 0, 0]}
              scale={[1, 1, 0.69]}
            />
          </group>
          <mesh
            name="Polaroid Frame23"
            geometry={nodes["Polaroid Frame23"].geometry}
            material={materials["Polaroid Frame23 Material"]}
            castShadow
            receiveShadow
            position={[0, -10.71, 0]}
            rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
            scale={1}
          />
        </group>
        <group
          name="Center2"
          position={[-1.34, -39.96, 1.25]}
          rotation={[Math.PI / 2, 0.01, 0]}
          scale={0.35}
        >
          <group
            name="Paper Clip24"
            position={[12.53, -1.33, -202.7]}
            rotation={[-0.01, -0.09, 0]}
            scale={[1.54, 1, 1.08]}
          >
            <mesh
              name="Path24"
              geometry={nodes.Path24.geometry}
              material={materials["Path24 Material"]}
              castShadow
              receiveShadow
              position={[-9.73, 6.54, 15.11]}
              rotation={[-1.65, 0.06, 0.01]}
              scale={[0.62, 0.95, 1.03]}
            />
            <mesh
              name="Cube 240"
              geometry={nodes["Cube 240"].geometry}
              material={materials["Cube 240 Material"]}
              castShadow
              receiveShadow
              position={[0, 4.28, -0.2]}
              rotation={[-0.09, 0, 0]}
              scale={[1, 1.01, 0.68]}
            />
            <mesh
              name="Cube35"
              geometry={nodes.Cube35.geometry}
              material={materials["Cube35 Material"]}
              castShadow
              receiveShadow
              position={[0, -7.79, 0.65]}
              rotation={[0.1, 0, 0]}
              scale={[1, 1, 0.69]}
            />
          </group>
          <mesh
            name="Polaroid Frame24"
            geometry={nodes["Polaroid Frame24"].geometry}
            material={materials["Polaroid Frame24 Material"]}
            castShadow
            receiveShadow
            position={[0, -10.71, 0]}
            rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
            scale={1}
          />
        </group>
        <group
          name="6thPic2"
          position={[127.4, -36.86, 1.2]}
          rotation={[Math.PI / 2, 0.09, 0]}
          scale={0.35}
        >
          <group
            name="Paper Clip25"
            position={[2.29, -1.25, -192.35]}
            rotation={[-0.01, 0.1, 0]}
            scale={[1.54, 1, 1.08]}
          >
            <mesh
              name="Path25"
              geometry={nodes.Path25.geometry}
              material={materials["Path25 Material"]}
              castShadow
              receiveShadow
              position={[-9.73, 6.54, 15.11]}
              rotation={[-1.65, 0.06, 0.01]}
              scale={[0.62, 0.95, 1.03]}
            />
            <mesh
              name="Cube 241"
              geometry={nodes["Cube 241"].geometry}
              material={materials["Cube 241 Material"]}
              castShadow
              receiveShadow
              position={[0, 4.28, -0.2]}
              rotation={[-0.09, 0, 0]}
              scale={[1, 1.01, 0.68]}
            />
            <mesh
              name="Cube36"
              geometry={nodes.Cube36.geometry}
              material={materials["Cube36 Material"]}
              castShadow
              receiveShadow
              position={[0, -7.79, 0.65]}
              rotation={[0.1, 0, 0]}
              scale={[1, 1, 0.69]}
            />
          </group>
          <mesh
            name="Polaroid Frame25"
            geometry={nodes["Polaroid Frame25"].geometry}
            material={materials["Polaroid Frame25 Material"]}
            castShadow
            receiveShadow
            position={[0, -10.71, 0]}
            rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
            scale={1}
          />
        </group>
        <group
          name="7thPic2"
          position={[245.02, -32.51, 1.16]}
          rotation={[Math.PI / 2, 0.12, 0]}
          scale={0.35}
        >
          <group
            name="Paper Clip26"
            position={[11.79, -1.24, -191.11]}
            rotation={[-0.01, 0, 0]}
            scale={[1.54, 1, 1.08]}
          >
            <mesh
              name="Path26"
              geometry={nodes.Path26.geometry}
              material={materials["Path26 Material"]}
              castShadow
              receiveShadow
              position={[-9.73, 6.54, 15.11]}
              rotation={[-1.65, 0.06, 0.01]}
              scale={[0.62, 0.95, 1.03]}
            />
            <mesh
              name="Cube 242"
              geometry={nodes["Cube 242"].geometry}
              material={materials["Cube 242 Material"]}
              castShadow
              receiveShadow
              position={[0, 4.28, -0.2]}
              rotation={[-0.09, 0, 0]}
              scale={[1, 1.01, 0.68]}
            />
            <mesh
              name="Cube37"
              geometry={nodes.Cube37.geometry}
              material={materials["Cube37 Material"]}
              castShadow
              receiveShadow
              position={[0, -7.79, 0.65]}
              rotation={[0.1, 0, 0]}
              scale={[1, 1, 0.69]}
            />
          </group>
          <mesh
            name="Polaroid Frame26"
            geometry={nodes["Polaroid Frame26"].geometry}
            material={materials["Polaroid Frame26 Material"]}
            castShadow
            receiveShadow
            position={[0, -10.71, 0]}
            rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
            scale={1}
          />
        </group>
        <group
          name="8thPic2"
          position={[386.32, -16.01, 0.86]}
          rotation={[Math.PI / 2, 0.04, 0]}
          scale={0.35}
        >
          <group
            name="Paper Clip27"
            position={[-50.67, -1.28, -194.67]}
            rotation={[-0.01, -0.16, 0]}
            scale={[1.54, 1, 1.08]}
          >
            <mesh
              name="Path27"
              geometry={nodes.Path27.geometry}
              material={materials["Path27 Material"]}
              castShadow
              receiveShadow
              position={[-9.73, 6.54, 15.11]}
              rotation={[-1.65, 0.06, 0.01]}
              scale={[0.62, 0.95, 1.03]}
            />
            <mesh
              name="Cube 243"
              geometry={nodes["Cube 243"].geometry}
              material={materials["Cube 243 Material"]}
              castShadow
              receiveShadow
              position={[0, 4.37, 0.63]}
              rotation={[-0.09, 0, 0]}
              scale={[1, 1.01, 0.68]}
            />
            <mesh
              name="Cube38"
              geometry={nodes.Cube38.geometry}
              material={materials["Cube38 Material"]}
              castShadow
              receiveShadow
              position={[0, -7.79, 0.65]}
              rotation={[0.1, 0, 0]}
              scale={[1, 1, 0.69]}
            />
          </group>
          <mesh
            name="Polaroid Frame27"
            geometry={nodes["Polaroid Frame27"].geometry}
            material={materials["Polaroid Frame27 Material"]}
            castShadow
            receiveShadow
            position={[-64.24, -10.71, 0]}
            rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
            scale={1}
          />
        </group>
        <group
          name="9thPic2"
          position={[487.85, 4.62, 0.73]}
          rotation={[Math.PI / 2, 0.07, 0]}
          scale={0.35}
        >
          <group
            name="Paper Clip28"
            position={[-32.21, -1.63, -188.22]}
            rotation={[-0.06, 0.13, 0.01]}
            scale={[1.54, 1, 1.08]}
          >
            <mesh
              name="Path28"
              geometry={nodes.Path28.geometry}
              material={materials["Path28 Material"]}
              castShadow
              receiveShadow
              position={[-9.73, 6.54, 15.11]}
              rotation={[-1.65, 0.06, 0.01]}
              scale={[0.62, 0.95, 1.03]}
            />
            <mesh
              name="Cube 244"
              geometry={nodes["Cube 244"].geometry}
              material={materials["Cube 244 Material"]}
              castShadow
              receiveShadow
              position={[0, 5.29, 0.42]}
              rotation={[-0.08, 0, 0]}
              scale={[1, 1.01, 0.68]}
            />
            <mesh
              name="Cube39"
              geometry={nodes.Cube39.geometry}
              material={materials["Cube39 Material"]}
              castShadow
              receiveShadow
              position={[0, -7.79, 0.65]}
              rotation={[0.14, 0, 0]}
              scale={[1, 1, 0.69]}
            />
          </group>
          <mesh
            name="Polaroid Frame28"
            geometry={nodes["Polaroid Frame28"].geometry}
            material={materials["Polaroid Frame28 Material"]}
            castShadow
            receiveShadow
            position={[0, -10.71, 0]}
            rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
            scale={1}
          />
        </group>
      </group>
    </group>
  );
}
