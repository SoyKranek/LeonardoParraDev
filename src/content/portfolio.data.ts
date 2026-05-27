import type {
  AboutContent,

  Certification,

  ContactContent,

  DocumentDownload,

  HeroContent,

  NavItem,

  PortfolioData,

  ProjectGroup,

  SiteMeta,

  SkillContent,

} from '@/shared/types/portfolio.types';

// PDFs en public/documents/certifications/
const RUTA_CERTIFICADOS = '/documents/certifications';

export const siteMeta: SiteMeta = {

  name: 'Leonardo Parra',

  role: 'Desarrollador Full Stack Semi Senior · .NET · React · AWS',

  email: 'leonardoparra_99@hotmail.com',

  linkedIn: 'https://www.linkedin.com/in/hleonardopvelandia/',

  copyright: '© 2026 Henry Leonardo Parra Velandia. Todos los derechos reservados.',

  credits: 'Portfolio · leonardoparradev.netlify.app · github.com/SoyKranek',

};



export const navigation: NavItem[] = [

  { id: 'inicio', label: 'Inicio', href: '#inicio' },

  { id: 'sobre-mi', label: 'Sobre mí', href: '#sobre-mi' },

  { id: 'proyectos', label: 'Proyectos', href: '#proyectos' },

  { id: 'habilidades', label: 'Habilidades', href: '#habilidades' },

  { id: 'certificaciones', label: 'Certificaciones', href: '#certificaciones' },

  { id: 'contacto', label: 'Contacto', href: '#contacto' },

];

export const heroContent: HeroContent = {

  greeting: 'Hola, soy',

  title: 'Leonardo Parra',

  subtitle: 'Semi Senior Full Stack · APIs REST con .NET · React · TypeScript',

  description:

    'Llevo más de 3 años construyendo software que la gente usa de verdad. Diseño APIs REST con ASP.NET Core, interfaces con React y, cuando toca, lidero el lado técnico del equipo. Busco siempre la mejor solución posible — con IA en el flujo de trabajo, pero con criterio humano al frente.',

  rotatingRoles: [

    'APIs REST con ASP.NET Core',

    'Desarrollo asistido por IA (Cursor, Claude, Copilot)',

    'Tech Lead cuando el equipo lo necesita',

    'React, TypeScript y arquitecturas limpias',

    'Paquetes NuGet y sistemas en producción',

  ],

  stats: [

    { value: '3+', label: 'Años en producción' },

    { value: '4', label: 'Sistemas institucionales' },

    { value: '20', label: 'Certificaciones' },

  ],

  primaryCta: { label: 'Ver proyectos', href: '#proyectos' },

  secondaryCta: { label: 'Contáctame', href: '#contacto' },

};

export const aboutContent: AboutContent = {

  title: 'Software que usan personas todos los días',

  intro:

    'Soy desarrollador Full Stack semi senior. Un día estoy publicando una API REST en .NET; al siguiente, puliendo una pantalla en React o automatizando un proceso que le ahorra horas al equipo.',

  body:

    'En SYC trabajo en sistemas del sector público colombiano — cosas serias, con usuarios reales y cero margen para “solo maquetas”. Antes fui el único dev de una plataforma legal: la heredé, la entendí y la mantuve viva yo solo. También desarrollé AceShop.co para una colega: hoy le doy soporte técnico cuando lo necesita. Siempre busco la mejor versión de cada entrega; creo que Dios me preparó para retos grandes y quiero responder con excelencia técnica y humana.',

  quote: {

    text: 'En la era de la innovación, reinventarse no es una opción, es una obligación',

    author: '— Crear o morir, Andrés Oppenheimer',

  },

  valuesTitle: 'Mis valores',

  values: [

    {

      icon: '🎯',

      title: 'Liderazgo',

      description: 'Me importa el equipo completo, no solo mi rincón del código.',

    },

    {

      icon: '📚',

      title: 'Íntegro y honesto',

      description: 'Prefiero decir “no sé, pero lo averiguo” antes que inventar.',

    },

    {

      icon: '🤝',

      title: 'Objetivo',

      description: 'Evalúo ideas y tecnologías con datos, no con modas.',

    },

    {

      icon: '💡',

      title: 'Aprendizaje continuo',

      description: 'Certificaciones, IA asistida y la convicción de que siempre se puede mejorar.',

    },

  ],

};

