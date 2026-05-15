// Nav type
export type navLinkType = {
  label: string;
  url: string;
};

// Nav
const navLinks = [
  {
    label: 'Services',
    url: '#services',
  },
  {
    label: 'Projects',
    url: '#works',
  },
  {
    label: 'Research & Patents',
    url: '#research-and-patents',
  },
  {
    label: 'About',
    url: '#about-me-section',
  },

  {
    label: 'Contact',
    url: '#contact-section',
  },
];
const navbarLinks = [
  {
    label: 'Home',
    url: '#app',
  },
  ...navLinks,
];

const socialLinks = [
  {
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/sandeshverma/',
  },
  {
    label: 'GitHub',
    url: 'https://github.com/ren276',
  },
  {
    label: 'LeetCode',
    url: 'https://leetcode.com/u/sandeshv414/',
  },
];

const resourceLinks = [
  {
    label: 'Resume',
    url: 'https://drive.google.com/file/d/1eMyzv8wPggeHV0qzZ452yMOp2c50PLIj/view?usp=sharing',
  },
  {
    label: 'UI Design by Huy',
    url: 'https://x.com/huyngxyz',
  },
];

const heroText =
  'Mobile & Full-Stack Developer | Android · iOS · Flutter · AI/ML';

const locationPlace = 'New Delhi';
const locationCountry = 'India';

// cal.com
const dataCalNamespace = '30min';
const dataCalLink = 'sandeshverma0311/30min';
const dataCalConfig =
  '{"layout":"month_view", "theme": "dark", "brand": "#8C8C73"}';

// --- ADDED DATA STRUCTURES FOR SANDESH VERMA ---

export const aboutMeText1 =
  "I'm a Computer Science Engineering graduate from GGSIPU (9.16 CGPA) with hands-on experience building mobile apps at scale. I've worked as an SDE-1 at NAVAN, built cross-platform apps using Flutter, and published AI/ML research in a Springer journal.";
export const aboutMeText2 =
  'I hold a filed patent for interactive digital avatars and have led tech communities as CESTA President and GDSC Co-Lead. Proficient in Kotlin, Swift, Python, JavaScript, and modern frameworks like Jetpack Compose, SwiftUI, and Next.js.';

export const servicesData = [
  {
    title: 'Mobile App Development',
    body: 'Android, iOS & Flutter apps built for performance and enterprise scale.',
    headings: ['Kotlin (Jetpack Compose, Ktor)', 'Swift (SwiftUI)', 'Flutter'],
    shape: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><path d="M100 0C103.395 53.7596 146.24 96.6052 200 100C146.24 103.395 103.395 146.24 100 200C96.6052 146.24 53.7596 103.395 0 100C53.7596 96.6052 96.6052 53.7596 100 0Z"/></svg>`,
  },
  {
    title: 'AI/ML & Data Engineering',
    body: 'Building scalable ML pipelines, integrating LLMs, and processing telemetry data at scale.',
    headings: ['FastAPI & Kafka', 'Llama 3.2 & MLFlow', 'ML Pipelines'],
    shape: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><path d="M127.14 200C99.9942 200 99.9943 167.423 72.8487 167.423C41.6048 167.423 0 158.386 0 127.133C0 99.9885 32.5678 99.9885 32.5678 72.8445C32.5678 41.6139 41.6048 0 72.8602 0C100.006 0 100.006 32.5774 127.151 32.5774C158.384 32.5774 200 41.6139 200 72.8675C200 100.012 167.421 100.012 167.421 127.156C167.409 158.444 158.384 200 127.14 200Z" /></svg>`,
  },
  {
    title: 'Full-Stack & Backend',
    body: 'Designing high-throughput backend APIs and modern full-stack web applications.',
    headings: [
      'Next.js, JavaScript',
      'PostgreSQL, Redis, SQL',
      'Supabase, REST APIs',
    ],
    shape: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><path d="M100 0L170.711 29.2893L200 100L170.711 170.711L100 200L29.2893 170.711L0 100L29.2893 29.2893L100 0Z" /></svg>`,
  },
  {
    title: 'Architecture & Delivery',
    body: 'Leading technical execution with agile methodologies, cross-functional delivery, and scalable system design.',
    headings: ['System Design', 'Docker, Git', 'Agile / SDLC'],
    shape: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><path d="M100 0C103.395 53.7596 146.24 96.6052 200 100C146.24 103.395 103.395 146.24 100 200C96.6052 146.24 53.7596 103.395 0 100C53.7596 96.6052 96.6052 53.7596 100 0Z"/></svg>`,
  },
];

