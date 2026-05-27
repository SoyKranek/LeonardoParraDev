import { motion } from 'framer-motion';
import { usePortfolio } from '@/app/providers/PortfolioProvider';
import { useIsMobile, usePrefersReducedMotion } from '@/shared/hooks/useMediaQuery';
import { Section } from '@/shared/ui/Section';
import {
  EditorialHeading,
  GlassPanel,
  MagneticButton,
  NeonTag,
  TiltCard,
} from '@/shared/ui/effects';
import type { Project } from '@/shared/types/portfolio.types';

const gradientePorDefecto = 'from-blue-600 via-cyan-500 to-violet-500';

interface TarjetaProyectoProps {
  proyecto: Project;
  indiceAnimacion?: number;
}

function TarjetaProyecto({ proyecto, indiceAnimacion = 0 }: TarjetaProyectoProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: indiceAnimacion * 0.06, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="h-full"
    >
      <TiltCard className="h-full snap-center shrink-0 w-[88vw] md:w-[480px] lg:w-[520px]">
        <GlassPanel className="h-full flex flex-col overflow-hidden p-0">
          <div
            className={`h-32 bg-gradient-to-br ${proyecto.accent ?? gradientePorDefecto} relative overflow-hidden`}
          >
            <div className="absolute inset-0 grid-overlay opacity-20" />
            {proyecto.featured && (
              <span className="absolute top-4 right-4 px-3 py-1 text-[10px] font-mono uppercase tracking-widest rounded-full bg-black/30 text-white backdrop-blur-sm border border-white/20">
                ★ Destacado
              </span>
            )}
            <h3 className="absolute bottom-4 left-6 text-2xl font-black text-white drop-shadow-lg">
              {proyecto.title}
            </h3>
          </div>

          <div className="p-6 md:p-8 flex flex-col flex-1">
            <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-1">
              {proyecto.description}
            </p>

            <div className="mb-6">
              <p className="text-[10px] font-mono uppercase tracking-widest text-slate-600 mb-3">
                Stack
              </p>
              <div className="flex flex-wrap gap-2">
                {proyecto.technologies.map((tech) => (
                  <NeonTag key={tech}>{tech}</NeonTag>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-4 border-t border-white/5">
              {proyecto.links.length > 0 ? (
                proyecto.links.map((link) => (
                  <MagneticButton
                    key={link.url}
                    href={link.url}
                    variant="secondary"
                    external
                    magnetic={false}
                  >
                    {link.label} ↗
                  </MagneticButton>
                ))
              ) : (
                <span className="text-xs font-mono uppercase tracking-widest text-slate-600 px-2 py-2">
                  Proyecto institucional · producción
                </span>
              )}
            </div>
          </div>
        </GlassPanel>
      </TiltCard>
    </motion.div>
  );
}

// Escritorio: carrusel auto + tilt. Móvil: scroll manual.
export function ProjectsSection() {
  const { data: datosPortafolio } = usePortfolio();
  const esMovil = useIsMobile(768);
  const movimientoReducido = usePrefersReducedMotion();

  if (!datosPortafolio) return null;

  const usarCarruselAutomatico = !esMovil && !movimientoReducido;

  return (
    <Section id="proyectos" className="overflow-hidden">
      {datosPortafolio.projectGroups.map((grupo, indiceGrupo) => {
        const proyectosParaMostrar = usarCarruselAutomatico
          ? [...grupo.projects, ...grupo.projects]
          : grupo.projects;

        const duracionSegundos = Math.max(40, grupo.projects.length * 14);

        return (
          <div key={grupo.id} className={indiceGrupo > 0 ? 'mt-32' : ''}>
            <div className="container mx-auto px-6 mb-10">
              <EditorialHeading
                title={grupo.title}
                subtitle={grupo.description}
                index={`0${indiceGrupo + 2} — Proyectos`}
              />
            </div>

            <div
              className={
                usarCarruselAutomatico
                  ? 'overflow-hidden px-6 pb-8 md:px-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))]'
                  : 'flex gap-6 overflow-x-auto snap-x-mandatory scrollbar-hide px-6 pb-8 md:px-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))]'
              }
            >
              <div
                className={
                  usarCarruselAutomatico
                    ? 'flex gap-6 w-max animate-projects-scroll py-1'
                    : 'flex gap-6'
                }
                style={
                  usarCarruselAutomatico
                    ? ({
                        ['--projects-scroll-duration' as string]: `${duracionSegundos}s`,
                      } as React.CSSProperties)
                    : undefined
                }
              >
                {proyectosParaMostrar.map((proyecto, indice) => (
                  <TarjetaProyecto
                    key={`${proyecto.id}-${indice}`}
                    proyecto={proyecto}
                    indiceAnimacion={indice % grupo.projects.length}
                  />
                ))}

                {!usarCarruselAutomatico && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="snap-center shrink-0 w-[280px] flex items-center justify-center"
                  >
                    <GlassPanel className="p-8 text-center h-full flex flex-col items-center justify-center border-dashed border-white/10">
                      <span className="text-4xl mb-4">🚀</span>
                      <p className="text-slate-500 text-sm font-mono">Más proyectos en camino</p>
                    </GlassPanel>
                  </motion.div>
                )}
              </div>
            </div>

            {usarCarruselAutomatico && (
              <p className="text-center text-[10px] font-mono uppercase tracking-widest text-slate-600 mt-2">
                Pasa el cursor sobre una tarjeta para pausar y explorar
              </p>
            )}
          </div>
        );
      })}
    </Section>
  );
}
