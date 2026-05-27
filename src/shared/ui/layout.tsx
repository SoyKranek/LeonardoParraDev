import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useLocale } from '@/app/providers/LocaleProvider';
import { usePortfolio } from '@/app/providers/PortfolioProvider';
import { useTheme } from '@/app/providers/ThemeProvider';
import { useActiveSection, useIsMobile } from '@/shared/hooks/useMediaQuery';
import { useScrolled } from '@/shared/hooks/useMousePosition';
import { FlagSpain, FlagUnitedKingdom } from '@/shared/ui/FlagIcons';

const btnCompacto =
  'w-9 h-9 shrink-0 rounded-full flex items-center justify-center text-base bg-white/5 border border-white/10 hover:border-cyan-400/40 transition-colors touch-manipulation';

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
  const { ui } = useLocale();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`${compact ? btnCompacto : 'fixed top-5 right-5 z-[90] w-12 h-12 rounded-full glass-panel flex items-center justify-center text-xl touch-manipulation active:scale-95 transition-transform'} cursor-pointer`}
      aria-label={theme === 'dark' ? ui.themeToLight : ui.themeToDark}
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  );
}

export function LanguageToggle({ compact = true }: { compact?: boolean }) {
  const { locale, setLocale, ui } = useLocale();

  const boton = (codigo: 'es' | 'en', bandera: ReactNode, etiqueta: string) => {
    const activo = locale === codigo;
    return (
      <button
        type="button"
        onClick={() => setLocale(codigo)}
        aria-label={etiqueta}
        aria-pressed={activo}
        title={etiqueta}
        className={`${compact ? 'w-9 h-9' : 'w-10 h-10'} shrink-0 rounded-full flex items-center justify-center border transition-colors touch-manipulation overflow-hidden ${
          activo
            ? 'border-cyan-400/60 bg-cyan-500/15 ring-1 ring-cyan-400/30'
            : 'border-white/10 bg-white/5 opacity-80 hover:opacity-100 hover:border-cyan-400/30'
        }`}
      >
        <span className="flex items-center justify-center rounded-[2px] shadow-sm ring-1 ring-black/10">
          {bandera}
        </span>
      </button>
    );
  };

  const tamanoBandera = compact ? 'w-[22px] h-[15px]' : 'w-6 h-4';

  return (
    <div
      className="flex items-center gap-1"
      role="group"
      aria-label={ui.langSwitch}
    >
      {boton('es', <FlagSpain className={tamanoBandera} title={ui.langEs} />, ui.langEs)}
      {boton(
        'en',
        <FlagUnitedKingdom className={tamanoBandera} title={ui.langEn} />,
        ui.langEn,
      )}
    </div>
  );
}

function NavLinks({
  navigation,
  activeId,
  compact = false,
}: {
  navigation: { id: string; label: string; href: string }[];
  activeId: string;
  compact?: boolean;
}) {
  return (
    <ul
      className={`flex items-center ${compact ? 'gap-1 min-w-max' : 'justify-center gap-0.5 min-w-max mx-auto'}`}
    >
      {navigation.map((item) => {
        const sectionId = item.href.replace('#', '');
        const isActive = activeId === sectionId;

        return (
          <li key={item.id}>
            <a
              href={item.href}
              className={`rounded-full font-medium transition-all whitespace-nowrap ${
                compact ? 'px-3 py-2 text-[11px]' : 'px-3 py-2 text-xs'
              } ${
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
  );
}

function MobileBottomNav({
  navigation,
  activeId,
}: {
  navigation: { id: string; label: string; href: string }[];
  activeId: string;
}) {
  const { ui } = useLocale();

  return (
    <nav
      aria-label={ui.navLabel}
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2 pointer-events-none"
    >
      <div className="glass-panel rounded-2xl px-2 py-2 flex items-center gap-2 shadow-[0_8px_32px_rgba(0,0,0,0.5)] pointer-events-auto max-w-lg mx-auto">
        <div className="flex-1 overflow-x-auto scrollbar-hide">
          <NavLinks navigation={navigation} activeId={activeId} compact />
        </div>
        <LanguageToggle />
        <ThemeToggle compact />
      </div>
    </nav>
  );
}

export function SiteHeader() {
  const { data } = usePortfolio();
  const { ui } = useLocale();
  const scrolled = useScrolled(60);
  const esMovil = useIsMobile(768);
  const sectionIds = data?.navigation.map((n) => n.href.replace('#', '')) ?? [];
  const activeId = useActiveSection(sectionIds);

  if (!data) return null;

  return (
    <>
      {esMovil && <MobileBottomNav navigation={data.navigation} activeId={activeId} />}

      {!esMovil && (
        <motion.div
          initial={false}
          animate={{ opacity: scrolled ? 0 : 1, y: scrolled ? -20 : 0 }}
          className="fixed top-6 left-6 z-50 hidden md:block pointer-events-none"
        >
          <span className="text-sm font-black text-gradient">{data.meta.name.split(' ')[0]}</span>
          <span className="text-xs font-mono text-slate-600 block">{data.meta.role}</span>
        </motion.div>
      )}

      <motion.header
        initial={false}
        animate={
          esMovil ? { y: 0, opacity: 1 } : { y: scrolled ? 0 : -100, opacity: scrolled ? 1 : 0 }
        }
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-3xl ${
          esMovil ? 'hidden md:block' : ''
        }`}
      >
        <div className="glass-panel rounded-full px-2 py-2 flex items-center justify-between gap-2 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
          <span className="hidden sm:block pl-4 text-xs font-bold text-gradient truncate max-w-[120px]">
            {data.meta.name}
          </span>

          <nav aria-label={ui.navLabel} className="flex-1 overflow-x-auto scrollbar-hide">
            <NavLinks navigation={data.navigation} activeId={activeId} />
          </nav>

          <LanguageToggle />
          <ThemeToggle compact />
        </div>
      </motion.header>

      {!esMovil && !scrolled && (
        <div className="fixed top-5 right-5 z-[90] hidden md:flex items-center gap-2">
          <LanguageToggle />
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
    <footer className="relative border-t border-white/5 py-16 pb-28 md:pb-16 overflow-hidden">
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
