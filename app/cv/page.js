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
      subtitle: 'Digital Learning Designer | Educational Media Specialist',
      summary: 'PROFESSIONAL SUMMARY',
      summaryText:
        'Instructional designer and educational media professional with a strong foundation in pedagogy, accessibility, e-learning development, and multilingual content creation. Experienced in designing learner-centered learning experiences for education, nonprofit, and medtech contexts.',
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
      intermediate: 'B1 (Intermediate, B2 in progress)',
      fluent: 'Native'
    },
    de: {
      subtitle: 'Digital Learning Designer | Bildungsmedien-Spezialist',
      summary: 'BERUFLICHE ZUSAMMENFASSUNG',
      summaryText:
        'Instruktionsdesigner und Fachkraft für Bildungsmedien mit starker Basis in Pädagogik, Barrierefreiheit, E-Learning-Entwicklung und mehrsprachiger Inhaltsgestaltung. Erfahrung in der Entwicklung lernzentrierter Lernangebote für Bildung, Nonprofit und Medtech.',
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
      intermediate: 'B1 (Mittelstufe, B2 in Arbeit)',
      fluent: 'Muttersprache'
    }
  };

  const lang = t[language] || t.en;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/40 to-slate-100 py-8 px-4">
      <div className="max-w-5xl mx-auto bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl ring-1 ring-slate-200/80 p-6 md:p-10">
        <header className="border-b border-indigo-200/80 pb-6 mb-6">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-900 via-indigo-800 to-indigo-600 bg-clip-text text-transparent mb-2">SAMUEL AFRIYIE OPOKU</h1>
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
              <span className="text-indigo-700">gideonsammysen@gmail.com</span>
            </div>
            <div className="flex items-center gap-1">
              <Linkedin className="w-4 h-4" />
              <span className="text-indigo-700">LinkedIn Profile</span>
            </div>
            <div className="flex items-center gap-1">
              <Globe className="w-4 h-4" />
              <span className="text-indigo-700">Web Portfolio</span>
            </div>
          </div>
        </header>

        <section className="mb-6">
          <h2 className="text-2xl font-bold text-indigo-600 mb-3 border-b-2 border-gray-300 pb-1">{lang.summary}</h2>
          <p className="text-gray-700 leading-relaxed text-sm md:text-base">{lang.summaryText}</p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-bold text-indigo-600 mb-3 border-b-2 border-indigo-100 pb-1">{lang.skills}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border border-slate-200/80 bg-slate-50/80 p-4">
              <h3 className="font-semibold text-gray-800 mb-1 text-sm">{language === 'de' ? 'Instruktionsdesign' : 'Instructional Design'}</h3>
              <p className="text-xs text-gray-700 leading-relaxed">ADDIE • Bloom’s Taxonomy • Adult Learning Theory • Storyboarding • Curriculum Development</p>
            </div>
            <div className="rounded-xl border border-slate-200/80 bg-slate-50/80 p-4">
              <h3 className="font-semibold text-gray-800 mb-1 text-sm">{language === 'de' ? 'E-Learning-Entwicklung' : 'E-Learning Development'}</h3>
              <p className="text-xs text-gray-700 leading-relaxed">Articulate 360 • SCORM • LMS Administration • Learning Analytics</p>
            </div>
            <div className="rounded-xl border border-slate-200/80 bg-slate-50/80 p-4">
              <h3 className="font-semibold text-gray-800 mb-1 text-sm">{language === 'de' ? 'Multimedia-Produktion' : 'Multimedia Production'}</h3>
              <p className="text-xs text-gray-700 leading-relaxed">Photo Editing • Infographics • Posters • Flyers • Video Editing</p>
            </div>
            <div className="rounded-xl border border-slate-200/80 bg-slate-50/80 p-4">
              <h3 className="font-semibold text-gray-800 mb-1 text-sm">{language === 'de' ? 'Technische Kommunikation' : 'Technical Communication'}</h3>
              <p className="text-xs text-gray-700 leading-relaxed">User Guides • Knowledge-Base Documentation • Localization • Cross-Cultural Content Adaptation</p>
            </div>
          </div>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-bold text-indigo-600 mb-3 border-b-2 border-indigo-100 pb-1">{lang.tools}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 text-xs">
            <div>
              <span className="font-semibold text-gray-800">{language === 'de' ? 'E-Learning & LMS:' : 'E-Learning Authoring & LMS:'}</span>
              <span className="text-gray-700"> Articulate 360 (Storyline, Rise) • Moodle</span>
            </div>
            <div>
              <span className="font-semibold text-gray-800">{language === 'de' ? 'Design & Multimedia:' : 'Design & Multimedia:'}</span>
              <span className="text-gray-700"> Adobe Creative Suite • Figma • Synthesia • Descript • Canva</span>
            </div>
            <div>
              <span className="font-semibold text-gray-800">{language === 'de' ? 'Web & KI:' : 'Web & AI Development:'}</span>
              <span className="text-gray-700"> HTML • CSS • XML • Markdown • API Integration • Prompt Coding</span>
            </div>
            <div>
              <span className="font-semibold text-gray-800">{language === 'de' ? 'Produktivität & Zusammenarbeit:' : 'Productivity & Collaboration:'}</span>
              <span className="text-gray-700"> Google Workspace • Microsoft 365 • Notion • Confluence</span>
            </div>
          </div>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-bold text-indigo-600 mb-3 border-b-2 border-gray-300 pb-1">{lang.experience}</h2>

          <div className="mb-4">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2 gap-1">
              <div>
                <h3 className="font-bold text-gray-800">{language === 'de' ? 'E-Learning-Entwickler (Praktikant)' : 'E-Learning Developer (Intern)'}</h3>
                <p className="text-gray-600 italic">Dräger, Lübeck</p>
              </div>
              <span className="text-sm text-gray-600 font-semibold">Feb 2026 – Present</span>
            </div>
            <ul className="text-sm text-gray-700 space-y-1 ml-4">
              <li>• Develop interactive e-learning modules using Articulate 360 and contribute to storyboard and script refinement.</li>
              <li>• Manage end-to-end video production, including filming, editing, and audio refinement with Adobe Premiere Pro.</li>
              <li>• Use AI-assisted tools to create multilingual learning content and improve accessibility.</li>
              <li>• Take growing ownership of projects from concept through delivery.</li>
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
              <li>• Designed more than 25 accessible multimedia learning assets, including infographics and promotional materials.</li>
              <li>• Curated and structured educational resources for multicultural art pedagogy for diverse learner groups.</li>
              <li>• Localized over 300 pages of German instructional content into English with AI-assisted translation.</li>
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
              <li>• Designed and delivered English lessons aligned with learning outcomes and Bloom’s Taxonomy.</li>
              <li>• Managed administrative responsibilities including student records, scheduling, and correspondence.</li>
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
              <li>• Developed a handwriting method that improved first-year student performance by 40%.</li>
              <li>• Facilitated lessons that integrated assessment strategies and instructional scaffolding.</li>
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
              </div>
              <span className="text-sm text-gray-600">Oct 2023 – March 2026</span>
            </div>
            <p className="text-sm text-gray-700 font-semibold ml-4">{language === 'de' ? 'Masterarbeit: "KI als Reflexion: Mensch-Technologie-Beziehungen in digitalen Narrativen"' : 'Master\'s Thesis: "AI as Reflection: Human-Technology Relationships in Digital Narratives"'}</p>
          </div>

          <div>
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-1 gap-1">
              <div>
                <h3 className="font-bold text-gray-800">{language === 'de' ? 'Bachelor of Education in Englischer Sprache' : "Bachelor of Education in English Language"}</h3>
                <p className="text-gray-600">{language === 'de' ? 'Universität Cape Coast, Ghana' : 'University of Cape Coast, Ghana'}</p>
              </div>
              <span className="text-sm text-gray-600">Oct 2018 – Oct 2022</span>
            </div>
            <p className="text-sm text-gray-700 italic ml-4">{language === 'de' ? 'Bachelorarbeit: „The Box-Part-Letter Method: A Structured Approach to Handwriting Instruction"' : 'Bachelor\'s Thesis: "The Box-Part-Letter Method: A Structured Approach to Handwriting Instruction"'}</p>
          </div>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-bold text-indigo-600 mb-3 border-b-2 border-indigo-100 pb-1">{lang.certifications}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Instructional Design Foundations & Applications – University of Illinois Urbana-Champaign</li>
              <li>• EF SET English Certificate – C1 Advanced (67/100)</li>
            </ul>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Technical Writing Course – Board Infinity (Apr 2025)</li>
            </ul>
          </div>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-bold text-indigo-600 mb-3 border-b-2 border-indigo-100 pb-1">{lang.portfolioHighlights}</h2>

          <div className="space-y-4">
            <div className="rounded-xl border border-slate-200/80 bg-white p-4">
              <h3 className="font-bold text-gray-800 mb-2">{language === 'de' ? 'E-Learning (Articulate Rise)' : 'E-Learning (Articulate Rise)'}</h3>
              <ul className="text-sm text-gray-700 space-y-1 ml-4">
                <li>• Combating Climate Change: A Collective Responsibility</li>
                <li>• Plain language & inclusivity — accessibility panel & chatbot</li>
              </ul>
            </div>
            <div className="rounded-xl border border-slate-200/80 bg-white p-4">
              <h3 className="font-bold text-gray-800 mb-2">{language === 'de' ? 'Produktschulung & Vertrieb (Articulate 360)' : 'Product & sales training (Articulate 360)'}</h3>
              <ul className="text-sm text-gray-700 space-y-1 ml-4">
                <li>• Dräger Fundamentals of Controllers — brand-aligned learning experience</li>
                <li>• Dräger X-am 2800/5800 — sales training module</li>
                <li>• Dräger Medical Vacuum Systems — available upon request</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-1">{language === 'de' ? 'Poster (Figma)' : 'Poster (Figma)'}</h3>
              <p className="text-sm text-gray-700 ml-4">Creative content that resonates with brand identity through thoughtful typography, colour, and visual assets.</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-1">{language === 'de' ? 'Wissensdatenbank (Notion)' : 'Knowledge Base (Notion)'}</h3>
              <ul className="text-sm text-gray-700 space-y-1 ml-4">
                <li>• ADDIE-based documentation for LLMs & Sustainability</li>
                <li>• Climate change & collective responsibility</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-indigo-600 mb-3 border-b-2 border-gray-300 pb-1">{lang.languages}</h2>
          <div className="flex flex-wrap gap-6 text-sm text-gray-700">
            <span><span className="font-semibold">{lang.english}</span> – {lang.native}</span>
            <span><span className="font-semibold">{lang.german}</span> – {lang.intermediate}</span>
            <span><span className="font-semibold">{lang.akan}</span> – {lang.fluent}</span>
          </div>
        </section>
      </div>
    </div>
  );
}
