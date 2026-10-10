'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { pencilSoundEngine } from '../audio/pencilSoundEngine';

export type InkColor = 'graphite' | 'blue' | 'red' | 'emerald';

export interface InkDefinition {
  id: InkColor;
  name: string;
  label: string;
  hex: string;
  muted: string;
  tint: string;
  bodyColor: string;
}

export const INK_PRESETS: Record<InkColor, InkDefinition> = {
  graphite: {
    id: 'graphite',
    name: '2B Graphite',
    label: 'Pencil',
    hex: '#2B2B2B',
    muted: '#525252',
    tint: 'rgba(43, 43, 43, 0.08)',
    bodyColor: '#D97706', // Wooden pencil barrel
  },
  blue: {
    id: 'blue',
    name: 'Bic Blue',
    label: 'Ballpoint',
    hex: '#1E3A8A',
    muted: '#2563EB',
    tint: 'rgba(30, 58, 138, 0.08)',
    bodyColor: '#1D4ED8', // Classic blue barrel
  },
  red: {
    id: 'red',
    name: "Teacher's Red",
    label: 'Grading Pen',
    hex: '#991B1B',
    muted: '#DC2626',
    tint: 'rgba(153, 27, 27, 0.08)',
    bodyColor: '#B91C1C', // Red barrel
  },
  emerald: {
    id: 'emerald',
    name: 'Emerald Green',
    label: 'Fountain Pen',
    hex: '#065F46',
    muted: '#059669',
    tint: 'rgba(6, 95, 70, 0.08)',
    bodyColor: '#047857', // Fountain pen barrel
  },
};

interface InkColorContextType {
  ink: InkColor;
  currentPreset: InkDefinition;
  setInk: (ink: InkColor) => void;
}

const InkColorContext = createContext<InkColorContextType>({
  ink: 'graphite',
  currentPreset: INK_PRESETS.graphite,
  setInk: () => {},
});

export const InkColorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [ink, setInkState] = useState<InkColor>('graphite');

  const applyInkToDOM = useCallback((color: InkColor) => {
    if (typeof document === 'undefined') return;
    const preset = INK_PRESETS[color] || INK_PRESETS.graphite;
    document.documentElement.setAttribute('data-ink', color);
    document.documentElement.style.setProperty('--pencil-ink', preset.hex);
    document.documentElement.style.setProperty('--pencil-ink-muted', preset.muted);
    document.documentElement.style.setProperty('--pencil-ink-tint', preset.tint);
  }, []);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('portfolio_ink_color') as InkColor | null;
      if (saved && INK_PRESETS[saved]) {
        setInkState(saved);
        applyInkToDOM(saved);
      } else {
        applyInkToDOM('graphite');
      }
    } catch {
      applyInkToDOM('graphite');
    }
  }, [applyInkToDOM]);

  const setInk = useCallback((color: InkColor) => {
    setInkState(color);
    applyInkToDOM(color);
    try {
      localStorage.setItem('portfolio_ink_color', color);
    } catch {}
    pencilSoundEngine.playPencilScribble();
  }, [applyInkToDOM]);

  return (
    <InkColorContext.Provider
      value={{
        ink,
        currentPreset: INK_PRESETS[ink],
        setInk,
      }}
    >
      {children}
    </InkColorContext.Provider>
  );
};

export const useInkColor = () => useContext(InkColorContext);
