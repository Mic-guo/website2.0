import { Canvas } from "@react-three/fiber";
import { OrthographicCamera, OrbitControls } from "@react-three/drei";
import { Suspense, lazy } from "react";
import Scene from "./houseScene";
import { MODEL_BASE_POSITION } from "../utils/constants";
// import CameraController from "../controllers/cameraController";
import { CameraZoomController } from "../components/controllers/CameraZoomController";
import useUIStore from "../stores/UIStore";
import useDebugStore from "../stores/debugStore";

// Debug panel ships only when ?debug=1 or in dev — keep the bundle import
// lazy so prod builds without the flag never pull leva down. We mirror the
// enabled check at the parent so React doesn't even kick off the dynamic
// import when the panel won't be used.
const DebugPanel = lazy(() => import("../components/DebugPanel/DebugPanel"));
const SceneEditor = lazy(() =>
  import("../components/DebugPanel/SceneEditor")
);

const isDebugEnabled = () => {
  if (typeof window === "undefined") return false;
  if (import.meta.env?.DEV) return true;
  return new URLSearchParams(window.location.search).get("debug") === "1";
};

export default function House() {
  const { isZoomedIn } = useUIStore();
  const orbit = useDebugStore((s) => s.orbit);
  const camera = useDebugStore((s) => s.camera);
  const debugEnabled = isDebugEnabled();

  return (
    <div className="w-screen h-screen overflow-hidden fixed cursor-none">
      <Canvas>
        <Suspense fallback={null}>
          <OrthographicCamera
            makeDefault
            position={[
              MODEL_BASE_POSITION.x +
                camera.offset[0] +
                camera.animationOffset[0],
              MODEL_BASE_POSITION.y +
                camera.offset[1] +
                camera.animationOffset[1],
              MODEL_BASE_POSITION.z +
                camera.offset[2] +
                camera.animationOffset[2],
            ]}
            zoom={camera.zoom}
            near={-10000}
            far={10000}
          />
          <CameraZoomController />
          <OrbitControls
            enableZoom={isZoomedIn ? true : false}
            maxZoom={orbit.maxZoom}
            minZoom={orbit.minZoom}
            enableRotate={true}
            enablePan={false}
            enableDamping={true}
            dampingFactor={orbit.dampingFactor}
            rotateSpeed={orbit.rotateSpeed}
            mouseWheelSpeed={orbit.mouseWheelSpeed}
            target={orbit.target}
            maxPolarAngle={orbit.maxPolarAngle} // 45 degrees from vertical, how high the cam can go
            minPolarAngle={orbit.minPolarAngle} // 90 degrees from vertical, how low the cam can go
            maxAzimuthAngle={isZoomedIn ? 0 : Infinity}
            minAzimuthAngle={isZoomedIn ? -(Math.PI / 2) : -Infinity}
          />
          <Scene />
          {debugEnabled && (
            <Suspense fallback={null}>
              <SceneEditor />
            </Suspense>
          )}
        </Suspense>
      </Canvas>
      {debugEnabled && (
        <Suspense fallback={null}>
          <DebugPanel />
        </Suspense>
      )}
    </div>
  );
}
