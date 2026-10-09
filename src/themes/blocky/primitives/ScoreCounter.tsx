'use client';

import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface ScoreCounterProps {
  children: React.ReactNode;
  className?: string;
  strokeColor?: string;
}

export const ScoreCounter: React.FC<ScoreCounterProps> = ({
  children,
  className = '',
  strokeColor = '#FFD23F',
}) => {
  const shouldReduceMotion = useReducedMotion();
  const rawText = String(children || '');
  const numericMatch = rawText.match(/\d+/);
  const targetNumber = numericMatch ? parseInt(numericMatch[0], 10) : 0;
  const suffix = rawText.replace(/\d+/, '');

  const [currentNumber, setCurrentNumber] = useState<number>(shouldReduceMotion ? targetNumber : 0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (shouldReduceMotion || !hasStarted || targetNumber === 0) return;

    let startTime: number;
    const duration = 1200; // 1.2s roll up

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // easeOutExpo
      const easeVal = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCurrentNumber(Math.floor(easeVal * targetNumber));

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCurrentNumber(targetNumber);
      }
    };

    requestAnimationFrame(step);
  }, [hasStarted, targetNumber, shouldReduceMotion]);

  return (
    <motion.span
      onViewportEnter={() => setHasStarted(true)}
      viewport={{ once: true }}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#1E232A] border-3 border-black rounded-xs font-pixel text-lg sm:text-xl font-bold select-none ${className}`}
      style={{
        color: strokeColor,
        boxShadow: 'inset 2px 2px 0 rgba(255,255,255,0.2), 0 4px 0 #0F1217',
      }}
    >
      <span className="text-xs uppercase opacity-70">XP:</span>
      <span>
        {shouldReduceMotion ? rawText : `${currentNumber}${suffix}`}
      </span>
    </motion.span>
  );
};
