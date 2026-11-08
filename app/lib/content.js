export const site = {
  name: 'Samuel Opoku',
  email: 'gideonsammysen@gmail.com',
  phone: '+49 171 5811680',
  phoneDisplay: '01715811680',
  location: 'Große Klosterkoppel 8, 23562 Lübeck',
  linkedin: 'https://www.linkedin.com/in/samuel-o-4b9bbb2a8',
  github: 'https://github.com/Samuelsen1',
  website: 'https://vs-code-port1.vercel.app',
};

export const copy = {
  en: {
    nav: {
      work: 'Work',
      experience: 'Experience',
      contact: 'Contact',
      cv: 'CV',
    },
    hero: {
      brand: 'Samuel Opoku',
      role: 'Digital Learning Designer',
      line: 'Instructional design, learning media, and clear communication for medtech, museums, and modern workplaces.',
      ctaWork: 'View work',
      ctaContact: 'Get in touch',
      ctaCv: 'View CV',
    },
    featured: {
      title: 'Selected work',
      desc: 'Interactive modules, microlearning, and learning systems built for real teams.',
      all: 'All projects',
    },
    about: {
      title: 'About',
      body: 'I combine instructional design theory with hands-on production. Master’s in Media Studies, Bachelor’s in Education. Currently freelancing with Node Center for Curatorial Studies; previously at Dräger and Tanz der Kulturen. Builds accessible, learner-centred learning experiences across medtech and cultural sectors.',
    },
    metrics: {
      title: 'Impact',
      items: [
        { value: 40, suffix: '%', label: 'Avg. learning improvement' },
        { value: 96, suffix: '%', label: 'Completion' },
        { value: 78, suffix: '%', label: 'Active use' },
      ],
    },
    projectsPage: {
      title: 'Work',
      desc: 'E-learning, microlearning, knowledge bases, and technical projects.',
      filterAll: 'All',
      open: 'Open',
      request: 'Available on request',
      tools: 'Tools',
    },
    experiencePage: {
      title: 'Experience',
      desc: 'Roles, education, and credentials.',
      education: 'Education',
      certifications: 'Certifications',
    },
    contactPage: {
      title: 'Let’s work together',
      desc: 'Looking for an instructional designer for e-learning, microlearning, or multimedia learning assets? Reach out.',
      email: 'Email me',
      linkedin: 'LinkedIn',
      location: 'Location',
      phone: 'Phone',
    },
    footer: {
      rights: '© 2026 Samuel Opoku',
      tag: 'Instructional Designer · Lübeck',
    },
    chat: {
      title: 'Ask about Samuel',
      placeholder: 'Ask about skills, experience, projects…',
      send: 'Send',
      open: 'AI assistant',
      greeting: "Hi — I can answer questions about Samuel’s background, skills, and portfolio.",
    },
  },
  de: {
    nav: {
      work: 'Arbeit',
      experience: 'Erfahrung',
      contact: 'Kontakt',
      cv: 'Lebenslauf',
    },
    hero: {
      brand: 'Samuel Opoku',
      role: 'Digital Learning Designer',
      line: 'Instruktionsdesign, Lernmedien und klare Kommunikation für Medtech, Museen und moderne Arbeitsplätze.',
      ctaWork: 'Projekte ansehen',
      ctaContact: 'Kontakt aufnehmen',
      ctaCv: 'Lebenslauf',
    },
    featured: {
      title: 'Ausgewählte Projekte',
      desc: 'Interaktive Module, Microlearning und Lernsysteme für reale Teams.',
      all: 'Alle Projekte',
    },
    about: {
      title: 'Über mich',
      body: 'Ich verbinde Instruktionsdesign-Theorie mit praxisnaher Produktion. Master in Medienwissenschaften, Bachelor in Pädagogik. Derzeit Freelance für Node Center for Curatorial Studies; zuvor bei Dräger und Tanz der Kulturen.',
    },
    metrics: {
      title: 'Wirkung',
      items: [
        { value: 40, suffix: '%', label: 'Ø Lernverbesserung' },
        { value: 96, suffix: '%', label: 'Abschlussquote' },
        { value: 78, suffix: '%', label: 'Aktive Nutzung' },
      ],
    },
    projectsPage: {
      title: 'Arbeit',
      desc: 'E-Learning, Microlearning, Wissensdatenbanken und technische Projekte.',
      filterAll: 'Alle',
      open: 'Öffnen',
      request: 'Auf Anfrage',
      tools: 'Tools',
    },
    experiencePage: {
      title: 'Erfahrung',
      desc: 'Rollen, Ausbildung und Zertifikate.',
      education: 'Ausbildung',
      certifications: 'Zertifizierungen',
    },
    contactPage: {
      title: 'Lassen Sie uns sprechen',
      desc: 'Suchen Sie einen Instruktionsdesigner für E-Learning, Microlearning oder Multimedia? Melden Sie sich.',
      email: 'E-Mail schreiben',
      linkedin: 'LinkedIn',
      location: 'Standort',
      phone: 'Telefon',
    },
    footer: {
      rights: '© 2026 Samuel Opoku',
      tag: 'Instruktionsdesigner · Lübeck',
    },
    chat: {
      title: 'Fragen zu Samuel',
      placeholder: 'Fragen zu Skills, Erfahrung, Projekten…',
      send: 'Senden',
      open: 'KI-Assistent',
      greeting: 'Hallo — ich beantworte Fragen zu Samuels Hintergrund, Skills und Portfolio.',
    },
  },
};

