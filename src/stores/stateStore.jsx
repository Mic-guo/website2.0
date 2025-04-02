import { create } from "zustand";

const useStateStore = create((set, get) => ({
  // Stack to keep track of navigation states
  currentState: "landing",
  navigationStack: ["landing"],
  isZoomedIn: false,

  // Push a new state to the stack
  pushState: (state) =>
    set((prev) => ({
      navigationStack: [...prev.navigationStack, state],
      currentState: state,
    })),

  // Pop the last state and return it
  popState: () =>
    set((prev) => ({
      navigationStack: prev.navigationStack.slice(0, -1),
      currentState: prev.navigationStack[prev.navigationStack.length - 1],
    })),

  // Control zoom state
  setZoom: (zoomed) => set({ isZoomedIn: zoomed }),
}));

export default useStateStore;
