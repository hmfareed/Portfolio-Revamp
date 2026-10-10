'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { CaseStudy, Project } from '@/content/types';
import { TornPageCard } from '../primitives/TornPageCard';
import { HandDrawnUnderline } from '../primitives/HandDrawnUnderline';
import { TeacherStamp } from '../primitives/TeacherStamp';
import { StickyNote } from '../primitives/StickyNote';
import { TapeStrip, StarDoodle, ArrowDoodle, GithubDoodle, CodeBracketsDoodle } from '../primitives/Doodles';
import { ImageLightboxModal } from '../primitives/ImageLightboxModal';
import { PencilTin } from '../primitives/PencilTin';
import { SoundToggle } from '../primitives/SoundToggle';
import { pencilSoundEngine } from '../audio/pencilSoundEngine';
import { KlyroTaskAiPlayground } from '../primitives/KlyroTaskAiPlayground';
import { KayspacksCheckoutPlayground } from '../primitives/KayspacksCheckoutPlayground';
import { HanaraOfflineSyncPlayground } from '../primitives/HanaraOfflineSyncPlayground';
import {
  ArrowLeft,
  ExternalLink,
  Layers,
  Database,
  Cpu,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Zap,
  ChevronLeft,
  ChevronRight,
  Maximize2
} from 'lucide-react';

interface CaseStudyDetailViewProps {
  study: CaseStudy;
  project: Project;
  allProjects: Project[];
  prevStudy: { slug: string; title: string };
  nextStudy: { slug: string; title: string };
}

