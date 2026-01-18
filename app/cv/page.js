'use client';

import React, { useState, useEffect } from 'react';
import { Mail, Phone, Linkedin, Globe, MapPin } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

export default function DigitalLearningCV() {
  const searchParams = useSearchParams();
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    // Check URL parameter first, then localStorage
    const langParam = searchParams?.get('lang');
    const storedLang = typeof window !== 'undefined' ? localStorage.getItem('language') : null;
    const currentLang = langParam || storedLang || 'en';
    
    setLanguage(currentLang);
    
    // Update document language
    document.documentElement.lang = currentLang === 'de' ? 'de' : 'en';
  }, [searchParams]);

  const t = {
    en: {
      subtitle: "Digital Learning Designer | Technical Writer",
      linkedin: "LinkedIn Profile",
      portfolio: "Web Portfolio",
      summary: "PROFESSIONAL SUMMARY",
      summaryText: "Digital Learning Designer with Technical Writing skills. Possesses a unique blend of instructional design expertise and documentation skills. I create clear, accessible and engaging e-learning modules, as well as technical content — from user guides to comprehensive knowledge bases. My approach combines technical communication best practices with learning science (ADDIE, plain language principles) to deliver solutions that educate and empower users.",
      skills: "SKILLS",
      tools: "TOOLS & PLATFORMS",
      experience: "PROFESSIONAL EXPERIENCE",
      education: "EDUCATION",
      certifications: "CERTIFICATIONS & TRAINING",
      portfolioHighlights: "PORTFOLIO HIGHLIGHTS",
      languages: "LANGUAGES",
      verify: "Verify",
      link: "Link",
      starting: "Starting",
      english: "English",
      german: "German",
      akan: "Akan",
      native: "Native/Bilingual",
      intermediate: "B1 (Intermediate)",
      fluent: "Fluent"
    },
    de: {
      subtitle: "Digital Learning Designer | Technischer Redakteur",
      linkedin: "LinkedIn-Profil",
      portfolio: "Web-Portfolio",
      summary: "BERUFLICHE ZUSAMMENFASSUNG",
      summaryText: "Digital Learning Designer mit Technical Writing-Fähigkeiten. Besitzt eine einzigartige Kombination aus Expertise im Instruktionsdesign und Dokumentationsfähigkeiten. Ich erstelle klare, zugängliche und ansprechende E-Learning-Module sowie technische Inhalte – von Benutzerhandbüchern bis hin zu umfassenden Wissensdatenbanken. Mein Ansatz kombiniert Best Practices der technischen Kommunikation mit Lernwissenschaft (ADDIE, Plain Language Prinzipien), um Lösungen zu liefern, die Nutzer bilden und stärken.",
      skills: "FÄHIGKEITEN",
      tools: "TOOLS & PLATTFORMEN",
      experience: "BERUFSERFAHRUNG",
      education: "AUSBILDUNG",
      certifications: "ZERTIFIZIERUNGEN & WEITERBILDUNG",
      portfolioHighlights: "PORTFOLIO-HIGHLIGHTS",
      languages: "SPRACHEN",
      verify: "Verifizieren",
      link: "Link",
      starting: "Beginn",
      english: "Englisch",
      german: "Deutsch",
      akan: "Akan",
      native: "Muttersprache/Zweisprachig",
      intermediate: "B1 (Mittelstufe)",
      fluent: "Fließend"
    }
  };

  const lang = t[language] || t.en;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-5xl mx-auto bg-white p-6 md:p-8 shadow-lg">
        {/* Header */}
        <header className="border-b-4 border-indigo-600 pb-6 mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">SAMUEL AFRIYIE OPOKU</h1>
          <p className="text-xl text-indigo-600 font-semibold mb-4">{lang.subtitle}</p>
          
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
          <h2 className="text-2xl font-bold text-indigo-600 mb-3 border-b-2 border-gray-300 pb-1">{lang.skills}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-3">
            <div>
              <h3 className="font-semibold text-gray-800 mb-1 text-sm">{language === 'de' ? 'Instruktionsdesign & E-Learning' : 'Instructional Design & E-Learning'}</h3>
              <p className="text-xs text-gray-700">{language === 'de' ? 'ADDIE-Framework • Interaktive Module • SCORM-Pakete • LMS-Administration • Blooms Taxonomie • Bewertungsdesign' : "ADDIE framework • Interactive modules • SCORM packages • LMS administration • Bloom's Taxonomy • Assessment design"}</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-1 text-sm">{language === 'de' ? 'Dokumentation & Technical Writing' : 'Documentation & Technical Writing'}</h3>
              <p className="text-xs text-gray-700">{language === 'de' ? 'Benutzerhandbücher • API-Dokumentation • Wissensdatenbanken • Technische Spezifikationen • SOPs • Versionshinweise • Content-Lokalisierung' : 'User guides • API docs • Knowledge bases • Technical specs • SOPs • Release notes • Content localization'}</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-1 text-sm">{language === 'de' ? 'Informationsarchitektur' : 'Information Architecture'}</h3>
              <p className="text-xs text-gray-700">{language === 'de' ? 'Content-Strukturierung • Dokumentationsplanung • Benutzerzentriertes Design • Navigationsdesign • Versionskontrolle' : 'Content structuring • Documentation planning • User-centered design • Navigation design • Version control'}</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-1 text-sm">{language === 'de' ? 'Barrierefreiheit & Standards' : 'Accessibility & Standards'}</h3>
              <p className="text-xs text-gray-700">{language === 'de' ? 'WCAG 2.1-Konformität • Inklusives Design • Plain Language • Bildschirmleser-Kompatibilität • Barrierefreiheits-Audit' : "WCAG 2.1 compliance • Inclusive design • Plain language • Screen reader compatibility • Accessibility auditing"}</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-1 text-sm">{language === 'de' ? 'Multimedia & Visuelle Kommunikation' : 'Multimedia & Visual Communication'}</h3>
              <p className="text-xs text-gray-700">{language === 'de' ? 'Videobearbeitung • Infografiken • Visuelle Anleitungen • UI/UX-Dokumentation • Technische Illustrationen' : 'Video editing • Infographics • Visual guides • UI/UX documentation • Technical illustrations'}</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-1 text-sm">{language === 'de' ? 'Technik & Webentwicklung' : 'Technical & Web Development'}</h3>
              <p className="text-xs text-gray-700">{language === 'de' ? 'HTML/CSS/Markdown • Git/GitHub • Web-Barrierefreiheit • Responsives Design • Code-Dokumentation' : 'HTML/CSS/Markdown • Git/GitHub • Web accessibility • Responsive design • Code documentation'}</p>
            </div>
          </div>
        </section>

        {/* Tools & Platforms */}
        <section className="mb-6">
          <h2 className="text-2xl font-bold text-indigo-600 mb-3 border-b-2 border-gray-300 pb-1">{lang.tools}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-2 text-xs">
            <div>
              <span className="font-semibold text-gray-800">{language === 'de' ? 'E-Learning:' : 'E-Learning:'}</span>
              <span className="text-gray-700"> Articulate 360 (Storyline, Rise) • Moodle • SCORM Cloud</span>
            </div>

            <div>
              <span className="font-semibold text-gray-800">{language === 'de' ? 'Design & Multimedia:' : 'Design & Multimedia:'}</span>
              <span className="text-gray-700"> Adobe Creative Suite (Photoshop, InDesign, Premiere Pro) • Figma • Canva</span>
            </div>

            <div>
              <span className="font-semibold text-gray-800">{language === 'de' ? 'Dokumentation:' : 'Documentation:'}</span>
              <span className="text-gray-700"> VS Code • GitHub • Markdown • Notion • Confluence</span>
            </div>

            <div>
              <span className="font-semibold text-gray-800">{language === 'de' ? 'API-Dokumentation:' : 'API Documentation:'}</span>
              <span className="text-gray-700"> Postman • Swagger/OpenAPI</span>
            </div>

            <div>
              <span className="font-semibold text-gray-800">{language === 'de' ? 'Produktivität:' : 'Productivity:'}</span>
              <span className="text-gray-700"> Google Workspace • Microsoft 365 • Slack</span>
            </div>

            <div>
              <span className="font-semibold text-gray-800">{language === 'de' ? 'Übersetzung:' : 'Translation:'}</span>
              <span className="text-gray-700"> {language === 'de' ? 'KI-unterstützte Workflows • DeepL • Google Translate' : 'AI-assisted workflows • DeepL • Google Translate'}</span>
            </div>
          </div>
        </section>

        {/* Professional Experience */}
        <section className="mb-6">
          <h2 className="text-2xl font-bold text-indigo-600 mb-3 border-b-2 border-gray-300 pb-1">{lang.experience}</h2>
          
          <div className="mb-4">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2 gap-1">
              <div>
                <h3 className="font-bold text-gray-800">{language === 'de' ? 'Praktikum Global Academy - Online Training (Bevorstehende Position)' : 'Praktikum Global Academy - Online Training (Upcoming Role)'}</h3>
                <p className="text-gray-600 italic">Dräger, Lübeck</p>
              </div>
              <span className="text-sm text-gray-600 font-semibold">{lang.starting} Feb 2026</span>
            </div>
            <ul className="text-sm text-gray-700 space-y-1 ml-4">
              <li>• {language === 'de' ? 'Wird die Skript- und Content-Entwicklung für E-Learning-Module unterstützen' : 'Will support script and content development for e-learning modules'}</li>
              <li>• {language === 'de' ? 'Wird zur Videoproduktion, Bearbeitung und Erstellung von Multimedia-Inhalten beitragen' : 'Will contribute to video production, editing, and multimedia content creation'}</li>
              <li>• {language === 'de' ? 'Wird Videobearbeitung mit Adobe Premiere durchführen' : 'Will perform video editing with Adobe Premiere'}</li>
              <li>• {language === 'de' ? 'Wird unabhängige Dokumentations- und Instruktionsprojekte entwickeln' : 'Will develop independent documentation and instructional projects'}</li>
            </ul>
          </div>

          <div className="mb-4">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2 gap-1">
              <div>
                <h3 className="font-bold text-gray-800">{language === 'de' ? 'Digital Learning Designer (Praktikant)' : 'Digital Learning Designer (Intern)'}</h3>
                <p className="text-gray-600 italic">Tanz der Kulturen e.V., Hamburg</p>
              </div>
              <span className="text-sm text-gray-600">Juni 2025 – Nov 2025</span>
            </div>
            <ul className="text-sm text-gray-700 space-y-1 ml-4">
              <li>• {language === 'de' ? 'Erstellt 25+ barrierefreie Dokumentations-Assets und Unterrichtsmaterialien nach WCAG 2.1-Standards, die Benutzerfreundlichkeit für vielfältige Benutzergruppen gewährleistend' : 'Created 25+ accessible documentation assets and instructional materials following WCAG 2.1 standards, ensuring usability for diverse user groups'}</li>
              <li>• {language === 'de' ? 'Strukturierte und organisierte 50+ Bildungsressourcen für digitale Plattformen, unterstützte 200+ Nutzer in internationalen Kontexten' : 'Structured and organized 50+ educational resources for digital platforms, supporting 200+ users across international contexts'}</li>
              <li>• {language === 'de' ? 'Lokalisierte 300+ Seiten deutschen technischen und instruktionalen Inhalts ins Englische mit KI-unterstützten Übersetzungsworkflows, dabei Genauigkeit und natürliche Lesbarkeit erhaltend' : 'Localized 300+ pages of German technical and instructional content into English using AI-assisted translation workflows, maintaining accuracy and natural readability'}</li>
              <li>• {language === 'de' ? 'Entwickelte Multimedia-Dokumentation, einschließlich Infografiken und visuellen Anleitungen für komplexe Prozesse' : 'Developed multimedia documentation, including infographics and visual guides for complex processes'}</li>
            </ul>
          </div>

          <div className="mb-4">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2 gap-1">
              <div>
                <h3 className="font-bold text-gray-800">{language === 'de' ? 'Englischlehrer & Verwaltungsassistent' : 'English Language Teacher & Administrative Assistant'}</h3>
                <p className="text-gray-600 italic">Ghana National Service Scheme, Kumasi</p>
              </div>
              <span className="text-sm text-gray-600">Jan 2023 – Okt 2023</span>
            </div>
            <ul className="text-sm text-gray-700 space-y-1 ml-4">
              <li>• {language === 'de' ? 'Entwarf und hielt Englischunterricht mit Lernzielen, die an Blooms Taxonomie ausgerichtet sind, und verbesserte Verständnis-, Schreib- und Sprechfähigkeiten' : "Designed and delivered English lessons using learning objectives aligned with Bloom's Taxonomy, enhancing comprehension, writing, and speaking skills"}</li>
              <li>• {language === 'de' ? 'Bewertete den Lernfortschritt mit formativen und summativen Methoden, um Unterrichtsanpassungen zu informieren' : 'Assessed student progress using formative and summative methods to inform lesson adaptation'}</li>
              <li>• {language === 'de' ? 'Verwaltete administrative Aufgaben, einschließlich Schülerakten, Terminplanung und Korrespondenz' : 'Managed administrative tasks, including student records, scheduling, and correspondence'}</li>
            </ul>
          </div>

          <div className="mb-4">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2 gap-1">
              <div>
                <h3 className="font-bold text-gray-800">{language === 'de' ? 'Englisch-Lehrassistent (Praktikant)' : 'English Language Teaching Assistant (Intern)'}</h3>
                <p className="text-gray-600 italic">Ghana Education Service, Kumasi</p>
              </div>
              <span className="text-sm text-gray-600">Juni 2021 – Dez 2021</span>
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
              <span className="text-sm text-gray-600">Jan 2020 – Juni 2020</span>
            </div>
            <ul className="text-sm text-gray-700 space-y-1 ml-4">
              <li>• {language === 'de' ? 'Entwickelte und implementierte Unterrichtspläne und stellte sicher, dass sie mit Lehrplanstandards und Lernermotivierungsstrategien übereinstimmten' : 'Developed and implemented lesson plans, ensuring alignment with curriculum standards and learner engagement strategies'}</li>
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
                <p className="text-gray-600">Philipps-Universität Marburg, Deutschland</p>
              </div>
              <span className="text-sm text-gray-600">Okt 2023 – {language === 'de' ? 'Aktuell' : 'Present'}</span>
            </div>
            <p className="text-sm text-gray-700 italic ml-4">{language === 'de' ? 'Relevante Kurse: Medien | Visuelle Kunst | Schreiben für Forschung | Umstrittene Nachhaltigkeit' : 'Relevant Courses: Media | Visual Art | Writing for Research | Contested Sustainability'}</p>
            <p className="text-sm text-gray-700 font-semibold ml-4">{language === 'de' ? 'Masterarbeit: "KI als Reflexion: Mensch-Technologie-Beziehungen in digitalen Narrativen"' : 'Master\'s Thesis: "AI as Reflection: Human-Technology Relationships in Digital Narratives"'}</p>
          </div>

          <div>
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-1 gap-1">
              <div>
                <h3 className="font-bold text-gray-800">{language === 'de' ? 'Bachelor of Education in Englischer Sprache' : "Bachelor of Education in English Language"}</h3>
                <p className="text-gray-600">{language === 'de' ? 'Universität Cape Coast, Ghana' : 'University of Cape Coast, Ghana'}</p>
                <p className="text-sm text-gray-700"><span className="font-semibold">CGPA: 3.6/4.0</span> (≈ {language === 'de' ? 'Deutsch 1.4' : 'German 1.4'})</p>
              </div>
              <span className="text-sm text-gray-600">Okt 2018 – Okt 2022</span>
            </div>
            <p className="text-sm text-gray-700 italic ml-4">{language === 'de' ? 'Relevante Kurse: Pädagogische Psychologie | Allgemeine Curriculumstudien | Bewertung & Evaluation | Erziehung von Personen mit vielfältigen Lernbedürfnissen | Forschungsmethoden in der Bildung | Bildungsstatistik | Sprache & Linguistik | Semantik | Übersetzung | Englisch in mehrsprachigen Kontexten' : "Educational Psychology | General Curriculum Studies | Assessment & Evaluation | Educating Individuals with Diverse Learning Needs | Research Methods in Education | Educational Statistics | Language & Linguistics | Semantics | Translation | English in Multilingual Contexts"}</p>
          </div>
        </section>

        {/* Certifications */}
        <section className="mb-6">
          <h2 className="text-2xl font-bold text-indigo-600 mb-3 border-b-2 border-gray-300 pb-1">{lang.certifications}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• <span className="font-semibold">{language === 'de' ? 'Technical Writing Kurs' : 'Technical Writing Course'}</span> – Google Developers | <a href="https://developers.google.com/profile/badges/profile/created-profile" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline cursor-pointer">{lang.verify}</a> (April 2025)</li>
              <li>• <span className="font-semibold">{language === 'de' ? 'Technical Writing Kurs' : 'Technical Writing Course'}</span> – Board Infinity | <a href="https://bit.ly/446fLNy" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline cursor-pointer">{lang.verify}</a> (April 2025)</li>
              <li>• <span className="font-semibold">{language === 'de' ? 'API-Dokumentation erstellen' : 'Creating API Documentation'}</span> – LinkedIn Learning | <a href="https://www.linkedin.com/learning/certificates/62450d29357b3ffab0e29b7000b922977b9bddcaeaa9fde4870ca54d92732e0c" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline cursor-pointer">{lang.verify}</a> (Mai 2025)</li>
            </ul>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• <span className="font-semibold">{language === 'de' ? 'Instruktionsdesign Grundlagen & Anwendungen' : 'Instructional Design Foundations & Applications'}</span> – University of Illinois Urbana-Champaign | <a href="https://www.coursera.org/account/accomplishments/records/VA2HACXYEOYV" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline cursor-pointer">{lang.verify}</a> (Aug 2025)</li>
              <li>• <span className="font-semibold">{language === 'de' ? 'EF SET Englisch-Zertifikat' : 'EF SET English Certificate'}</span> – C1 Advanced (67/100) | <a href="https://cert.efset.org/1uf78L" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline cursor-pointer">{lang.verify}</a> (Feb 2025)</li>
            </ul>
          </div>
        </section>

        {/* Portfolio Highlights */}
        <section className="mb-6">
          <h2 className="text-2xl font-bold text-indigo-600 mb-3 border-b-2 border-gray-300 pb-1">{lang.portfolioHighlights}</h2>
          
          <div className="space-y-3">
            <div>
              <h3 className="font-bold text-gray-800 mb-1">{language === 'de' ? 'Technische Dokumentation' : 'Technical Documentation'}</h3>
              <ul className="text-sm text-gray-700 space-y-1 ml-4">
                <li>• 2FA {language === 'de' ? 'Benutzerhandbuch' : 'User Guide'} (Microsoft PDF format) | <a href="https://github.com/Samuelsen1/Sample-2" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline cursor-pointer">{lang.link}</a></li>
                <li>• Postman API {language === 'de' ? 'Dokumentationsanleitung' : 'Documentation Guide'} | <a href="https://github.com/Samuelsen1/Sample-2" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline cursor-pointer">{lang.link}</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-gray-800 mb-1">{language === 'de' ? 'E-Learning-Module' : 'E-Learning Modules'}</h3>
              <ul className="text-sm text-gray-700 space-y-1 ml-4">
                <li>• {language === 'de' ? 'Plain Language & Inklusive Kommunikation: Interaktives E-Learning-Modul mit erweitertem Barrierefreiheits-Panel' : 'Plain Language & Inclusive Communication: Interactive E-Learning Module with advanced accessibility panel'} | <a href="https://plain-language-five.vercel.app" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline cursor-pointer">{lang.link}</a></li>
                <li>• 2FA {language === 'de' ? 'Praktische Einrichtung & Fehlerbehebung' : 'Practical Setup & Troubleshooting'} | <a href="https://360.eu.articulate.com/review/content/8d8ac689-1670-458d-a7b3-0407850b55ef/review" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline cursor-pointer">{lang.link}</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-gray-800 mb-1">{language === 'de' ? 'Wissensdatenbank & Content-Systeme' : 'Knowledge Base & Content Systems'}</h3>
              <ul className="text-sm text-gray-700 space-y-1 ml-4">
                <li>• {language === 'de' ? 'ADDIE-basierte Dokumentation für LLMs & Nachhaltigkeit' : 'ADDIE-based Documentation for LLMs & Sustainability'} | <a href="https://www.notion.so/Instructional-Design-Portfolio-Opoku-Samuel-1d4f017e613b8029b616c5b6d1fd784d?source=copy_link" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline cursor-pointer">{lang.link}</a></li>
                <li>• {language === 'de' ? 'Wissensdatenbank für Nachhaltigkeit und Klimawandel' : 'Sustainability and Climate Change Knowledge Base'} | <a href="https://www.notion.so/Combating-Climate-Change-A-Collective-Responsibility-284f017e613b80acb039d4ca5425349f?source=copy_link" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline cursor-pointer">{lang.link}</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-gray-800 mb-1">{language === 'de' ? 'Web-Projekt' : 'Web Project'}</h3>
              <ul className="text-sm text-gray-700 space-y-1 ml-4">
                <li>• {language === 'de' ? 'Persönliche Portfolio-Website: Responsive, zweisprachige (EN/DE) technische Präsentation mit Barrierefreiheits-Features, KI-Chatbot und Theme-Anpassung' : 'Personal Portfolio Website: Responsive, bilingual (EN/DE) technical showcase with accessibility features, AI chatbot and theme customization'} | <a href="https://vs-code-port1.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline cursor-pointer">{lang.link}</a></li>
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
