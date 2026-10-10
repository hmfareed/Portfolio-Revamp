'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInkColor, INK_PRESETS, InkColor } from '../context/InkColorContext';

interface PencilTinProps {
  className?: string;
}

export const PencilTin: React.FC<PencilTinProps> = ({ className = '' }) => {
  const { ink, setInk } = useInkColor();
  const [hoveredInk, setHoveredInk] = useState<InkColor | null>(null);

  const colors: InkColor[] = ['graphite', 'blue', 'red', 'emerald'];

  return (
    <div
      className={`relative inline-flex items-center gap-1.5 p-1 bg-[#F4EED9] border-2 border-[#2B2B2B] rounded-xs shadow-[2px_2px_0px_#2B2B2B] font-handwriting select-none ${className}`}
      style={{ filter: 'url(#pencil-wobble)' }}
      role="radiogroup"
      aria-label="Pencil Tin Ink Selector"
    >
      <span className="text-[11px] font-bold text-stone-600 px-1 font-mono uppercase tracking-wider hidden sm:inline">
        Tin:
      </span>

      {colors.map((colorId) => {
        const preset = INK_PRESETS[colorId];
        const isSelected = ink === colorId;

        return (
          <div key={colorId} className="relative">
            <motion.button
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => setInk(colorId)}
              onMouseEnter={() => setHoveredInk(colorId)}
              onMouseLeave={() => setHoveredInk(null)}
              whileHover={{ y: -3, scale: 1.05 }}
              whileTap={{ y: 0, scale: 0.95 }}
              className={`relative flex items-center justify-center w-6 sm:w-7 h-7 sm:h-8 rounded-xs border-2 border-[#2B2B2B] transition-shadow cursor-pointer ${
                isSelected
                  ? 'shadow-[2px_3px_0px_#2B2B2B] -translate-y-1'
                  : 'opacity-85 hover:opacity-100 hover:shadow-xs'
              }`}
              style={{
                backgroundColor: preset.bodyColor,
              }}
              title={`${preset.name} (${preset.label})`}
            >
              {/* Pen Nib / Lead tip preview */}
              <div
                className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full border border-white/60 shadow-xs"
                style={{ backgroundColor: preset.hex }}
              />

              {/* Active selection ink drip indicator */}
              {isSelected && (
                <motion.div
                  layoutId="activeInkIndicator"
                  className="absolute -bottom-1.5 w-1.5 h-1.5 rounded-full border border-[#2B2B2B]"
                  style={{ backgroundColor: preset.hex }}
                />
              )}
            </motion.button>

            {/* Hover Tooltip */}
            <AnimatePresence>
              {hoveredInk === colorId && (
                <motion.div
                  initial={{ opacity: 0, y: 4, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 2, scale: 0.9 }}
                  transition={{ duration: 0.15 }}
                  className="absolute -bottom-9 left-1/2 -translate-x-1/2 z-50 whitespace-nowrap bg-[#FFFDF8] text-[#2B2B2B] border border-[#2B2B2B] text-[11px] font-bold px-2 py-0.5 rounded-xs shadow-[2px_2px_0px_#2B2B2B] pointer-events-none"
                >
                  {preset.name}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};
