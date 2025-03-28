import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { BsSun, BsMoonStars } from "react-icons/bs";

import { useTheme } from "./context/ThemeContext";
import { useNavigate } from "react-router-dom";
import SocialLink from "./components/SocialLink";
import House from "./House/House";
import CursorManager from "./House/controllers/cursorManager";

gsap.registerPlugin(TextPlugin);

const LandingPage = () => {
  const theme = useTheme();
  const textRef = useRef(null);
  const cursorRef = useRef(null);
  const contentRef = useRef(null);
  const houseWrapperRef = useRef(null);
  const [showLandingPage, setShowLandingPage] = useState(true);
  const [isNightMode, setIsNightMode] = useState(false);
  const cursorManagerRef = useRef(null);
  const textElementRef = useRef(null);
  const textPositionRef = useRef({ x: 0, y: 0 });
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const [cameraPosition, setCameraPosition] = useState("up");

  const initializeTextAnimation = () => {
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
    createTypeSequence(texts);

    // Simple cursor blink
    gsap.to(cursorRef.current, {
      opacity: 0,
      repeat: -1,
      yoyo: true,
      duration: 0.6,
    });
  };

  // Cursor Text: Click anywhere to start
  useEffect(() => {
    if (showLandingPage) {
      // Small delay to ensure refs are available
      setTimeout(initializeTextAnimation, 100);

      // Create text element
      const textElement = document.createElement("div");
      textElement.textContent = "Click to start";
      textElement.style.position = "fixed";
      textElement.style.pointerEvents = "none";
      textElement.style.color = "#b45309";
      textElement.style.fontSize = "14px";
      textElement.style.fontWeight = "500";
      textElement.style.fontFamily = "leiko";
      textElement.style.userSelect = "none";
      textElement.style.zIndex = "9999";
      textElement.style.opacity = "0";
      textElement.style.whiteSpace = "nowrap";
      textElement.style.transition = "opacity 0.3s ease";
      textElement.style.left = "0";
      textElement.style.top = "0";

      document.body.appendChild(textElement);
      textElementRef.current = textElement;

      const updateMousePosition = (e) => {
        mousePositionRef.current = {
          x: e.clientX,
          y: e.clientY,
        };

        // Update text visibility based on hover, but exclude text elements
        const target = e.target;
        if (
          target.classList.contains("main-clickable-area") ||
          target.tagName.toLowerCase() === "h1" ||
          target.tagName.toLowerCase() === "span"
        ) {
          textElement.style.opacity = "0.9";
        } else {
          textElement.style.opacity = "0";
        }
      };

      const animate = () => {
        if (textElementRef.current) {
          const easing = 4;
          const targetX = mousePositionRef.current.x + 15;
          const targetY = mousePositionRef.current.y;

          // Apply easing
          textPositionRef.current.x +=
            (targetX - textPositionRef.current.x) / easing;
          textPositionRef.current.y +=
            (targetY - textPositionRef.current.y) / easing;

          textElementRef.current.style.transform = `translate(${textPositionRef.current.x}px, ${textPositionRef.current.y}px)`;
        }
        animationFrameId = requestAnimationFrame(animate);
      };

      let animationFrameId = requestAnimationFrame(animate);

      window.addEventListener("mousemove", updateMousePosition);

      return () => {
        window.removeEventListener("mousemove", updateMousePosition);
        cancelAnimationFrame(animationFrameId);
        if (document.body.contains(textElement)) {
          document.body.removeChild(textElement);
        }
      };
    }
  }, [showLandingPage]);

  const handleClick = () => {
    // Hide text immediately
    if (cursorManagerRef.current) {
      cursorManagerRef.current.hideText();
    }

    // Trigger camera animation immediately
    setCameraPosition("down");

    // Continue with existing animation
    gsap.to(contentRef.current, {
      scale: 10,
      opacity: 0,
      duration: 1.5,
      ease: "power2.inOut",
      onComplete: () => {
        setShowLandingPage(false);
        gsap.to(houseWrapperRef.current, {
          filter: "blur(0px)",
          duration: 0.5,
        });
      },
    });
  };

  const handleBack = () => {
    // Reset camera position
    setCameraPosition("up");

    // First set showLandingPage to true
    setShowLandingPage(true);

    // Use requestAnimationFrame to wait for next render
    requestAnimationFrame(() => {
      // Reapply blur to house
      gsap.to(houseWrapperRef.current, {
        filter: "blur(8px)",
        duration: 0.5,
      });

      // Reset content scale and opacity after content is mounted
      gsap.fromTo(
        contentRef.current,
        { scale: 10, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.5, ease: "power2.inOut" }
      );
    });
  };

  return (
    <CursorManager showLandingPage={showLandingPage}>
      <>
        <div ref={houseWrapperRef} className="fixed filter blur-xl">
          <House isNightMode={isNightMode} cameraPosition={cameraPosition} />
        </div>
        {!showLandingPage && (
          <button
            onClick={handleBack}
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
        <button
          onClick={() => {
            setIsNightMode(!isNightMode);
          }}
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
        {showLandingPage && (
          <div
            className={`h-screen w-screen flex justify-center items-center bg-transparent flex-col fixed overflow-hidden cursor-none main-clickable-area`}
            onClick={handleClick}
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
                <SocialLink isNightMode={isNightMode} />
              </div>
            </div>
          </div>
        )}
      </>
    </CursorManager>
  );
};

export default LandingPage;
