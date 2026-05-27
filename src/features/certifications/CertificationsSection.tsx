import { useMemo, useState } from 'react';
import { usePortfolio } from '@/app/providers/PortfolioProvider';
import { Section } from '@/shared/ui/Section';
import {
  EditorialHeading,
  GlassPanel,
  MagneticButton,
  NeonTag,
  TiltCard,
} from '@/shared/ui/effects';
import {
  VisorDocumentoModal,
  type DocumentoEnVisor,
} from '@/shared/ui/VisorDocumentoModal';
import type { Certification, CertificationCategory } from '@/shared/types/portfolio.types';

const etiquetasCategoria: Record<CertificationCategory, string> = {
  tecnologia: 'Tecnología',
  metodologias: 'Metodologías',
  cloud: 'Cloud',
  idiomas: 'Idiomas',
  otros: 'Otros',
};

export function CertificationsSection() {
  const { data: datosPortafolio } = usePortfolio();
  const [mostrarTodas, setMostrarTodas] = useState(false);
  const [documentoEnVisor, setDocumentoEnVisor] = useState<DocumentoEnVisor | null>(null);
  const [visorAbierto, setVisorAbierto] = useState(false);

  const certificacionesVisibles = useMemo(() => {
    if (!datosPortafolio) return [];
    if (mostrarTodas) return datosPortafolio.certifications;
    return datosPortafolio.certifications.filter((cert) => cert.featured);
  }, [datosPortafolio, mostrarTodas]);

  const abrirVisor = (documento: DocumentoEnVisor) => {
    setDocumentoEnVisor(documento);
    setVisorAbierto(true);
  };

  const cerrarVisor = () => {
    setVisorAbierto(false);
    setDocumentoEnVisor(null);
  };

  const visorDesdeCertificacion = (certificacion: Certification): DocumentoEnVisor | null => {
    if (certificacion.pdfPath) {
      return {
        titulo: certificacion.title,
        subtitulo: `${certificacion.issuer} · ${certificacion.date}`,
        url: certificacion.pdfPath,
        tipo: 'pdf',
        nombreArchivo: `${certificacion.title.replace(/\s+/g, '_')}.pdf`,
      };
    }
    if (certificacion.credentialUrl) {
      return {
        titulo: certificacion.title,
        subtitulo: `${certificacion.issuer} · ${certificacion.date}`,
        url: certificacion.credentialUrl,
        tipo: 'pagina',
      };
    }
    return null;
  };

  if (!datosPortafolio) return null;

  const cantidadOcultas =
    datosPortafolio.certifications.length - certificacionesVisibles.length;
  const totalConDocumento = datosPortafolio.certifications.filter(
    (c) => c.pdfPath || c.credentialUrl,
  ).length;

  return (
    <>
      <Section id="certificaciones">
        <div className="container mx-auto px-6 max-w-6xl">
          <EditorialHeading
            title="Credenciales y documentos"
            subtitle={`${datosPortafolio.certifications.length} certificaciones activas · ${totalConDocumento} verificables desde el navegador.`}
            index="04 — Certificaciones"
          />

          {/* CV y carta de presentación */}
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {datosPortafolio.documents.map((documento) => (
              <TiltCard key={documento.id} enabled={false} className="h-full">
                <GlassPanel className="p-8 h-full relative overflow-hidden">
                  <span className="text-4xl mb-4 block">{documento.id === 'cv' ? '📄' : '✉️'}</span>
                  <h3 className="text-2xl font-bold text-white mb-2">{documento.title}</h3>
                  <p className="text-slate-500 text-sm mb-8">{documento.description}</p>
                  <div className="flex flex-wrap gap-3">
                    <MagneticButton
                      variant="primary"
                      magnetic={false}
                      onClick={() =>
                        abrirVisor({
                          titulo: documento.title,
                          subtitulo: documento.description,
                          url: documento.pdfPath,
                          tipo: 'pdf',
                          nombreArchivo: documento.fileName,
                        })
                      }
                    >
                      Ver documento
                    </MagneticButton>
                    <MagneticButton
                      href={documento.pdfPath}
                      variant="secondary"
                      download={documento.fileName}
                      magnetic={false}
                    >
                      Descargar
                    </MagneticButton>
                  </div>
                </GlassPanel>
              </TiltCard>
            ))}
          </div>

          {/* Grid de certificaciones */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {certificacionesVisibles.map((certificacion) => {
              const payloadVisor = visorDesdeCertificacion(certificacion);
              const tieneDocumento = Boolean(payloadVisor);

              return (
                <GlassPanel key={certificacion.id} className="p-5 h-full flex flex-col">
                  <div className="flex flex-wrap gap-2 mb-2">
                    <NeonTag>{etiquetasCategoria[certificacion.category]}</NeonTag>
                    {certificacion.pdfPath && (
                      <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400/90 px-2 py-0.5 rounded border border-emerald-400/20">
                        PDF
                      </span>
                    )}
                    {certificacion.credentialUrl && !certificacion.pdfPath && (
                      <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400/90 px-2 py-0.5 rounded border border-cyan-400/20">
                        En línea
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-bold text-white mt-2 mb-1 leading-snug">
                    {certificacion.title}
                  </h3>
                  <p className="text-sm text-slate-500">{certificacion.issuer}</p>
                  <p className="text-xs font-mono text-slate-600 mt-1 mb-4">{certificacion.date}</p>
                  {tieneDocumento && payloadVisor && (
                    <div className="mt-auto flex flex-wrap gap-2">
                      <MagneticButton
                        variant="secondary"
                        magnetic={false}
                        onClick={() => abrirVisor(payloadVisor)}
                      >
                        {certificacion.pdfPath ? 'Ver diploma' : 'Ver credencial'}
                      </MagneticButton>
                      {certificacion.pdfPath && (
                        <MagneticButton
                          href={certificacion.pdfPath}
                          variant="ghost"
                          download={`${certificacion.title.replace(/\s+/g, '_')}.pdf`}
                          magnetic={false}
                        >
                          Descargar
                        </MagneticButton>
                      )}
                      {certificacion.credentialUrl && (
                        <MagneticButton
                          href={certificacion.credentialUrl}
                          variant="ghost"
                          external
                          magnetic={false}
                        >
                          Abrir ↗
                        </MagneticButton>
                      )}
                    </div>
                  )}
                </GlassPanel>
              );
            })}
          </div>

          {!mostrarTodas && cantidadOcultas > 0 && (
            <div className="text-center mt-10">
              <button
                type="button"
                onClick={() => setMostrarTodas(true)}
                className="px-6 py-3 rounded-full glass-panel text-sm font-mono uppercase tracking-widest text-slate-400 hover:text-white hover:border-cyan-400/30 transition-colors"
                data-cursor="pointer"
              >
                Ver las {cantidadOcultas} certificaciones restantes
              </button>
            </div>
          )}
        </div>
      </Section>

      <VisorDocumentoModal
        documento={documentoEnVisor}
        abierto={visorAbierto}
        onCerrar={cerrarVisor}
      />
    </>
  );
}
