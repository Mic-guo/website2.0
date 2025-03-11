import React, { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, SpotLight } from "@react-three/drei";
import * as THREE from "three";
import { useControlsStore } from "../stores/controlsStore";

// Lighting component to replace the original lighting setup
function Lighting({ spotlightMode = false }) {
  return (
    <>
      {spotlightMode ? (
        <>
          <directionalLight
            position={[0, 0, 15]}
            intensity={0.3}
            color="#f6f3ef"
          />
          <ambientLight intensity={1} color="#f6f3ef" />
        </>
      ) : (
        <>
          <ambientLight intensity={1} />
          <directionalLight
            position={[5, 5, 5]}
            intensity={1}
            // castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
        </>
      )}
    </>
  );
}

// Camera setup component
function CameraSetup() {
  const { camera } = useThree();

  React.useEffect(() => {
    camera.position.z = 10;
  }, [camera]);

  return null;
}

// Main Scene component that replaces SceneManager
function Scene({ devMode = false, children }) {
  const { setControlsRef, enableRotate } = useControlsStore();

  return (
    <Canvas
      style={{ background: "#f0ebe5" }}
      camera={{ fov: 75, near: 0.1, far: 1000 }}
      {...(!devMode && {
        gl: {
          pixelRatio: window.devicePixelRatio,
          physicallyCorrectLights: true,
          shadowMap: {
            enabled: true,
            type: THREE.PCFSoftShadowMap,
          },
          outputEncoding: THREE.sRGBEncoding,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1,
        },
      })}
    >
      <CameraSetup />
      <Lighting />
      <OrbitControls
        ref={setControlsRef}
        enableDamping
        dampingFactor={0.08}
        rotateSpeed={0.4}
        enableRotate={enableRotate}
        enablePan={false}
        maxPolarAngle={(Math.PI * 5) / 6}
        minPolarAngle={Math.PI / 6}
        maxAzimuthAngle={Math.PI / 3}
        minAzimuthAngle={-(Math.PI / 3)}
      />
      {children}
    </Canvas>
  );
}

// // Mouse tracking hook to replace the original mouse tracking functionality
// export function useMouseTracking() {
//   const mouseRef = useRef(new THREE.Vector2());
//   const targetMouseRef = useRef(new THREE.Vector2());
//   const lerpFactor = useRef(1);

//   const updateMousePosition = React.useCallback((event) => {
//     targetMouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
//     targetMouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
//   }, []);

//   useFrame(() => {
//     mouseRef.current.x +=
//       (targetMouseRef.current.x - mouseRef.current.x) * lerpFactor.current;
//     mouseRef.current.y +=
//       (targetMouseRef.current.y - mouseRef.current.y) * lerpFactor.current;
//   });

//   return {
//     mouse: mouseRef.current,
//     updateMousePosition,
//   };
// }

export default Scene;
