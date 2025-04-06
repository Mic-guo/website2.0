import { create } from "zustand";

const useUIStore = create((set) => ({
  isNightMode: true,
  isCursorTextVisible: true,
  isLandingPageVisible: true,
  isZoomedIn: false,
  cameraAnimation: null,
  fromPolaroid: false,
  isTVModalOpen: false,

  setIsNightMode: (isNightMode) => set({ isNightMode }),
  setIsCursorTextVisible: (isCursorTextVisible) => set({ isCursorTextVisible }),
  setIsLandingPageVisible: (isLandingPageVisible) =>
    set({ isLandingPageVisible }),
  setCameraAnimation: (cameraAnimation) => set({ cameraAnimation }),
  setIsZoomedIn: (isZoomedIn) => set({ isZoomedIn }),
  setFromPolaroid: (fromPolaroid) => set({ fromPolaroid }),
  setIsTVModalOpen: (isTVModalOpen) => set({ isTVModalOpen }),
}));

export default useUIStore;
