
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";

export default function CameraController({ lerp = 0.1 }) {
  const mouse = useRef(new THREE.Vector2());
  const { camera } = useThree();
  const initialPosition = new THREE.Vector3(
    39.23 - 700,
    2427.88 + 700,
    306.66 + 2000
  );

  useFrame(() => {
    // Lerp the camera position based on mouse movement
    camera.position.x = initialPosition.x + mouse.current.x * -200;
    camera.position.y = initialPosition.y + mouse.current.y * -200;
    camera.lookAt(39.23, 2427.88, 306.66);
  });

  const handleMouseMove = (e) => {
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = -(e.clientY / window.innerHeight) * 2 + 1;
    mouse.current.x += (x - mouse.current.x) * lerp;
    mouse.current.y += (y - mouse.current.y) * lerp;
  };

  window.addEventListener("mousemove", handleMouseMove);
  return null;
}
