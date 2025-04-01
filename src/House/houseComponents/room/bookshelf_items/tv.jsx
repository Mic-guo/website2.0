import { forwardRef, useEffect } from "react";
import useHoverStore from "../../../../stores/hoverStore";
import gsap from "gsap";

const Tv = forwardRef(function Tv({ nodes, materials }, ref) {
  const { hoveredItem } = useHoverStore();
  const isHovered = hoveredItem === "tv";

  useEffect(() => {
    if (ref.current) {
      gsap.to(ref.current.scale, {
        x: 1.31 * (isHovered ? 1.1 : 1),
        y: 1.18 * (isHovered ? 1.1 : 1),
        z: 1.31 * (isHovered ? 1.1 : 1),
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, [isHovered, ref]);

  return (
    <group
      ref={ref}
      name="tv"
      position={[0, 159.25, 2.52]}
      scale={[1.31, 1.18, 1.31]}
    >
      <mesh
        name="Text1"
        geometry={nodes.Text1.geometry}
        material={materials["Text1 Material"]}
        castShadow
        receiveShadow
        position={[16.69, 59.23, 12.4]}
        scale={0.36}
      />
      <group name="screws" position={[-2.66, 39.16, -34.59]}>
        <mesh
          name="Sphere 3"
          geometry={nodes["Sphere 3"].geometry}
          castShadow
          receiveShadow
          position={[-18.42, -16.8, 0]}
          rotation={[-Math.PI, 0, -Math.PI]}
          scale={[0.09, 0.09, 0.03]}
        />
        <mesh
          name="Sphere 2"
          geometry={nodes["Sphere 2"].geometry}
          castShadow
          receiveShadow
          position={[-18.42, 16.8, 0]}
          rotation={[-Math.PI, 0, -Math.PI]}
          scale={[0.09, 0.09, 0.03]}
        />
        <mesh
          name="Sphere 31"
          geometry={nodes["Sphere 31"].geometry}
          castShadow
          receiveShadow
          position={[18.42, -16.8, 0]}
          rotation={[-Math.PI, 0, -Math.PI]}
          scale={[0.09, 0.09, 0.03]}
        />
        <mesh
          name="Sphere1"
          geometry={nodes.Sphere1.geometry}
          castShadow
          receiveShadow
          position={[18.42, 16.8, 0]}
          rotation={[-Math.PI, 0, -Math.PI]}
          scale={[0.09, 0.09, 0.03]}
        />
      </group>
      <group
        name="arm"
        position={[-2.53, 39.19, -11.55]}
        scale={[1, 1.02, 0.68]}
      >
        <mesh
          name="Cube 36"
          geometry={nodes["Cube 36"].geometry}
          material={materials.greydarker}
          castShadow
          receiveShadow
          position={[0, 12.48, 29.34]}
          rotation={[Math.PI, 0, -Math.PI]}
          scale={0.18}
        />
        <mesh
          name="Cube 64"
          geometry={nodes["Cube 64"].geometry}
          material={materials.greydarker}
          castShadow
          receiveShadow
          position={[0, 12.48, 30.98]}
          rotation={[0, 0, 0]}
          scale={[0.94, 0.94, 0.02]}
        />
        <mesh
          name="Cube 53"
          geometry={nodes["Cube 53"].geometry}
          material={materials.greydarker}
          castShadow
          receiveShadow
          position={[0, -7.19, -9.61]}
          rotation={[-1.23, 0, Math.PI]}
          scale={[0.11, 0.66, 0.1]}
        />
        <mesh
          name="Cube 42"
          geometry={nodes["Cube 42"].geometry}
          material={materials.greydarker}
          castShadow
          receiveShadow
          position={[0, -1.19, 23.33]}
          rotation={[-2.53, 0, -Math.PI]}
          scale={[0.11, 0.66, 0.1]}
        />
        <mesh
          name="Cube 7"
          geometry={nodes["Cube 7"].geometry}
          material={materials.greydarker}
          castShadow
          receiveShadow
          position={[0, 0, -35.24]}
          rotation={[0, 0, 0]}
          scale={[0.79, 0.79, 0.02]}
        />
      </group>
      <mesh
        name="screen"
        geometry={nodes.screen.geometry}
        material={materials.screen}
        castShadow
        receiveShadow
        position={[0, 56.16, 11.91]}
        rotation={[0, 0, 0]}
        scale={[0.56, 0.52, 0]}
      />
      <mesh
        name="body2"
        geometry={nodes.body2.geometry}
        material={materials.black}
        castShadow
        receiveShadow
        position={[0, 56.16, 10.04]}
        rotation={[0, 0, 0]}
        scale={[0.57, 0.53, 0.01]}
      />
    </group>
  );
});

export default Tv;
