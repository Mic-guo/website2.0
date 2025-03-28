import { useEffect, useRef, forwardRef } from "react";
import cursorDot from "cursor-dot";

const CursorManager = ({ children }) => {
  const cursorRef = useRef(null);

  useEffect(() => {
    // Add CSS to hide default cursor
    document.body.style.cursor = "none";

    // Initialize cursor-dot
    const cursor = cursorDot({
      diameter: 4,
      borderWidth: 1,
      borderColor: "#b45309",
      easing: 4,
    });

    cursorRef.current = cursor;

    // Clean up when component unmounts
    return () => {
      if (cursorRef.current) {
        cursorRef.current.remove();
      }
      // Reset cursor
      document.body.style.cursor = "default";
    };
  }, []);

  return <div>{children}</div>;
};

export default CursorManager;
