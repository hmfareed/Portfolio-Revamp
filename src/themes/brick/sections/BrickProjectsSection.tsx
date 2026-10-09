'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { projectsContent } from '@/content/projects';
import { ProjectCategory } from '@/content/types';
import { BrickCard } from '../primitives/BrickCard';
import { BrickUnderline } from '../primitives/BrickUnderline';
import { BrickSlot } from '../primitives/BrickSlot';
import { BrickTag } from '../primitives/BrickTag';
import { BrickStud } from '../primitives/BrickStud';
import { BrickGithubIcon } from '../primitives/BrickGraphics';
import { ExternalLink, FileText, Blocks, Layers } from 'lucide-react';

const CATEGORIES: { label: string; value: 'all' | ProjectCategory }[] = [
  { label: 'All Builds', value: 'all' },
  { label: 'E-Commerce', value: 'e-commerce' },
  { label: 'SaaS', value: 'SaaS' },
  { label: 'Education', value: 'education' },
  { label: 'AI Products', value: 'AI' },
];

export const BrickProjectsSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | ProjectCategory>('all');
  const shouldReduceMotion = useReducedMotion();

  const filteredProjects = projectsContent.filter((project) => {
    if (activeFilter === 'all') return true;
    return project.categories.includes(activeFilter);
  });

  return (
    <section id="projects" className="py-16 md:py-20">
      {/* Header and Filter Buttons */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <span className="font-heading text-xs uppercase tracking-widest text-[#FFC62B] font-bold block mb-1">
            02 / Assembly Showcase
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white drop-shadow-md">
            Featured Projects
          </h2>
          <BrickUnderline color="#FFC62B" className="w-56 h-3.5 mt-2" />
        </div>

        {/* Filter Brick Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {CATEGORIES.map((cat) => {
            const isSelected = activeFilter === cat.value;
            return (
              <button
                key={cat.value}
                onClick={() => setActiveFilter(cat.value)}
                className={`relative px-4 py-2 rounded-xl font-heading text-sm sm:text-base font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#FFC62B] text-[#1A1F2B] border-b-3 border-[#C99812] shadow-md -translate-y-0.5'
                    : 'bg-[#F4F1E8] text-[#1A1F2B] border-b-3 border-[#D5D0C2] hover:bg-white'
                }`}
                style={{
                  boxShadow: isSelected
                    ? 'inset 0 2px 0 rgba(255,255,255,0.6), 0 4px 8px rgba(0,0,0,0.25)'
                    : 'inset 0 1px 0 rgba(255,255,255,0.4), 0 2px 4px rgba(0,0,0,0.15)',
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Snap-In Grid */}
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
                <BrickCard
                  color="#F4F1E8"
                  className="flex flex-col justify-between h-full"
                  doodleSlot={
                    project.featured ? (
                      <span className="inline-flex items-center gap-1 bg-[#D1382B] text-white font-heading text-xs uppercase px-2.5 py-1 rounded-lg border border-black/20 shadow-xs">
                        <BrickStud color="#E54536" size="xs" />
                        <span>Core Build</span>
                      </span>
                    ) : undefined
                  }
                >
                  <div className="flex flex-col">
                    {/* Project Screenshot in molded frame */}
                    <div className="relative w-full aspect-16/10 rounded-xl overflow-hidden border-2 border-black/20 bg-stone-200 mb-5 shadow-inner">
                      {project.image ? (
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover object-top hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-stone-200 p-4 text-center">
                          <Blocks className="w-10 h-10 text-stone-400 mb-2" />
                          <span className="font-heading font-bold text-stone-700 text-sm">
                            Unassembled Screenshot Plate
                          </span>
                          <span className="font-mono text-xs text-stone-500 mt-1">
                            {project.placeholders?.includes('[screenshots]')
                              ? '[screenshots waiting to be attached]'
                              : 'System UI Architecture'}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Role & Categories metadata */}
                    <div className="flex items-center justify-between text-xs font-heading font-bold mb-1.5">
                      <span className="text-[#D1382B] uppercase tracking-wider">
                        Role: {project.role}
                      </span>
                      <span className="bg-stone-200 text-[#1A1F2B] px-2 py-0.5 rounded-md border border-stone-300">
                        {project.categories.join(' · ')}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#1A1F2B] leading-snug mb-2">
                      {project.title}
                    </h3>

                    {/* Pitch */}
                    <p className="font-body text-sm sm:text-base text-stone-700 leading-snug mb-4">
                      {project.pitch}
                    </p>

                    {/* Stack 1x2 Brick chips */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {project.stack.map((tech, sIdx) => {
                        if (tech.startsWith('[') && tech.endsWith(']')) {
                          return <BrickSlot key={sIdx} text={tech} className="text-xs py-0.5" />;
                        }
                        const tagColors: ('blue' | 'yellow' | 'red' | 'green' | 'white')[] = [
                          'blue',
                          'yellow',
                          'red',
                          'green',
                          'white',
                        ];
                        const chosenColor = tagColors[sIdx % tagColors.length];
                        return (
                          <BrickTag
                            key={sIdx}
                            label={tech}
                            color={chosenColor}
                            className="text-xs py-1"
                          />
                        );
                      })}
                    </div>

                    {/* Features List */}
                    <div className="space-y-1.5 mb-6 text-sm font-body text-stone-800">
                      {project.features.slice(0, 3).map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2">
                          <span className="text-[#D1382B] font-bold">›</span>
                          <span className="line-clamp-2">{feat}</span>
                        </div>
                      ))}
                    </div>

                    {/* Placeholders */}
                    {project.placeholders && project.placeholders.length > 0 && (
                      <div className="mb-4">
                        {project.placeholders.map((ph, pIdx) => (
                          <BrickSlot key={pIdx} text={ph} />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Links Row */}
                  <div className="pt-4 border-t-2 border-stone-300 flex items-center justify-between gap-3 font-heading font-bold text-sm">
                    <div className="flex items-center gap-3">
                      {project.links.live && (
                        <a
                          href={project.links.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[#1A1F2B] hover:text-[#D1382B] transition-colors"
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
                          className="inline-flex items-center gap-1 text-[#1A1F2B] hover:text-[#D1382B] transition-colors"
                        >
                          <BrickGithubIcon className="w-4 h-4" />
                          <span>GitHub</span>
                        </a>
                      )}
                    </div>

                    <Link
                      href={`/projects/${project.slug}`}
                      className="inline-flex items-center gap-1 text-xs bg-[#FFC62B] text-[#1A1F2B] hover:bg-[#FFD252] px-3 py-1.5 rounded-lg border border-black/20 shadow-xs transition-colors"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Case Study</span>
                    </Link>
                  </div>
                </BrickCard>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};
