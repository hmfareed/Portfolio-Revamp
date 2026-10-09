'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { projectsContent } from '@/content/projects';
import { ProductCard } from '../primitives/ProductCard';
import { GoldAccentLine } from '../primitives/GoldAccentLine';
import { ExternalLink, ArrowRight, Layers, Sparkles } from 'lucide-react';

export const ProductCardsProjectsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const shouldReduceMotion = useReducedMotion();

  // Extract unique categories
  const categories = [
    'All',
    ...Array.from(new Set(projectsContent.flatMap((p) => p.categories))),
  ];

  const filteredProjects =
    selectedCategory === 'All'
      ? projectsContent
      : projectsContent.filter((p) => (p.categories as string[]).includes(selectedCategory));

  return (
    <section id="projects" className="py-24 md:py-32 border-t border-[#e5e5e5] bg-[#f9f9f9]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#6b6b6b] mb-3">
              Products &amp; Systems
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1a1a1a]">
              Engineered for Production
            </h2>
            <GoldAccentLine className="w-24 h-1 mt-3" />
            <p className="mt-4 text-base text-[#6b6b6b] leading-relaxed">
              Real-world digital products, payment architectures, and specialized tools built spec-first.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#3248C3] text-white shadow-xs'
                    : 'bg-white border border-[#e5e5e5] text-[#6b6b6b] hover:text-[#1a1a1a] hover:bg-[#f2f2f2]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project) => {
            const isLive = Boolean(project.links.live);

            return (
              <ProductCard key={project.slug} className="flex flex-col justify-between p-6 sm:p-7">
                {/* Card Top: Status Badge + Category */}
                <div>
                  <div className="flex items-center justify-between gap-3 mb-5">
                    {/* Status badge: ONLY real statuses from content */}
                    {isLive ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#06d6a0]/15 text-[#047857] border border-[#06d6a0]/30">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#06d6a0]" />
                        <span>Live in Production</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#FFBF23]/20 text-[#A65800] border border-[#FFBF23]/40">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FFBF23]" />
                        <span>In Development</span>
                      </span>
                    )}

                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#6b6b6b]">
                      {project.categories.join(' · ')}
                    </span>
                  </div>

                  {/* Title & Pitch */}
                  <h3 className="text-xl font-bold text-[#1a1a1a] tracking-tight leading-snug mb-2 hover:text-[#3248C3] transition-colors">
                    <Link href={`/projects/${project.slug}`}>
                      {project.title}
                    </Link>
                  </h3>

                  <p className="text-sm text-[#6b6b6b] line-clamp-3 mb-5 leading-relaxed">
                    {project.pitch}
                  </p>

                  {/* Stack Chips */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.stack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#f0f0f0] text-[#1a1a1a] border border-[#e5e5e5]"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.stack.length > 4 && (
                      <span className="px-2 py-0.5 rounded-full text-[11px] text-[#6b6b6b]">
                        +{project.stack.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Footer: Action Links */}
                <div className="pt-4 border-t border-[#e5e5e5] flex items-center justify-between text-sm font-semibold">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-1 text-[#3248C3] hover:underline underline-offset-4 group"
                  >
                    <span>Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>

                  {project.links.live && (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[#1a1a1a] hover:text-[#3248C3] transition-colors text-xs font-medium"
                    >
                      <span>Live Site</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </ProductCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};
