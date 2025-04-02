import { create } from "zustand";

const ROPES_COUNT = 3;
const MODELS_PER_ROPE = 7;
const TOTAL_MODELS = ROPES_COUNT * MODELS_PER_ROPE;

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
