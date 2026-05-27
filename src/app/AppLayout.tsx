import { lazy, Suspense, useEffect, useMemo } from 'react';
import { usePortfolio } from '@/app/providers/PortfolioProvider';
import { HeroSection } from '@/features/hero/HeroSection';
import {
  AmbientBackground,
  CustomCursor,
  TechMarquee,
} from '@/shared/ui/effects';
import {
  ScrollProgressController,
  SiteFooter,
  SiteHeader,
} from '@/shared/ui/layout';

const AboutSection = lazy(() =>
  import('@/features/about/AboutSection').then((m) => ({ default: m.AboutSection })),
);
const ProjectsSection = lazy(() =>
  import('@/features/projects/ProjectsSection').then((m) => ({ default: m.ProjectsSection })),
);
const SkillsSection = lazy(() =>
  import('@/features/skills/SkillsSection').then((m) => ({ default: m.SkillsSection })),
);
const CertificationsSection = lazy(() =>
  import('@/features/certifications/CertificationsSection').then((m) => ({
    default: m.CertificationsSection,
  })),
);
const ContactSection = lazy(() =>
  import('@/features/contact/ContactSection').then((m) => ({ default: m.ContactSection })),
);

function SectionFallback() {
  return <div className="py-24 md:py-32" aria-hidden />;
}

function useScrollProgress() {
  useEffect(() => {
    const bar = document.getElementById('scroll-progress');
    if (!bar) return;

    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const scrolled =
          (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        bar.style.width = `${Math.min(100, Math.max(0, scrolled))}%`;
        ticking = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
}

export function AppLayout() {
  const { data, loading, error } = usePortfolio();
  useScrollProgress();

  const techMarqueeItems = useMemo(() => {
    if (!data) return [];
    const techs = new Set<string>([
      'C#',
      'ASP.NET Core',
      'React',
      'TypeScript',
      'SQL Server',
      'AWS',
      'Azure DevOps',
      'APIs REST',
    ]);
    data.skills.skills.slice(0, 6).forEach((s) => techs.add(s.name.split('/')[0].trim()));
    return [...techs].slice(0, 12);
  }, [data]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-950">
        <div className="flex flex-col items-center gap-6">
          <div className="relative w-16 h-16">
            <div className="absolute inset-2 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
          </div>
          <p className="text-slate-500 font-mono text-xs uppercase tracking-[0.3em]">Cargando...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-950 px-6">
        <p className="text-red-400 text-center">{error ?? 'Error desconocido'}</p>
      </div>
    );
  }

  return (
    <>
      <AmbientBackground />
      <CustomCursor />
      <ScrollProgressController />
      <SiteHeader />
      <main className="relative">
        <HeroSection />
        {techMarqueeItems.length > 0 && <TechMarquee items={techMarqueeItems} />}
        <Suspense fallback={<SectionFallback />}>
          <AboutSection />
          <ProjectsSection />
          <SkillsSection />
          <CertificationsSection />
          <ContactSection />
        </Suspense>
      </main>
      <SiteFooter />
    </>
  );
}
