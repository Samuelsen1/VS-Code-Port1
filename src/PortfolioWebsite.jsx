import React, { useState } from 'react';
import { Code, BookOpen, Briefcase, Mail, Linkedin, Github, ExternalLink, Award, Globe, FileText, Layers, Zap, CheckCircle, TrendingUp, Users } from 'lucide-react';

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
        getInTouch: "Get In Touch"
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
            iconBg: "bg-blue-100"
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
            iconBg: "bg-gray-100"
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
            iconBg: "bg-gray-100"
          },
          {
            title: { en: "English Language Teacher (Working Student)", de: "Englischlehrer (Werkstudent)" },
            company: { en: "Kovak Hill Educational Centre, Kumasi", de: "Kovak Hill Educational Centre, Kumasi" },
            date: { en: "January 2020 – June 2020", de: "Januar 2020 – Juni 2020" },
            bullets: {
              en: [
                "Developed and delivered lesson plans aligned to curriculum standards and learner engagement strategies.",
                "Supported the organisation of general school events."
              ],
              de: [
                "Lehrpläne entwickelt und durchgeführt, abgestimmt auf Lehrplanstandards und Strategien zur Lernendenbindung.",
                "Unterstützte die Organisation allgemeiner Schulveranstaltungen."
              ]
            },
            highlight: false,
            icon: "book",
            iconBg: "bg-gray-100"
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
        improvement: "Average learning improvement across projects",
        completion: "Completion Rate",
        usage: "Active Usage"
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
        getInTouch: "Kontakt aufnehmen"
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
            iconBg: "bg-blue-100"
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
            iconBg: "bg-gray-100"
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
            iconBg: "bg-gray-100"
          },
          {
            title: { en: "English Language Teacher (Working Student)", de: "Englischlehrer (Werkstudent)" },
            company: { en: "Kovak Hill Educational Centre, Kumasi", de: "Kovak Hill Educational Centre, Kumasi" },
            date: { en: "January 2020 – June 2020", de: "Januar 2020 – Juni 2020" },
            bullets: {
              en: [
                "Developed and delivered lesson plans aligned to curriculum standards and learner engagement strategies.",
                "Supported the organisation of general school events."
              ],
              de: [
                "Lehrpläne entwickelt und durchgeführt, abgestimmt auf Lehrplanstandards und Strategien zur Lernendenbindung.",
                "Unterstützte die Organisation allgemeiner Schulveranstaltungen."
              ]
            },
            highlight: false,
            icon: "book",
            iconBg: "bg-gray-100"
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
        improvement: "Durchschnittliche Lernverbesserung über alle Projekte",
        completion: "Abschlussrate",
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
      link: "https://www.coursera.org/account/accomplishments/verify/VA2HACXYEOYV"
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
      link: "https://www.coursera.org/account/accomplishments/verify/CDOSFZ44QK27?utm_source=link&utm_medium=certificate&utm_content=cert_image&utm_campaign=sharing_cta&utm_product=course"
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
      link: "https://cert.efset.org/1uf78L"
    }
  ];

  const experienceItems = (t[language] && t[language].experience && t[language].experience.items)
    || (t.en && t.en.experience && t.en.experience.items)
    || [];

  return (
    <div className="min-h-screen bg-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&family=Inter:wght@600;700;800&display=swap');
        body { font-family: 'Helvetica neue', sans-serif; }
        h1, h2, h3, h4, h5, h6 { font-family: 'Inter', sans-serif; }
      `}</style>

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
                  className={`px-3 py-1 rounded text-sm font-semibold border flex items-center gap-1 ${language === 'en' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-blue-600 border-blue-300'}`}
                  onClick={() => setLanguage('en')}
                  aria-label="Switch to English"
                >
                  <span role="img" aria-label="US flag">🇺🇸</span> EN
                </button>
                <button
                  className={`px-3 py-1 rounded text-sm font-semibold border flex items-center gap-1 ${language === 'de' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-blue-600 border-blue-300'}`}
                  onClick={() => setLanguage('de')}
                  aria-label="Switch to German"
                >
                  <span role="img" aria-label="German flag">🇩🇪</span> DE
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
            <a href="#skills" className="block px-4 py-3 text-gray-700 hover:bg-blue-50">{t[language].nav.skills}</a>
            <a href="#experience" className="block px-4 py-3 text-gray-700 hover:bg-blue-50">{t[language].nav.experience}</a>
            <a href="#contact" className="block px-4 py-3 text-gray-700 hover:bg-blue-50">{t[language].nav.contact}</a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-6 mb-8">
                <div className="relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full blur opacity-75"></div>
                  <img 
                    src="/images/profile.jpg"
                    alt={t[language].name}
                    className="relative w-60 h-60 rounded-full object-cover border-2 border-white shadow-lg"
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
                  href="#projects" 
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-lg hover:shadow-xl"
                >
                  <Layers className="w-5 h-5" />
                  {t[language].hero.viewProjects}
                </a>
                <a 
                  href="#contact" 
                  className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition border-2 border-blue-600"
                >
                  <Mail className="w-5 h-5" />
                  {t[language].hero.getInTouch}
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
                        <p className="text-2xl font-bold text-gray-900">40%+</p>
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
              ].includes(p.title.en)).map((project, index) => (
                <div key={index} className="bg-gradient-to-br from-blue-800 to-blue-700 rounded-2xl shadow-lg hover:shadow-2xl transition overflow-hidden group">
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-3 py-1 bg-blue-900 text-white rounded-full text-xs font-semibold">
                        {project.category[language]}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-200 transition">
                      {project.title[language]}
                    </h3>
                    <p className="text-blue-100 mb-4 leading-relaxed">
                      {project.description[language]}
                    </p>
                    <div className="mb-4">
                      <p className="text-sm font-semibold text-blue-200 mb-2">{language === 'en' ? 'Tools Used:' : 'Verwendete Tools:'}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tools[language].map((tool, i) => (
                          <span key={i} className="px-2 py-1 bg-blue-900 text-white rounded text-xs">
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="mb-4">
                      <p className="text-sm font-semibold text-blue-200 mb-2">{language === 'en' ? 'Key Results:' : 'Ergebnisse:'}</p>
                      <div className="space-y-1">
                        {project.results[language].map((result, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-blue-100">{result}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <a 
                      href={project.link} 
                      className="inline-flex items-center gap-2 text-blue-200 hover:text-white font-semibold group"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {language === 'en' ? 'View Project' : 'Projekt ansehen'}
                      <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Knowledge Base */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-blue-800 mb-6">{t[language].projects.knowledge}</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.filter(p => [
                "LLMs, Sustainability and Climate Change",
                "Climate Change Mitigation Guide"
              ].includes(p.title.en)).map((project, index) => (
                <div key={index} className="bg-gradient-to-br from-blue-600 to-blue-400 rounded-2xl shadow-lg hover:shadow-2xl transition overflow-hidden group">
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-3 py-1 bg-blue-700 text-white rounded-full text-xs font-semibold">
                        {project.category[language]}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-100 transition">
                      {project.title[language]}
                    </h3>
                    <p className="text-blue-50 mb-4 leading-relaxed">
                      {project.description[language]}
                    </p>
                    <div className="mb-4">
                      <p className="text-sm font-semibold text-blue-100 mb-2">{language === 'en' ? 'Tools Used:' : 'Verwendete Tools:'}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tools[language].map((tool, i) => (
                          <span key={i} className="px-2 py-1 bg-blue-700 text-white rounded text-xs">
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="mb-4">
                      <p className="text-sm font-semibold text-blue-100 mb-2">{language === 'en' ? 'Key Results:' : 'Ergebnisse:'}</p>
                      <div className="space-y-1">
                        {project.results[language].map((result, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-blue-50">{result}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <a 
                      href={project.link} 
                      className="inline-flex items-center gap-2 text-blue-100 hover:text-white font-semibold group"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {language === 'en' ? 'View Project' : 'Projekt ansehen'}
                      <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Writing */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-blue-600 mb-6">{t[language].projects.techWriting}</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.filter(p => [
                "Technical Documentation (GitHub)",
                "Welth Health Platform"
              ].includes(p.title.en)).map((project, index) => (
                <div key={index} className="bg-gradient-to-br from-blue-200 to-blue-100 rounded-2xl shadow-lg hover:shadow-2xl transition overflow-hidden group">
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-3 py-1 bg-blue-200 text-blue-900 rounded-full text-xs font-semibold">
                        {project.category[language]}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-blue-900 mb-3 group-hover:text-blue-600 transition">
                      {project.title[language]}
                    </h3>
                    <p className="text-blue-800 mb-4 leading-relaxed">
                      {project.description[language]}
                    </p>
                    <div className="mb-4">
                      <p className="text-sm font-semibold text-blue-700 mb-2">{language === 'en' ? 'Tools Used:' : 'Verwendete Tools:'}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tools[language].map((tool, i) => (
                          <span key={i} className="px-2 py-1 bg-blue-100 text-blue-900 rounded text-xs">
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="mb-4">
                      <p className="text-sm font-semibold text-blue-700 mb-2">{language === 'en' ? 'Key Results:' : 'Ergebnisse:'}</p>
                      <div className="space-y-1">
                        {project.results[language].map((result, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-blue-800">{result}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <a 
                      href={project.link} 
                      className="inline-flex items-center gap-2 text-blue-700 hover:text-blue-900 font-semibold group"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {language === 'en' ? 'View Project' : 'Projekt ansehen'}
                      <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-12">
            <a 
              href="#" 
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-lg"
            >
              {t[language].projects.viewAll}
              <ExternalLink className="w-5 h-5" />
            </a>
          </div>
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
                  <div className={`w-12 h-12 ${item.iconBg || 'bg-gray-100'} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    {item.icon === 'briefcase' && <Briefcase className={`w-6 h-6 ${item.highlight ? 'text-blue-600' : 'text-gray-600'}`} />}
                    {item.icon === 'book' && <BookOpen className={`w-6 h-6 ${item.highlight ? 'text-blue-600' : 'text-gray-600'}`} />}
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
              <div key={index} className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl border border-blue-200 hover:shadow-lg transition">
                <div className="flex items-start gap-3 mb-3">
                  <Award className="w-6 h-6 text-blue-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{(cert.title && cert.title[language]) || ''}</h3>
                    <p className="text-sm text-gray-600">{(cert.issuer && cert.issuer[language]) || ''}</p>
                    {cert.level && <p className="text-sm text-blue-600 font-semibold">{(cert.level && cert.level[language]) || ''}</p>}
                  </div>
                </div>
                <p className="text-sm text-gray-500">{(cert.date && cert.date[language]) || ''}</p>
                <a href={cert.link} className="inline-flex items-center gap-1 text-blue-600 text-sm font-semibold mt-2 hover:text-blue-700">
                  {language === 'en' ? 'Verify' : 'Zertifikat ansehen'}
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
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
            <p className="mb-2">📍 Based in Marburg, Germany</p>
            <p>📞 +49 171 5811680</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">{t[language].name}</h3>
              <p className="text-gray-400">
                Instructional Designer & E-Learning Developer specializing in evidence-based, 
                technology-enhanced learning solutions.
              </p>
            </div>
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
                <a href="#" className="block text-gray-400 hover:text-white transition">{t[language].footer.eLearning}</a>
                <a href="#" className="block text-gray-400 hover:text-white transition">{t[language].footer.knowledge}</a>
                <a href="#" className="block text-gray-400 hover:text-white transition">{t[language].footer.techWriting}</a>
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