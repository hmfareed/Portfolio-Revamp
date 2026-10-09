'use client';

import React from 'react';

interface BaseplateLayoutProps {
  children: React.ReactNode;
}

export const BaseplateLayout: React.FC<BaseplateLayoutProps> = ({ children }) => {
  return (
    <div className="relative min-h-screen w-full bg-[#2E9E4F] text-[#1A1F2B] font-body overflow-x-hidden selection:bg-[#FFC62B] selection:text-[#1A1F2B]">
      {/* 
        Repeating green baseplate round stud grid pattern
        Cylindrical stud with radial highlight and drop shadow
      */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-80"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='36' height='36' viewBox='0 0 36 36'%3E%3Ccircle cx='18' cy='18' r='7' fill='%2338B55E' stroke='%2320783A' stroke-width='1.5'/%3E%3Ccircle cx='18' cy='17' r='5' fill='none' stroke='%2356CD78' stroke-width='1' opacity='0.7'/%3E%3Cellipse cx='18' cy='24.5' rx='6' ry='1.5' fill='%23195F2E' opacity='0.35'/%3E%3C/svg%3E")`,
          backgroundSize: '36px 36px',
        }}
        aria-hidden="true"
      />

      {/* Subtle molded plastic sheen across whole canvas */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-15 mix-blend-overlay bg-linear-to-b from-white via-transparent to-black"
        aria-hidden="true"
      />

      {/* Main Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </div>
    </div>
  );
};
