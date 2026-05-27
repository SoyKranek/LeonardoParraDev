import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { portfolioRepository } from '@/shared/repositories/LocalPortfolioRepository';
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
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    portfolioRepository
      .getPortfolio()
      .then((portfolio) => {
        if (mounted) {
          setData(portfolio);
          setLoading(false);
        }
      })
      .catch(() => {
        if (mounted) {
          setError('No se pudo cargar la información del portafolio.');
          setLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

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
