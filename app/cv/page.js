'use client';

import React, { useState, useEffect } from 'react';
import { Mail, Phone, Linkedin, Globe, MapPin, Award } from 'lucide-react';

export default function DigitalLearningCV() {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    // Check URL parameter first, then localStorage
    let langParam = null;
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      langParam = urlParams.get('lang');
      const storedLang = localStorage.getItem('language');
      const currentLang = langParam || storedLang || 'en';
      
      setLanguage(currentLang);
      
      // Update document language
      document.documentElement.lang = currentLang === 'de' ? 'de' : 'en';
    }
  }, []);

  const t = {
    en: {
      subtitle: "Digital Learning Designer | Web Portfolio",
      linkedin: "LinkedIn Profile",
      portfolio: "Web Portfolio",
      summary: "PROFESSIONAL SUMMARY",
      summaryText: "Digital Learning Designer combining instructional design theory and practice. Master's in Media Studies and Bachelor's in Education. Develops accessible, learner-centered e-learning using Articulate 360, Adobe Creative Suite, AI tools, and LMS platforms, with experience in medtech and nonprofit sectors.",
      skills: "SKILLS & COMPETENCIES",
      tools: "TOOLS & TECHNOLOGIES",
      experience: "PROFESSIONAL EXPERIENCE",
      education: "EDUCATION",
      certifications: "CERTIFICATIONS & TRAINING",
      portfolioHighlights: "PORTFOLIO HIGHLIGHTS",
      languages: "LANGUAGES",
      verify: "Verify",
      link: "Link",
      starting: "Starting",
      present: "Present",
      since: "Since",
      english: "English",
      german: "German",
      akan: "Akan",
      native: "Native/Bilingual",
      intermediate: "B1 (Intermediate, B2 in progress)",
      fluent: "Native"
    },
    de: {
      subtitle: "Digital Learning Designer | Web-Portfolio",
      linkedin: "LinkedIn-Profil",
      portfolio: "Web-Portfolio",
      summary: "BERUFLICHE ZUSAMMENFASSUNG",
      summaryText: "Digital Learning Designer mit Verbindung von Theorie und Praxis im Instruktionsdesign. Master in Medienwissenschaften und Bachelor in Pädagogik. Entwickelt barrierefreies, lernerzentriertes E-Learning mit Articulate 360, Adobe Creative Suite, KI-Tools und LMS-Plattformen — mit Erfahrung in Medtech und Nonprofit.",
      skills: "FÄHIGKEITEN & KOMPETENZEN",
      tools: "TOOLS & TECHNOLOGIEN",
      experience: "BERUFSERFAHRUNG",
      education: "AUSBILDUNG",
      certifications: "ZERTIFIZIERUNGEN & WEITERBILDUNG",
      portfolioHighlights: "PORTFOLIO-HIGHLIGHTS",
      languages: "SPRACHEN",
      verify: "Verifizieren",
      link: "Link",
      starting: "Beginn",
      present: "heute",
      since: "Seit",
      english: "Englisch",
      german: "Deutsch",
      akan: "Akan",
      native: "Muttersprache/Zweisprachig",
      intermediate: "B1 (Mittelstufe, B2 in Arbeit)",
      fluent: "Muttersprache"
    }
  };

  const lang = t[language] || t.en;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/40 to-slate-100 py-8 px-4">
      <div className="max-w-5xl mx-auto bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl ring-1 ring-slate-200/80 p-6 md:p-10">
        {/* Header */}
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
              <a href="mailto:gideonsammysen@gmail.com" className="text-indigo-600 hover:underline cursor-pointer">gideonsammysen@gmail.com</a>
            </div>
            <div className="flex items-center gap-1">
              <Linkedin className="w-4 h-4" />
              <a href="https://www.linkedin.com/in/samuel-opoku-4b9bbb2a8" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline cursor-pointer">{lang.linkedin}</a>
            </div>
            <div className="flex items-center gap-1">
              <Globe className="w-4 h-4" />
              <a href="https://vs-code-port1.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline cursor-pointer">{lang.portfolio}</a>
            </div>
          </div>
        </header>

        {/* Professional Summary */}
        <section className="mb-6">
          <h2 className="text-2xl font-bold text-indigo-600 mb-3 border-b-2 border-gray-300 pb-1">{lang.summary}</h2>
          <p className="text-gray-700 leading-relaxed text-sm md:text-base">
            {lang.summaryText}
          </p>
        </section>

        {/* Skills */}
        <section className="mb-6">
          <h2 className="text-2xl font-bold text-indigo-600 mb-3 border-b-2 border-indigo-100 pb-1">{lang.skills}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border border-slate-200/80 bg-slate-50/80 p-4">
              <h3 className="font-semibold text-gray-800 mb-1 text-sm">{language === 'de' ? 'Instruktionsdesign' : 'Instructional Design'}</h3>
              <p className="text-xs text-gray-700 leading-relaxed">{language === 'de' ? 'ADDIE • Bloom • Erwachsenenlernen • Storyboarding • LXD • Curriculum' : "ADDIE | Bloom's Taxonomy | Adult Learning Theory | Storyboarding | LXD | Curriculum Development"}</p>
            </div>
            <div className="rounded-xl border border-slate-200/80 bg-slate-50/80 p-4">
              <h3 className="font-semibold text-gray-800 mb-1 text-sm">{language === 'de' ? 'E-Learning-Entwicklung' : 'E-Learning Development'}</h3>
              <p className="text-xs text-gray-700 leading-relaxed">SCORM Packaging • LMS Administration • Learning Analytics</p>
            </div>
            <div className="rounded-xl border border-slate-200/80 bg-slate-50/80 p-4">
              <h3 className="font-semibold text-gray-800 mb-1 text-sm">{language === 'de' ? 'Multimedia-Produktion' : 'Multimedia Production'}</h3>
              <p className="text-xs text-gray-700 leading-relaxed">{language === 'de' ? 'Fotobearbeitung (Infografiken, Poster, Flyer) • Videoerstellung & -bearbeitung' : 'Photo Editing (Infographics | Posters | Flyers) | Video Creation & Editing'}</p>
            </div>
            <div className="rounded-xl border border-slate-200/80 bg-slate-50/80 p-4">
              <h3 className="font-semibold text-gray-800 mb-1 text-sm">{language === 'de' ? 'Technische Kommunikation' : 'Technical Communication'}</h3>
              <p className="text-xs text-gray-700 leading-relaxed">{language === 'de' ? 'Benutzerhandbücher • Wissensdatenbank-Dokumentation • interkulturelle Inhaltsanpassung • Lokalisierung' : 'User Guides | Knowledge-Base Documentation | Cross-Cultural Content Adaptation | Content Localization'}</p>
            </div>
          </div>
        </section>

        {/* Tools & Technologies */}
        <section className="mb-6">
          <h2 className="text-2xl font-bold text-indigo-600 mb-3 border-b-2 border-indigo-100 pb-1">{lang.tools}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 text-xs">
            <div>
              <span className="font-semibold text-gray-800">{language === 'de' ? 'E-Learning & LMS:' : 'E-Learning Authoring & LMS:'}</span>
              <span className="text-gray-700"> Articulate 360 (Storyline, Rise) • Moodle</span>
            </div>
            <div>
              <span className="font-semibold text-gray-800">{language === 'de' ? 'Design & Multimedia:' : 'Design & Multimedia:'}</span>
              <span className="text-gray-700"> Adobe Creative Suite (Premiere Pro, Photoshop, InDesign) • Figma • Synthesia • Descript • Canva</span>
            </div>
            <div>
              <span className="font-semibold text-gray-800">{language === 'de' ? 'Web & KI:' : 'Web & AI Development:'}</span>
              <span className="text-gray-700"> HTML • CSS • XML • Markdown • API Integration • Prompt Coding</span>
            </div>
            <div>
              <span className="font-semibold text-gray-800">{language === 'de' ? 'Entwicklung:' : 'Development Tools:'}</span>
              <span className="text-gray-700"> GitHub • VS Code • Cursor • Vercel</span>
            </div>
            <div className="md:col-span-2">
              <span className="font-semibold text-gray-800">{language === 'de' ? 'Produktivität & Zusammenarbeit:' : 'Productivity & Collaboration:'}</span>
              <span className="text-gray-700"> Google Workspace • Microsoft 365 (Word, PowerPoint, SharePoint, Teams, Excel) • Notion • Confluence</span>
            </div>
          </div>
        </section>

        {/* Professional Experience */}
        <section className="mb-6">
          <h2 className="text-2xl font-bold text-indigo-600 mb-3 border-b-2 border-gray-300 pb-1">{lang.experience}</h2>
          
          <div className="mb-4">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2 gap-1">
              <div>
                <h3 className="font-bold text-gray-800">{language === 'de' ? 'E-Learning-Entwickler (Praktikant)' : 'E-Learning Developer (Intern)'}</h3>
                <p className="text-gray-600 italic">Dräger, Lübeck</p>
              </div>
              <span className="text-sm text-gray-600 font-semibold">Feb 2026 – {lang.present}</span>
            </div>
            <ul className="text-sm text-gray-700 space-y-1 ml-4">
              <li>• {language === 'de' ? 'Entwickelt interaktive E-Learning-Module mit Articulate 360 und wirkt an Skript- und Storyboard-Verfeinerung für didaktische Klarheit und Konsistenz' : 'Develop interactive e-learning modules using Articulate 360, contributing to script and storyboard refinement for instructional clarity and consistency'}</li>
              <li>• {language === 'de' ? 'Verantwortet die Videoendproduktion inklusive Drehs, Schnitt und Audiooptimierung mit Adobe Premiere Pro' : 'Manage end-to-end video production, including shoots, editing, and audio optimisation using Adobe Premiere Pro'}</li>
              <li>• {language === 'de' ? 'Nutzt KI-gestützte Tools für mehrsprachige Versionen der E-Learning-Module; verbessert Zugänglichkeit und globale Reichweite' : 'Utilise AI-powered tools to create multilingual versions of e-learning modules, improving accessibility and global reach'}</li>
              <li>• {language === 'de' ? 'Übernimmt sukzessive die eigenständige Projektverantwortung von der Konzeption bis zur Auslieferung' : 'Progressively take ownership of e-learning projects, managing them independently from concept through to delivery'}</li>
            </ul>
          </div>

          <div className="mb-4">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2 gap-1">
              <div>
                <h3 className="font-bold text-gray-800">{language === 'de' ? 'Digital Learning Designer (Praktikant)' : 'Digital Learning Designer (Intern)'}</h3>
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-gray-600 italic">Tanz der Kulturen e.V., Hamburg</p>
                  <a 
                    href="/TDK_Intern_Cert.pdf" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-200/60 text-indigo-700 hover:from-indigo-100 hover:to-blue-100 hover:border-indigo-300 hover:shadow-sm transition-all duration-200 text-xs font-medium"
                    title={language === 'de' ? 'Zertifikat anzeigen' : 'View Certificate'}
                  >
                    <Award className="w-3.5 h-3.5" />
                    <span>{lang.verify}</span>
                  </a>
                </div>
              </div>
              <span className="text-sm text-gray-600">
                {language === 'de' ? 'Juni 2025 – Nov 2025' : 'June 2025 – Nov 2025'}
              </span>
            </div>
            <ul className="text-sm text-gray-700 space-y-1 ml-4">
              <li>• {language === 'de' ? 'Gestaltete 25+ barrierefreie Multimedia-Lerninhalte (Infografiken, Werbematerialien) gemäß WCAG 2.1 und erreichte diverse Lerngruppen' : 'Designed 25+ accessible multimedia learning assets (infographics, promotional materials) in line with WCAG 2.1, expanding reach to diverse learner groups'}</li>
              <li>• {language === 'de' ? 'Kuratierte und strukturierte 50+ Bildungsressourcen für transkulturelle Kunstpädagogik; Unterstützung von 200+ internationalen, kommunalen und ERASMUS-Lernenden' : 'Curated and structured 50+ educational resources for multicultural art pedagogy, supporting 200+ international, community, and ERASMUS learners'}</li>
              <li>• {language === 'de' ? 'Lokalisierte 300+ Seiten deutscher Unterrichtsinhalte (z. B. Rituelle Tanz Pädagogik) ins Englische mit KI-gestützter Übersetzung unter Beibehaltung des natürlichen Flusses' : 'Localized 300+ pages of German instructional content (e.g., Rituelle Tanz Pädagogik book) into English using AI-assisted translation, preserving natural flow'}</li>
            </ul>
          </div>

          <div className="mb-4">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2 gap-1">
              <div>
                <h3 className="font-bold text-gray-800">{language === 'de' ? 'Englischlehrer & Verwaltungsassistent' : 'English Language Teacher & Administrative Assistant'}</h3>
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-gray-600 italic">Ghana National Service Scheme, Kumasi</p>
                  <a 
                    href="/National_Service.pdf" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-200/60 text-indigo-700 hover:from-indigo-100 hover:to-blue-100 hover:border-indigo-300 hover:shadow-sm transition-all duration-200 text-xs font-medium"
                    title={language === 'de' ? 'Zertifikat anzeigen' : 'View Certificate'}
                  >
                    <Award className="w-3.5 h-3.5" />
                    <span>{lang.verify}</span>
                  </a>
                </div>
              </div>
              <span className="text-sm text-gray-600">
                {language === 'de' ? 'Jan 2023 – Okt 2023' : 'Jan 2023 – Oct 2023'}
              </span>
            </div>
            <ul className="text-sm text-gray-700 space-y-1 ml-4">
              <li>• {language === 'de' ? 'Entwarf und hielt Englischunterricht mit Lernzielen gemäß Blooms Taxonomie und verbesserte Verständnis-, Schreib- und Sprechfähigkeiten' : "Designed and delivered English lessons using learning objectives aligned with Bloom's Taxonomy, enhancing comprehension, writing, and speaking skills"}</li>
              <li>• {language === 'de' ? 'Verwaltete administrative Aufgaben wie Schülerakten, Terminplanung und Korrespondenz' : 'Managed administrative tasks, including student records, scheduling, and correspondence'}</li>
            </ul>
          </div>

          <div className="mb-4">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2 gap-1">
              <div>
                <h3 className="font-bold text-gray-800">{language === 'de' ? 'Englisch-Lehrassistent (Praktikant)' : 'English Language Teaching Assistant (Intern)'}</h3>
                <p className="text-gray-600 italic">Ghana Education Service, Kumasi</p>
              </div>
              <span className="text-sm text-gray-600">
                {language === 'de' ? 'Juni 2021 – Dez 2021' : 'June 2021 – Dec 2021'}
              </span>
            </div>
            <ul className="text-sm text-gray-700 space-y-1 ml-4">
              <li>• {language === 'de' ? 'Entwickelte eine Box-Teil-Buchstaben-Handschriftmethode, die die Leistung von Erstsemester-Studenten um 40% verbesserte' : 'Developed a box-part-letter handwriting method, improving first-year student performance by 40%'}</li>
              <li>• {language === 'de' ? 'Förderte Unterricht, der Bewertungsstrategien und Instruktionsscaffolding integrierte, die an Lernergebnisse ausgerichtet waren' : 'Facilitated lessons integrating assessment strategies and instructional scaffolding aligned to learning outcomes'}</li>
            </ul>
          </div>

          <div>
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2 gap-1">
              <div>
                <h3 className="font-bold text-gray-800">{language === 'de' ? 'Englischlehrer (Werkstudent)' : 'English Language Teacher (Working Student)'}</h3>
                <p className="text-gray-600 italic">Kovak Hill Educational Centre, Kumasi</p>
              </div>
              <span className="text-sm text-gray-600">
                {language === 'de' ? 'Jan 2020 – Juni 2020' : 'Jan 2020 – June 2020'}
              </span>
            </div>
            <ul className="text-sm text-gray-700 space-y-1 ml-4">
              <li>• {language === 'de' ? 'Entwickelte und setzte Unterrichtspläne nach ADDIE-Prinzipien um und stimmte sie mit Lehrplanstandards und Lernerbeteiligungsstrategien ab' : 'Developed and implemented lesson plans following ADDIE principles, ensuring alignment with curriculum standards and learner engagement strategies'}</li>
            </ul>
          </div>
        </section>

        {/* Education */}
        <section className="mb-6">
          <h2 className="text-2xl font-bold text-indigo-600 mb-3 border-b-2 border-gray-300 pb-1">{lang.education}</h2>
          
          <div className="mb-4">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-1 gap-1">
              <div>
                <h3 className="font-bold text-gray-800">{language === 'de' ? 'Master in Nordamerikastudien (Medienwissenschaften)' : "Master's in North American Studies (Media Studies)"}</h3>
                <p className="text-gray-600">
                  {language === 'de'
                    ? 'Philipps-Universität Marburg, Deutschland'
                    : 'Philipps-Universität Marburg, Germany'}
                </p>
              </div>
              <span className="text-sm text-gray-600">
                {language === 'de' ? 'Okt 2023 – März 2026 (Note: 2,0 | Gut)' : 'Oct 2023 – March 2026 (Grade: 2.0 | Good)'}
              </span>
            </div>
            <p className="text-sm text-gray-700 font-semibold ml-4">{language === 'de' ? 'Masterarbeit: "KI als Reflexion: Mensch-Technologie-Beziehungen in digitalen Narrativen"' : 'Master\'s Thesis: "AI as Reflection: Human-Technology Relationships in Digital Narratives"'}</p>
          </div>

          <div>
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-1 gap-1">
              <div>
                <h3 className="font-bold text-gray-800">{language === 'de' ? 'Bachelor of Education in Englischer Sprache' : "Bachelor of Education in English Language"}</h3>
                <p className="text-gray-600">{language === 'de' ? 'Universität Cape Coast, Ghana' : 'University of Cape Coast, Ghana'}</p>
                <p className="text-sm text-gray-700"><span className="font-semibold">{language === 'de' ? 'Note: 1,4 | First Class Honours' : 'Grade: 1.4 | First Class Honours'}</span></p>
              </div>
              <span className="text-sm text-gray-600">
                {language === 'de' ? 'Okt 2018 – Okt 2022' : 'Oct 2018 – Oct 2022'}
              </span>
            </div>
            <p className="text-sm text-gray-700 italic ml-4">{language === 'de' ? 'Bachelorarbeit: „The Box-Part-Letter Method: A Structured Approach to Handwriting Instruction"' : 'Bachelor\'s Thesis: "The Box-Part-Letter Method: A Structured Approach to Handwriting Instruction"'}</p>
          </div>
        </section>

        {/* Certifications */}
        <section className="mb-6">
          <h2 className="text-2xl font-bold text-indigo-600 mb-3 border-b-2 border-indigo-100 pb-1">{lang.certifications}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• <span className="font-semibold">{language === 'de' ? 'Instruktionsdesign Grundlagen & Anwendungen' : 'Instructional Design Foundations & Applications'}</span> – University of Illinois Urbana-Champaign | <a href="https://www.coursera.org/account/accomplishments/verify/VA2HACXYEOYV" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline cursor-pointer">{lang.verify}</a></li>
              <li>• <span className="font-semibold">{language === 'de' ? 'EF SET Englisch-Zertifikat' : 'EF SET English Certificate'}</span> – C1 Advanced (67/100) | <a href="https://cert.efset.org/1uf78L" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline cursor-pointer">{lang.verify}</a></li>
            </ul>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• <span className="font-semibold">{language === 'de' ? 'Technical Writing Kurs' : 'Technical Writing Course'}</span> – Board Infinity | <a href="https://bit.ly/446fLNy" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline cursor-pointer">{lang.verify}</a> (Apr 2025)</li>
            </ul>
          </div>
        </section>

        {/* Portfolio Highlights */}
        <section className="mb-6">
          <h2 className="text-2xl font-bold text-indigo-600 mb-3 border-b-2 border-indigo-100 pb-1">{lang.portfolioHighlights}</h2>
          
          <div className="space-y-4">
            <div className="rounded-xl border border-slate-200/80 bg-white p-4">
              <h3 className="font-bold text-gray-800 mb-2">{language === 'de' ? 'E-Learning (Articulate Rise)' : 'E-Learning (Articulate Rise)'}</h3>
              <ul className="text-sm text-gray-700 space-y-1 ml-4">
                <li>• <a href="https://spectacular-dango-d6bec1.netlify.app/#/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">{language === 'de' ? 'Klimawandel bekämpfen – eine gemeinsame Verantwortung' : 'Combating Climate Change: A Collective Responsibility'}</a></li>
                <li>• <a href="https://plain-language-five.vercel.app" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">{language === 'de' ? 'Einfache Sprache & Inklusion — Barrierefreiheits-Panel & Chatbot' : 'Plain language & inclusivity — accessibility panel & chatbot'}</a></li>
              </ul>
            </div>
            <div className="rounded-xl border border-slate-200/80 bg-white p-4">
              <h3 className="font-bold text-gray-800 mb-2">{language === 'de' ? 'Produktschulung & Vertrieb (Articulate 360)' : 'Product & sales training (Articulate 360)'}</h3>
              <ul className="text-sm text-gray-700 space-y-1 ml-4">
                <li>• {language === 'de' ? 'Dräger Fundamentals of Controllers — Markenidentität; Zugang auf Anfrage' : 'Dräger Fundamentals of Controllers — brand-aligned; access on request'} — <a href="/#contact" className="text-indigo-600 hover:underline">{lang.link}</a></li>
                <li>• {language === 'de' ? 'Dräger X-am 2800/5800 — Vertriebstrainingsmodul; Zugang auf Anfrage' : 'Dräger X-am 2800/5800 — sales training module; access on request'} — <a href="/#contact" className="text-indigo-600 hover:underline">{lang.link}</a></li>
                <li>• {language === 'de' ? 'Dräger Medical Vacuum Systems — auf Anfrage' : 'Dräger Medical Vacuum Systems — available upon request'} — <a href="/#contact" className="text-indigo-600 hover:underline">{lang.link}</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-1">{language === 'de' ? 'Poster (Figma)' : 'Poster (Figma)'}</h3>
              <p className="text-sm text-gray-700 ml-4">{language === 'de' ? 'Kreativinhalte, die mit Markenidentität resonieren — Fonts, Farben, Brand-Assets' : 'Creative content that resonates with brand identity — fonts, colours, brand assets'}</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-1">{language === 'de' ? 'Wissensdatenbank (Notion)' : 'Knowledge Base (Notion)'}</h3>
              <ul className="text-sm text-gray-700 space-y-1 ml-4">
                <li>• <a href="https://www.notion.so/Instructional-Design-Portfolio-Opoku-Samuel-1d4f017e613b8029b616c5b6d1fd784d" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">{language === 'de' ? 'ADDIE-Dokumentation für LLMs & Nachhaltigkeit' : 'ADDIE-based documentation for LLMs & Sustainability'}</a></li>
                <li>• <a href="https://www.notion.so/Combating-Climate-Change-A-Collective-Responsibility-284f017e613b80acb039d4ca5425349f" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">{language === 'de' ? 'Klimawandel & kollektive Verantwortung' : 'Climate change & collective responsibility'}</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-1">{language === 'de' ? 'Portfolio-Website & KI' : 'Portfolio Website & AI'}</h3>
              <ul className="text-sm text-gray-700 space-y-1 ml-4">
                <li>• <a href="https://vs-code-port1.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">{language === 'de' ? 'Responsive, zweisprachig (EN/DE), Dark/Light, KI & Barrierefreiheit' : 'Responsive bilingual EN/DE, dark/light theme, AI & accessibility'}</a></li>
                <li>• <a href="https://general-ai-wheat.vercel.app" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">{language === 'de' ? 'Prompt-engineerierter KI-Assistent (LLM)' : 'Prompt-engineered advanced AI assistant (LLM)'}</a></li>
              </ul>
            </div>
          </div>
        </section>

        {/* Languages */}
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
