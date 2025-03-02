"use client";
import React, { createContext, useState } from "react";

interface ThemeType {
  theme: boolean;
  setTheme: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ThemeContext = createContext<ThemeType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<boolean>(false);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
