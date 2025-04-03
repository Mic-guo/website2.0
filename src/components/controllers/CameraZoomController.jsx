import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { gsap } from "gsap";
import {
  MODEL_BASE_POSITION,
  CAMERA_OFFSET,
  CAMERA_ANIMATION_OFFSET,
  CameraPositions,
} from "../utils/constants";
import useUIStore from "../stores/UIStore";

export function CameraZoomController() {
  const { camera } = useThree();
  const { isZoomedIn, cameraAnimation, fromPolaroid } = useUIStore();

  useEffect(() => {
    if (cameraAnimation === null) return;

    let targetY = MODEL_BASE_POSITION.y + CAMERA_OFFSET.y;
    let targetZ = MODEL_BASE_POSITION.z + CAMERA_OFFSET.z;
    let targetX = MODEL_BASE_POSITION.x + CAMERA_OFFSET.x;

    switch (cameraAnimation) {
      case CameraPositions.LANDING_PAGE:
        gsap.to(camera.position, {
          x: targetX,
          y: targetY + CAMERA_ANIMATION_OFFSET.y,
          z: targetZ + CAMERA_ANIMATION_OFFSET.z,
          duration: 4,
          ease: "power2.inOut",
        });
        break;
      case CameraPositions.HOUSE_SCENE:
        gsap.to(camera.position, {
          x: targetX,
          y: targetY,
          z: targetZ,
          duration: 4,
          ease: "power2.inOut",
        });
        break;
      case CameraPositions.FOCUSED_VIEW:
        gsap.to(camera.position, {
          x: targetX,
          y: targetY,
          z: targetZ,
          duration: 1,
          ease: "power2.inOut",
        });
        break;
      default:
        break;
    }

    // Calculate zoom based on screen size
    const baseZoom = isZoomedIn ? 0.4 : 0.1;
    const aspectRatio = window.innerWidth / window.innerHeight;
    const referenceWidth = 1920; // Reference width for base zoom
    const scaleFactorWidth = window.innerWidth / referenceWidth;

    // Scale zoom based on screen width, but with some constraints
    const scaledZoom =
      baseZoom * Math.min(Math.max(scaleFactorWidth, 0.7), 1.4);

    gsap.to(camera, {
      zoom: scaledZoom,
      duration: 1.5,
      ease: "power2.inOut",
      onUpdate: () => {
        camera.updateProjectionMatrix();
      },
    });
  }, [isZoomedIn, cameraAnimation, camera]);

  useEffect(() => {
    const handleResize = () => {
      const baseZoom = isZoomedIn ? 0.4 : 0.1;
      const referenceWidth = 1920;
      const scaleFactorWidth = window.innerWidth / referenceWidth;
      const scaledZoom =
        baseZoom * Math.min(Math.max(scaleFactorWidth, 0.7), 1.3);

      camera.zoom = scaledZoom;
      camera.updateProjectionMatrix();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [camera, isZoomedIn]);

  return null;
}
