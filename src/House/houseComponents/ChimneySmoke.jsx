import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function ChimneySmoke({ position, width }) {
  // Create references for the points and geometry
  const pointsRef = useRef();
  const positionArray = useRef();
  const scaleArray = useRef();
  const opacityArray = useRef();

  // Create particles data with many more particles for a fuller, more realistic smoke effect
  const particles = useRef(
    Array(100) // Significantly increased number of particles for wispy smoke effect
      .fill()
      .map(() => ({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * width, // Wide spread across chimney width
          Math.random() * 5, // Slight initial height variation for layered effect
          (Math.random() - 0.5) * width // Wide spread across chimney depth
        ),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.1, // More horizontal movement for billowing effect
          Math.random() * 0.2 + 0.05, // Variable upward speed for layered effect
          (Math.random() - 0.5) * 0.1 // More horizontal movement
        ),
        age: Math.random() * 2, // Random initial age for staggered appearance
        lifespan: Math.random() * 3 + 4, // Variable lifespan for each particle
        opacity: Math.random() * 0.3 + 0.7, // Varied initial opacity
        scale: Math.random() * 0.8 + 0.4, // Varied initial scale
        // Add curl factors for each particle to create swirling motion
        curlFactor: {
          x: Math.random() * 0.003 - 0.0015,
          y: Math.random() * 0.001,
          z: Math.random() * 0.003 - 0.0015,
        },
        // Add turbulence factor for natural smoke movement
        turbulence: Math.random() * 0.005 + 0.001,
      }))
  );

  // Wind direction that changes over time
  const windDirection = useRef({
    x: Math.random() * 0.01 - 0.005,
    z: Math.random() * 0.01 - 0.005,
    timeOffset: 0,
  });

  // Function to update array values from particles data
  const updateParticleArrays = () => {
    particles.current.forEach((particle, i) => {
      positionArray.current[i * 3] = particle.position.x;
      positionArray.current[i * 3 + 1] = particle.position.y;
      positionArray.current[i * 3 + 2] = particle.position.z;
      scaleArray.current[i] = particle.scale;
      opacityArray.current[i] = particle.opacity;
    });
  };

  // Initialize arrays for position, scale, and opacity
  useMemo(() => {
    positionArray.current = new Float32Array(particles.current.length * 3);
    scaleArray.current = new Float32Array(particles.current.length);
    opacityArray.current = new Float32Array(particles.current.length);

    // Set initial values
    updateParticleArrays();
  }, []);

  useFrame((state, delta) => {
    // Slowly change wind direction over time for natural effect
    windDirection.current.timeOffset += delta * 0.1;
    windDirection.current.x = Math.sin(windDirection.current.timeOffset) * 0.01;
    windDirection.current.z = Math.cos(windDirection.current.timeOffset) * 0.01;

    // Update particle data
    particles.current.forEach((particle, index) => {
      // Increment age
      particle.age += delta;

      // Early life - rising phase
      if (particle.age < particle.lifespan * 0.3) {
        // Strong upward movement in early life
        particle.velocity.y += (0.01 + Math.random() * 0.02) * delta;
      }
      // Mid life - more lateral drift
      else if (particle.age < particle.lifespan * 0.7) {
        // Reduced upward acceleration, more sideways movement
        particle.velocity.y += 0.005 * delta;

        // Add curl effect (swirling motion)
        particle.velocity.x +=
          Math.sin(particle.age * particle.curlFactor.x) * 0.01 * delta;
        particle.velocity.z +=
          Math.cos(particle.age * particle.curlFactor.z) * 0.01 * delta;
      }
      // Late life - dispersion and fading
      else {
        // Gradually slow down vertical movement
        particle.velocity.y *= 0.98;

        // More dispersion
        particle.velocity.x += (Math.random() - 0.5) * 0.02 * delta;
        particle.velocity.z += (Math.random() - 0.5) * 0.02 * delta;
      }

      // Apply wind effect
      particle.velocity.x += windDirection.current.x * delta;
      particle.velocity.z += windDirection.current.z * delta;

      // Add turbulence (random movement) that increases with height
      const heightFactor = Math.min(particle.position.y / 100, 1);
      particle.velocity.x +=
        (Math.random() - 0.5) * particle.turbulence * heightFactor;
      particle.velocity.z +=
        (Math.random() - 0.5) * particle.turbulence * heightFactor;

      // Apply velocity to position
      particle.position.add(
        new THREE.Vector3(
          particle.velocity.x,
          particle.velocity.y,
          particle.velocity.z
        )
      );

      // Dampen velocity slightly for natural movement
      particle.velocity.x *= 0.99;
      particle.velocity.z *= 0.99;

      // Scale changes - grow initially, then shrink as particle rises and disperses
      if (particle.age < particle.lifespan * 0.4) {
        particle.scale += delta * 0.3; // Grow in early life
      } else {
        particle.scale += delta * 0.1; // Grow more slowly in late life
      }

      // Opacity changes - fade in quickly, then gradually fade out
      if (particle.age < particle.lifespan * 0.1) {
        particle.opacity = Math.min(particle.opacity + delta, 0.8); // Quick fade in
      } else {
        // Fade out progressively faster as it ages
        const fadeOutRate = (particle.age / particle.lifespan) * 0.001;
        particle.opacity -= fadeOutRate * delta;
      }

      // Reset particles when they expire or fade out
      if (particle.age > particle.lifespan || particle.opacity <= 0) {
        // Reset position to chimney top with slight randomization
        particle.position.set(
          (Math.random() - 0.5) * width,
          Math.random() * 5, // Slight initial height variation
          (Math.random() - 0.5) * width
        );

        // Reset velocity with variation for natural effect
        particle.velocity.set(
          (Math.random() - 0.5) * 0.1,
          Math.random() * 0.2 + 0.05,
          (Math.random() - 0.5) * 0.1
        );

        // Reset properties
        particle.age = 0;
        particle.lifespan = Math.random() * 3 + 2;
        particle.opacity = Math.random() * 0.3 + 0.7;
        particle.scale = Math.random() * 0.8 + 0.4;

        // New curl factors for variation
        particle.curlFactor = {
          x: Math.random() * 0.003 - 0.0015,
          y: Math.random() * 0.001,
          z: Math.random() * 0.003 - 0.0015,
        };

        // New turbulence factor
        particle.turbulence = Math.random() * 0.005 + 0.001;
      }
    });

    // Update the arrays with new values
    updateParticleArrays();

    // Update the buffer attributes with new array data
    if (pointsRef.current) {
      pointsRef.current.geometry.attributes.position.array =
        positionArray.current;
      pointsRef.current.geometry.attributes.scale.array = scaleArray.current;
      pointsRef.current.geometry.attributes.opacity.array =
        opacityArray.current;

      pointsRef.current.geometry.attributes.position.needsUpdate = true;
      pointsRef.current.geometry.attributes.scale.needsUpdate = true;
      pointsRef.current.geometry.attributes.opacity.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef} position={position}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.current.length}
          array={positionArray.current}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-scale"
          count={particles.current.length}
          array={scaleArray.current}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-opacity"
          count={particles.current.length}
          array={opacityArray.current}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={4}
        sizeAttenuation={true}
        color="#292929"
        transparent={true}
        opacity={0.7}
        fog={true}
        blending={THREE.AdditiveBlending} // Add blending for wispy smoke effect
      />
    </points>
  );
}
