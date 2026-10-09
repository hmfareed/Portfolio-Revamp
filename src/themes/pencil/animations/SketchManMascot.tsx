'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

export type SketchManPose = 'lantern' | 'perched' | 'pointing-down' | 'airplane' | 'cheering' | 'waving';

interface SketchManMascotProps {
  pose?: SketchManPose;
  size?: 'sm' | 'md' | 'lg';
  speechBubbleText?: string;
  defaultSpeech?: string;
  className?: string;
  interactive?: boolean;
  onInteract?: () => void;
  floatY?: boolean;
}

export const SketchManMascot: React.FC<SketchManMascotProps> = ({
  pose = 'waving',
  size = 'md',
  speechBubbleText,
  defaultSpeech,
  className = '',
  interactive = true,
  onInteract,
  floatY = true,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const [speech, setSpeech] = useState<string | null>(defaultSpeech || null);
  const [isJumping, setIsJumping] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const sizeClasses = {
    sm: 'w-8 h-11',
    md: 'w-11 h-15',
    lg: 'w-14 h-20',
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!interactive) return;

    setIsJumping(true);
    setClickCount((c) => c + 1);

    const speeches = [
      'Hire Fareed! ✎',
      'Let\'s build! 🚀',
      'Remote friendly! ✦',
      'Nice click! :)',
      'Production ready! ★',
      'Drop me a line! ✉️',
    ];

    const chosenSpeech = speechBubbleText || speeches[clickCount % speeches.length];
    setSpeech(chosenSpeech);

    setTimeout(() => {
      setIsJumping(false);
    }, 450);

    setTimeout(() => {
      if (!defaultSpeech) setSpeech(null);
    }, 2400);

    onInteract?.();
  };

  return (
    <div
      onClick={interactive ? handleClick : undefined}
      className={`relative inline-flex items-center justify-center select-none ${
        interactive ? 'cursor-pointer group' : 'pointer-events-none'
      } ${className}`}
      title={interactive ? 'Click Sketch Man! ✎' : undefined}
    >
      {/* Speech Bubble */}
      <AnimatePresence>
        {speech && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 6 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0, y: -4 }}
            transition={{ type: 'spring', stiffness: 450, damping: 20 }}
            className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#FFE66D] border-2 border-[#2B2B2B] px-2.5 py-0.5 rounded-xs text-xs font-handwriting font-bold text-[#2B2B2B] whitespace-nowrap shadow-xs z-30 pointer-events-none"
          >
            {speech}
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#FFE66D] border-r-2 border-b-2 border-[#2B2B2B] rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating / Bobbing Mascot Container */}
      <motion.div
        animate={
          shouldReduceMotion
            ? {}
            : isJumping
            ? {
                y: [-2, -22, 0],
                rotate: [0, -12, 12, 0],
                scale: [1, 1.15, 1],
              }
            : floatY
            ? {
                y: [0, -4, 0],
                rotate: [0, 1.5, -1.5, 0],
              }
            : {}
        }
        transition={
          isJumping
            ? { duration: 0.45, ease: 'easeOut' }
            : { duration: 2.8, repeat: Infinity, ease: 'easeInOut' }
        }
        className={`${sizeClasses[size]} relative flex items-center justify-center`}
      >
        {/* Hand-Drawn Sketch Man Stick Figure SVG */}
        <svg
          viewBox="0 0 52 74"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full text-[#2B2B2B] drop-shadow-xs"
        >
          {/* Head with cream paper fill */}
          <circle
            cx="26"
            cy="15"
            r="11"
            stroke="currentColor"
            strokeWidth="2.8"
            fill="#FBF8EF"
          />

          {/* Eyes */}
          <circle cx="22" cy="13" r="1.6" fill="currentColor" />
          <circle cx="30" cy="13" r="1.6" fill="currentColor" />

          {/* Smile */}
          <path
            d="M 21 18 Q 26 23 31 18"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          />

          {/* Spine Body */}
          <line
            x1="26"
            y1="26"
            x2="26"
            y2={pose === 'perched' ? '43' : '49'}
            stroke="currentColor"
            strokeWidth="3.2"
            strokeLinecap="round"
          />

          {/* ARMS & PROPS BY POSE */}
          {pose === 'lantern' ? (
            <>
              {/* Left arm holding sparkler/glowing lantern */}
              <path
                d="M 26 31 L 14 26 L 8 20"
                stroke="currentColor"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Magic Lantern / Sparkler Rod */}
              <line
                x1="8"
                y1="20"
                x2="6"
                y2="10"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
              {/* Lantern Glass Box */}
              <rect
                x="2"
                y="6"
                width="8"
                height="8"
                rx="1.5"
                fill="#10B981"
                stroke="currentColor"
                strokeWidth="1.8"
                className="animate-pulse"
              />
              <line x1="6" y1="6" x2="6" y2="14" stroke="#FFF" strokeWidth="1.2" />

              {/* Right arm waving warmly */}
              <path
                d="M 26 31 L 38 26 L 46 16"
                stroke="currentColor"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </>
          ) : pose === 'perched' ? (
            <>
              {/* Left hand resting on surface */}
              <path
                d="M 26 30 L 14 36 L 10 44"
                stroke="currentColor"
                strokeWidth="2.6"
                strokeLinecap="round"
              />
              {/* Right arm waving */}
              <path
                d="M 26 30 L 37 24 L 44 14"
                stroke="currentColor"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </>
          ) : pose === 'pointing-down' ? (
            <>
              {/* Left arm resting on hip */}
              <path
                d="M 26 31 L 16 35 L 20 42"
                stroke="currentColor"
                strokeWidth="2.6"
                strokeLinecap="round"
              />
              {/* Right arm pointing straight down */}
              <path
                d="M 26 31 L 38 38 L 38 52"
                stroke="currentColor"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Pointing finger / arrow tip */}
              <path
                d="M 35 48 L 38 53 L 41 48"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </>
          ) : pose === 'airplane' ? (
            <>
              {/* Left arm on hip */}
              <path
                d="M 26 31 L 15 36 L 18 43"
                stroke="currentColor"
                strokeWidth="2.6"
                strokeLinecap="round"
              />
              {/* Right arm raised launching paper airplane */}
              <path
                d="M 26 31 L 39 25 L 45 16"
                stroke="currentColor"
                strokeWidth="2.8"
                strokeLinecap="round"
              />
              {/* Miniature Paper Airplane */}
              <polygon
                points="45,12 52,16 43,20 46,16"
                fill="#FFE66D"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinejoin="round"
              />
            </>
          ) : pose === 'cheering' || isJumping ? (
            /* Joyful celebration pose \o/ */
            <path
              d="M 12 18 L 26 29 L 40 18"
              stroke="currentColor"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ) : (
            /* Friendly waving pose */
            <>
              <path
                d="M 26 31 L 15 38 L 12 47"
                stroke="currentColor"
                strokeWidth="2.8"
                strokeLinecap="round"
              />
              <path
                d="M 26 31 L 38 24 L 46 15"
                stroke="currentColor"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </>
          )}

          {/* LEGS BY POSE */}
          {pose === 'perched' ? (
            <>
              {/* Legs dangling over the ledge */}
              <path
                d="M 26 43 L 18 47 L 17 62 L 22 63"
                stroke="currentColor"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M 26 43 L 32 47 L 33 63 L 38 64"
                stroke="currentColor"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </>
          ) : (
            <>
              {/* Standing legs */}
              <path
                d="M 26 49 L 17 66 L 12 67"
                stroke="currentColor"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M 26 49 L 35 66 L 40 67"
                stroke="currentColor"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </>
          )}
        </svg>

        {/* Ambient Sparkles when lantern or cheering */}
        {(pose === 'lantern' || isJumping) && !shouldReduceMotion && (
          <motion.div
            initial={{ opacity: 0.6, scale: 0.8 }}
            animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-1 -left-2 text-emerald-500 font-mono text-xs select-none pointer-events-none"
          >
            ✦
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};
