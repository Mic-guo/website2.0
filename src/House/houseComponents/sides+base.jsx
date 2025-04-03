import { OffWhiteWallMaterial, WarmOffWhiteMaterial } from "./materials";

export default function SidesBase({ nodes }) {
  return (
    <group name="Sides + base" position={[39.23, 2427.88, 306.66]}>
      <mesh
        name="Rectangle1"
        geometry={nodes.Rectangle1.geometry}
        castShadow
        receiveShadow
        position={[-29.61, -1009.82, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <WarmOffWhiteMaterial />
      </mesh>
      <mesh
        name="Side wall 2"
        geometry={nodes["Side wall 2"].geometry}
        castShadow
        receiveShadow
        position={[1138.54, -270.31, 0]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[3.25, 2.75, 3.36]}
      >
        <OffWhiteWallMaterial />
      </mesh>
      <mesh
        name="Side wall"
        geometry={nodes["Side wall"].geometry}
        castShadow
        receiveShadow
        position={[0, -270.31, -970.68]}
        rotation={[Math.PI, 0, -Math.PI]}
        scale={[3.25, 2.75, 3.36]}
      >
        <OffWhiteWallMaterial />
      </mesh>
    </group>
  );
}