export const CaseStudyDetailView: React.FC<CaseStudyDetailViewProps> = ({
  study,
  project,
  allProjects,
  prevStudy,
  nextStudy,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Automatically scroll to top whenever a new case study is opened
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [study.slug]);

  const handleOpenLightbox = () => {
    try {
      pencilSoundEngine.playPop();
    } catch {}
    setLightboxOpen(true);
  };

  return (
    <div className="py-8 sm:py-14 max-w-5xl mx-auto px-4 sm:px-6">
      {/* Top Navigation Row */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <a
          href="/#projects"
          onClick={() => {
            try {
              pencilSoundEngine.playPaperFlip();
            } catch {}
          }}
          className="inline-flex items-center gap-2 font-handwriting text-lg text-stone-800 hover:text-[#E4572E] font-bold group cursor-pointer"
          data-interactive="true"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>← Return to Exercise Book</span>
        </a>

        {/* Quick Prev / Next Case Study links + Desk Tools */}
        <div className="flex flex-wrap items-center gap-3 font-handwriting text-sm font-bold">
          <div className="flex items-center gap-2">
            <Link
              href={`/projects/${prevStudy.slug}`}
              scroll={true}
              onClick={() => {
                try {
                  pencilSoundEngine.playPaperFlip();
                } catch {}
              }}
              className="inline-flex items-center gap-1 px-3 py-1 bg-stone-100 hover:bg-[#FFE66D] text-stone-900 border border-stone-400 rounded-xs transition-colors cursor-pointer"
              title={`Previous: ${prevStudy.title}`}
              data-interactive="true"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Prev Build</span>
            </Link>
            <span className="text-stone-400">|</span>
            <Link
              href={`/projects/${nextStudy.slug}`}
              scroll={true}
              onClick={() => {
                try {
                  pencilSoundEngine.playPaperFlip();
                } catch {}
              }}
              className="inline-flex items-center gap-1 px-3 py-1 bg-stone-100 hover:bg-[#FFE66D] text-stone-900 border border-stone-400 rounded-xs transition-colors cursor-pointer"
              title={`Next: ${nextStudy.title}`}
              data-interactive="true"
            >
              <span className="hidden sm:inline">Next Build</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="flex items-center gap-1.5">
            <PencilTin />
            <SoundToggle />
          </div>
        </div>
      </div>

      {/* Main Blueprint Sheet */}
      <TornPageCard interactive={false} className="p-6 sm:p-10 md:p-12 mb-12 shadow-[8px_12px_0px_#2B2B2B]">
        {/* Header Ribbon & Blueprint Badge */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-xs uppercase tracking-widest font-bold bg-stone-200/90 text-stone-800 px-2.5 py-1 rounded-xs border border-stone-400">
              System Specification · Architecture Blueprint
            </span>
            {project.featured && (
              <span className="inline-flex items-center gap-1 bg-[#FFE66D] border border-[#2B2B2B] text-xs font-handwriting font-bold px-2 py-0.5 rounded-xs">
                <StarDoodle className="w-3.5 h-3.5 text-[#2B2B2B]" />
                <span>Flagship</span>
              </span>
            )}
          </div>

          {/* Rubber Stamp Status */}
          <div className="rotate-2">
            <TeacherStamp
              text={study.status}
              subtext="ARCHITECTURE SPEC"
              tilt={-6}
            />
          </div>
        </div>

        {/* Title & Subtitle */}
        <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#2B2B2B] leading-tight mb-2">
          {study.title}
        </h1>
        <HandDrawnUnderline color="#E4572E" className="w-64 sm:w-80 h-3.5 mb-6" />

        <p className="font-handwriting text-xl sm:text-2xl text-stone-700 leading-relaxed mb-8 italic">
          &ldquo;{study.subtitle}&rdquo;
        </p>

        {/* Project Meta Chips */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-stone-50 border-2 border-[#2B2B2B] rounded-xs font-handwriting mb-8">
          <div>
            <span className="text-xs uppercase font-mono text-stone-500 font-bold block">Role</span>
            <span className="text-base font-bold text-[#2B2B2B]">{study.role}</span>
          </div>
          <div>
            <span className="text-xs uppercase font-mono text-stone-500 font-bold block">Timeline</span>
            <span className="text-base font-bold text-[#2B2B2B]">{study.timeline}</span>
          </div>
          <div>
            <span className="text-xs uppercase font-mono text-stone-500 font-bold block">Domain</span>
            <span className="text-base font-bold text-[#2B2B2B]">{project.categories.join(' · ')}</span>
          </div>
          <div>
            <span className="text-xs uppercase font-mono text-stone-500 font-bold block">Status</span>
            <span className="text-base font-bold text-[#E4572E]">{study.status}</span>
          </div>
        </div>

        {/* Screenshot / Visual Frame with Lightbox Zoom Trigger */}
        {project.image && (
          <div className="relative mb-10 group/img">
            <div className="absolute -top-3 left-8 pointer-events-none z-10 hidden sm:block">
              <TapeStrip angle={-1.5} />
            </div>
            <div className="absolute -top-3 right-8 pointer-events-none z-10 hidden sm:block">
              <TapeStrip angle={2} />
            </div>

            <div
              onClick={handleOpenLightbox}
              className={`relative w-full aspect-16/9 rounded-xs overflow-hidden border-3 border-[#2B2B2B] ${
                project.slug === 'novelverse' ? 'bg-[#0A0713]' : 'bg-stone-100'
              } shadow-[4px_6px_0px_#2B2B2B] cursor-pointer`}
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 900px"
                className="object-cover object-top group-hover/img:scale-102 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-stone-900/0 group-hover/img:bg-stone-900/30 transition-colors flex items-center justify-center">
                <span className="opacity-0 group-hover/img:opacity-100 transition-opacity bg-[#FBF8EF] text-[#2B2B2B] border-2 border-[#2B2B2B] font-handwriting font-bold px-4 py-2 rounded-xs shadow-[2px_2px_0px_#2B2B2B] flex items-center gap-2">
                  <Maximize2 className="w-4 h-4" />
                  <span>Click to Expand High-Resolution Blueprint</span>
                </span>
              </div>
            </div>
            <p className="text-center font-handwriting text-xs text-stone-500 mt-2 italic">
              Figure 1.0 — {project.title} User Interface &amp; Live System View (Click image to inspect)
            </p>
          </div>
        )}

        {/* Live Site / GitHub CTAs */}
        <div className="flex flex-wrap items-center gap-3 mb-12">
          {project.links.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => pencilSoundEngine.playPop()}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FFE66D] hover:bg-amber-300 text-[#2B2B2B] border-2 border-[#2B2B2B] rounded-xs font-handwriting font-bold text-base shadow-[3px_3px_0px_#2B2B2B] hover:-translate-y-0.5 transition-all cursor-pointer"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Launch Live Application</span>
            </a>
          )}
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => pencilSoundEngine.playPop()}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-stone-100 text-[#2B2B2B] border-2 border-[#2B2B2B] rounded-xs font-handwriting font-bold text-base shadow-[3px_3px_0px_#2B2B2B] hover:-translate-y-0.5 transition-all cursor-pointer"
            >
              <GithubDoodle className="w-4 h-4" />
              <span>Browse Source Code Repository</span>
            </a>
          )}
        </div>

        {/* Key Architectural Metrics */}
        <div className="mb-14">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-[#E4572E]" />
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#2B2B2B]">
              Key Architectural Benchmarks &amp; Scale
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {study.metrics.map((metric, idx) => (
              <div
                key={idx}
                className="p-4 bg-[#FFFDF8] border-2 border-[#2B2B2B] rounded-xs shadow-[3px_3px_0px_#2B2B2B] flex flex-col justify-between"
              >
                <span className="font-mono text-xs uppercase tracking-wider text-stone-500 font-bold block mb-1">
                  {metric.label}
                </span>
                <span className="font-heading text-2xl sm:text-3xl font-bold text-[#2B2B2B] break-words">
                  {metric.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Deep Overview Section */}
        <div className="mb-14">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#2B2B2B] mb-3">
            System Overview &amp; Context
          </h2>
          <HandDrawnUnderline color="#2B2B2B" className="w-48 h-2.5 mb-4" />
          <p className="font-handwriting text-lg text-stone-800 leading-relaxed">
            {study.overview}
          </p>

          {/* Interactive Case Study Architecture Simulator */}
          {study.slug === 'klyro' && <KlyroTaskAiPlayground />}
          {study.slug === 'kayspacks' && <KayspacksCheckoutPlayground />}
          {study.slug === 'hanara-portal' && <HanaraOfflineSyncPlayground />}
        </div>

        {/* System Architecture Layer Pipeline */}
        <div className="mb-14">
          <div className="flex items-center gap-2 mb-3">
            <Layers className="w-6 h-6 text-[#2B2B2B]" />
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#2B2B2B]">
              Full-Stack Architecture &amp; Layer Topology
            </h2>
          </div>
          <p className="font-handwriting text-stone-600 text-base mb-6">
            Modular multi-tier topology separating presentation, real-time event streaming, persistence, and external services:
          </p>

          <div className="space-y-4">
            {study.architecture.map((layer, lIdx) => (
              <div
                key={lIdx}
                className="p-5 sm:p-6 bg-[#FFFDF8] border-2 border-[#2B2B2B] rounded-xs shadow-[4px_4px_0px_#2B2B2B] relative"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold bg-[#FFE66D] border border-[#2B2B2B] px-2 py-0.5 rounded-xs">
                      Layer 0{lIdx + 1}
                    </span>
                    <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#2B2B2B]">
                      {layer.layer}
                    </h3>
                  </div>

                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-1.5">
                    {layer.technologies.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="font-mono text-xs font-bold px-2 py-0.5 rounded-xs bg-stone-200/80 text-stone-800 border border-stone-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="font-handwriting text-base sm:text-lg text-stone-700 leading-relaxed">
                  {layer.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Database & Data Persistence Schemas */}
        <div className="mb-14">
          <div className="flex items-center gap-2 mb-3">
            <Database className="w-6 h-6 text-[#2B2B2B]" />
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#2B2B2B]">
              Data Model &amp; Entity Schemas
            </h2>
          </div>
          <p className="font-handwriting text-stone-600 text-base mb-6">
            Core persistent document entities and relational data contracts:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {study.dataModel.map((model, mIdx) => (
              <div
                key={mIdx}
                className="p-4 sm:p-5 bg-[#FBF8EF] border-2 border-[#2B2B2B] rounded-xs shadow-[3px_3px_0px_#2B2B2B] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 pb-2 mb-3 border-b-2 border-dashed border-stone-300">
                    <span className="font-mono text-xs uppercase text-stone-500 font-bold">Schema</span>
                    <h4 className="font-mono font-bold text-base text-[#E4572E]">
                      {model.name}
                    </h4>
                  </div>

                  {/* Schema fields */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {model.fields.map((field, fIdx) => (
                      <span
                        key={fIdx}
                        className="font-mono text-xs bg-stone-100 text-stone-700 px-1.5 py-0.5 rounded-xs border border-stone-300"
                      >
                        {field}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="font-handwriting text-sm text-stone-700 leading-snug">
                  {model.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Engineering Challenges & Solutions */}
        <div className="mb-14">
          <div className="flex items-center gap-2 mb-3">
            <Cpu className="w-6 h-6 text-[#2B2B2B]" />
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#2B2B2B]">
              Core Engineering Challenges &amp; Solutions
            </h2>
          </div>
          <p className="font-handwriting text-stone-600 text-base mb-6">
            Real technical trade-offs, architecture decisions, and measured performance outcomes:
          </p>

          <div className="space-y-6">
            {study.challenges.map((challenge, cIdx) => (
              <div
                key={cIdx}
                className="p-6 bg-[#FFFDF8] border-2 border-[#2B2B2B] rounded-xs shadow-[4px_4px_0px_#2B2B2B]"
              >
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#2B2B2B] mb-4">
                  #{cIdx + 1}: {challenge.title}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Problem */}
                  <div className="p-3.5 bg-red-50/70 border border-red-300 rounded-xs">
                    <div className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase text-red-800 mb-1.5">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>The Problem</span>
                    </div>
                    <p className="font-handwriting text-sm sm:text-base text-stone-800 leading-relaxed">
                      {challenge.problem}
                    </p>
                  </div>

                  {/* Solution */}
                  <div className="p-3.5 bg-emerald-50/70 border border-emerald-300 rounded-xs">
                    <div className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase text-emerald-800 mb-1.5">
                      <Lightbulb className="w-3.5 h-3.5" />
                      <span>The Architectural Solution</span>
                    </div>
                    <p className="font-handwriting text-sm sm:text-base text-stone-800 leading-relaxed">
                      {challenge.solution}
                    </p>
                  </div>

                  {/* Impact */}
                  <div className="p-3.5 bg-amber-50/70 border border-amber-300 rounded-xs">
                    <div className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase text-amber-800 mb-1.5">
                      <Zap className="w-3.5 h-3.5" />
                      <span>The Impact</span>
                    </div>
                    <p className="font-handwriting text-sm sm:text-base text-stone-800 leading-relaxed">
                      {challenge.impact}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lessons Learned & Next Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Lessons Sticky Note */}
          <StickyNote color="yellow" tilt={-1} className="p-6">
            <h3 className="font-heading text-2xl font-bold text-[#2B2B2B] mb-3 flex items-center gap-2">
              <span>💡</span>
              <span>Architectural Takeaways</span>
            </h3>
            <ul className="space-y-2.5 font-handwriting text-stone-800 text-base">
              {study.lessons.map((lesson, lIdx) => (
                <li key={lIdx} className="flex items-start gap-2">
                  <span className="text-[#E4572E] font-bold">›</span>
                  <span>{lesson}</span>
                </li>
              ))}
            </ul>
          </StickyNote>

          {/* Next Steps / Roadmap */}
          <StickyNote color="blue" tilt={1} className="p-6">
            <h3 className="font-heading text-2xl font-bold text-[#2B2B2B] mb-3 flex items-center gap-2">
              <span>🚀</span>
              <span>Evolution Roadmap</span>
            </h3>
            <ul className="space-y-2.5 font-handwriting text-stone-800 text-base">
              {study.nextSteps.map((step, sIdx) => (
                <li key={sIdx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 mt-1 shrink-0" />
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </StickyNote>
        </div>

        {/* Bottom Pagination & Return Row */}
        <div className="pt-8 border-t-2 border-dashed border-stone-300 flex flex-col sm:flex-row items-center justify-between gap-4 font-handwriting select-none">
          <Link
            href={`/projects/${prevStudy.slug}`}
            scroll={true}
            onClick={() => {
              try {
                pencilSoundEngine.playPaperFlip();
              } catch {}
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-stone-100 hover:bg-[#FFE66D] text-stone-900 border-2 border-[#2B2B2B] rounded-xs font-bold text-sm shadow-[2px_2px_0px_#2B2B2B] hover:-translate-y-0.5 active:translate-y-0 transition-transform cursor-pointer"
            data-interactive="true"
          >
            <ChevronLeft className="w-4 h-4 shrink-0" />
            <span>Prev: {prevStudy.title.split('—')[0].trim()}</span>
          </Link>

          <a
            href="/#projects"
            onClick={() => {
              try {
                pencilSoundEngine.playPaperFlip();
              } catch {}
            }}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#FFE66D] hover:bg-amber-300 text-[#2B2B2B] border-2 border-[#2B2B2B] rounded-xs font-bold text-base shadow-[3px_3px_0px_#2B2B2B] hover:-translate-y-0.5 active:translate-y-0 transition-transform cursor-pointer"
            data-interactive="true"
          >
            <span>All Projects in Exercise Book</span>
          </a>

          <Link
            href={`/projects/${nextStudy.slug}`}
            scroll={true}
            onClick={() => {
              try {
                pencilSoundEngine.playPaperFlip();
              } catch {}
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-stone-100 hover:bg-[#FFE66D] text-stone-900 border-2 border-[#2B2B2B] rounded-xs font-bold text-sm shadow-[2px_2px_0px_#2B2B2B] hover:-translate-y-0.5 active:translate-y-0 transition-transform cursor-pointer"
            data-interactive="true"
          >
            <span>Next: {nextStudy.title.split('—')[0].trim()}</span>
            <ChevronRight className="w-4 h-4 shrink-0" />
          </Link>
        </div>
      </TornPageCard>

      {/* Lightbox Modal Mounted for Screenshot Expansion */}
      <ImageLightboxModal
        project={lightboxOpen ? project : null}
        projectsList={allProjects}
        onClose={() => setLightboxOpen(false)}
        onSelectProject={() => {}}
      />
    </div>
  );
};
