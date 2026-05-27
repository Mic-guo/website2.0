import { useEffect, useRef, useState } from "react";
import { Leva, useControls, folder, button } from "leva";
import useDebugStore from "../../stores/debugStore";
import { toJSON, toJSX } from "./exporters";
import SelectionInspector from "./SelectionInspector";

// Panel is enabled in any of: vite dev mode, or URL contains ?debug=1.
// Production callers can always tag `?debug=1` to a deployed URL to surface it.
const isDebugEnabled = () => {
  if (typeof window === "undefined") return false;
  if (import.meta.env?.DEV) return true;
  return new URLSearchParams(window.location.search).get("debug") === "1";
};

const copyToClipboard = async (text, label) => {
  try {
    await navigator.clipboard.writeText(text);
    console.info(`[DebugPanel] ${label} copied (${text.length} chars)`);
  } catch (err) {
    console.warn(`[DebugPanel] Failed to copy ${label}:`, err);
  }
};

// Build a {value, onChange} entry for a scalar slider/number/color.
const scalar = (path, value, opts = {}) => ({
  value,
  onChange: (v, _name, ctx) => {
    if (ctx?.initial) return;
    useDebugStore.getState().setPath(path, v);
  },
  ...opts,
});

// Build a {value, onChange} entry for a 3-component vector (Leva renders x/y/z inputs).
const vec3 = (path, [x, y, z], opts = {}) => ({
  value: { x, y, z },
  onChange: (v, _name, ctx) => {
    if (ctx?.initial) return;
    useDebugStore.getState().setPath(path, [v.x, v.y, v.z]);
  },
  ...opts,
});

// ─────────────────────────────────────────────────────────────────────────────
// Schema builders. Each takes a snapshot of the store state and produces the
// matching Leva schema object. Extracting them lets us call the same builder
// twice: once at mount to seed Leva, again on reset to flatten the new
// defaults and push them back through each section's `set` function.
// ─────────────────────────────────────────────────────────────────────────────

const orbitSchema = (s) => ({
  rotateSpeed: scalar("orbit.rotateSpeed", s.orbit.rotateSpeed, {
    min: 0,
    max: 2,
    step: 0.01,
  }),
  dampingFactor: scalar("orbit.dampingFactor", s.orbit.dampingFactor, {
    min: 0,
    max: 0.5,
    step: 0.001,
  }),
  mouseWheelSpeed: scalar("orbit.mouseWheelSpeed", s.orbit.mouseWheelSpeed, {
    min: 0,
    max: 5,
    step: 0.1,
  }),
  maxZoom: scalar("orbit.maxZoom", s.orbit.maxZoom, {
    min: 0.1,
    max: 5,
    step: 0.05,
  }),
  minZoom: scalar("orbit.minZoom", s.orbit.minZoom, {
    min: 0.05,
    max: 2,
    step: 0.05,
  }),
  target: vec3("orbit.target", s.orbit.target),
  maxPolarAngle: scalar("orbit.maxPolarAngle", s.orbit.maxPolarAngle, {
    min: 0,
    max: Math.PI,
    step: 0.01,
  }),
  minPolarAngle: scalar("orbit.minPolarAngle", s.orbit.minPolarAngle, {
    min: 0,
    max: Math.PI,
    step: 0.01,
  }),
});

const cameraSchema = (s) => ({
  offset: vec3("camera.offset", s.camera.offset),
  animationOffset: vec3("camera.animationOffset", s.camera.animationOffset),
  zoom: scalar("camera.zoom", s.camera.zoom, {
    min: 0.01,
    max: 1,
    step: 0.01,
  }),
});

const dayLightingSchema = (s) => ({
  Ambient: folder({
    "ambient.intensity": scalar(
      "dayLighting.ambient.intensity",
      s.dayLighting.ambient.intensity,
      { min: 0, max: 2, step: 0.01 }
    ),
    "ambient.color": scalar(
      "dayLighting.ambient.color",
      s.dayLighting.ambient.color
    ),
  }),
  Directional: folder({
    "dir.intensity": scalar(
      "dayLighting.directional.intensity",
      s.dayLighting.directional.intensity,
      { min: 0, max: 2, step: 0.01 }
    ),
    "dir.color": scalar(
      "dayLighting.directional.color",
      s.dayLighting.directional.color
    ),
    "dir.position": vec3(
      "dayLighting.directional.position",
      s.dayLighting.directional.position
    ),
  }),
  Point: folder({
    "point.intensity": scalar(
      "dayLighting.point.intensity",
      s.dayLighting.point.intensity,
      { min: 0, max: 2, step: 0.01 }
    ),
    "point.color": scalar("dayLighting.point.color", s.dayLighting.point.color),
    "point.position": vec3(
      "dayLighting.point.position",
      s.dayLighting.point.position
    ),
  }),
});

