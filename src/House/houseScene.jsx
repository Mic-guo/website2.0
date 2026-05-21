import useSpline from "@splinetool/r3f-spline";
import { useFrame, useLoader } from "@react-three/fiber";
import { Suspense, useCallback, useRef, useEffect } from "react";
import { TextureLoader } from "three";
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
import { CameraZoomController } from "../components/controllers/CameraZoomController";
import useUIStore from "../stores/UIStore";
import useNavigationHandler from "../components/controllers/navigationHandler";
import PolaroidModel, {
  POLAROID_PATHS,
} from "./houseComponents/room/polaroidModel";

// Names of objects in the spline scene that count as discrete hover targets
// when the camera is zoomed in. Everything else falls back to "house" hover
// (or no hover at all) depending on zoom state.
const ZOOMED_HOVER_TARGETS = ["tv", "Polaroid"];

export default function Scene({ ...props }) {
  const { nodes, materials } = useSpline(sceneFile);

  const groupRef = useRef();
  const scaleRef = useRef(1);
  const roofRef = useRef();
  // Track which name we last pushed to the store so we don't dispatch the
  // same value on every pointer-move tick.
  const lastHoverRef = useRef(null);

  const { setHoveredItem, clearHover, hoveredItem } = useHoverStore();
  const { isNightMode, isZoomedIn } = useUIStore();
  const { handleEnterNavigationState } = useNavigationHandler();

  const pushHover = useCallback(
    (id) => {
      if (lastHoverRef.current === id) return;
      lastHoverRef.current = id;
      if (id) setHoveredItem(id);
      else clearHover();
    },
    [setHoveredItem, clearHover]
  );

  // R3F handles raycasting once per pointer event (and only against meshes
  // that have handlers attached), instead of the previous approach of walking
  // the entire scene graph every frame inside useFrame.
  const handlePointerMove = useCallback(
    (e) => {
      e.stopPropagation();
      if (!isZoomedIn) {
        pushHover("house");
        return;
      }
      // Zoomed in: only TV and Polaroid count as hover targets. Walk up from
      // the hit mesh to find the named ancestor.
      let cur = e.object;
      while (cur && !ZOOMED_HOVER_TARGETS.includes(cur.name)) {
        cur = cur.parent;
      }
      pushHover(cur ? cur.name.toLowerCase() : null);
    },
    [isZoomedIn, pushHover]
  );

  const handlePointerOut = useCallback(
    (e) => {
      // Only clear when the pointer leaves the whole house group, not when
      // it crosses between two child meshes (R3F bubbles those too).
      if (e.intersections && e.intersections.length > 0) return;
      pushHover(null);
    },
    [pushHover]
  );

  // Smooth scale animation when the (outer) house is hovered. This is the
  // only thing left in useFrame — it's a single lerp + setScalar, no raycast.
  useFrame(() => {
    if (!groupRef.current) return;
    const targetScale = hoveredItem === "house" && !isZoomedIn ? 1.04 : 1;
    scaleRef.current += (targetScale - scaleRef.current) * 0.1;
    groupRef.current.scale.setScalar(scaleRef.current);
  });

  // When the zoom state flips, the meaning of any current hover changes
  // (e.g. "house" makes no sense once you're inside). Clear so the next
  // pointer-move re-evaluates cleanly.
  useEffect(() => {
    lastHoverRef.current = null;
    clearHover();
  }, [isZoomedIn, clearHover]);

  // Warm the polaroid texture cache in the background once the rest of the
  // scene has mounted. They aren't visible until the user zooms in, so we
  // never want them to block initial paint — but we also don't want a long
  // pause the first time someone zooms in. requestIdleCallback (with a
  // setTimeout fallback) downloads them during browser idle time.
  useEffect(() => {
    const preload = () => useLoader.preload(TextureLoader, POLAROID_PATHS);
    const handle =
      typeof window !== "undefined" && "requestIdleCallback" in window
        ? window.requestIdleCallback(preload, { timeout: 4000 })
        : setTimeout(preload, 1500);
    return () => {
      if (typeof window !== "undefined" && "cancelIdleCallback" in window) {
        window.cancelIdleCallback?.(handle);
      } else {
        clearTimeout(handle);
      }
    };
  }, []);

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
        onPointerMove={handlePointerMove}
        onPointerOut={handlePointerOut}
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
            {/*
             * Polaroids are only visible from inside the room. Defer mounting
             * (and therefore texture loading) until the user actually zooms
             * in. The textures are preloaded during idle time so the first
             * zoom-in stays smooth.
             */}
            {isZoomedIn && (
              <Suspense fallback={null}>
                <PolaroidModel nodes={nodes} materials={materials} />
              </Suspense>
            )}
          </group>
        </scene>
      </group>
    </>
  );
}
