import { create } from "zustand";

const useHoverStore = create((set) => ({
  // Current hovered item (null when nothing is hovered)
  hoveredItem: null,

  // Function to set the hovered item
  setHoveredItem: (item) => {
    set({ hoveredItem: item });
  },

  // Function to clear the hovered item
  clearHover: () => {
    set({ hoveredItem: null });
  },
}));

export default useHoverStore;
