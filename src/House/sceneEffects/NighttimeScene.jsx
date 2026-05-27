import { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import useDebugStore from "../../stores/debugStore";

// Nighttime sky with stars
export const NighttimeSky = () => {
  const { scene } = useThree();
  const { stop1, stop2, stop3 } = useDebugStore((s) => s.nightSky);

  useEffect(() => {
    // Create a texture to hold our gradient
    const size = 512;
    const canvas = document.createElement("canvas");
    canvas.width = 1;
    canvas.height = size;
    const context = canvas.getContext("2d");

    // Create gradient - dark blue to black
    const gradient = context.createLinearGradient(0, 0, 0, size);
    gradient.addColorStop(stop1.offset, stop1.color);
    gradient.addColorStop(stop2.offset, stop2.color);
    gradient.addColorStop(stop3.offset, stop3.color);

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
  }, [
    scene,
    stop1.offset,
    stop1.color,
    stop2.offset,
    stop2.color,
    stop3.offset,
    stop3.color,
  ]);

  return null;
};

// Stars component with twinkling effect
export const Stars = () => {
  const starsRef = useRef();
  const { count, sizeMin, sizeMax, color } = useDebugStore((s) => s.stars);

  useEffect(() => {
    const container = starsRef.current;
    if (!container) return;

    const created = [];
    const sizeRange = sizeMax - sizeMin;

    for (let i = 0; i < count; i++) {
      const starGeometry = new THREE.BufferGeometry();
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI * 0.5;
      const radius = 8000 + Math.random() * 1000;

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.cos(phi);
      const z = radius * Math.sin(phi) * Math.sin(theta);

      starGeometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute([x, y, z], 3)
      );

      const starMaterial = new THREE.PointsMaterial({
        color: new THREE.Color(color),
        transparent: false,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
        size: Math.random() * sizeRange + sizeMin,
      });

      const star = new THREE.Points(starGeometry, starMaterial);
      container.add(star);
      created.push(star);
    }

    return () => {
      created.forEach((star) => {
        container.remove(star);
        star.geometry.dispose();
        star.material.dispose();
      });
    };
  }, [count, sizeMin, sizeMax, color]);

  return <group ref={starsRef} />;
};

// Moon component
// eslint-disable-next-line no-unused-vars
const Moon = () => {
  const moonRef = useRef();

  useEffect(() => {
    const moonGeometry = new THREE.SphereGeometry(750, 750, 750);
    const moonMaterial = new THREE.MeshStandardMaterial({
      color: 0xf4f4ff,
      emissive: 0x555566,
      roughness: 0.5,
    });

    const moon = new THREE.Mesh(moonGeometry, moonMaterial);
    moon.position.set(3000, 5000, -5000);

    moonRef.current.add(moon);

    // Moon glow effect
    const glowGeometry = new THREE.SphereGeometry(90, 32, 32);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0xaaaaff,
      transparent: true,
      opacity: 0.3,
    });

    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    moon.add(glow);

    return () => {
      moonGeometry.dispose();
      moonMaterial.dispose();
      glowGeometry.dispose();
      glowMaterial.dispose();
    };
  }, []);

  return <group ref={moonRef} />;
};

// Nighttime lighting component
const NightLighting = () => {
  const { ambient, directional } = useDebugStore((s) => s.nightLighting);
  return (
    <>
      <ambientLight intensity={ambient.intensity} color={ambient.color} />
      <directionalLight
        intensity={directional.intensity}
        position={directional.position}
        color={directional.color}
        castShadow
      />
    </>
  );
};

export const NightMode = () => {
  return (
    <>
      <NighttimeSky />
      <Stars />
      {/* <Moon /> */}
      <NightLighting />
    </>
  );
};
