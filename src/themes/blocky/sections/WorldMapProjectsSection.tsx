'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { projectsContent } from '@/content/projects';
import { ProjectCategory } from '@/content/types';
import { BlockyLevelCard } from '../primitives/BlockyLevelCard';
import { PixelDivider } from '../primitives/PixelDivider';
import { GlitchSlot } from '../primitives/GlitchSlot';
import { PixelGithubIcon } from '../primitives/PixelGraphics';
import { ExternalLink, Compass, Gamepad2, Play } from 'lucide-react';

const CATEGORIES: { label: string; value: 'all' | ProjectCategory }[] = [
  { label: 'ALL LEVELS', value: 'all' },
  { label: 'E-COMMERCE', value: 'e-commerce' },
  { label: 'SAAS', value: 'SaaS' },
  { label: 'EDUCATION', value: 'education' },
  { label: 'AI LABS', value: 'AI' },
];

export const WorldMapProjectsSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | ProjectCategory>('all');
  const shouldReduceMotion = useReducedMotion();

  const filteredProjects = projectsContent.filter((project) => {
    if (activeFilter === 'all') return true;
    return project.categories.includes(activeFilter);
  });

  const getDifficultyBadge = (categories: ProjectCategory[]) => {
    if (categories.includes('AI')) {
      return {
        label: 'DIFFICULTY: EXPERT (AI)',
        bg: 'bg-[#9333EA]',
        border: 'border-[#C084FC]',
        text: 'text-white',
      };
    }
    if (categories.includes('SaaS')) {
      return {
        label: 'DIFFICULTY: HARD (SAAS)',
        bg: 'bg-[#0284C7]',
        border: 'border-[#38BDF8]',
        text: 'text-white',
      };
    }
    if (categories.includes('e-commerce')) {
      return {
        label: 'DIFFICULTY: MEDIUM (SHOP)',
        bg: 'bg-[#D97706]',
        border: 'border-[#FBBF24]',
        text: 'text-white',
      };
    }
    return {
      label: 'DIFFICULTY: NORMAL (EDU)',
      bg: 'bg-[#16A34A]',
      border: 'border-[#4ADE80]',
      text: 'text-white',
    };
  };

  return (
    <section id="projects" className="py-16 md:py-20">
      {/* Header & Map Filters */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <span className="font-pixel text-[10px] uppercase tracking-widest text-[#FFD23F] block mb-1">
            02 / WORLD MAP · STAGE SELECT
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-pixel font-bold text-white drop-shadow-md">
            FEATURED LEVELS
          </h2>
          <PixelDivider color="#FFD23F" className="w-56 h-3 mt-2" />
        </div>

        {/* Map Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {CATEGORIES.map((cat) => {
            const isSelected = activeFilter === cat.value;
            return (
              <button
                key={cat.value}
                onClick={() => setActiveFilter(cat.value)}
                className={`px-3 py-2 font-pixel text-[11px] uppercase tracking-wider transition-all cursor-pointer border-3 select-none ${
                  isSelected
                    ? 'bg-[#FFD23F] text-[#1E232A] border-black shadow-[inset_0_2px_0_rgba(255,255,255,0.8),0_4px_0_#92400E] -translate-y-0.5'
                    : 'bg-[#2A303C] text-stone-300 border-[#14171D] hover:bg-[#3B4455] hover:text-white shadow-[0_4px_0_#0F1217]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Level Select Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence>
          {filteredProjects.map((project, idx) => {
            const difficulty = getDifficultyBadge(project.categories);

            return (
              <motion.div
                key={project.slug}
                layout
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col h-full"
              >
                <BlockyLevelCard
                  className="flex flex-col justify-between h-full"
                  doodleSlot={
                    <span
                      className={`inline-flex items-center gap-1.5 font-pixel text-[9px] uppercase px-2.5 py-1 border-2 shadow-xs ${difficulty.bg} ${difficulty.border} ${difficulty.text}`}
                    >
                      <Gamepad2 className="w-3 h-3" />
                      <span>{difficulty.label}</span>
                    </span>
                  }
                >
                  <div className="flex flex-col">
                    {/* Retro Level Monitor Screen */}
                    <div className="relative w-full aspect-16/10 border-4 border-black bg-[#14171D] mb-5 overflow-hidden shadow-[inset_0_0_12px_rgba(0,0,0,0.8)]">
                      {project.image ? (
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover object-top hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center bg-[#1A1F2B]">
                          <Compass className="w-8 h-8 text-[#FFD23F] mb-2 animate-pulse" />
                          <span className="font-pixel text-[11px] text-[#FFD23F] font-bold">
                            WORLD SCANNING...
                          </span>
                          <span className="font-pixel text-[9px] text-stone-400 mt-1">
                            {project.placeholders?.includes('[screenshots]')
                              ? '[STAGE SCREENSHOTS COMPILING]'
                              : 'PRODUCTION ENGINE UI'}
                          </span>
                        </div>
                      )}

                      {/* Screen Scanlines Overlay */}
                      <div
                        className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px]"
                        aria-hidden="true"
                      />
                    </div>

                    {/* Meta Info: Level No & Role */}
                    <div className="flex items-center justify-between text-[10px] font-pixel mb-2">
                      <span className="text-[#38BDF8] uppercase tracking-wider">
                        ROLE: {project.role}
                      </span>
                      <span className="px-1.5 py-0.5 bg-black/50 text-[#FFD23F] border border-[#FFD23F]/30">
                        STAGE 0{idx + 1}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-pixel text-base sm:text-lg text-white font-bold leading-tight mb-3">
                      {project.title}
                    </h3>

                    {/* Pitch */}
                    <p className="font-body text-sm text-stone-300 leading-relaxed mb-4">
                      {project.pitch}
                    </p>

                    {/* Stack chips styled as Inventory equipment tags */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {project.stack.map((tech, sIdx) => {
                        if (tech.startsWith('[') && tech.endsWith(']')) {
                          return <GlitchSlot key={sIdx} text={tech} className="py-0.5" />;
                        }
                        return (
                          <span
                            key={sIdx}
                            className="inline-flex items-center px-2 py-0.5 bg-[#1E232A] border border-black font-pixel text-[9px] text-[#93C5FD] shadow-[inset_1px_1px_0_rgba(255,255,255,0.15)]"
                          >
                            {tech}
                          </span>
                        );
                      })}
                    </div>

                    {/* Features list with pixel arrows */}
                    <div className="space-y-1.5 mb-6 text-sm font-body text-stone-300">
                      {project.features.slice(0, 3).map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2">
                          <span className="text-[#FFD23F] font-bold text-xs mt-0.5">▶</span>
                          <span className="line-clamp-2">{feat}</span>
                        </div>
                      ))}
                    </div>

                    {/* Placeholders */}
                    {project.placeholders && project.placeholders.length > 0 && (
                      <div className="mb-4">
                        {project.placeholders.map((ph, pIdx) => (
                          <GlitchSlot key={pIdx} text={ph} />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Level Exit / Actions Footer */}
                  <div className="pt-4 border-t-2 border-black/40 flex items-center justify-between gap-3 font-pixel text-[10px]">
                    <div className="flex items-center gap-3">
                      {project.links.live && (
                        <a
                          href={project.links.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[#38BDF8] hover:text-[#7FD6FF] transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>LIVE</span>
                        </a>
                      )}
                      {project.links.github && (
                        <a
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-stone-300 hover:text-white transition-colors"
                        >
                          <PixelGithubIcon className="w-3.5 h-3.5" />
                          <span>CODE</span>
                        </a>
                      )}
                    </div>

                    {/* Enter Level / Case Study Link */}
                    <Link
                      href={`/projects/${project.slug}`}
                      className="inline-flex items-center gap-1 bg-[#FFD23F] hover:bg-[#FACC15] text-[#1E232A] px-3 py-1.5 font-pixel text-[10px] uppercase font-bold border-2 border-black shadow-[inset_0_2px_0_rgba(255,255,255,0.7),0_3px_0_#92400E] active:translate-y-0.5 transition-transform"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>ENTER LEVEL</span>
                    </Link>
                  </div>
                </BlockyLevelCard>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};
