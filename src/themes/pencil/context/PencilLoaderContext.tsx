'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

interface PencilLoaderContextValue {
  isLoaded: boolean;
  markLoaded: () => void;
}

const PencilLoaderContext = createContext<PencilLoaderContextValue>({
  isLoaded: false,
  markLoaded: () => {},
});

export const PencilLoaderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const markLoaded = useCallback(() => {
    setIsLoaded(true);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('pencil_loader_finished'));
    }
  }, []);

  return (
    <PencilLoaderContext.Provider value={{ isLoaded, markLoaded }}>
      {children}
    </PencilLoaderContext.Provider>
  );
};

export const usePencilLoaderContext = () => useContext(PencilLoaderContext);
