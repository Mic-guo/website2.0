import { useEffect, useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Nighttime sky with stars
const NighttimeSky = () => {
  const { scene } = useThree();

  useEffect(() => {
    // Create a texture to hold our gradient
    const size = 512;
    const canvas = document.createElement("canvas");
    canvas.width = 1;
    canvas.height = size;
    const context = canvas.getContext("2d");

    // Create gradient - dark blue to black
    const gradient = context.createLinearGradient(0, 0, 0, size);
    gradient.addColorStop(0.01, "#030b1c"); // Dark blue
    gradient.addColorStop(0.6, "#0F1E45"); // light blue
    gradient.addColorStop(0.9, "#1A1A40"); // light purple

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

// Stars component with twinkling effect
const Stars = () => {
  const starsRef = useRef();
  const starCount = 100;

  useEffect(() => {
    for (let i = 0; i < starCount; i++) {
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
        color: 0xfbfec6,
        transparent: false,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
        size: Math.random() * 3 + 1, // Individual size for each star
      });

      const star = new THREE.Points(starGeometry, starMaterial);
      starsRef.current.add(star);
    }

    return () => {
      // Add null check before cleanup
      if (starsRef.current) {
        starsRef.current.children.forEach((star) => {
          star.geometry.dispose();
          star.material.dispose();
        });
      }
    };
  }, []);

  return <group ref={starsRef} />;
};

// Moon component
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
  return (
    <>
      <ambientLight intensity={0.15} color="#3A3A5C" />
      <directionalLight
        intensity={0.1}
        position={[-10, 8, 10]}
        color="#E0E8FF"
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
