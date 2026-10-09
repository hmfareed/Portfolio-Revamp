'use client';

import React from 'react';
import { contactContent } from '@/content/contact';
import { VoxelButton } from '../primitives/VoxelButton';
import { PixelDivider } from '../primitives/PixelDivider';
import { ArrowUp, Heart, Gamepad2 } from 'lucide-react';

export const GameOverFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative mt-20 mb-8 pt-8">
      {/* Game Over / Stage Cleared Card */}
      <div
        className="max-w-3xl mx-auto bg-[#1E232A] border-4 border-black p-6 sm:p-10 text-center text-[#F3F4F6] rounded-xs shadow-[0_12px_0_#0F1217]"
        style={{
          boxShadow:
            'inset 4px 4px 0 rgba(255, 255, 255, 0.15), inset -4px -4px 0 rgba(0, 0, 0, 0.7), 0 12px 0 #0F1217',
        }}
      >
        <div className="flex items-center justify-center gap-2 mb-3">
          <Gamepad2 className="w-6 h-6 text-[#FFD23F]" />
          <h2 className="font-pixel text-xl sm:text-2xl font-bold text-[#FFD23F] tracking-wider uppercase">
            STAGE CLEARED!
          </h2>
          <Gamepad2 className="w-6 h-6 text-[#FFD23F]" />
        </div>

        <p className="font-pixel text-xs sm:text-sm text-[#9AA3AD] mb-6">
          ★ THANKS FOR PLAYING ★
        </p>

        <p className="font-body text-base sm:text-lg text-stone-300 max-w-lg mx-auto italic mb-8">
          &ldquo;I write the plan, data model and requirements before code, then build and ship against them.&rdquo;
        </p>

        {/* Continue / Play Again Button */}
        <div className="mb-8">
          <VoxelButton onClick={scrollToTop} variant="highlighter" className="text-sm px-6 py-3.5">
            <ArrowUp className="w-4 h-4 mr-1" />
            <span>CONTINUE (SCROLL TO TOP)</span>
          </VoxelButton>
        </div>

        {/* Direct Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 font-pixel text-xs mb-8">
          <a
            href={`mailto:${contactContent.email}`}
            className="text-[#38BDF8] hover:text-[#7FD6FF] underline underline-offset-4"
          >
            {contactContent.email}
          </a>
          <span className="text-stone-500">|</span>
          <a
            href={contactContent.github.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#FFD23F] hover:text-[#FFE57F] underline underline-offset-4"
          >
            GitHub
          </a>
          <span className="text-stone-500">|</span>
          <a
            href={contactContent.linkedin.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#4ADE80] hover:text-[#86EFAC] underline underline-offset-4"
          >
            LinkedIn
          </a>
        </div>

        <PixelDivider color="#FFD23F" className="w-32 mx-auto mb-6" />

        <div className="font-body text-xs text-stone-400 flex flex-col items-center gap-1">
          <p>
            World Realm: {contactContent.location} · {currentYear}
          </p>
          <p className="font-pixel text-[10px] text-stone-500">
            Blocky Game World Theme · 100% Original Voxel Code
          </p>
        </div>
      </div>
    </footer>
  );
};
