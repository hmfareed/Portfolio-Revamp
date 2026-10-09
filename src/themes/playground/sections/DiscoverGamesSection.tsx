'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { projectsContent } from '@/content/projects';
import { ProjectCategory } from '@/content/types';
import { GameTileCard } from '../primitives/GameTileCard';
import { PlatformUnderline } from '../primitives/PlatformUnderline';
import { PlatformSlot } from '../primitives/PlatformSlot';
import { PlaygroundButton } from '../primitives/PlaygroundButton';
import { Play, ThumbsUp, Users, ExternalLink, BookOpen, Layers } from 'lucide-react';

const CATEGORIES: { label: string; value: 'all' | ProjectCategory }[] = [
  { label: 'All Games', value: 'all' },
  { label: 'E-Commerce', value: 'e-commerce' },
  { label: 'SaaS', value: 'SaaS' },
  { label: 'Education', value: 'education' },
  { label: 'AI Products', value: 'AI' },
];

export const DiscoverGamesSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | ProjectCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const shouldReduceMotion = useReducedMotion();

  // Listen to search filter from Top Bar
  useEffect(() => {
    const handleSearchEvent = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      setSearchQuery(customEvent.detail || '');
    };

    window.addEventListener('playground-search-filter', handleSearchEvent);
    return () => window.removeEventListener('playground-search-filter', handleSearchEvent);
  }, []);

  const filteredProjects = projectsContent.filter((project) => {
    const matchesCategory =
      activeCategory === 'all' || project.categories.includes(activeCategory);

    const matchesSearch =
      !searchQuery ||
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.pitch.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.stack.some((tech) => tech.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const getPlayerStat = (slug: string) => {
    if (slug === 'hanara-sms') return '790+ Active Students';
    if (slug === 'kaypacks') return 'Multi-brand Water Orders';
    if (slug === 'africart') return 'Multi-vendor Split Payouts';
    if (slug === 'klyro') return 'Teams & Org Workflows';
    if (slug === 'slay-by-humu') return 'AI Assisted Shoppers';
    return '[Player metric: Draft slot]';
  };

  return (
    <section id="projects" className="py-12 md:pl-64 px-4 sm:px-8 text-[#F7F7F8]">
      {/* Header & Filter Row */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <span className="font-heading text-xs uppercase tracking-widest text-[#00B06F] font-bold block mb-1">
            02 / DISCOVER GAMES &amp; EXPERIENCES
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-white tracking-wide">
            Featured Projects
          </h2>
          <PlatformUnderline color="#00B06F" className="w-52 h-2 mt-2" />
        </div>

        {/* Category Filter Chips */}
        <div className="flex flex-wrap items-center gap-2">
          {CATEGORIES.map((cat) => {
            const isSelected = activeCategory === cat.value;
            return (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`px-3.5 py-1.5 rounded-xl font-heading text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#00B06F] text-white shadow-md shadow-[#00B06F]/20'
                    : 'bg-[#2F3133] hover:bg-[#393B3D] text-stone-300 hover:text-white border border-[#424549]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Discover Games Grid (Horizontally scrollable with snap on mobile) */}
      <div className="flex overflow-x-auto snap-x snap-mandatory gap-5 pb-4 no-scrollbar sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:overflow-visible">
        <AnimatePresence>
          {filteredProjects.map((project, idx) => {
            const playerStat = getPlayerStat(project.slug);
            const isPlaceholderStat = playerStat.startsWith('[');

            return (
              <motion.div
                key={project.slug}
                layout
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
                className="w-[82vw] sm:w-auto shrink-0 snap-start flex flex-col h-full"
              >
                <GameTileCard
                  className="flex flex-col justify-between h-full"
                  doodleSlot={
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#232527]/90 backdrop-blur-sm border border-[#424549] text-[11px] font-heading font-bold text-[#00B06F] shadow-xs">
                      <ThumbsUp className="w-3 h-3 fill-current" />
                      <span>{project.featured ? '99%' : '96%'}</span>
                    </span>
                  }
                >
                  <div className="flex flex-col">
                    {/* Large Thumbnail Slot */}
                    <div className="relative w-full aspect-16/10 rounded-xl overflow-hidden border border-[#424549] bg-[#1E2022] mb-4 shadow-inner">
                      {project.image ? (
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover object-top hover:scale-104 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center">
                          <Layers className="w-8 h-8 text-stone-500 mb-2" />
                          <span className="font-heading font-bold text-sm text-stone-300">
                            Screenshot Plate
                          </span>
                          <span className="font-mono text-xs text-stone-500 mt-1">
                            {project.placeholders?.includes('[screenshots]')
                              ? '[screenshots pending]'
                              : 'System UI Architecture'}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Metadata Header: Role & Category */}
                    <div className="flex items-center justify-between text-[11px] font-heading font-semibold text-stone-400 mb-1.5">
                      <span className="text-[#2F7BFF]">Role: {project.role}</span>
                      <span className="px-2 py-0.5 rounded-md bg-[#232527] border border-[#393B3D]">
                        {project.categories.join(' · ')}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-heading text-lg sm:text-xl font-bold text-white leading-snug mb-2">
                      {project.title}
                    </h3>

                    {/* Pitch */}
                    <p className="font-body text-xs sm:text-sm text-stone-300 leading-relaxed mb-4">
                      {project.pitch}
                    </p>

                    {/* Players-style Stat Line */}
                    <div className="flex items-center gap-2 mb-4 text-xs font-heading">
                      <Users className="w-3.5 h-3.5 text-[#00B06F]" />
                      {isPlaceholderStat ? (
                        <PlatformSlot text={playerStat} />
                      ) : (
                        <span className="font-bold text-white">{playerStat}</span>
                      )}
                    </div>

                    {/* Stack Pill Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {project.stack.map((tech, sIdx) => {
                        if (tech.startsWith('[') && tech.endsWith(']')) {
                          return <PlatformSlot key={sIdx} text={tech} className="py-0.5" />;
                        }
                        return (
                          <span
                            key={sIdx}
                            className="inline-flex items-center px-2 py-0.5 rounded-lg bg-[#232527] border border-[#393B3D] text-[11px] font-heading font-semibold text-stone-300"
                          >
                            {tech}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  {/* Actions Row: Play Button & Case Study */}
                  <div className="pt-3 border-t border-[#393B3D] flex items-center justify-between gap-3">
                    {project.links.live ? (
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#00B06F] hover:bg-[#00C87E] text-white font-heading font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>Play Now</span>
                      </a>
                    ) : (
                      <span className="text-xs font-heading text-stone-500 font-semibold">
                        Local Deployment
                      </span>
                    )}

                    <Link
                      href={`/projects/${project.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-heading font-bold text-stone-300 hover:text-white hover:bg-[#393B3D] px-2.5 py-1.5 rounded-xl transition-colors"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Details</span>
                    </Link>
                  </div>
                </GameTileCard>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </section>
  );
};
