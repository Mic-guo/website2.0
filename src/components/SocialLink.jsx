import React from "react";
import { useTheme } from "../context/ThemeContext.jsx";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Fragment } from "react";

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

const SocialLink = ({ onClick, isNightMode }) => {
  const theme = useTheme();

  return (
    <>
      {socialLinks.map((link, index) => (
        <Fragment key={index}>
          <a
            href={link.href}
            className={`${
              isNightMode ? theme.textLight : theme.iconDefault
            } text-2xl ${
              theme.iconHover
            } transition-colors duration-300 cursor-none px-4`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              e.stopPropagation();
              if (onClick) onClick(e);
            }}
          >
            <link.icon />
          </a>
        </Fragment>
      ))}
    </>
  );
};

export default SocialLink;
