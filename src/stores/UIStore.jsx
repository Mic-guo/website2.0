import { create } from "zustand";

const useUIStore = create((set) => ({
  isNightMode: false,
  isCursorTextVisible: true,
  isLandingPageVisible: true,
  isZoomedIn: false,
  cameraAnimation: null,
  fromPolaroid: false,

  setIsNightMode: (isNightMode) => set({ isNightMode }),
  setIsCursorTextVisible: (isCursorTextVisible) => set({ isCursorTextVisible }),
  setIsLandingPageVisible: (isLandingPageVisible) =>
    set({ isLandingPageVisible }),
  setCameraAnimation: (cameraAnimation) => set({ cameraAnimation }),
  setIsZoomedIn: (isZoomedIn) => set({ isZoomedIn }),
  setFromPolaroid: (fromPolaroid) => set({ fromPolaroid }),
}));

export default useUIStore;
