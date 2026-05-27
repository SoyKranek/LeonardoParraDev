import { motion } from 'framer-motion';
import { useLocale } from '@/app/providers/LocaleProvider';
import { usePortfolio } from '@/app/providers/PortfolioProvider';
import { Section } from '@/shared/ui/Section';
import { MagneticButton } from '@/shared/ui/effects';

export function ContactSection() {
  const { ui } = useLocale();
  const { data } = usePortfolio();
  if (!data) return null;

  const { contact: contacto, documents: documentos } = data;

  return (
    <Section id="contacto" className="pb-32">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-[2rem] overflow-hidden"
        >
          {/* Borde con gradiente animado */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-violet-500 to-amber-500 opacity-80 animate-pulse-glow" />
          <div className="absolute inset-[2px] rounded-[calc(2rem-2px)] bg-surface-950" />

          <div className="relative p-10 md:p-16 text-center">
            <span className="font-mono text-xs uppercase tracking-[0.35em] text-cyan-400/80 block mb-6">
              {ui.contactIndex}
            </span>

            <h2 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight">
              {contacto.title}
            </h2>
            <p className="text-slate-400 text-lg mb-12 max-w-lg mx-auto">{contacto.description}</p>

            {/* 2 columnas: el texto del email/teléfono no se trunca */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12 max-w-2xl mx-auto">
              {contacto.methods.map((metodo) => (
                <a
                  key={metodo.title}
                  href={metodo.href}
                  target={metodo.external ? '_blank' : undefined}
                  rel={metodo.external ? 'noopener noreferrer' : undefined}
                  className="glass-panel rounded-2xl p-6 min-h-[140px] flex flex-col items-center justify-center hover:border-cyan-400/30 transition-all duration-300 group text-center"
                  data-cursor="pointer"
                >
                  <span className="text-2xl mb-3 block group-hover:scale-110 transition-transform">
                    {metodo.icon}
                  </span>
                  <p className="text-xs font-mono uppercase tracking-widest text-slate-600 mb-2">
                    {metodo.title}
                  </p>
                  <p className="text-sm text-cyan-400 font-medium break-all leading-relaxed px-1">
                    {metodo.value}
                  </p>
                </a>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
              <MagneticButton href={contacto.primaryCta.href} variant="primary" size="lg">
                {contacto.primaryCta.label} ✦
              </MagneticButton>
              {documentos[0] && (
                <MagneticButton
                  href={documentos[0].pdfPath}
                  variant="secondary"
                  size="lg"
                  download={documentos[0].fileName}
                >
                  {ui.downloadCv}
                </MagneticButton>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
