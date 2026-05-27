import { useState } from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '@/app/providers/PortfolioProvider';
import { Section } from '@/shared/ui/Section';
import { EditorialHeading, GlassPanel } from '@/shared/ui/effects';

export function SkillsSection() {
  const { data: datosPortafolio } = usePortfolio();
  const [idHabilidadActiva, setIdHabilidadActiva] = useState<string | null>(null);

  if (!datosPortafolio) return null;

  const habilidades = datosPortafolio.skills;
  const habilidadSeleccionada =
    habilidades.skills.find((h) => h.id === idHabilidadActiva) ?? habilidades.skills[0];

  return (
    <Section id="habilidades" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-violet-950/20 via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl relative">
        <EditorialHeading
          title={habilidades.title}
          subtitle={habilidades.intro}
          index="03 — Habilidades"
        />

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
            {habilidades.skills.map((habilidad, indice) => (
              <motion.button
                key={habilidad.id}
                type="button"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: indice * 0.05 }}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIdHabilidadActiva(habilidad.id)}
                className={`relative px-5 py-3 rounded-2xl font-mono text-sm transition-all duration-300 border ${
                  habilidadSeleccionada?.id === habilidad.id
                    ? 'bg-gradient-to-r ' +
                      habilidad.color +
                      ' text-white border-transparent shadow-lg shadow-cyan-500/20'
                    : 'glass-panel text-slate-400 border-white/10 hover:border-cyan-400/30 hover:text-white'
                }`}
                data-cursor="pointer"
              >
                {habilidad.name.split('/')[0].trim()}
                {habilidadSeleccionada?.id === habilidad.id && (
                  <span className="absolute inset-0 rounded-2xl bg-white/10 pointer-events-none" />
                )}
              </motion.button>
            ))}
          </div>

          <motion.div
            key={habilidadSeleccionada?.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <GlassPanel className="p-8 md:p-10">
              <div className="flex justify-between items-start mb-6 gap-4">
                <div className="min-w-0">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-1 break-words">
                    {habilidadSeleccionada?.name}
                  </h3>
                  <p className="text-sm text-slate-500">{habilidadSeleccionada?.indicator}</p>
                </div>
                <span className="text-4xl font-black text-gradient shrink-0">
                  {habilidadSeleccionada?.level}%
                </span>
              </div>

              <div className="h-2 bg-white/5 rounded-full overflow-hidden mb-8">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${habilidadSeleccionada?.level}%` }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                  className={`h-full rounded-full bg-gradient-to-r ${habilidadSeleccionada?.color}`}
                />
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-widest text-slate-600 mb-3">
                    {habilidades.otherSkillsTitle}
                  </h4>
                  <ul className="space-y-2">
                    {habilidades.otherSkills.slice(0, 5).map((item) => (
                      <li key={item} className="text-sm text-slate-400 flex gap-2">
                        <span className="text-cyan-400 shrink-0">▸</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs font-mono uppercase tracking-widest text-slate-600 mb-3">
                    {habilidades.learningTitle}
                  </h4>
                  <ul className="space-y-2">
                    {habilidades.learningItems.map((item) => (
                      <li key={item} className="text-sm text-slate-400 flex gap-2">
                        <span className="text-violet-400 shrink-0">◆</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </GlassPanel>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
