import React from "react";
import { useTheme } from "../context/ThemeContext.jsx";

const SocialLink = ({ href, icon: Icon, onClick }) => {
  const theme = useTheme();

  return (
    <a
      href={href}
      className={`${theme.iconDefault} text-2xl ${theme.iconHover} transition-colors duration-300`}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => {
        e.stopPropagation();
        if (onClick) onClick(e);
      }}
    >
      <Icon />
    </a>
  );
};

export default SocialLink;
