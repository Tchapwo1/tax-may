'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect } from 'react';

interface AnimatedNumberProps {
  value: number;
  format?: (n: number) => string;
  className?: string;
}

export function AnimatedNumber({
  value,
  format = (n) => '£' + Math.round(n).toLocaleString('en-GB'),
  className,
}: AnimatedNumberProps) {
  const motionValue = useMotionValue(value);
  const spring = useSpring(motionValue, {
    stiffness: 120,
    damping: 20,
    mass: 0.4,
  });

  const display = useTransform(spring, (latest) => format(latest));

  useEffect(() => {
    motionValue.set(value);
  }, [value]);

  return (
    <motion.span className={className}>
      {display}
    </motion.span>
  );
}