const nightLightingSchema = (s) => ({
  Ambient: folder({
    "ambient.intensity": scalar(
      "nightLighting.ambient.intensity",
      s.nightLighting.ambient.intensity,
      { min: 0, max: 2, step: 0.01 }
    ),
    "ambient.color": scalar(
      "nightLighting.ambient.color",
      s.nightLighting.ambient.color
    ),
  }),
  Directional: folder({
    "dir.intensity": scalar(
      "nightLighting.directional.intensity",
      s.nightLighting.directional.intensity,
      { min: 0, max: 2, step: 0.01 }
    ),
    "dir.color": scalar(
      "nightLighting.directional.color",
      s.nightLighting.directional.color
    ),
    "dir.position": vec3(
      "nightLighting.directional.position",
      s.nightLighting.directional.position
    ),
  }),
});

const daySkySchema = (s) => ({
  "Stop 1": folder({
    "stop1.offset": scalar("daySky.stop1.offset", s.daySky.stop1.offset, {
      min: 0,
      max: 1,
      step: 0.01,
    }),
    "stop1.color": scalar("daySky.stop1.color", s.daySky.stop1.color),
  }),
  "Stop 2": folder({
    "stop2.offset": scalar("daySky.stop2.offset", s.daySky.stop2.offset, {
      min: 0,
      max: 1,
      step: 0.01,
    }),
    "stop2.color": scalar("daySky.stop2.color", s.daySky.stop2.color),
  }),
});

const nightSkySchema = (s) => ({
  "Stop 1": folder({
    "stop1.offset": scalar("nightSky.stop1.offset", s.nightSky.stop1.offset, {
      min: 0,
      max: 1,
      step: 0.01,
    }),
    "stop1.color": scalar("nightSky.stop1.color", s.nightSky.stop1.color),
  }),
  "Stop 2": folder({
    "stop2.offset": scalar("nightSky.stop2.offset", s.nightSky.stop2.offset, {
      min: 0,
      max: 1,
      step: 0.01,
    }),
    "stop2.color": scalar("nightSky.stop2.color", s.nightSky.stop2.color),
  }),
  "Stop 3": folder({
    "stop3.offset": scalar("nightSky.stop3.offset", s.nightSky.stop3.offset, {
      min: 0,
      max: 1,
      step: 0.01,
    }),
    "stop3.color": scalar("nightSky.stop3.color", s.nightSky.stop3.color),
  }),
});

const starsSchema = (s) => ({
  count: scalar("stars.count", s.stars.count, { min: 0, max: 500, step: 1 }),
  sizeMin: scalar("stars.sizeMin", s.stars.sizeMin, {
    min: 0.1,
    max: 10,
    step: 0.1,
  }),
  sizeMax: scalar("stars.sizeMax", s.stars.sizeMax, {
    min: 0.1,
    max: 20,
    step: 0.1,
  }),
  color: scalar("stars.color", s.stars.color),
});

const snowSchema = (s) => ({
  count: scalar("snow.count", s.snow.count, { min: 0, max: 1000, step: 10 }),
  size: scalar("snow.size", s.snow.size, { min: 0.5, max: 20, step: 0.1 }),
  color: scalar("snow.color", s.snow.color),
  opacity: scalar("snow.opacity", s.snow.opacity, {
    min: 0,
    max: 1,
    step: 0.01,
  }),
  spreadRange: scalar("snow.spreadRange", s.snow.spreadRange, {
    min: 1000,
    max: 20000,
    step: 100,
  }),
  heightRange: scalar("snow.heightRange", s.snow.heightRange, {
    min: 100,
    max: 10000,
    step: 100,
  }),
});

const speakerLightSchema = (s) => ({
  intensity: scalar("speakerLight.intensity", s.speakerLight.intensity, {
    min: 0,
    max: 5,
    step: 0.01,
  }),
  decay: scalar("speakerLight.decay", s.speakerLight.decay, {
    min: 0,
    max: 10,
    step: 0.1,
  }),
  distance: scalar("speakerLight.distance", s.speakerLight.distance, {
    min: 100,
    max: 10000,
    step: 50,
  }),
  color: scalar("speakerLight.color", s.speakerLight.color),
});

// All sections in a single registry so we can iterate them uniformly when
// pushing defaults back into Leva on reset.
const SECTIONS = [
  ["orbit", orbitSchema],
  ["camera", cameraSchema],
  ["dayLighting", dayLightingSchema],
  ["nightLighting", nightLightingSchema],
  ["daySky", daySkySchema],
  ["nightSky", nightSkySchema],
  ["stars", starsSchema],
  ["snow", snowSchema],
  ["speakerLight", speakerLightSchema],
];