export const projectGroups: ProjectGroup[] = [

  {

    id: 'institucional',

    title: 'Sector público · SYC',

    description:

      'Cuatro plataformas en producción hoy. Backend .NET, SQL Server, APIs REST y despliegues con Azure DevOps.',

    projects: [

      {

        id: 'syctrace',

        title: 'SyCTrace',

        description:

          'Permite verificar la legalidad de productos con impuesto al consumo escaneando un QR. Es el tipo de sistema donde un error en producción se nota al instante — por eso cuido cada detalle.',

        learnings: ['ASP.NET Core', 'SQL Server', 'APIs REST', 'Azure DevOps'],

        technologies: ['C#', 'ASP.NET Core', 'SQL Server', 'APIs REST', 'Azure DevOps'],

        links: [],

        featured: true,

        accent: 'from-blue-700 via-blue-500 to-cyan-400',

      },

      {

        id: 'iuva',

        title: 'Iuva',

        description:

          'Liquidación y pago del impuesto vehicular para varios departamentos. Mucha lógica de negocio, stored procedures y servicios que tienen que responder bien bajo carga.',

        learnings: ['ASP.NET Core', 'Stored Procedures', 'NuGet/DLL'],

        technologies: ['C#', 'ASP.NET Core', 'SQL Server', 'NuGet'],

        links: [],

        accent: 'from-indigo-600 via-violet-500 to-purple-400',

      },

      {

        id: 'infoconsumo',

        title: 'Infoconsumo',

        description:

          'Control departamental de productos gravados. Trabajo full stack con arquitecturas limpias, inyección de dependencias y estándares corporativos que no negocian calidad.',

        learnings: ['WebForms', 'Dapper', 'DI', 'APIs DLL'],

        technologies: ['C#', '.NET Framework', 'SQL Server', 'Dapper', 'IIS'],

        links: [],

        accent: 'from-emerald-600 via-teal-500 to-cyan-400',

      },

      {

        id: 'pasivos-laborales',

        title: 'Pasivos Laborales',

        description:

          'Gestión de obligaciones laborales institucionales con tableros para que operaciones vea el panorama sin perseguir hojas de cálculo.',

        learnings: ['ASP.NET Core', 'Reportes', 'QA/Producción'],

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

      'Fui el único dev del software principal de la empresa. Heredé el código, lo entendí y lo hice crecer.',

    projects: [

      {

        id: 'alderecho-platform',

        title: 'Plataforma AlDerecho',

        description:

          'La app legal que usan los clientes cada día. Mantenimiento, nuevas features, APIs REST en .NET y mejoras de UX en React — todo en mis manos.',

        learnings: ['C#', 'React', 'SQL Server', 'APIs REST'],

        technologies: ['C#', 'React', 'JavaScript', 'SQL Server', 'REST'],

        links: [{ label: 'Sitio web', url: 'https://alderecho.net/' }],

        featured: true,

        accent: 'from-violet-600 via-fuchsia-500 to-pink-400',

      },

      {

        id: 'crm-serverless',

        title: 'CRM Serverless (Google Apps Script)',

        description:

          'Lo armé desde cero con Apps Script y Gmail API porque el equipo necesitaba orden sin montar otro servidor. Hoy gestiona más de 300 clientes al mes con reportes que llegan solos.',

        learnings: ['Google Apps Script', 'Gmail API', 'Automatización'],

        technologies: ['Google Apps Script', 'JavaScript', 'Google Sheets', 'Gmail API'],

        links: [],

        accent: 'from-yellow-500 via-amber-500 to-orange-400',

      },

      {

        id: 'landing-activos',

        title: 'Landings · Administración de Activos',

        description:

          'Varios sitios WordPress en AWS con SSL, backups nocturnos y la tranquilidad de que el negocio sigue visible en línea.',

        learnings: ['WordPress', 'AWS Lightsail', 'Route 53', 'PHP'],

        technologies: ['WordPress', 'PHP', 'MySQL', 'AWS', 'Route 53'],

        links: [

          { label: 'Administración de Activos', url: 'https://www.administraciondeactivos.net/' },

          { label: 'Mikayros', url: 'https://mikayros.com/' },

          { label: 'Gestuber', url: 'https://www.gestuber.com/' },

        ],

        accent: 'from-rose-600 via-red-500 to-orange-400',

      },

    ],

  },

  {

    id: 'omec',

    title: 'OMEC · Prácticas profesionales',

    description: 'Sector hidrocarburos (México) — desarrollo web y Scrum Master a la vez.',

    projects: [

      {

        id: 'ecosysval',

        title: 'ECOSYSVAL · EcosistemaEnCadena',

        description:

          'Construí módulos CRUD que siguen en producción en ecosistemaencadena.com. También facilité ceremonias Scrum para que el equipo no se perdiera en el backlog.',

        learnings: ['Scrum', 'React', 'SQL Server', 'Git'],

        technologies: ['React', 'JavaScript', 'Tailwind CSS', 'SQL Server', 'Git'],

        links: [{ label: 'Ver plataforma', url: 'https://ecosistemaencadena.com/' }],

        accent: 'from-cyan-600 via-blue-500 to-indigo-400',

      },

    ],

  },

  {

    id: 'propios',

    title: 'Proyectos propios',

    description: 'Proyectos personales y encargos donde aporto desarrollo y soporte continuo.',

    projects: [

      {

        id: 'aceshopcol',

        title: 'AceShop.co',

        description:

          'E-commerce de una colega: yo lo desarrollé y sigo dándole soporte cuando lo pide. Entre 400–500 visitas al mes, ~100 ventas y cobros reales con MercadoPago en producción.',

        learnings: ['E-commerce', 'MercadoPago', 'React', 'AWS'],

        technologies: ['React', 'JavaScript', 'Tailwind CSS', 'MercadoPago', 'Route 53'],

        links: [{ label: 'Ver sitio', url: 'https://www.aceshopcol.com/' }],

        featured: true,

        accent: 'from-pink-600 via-fuchsia-500 to-violet-400',

      },

      {

        id: 'control-gastos',

        title: 'ControlGastosAPP',

        description:

          'App personal para llevar las finanzas del mes. Nació de una necesidad propia y la escribí en TypeScript.',

        learnings: ['TypeScript', 'Frontend'],

        technologies: ['TypeScript', 'React', 'Vite'],

        links: [{ label: 'GitHub', url: 'https://github.com/SoyKranek' }],

        accent: 'from-green-600 via-emerald-500 to-teal-400',

      },

      {

        id: 'portfolio',

        title: 'Portfolio · LeonardoParraDev',

        description:

          'Este sitio: React, TypeScript, Tailwind y Netlify. Lo mismo que usaría en un producto real — incluyendo IA para iterar más rápido.',

        learnings: ['React', 'TypeScript', 'Vite', 'Netlify'],

        technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Netlify'],

        links: [

          { label: 'Sitio', url: 'https://leonardoparradev.netlify.app/' },

          { label: 'GitHub', url: 'https://github.com/SoyKranek/LeonardoParraDev' },

        ],

        accent: 'from-slate-600 via-cyan-500 to-blue-400',

      },

    ],

  },

];

export const skillsContent: SkillContent = {

  title: 'Stack técnico',

  intro:

    'Backend .NET y APIs REST en producción, frontend con React/TypeScript, y un flujo de trabajo potenciado con herramientas de IA — siempre con revisión humana y buenas prácticas.',

  subtitle: 'Lo que uso a diario y en lo que me siento cómodo liderando',

  skills: [

    {

      id: 'net',

      name: 'C# / ASP.NET Core / .NET',

      indicator: 'APIs REST, apps web, escritorio y NuGet/DLL',

      level: 88,

      color: 'from-blue-500 to-indigo-600',

    },

    {

      id: 'apis-rest',

      name: 'APIs REST con .NET',

      indicator: 'Diseño, publicación e integración entre sistemas',

      level: 86,

      color: 'from-violet-500 to-purple-600',

    },

    {

      id: 'react',

      name: 'React / TypeScript / Vite',

      indicator: 'Interfaces modernas y SPAs en producción',

      level: 85,

      color: 'from-cyan-500 to-blue-500',

    },

    {

      id: 'sql',

      name: 'SQL Server / Oracle / MySQL',

      indicator: 'SPs, vistas, LINQ y tuning en prod',

      level: 82,

      color: 'from-emerald-500 to-teal-600',

    },

    {

      id: 'ia-dev',

      name: 'Ingeniería asistida por IA',

      indicator: 'Cursor · Windsurf · Claude · Copilot',

      level: 82,

      color: 'from-fuchsia-500 to-violet-600',

    },

    {

      id: 'aws',

      name: 'AWS / Azure DevOps / CI/CD',

      indicator: 'Lightsail, S3, Route 53, pipelines Git',

      level: 78,

      color: 'from-orange-500 to-amber-500',

    },

    {

      id: 'testing',

      name: 'xUnit / NUnit / QA',

      indicator: 'Pruebas unitarias y soporte QA/Producción',

      level: 72,

      color: 'from-rose-500 to-pink-600',

    },

    {

      id: 'apps-script',

      name: 'Google Apps Script / RPA',

      indicator: 'Automatización y CRM sin servidor',

      level: 75,

      color: 'from-yellow-500 to-amber-600',

    },

  ],

  otherSkillsTitle: 'También domino o he trabajado con',

  otherSkills: [

    'Arquitecturas limpias · microservicios · patrones de diseño',

    'Creación de rules (.mdc) para Cursor y skills para Claude Code',

    'Prompt engineering técnico · agentes de código · revisión asistida',

    'MongoDB · WebSockets · Bootstrap · Tailwind CSS · MercadoPago API',

    'Scrum · liderazgo técnico · documentación y remediación de vulnerabilidades',

    'Inglés B2 certificado (UDI)',

  ],

  learningTitle: 'Siguiente paso en mi curva',

  learningItems: [

    'Microservicios y orquestación a mayor escala en .NET',

    'Azure cloud y observabilidad en entornos enterprise',

    'Profundizar el path Junior Cybersecurity Analyst (Cisco)',

  ],

};

// pdfPath → archivo local. credentialUrl → enlace verificable (freeCodeCamp, etc.)
export const certificationsCatalog: Certification[] = [

  {

    id: 'apis-net',

    title: 'APIs REST con .NET',

    issuer: 'Platzi',

    date: '2025',

    category: 'tecnologia',

    pdfPath: `${RUTA_CERTIFICADOS}/diploma-apis-net.pdf`,

    featured: true,

  },

  {

    id: 'dotnet-syc',

    title: 'Fundamentos .NET',

    issuer: 'Sistemas y Computadores SAS',

    date: '2025',

    category: 'tecnologia',

    pdfPath: `${RUTA_CERTIFICADOS}/1763557601802_syc_Fundamentosde.NET.pdf`,

    featured: true,

  },

  {

    id: 'clean-arch',

    title: 'Arquitecturas Limpias',

    issuer: 'Platzi',

    date: '2025',

    category: 'tecnologia',

    pdfPath: `${RUTA_CERTIFICADOS}/diploma-arquitecturas-limpias.pdf`,

    featured: true,

  },

  {

    id: 'react-vite',

    title: 'React.js con Vite.js y Tailwind CSS',

    issuer: 'Platzi',

    date: '2025',

    category: 'tecnologia',

    pdfPath: `${RUTA_CERTIFICADOS}/diploma-react-vite-tailwindcss.pdf`,

    featured: true,

  },

  {

    id: 'scrum',

    title: 'Scrum Foundation Professional',

    issuer: 'CertiProf',

    date: '2023',

    category: 'metodologias',

    featured: true,

  },

  {

    id: 'csharp-fcc',

    title: 'Foundational C# with Microsoft',

    issuer: 'freeCodeCamp',

    date: '2026',

    category: 'tecnologia',

    credentialUrl:

      'https://www.freecodecamp.org/certification/henryleonardoparravelandia/foundational-c-sharp-with-microsoft',

    featured: true,

  },

  {

    id: 'english-b2',

    title: 'Inglés B2',

    issuer: 'UDI',

    date: '2025',

    category: 'idiomas',

    featured: true,

  },

  {

    id: 'unit-testing',

    title: 'Unit Testing con C# y .NET',

    issuer: 'Platzi',

    date: '2025',

    category: 'tecnologia',

    pdfPath: `${RUTA_CERTIFICADOS}/diploma-unit-testing-csharp.pdf`,

  },

  {

    id: 'linq',

    title: 'Manejo de datos con LINQ',

    issuer: 'Platzi',

    date: '2025',

    category: 'tecnologia',

    pdfPath: `${RUTA_CERTIFICADOS}/diploma-linq.pdf`,

  },

  {

    id: 'mongodb',

    title: 'MongoDB y WebSockets',

    issuer: 'Platzi',

    date: '2025',

    category: 'tecnologia',

    pdfPath: `${RUTA_CERTIFICADOS}/diploma-nodejs-mongo-websockets.pdf`,

  },

  {

    id: 'poo',

    title: 'Programación Orientada a Objetos',

    issuer: 'Sistemas y Computadores SAS',

    date: '2025',

    category: 'tecnologia',

    pdfPath: `${RUTA_CERTIFICADOS}/1763557027688_syc_ProgramacinOrientadaa.pdf`,

  },

  {

    id: 'css-grid',

    title: 'CSS Grid Layout',

    issuer: 'Platzi',

    date: '2024',

    category: 'tecnologia',

    pdfPath: `${RUTA_CERTIFICADOS}/diploma-css-grid-layout.pdf`,

  },

  {

    id: 'cyber-cisco',

    title: 'Junior Cybersecurity Analyst Career Path',

    issuer: 'Cisco',

    date: '2026',

    category: 'tecnologia',

  },

  {

    id: 'cyber-endpoint',

    title: 'Endpoint Security',

    issuer: 'Cisco',

    date: '2025',

    category: 'tecnologia',

  },

  {

    id: 'cyber-defense',

    title: 'Network Defense',

    issuer: 'Cisco',

    date: '2025',

    category: 'tecnologia',

  },

  {

    id: 'cyber-intro',

    title: 'Introduction to Cybersecurity',

    issuer: 'Cisco',

    date: '2025',

    category: 'tecnologia',

  },

  {

    id: 'networking',

    title: 'Networking Basics',

    issuer: 'Cisco',

    date: '2025',

    category: 'tecnologia',

  },

  {

    id: 'remote-worker',

    title: 'Remote Worker RWPC',

    issuer: 'CertiProf',

    date: '2024',

    category: 'metodologias',

  },

  {

    id: 'lifelong',

    title: 'Lifelong Learning 2025',

    issuer: 'CertiProf',

    date: '2025',

    category: 'metodologias',

  },

  {

    id: 'bootcamp-cyber',

    title: 'Bootcamp Ciberseguridad',

    issuer: 'Asoandes',

    date: '2025',

    category: 'tecnologia',

  },

];



export const documentsCatalog: DocumentDownload[] = [

  {

    id: 'cv',

    title: 'Hoja de vida',

    description: 'CV actualizado — Full Stack Semi Senior, .NET, React, APIs REST e IA asistida.',

    pdfPath: '/documents/cv/CV_Leo_ES.pdf',

    fileName: 'CV_Leonardo_Parra.pdf',

  },

  {

    id: 'carta',

    title: 'Carta de presentación',

    description: 'Carta profesional para oportunidades laborales.',

    pdfPath: '/documents/cv/Carta_Presentacion_Leonardo_Parra.pdf',

    fileName: 'Carta_Presentacion_Leonardo_Parra.pdf',

  },

];



export const contactContent: ContactContent = {

  title: '¡Conectemos!',

  description:

    'Si buscas a alguien que entienda .NET y React de verdad, que hable claro con el equipo y que no le tenga miedo a la IA bien usada — escríbeme. Me encanta conocer retos nuevos.',

  methods: [

    {

      icon: '📧',

      title: 'Email',

      value: 'leonardoparra_99@hotmail.com',

      href: 'mailto:leonardoparra_99@hotmail.com',

    },

    {

      icon: '📱',

      title: 'Teléfono',

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

    label: 'Enviar mensaje',

    href: 'mailto:leonardoparra_99@hotmail.com',

  },

};

export const portfolioData = {

  meta: siteMeta,

  navigation,

  hero: heroContent,

  about: aboutContent,

  projectGroups,

  skills: skillsContent,

  certifications: certificationsCatalog,

  documents: documentsCatalog,

  contact: contactContent,

} satisfies PortfolioData;

