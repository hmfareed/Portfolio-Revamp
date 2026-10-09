'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { experienceContent } from '@/content/experience';
import { BrickUnderline } from '../primitives/BrickUnderline';
import { NumberBrick } from '../primitives/NumberBrick';
import { BrickSlot } from '../primitives/BrickSlot';
import { BrickStud } from '../primitives/BrickStud';
import { Castle, Layers, ArrowUp } from 'lucide-react';

export const BrickExperienceSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  // Reverse so current role is at the top of the tower and earliest is at the bottom
  // elagent (top) down to hanara (bottom foundation)
  const towerStack = [...experienceContent]; // elagent is index 0 (top of page/tower), hanara is index 4 (foundation)

  return (
    <section id="experience" className="py-16 md:py-20">
      {/* Header */}
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="font-heading text-xs uppercase tracking-widest text-[#FFC62B] font-bold block mb-1">
            03 / Tower Stack Architecture
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white drop-shadow-md">
            Experience Tower
          </h2>
          <BrickUnderline color="#FFC62B" className="w-60 h-3.5 mt-2" />
        </div>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-black/40 text-white font-heading text-xs sm:text-sm uppercase tracking-wide border border-white/20">
          <ArrowUp className="w-4 h-4 text-[#FFC62B]" />
          <span>Built From Foundation (Bottom) To Present (Top)</span>
        </div>
      </div>

      {/* Vertical Tower of Bricks */}
      <div className="max-w-4xl mx-auto flex flex-col space-y-4">
        {towerStack.map((item, idx) => {
          // Palette alternating for tower layers
          const layerConfigs = [
            { bg: '#D1382B', text: 'text-white', border: '#9E2419', stud: '#E54536', name: 'Level 5 (Apex / Present)' },
            { bg: '#1F6FEB', text: 'text-white', border: '#134FB0', stud: '#3B82F6', name: 'Level 4' },
            { bg: '#FFC62B', text: 'text-[#1A1F2B]', border: '#C99812', stud: '#FFD252', name: 'Level 3' },
            { bg: '#F4F1E8', text: 'text-[#1A1F2B]', border: '#D5D0C2', stud: '#FFFFFF', name: 'Level 2' },
            { bg: '#20783A', text: 'text-white', border: '#145326', stud: '#2E9E4F', name: 'Level 1 (Foundation Base)' },
          ];
          const cfg = layerConfigs[idx % layerConfigs.length];

          return (
            <motion.div
              key={item.id}
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -20, scale: 0.98 }}
              whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: idx * 0.1 }}
              className="relative group"
            >
              {/* Stud Row Interlocking Connector */}
              <div
                className="flex items-center justify-around px-8 -mb-2 pointer-events-none relative z-20"
                aria-hidden="true"
              >
                {Array.from({ length: 8 }).map((_, sIdx) => (
                  <BrickStud key={sIdx} color={cfg.bg} size="sm" />
                ))}
              </div>

              {/* Tower Brick Plate Layer */}
              <div
                className={`relative rounded-3xl border-3 border-black/30 p-6 sm:p-8 shadow-[0_10px_20px_rgba(0,0,0,0.3)] transition-transform group-hover:-translate-y-1 ${cfg.text}`}
                style={{
                  backgroundColor: cfg.bg,
                  boxShadow:
                    'inset 0 2px 0 rgba(255, 255, 255, 0.5), inset 0 -4px 0 rgba(0, 0, 0, 0.3), 0 10px 20px rgba(0, 0, 0, 0.3)',
                }}
              >
                {/* Layer Metadata */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-heading text-xs uppercase tracking-wider px-2.5 py-1 rounded-lg bg-black/30 text-white border border-white/20">
                      {cfg.name}
                    </span>
                    <span className="font-heading text-xs uppercase tracking-wider px-2.5 py-1 rounded-lg bg-white/20">
                      {item.type}
                    </span>
                    <span className="font-body text-xs opacity-90 font-semibold">
                      {item.location}
                    </span>
                  </div>
                  <span className="font-heading text-sm sm:text-base font-bold px-3 py-1 rounded-xl bg-black/25">
                    {item.period}
                  </span>
                </div>

                {/* Role and Organization */}
                <h3 className="font-heading text-2xl sm:text-3xl font-bold mb-2">
                  {item.role}{' '}
                  <span className="opacity-80 font-normal">
                    — {item.organization}
                  </span>
                </h3>

                {/* Highlight Numbers Bricks (e.g. 790+ and 36+) */}
                {item.highlightStats && item.highlightStats.length > 0 && (
                  <div className="my-4 flex flex-wrap items-center gap-6 p-4 rounded-2xl bg-black/20 border border-white/20">
                    {item.highlightStats.map((stat, sIdx) => (
                      <div key={sIdx} className="flex items-center gap-3">
                        <NumberBrick strokeColor="#FFC62B" className="text-2xl">
                          {stat.value}
                        </NumberBrick>
                        <span className="font-body text-sm sm:text-base font-bold">
                          {stat.label}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Bullets */}
                <ul className="space-y-2 font-body text-sm sm:text-base opacity-95 mt-3">
                  {item.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2.5">
                      <span className="font-bold text-lg leading-none shrink-0">•</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Placeholders */}
                {item.placeholders && item.placeholders.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-white/20 flex flex-col gap-1.5">
                    {item.placeholders.map((ph, pIdx) => (
                      <BrickSlot key={pIdx} text={ph} />
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