// Recursively flatten a Leva schema into a { fieldKey: value } map suitable
// for passing to the setter returned from useControls. The Leva setter takes
// schema *leaf keys* (not full dot-paths), and folder() helpers hoist their
// children into the same flat keyspace, so this walks any nested folder()
// entries and extracts only the leaf controls with a `value` field. Buttons
// (no `value`) are skipped.
function flattenSchemaValues(schema) {
  const out = {};
  for (const [key, val] of Object.entries(schema)) {
    if (!val || typeof val !== "object") continue;
    // folder() returns { type: SpecialInputs.FOLDER, schema, settings }
    if ("schema" in val && val.schema) {
      Object.assign(out, flattenSchemaValues(val.schema));
    } else if ("value" in val) {
      out[key] = val.value;
    }
  }
  return out;
}

function DebugPanelInner() {
  // Snapshot at mount — Leva schema is one-shot per useControls call. Edits
  // flow back into the store via each field's onChange.
  const s = useDebugStore.getState();

  // Each section's setter — captured so a useEffect-based store subscription
  // can push fresh values into Leva any time the store changes (which is how
  // both Reset-all and Clear-all transform overrides take effect on the UI).
  const settersRef = useRef({});

  useControls("Tools", () => ({
    "Copy as JSON": button(() =>
      copyToClipboard(toJSON(useDebugStore.getState()), "JSON")
    ),
    "Copy as JSX": button(() =>
      copyToClipboard(toJSX(useDebugStore.getState()), "JSX")
    ),
    "Clear all transform overrides": button(() =>
      useDebugStore.getState().clearAllOverrides()
    ),
    "Reset all (clears localStorage)": button(() => {
      useDebugStore.persist?.clearStorage?.();
      useDebugStore.getState().reset();
      // The store.subscribe below handles syncing the new defaults into
      // Leva's UI — no need to call setters manually here.
    }),
    Instructions: folder(
      {
        // Read-only hints — Leva renders these as disabled text rows.
        hint1: {
          value: "Alt + Click a 3D object to select it",
          editable: false,
          label: "tip",
        },
        hint2: {
          value: "Esc to deselect · Cmd/Ctrl + . to hide panel",
          editable: false,
          label: "tip",
        },
      },
      { collapsed: true }
    ),
  }));

  // Register each section with its initial schema and capture the setter so
  // the subscription below can push fresh values into Leva's UI any time
  // the store changes.
  const [, setOrbit] = useControls("Orbit Controls", () => orbitSchema(s));
  settersRef.current.orbit = setOrbit;

  const [, setCamera] = useControls("Camera", () => cameraSchema(s));
  settersRef.current.camera = setCamera;

  const [, setDayLighting] = useControls("Day Lighting", () =>
    dayLightingSchema(s)
  );
  settersRef.current.dayLighting = setDayLighting;

  const [, setNightLighting] = useControls("Night Lighting", () =>
    nightLightingSchema(s)
  );
  settersRef.current.nightLighting = setNightLighting;

  const [, setDaySky] = useControls("Day Sky", () => daySkySchema(s));
  settersRef.current.daySky = setDaySky;

  const [, setNightSky] = useControls("Night Sky", () => nightSkySchema(s));
  settersRef.current.nightSky = setNightSky;

  const [, setStars] = useControls("Stars", () => starsSchema(s));
  settersRef.current.stars = setStars;

  const [, setSnow] = useControls("Snow", () => snowSchema(s));
  settersRef.current.snow = setSnow;

  const [, setSpeakerLight] = useControls("Speaker Light", () =>
    speakerLightSchema(s)
  );
  settersRef.current.speakerLight = setSpeakerLight;

  // Subscribe-driven sync: any store change re-pushes the current section
  // values into Leva. This is idempotent — Leva's internal store dequals on
  // identical values, so the user's own slider edits (store update → this
  // subscription → setter back into leva) end up as a no-op. The win is
  // that Reset-all / Clear-overrides / programmatic store mutations now all
  // reflect in the sliders without needing a page refresh.
  useEffect(() => {
    return useDebugStore.subscribe((state, prev) => {
      for (const [key, schemaFn] of SECTIONS) {
        // Skip sections whose blob didn't change — saves work and keeps the
        // sync near-free when the user is just editing one slider.
        if (state[key] === prev[key]) continue;
        const setter = settersRef.current[key];
        if (!setter) continue;
        setter(flattenSchemaValues(schemaFn(state)));
      }
    });
  }, []);

  return null;
}

export default function DebugPanel() {
  const [enabled] = useState(isDebugEnabled);
  const [visible, setVisible] = useState(true);

  // Cmd/Ctrl + . toggles the panel. Not commonly used by browsers/Mac, so it's
  // a safe-ish global shortcut.
  useEffect(() => {
    if (!enabled) return;
    const onKey = (e) => {
      const mod = e.metaKey || e.ctrlKey;
      if (mod && e.key === ".") {
        e.preventDefault();
        setVisible((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <Leva collapsed hidden={!visible} />
      <DebugPanelInner />
      <SelectionInspector />
    </>
  );
}
