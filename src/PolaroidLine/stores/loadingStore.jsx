import { create } from "zustand";

export const useLoadingStore = create((set) => ({
  target: null,
  totalProgress: 0,
  loadedModels: 0,
  setTarget: (target) => {
    set({ target });
  },
  updateProgress: () => {
    set((state) => {
      if (state.target === null) {
        return;
      }
      const newLoadedModels = state.loadedModels + 1;
      const newProgress = Number((newLoadedModels / state.target).toFixed(3));

      return {
        loadedModels: newLoadedModels,
        totalProgress: newProgress,
      };
    });
  },
}));
