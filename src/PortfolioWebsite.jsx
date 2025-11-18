import React, { useState } from 'react';
import { Code, BookOpen, Briefcase, Mail, Linkedin, Github, ExternalLink, Award, Zap, CheckCircle, TrendingUp, FileText } from 'lucide-react';

export default function PortfolioWebsite() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState('en');

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
        title: "Instructional Designer",
        subtitle: "& E-Learning Developer",
        desc: "Transforming complex concepts into engaging, high-impact digital learning experiences. Leveraging learning science, multimedia design, and modern web technologies to create scalable, inclusive solutions.",
        viewProjects: "View Projects",
        getInTouch: "Get In Touch",
        viewCV: "View CV"
      },
      about: {
        title: "About Me",
        desc: "Educator-turned-Instructional Designer. I leverage classroom experience to build inclusive, high-impact digital learning solutions. My approach combines learning science (ADDIE, Bloom's Taxonomy, Adult Learning Theory) with modern technology to create engaging courses and technical documentation that drive measurable results."
      },
      projects: {
        title: "Featured Projects",
        desc: "Instructional design projects categorized by type and impact",
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
            title: { en: "Global Academy Internship - Online Training", de: "Praktikum Global Academy - Online Training" },
            company: { en: "Dräger, Lübeck", de: "Dräger, Lübeck" },
            date: { en: "Starting February 2026", de: "Beginn Februar 2026" },
            bullets: { en: [], de: [] },
            highlight: true,
            icon: "briefcase",
            iconBg: "bg-blue-100",
            image: "/images/drager.png?v=2"
          },
          {
            title: { en: "Web & Instructional Design Intern", de: "Web- & Instruktionsdesign-Praktikant" },
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
        title: "Certifications & Training"
      },
      contact: {
        title: "Let's Create Something Great Together",
        desc: "Looking for an instructional designer who combines learning science with technical expertise? Let's connect and discuss how I can help transform your learning initiatives.",
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
        copyright: "© 2025 Samuel Afriyie Opoku • Instructional Designer & E-Learning Developer",
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
          title: "Learning Science",
          desc: "Applying ADDIE framework, cognitive load theory, and evidence-based instructional strategies to create effective learning experiences."
        },
        {
          title: "Technical Skills",
          desc: "Full-stack toolkit spanning e-learning authoring (Articulate 360), multimedia design (Adobe Suite), and web development (React, Tailwind CSS)."
        },
        {
          title: "Measurable Impact",
          desc: "Delivering learning solutions with proven results: 40% knowledge gains, 96% completion rates, and sustained behavioral change."
        }
      ],
      skillsCategories: [
        {
          title: "Instructional Design",
          items: ["ADDIE Framework", "Bloom's Taxonomy", "Adult Learning Theory", "Storyboarding", "LXD", "Curriculum Development"]
        },
        {
          title: "E-Learning Tools",
          items: ["Articulate 360 (Storyline, Rise)", "Moodle", "SCORM", "Adobe Premiere Pro", "Adobe Photoshop", "Figma"]
        },
        {
          title: "Web Development",
          items: ["HTML", "CSS", "Tailwind CSS", "ReactJS", "Markdown", "GitHub", "VS Code", "Responsive Design"]
        },
        {
          title: "Content Creation",
          items: ["Technical Writing", "Multimedia Design", "Knowledge Base Documentation", "Cross-Cultural Adaptation"]
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
        title: "Lerndesigner",
        subtitle: "& E-Learning Entwickler",
        desc: "Komplexe Konzepte in ansprechende, wirkungsvolle digitale Lernerfahrungen verwandeln. Lernwissenschaft, Multimediadesign und moderne Webtechnologien für skalierbare, inklusive Lösungen.",
        viewProjects: "Projekte ansehen",
        getInTouch: "Kontakt aufnehmen",
        viewCV: "Lebenslauf ansehen"
      },
      about: {
        title: "Über mich",
        desc: "Lehrer, jetzt Instruktionsdesigner. Ich nutze meine Unterrichtserfahrung, um inklusive, wirkungsvolle digitale Lernlösungen zu entwickeln. Mein Ansatz kombiniert Lernwissenschaft (ADDIE, Bloom's Taxonomie, Erwachsenenlerntheorie) mit moderner Technologie für ansprechende Kurse und technische Dokumentation, die messbare Ergebnisse liefern."
      },
      projects: {
        title: "Ausgewählte Projekte",
        desc: "Instruktionsdesign-Projekte nach Typ und Wirkung kategorisiert",
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
            title: { en: "Global Academy Internship - Online Training", de: "Praktikum Global Academy - Online Training" },
            company: { en: "Dräger, Lübeck", de: "Dräger, Lübeck" },
            date: { en: "Starting February 2026", de: "Beginn Februar 2026" },
            bullets: { en: [], de: [] },
            highlight: true,
            icon: "briefcase",
            iconBg: "bg-blue-100",
            image: "/images/drager.png?v=2"
          },
          {
            title: { en: "Web & Instructional Design Intern", de: "Web- & Instruktionsdesign-Praktikant" },
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
        desc: "Suchen Sie einen Instruktionsdesigner, der Lernwissenschaft mit technischer Expertise verbindet? Lassen Sie uns sprechen, wie ich Ihre Lerninitiativen verbessern kann.",
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
        copyright: "© 2025 Samuel Afriyie Opoku • Instruktionsdesigner & E-Learning Entwickler",
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
          title: "Lernwissenschaft",
          desc: "ADDIE-Framework, kognitive Belastungstheorie und evidenzbasierte Instruktionsstrategien für effektive Lernerfahrungen anwenden."
        },
        {
          title: "Technische Fähigkeiten",
          desc: "Full-Stack-Toolkit für E-Learning-Autorentools (Articulate 360), Multimediadesign (Adobe Suite) und Webentwicklung (React, Tailwind CSS)."
        },
        {
          title: "Messbare Wirkung",
          desc: "Lernlösungen mit nachweisbaren Ergebnissen: 40% Wissenszuwachs, 96% Abschlussrate und nachhaltige Verhaltensänderung."
        }
      ],
      skillsCategories: [
        {
          title: "Instruktionsdesign",
          items: ["ADDIE-Framework", "Bloom's Taxonomie", "Erwachsenenlerntheorie", "Storyboarding", "LXD", "Curriculumentwicklung"]
        },
        {
          title: "E-Learning-Tools",
          items: ["Articulate 360 (Storyline, Rise)", "Moodle", "SCORM", "Adobe Premiere Pro", "Adobe Photoshop", "Figma"]
        },
        {
          title: "Webentwicklung",
          items: ["HTML", "CSS", "Tailwind CSS", "ReactJS", "Markdown", "GitHub", "VS Code", "Responsives Design"]
        },
        {
          title: "Content-Erstellung",
          items: ["Technisches Schreiben", "Multimediadesign", "Wissensdatenbank-Dokumentation", "Interkulturelle Anpassung"]
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
        en: "Created with Articulate Rise, focusing on making content accessible and inclusive for all users.",
        de: "Erstellt mit Articulate Rise, mit Fokus auf barrierefreie und inklusive Inhalte für alle Nutzer."
      },
      tools: {
        en: ["Articulate Rise", "Figma", "InVideo AI"],
        de: ["Articulate Rise", "Figma", "InVideo AI"]
      },
      results: {
        en: ["Improved accessibility", "Enhanced user engagement", "Clear communication"],
        de: ["Verbesserte Barrierefreiheit", "Erhöhte Nutzerbindung", "Klare Kommunikation"]
      },
      link: "https://360.eu.articulate.com/review/content/c31705cd-3bed-4851-84bd-992bf5c13eb9/review",
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
        en: ["Complete ADDIE framework", "Multi-level strategies", "Evidence-based content"],
        de: ["Vollständiges ADDIE-Framework", "Mehrstufige Strategien", "Evidenzbasierte Inhalte"]
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
        en: "Instructional Design Foundations & Applications",
        de: "Grundlagen & Anwendungen des Instruktionsdesigns"
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
      // Updated to point to Board Infinity partner page per user request
      link: "https://www.coursera.org/partners/board-infinity",
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
          50% { transform: translateY(-50px); }
        }
        @keyframes orbit-1 {
          0% { transform: translate(0, 0); }
          25% { transform: translate(80px, -30px); }
          50% { transform: translate(0, -80px); }
          75% { transform: translate(-80px, -30px); }
          100% { transform: translate(0, 0); }
        }
        @keyframes orbit-2 {
          0% { transform: translate(0, 0); }
          25% { transform: translate(-60px, 40px); }
          50% { transform: translate(0, 80px); }
          75% { transform: translate(60px, 40px); }
          100% { transform: translate(0, 0); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-80px); }
        }
        @keyframes rotate-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes pulse-bright {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        .animate-float-1 { animation: float-up-down 6s ease-in-out infinite; animation-delay: 0s; }
        .animate-float-2 { animation: orbit-1 8s ease-in-out infinite; animation-delay: 0.5s; }
        .animate-float-3 { animation: orbit-2 7s ease-in-out infinite; animation-delay: 1s; }
        .animate-pulse-glow { animation: pulse-bright 4s ease-in-out infinite; animation-delay: 0s; }
        .animate-rotate { animation: rotate-slow 20s linear infinite; }
      `}</style>
      <style>{`\n        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&family=Inter:wght@600;700;800&display=swap');\n        body { font-family: 'Helvetica neue', sans-serif; }\n        h1, h2, h3, h4, h5, h6 { font-family: 'Inter', sans-serif; }\n      `}</style>

      {/* Navigation + Language Switcher */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-sm z-50 border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-6">
              <div className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                {t[language].name}
              </div>
              <div className="flex items-center gap-2">
                <button
                  className={`px-2 py-1 rounded text-sm font-semibold border flex items-center gap-1 ${language === 'en' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-blue-600 border-blue-300'}`}
                  onClick={() => setLanguage('en')}
                  aria-label="Switch to English"
                >
                  <img src="/images/us.svg.webp" alt="English" className="w-5 h-5" />
                </button>
                <button
                  className={`px-2 py-1 rounded text-sm font-semibold border flex items-center gap-1 ${language === 'de' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-blue-600 border-blue-300'}`}
                  onClick={() => setLanguage('de')}
                  aria-label="Switch to German"
                >
                  <img src="/images/ger.svg.png" alt="Deutsch" className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#about" className="text-gray-700 hover:text-blue-600 transition font-medium">{t[language].nav.about}</a>
              <a href="#projects" className="text-gray-700 hover:text-blue-600 transition font-medium">{t[language].nav.projects}</a>
              <a href="#skills" className="text-gray-700 hover:text-blue-600 transition font-medium">{t[language].nav.skills}</a>
              <a href="#experience" className="text-gray-700 hover:text-blue-600 transition font-medium">{t[language].nav.experience}</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 transition font-medium">{t[language].nav.contact}</a>
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
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-blue-50 via-white to-blue-50 relative overflow-hidden">
        {/* Education-Themed Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Animated Book Icon - Floating upward */}
          <div className="absolute top-20 left-12 w-20 h-20 animate-float-1 opacity-40">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-full h-full text-blue-600">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" strokeWidth="1.5"/>
              <path d="M8 7h8M8 11h8M8 15h4" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          
          {/* Animated Atom/Molecule Icon - Floating upward */}
          <div className="absolute top-40 right-20 w-16 h-16 animate-float-2 opacity-40">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-full h-full text-indigo-600">
              <circle cx="12" cy="12" r="2" fill="currentColor"/>
              <path d="M12 12c3.5 0 6-1.34 6-3s-2.5-3-6-3-6 1.34-6 3 2.5 3 6 3z"/>
              <path d="M12 12c3.5 0 6 1.34 6 3s-2.5 3-6 3-6-1.34-6-3 2.5-3 6-3z" transform="rotate(60 12 12)"/>
              <path d="M12 12c3.5 0 6 1.34 6 3s-2.5 3-6 3-6-1.34-6-3 2.5-3 6-3z" transform="rotate(120 12 12)"/>
            </svg>
          </div>
          
          {/* Animated Lightbulb Icon - Floating upward */}
          <div className="absolute bottom-32 left-1/4 w-20 h-20 animate-float-3 opacity-40">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-full h-full text-cyan-600">
              <path d="M9 18h6M12 2a6 6 0 0 0-6 6c0 2.667 1.5 3.5 1.5 5.5 0 1 .5 1 .5 2H16c0-1 .5-1 .5-2 0-2 1.5-2.833 1.5-5.5a6 6 0 0 0-6-6z" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M10 20a2 2 0 0 0 4 0" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M9 17h6" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          
          {/* Orbiting molecules/atoms - SVG based */}
          <div className="absolute top-1/3 left-1/3 w-32 h-32">
            <svg viewBox="0 0 100 100" className="w-full h-full animate-rotate">
              <circle cx="50" cy="50" r="45" fill="none" stroke="#93c5fd" strokeWidth="1" opacity="0.3"/>
              <circle cx="50" cy="50" r="8" fill="#3b82f6" opacity="0.6"/>
              <circle cx="50" cy="15" r="4" fill="#60a5fa" className="animate-pulse-glow"/>
              <circle cx="82" cy="65" r="3.5" fill="#818cf8" className="animate-pulse-glow" style={{ animationDelay: '1s' }}/>
              <circle cx="18" cy="65" r="3.5" fill="#06b6d4" className="animate-pulse-glow" style={{ animationDelay: '0.5s' }}/>
            </svg>
          </div>

          {/* Secondary orbital system - SVG based */}
          <div className="absolute bottom-1/4 right-1/3 w-40 h-40">
            <svg viewBox="0 0 100 100" className="w-full h-full animate-rotate" style={{ animationDirection: 'reverse' }}>
              <circle cx="50" cy="50" r="40" fill="none" stroke="#a78bfa" strokeWidth="1.5" opacity="0.25"/>
              <circle cx="50" cy="50" r="6" fill="#6366f1"/>
              <circle cx="50" cy="20" r="3.5" fill="#818cf8" className="animate-pulse-glow" style={{ animationDelay: '1.5s' }}/>
              <circle cx="75" cy="50" r="3.5" fill="#3b82f6" className="animate-pulse-glow" style={{ animationDelay: '2s' }}/>
              <circle cx="50" cy="80" r="3" fill="#06b6d4" className="animate-pulse-glow" style={{ animationDelay: '0.75s' }}/>
            </svg>
          </div>

          {/* Floating gradient orbs */}
          <div className="absolute top-1/2 right-10 w-40 h-40 bg-gradient-to-br from-blue-300 to-cyan-200 rounded-full blur-3xl animate-pulse-glow opacity-30" style={{ animationDelay: '0.75s' }}></div>
          <div className="absolute -top-20 right-1/3 w-32 h-32 bg-gradient-to-br from-indigo-300 to-blue-200 rounded-full blur-2xl animate-float-1 opacity-25"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-6 mb-8">
                <div className="relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full blur opacity-75"></div>
                  <img
                    src="/images/profile.jpg"
                    alt={t[language].name}
                    className="relative rounded-full object-cover border-2 border-white shadow-lg flex-shrink-0"
                    style={{ width: '240px', height: '240px' }}
                  />
                </div>
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                  {t[language].hero.title}<br />
                  <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                    {t[language].hero.subtitle}
                  </span>
                </h1>
              </div>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                {t[language].hero.desc}
              </p>
              <div className="flex flex-wrap gap-4">
                <a 
                  href="#contact" 
                  className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition border-2 border-blue-600"
                >
                  <Mail className="w-5 h-5" />
                  {t[language].hero.getInTouch}
                </a>
                <a 
                  href="/cv.pdf" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  <FileText className="w-5 h-5" />
                  {t[language].hero.viewCV}
                </a>
              </div>
              <div className="flex gap-4 mt-8">
                <a href="https://www.linkedin.com/in/samuel-o-4b9bbb2a8" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600 transition">
                  <Linkedin className="w-6 h-6" />
                </a>
                <a href="https://github.com/Samuelsen1" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600 transition">
                  <Github className="w-6 h-6" />
                </a>
                <a href="mailto:gideonsammysen@gmail.com" className="text-gray-600 hover:text-blue-600 transition">
                  <Mail className="w-6 h-6" />
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="relative z-10">
                <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl p-8 shadow-2xl">
                  <div className="bg-white rounded-xl p-6 shadow-lg">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                        <Zap className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">{t[language].impact.metrics}</p>
                        <p className="text-2xl font-bold text-gray-900">40%</p>
                      </div>
                    </div>
                    <p className="text-gray-600">{t[language].impact.improvement}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="bg-white rounded-xl p-4 shadow-lg">
                      <p className="text-3xl font-bold text-blue-600 mb-1">96%</p>
                      <p className="text-sm text-gray-600">{t[language].impact.completion}</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-lg">
                      <p className="text-3xl font-bold text-blue-600 mb-1">78%</p>
                      <p className="text-sm text-gray-600">{t[language].impact.usage}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl transform rotate-3 opacity-20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              {t[language].about.title}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              {t[language].about.desc}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {t[language].aboutCards.map((card, idx) => (
              <div key={idx} className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl border border-blue-200">
                <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center mb-4">
                  {idx === 0 && <BookOpen className="w-7 h-7 text-white" />}
                  {idx === 1 && <Code className="w-7 h-7 text-white" />}
                  {idx === 2 && <TrendingUp className="w-7 h-7 text-white" />}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{card.title}</h3>
                <p className="text-gray-700">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t[language].projects.title}
            </h2>
            <p className="text-xl text-gray-600">
              {t[language].projects.desc}
            </p>
          </div>

          {/* E-Learning Modules */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-blue-900 mb-6">{t[language].projects.eLearning}</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.filter(p => [
                "Plain Language and Inclusivity",
                "Practical Setup and Troubleshooting of Two-Factor Authentication (2FA)"
              ].includes(p.title.en)).map((project, index) => {
                let imgSrc = "";
                if (project.title.en === "Plain Language and Inclusivity") imgSrc = "/images/b1.png";
                else if (project.title.en === "Practical Setup and Troubleshooting of Two-Factor Authentication (2FA)") imgSrc = "/images/b2.png";
                return (
                  <a key={index} href={project.link} target="_blank" rel="noopener noreferrer" className="rounded-2xl transition overflow-hidden group block flex flex-col" style={{width: '100%', maxWidth: '420px', height: '620px', textDecoration: 'none'}}>
                    <img src={imgSrc} alt={project.title[language]} className="w-full h-64 object-cover rounded-t-2xl flex-shrink-0" />
                    <div className="p-5 rounded-b-2xl bg-white flex-1 flex flex-col">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-3 py-1 bg-blue-900 text-white rounded-full text-xs font-semibold">
                          {project.category[language]}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition">
                        {project.title[language]}
                      </h3>
                      <p className="text-gray-700 mb-3 leading-relaxed flex-1 text-sm">
                        {project.description[language]}
                      </p>
                      <div className="mb-3">
                        <p className="text-sm font-semibold text-blue-700 mb-2">{language === 'en' ? 'Tools Used:' : 'Verwendete Tools:'}</p>
                        <div className="flex flex-wrap gap-2">
                          {project.tools[language].map((tool, i) => (
                            <span key={i} className="px-2 py-1 bg-blue-100 text-blue-900 rounded text-xs">
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="mb-2">
                        <p className="text-sm font-semibold text-blue-700 mb-2">{language === 'en' ? 'Key Results:' : 'Ergebnisse:'}</p>
                        <div className="space-y-1">
                          {project.results[language].map((result, i) => (
                            <div key={i} className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                              <span className="text-sm text-gray-700">{result}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <ExternalLink className="w-4 h-4 text-blue-700 absolute top-4 right-4" />
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Knowledge Base */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-blue-800 mb-6">{t[language].projects.knowledge}</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.filter(p => [
                "LLMs, Sustainability and Climate Change",
                "Climate Change Mitigation Guide"
              ].includes(p.title.en)).map((project, index) => {
                let imgSrc = "";
                if (project.title.en === "LLMs, Sustainability and Climate Change") imgSrc = "/images/c1.png";
                else if (project.title.en === "Climate Change Mitigation Guide") imgSrc = "/images/c2.png";
                return (
                  <a key={index} href={project.link} target="_blank" rel="noopener noreferrer" className="rounded-2xl transition overflow-hidden group block flex flex-col" style={{width: '100%', maxWidth: '420px', height: '620px', textDecoration: 'none'}}>
                    <img src={imgSrc} alt={project.title[language]} className="w-full h-64 object-cover rounded-t-2xl flex-shrink-0" />
                    <div className="p-5 rounded-b-2xl bg-white flex-1 flex flex-col">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-3 py-1 bg-blue-700 text-white rounded-full text-xs font-semibold">
                          {project.category[language]}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition">
                        {project.title[language]}
                      </h3>
                      <p className="text-gray-700 mb-3 leading-relaxed flex-1 text-sm">
                        {project.description[language]}
                      </p>
                      <div className="mb-3">
                        <p className="text-sm font-semibold text-blue-700 mb-2">{language === 'en' ? 'Tools Used:' : 'Verwendete Tools:'}</p>
                        <div className="flex flex-wrap gap-2">
                          {project.tools[language].map((tool, i) => (
                            <span key={i} className="px-2 py-1 bg-blue-100 text-blue-900 rounded text-xs">
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="mb-2">
                        <p className="text-sm font-semibold text-blue-700 mb-2">{language === 'en' ? 'Key Results:' : 'Ergebnisse:'}</p>
                        <div className="space-y-1">
                          {project.results[language].map((result, i) => (
                            <div key={i} className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                              <span className="text-sm text-gray-700">{result}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <ExternalLink className="w-4 h-4 text-blue-700 absolute top-4 right-4" />
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Technical Writing */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-blue-600 mb-6">{t[language].projects.techWriting}</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.filter(p => [
                "Technical Documentation (GitHub)",
                "Welth Health Platform"
              ].includes(p.title.en)).map((project, index) => {
                let imgSrc = "";
                if (project.title.en === "Technical Documentation (GitHub)") imgSrc = "/images/a1.png";
                else if (project.title.en === "Welth Health Platform") imgSrc = "/images/a2.png";
                return (
                  <a key={index} href={project.link} target="_blank" rel="noopener noreferrer" className="rounded-2xl transition overflow-hidden group block flex flex-col" style={{width: '100%', maxWidth: '420px', height: '620px', textDecoration: 'none'}}>
                    <img src={imgSrc} alt={project.title[language]} className="w-full h-64 object-cover rounded-t-2xl flex-shrink-0" />
                    <div className="p-5 rounded-b-2xl bg-white flex-1 flex flex-col">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-3 py-1 bg-blue-200 text-blue-900 rounded-full text-xs font-semibold">
                          {project.category[language]}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition">
                        {project.title[language]}
                      </h3>
                      <p className="text-gray-700 mb-3 leading-relaxed flex-1 text-sm">
                        {project.description[language]}
                      </p>
                      <div className="mb-3">
                        <p className="text-sm font-semibold text-blue-700 mb-2">{language === 'en' ? 'Tools Used:' : 'Verwendete Tools:'}</p>
                        <div className="flex flex-wrap gap-2">
                          {project.tools[language].map((tool, i) => (
                            <span key={i} className="px-2 py-1 bg-blue-100 text-blue-900 rounded text-xs">
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="mb-2">
                        <p className="text-sm font-semibold text-blue-700 mb-2">{language === 'en' ? 'Key Results:' : 'Ergebnisse:'}</p>
                        <div className="space-y-1">
                          {project.results[language].map((result, i) => (
                            <div key={i} className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                              <span className="text-sm text-gray-700">{result}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <ExternalLink className="w-4 h-4 text-blue-700 absolute top-4 right-4" />
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
      <section id="skills" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t[language].skills.title}
            </h2>
            <p className="text-xl text-gray-600">
              {t[language].skills.desc}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {t[language].skillsCategories.map((cat, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl border border-blue-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">{cat.title}</h3>
                <div className="flex flex-wrap gap-3">
                  {cat.items.map((skill, i) => (
                    <span 
                      key={i} 
                      className="px-4 py-2 bg-white text-gray-700 rounded-lg font-medium shadow-sm hover:shadow-md transition border border-blue-200"
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
      <section id="experience" className="py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t[language].experience.title}
            </h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {experienceItems.map((item, idx) => (
              <div key={idx} className={`bg-white p-8 rounded-2xl shadow-lg ${item.highlight ? 'border-l-4 border-blue-600' : ''}`}>
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 ${item.iconBg || 'bg-gray-100'} rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden`}> 
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={(item.title && item.title[language]) || ''}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // fallback if image fails to load
                          console.warn('Experience image failed to load:', item.image);
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = '/images/profile.jpg';
                        }}
                      />
                    ) : (
                      <> 
                        {item.icon === 'briefcase' && <Briefcase className={`w-6 h-6 ${item.highlight ? 'text-blue-600' : 'text-gray-600'}`} />}
                        {item.icon === 'book' && <BookOpen className={`w-6 h-6 ${item.highlight ? 'text-blue-600' : 'text-gray-600'}`} />}
                      </>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{(item.title && item.title[language]) || ''}</h3>
                    <p className={`text-${item.highlight ? 'blue' : 'gray'}-600 font-semibold mb-2`}>{(item.company && item.company[language]) || ''}</p>
                    <p className="text-gray-600 text-sm mb-4">{(item.date && item.date[language]) || ''}</p>
                    {item.bullets && item.bullets[language] && item.bullets[language].length > 0 && (
                      <ul className="space-y-2 text-gray-700">
                        {item.bullets[language].map((b, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-gray-400 mt-1">•</span>
                            <span>{b}</span>
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
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t[language].certifications.title}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {certifications.map((cert, index) => (
              <a
                key={index}
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${(cert.title && cert.title[language]) || ''} - ${((cert.issuer && cert.issuer[language]) || '')}`}
                className="block bg-gradient-to-br from-blue-50 to-white rounded-xl border border-blue-200 hover:shadow-lg transition overflow-hidden"
              >
                {cert.image ? (
                  <img
                    src={cert.image}
                    alt={(cert.title && cert.title[language]) || ''}
                    className="w-full h-32 object-cover"
                    onError={(e) => {
                      // If an SVG fails to render, try a PNG with the same name as a fallback, otherwise hide the image
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
                ) : (
                  <div className="p-6">
                    <div className="flex items-start gap-3 mb-3">
                      <Award className="w-6 h-6 text-blue-600 flex-shrink-0" />
                      <div>
                        <h3 className="font-bold text-gray-900 mb-1">{(cert.title && cert.title[language]) || ''}</h3>
                        <p className="text-sm text-gray-600">{(cert.issuer && cert.issuer[language]) || ''}</p>
                        {cert.level && <p className="text-sm text-blue-600 font-semibold">{(cert.level && cert.level[language]) || ''}</p>}
                      </div>
                    </div>
                  </div>
                )}

                <div className="p-6">
                  <div className="mb-2">
                    <h3 className="font-bold text-gray-900 mb-1">{(cert.title && cert.title[language]) || ''}</h3>
                    <p className="text-sm text-gray-600">{(cert.issuer && cert.issuer[language]) || ''}</p>
                    {cert.level && <p className="text-sm text-blue-600 font-semibold">{(cert.level && cert.level[language]) || ''}</p>}
                  </div>
                  <p className="text-sm text-gray-500">{(cert.date && cert.date[language]) || ''}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-gradient-to-br from-blue-600 to-blue-800">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            {t[language].contact.title}
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            {t[language].contact.desc}
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <a 
              href="mailto:gideonsammysen@gmail.com" 
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition shadow-lg"
            >
              <Mail className="w-5 h-5" />
              {t[language].contact.email}
            </a>
            <a 
              href="https://www.linkedin.com/in/samuel-o-4b9bbb2a8" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-800 transition shadow-lg border-2 border-blue-500"
            >
              <Linkedin className="w-5 h-5" />
              {t[language].contact.linkedin}
            </a>
          </div>
          <div className="mt-8 text-blue-100">
            <p className="mb-2">📍 {t[language].contact.location}</p>
            <p>📞 {t[language].contact.phone}</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* ...existing code... */}
            <div>
              <h3 className="text-lg font-bold mb-4">{t[language].footer.quickLinks}</h3>
              <div className="space-y-2">
                <a href="#about" className="block text-gray-400 hover:text-white transition">{t[language].nav.about}</a>
                <a href="#projects" className="block text-gray-400 hover:text-white transition">{t[language].nav.projects}</a>
                <a href="#skills" className="block text-gray-400 hover:text-white transition">{t[language].nav.skills}</a>
                <a href="#experience" className="block text-gray-400 hover:text-white transition">{t[language].nav.experience}</a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">{t[language].footer.samples}</h3>
              <div className="space-y-2">
                <a href="#projects" className="block text-gray-400 hover:text-white transition">{t[language].footer.eLearning}</a>
                <a href="#projects" className="block text-gray-400 hover:text-white transition">{t[language].footer.knowledge}</a>
                <a href="https://github.com/Samuelsen1/Tech-Writing-Samples" className="block text-gray-400 hover:text-white transition">{t[language].footer.techWriting}</a>
                <a href="https://github.com/Samuelsen1" className="block text-gray-400 hover:text-white transition">{t[language].footer.github}</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400">
              {t[language].footer.copyright}
            </p>
            <p className="text-gray-500 text-sm mt-2">
              {t[language].footer.built}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
