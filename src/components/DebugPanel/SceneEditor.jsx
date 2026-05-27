import { useEffect, useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import useDebugStore from "../../stores/debugStore";
import { buildPath, findByPath, nearestNamedAncestor } from "./sceneGraph";

// SceneEditor lives inside <Canvas>. It listens for Alt+Click on the canvas,
// picks the nearest named object via raycast, writes it into the debug store
// as the current selection, and continuously re-applies any per-path
// transform overrides each frame so React reconciliations from the source
// JSX can't clobber them.
//
// A BoxHelper highlight tracks the selection so it's visually obvious what's
// currently picked.
export default function SceneEditor() {
  const { scene, gl, camera } = useThree();

  // Refs for the Alt+click DOM handler. Stored as refs so we don't need to
  // re-attach the event listener every time something updates.
  const sceneRef = useRef(scene);
  const cameraRef = useRef(camera);
  sceneRef.current = scene;
  cameraRef.current = camera;

  // ─────────────────────────────────────────────────────────────────────────
  // Alt+Click selection (DOM-level capture so we run before R3F's pointer
  // pipeline and can stopImmediatePropagation away from the existing
  // click-to-zoom handler in houseScene.jsx).
  useEffect(() => {
    const canvas = gl.domElement;
    const raycaster = new THREE.Raycaster();
    const ndc = new THREE.Vector2();

    const onClick = (e) => {
      if (!e.altKey) return;
      // Prevent R3F from firing the underlying click-to-zoom on the house.
      // houseScene.jsx also guards on e.nativeEvent.altKey as a belt-and-
      // braces — either alone is sufficient.
      e.stopImmediatePropagation();
      e.preventDefault();

      const rect = canvas.getBoundingClientRect();
      ndc.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      ndc.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(ndc, cameraRef.current);
      const hits = raycaster.intersectObjects(sceneRef.current.children, true);
      if (hits.length === 0) {
        useDebugStore.getState().clearSelection();
        return;
      }

      // Walk up to the first ancestor with a real name. Most meshes in the
      // Spline scene have names, so this usually no-ops.
      const target = nearestNamedAncestor(hits[0].object, sceneRef.current);
      selectObject(target, sceneRef.current);
    };

    canvas.addEventListener("click", onClick, true);
    return () => canvas.removeEventListener("click", onClick, true);
  }, [gl]);

  // Escape clears the current selection — handy while iterating.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") useDebugStore.getState().clearSelection();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // ─────────────────────────────────────────────────────────────────────────
  // Per-frame override applier. Re-applies stored overrides on top of
  // whatever the source JSX last reconciled, AND snapshots the object's
  // "original" transform the first time we touch it so the restore is
  // possible later. When an override is removed from the store (e.g. user
  // clicks "Clear all transform overrides" or "Reset all"), the corresponding
  // object's transform gets snapped back to the snapshot — otherwise the
  // override values would stick until the next React reconciliation.
  //
  // Originals live in the zustand store (not a local ref) so the
  // SelectionInspector can read them when it needs to push fresh slider
  // values into Leva on clear-override.
  useFrame(() => {
    const state = useDebugStore.getState();
    const { overrides, originals } = state;
    const activePaths = new Set(Object.keys(overrides));

    // 1. Apply active overrides. Snapshot the original transform the first
    //    time we see each path so we know what to restore to later.
    for (const path of activePaths) {
      const obj = findByPath(scene, path);
      if (!obj) continue;
      if (!originals[path]) {
        state.setOriginal(path, {
          position: obj.position.toArray(),
          rotation: [obj.rotation.x, obj.rotation.y, obj.rotation.z],
          scale: obj.scale.toArray(),
        });
      }
      const ov = overrides[path];
      if (ov.position) obj.position.fromArray(ov.position);
      if (ov.rotation) obj.rotation.fromArray(ov.rotation);
      if (ov.scale) {
        if (typeof ov.scale === "number") obj.scale.setScalar(ov.scale);
        else obj.scale.fromArray(ov.scale);
      }
    }

    // 2. Restore any paths that USED to have an override but no longer do.
    //    One-shot: after restoring, drop the snapshot so a fresh override
    //    captures a fresh original next time.
    for (const path of Object.keys(originals)) {
      if (activePaths.has(path)) continue;
      const obj = findByPath(scene, path);
      if (obj) {
        const orig = originals[path];
        obj.position.fromArray(orig.position);
        obj.rotation.fromArray(orig.rotation);
        obj.scale.fromArray(orig.scale);
      }
      state.deleteOriginal(path);
    }
  });

  // ─────────────────────────────────────────────────────────────────────────
  // Box helper outline around the current selection. Refreshes the helper
  // every frame so it tracks override transforms.
  const helperGroupRef = useRef();
  const helperStateRef = useRef({ helper: null, path: null });

  useFrame(() => {
    const { selection } = useDebugStore.getState();
    const group = helperGroupRef.current;
    if (!group) return;
    if (selection.path !== helperStateRef.current.path) {
      // Dispose previous helper and create a new one for the new selection.
      const prev = helperStateRef.current.helper;
      if (prev) {
        group.remove(prev);
        prev.geometry?.dispose();
        prev.material?.dispose();
      }
      helperStateRef.current = { helper: null, path: selection.path };
      if (selection.path) {
        const obj = findByPath(scene, selection.path);
        if (obj) {
          const h = new THREE.BoxHelper(obj, 0x00ff88);
          // BoxHelper uses LineBasicMaterial which respects depthTest. We
          // want the highlight to be visible even when behind geometry, so
          // disable depth test and bump renderOrder.
          h.material.depthTest = false;
          h.material.depthWrite = false;
          h.material.transparent = true;
          h.renderOrder = 999;
          group.add(h);
          helperStateRef.current = { helper: h, path: selection.path };
        }
      }
    }
    helperStateRef.current.helper?.update();
  });

  return <group ref={helperGroupRef} />;
}

// Convert a three.js Object3D into the selection payload the store expects.
function selectObject(target, root) {
  const path = buildPath(target, root);
  useDebugStore.getState().selectObject({
    path,
    name: target.name || target.type,
    type: target.type,
    position: [target.position.x, target.position.y, target.position.z],
    rotation: [target.rotation.x, target.rotation.y, target.rotation.z],
    scale: [target.scale.x, target.scale.y, target.scale.z],
  });
}
