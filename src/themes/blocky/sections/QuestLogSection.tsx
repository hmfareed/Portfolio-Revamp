'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { experienceContent } from '@/content/experience';
import { PixelDivider } from '../primitives/PixelDivider';
import { ScoreCounter } from '../primitives/ScoreCounter';
import { GlitchSlot } from '../primitives/GlitchSlot';
import { Scroll, CheckCircle2, Clock, MapPin, Award } from 'lucide-react';

export const QuestLogSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="experience" className="py-16 md:py-20">
      {/* Header */}
      <div className="mb-12">
        <span className="font-pixel text-[10px] uppercase tracking-widest text-[#FFD23F] block mb-1">
          03 / ADVENTURE CAMPAIGN ARCHIVE
        </span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-pixel font-bold text-white drop-shadow-md">
          QUEST LOG
        </h2>
        <PixelDivider color="#FFD23F" className="w-56 h-3 mt-2" />
        <p className="font-body text-base sm:text-lg text-stone-200 mt-3 max-w-xl">
          Historical quest line tracking real-world engineering roles from initial recruits to active campaign leadership.
        </p>
      </div>

      {/* Quest Cards Vertical Log */}
      <div className="max-w-4xl mx-auto flex flex-col space-y-6">
        {experienceContent.map((item, idx) => {
          const isCurrent = item.period.toLowerCase().includes('present');

          return (
            <motion.div
              key={item.id}
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
              whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: idx * 0.08 }}
              className="relative"
            >
              {/* Voxel Quest Box */}
              <div
                className={`relative border-4 border-black p-6 sm:p-8 rounded-xs text-[#F3F4F6] shadow-[0_10px_0_#0F1217] ${
                  isCurrent
                    ? 'bg-[#263142] border-[#38BDF8]'
                    : 'bg-[#2A303C]'
                }`}
                style={{
                  boxShadow: isCurrent
                    ? 'inset 3px 3px 0 rgba(56, 189, 248, 0.3), inset -3px -3px 0 rgba(0, 0, 0, 0.7), 0 10px 0 #0F1217'
                    : 'inset 3px 3px 0 rgba(255, 255, 255, 0.15), inset -3px -3px 0 rgba(0, 0, 0, 0.7), 0 10px 0 #0F1217',
                }}
              >
                {/* 4 Corner Screws */}
                <span className="absolute top-2 left-2 w-2 h-2 bg-[#1E232A] border border-white/20 pointer-events-none" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-[#1E232A] border border-white/20 pointer-events-none" />
                <span className="absolute bottom-2 left-2 w-2 h-2 bg-[#1E232A] border border-white/20 pointer-events-none" />
                <span className="absolute bottom-2 right-2 w-2 h-2 bg-[#1E232A] border border-white/20 pointer-events-none" />

                {/* Quest Status Ribbon */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    {isCurrent ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#0369A1] text-white font-pixel text-[10px] uppercase border border-[#38BDF8] shadow-xs">
                        <span className="w-2 h-2 bg-[#4ADE80] animate-pulse rounded-full" />
                        <span>ACTIVE QUEST · IN PROGRESS</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#14532D] text-[#86EFAC] font-pixel text-[10px] uppercase border border-[#22C55E]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#4ADE80]" />
                        <span>QUEST CLEARED · 100% COMPLETE</span>
                      </span>
                    )}

                    <span className="font-pixel text-[9px] uppercase px-2 py-1 bg-[#1E232A] text-stone-300 border border-black">
                      {item.type}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-stone-400 font-pixel text-[10px]">
                    <Clock className="w-3.5 h-3.5 text-[#FFD23F]" />
                    <span className="text-[#FFD23F] font-bold">{item.period}</span>
                  </div>
                </div>

                {/* Role and Organization */}
                <div className="mb-2">
                  <h3 className="font-pixel text-lg sm:text-xl text-white font-bold mb-1">
                    {item.role}{' '}
                    <span className="text-[#38BDF8]">
                      @ {item.organization}
                    </span>
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-stone-400 font-body">
                    <MapPin className="w-3.5 h-3.5 text-stone-500" />
                    <span>{item.location}</span>
                  </div>
                </div>

                {/* Arcade Highlight Score Counters */}
                {item.highlightStats && item.highlightStats.length > 0 && (
                  <div className="my-5 p-4 bg-[#1E232A] border-2 border-black rounded-xs flex flex-wrap items-center gap-6 shadow-inner">
                    {item.highlightStats.map((stat, sIdx) => (
                      <div key={sIdx} className="flex items-center gap-3">
                        <ScoreCounter strokeColor="#FFD23F" className="text-xl">
                          {stat.value}
                        </ScoreCounter>
                        <span className="font-pixel text-[10px] text-stone-300 uppercase max-w-[200px]">
                          {stat.label}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Quest Objectives (Bullets) */}
                <div className="space-y-2 font-body text-sm sm:text-base text-stone-200 mt-4">
                  <span className="font-pixel text-[10px] uppercase tracking-wider text-[#FFD23F] block mb-2">
                    QUEST OBJECTIVES COMPLETED:
                  </span>
                  <ul className="space-y-2">
                    {item.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2.5">
                        <span className="text-[#4ADE80] font-pixel text-xs shrink-0 mt-0.5">✔</span>
                        <span className="leading-relaxed">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Placeholders */}
                {item.placeholders && item.placeholders.length > 0 && (
                  <div className="mt-5 pt-3 border-t-2 border-black/40 flex flex-col gap-1.5">
                    {item.placeholders.map((ph, pIdx) => (
                      <GlitchSlot key={pIdx} text={ph} />
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
