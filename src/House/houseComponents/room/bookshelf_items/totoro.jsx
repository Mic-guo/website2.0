export default function Totoro({ nodes, materials }) {
  return (
    <group name="Totoro " position={[-182.9, 35.99, -9.81]} scale={0.22}>
      <group
        name="Umbrella"
        position={[19.47, 209.03, 35.49]}
        rotation={[-0.14, 0, 0]}
        scale={0.6}
      >
        <mesh
          name="Sphere 21"
          geometry={nodes["Sphere 21"].geometry}
          material={materials[""]}
          castShadow
          receiveShadow
          position={[2.51, 33.94, 0]}
          rotation={[0, 0, 0]}
          scale={1}
        />
        <mesh
          name="Sphere2"
          geometry={nodes.Sphere2.geometry}
          material={materials[""]}
          castShadow
          receiveShadow
          position={[2.51, 37.38, 0]}
          rotation={[0, 0, 0]}
          scale={1}
        />
        <mesh
          name="Cylinder 24"
          geometry={nodes["Cylinder 24"].geometry}
          material={materials["Cylinder 24 Material"]}
          castShadow
          receiveShadow
          position={[0.72, 12.19, 0.21]}
          rotation={[0, -0.44, 0]}
          scale={0.8}
        >
          <mesh
            name="Torus2"
            geometry={nodes.Torus2.geometry}
            material={materials["Torus2 Material"]}
            castShadow
            receiveShadow
            position={[-17.92, -19.18, -7.28]}
            rotation={[Math.PI, 0.4, -Math.PI / 2]}
            scale={1}
          />
        </mesh>
        <mesh
          name="Cylinder3"
          geometry={nodes.Cylinder3.geometry}
          material={materials["Cylinder3 Material"]}
          castShadow
          receiveShadow
          position={[0.72, 132.47, 0.21]}
        />
      </group>
      <group name="Totoro" position={[0, 159.35, -42.16]} scale={0.58}>
        <mesh
          name="Cylinder 25"
          geometry={nodes["Cylinder 25"].geometry}
          material={materials["Cylinder 25 Material"]}
          castShadow
          receiveShadow
          position={[-56.3, -181.84, -14.55]}
        />
        <mesh
          name="Cylinder4"
          geometry={nodes.Cylinder4.geometry}
          material={materials["Cylinder4 Material"]}
          castShadow
          receiveShadow
          position={[58.26, -181.84, -14.55]}
        />
        <group
          name="Empty Object 14"
          position={[-5.17, 156.79, 70.6]}
          scale={[1.18, 0.71, 0.31]}
        >
          <mesh
            name="Pyramid 3"
            geometry={nodes["Pyramid 3"].geometry}
            material={materials["Pyramid 3 Material"]}
            castShadow
            receiveShadow
            position={[2.54, -2.91, 1.47]}
            rotation={[0, Math.PI / 3, -Math.PI]}
            scale={1}
          />
        </group>
        <group
          name="Empty Object 13"
          position={[-5.17, 151.44, 70.6]}
          scale={[1.63, 1, 0.44]}
        >
          <mesh
            name="Pyramid 31"
            geometry={nodes["Pyramid 31"].geometry}
            material={materials["Pyramid 31 Material"]}
            castShadow
            receiveShadow
            position={[2.54, -2.91, 1.47]}
            rotation={[0, Math.PI / 3, -Math.PI]}
            scale={1}
          />
        </group>
        <mesh
          name="Merged Geometry2"
          geometry={nodes["Merged Geometry2"].geometry}
          material={materials["Merged Geometry2 Material"]}
          castShadow
          receiveShadow
          position={[-1.69, 12.6, 114.89]}
          scale={1.71}
        />
        <mesh
          name="Torus 5"
          geometry={nodes["Torus 5"].geometry}
          material={materials["Torus 5 Material"]}
          castShadow
          receiveShadow
          position={[41.07, 64.88, 130.48]}
          rotation={[-1.55, 0.65, 2.19]}
          scale={0.68}
        />
        <mesh
          name="Torus 4"
          geometry={nodes["Torus 4"].geometry}
          material={materials["Torus 4 Material"]}
          castShadow
          receiveShadow
          position={[40.09, 74.5, 135.4]}
          rotation={[-1.55, 0.65, 2.19]}
          scale={0.68}
        />
        <mesh
          name="Torus 7"
          geometry={nodes["Torus 7"].geometry}
          material={materials["Torus 7 Material"]}
          castShadow
          receiveShadow
          position={[38.91, 92.12, 131.61]}
          rotation={[-2.11, 0.35, 2.47]}
          scale={[0.68, 0.68, 0.69]}
        />
        <mesh
          name="Torus 3"
          geometry={nodes["Torus 3"].geometry}
          material={materials["Torus 3 Material"]}
          castShadow
          receiveShadow
          position={[37.54, 86.3, 136.04]}
          rotation={[-1.9, 0.55, 2.39]}
          scale={0.68}
        />
        <mesh
          name="Torus 6"
          geometry={nodes["Torus 6"].geometry}
          material={materials["Torus 6 Material"]}
          castShadow
          receiveShadow
          position={[37.76, 90.22, 135.78]}
          rotation={[1.16, -0.33, 1.97]}
          scale={[0.68, 0.68, 0.69]}
        />
        <mesh
          name="Torus3"
          geometry={nodes.Torus3.geometry}
          material={materials["Torus3 Material"]}
          castShadow
          receiveShadow
          position={[40.92, 85.49, 37.01]}
          rotation={[-1.57, 0.65, -2.83]}
          scale={1}
        />
        <mesh
          name="Lathe 2"
          geometry={nodes["Lathe 2"].geometry}
          material={materials["Lathe 2 Material"]}
          castShadow
          receiveShadow
          position={[-141.04, -3.15, -19.82]}
          rotation={[0, 0, -0.16]}
          scale={[1, 2.6, 1]}
        />
        <mesh
          name="Sphere3"
          geometry={nodes.Sphere3.geometry}
          material={materials["Sphere3 Material"]}
          castShadow
          receiveShadow
          position={[-1.54, -72.22, 23.71]}
        />
        <mesh
          name="Pyramid 2"
          geometry={nodes["Pyramid 2"].geometry}
          material={materials["Pyramid 2 Material"]}
          castShadow
          receiveShadow
          position={[-18.62, 234.67, 21.51]}
          rotation={[0.34, -0.4, 0.32]}
          scale={1.13}
        />
        <mesh
          name="Pyramid"
          geometry={nodes.Pyramid.geometry}
          material={materials["Pyramid Material"]}
          castShadow
          receiveShadow
          position={[5.44, 227.01, 14.93]}
          rotation={[0.21, 0, 0]}
          scale={[1.14, 1.13, 1.13]}
        />
        <group name="Empty Object 3" position={[-64.35, 158.83, 57.49]}>
          <mesh
            name="Sphere 22"
            geometry={nodes["Sphere 22"].geometry}
            material={materials["Sphere 22 Material"]}
            castShadow
            receiveShadow
            position={[-0.31, 0.7, 8.94]}
            rotation={[-0.44, 0.23, 0]}
            scale={1}
          />
          <mesh
            name="Sphere4"
            geometry={nodes.Sphere4.geometry}
            material={materials["Sphere4 Material"]}
            castShadow
            receiveShadow
            rotation={[-0.44, 0.23, 0]}
            scale={1}
          />
        </group>
        <group name="Eye" position={[66.07, 158.83, 57.49]}>
          <mesh
            name="Sphere 23"
            geometry={nodes["Sphere 23"].geometry}
            material={materials["Sphere 23 Material"]}
            castShadow
            receiveShadow
            position={[-0.31, 0.7, 8.94]}
            rotation={[-0.44, 0.23, 0]}
            scale={1}
          />
          <mesh
            name="Sphere5"
            geometry={nodes.Sphere5.geometry}
            material={materials["Sphere5 Material"]}
            castShadow
            receiveShadow
            rotation={[-0.44, 0.23, 0]}
            scale={1}
          />
        </group>
        <group
          name="Empty Object 2"
          position={[-50.31, 204.16, -12.12]}
          rotation={[0.41, 0.15, 0.38]}
          scale={1}
        >
          <mesh
            name="Cone 2"
            geometry={nodes["Cone 2"].geometry}
            material={materials["Cone 2 Material"]}
            castShadow
            receiveShadow
            position={[-5.78, 11.76, 0]}
            rotation={[0, 0, -0.17]}
            scale={1}
          />
          <mesh
            name="Cone"
            geometry={nodes.Cone.geometry}
            material={materials["Cone Material"]}
            castShadow
            receiveShadow
            position={[0, 46, 0]}
            rotation={[0, 0, -0.17]}
          />
        </group>
        <group name="Empty Object" position={[69.72, 234.92, -12.12]}>
          <mesh
            name="Cone 21"
            geometry={nodes["Cone 21"].geometry}
            material={materials["Cone 21 Material"]}
            castShadow
            receiveShadow
            position={[-5.78, -20.74, 0]}
            rotation={[0, 0, -0.17]}
            scale={1}
          />
          <mesh
            name="Cone1"
            geometry={nodes.Cone1.geometry}
            material={materials["Cone1 Material"]}
            castShadow
            receiveShadow
            position={[0, 13.5, 0]}
            rotation={[0, 0, -0.17]}
          />
        </group>
        <mesh
          name="Lathe"
          geometry={nodes.Lathe.geometry}
          material={materials["Lathe Material"]}
          castShadow
          receiveShadow
          position={[0, -26.65, -16.72]}
          scale={[4.64, 4.63, 3.99]}
        />
      </group>
    </group>
  );
}
