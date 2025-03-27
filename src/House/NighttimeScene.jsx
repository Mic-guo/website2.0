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
    gradient.addColorStop(0, "#0B0B3B"); // Very dark blue
    gradient.addColorStop(0.3, "#0F1E45"); // Dark blue
    gradient.addColorStop(0.7, "#1A1A40"); // Deep navy

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
  const starCount = 200;

  useEffect(() => {
    // Create stars
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = [];
    const starSizes = [];

    for (let i = 0; i < starCount; i++) {
      // Random positions in hemisphere above scene (oriented along y-axis)
      const theta = Math.random() * Math.PI * 2; // Full circle in xz plane
      const phi = Math.random() * Math.PI * 0.5; // Half circle (hemisphere) from y-axis
      const radius = 6000 + Math.random() * 1000;

      // Correct orientation to place stars in the upper hemisphere
      // In THREE.js, Y is typically the up axis, so we make sure stars are in +Y hemisphere
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.cos(phi); // This ensures y is always positive (upper hemisphere)
      const z = radius * Math.sin(phi) * Math.sin(theta);

      starPositions.push(x, y, z);

      // Random sizes for twinkling effect
      starSizes.push(Math.random() * 3 + 1);
    }

    starGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(starPositions, 3)
    );
    starGeometry.setAttribute(
      "size",
      new THREE.Float32BufferAttribute(starSizes, 1)
    );

    // Star material with custom shader for twinkling
    const starMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 2,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    // Create the particle system
    const stars = new THREE.Points(starGeometry, starMaterial);
    starsRef.current.add(stars);

    return () => {
      starGeometry.dispose();
      starMaterial.dispose();
    };
  }, []);

  // Animate stars twinkling
  useFrame(({ clock }) => {
    if (starsRef.current) {
      const time = clock.getElapsedTime();
      const stars = starsRef.current.children[0];

      if (stars && stars.geometry.attributes.size) {
        const sizes = stars.geometry.attributes.size;

        for (let i = 0; i < starCount; i++) {
          // Make stars twinkle by adjusting their size based on time
          const initialSize = Math.random() * 3 + 1;
          const variation = Math.sin(time * 3 + i * 0.2) * 0.5 + 0.5;
          sizes.array[i] = initialSize * (0.8 + variation * 0.4);
        }

        sizes.needsUpdate = true;
      }
    }
  });

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
      <ambientLight intensity={0.05} color="#3A3A5C" />
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
      <Moon />
      <NightLighting />
    </>
  );
};
