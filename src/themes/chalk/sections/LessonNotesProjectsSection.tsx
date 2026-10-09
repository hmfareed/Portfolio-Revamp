'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { projectsContent } from '@/content/projects';
import { ProjectCategory } from '@/content/types';
import { LessonCard } from '../primitives/LessonCard';
import { ChalkLine } from '../primitives/ChalkLine';
import { ChalkSlot } from '../primitives/ChalkSlot';
import { ChalkStar, ChalkArrow, ChalkGithubIcon } from '../primitives/ChalkDoodles';
import { ExternalLink, BookOpen, Layers, CheckSquare, Square } from 'lucide-react';

const CATEGORIES: { label: string; value: 'all' | ProjectCategory }[] = [
  { label: 'All Builds', value: 'all' },
  { label: 'E-Commerce', value: 'e-commerce' },
  { label: 'SaaS', value: 'SaaS' },
  { label: 'Education', value: 'education' },
  { label: 'AI Products', value: 'AI' },
];

export const LessonNotesProjectsSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | ProjectCategory>('all');
  const shouldReduceMotion = useReducedMotion();

  const filteredProjects = projectsContent.filter((project) => {
    if (activeFilter === 'all') return true;
    return project.categories.includes(activeFilter);
  });

  return (
    <section id="projects" className="py-16 md:py-20 text-[#F2F0E6]">
      {/* Header and Filter Tick-Boxes */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <span className="font-heading text-lg uppercase tracking-widest text-[#F6D860] block mb-1">
            02 / LESSON NOTES &amp; APPLIED LABS
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white tracking-wide">
            Featured Projects
          </h2>
          <ChalkLine color="#F6D860" className="w-56 h-3 mt-2" />
        </div>

        {/* Chalk Filter Tick Boxes */}
        <div className="flex flex-wrap items-center gap-2">
          {CATEGORIES.map((cat) => {
            const isSelected = activeFilter === cat.value;
            return (
              <button
                key={cat.value}
                onClick={() => setActiveFilter(cat.value)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border-2 border-dashed font-heading text-base sm:text-lg transition-all cursor-pointer select-none ${
                  isSelected
                    ? 'border-[#F6D860] bg-[#F6D860]/20 text-[#F6D860] shadow-[0_0_12px_rgba(246,216,96,0.25)]'
                    : 'border-[#F2F0E6]/40 bg-[#263D33] text-stone-300 hover:border-[#F2F0E6]/70 hover:text-white'
                }`}
              >
                {/* Chalk Box with Checkmark */}
                <span className={`w-4 h-4 rounded-xs border flex items-center justify-center text-xs font-bold ${
                  isSelected ? 'border-[#F6D860] bg-[#F6D860] text-[#23382F]' : 'border-[#F2F0E6]/50'
                }`}>
                  {isSelected ? '✓' : ''}
                </span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Lesson Cards */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence>
          {filteredProjects.map((project, idx) => {
            return (
              <motion.div
                key={project.slug}
                layout
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col h-full"
              >
                <LessonCard
                  className="flex flex-col justify-between h-full"
                  doodleSlot={
                    project.featured ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#23382F] border border-dashed border-[#F4A6B8] text-[#F4A6B8] font-heading text-sm shadow-sm">
                        <ChalkStar className="w-3.5 h-3.5 text-[#F4A6B8]" />
                        <span>Core Curriculum</span>
                      </span>
                    ) : undefined
                  }
                >
                  <div className="flex flex-col">
                    {/* Project Screenshot in chalk bordered frame */}
                    <div className="relative w-full aspect-16/10 rounded-lg overflow-hidden border-2 border-dashed border-[#F2F0E6]/50 bg-[#1F332A] mb-5 shadow-inner">
                      {project.image ? (
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover object-top hover:scale-103 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center">
                          <Layers className="w-8 h-8 text-[#8EC5E8] mb-2 opacity-80" />
                          <span className="font-heading text-lg text-[#F6D860]">
                            DIAGRAM NOTE PENDING
                          </span>
                          <span className="font-body text-xs text-stone-300 mt-1">
                            {project.placeholders?.includes('[screenshots]')
                              ? '[screenshots waiting to be attached]'
                              : 'System UI Architecture'}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Metadata Header: Role & Category */}
                    <div className="flex items-center justify-between text-xs font-heading font-bold mb-2">
                      <span className="text-[#F4A6B8] uppercase tracking-wider">
                        Role: {project.role}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-[#20332B] border border-dashed border-[#F2F0E6]/30 text-stone-300">
                        {project.categories.join(' · ')}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#F6D860] leading-snug mb-2">
                      {project.title}
                    </h3>

                    {/* One-line Aim */}
                    <p className="font-body text-sm sm:text-base text-stone-200 italic mb-4 leading-relaxed">
                      Aim: &ldquo;{project.pitch}&rdquo;
                    </p>

                    {/* Tech Stack Chalk List */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {project.stack.map((tech, sIdx) => {
                        if (tech.startsWith('[') && tech.endsWith(']')) {
                          return <ChalkSlot key={sIdx} text={tech} className="py-0.5" />;
                        }
                        return (
                          <span
                            key={sIdx}
                            className="inline-flex items-center px-2 py-0.5 rounded-md bg-[#20332B] border border-dashed border-[#8EC5E8]/60 font-heading text-xs sm:text-sm text-[#8EC5E8]"
                          >
                            {tech}
                          </span>
                        );
                      })}
                    </div>

                    {/* Key Features as Numbered Chalk Points */}
                    <div className="space-y-1.5 mb-6 text-sm font-body text-stone-200">
                      {project.features.slice(0, 3).map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2">
                          <span className="font-heading font-bold text-[#F6D860] shrink-0 text-base">
                            {fIdx + 1}.
                          </span>
                          <span className="line-clamp-2">{feat}</span>
                        </div>
                      ))}
                    </div>

                    {/* Placeholders */}
                    {project.placeholders && project.placeholders.length > 0 && (
                      <div className="mb-4">
                        {project.placeholders.map((ph, pIdx) => (
                          <ChalkSlot key={pIdx} text={ph} />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Links Row */}
                  <div className="pt-4 border-t border-dashed border-[#F2F0E6]/30 flex items-center justify-between gap-3 font-heading text-base sm:text-lg">
                    <div className="flex items-center gap-3">
                      {project.links.live && (
                        <a
                          href={project.links.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[#8EC5E8] hover:text-white transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>Live Site</span>
                        </a>
                      )}
                      {project.links.github && (
                        <a
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-stone-300 hover:text-[#F6D860] transition-colors"
                        >
                          <ChalkGithubIcon className="w-4 h-4" />
                          <span>Code</span>
                        </a>
                      )}
                    </div>

                    {/* Inspect Case Study Link */}
                    <Link
                      href={`/projects/${project.slug}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md border border-dashed border-[#F6D860] bg-[#F6D860]/15 text-[#F6D860] hover:bg-[#F6D860] hover:text-[#23382F] font-heading text-base font-bold transition-colors"
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>Case Study</span>
                    </Link>
                  </div>
                </LessonCard>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};
