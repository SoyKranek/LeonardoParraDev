import { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '@/app/providers/PortfolioProvider';
import {
  AnimatedCounter,
  MagneticButton,
  RotatingRoles,
} from '@/shared/ui/effects';

const FondoHero = lazy(() =>
  import('@/features/hero/HeroBackground').then((modulo) => ({ default: modulo.HeroBackground })),
);

function RespaldoFondoHero() {
  return (
    <div className="absolute inset-0 lg:left-[40%] overflow-hidden pointer-events-none" aria-hidden>
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-cyan-500/15 rounded-full blur-[100px]" />
    </div>
  );
}

export function HeroSection() {
  const { data: datosPortafolio } = usePortfolio();
  if (!datosPortafolio) return null;

  const hero = datosPortafolio.hero;
  const [nombre, ...apellidos] = hero.title.split(' ');
  const apellido = apellidos.join(' ');

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-16"
    >
      <Suspense fallback={<RespaldoFondoHero />}>
        <FondoHero />
      </Suspense>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
          <div className="max-w-2xl lg:pr-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono uppercase tracking-widest text-slate-400">
                Disponible para proyectos
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.7 }}
              className="text-sm md:text-base font-mono uppercase tracking-[0.25em] text-slate-500 mb-4"
            >
              {hero.greeting}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-[clamp(2.75rem,9vw,6.5rem)] font-black tracking-tighter leading-[0.92] mb-4 hero-glow"
            >
              <span className="block text-white">{nombre}</span>
              {apellido && <span className="block text-gradient">{apellido}</span>}
            </motion.h1>

            {/* Subtítulo y roles en bloques distintos — evita corte en pantallas angostas */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="text-base md:text-lg text-slate-400 mb-2 leading-relaxed"
            >
              {hero.subtitle}
            </motion.p>

            {/* Rol rotativo */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
              className="mb-6"
            >
              <RotatingRoles roles={hero.rotatingRoles} />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 }}
              className="text-lg text-slate-400 leading-relaxed mb-10 max-w-lg"
            >
              {hero.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap gap-4 mb-14"
            >
              <MagneticButton href={hero.primaryCta.href} variant="primary" size="lg">
                {hero.primaryCta.label} →
              </MagneticButton>
              <MagneticButton href={hero.secondaryCta.href} variant="secondary" size="lg">
                {hero.secondaryCta.label}
              </MagneticButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex flex-wrap gap-8 md:gap-12 pt-8 border-t border-white/5"
            >
              {hero.stats.map((stat) => (
                <div key={stat.label}>
                  <AnimatedCounter
                    value={stat.value}
                    className="block text-3xl md:text-4xl font-black text-gradient"
                  />
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-500 mt-1 block">
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="hidden lg:block" aria-hidden />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-slate-600">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-cyan-400/80 to-transparent animate-scroll-hint" />
      </motion.div>
    </section>
  );
}