export const categories = [
  { id: 'microlearning', en: 'Microlearning', de: 'Microlearning' },
  { id: 'elearning', en: 'E-Learning', de: 'E-Learning' },
  { id: 'medical', en: 'Medical Systems', de: 'Medizintechnik' },
  { id: 'knowledge', en: 'Knowledge Base', de: 'Wissensdatenbank' },
  { id: 'tech', en: 'Technical Writing', de: 'Technisches Schreiben' },
  { id: 'creative', en: 'Creative Tech', de: 'Kreative Technik' },
];

export const projects = [
  {
    id: 'say-it-well',
    featured: true,
    category: 'microlearning',
    title: {
      en: 'Say It Well, Hear It Well: Feedback at Work',
      de: 'Say It Well, Hear It Well: Feedback at Work',
    },
    subtitle: {
      en: 'SCORM microlearning with live AI practice',
      de: 'SCORM-Microlearning mit Live-KI-Übung',
    },
    description: {
      en: 'A landscape microlearning on giving and receiving feedback: SBI, listening habits, and a live WhatsApp-style scenario with Alex.',
      de: 'Landscape-Microlearning zu Feedback geben und annehmen: SBI, Zuhören und ein Live-WhatsApp-Szenario mit Alex.',
    },
    tools: ['SCORM 1.2', 'Interactive Video', 'General AI', 'Vercel'],
    results: {
      en: ['SBI feedback practice', 'Live AI scenario', 'SCORM-ready package'],
      de: ['SBI-Feedback-Übung', 'Live-KI-Szenario', 'SCORM-Paket'],
    },
    link: 'https://say-it-well-hear-it-well.vercel.app/',
    image: '/images/proj-say-it-well.jpg?v=2',
  },
  {
    id: 'ai-literacy',
    featured: true,
    category: 'microlearning',
    title: {
      en: 'AI Literacy for Non-Technical Employees',
      de: 'KI-Kompetenz für nicht-technische Mitarbeitende',
    },
    subtitle: {
      en: 'Interactive video microlearning',
      de: 'Interaktives Video-Microlearning',
    },
    description: {
      en: 'Explore how AI supports everyday workplace tasks, and why human judgment and careful review still matter.',
      de: 'Wie KI alltägliche Arbeitsaufgaben unterstützt, und warum menschliches Urteil und Prüfung unverzichtbar bleiben.',
    },
    tools: ['Interactive Video', 'Synthesia', 'Articulate Rise', 'Premiere Pro', 'Canva'],
    results: {
      en: ['Workplace AI literacy', 'Interactive video practice', 'Responsible use habits'],
      de: ['KI-Kompetenz am Arbeitsplatz', 'Interaktives Videolernen', 'Verantwortungsvoller Umgang'],
    },
    link: 'https://starlit-starship-e9783b.netlify.app/#/lessons/3b02b628-fb82-441d-aca1-e3f090b709db',
    image: '/images/proj-ai-literacy.jpg',
  },
  {
    id: 'sam',
    featured: true,
    category: 'microlearning',
    title: {
      en: 'SAM for Instructional Designers',
      de: 'SAM für Instruktionsdesigner',
    },
    subtitle: {
      en: 'Microlearning',
      de: 'Microlearning',
    },
    description: {
      en: 'Follow Maya as she turns a 60-slide data privacy deck into e-learning with the SAM model.',
      de: 'Begleiten Sie Maya, wie sie eine 60-seitige Datenschutz-Präsentation mit dem SAM-Modell in E-Learning verwandelt.',
    },
    tools: ['Scenario-Based Learning', 'Articulate Rise', 'Synthesia'],
    results: {
      en: ['SAM in practice', 'Scenario decisions', 'Iterative prototyping'],
      de: ['SAM in der Praxis', 'Szenario-Entscheidungen', 'Iteratives Prototyping'],
    },
    link: 'https://elaborate-meringue-bc0054.netlify.app/#/',
    image: '/images/proj-sam.jpg',
  },
  {
    id: 'cyber',
    featured: true,
    category: 'elearning',
    title: {
      en: 'Cybersecurity Essentials',
      de: 'Cybersicherheit für alle',
    },
    subtitle: {
      en: 'Articulate Rise & Synthesia',
      de: 'Articulate Rise & Synthesia',
    },
    description: {
      en: 'Practical cybersecurity awareness for every employee—secure habits and organisational safety.',
      de: 'Praxisnahe Cybersicherheits-Sensibilisierung für alle Mitarbeitenden—sichere Gewohnheiten und organisatorische Sicherheit.',
    },
    tools: ['Articulate Rise', 'Synthesia', 'Figma', 'Premiere Pro', 'Canva'],
    results: {
      en: ['Security awareness', 'Risk reduction', 'Modern accessible training'],
      de: ['Sicherheitsbewusstsein', 'Risikoreduktion', 'Modernes barrierefreies Training'],
    },
    link: 'https://charming-sprinkles-d9df51.netlify.app/',
    image: '/images/proj-cyber.jpg',
  },
  {
    id: 'climate',
    featured: true,
    category: 'elearning',
    title: {
      en: 'Combating Climate Change',
      de: 'Klimawandel bekämpfen',
    },
    subtitle: {
      en: 'Articulate Rise module',
      de: 'Articulate Rise-Modul',
    },
    description: {
      en: 'Climate awareness, learner responsibility, and collective action in an accessible Rise course.',
      de: 'Klimabewusstsein, Verantwortung und kollektives Handeln in einem barrierefreien Rise-Kurs.',
    },
    tools: ['Articulate Rise', 'Figma', 'Premiere Pro', 'Canva'],
    results: {
      en: ['Climate awareness', 'Engagement', 'Inclusive learning'],
      de: ['Klimabewusstsein', 'Engagement', 'Inklusives Lernen'],
    },
    link: 'https://spectacular-dango-d6bec1.netlify.app/#/',
    image: '/images/proj-climate.jpg',
  },
  {
    id: 'controllers',
    featured: true,
    category: 'medical',
    title: {
      en: 'Fundamentals of Controllers',
      de: 'Fundamentals of Controllers',
    },
    subtitle: {
      en: 'Dräger product training',
      de: 'Dräger Produktschulung',
    },
    description: {
      en: 'Articulate 360 product onboarding on controller fundamentals with brand-aligned design.',
      de: 'Articulate-360-Produktonboarding zu Controller-Grundlagen mit markenkonformem Design.',
    },
    tools: ['Articulate 360', 'Premiere Pro'],
    results: {
      en: ['Brand-aligned learning', 'Technical clarity', 'Storyboard iteration'],
      de: ['Markenkonformes Lernen', 'Technische Klarheit', 'Storyboard-Iteration'],
    },
    link: null,
    requestOnly: true,
    image: '/images/proj-draeger-controllers.jpg',
  },
  {
    id: 'xam',
    featured: false,
    category: 'medical',
    title: {
      en: 'Dräger X-am 2800/5800',
      de: 'Dräger X-am 2800/5800',
    },
    subtitle: {
      en: 'Sales training',
      de: 'Vertriebstraining',
    },
    description: {
      en: 'Sales-focused Articulate 360 module on portable gas detection.',
      de: 'Vertriebsorientiertes Articulate-360-Modul zu tragbaren Gaswarngeräten.',
    },
    tools: ['Articulate 360', 'Premiere Pro'],
    results: {
      en: ['Product positioning', 'Scenario practice', 'Assessment alignment'],
      de: ['Produktpositionierung', 'Szenario-Übung', 'Assessment-Abgleich'],
    },
    link: null,
    requestOnly: true,
    image: '/images/proj-draeger-gas.jpg',
  },
  {
    id: 'vacuum',
    featured: false,
    category: 'medical',
    title: {
      en: 'Medical Vacuum Systems',
      de: 'Medical Vacuum Systems',
    },
    subtitle: {
      en: 'Product training',
      de: 'Produktschulung',
    },
    description: {
      en: 'Interactive Articulate 360 onboarding for medical vacuum systems.',
      de: 'Interaktives Articulate-360-Onboarding für Medizin-Vakuumsysteme.',
    },
    tools: ['Articulate 360', 'Multimedia'],
    results: {
      en: ['Clinical context', 'Step-by-step workflows', 'Assessment alignment'],
      de: ['Klinischer Kontext', 'Schritt-für-Schritt-Workflows', 'Assessment-Abgleich'],
    },
    link: null,
    requestOnly: true,
    image: '/images/proj-draeger-vacuum.jpg',
  },
  {
    id: 'general-ai',
    featured: true,
    category: 'creative',
    title: {
      en: 'General AI',
      de: 'General AI',
    },
    subtitle: {
      en: 'AI assistant',
      de: 'KI-Assistent',
    },
    description: {
      en: 'An AI assistant for questions, fact-checks, PDFs, images, and analysis—wired to web and knowledge sources.',
      de: 'Ein KI-Assistent für Fragen, Faktenprüfung, PDFs, Bilder und Analysen—verbunden mit Web- und Wissensquellen.',
    },
    tools: ['DeepSeek', 'Wikipedia', 'Web Search', 'Vercel'],
    results: {
      en: ['Fact-checking', 'Document analysis', 'Concise answers'],
      de: ['Faktenprüfung', 'Dokumentanalyse', 'Präzise Antworten'],
    },
    link: 'https://general-ai-wheat.vercel.app',
    image: '/images/proj-general-ai.jpg',
  },
  {
    id: 'sstudio',
    featured: false,
    category: 'creative',
    title: {
      en: 'S.Studio',
      de: 'S.Studio',
    },
    subtitle: {
      en: 'Personal workspace',
      de: 'Persönlicher Workspace',
    },
    description: {
      en: 'A work, job, and social workspace for tracking projects, planning days, and tailoring applications.',
      de: 'Workspace für Projekte, Tagesplanung und stellenspezifische Bewerbungen.',
    },
    tools: ['Next.js', 'React', 'Tailwind', 'General AI'],
    results: {
      en: ['Hours tracking', 'Job-tailored CVs', 'Unified tool board'],
      de: ['Stundentracking', 'Stellenspezifische CVs', 'Einheitliches Tool-Board'],
    },
    link: null,
    gallery: ['/images/s-studio-1.jpg', '/images/s-studio-2.jpg'],
    image: '/images/proj-sstudio.jpg',
  },
  {
    id: 'kb-llm',
    featured: false,
    category: 'knowledge',
    title: {
      en: 'LLMs, Sustainability & Climate',
      de: 'LLMs, Nachhaltigkeit & Klima',
    },
    subtitle: {
      en: 'ADDIE knowledge base',
      de: 'ADDIE-Wissensdatenbank',
    },
    description: {
      en: 'An ADDIE-based guide linking LLMs, sustainability, and climate concepts into learning material.',
      de: 'ADDIE-Leitfaden, der LLMs, Nachhaltigkeit und Klima zu Lernmaterial verbindet.',
    },
    tools: ['Notion', 'Figma'],
    results: {
      en: ['Complete ADDIE frame', 'Multi-level strategies'],
      de: ['Vollständiges ADDIE', 'Mehrstufige Strategien'],
    },
    link: 'https://www.notion.so/Instructional-Design-Portfolio-Opoku-Samuel-1d4f017e613b8029b616c5b6d1fd784d?source=copy_link',
    image: '/images/proj-kb-llm.jpg',
  },
  {
    id: 'kb-climate',
    featured: false,
    category: 'knowledge',
    title: {
      en: 'Climate Change Mitigation Guide',
      de: 'Klimawandel-Minderung',
    },
    subtitle: {
      en: 'Educational resource',
      de: 'Bildungsressource',
    },
    description: {
      en: 'Climate science, human impacts, and actionable solutions across individual to governmental levels.',
      de: 'Klimawissenschaft, Auswirkungen und Lösungen von individuell bis staatlich.',
    },
    tools: ['Notion', 'Figma'],
    results: {
      en: ['Evidence-based content', 'Multi-level mitigation'],
      de: ['Evidenzbasierte Inhalte', 'Mehrstufige Minderung'],
    },
    link: 'https://www.notion.so/Combating-Climate-Change-A-Collective-Responsibility-284f017e613b80acb039d4ca5425349f?source=copy_link',
    image: '/images/proj-kb-climate.jpg',
  },
  {
    id: 'techdocs',
    featured: false,
    category: 'tech',
    title: {
      en: 'Technical Documentation',
      de: 'Technische Dokumentation',
    },
    subtitle: {
      en: 'GitHub samples',
      de: 'GitHub-Beispiele',
    },
    description: {
      en: 'Postman user guide and a 2FA knowledge-base article hosted on GitHub.',
      de: 'Postman-Benutzerhandbuch und 2FA-Wissensartikel auf GitHub.',
    },
    tools: ['GitHub', 'Markdown'],
    results: {
      en: ['Developer-friendly docs', 'Clear procedures'],
      de: ['Entwicklerfreundliche Docs', 'Klare Abläufe'],
    },
    link: 'https://github.com/Samuelsen1/Sample-2',
    image: '/images/proj-techdocs.jpg',
  },
  {
    id: 'welth',
    featured: false,
    category: 'tech',
    title: {
      en: 'Welth Health Platform',
      de: 'Welth Health Plattform',
    },
    subtitle: {
      en: 'DITA XML documentation',
      de: 'DITA-XML-Dokumentation',
    },
    description: {
      en: 'Fictional platform user guide and DITA XML documentation for personal health and wellbeing.',
      de: 'Fiktives Benutzerhandbuch und DITA-XML für persönliches Gesundheitsmanagement.',
    },
    tools: ['GitHub', 'Figma', 'Word'],
    results: {
      en: ['Topic-based structure', 'DITA examples', 'User-focused guides'],
      de: ['Themenbasierte Struktur', 'DITA-Beispiele', 'Nutzerorientierte Guides'],
    },
    link: 'https://github.com/Samuelsen1/Tech-Writing-Samples',
    image: '/images/proj-welth.jpg',
  },
];

