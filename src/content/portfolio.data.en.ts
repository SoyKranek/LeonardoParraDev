import type { PortfolioData } from '@/shared/types/portfolio.types';
import { certificationsCatalog } from '@/content/portfolio.data';

export const portfolioDataEn: PortfolioData = {
  meta: {
    name: 'Leonardo Parra',
    role: 'Semi Senior Full Stack Developer · .NET · React · AWS',
    email: 'leonardoparra_99@hotmail.com',
    linkedIn: 'https://www.linkedin.com/in/hleonardopvelandia/',
    copyright: '© 2026 Henry Leonardo Parra Velandia. All rights reserved.',
    credits: 'Portfolio · leonardoparradev.netlify.app · github.com/SoyKranek',
  },

  navigation: [
    { id: 'inicio', label: 'Home', href: '#inicio' },
    { id: 'sobre-mi', label: 'About', href: '#sobre-mi' },
    { id: 'proyectos', label: 'Projects', href: '#proyectos' },
    { id: 'habilidades', label: 'Skills', href: '#habilidades' },
    { id: 'certificaciones', label: 'Certifications', href: '#certificaciones' },
    { id: 'contacto', label: 'Contact', href: '#contacto' },
  ],

  hero: {
    greeting: 'Hi, I am',
    title: 'Leonardo Parra',
    subtitle: 'Semi Senior Full Stack · REST APIs with .NET · React · TypeScript',
    description:
      'I have spent 3+ years building software people actually use. I design REST APIs with ASP.NET Core, craft interfaces with React, and when needed I lead the technical side of the team. I always aim for the best possible solution — with AI in the workflow, but human judgment in the lead.',
    rotatingRoles: [
      'REST APIs with ASP.NET Core',
      'AI-assisted development (Cursor, Claude, Copilot)',
      'Tech Lead when the team needs it',
      'React, TypeScript & clean architectures',
      'NuGet packages & production systems',
    ],
    stats: [
      { value: '3+', label: 'Years in production' },
      { value: '4', label: 'Institutional systems' },
      { value: '20', label: 'Certifications' },
    ],
    primaryCta: { label: 'View projects', href: '#proyectos' },
    secondaryCta: { label: 'Contact me', href: '#contacto' },
  },

  about: {
    title: 'Software used by people every day',
    intro:
      'I am a semi senior Full Stack developer. One day I ship a REST API in .NET; the next I polish a React screen or automate a process that saves the team hours.',
    body:
      'At SYC I work on Colombian public-sector systems — serious products with real users and zero room for “mockups only.” Before that I was the sole developer on a legal platform: I inherited it, understood it, and kept it running on my own. I also built AceShop.co for a colleague; I still provide technical support when she needs it. I always push for the best version of every delivery; I believe I was prepared for big challenges and I respond with technical and human excellence.',
    quote: {
      text: 'In the age of innovation, reinventing yourself is not an option, it is an obligation',
      author: '— Create or Die, Andrés Oppenheimer',
    },
    valuesTitle: 'My values',
    values: [
      {
        icon: '🎯',
        title: 'Leadership',
        description: 'I care about the whole team, not just my corner of the code.',
      },
      {
        icon: '📚',
        title: 'Integrity & honesty',
        description: 'I prefer saying “I don’t know, but I’ll find out” over making things up.',
      },
      {
        icon: '🤝',
        title: 'Objective',
        description: 'I evaluate ideas and technologies with data, not hype.',
      },
      {
        icon: '💡',
        title: 'Continuous learning',
        description: 'Certifications, assisted AI, and the belief that there is always room to improve.',
      },
    ],
  },

  projectGroups: [
    {
      id: 'institucional',
      title: 'Public sector · SYC',
      description:
        'Four platforms in production today. .NET backend, SQL Server, REST APIs and Azure DevOps deployments.',
      projects: [
        {
          id: 'syctrace',
          title: 'SyCTrace',
          description:
            'Verifies the legality of excise-tax products by scanning a QR code. The kind of system where a production bug shows up instantly — that is why every detail matters.',
          learnings: ['ASP.NET Core', 'SQL Server', 'REST APIs', 'Azure DevOps'],
          technologies: ['C#', 'ASP.NET Core', 'SQL Server', 'REST APIs', 'Azure DevOps'],
          links: [],
          featured: true,
          accent: 'from-blue-700 via-blue-500 to-cyan-400',
        },
        {
          id: 'iuva',
          title: 'Iuva',
          description:
            'Vehicle tax settlement and payment for several regions. Heavy business logic, stored procedures and services that must perform under load.',
          learnings: ['ASP.NET Core', 'Stored Procedures', 'NuGet/DLL'],
          technologies: ['C#', 'ASP.NET Core', 'SQL Server', 'NuGet'],
          links: [],
          accent: 'from-indigo-600 via-violet-500 to-purple-400',
        },
        {
          id: 'infoconsumo',
          title: 'Infoconsumo',
          description:
            'Regional control of taxed products. Full stack work with clean architecture, dependency injection and corporate standards that do not compromise quality.',
          learnings: ['WebForms', 'Dapper', 'DI', 'API DLLs'],
          technologies: ['C#', '.NET Framework', 'SQL Server', 'Dapper', 'IIS'],
          links: [],
          accent: 'from-emerald-600 via-teal-500 to-cyan-400',
        },
        {
          id: 'pasivos-laborales',
          title: 'Labor Liabilities',
          description:
            'Management of institutional labor obligations with dashboards so operations can see the big picture without chasing spreadsheets.',
          learnings: ['ASP.NET Core', 'Reports', 'QA/Production'],
          technologies: ['C#', 'ASP.NET Core', 'SQL Server', 'Power BI'],
          links: [],
          accent: 'from-amber-600 via-orange-500 to-yellow-400',
        },
      ],
    },
    {
      id: 'alderecho',
      title: 'AlDerecho SAS · Tech Lead',
      description:
        'I was the sole developer of the company’s main software. I inherited the codebase, understood it and made it grow.',
      projects: [
        {
          id: 'alderecho-platform',
          title: 'AlDerecho Platform',
          description:
            'The legal app clients use every day. Maintenance, new features, REST APIs in .NET and UX improvements in React — all in my hands.',
          learnings: ['C#', 'React', 'SQL Server', 'REST APIs'],
          technologies: ['C#', 'React', 'JavaScript', 'SQL Server', 'REST'],
          links: [{ label: 'Website', url: 'https://alderecho.net/' }],
          featured: true,
          accent: 'from-violet-600 via-fuchsia-500 to-pink-400',
        },
        {
          id: 'crm-serverless',
          title: 'Serverless CRM (Google Apps Script)',
          description:
            'Built from scratch with Apps Script and Gmail API because the team needed order without another server. It now manages 300+ clients per month with automated reports.',
          learnings: ['Google Apps Script', 'Gmail API', 'Automation'],
          technologies: ['Google Apps Script', 'JavaScript', 'Google Sheets', 'Gmail API'],
          links: [],
          accent: 'from-yellow-500 via-amber-500 to-orange-400',
        },
        {
          id: 'landing-activos',
          title: 'Landings · Asset Management',
          description:
            'Several WordPress sites on AWS with SSL, nightly backups and the peace of mind that the business stays visible online.',
          learnings: ['WordPress', 'AWS Lightsail', 'Route 53', 'PHP'],
          technologies: ['WordPress', 'PHP', 'MySQL', 'AWS', 'Route 53'],
          links: [
            { label: 'Asset Management', url: 'https://www.administraciondeactivos.net/' },
            { label: 'Mikayros', url: 'https://mikayros.com/' },
            { label: 'Gestuber', url: 'https://www.gestuber.com/' },
          ],
          accent: 'from-rose-600 via-red-500 to-orange-400',
        },
      ],
    },
    {
      id: 'omec',
      title: 'OMEC · Professional internship',
      description: 'Oil & gas sector (Mexico) — web development and Scrum Master at the same time.',
      projects: [
        {
          id: 'ecosysval',
          title: 'ECOSYSVAL · EcosistemaEnCadena',
          description:
            'Built CRUD modules still running in production at ecosistemaencadena.com. I also facilitated Scrum ceremonies so the team would not get lost in the backlog.',
          learnings: ['Scrum', 'React', 'SQL Server', 'Git'],
          technologies: ['React', 'JavaScript', 'Tailwind CSS', 'SQL Server', 'Git'],
          links: [{ label: 'View platform', url: 'https://ecosistemaencadena.com/' }],
          accent: 'from-cyan-600 via-blue-500 to-indigo-400',
        },
      ],
    },
    {
      id: 'propios',
      title: 'Personal projects',
      description: 'Personal work and client projects where I build and provide ongoing support.',
      projects: [
        {
          id: 'aceshopcol',
          title: 'AceShop.co',
          description:
            'E-commerce for a colleague: I built it and still support it when she asks. About 400–500 visits per month, ~100 sales and real MercadoPago payments in production.',
          learnings: ['E-commerce', 'MercadoPago', 'React', 'AWS'],
          technologies: ['React', 'JavaScript', 'Tailwind CSS', 'MercadoPago', 'Route 53'],
          links: [{ label: 'Visit site', url: 'https://www.aceshopcol.com/' }],
          featured: true,
          accent: 'from-pink-600 via-fuchsia-500 to-violet-400',
        },
        {
          id: 'control-gastos',
          title: 'ControlGastosAPP',
          description:
            'Personal app to track monthly finances. Born from my own need and written in TypeScript.',
          learnings: ['TypeScript', 'Frontend'],
          technologies: ['TypeScript', 'React', 'Vite'],
          links: [{ label: 'GitHub', url: 'https://github.com/SoyKranek' }],
          accent: 'from-green-600 via-emerald-500 to-teal-400',
        },
        {
          id: 'portfolio',
          title: 'Portfolio · LeonardoParraDev',
          description:
            'This site: React, TypeScript, Tailwind and Netlify. The same stack I would use on a real product — including AI to iterate faster.',
          learnings: ['React', 'TypeScript', 'Vite', 'Netlify'],
          technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Netlify'],
          links: [
            { label: 'Live site', url: 'https://leonardoparradev.netlify.app/' },
            { label: 'GitHub', url: 'https://github.com/SoyKranek/LeonardoParraDev' },
          ],
          accent: 'from-slate-600 via-cyan-500 to-blue-400',
        },
      ],
    },
  ],

  skills: {
    title: 'Technical stack',
    intro:
      '.NET backend and REST APIs in production, frontend with React/TypeScript, and a workflow powered by AI tools — always with human review and solid practices.',
    subtitle: 'What I use daily and feel comfortable leading',
    skills: [
      {
        id: 'net',
        name: 'C# / ASP.NET Core / .NET',
        indicator: 'REST APIs, web apps, desktop & NuGet/DLL',
        level: 88,
        color: 'from-blue-500 to-indigo-600',
      },
      {
        id: 'apis-rest',
        name: 'REST APIs with .NET',
        indicator: 'Design, publishing & system integration',
        level: 86,
        color: 'from-violet-500 to-purple-600',
      },
      {
        id: 'react',
        name: 'React / TypeScript / Vite',
        indicator: 'Modern interfaces & production SPAs',
        level: 85,
        color: 'from-cyan-500 to-blue-500',
      },
      {
        id: 'sql',
        name: 'SQL Server / Oracle / MySQL',
        indicator: 'SPs, views, LINQ & prod tuning',
        level: 82,
        color: 'from-emerald-500 to-teal-600',
      },
      {
        id: 'ia-dev',
        name: 'AI-assisted engineering',
        indicator: 'Cursor · Windsurf · Claude · Copilot',
        level: 82,
        color: 'from-fuchsia-500 to-violet-600',
      },
      {
        id: 'aws',
        name: 'AWS / Azure DevOps / CI/CD',
        indicator: 'Lightsail, S3, Route 53, Git pipelines',
        level: 78,
        color: 'from-orange-500 to-amber-500',
      },
      {
        id: 'testing',
        name: 'xUnit / NUnit / QA',
        indicator: 'Unit tests & QA/Production support',
        level: 72,
        color: 'from-rose-500 to-pink-600',
      },
      {
        id: 'apps-script',
        name: 'Google Apps Script / RPA',
        indicator: 'Automation & serverless CRM',
        level: 75,
        color: 'from-yellow-500 to-amber-600',
      },
    ],
    otherSkillsTitle: 'Also experienced with',
    otherSkills: [
      'Clean architecture · microservices · design patterns',
      'Cursor rules (.mdc) & Claude Code skills',
      'Technical prompt engineering · code agents · assisted review',
      'MongoDB · WebSockets · Bootstrap · Tailwind CSS · MercadoPago API',
      'Scrum · technical leadership · docs & vulnerability remediation',
      'English B2 certified (UDI)',
    ],
    learningTitle: 'Next on my learning curve',
    learningItems: [
      'Microservices and orchestration at scale in .NET',
      'Azure cloud & observability in enterprise environments',
      'Deepening the Junior Cybersecurity Analyst path (Cisco)',
    ],
  },

  certifications: certificationsCatalog,

  documents: [
    {
      id: 'cv',
      title: 'Résumé',
      description: 'Updated CV — Semi Senior Full Stack, .NET, React, REST APIs & assisted AI.',
      pdfPath: '/documents/cv/CV_Leo_ES.pdf',
      fileName: 'CV_Leonardo_Parra.pdf',
    },
    {
      id: 'carta',
      title: 'Cover letter',
      description: 'Professional cover letter for job opportunities.',
      pdfPath: '/documents/cv/Carta_Presentacion_Leonardo_Parra.pdf',
      fileName: 'Cover_Letter_Leonardo_Parra.pdf',
    },
  ],

  contact: {
    title: 'Let’s connect!',
    description:
      'If you need someone who truly understands .NET and React, communicates clearly with the team and is not afraid of AI used well — reach out. I love new challenges.',
    methods: [
      {
        icon: '📧',
        title: 'Email',
        value: 'leonardoparra_99@hotmail.com',
        href: 'mailto:leonardoparra_99@hotmail.com',
      },
      {
        icon: '📱',
        title: 'Phone',
        value: '+57 313 845 2840',
        href: 'tel:+573138452840',
      },
      {
        icon: '💼',
        title: 'LinkedIn',
        value: 'linkedin.com/in/hleonardopvelandia',
        href: 'https://www.linkedin.com/in/hleonardopvelandia/',
        external: true,
      },
      {
        icon: '⌨️',
        title: 'GitHub',
        value: 'github.com/SoyKranek',
        href: 'https://github.com/SoyKranek',
        external: true,
      },
    ],
    primaryCta: {
      label: 'Send message',
      href: 'mailto:leonardoparra_99@hotmail.com',
    },
  },
};
