'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { pencilSoundEngine } from '../audio/pencilSoundEngine';

export const MarginDoodlePad: React.FC = () => {
  const [isDoodling, setIsDoodling] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawingRef = useRef(false);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);

  // Resize canvas when doodling mode is toggled
  useEffect(() => {
    if (!isDoodling) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const inkColor = window.getComputedStyle(document.documentElement).getPropertyValue('--pencil-ink').trim() || '#2B2B2B';
        ctx.strokeStyle = inkColor;
        ctx.lineWidth = 2.5;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
      }
    };

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [isDoodling]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    isDrawingRef.current = true;
    const pos = getPos(e);
    lastPosRef.current = pos;
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const inkColor = window.getComputedStyle(document.documentElement).getPropertyValue('--pencil-ink').trim() || '#2B2B2B';
        ctx.strokeStyle = inkColor;
      }
    }
    pencilSoundEngine.playPencilScribble();
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current || !lastPosRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const currentPos = getPos(e);
    ctx.beginPath();
    ctx.moveTo(lastPosRef.current.x, lastPosRef.current.y);
    ctx.lineTo(currentPos.x, currentPos.y);
    ctx.stroke();

    lastPosRef.current = currentPos;
  };

  const stopDrawing = () => {
    isDrawingRef.current = false;
    lastPosRef.current = null;
  };

  const getPos = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if ('touches' in e && e.touches.length > 0) {
      return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
    const mouseEvent = e as React.MouseEvent<HTMLCanvasElement>;
    return { x: mouseEvent.clientX, y: mouseEvent.clientY };
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <aside className="fixed bottom-4 left-4 z-40 select-none">
        <button
          type="button"
          onClick={() => setIsDoodling((prev) => !prev)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm font-handwriting text-xs sm:text-sm font-bold border-2 border-[#2B2B2B] shadow-xs cursor-pointer transition-all ${
            isDoodling
              ? 'bg-[#E4572E] text-white shadow-[2px_2px_0px_#2B2B2B]'
              : 'bg-[#FFE66D] text-[#2B2B2B] hover:bg-amber-300 shadow-[2px_2px_0px_#2B2B2B]'
          }`}
          title={isDoodling ? 'Stop Doodling' : 'Draw on the notebook!'}
        >
          <span>✎</span>
          <span>{isDoodling ? 'Done Drawing' : 'Doodle on Page'}</span>
        </button>
      </aside>

      {/* Active Doodle Canvas Layer & Controls */}
      <AnimatePresence>
        {isDoodling && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-45"
          >
            {/* Top Toolbar */}
            <div className="absolute top-16 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-[#FBF8EF] border-2 border-[#2B2B2B] px-4 py-2 rounded-xs shadow-[3px_3px_0px_#2B2B2B] font-handwriting">
              <span className="text-xs sm:text-sm font-bold text-stone-800">
                ✎ Draw anywhere on the page!
              </span>
              <button
                type="button"
                onClick={clearCanvas}
                className="px-2.5 py-0.5 bg-stone-200 hover:bg-[#FFE66D] border border-stone-800 rounded-xs text-xs font-bold transition-colors cursor-pointer"
              >
                Erase All ↺
              </button>
              <button
                type="button"
                onClick={() => setIsDoodling(false)}
                className="px-2.5 py-0.5 bg-[#E4572E] hover:bg-red-600 text-white border border-stone-800 rounded-xs text-xs font-bold transition-colors cursor-pointer"
              >
                Close ✕
              </button>
            </div>

            {/* Drawing Canvas */}
            <canvas
              ref={canvasRef}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
              className="absolute inset-0 w-full h-full cursor-crosshair touch-none"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
