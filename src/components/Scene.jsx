import React, { useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, SpotLight } from "@react-three/drei";
import * as THREE from "three";

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

function Wind() {
  const mousePos = useRef({ x: 0, y: 0 });
  const lastMousePos = useRef({ x: 0, y: 0 });
  const windForce = useRef({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      // Update current mouse position
      mousePos.current = {
        x: event.clientX,
        y: event.clientY,
      };

      // Calculate mouse movement direction
      const deltaX = mousePos.current.x - lastMousePos.current.x;
      const deltaY = mousePos.current.y - lastMousePos.current.y;

      // Only update wind if there's movement
      if (deltaX !== 0 || deltaY !== 0) {
        // Calculate the magnitude of the movement
        const magnitude = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        // Normalize the direction and apply constant force
        const constantForce = 0.01; // Adjust this to set the constant wind strength
        windForce.current = {
          x: (deltaX / magnitude) * constantForce,
          y: (deltaY / magnitude) * constantForce * 0.2, // Reduced vertical effect
          z: (deltaX / magnitude) * constantForce * 0.3, // Add some depth movement
        };

        // Dispatch wind force
        window.dispatchEvent(
          new CustomEvent("wind-update", {
            detail: windForce.current,
          })
        );
      }

      // Store current position as last position
      lastMousePos.current = { ...mousePos.current };
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Add wind decay
  useFrame(() => {
    // Gradually reduce wind force when mouse isn't moving
    const decay = 0.95;
    windForce.current = {
      x: windForce.current.x * decay,
      y: windForce.current.y * decay,
      z: windForce.current.z * decay,
    };

    // Only dispatch if there's still significant force
    if (
      Math.abs(windForce.current.x) > 0.001 ||
      Math.abs(windForce.current.y) > 0.001 ||
      Math.abs(windForce.current.z) > 0.001
    ) {
      window.dispatchEvent(
        new CustomEvent("wind-update", {
          detail: windForce.current,
        })
      );
    }
  });

  return null;
}

// Main Scene component that replaces SceneManager
function Scene({ devMode = false, children }) {
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
        enableDamping
        dampingFactor={0.08}
        rotateSpeed={0.4}
        enablePan={false}
        maxPolarAngle={(Math.PI * 5) / 6} // 120 degrees from top
        minPolarAngle={Math.PI / 6} // 120 degrees from bottom // Can't look below 120degrees
        maxAzimuthAngle={Math.PI / 3} // 60 degrees right
        minAzimuthAngle={-(Math.PI / 3)} // 60 degrees left
      />
      <Wind />
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
