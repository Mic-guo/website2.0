import { create } from "zustand";
import { persist } from "zustand/middleware";

// Default values mirror what's currently hardcoded in each source file. The
// debugStore becomes the single source of truth; if you change a default
// here, also bump `version` below so any stale persisted state is dropped.
export const DEFAULTS = {
  orbit: {
    rotateSpeed: 0.2,
    dampingFactor: 0.05,
    mouseWheelSpeed: 0.5,
    maxZoom: 1,
    minZoom: 0.3,
    target: [39.23, 2427.88, 306.66],
    maxPolarAngle: Math.PI / 2,
    minPolarAngle: Math.PI / 4,
  },
  camera: {
    // House.jsx composes the OrthographicCamera position as
    // MODEL_BASE_POSITION + offset + animationOffset.
    offset: [-1500, 700, 3000],
    animationOffset: [0, 1000, -1000],
    zoom: 0.1,
  },
  dayLighting: {
    ambient: { intensity: 0.2, color: "#FFA07A" },
    directional: {
      intensity: 0.4,
      color: "#FF7E5F",
      position: [-10, 8, 10],
    },
    point: {
      intensity: 0.4,
      color: "#FFD700",
      position: [-20, 10, -10],
    },
  },
  nightLighting: {
    ambient: { intensity: 0.5, color: "#3A3A5C" },
    directional: {
      intensity: 0.3,
      color: "#E0E8FF",
      position: [-10, 8, 10],
    },
  },
  daySky: {
    stop1: { offset: 0.3, color: "#d1a658" },
    stop2: { offset: 0.6, color: "#fa874d" },
  },
  nightSky: {
    stop1: { offset: 0.01, color: "#030b1c" },
    stop2: { offset: 0.6, color: "#0F1E45" },
    stop3: { offset: 0.9, color: "#1A1A40" },
  },
  stars: {
    count: 100,
    sizeMin: 1,
    sizeMax: 4,
    color: "#fbfec6",
  },
  snow: {
    count: 200,
    size: 4,
    color: "#ffffff",
    opacity: 0.8,
    spreadRange: 8000,
    heightRange: 2000,
  },
  speakerLight: {
    intensity: 0.97,
    decay: 6,
    distance: 4574,
    color: "#fee5bc",
  },
  // Per-object transform overrides, keyed by scene-graph path (a slash-joined
  // chain of object .name properties from the three.js Scene root down to the
  // target). Path is used (not UUID) because UUIDs change between component
  // mounts, while names are stable across reloads and even across
  // mount/unmount cycles (e.g. polaroids that only mount when zoomed in).
  // Shape: { [path]: { position?: [x,y,z], rotation?: [x,y,z], scale?: [x,y,z] } }
  overrides: {},
};

// Deep-clone helper that's safe for the plain-data shapes we keep in the
// store (no functions, no Maps, no Dates). Used so `reset()` always hands
// back a fresh, mutation-isolated copy of DEFAULTS.
const cloneDefaults = () => JSON.parse(JSON.stringify(DEFAULTS));

const useDebugStore = create(
  persist(
    (set, get) => ({
      ...cloneDefaults(),
      // Live, non-persisted selection — populated by SceneEditor when the
      // user Alt-clicks something. `path` doubles as the key into overrides;
      // initial position/rotation/scale snapshot the object's effective
      // transform at click time so the Leva sliders open with the right values.
      selection: {
        path: null,
        name: null,
        type: null,
        position: [0, 0, 0],
        rotation: [0, 0, 0],
        scale: [1, 1, 1],
      },

      // Per-path "original" transform snapshots, captured by SceneEditor the
      // first time it sees an override for that path. Used to restore objects
      // (and resync the SelectionInspector's Leva sliders) when an override
      // is cleared. NOT persisted — paths reference live three.js objects
      // that get fresh source transforms on every reload anyway.
      originals: {},

      setSection: (section, value) => set({ [section]: value }),

      setPath: (path, value) =>
        set((state) => {
          const keys = path.split(".");
          const next = { ...state };
          let cursor = next;
          for (let i = 0; i < keys.length - 1; i++) {
            const k = keys[i];
            cursor[k] = Array.isArray(cursor[k])
              ? [...cursor[k]]
              : { ...cursor[k] };
            cursor = cursor[k];
          }
          cursor[keys[keys.length - 1]] = value;
          return next;
        }),

      selectObject: ({ path, name, type, position, rotation, scale }) =>
        set({
          selection: { path, name, type, position, rotation, scale },
        }),

      clearSelection: () =>
        set({
          selection: {
            path: null,
            name: null,
            type: null,
            position: [0, 0, 0],
            rotation: [0, 0, 0],
            scale: [1, 1, 1],
          },
        }),

      // Patch a single transform component on an override entry (e.g.
      // setOverride("Scene/Roof layer", "scale", [4, 4, 4])).
      setOverride: (path, key, value) =>
        set((state) => ({
          overrides: {
            ...state.overrides,
            [path]: { ...(state.overrides[path] || {}), [key]: value },
          },
        })),

      clearOverride: (path) =>
        set((state) => {
          const next = { ...state.overrides };
          delete next[path];
          return { overrides: next };
        }),

      clearAllOverrides: () => set({ overrides: {} }),

      setOriginal: (path, snapshot) =>
        set((state) => ({
          originals: { ...state.originals, [path]: snapshot },
        })),

      deleteOriginal: (path) =>
        set((state) => {
          const next = { ...state.originals };
          delete next[path];
          return { originals: next };
        }),

      reset: () => {
        const fresh = cloneDefaults();
        set(fresh, false);
        // selection + originals aren't persisted but live in memory; clear
        // them so the UI doesn't hold stale references after a reset.
        get().clearSelection();
        set({ originals: {} });
      },
    }),
    {
      name: "debug-panel",
      version: 2,
      // Persist the section blobs + overrides, never persist `selection`.
      partialize: (state) =>
        Object.fromEntries(
          Object.keys(DEFAULTS).map((k) => [k, state[k]])
        ),
    }
  )
);

export default useDebugStore;
