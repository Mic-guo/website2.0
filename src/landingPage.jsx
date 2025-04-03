import { useRef, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { useTheme } from "./context/ThemeContext";
import { useNavigate } from "react-router-dom";
import SocialLink from "./components/SocialLink";
import CursorText from "./components/CursorText";
import House from "./House/House";
import useStateStore from "./stores/stateStore";
import NightModeToggle from "./components/NightModeToggle";
import useUIStore from "./stores/UIStore";
import useNavigationHandler from "./controllers/navigationHandler";

gsap.registerPlugin(TextPlugin);

const useTextAnimation = (textRef, cursorRef, isActive) => {
  useEffect(() => {
    if (!isActive || !textRef.current || !cursorRef.current) return;

    const texts = ["Software Engineer", "Web Developer", "Photographer"];

    const createTypeSequence = (textArray) => {
      const timeline = gsap.timeline({ repeat: -1 });

      textArray.forEach((text) => {
        timeline
          .to(textRef.current, {
            duration: 1.5,
            text: text,
            ease: "none",
          })
          .to(textRef.current, {
            duration: 1,
            text: {
              value: "",
              rtl: true,
            },
            ease: "none",
            delay: 1,
          });
      });

      return timeline;
    };

    // Create sequence from texts array
    const sequence = createTypeSequence(texts);

    // Simple cursor blink
    const cursorAnim = gsap.to(cursorRef.current, {
      opacity: 0,
      repeat: -1,
      yoyo: true,
      duration: 0.6,
    });

    // Cleanup function
    return () => {
      sequence.kill();
      cursorAnim.kill();
    };
  }, [textRef, cursorRef, isActive]);
};

const LandingPage = () => {
  const theme = useTheme();
  const textRef = useRef(null);
  const cursorRef = useRef(null);
  const contentRef = useRef(null);
  const houseWrapperRef = useRef(null);

  const getRefsForState = useCallback((state) => {
    switch (state) {
      case "houseScene":
        return {
          contentRef,
          houseWrapperRef,
        };
      default:
        return {};
    }
  }, []);

  const { isLandingPageVisible, isNightMode, fromPolaroid } = useUIStore();
  const { handleEnterNavigationState, handleExitNavigationState } =
    useNavigationHandler(getRefsForState);

  useTextAnimation(textRef, cursorRef, isLandingPageVisible);

  return (
    <>
      <div
        ref={houseWrapperRef}
        className={`fixed filter ${
          fromPolaroid ? "blur-0" : "blur-2xl"
        } cursor-none`}
      >
        <House />
      </div>
      {!isLandingPageVisible && (
        <button
          onClick={handleExitNavigationState}
          className={`
              absolute top-5 left-5
              p-3 rounded-full border-none
              bg-white/40 hover:bg-white/60 cursor-none
              z-[1000] backdrop-blur-sm
              flex items-center justify-center
              w-12 h-12 shadow-md
              ${isNightMode ? "text-[#fed77b]" : "text-[#6a5f4b]"}
            `}
        >
          ←
        </button>
      )}
      <NightModeToggle />
      {isLandingPageVisible && (
        <div
          className={`h-screen w-screen flex justify-center items-center bg-transparent flex-col fixed overflow-hidden cursor-none main-clickable-area`}
          onClick={() => handleEnterNavigationState("houseScene")}
        >
          {/* Main content */}
          <div ref={contentRef} className="flex flex-col items-center">
            <div className="flex flex-col gap-2 justify-center items-center z-10">
              <h1
                className={`text-6xl ${
                  isNightMode ? theme.textLight : theme.textPrimary
                } font-leiko transition-colors duration-300`}
              >
                Michael Guo
              </h1>
              <div
                className={`flex text-6xl ${theme.textSecondary} font-leiko`}
              >
                <h1 ref={textRef}></h1>
                <span ref={cursorRef}>|</span>
              </div>
            </div>

            {/* Social links */}
            <div
              className="flex justify-between items-center gap-2 mt-6 z-10"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
              }}
            >
              <SocialLink />
            </div>
          </div>
        </div>
      )}
      <CursorText />
    </>
  );
};

export default LandingPage;
