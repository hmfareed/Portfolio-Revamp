'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface NavItem {
  label: string;
  href: string;
  color: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#home', color: '#FEF08A' },
  { label: 'About', href: '#about', color: '#BAE6FD' },
  { label: 'Projects', href: '#projects', color: '#FBCFE8' },
  { label: 'Experience', href: '#experience', color: '#BBF7D0' },
  { label: 'Skills', href: '#skills', color: '#FED7AA' },
  { label: 'Contact', href: '#contact', color: '#DDD6FE' },
];

export const NotebookNav: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('#home');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveTab(`#${entry.target.id}`);
          }
        });
      },
      {
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0,
      }
    );

    NAV_ITEMS.forEach((item) => {
      const el = document.getElementById(item.href.slice(1));
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FBF8EF]/95 backdrop-blur-md pt-2 pb-1.5 mb-6 border-b-2 border-[#2B2B2B]/20 shadow-xs will-change-transform">
      <nav
        aria-label="Notebook sections"
        className="flex items-center justify-start md:justify-center overflow-x-auto no-scrollbar gap-1.5 sm:gap-2 px-2 py-1"
      >
        {NAV_ITEMS.map((item) => {
          const isActive = activeTab === item.href;
          return (
            <motion.a
              key={item.href}
              href={item.href}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
              style={{
                backgroundColor: item.color,
              }}
              className={`relative px-3.5 sm:px-5 py-1.5 sm:py-2 text-sm sm:text-base font-handwriting font-bold tracking-wide rounded-t-md border-2 border-b-0 border-[#2B2B2B] shadow-xs shrink-0 transition-transform ${
                isActive
                  ? 'translate-y-0.5 border-b-2 border-b-transparent shadow-[0_-3px_0px_#2B2B2B]'
                  : 'opacity-85 hover:opacity-100 hover:-translate-y-1'
              }`}
            >
              {/* Tab index divider hole doodle */}
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#2B2B2B]/40 mr-1.5 -translate-y-0.5" />
              {item.label}
              {isActive && (
                <span className="absolute -bottom-1 left-2 right-2 h-0.5 bg-[#2B2B2B]" />
              )}
            </motion.a>
          );
        })}
      </nav>
      {/* Notebook binder edge wire line underneath tabs */}
      <div className="w-full h-1 border-b-2 border-[#2B2B2B] opacity-80" />
    </header>
  );
};
