'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export const PixelClouds: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const clouds = [
    { id: 1, top: '4%', duration: 45, delay: 0, scale: 1 },
    { id: 2, top: '12%', duration: 60, delay: -20, scale: 0.75 },
    { id: 3, top: '22%', duration: 52, delay: -35, scale: 0.9 },
  ];

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0" aria-hidden="true">
      {clouds.map((cloud) => (
        <motion.div
          key={cloud.id}
          className="absolute left-0 opacity-80"
          style={{ top: cloud.top, scale: cloud.scale }}
          initial={shouldReduceMotion ? { x: `${(cloud.id * 30) % 80}vw` } : { x: '-20vw' }}
          animate={
            shouldReduceMotion
              ? {}
              : {
                  x: '120vw',
                  transition: {
                    duration: cloud.duration,
                    delay: cloud.delay,
                    repeat: Infinity,
                    ease: 'linear',
                  },
                }
          }
        >
          {/* Pixelated Chunky Cloud SVG */}
          <svg width="180" height="70" viewBox="0 0 180 70" fill="none">
            {/* Cloud Main White Rectangles */}
            <rect x="30" y="20" width="120" height="40" fill="#FFFFFF" />
            <rect x="50" y="10" width="70" height="50" fill="#FFFFFF" />
            <rect x="70" y="0" width="40" height="60" fill="#FFFFFF" />
            <rect x="10" y="30" width="150" height="20" fill="#FFFFFF" />
            <rect x="0" y="35" width="170" height="15" fill="#FFFFFF" />

            {/* Cloud Bottom Pixel Shadow Layer */}
            <rect x="0" y="45" width="170" height="5" fill="#E2F1F8" />
            <rect x="10" y="50" width="150" height="5" fill="#E2F1F8" />
            <rect x="30" y="55" width="120" height="5" fill="#C5E3F0" />

            {/* Cloud Pixel Outline */}
            <rect x="70" y="0" width="40" height="3" fill="#5A96B4" opacity="0.4" />
            <rect x="30" y="60" width="120" height="3" fill="#5A96B4" opacity="0.5" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};
