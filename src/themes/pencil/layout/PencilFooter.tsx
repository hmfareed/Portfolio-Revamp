'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { contactContent } from '@/content/contact';
import { StarDoodle } from '../primitives/Doodles';

export const PencilFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const shouldReduceMotion = useReducedMotion();

  return (
    <footer className="relative mt-24 mb-12 pt-12 border-t-2 border-dashed border-[#2B2B2B]/60 text-center font-handwriting">
      {/* Torn notebook page footer sign-off */}
      <div className="max-w-2xl mx-auto px-4 flex flex-col items-center">
        <div className="flex items-center gap-2 mb-3">
          <StarDoodle className="w-5 h-5 text-amber-400" />
          <p className="text-xl sm:text-2xl font-bold text-[#2B2B2B]">
            End of Notebook · Keep Building
          </p>
          <StarDoodle className="w-5 h-5 text-amber-400" />
        </div>

        <p className="text-lg text-stone-700 italic max-w-lg mb-6">
          &ldquo;I write the plan, data model and requirements before code, then build and ship against them.&rdquo;
        </p>

        {/* Hand-drawn Handwritten Signature & Pencil Walkout */}
        <div className="relative my-6 flex flex-col items-center">
          <div className="relative w-64 h-16 flex items-center justify-center">
            {/* Cursive Signature SVG */}
            <svg
              viewBox="0 0 240 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              <motion.path
                d="M 15 45 Q 25 10 35 45 Q 50 20 60 48 T 85 45 M 95 35 Q 110 25 125 45 M 135 15 L 135 50 Q 155 45 175 48 M 185 35 Q 200 45 220 38"
                stroke="#2B2B2B"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 1.1, ease: 'easeInOut' }}
              />
            </svg>

            {/* Pencil walking horizontally out of frame */}
            {!shouldReduceMotion && (
              <motion.div
                initial={{ x: 0, opacity: 0 }}
                whileInView={{
                  x: [0, 80, 180, 260],
                  opacity: [0, 1, 1, 0],
                  rotate: [-20, -35, -15, -45],
                }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 1.6, delay: 0.8, ease: 'easeOut' }}
                className="absolute -top-3 left-1/2 w-8 h-8 pointer-events-none"
              >
                <svg viewBox="0 0 32 32" fill="none" className="w-full h-full drop-shadow-sm">
                  <polygon points="6,26 22,10 26,14 10,30" fill="#FFC62B" stroke="#2B2B2B" strokeWidth="1.6" />
                  <polygon points="3,29 6,26 10,30" fill="#F4EED9" stroke="#2B2B2B" strokeWidth="1.2" />
                  <polygon points="1,31 3,29 5,31" fill="#2B2B2B" />
                  <polygon points="22,10 26,6 30,10 26,14" fill="#F4A6B8" stroke="#2B2B2B" strokeWidth="1.4" />
                </svg>
              </motion.div>
            )}
          </div>

          {/* "The End" Hand-drawn Stamp Badge */}
          <motion.div
            initial={shouldReduceMotion ? {} : { scale: 0, rotate: -8 }}
            whileInView={{ scale: 1, rotate: -3 }}
            viewport={{ once: true }}
            transition={{ delay: 1.2, type: 'spring', stiffness: 350, damping: 16 }}
            className="mt-1 px-3 py-0.5 border-2 border-dashed border-[#E4572E] text-[#E4572E] font-heading font-bold text-base rounded-xs"
          >
            — The End ✎ —
          </motion.div>
        </div>

        {/* Quick links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-base font-bold text-[#2B2B2B] mb-8">
          <a
            href={`mailto:${contactContent.email}`}
            className="hover:underline hover:text-[#E4572E] transition-colors"
          >
            {contactContent.email}
          </a>
          <span className="text-stone-400">·</span>
          <a
            href={contactContent.github.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline hover:text-[#E4572E] transition-colors"
          >
            GitHub
          </a>
          <span className="text-stone-400">·</span>
          <a
            href={contactContent.linkedin.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline hover:text-[#E4572E] transition-colors"
          >
            LinkedIn
          </a>
        </div>

          <div className="text-sm text-stone-600 flex flex-col items-center gap-1">
          <p>
            Designed &amp; Hand-Coded in {contactContent.location} · {currentYear}
          </p>
          <p className="text-xs text-stone-500">
            Hand-drawn Pencil Theme · Built with Next.js, TypeScript &amp; Tailwind CSS
          </p>
          <button
            type="button"
            onClick={() => {
              try {
                sessionStorage.removeItem('pencil_loader_seen');
              } catch {}
              window.location.href = '/?intro=true';
            }}
            className="mt-3 text-xs font-handwriting font-bold text-stone-700 hover:text-[#E4572E] underline underline-offset-2 cursor-pointer flex items-center gap-1 px-3 py-1 bg-white/70 border border-stone-400 rounded-xs shadow-2xs hover:bg-[#FFE66D] transition-colors"
            title="Replay the 3D exercise book opening intro animation"
          >
            <span>↺ Replay Exercise Book Intro</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
