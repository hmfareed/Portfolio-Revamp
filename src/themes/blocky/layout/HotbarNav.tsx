'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface HotbarSlot {
  keyNum: number;
  label: string;
  href: string;
  iconChar: string;
}

const SLOTS: HotbarSlot[] = [
  { keyNum: 1, label: 'Title', href: '#home', iconChar: '⌂' },
  { keyNum: 2, label: 'Stats', href: '#about', iconChar: '⚔' },
  { keyNum: 3, label: 'World', href: '#projects', iconChar: '🗺' },
  { keyNum: 4, label: 'Quests', href: '#experience', iconChar: '📜' },
  { keyNum: 5, label: 'Items', href: '#skills', iconChar: '🎒' },
  { keyNum: 6, label: 'Talk', href: '#contact', iconChar: '💬' },
];

export const HotbarNav: React.FC = () => {
  const [activeSlot, setActiveSlot] = useState<string>('#home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = SLOTS.map((item) => item.href.slice(1));
      const scrollY = window.scrollY;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop - 200 <= scrollY) {
          setActiveSlot(`#${sections[i]}`);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      aria-label="Game Hotbar Navigation"
      className="fixed z-40 left-0 right-0 flex justify-center pointer-events-none bottom-3 md:bottom-auto md:top-4 px-2"
    >
      {/* Voxel Hotbar Tray */}
      <div className="pointer-events-auto flex items-center gap-1.5 sm:gap-2 p-1.5 sm:p-2 bg-[#1E232A]/90 backdrop-blur-md border-4 border-[#0F1217] rounded-xs shadow-[0_8px_24px_rgba(0,0,0,0.6)]">
        {SLOTS.map((slot) => {
          const isActive = activeSlot === slot.href;
          return (
            <motion.a
              key={slot.href}
              href={slot.href}
              whileTap={{ scale: 0.94, y: 2 }}
              className={`relative flex flex-col items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-[#2A303C] border-3 transition-all select-none ${
                isActive
                  ? 'border-[#FFD23F] bg-[#3B4455] shadow-[inset_0_0_8px_rgba(255,210,63,0.5)] -translate-y-1'
                  : 'border-[#14171D] hover:border-[#9AA3AD] hover:bg-[#343C4B]'
              }`}
              style={{
                boxShadow: isActive
                  ? 'inset 2px 2px 0 rgba(255,255,255,0.4), inset -2px -2px 0 rgba(0,0,0,0.6)'
                  : 'inset 2px 2px 0 rgba(255,255,255,0.15), inset -2px -2px 0 rgba(0,0,0,0.6)',
              }}
              title={slot.label}
            >
              {/* Hotbar Slot Number */}
              <span className="absolute top-0.5 left-1 font-pixel text-[8px] sm:text-[9px] text-[#9AA3AD] pointer-events-none">
                {slot.keyNum}
              </span>

              {/* Slot Icon */}
              <span className="text-base sm:text-lg">{slot.iconChar}</span>

              {/* Slot Label (Hidden on small mobile) */}
              <span className="font-pixel text-[8px] uppercase tracking-tighter text-[#E5E7EB] mt-0.5 hidden sm:inline">
                {slot.label}
              </span>

              {/* Active Golden Slot Indicator */}
              {isActive && (
                <span className="absolute -bottom-1 left-2 right-2 h-1 bg-[#FFD23F]" />
              )}
            </motion.a>
          );
        })}
      </div>
    </nav>
  );
};
