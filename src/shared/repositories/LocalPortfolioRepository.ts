import { portfolioData } from '@/content/portfolio.data';
import type { PortfolioData, PortfolioRepository } from '@/shared/types/portfolio.types';

// Hoy lee portfolio.data.ts; la interfaz queda lista por si un día hay API.
export class LocalPortfolioRepository implements PortfolioRepository {
  async getPortfolio(): Promise<PortfolioData> {
    return portfolioData;
  }
}

export const portfolioRepository: PortfolioRepository = new LocalPortfolioRepository();
