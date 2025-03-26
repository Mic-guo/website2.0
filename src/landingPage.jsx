import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useTheme } from "./context/ThemeContext";
import { useNavigate } from "react-router-dom";
import SocialLink from "./components/SocialLink";

gsap.registerPlugin(TextPlugin);

const LandingPage = () => {
  const theme = useTheme();
  const textRef = useRef(null);
  const cursorRef = useRef(null);
  const contentRef = useRef(null);
  const navigate = useNavigate();

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

  const handleClick = () => {
    // Create zoom animation
    gsap.to(contentRef.current, {
      scale: 10,
      opacity: 0,
      duration: 1.5,
      ease: "power2.inOut",
      onComplete: () => {
        navigate("/polaroid");
      },
    });
  };

  const socialLinks = [
    {
      href: "https://github.com/Mic-Guo",
      icon: FaGithub,
    },
    {
      href: "https://www.linkedin.com/in/Mic-guo/",
      icon: FaLinkedin,
    },
    {
      href: "https://www.instagram.com/michael.goop/",
      icon: FaInstagram,
    },
    {
      href: "mailto:mickeyg@umich.edu",
      icon: MdEmail,
    },
  ];

  return (
    <>
      <div
        className={`h-screen w-full flex justify-center items-center ${theme.background} flex-col relative overflow-hidden cursor-pointer`}
        onClick={handleClick}
      >
        {/* Main content */}
        <div ref={contentRef} className="flex flex-col items-center">
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
            {socialLinks.map((link, index) => (
              <SocialLink key={index} href={link.href} icon={link.icon} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
