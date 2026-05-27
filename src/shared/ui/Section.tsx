import { motion, type HTMLMotionProps } from 'framer-motion';
import { forwardRef } from 'react';

interface SectionProps extends HTMLMotionProps<'section'> {
  id?: string;
  className?: string;
}

export const Section = forwardRef<HTMLElement, SectionProps>(
  ({ children, className = '', ...props }, ref) => (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`py-24 md:py-32 ${className}`}
      {...props}
    >
      {children}
    </motion.section>
  ),
);

Section.displayName = 'Section';
