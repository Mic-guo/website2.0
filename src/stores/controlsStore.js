import { create as createStore } from "zustand";

export const useControlsStore = createStore((set) => ({
  controlsRef: null,
  setControlsRef: (ref) => set({ controlsRef: ref }),
  enableRotate: true,
  setEnableRotate: (enabled) => set({ enableRotate: enabled }),
}));
