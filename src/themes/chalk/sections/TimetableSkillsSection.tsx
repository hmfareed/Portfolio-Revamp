'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { skillsContent } from '@/content/skills';
import { ChalkLine } from '../primitives/ChalkLine';
import { ChalkStar } from '../primitives/ChalkDoodles';
import {
  Code2,
  Layout,
  Server,
  Database,
  CreditCard,
  Bot,
  Wrench,
  BookOpen,
} from 'lucide-react';

export const TimetableSkillsSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const getSubjectIcon = (doodle: string) => {
    switch (doodle) {
      case 'languages':
        return <Code2 className="w-5 h-5 text-[#F6D860]" />;
      case 'frontend':
        return <Layout className="w-5 h-5 text-[#8EC5E8]" />;
      case 'backend':
        return <Server className="w-5 h-5 text-[#F4A6B8]" />;
      case 'database':
        return <Database className="w-5 h-5 text-[#82D19B]" />;
      case 'payments':
        return <CreditCard className="w-5 h-5 text-[#F6D860]" />;
      case 'ai':
        return <Bot className="w-5 h-5 text-[#8EC5E8]" />;
      case 'tooling':
        return <Wrench className="w-5 h-5 text-[#F4A6B8]" />;
      case 'beyond':
      default:
        return <BookOpen className="w-5 h-5 text-[#82D19B]" />;
    }
  };

  const getRowAccent = (idx: number) => {
    const accents = [
      { text: 'text-[#F6D860]', border: 'border-[#F6D860]/60' },
      { text: 'text-[#8EC5E8]', border: 'border-[#8EC5E8]/60' },
      { text: 'text-[#F4A6B8]', border: 'border-[#F4A6B8]/60' },
      { text: 'text-[#82D19B]', border: 'border-[#82D19B]/60' },
      { text: 'text-[#F6D860]', border: 'border-[#F6D860]/60' },
      { text: 'text-[#8EC5E8]', border: 'border-[#8EC5E8]/60' },
      { text: 'text-[#F4A6B8]', border: 'border-[#F4A6B8]/60' },
      { text: 'text-[#82D19B]', border: 'border-[#82D19B]/60' },
    ];
    return accents[idx % accents.length];
  };

  return (
    <section id="skills" className="py-16 md:py-20 text-[#F2F0E6]">
      {/* Header */}
      <div className="mb-12">
        <span className="font-heading text-lg uppercase tracking-widest text-[#F6D860] block mb-1">
          04 / SCHOOL TIMETABLE &amp; CAPABILITY GRID
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white tracking-wide">
          Curriculum Timetable
        </h2>
        <ChalkLine color="#F6D860" className="w-56 h-3 mt-2" />
        <p className="font-body text-base sm:text-lg text-stone-200 mt-3 max-w-xl">
          Subject competencies, programming toolchains, and software architectures arranged as a weekly classroom timetable grid.
        </p>
      </div>

      {/* Chalkboard Timetable Slate Frame */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.5 }}
        className="overflow-hidden rounded-xl border-2 border-dashed border-[#F2F0E6]/60 bg-[#263D33] shadow-xl"
      >
        {/* Timetable Header Row */}
        <div className="hidden sm:grid sm:grid-cols-12 bg-[#20332B] border-b-2 border-dashed border-[#F2F0E6]/50 p-4 font-heading text-lg sm:text-xl text-[#F6D860] font-bold">
          <div className="sm:col-span-4 flex items-center gap-2">
            <span>PERIOD / SUBJECT</span>
          </div>
          <div className="sm:col-span-8">
            <span>CURRICULUM MODULES &amp; TOOL PROFICIENCIES</span>
          </div>
        </div>

        {/* Timetable Rows */}
        <div className="divide-y divide-dashed divide-[#F2F0E6]/25">
          {skillsContent.map((group, idx) => {
            const accent = getRowAccent(idx);

            return (
              <div
                key={group.id}
                className="grid grid-cols-1 sm:grid-cols-12 p-4 sm:p-5 items-center gap-4 hover:bg-[#2A4439] transition-colors"
              >
                {/* Subject Column */}
                <div className="sm:col-span-4 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#20332B] border border-dashed border-[#F2F0E6]/30 shrink-0">
                    {getSubjectIcon(group.doodle)}
                  </div>
                  <div>
                    <span className="font-heading text-xs text-stone-400 uppercase block">
                      PERIOD 0{idx + 1}
                    </span>
                    <h3 className={`font-heading text-xl sm:text-2xl font-bold ${accent.text}`}>
                      {group.title}
                    </h3>
                  </div>
                </div>

                {/* Modules / Skill Chips Column */}
                <div className="sm:col-span-8 flex flex-wrap gap-2 pt-1 sm:pt-0">
                  {group.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className={`inline-flex items-center px-3 py-1 rounded-md bg-[#20332B] border border-dashed ${accent.border} ${accent.text} font-heading text-sm sm:text-base font-bold shadow-xs hover:bg-[#20332B]/80 transition-colors`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Timetable Footer Banner */}
        <div className="bg-[#20332B] p-3 px-6 border-t-2 border-dashed border-[#F2F0E6]/40 flex items-center justify-between text-xs sm:text-sm font-heading text-stone-300">
          <div className="flex items-center gap-1.5">
            <ChalkStar className="w-4 h-4 text-[#F6D860]" />
            <span>Daily Lab Sessions &amp; Production Architecture Tested</span>
          </div>
          <span>Total Subject Periods: 08</span>
        </div>
      </motion.div>
    </section>
  );
};
