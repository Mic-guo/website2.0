import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrthographicCamera, OrbitControls } from "@react-three/drei";
import { Suspense, useEffect, useRef } from "react";
import { gsap } from "gsap";
import Scene from "./houseScene";
import {
  MODEL_BASE_POSITION,
  CAMERA_OFFSET,
  CAMERA_ANIMATION_OFFSET,
} from "./utils/constants";
import CameraController from "./controllers/cameraController";

// Create a separate component for the animated camera
function AnimatedCamera({ cameraPosition }) {
  const { camera } = useThree();

  useEffect(() => {
    gsap.to(camera.position, {
      x: MODEL_BASE_POSITION.x + CAMERA_OFFSET.x,
      y:
        cameraPosition === "up"
          ? MODEL_BASE_POSITION.y + CAMERA_OFFSET.y + CAMERA_ANIMATION_OFFSET.y
          : MODEL_BASE_POSITION.y + CAMERA_OFFSET.y,
      z:
        cameraPosition === "up"
          ? MODEL_BASE_POSITION.z + CAMERA_OFFSET.z + CAMERA_ANIMATION_OFFSET.z
          : MODEL_BASE_POSITION.z + CAMERA_OFFSET.z,
      duration: 3.5,
      ease: "power2.inOut",
    });
  }, [cameraPosition, camera]);

  return null;
}

export default function House({ isNightMode, cameraPosition }) {
  return (
    <div className="w-screen h-screen overflow-hidden fixed">
      <Canvas>
        <Suspense fallback={null}>
          <OrthographicCamera
            makeDefault
            position={[
              MODEL_BASE_POSITION.x + CAMERA_OFFSET.x,
              MODEL_BASE_POSITION.y +
                CAMERA_OFFSET.y +
                CAMERA_ANIMATION_OFFSET.y,
              MODEL_BASE_POSITION.z +
                CAMERA_OFFSET.z +
                CAMERA_ANIMATION_OFFSET.z,
            ]}
            zoom={0.1}
            near={-10000}
            far={10000}
          />
          <AnimatedCamera cameraPosition={cameraPosition} />
          <OrbitControls
            enableZoom={false}
            enableRotate={true}
            enablePan={false}
            enableDamping={true}
            dampingFactor={0.05}
            target={[39.23, 2427.88, 306.66]}
            maxPolarAngle={Math.PI / 2} // 45 degrees from vertical, how high the cam can go
            minPolarAngle={Math.PI / 4} // 90 degrees from vertical, how low the cam can go
            // maxAzimuthAngle={-(Math.PI / 2)} // 45 degrees from starting, limiting rotation to the right
            // minAzimuthAngle={-(Math.PI / 4)} // 90 degrees from horizontal, limiting rotation to the left
          />
          <Scene isNightMode={isNightMode} />
        </Suspense>
      </Canvas>
    </div>
  );
}
