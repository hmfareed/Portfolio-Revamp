'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export type ThemeKey = 'pencil' | 'brick';

interface ThemeContextType {
  currentTheme: ThemeKey;
  setTheme: (theme: ThemeKey) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  currentTheme: 'brick',
  setTheme: () => {},
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: ThemeKey;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultTheme = 'brick',
}) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeKey>(defaultTheme);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const savedTheme = localStorage.getItem('portfolio_theme') as ThemeKey | null;
      if (savedTheme && (savedTheme === 'pencil' || savedTheme === 'brick')) {
        setCurrentTheme(savedTheme);
      }
    } catch {
      // localStorage may be disabled
    }
  }, []);

  const setTheme = (newTheme: ThemeKey) => {
    setCurrentTheme(newTheme);
    try {
      localStorage.setItem('portfolio_theme', newTheme);
      document.cookie = `portfolio_theme=${newTheme}; path=/; max-age=31536000; SameSite=Lax`;
    } catch {
      // ignore
    }

    // Dynamically update favicon in the browser tab
    const faviconEl = document.querySelector<HTMLLinkElement>("link[rel*='icon']");
    if (faviconEl) {
      faviconEl.href = newTheme === 'brick' ? '/brick-favicon.svg' : '/favicon.svg';
    }
  };

  const toggleTheme = () => {
    setTheme(currentTheme === 'pencil' ? 'brick' : 'pencil');
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * Top Corner Floating Theme Toggle
 * Tactile pill in the top-right corner to switch between Pencil and Brick Builder
 */
export const ThemeToggle: React.FC = () => {
  const { currentTheme, setTheme } = useTheme();
  const shouldReduceMotion = useReducedMotion();

  return (
    <aside
      aria-label="Theme Switcher"
      className="fixed top-3 right-3 sm:top-5 sm:right-6 z-50 select-none"
    >
      <div
        className={`flex items-center p-1 sm:p-1.5 rounded-2xl transition-all duration-300 ${
          currentTheme === 'brick'
            ? 'bg-[#1A1F2B]/85 backdrop-blur-md border-2 border-black/30 shadow-[0_8px_20px_rgba(0,0,0,0.35)]'
            : 'bg-[#FBF8EF]/95 backdrop-blur-md border-2 border-[#2B2B2B] shadow-[3px_3px_0px_#2B2B2B]'
        }`}
        style={
          currentTheme === 'pencil'
            ? { filter: 'url(#pencil-wobble)' }
            : {
                boxShadow:
                  'inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 8px 20px rgba(0, 0, 0, 0.35)',
              }
        }
      >
        {/* Pencil Option Button */}
        <button
          type="button"
          onClick={() => setTheme('pencil')}
          aria-pressed={currentTheme === 'pencil'}
          className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            currentTheme === 'pencil'
              ? 'text-[#2B2B2B]'
              : currentTheme === 'brick'
              ? 'text-stone-300 hover:text-white'
              : 'text-stone-600 hover:text-[#2B2B2B]'
          }`}
        >
          {currentTheme === 'pencil' && (
            <motion.div
              layoutId="theme-active-indicator"
              className="absolute inset-0 bg-[#FFE66D] rounded-xl border border-[#2B2B2B] shadow-[1px_1px_0px_#2B2B2B]"
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { type: 'spring', stiffness: 450, damping: 30 }
              }
            />
          )}
          <span className="relative z-10 flex items-center gap-1.5 font-handwriting">
            <svg
              className="w-3.5 h-3.5 shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
              <path d="m15 5 4 4" />
            </svg>
            <span>Pencil</span>
          </span>
        </button>

        {/* Brick Option Button */}
        <button
          type="button"
          onClick={() => setTheme('brick')}
          aria-pressed={currentTheme === 'brick'}
          className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            currentTheme === 'brick'
              ? 'text-white'
              : currentTheme === 'pencil'
              ? 'text-stone-600 hover:text-[#2B2B2B]'
              : 'text-stone-300 hover:text-white'
          }`}
        >
          {currentTheme === 'brick' && (
            <motion.div
              layoutId="theme-active-indicator"
              className="absolute inset-0 bg-[#D1382B] rounded-xl border-b-2 border-[#9E2419]"
              style={{
                boxShadow:
                  'inset 0 1.5px 0 rgba(255, 255, 255, 0.45), 0 3px 6px rgba(0, 0, 0, 0.25)',
              }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { type: 'spring', stiffness: 450, damping: 30 }
              }
            />
          )}
          <span className="relative z-10 flex items-center gap-1.5 font-heading uppercase tracking-wider">
            {/* Tiny 2-stud brick icon */}
            <svg
              className="w-3.5 h-3.5 shrink-0"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <rect x="2" y="6" width="16" height="12" rx="2.5" />
              <circle cx="6.5" cy="4" r="2" />
              <circle cx="13.5" cy="4" r="2" />
            </svg>
            <span>Brick</span>
          </span>
        </button>
      </div>
    </aside>
  );
};
