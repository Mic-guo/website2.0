import { Canvas } from "@react-three/fiber";
import { OrthographicCamera, OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import Scene from "./houseScene";
import {
  MODEL_BASE_POSITION,
  CAMERA_OFFSET,
  CAMERA_ANIMATION_OFFSET,
} from "../utils/constants";
// import CameraController from "../controllers/cameraController";
import { CameraZoomController } from "../components/controllers/CameraZoomController";
import useUIStore from "../stores/UIStore";

export default function House() {
  const { isZoomedIn } = useUIStore();

  return (
    <div className="w-screen h-screen overflow-hidden fixed cursor-none">
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
          <CameraZoomController />
          <OrbitControls
            enableZoom={isZoomedIn ? true : false}
            maxZoom={1}
            minZoom={0.3}
            enableRotate={true}
            enablePan={false}
            enableDamping={true}
            dampingFactor={0.05}
            rotateSpeed={0.2}
            mouseWheelSpeed={0.5}
            target={[39.23, 2427.88, 306.66]}
            maxPolarAngle={Math.PI / 2} // 45 degrees from vertical, how high the cam can go
            minPolarAngle={Math.PI / 4} // 90 degrees from vertical, how low the cam can go
            maxAzimuthAngle={isZoomedIn ? 0 : Infinity}
            minAzimuthAngle={isZoomedIn ? -(Math.PI / 2) : -Infinity}
          />
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
