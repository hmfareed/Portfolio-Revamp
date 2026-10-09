'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

export const HandDrawnCursor: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const smoothX = useSpring(cursorX, { stiffness: 900, damping: 50 });
  const smoothY = useSpring(cursorY, { stiffness: 900, damping: 50 });

  // Secondary delayed spring for graphite trail shadow
  const trailX = useSpring(cursorX, { stiffness: 350, damping: 30 });
  const trailY = useSpring(cursorY, { stiffness: 350, damping: 30 });

  useEffect(() => {
    // Only enable on desktop devices with fine pointer (mouse/trackpad) and when reduced motion is off
    if (shouldReduceMotion) return;
    if (typeof window === 'undefined') return;

    const media = window.matchMedia('(pointer: fine)');
    if (!media.matches) return;

    setEnabled(true);

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      // Detect hover on interactive elements, updating state only when value flips
      const rawTarget = e.target;
      const element =
        rawTarget instanceof Element
          ? rawTarget
          : (rawTarget as Node | null)?.parentElement;

      if (element && typeof element.closest === 'function') {
        const isInteractive = Boolean(
          element.closest('a, button, input, textarea, select, [role="button"], [data-interactive="true"]')
        );
        setIsHoveringInteractive((prev) => (prev !== isInteractive ? isInteractive : prev));
      } else {
        setIsHoveringInteractive((prev) => (prev ? false : prev));
      }
    };

    const handleMouseDown = () => setIsPressed(true);
    const handleMouseUp = () => setIsPressed(false);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [shouldReduceMotion, cursorX, cursorY]);

  if (!enabled || shouldReduceMotion) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
    >
      {/* Subtle Graphite Dust Trail Dot */}
      <motion.div
        className="absolute w-2 h-2 rounded-full bg-[#2B2B2B]/25 -translate-x-1 -translate-y-1"
        style={{
          x: trailX,
          y: trailY,
        }}
      />

      {/* Custom Hand-Drawn Cursor Graphic */}
      <motion.div
        className="absolute pointer-events-none w-8 h-8 -translate-x-1 -translate-y-7 will-change-transform"
        style={{
          x: smoothX,
          y: smoothY,
        }}
        animate={{
          scale: isPressed ? 0.88 : 1,
          rotate: isHoveringInteractive ? 135 : -35,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      >
        {isHoveringInteractive ? (
          /* Eraser pose when hovering interactive buttons/links */
          <svg viewBox="0 0 32 32" fill="none" className="w-full h-full drop-shadow-sm">
            <rect x="6" y="8" width="20" height="14" rx="2" fill="#F4A6B8" stroke="#2B2B2B" strokeWidth="1.8" />
            <line x1="16" y1="8" x2="16" y2="22" stroke="#2B2B2B" strokeWidth="1.4" strokeDasharray="2 2" />
          </svg>
        ) : (
          /* Pencil pose when hovering normal text/canvas */
          <svg viewBox="0 0 32 32" fill="none" className="w-full h-full drop-shadow-sm">
            <polygon points="6,26 22,10 26,14 10,30" fill="#FFC62B" stroke="#2B2B2B" strokeWidth="1.6" />
            <polygon points="3,29 6,26 10,30" fill="#F4EED9" stroke="#2B2B2B" strokeWidth="1.2" />
            <polygon points="1,31 3,29 5,31" fill="#2B2B2B" />
            <polygon points="22,10 26,6 30,10 26,14" fill="#F4A6B8" stroke="#2B2B2B" strokeWidth="1.4" />
          </svg>
        )}
      </motion.div>
    </div>
  );
};
