import { useEffect, useRef } from "react";
import useUIStore from "../stores/UIStore";

const CursorText = () => {
  const textElementRef = useRef(null);
  const textPositionRef = useRef({ x: 0, y: 0 });
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const { isCursorTextVisible } = useUIStore();

  useEffect(() => {
    if (isCursorTextVisible) {
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
  }, [isCursorTextVisible]);

  return null;
};

export default CursorText;
