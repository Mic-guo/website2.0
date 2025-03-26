import React, { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, SpotLight } from "@react-three/drei";
import * as THREE from "three";
import { useControlsStore } from "../stores/controlsStore";
import { useTheme } from "../../context/ThemeContext";

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
          <ambientLight intensity={0.5} />
          <directionalLight
            position={[5, 5, 5]}
            intensity={0.5}
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
  const theme = useTheme();

  return (
    <Canvas
      className={theme.background}
      camera={{ fov: 75, near: 0.1, far: 1000 }}
      {...(!devMode && {
        gl: {
          pixelRatio: window.devicePixelRatio,
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
        enablePan={true}
        maxPolarAngle={(Math.PI * 5) / 6}
        minPolarAngle={Math.PI / 6}
        maxAzimuthAngle={Math.PI / 3}
        minAzimuthAngle={-(Math.PI / 3)}
      />
      {children}
    </Canvas>
  );
}

export default Scene;
