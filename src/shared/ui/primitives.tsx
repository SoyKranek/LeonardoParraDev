import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: 'center' | 'left';
}

export function SectionHeading({ title, subtitle, align = 'center' }: SectionHeadingProps) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left';

  return (
    <div className={`mb-14 max-w-3xl ${alignClass}`}>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold text-gradient mb-4"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-slate-400 text-lg"
        >
          {subtitle}
        </motion.p>
      )}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="mt-6 h-1 w-16 bg-gradient-to-r from-primary-500 via-accent-cyan to-accent-amber rounded-full origin-left mx-auto"
        style={align === 'left' ? { marginLeft: 0 } : undefined}
      />
    </div>
  );
}

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function GlassCard({ children, className = '', hover = true }: GlassCardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -6, scale: 1.01 } : undefined}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`glass rounded-2xl p-6 md:p-8 glow-ring ${className}`}
    >
      {children}
    </motion.div>
  );
}

interface ButtonProps {
  children: ReactNode;
  href?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'md' | 'lg';
  onClick?: () => void;
  external?: boolean;
  download?: string;
}

export function Button({
  children,
  href,
  variant = 'primary',
  size = 'md',
  onClick,
  external,
  download,
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-950';

  const variants = {
    primary:
      'bg-gradient-to-r from-primary-500 to-primary-400 text-white shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 hover:-translate-y-0.5',
    secondary:
      'glass text-primary-400 border-primary-500/30 hover:bg-primary-500/10 hover:-translate-y-0.5',
    ghost: 'text-slate-300 hover:text-white hover:bg-white/5',
  };

  const sizes = {
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  };

  const className = `${base} ${variants[variant]} ${sizes[size]}`;

  if (href) {
    return (
      <motion.a
        href={href}
        className={className}
        whileTap={{ scale: 0.98 }}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        download={download}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button type="button" className={className} onClick={onClick} whileTap={{ scale: 0.98 }}>
      {children}
    </motion.button>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-primary-500/15 text-primary-400 border border-primary-500/20">
      {children}
    </span>
  );
}
