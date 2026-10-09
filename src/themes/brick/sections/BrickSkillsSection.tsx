'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { skillsContent } from '@/content/skills';
import { BrickUnderline } from '../primitives/BrickUnderline';
import { BrickTag } from '../primitives/BrickTag';
import { BrickStud } from '../primitives/BrickStud';
import {
  Code2,
  Layout,
  Server,
  Database,
  CreditCard,
  Bot,
  Terminal,
  BookMarked,
} from 'lucide-react';

export const BrickSkillsSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const getCategoryIcon = (doodle: string) => {
    switch (doodle) {
      case 'languages':
        return <Code2 className="w-5 h-5 text-[#FFC62B]" />;
      case 'frontend':
        return <Layout className="w-5 h-5 text-[#1F6FEB]" />;
      case 'backend':
        return <Server className="w-5 h-5 text-[#D1382B]" />;
      case 'database':
        return <Database className="w-5 h-5 text-[#2E9E4F]" />;
      case 'payments':
        return <CreditCard className="w-5 h-5 text-[#FFC62B]" />;
      case 'ai':
        return <Bot className="w-5 h-5 text-[#1F6FEB]" />;
      case 'tooling':
        return <Terminal className="w-5 h-5 text-[#D1382B]" />;
      case 'beyond':
      default:
        return <BookMarked className="w-5 h-5 text-[#2E9E4F]" />;
    }
  };

  const getCategoryTheme = (idx: number) => {
    const themes = [
      { tagColor: 'yellow' as const, borderColor: '#C99812' },
      { tagColor: 'blue' as const, borderColor: '#134FB0' },
      { tagColor: 'red' as const, borderColor: '#9E2419' },
      { tagColor: 'green' as const, borderColor: '#20783A' },
      { tagColor: 'yellow' as const, borderColor: '#C99812' },
      { tagColor: 'blue' as const, borderColor: '#134FB0' },
      { tagColor: 'white' as const, borderColor: '#D5D0C2' },
      { tagColor: 'red' as const, borderColor: '#9E2419' },
    ];
    return themes[idx % themes.length];
  };

  return (
    <section id="skills" className="py-16 md:py-20">
      {/* Header */}
      <div className="mb-12">
        <span className="font-heading text-xs uppercase tracking-widest text-[#FFC62B] font-bold block mb-1">
          04 / Component Bin &amp; Parts Catalog
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white drop-shadow-md">
          Skills &amp; Capabilities
        </h2>
        <BrickUnderline color="#FFC62B" className="w-56 h-3.5 mt-2" />
        <p className="font-body text-base sm:text-lg text-emerald-100 mt-3 font-medium">
          Standardized 1x2 engineering bricks grouped by capability category.
        </p>
      </div>

      {/* Grid of Categorized Brick Plates */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
        {skillsContent.map((group, idx) => {
          const theme = getCategoryTheme(idx);

          return (
            <motion.div
              key={group.id}
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.4, delay: idx * 0.06 }}
              className="h-full flex"
            >
              <div
                className="w-full flex flex-col justify-between rounded-2xl bg-[#F4F1E8] border-3 border-black/25 p-5 shadow-[0_8px_16px_rgba(0,0,0,0.25)] relative"
                style={{
                  boxShadow:
                    'inset 0 2px 0 rgba(255, 255, 255, 0.6), inset 0 -3px 0 rgba(0, 0, 0, 0.2), 0 8px 16px rgba(0, 0, 0, 0.25)',
                }}
              >
                {/* 4 studs along top of skill tray */}
                <div
                  className="absolute -top-3 left-4 right-4 flex items-center justify-around pointer-events-none"
                  aria-hidden="true"
                >
                  <BrickStud color="#F4F1E8" size="xs" />
                  <BrickStud color="#F4F1E8" size="xs" />
                  <BrickStud color="#F4F1E8" size="xs" />
                  <BrickStud color="#F4F1E8" size="xs" />
                </div>

                <div>
                  {/* Category Header */}
                  <div className="flex items-center justify-between pb-3 mb-3 border-b-2 border-stone-300">
                    <h3 className="font-heading text-lg sm:text-xl font-bold text-[#1A1F2B]">
                      {group.title}
                    </h3>
                    <div className="p-1.5 rounded-lg bg-white border border-stone-300 shadow-2xs">
                      {getCategoryIcon(group.doodle)}
                    </div>
                  </div>

                  {/* 1x2 Brick Tags */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {group.skills.map((skill, sIdx) => (
                      <BrickTag
                        key={sIdx}
                        label={skill}
                        color={theme.tagColor}
                        className="text-xs py-1"
                      />
                    ))}
                  </div>
                </div>

                {/* Bottom tray watermark */}
                <div className="mt-4 pt-2 border-t border-stone-200 flex items-center justify-between text-[11px] font-mono text-stone-500 font-bold">
                  <span>Part Group #{idx + 1}</span>
                  <span>1x2 Studs</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
