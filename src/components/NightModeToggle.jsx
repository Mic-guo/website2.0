import { BsSun, BsMoonStars } from "react-icons/bs";
import useUIStore from "../stores/UIStore";

const NightModeToggle = () => {
  const { isNightMode, setIsNightMode } = useUIStore();
  
  return (
    <button
      onClick={() => setIsNightMode(!isNightMode)}
      className={`
        fixed bottom-5 right-5
        p-3 rounded-full border-none
        bg-white/40 hover:bg-white/60 cursor-none
        z-[1000] backdrop-blur-sm
        flex items-center justify-center
        w-12 h-12 shadow-md
        ${isNightMode ? "text-[#fed77b]" : "text-[#6a5f4b]"}
      `}
    >
      {isNightMode ? <BsSun size={24} /> : <BsMoonStars size={24} />}
    </button>
  );
};

export default NightModeToggle;
