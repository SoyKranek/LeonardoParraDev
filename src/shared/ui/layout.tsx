import { motion } from 'framer-motion';
import { usePortfolio } from '@/app/providers/PortfolioProvider';
import { useTheme } from '@/app/providers/ThemeProvider';
import { useActiveSection } from '@/shared/hooks/useMediaQuery';
import { useScrolled } from '@/shared/hooks/useMousePosition';

export function ScrollProgressController() {
  return (
    <div
      className="fixed top-0 left-0 h-[2px] bg-gradient-to-r from-cyan-400 via-violet-500 to-amber-400 z-[100] transition-[width] duration-150 shadow-[0_0_12px_rgba(6,182,212,0.6)]"
      id="scroll-progress"
      style={{ width: '0%' }}
      aria-hidden
    />
  );
}

export function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className={
        compact
          ? 'w-9 h-9 rounded-full flex items-center justify-center text-base bg-white/5 border border-white/10 hover:border-cyan-400/40 transition-colors'
          : 'fixed top-5 right-5 z-[90] w-12 h-12 rounded-full glass-panel flex items-center justify-center text-xl'
      }
      aria-label={theme === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'}
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </motion.button>
  );
}

export function SiteHeader() {
  const { data } = usePortfolio();
  const scrolled = useScrolled(60);
  const sectionIds = data?.navigation.map((n) => n.href.replace('#', '')) ?? [];
  const activeId = useActiveSection(sectionIds);

  if (!data) return null;

  return (
    <>
      {/* Logo fijo arriba izquierda — solo visible antes del scroll en desktop */}
      <motion.div
        initial={false}
        animate={{ opacity: scrolled ? 0 : 1, y: scrolled ? -20 : 0 }}
        className="fixed top-6 left-6 z-50 hidden md:block pointer-events-none"
      >
        <span className="text-sm font-black text-gradient">{data.meta.name.split(' ')[0]}</span>
        <span className="text-xs font-mono text-slate-600 block">{data.meta.role}</span>
      </motion.div>

      {/* Nav pill flotante */}
      <motion.header
        initial={false}
        animate={{
          y: scrolled ? 0 : -100,
          opacity: scrolled ? 1 : 0,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-3xl"
      >
        <div className="glass-panel rounded-full px-2 py-2 flex items-center justify-between gap-2 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
          <span className="hidden sm:block pl-4 text-xs font-bold text-gradient truncate max-w-[120px]">
            {data.meta.name}
          </span>

          <nav aria-label="Navegación principal" className="flex-1 overflow-x-auto scrollbar-hide">
            <ul className="flex items-center justify-center gap-0.5 min-w-max mx-auto">
              {data.navigation.map((item) => {
                const sectionId = item.href.replace('#', '');
                const isActive = activeId === sectionId;

                return (
                  <li key={item.id}>
                    <a
                      href={item.href}
                      className={`px-3 py-2 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                        isActive
                          ? 'text-white bg-gradient-to-r from-blue-600/80 to-cyan-500/80 shadow-[0_0_20px_rgba(6,182,212,0.3)]'
                          : 'text-slate-400 hover:text-white hover:bg-white/5'
                      }`}
                      data-cursor="pointer"
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <ThemeToggle compact />
        </div>
      </motion.header>

      {/* Theme toggle visible cuando el nav pill está oculto */}
      {!scrolled && (
        <div className="fixed top-5 right-5 z-[90]">
          <ThemeToggle compact />
        </div>
      )}
    </>
  );
}

export function SiteFooter() {
  const { data } = usePortfolio();
  if (!data) return null;

  return (
    <footer className="relative border-t border-white/5 py-16 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
      <div className="container mx-auto px-6 text-center">
        <p className="text-2xl font-black text-gradient mb-2">{data.meta.name}</p>
        <p className="text-slate-500 text-sm mb-8 font-mono">{data.meta.role}</p>
        <nav className="mb-8 flex flex-wrap justify-center gap-6">
          {data.navigation.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className="text-slate-500 hover:text-cyan-400 text-xs font-mono uppercase tracking-widest transition-colors"
              data-cursor="pointer"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <p className="text-slate-600 text-xs">{data.meta.copyright}</p>
      </div>
    </footer>
  );
}
