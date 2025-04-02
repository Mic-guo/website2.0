import { create } from "zustand";

const useUIStore = create((set) => ({
  isNightMode: false,
  isCursorTextVisible: true,
  isLandingPageVisible: true,
  isZoomedIn: false,
  cameraPosition: "up",
  isTransitioning: false,

  setIsNightMode: (isNightMode) => set({ isNightMode }),
  setIsCursorTextVisible: (isCursorTextVisible) => set({ isCursorTextVisible }),
  setIsLandingPageVisible: (isLandingPageVisible) =>
    set({ isLandingPageVisible }),
  setCameraPosition: (cameraPosition) => set({ cameraPosition }),
  setIsZoomedIn: (isZoomedIn) => set({ isZoomedIn }),
  setIsTransitioning: (isTransitioning) => set({ isTransitioning }),
}));

export default useUIStore;
