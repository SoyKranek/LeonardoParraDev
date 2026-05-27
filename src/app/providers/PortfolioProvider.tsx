import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { getPortfolioByLocale } from '@/content/getPortfolioByLocale';
import { useLocale } from '@/app/providers/LocaleProvider';
import type { PortfolioData } from '@/shared/types/portfolio.types';

interface PortfolioContextValue {
  data: PortfolioData | null;
  loading: boolean;
  error: string | null;
}

const PortfolioContext = createContext<PortfolioContextValue | undefined>(undefined);

interface PortfolioProviderProps {
  children: ReactNode;
}

export function PortfolioProvider({ children }: PortfolioProviderProps) {
  const { locale, ui } = useLocale();
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);

    const timer = window.setTimeout(() => {
      if (!mounted) return;
      try {
        setData(getPortfolioByLocale(locale));
        setLoading(false);
      } catch {
        setError(ui.loadError);
        setLoading(false);
      }
    }, 0);

    return () => {
      mounted = false;
      window.clearTimeout(timer);
    };
  }, [locale, ui.loadError]);

  useEffect(() => {
    if (!data) return;
    document.title = `${data.meta.name} — ${data.meta.role.split('·')[0].trim()}`;
  }, [data]);

  const value = useMemo(
    () => ({ data, loading, error }),
    [data, loading, error],
  );

  return (
    <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio debe usarse dentro de PortfolioProvider');
  }
  return context;
}
