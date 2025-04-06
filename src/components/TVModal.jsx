import React from "react";
import useUIStore from "../stores/UIStore";
import { useTheme } from "../context/ThemeContext";
import CursorManager from "./controllers/CursorManager";
const TVModal = () => {
  const { isTVModalOpen, setIsTVModalOpen } = useUIStore();
  const theme = useTheme();

  if (!isTVModalOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={() => setIsTVModalOpen(false)}
    >
      <div
        className={`relative w-[80vw] h-[60vh] ${theme.background} rounded-lg overflow-hidden shadow-2xl`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setIsTVModalOpen(false)}
          className={`absolute top-4 right-4 p-2 rounded-full border-none
            bg-white/40 hover:bg-white/60 cursor-none
            z-[1000] backdrop-blur-sm
            flex items-center justify-center
            w-8 h-8 shadow-md
            ${theme.textPrimary}`}
        >
          ×
        </button>
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-full h-full bg-black flex items-center justify-center">
            <div className="text-white text-2xl font-leiko">Coming Soon</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TVModal;