export const experience = [
  {
    title: {
      en: 'Instructional Designer (Freelance | Part-Time)',
      de: 'Instructional Designer (Freelance | Teilzeit)',
    },
    company: 'Node Center for Curatorial Studies, Berlin',
    date: { en: 'Aug 2026 – Present', de: 'Aug 2026 – heute' },
    current: true,
    bullets: {
      en: [
        'Turns specialist input into structured, learner-friendly content for non-technical museum audiences',
        'Designs Articulate Rise modules, quizzes, and practice tasks aligned to objectives',
        'Runs iterative stakeholder reviews on tone, structure, and visual design',
      ],
      de: [
        'Übersetzt Fachinput in strukturierte, lernfreundliche Inhalte für nicht-technische Museums-Zielgruppen',
        'Konzipiert Articulate-Rise-Module, Quizzes und Übungen ausgerichtet auf Lernziele',
        'Steuert iterative Stakeholder-Reviews zu Ton, Struktur und visuellem Design',
      ],
    },
  },
  {
    title: {
      en: 'E-Learning Developer (Intern)',
      de: 'E-Learning-Entwickler (Praktikant)',
    },
    company: 'Dräger, Lübeck',
    date: { en: 'Feb 2026 – July 2026', de: 'Feb 2026 – Juli 2026' },
    bullets: {
      en: [
        'Produced and edited instructional videos for global product training',
        'Rebuilt PowerPoint content into Articulate Rise to Corporate Identity standards',
        'Created multilingual e-learning versions with AI-assisted workflows',
      ],
      de: [
        'Produzierte und schnitt Lehrvideos für globale Produktschulungen',
        'Überführte PowerPoint-Inhalte in Articulate Rise nach Corporate Identity',
        'Erstellte mehrsprachige E-Learning-Versionen mit KI-Workflows',
      ],
    },
    references: [
      { label: 'Reference DE', url: 'https://drive.google.com/file/d/15W9tFZRaDM4CbpP7KWVTY_ywBX3F5KZ3/view' },
      { label: 'Reference EN', url: 'https://drive.google.com/file/d/1XRjTGkBp7XVaQRw8PzUJkDDhObFNSRLv/view' },
    ],
  },
  {
    title: {
      en: 'Digital Learning Designer (Intern)',
      de: 'Digital Learning Designer (Praktikant)',
    },
    company: 'Tanz der Kulturen e.V., Hamburg',
    date: { en: 'June 2025 – Nov 2025', de: 'Juni 2025 – Nov 2025' },
    bullets: {
      en: [
        'Designed 25+ accessible multimedia learning assets in Figma',
        'Curated 50+ educational resources for 200+ international learners',
        'Localized 300+ pages of German instructional content into English',
      ],
      de: [
        'Gestaltete 25+ barrierefreie Multimedia-Lernassets in Figma',
        'Kuratierte 50+ Bildungsressourcen für 200+ internationale Lernende',
        'Lokalisierte 300+ Seiten deutscher Unterrichtsinhalte ins Englische',
      ],
    },
  },
  {
    title: {
      en: 'English Language Teacher & Administrative Assistant',
      de: 'Englischlehrer & Verwaltungsassistent',
    },
    company: 'Ghana National Service Scheme, Kumasi',
    date: { en: 'Jan 2023 – Oct 2023', de: 'Jan 2023 – Okt 2023' },
    bullets: {
      en: [
        'Designed and delivered English lessons aligned with Bloom’s Taxonomy',
        'Managed student records, scheduling, and correspondence',
      ],
      de: [
        'Entwarf und hielt Englischunterricht nach Bloom’s Taxonomie',
        'Verwaltete Schülerakten, Zeitplanung und Korrespondenz',
      ],
    },
  },
  {
    title: {
      en: 'English Language Teaching Assistant (Intern)',
      de: 'Englisch-Lehrassistent (Praktikant)',
    },
    company: 'Ghana Education Service, Kumasi',
    date: { en: 'June 2021 – Dec 2021', de: 'Juni 2021 – Dez 2021' },
    bullets: {
      en: ['Facilitated lessons with assessment strategies and instructional scaffolding'],
      de: ['Führte Unterricht mit Assessment-Strategien und instructional scaffolding durch'],
    },
  },
];

