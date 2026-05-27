import { useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { MODEL_BASE_POSITION } from "../../utils/constants";
import useDebugStore from "../../stores/debugStore";

export default function Snow() {
  const { count, size, color, opacity, spreadRange, heightRange } =
    useDebugStore((s) => s.snow);

  // Particle list + geometry are derived from count/spreadRange/heightRange so
  // they rebuild whenever the user tweaks those. The arrays are mutated in
  // useFrame for animation, so they need to be wholly recreated on resize.
  const snowParticles = useMemo(() => {
    const ROOF_Y_POSITION = 3646.42;
    const BASE_Y_POSITION = MODEL_BASE_POSITION.y - 1009.82;
    return new Array(count).fill().map(() => ({
      position: new THREE.Vector3(
        Math.random() * spreadRange - spreadRange / 2 + MODEL_BASE_POSITION.x,
        Math.random() * (heightRange + ROOF_Y_POSITION) + BASE_Y_POSITION,
        Math.random() * spreadRange - spreadRange / 2 + MODEL_BASE_POSITION.z
      ),
      velocity: Math.random() * 4 + 1,
    }));
  }, [count, spreadRange, heightRange]);

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
  }, [snowParticles]);

  // Animation loop for snow
  useFrame(() => {
    const ROOF_Y_POSITION = 3646.42;
    const BASE_Y_POSITION = MODEL_BASE_POSITION.y - 1009.82;
    const SNOW_RESET_OFFSET = 2000;

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
          Math.random() * spreadRange -
          spreadRange / 2 +
          MODEL_BASE_POSITION.x;
        particle.position.y = ROOF_Y_POSITION + SNOW_RESET_OFFSET;
        particle.position.z =
          Math.random() * spreadRange -
          spreadRange / 2 +
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
        size={size}
        color={color}
        transparent
        opacity={opacity}
        sizeAttenuation
      />
    </points>
  );
}
