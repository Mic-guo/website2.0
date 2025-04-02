import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { gsap } from "gsap";
import {
  MODEL_BASE_POSITION,
  CAMERA_OFFSET,
  CAMERA_ANIMATION_OFFSET,
} from "../House/utils/constants";
import useUIStore from "../stores/UIStore";

// THERE IS AN ANIMATION AT THE BEGINNING OF THE LANDING PAGE FOR SOME REASON 

export function CameraZoomController() {
  const { camera } = useThree();
  const { isZoomedIn, cameraPosition } = useUIStore(); // Camera position should be instead offsets not a string for best practices

  useEffect(() => {
    const targetY =
      cameraPosition === "up"
        ? MODEL_BASE_POSITION.y + CAMERA_OFFSET.y + CAMERA_ANIMATION_OFFSET.y
        : MODEL_BASE_POSITION.y + CAMERA_OFFSET.y;

    const targetZ =
      cameraPosition === "up"
        ? MODEL_BASE_POSITION.z + CAMERA_OFFSET.z + CAMERA_ANIMATION_OFFSET.z
        : MODEL_BASE_POSITION.z + CAMERA_OFFSET.z;

    gsap.to(camera.position, {
      x: MODEL_BASE_POSITION.x + CAMERA_OFFSET.x,
      y: targetY,
      z: targetZ,
      duration: 4,
      ease: "power2.inOut",
    });

    if (isZoomedIn !== undefined) {
      gsap.to(camera, {
        zoom: isZoomedIn ? 0.3 : 0.1,
        duration: 1.5,
        ease: "power2.inOut",
        onUpdate: () => {
          camera.updateProjectionMatrix();
        },
      });
    }
  }, [isZoomedIn, cameraPosition, camera]);

  return null;
}
