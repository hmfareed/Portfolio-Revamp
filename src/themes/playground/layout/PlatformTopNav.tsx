'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Home,
  User,
  Gamepad2,
  Activity,
  Layers,
  FileCheck,
  MessageSquare,
  Search,
  ExternalLink,
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home', href: '#home', icon: Home },
  { id: 'about', label: 'About', href: '#about', icon: User },
  { id: 'projects', label: 'Games', href: '#projects', icon: Gamepad2 },
  { id: 'experience', label: 'Experience', href: '#experience', icon: Activity },
  { id: 'skills', label: 'Skills', href: '#skills', icon: Layers },
  { id: 'resume', label: 'Resume', href: '#resume', icon: FileCheck },
  { id: 'contact', label: 'Contact', href: '#contact', icon: MessageSquare },
];

export const PlatformTopNav: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [searchQuery, setSearchQuery] = useState('');

  // Scrollspy
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const ids = NAV_ITEMS.map((item) => item.id);

      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && el.offsetTop - 140 <= scrollY) {
          setActiveSection(ids[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Broadcast search query to DiscoverGamesSection
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('playground-search-filter', { detail: query })
      );
    }
  };

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* ============================================================== */}
      {/* 1. TOP PLATFORM HEADER (Fixed Desktop & Mobile)                */}
      {/* ============================================================== */}
      <header
        aria-label="Platform Top Bar"
        className="fixed top-0 left-0 right-0 h-16 bg-[#232527]/95 border-b border-[#393B3D] z-30 flex items-center justify-between px-3 sm:px-6 backdrop-blur-md"
      >
        {/* Left: Platform Logo */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#home"
            className="flex items-center gap-2.5 group cursor-pointer select-none"
          >
            <div className="w-8 h-8 rounded-lg bg-[#00B06F] flex items-center justify-center font-heading font-extrabold text-white text-base shadow-md group-hover:scale-105 transition-transform">
              P
            </div>
            <span className="font-heading font-bold text-lg sm:text-xl text-white tracking-wide">
              Playground
            </span>
          </a>
        </div>

        {/* Center: Search-Style Project Filter Field */}
        <div className="flex-1 max-w-xs sm:max-w-md mx-3 sm:mx-6">
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search games &amp; stacks..."
              className="w-full pl-9 pr-3 py-1.5 bg-[#2F3133] hover:bg-[#393B3D] focus:bg-[#393B3D] border border-[#424549] focus:border-[#00B06F] rounded-xl text-xs sm:text-sm text-white placeholder:text-stone-400 focus:outline-hidden transition-all shadow-inner"
            />
          </div>
        </div>

        {/* Right: Small Avatar & Hire Me Button */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={scrollToContact}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#00B06F] hover:bg-[#00C87E] text-white font-heading font-bold text-xs uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
          >
            <span>Hire Me</span>
          </button>

          {/* Small Avatar Chip */}
          <div className="w-8 h-8 rounded-full bg-[#FFC933] border-2 border-[#00B06F] overflow-hidden relative shrink-0 shadow-xs">
            <Image
              src="/images/profile/fareed.png"
              alt="Mohammed Fareed"
              fill
              sizes="32px"
              className="object-cover object-top"
            />
          </div>
        </div>
      </header>

      {/* ============================================================== */}
      {/* 2. DESKTOP LEFT SIDEBAR MENU (Pinned Left on md+ screens)      */}
      {/* ============================================================== */}
      <aside
        aria-label="Platform Sidebar Menu"
        className="fixed top-16 left-0 bottom-0 w-60 bg-[#232527] border-r border-[#393B3D] p-3 hidden md:flex flex-col justify-between z-20 select-none"
      >
        <div className="space-y-1 pt-2">
          <span className="font-heading text-[11px] uppercase tracking-wider text-stone-400 font-bold px-3 block mb-2">
            Navigation
          </span>

          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <a
                key={item.id}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-heading text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-[#00B06F] text-white shadow-md shadow-[#00B06F]/20'
                    : 'text-stone-300 hover:text-white hover:bg-[#2F3133]'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-stone-400'}`} />
                <span>{item.label}</span>
              </a>
            );
          })}
        </div>

        {/* Sidebar Status Card */}
        <div className="p-3.5 rounded-xl bg-[#2F3133] border border-[#393B3D] space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00B06F] animate-pulse" />
            <span className="font-heading text-xs font-bold text-white">
              Online Lobby
            </span>
          </div>
          <p className="font-body text-[11px] text-stone-400 leading-snug">
            Available for production builds &amp; contracts.
          </p>
        </div>
      </aside>

      {/* ============================================================== */}
      {/* 3. MOBILE BOTTOM TAB BAR (Within thumb reach on small screens) */}
      {/* ============================================================== */}
      <nav
        aria-label="Mobile Bottom Tab Bar"
        className="fixed bottom-0 left-0 right-0 h-16 bg-[#232527]/95 border-t border-[#393B3D] z-30 flex items-center justify-around px-2 backdrop-blur-md md:hidden select-none"
      >
        {NAV_ITEMS.slice(0, 6).map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <a
              key={item.id}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-lg transition-colors ${
                isActive ? 'text-[#00B06F]' : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-heading font-bold mt-0.5">
                {item.label}
              </span>
            </a>
          );
        })}
      </nav>
    </>
  );
};
