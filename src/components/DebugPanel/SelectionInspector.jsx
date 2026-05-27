import { useEffect } from "react";
import { useControls, button, folder } from "leva";
import useDebugStore from "../../stores/debugStore";

const RAD_TO_DEG = 180 / Math.PI;
const DEG_TO_RAD = Math.PI / 180;

const num = (v) =>
  typeof v === "number" && !Number.isInteger(v) ? Number(v.toFixed(4)) : v;

// Round-trip rotation between rad (store) and deg (UI).
const radArrToDeg = (a) => ({
  x: a[0] * RAD_TO_DEG,
  y: a[1] * RAD_TO_DEG,
  z: a[2] * RAD_TO_DEG,
});

const xyzObj = (a) => ({ x: a[0], y: a[1], z: a[2] });
const toArr = (v) => [v.x, v.y, v.z];

const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    console.info(`[DebugPanel] selection JSX copied (${text.length} chars)`);
  } catch (err) {
    console.warn("[DebugPanel] failed to copy selection JSX:", err);
  }
};

// Format an override for paste-back into source. Only emits the keys the user
// actually changed, so an override that only tweaks scale doesn't write back
// stale position/rotation defaults.
function overrideAsJSX(path, override, selection) {
  const lines = [];
  const fmt = (a) => `[${num(a[0])}, ${num(a[1])}, ${num(a[2])}]`;
  lines.push(`// ${path}`);
  if (override.position) lines.push(`position={${fmt(override.position)}}`);
  if (override.rotation) lines.push(`rotation={${fmt(override.rotation)}}`);
  if (override.scale) {
    const s = override.scale;
    lines.push(
      `scale={${
        typeof s === "number"
          ? num(s)
          : s[0] === s[1] && s[1] === s[2]
          ? num(s[0])
          : fmt(s)
      }}`
    );
  }
  // If the user opened the inspector but didn't change anything, fall back
  // to dumping the current effective transform so they still get useful JSX.
  if (lines.length === 1 && selection) {
    lines.push(`position={${fmt(selection.position)}}`);
    lines.push(`rotation={${fmt(selection.rotation)}}`);
    lines.push(`scale={${fmt(selection.scale)}}`);
  }
  return lines.join("\n");
}

// Compute the "effective transform" for a given selection path — what the
// 3D object actually is (or about to be) right now. Order:
//   1. Override (the user-set value) wins.
//   2. Original (snapshot from when the override was first applied) — used
//      for displaying the post-clear value, since the object will be
//      restored to this on the next useFrame.
//   3. Selection (transform captured at click time) — fallback for objects
//      that have no override yet.
function effectiveTransform(selection) {
  const state = useDebugStore.getState();
  const path = selection.path;
  const ov = state.overrides[path];
  const orig = state.originals[path];
  return {
    position: ov?.position || orig?.position || selection.position,
    rotation: ov?.rotation || orig?.rotation || selection.rotation,
    scale: ov?.scale || orig?.scale || selection.scale,
  };
}

// Inner component is keyed on selection.path by the parent so a fresh
// useControls schema is built every time a new object is picked. The
// subscribe-driven sync below pushes effective values into Leva whenever
// overrides for the current path change (incl. the "Clear this override"
// button) — Leva caches values by control-path so an in-place refresh is
// needed to overcome it.
function SelectionInspectorInner({ selection }) {
  const eff = effectiveTransform(selection);

  const setOverride = useDebugStore.getState().setOverride;
  const clearOverride = useDebugStore.getState().clearOverride;
  const clearSelection = useDebugStore.getState().clearSelection;

  const folderTitle = `Selected · ${selection.name}`;

  const [, setControls] = useControls(folderTitle, () => ({
    Info: folder(
      {
        path: { value: selection.path, editable: false, label: "path" },
        type: { value: selection.type, editable: false, label: "type" },
      },
      { collapsed: true }
    ),
    position: {
      value: xyzObj(eff.position),
      step: 1,
      onChange: (v, _name, ctx) => {
        if (ctx?.initial) return;
        setOverride(selection.path, "position", toArr(v));
      },
    },
    "rotation (deg)": {
      value: radArrToDeg(eff.rotation),
      step: 1,
      onChange: (v, _name, ctx) => {
        if (ctx?.initial) return;
        setOverride(selection.path, "rotation", [
          v.x * DEG_TO_RAD,
          v.y * DEG_TO_RAD,
          v.z * DEG_TO_RAD,
        ]);
      },
    },
    scale: {
      value: xyzObj(
        typeof eff.scale === "number"
          ? [eff.scale, eff.scale, eff.scale]
          : eff.scale
      ),
      step: 0.01,
      onChange: (v, _name, ctx) => {
        if (ctx?.initial) return;
        setOverride(selection.path, "scale", toArr(v));
      },
    },
    "Copy as JSX": button(() => {
      const ov = useDebugStore.getState().overrides[selection.path] || {};
      copyToClipboard(overrideAsJSX(selection.path, ov, selection));
    }),
    "Clear this override": button(() => clearOverride(selection.path)),
    Deselect: button(() => clearSelection()),
  }));

  // Push the effective transform into Leva on mount AND on every change to
  // overrides[selection.path] — handles "Clear this override", "Clear all",
  // and external overrides set by something other than these sliders.
  useEffect(() => {
    const syncSliders = () => {
      const e = effectiveTransform(selection);
      const scaleArr =
        typeof e.scale === "number" ? [e.scale, e.scale, e.scale] : e.scale;
      setControls({
        position: xyzObj(e.position),
        "rotation (deg)": radArrToDeg(e.rotation),
        scale: xyzObj(scaleArr),
      });
    };
    // Initial push — overrides Leva's cached slider values from a previous
    // selection of the same path.
    syncSliders();
    return useDebugStore.subscribe((state, prev) => {
      // Only react to changes in our path's override entry. Other store
      // mutations (originals, selection, section sliders) are irrelevant.
      if (state.overrides[selection.path] === prev.overrides[selection.path])
        return;
      syncSliders();
    });
  }, [selection, setControls]);

  return null;
}

export default function SelectionInspector() {
  const selection = useDebugStore((s) => s.selection);
  if (!selection.path) return null;
  return <SelectionInspectorInner key={selection.path} selection={selection} />;
}
