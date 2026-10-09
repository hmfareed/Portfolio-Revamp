'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface TrailPoint {
  x: number;
  y: number;
  id: number;
  opacity: number;
}

export const HandDrawnCursor: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const trailIdRef = useRef(0);

  useEffect(() => {
    // Only enable on desktop devices with fine pointer (mouse/trackpad) and when reduced motion is off
    if (shouldReduceMotion) return;
    if (typeof window === 'undefined') return;

    const media = window.matchMedia('(pointer: fine)');
    if (!media.matches) return;

    setEnabled(true);

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      setPos({ x: clientX, y: clientY });

      // Add a fading graphite point
      trailIdRef.current += 1;
      const newPoint: TrailPoint = {
        x: clientX,
        y: clientY,
        id: trailIdRef.current,
        opacity: 0.35,
      };

      setTrail((prev) => [...prev.slice(-6), newPoint]);

      // Detect hover on interactive element
      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = Boolean(
          target.closest('a, button, input, textarea, select, [role="button"], [data-interactive="true"]')
        );
        setIsHoveringInteractive(isInteractive);
      }
    };

    const handleMouseDown = () => setIsPressed(true);
    const handleMouseUp = () => setIsPressed(false);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Periodically decay trail
    const decayInterval = setInterval(() => {
      setTrail((prev) =>
        prev
          .map((p) => ({ ...p, opacity: p.opacity - 0.08 }))
          .filter((p) => p.opacity > 0.05)
      );
    }, 60);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      clearInterval(decayInterval);
    };
  }, [shouldReduceMotion]);

  if (!enabled || shouldReduceMotion) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
    >
      {/* Fading graphite dust trail */}
      {trail.map((pt) => (
        <div
          key={pt.id}
          className="absolute w-1.5 h-1.5 rounded-full bg-[#2B2B2B] -translate-x-1/2 -translate-y-1/2"
          style={{
            left: pt.x,
            top: pt.y,
            opacity: pt.opacity,
            transform: 'scale(0.8)',
          }}
        />
      ))}

      {/* Custom Cursor Graphic */}
      <motion.div
        className="absolute pointer-events-none w-8 h-8 -translate-x-1 -translate-y-7"
        style={{
          left: pos.x,
          top: pos.y,
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
