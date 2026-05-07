'use client';

import { motion } from 'framer-motion';

interface FadeSlideProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export function FadeSlide({ children, delay = 0, className }: FadeSlideProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{
        duration: 0.35,
        ease: [0.22, 0.61, 0.36, 1], // Premium SaaS cubic-bezier
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}
