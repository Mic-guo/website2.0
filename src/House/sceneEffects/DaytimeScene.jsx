import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import useDebugStore from "../../stores/debugStore";

// Sunset sky with gradient
export const SunsetSky = () => {
  const { scene } = useThree();
  const { stop1, stop2 } = useDebugStore((s) => s.daySky);

  useEffect(() => {
    // Create a texture to hold our gradient
    const size = 512;
    const canvas = document.createElement("canvas");
    canvas.width = 1;
    canvas.height = size;
    const context = canvas.getContext("2d");

    // Create gradient
    const gradient = context.createLinearGradient(0, 0, 0, size);

    gradient.addColorStop(stop1.offset, stop1.color);
    gradient.addColorStop(stop2.offset, stop2.color);

    // Apply gradient to canvas
    context.fillStyle = gradient;
    context.fillRect(0, 0, 1, size);

    // Create texture from canvas
    const texture = new THREE.CanvasTexture(
      canvas,
      THREE.UVMapping,
      THREE.ClampToEdgeWrapping,
      THREE.ClampToEdgeWrapping,
      THREE.LinearFilter,
      THREE.LinearFilter
    );

    // Store current background
    const oldBackground = scene.background;

    // Set the new background
    scene.background = texture;

    // Clean up
    return () => {
      scene.background = oldBackground;
      texture.dispose();
    };
  }, [scene, stop1.offset, stop1.color, stop2.offset, stop2.color]);

  return null;
};

// Daytime lighting component
const DayLighting = () => {
  const { ambient, directional, point } = useDebugStore((s) => s.dayLighting);
  return (
    <>
      <ambientLight intensity={ambient.intensity} color={ambient.color} />
      <directionalLight
        intensity={directional.intensity}
        position={directional.position}
        color={directional.color}
        castShadow
      />
      <pointLight
        intensity={point.intensity}
        position={point.position}
        color={point.color}
      />
    </>
  );
};

export const DayMode = () => {
  return (
    <>
      <SunsetSky />
      <DayLighting />
    </>
  );
};
