import { useEffect, useState } from 'react';

function leerMatchMedia(query: string): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia(query).matches;
}

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(() =>
    leerMatchMedia('(prefers-reduced-motion: reduce)'),
  );

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);

    const handler = (event: MediaQueryListEvent) => setReduced(event.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return reduced;
}

export function useIsMobile(breakpoint = 768): boolean {
  const query = `(max-width: ${breakpoint - 1}px)`;
  const [isMobile, setIsMobile] = useState(() => leerMatchMedia(query));

  useEffect(() => {
    const mq = window.matchMedia(query);
    setIsMobile(mq.matches);

    const handler = (event: MediaQueryListEvent) => setIsMobile(event.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [query]);

  return isMobile;
}

function detectarBajoConsumo(): boolean {
  if (typeof navigator === 'undefined') return false;
  const nav = navigator as Navigator & {
    deviceMemory?: number;
    connection?: { saveData?: boolean; effectiveType?: string };
  };
  const saveData = nav.connection?.saveData === true;
  const slowNet = ['slow-2g', '2g', '3g'].includes(nav.connection?.effectiveType ?? '');
  const lowMemory = (nav.deviceMemory ?? 8) <= 4;
  return saveData || slowNet || lowMemory;
}

export function useLowPowerDevice(): boolean {
  const [lowPower, setLowPower] = useState(detectarBajoConsumo);

  useEffect(() => {
    setLowPower(detectarBajoConsumo());
  }, []);

  return lowPower;
}

function detectarSafariIos(): boolean {
  if (typeof navigator === 'undefined') return false;
  const ua = navigator.userAgent;
  const esIos =
    /iPad|iPhone|iPod/.test(ua) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const esSafari = /Safari/.test(ua) && !/Chrome|CriOS|FxiOS|EdgiOS/.test(ua);
  return esIos && esSafari;
}

/** Safari iOS suele fallar al mostrar PDFs dentro de iframe. */
export function useEsSafariIos(): boolean {
  const [esSafariIos, setEsSafariIos] = useState(detectarSafariIos);

  useEffect(() => {
    setEsSafariIos(detectarSafariIos());
  }, []);

  return esSafariIos;
}

export function useActiveSection(sectionIds: string[]): string {
  const [active, setActive] = useState(sectionIds[0] ?? '');

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (!element) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActive(id);
          }
        },
        { rootMargin: '-40% 0px -55% 0px', threshold: 0 },
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [sectionIds]);

  return active;
}
