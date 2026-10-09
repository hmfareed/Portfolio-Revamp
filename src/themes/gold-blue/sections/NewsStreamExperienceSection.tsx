'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { experienceContent } from '@/content/experience';
import { GoldAccentLine } from '../primitives/GoldAccentLine';
import { ContentSlot } from '../primitives/ContentSlot';
import { Calendar, MapPin, Briefcase, CheckCircle2 } from 'lucide-react';

export const NewsStreamExperienceSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="experience" className="py-24 md:py-32 border-t border-[#e5e5e5] bg-[#f9f9f9]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#6b6b6b] mb-3">
            Career Timeline &amp; Roles
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1a1a1a]">
            Professional Experience
          </h2>
          <GoldAccentLine className="w-24 h-1 mt-3" />
          <p className="mt-4 text-base text-[#6b6b6b] leading-relaxed">
            Engineering leadership, full-stack software delivery, and impactful classroom teaching.
          </p>
        </div>

        {/* Stacked News Card Stream */}
        <div className="space-y-6 max-w-5xl mx-auto">
          {experienceContent.map((exp, index) => (
            <motion.article
              key={exp.id}
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="rounded-2xl border border-[#e5e5e5] bg-white p-6 sm:p-8 shadow-xs hover:border-[#3248C3]/30 hover:shadow-md transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-[#e5e5e5]">
                {/* Role Title and Organization */}
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#1a1a1a] tracking-tight">
                    {exp.role}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-base font-semibold text-[#3248C3]">
                      {exp.organization}
                    </span>
                    <span className="text-[#e5e5e5]">·</span>
                    <span className="flex items-center gap-1 text-xs text-[#6b6b6b]">
                      <MapPin className="w-3.5 h-3.5" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                {/* Date & Type Badges */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#f0f0f0] text-[#1a1a1a] border border-[#e5e5e5]">
                    <Calendar className="w-3.5 h-3.5 text-[#3248C3]" />
                    <span>{exp.period}</span>
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#3248C3]/10 text-[#3248C3]">
                    {exp.type}
                  </span>
                </div>
              </div>

              {/* Accomplishment Bullets */}
              <ul className="space-y-2.5 text-sm sm:text-base text-[#6b6b6b] leading-relaxed">
                {exp.bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#D1AA67] shrink-0 mt-1" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              {/* Highlight Stats if present */}
              {exp.highlightStats && exp.highlightStats.length > 0 && (
                <div className="mt-5 pt-4 border-t border-[#e5e5e5] flex flex-wrap gap-4">
                  {exp.highlightStats.map((stat, sIdx) => (
                    <div
                      key={sIdx}
                      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#3248C3]/5 border border-[#3248C3]/15 text-xs text-[#1a1a1a]"
                    >
                      <span className="font-extrabold text-[#3248C3]">{stat.value}</span>
                      <span className="text-[#6b6b6b]">{stat.label}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Placeholders */}
              {exp.placeholders && exp.placeholders.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {exp.placeholders.map((ph, pIdx) => (
                    <ContentSlot key={pIdx} text={ph} />
                  ))}
                </div>
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
