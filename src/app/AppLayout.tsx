import { useEffect, useMemo } from 'react';
import { useLocale } from '@/app/providers/LocaleProvider';
import { usePortfolio } from '@/app/providers/PortfolioProvider';
import { AboutSection } from '@/features/about/AboutSection';
import { CertificationsSection } from '@/features/certifications/CertificationsSection';
import { ContactSection } from '@/features/contact/ContactSection';
import { HeroSection } from '@/features/hero/HeroSection';
import { ProjectsSection } from '@/features/projects/ProjectsSection';
import { SkillsSection } from '@/features/skills/SkillsSection';
import { useIsMobile } from '@/shared/hooks/useMediaQuery';
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

function useScrollProgress() {
  useEffect(() => {
    const bar = document.getElementById('scroll-progress');
    if (!bar) return;

    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const alturaDoc = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = alturaDoc > 0 ? (window.scrollY / alturaDoc) * 100 : 0;
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
  const { ui } = useLocale();
  const esMovil = useIsMobile(768);
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
          <p className="text-slate-500 font-mono text-xs uppercase tracking-[0.3em]">{ui.loading}</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-950 px-6">
        <p className="text-red-400 text-center">{error ?? ui.unknownError}</p>
      </div>
    );
  }

  return (
    <>
      <AmbientBackground />
      <CustomCursor />
      <ScrollProgressController />
      <SiteHeader />
      <main className={`relative ${esMovil ? 'pb-[calc(5.5rem+env(safe-area-inset-bottom,0px))]' : ''}`}>
        <HeroSection />
        {techMarqueeItems.length > 0 && <TechMarquee items={techMarqueeItems} />}
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <CertificationsSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
