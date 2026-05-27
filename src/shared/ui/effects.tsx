import { useEffect, useRef, useState, type ReactNode } from 'react';
import { AnimatePresence, motion, useSpring } from 'framer-motion';
import { useMousePosition } from '@/shared/hooks/useMousePosition';
import { useIsMobile, usePrefersReducedMotion, useLowPowerDevice } from '@/shared/hooks/useMediaQuery';

interface AnimatedCounterProps {
  value: string;
  className?: string;
}

export function AnimatedCounter({ value, className = '' }: AnimatedCounterProps) {
  const match = value.match(/^(\d+)(.*)$/);
  const num = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : value;
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStarted(true);
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started || num === 0) return;

    let frame: number;
    const duration = 1800;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(num * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [started, num]);

  return (
    <span ref={ref} className={className}>
      {num > 0 ? `${display}${suffix}` : value}
    </span>
  );
}

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  glow?: string;
  enabled?: boolean;
  anchoMaximoMovil?: number;
}

export function TiltCard({
  children,
  className = '',
  glow = 'rgba(37,99,235,0.25)',
  enabled = true,
  anchoMaximoMovil = 768,
}: TiltCardProps) {
  const reduced = usePrefersReducedMotion();
  const mobile = useIsMobile(anchoMaximoMovil);
  const ref = useRef<HTMLDivElement>(null);
  const activo = enabled && !reduced && !mobile;

  const rotateX = useSpring(0, { stiffness: 280, damping: 26 });
  const rotateY = useSpring(0, { stiffness: 280, damping: 26 });

  const manejarMovimiento = (e: React.MouseEvent) => {
    if (!activo || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const posX = (e.clientX - rect.left) / rect.width - 0.5;
    const posY = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(posX * 14);
    rotateX.set(-posY * 14);
  };

  const manejarSalida = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  const contenido = (
    <>
      {activo && (
        <div
          className="absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10 pointer-events-none"
          style={{ background: glow }}
        />
      )}
      {children}
    </>
  );

  if (!activo) {
    return <div className={`relative group ${className}`}>{contenido}</div>;
  }

  return (
    <div className={`relative ${className}`} style={{ perspective: 1200 }}>
      <motion.div
        ref={ref}
        onMouseMove={manejarMovimiento}
        onMouseLeave={manejarSalida}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        whileHover={{ y: -6 }}
        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
        className="relative group h-full"
      >
        {contenido}
      </motion.div>
    </div>
  );
}

interface MagneticButtonProps {
  children: ReactNode;
  href?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'md' | 'lg';
  external?: boolean;
  download?: string;
  onClick?: () => void;
  magnetic?: boolean;
}

export function MagneticButton({
  children,
  href,
  variant = 'primary',
  size = 'md',
  external,
  download,
  onClick,
  magnetic = true,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useSpring(0, { stiffness: 300, damping: 20 });
  const y = useSpring(0, { stiffness: 300, damping: 20 });
  const mobile = useIsMobile();
  const useMagnetic = magnetic && !mobile;

  const handleMove = (e: React.MouseEvent) => {
    if (!useMagnetic || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.2);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.2);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  const base =
    'relative inline-flex items-center justify-center font-semibold rounded-full overflow-hidden transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400';

  const variants = {
    primary:
      'bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-500 text-white shadow-[0_0_40px_rgba(6,182,212,0.35)] hover:shadow-[0_0_60px_rgba(6,182,212,0.5)]',
    secondary:
      'border border-white/20 bg-white/5 text-white backdrop-blur-md hover:bg-white/10 hover:border-cyan-400/40',
    ghost: 'text-slate-300 hover:text-white',
  };

  const sizes = { md: 'px-7 py-3.5 text-sm', lg: 'px-9 py-4 text-base' };
  const className = `${base} ${variants[variant]} ${sizes[size]}`;

  const content = (
    <>
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
      <span className="relative z-10">{children}</span>
    </>
  );

  const propsComunes = {
    style: { x, y },
    onMouseMove: handleMove,
    onMouseLeave: handleLeave,
    className: `group ${className}`,
    whileTap: { scale: 0.96 as const },
    'data-cursor': 'pointer' as const,
  };

  if (onClick) {
    return (
      <motion.button type="button" onClick={onClick} {...propsComunes}>
        {content}
      </motion.button>
    );
  }

  return (
    <motion.a
      ref={ref}
      href={href ?? '#'}
      {...propsComunes}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      download={download}
    >
      {content}
    </motion.a>
  );
}

export function RotatingRoles({ roles }: { roles: string[] }) {
  const [indiceActivo, setIndiceActivo] = useState(0);

  useEffect(() => {
    const temporizador = setInterval(
      () => setIndiceActivo((indice) => (indice + 1) % roles.length),
      2800,
    );
    return () => clearInterval(temporizador);
  }, [roles.length]);

  const rolActual = roles[indiceActivo];

  return (
    <span className="block w-full max-w-xl min-h-[1.75rem] relative" aria-live="polite">
      <AnimatePresence mode="wait">
        <motion.span
          key={rolActual}
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -16, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="block text-cyan-400 font-mono text-sm md:text-base leading-snug break-words"
        >
          {rolActual}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function TechMarquee({ items }: { items: string[] }) {
  const doubled = [...items, ...items];

  return (
    <div className="relative overflow-hidden border-y border-white/5 bg-black/30 py-5">
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-surface-950 to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-surface-950 to-transparent z-10" />
      <div className="flex animate-marquee whitespace-nowrap">
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="mx-8 text-xs font-mono uppercase tracking-[0.25em] text-slate-500 flex items-center gap-8"
          >
            <span className="w-1 h-1 rounded-full bg-cyan-400" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export function AmbientBackground() {
  const { x, y } = useMousePosition();
  const reduced = usePrefersReducedMotion();
  const lowPower = useLowPowerDevice();

  return (
    <div className="fixed inset-0 -z-50 pointer-events-none overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-surface-950" />
      <div className="absolute inset-0 mesh-gradient" />

      {!reduced && !lowPower && (
        <div
          className="absolute w-[520px] h-[520px] rounded-full blur-[100px] opacity-20 will-change-[left,top]"
          style={{
            left: `${x * 100}%`,
            top: `${y * 100}%`,
            transform: 'translate(-50%, -50%)',
            background:
              'radial-gradient(circle, rgba(6,182,212,0.45) 0%, rgba(139,92,246,0.15) 45%, transparent 70%)',
          }}
        />
      )}

      <div className="absolute inset-0 grid-overlay opacity-[0.03]" />
    </div>
  );
}

export function CustomCursor() {
  const mobile = useIsMobile(1024);
  const reduced = usePrefersReducedMotion();
  const lowPower = useLowPowerDevice();
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const rafRef = useRef<number>(0);
  const pendingRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (mobile || reduced || lowPower) return;

    document.body.classList.add('custom-cursor-active');

    const onMove = (e: MouseEvent) => {
      pendingRef.current = { x: e.clientX, y: e.clientY };
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        setPos(pendingRef.current);
        rafRef.current = 0;
      });
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setHovering(!!target.closest('a, button, [data-cursor="pointer"]'));
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver, { passive: true });
    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [mobile, reduced, lowPower]);

  if (mobile || reduced || lowPower) return null;

  return (
    <>
      <div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-cyan-300 rounded-full pointer-events-none z-[9999]"
        style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
      />
      <div
        className={`fixed top-0 left-0 rounded-full border pointer-events-none z-[9998] transition-all duration-200 ${
          hovering ? 'w-14 h-14 border-cyan-400/60 bg-cyan-400/5' : 'w-9 h-9 border-white/25'
        }`}
        style={{
          transform: `translate(${pos.x - (hovering ? 28 : 18)}px, ${pos.y - (hovering ? 28 : 18)}px)`,
        }}
      />
    </>
  );
}

export function EditorialHeading({
  title,
  subtitle,
  index,
  align = 'left',
}: {
  title: string;
  subtitle?: string;
  index: string;
  align?: 'center' | 'left';
}) {
  const words = title.split(' ');

  return (
    <div className={`mb-16 ${align === 'center' ? 'text-center mx-auto max-w-3xl' : 'max-w-4xl'}`}>
      <motion.span
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="font-mono text-xs uppercase tracking-[0.35em] text-cyan-400/80 block mb-4"
      >
        {index}
      </motion.span>
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter text-white mb-5 leading-[0.95]"
      >
        {words.map((word, i) => (
          <span key={word + i}>
            {i > 0 && ' '}
            {i >= words.length - 1 ? <span className="text-gradient">{word}</span> : word}
          </span>
        ))}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-2xl"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}

export function GlassPanel({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`glass-panel rounded-3xl ${className}`}>{children}</div>;
}

export function NeonTag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block px-3 py-1 text-[11px] font-mono uppercase tracking-wider rounded-md bg-white/5 text-cyan-300/90 border border-white/10">
      {children}
    </span>
  );
}
