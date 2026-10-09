'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { skillsContent } from '@/content/skills';
import { GoldAccentLine } from '../primitives/GoldAccentLine';
import { Cpu, Check } from 'lucide-react';

export const PillGridSkillsSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="skills" className="py-24 md:py-32 border-t border-[#e5e5e5] bg-[#f9f9f9]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#6b6b6b] mb-3">
            Core Infrastructure &amp; Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1a1a1a]">
            Technical Competencies
          </h2>
          <GoldAccentLine className="w-24 h-1 mt-3" />
          <p className="mt-4 text-base text-[#6b6b6b] leading-relaxed">
            Full-stack tooling, database architectures, and integration workflows deployed in production.
          </p>
        </div>

        {/* Categorized Pill Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillsContent.map((cat, index) => (
            <motion.div
              key={cat.id}
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.35, delay: index * 0.04 }}
              className="rounded-2xl border border-[#e5e5e5] bg-white p-6 shadow-xs hover:border-[#3248C3]/30 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#e5e5e5]">
                  <h3 className="font-bold text-base text-[#1a1a1a] tracking-tight">
                    {cat.title}
                  </h3>
                  <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded-full bg-[#3248C3]/10 text-[#3248C3]">
                    {cat.skills.length}
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {cat.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium bg-[#f5f5f5] text-[#1a1a1a] border border-[#e5e5e5] hover:border-[#3248C3] hover:text-[#3248C3] hover:bg-[#3248C3]/5 transition-all"
                    >
                      <span>{skill}</span>
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
