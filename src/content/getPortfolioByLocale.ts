import type { AppLocale } from '@/content/ui.strings';
import { portfolioData } from '@/content/portfolio.data';
import { portfolioDataEn } from '@/content/portfolio.data.en';
import type { PortfolioData } from '@/shared/types/portfolio.types';

export function getPortfolioByLocale(locale: AppLocale): PortfolioData {
  return locale === 'en' ? portfolioDataEn : portfolioData;
}
