'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BrickStud } from '../primitives/BrickStud';

interface NavItem {
  label: string;
  href: string;
  color: string;
  textColor: string;
  borderColor: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#home', color: '#D1382B', textColor: '#FFFFFF', borderColor: '#9E2419' },
  { label: 'About', href: '#about', color: '#FFC62B', textColor: '#1A1F2B', borderColor: '#C99812' },
  { label: 'Projects', href: '#projects', color: '#1F6FEB', textColor: '#FFFFFF', borderColor: '#134FB0' },
  { label: 'Experience', href: '#experience', color: '#F4F1E8', textColor: '#1A1F2B', borderColor: '#D5D0C2' },
  { label: 'Skills', href: '#skills', color: '#D1382B', textColor: '#FFFFFF', borderColor: '#9E2419' },
  { label: 'Contact', href: '#contact', color: '#FFC62B', textColor: '#1A1F2B', borderColor: '#C99812' },
];

export const BrickNav: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('#home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_ITEMS.map((item) => item.href.slice(1));
      const scrollY = window.scrollY;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop - 180 <= scrollY) {
          setActiveTab(`#${sections[i]}`);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="sticky top-2 z-50 w-full mb-8">
      <nav
        aria-label="Brick sections navigation"
        className="flex items-center justify-start md:justify-center overflow-x-auto no-scrollbar gap-2 px-2 py-2"
      >
        <div className="flex items-center gap-1.5 sm:gap-2 p-1.5 rounded-2xl bg-black/40 backdrop-blur-md border-2 border-black/30 shadow-[0_8px_20px_rgba(0,0,0,0.35)]">
          {NAV_ITEMS.map((item) => {
            const isActive = activeTab === item.href;
            return (
              <motion.a
                key={item.href}
                href={item.href}
                whileHover={{ y: -2 }}
                whileTap={{ y: 2, scale: 0.98 }}
                style={{
                  backgroundColor: item.color,
                  color: item.textColor,
                  borderColor: item.borderColor,
                  boxShadow: isActive
                    ? 'inset 0 3px 5px rgba(0,0,0,0.35), 0 2px 0 rgba(255,255,255,0.4)'
                    : 'inset 0 2px 0 rgba(255,255,255,0.45), 0 4px 6px rgba(0,0,0,0.25)',
                }}
                className={`relative flex items-center gap-1.5 px-3.5 sm:px-4.5 py-1.5 sm:py-2 rounded-xl border-b-2 sm:border-b-3 font-heading text-sm sm:text-base font-bold tracking-wide uppercase transition-all select-none shrink-0 ${
                  isActive
                    ? 'scale-105 ring-2 ring-white/80'
                    : 'opacity-90 hover:opacity-100'
                }`}
              >
                {/* Micro stud on brick tab */}
                <BrickStud color={item.color} size="xs" />
                <span>{item.label}</span>
              </motion.a>
            );
          })}
        </div>
      </nav>
    </header>
  );
};
