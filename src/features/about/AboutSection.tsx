import { motion } from 'framer-motion';
import { usePortfolio } from '@/app/providers/PortfolioProvider';
import { Section } from '@/shared/ui/Section';
import { EditorialHeading, GlassPanel } from '@/shared/ui/effects';

export function AboutSection() {
  const { data } = usePortfolio();
  if (!data) return null;

  const { about } = data;

  return (
    <Section id="sobre-mi" className="relative">
      <div className="container mx-auto px-6 max-w-6xl">
        <EditorialHeading title={about.title} subtitle={about.intro} index="01 — Sobre mí" />

        <div className="grid md:grid-cols-12 gap-4 md:gap-6">
          {/* Cita grande — ocupa 2 columnas en desktop */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="md:col-span-7"
          >
            <GlassPanel className="p-8 md:p-10 h-full relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl group-hover:bg-cyan-500/20 transition-colors duration-700" />
              <p className="text-2xl md:text-3xl font-light text-white leading-snug mb-8 relative z-10">
                "{about.quote.text}"
              </p>
              <cite className="text-sm font-mono text-slate-500 not-italic relative z-10">
                {about.quote.author}
              </cite>
            </GlassPanel>
          </motion.div>

          {/* Texto body */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-5"
          >
            <GlassPanel className="p-8 h-full flex flex-col justify-center">
              <p className="text-slate-400 leading-relaxed text-lg">{about.body}</p>
            </GlassPanel>
          </motion.div>

          {/* Valores — grid 2x2 */}
          {about.values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="md:col-span-3"
            >
              <GlassPanel className="p-6 h-full group hover:border-cyan-400/20 transition-colors duration-500">
                <span className="text-3xl mb-4 block group-hover:scale-110 transition-transform duration-300">
                  {value.icon}
                </span>
                <h3 className="font-bold text-white mb-2">{value.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{value.description}</p>
              </GlassPanel>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
