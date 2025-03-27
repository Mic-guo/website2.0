import * as THREE from "three";

export default function Camera({ nodes, materials }) {
  return (
    <group
      name="camera"
      position={[30.46, 52.59, -19.52]}
      scale={[0.13, 0.12, 0.13]}
    >
      <mesh
        name="buttonback2"
        geometry={nodes.buttonback2.geometry}
        material={new THREE.MeshStandardMaterial({ color: "#333333" })}
        castShadow
        receiveShadow
        position={[-130.69, -4.92, -175.66]}
        rotation={[Math.PI / 2, 0, -Math.PI]}
        scale={1}
      />
      <mesh
        name="buttonback1"
        geometry={nodes.buttonback1.geometry}
        material={new THREE.MeshStandardMaterial({ color: "#333333" })}
        castShadow
        receiveShadow
        position={[-130.69, 45.92, -175.66]}
        rotation={[Math.PI / 2, 0, -Math.PI]}
        scale={1}
      />
      <mesh
        name="contornscreen"
        geometry={nodes.contornscreen.geometry}
        material={new THREE.MeshStandardMaterial({ color: "#222222" })}
        castShadow
        receiveShadow
        position={[27.92, -2.77, -179.48]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={1.02}
      />
      <mesh
        name="screen1"
        geometry={nodes.screen1.geometry}
        material={
          new THREE.MeshStandardMaterial({
            color: "#111111",
            emissive: "#222222",
            emissiveIntensity: 0.5,
          })
        }
        castShadow
        receiveShadow
        position={[27.92, -2.77, -183.19]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={0.91}
      />
      <mesh
        name="camera1"
        geometry={nodes.camera1.geometry}
        material={
          new THREE.MeshStandardMaterial({
            color: "#111111",
            metalness: 0.7,
            roughness: 0.2,
          })
        }
        castShadow
        receiveShadow
        position={[0, -10.58, -73.48]}
        scale={[1.08, 1, 1]}
      />
      <mesh
        name="lens"
        geometry={nodes.lens.geometry}
        material={
          new THREE.MeshStandardMaterial({
            color: "#000000",
            metalness: 0.8,
            roughness: 0.1,
          })
        }
        castShadow
        receiveShadow
        position={[17.91, -8.88, 18.94]}
        rotation={[1.59, 0, 0]}
      />
      <mesh
        name="focus"
        geometry={nodes.focus.geometry}
        material={
          new THREE.MeshStandardMaterial({
            color: "#222222",
            metalness: 0.6,
            roughness: 0.3,
          })
        }
        castShadow
        receiveShadow
        position={[17.91, -5.78, 60.23]}
        rotation={[1.59, 0, 0]}
      />
      <mesh
        name="glass"
        geometry={nodes.glass.geometry}
        material={
          new THREE.MeshPhysicalMaterial({
            color: "#ffffff",
            transmission: 0.9,
            transparent: true,
            roughness: 0.1,
          })
        }
        castShadow
        receiveShadow
        position={[19.41, -10.58, 124.88]}
      />
      <mesh
        name="baseflash"
        geometry={nodes.baseflash.geometry}
        material={new THREE.MeshStandardMaterial({ color: "#dddddd" })}
        castShadow
        receiveShadow
        position={[-135.77, 85.27, 36.73]}
        scale={[0.68, 0.68, 0.37]}
      />
      <mesh
        name="light"
        geometry={nodes.light.geometry}
        material={
          new THREE.MeshStandardMaterial({
            color: "#ffff99",
            emissive: "#ffff99",
            emissiveIntensity: 0.5,
          })
        }
        castShadow
        receiveShadow
        position={[155.65, 85.46, 28.83]}
        scale={0.68}
      />
      <mesh
        name="flash"
        geometry={nodes.flash.geometry}
        material={
          new THREE.MeshStandardMaterial({
            color: "#ffffff",
            emissive: "#ffffff",
            emissiveIntensity: 0.8,
          })
        }
        castShadow
        receiveShadow
        position={[-135.77, 85.46, 44.88]}
        scale={[0.68, 0.68, 0.37]}
      />
      <mesh
        name="button"
        geometry={nodes.button.geometry}
        material={new THREE.MeshStandardMaterial({ color: "#ff0000" })}
        castShadow
        receiveShadow
        position={[-115.73, 118.91, -73.48]}
        scale={1}
      />
    </group>
  );
}
