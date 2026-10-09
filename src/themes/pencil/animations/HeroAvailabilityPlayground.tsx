'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { SketchManMascot } from './SketchManMascot';

interface HeroAvailabilityPlaygroundProps {
  className?: string;
}

export const HeroAvailabilityPlayground: React.FC<HeroAvailabilityPlaygroundProps> = ({
  className = '',
}) => {
  const shouldReduceMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);
  const [speech, setSpeech] = useState<string | null>(null);
  const [activeSpeechIdx, setActiveSpeechIdx] = useState(0);

  const speeches = [
    'Hire Fareed! ✎',
    'Open for freelance! ✦',
    'Ready for remote roles! 🚀',
    'Let\'s build something great! :)',
    'Fast delivery & clean code! ★',
  ];

  const handleTriggerSpeech = () => {
    const nextIdx = (activeSpeechIdx + 1) % speeches.length;
    setActiveSpeechIdx(nextIdx);
    setSpeech(speeches[nextIdx]);

    setTimeout(() => {
      setSpeech(null);
    }, 2500);
  };

  return (
    <div
      className={`relative w-full mt-8 pt-4 border-t-2 border-dashed border-stone-300 font-handwriting ${className}`}
    >
      {/* Container: Sketch Man playing along the status line with the glowing text */}
      <div className="flex flex-wrap items-center gap-3 sm:gap-4 relative">
        {/* Sketch Man Mascot Playing Around the Text */}
        <div className="relative -mt-2">
          <SketchManMascot
            pose={isHovered ? 'cheering' : 'lantern'}
            size="md"
            speechBubbleText={speech || undefined}
            onInteract={handleTriggerSpeech}
            className="-ml-1"
          />

          {/* Little sketched prompt arrow under Sketch Man */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.4, 0.9, 0.4] }}
            transition={{ duration: 2.2, repeat: Infinity }}
            className="absolute -bottom-3.5 left-1 text-[10px] font-mono text-stone-600 uppercase tracking-wider hidden sm:block pointer-events-none select-none"
          >
            ▲ tap me!
          </motion.div>
        </div>

        {/* The Entire Text Glowing Card (NO glowing dot - text itself radiates light) */}
        <motion.a
          href="#contact"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleTriggerSpeech}
          initial={shouldReduceMotion ? {} : { scale: 0.98 }}
          animate={
            shouldReduceMotion
              ? {}
              : {
                  scale: isHovered ? 1.02 : 1,
                  boxShadow: isHovered
                    ? '0 0 25px rgba(16, 185, 129, 0.45), 0 0 50px rgba(52, 211, 153, 0.25)'
                    : [
                        '0 0 12px rgba(16, 185, 129, 0.25), 0 0 24px rgba(5, 150, 105, 0.1)',
                        '0 0 22px rgba(16, 185, 129, 0.45), 0 0 38px rgba(52, 211, 153, 0.3)',
                        '0 0 12px rgba(16, 185, 129, 0.25), 0 0 24px rgba(5, 150, 105, 0.1)',
                      ],
                }
          }
          transition={{
            boxShadow: { duration: 2.4, repeat: Infinity, ease: 'easeInOut' },
            scale: { type: 'spring', stiffness: 400, damping: 20 },
          }}
          className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-sm bg-gradient-to-r from-emerald-500/10 via-emerald-400/20 to-emerald-500/15 border-2 border-emerald-600/50 hover:border-emerald-600 hover:bg-emerald-500/20 transition-all cursor-pointer shadow-sm"
          title="Click to get in touch about projects or roles!"
        >
          {/* Subtle hand-drawn highlight tape behind glowing text */}
          <div className="absolute inset-x-1 inset-y-1 bg-white/40 -z-10 rounded-xs pointer-events-none" />

          {/* Floating emerald sparkle doodles on corners */}
          {!shouldReduceMotion && (
            <>
              <motion.span
                animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                className="text-emerald-600 font-mono text-xs select-none pointer-events-none"
              >
                ✦
              </motion.span>
            </>
          )}

          {/* THE ENTIRE GLOWING TEXT */}
          <motion.span
            animate={
              shouldReduceMotion
                ? {}
                : {
                    textShadow: isHovered
                      ? '0 0 16px rgba(16, 185, 129, 1), 0 0 30px rgba(52, 211, 153, 0.9), 0 0 45px rgba(110, 231, 183, 0.6)'
                      : [
                          '0 0 6px rgba(16, 185, 129, 0.5), 0 0 14px rgba(5, 150, 105, 0.3)',
                          '0 0 14px rgba(16, 185, 129, 0.95), 0 0 28px rgba(52, 211, 153, 0.8), 0 0 42px rgba(110, 231, 183, 0.5)',
                          '0 0 6px rgba(16, 185, 129, 0.5), 0 0 14px rgba(5, 150, 105, 0.3)',
                        ],
                  }
            }
            transition={{
              textShadow: { duration: 2.4, repeat: Infinity, ease: 'easeInOut' },
            }}
            className="text-base sm:text-lg md:text-xl font-handwriting font-extrabold text-emerald-800 tracking-wide select-none group-hover:text-emerald-900 transition-colors"
          >
            Open to freelance projects &amp; remote roles
          </motion.span>

          {!shouldReduceMotion && (
            <motion.span
              animate={{ opacity: [0.2, 1, 0.2], scale: [0.7, 1.1, 0.7] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
              className="text-emerald-600 font-mono text-xs select-none pointer-events-none"
            >
              ★
            </motion.span>
          )}

          {/* Quick link arrow icon */}
          <span className="font-mono text-xs text-emerald-800 font-bold ml-1 group-hover:translate-x-1 transition-transform">
            ➔
          </span>
        </motion.a>
      </div>
    </div>
  );
};
