import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useTheme } from "./context/ThemeContext";

gsap.registerPlugin(TextPlugin);

const LandingPage = () => {
  const theme = useTheme();
  const textRef = useRef(null);
  const cursorRef = useRef(null);

  useEffect(() => {
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
    gsap.to(cursorRef.current, {
      opacity: 0,
      repeat: -1,
      yoyo: true,
      duration: 0.6,
    });
  }, []);

  return (
    <>
      <div
        className={`h-screen w-full flex justify-center items-center ${theme.background} flex-col relative overflow-hidden`}
      >
        {/* Main content */}
        <div className="flex flex-col gap-2 justify-center items-center z-10">
          <h1
            className={`text-6xl ${theme.textPrimary} font-leiko tracking-tight`}
          >
            Michael Guo
          </h1>
          <div className={`flex text-6xl ${theme.textSecondary} font-leiko`}>
            <h1 ref={textRef}></h1>
            <span ref={cursorRef}>|</span>
          </div>
        </div>

        {/* Social links */}
        <div className="flex justify-between items-center gap-8 mt-6 z-10">
          <a
            href="https://github.com/Mic-Guo"
            className={`${theme.iconDefault} text-2xl ${theme.iconHover} transition-colors duration-300`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/Mic-guo/"
            className={`${theme.iconDefault} text-2xl ${theme.iconHover} transition-colors duration-300`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://www.instagram.com/michael.goop/"
            className={`${theme.iconDefault} text-2xl ${theme.iconHover} transition-colors duration-300`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram />
          </a>
          <a
            href="mailto:mickeyg@umich.edu"
            className={`${theme.iconDefault} text-2xl ${theme.iconHover} transition-colors duration-300`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MdEmail />
          </a>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
