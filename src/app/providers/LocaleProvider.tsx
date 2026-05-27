import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { type AppLocale, uiStrings, type UiStrings } from '@/content/ui.strings';

interface LocaleContextValue {
  locale: AppLocale;
  setLocale: (locale: AppLocale) => void;
  ui: UiStrings;
}

const LocaleContext = createContext<LocaleContextValue | undefined>(undefined);

const STORAGE_KEY = 'portfolio-locale';

function leerLocaleGuardado(): AppLocale {
  if (typeof localStorage === 'undefined') return 'es';
  const guardado = localStorage.getItem(STORAGE_KEY);
  return guardado === 'en' ? 'en' : 'es';
}

function aplicarLocaleEnDocumento(locale: AppLocale) {
  document.documentElement.lang = locale === 'en' ? 'en' : 'es';
  document.documentElement.dataset.locale = locale;
}

interface LocaleProviderProps {
  children: ReactNode;
}

export function LocaleProvider({ children }: LocaleProviderProps) {
  const [locale, setLocaleState] = useState<AppLocale>(leerLocaleGuardado);

  useEffect(() => {
    aplicarLocaleEnDocumento(locale);
    localStorage.setItem(STORAGE_KEY, locale);
  }, [locale]);

  const setLocale = useCallback((nuevo: AppLocale) => {
    setLocaleState(nuevo);
  }, []);

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      ui: uiStrings[locale],
    }),
    [locale, setLocale],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useLocale debe usarse dentro de LocaleProvider');
  }
  return context;
}
