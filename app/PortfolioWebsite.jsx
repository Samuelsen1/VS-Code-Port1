import React, { useState, useEffect, useRef } from 'react';
import { Code, BookOpen, Briefcase, Mail, Linkedin, Github, ExternalLink, Zap, CheckCircle, TrendingUp, FileText, Sun, Moon, Target, Users, Sparkles, X, Eye, Lightbulb, Type, Square, Volume2, Image, AlignCenter, RotateCcw, Heart } from 'lucide-react';

export default function PortfolioWebsite() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState('en');
  const [isDarkTheme, setIsDarkTheme] = useState(false); // Light theme by default, toggle for dark/night mode
  
  // Animated counter states
  const [counts, setCounts] = useState({ improvement: 0, completion: 0, usage: 0 });
  const [hasAnimated, setHasAnimated] = useState(false);
  const metricsRefMobile = useRef(null);
  const metricsRefDesktop = useRef(null);
  
  // Accessibility states - now with 3 levels: 0 = off, 1 = light, 2 = full
  // Some features are binary (0 = off, 1 = on) - marked with isBinary
  const [isAccessibilityOpen, setIsAccessibilityOpen] = useState(false);
  const [accessibility, setAccessibility] = useState({
    contrast: 0,
    mark: 0,          // Binary: on/off only
    largeText: 0,
    textSpacing: 0,
    stopAnimations: 0, // Binary: on/off only
    hideImages: 0,     // Binary: on/off only
    dyslexia: 0,
    rowHeight: 0,
    focusIndicator: 0,
    saturation: 0
  });
  
  // Animate numbers when metrics come into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            const targets = { improvement: 40, completion: 96, usage: 78 };
            const duration = 2000;
            const steps = 60;
            const interval = duration / steps;
            
            let step = 0;
            const timer = setInterval(() => {
              step++;
              const progress = step / steps;
              const easeOut = 1 - Math.pow(1 - progress, 3);
              
              setCounts({
                improvement: Math.round(targets.improvement * easeOut),
                completion: Math.round(targets.completion * easeOut),
                usage: Math.round(targets.usage * easeOut)
              });
              
              if (step >= steps) clearInterval(timer);
            }, interval);
          }
        });
      },
      { threshold: 0.3 }
    );
    
    if (metricsRefMobile.current) observer.observe(metricsRefMobile.current);
    if (metricsRefDesktop.current) observer.observe(metricsRefDesktop.current);
    return () => observer.disconnect();
  }, [hasAnimated]);

  // Reset accessibility settings
  const resetAccessibility = () => {
    setAccessibility({
      contrast: 0,
      mark: 0,
      largeText: 0,
      textSpacing: 0,
      stopAnimations: 0,
      hideImages: 0,
      dyslexia: 0,
      rowHeight: 0,
      focusIndicator: 0,
      saturation: 0
    });
  };

  // Binary features only toggle between 0 and 1
  const binaryFeatures = ['mark', 'stopAnimations', 'hideImages'];
  
  const toggleAccessibility = (setting) => {
    setAccessibility(prev => {
      if (binaryFeatures.includes(setting)) {
        // Binary toggle: 0 -> 1 -> 0
        return { ...prev, [setting]: prev[setting] === 0 ? 1 : 0 };
      }
      // Gradual toggle: 0 -> 1 -> 2 -> 0
      return { ...prev, [setting]: prev[setting] === 0 ? 1 : (prev[setting] === 1 ? 2 : 0) };
    });
  };

  useEffect(() => {
    document.documentElement.lang = language === 'en' ? 'en' : 'de';
    document.documentElement.dir = 'ltr';
  }, [language]);

  // Apply accessibility styles
  useEffect(() => {
    const root = document.documentElement;
    
    // Respect prefers-reduced-motion if set
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion && accessibility.stopAnimations === 0) {
      const style = document.getElementById('a11y-reduced-motion') || document.createElement('style');
      style.id = 'a11y-reduced-motion';
      style.textContent = '* { animation: none !important; transition: none !important; }';
      if (!document.getElementById('a11y-reduced-motion')) {
        document.head.appendChild(style);
      }
    } else if (!prefersReducedMotion) {
      const style = document.getElementById('a11y-reduced-motion');
      if (style) style.remove();
    }
    
    // Apply styles based on accessibility settings (with gradient intensity)
    if (accessibility.contrast > 0) {
      const contrast = 1 + (accessibility.contrast === 1 ? 0.25 : 0.5);
      root.style.filter = `contrast(${contrast})`;
    } else {
      root.style.filter = 'contrast(1)';
    }

    if (accessibility.largeText > 0) {
      const size = accessibility.largeText === 1 ? '110%' : '120%';
      root.style.fontSize = size;
    } else {
      root.style.fontSize = '100%';
    }

    if (accessibility.textSpacing > 0) {
      const multiplier = accessibility.textSpacing === 1 ? 1 : 1.5;
      root.style.letterSpacing = `${0.15 * multiplier}em`;
      root.style.wordSpacing = `${0.5 * multiplier}em`;
      root.style.lineHeight = `${1.8 * (multiplier * 0.8)}`;
    } else {
      root.style.letterSpacing = 'normal';
      root.style.wordSpacing = 'normal';
      root.style.lineHeight = 'normal';
    }

    if (accessibility.stopAnimations > 0) {
      const style = document.getElementById('a11y-disable-animations') || document.createElement('style');
      style.id = 'a11y-disable-animations';
      style.textContent = '* { animation: none !important; transition: none !important; }';
      if (!document.getElementById('a11y-disable-animations')) {
        document.head.appendChild(style);
      }
    } else {
      const style = document.getElementById('a11y-disable-animations');
      if (style) style.remove();
    }

    if (accessibility.hideImages > 0) {
      document.querySelectorAll('img').forEach(img => {
        img.style.visibility = 'hidden';
      });
    } else {
      document.querySelectorAll('img').forEach(img => {
        img.style.visibility = 'visible';
      });
    }

    if (accessibility.dyslexia > 0) {
      root.style.fontFamily = '"Dyslexie", "Comic Sans MS", sans-serif';
      root.style.letterSpacing = `${0.12 * (accessibility.dyslexia === 1 ? 1 : 1.5)}em`;
    } else {
      root.style.fontFamily = 'inherit';
    }

    if (accessibility.rowHeight > 0) {
      const height = accessibility.rowHeight === 1 ? 2 : 2.5;
      root.style.setProperty('line-height', height.toString(), 'important');
    }    if (accessibility.mark > 0) {
      root.style.setProperty('--mark-bg', '#FFFF00', 'important');
      document.querySelectorAll('a').forEach(link => {
        link.style.outline = '2px solid #0000FF';
        link.style.outlineOffset = '2px';
      });
    } else {
      document.querySelectorAll('a').forEach(link => {
        link.style.outline = 'none';
      });
    }

    if (accessibility.focusIndicator > 0) {
      const style = document.getElementById('a11y-focus-indicator') || document.createElement('style');
      style.id = 'a11y-focus-indicator';
      const thickness = accessibility.focusIndicator === 1 ? '2px' : '4px';
      const color = accessibility.focusIndicator === 1 ? '#3b82f6' : '#ff0000';
      style.textContent = `
        *:focus-visible {
          outline: ${thickness} solid ${color} !important;
          outline-offset: 2px !important;
        }
        button:focus, a:focus, input:focus {
          outline: ${thickness} solid ${color} !important;
          outline-offset: 2px !important;
        }
      `;
      if (!document.getElementById('a11y-focus-indicator')) {
        document.head.appendChild(style);
      }
    } else {
      const style = document.getElementById('a11y-focus-indicator');
      if (style) style.remove();
    }

    if (accessibility.saturation > 0) {
      const saturation = 1 + (accessibility.saturation === 1 ? 0.3 : 0.7);
      root.style.filter = `${root.style.filter} saturate(${saturation})`;
    }
  }, [accessibility]);

  // Simple translation object for English and German
  const t = {
    en: {
      name: "Samuel Afriyie Opoku",
      nav: {
        about: "About",
        projects: "Projects",
        skills: "Skills",
        experience: "Experience",
        contact: "Contact"
      },
      hero: {
        available: "Available for Opportunities",
        title: "Technical Writer & Digital Learning Designer",
        subtitle: "",
        desc: "Creating clear, user-centered documentation and engaging digital learning experiences. Combining technical communication expertise with instructional design to deliver accessible, high-impact solutions—from API documentation and user guides to interactive e-learning modules.",
        viewProjects: "View Projects",
        getInTouch: "Get In Touch",
        viewCV: "View CV"
      },
      about: {
        title: "About Me",
        desc: "Technical Writer and Digital Learning Designer with a unique blend of documentation expertise and instructional design skills. I create clear, accessible technical content—from API documentation and user guides to comprehensive knowledge bases—while also designing engaging e-learning modules. My approach combines technical communication best practices with learning science (ADDIE, plain language principles) to deliver solutions that educate and empower users."
      },
      projects: {
        title: "Featured Projects",
        desc: "Digital learning design projects categorized by type and impact",
        viewAll: "View Full Portfolio",
        eLearning: "E-Learning Modules",
        knowledge: "Knowledge Base",
        techWriting: "Technical Writing"
      },
      skills: {
        title: "Skills & Technologies",
        desc: "Comprehensive toolkit for creating effective learning experiences"
      },
      experience: {
        title: "Professional Experience",
        items: [
          {
            title: { en: "Online Training (Intern)", de: "Online Training (Intern)" },
            company: { en: "Dräger, Lübeck", de: "Dräger, Lübeck" },
            date: { en: "Starting February 2026", de: "Beginn Februar 2026" },
            bullets: { en: [], de: [] },
            highlight: true,
            icon: "briefcase",
            iconBg: "bg-blue-100",
            image: "/images/drager.png?v=2"
          },
          {
            title: { en: "Digital Learning Designer (Intern)", de: "Digital Learning Designer (Praktikant)" },
            company: { en: "Tanz der Kulturen e.V., Hamburg", de: "Tanz der Kulturen e.V., Hamburg" },
            date: { en: "June 2025 – November 2025", de: "Juni 2025 – November 2025" },
            bullets: {
              en: [
                "Designed 25+ accessible multimedia learning assets (infographics, promotional materials) in line with WCAG 2.1, expanding reach to diverse learner groups",
                "Curated and structured 50+ educational resources for multicultural art pedagogy, supporting 200+ international, community, and ERASMUS learners",
                "Localized 300+ pages of German instructional content (e.g., <em>Rituelle Tanz Pädagogik</em> book) into English using AI-assisted translation, preserving natural flow"
              ],
              de: [
                "Gestaltete 25+ barrierefreie Multimedia-Lerninhalte (Infografiken, Werbematerialien) gemäß WCAG 2.1 und erreichte diverse Lerngruppen",
                "Kuratierte und strukturierte 50+ Lernressourcen für transkulturelle Kunstpädagogik und unterstützte 200+ internationale, kommunale und ERASMUS-Lernende",
                "Lokalisierte 300+ Seiten deutscher Unterrichtsinhalte (z.B. <em>Rituelle Tanz Pädagogik</em> Buch) ins Englische mit KI-gestützter Übersetzung unter Beibehaltung des natürlichen Flusses"
              ]
            },
            highlight: false,
            icon: "briefcase",
            iconBg: "bg-gray-100",
            image: "/images/tdk.jpg"
          },
          {
            title: { en: "English Language Teacher & Administrative Assistant", de: "Englischlehrer & Verwaltungsassistent" },
            company: { en: "Ghana National Service Scheme, Kumasi", de: "Ghana National Service Scheme, Kumasi" },
            date: { en: "January 2023 – October 2023", de: "Januar 2023 – Oktober 2023" },
            bullets: {
              en: [
                "Designed and delivered English lessons using learning objectives aligned with Bloom's Taxonomy, enhancing comprehension, writing, and speaking skills",
                "Assessed student progress using formative and summative methods to inform lesson adaptation",
                "Managed administrative tasks, including student records, scheduling, and correspondence"
              ],
              de: [
                "Unterrichtsstunden unter Verwendung von Lernzielen im Einklang mit Blooms Taxonomie entworfen und durchgeführt, um Verständnis, Schreib- und Sprechfähigkeiten zu verbessern",
                "Schülerfortschritt mittels formativer und summativer Methoden bewertet, um die Unterrichtsanpassung zu informieren",
                "Verwaltungsaufgaben wie Schülerakten, Zeitplanung und Korrespondenz verwaltet"
              ]
            },
            highlight: false,
            icon: "briefcase",
            iconBg: "bg-gray-100",
            image: "/images/nss.jpg"
          },
          {
            title: { en: "English Language Teaching Assistant (Intern)", de: "Englischlehrassistent (Praktikant)" },
            company: { en: "Ghana Education Service, Kumasi", de: "Ghana Education Service, Kumasi" },
            date: { en: "June 2021 – December 2021", de: "Juni 2021 – Dezember 2021" },
            bullets: {
              en: [
                "Developed a box-part-letter handwriting method, improving first-year student performance by 40%",
                "Facilitated lessons integrating assessment strategies and instructional scaffolding aligned to learning outcomes"
              ],
              de: [
                "Entwickelte eine Box-Part-Letter-Methode für die Handschrift, die die Leistung von Erstklässlern um 40% verbesserte",
                "Unterrichtseinheiten mit Bewertungsstrategien und Unterrichtsstützung im Einklang mit Lernzielen durchgeführt"
              ]
            },
            highlight: false,
            icon: "book",
            iconBg: "bg-gray-100",
            image: "/images/ges.jpeg"
          },
          {
            title: { en: "English Language Teacher (Working Student)", de: "Englischlehrer (Arbeitender Student)" },
            company: { en: "Kovak Hill Educational Centre, Kumasi", de: "Kovak Hill Educational Centre, Kumasi" },
            date: { en: "January 2020 – June 2020", de: "Januar 2020 – Juni 2020" },
            bullets: {
              en: [
                "Developed and implemented lesson plans following ADDIE principles, ensuring alignment with curriculum standards and learner engagement strategies"
              ],
              de: [
                "Unterrichtspläne nach ADDIE-Prinzipien entwickelt und durchgeführt, um Übereinstimmung mit Lehrplannormen und Lernerbeteiligungsstrategien sicherzustellen"
              ]
            },
            highlight: false,
            icon: "book",
            iconBg: "bg-gray-100",
            image: "/images/Kovak.png"
          }
        ]
      },
      certifications: {
        title: "Certifications & Training"
      },
      contact: {
        title: "Let's Create Something Great Together",
        desc: "Looking for a technical writer or digital learning designer who combines clear communication with technical expertise? Let's connect and discuss how I can help with your documentation or learning initiatives.",
        email: "Email Me",
        linkedin: "LinkedIn Profile"
      ,
        location: "Based in Marburg, Germany",
        phone: "+49 171 5811680"
      },
      footer: {
        quickLinks: "Quick Links",
        samples: "Portfolio Samples",
        eLearning: "E-Learning Modules",
        knowledge: "Knowledge Base Design",
        techWriting: "Technical Documentation",
        github: "GitHub Repository",
        copyright: "© 2025 Samuel Afriyie Opoku • Technical Writer & Digital Learning Designer",
        built: "Built with React & Tailwind CSS"
      },
      impact: {
        metrics: "Impact Metrics",
        improvement: "Average learning improvement",
        completion: "Completion",
        usage: "Active Use"
      },
      aboutCards: [
        {
          title: "Technical Communication",
          desc: "Expert in creating user-centered documentation: API guides, user manuals, knowledge bases, and process documentation. Specializing in plain language principles and WCAG 2.1 accessibility standards."
        },
        {
          title: "Digital Learning Design",
          desc: "Applying ADDIE framework, cognitive load theory, and evidence-based instructional strategies to create effective learning experiences that drive measurable outcomes."
        },
        {
          title: "Technical Skills",
          desc: "Full-stack toolkit spanning documentation tools (Markdown, GitHub, DITA XML) and e-learning authoring (Articulate 360, multimedia design with Adobe Suite)."
        }
      ],
      skillsCategories: [
        {
          title: "Technical Writing",
          items: ["API Documentation", "User Guides", "Knowledge Base Design", "DITA XML", "Plain Language", "Process Documentation"]
        },
        {
          title: "Digital Learning Design",
          items: ["ADDIE Framework", "Bloom's Taxonomy", "Adult Learning Theory", "Storyboarding", "LXD", "Curriculum Development"]
        },
        {
          title: "E-Learning & Multimedia Tools",
          items: ["Articulate 360 (Storyline, Rise)", "Moodle", "SCORM", "Adobe Premiere Pro", "Adobe Photoshop", "Figma"]
        },
        {
          title: "Technical Tools & Platforms",
          items: ["Markdown", "GitHub", "VS Code", "HTML/CSS", "Notion", "Microsoft 365"]
        },
        {
          title: "Content Localization",
          items: ["AI-Assisted Translation", "Cross-Cultural Adaptation", "Multilingual Content", "Natural Language Flow"]
        },
        {
          title: "Accessibility & Standards",
          items: ["WCAG 2.1 Compliance", "Inclusive Design", "Screen Reader Optimization", "Universal Design"]
        }
      ]
    },
    de: {
      name: "Samuel Afriyie Opoku",
      nav: {
        about: "Über mich",
        projects: "Projekte",
        skills: "Fähigkeiten",
        experience: "Erfahrung",
        contact: "Kontakt"
      },
      hero: {
        available: "Verfügbar für Möglichkeiten",
        title: "Technical Writer & Digital Learning Designer",
        subtitle: "",
        desc: "Erstellung klarer, nutzerzentrierter Dokumentation und ansprechender digitaler Lernerfahrungen. Kombiniert technische Kommunikationsexpertise mit Instructional Design für barrierefreie, wirkungsvolle Lösungen—von API-Dokumentation und Benutzerhandbüchern bis zu interaktiven E-Learning-Modulen.",
        viewProjects: "Projekte ansehen",
        getInTouch: "Kontakt aufnehmen",
        viewCV: "Lebenslauf ansehen"
      },
      about: {
        title: "Über mich",
        desc: "Technical Writer und Digital Learning Designer mit einer einzigartigen Kombination aus Dokumentations- und Instructional Design-Expertise. Ich erstelle klare, barrierefreie technische Inhalte—von API-Dokumentation und Benutzerhandbüchern bis zu umfassenden Wissensdatenbanken—und gestalte gleichzeitig ansprechende E-Learning-Module. Mein Ansatz kombiniert Best Practices der technischen Kommunikation mit Lernwissenschaft (ADDIE, Plain Language) für Lösungen, die Nutzer schulen und befähigen."
      },
      projects: {
        title: "Ausgewählte Projekte",
        desc: "Digital Learning Design-Projekte nach Typ und Wirkung kategorisiert",
        viewAll: "Gesamtes Portfolio ansehen",
        eLearning: "E-Learning-Module",
        knowledge: "Wissensdatenbank",
        techWriting: "Technisches Schreiben"
      },
      skills: {
        title: "Fähigkeiten & Technologien",
        desc: "Umfassendes Toolkit für effektive Lernerfahrungen"
      },
      experience: {
        title: "Berufserfahrung",
        items: [
          {
            title: { en: "Online Training (Intern)", de: "Online Training (Praktikant)" },
            company: { en: "Dräger, Lübeck", de: "Dräger, Lübeck" },
            date: { en: "Starting February 2026", de: "Beginn Februar 2026" },
            bullets: { en: [], de: [] },
            highlight: true,
            icon: "briefcase",
            iconBg: "bg-blue-100",
            image: "/images/drager.png?v=2"
          },
          {
            title: { en: "Web & Digital Learning Design Intern", de: "Digital Learning Designer (Praktikant)" },
            company: { en: "Tanz der Kulturen e.V., Hamburg", de: "Tanz der Kulturen e.V., Hamburg" },
            date: { en: "June 2025 – October 2025", de: "Juni 2025 – Oktober 2025" },
            bullets: {
              en: [
                "Designed and documented instructional materials for both digital and print use",
                "Contributed to rebuilding the website on an e-commerce platform",
                "Used AI to translate German brand content into English while preserving its voice and natural flow"
              ],
              de: [
                "Gestaltete und dokumentierte Lehrmaterialien für digitale und gedruckte Verwendung",
                "Wirkte beim Wiederaufbau der Website auf einer E‑Commerce-Plattform mit",
                "Verwendete KI, um deutsche Markeninhalte ins Englische zu übersetzen und dabei Stimme und natürlichen Ausdruck zu bewahren"
              ]
            },
            highlight: false,
            icon: "briefcase",
            iconBg: "bg-gray-100",
            image: "/images/tdk.jpg"
          },
          {
            title: { en: "English Language Teacher & Administrative Assistant", de: "Englischlehrer & Verwaltungsassistent" },
            company: { en: "Ghana National Service Scheme, Kumasi", de: "Ghana National Service Scheme, Kumasi" },
            date: { en: "January 2023 – October 2023", de: "Januar 2023 – Oktober 2023" },
            bullets: {
              en: [
                "Designed, delivered and assessed English lessons, improving students' comprehension and speaking skills",
                "Managed administrative tasks including student records and scheduling"
              ],
              de: [
                "Unterrichtsstunden entworfen, durchgeführt und bewertet, wodurch das Verständnis und die Sprechfertigkeit der Lernenden verbessert wurden",
                "Verwaltungsaufgaben wie Schülerakten und Zeitplanung verwaltet"
              ]
            },
            highlight: false,
            icon: "briefcase",
            iconBg: "bg-gray-100",
            image: "/images/nss.jpg"
          },
          {
            title: { en: "English Language Teaching Assistant (Intern)", de: "Englischlehrassistent (Praktikant)" },
            company: { en: "Ghana Education Service, Kumasi", de: "Ghana Education Service, Kumasi" },
            date: { en: "June 2021 – Dec 2021", de: "Juni 2021 – Dez 2021" },
            bullets: {
              en: [
                "Researched, wrote, and developed a method (box-part-letter), which helped 40% of first-year students gain legible handwriting.",
                "Designed and facilitated lessons integrating formative and summative assessment principles."
              ],
              de: [
                "Forschte, schrieb und entwickelte eine Methode (Box-Part-Letter), die 40% der Erstklässler zu leserlicher Handschrift verhalf.",
                "Unterrichtseinheiten gestaltet und durchgeführt, die formative und summative Bewertungsprinzipien integrierten."
              ]
            },
            highlight: false,
            icon: "book",
            iconBg: "bg-gray-100",
            image: "/images/ges.jpeg"
          }
        ]
      },
      certifications: {
        title: "Zertifikate & Schulungen"
      },
      contact: {
        title: "Lassen Sie uns gemeinsam Großartiges schaffen",
        desc: "Suchen Sie einen Technical Writer oder Digital Learning Designer, der klare Kommunikation mit technischer Expertise verbindet? Lassen Sie uns sprechen, wie ich bei Ihren Dokumentations- oder Lerninitiativen helfen kann.",
        email: "E-Mail senden",
        linkedin: "LinkedIn Profil"
      ,
        location: "Standort: Marburg, Deutschland",
        phone: "+49 171 5811680"
      },
      footer: {
        quickLinks: "Schnellzugriff",
        samples: "Portfolio-Beispiele",
        eLearning: "E-Learning-Module",
        knowledge: "Wissensdatenbank-Design",
        techWriting: "Technische Dokumentation",
        github: "GitHub-Repository",
        copyright: "© 2025 Samuel Afriyie Opoku • Technical Writer & Digital Learning Designer",
        built: "Erstellt mit React & Tailwind CSS"
      },
      impact: {
        metrics: "Wirkungsmetriken",
        improvement: "Durchschnittliche Lernverbesserung",
        completion: "Abschluss",
        usage: "Aktive Nutzung"
      },
      aboutCards: [
        {
          title: "Technische Kommunikation",
          desc: "Experte für nutzerzentrierte Dokumentation: API-Leitfäden, Benutzerhandbücher, Wissensdatenbanken und Prozessdokumentation. Spezialisiert auf Plain Language Prinzipien und WCAG 2.1 Barrierefreiheitsstandards."
        },
        {
          title: "Digitales Lerndesign",
          desc: "ADDIE-Framework, kognitive Belastungstheorie und evidenzbasierte Instruktionsstrategien für effektive Lernerfahrungen mit messbaren Ergebnissen anwenden."
        },
        {
          title: "Technische Fähigkeiten",
          desc: "Full-Stack-Toolkit für Dokumentationstools (Markdown, GitHub, DITA XML) und E-Learning-Autorentools (Articulate 360, Multimediadesign mit Adobe Suite)."
        }
      ],
      skillsCategories: [
        {
          title: "Technisches Schreiben",
          items: ["API-Dokumentation", "Benutzerhandbücher", "Wissensdatenbank-Design", "DITA XML", "Plain Language", "Prozessdokumentation"]
        },
        {
          title: "Digitales Lerndesign",
          items: ["ADDIE-Framework", "Bloom's Taxonomie", "Erwachsenenlerntheorie", "Storyboarding", "LXD", "Curriculumentwicklung"]
        },
        {
          title: "E-Learning & Multimedia-Tools",
          items: ["Articulate 360 (Storyline, Rise)", "Moodle", "SCORM", "Adobe Premiere Pro", "Adobe Photoshop", "Figma"]
        },
        {
          title: "Technische Tools & Plattformen",
          items: ["Markdown", "GitHub", "VS Code", "HTML/CSS", "Notion", "Microsoft 365"]
        },
        {
          title: "Content-Lokalisierung",
          items: ["KI-gestützte Übersetzung", "Interkulturelle Anpassung", "Mehrsprachiger Content", "Natürlicher Sprachfluss"]
        },
        {
          title: "Barrierefreiheit & Standards",
          items: ["WCAG 2.1 Konformität", "Inklusives Design", "Screenreader-Optimierung", "Universelles Design"]
        }
      ]
    }
  };

  // Projects with translations
  const projects = [
    {
      title: {
        en: "Plain Language and Inclusivity",
        de: "Einfache Sprache und Inklusivität"
      },
      category: {
        en: "E-Learning Module",
        de: "E-Learning-Modul"
      },
      description: {
        en: "Created with Articulate Rise, focusing on making content accessible and inclusive for all users. Features enhanced accessibility controls including text-to-speech, focus indicators, and customizable display settings.",
        de: "Erstellt mit Articulate Rise, mit Fokus auf barrierefreie und inklusive Inhalte für alle Nutzer. Mit erweiterten Barrierefreiheitsfunktionen wie Text-zu-Sprache, Fokusindikatoren und anpassbaren Anzeigeeinstellungen."
      },
      tools: {
        en: ["Articulate Rise", "Figma", "InVideo AI", "Copilot", "VS Code", "Vercel", "SCORM Cloud"],
        de: ["Articulate Rise", "Figma", "InVideo AI", "Copilot", "VS Code", "Vercel", "SCORM Cloud"]
      },
      results: {
        en: ["Enhanced accessibility features", "WCAG compliance", "Improved user engagement", "Clear communication"],
        de: ["Erweiterte Barrierefreiheitsfunktionen", "WCAG-Konformität", "Erhöhte Nutzerbindung", "Klare Kommunikation"]
      },
      link: "https://plain-language-five.vercel.app",
      featured: true
    },
    {
      title: {
        en: "Practical Setup and Troubleshooting of Two-Factor Authentication (2FA)",
        de: "Praktische Einrichtung und Fehlerbehebung bei Zwei-Faktor-Authentifizierung (2FA)"
      },
      category: {
        en: "E-Learning Module",
        de: "E-Learning-Modul"
      },
      description: {
        en: "A practical Articulate Rise module covering setup and troubleshooting steps for common 2FA flows.",
        de: "Ein praktisches Articulate Rise-Modul zur Einrichtung und Fehlerbehebung bei gängigen 2FA-Prozessen."
      },
      tools: {
        en: ["Articulate Rise", "Figma"],
        de: ["Articulate Rise", "Figma"]
      },
      results: {
        en: ["Step-by-step troubleshooting", "Improved account recovery", "Clear user instructions"],
        de: ["Schrittweise Fehlerbehebung", "Verbesserte Kontowiederherstellung", "Klare Nutzeranweisungen"]
      },
      link: "https://360.eu.articulate.com/review/content/8d8ac689-1670-458d-a7b3-0407850b55ef/review",
      featured: false
    },
    {
      title: {
        en: "E-Learning Accessibility Best Practices",
        de: "Best Practices für Barrierefreiheit im E-Learning"
      },
      category: {
        en: "E-Learning Module",
        de: "E-Learning-Modul"
      },
      description: {
        en: "A module focused on accessibility standards and practical tips for inclusive e-learning design.",
        de: "Ein Modul mit Fokus auf Barrierefreiheitsstandards und praktische Tipps für inklusives E-Learning-Design."
      },
      tools: {
        en: ["Articulate Rise"],
        de: ["Articulate Rise"]
      },
      results: {
        en: ["WCAG compliance", "Universal design", "Improved learner outcomes"],
        de: ["WCAG-Konformität", "Universelles Design", "Verbesserte Lernergebnisse"]
      },
      link: "https://example.com/e-learning-accessibility",
      featured: false
    },
    {
      title: {
        en: "LLMs, Sustainability and Climate Change",
        de: "LLMs, Nachhaltigkeit und Klimawandel"
      },
      category: {
        en: "Knowledge Base",
        de: "Wissensdatenbank"
      },
      description: {
        en: "A theoretically complete ADDIE-based guide combining LLMs, sustainability, and climate change concepts into comprehensive learning material.",
        de: "Ein vollständiger, theoretisch fundierter ADDIE-Leitfaden, der LLMs, Nachhaltigkeit und Klimawandel zu umfassendem Lernmaterial verbindet."
      },
      tools: {
        en: ["Notion", "Figma"],
        de: ["Notion", "Figma"]
      },
      results: {
        en: ["Complete ADDIE framework", "Multi-level strategies"],
        de: ["Vollständiges ADDIE-Framework", "Mehrstufige Strategien"]
      },
      link: "https://www.notion.so/Instructional-Design-Portfolio-Opoku-Samuel-1d4f017e613b8029b616c5b6d1fd784d?source=copy_link",
      featured: true
    },
    {
      title: {
        en: "Climate Change Mitigation Guide",
        de: "Leitfaden zur Klimaschutzminderung"
      },
      category: {
        en: "Knowledge Base",
        de: "Wissensdatenbank"
      },
      description: {
        en: "Comprehensive educational resource covering climate science, human impacts, and actionable solutions at individual, corporate, and governmental levels.",
        de: "Umfassende Bildungsressource zu Klimawissenschaft, menschlichen Einflüssen und umsetzbaren Lösungen auf individueller, unternehmerischer und staatlicher Ebene."
      },
      tools: {
        en: ["Notion", "Figma"],
        de: ["Notion", "Figma"]
      },
      results: {
        en: ["Complete ADDIE framework", "Multi-level mitigation strategies", "Evidence-based content"],
        de: ["Vollständiges ADDIE-Framework", "Mehrstufige Minderungsstrategien", "Evidenzbasierte Inhalte"]
      },
      link: "https://www.notion.so/Combating-Climate-Change-A-Collective-Responsibility-284f017e613b80acb039d4ca5425349f?source=copy_link",
      featured: true
    },
    {
      title: {
        en: "Technical Documentation (GitHub)",
        de: "Technische Dokumentation (GitHub)"
      },
      category: {
        en: "Technical Writing",
        de: "Technisches Schreiben"
      },
      description: {
        en: "User guide for Postman and a knowledge-base article for 2FA hosted on GitHub.",
        de: "Benutzerhandbuch für Postman und ein Wissensdatenbank-Artikel zu 2FA auf GitHub."
      },
      tools: {
        en: ["GitHub"],
        de: ["GitHub"]
      },
      results: {
        en: ["Developer-friendly docs", "Knowledge-base integration", "Clear procedures"],
        de: ["Entwicklerfreundliche Dokumente", "Wissensdatenbank-Integration", "Klare Abläufe"]
      },
      link: "https://github.com/Samuelsen1/Sample-2",
      featured: false
    },
    {
      title: {
        en: "Welth Health Platform",
        de: "Welth Health Plattform"
      },
      category: {
        en: "Technical Writing",
        de: "Technisches Schreiben"
      },
      description: {
        en: "Fictional platform user guide and DITA XML documentation for managing personal health and wellbeing.",
        de: "Fiktives Plattform-Benutzerhandbuch und DITA-XML-Dokumentation für das persönliche Gesundheitsmanagement."
      },
      tools: {
        en: ["GitHub", "Figma", "Microsoft Word"],
        de: ["GitHub", "Figma", "Microsoft Word"]
      },
      results: {
        en: ["Structured topic-based docs", "XML DITA examples", "User-focused guides"],
        de: ["Strukturierte, themenbasierte Dokumente", "XML DITA-Beispiele", "Nutzerorientierte Anleitungen"]
      },
      link: "https://github.com/Samuelsen1/Tech-Writing-Samples",
      featured: false
    }
  ];

  const certifications = [
    {
      title: {
        en: "Digital Learning Design Foundations & Applications",
        de: "Grundlagen & Anwendungen des Digitalen Lerndesigns"
      },
      issuer: {
        en: "University of Illinois Urbana-Champaign",
        de: "Universität von Illinois Urbana-Champaign"
      },
      date: {
        en: "Aug 2025",
        de: "Aug 2025"
      },
      link: "https://www.coursera.org/account/accomplishments/verify/VA2HACXYEOYV",
      image: "/images/uiuc.png"
    },
    {
      title: {
        en: "Technical Writing Course",
        de: "Kurs Technisches Schreiben"
      },
      issuer: {
        en: "Board Infinity",
        de: "Board Infinity"
      },
      date: {
        en: "Apr 2025",
        de: "Apr 2025"
      },
      link: "https://www.coursera.org/account/accomplishments/verify/CDOSFZ44QK27?utm_source=link&utm_medium=certificate&utm_content=cert_image&utm_campaign=sharing_cta&utm_product=course",
      image: "/images/board_infinity.svg"
    },
    {
      title: {
        en: "EF SET English Certificate",
        de: "EF SET Englisch Zertifikat"
      },
      level: {
        en: "C1 Advanced (67/100)",
        de: "C1 Fortgeschritten (67/100)"
      },
      date: {
        en: "Feb 2025",
        de: "Feb 2025"
      },
      link: "https://cert.efset.org/1uf78L",
      image: "/images/efset.png"
    }
  ];

  const experienceItems = (t[language] && t[language].experience && t[language].experience.items)
    || (t.en && t.en.experience && t.en.experience.items)
    || [];

  const metrics = [
    { label: t[language].impact.improvement, value: "40%" },
    { label: t[language].impact.completion, value: "96%" },
    { label: t[language].impact.usage, value: "78%" }
  ];

  return (
    <div className="min-h-screen bg-white">
      <style>{`
        @keyframes float-up-down {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes float-diagonal {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(10px, -15px) rotate(5deg); }
          50% { transform: translate(0, -25px) rotate(0deg); }
          75% { transform: translate(-10px, -15px) rotate(-5deg); }
        }
        @keyframes float-gentle {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-15px) scale(1.05); }
        }
        @keyframes orbit-1 {
          0% { transform: translate(0, 0); }
          25% { transform: translate(40px, -15px); }
          50% { transform: translate(0, -40px); }
          75% { transform: translate(-40px, -15px); }
          100% { transform: translate(0, 0); }
        }
        @keyframes orbit-2 {
          0% { transform: translate(0, 0); }
          25% { transform: translate(-30px, 20px); }
          50% { transform: translate(0, 40px); }
          75% { transform: translate(30px, 20px); }
          100% { transform: translate(0, 0); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-40px); }
        }
        @keyframes rotate-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes pulse-bright {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.1); }
        }
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes typing {
          0%, 100% { width: 0; }
          50% { width: 100%; }
        }
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        @keyframes expandWidth {
          0% { width: 0%; }
          100% { width: 40%; }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .animate-float-1 { animation: float-up-down 8s ease-in-out infinite; }
        .animate-float-2 { animation: orbit-1 12s ease-in-out infinite; animation-delay: 0.5s; }
        .animate-float-3 { animation: orbit-2 10s ease-in-out infinite; animation-delay: 1s; }
        .animate-float-diagonal { animation: float-diagonal 10s ease-in-out infinite; }
        .animate-float-gentle { animation: float-gentle 6s ease-in-out infinite; }
        .animate-pulse-glow { animation: pulse-bright 5s ease-in-out infinite; }
        .animate-rotate { animation: rotate-slow 30s linear infinite; }
        .animate-gradient { animation: gradient-shift 8s ease infinite; background-size: 200% 200%; }
        .animate-fade-in { animation: fade-in-up 0.6s ease-out forwards; }
        .glass-card {
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }
        /* Screen reader only */
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border-width: 0;
        }
        .sr-only-focusable:focus,
        .focus\:not-sr-only:focus {
          position: static;
          width: auto;
          height: auto;
          padding: inherit;
          margin: inherit;
          overflow: visible;
          clip: auto;
          white-space: normal;
        }
        /* Enhanced focus visibility */
        button:focus-visible,
        a:focus-visible {
          outline: 3px solid #3b82f6;
          outline-offset: 2px;
        }
        input:focus-visible,
        textarea:focus-visible,
        select:focus-visible {
          outline: 2px solid #3b82f6;
          outline-offset: 2px;
        }
        .glass-dark {
          background: rgba(15, 23, 42, 0.9);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
        .card-light {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.07), 0 2px 4px -2px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(0, 0, 0, 0.03);
        }
        .card-light:hover {
          border-color: #cbd5e1;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.08);
        }
        .hover-lift {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .hover-lift:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px -12px rgba(59, 130, 246, 0.25);
        }
        .text-gradient {
          background: linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #6366f1 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .btn-gradient {
          background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
          transition: all 0.3s ease;
        }
        .btn-gradient:hover {
          background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%);
          transform: translateY(-2px);
          box-shadow: 0 10px 20px -5px rgba(59, 130, 246, 0.4);
        }
        .section-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.3), transparent);
        }
      `}</style>
      <style>{`\n        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');\n        body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }\n        h1, h2, h3, h4, h5, h6 { font-family: 'Inter', sans-serif; letter-spacing: -0.02em; }\n      `}</style>

      {/* Skip to main content link */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-[100] focus:bg-blue-600 focus:text-white focus:px-4 focus:py-2 focus:font-bold">
        {language === 'en' ? 'Skip to main content' : 'Zum Hauptinhalt springen'}
      </a>

      {/* Navigation + Language Switcher */}
      <nav className={`fixed top-0 w-full shadow-lg z-50 border-b ${isDarkTheme ? 'bg-black/95 backdrop-blur-xl border-gray-800' : 'glass-card border-white/20'}`} role="navigation" aria-label={language === 'en' ? 'Main navigation' : 'Hauptnavigation'}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-6">
              <div className="text-xl font-bold text-gradient">
                {t[language].name}
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  className={`px-2.5 py-1.5 rounded-lg text-sm font-medium border transition-all duration-200 flex items-center gap-1.5 ${language === 'en' ? 'bg-blue-600 text-white border-blue-600 shadow-md' : 'bg-white/80 text-gray-700 border-gray-200 hover:border-blue-300'}`}
                  onClick={() => setLanguage('en')}
                  aria-label="Switch to English"
                >
                  <img src="/images/us.svg.webp" alt="English" className="w-5 h-5 rounded-sm" />
                </button>
                <button
                  className={`px-2.5 py-1.5 rounded-lg text-sm font-medium border transition-all duration-200 flex items-center gap-1.5 ${language === 'de' ? 'bg-blue-600 text-white border-blue-600 shadow-md' : 'bg-white/80 text-gray-700 border-gray-200 hover:border-blue-300'}`}
                  onClick={() => setLanguage('de')}
                  aria-label="Switch to German"
                >
                  <img src="/images/ger.svg.png" alt="Deutsch" className="w-5 h-5 rounded-sm" />
                </button>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#about" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all hover:after:w-full">{t[language].nav.about}</a>
              <a href="#projects" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all hover:after:w-full">{t[language].nav.projects}</a>
              <a href="#skills" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all hover:after:w-full">{t[language].nav.skills}</a>
              <a href="#experience" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all hover:after:w-full">{t[language].nav.experience}</a>
              <a href="#contact" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all hover:after:w-full">{t[language].nav.contact}</a>
              {/* Accessibility Theme Toggle */}
              <button
                onClick={() => setIsDarkTheme(!isDarkTheme)}
                className={`p-2.5 rounded-xl border transition-all duration-300 flex items-center gap-2 ${isDarkTheme ? 'bg-blue-600 text-white border-blue-600 shadow-md hover:bg-blue-700' : 'bg-amber-500 text-white border-amber-500 shadow-md hover:bg-amber-600'}`}
                aria-label={isDarkTheme ? 'Switch to light theme' : 'Switch to dark theme'}
                title={isDarkTheme ? 'Switch to light theme' : 'Switch to dark theme'}
              >
                {isDarkTheme ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            </div>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2"
            >
              <div className="space-y-1.5">
                <span className="block w-6 h-0.5 bg-blue-600"></span>
                <span className="block w-6 h-0.5 bg-blue-600"></span>
                <span className="block w-6 h-0.5 bg-blue-600"></span>
              </div>
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-blue-100">
            <a href="#about" className="block px-4 py-3 text-gray-700 hover:bg-blue-50">{t[language].nav.about}</a>
            <a href="#projects" className="block px-4 py-3 text-gray-700 hover:bg-blue-50">{t[language].nav.projects}</a>
            <a href="#skills" className="block px-4 py-3 text-gray-700 hover:bg-blue-50">{t[language].nav
            .skills}</a>
            <a href="#experience" className="block px-4 py-3 text-gray-700 hover:bg-blue-50">{t[language].nav.experience}</a>
            <a href="#contact" className="block px-4 py-3 text-gray-700 hover:bg-blue-50">{t[language].nav.contact}</a>
            {/* Mobile Theme Toggle */}
            <button
              onClick={() => setIsDarkTheme(!isDarkTheme)}
              className={`w-full flex items-center justify-center gap-2 px-4 py-3 ${isDarkTheme ? 'bg-blue-50 text-blue-700' : 'bg-amber-50 text-amber-700'}`}
            >
              {isDarkTheme ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              <span className="font-medium">{isDarkTheme ? (language === 'en' ? 'Light Theme' : 'Helles Thema') : (language === 'en' ? 'Dark Theme' : 'Dunkles Thema')}</span>
            </button>
          </div>
        )}
      </nav>

      {/* Hero Section - Theme Responsive */}
      <section className={`pt-28 pb-20 md:pt-32 md:pb-24 px-4 relative overflow-hidden ${isDarkTheme ? 'bg-gradient-to-br from-gray-950 via-slate-950 to-gray-950' : 'bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-50/30'}`}>
        {/* E-Learning Themed Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Subtle gradient orbs */}
          <div className={`absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl animate-pulse-glow ${isDarkTheme ? 'bg-gradient-to-br from-blue-600/15 to-cyan-600/8' : 'bg-gradient-to-br from-blue-400/20 to-cyan-400/10'}`}></div>
          <div className={`absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl animate-pulse-glow ${isDarkTheme ? 'bg-gradient-to-br from-indigo-600/12 to-purple-600/8' : 'bg-gradient-to-br from-indigo-400/15 to-purple-400/10'}`} style={{ animationDelay: '2s' }}></div>
          
          {/* Floating E-Learning Icons */}
          {/* Book Icon */}
          <div className={`absolute top-24 right-[15%] animate-float-gentle ${isDarkTheme ? 'text-blue-400/25' : 'text-blue-500/20'}`} style={{ animationDelay: '0s' }}>
            <svg className="w-12 h-12 md:w-16 md:h-16" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 4.5C10.42 4.5 8.85 5.13 7.5 6.4L4 3v15l3.5-3.4C8.85 13.13 10.42 12.5 12 12.5s3.15.63 4.5 1.9L20 18V3l-3.5 3.4C15.15 5.13 13.58 4.5 12 4.5zM12 6.5c1.12 0 2.21.38 3.11 1.11L12 10.73l-3.11-3.12C9.79 6.88 10.88 6.5 12 6.5z"/>
            </svg>
          </div>
          
          {/* Graduation Cap */}
          <div className={`absolute top-[45%] left-[8%] animate-float-diagonal ${isDarkTheme ? 'text-indigo-400/25' : 'text-indigo-500/20'}`} style={{ animationDelay: '1s' }}>
            <svg className="w-10 h-10 md:w-14 md:h-14" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/>
            </svg>
          </div>
          
          {/* Lightbulb (Ideas) */}
          <div className={`absolute bottom-[30%] right-[10%] animate-float-1 ${isDarkTheme ? 'text-yellow-400/20' : 'text-amber-500/15'}`} style={{ animationDelay: '2s' }}>
            <svg className="w-8 h-8 md:w-12 md:h-12" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6A4.997 4.997 0 017 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z"/>
            </svg>
          </div>
          
          {/* Code Brackets */}
          <div className={`absolute top-[60%] right-[25%] animate-float-2 ${isDarkTheme ? 'text-cyan-400/20' : 'text-cyan-600/15'}`} style={{ animationDelay: '0.5s' }}>
            <svg className="w-8 h-8 md:w-10 md:h-10" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
            </svg>
          </div>
          
          {/* Laptop/Screen */}
          <div className={`absolute bottom-[45%] left-[18%] animate-float-gentle ${isDarkTheme ? 'text-blue-300/20' : 'text-blue-600/15'}`} style={{ animationDelay: '1.5s' }}>
            <svg className="w-10 h-10 md:w-12 md:h-12" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z"/>
            </svg>
          </div>
          
          {/* Certificate/Award */}
          <div className={`absolute top-[20%] left-[25%] animate-float-diagonal ${isDarkTheme ? 'text-purple-400/20' : 'text-purple-500/15'}`} style={{ animationDelay: '2.5s' }}>
            <svg className="w-8 h-8 md:w-10 md:h-10" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
            </svg>
          </div>
          
          {/* Play Button (Video Learning) */}
          <div className={`absolute bottom-[20%] left-[35%] animate-float-1 ${isDarkTheme ? 'text-emerald-400/20' : 'text-emerald-500/15'}`} style={{ animationDelay: '3s' }}>
            <svg className="w-6 h-6 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
          
          {/* Pencil (Writing) */}
          <div className={`absolute top-[35%] right-[8%] animate-float-2 ${isDarkTheme ? 'text-orange-400/20' : 'text-orange-500/15'}`} style={{ animationDelay: '0.8s' }}>
            <svg className="w-7 h-7 md:w-9 md:h-9" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
            </svg>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            <div className="animate-fade-in text-center md:text-left">
              {/* Mobile: Profile image on top, centered */}
              <div className="flex flex-col items-center md:flex-row md:items-center gap-6 md:gap-8 mb-6 md:mb-10">
                <div className="relative group flex-shrink-0">
                  <div className={`absolute -inset-1.5 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 rounded-2xl blur-md opacity-70 group-hover:opacity-90 transition duration-500`}></div>
                  <img
                    src="/images/profile.jpg"
                    alt={t[language].name}
                    className={`relative rounded-2xl object-cover shadow-2xl flex-shrink-0 transition-transform duration-500 group-hover:scale-[1.02] w-36 h-48 md:w-44 md:h-56 lg:w-48 lg:h-64 ${isDarkTheme ? 'border-4 border-white/90' : 'border-4 border-white shadow-xl'}`}
                  />
                </div>
                <div>
                  <h1 className={`text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-4 md:mb-5 ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>
                    {t[language].hero.title}
                  </h1>
                </div>
              </div>
              
              <p className={`text-base md:text-lg lg:text-xl mb-6 md:mb-10 leading-relaxed max-w-xl mx-auto md:mx-0 ${isDarkTheme ? 'text-blue-100/90' : 'text-gray-600'}`}>
                {t[language].hero.desc}
              </p>
              
              {/* Mobile Metrics Tile - after description, before CTA buttons */}
              <div ref={metricsRefMobile} className="md:hidden mb-8 mx-auto max-w-sm animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <div className={`rounded-2xl p-4 overflow-hidden relative ${isDarkTheme ? 'bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 backdrop-blur-xl border border-blue-500/30 shadow-2xl shadow-blue-500/10' : 'bg-gradient-to-br from-white via-gray-50 to-slate-50 border border-gray-200 shadow-xl'}`}>
                  {/* Giant 40% watermark */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
                    <span className={`text-[100px] font-black leading-none ${isDarkTheme ? 'text-blue-500/20' : 'text-blue-400/[0.20]'}`} style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                      {counts.improvement}%
                    </span>
                  </div>
                  {/* Animated orbs */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className={`absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl animate-pulse ${isDarkTheme ? 'bg-blue-500/20' : 'bg-blue-400/10'}`}></div>
                    <div className={`absolute -bottom-20 -left-20 w-36 h-36 rounded-full blur-3xl animate-pulse ${isDarkTheme ? 'bg-indigo-500/20' : 'bg-indigo-300/10'}`} style={{ animationDelay: '1.5s' }}></div>
                  </div>
                  {/* Header */}
                  <div className="relative mb-4" style={{ zIndex: 2 }}>
                    <div className="flex items-center justify-between">
                      <div className={`${isDarkTheme ? '' : 'bg-white/60 backdrop-blur-sm'} rounded-xl p-2 -m-2`}>
                        <p className={`text-xs font-medium uppercase tracking-wider mb-1 ${isDarkTheme ? 'text-blue-300/70' : 'text-gray-500'}`}>{t[language].impact.metrics}</p>
                        <div className="flex items-baseline gap-1">
                          <span className={`text-4xl font-black ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>{counts.improvement}</span>
                          <span className={`text-xl font-bold ${isDarkTheme ? 'text-blue-400' : 'text-blue-600'}`}>%</span>
                        </div>
                        <p className={`text-xs mt-1 ${isDarkTheme ? 'text-blue-200/60' : 'text-gray-500'}`}>{t[language].impact.improvement}</p>
                      </div>
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${isDarkTheme ? 'bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/25' : 'bg-gradient-to-br from-blue-500 to-indigo-500 shadow-lg shadow-blue-500/20'}`}>
                        <TrendingUp className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className={`mt-3 h-2 rounded-full overflow-hidden ${isDarkTheme ? 'bg-white/10' : 'bg-gray-200/80'}`}>
                      <div className={`h-full rounded-full transition-all duration-700 ease-out ${isDarkTheme ? 'bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400' : 'bg-gradient-to-r from-blue-500 to-indigo-500'}`} style={{ width: `${counts.improvement}%` }} />
                    </div>
                  </div>
                  <div className={`h-px mb-4 relative ${isDarkTheme ? 'bg-white/10' : 'bg-gray-200/80'}`} style={{ zIndex: 2 }}></div>
                  {/* Secondary Metrics */}
                  <div className="relative grid grid-cols-2 gap-2" style={{ zIndex: 2 }}>
                    <div className={`p-3 rounded-2xl backdrop-blur-sm ${isDarkTheme ? 'bg-white/[0.03]' : 'bg-white/40'}`}>
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${isDarkTheme ? 'bg-emerald-500/20' : 'bg-emerald-100/80'}`}>
                          <Target className={`w-3.5 h-3.5 ${isDarkTheme ? 'text-emerald-400' : 'text-emerald-600'}`} />
                        </div>
                        <span className={`text-[10px] font-medium ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>{t[language].impact.completion}</span>
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className={`text-2xl font-bold ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>{counts.completion}</span>
                        <span className={`text-base font-semibold ${isDarkTheme ? 'text-emerald-400' : 'text-emerald-600'}`}>%</span>
                      </div>
                      <div className={`mt-2 h-1.5 rounded-full overflow-hidden ${isDarkTheme ? 'bg-white/10' : 'bg-gray-200/60'}`}>
                        <div className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 transition-all duration-700 ease-out" style={{ width: `${counts.completion}%` }} />
                      </div>
                    </div>
                    <div className={`p-3 rounded-2xl backdrop-blur-sm ${isDarkTheme ? 'bg-white/[0.03]' : 'bg-white/40'}`}>
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${isDarkTheme ? 'bg-violet-500/20' : 'bg-violet-100/80'}`}>
                          <Users className={`w-3.5 h-3.5 ${isDarkTheme ? 'text-violet-400' : 'text-violet-600'}`} />
                        </div>
                        <span className={`text-[10px] font-medium ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>{t[language].impact.usage}</span>
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className={`text-2xl font-bold ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>{counts.usage}</span>
                        <span className={`text-base font-semibold ${isDarkTheme ? 'text-violet-400' : 'text-violet-600'}`}>%</span>
                      </div>
                      <div className={`mt-2 h-1.5 rounded-full overflow-hidden ${isDarkTheme ? 'bg-white/10' : 'bg-gray-200/60'}`}>
                        <div className="h-full rounded-full bg-gradient-to-r from-violet-400 to-purple-400 transition-all duration-700 ease-out" style={{ width: `${counts.usage}%` }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <a 
                  href="#contact" 
                  className={`inline-flex items-center gap-2 px-6 md:px-7 py-3 md:py-3.5 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 ${isDarkTheme ? 'bg-white text-blue-700 hover:bg-blue-50' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                >
                  <Mail className="w-5 h-5" />
                  {t[language].hero.getInTouch}
                </a>
                <a 
                  href="/cv.pdf" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-6 md:px-7 py-3 md:py-3.5 rounded-xl font-semibold border transition-all duration-300 shadow-lg hover:-translate-y-0.5 ${isDarkTheme ? 'bg-blue-500/20 backdrop-blur text-white border-blue-400/30 hover:bg-blue-500/30' : 'bg-white/80 backdrop-blur text-blue-700 border-blue-200 hover:bg-white hover:border-blue-300'}`}
                >
                  <FileText className="w-5 h-5" />
                  {t[language].hero.viewCV}
                </a>
              </div>
              <div className="flex justify-center md:justify-start gap-5 mt-8 md:mt-10">
                <a href="https://www.linkedin.com/in/samuel-o-4b9bbb2a8" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" className={`transition-all duration-300 hover:scale-110 ${isDarkTheme ? 'text-blue-300/80 hover:text-white' : 'text-blue-500 hover:text-blue-700'}`}>
                  <Linkedin className="w-6 h-6" />
                </a>
                <a href="https://github.com/Samuelsen1" target="_blank" rel="noopener noreferrer" aria-label="GitHub profile" className={`transition-all duration-300 hover:scale-110 ${isDarkTheme ? 'text-blue-300/80 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
                  <Github className="w-6 h-6" />
                </a>
                <a href="mailto:gideonsammysen@gmail.com" aria-label="Email contact" className={`transition-all duration-300 hover:scale-110 ${isDarkTheme ? 'text-blue-300/80 hover:text-white' : 'text-blue-500 hover:text-blue-700'}`}>
                  <Mail className="w-6 h-6" />
                </a>
              </div>
            </div>
            {/* Desktop Metrics Tile - hidden on mobile, shown on md+ */}
            <div ref={metricsRefDesktop} className="relative animate-fade-in hidden md:block" style={{ animationDelay: '0.2s' }}>
              <div className="relative z-10">
                <div className={`rounded-3xl p-6 overflow-hidden relative ${isDarkTheme ? 'bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 backdrop-blur-xl border border-blue-500/30 shadow-2xl shadow-blue-500/10' : 'bg-gradient-to-br from-white via-gray-50 to-slate-50 border border-gray-200 shadow-xl'}`}>
                  
                  {/* Giant 40% watermark - centered, more visible */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
                    <span 
                      className={`text-[190px] font-black leading-none ${isDarkTheme ? 'text-blue-500/20' : 'text-blue-400/[0.20]'}`}
                      style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
                    >
                      {counts.improvement}%
                    </span>
                  </div>
                  
                  {/* Subtle animated gradient orbs */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className={`absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl animate-pulse ${isDarkTheme ? 'bg-blue-500/20' : 'bg-blue-400/10'}`}></div>
                    <div className={`absolute -bottom-20 -left-20 w-36 h-36 rounded-full blur-3xl animate-pulse ${isDarkTheme ? 'bg-indigo-500/20' : 'bg-indigo-300/10'}`} style={{ animationDelay: '1.5s' }}></div>
                  </div>
                  
                  {/* Header with main metric */}
                  <div className="relative mb-6" style={{ zIndex: 2 }}>
                    <div className="flex items-center justify-between">
                      <div className={`${isDarkTheme ? '' : 'bg-white/60 backdrop-blur-sm'} rounded-xl p-2 -m-2`}>
                        <p className={`text-xs font-medium uppercase tracking-wider mb-1 ${isDarkTheme ? 'text-blue-400' : 'text-gray-500'}`}>{t[language].impact.metrics}</p>
                        <div className="flex items-baseline gap-2">
                          <span className={`text-5xl font-black ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>{counts.improvement}</span>
                          <span className={`text-2xl font-bold ${isDarkTheme ? 'text-blue-400' : 'text-blue-600'}`}>%</span>
                        </div>
                        <p className={`text-sm mt-1 ${isDarkTheme ? 'text-blue-300/70' : 'text-gray-500'}`}>{t[language].impact.improvement}</p>
                      </div>
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${isDarkTheme ? 'bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/40' : 'bg-gradient-to-br from-blue-500 to-indigo-500 shadow-lg shadow-blue-500/20'}`}>
                        <TrendingUp className="w-7 h-7 text-white" />
                      </div>
                    </div>
                    {/* Main progress bar */}
                    <div className={`mt-4 h-2 rounded-full overflow-hidden ${isDarkTheme ? 'bg-gray-800' : 'bg-gray-200/80'}`}>
                      <div 
                        className={`h-full rounded-full transition-all duration-700 ease-out ${isDarkTheme ? 'bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500' : 'bg-gradient-to-r from-blue-500 to-indigo-500'}`}
                        style={{ width: `${counts.improvement}%`, boxShadow: isDarkTheme ? '0 0 12px rgba(99, 102, 241, 0.5)' : '0 0 12px rgba(99, 102, 241, 0.3)' }}
                      />
                    </div>
                  </div>
                  
                  {/* Divider */}
                  <div className={`h-px mb-5 relative ${isDarkTheme ? 'bg-blue-500/20' : 'bg-gray-200/80'}`} style={{ zIndex: 2 }}></div>
                  
                  {/* Secondary Metrics - Side by side, semi-transparent */}
                  <div className="relative grid grid-cols-2 gap-4" style={{ zIndex: 2 }}>
                    {/* Completion Rate */}
                    <div className={`p-4 rounded-2xl transition-all duration-300 group hover:scale-[1.02] backdrop-blur-sm ${isDarkTheme ? 'bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/15' : 'bg-white/40 hover:bg-white/70'}`}>
                      <div className="flex items-center gap-2 mb-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isDarkTheme ? 'bg-emerald-500/30' : 'bg-emerald-100/80'}`}>
                          <Target className={`w-4 h-4 ${isDarkTheme ? 'text-emerald-400' : 'text-emerald-600'}`} />
                        </div>
                        <span className={`text-xs font-medium ${isDarkTheme ? 'text-emerald-300' : 'text-gray-600'}`}>{t[language].impact.completion}</span>
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className={`text-3xl font-bold ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>{counts.completion}</span>
                        <span className={`text-lg font-semibold ${isDarkTheme ? 'text-emerald-400' : 'text-emerald-600'}`}>%</span>
                      </div>
                      <div className={`mt-3 h-1.5 rounded-full overflow-hidden ${isDarkTheme ? 'bg-gray-800' : 'bg-gray-200/60'}`}>
                        <div 
                          className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 transition-all duration-700 ease-out"
                          style={{ width: `${counts.completion}%` }}
                        />
                      </div>
                    </div>
                    
                    {/* Usage Rate */}
                    <div className={`p-4 rounded-2xl transition-all duration-300 group hover:scale-[1.02] backdrop-blur-sm ${isDarkTheme ? 'bg-violet-500/10 border border-violet-500/20 hover:bg-violet-500/15' : 'bg-white/40 hover:bg-white/70'}`}>
                      <div className="flex items-center gap-2 mb-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isDarkTheme ? 'bg-violet-500/30' : 'bg-violet-100/80'}`}>
                          <Users className={`w-4 h-4 ${isDarkTheme ? 'text-violet-400' : 'text-violet-600'}`} />
                        </div>
                        <span className={`text-xs font-medium ${isDarkTheme ? 'text-violet-300' : 'text-gray-600'}`}>{t[language].impact.usage}</span>
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className={`text-3xl font-bold ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>{counts.usage}</span>
                        <span className={`text-lg font-semibold ${isDarkTheme ? 'text-violet-400' : 'text-violet-600'}`}>%</span>
                      </div>
                      <div className={`mt-3 h-1.5 rounded-full overflow-hidden ${isDarkTheme ? 'bg-white/10' : 'bg-gray-200/60'}`}>
                        <div 
                          className="h-full rounded-full bg-gradient-to-r from-violet-400 to-purple-400 transition-all duration-700 ease-out"
                          style={{ width: `${counts.usage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Decorative background element */}
              <div className={`absolute -inset-2 rounded-3xl transform rotate-1 -z-10 hidden md:block ${isDarkTheme ? 'bg-gradient-to-br from-blue-600/20 via-indigo-600/20 to-purple-600/20' : 'bg-gradient-to-br from-gray-200 to-gray-100'}`}></div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={`py-24 px-4 relative overflow-hidden ${isDarkTheme ? 'bg-gradient-to-br from-gray-950 via-slate-950 to-gray-950' : 'bg-white'}`}>
        {isDarkTheme && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-blue-600/8 to-cyan-600/4 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-br from-indigo-600/8 to-purple-600/4 rounded-full blur-3xl"></div>
          </div>
        )}
        <div className="section-divider absolute top-0 left-0 right-0"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-20">
            <h2 className={`text-4xl md:text-5xl font-bold mb-8 tracking-tight ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>
              {t[language].about.title}
            </h2>
            <p className={`text-lg leading-relaxed ${isDarkTheme ? 'text-blue-100' : 'text-gray-600'}`}>
              {t[language].about.desc}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {t[language].aboutCards.map((card, idx) => (
              <div key={idx} className={`p-8 rounded-2xl hover-lift group transition-all duration-300 ${isDarkTheme ? 'bg-white/10 backdrop-blur-xl border border-white/10' : 'card-light'}`}>
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  {idx === 0 && <BookOpen className="w-8 h-8 text-white" />}
                  {idx === 1 && <Code className="w-8 h-8 text-white" />}
                  {idx === 2 && <TrendingUp className="w-8 h-8 text-white" />}
                </div>
                <h3 className={`text-xl font-bold mb-4 ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>{card.title}</h3>
                <p className={`leading-relaxed ${isDarkTheme ? 'text-blue-100' : 'text-gray-600'}`}>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className={`py-24 px-4 relative overflow-hidden ${isDarkTheme ? 'bg-gray-950' : 'bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50/30'}`}>
        {isDarkTheme && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-40 left-20 w-80 h-80 bg-gradient-to-br from-blue-600/8 to-cyan-600/4 rounded-full blur-3xl"></div>
            <div className="absolute bottom-40 right-20 w-96 h-96 bg-gradient-to-br from-indigo-600/8 to-purple-600/4 rounded-full blur-3xl"></div>
          </div>
        )}
        <div className="section-divider absolute top-0 left-0 right-0"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 tracking-tight ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>
              {t[language].projects.title}
            </h2>
            <p className={`text-xl max-w-2xl mx-auto ${isDarkTheme ? 'text-blue-100' : 'text-gray-600'}`}>
              {t[language].projects.desc}
            </p>
          </div>

          {/* E-Learning Modules */}
          <div className="mb-16">
            <h3 className={`text-2xl font-bold mb-8 flex items-center gap-3 ${isDarkTheme ? 'text-white' : 'text-gray-800'}`}>
              <span className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                <BookOpen className="w-5 h-5 text-white" />
              </span>
              {t[language].projects.eLearning}
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.filter(p => [
                "Plain Language and Inclusivity",
                "Practical Setup and Troubleshooting of Two-Factor Authentication (2FA)"
              ].includes(p.title.en)).map((project, index) => {
                let imgSrc = "";
                if (project.title.en === "Plain Language and Inclusivity") imgSrc = "/images/b1.png";
                else if (project.title.en === "Practical Setup and Troubleshooting of Two-Factor Authentication (2FA)") imgSrc = "/images/b2.png";
                return (
                  <a key={index} href={project.link} target="_blank" rel="noopener noreferrer" className={`rounded-2xl overflow-hidden group block flex flex-col relative hover-lift transition-all duration-300 ${isDarkTheme ? 'bg-white/10 backdrop-blur-xl border border-white/10' : 'card-light'}`} style={{width: '100%', maxWidth: '420px', minHeight: '520px', textDecoration: 'none'}}>
                    <div className="relative overflow-hidden">
                      <img src={imgSrc} alt={project.title[language]} className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-3 py-1 bg-blue-500 text-white rounded-full text-xs font-semibold">
                          {project.category[language]}
                        </span>
                      </div>
                      <h3 className={`text-lg font-bold transition-colors duration-200 mb-2 leading-tight ${isDarkTheme ? 'text-white group-hover:text-blue-300' : 'text-gray-900 group-hover:text-blue-600'}`}>
                        {project.title[language]}
                      </h3>
                      <p className={`mb-3 leading-relaxed flex-1 text-sm ${isDarkTheme ? 'text-blue-100' : 'text-gray-600'}`}>
                        {project.description[language]}
                      </p>
                      <p className={`text-xs mb-3 ${isDarkTheme ? 'text-blue-200' : 'text-gray-500'}`}>
                        <span className={`font-semibold ${isDarkTheme ? 'text-blue-300' : 'text-blue-700'}`}>{language === 'en' ? 'Tools:' : 'Tools:'}</span>{' '}
                        {project.tools[language].join(' · ')}
                      </p>
                      <div>
                        <p className={`text-xs font-semibold mb-2 ${isDarkTheme ? 'text-blue-200' : 'text-gray-700'}`}>{language === 'en' ? 'Key Results:' : 'Ergebnisse:'}</p>
                        <div className="space-y-1">
                          {project.results[language].map((result, i) => (
                            <div key={i} className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                              <span className={`text-xs leading-tight ${isDarkTheme ? 'text-blue-100' : 'text-gray-600'}`}>{result}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Knowledge Base */}
          <div className="mb-16">
            <h3 className={`text-2xl font-bold mb-8 flex items-center gap-3 ${isDarkTheme ? 'text-white' : 'text-gray-800'}`}>
              <span className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center shadow-lg">
                <Code className="w-5 h-5 text-white" />
              </span>
              {t[language].projects.knowledge}
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.filter(p => [
                "LLMs, Sustainability and Climate Change",
                "Climate Change Mitigation Guide"
              ].includes(p.title.en)).map((project, index) => {
                let imgSrc = "";
                if (project.title.en === "LLMs, Sustainability and Climate Change") imgSrc = "/images/c1.png";
                else if (project.title.en === "Climate Change Mitigation Guide") imgSrc = "/images/c2.png";
                return (
                  <a key={index} href={project.link} target="_blank" rel="noopener noreferrer" className={`rounded-2xl overflow-hidden group block flex flex-col relative hover-lift transition-all duration-300 ${isDarkTheme ? 'bg-white/10 backdrop-blur-xl border border-white/10' : 'card-light'}`} style={{width: '100%', maxWidth: '420px', minHeight: '520px', textDecoration: 'none'}}>
                    <div className="relative overflow-hidden">
                      <img src={imgSrc} alt={project.title[language]} className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-3 py-1 bg-indigo-500 text-white rounded-full text-xs font-semibold">
                          {project.category[language]}
                        </span>
                      </div>
                      <h3 className={`text-lg font-bold transition-colors duration-200 mb-2 leading-tight ${isDarkTheme ? 'text-white group-hover:text-blue-300' : 'text-gray-900 group-hover:text-blue-600'}`}>
                        {project.title[language]}
                      </h3>
                      <p className={`mb-3 leading-relaxed flex-1 text-sm ${isDarkTheme ? 'text-blue-100' : 'text-gray-600'}`}>
                        {project.description[language]}
                      </p>
                      <p className={`text-xs mb-3 ${isDarkTheme ? 'text-blue-200' : 'text-gray-500'}`}>
                        <span className={`font-semibold ${isDarkTheme ? 'text-blue-300' : 'text-blue-700'}`}>{language === 'en' ? 'Tools:' : 'Tools:'}</span>{' '}
                        {project.tools[language].join(' · ')}
                      </p>
                      <div>
                        <p className={`text-xs font-semibold mb-2 ${isDarkTheme ? 'text-blue-200' : 'text-gray-700'}`}>{language === 'en' ? 'Key Results:' : 'Ergebnisse:'}</p>
                        <div className="space-y-1">
                          {project.results[language].map((result, i) => (
                            <div key={i} className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                              <span className={`text-xs leading-tight ${isDarkTheme ? 'text-blue-100' : 'text-gray-600'}`}>{result}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Technical Writing */}
          <div className="mb-12">
            <h3 className={`text-2xl font-bold mb-8 flex items-center gap-3 ${isDarkTheme ? 'text-white' : 'text-gray-800'}`}>
              <span className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                <FileText className="w-5 h-5 text-white" />
              </span>
              {t[language].projects.techWriting}
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.filter(p => [
                "Technical Documentation (GitHub)",
                "Welth Health Platform"
              ].includes(p.title.en)).map((project, index) => {
                let imgSrc = "";
                if (project.title.en === "Technical Documentation (GitHub)") imgSrc = "/images/a1.png";
                else if (project.title.en === "Welth Health Platform") imgSrc = "/images/a2.png";
                return (
                  <a key={index} href={project.link} target="_blank" rel="noopener noreferrer" className={`rounded-2xl overflow-hidden group block flex flex-col relative hover-lift transition-all duration-300 ${isDarkTheme ? 'bg-white/10 backdrop-blur-xl border border-white/10' : 'card-light'}`} style={{width: '100%', maxWidth: '420px', minHeight: '520px', textDecoration: 'none'}}>
                    <div className="relative overflow-hidden">
                      <img src={imgSrc} alt={project.title[language]} className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-3 py-1 bg-purple-500 text-white rounded-full text-xs font-semibold">
                          {project.category[language]}
                        </span>
                      </div>
                      <h3 className={`text-lg font-bold transition-colors duration-200 mb-2 leading-tight ${isDarkTheme ? 'text-white group-hover:text-blue-300' : 'text-gray-900 group-hover:text-blue-600'}`}>
                        {project.title[language]}
                      </h3>
                      <p className={`mb-3 leading-relaxed flex-1 text-sm ${isDarkTheme ? 'text-blue-100' : 'text-gray-600'}`}>
                        {project.description[language]}
                      </p>
                      <p className={`text-xs mb-3 ${isDarkTheme ? 'text-blue-200' : 'text-gray-500'}`}>
                        <span className={`font-semibold ${isDarkTheme ? 'text-blue-300' : 'text-blue-700'}`}>{language === 'en' ? 'Tools:' : 'Tools:'}</span>{' '}
                        {project.tools[language].join(' · ')}
                      </p>
                      <div>
                        <p className={`text-xs font-semibold mb-2 ${isDarkTheme ? 'text-blue-200' : 'text-gray-700'}`}>{language === 'en' ? 'Key Results:' : 'Ergebnisse:'}</p>
                        <div className="space-y-1">
                          {project.results[language].map((result, i) => (
                            <div key={i} className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                              <span className={`text-xs leading-tight ${isDarkTheme ? 'text-blue-100' : 'text-gray-600'}`}>{result}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          {/* ...existing code... (removed 'View Full Portfolio' hyperlink) */}
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className={`py-24 px-4 relative overflow-hidden ${isDarkTheme ? 'bg-gradient-to-br from-gray-950 via-slate-950 to-gray-950' : 'bg-white'}`}>
        {isDarkTheme && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-20 w-80 h-80 bg-gradient-to-br from-blue-600/8 to-cyan-600/4 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-indigo-600/8 to-purple-600/4 rounded-full blur-3xl"></div>
          </div>
        )}
        <div className="section-divider absolute top-0 left-0 right-0"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 tracking-tight ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>
              {t[language].skills.title}
            </h2>
            <p className={`text-xl max-w-2xl mx-auto ${isDarkTheme ? 'text-blue-100' : 'text-gray-600'}`}>
              {t[language].skills.desc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {t[language].skillsCategories.map((cat, index) => (
              <div key={index} className={`p-6 rounded-2xl hover-lift transition-all duration-300 ${isDarkTheme ? 'bg-white/10 backdrop-blur-xl border border-white/10' : 'card-light'}`}>
                <h3 className={`text-lg font-bold mb-4 ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>{cat.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((skill, i) => (
                    <span 
                      key={i} 
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium shadow-sm hover:shadow-md transition-all duration-200 ${isDarkTheme ? 'bg-white/10 text-blue-100 border border-white/20 hover:border-blue-400 hover:text-white' : 'bg-gradient-to-r from-gray-50 to-white text-gray-700 border border-gray-200 hover:border-blue-300 hover:text-blue-600'}`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className={`py-24 px-4 relative overflow-hidden ${isDarkTheme ? 'bg-gray-950' : 'bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50/30'}`}>
        {isDarkTheme && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-40 right-20 w-80 h-80 bg-gradient-to-br from-blue-600/8 to-cyan-600/4 rounded-full blur-3xl"></div>
            <div className="absolute bottom-40 left-20 w-96 h-96 bg-gradient-to-br from-indigo-600/8 to-purple-600/4 rounded-full blur-3xl"></div>
          </div>
        )}
        <div className="section-divider absolute top-0 left-0 right-0"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 tracking-tight ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>
              {t[language].experience.title}
            </h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {experienceItems.map((item, idx) => (
              <div key={idx} className={`p-8 rounded-2xl hover-lift transition-all duration-300 ${isDarkTheme ? `bg-white/10 backdrop-blur-xl border ${item.highlight ? 'border-l-4 border-l-blue-400 border-t border-r border-b border-white/10' : 'border-white/10'}` : `bg-white ${item.highlight ? 'border-l-4 border-l-blue-500 shadow-[0_4px_24px_-4px_rgba(59,130,246,0.25)] border border-blue-100' : 'shadow-[0_4px_20px_-2px_rgba(0,0,0,0.1)] border border-gray-100'}`}`}>
                <div className="flex items-start gap-5">
                  <div className={`w-14 h-14 ${item.highlight ? 'bg-gradient-to-br from-blue-500 to-indigo-600' : isDarkTheme ? 'bg-white/20' : 'bg-gray-100'} rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden shadow-md`}> 
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={(item.title && item.title[language]) || ''}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          console.warn('Experience image failed to load:', item.image);
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = '/images/profile.jpg';
                        }}
                      />
                    ) : (
                      <> 
                        {item.icon === 'briefcase' && <Briefcase className={`w-6 h-6 ${item.highlight ? 'text-white' : isDarkTheme ? 'text-blue-200' : 'text-gray-600'}`} />}
                        {item.icon === 'book' && <BookOpen className={`w-6 h-6 ${item.highlight ? 'text-white' : isDarkTheme ? 'text-blue-200' : 'text-gray-600'}`} />}
                      </>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-xl font-bold mb-1 ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>{(item.title && item.title[language]) || ''}</h3>
                    <p className={`font-semibold mb-2 ${item.highlight ? (isDarkTheme ? 'text-blue-300' : 'text-blue-600') : (isDarkTheme ? 'text-blue-200' : 'text-gray-600')}`}>{(item.company && item.company[language]) || ''}</p>
                    <p className={`text-sm mb-4 font-medium ${isDarkTheme ? 'text-blue-200/70' : 'text-gray-500'}`}>{(item.date && item.date[language]) || ''}</p>
                    {item.bullets && item.bullets[language] && item.bullets[language].length > 0 && (
                      <ul className={`space-y-3 ${isDarkTheme ? 'text-blue-100' : 'text-gray-600'}`}>
                        {item.bullets[language].map((b, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${isDarkTheme ? 'bg-blue-400' : 'bg-blue-500'}`}></span>
                            <span className="leading-relaxed" dangerouslySetInnerHTML={{ __html: b }}></span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className={`py-24 px-4 relative overflow-hidden ${isDarkTheme ? 'bg-gradient-to-br from-gray-950 via-slate-950 to-gray-950' : 'bg-white'}`}>
        {isDarkTheme && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-blue-600/8 to-cyan-600/4 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-br from-indigo-600/8 to-purple-600/4 rounded-full blur-3xl"></div>
          </div>
        )}
        <div className="section-divider absolute top-0 left-0 right-0"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 tracking-tight ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>
              {t[language].certifications.title}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {certifications.map((cert, index) => (
              <a
                key={index}
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${(cert.title && cert.title[language]) || ''} - ${((cert.issuer && cert.issuer[language]) || '')}`}
                className={`rounded-2xl hover-lift overflow-hidden group transition-all duration-300 ${isDarkTheme ? 'bg-white/10 backdrop-blur-xl border border-white/10' : 'card-light'}`}
              >
                {cert.image ? (
                  <div className="relative overflow-hidden">
                    <img
                      src={cert.image}
                      alt={(cert.title && cert.title[language]) || ''}
                      className="w-full h-36 object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        try {
                          const src = e.currentTarget.src || '';
                          if (src.endsWith('.svg')) {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = src.replace(/\.svg($|\?)/, '.png$1');
                          } else {
                            e.currentTarget.onerror = null;
                            e.currentTarget.style.display = 'none';
                          }
                        } catch (err) {
                          e.currentTarget.onerror = null;
                          e.currentTarget.style.display = 'none';
                        }
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                ) : (
                  <div className="p-6">
                    <div className="flex items-start gap-3 mb-3">
                      <Award className={`w-6 h-6 flex-shrink-0 ${isDarkTheme ? 'text-blue-400' : 'text-blue-600'}`} />
                      <div>
                        <h3 className={`font-bold mb-1 ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>{(cert.title && cert.title[language]) || ''}</h3>
                        <p className={`text-sm ${isDarkTheme ? 'text-blue-100' : 'text-gray-600'}`}>{(cert.issuer && cert.issuer[language]) || ''}</p>
                        {cert.level && <p className={`text-sm font-semibold ${isDarkTheme ? 'text-blue-300' : 'text-blue-600'}`}>{(cert.level && cert.level[language]) || ''}</p>}
                      </div>
                    </div>
                  </div>
                )}

                <div className="p-6">
                  <div className="mb-3">
                    <h3 className={`font-bold mb-1 transition-colors ${isDarkTheme ? 'text-white group-hover:text-blue-300' : 'text-gray-900 group-hover:text-blue-600'}`}>{(cert.title && cert.title[language]) || ''}</h3>
                    <p className={`text-sm ${isDarkTheme ? 'text-blue-100' : 'text-gray-600'}`}>{(cert.issuer && cert.issuer[language]) || ''}</p>
                    {cert.level && <p className={`text-sm font-semibold mt-1 ${isDarkTheme ? 'text-blue-300' : 'text-blue-600'}`}>{(cert.level && cert.level[language]) || ''}</p>}
                  </div>
                  <p className={`text-sm ${isDarkTheme ? 'text-blue-200/70' : 'text-gray-500'}`}>{(cert.date && cert.date[language]) || ''}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={`py-24 px-4 relative overflow-hidden ${isDarkTheme ? 'bg-gray-950' : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'}`}>
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className={`absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 ${isDarkTheme ? 'bg-blue-600/8' : 'bg-blue-200/30'}`}></div>
          <div className={`absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 ${isDarkTheme ? 'bg-indigo-600/8' : 'bg-indigo-200/30'}`}></div>
        </div>
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h2 className={`text-4xl md:text-5xl font-bold mb-8 tracking-tight ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>
            {t[language].contact.title}
          </h2>
          <p className={`text-xl mb-12 max-w-2xl mx-auto leading-relaxed ${isDarkTheme ? 'text-blue-100' : 'text-gray-600'}`}>
            {t[language].contact.desc}
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <a 
              href="mailto:gideonsammysen@gmail.com" 
              className={`inline-flex items-center gap-3 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 ${isDarkTheme ? 'bg-white text-blue-600 hover:bg-gray-50' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
            >
              <Mail className="w-5 h-5" />
              {t[language].contact.email}
            </a>
            <a 
              href="https://www.linkedin.com/in/samuel-o-4b9bbb2a8" 
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-3 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 shadow-xl hover:-translate-y-1 ${isDarkTheme ? 'bg-white/10 backdrop-blur text-white border border-white/20 hover:bg-white/20' : 'bg-white text-blue-600 border border-blue-200 hover:bg-blue-50 hover:border-blue-300'}`}
            >
              <Linkedin className="w-5 h-5" />
              {t[language].contact.linkedin}
            </a>
          </div>
          <div className={`mt-12 space-y-2 ${isDarkTheme ? 'text-blue-100' : 'text-gray-600'}`}>
            <p className="flex items-center justify-center gap-2">
              <span className="text-lg">📍</span> {t[language].contact.location}
            </p>
            <p className="flex items-center justify-center gap-2">
              <span className="text-lg">📞</span> {t[language].contact.phone}
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-16 px-4 ${isDarkTheme ? 'bg-black text-white' : 'bg-gray-50 text-gray-900 border-t border-gray-200'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <h3 className={`text-lg font-bold mb-6 ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>{t[language].footer.quickLinks}</h3>
              <div className="space-y-3">
                <a href="#about" className={`block transition-colors duration-200 ${isDarkTheme ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-blue-600'}`}>{t[language].nav.about}</a>
                <a href="#projects" className={`block transition-colors duration-200 ${isDarkTheme ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-blue-600'}`}>{t[language].nav.projects}</a>
                <a href="#skills" className={`block transition-colors duration-200 ${isDarkTheme ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-blue-600'}`}>{t[language].nav.skills}</a>
                <a href="#experience" className={`block transition-colors duration-200 ${isDarkTheme ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-blue-600'}`}>{t[language].nav.experience}</a>
              </div>
            </div>
            <div>
              <h3 className={`text-lg font-bold mb-6 ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>{t[language].footer.samples}</h3>
              <div className="space-y-3">
                <a href="#projects" className={`block transition-colors duration-200 ${isDarkTheme ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-blue-600'}`}>{t[language].footer.eLearning}</a>
                <a href="#projects" className={`block transition-colors duration-200 ${isDarkTheme ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-blue-600'}`}>{t[language].footer.knowledge}</a>
                <a href="https://github.com/Samuelsen1/Tech-Writing-Samples" className={`block transition-colors duration-200 ${isDarkTheme ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-blue-600'}`}>{t[language].footer.techWriting}</a>
                <a href="https://github.com/Samuelsen1" className={`block transition-colors duration-200 ${isDarkTheme ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-blue-600'}`}>{t[language].footer.github}</a>
              </div>
            </div>
            <div>
              <h3 className={`text-lg font-bold mb-6 ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>Connect</h3>
              <div className="flex gap-4">
                <a href="https://www.linkedin.com/in/samuel-o-4b9bbb2a8" target="_blank" rel="noopener noreferrer" className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 ${isDarkTheme ? 'bg-white/10 text-white hover:bg-blue-600' : 'bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white'}`}>
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="https://github.com/Samuelsen1" target="_blank" rel="noopener noreferrer" className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 ${isDarkTheme ? 'bg-white/10 text-white hover:bg-gray-700' : 'bg-gray-200 text-gray-700 hover:bg-gray-800 hover:text-white'}`}>
                  <Github className="w-5 h-5" />
                </a>
                <a href="mailto:gideonsammysen@gmail.com" className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 ${isDarkTheme ? 'bg-white/10 text-white hover:bg-blue-600' : 'bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white'}`}>
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
          <div className={`border-t pt-8 text-center ${isDarkTheme ? 'border-gray-800' : 'border-gray-300'}`}>
            <p className={isDarkTheme ? 'text-gray-400' : 'text-gray-600'}>
              {t[language].footer.copyright}
            </p>
            <p className={`text-sm mt-2 ${isDarkTheme ? 'text-gray-500' : 'text-gray-500'}`}>
              {t[language].footer.built}
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Accessibility Button */}
      <div className="fixed bottom-6 left-6 z-50" style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}>
          {isAccessibilityOpen && (
            <div 
              className="absolute bottom-20 left-0 w-80 rounded-3xl shadow-2xl backdrop-blur-xl mb-4 overflow-hidden flex flex-col border"
              style={{
                background: isDarkTheme ? 'rgba(15,23,42,0.95)' : 'rgba(255,255,255,0.98)',
                borderColor: 'rgba(124,58,237,0.12)',
                maxHeight: 'min(70vh, calc(100vh - 150px))',
                maxHeight: 'min(70dvh, calc(100dvh - 150px))'
              }}
            >
              {/* Header bar - PURPLE */}
              <div 
                className="flex justify-between items-center px-4 py-3 border-b flex-shrink-0 min-h-[52px]" 
                style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)', borderColor: 'rgba(255,255,255,0.15)' }}
              >
                <h3 className="text-base font-bold text-white">
                  {language === 'en' ? 'Accessibility' : 'Barrierefreiheit'}
                </h3>
                <button
                  onClick={() => setIsAccessibilityOpen(false)}
                  className="p-1.5 rounded-lg transition-all flex-shrink-0 hover:bg-white/20"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              <div className="overflow-y-auto flex-1 p-5 overscroll-contain">
                {/* Settings Grid */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { key: 'contrast', label: language === 'en' ? 'Contrast' : 'Kontrast', fullLabel: language === 'en' ? 'Full Contrast' : 'Voller Kontrast', icon: '/images/contrast.png' },
                    { key: 'mark', label: language === 'en' ? 'Mark Links' : 'Links markieren', icon: '/images/link.png', isBinary: true },
                    { key: 'largeText', label: language === 'en' ? 'Larger Text' : 'Größere Schrift', fullLabel: language === 'en' ? 'Large Text' : 'Große Schrift', icon: '/images/larger-font.png' },
                    { key: 'textSpacing', label: language === 'en' ? 'Text Spacing' : 'Textabstand', fullLabel: language === 'en' ? 'Full Spacing' : 'Voller Abstand', icon: '/images/spacing.png' },
                    { key: 'stopAnimations', label: language === 'en' ? 'Stop Animations' : 'Animationen stoppen', icon: '/images/pause-button.png', isBinary: true },
                    { key: 'hideImages', label: language === 'en' ? 'Hide Images' : 'Bilder verbergen', icon: '/images/hide-images.png', isBinary: true },
                    { key: 'dyslexia', label: language === 'en' ? 'Dyslexia Font' : 'Dyslexie-Schrift', fullLabel: language === 'en' ? 'Full Dyslexia' : 'Voll Dyslexie', icon: '/images/dyslexia.png' },
                    { key: 'rowHeight', label: language === 'en' ? 'Row Height' : 'Zeilenhöhe', fullLabel: language === 'en' ? 'Max Height' : 'Max. Höhe', icon: '/images/row-height.png' },
                    { key: 'focusIndicator', label: language === 'en' ? 'Focus Indicator' : 'Fokus-Anzeige', fullLabel: language === 'en' ? 'Strong Focus' : 'Starker Fokus', icon: '/images/focus.png' },
                    { key: 'saturation', label: language === 'en' ? 'Saturation' : 'Sättigung', fullLabel: language === 'en' ? 'Full Saturation' : 'Volle Sättigung', icon: '/images/saturation.png' }
                  ].map(setting => {
                    const isActive = accessibility[setting.key] > 0;
                    const isFull = accessibility[setting.key] === 2;
                    const isImageIcon = typeof setting.icon === 'string';
                    const isBinary = setting.isBinary === true;
                  
                    return (
                      <button 
                        key={setting.key}
                        onClick={() => toggleAccessibility(setting.key)}
                        aria-pressed={isActive}
                        aria-label={`${setting.label}${isActive ? ` - ${isFull ? setting.fullLabel || setting.label : language === 'en' ? 'Enabled' : 'Aktiviert'}` : ''}`}
                        className={`flex flex-col items-center gap-2 p-3 rounded-2xl transition-all border-2 text-sm font-medium ${
                          !isActive 
                            ? (isDarkTheme ? 'bg-transparent border-gray-700/40 hover:border-purple-400/40' : 'bg-gray-50 border-gray-200 hover:border-purple-400/40')
                            : (isDarkTheme ? 'bg-purple-500/20 border-purple-400' : 'bg-purple-100 border-purple-400')
                        }`}
                      >
                        <div className="w-8 h-8 rounded-md flex items-center justify-center" style={{ background: isActive ? 'linear-gradient(90deg,#7c3aed,#6d28d9)' : 'transparent' }}>
                          {isImageIcon ? (
                            <img src={setting.icon} alt={setting.label} className={`w-6 h-6 ${isActive ? 'brightness-0 invert' : ''}`} />
                          ) : (
                            <setting.icon className={`w-6 h-6 ${isActive ? 'text-white' : (isDarkTheme ? 'text-gray-400' : 'text-gray-600')}`} />
                          )}
                        </div>
                        <span className={`text-xs text-center leading-tight ${isActive ? (isDarkTheme ? 'text-purple-100' : 'text-purple-900') : (isDarkTheme ? 'text-gray-300' : 'text-gray-700')}`}>
                          {!isActive ? setting.label : (isFull && !isBinary ? (setting.fullLabel || setting.label) : setting.label)}
                        </span>
                        {/* Intensity bars - 1 for binary, 2 for gradual */}
                        <div className="flex gap-0.5 mt-2">
                          <span className={`h-1 rounded-sm transition-all ${accessibility[setting.key] >= 1 ? 'bg-purple-600 w-3' : (isDarkTheme ? 'bg-gray-700/30 w-2' : 'bg-gray-300 w-2')}`} />
                          {!isBinary && (
                            <span className={`h-1 rounded-sm transition-all ${accessibility[setting.key] >= 2 ? 'bg-purple-600 w-3' : (isDarkTheme ? 'bg-gray-700/30 w-2' : 'bg-gray-300 w-2')}`} />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Reset Button */}
                <button
                  onClick={resetAccessibility}
                  className={`w-full mt-6 py-2.5 px-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 border ${isDarkTheme ? 'bg-purple-600/20 text-purple-100 border-purple-500/40 hover:bg-purple-600/30' : 'bg-purple-100 text-purple-900 border-purple-300 hover:bg-purple-200'}`}
                >
                  <RotateCcw className="w-4 h-4" />
                  {language === 'en' ? 'Reset All' : 'Alle zurücksetzen'}
                </button>
              </div>
            </div>
          )}

        {/* Floating Button */}
        <button
          onClick={() => setIsAccessibilityOpen(!isAccessibilityOpen)}
          className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-white transition-all duration-300 relative group ${
            isAccessibilityOpen ? 'scale-95' : 'hover:scale-110'
          }`}
          style={{
            background: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)',
            boxShadow: isDarkTheme 
              ? '0 4px 12px rgba(124, 58, 237, 0.4), inset 0 1px 2px rgba(255, 255, 255, 0.1)' 
              : '0 4px 15px rgba(124, 58, 237, 0.35), inset 0 1px 2px rgba(255, 255, 255, 0.2)'
          }}
          aria-label={language === 'en' ? 'Accessibility options' : 'Barrierefreiheitsoptionen'}
          title={language === 'en' ? 'Accessibility' : 'Barrierefreiheit'}
        >
          <img src="/images/accessibility.png" alt="Accessibility" className="w-[51px] h-[51px] brightness-0 invert" />
          {/* Subtle border effect */}
          <div 
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              border: '2px solid rgba(255, 255, 255, 0.15)',
              boxShadow: 'inset 0 0 20px rgba(255, 255, 255, 0.05)'
            }}
          />
        </button>
      </div>
    </div>
  );
}


