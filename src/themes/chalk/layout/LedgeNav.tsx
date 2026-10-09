'use client';

import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ChalkStick, FeltEraser } from '../primitives/ChalkDoodles';

interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Syllabus', href: '#home' },
  { label: 'Instructor', href: '#about' },
  { label: 'Lesson Notes', href: '#projects' },
  { label: 'Timeline', href: '#experience' },
  { label: 'Timetable', href: '#skills' },
  { label: 'Office Hours', href: '#contact' },
];

export const LedgeNav: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('#home');
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_ITEMS.map((item) => item.href.slice(1));
      const scrollY = window.scrollY;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop - 200 <= scrollY) {
          setActiveSection(`#${sections[i]}`);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      aria-label="Chalkboard Ledge Navigation"
      className="sticky top-2 z-40 mb-8 sm:mb-12"
    >
      {/* Wooden Chalk Ledge Shelf */}
      <div
        className="relative flex items-center justify-between p-2 sm:p-2.5 rounded-xl bg-[#8A5A33] border-2 border-[#5A3A1E] shadow-[0_8px_16px_rgba(0,0,0,0.4)]"
        style={{
          boxShadow:
            'inset 0 2px 4px rgba(255, 255, 255, 0.25), inset 0 -3px 6px rgba(0, 0, 0, 0.4), 0 8px 16px rgba(0, 0, 0, 0.4)',
        }}
      >
        {/* Row of Chalk Labels */}
        <div className="flex items-center gap-1.5 sm:gap-4 md:gap-6 overflow-x-auto no-scrollbar py-1 px-1">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.href;

            return (
              <a
                key={item.href}
                href={item.href}
                className={`relative px-2 sm:px-3 py-1 font-heading text-base sm:text-xl font-bold tracking-wide transition-colors whitespace-nowrap ${
                  isActive ? 'text-[#F6D860]' : 'text-[#F2F0E6]/85 hover:text-white'
                }`}
              >
                <span>{item.label}</span>

                {/* Chalk Underline on Active Section */}
                {isActive && (
                  <motion.svg
                    layoutId="chalk-active-underline"
                    className="absolute -bottom-1 left-1 right-1 h-2 overflow-visible pointer-events-none"
                    viewBox="0 0 100 8"
                    fill="none"
                    preserveAspectRatio="none"
                    transition={
                      shouldReduceMotion
                        ? { duration: 0 }
                        : { type: 'spring', stiffness: 350, damping: 28 }
                    }
                  >
                    <path
                      d="M 2 4 Q 50 2, 98 4"
                      stroke="#F6D860"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeDasharray="1 1"
                    />
                  </motion.svg>
                )}
              </a>
            );
          })}
        </div>

        {/* Chalk Stick & Felt Eraser Resting on Ledge (Desktop & Tablet) */}
        <div className="hidden sm:flex items-center gap-3 pr-2 shrink-0 select-none pointer-events-none">
          <ChalkStick className="w-9 h-3" color="#F2F0E6" />
          <ChalkStick className="w-8 h-2.5" color="#F6D860" />
          <FeltEraser className="w-11 h-5" />
        </div>
      </div>
    </nav>
  );
};
