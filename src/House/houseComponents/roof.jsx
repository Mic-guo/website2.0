import {
  LightWoodMaterial,
  OffWhiteWallMaterial,
  StoneGrayMaterial,
  StoneGrayMetallicMaterial,
  LightStoneMaterial,
  RoofTerracottaMaterial,
  SnowWhiteMaterial,
  WarmOffWhiteMaterial,
} from "../utils/materials";
import ChimneySmoke from "./ChimneySmoke";

export default function Roof({ nodes }) {
  return (
    <group
      name="Roof layer"
      position={[12.89, 3646.42, 355.83]}
      scale={[3.28, 3.28, 3.37]}
    >
      <group
        name="Planks "
        position={[4.05, -518.58, 5.92]}
        scale={[0.99, 1.15, 1]}
      >
        <mesh
          name="Rectangle 10"
          geometry={nodes["Rectangle 10"].geometry}
          // castShadow
          receiveShadow
          position={[-321.89, 263.17, -139.93]}
          rotation={[Math.PI, Math.PI / 2, 0]}
          scale={1}
        >
          <LightWoodMaterial />
        </mesh>
        <mesh
          name="Rectangle 6"
          geometry={nodes["Rectangle 6"].geometry}
          // castShadow
          receiveShadow
          position={[-321.89, 263.17, 79.77]}
          rotation={[Math.PI, Math.PI / 2, 0]}
          scale={1}
        >
          <LightWoodMaterial />
        </mesh>
        <mesh
          name="Rectangle 61"
          geometry={nodes["Rectangle 61"].geometry}
          // castShadow
          receiveShadow
          position={[-321.89, 263.17, 314.76]}
          rotation={[Math.PI, Math.PI / 2, 0]}
          scale={1}
        >
          <LightWoodMaterial />
        </mesh>
        <mesh
          name="Rectangle 9"
          geometry={nodes["Rectangle 9"].geometry}
          receiveShadow
          position={[-322.44, 263.1, 339.76]}
          rotation={[-Math.PI, 0, 0]}
        >
          <LightWoodMaterial />
        </mesh>
      </group>
      <mesh
        name="Triangle Wall"
        geometry={nodes["Triangle Wall"].geometry}
        // castShadow
        receiveShadow
        position={[-107.01, -149.33, -305.44]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={[0.05, 0.05, 1]}
      >
        <OffWhiteWallMaterial />
      </mesh>
      <group name="Roof vent" position={[-82.04, 127.32, -242.9]}>
        <mesh
          name="Rectangle"
          geometry={nodes.Rectangle.geometry}
          // castShadow
          receiveShadow
          position={[0.34, 68.32, -0.32]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <StoneGrayMaterial />
        </mesh>
        <mesh
          name="Sphere"
          geometry={nodes.Sphere.geometry}
          // castShadow
          receiveShadow
          position={[0, 55.99, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <StoneGrayMetallicMaterial />
        </mesh>
        <mesh
          name="Cylinder 2"
          geometry={nodes["Cylinder 2"].geometry}
          // castShadow
          receiveShadow
          position={[0, 34.01, 0]}
        >
          <StoneGrayMaterial />
        </mesh>
        <mesh
          name="Cylinder"
          geometry={nodes.Cylinder.geometry}
          // castShadow
          receiveShadow
          position={[0, -8.53, 0]}
        >
          <StoneGrayMaterial />
        </mesh>
      </group>
      <group
        name="Chimney 2"
        position={[137.99, 84.17, -40.77]}
        scale={[0.75, 0.91, 0.74]}
      >
        <ChimneySmoke position={[0, 75, 0]} width={50} />
        <mesh
          name="Cube 3"
          geometry={nodes["Cube 3"].geometry}
          // castShadow
          receiveShadow
          position={[0, 74.2, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <StoneGrayMaterial />
        </mesh>
        <mesh
          name="Cube 2"
          geometry={nodes["Cube 2"].geometry}
          // castShadow
          receiveShadow
          position={[0, -18.76, 0]}
          rotation={[0.01, 0, 0]}
        >
          <StoneGrayMaterial />
        </mesh>
      </group>
      <group name="Roof" position={[0, -54.89, 0]}>
        <mesh
          name="Roof snow"
          geometry={nodes["Roof snow"].geometry}
          // castShadow
          receiveShadow
          position={[3.76, 8.73, -372.26]}
          scale={[1, 1, 3.95]}
        >
          <SnowWhiteMaterial />
        </mesh>
        <mesh
          name="Roof1"
          geometry={nodes.Roof1.geometry}
          // castShadow
          receiveShadow
          position={[0.03, -168.18, -0.77]}
          rotation={[0, -0.01, 0]}
          scale={1}
        >
          <RoofTerracottaMaterial />
        </mesh>
      </group>
      <group name="Chimney" position={[-198.72, 65.68, 153.66]}>
        <ChimneySmoke position={[0, 150, 0]} width={20} />
        <mesh
          name="Cube 5"
          geometry={nodes["Cube 5"].geometry}
          // castShadow
          receiveShadow
          position={[0.01, 169.08, 0.07]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <LightStoneMaterial />
        </mesh>
        <mesh
          name="Cube 4"
          geometry={nodes["Cube 4"].geometry}
          // castShadow
          receiveShadow
          position={[0, 119.01, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <LightStoneMaterial />
        </mesh>
        <mesh
          name="Cube 31"
          geometry={nodes["Cube 31"].geometry}
          // castShadow
          receiveShadow
          position={[0.01, 45.51, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <LightStoneMaterial />
        </mesh>
        <mesh
          name="Cube"
          geometry={nodes.Cube.geometry}
          // castShadow
          receiveShadow
          position={[0, -75.94, 0]}
          scale={[1, 1, 1.27]}
        >
          <LightStoneMaterial />
        </mesh>
      </group>
    </group>
  );
}
