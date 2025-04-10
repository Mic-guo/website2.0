import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { gsap } from "gsap";
import {
  MODEL_BASE_POSITION,
  CAMERA_OFFSET,
  CAMERA_ANIMATION_OFFSET,
  CameraPositions,
} from "../../utils/constants";
import useUIStore from "../../stores/UIStore";

export function CameraZoomController() {
  const { camera } = useThree();
  const { isZoomedIn, cameraAnimation } = useUIStore();

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
          duration: 3,
          ease: "power2.inOut",
        });
        break;
      case CameraPositions.HOUSE_SCENE:
        gsap.to(camera.position, {
          x: targetX,
          y: targetY,
          z: targetZ,
          duration: 2,
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

    // Use fixed zoom values instead of calculated ones
    const fixedZoom = isZoomedIn ? 0.4 : 0.1;

    gsap.to(camera, {
      zoom: fixedZoom,
      duration: 1.5,
      ease: "power2.inOut",
      onUpdate: () => {
        camera.updateProjectionMatrix();
      },
    });
  }, [isZoomedIn, cameraAnimation, camera]);

  return null;
}
