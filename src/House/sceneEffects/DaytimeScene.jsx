import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";

// Sunset sky with gradient
export const SunsetSky = () => {
  const { scene } = useThree();

  useEffect(() => {
    // Create a texture to hold our gradient
    const size = 512;
    const canvas = document.createElement("canvas");
    canvas.width = 1;
    canvas.height = size;
    const context = canvas.getContext("2d");

    // Create gradient
    const gradient = context.createLinearGradient(0, 0, 0, size);

    gradient.addColorStop(0.3, "#d1a658");
    gradient.addColorStop(0.6, "#fa874d");

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
  }, [scene]);

  return null;
};

// Daytime lighting component
const DayLighting = () => {
  return (
    <>
      <ambientLight intensity={0.2} color="#FFA07A" />
      <directionalLight
        intensity={0.4}
        position={[-10, 8, 10]}
        color="#FF7E5F"
        castShadow
      />
      <pointLight intensity={0.4} position={[-20, 10, -10]} color="#FFD700" />
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
