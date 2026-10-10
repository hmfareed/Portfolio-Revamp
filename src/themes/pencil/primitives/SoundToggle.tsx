'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { pencilSoundEngine } from '../audio/pencilSoundEngine';

interface SoundToggleProps {
  className?: string;
}

export const SoundToggle: React.FC<SoundToggleProps> = ({ className = '' }) => {
  const [isEnabled, setIsEnabled] = useState(true);

  useEffect(() => {
    setIsEnabled(pencilSoundEngine.isEnabled());
  }, []);

  const handleToggle = () => {
    const next = pencilSoundEngine.toggle();
    setIsEnabled(next);
  };

  return (
    <motion.button
      type="button"
      onClick={handleToggle}
      whileHover={{ y: -2, scale: 1.05 }}
      whileTap={{ y: 0, scale: 0.95 }}
      className={`relative inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-[#F4EED9] hover:bg-[#FFE66D] border-2 border-[#2B2B2B] rounded-xs shadow-[2px_2px_0px_#2B2B2B] text-stone-800 transition-colors cursor-pointer select-none ${className}`}
      style={{ filter: 'url(#pencil-wobble)' }}
      aria-label={isEnabled ? 'Mute sketchbook sound effects' : 'Enable tactile sketchbook sound effects'}
      title={isEnabled ? 'Sound Effects: ON (Click to Mute)' : 'Sound Effects: OFF (Click to Enable)'}
    >
      {/* Hand-Drawn Speaker SVG */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-4 h-4 text-[#2B2B2B]"
        aria-hidden="true"
      >
        {/* Speaker megaphone cone */}
        <path
          d="M11 5 L6 9 H3 V15 H6 L11 19 V5 Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {isEnabled ? (
          <>
            {/* Inner sound wave arc */}
            <path
              d="M15 9 C 16.5 10.2 16.5 13.8 15 15"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* Outer sound wave arc */}
            <path
              d="M18.5 6 C 21.5 8.5 21.5 15.5 18.5 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </>
        ) : (
          /* Muted slash doodle */
          <path
            d="M3 3 L21 21"
            stroke="#DC2626"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        )}
      </svg>

      <span className="font-handwriting text-xs font-bold text-stone-700 hidden sm:inline">
        {isEnabled ? 'SFX ON' : 'SFX OFF'}
      </span>
    </motion.button>
  );
};