export const education = [
  {
    title: {
      en: "Master’s in North American Studies (Media Studies)",
      de: 'Master in Nordamerikastudien (Medienwissenschaften)',
    },
    school: { en: 'Philipps-Universität Marburg, Germany', de: 'Philipps-Universität Marburg, Deutschland' },
    date: 'Oct 2023 – March 2026',
    grade: { en: 'Grade: 2.3 | Gut', de: 'Note: 2,3 | Gut' },
    thesis: {
      en: '“AI as Reflection: Human-Technology Relationships in Digital Narratives”',
      de: '„KI als Reflexion: Mensch-Technologie-Beziehungen in digitalen Narrativen“',
    },
  },
  {
    title: {
      en: 'Bachelor of Education in English Language',
      de: 'Bachelor of Education in Englischer Sprache',
    },
    school: { en: 'University of Cape Coast, Ghana', de: 'Universität Cape Coast, Ghana' },
    date: 'Oct 2018 – Oct 2022',
    grade: { en: 'Grade: 1.4 | First Class Honours', de: 'Note: 1,4 | First Class Honours' },
    thesis: {
      en: '“The Box-Part-Letter Method: A Structured Approach to Handwriting Instruction”',
      de: '„The Box-Part-Letter Method: A Structured Approach to Handwriting Instruction“',
    },
  },
];

