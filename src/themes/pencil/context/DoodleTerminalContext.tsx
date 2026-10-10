'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { pencilSoundEngine } from '../audio/pencilSoundEngine';

interface DoodleTerminalContextType {
  isOpen: boolean;
  openTerminal: () => void;
  closeTerminal: () => void;
  toggleTerminal: () => void;
}

const DoodleTerminalContext = createContext<DoodleTerminalContextType>({
  isOpen: false,
  openTerminal: () => {},
  closeTerminal: () => {},
  toggleTerminal: () => {},
});

export const DoodleTerminalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openTerminal = useCallback(() => {
    setIsOpen(true);
    pencilSoundEngine.playPop();
  }, []);

  const closeTerminal = useCallback(() => {
    setIsOpen(false);
    pencilSoundEngine.playPaperFlip();
  }, []);

  const toggleTerminal = useCallback(() => {
    setIsOpen((prev) => {
      if (!prev) {
        pencilSoundEngine.playPop();
      } else {
        pencilSoundEngine.playPaperFlip();
      }
      return !prev;
    });
  }, []);

  // Global keyboard shortcuts: Ctrl+K or Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        toggleTerminal();
      } else if (e.key === 'Escape' && isOpen) {
        closeTerminal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, toggleTerminal, closeTerminal]);

  return (
    <DoodleTerminalContext.Provider
      value={{
        isOpen,
        openTerminal,
        closeTerminal,
        toggleTerminal,
      }}
    >
      {children}
    </DoodleTerminalContext.Provider>
  );
};

export const useDoodleTerminal = () => useContext(DoodleTerminalContext);
