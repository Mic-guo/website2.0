import useSpline from "@splinetool/r3f-spline";
import { useFrame } from "@react-three/fiber";
import { useRef, useState, useEffect } from "react";
import * as THREE from "three";
import sceneFile from "../House/scene.splinecode?url";
import Roof from "./houseComponents/roof";
import SidesBase from "./houseComponents/sides+base";
import Desk from "./houseComponents/room/desk";
import SpeakerLight from "./houseComponents/room/speakerLight";
import Calendar from "./houseComponents/room/calendar";
import Bookshelf from "./houseComponents/room/bookshelf";
import { NightMode } from "./sceneEffects/NighttimeScene";
import { DayMode } from "./sceneEffects/DaytimeScene";
import Snow from "./sceneEffects/Snow";
import useHoverStore from "../stores/hoverStore";
import gsap from "gsap";
import { CameraZoomController } from "../controllers/CameraZoomController";
import useUIStore from "../stores/UIStore";
import useNavigationHandler from "../controllers/navigationHandler";

export default function Scene({ ...props }) {
  const { nodes, materials } = useSpline(sceneFile);
  const [hasMouseMoved, setHasMouseMoved] = useState(false);

  const groupRef = useRef();
  const scaleRef = useRef(1);
  const roofRef = useRef();

  const { setHoveredItem, clearHover, hoveredItem } = useHoverStore();
  const { isNightMode, isZoomedIn } = useUIStore();
  const { handleEnterNavigationState } = useNavigationHandler();

  // Set up raycaster
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  useFrame(({ camera, pointer }) => {
    // Only start raycasting after mouse has moved
    if (!hasMouseMoved) {
      if (pointer.x !== 0 || pointer.y !== 0) {
        setHasMouseMoved(true);
      }
      if (hoveredItem) {
        clearHover();
      }
      return;
    }

    // Update mouse position
    mouse.set(pointer.x, pointer.y);

    // Update the raycaster
    raycaster.setFromCamera(mouse, camera);

    if (groupRef.current) {
      // First, check house hover when not zoomed in
      if (!isZoomedIn) {
        const houseIntersects = raycaster.intersectObject(
          groupRef.current,
          true
        );

        if (houseIntersects.length > 0 && !hoveredItem) {
          setHoveredItem("house");
        } else if (houseIntersects.length === 0 && hoveredItem) {
          clearHover();
        }
      }

      // Then, check component hovers when zoomed in
      if (isZoomedIn) {
        // Get all interactive components
        const tvComponent = groupRef.current.getObjectByName("tv");
        const polaroidComponent = groupRef.current.getObjectByName("Polaroid");

        const componentIntersects = raycaster.intersectObjects(
          [tvComponent, polaroidComponent],
          true
        );

        if (componentIntersects.length > 0) {
          const closestIntersect = componentIntersects[0];

          // Traverse up the parent chain to find the named component
          let currentObject = closestIntersect.object;
          while (
            currentObject &&
            !["tv", "Polaroid"].includes(currentObject.name)
          ) {
            currentObject = currentObject.parent;
          }
          if (currentObject) {
            const componentId = currentObject.name.toLowerCase();
            setHoveredItem(componentId);
          }
        } else {
          clearHover();
        }
      }

      // Update house scale animation regardless of zoom state
      const targetScale = hoveredItem === "house" && !isZoomedIn ? 1.04 : 1;
      scaleRef.current += (targetScale - scaleRef.current) * 0.1;
      groupRef.current.scale.setScalar(scaleRef.current);
    }
  });

  useEffect(() => {
    if (roofRef.current) {
      // Get all materials from the roof mesh and its children
      const materials = [];
      roofRef.current.traverse((child) => {
        if (child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach((mat) => materials.push(mat));
          } else {
            materials.push(child.material);
          }
        }
      });

      // Animate all materials
      materials.forEach((material) => {
        // Set transparent before animation
        material.transparent = true;
        gsap.to(material, {
          opacity: isZoomedIn ? 0 : 1,
          duration: 1.5,
          ease: "power2.inOut",
        });
      });
    }
  }, [isZoomedIn]);

  return (
    <>
      <group className="cursor-none">
        {isNightMode ? (
          <NightMode />
        ) : (
          <>
            <DayMode />
            <Snow />
          </>
        )}
        <CameraZoomController />
      </group>
      <group
        {...props}
        ref={groupRef}
        dispose={null}
        onClick={(e) => {
          // Only allow clicking if not already zoomed in
          if (isZoomedIn) return;

          e.stopPropagation();
          handleEnterNavigationState("focusedView");
        }}
      >
        <scene name="Scene">
          <Roof ref={roofRef} nodes={nodes} />
          <SidesBase nodes={nodes} />
          <group
            name="Second Floor"
            position={[23.93, 2161.9, 338.54]}
            scale={[2.6, 2.71, 2.62]}
          >
            <Desk nodes={nodes} materials={materials} />
            <SpeakerLight nodes={nodes} materials={materials} />
            <Calendar nodes={nodes} materials={materials} />
            <Bookshelf nodes={nodes} materials={materials} />
          </group>
        </scene>
      </group>
    </>
  );
}
