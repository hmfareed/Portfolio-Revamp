'use client';

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

export type ThemeKey = 'pencil' | 'brick' | 'blocky' | 'chalk' | 'playground';

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
  defaultTheme = 'pencil',
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
          savedTheme === 'chalk' ||
          savedTheme === 'playground')
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
      } else if (newTheme === 'playground') {
        faviconEl.href = '/playground-favicon.svg';
      } else {
        faviconEl.href = '/favicon.svg';
      }
    }
  };

  const toggleTheme = () => {
    if (currentTheme === 'pencil') setTheme('brick');
    else if (currentTheme === 'brick') setTheme('blocky');
    else if (currentTheme === 'blocky') setTheme('chalk');
    else if (currentTheme === 'chalk') setTheme('playground');
    else setTheme('pencil');
  };

  // During SSR and the initial client hydration pass, guarantee that currentTheme matches defaultTheme
  // to eliminate hydration mismatches against server-rendered HTML.
  const activeThemeKey = mounted ? currentTheme : defaultTheme;

  return (
    <ThemeContext.Provider value={{ currentTheme: activeThemeKey, setTheme, toggleTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
};

interface ThemeOption {
  key: ThemeKey;
  label: string;
  tagline: string;
  icon: (className?: string) => React.ReactNode;
}

const THEME_OPTIONS: ThemeOption[] = [
  {
    key: 'pencil',
    label: 'Pencil',
    tagline: 'Hand-drawn exercise book',
    icon: (className = 'w-4 h-4') => (
      <svg
        className={className}
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
    ),
  },
  {
    key: 'brick',
    label: 'Brick Builder',
    tagline: 'Studded plastic toy bricks',
    icon: (className = 'w-4 h-4') => (
      <svg
        className={className}
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <rect x="2" y="6" width="16" height="12" rx="2.5" />
        <circle cx="6.5" cy="4" r="2" />
        <circle cx="13.5" cy="4" r="2" />
      </svg>
    ),
  },
  {
    key: 'blocky',
    label: 'Blocky World',
    tagline: 'Retro voxel game world',
    icon: (className = 'w-4 h-4') => (
      <svg
        className={className}
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
    ),
  },
  {
    key: 'chalk',
    label: 'Chalkboard',
    tagline: 'Classroom green slate & wood',
    icon: (className = 'w-4 h-4') => (
      <svg
        className={className}
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
    ),
  },
  {
    key: 'playground',
    label: 'Playground',
    tagline: 'Online blocky game lobby',
    icon: (className = 'w-4 h-4') => (
      <svg
        className={className}
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
      </svg>
    ),
  },
];

/**
 * Collapsible Top-Right Corner Theme Dropdown Menu
 * Folds up into a compact, distraction-free button that unfolds when clicked.
 */
export const ThemeToggle: React.FC = () => {
  const { currentTheme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Close dropdown on outside click or Escape key
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const activeOption = THEME_OPTIONS.find((t) => t.key === currentTheme) || THEME_OPTIONS[0];

  // Theme-adaptive styles for the trigger button
  const getTriggerStyles = () => {
    switch (currentTheme) {
      case 'pencil':
        return {
          className:
            'bg-[#FBF8EF] text-[#2B2B2B] border-2 border-[#2B2B2B] shadow-[2px_2px_0px_#2B2B2B] hover:bg-[#FFF8E7]',
          fontClass: 'font-handwriting',
        };
      case 'brick':
        return {
          className:
            'bg-[#D1382B] text-white border-2 border-[#9E2419] shadow-[0_4px_10px_rgba(0,0,0,0.3)] hover:bg-[#E54536]',
          fontClass: 'font-heading tracking-wider',
        };
      case 'blocky':
        return {
          className:
            'bg-[#1E232A] text-[#FFD23F] border-3 border-black shadow-[0_4px_0_#0F1217] hover:bg-[#2A303C]',
          fontClass: 'font-pixel text-xs',
        };
      case 'chalk':
        return {
          className:
            'bg-[#263D33] text-[#F6D860] border-2 border-dashed border-[#F2F0E6]/70 shadow-[0_4px_12px_rgba(0,0,0,0.4)] hover:bg-[#2F4A3E]',
          fontClass: 'font-heading text-base',
        };
      case 'playground':
      default:
        return {
          className:
            'bg-[#2F3133] text-[#00B06F] border-2 border-[#00B06F] shadow-[0_4px_12px_rgba(0,176,111,0.25)] hover:bg-[#393B3D]',
          fontClass: 'font-heading text-sm font-bold',
        };
    }
  };

  // Theme-adaptive styles for the dropdown panel
  const getDropdownStyles = () => {
    switch (currentTheme) {
      case 'pencil':
        return 'bg-[#FBF8EF] border-2 border-[#2B2B2B] shadow-[4px_4px_0px_#2B2B2B] text-[#2B2B2B]';
      case 'brick':
        return 'bg-[#1A1F2B] border-2 border-black/40 shadow-[0_12px_28px_rgba(0,0,0,0.5)] text-white';
      case 'blocky':
        return 'bg-[#1E232A] border-3 border-black shadow-[0_8px_0_#0F1217] text-[#F3F4F6]';
      case 'chalk':
        return 'bg-[#263D33] border-2 border-dashed border-[#F2F0E6]/70 shadow-[0_12px_28px_rgba(0,0,0,0.6)] text-[#F2F0E6]';
      case 'playground':
      default:
        return 'bg-[#2F3133] border-2 border-[#393B3D] shadow-[0_16px_32px_rgba(0,0,0,0.6)] text-[#F7F7F8]';
    }
  };

  const trigger = getTriggerStyles();

  return (
    <aside
      ref={containerRef}
      aria-label="Theme Switcher Menu"
      className="fixed top-3 right-3 sm:top-4 sm:right-6 z-50 select-none"
    >
      {/* Collapsed Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label={`Current theme: ${activeOption.label}. Click to switch theme.`}
        className={`relative flex items-center gap-2 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl transition-all cursor-pointer font-bold ${trigger.className}`}
      >
        <span className="shrink-0">{activeOption.icon('w-4 h-4')}</span>
        <span className={`${trigger.fontClass} text-xs sm:text-sm`}>
          {activeOption.label}
        </span>
        {/* Animated Chevron indicator */}
        <motion.svg
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="w-3.5 h-3.5 shrink-0 opacity-80"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </motion.svg>
      </button>

      {/* Unfolded Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={
              shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: -8, scale: 0.95 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: -8, scale: 0.95 }
            }
            transition={{ duration: 0.18, ease: 'easeOut' }}
            role="menu"
            aria-label="Themes"
            className={`absolute right-0 top-full mt-2 w-60 sm:w-64 p-2 rounded-xl overflow-hidden ${getDropdownStyles()}`}
          >
            {/* Header label */}
            <div className="flex items-center justify-between px-2.5 py-1.5 pb-2 mb-1 border-b border-white/10 text-[11px] font-mono uppercase tracking-wider opacity-60">
              <span>Switch Theme</span>
              <span>5 Themes</span>
            </div>

            {/* List of Theme Items */}
            <div className="space-y-1">
              {THEME_OPTIONS.map((opt) => {
                const isSelected = opt.key === currentTheme;

                return (
                  <button
                    key={opt.key}
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      setTheme(opt.key);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-2.5 rounded-lg text-left transition-all cursor-pointer ${
                      isSelected
                        ? currentTheme === 'pencil'
                          ? 'bg-[#FFE66D] text-[#2B2B2B] font-bold shadow-xs'
                          : currentTheme === 'brick'
                          ? 'bg-[#D1382B] text-white font-bold'
                          : currentTheme === 'blocky'
                          ? 'bg-[#FFD23F] text-[#1E232A] font-bold'
                          : currentTheme === 'chalk'
                          ? 'bg-[#F6D860] text-[#23382F] font-bold'
                          : 'bg-[#00B06F] text-white font-bold'
                        : 'hover:bg-white/10 opacity-80 hover:opacity-100'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="shrink-0 p-1 rounded-md bg-black/10">
                        {opt.icon('w-4 h-4')}
                      </div>
                      <div className="truncate">
                        <div className="text-xs sm:text-sm font-bold truncate">
                          {opt.label}
                        </div>
                        <div className="text-[10px] opacity-75 truncate">
                          {opt.tagline}
                        </div>
                      </div>
                    </div>

                    {/* Active checkmark */}
                    {isSelected && (
                      <span className="shrink-0 text-sm font-bold ml-2">
                        ✓
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Hint footer */}
            <div className="mt-2 pt-2 border-t border-white/10 px-2 text-[10px] opacity-50 text-center font-mono">
              Press Esc or click outside to fold
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </aside>
  );
};
