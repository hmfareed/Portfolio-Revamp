'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { experienceContent } from '@/content/experience';
import { HandDrawnUnderline } from '../primitives/HandDrawnUnderline';
import { PencilCircle } from '../primitives/PencilCircle';
import { PlaceholderSlot } from '../primitives/PlaceholderSlot';
import { ArrowDoodle } from '../primitives/Doodles';
import { CounterNumber } from '../animations/CounterNumber';
import { DoodleBurst } from '../animations/SectionTransitions';
import { pencilMotion } from '../motion.config';

export const ExperienceSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="experience" className="py-16 md:py-24 border-t-2 border-dashed border-stone-300">
      {/* Header */}
      <div className="mb-14">
        <span className="text-xs uppercase tracking-widest font-mono text-stone-500 font-bold block mb-1">
          03 / Work History &amp; Leadership
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-[#2B2B2B]">
          Experience Timeline
        </h2>
        <HandDrawnUnderline color="#2B2B2B" className="w-64 h-3 mt-1" />
      </div>

      {/* Sketched Timeline Path */}
      <div className="relative pl-6 sm:pl-10 md:pl-12">
        {/* Hand-drawn vertical ruler line */}
        <div
          className="absolute left-2.5 sm:left-4 top-2 bottom-6 w-0.5 border-l-2 border-dashed border-[#2B2B2B]/70"
          aria-hidden="true"
        />

        <div className="space-y-12">
          {experienceContent.map((item, idx) => {
            return (
              <motion.div
                key={item.id}
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative group"
              >
                {/* Hand-drawn timeline node dot with spring pop */}
                <motion.div
                  initial={shouldReduceMotion ? {} : { scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 + 0.1, type: 'spring', stiffness: 400, damping: 15 }}
                  className="absolute -left-[27px] sm:-left-[35px] md:-left-[43px] top-1.5 w-6 h-6 rounded-full bg-[#FFE66D] border-2 border-[#2B2B2B] flex items-center justify-center shadow-xs"
                  aria-hidden="true"
                >
                  <span className="w-2 h-2 rounded-full bg-[#2B2B2B]" />
                </motion.div>

                {/* Entry Content Card with paper unfold effect */}
                <motion.div
                  initial={shouldReduceMotion ? {} : { rotateX: -15, opacity: 0 }}
                  whileInView={{ rotateX: 0, opacity: 1 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.55, ease: 'easeOut', delay: idx * 0.1 }}
                  className="bg-white/80 p-5 sm:p-7 rounded-xs border-2 border-[#2B2B2B] shadow-[3px_4px_0px_#2B2B2B] transition-transform hover:-translate-y-1"
                  style={{
                    transformOrigin: 'top center',
                  }}
                >
                  {/* Top metadata row */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2 font-handwriting">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold uppercase tracking-wider px-2 py-0.5 rounded-xs bg-[#2B2B2B] text-white">
                        {item.type}
                      </span>
                      <span className="text-sm text-stone-600 font-medium">
                        {item.location}
                      </span>
                    </div>
                    <span className="text-sm sm:text-base font-bold text-[#E4572E] bg-red-50 border border-red-200 px-2.5 py-0.5 rounded-xs">
                      {item.period}
                    </span>
                  </div>

                  {/* Title and Org */}
                  <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#2B2B2B] mb-1">
                    {item.role}{' '}
                    <span className="text-stone-500 font-normal">
                      — {item.organization}
                    </span>
                  </h3>

                  {/* Highlight Stats if any (e.g. 790+ students, 36+ models) */}
                  {item.highlightStats && item.highlightStats.length > 0 && (
                    <div className="my-4 flex flex-wrap items-center gap-6 p-3 bg-amber-50/80 border border-stone-300 rounded-xs font-handwriting">
                      {item.highlightStats.map((stat, sIdx) => (
                        <div key={sIdx} className="flex items-center gap-2">
                          <CounterNumber
                            value={stat.value}
                            strokeColor="#E4572E"
                            className="font-heading text-2xl sm:text-3xl font-bold text-[#2B2B2B]"
                          />
                          <span className="text-sm sm:text-base text-stone-700">
                            {stat.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Bullets */}
                  <ul className="space-y-2 font-handwriting text-base sm:text-lg text-stone-800 mt-3">
                    {item.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2.5">
                        <span className="text-[#2B2B2B] font-bold mt-0.5 shrink-0">
                          •
                        </span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Placeholders if any */}
                  {item.placeholders && item.placeholders.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-dashed border-stone-200 flex flex-col gap-1.5">
                      {item.placeholders.map((ph, pIdx) => (
                        <PlaceholderSlot key={pIdx} text={ph} />
                      ))}
                    </div>
                  )}
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Sketched pointer arrow at bottom of timeline */}
        <div className="mt-8 flex items-center gap-2 font-handwriting text-stone-600">
          <ArrowDoodle className="w-8 h-8 text-[#2B2B2B]" direction="curved" />
          <span className="text-base italic">Continuously building and shipping software</span>
        </div>
      </div>

      {/* Doodle burst section transition */}
      <DoodleBurst />
    </section>
  );
};
