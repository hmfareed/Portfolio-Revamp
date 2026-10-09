'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemeKey = 'pencil';

interface ThemeContextType {
  currentTheme: ThemeKey;
  setTheme: (theme: ThemeKey) => void;
  toggleTheme: () => void;
  mounted: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  currentTheme: 'pencil',
  setTheme: () => {},
  toggleTheme: () => {},
  mounted: false,
});

export const useTheme = () => useContext(ThemeContext);

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: ThemeKey;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        currentTheme: 'pencil',
        setTheme: () => {},
        toggleTheme: () => {},
        mounted,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

// No theme switcher is rendered since Pencil is the single dedicated theme
export const ThemeToggle: React.FC = () => null;
export const ThemeSwitcher: React.FC = () => null;
