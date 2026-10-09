'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { skillsContent } from '@/content/skills';
import { HandDrawnUnderline } from '../primitives/HandDrawnUnderline';
import { StickyNote } from '../primitives/StickyNote';
import {
  CodeBracketsDoodle,
  StarDoodle,
  LightbulbDoodle,
  PaperclipDoodle,
} from '../primitives/Doodles';
import {
  Layers,
  Server,
  Database,
  CreditCard,
  Cpu,
  Terminal,
  BookOpen,
} from 'lucide-react';

export const SkillsSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const getDoodleIcon = (doodle: string) => {
    switch (doodle) {
      case 'languages':
        return <CodeBracketsDoodle className="w-5 h-5 text-stone-800" />;
      case 'frontend':
        return <Layers className="w-5 h-5 text-pink-700" />;
      case 'backend':
        return <Server className="w-5 h-5 text-sky-700" />;
      case 'database':
        return <Database className="w-5 h-5 text-emerald-700" />;
      case 'payments':
        return <CreditCard className="w-5 h-5 text-amber-700" />;
      case 'ai':
        return <Cpu className="w-5 h-5 text-amber-600" />;
      case 'tooling':
        return <Terminal className="w-5 h-5 text-stone-800" />;
      case 'beyond':
      default:
        return <BookOpen className="w-5 h-5 text-emerald-800" />;
    }
  };

  return (
    <section id="skills" className="py-16 md:py-24 border-t-2 border-dashed border-stone-300">
      {/* Header */}
      <div className="mb-14">
        <span className="text-xs uppercase tracking-widest font-mono text-stone-500 font-bold block mb-1">
          04 / Technical Toolkit
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-[#2B2B2B]">
          Skills &amp; Capabilities
        </h2>
        <HandDrawnUnderline color="#2B2B2B" className="w-60 h-3 mt-1" />
        <p className="font-handwriting text-lg text-stone-600 mt-3">
          Technologies and practices I use to ship production web applications.
        </p>
      </div>

      {/* Grid of rotated sticky notes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 sm:gap-8 items-start">
        {skillsContent.map((group, idx) => {
          return (
            <motion.div
              key={group.id}
              initial={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : { y: -60, opacity: 0, rotate: group.tilt * 2.5 }
              }
              whileInView={{ y: 0, opacity: 1, rotate: group.tilt }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 19,
                delay: idx * 0.08,
              }}
              className="h-full flex"
            >
              <StickyNote
                color={group.stickyColor}
                tilt={group.tilt}
                className="w-full flex flex-col justify-between"
              >
                <div>
                  {/* Category Header with Doodle */}
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-stone-800/15">
                    <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#2B2B2B]">
                      {group.title}
                    </h3>
                    <div className="p-1 rounded-sm bg-white/60">
                      {getDoodleIcon(group.doodle)}
                    </div>
                  </div>

                  {/* Handwritten skill tags scribbling in one by one */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {group.skills.map((skill, sIdx) => {
                      // Scratch-out correction easter egg on two specific skills: TypeScript and Next.js
                      const isScratchout =
                        (group.id === 'languages' && skill === 'TypeScript') ||
                        (group.id === 'frontend' && skill === 'Next.js');

                      return (
                        <motion.span
                          key={sIdx}
                          initial={shouldReduceMotion ? {} : { scale: 0.8, opacity: 0 }}
                          whileInView={{ scale: 1, opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{
                            delay: idx * 0.05 + sIdx * 0.035,
                            type: 'spring',
                            stiffness: 340,
                            damping: 18,
                          }}
                          className="relative inline-flex items-center text-xs sm:text-sm font-handwriting font-medium px-2 py-0.5 rounded-xs bg-white/70 border border-stone-700/60 text-stone-900 shadow-2xs hover:bg-white transition-colors"
                          style={{
                            filter: 'url(#pencil-wobble)',
                          }}
                        >
                          {isScratchout ? (
                            <span className="inline-flex items-center gap-1">
                              {/* Struck-through intentional typo */}
                              <span className="relative text-stone-400 line-through decoration-[#E4572E] decoration-2 text-[11px]">
                                {skill === 'TypeScript' ? 'TypeScrpt' : 'Nxt.js'}
                              </span>
                              <span className="font-bold text-[#2B2B2B]">{skill}</span>
                            </span>
                          ) : (
                            <span>{skill}</span>
                          )}
                        </motion.span>
                      );
                    })}
                  </div>
                </div>

                {/* Bottom subtle note watermark */}
                <div className="mt-4 pt-2 flex items-center justify-end text-[10px] font-mono text-stone-500 uppercase tracking-wider">
                  #PencilTheme
                </div>
              </StickyNote>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
