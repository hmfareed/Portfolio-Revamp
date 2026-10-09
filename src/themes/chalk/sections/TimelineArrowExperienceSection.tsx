'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { experienceContent } from '@/content/experience';
import { ChalkLine } from '../primitives/ChalkLine';
import { ChalkCircle } from '../primitives/ChalkCircle';
import { ChalkSlot } from '../primitives/ChalkSlot';
import { ChalkStar, ChalkArrow } from '../primitives/ChalkDoodles';
import { Calendar, MapPin, CheckCircle2 } from 'lucide-react';

export const TimelineArrowExperienceSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="experience" className="py-16 md:py-20 text-[#F2F0E6]">
      {/* Header */}
      <div className="mb-12">
        <span className="font-heading text-lg uppercase tracking-widest text-[#F6D860] block mb-1">
          03 / CURRICULUM VITAE &amp; EXPERIENCE TIMELINE
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white tracking-wide">
          Teaching &amp; Engineering Timeline
        </h2>
        <ChalkLine color="#F6D860" className="w-64 h-3 mt-2" />
        <p className="font-body text-base sm:text-lg text-stone-200 mt-3 max-w-xl">
          A continuous timeline drawn along the board documenting production roles from foundational software projects to active engineering leadership.
        </p>
      </div>

      {/* Timeline Container with Chalk Arrow Axis */}
      <div className="relative max-w-4xl mx-auto pl-6 sm:pl-10 md:pl-12">
        {/* Continuous Vertical Chalk Arrow Line */}
        <div
          className="absolute left-2 sm:left-4 md:left-5 top-4 bottom-8 w-1 border-l-2 border-dashed border-[#8EC5E8]"
          aria-hidden="true"
        />

        {/* Downward Chalk Arrowhead at bottom of timeline */}
        <div
          className="absolute left-0.5 sm:left-2.5 md:left-3.5 bottom-2 text-[#8EC5E8] font-mono text-base font-bold select-none pointer-events-none"
          aria-hidden="true"
        >
          ▼
        </div>

        {/* List of Experience Role Notes */}
        <div className="space-y-8">
          {experienceContent.map((item, idx) => {
            const isCurrent = item.period.toLowerCase().includes('present');

            return (
              <motion.div
                key={item.id}
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: 20 }}
                whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className="relative"
              >
                {/* Chalk Node Marker on the timeline */}
                <div
                  className={`absolute -left-6 sm:-left-10 md:-left-12 top-6 w-5 h-5 rounded-full border-2 flex items-center justify-center font-heading text-xs font-bold ${
                    isCurrent
                      ? 'border-[#F6D860] bg-[#F6D860] text-[#23382F] shadow-[0_0_10px_rgba(246,216,96,0.6)]'
                      : 'border-[#8EC5E8] bg-[#23382F] text-[#8EC5E8]'
                  }`}
                  aria-hidden="true"
                >
                  {isCurrent ? '★' : idx + 1}
                </div>

                {/* Chalk Note Card */}
                <div
                  className={`p-6 sm:p-8 rounded-xl border-2 border-dashed shadow-lg transition-transform ${
                    isCurrent
                      ? 'bg-[#284237] border-[#F6D860]'
                      : 'bg-[#263D33] border-[#F2F0E6]/50'
                  }`}
                >
                  {/* Period & Status Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      {isCurrent ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#20332B] border border-dashed border-[#F4A6B8] text-[#F4A6B8] font-heading text-sm font-bold">
                          <ChalkStar className="w-3.5 h-3.5 text-[#F4A6B8]" />
                          <span>CURRENT POST · ACTIVE</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#20332B] border border-dashed border-[#8EC5E8]/60 text-[#8EC5E8] font-heading text-xs font-bold">
                          <span>MILESTONE #{experienceContent.length - idx}</span>
                        </span>
                      )}

                      <span className="font-heading text-sm text-stone-300 px-2 py-0.5 rounded-md bg-[#1F332A]">
                        {item.type}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 font-heading text-base text-[#F6D860] font-bold">
                      <Calendar className="w-4 h-4 text-[#F6D860]" />
                      <span>{item.period}</span>
                    </div>
                  </div>

                  {/* Role and Organization */}
                  <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-1">
                    {item.role}{' '}
                    <span className="text-[#8EC5E8] font-normal">
                      — {item.organization}
                    </span>
                  </h3>

                  <div className="flex items-center gap-1.5 text-xs sm:text-sm text-stone-300 font-body mb-4">
                    <MapPin className="w-3.5 h-3.5 text-stone-400" />
                    <span>{item.location}</span>
                  </div>

                  {/* Chalk Boxed/Circled Highlight Numbers (790+ and 36+) */}
                  {item.highlightStats && item.highlightStats.length > 0 && (
                    <div className="my-5 p-4 bg-[#20332B] border border-dashed border-[#F6D860]/60 rounded-lg flex flex-wrap items-center gap-6 shadow-inner">
                      {item.highlightStats.map((stat, sIdx) => (
                        <div key={sIdx} className="flex items-center gap-3">
                          <ChalkCircle strokeColor="#F6D860" className="text-2xl sm:text-3xl font-bold">
                            {stat.value}
                          </ChalkCircle>
                          <span className="font-heading text-base sm:text-lg text-stone-200">
                            {stat.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Bullet Points */}
                  <ul className="space-y-2 font-body text-sm sm:text-base text-stone-200 mt-4">
                    {item.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2.5">
                        <span className="font-heading text-[#F6D860] font-bold text-lg leading-none shrink-0 mt-0.5">
                          —
                        </span>
                        <span className="leading-relaxed">{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Placeholders */}
                  {item.placeholders && item.placeholders.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-dashed border-[#F2F0E6]/30 flex flex-col gap-1.5">
                      {item.placeholders.map((ph, pIdx) => (
                        <ChalkSlot key={pIdx} text={ph} />
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
