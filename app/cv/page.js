'use client';

import React, { useState, useEffect } from 'react';
import { Mail, Phone, Linkedin, Globe, MapPin } from 'lucide-react';

export default function DigitalLearningCV() {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const langParam = urlParams.get('lang');
      const storedLang = localStorage.getItem('language');
      const currentLang = langParam || storedLang || 'en';

      setLanguage(currentLang);
      document.documentElement.lang = currentLang === 'de' ? 'de' : 'en';
    }
  }, []);

  const t = {
    en: {
      subtitle: 'Digital Learning Designer | Professional Website',
      summary: 'PROFESSIONAL SUMMARY',
      summaryText:
        'Digital Learning Designer combining instructional design theory and practice. Master\'s in Media Studies and Bachelor\'s in Education. Develops accessible, learner-centered e-learning using Articulate 360, Adobe Creative Suite, AI tools, and LMS platforms, with experience in medtech and art/cultural sectors.',
      skills: 'SKILLS & COMPETENCIES',
      tools: 'TOOLS & TECHNOLOGIES',
      experience: 'PROFESSIONAL EXPERIENCE',
      education: 'EDUCATION',
      certifications: 'CERTIFICATIONS & TRAINING',
      portfolioHighlights: 'PORTFOLIO HIGHLIGHTS',
      languages: 'LANGUAGES',
      english: 'English',
      german: 'German',
      akan: 'Akan',
      native: 'Native / Bilingual',
      intermediate: 'B1 (Intermediate)',
      gradeMaster: 'Grade: 2.3 | Gut',
      gradeBachelor: 'Grade: 1.4 | First Class Honours',
      linkedIn: 'LinkedIn Profile',
      website: 'Professional Website'
    },
    de: {
      subtitle: 'Digital Learning Designer | Professionelle Website',
      summary: 'BERUFLICHE ZUSAMMENFASSUNG',
      summaryText:
        'Digital Learning Designer mit Verbindung von Instruktionsdesign-Theorie und -Praxis. Master in Medienwissenschaften und Bachelor in Pädagogik. Entwickelt barrierefreies, lernerzentriertes E-Learning mit Articulate 360, Adobe Creative Suite, KI-Tools und LMS — mit Erfahrung in Medtech und Kunst-/Kultursektor.',
      skills: 'FÄHIGKEITEN & KOMPETENZEN',
      tools: 'TOOLS & TECHNOLOGIEN',
      experience: 'BERUFSERFAHRUNG',
      education: 'AUSBILDUNG',
      certifications: 'ZERTIFIZIERUNGEN & WEITERBILDUNG',
      portfolioHighlights: 'PORTFOLIO-HIGHLIGHTS',
      languages: 'SPRACHEN',
      english: 'Englisch',
      german: 'Deutsch',
      akan: 'Akan',
      native: 'Muttersprache / Zweisprachig',
      intermediate: 'B1 (Mittelstufe)',
      gradeMaster: 'Note: 2,3 | Gut',
      gradeBachelor: 'Note: 1,4 | First Class Honours',
      linkedIn: 'LinkedIn-Profil',
      website: 'Professionelle Website'
    }
  };

  const lang = t[language] || t.en;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/40 to-slate-100 py-8 px-4">
      <div className="max-w-5xl mx-auto bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl ring-1 ring-slate-200/80 p-6 md:p-10">
        <header className="border-b border-indigo-200/80 pb-6 mb-6">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-900 via-indigo-800 to-indigo-600 bg-clip-text text-transparent mb-2">SAMUEL OPOKU</h1>
          <p className="text-xl text-indigo-700 font-semibold mb-4">{lang.subtitle}</p>

          <div className="flex flex-wrap gap-3 md:gap-4 text-xs md:text-sm text-gray-700">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>Große Klosterkoppel 8, 23562 Lübeck</span>
            </div>
            <div className="flex items-center gap-1">
              <Phone className="w-4 h-4" />
              <span>01715811680</span>
            </div>
            <div className="flex items-center gap-1">
              <Mail className="w-4 h-4" />
              <span>gideonsammysen@gmail.com</span>
            </div>
            <div className="flex items-center gap-1">
              <Linkedin className="w-4 h-4" />
              <span>{lang.linkedIn}</span>
            </div>
            <div className="flex items-center gap-1">
              <Globe className="w-4 h-4" />
              <span>{lang.website}</span>
            </div>
          </div>
        </header>

        <section className="mb-6">
          <h2 className="text-2xl font-bold text-indigo-600 mb-3 border-b-2 border-gray-300 pb-1">{lang.summary}</h2>
          <p className="text-gray-700 leading-relaxed text-sm md:text-base">{lang.summaryText}</p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-bold text-indigo-600 mb-3 border-b-2 border-indigo-100 pb-1">{lang.skills}</h2>
          <div className="space-y-2 text-sm text-gray-700">
            <p><span className="font-semibold">{language === 'de' ? 'Instruktionsdesign:' : 'Instructional Design:'}</span> ADDIE | Bloom&apos;s Taxonomy | Adult Learning Theory | Storyboarding | LXD | Curriculum Development</p>
            <p><span className="font-semibold">{language === 'de' ? 'E-Learning-Entwicklung:' : 'E-Learning Development:'}</span> SCORM Packaging | LMS Administration | Learning Analytics</p>
            <p><span className="font-semibold">{language === 'de' ? 'Multimedia-Produktion:' : 'Multimedia Production:'}</span> Photo Editing (Infographics | Posters | Flyers) | Video Creation &amp; Editing</p>
            <p><span className="font-semibold">{language === 'de' ? 'Technische Kommunikation:' : 'Technical Communication:'}</span> User Guides | Knowledge-Base Documentation | Cross-Cultural Content Adaptation | Content Localization</p>
          </div>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-bold text-indigo-600 mb-3 border-b-2 border-indigo-100 pb-1">{lang.tools}</h2>
          <div className="space-y-2 text-sm text-gray-700">
            <p><span className="font-semibold">{language === 'de' ? 'E-Learning & LMS:' : 'E-Learning Authoring & LMS:'}</span> Articulate 360 (Storyline, Rise) | Moodle</p>
            <p><span className="font-semibold">{language === 'de' ? 'Design & Multimedia:' : 'Design & Multimedia:'}</span> Adobe Creative Suite (Premiere Pro, Photoshop, InDesign) | Figma | Synthesia | Descript | Canva</p>
            <p><span className="font-semibold">{language === 'de' ? 'Web & KI:' : 'Web & AI Development:'}</span> HTML | CSS | Markdown | API Integration | Prompt Coding</p>
            <p><span className="font-semibold">{language === 'de' ? 'Entwicklung:' : 'Development Tools:'}</span> GitHub | VS Code | Cursor | Vercel</p>
            <p><span className="font-semibold">{language === 'de' ? 'Produktivität:' : 'Productivity & Collaboration:'}</span> Google Workspace | Microsoft 365 (Word, PowerPoint, SharePoint, Teams, Excel) | Notion | Confluence</p>
          </div>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-bold text-indigo-600 mb-3 border-b-2 border-gray-300 pb-1">{lang.experience}</h2>

          <div className="mb-4">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2 gap-1">
              <div>
                <h3 className="font-bold text-gray-800">{language === 'de' ? 'Instructional Designer (Freelance)' : 'Instructional Designer (Freelance)'}</h3>
                <p className="text-gray-600 italic">Node Center for Curatorial Studies, Berlin</p>
              </div>
              <span className="text-sm text-gray-600 font-semibold">Aug 2026 – Present</span>
            </div>
            <ul className="text-sm text-gray-700 space-y-1 ml-4">
              <li>• {language === 'de' ? 'Übersetzt Fachinput in strukturierte, lernfreundliche Inhalte — Instruktionsdesign für ein spezialisiertes, nicht-technisches Publikum' : 'Translates subject-matter input into structured, learner-friendly content, applying instructional design principles to a specialist, non-technical audience'}</li>
              <li>• {language === 'de' ? 'Konzipiert und entwickelt E-Learning-Module in Articulate Rise für Museum- und Kuratoren-Teams' : 'Designs and develops e-learning modules in Articulate Rise for museum and curatorial staff'}</li>
              <li>• {language === 'de' ? 'Steuert iterative Stakeholder-Review-Zyklen und verfeinert Ton, Struktur und visuelles Design anhand des Feedbacks' : 'Manages iterative stakeholder review cycles, translating feedback into refined tone, structure, and visual design'}</li>
            </ul>
          </div>

          <div className="mb-4">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2 gap-1">
              <div>
                <h3 className="font-bold text-gray-800">{language === 'de' ? 'E-Learning-Entwickler (Praktikant)' : 'E-Learning Developer (Intern)'}</h3>
                <p className="text-gray-600 italic">Dräger, Lübeck</p>
              </div>
              <span className="text-sm text-gray-600">Feb 2026 – July 2026</span>
            </div>
            <ul className="text-sm text-gray-700 space-y-1 ml-4">
              <li>• {language === 'de' ? 'Produzierte und schnitt Lehrvideos (Adobe Premiere Pro) für globale Produktschulungen — von Dreh bis Final Cut' : 'Produced and edited instructional videos (Adobe Premiere Pro) for global product training on medical and safety equipment, from shoot to final cut'}</li>
              <li>• {language === 'de' ? 'Baute bestehende E-Learning-Inhalte in Articulate Rise um und strukturierte PowerPoint-Materialien nach Corporate Identity' : 'Built and transferred existing e-learning content into Articulate Rise, restructuring PowerPoint materials to align with Corporate Identity standards'}</li>
              <li>• {language === 'de' ? 'Nutze KI-Tools für mehrsprachige E-Learning-Versionen und verbesserte globale Reichweite' : 'Utilised AI-powered tools to create multilingual versions of e-learning modules, improving accessibility and global reach'}</li>
            </ul>
          </div>

          <div className="mb-4">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2 gap-1">
              <div>
                <h3 className="font-bold text-gray-800">{language === 'de' ? 'Digital Learning Designer (Praktikant)' : 'Digital Learning Designer (Intern)'}</h3>
                <p className="text-gray-600 italic">Tanz der Kulturen e.V., Hamburg</p>
              </div>
              <span className="text-sm text-gray-600">June 2025 – Nov 2025</span>
            </div>
            <ul className="text-sm text-gray-700 space-y-1 ml-4">
              <li>• {language === 'de' ? 'Gestaltete 25+ Multimedia-Lernassets (Infografiken, Werbematerialien) mit Figma für diverse Lerngruppen' : 'Designed 25+ accessible multimedia learning assets (infographics, promotional materials) using Figma, expanding reach to diverse learner groups'}</li>
              <li>• {language === 'de' ? 'Kuratierte und strukturierte 50+ Bildungsressourcen für multikulturelle Kunstpädagogik — 200+ internationale, community- und ERASMUS-Lernende' : 'Curated and structured 50+ educational resources for multicultural art pedagogy, supporting 200+ international, community, and ERASMUS learners'}</li>
              <li>• {language === 'de' ? 'Lokalisierte 300+ Seiten deutscher Unterrichtsinhalte (z. B. Rituelle Tanz Pädagogik) ins Englische mit KI-Unterstützung' : 'Localized 300+ pages of German instructional content (e.g., Rituelle Tanz Pädagogik book) into English using AI-assisted translation, preserving natural flow'}</li>
            </ul>
          </div>

          <div className="mb-4">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2 gap-1">
              <div>
                <h3 className="font-bold text-gray-800">{language === 'de' ? 'Englischlehrer & Verwaltungsassistent' : 'English Language Teacher & Administrative Assistant'}</h3>
                <p className="text-gray-600 italic">Ghana National Service Scheme, Kumasi</p>
              </div>
              <span className="text-sm text-gray-600">Jan 2023 – Oct 2023</span>
            </div>
            <ul className="text-sm text-gray-700 space-y-1 ml-4">
              <li>• {language === 'de' ? 'Entwarf und hielt Englischunterricht mit Lernzielen nach Bloom\'s Taxonomie' : 'Designed and delivered English lessons using learning objectives aligned with Bloom\'s Taxonomy, enhancing comprehension, writing, and speaking skills'}</li>
              <li>• {language === 'de' ? 'Verwaltete administrative Aufgaben inkl. Schülerakten, Zeitplanung und Korrespondenz' : 'Managed administrative tasks, including student records, scheduling, and correspondence'}</li>
            </ul>
          </div>

          <div className="mb-4">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2 gap-1">
              <div>
                <h3 className="font-bold text-gray-800">{language === 'de' ? 'Englisch-Lehrassistent (Praktikant)' : 'English Language Teaching Assistant (Intern)'}</h3>
                <p className="text-gray-600 italic">Ghana Education Service, Kumasi</p>
              </div>
              <span className="text-sm text-gray-600">June 2021 – Dec 2021</span>
            </div>
            <ul className="text-sm text-gray-700 space-y-1 ml-4">
              <li>• {language === 'de' ? 'Führte Unterricht mit Bewertungsstrategien und instructional scaffolding im Einklang mit Lernzielen durch' : 'Facilitated lessons integrating assessment strategies and instructional scaffolding aligned to learning outcomes'}</li>
            </ul>
          </div>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-bold text-indigo-600 mb-3 border-b-2 border-gray-300 pb-1">{lang.education}</h2>

          <div className="mb-4">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-1 gap-1">
              <div>
                <h3 className="font-bold text-gray-800">{language === 'de' ? 'Master in Nordamerikastudien (Medienwissenschaften)' : "Master's in North American Studies (Media Studies)"}</h3>
                <p className="text-gray-600">{language === 'de' ? 'Philipps-Universität Marburg, Deutschland' : 'Philipps-Universität Marburg, Germany'}</p>
                <p className="text-sm text-gray-600 italic">{lang.gradeMaster}</p>
              </div>
              <span className="text-sm text-gray-600">Oct 2023 – March 2026</span>
            </div>
            <p className="text-sm text-gray-700 font-semibold ml-4">{language === 'de' ? 'Masterarbeit: „KI als Reflexion: Mensch-Technologie-Beziehungen in digitalen Narrativen"' : 'Master\'s Thesis: "AI as Reflection: Human-Technology Relationships in Digital Narratives"'}</p>
          </div>

          <div>
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-1 gap-1">
              <div>
                <h3 className="font-bold text-gray-800">{language === 'de' ? 'Bachelor of Education in Englischer Sprache' : 'Bachelor of Education in English Language'}</h3>
                <p className="text-gray-600">{language === 'de' ? 'Universität Cape Coast, Ghana' : 'University of Cape Coast, Ghana'}</p>
                <p className="text-sm text-gray-600 italic">{lang.gradeBachelor}</p>
              </div>
              <span className="text-sm text-gray-600">Oct 2018 – Oct 2022</span>
            </div>
            <p className="text-sm text-gray-700 ml-4">{language === 'de' ? 'Bachelorarbeit: „The Box-Part-Letter Method: A Structured Approach to Handwriting Instruction"' : 'Bachelor\'s Thesis: "The Box-Part-Letter Method: A Structured Approach to Handwriting Instruction"'}</p>
          </div>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-bold text-indigo-600 mb-3 border-b-2 border-indigo-100 pb-1">{lang.certifications}</h2>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>• Instructional Design Foundations &amp; Applications – University of Illinois Urbana-Champaign (Aug 14, 2025)</li>
            <li>• EF SET English Certificate – C1 Advanced (67/100) (Feb 10, 2025)</li>
            <li>• Technical Writing Course – Board Infinity (April 2, 2025)</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-bold text-indigo-600 mb-3 border-b-2 border-indigo-100 pb-1">{lang.portfolioHighlights}</h2>
          <ul className="text-sm text-gray-700 space-y-1 ml-4">
            <li>• E-Learning Project (Articulate Rise): Cybersecurity Essentials for Every Employee</li>
            <li>• E-Learning Project (Articulate Rise): Combating Climate Change: A Collective Responsibility</li>
            <li>• Product Training Module: Dräger Fundamentals of Controllers</li>
            <li>• Sales Training Module: Dräger X-am 2800/5800</li>
            <li>• Product Training Module: Dräger Vacuum Systems</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-indigo-600 mb-3 border-b-2 border-gray-300 pb-1">{lang.languages}</h2>
          <div className="flex flex-wrap gap-6 text-sm text-gray-700">
            <span><span className="font-semibold">{lang.english}</span> – {lang.native}</span>
            <span><span className="font-semibold">{lang.german}</span> – {lang.intermediate}</span>
            <span><span className="font-semibold">{lang.akan}</span> – {lang.native}</span>
          </div>
        </section>
      </div>
    </div>
  );
}