export const projectsData = [
  {
    name: 'Strata – Visual Stories for Strava',
    category: 'Android & Full-Stack',
    tags: [
      'Kotlin',
      'Jetpack Compose',
      'Supabase',
      'Ktor',
      'REST API',
      'Timber',
    ],
    videoSrc: '',
    imageBg: '',
    url: 'https://github.com/sandeshverma0311/strata',
    year: '2024',
    details: {
      overview:
        'An Android app that lets Strava athletes generate and share beautiful visual stories from their workout data, complete with a custom image editor.',
      techStack:
        'Kotlin · Jetpack Compose · MVVM · Supabase · Ktor · Room DB · REST API · Timber',
      achievements: [
        'Reduced redundant API calls by 40% with offline-first Room DB architecture',
        'Zero client-side secret exposure via Supabase Edge Functions OAuth 2.0',
        '60fps Compose UI with R8/ProGuard obfuscation and Coil image loading',
        '3+ security layers: Android Keystore + EncryptedSharedPreferences + HTTPS Network Security Config',
        'Targeted 10,000+ Strava athletes',
      ],
      links: [{ label: 'GitHub', url: 'https://github.com/ren276/strata' }],
    },
  },
  {
    name: 'Sentinel — ML Observability Platform',
    category: 'AI/ML & Full-Stack',
    tags: ['FastAPI', 'Kafka', 'Llama 3.2', 'Next.js 15'],
    videoSrc: '',
    imageBg: '',
    url: 'https://github.com/ren276/Sentinels',
    year: '2024',
    details: {
      overview:
        'An ML Observability Platform that scales real-time telemetry ingestion to enterprise-level infrastructure and eliminates third-party API costs using localized Llama 3.2.',
      techStack: 'FastAPI · Kafka · Llama 3.2 · Next.js 15 · PostgreSQL',
      achievements: [
        'Scaled real-time telemetry ingestion pipeline to process 10,000+ metrics/sec',
        'Reduced database IOPS overhead by 85% with a PostgreSQL batch-insert strategy over FastAPI and Kafka',
        'Eliminated third-party API costs and latency by integrating a localized Llama 3.2 engine with Isolation Forest and LSTM Autoencoder',
        'Achieved 1.8s RCA generation while maintaining full telemetry privacy compliance',
      ],
      links: [{ label: 'GitHub', url: 'https://github.com/ren276/Sentinels' }],
    },
  },
];

export const researchAndPatentsData = [
  {
    name: 'Interactive Digital Avatars',
    category: 'Patent Granted (2026)',
    tags: ['System Architecture', 'IP Contribution'],
    url: '',
    year: '2026',
    details: {
      overview:
        'Patent No. 202511117683: System for Generating Interactive Digital Avatars. Original systems-level IP contribution.',
      achievements: [
        'Granted in 2026',
        'Original systems-level IP contribution',
      ],
      links: [],
    },
  },
  {
    name: 'AssemblyAI vs WhisperAI',
    category: 'Springer-Published Research',
    tags: ['NLP', 'Applied AI', 'Python'],
    url: 'https://link.springer.com/',
    year: '2025',
    details: {
      overview:
        'Comparative analysis of AssemblyAI vs WhisperAI for software documentation — quantitative NLP evaluation aligned with applied AI research.',
      techStack: 'Python · Data Analysis · Machine Learning · NLP',
      achievements: [
        'Published in a Springer journal',
        'Quantitative NLP evaluation for applied AI',
      ],
      links: [{ label: 'Springer', url: 'https://link.springer.com/' }],
    },
  },
];

export const experienceData = [
  {
    role: 'Software Development Engineer 1',
    company: 'NAVAN, Gurugram',
    duration: 'April 2024 - July 2024',
    description:
      'Engineered Meal Selection feature for airline checkout using Agile SDLC, Kotlin, and SwiftUI. Improved crash-free users to 95.66% and significantly reduced ANR rates.',
  },
  {
    role: 'Flutter Developer Intern',
    company: 'HeimatVerse, New Delhi',
    duration: 'July 2023 - September 2023',
    description:
      'Developed Autumn8 multiplatform Smart Home app using Flutter and Arduino. Improved prototype test speeds by 75% through optimization.',
  },
];

export {
  socialLinks,
  resourceLinks,
  heroText,
  locationPlace,
  locationCountry,
  navLinks,
  navbarLinks,
  dataCalNamespace,
  dataCalLink,
  dataCalConfig,
};