export const certifications = [
  {
    title: 'Instructional Design Foundations & Applications',
    issuer: 'University of Illinois Urbana-Champaign',
    date: 'Aug 2025',
    link: 'https://www.coursera.org/account/accomplishments/verify/VA2HACXYEOYV',
    image: '/images/uiuc.png',
  },
  {
    title: 'EF SET English Certificate',
    issuer: 'C1 Advanced (67/100)',
    date: 'Feb 2025',
    link: 'https://cert.efset.org/1uf78L',
    image: '/images/efset.png',
  },
  {
    title: 'Technical Writing Course',
    issuer: 'Board Infinity',
    date: 'Apr 2025',
    link: 'https://bit.ly/446fLNy',
    image: '/images/board_infinity.svg',
  },
];

export const skills = [
  {
    title: { en: 'Instructional Design', de: 'Instruktionsdesign' },
    items: ['ADDIE', 'SAM', 'Bloom’s Taxonomy', 'Adult Learning Theory', 'Storyboarding', 'LXD'],
  },
  {
    title: { en: 'E-Learning & Media', de: 'E-Learning & Medien' },
    items: ['Articulate 360', 'SCORM', 'Moodle', 'Premiere Pro', 'Photoshop', 'Figma', 'Synthesia'],
  },
  {
    title: { en: 'Communication', de: 'Kommunikation' },
    items: ['User guides', 'Knowledge bases', 'Localization', 'WCAG-oriented design'],
  },
  {
    title: { en: 'Web & Workflow', de: 'Web & Workflow' },
    items: ['HTML', 'CSS', 'Markdown', 'GitHub', 'VS Code', 'Cursor', 'Vercel'],
  },
];
