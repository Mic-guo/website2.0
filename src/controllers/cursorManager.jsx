// CursorManager.jsx with improved approach
import { useEffect, useRef } from "react";
import cursorDot from "cursor-dot";

const CursorManager = ({ children }) => {
  const cursorRef = useRef(null);

  useEffect(() => {
    // Create a style element instead of inline styles
    const styleElement = document.createElement("style");
    styleElement.innerHTML = `
      * {
        cursor: none !important;
      }
    `;
    document.body.appendChild(styleElement);

    // Initialize cursor-dot
    const cursor = cursorDot({
      diameter: 8,
      borderWidth: 1,
      borderColor: "#522706",
      easing: 2,
    });

    cursorRef.current = cursor;

    // Clean up when component unmounts
    return () => {
      if (cursorRef.current) {
        cursorRef.current.remove();
      }
      document.body.removeChild(styleElement);
    };
  }, []);

  return <div>{children}</div>;
};

export default CursorManager;
