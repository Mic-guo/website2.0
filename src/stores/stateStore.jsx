import { create } from "zustand";

const useStateStore = create((set, get) => ({
  // Stack to keep track of navigation states
  navigationStack: ["landing"],
  isZoomedIn: false,

  // Push a new state to the stack
  pushState: (state) =>
    set((prev) => ({
      navigationStack: [...prev.navigationStack, state],
    })),

  // Pop the last state and return it
  popState: () =>
    set((prev) => ({
      navigationStack: prev.navigationStack.slice(0, -1),
    })),

  // Get current state (last item in stack)
  getCurrentState: () =>
    get().navigationStack[get().navigationStack.length - 1],

  // Control zoom state
  setZoom: (zoomed) => set({ isZoomedIn: zoomed }),
}));

export default useStateStore;
