'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { projectsContent } from '@/content/projects';
import { ProjectCategory } from '@/content/types';
import { TornPageCard } from '../primitives/TornPageCard';
import { HandDrawnUnderline } from '../primitives/HandDrawnUnderline';
import { PlaceholderSlot } from '../primitives/PlaceholderSlot';
import { StarDoodle, CodeBracketsDoodle, ArrowDoodle, GithubDoodle } from '../primitives/Doodles';
import { FallingPencilShavings } from '../animations/SectionTransitions';
import { SketchManMascot } from '../animations/SketchManMascot';
import { ImageLightboxModal } from '../primitives/ImageLightboxModal';
import { Project } from '@/content/types';
import { ExternalLink, FileText, Sparkles } from 'lucide-react';

const CATEGORIES: { label: string; value: 'all' | ProjectCategory }[] = [
  { label: 'All Projects', value: 'all' },
  { label: 'E-Commerce', value: 'e-commerce' },
  { label: 'SaaS', value: 'SaaS' },
  { label: 'Education', value: 'education' },
  { label: 'AI Products', value: 'AI' },
];

export const ProjectsSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | ProjectCategory>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const filteredProjects = projectsContent.filter((project) => {
    if (activeFilter === 'all') return true;
    return project.categories.includes(activeFilter);
  });

  return (
    <section id="projects" className="py-16 md:py-24 border-t-2 border-dashed border-stone-300">
      {/* Header and Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <span className="text-xs uppercase tracking-widest font-mono text-stone-500 font-bold block mb-1">
            02 / Selected Works &amp; Systems
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-[#2B2B2B]">
            Featured Projects
          </h2>
          <HandDrawnUnderline color="#2B2B2B" className="w-56 h-3 mt-1" />
        </div>

        {/* Hand-drawn filter tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {CATEGORIES.map((cat) => {
            const isSelected = activeFilter === cat.value;
            return (
              <button
                key={cat.value}
                onClick={() => setActiveFilter(cat.value)}
                className={`px-3.5 py-1.5 rounded-sm font-handwriting text-sm sm:text-base font-bold transition-all border-2 border-[#2B2B2B] cursor-pointer ${
                  isSelected
                    ? 'bg-[#FFE66D] text-[#2B2B2B] shadow-[2px_2px_0px_#2B2B2B] -translate-y-0.5'
                    : 'bg-white/80 text-stone-700 hover:bg-stone-100'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Projects Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence>
          {filteredProjects.map((project, idx) => {
            const tilt = idx % 2 === 0 ? -0.8 : 0.8;

            return (
              <motion.div
                key={project.slug}
                layout
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
                className="flex flex-col h-full"
              >
                <TornPageCard
                  initialTilt={tilt}
                  className="flex flex-col justify-between h-full"
                  doodleSlot={
                    project.featured ? (
                      <div className="bg-[#FFE66D] border border-[#2B2B2B] rounded-full p-1.5 shadow-xs">
                        <StarDoodle className="w-4 h-4 text-[#2B2B2B]" />
                      </div>
                    ) : undefined
                  }
                >
                  <div className="flex flex-col flex-1">
                    {/* Project Screenshot / Visual Sketch Frame */}
                    <div
                      onClick={() => project.image && setSelectedProject(project)}
                      className={`relative w-full aspect-16/10 rounded-xs overflow-hidden border-2 border-[#2B2B2B] ${
                        project.slug === 'novelverse' ? 'bg-[#0A0713]' : 'bg-stone-100'
                      } mb-5 shadow-inner ${project.image ? 'cursor-pointer group/img' : ''}`}
                    >
                      {project.image ? (
                        <>
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover object-top group-hover/img:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-stone-900/0 group-hover/img:bg-stone-900/25 transition-colors flex items-center justify-center pointer-events-none">
                            <span className="opacity-0 group-hover/img:opacity-100 transition-opacity bg-[#FBF8EF] text-[#2B2B2B] border border-[#2B2B2B] text-xs font-handwriting font-bold px-2 py-1 rounded-xs shadow-xs">
                              🔍 Click to Expand
                            </span>
                          </div>
                        </>
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-[#F4EED9] p-4 text-center">
                          <CodeBracketsDoodle className="w-10 h-10 text-stone-500 mb-2" />
                          <span className="font-handwriting font-bold text-stone-700 text-sm">
                            Screenshot Draft Frame
                          </span>
                          <span className="font-mono text-xs text-stone-500 mt-1">
                            {project.placeholders?.includes('[screenshots]')
                              ? '[screenshots waiting to be attached]'
                              : 'System UI Architecture'}
                          </span>
                        </div>
                      )}

                      {/* Featured ribbon badge */}
                      {project.featured && (
                        <span className="absolute top-2 left-2 bg-[#FFE66D] text-[#2B2B2B] border border-[#2B2B2B] text-xs font-handwriting font-bold px-2 py-0.5 rounded-xs shadow-xs">
                          ★ Featured Build
                        </span>
                      )}

                      {/* Sketch Man perched on first featured project card bringing attention */}
                      {project.featured && idx === 0 && (
                        <div className="absolute -top-6 right-3 z-20 pointer-events-auto">
                          <SketchManMascot
                            pose="perched"
                            size="sm"
                            defaultSpeech="Flagship! ✦"
                            className="hover:scale-110 transition-transform"
                          />
                        </div>
                      )}
                    </div>

                    {/* Role & Categories */}
                    <div className="flex items-center justify-between text-xs font-handwriting text-stone-600 mb-1">
                      <span className="font-bold text-[#E4572E] uppercase tracking-wider">
                        Role: {project.role}
                      </span>
                      <span className="font-mono bg-stone-200/80 px-2 py-0.5 rounded-xs text-[#2B2B2B]">
                        {project.categories.join(' · ')}
                      </span>
                    </div>

                    {/* Title with optional client logo */}
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#2B2B2B] leading-snug">
                        {project.title}
                      </h3>
                      {project.slug === 'hanara-sms' && (
                        <div
                          className="relative shrink-0 w-8 h-9 rounded-xs border border-[#2B2B2B] bg-[#FFFDF8] p-0.5 shadow-2xs hover:scale-105 transition-transform"
                          title="Hanara Schools Official Crest"
                        >
                          <Image
                            src="/images/logos/hanara-schools.png"
                            alt="Hanara Schools Logo"
                            fill
                            sizes="36px"
                            className="object-contain"
                          />
                        </div>
                      )}
                    </div>

                    {/* Pitch */}
                    <p className="font-handwriting text-base text-stone-700 leading-snug mb-4">
                      {project.pitch}
                    </p>

                    {/* Tech Stack Chips (handwritten stickers) */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {project.stack.map((tech, sIdx) => {
                        if (tech.startsWith('[') && tech.endsWith(']')) {
                          return <PlaceholderSlot key={sIdx} text={tech} className="text-xs py-0.5" />;
                        }
                        return (
                          <span
                            key={sIdx}
                            className="text-xs font-handwriting font-bold px-2 py-0.5 rounded-xs bg-amber-100/70 text-stone-800 border border-stone-400"
                            style={{
                              transform: `rotate(${(sIdx % 3 - 1) * 0.8}deg)`,
                            }}
                          >
                            {tech}
                          </span>
                        );
                      })}
                    </div>

                    {/* Features list */}
                    <div className="space-y-1.5 mb-6 text-sm font-handwriting text-stone-800">
                      {project.features.slice(0, 3).map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2">
                          <span className="text-[#E4572E] font-bold">›</span>
                          <span className="line-clamp-2">{feat}</span>
                        </div>
                      ))}
                    </div>

                    {/* Placeholders if any */}
                    {project.placeholders && project.placeholders.length > 0 && (
                      <div className="mb-4">
                        {project.placeholders.map((ph, pIdx) => (
                          <PlaceholderSlot key={pIdx} text={ph} />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Links Row */}
                  <div className="pt-4 border-t border-dashed border-stone-300 flex items-center justify-between gap-3 text-sm font-handwriting font-bold">
                    <div className="flex items-center gap-3">
                      {project.links.live && (
                        <a
                          href={project.links.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[#2B2B2B] hover:text-[#E4572E] underline underline-offset-2"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Live Site</span>
                        </a>
                      )}
                      {project.links.github && (
                        <a
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[#2B2B2B] hover:text-[#E4572E] underline underline-offset-2"
                        >
                          <GithubDoodle className="w-3.5 h-3.5" />
                          <span>GitHub</span>
                        </a>
                      )}
                    </div>

                    <Link
                      href={`/projects/${project.slug}`}
                      className="inline-flex items-center gap-1 text-xs bg-stone-200/90 hover:bg-[#FFE66D] border border-stone-800 text-stone-900 px-2.5 py-1 rounded-xs transition-colors"
                    >
                      <FileText className="w-3 h-3" />
                      <span>Case Study</span>
                    </Link>
                  </div>
                </TornPageCard>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Falling pencil shavings transition to Experience */}
      <FallingPencilShavings />

      {/* High-Resolution Screenshot Lightbox & Blueprint Modal */}
      <ImageLightboxModal
        project={selectedProject}
        projectsList={filteredProjects}
        onClose={() => setSelectedProject(null)}
        onSelectProject={setSelectedProject}
      />
    </section>
  );
};
