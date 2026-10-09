'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface ProductCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  children,
  className = '',
  onClick,
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      onClick={onClick}
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
      className={`relative rounded-2xl border border-[#e5e5e5] bg-white/80 backdrop-blur-sm transition-all duration-300 hover:border-[#3248C3]/30 hover:shadow-xl hover:shadow-[#3248C3]/5 overflow-hidden ${className}`}
    >
      {children}
    </motion.div>
  );
};
