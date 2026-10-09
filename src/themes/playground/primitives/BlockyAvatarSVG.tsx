'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export const BlockyAvatarSVG: React.FC<{ className?: string }> = ({
  className = 'w-64 sm:w-72 md:w-80 h-auto',
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      animate={
        shouldReduceMotion
          ? {}
          : {
              y: [0, -6, 0],
            }
      }
      transition={{
        duration: 3.5,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className={`relative inline-block select-none ${className}`}
    >
      <svg
        viewBox="0 0 240 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto drop-shadow-2xl"
        aria-label="Original blocky developer character avatar"
      >
        {/* === BASEPLATE AT BOTTOM (Planted Studded Platform) === */}
        {/* Baseplate Main Slab */}
        <rect x="20" y="270" width="200" height="28" rx="7" fill="#00B06F" stroke="#008C57" strokeWidth="2.5" />
        <rect x="20" y="270" width="200" height="6" rx="3" fill="#33C58E" />
        
        {/* Baseplate Studs (4 round studs along the platform) */}
        {/* Stud 1 */}
        <ellipse cx="50" cy="268" rx="14" ry="5.5" fill="#33C58E" stroke="#008C57" strokeWidth="1.5" />
        <ellipse cx="50" cy="266" rx="12" ry="4" fill="#66D7AB" />
        {/* Stud 2 */}
        <ellipse cx="95" cy="268" rx="14" ry="5.5" fill="#33C58E" stroke="#008C57" strokeWidth="1.5" />
        <ellipse cx="95" cy="266" rx="12" ry="4" fill="#66D7AB" />
        {/* Stud 3 */}
        <ellipse cx="145" cy="268" rx="14" ry="5.5" fill="#33C58E" stroke="#008C57" strokeWidth="1.5" />
        <ellipse cx="145" cy="266" rx="12" ry="4" fill="#66D7AB" />
        {/* Stud 4 */}
        <ellipse cx="190" cy="268" rx="14" ry="5.5" fill="#33C58E" stroke="#008C57" strokeWidth="1.5" />
        <ellipse cx="190" cy="266" rx="12" ry="4" fill="#66D7AB" />

        {/* Character Shadow on Baseplate */}
        <ellipse cx="120" cy="270" rx="65" ry="8" fill="#00603B" opacity="0.6" />

        {/* === LEGS === */}
        {/* Left Leg */}
        <rect x="76" y="195" width="38" height="74" rx="8" fill="#1E293B" stroke="#0F172A" strokeWidth="2" />
        {/* Left Shoe Cuff */}
        <rect x="76" y="254" width="38" height="15" rx="5" fill="#0F172A" />

        {/* Right Leg */}
        <rect x="126" y="195" width="38" height="74" rx="8" fill="#1E293B" stroke="#0F172A" strokeWidth="2" />
        {/* Right Shoe Cuff */}
        <rect x="126" y="254" width="38" height="15" rx="5" fill="#0F172A" />

        {/* === TORSO === */}
        <rect x="70" y="105" width="100" height="92" rx="14" fill="#2F7BFF" stroke="#1E5CD4" strokeWidth="2.5" />
        {/* Torso Top Highlight */}
        <rect x="72" y="107" width="96" height="8" rx="4" fill="#6AA4FF" opacity="0.8" />
        {/* Developer Graphic on Hoodie (< / > code tag) */}
        <rect x="94" y="130" width="52" height="34" rx="8" fill="#1E232A" stroke="#424549" strokeWidth="1.5" />
        <path d="M104 147 L109 141 M104 147 L109 153" stroke="#00B06F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M136 147 L131 141 M136 147 L131 153" stroke="#00B06F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="123" y1="138" x2="117" y2="156" stroke="#FFC933" strokeWidth="2" strokeLinecap="round" />

        {/* === ARMS === */}
        {/* Left Arm */}
        <rect x="36" y="108" width="30" height="82" rx="10" fill="#2F7BFF" stroke="#1E5CD4" strokeWidth="2" />
        {/* Left Hand (rounded yellow block) */}
        <rect x="38" y="174" width="26" height="22" rx="8" fill="#FFC933" stroke="#D9A316" strokeWidth="1.5" />

        {/* Right Arm */}
        <rect x="174" y="108" width="30" height="82" rx="10" fill="#2F7BFF" stroke="#1E5CD4" strokeWidth="2" />
        {/* Right Hand */}
        <rect x="176" y="174" width="26" height="22" rx="8" fill="#FFC933" stroke="#D9A316" strokeWidth="1.5" />

        {/* === NECK === */}
        <rect x="105" y="96" width="30" height="12" rx="4" fill="#EAB308" />

        {/* === HEAD === */}
        {/* Head Top Stud */}
        <rect x="106" y="24" width="28" height="12" rx="5" fill="#00B06F" stroke="#008C57" strokeWidth="2" />
        <ellipse cx="120" cy="27" rx="10" ry="3.5" fill="#66D7AB" />

        {/* Head Main Cube */}
        <rect x="80" y="32" width="80" height="68" rx="16" fill="#FFC933" stroke="#D9A316" strokeWidth="2.5" />

        {/* Cap/Hair Visor Brim */}
        <path d="M80 44 C92 35 148 35 160 44 L160 40 C160 34 154 32 148 32 L92 32 C86 32 80 34 80 40 Z" fill="#2F7BFF" stroke="#1E5CD4" strokeWidth="1" />

        {/* Friendly Eyes */}
        <rect x="96" y="55" width="10" height="13" rx="4" fill="#1E232A" />
        <rect x="134" y="55" width="10" height="13" rx="4" fill="#1E232A" />
        {/* Eye Shine Sparkles */}
        <circle cx="99" cy="58" r="2.5" fill="#FFFFFF" />
        <circle cx="137" cy="58" r="2.5" fill="#FFFFFF" />

        {/* Friendly Expressive Smile */}
        <path d="M106 77 Q120 86 134 77" stroke="#1E232A" strokeWidth="3.5" strokeLinecap="round" fill="none" />

        {/* Cheerful Blush Marks */}
        <ellipse cx="91" cy="74" rx="4.5" ry="3" fill="#FF5A5F" opacity="0.65" />
        <ellipse cx="149" cy="74" rx="4.5" ry="3" fill="#FF5A5F" opacity="0.65" />

        {/* === MODERN HEADPHONES === */}
        {/* Headband spanning across head */}
        <path d="M76 56 C76 22 164 22 164 56" stroke="#FF5A5F" strokeWidth="6" strokeLinecap="round" fill="none" />
        {/* Left Ear Cushion */}
        <rect x="71" y="48" width="10" height="24" rx="4" fill="#FF5A5F" stroke="#D9383E" strokeWidth="1.5" />
        <rect x="73" y="52" width="6" height="16" rx="2" fill="#FFA3A6" />
        {/* Right Ear Cushion */}
        <rect x="159" y="48" width="10" height="24" rx="4" fill="#FF5A5F" stroke="#D9383E" strokeWidth="1.5" />
        <rect x="161" y="52" width="6" height="16" rx="2" fill="#FFA3A6" />
      </svg>
    </motion.div>
  );
};
