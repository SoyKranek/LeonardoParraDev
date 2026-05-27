export interface NavItem {
  id: string;
  label: string;
  href: string;
}

export interface HeroStat {
  value: string;
  label: string;
}

export interface HeroContent {
  greeting: string;
  title: string;
  subtitle: string;
  description: string;
  rotatingRoles: string[];
  stats: HeroStat[];
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
}

export interface ValueItem {
  icon: string;
  title: string;
  description: string;
}

export interface Quote {
  text: string;
  author: string;
}

export interface AboutContent {
  title: string;
  intro: string;
  body: string;
  quote: Quote;
  valuesTitle: string;
  values: ValueItem[];
}

export interface ProjectLink {
  label: string;
  url: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  learnings: string[];
  technologies: string[];
  links: ProjectLink[];
  featured?: boolean;
  accent?: string;
}

export interface ProjectGroup {
  id: string;
  title: string;
  description: string;
  projects: Project[];
}

export interface Skill {
  id: string;
  name: string;
  indicator: string;
  level: number;
  color: string;
}

export interface SkillContent {
  title: string;
  intro: string;
  subtitle: string;
  skills: Skill[];
  otherSkillsTitle: string;
  otherSkills: string[];
  learningTitle: string;
  learningItems: string[];
}

export type CertificationCategory =
  | 'tecnologia'
  | 'metodologias'
  | 'cloud'
  | 'idiomas'
  | 'otros';

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  category: CertificationCategory;
  pdfPath?: string;
  credentialUrl?: string;
  featured?: boolean;
}

export interface DocumentDownload {
  id: string;
  title: string;
  description: string;
  pdfPath: string;
  fileName: string;
}

export interface ContactMethod {
  icon: string;
  title: string;
  value: string;
  href: string;
  external?: boolean;
}

export interface ContactContent {
  title: string;
  description: string;
  methods: ContactMethod[];
  primaryCta: { label: string; href: string };
}

export interface SiteMeta {
  name: string;
  role: string;
  email: string;
  linkedIn: string;
  copyright: string;
  credits: string;
}

export interface PortfolioData {
  meta: SiteMeta;
  navigation: NavItem[];
  hero: HeroContent;
  about: AboutContent;
  projectGroups: ProjectGroup[];
  skills: SkillContent;
  certifications: Certification[];
  documents: DocumentDownload[];
  contact: ContactContent;
}

export interface PortfolioRepository {
  getPortfolio(): Promise<PortfolioData>;
}
