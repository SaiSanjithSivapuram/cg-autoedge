'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

type Props = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
};

export default function FadeInUp({ children, delay = 0, className, style }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px 0px' });

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
