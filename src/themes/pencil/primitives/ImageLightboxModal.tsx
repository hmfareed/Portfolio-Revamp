'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Project } from '@/content/types';
import { TapeStrip, StarDoodle, GithubDoodle } from './Doodles';
import { ExternalLink, X, ZoomIn, ZoomOut, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageLightboxModalProps {
  project: Project | null;
  projectsList: Project[];
  onClose: () => void;
  onSelectProject: (p: Project) => void;
}

export const ImageLightboxModal: React.FC<ImageLightboxModalProps> = ({
  project,
  projectsList,
  onClose,
  onSelectProject,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const [zoomLevel, setZoomLevel] = useState(1);

  // Reset zoom whenever project changes
  useEffect(() => {
    setZoomLevel(1);
  }, [project]);

  // Navigate next/prev
  const currentIndex = project ? projectsList.findIndex((p) => p.slug === project.slug) : -1;

  const handleNext = useCallback(() => {
    if (currentIndex < projectsList.length - 1) {
      onSelectProject(projectsList[currentIndex + 1]);
    } else {
      onSelectProject(projectsList[0]);
    }
  }, [currentIndex, projectsList, onSelectProject]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      onSelectProject(projectsList[currentIndex - 1]);
    } else {
      onSelectProject(projectsList[projectsList.length - 1]);
    }
  }, [currentIndex, projectsList, onSelectProject]);

  // Keyboard navigation
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose, handleNext, handlePrev]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 bg-stone-900/80 backdrop-blur-xs -z-10"
        />

        {/* Modal Window Styled as an Architectural Sketchbook Page */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.93, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: 15 }}
          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
          className="relative bg-[#FBF8EF] border-3 border-[#2B2B2B] rounded-sm shadow-[8px_12px_0px_#2B2B2B] max-w-5xl w-full max-h-[94vh] flex flex-col overflow-hidden font-handwriting"
          style={{ filter: 'url(#pencil-wobble)' }}
        >
          {/* Top Tape Strips */}
          <div className="absolute -top-3 left-10 pointer-events-none z-30 hidden sm:block">
            <TapeStrip angle={-2} />
          </div>
          <div className="absolute -top-3 right-10 pointer-events-none z-30 hidden sm:block">
            <TapeStrip angle={2.5} />
          </div>

          {/* Modal Header */}
          <div className="flex items-center justify-between px-5 sm:px-8 py-3.5 border-b-2 border-[#2B2B2B] bg-[#FFFDF8]">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-stone-500 uppercase tracking-widest font-bold">
                Exhibit {currentIndex + 1} of {projectsList.length}
              </span>
              {project.featured && (
                <span className="inline-flex items-center gap-1 bg-[#FFE66D] border border-[#2B2B2B] text-xs font-bold px-2 py-0.5 rounded-xs">
                  <StarDoodle className="w-3.5 h-3.5 text-[#2B2B2B]" />
                  <span>Featured Build</span>
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              {/* Zoom controls */}
              <div className="hidden sm:flex items-center gap-1 border border-stone-400 bg-white/80 rounded-xs px-1 py-0.5">
                <button
                  onClick={() => setZoomLevel((z) => Math.min(z + 0.25, 2.5))}
                  className="p-1 text-stone-700 hover:text-stone-900 cursor-pointer"
                  title="Zoom In"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setZoomLevel((z) => Math.max(z - 0.25, 0.75))}
                  className="p-1 text-stone-700 hover:text-stone-900 cursor-pointer"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setZoomLevel(1)}
                  className="p-1 text-stone-700 hover:text-stone-900 cursor-pointer"
                  title="Reset Zoom"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="flex items-center gap-1 px-2.5 py-1 text-xs font-bold font-mono bg-red-100 hover:bg-red-200 text-red-900 border border-red-400 rounded-xs transition-colors cursor-pointer"
                title="Close Lightbox (Esc)"
              >
                <X className="w-4 h-4" />
                <span className="hidden sm:inline">Close</span>
              </button>
            </div>
          </div>

          {/* Modal Image Area */}
          <div className="relative flex-1 min-h-[260px] sm:min-h-[420px] max-h-[64vh] overflow-auto bg-stone-950 flex items-center justify-center p-2 sm:p-4 border-b-2 border-[#2B2B2B]">
            {project.image ? (
              <div
                className="relative transition-transform duration-200 origin-center max-w-full max-h-full"
                style={{
                  transform: `scale(${zoomLevel})`,
                }}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  width={1536}
                  height={1024}
                  className="rounded-xs border border-stone-800 object-contain max-h-[58vh] w-auto shadow-2xl"
                  priority
                />
              </div>
            ) : (
              <div className="text-center p-8 text-stone-400 font-handwriting">
                <span className="text-xl font-bold">Screenshot Architecture Blueprint</span>
              </div>
            )}

            {/* Left / Right Carousel Navigation Buttons */}
            <button
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-xs bg-[#FBF8EF]/90 border-2 border-[#2B2B2B] text-stone-900 shadow-md hover:bg-[#FFE66D] transition-colors cursor-pointer"
              title="Previous Project (Left Arrow)"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-xs bg-[#FBF8EF]/90 border-2 border-[#2B2B2B] text-stone-900 shadow-md hover:bg-[#FFE66D] transition-colors cursor-pointer"
              title="Next Project (Right Arrow)"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Footer Description & External Links */}
          <div className="p-4 sm:p-6 bg-[#FFFDF8] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#2B2B2B] leading-tight">
                {project.title}
              </h3>
              <p className="font-handwriting text-sm sm:text-base text-stone-700 mt-1 max-w-2xl">
                {project.pitch}
              </p>
              <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
                {project.stack.map((tech, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-xs font-handwriting font-bold px-2 py-0.5 rounded-xs bg-amber-100/70 border border-stone-400 text-stone-800"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              {project.links.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#FFE66D] hover:bg-amber-300 text-[#2B2B2B] border-2 border-[#2B2B2B] rounded-xs font-bold text-sm shadow-[2px_2px_0px_#2B2B2B] hover:-translate-y-0.5 transition-all cursor-pointer"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Visit Live App</span>
                </a>
              )}

              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-stone-100 text-[#2B2B2B] border-2 border-[#2B2B2B] rounded-xs font-bold text-sm shadow-[2px_2px_0px_#2B2B2B] hover:-translate-y-0.5 transition-all cursor-pointer"
                >
                  <GithubDoodle className="w-4 h-4" />
                  <span>View Repository</span>
                </a>
              )}

              <a
                href={`/projects/${project.slug}`}
                className="inline-flex items-center gap-2 px-4 py-2 bg-stone-800 hover:bg-black text-white border-2 border-stone-800 rounded-xs font-bold text-sm shadow-[2px_2px_0px_#2B2B2B] hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                <span>Full Case Study →</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
