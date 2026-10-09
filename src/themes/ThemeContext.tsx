'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export type ThemeKey = 'pencil' | 'brick' | 'blocky' | 'chalk';

interface ThemeContextType {
  currentTheme: ThemeKey;
  setTheme: (theme: ThemeKey) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  currentTheme: 'chalk',
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
  defaultTheme = 'chalk',
}) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeKey>(defaultTheme);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const savedTheme = localStorage.getItem('portfolio_theme') as ThemeKey | null;
      if (
        savedTheme &&
        (savedTheme === 'pencil' ||
          savedTheme === 'brick' ||
          savedTheme === 'blocky' ||
          savedTheme === 'chalk')
      ) {
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
      if (newTheme === 'brick') {
        faviconEl.href = '/brick-favicon.svg';
      } else if (newTheme === 'blocky') {
        faviconEl.href = '/blocky-favicon.svg';
      } else if (newTheme === 'chalk') {
        faviconEl.href = '/chalk-favicon.svg';
      } else {
        faviconEl.href = '/favicon.svg';
      }
    }
  };

  const toggleTheme = () => {
    if (currentTheme === 'pencil') setTheme('brick');
    else if (currentTheme === 'brick') setTheme('blocky');
    else if (currentTheme === 'blocky') setTheme('chalk');
    else setTheme('pencil');
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * Top Corner Floating Theme Toggle
 * Tactile pill in the top-right corner to switch between Pencil, Brick, Blocky, and Chalkboard
 */
export const ThemeToggle: React.FC = () => {
  const { currentTheme, setTheme } = useTheme();
  const shouldReduceMotion = useReducedMotion();

  let containerStyles = '';
  let containerInlineStyle: React.CSSProperties = {};

  if (currentTheme === 'chalk') {
    containerStyles = 'bg-[#263D33]/95 backdrop-blur-md border-2 border-dashed border-[#F2F0E6]/60 shadow-[0_6px_16px_rgba(0,0,0,0.5)]';
  } else if (currentTheme === 'blocky') {
    containerStyles = 'bg-[#1E232A]/90 backdrop-blur-md border-3 border-black shadow-[0_6px_0_#0F1217]';
    containerInlineStyle = {
      boxShadow: 'inset 2px 2px 0 rgba(255,255,255,0.15), inset -2px -2px 0 rgba(0,0,0,0.6), 0 6px 0 #0F1217',
    };
  } else if (currentTheme === 'brick') {
    containerStyles = 'bg-[#1A1F2B]/85 backdrop-blur-md border-2 border-black/30 shadow-[0_8px_20px_rgba(0,0,0,0.35)]';
    containerInlineStyle = {
      boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 8px 20px rgba(0, 0, 0, 0.35)',
    };
  } else {
    containerStyles = 'bg-[#FBF8EF]/95 backdrop-blur-md border-2 border-[#2B2B2B] shadow-[3px_3px_0px_#2B2B2B]';
    containerInlineStyle = { filter: 'url(#pencil-wobble)' };
  }

  return (
    <aside
      aria-label="Theme Switcher"
      className="fixed top-3 right-3 sm:top-5 sm:right-6 z-50 select-none"
    >
      <div
        className={`flex items-center p-1 sm:p-1.5 rounded-2xl transition-all duration-300 ${containerStyles}`}
        style={containerInlineStyle}
      >
        {/* Pencil Option Button */}
        <button
          type="button"
          onClick={() => setTheme('pencil')}
          aria-pressed={currentTheme === 'pencil'}
          className={`relative flex items-center gap-1.5 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            currentTheme === 'pencil'
              ? 'text-[#2B2B2B]'
              : 'text-stone-300 hover:text-white'
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
          <span className="relative z-10 flex items-center gap-1 font-handwriting">
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
            <span className="hidden sm:inline">Pencil</span>
          </span>
        </button>

        {/* Brick Option Button */}
        <button
          type="button"
          onClick={() => setTheme('brick')}
          aria-pressed={currentTheme === 'brick'}
          className={`relative flex items-center gap-1.5 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            currentTheme === 'brick'
              ? 'text-white'
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
          <span className="relative z-10 flex items-center gap-1 font-heading uppercase tracking-wider">
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
            <span className="hidden sm:inline">Brick</span>
          </span>
        </button>

        {/* Blocky Option Button */}
        <button
          type="button"
          onClick={() => setTheme('blocky')}
          aria-pressed={currentTheme === 'blocky'}
          className={`relative flex items-center gap-1.5 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            currentTheme === 'blocky'
              ? 'text-[#1E232A]'
              : 'text-stone-300 hover:text-white'
          }`}
        >
          {currentTheme === 'blocky' && (
            <motion.div
              layoutId="theme-active-indicator"
              className="absolute inset-0 bg-[#FFD23F] rounded-xl border-b-2 border-[#D4A017]"
              style={{
                boxShadow:
                  'inset 0 1.5px 0 rgba(255, 255, 255, 0.6), 0 3px 6px rgba(0, 0, 0, 0.3)',
              }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { type: 'spring', stiffness: 450, damping: 30 }
              }
            />
          )}
          <span className="relative z-10 flex items-center gap-1 font-pixel text-[10px] uppercase">
            <svg
              className="w-3.5 h-3.5 shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="square"
              strokeLinejoin="miter"
              aria-hidden="true"
            >
              <rect x="2" y="6" width="20" height="12" rx="2" />
              <path d="M6 12h4m-2-2v4" />
              <circle cx="15" cy="11" r="1" fill="currentColor" />
              <circle cx="18" cy="13" r="1" fill="currentColor" />
            </svg>
            <span className="hidden sm:inline">Blocky</span>
          </span>
        </button>

        {/* Chalk Option Button */}
        <button
          type="button"
          onClick={() => setTheme('chalk')}
          aria-pressed={currentTheme === 'chalk'}
          className={`relative flex items-center gap-1.5 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            currentTheme === 'chalk'
              ? 'text-[#23382F]'
              : 'text-stone-300 hover:text-white'
          }`}
        >
          {currentTheme === 'chalk' && (
            <motion.div
              layoutId="theme-active-indicator"
              className="absolute inset-0 bg-[#F6D860] rounded-xl border-b-2 border-[#D4B63A]"
              style={{
                boxShadow:
                  'inset 0 1.5px 0 rgba(255, 255, 255, 0.6), 0 3px 6px rgba(0, 0, 0, 0.3)',
              }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { type: 'spring', stiffness: 450, damping: 30 }
              }
            />
          )}
          <span className="relative z-10 flex items-center gap-1 font-heading text-sm sm:text-base font-bold">
            <svg
              className="w-3.5 h-3.5 shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <rect x="3" y="14" width="18" height="6" rx="2" transform="rotate(-30 12 17)" fill="currentColor" opacity="0.3" />
              <line x1="6" y1="18" x2="18" y2="10" strokeWidth="2.5" />
            </svg>
            <span className="hidden sm:inline">Chalk</span>
          </span>
        </button>
      </div>
    </aside>
  );
};
