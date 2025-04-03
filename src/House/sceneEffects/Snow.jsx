import { useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { MODEL_BASE_POSITION } from "../../utils/constants";

export default function Snow() {
  // Create snow particles
  const [snowParticles] = useState(() => {
    const NUM_PARTICLES = 200;
    const SPREAD_RANGE = 8000;
    const HEIGHT_RANGE = 2000;
    const ROOF_Y_POSITION = 3646.42;
    const BASE_Y_POSITION = MODEL_BASE_POSITION.y - 1009.82;
    const particles = new Array(NUM_PARTICLES).fill().map(() => ({
      position: new THREE.Vector3(
        Math.random() * SPREAD_RANGE - SPREAD_RANGE / 2 + MODEL_BASE_POSITION.x,
        Math.random() * (HEIGHT_RANGE + ROOF_Y_POSITION) + BASE_Y_POSITION,
        Math.random() * SPREAD_RANGE - SPREAD_RANGE / 2 + MODEL_BASE_POSITION.z
      ),
      velocity: Math.random() * 4 + 1,
    }));
    return particles;
  });

  // Create points geometry for snow
  const snowGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(snowParticles.length * 3);

    snowParticles.forEach((particle, i) => {
      positions[i * 3] = particle.position.x;
      positions[i * 3 + 1] = particle.position.y;
      positions[i * 3 + 2] = particle.position.z;
    });

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, []);

  // Animation loop for snow
  useFrame(() => {
    const ROOF_Y_POSITION = 3646.42;
    const BASE_Y_POSITION = MODEL_BASE_POSITION.y - 1009.82;
    const SNOW_RESET_OFFSET = 2000;
    const SPREAD_RANGE = 8000;

    // House dimensions calculated from sides+base.jsx
    const HOUSE_BOUNDS = {
      minX: MODEL_BASE_POSITION.x,
      maxX: MODEL_BASE_POSITION.x + 1138.54,
      minZ: MODEL_BASE_POSITION.z - 970.68,
      maxZ: MODEL_BASE_POSITION.z,
    };

    snowParticles.forEach((particle) => {
      particle.position.y -= particle.velocity;

      const isWithinHouseBounds =
        particle.position.x >= HOUSE_BOUNDS.minX &&
        particle.position.x <= HOUSE_BOUNDS.maxX &&
        particle.position.z >= HOUSE_BOUNDS.minZ &&
        particle.position.z <= HOUSE_BOUNDS.maxZ;

      if (
        (isWithinHouseBounds && particle.position.y < ROOF_Y_POSITION) ||
        (!isWithinHouseBounds && particle.position.y < BASE_Y_POSITION)
      ) {
        particle.position.x =
          Math.random() * SPREAD_RANGE -
          SPREAD_RANGE / 2 +
          MODEL_BASE_POSITION.x;
        particle.position.y = ROOF_Y_POSITION + SNOW_RESET_OFFSET;
        particle.position.z =
          Math.random() * SPREAD_RANGE -
          SPREAD_RANGE / 2 +
          MODEL_BASE_POSITION.z;
      }
    });

    const positions = snowGeometry.attributes.position.array;
    snowParticles.forEach((particle, i) => {
      positions[i * 3] = particle.position.x;
      positions[i * 3 + 1] = particle.position.y;
      positions[i * 3 + 2] = particle.position.z;
    });
    snowGeometry.attributes.position.needsUpdate = true;
  });

  return (
    <points>
      <primitive object={snowGeometry} />
      <pointsMaterial
        size={4}
        color="#ffffff"
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
}
