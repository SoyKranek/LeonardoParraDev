import { useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export type TipoDocumentoVisor = 'pdf' | 'pagina';

export interface DocumentoEnVisor {
  titulo: string;
  subtitulo?: string;
  url: string;
  tipo: TipoDocumentoVisor;
  nombreArchivo?: string;
}

interface VisorDocumentoModalProps {
  documento: DocumentoEnVisor | null;
  abierto: boolean;
  onCerrar: () => void;
}

export function VisorDocumentoModal({ documento, abierto, onCerrar }: VisorDocumentoModalProps) {
  const manejarEscape = useCallback(
    (evento: KeyboardEvent) => {
      if (evento.key === 'Escape') onCerrar();
    },
    [onCerrar],
  );

  useEffect(() => {
    if (!abierto) return;

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', manejarEscape);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', manejarEscape);
    };
  }, [abierto, manejarEscape]);

  const esPdf = documento?.tipo === 'pdf';
  const urlIframe = esPdf ? `${documento?.url}#view=FitH&toolbar=1` : documento?.url;

  return (
    <AnimatePresence>
      {abierto && documento && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="visor-documento-titulo"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-6"
        >
          {/* Capa oscura — clic fuera cierra */}
          <button
            type="button"
            aria-label="Cerrar visor"
            className="absolute inset-0 bg-surface-950/90 backdrop-blur-md"
            onClick={onCerrar}
          />

          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-6xl h-[92vh] sm:h-[88vh] flex flex-col rounded-t-3xl sm:rounded-3xl overflow-hidden border border-white/10 bg-surface-950 shadow-[0_0_80px_rgba(6,182,212,0.12)]"
          >
            {/* Barra superior */}
            <header className="flex-shrink-0 flex flex-wrap items-center gap-3 px-5 py-4 border-b border-white/10 bg-surface-900/80 backdrop-blur-xl">
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-cyan-400/80 mb-1">
                  {esPdf ? 'Visor de documento' : 'Credencial verificada'}
                </p>
                <h2
                  id="visor-documento-titulo"
                  className="text-lg sm:text-xl font-bold text-white truncate"
                >
                  {documento.titulo}
                </h2>
                {documento.subtitulo && (
                  <p className="text-sm text-slate-500 truncate">{documento.subtitulo}</p>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {esPdf && documento.nombreArchivo && (
                  <a
                    href={documento.url}
                    download={documento.nombreArchivo}
                    className="px-4 py-2 rounded-full text-xs font-semibold border border-white/15 bg-white/5 text-slate-200 hover:border-cyan-400/40 hover:text-white transition-colors"
                  >
                    Descargar
                  </a>
                )}
                <a
                  href={documento.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full text-xs font-semibold border border-white/15 bg-white/5 text-slate-200 hover:border-cyan-400/40 hover:text-white transition-colors"
                >
                  Abrir en pestaña ↗
                </a>
                <button
                  type="button"
                  onClick={onCerrar}
                  className="w-10 h-10 rounded-full border border-white/15 bg-white/5 text-slate-300 hover:text-white hover:border-rose-400/40 transition-colors flex items-center justify-center"
                  aria-label="Cerrar"
                >
                  ✕
                </button>
              </div>
            </header>

            {/* Contenedor del iframe */}
            <div className="flex-1 min-h-0 relative bg-surface-900">
              {!esPdf && (
                <p className="absolute top-3 left-1/2 -translate-x-1/2 z-10 text-xs text-slate-500 bg-surface-950/90 px-4 py-2 rounded-full border border-white/10 pointer-events-none">
                  Si la credencial no carga aquí, usa «Abrir en pestaña».
                </p>
              )}
              <iframe
                title={documento.titulo}
                src={urlIframe}
                className="absolute inset-0 w-full h-full border-0 bg-white"
                loading="lazy"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
