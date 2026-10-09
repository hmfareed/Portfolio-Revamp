'use client';

import React from 'react';
import { contactContent } from '@/content/contact';
import { ChalkLine } from '../primitives/ChalkLine';
import { ChalkStick, FeltEraser, ChalkGithubIcon, ChalkLinkedinIcon } from '../primitives/ChalkDoodles';
import { Mail, ArrowUp } from 'lucide-react';

export const ChalkTrayFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative mt-20 pt-8 pb-4 text-[#F2F0E6]">
      {/* Chalk Tray Container Card */}
      <div className="relative bg-[#263D33] border-2 border-dashed border-[#F2F0E6]/50 rounded-xl p-8 sm:p-10 text-center max-w-4xl mx-auto mb-10 shadow-lg">
        {/* Sign-off Heading */}
        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[#F6D860] mb-2 tracking-wide">
          Class Dismissed!
        </h2>
        <ChalkLine color="#F6D860" className="w-56 h-3 mx-auto mb-6" />

        <p className="font-body text-base sm:text-lg text-stone-200 max-w-lg mx-auto italic mb-8">
          &ldquo;I write the plan, data model and requirements before code, then build and ship against them.&rdquo;
        </p>

        {/* Scroll to Top Chalk Action */}
        <button
          type="button"
          onClick={scrollToTop}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border-2 border-dashed border-[#F2F0E6] font-heading text-lg font-bold text-[#F2F0E6] hover:bg-[#F2F0E6]/15 active:bg-[#F2F0E6] active:text-[#23382F] transition-all cursor-pointer mb-8"
        >
          <ArrowUp className="w-4 h-4" />
          <span>Back to Top of Board</span>
        </button>

        {/* Direct Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 font-heading text-lg">
          <a
            href={`mailto:${contactContent.email}`}
            className="inline-flex items-center gap-1.5 text-[#8EC5E8] hover:text-white transition-colors"
          >
            <Mail className="w-4 h-4" />
            <span>{contactContent.email}</span>
          </a>

          <span className="text-stone-500">·</span>

          <a
            href={contactContent.github.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[#F2F0E6] hover:text-[#F6D860] transition-colors"
          >
            <ChalkGithubIcon className="w-4 h-4" />
            <span>{contactContent.github.label}</span>
          </a>

          <span className="text-stone-500">·</span>

          <a
            href={contactContent.linkedin.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[#F4A6B8] hover:text-white transition-colors"
          >
            <ChalkLinkedinIcon className="w-4 h-4" />
            <span>{contactContent.linkedin.label}</span>
          </a>
        </div>
      </div>

      {/* Bottom Chalk Tray Rail with Chalk & Eraser */}
      <div
        className="relative flex items-center justify-between p-3 px-6 rounded-xl bg-[#8A5A33] border-2 border-[#5A3A1E] text-stone-200 text-xs sm:text-sm font-body shadow-[inset_0_2px_4px_rgba(255,255,255,0.2),0_6px_12px_rgba(0,0,0,0.5)]"
      >
        <div className="flex items-center gap-3">
          <ChalkStick className="w-8 h-2.5" color="#F2F0E6" />
          <ChalkStick className="w-7 h-2.5" color="#F4A6B8" />
          <FeltEraser className="w-10 h-4.5" />
          <span className="font-heading text-sm text-[#F2F0E6]/80 hidden sm:inline">
            Chalk Tray · Tamale, Northern Ghana
          </span>
        </div>

        <div className="font-heading text-sm text-stone-200">
          © {currentYear} Mohammed Fareed Mandeeya Haruna
        </div>
      </div>
    </footer>
  );
};
