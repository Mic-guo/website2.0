import { Canvas } from "@react-three/fiber";
import { OrthographicCamera, OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import Scene from "./houseScene";
import { MODEL_BASE_POSITION, CAMERA_OFFSET } from "./utils/constants";
import CameraController from "./controllers/cameraController";

export default function House() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas>
        <Suspense fallback={null}>
          <OrthographicCamera
            makeDefault
            position={[
              MODEL_BASE_POSITION.x + CAMERA_OFFSET.x,
              MODEL_BASE_POSITION.y + CAMERA_OFFSET.y,
              MODEL_BASE_POSITION.z + CAMERA_OFFSET.z,
            ]}
            zoom={0.2}
            near={-10000}
            far={10000}
          />
          {/* <CameraController /> */}
          <OrbitControls
            enableZoom={false}
            enableRotate={true}
            enablePan={true}
            enableDamping={true}
            dampingFactor={0.05}
            target={[39.23, 2427.88, 306.66]}
            maxPolarAngle={Math.PI / 2} // 45 degrees from vertical, how high the cam can go
            minPolarAngle={Math.PI / 4} // 90 degrees from vertical, how low the cam can go
            // maxAzimuthAngle={-(Math.PI / 2)} // 45 degrees from starting, limiting rotation to the right
            // minAzimuthAngle={-(Math.PI / 4)} // 90 degrees from horizontal, limiting rotation to the left
          />
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
