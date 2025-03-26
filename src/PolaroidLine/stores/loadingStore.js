import { create } from "zustand";

const ROPES_COUNT = 3;
const MODELS_PER_ROPE = 7;
const TOTAL_MODELS = ROPES_COUNT * MODELS_PER_ROPE;

export const useLoadingStore = create((set) => ({
  totalProgress: 0,
  loadedModels: 0,
  updateProgress: () => {
    set((state) => {
      const newLoadedModels = state.loadedModels + 1;
      const newProgress = Number((newLoadedModels / TOTAL_MODELS).toFixed(3));

      return {
        loadedModels: newLoadedModels,
        totalProgress: newProgress,
      };
    });
  },
}));
