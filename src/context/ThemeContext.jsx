import React, { createContext, useContext } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const theme = {
    background: "bg-stone-50",
    textLight: "text-stone-200",
    textPrimary: "text-stone-800",
    textSecondary: "text-amber-700",
    iconDefault: "text-stone-700",
    iconHover: "hover:text-amber-600",
    fontLeiko: "font-leiko",
  };

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
