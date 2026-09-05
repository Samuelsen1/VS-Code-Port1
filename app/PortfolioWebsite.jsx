'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Mail, Linkedin, Github, FileText, Sun, Moon, X, Eye, EyeOff,
  MessageCircle, Send, Award, Plus, RotateCcw, ExternalLink
} from 'lucide-react';

function sanitizeHtml(html) {
  if (typeof html !== 'string') return '';
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<iframe\b[^>]*>[\s\S]*?<\/iframe>/gi, '')
    .replace(/\s+on\w+\s*=\s*["'][^"']*["']/gi, '')
    .replace(/\s+on\w+\s*=\s*[^\s>]+/gi, '');
}

export default function PortfolioWebsite() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState('en');
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [featuresEnabled, setFeaturesEnabled] = useState(true);

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const [chatLastFailed, setChatLastFailed] = useState(null);
  const chatEndRef = useRef(null);
  const chatInputRef = useRef(null);

  const [fabExpanded, setFabExpanded] = useState(false);
  const [isAccessibilityOpen, setIsAccessibilityOpen] = useState(false);
  const [accessibility, setAccessibility] = useState({
    contrast: 0,
    mark: 0,
    largeText: 0,
    textSpacing: 0,
    stopAnimations: 0,
    hideImages: 0,
    dyslexia: 0,
    rowHeight: 0,
    focusIndicator: 0,
    blueLightFilter: 0
  });

  const binaryFeatures = ['mark', 'stopAnimations', 'hideImages'];

  useEffect(() => {
    document.documentElement.lang = language === 'de' ? 'de' : 'en';
    if (typeof window !== 'undefined') localStorage.setItem('language', language);
  }, [language]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const f = localStorage.getItem('featuresEnabled');
      if (f !== null) setFeaturesEnabled(f === 'true');
      const d = localStorage.getItem('isDarkTheme');
      if (d !== null) setIsDarkTheme(d === 'true');
      const a = localStorage.getItem('accessibility');
      if (a) {
        const parsed = JSON.parse(a);
        if (parsed && typeof parsed === 'object') setAccessibility((prev) => ({ ...prev, ...parsed }));
      }
      const langParam = new URLSearchParams(window.location.search).get('lang');
      const storedLang = localStorage.getItem('language');
      if (langParam === 'en' || langParam === 'de') setLanguage(langParam);
      else if (storedLang === 'en' || storedLang === 'de') setLanguage(storedLang);
    } catch (_) { /* ignore */ }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') localStorage.setItem('featuresEnabled', String(featuresEnabled));
  }, [featuresEnabled]);
  useEffect(() => {
    if (typeof window !== 'undefined') localStorage.setItem('isDarkTheme', String(isDarkTheme));
  }, [isDarkTheme]);
  useEffect(() => {
    if (typeof window !== 'undefined') localStorage.setItem('accessibility', JSON.stringify(accessibility));
  }, [accessibility]);

  useEffect(() => {
    if (!featuresEnabled) {
      setIsAccessibilityOpen(false);
      setIsChatOpen(false);
    }
  }, [featuresEnabled]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    document.documentElement.style.backgroundColor = isDarkTheme ? '#0b1220' : '#f4f6f8';
    document.body.style.backgroundColor = isDarkTheme ? '#0b1220' : '#f4f6f8';
  }, [isDarkTheme]);

  const resetAccessibility = () => {
    setAccessibility({
      contrast: 0, mark: 0, largeText: 0, textSpacing: 0, stopAnimations: 0,
      hideImages: 0, dyslexia: 0, rowHeight: 0, focusIndicator: 0, blueLightFilter: 0
    });
  };

  const toggleAccessibility = useCallback((setting) => {
    setTimeout(() => {
      setAccessibility((prev) => {
        if (binaryFeatures.includes(setting)) {
          return { ...prev, [setting]: prev[setting] === 0 ? 1 : 0 };
        }
        if (setting === 'blueLightFilter') {
          return { ...prev, [setting]: prev[setting] >= 5 ? 0 : prev[setting] + 1 };
        }
        return { ...prev, [setting]: prev[setting] === 0 ? 1 : prev[setting] === 1 ? 2 : 0 };
      });
    }, 0);
  }, []);

  const formatChatMessage = (text) => {
    if (!text) return '';
    let formatted = text
      .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold">$1</strong>')
      .replace(/\*(.+?)\*/g, '<em class="italic">$1</em>')
      .replace(/^- (.+)$/gm, '<li class="ml-4 list-disc">$1</li>')
      .replace(/\n\n/g, '<br/><br/>')
      .replace(/\n/g, '<br/>');
    return formatted;
  };

  const handleChatSubmit = async (e, retryMessage) => {
    e?.preventDefault?.();
    const toSend = retryMessage != null && retryMessage !== '' ? retryMessage : chatInput.trim();
    if (!toSend) return;

    if (retryMessage) {
      setChatMessages((prev) => {
        const n = [...prev];
        if (n[n.length - 1]?.role === 'assistant') n.pop();
        return n;
      });
    } else {
      setChatInput('');
      setChatMessages((prev) => [...prev, { role: 'user', content: toSend }]);
    }
    setChatLastFailed(null);
    setChatLoading(true);

    const historyForApi = retryMessage ? chatMessages.slice(0, -1) : chatMessages;
    const errContent =
      language === 'en'
        ? 'Sorry, something went wrong. Please try again or email gideonsammysen@gmail.com.'
        : 'Entschuldigung, etwas ist schiefgelaufen. Bitte erneut versuchen oder gideonsammysen@gmail.com schreiben.';

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: toSend, language, history: historyForApi.slice(-10) })
      });
      const data = await response.json();
      if (response.ok) {
        setChatMessages((prev) => [...prev, { role: 'assistant', content: data.response }]);
      } else {
        setChatMessages((prev) => [...prev, { role: 'assistant', content: errContent, isError: true }]);
        setChatLastFailed(toSend);
      }
    } catch (error) {
      console.error('Chat error:', error);
      setChatMessages((prev) => [...prev, { role: 'assistant', content: errContent, isError: true }]);
      setChatLastFailed(toSend);
    } finally {
      setChatLoading(false);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  useEffect(() => {
    if (isChatOpen && chatMessages.length === 0) {
      setChatMessages([
        {
          role: 'assistant',
          content:
            language === 'en'
              ? "Hi — I can answer questions about Samuel's experience, skills, education, and projects."
              : 'Hallo — ich beantworte Fragen zu Samuels Erfahrung, Fähigkeiten, Ausbildung und Projekten.'
        }
      ]);
    }
  }, [isChatOpen, language, chatMessages.length]);

  useEffect(() => {
    if (!isChatOpen) return;
    const f = (e) => {
      if (e.key === 'Escape') setIsChatOpen(false);
    };
    document.addEventListener('keydown', f);
    return () => document.removeEventListener('keydown', f);
  }, [isChatOpen]);

  useEffect(() => {
    if (isChatOpen && chatInputRef.current) {
      setTimeout(() => chatInputRef.current?.focus(), 80);
    }
  }, [isChatOpen]);

  useEffect(() => {
    const root = document.documentElement;
    const filters = [];
    if (accessibility.contrast > 0) {
      filters.push(`contrast(${1 + (accessibility.contrast === 1 ? 0.25 : 0.5)})`);
    }
    root.style.filter = filters.length ? filters.join(' ') : '';

    if (accessibility.blueLightFilter > 0) {
      const style = document.getElementById('a11y-blue-light-filter') || document.createElement('style');
      style.id = 'a11y-blue-light-filter';
      const opacityMap = { 1: 0.1, 2: 0.15, 3: 0.2, 4: 0.25, 5: 0.3 };
      const opacity = opacityMap[accessibility.blueLightFilter] || 0.15;
      style.textContent = `html::before{content:'';position:fixed;inset:0;background:rgba(255,200,100,${opacity});pointer-events:none;z-index:999999;mix-blend-mode:multiply;}`;
      if (!document.getElementById('a11y-blue-light-filter')) document.head.appendChild(style);
    } else {
      document.getElementById('a11y-blue-light-filter')?.remove();
    }

    root.style.fontSize = accessibility.largeText > 0 ? (accessibility.largeText === 1 ? '110%' : '120%') : '100%';

    if (accessibility.textSpacing > 0) {
      const m = accessibility.textSpacing === 1 ? 1 : 1.5;
      root.style.letterSpacing = `${0.12 * m}em`;
      root.style.wordSpacing = `${0.4 * m}em`;
    } else {
      root.style.letterSpacing = 'normal';
      root.style.wordSpacing = 'normal';
    }

    if (accessibility.stopAnimations > 0) {
      const style = document.getElementById('a11y-disable-animations') || document.createElement('style');
      style.id = 'a11y-disable-animations';
      style.textContent = '*{animation:none!important;transition:none!important}';
      if (!document.getElementById('a11y-disable-animations')) document.head.appendChild(style);
    } else {
      document.getElementById('a11y-disable-animations')?.remove();
    }

    document.querySelectorAll('img').forEach((img) => {
      img.style.visibility = accessibility.hideImages > 0 ? 'hidden' : 'visible';
    });

    if (accessibility.dyslexia > 0) {
      if (!document.getElementById('lexend-font')) {
        const link = document.createElement('link');
        link.id = 'lexend-font';
        link.rel = 'stylesheet';
        link.href = 'https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700&display=swap';
        document.head.appendChild(link);
      }
      const style = document.getElementById('a11y-dyslexia-font') || document.createElement('style');
      style.id = 'a11y-dyslexia-font';
      style.textContent = `*{font-family:"Lexend",sans-serif!important;letter-spacing:0.06em!important;line-height:1.7!important}`;
      if (!document.getElementById('a11y-dyslexia-font')) document.head.appendChild(style);
    } else {
      document.getElementById('a11y-dyslexia-font')?.remove();
    }

    if (accessibility.focusIndicator > 0) {
      const style = document.getElementById('a11y-focus-indicator') || document.createElement('style');
      style.id = 'a11y-focus-indicator';
      const thickness = accessibility.focusIndicator === 1 ? '3px' : '5px';
      style.textContent = `*:focus-visible{outline:${thickness} solid #1e4d6b!important;outline-offset:2px!important}`;
      if (!document.getElementById('a11y-focus-indicator')) document.head.appendChild(style);
    } else {
      document.getElementById('a11y-focus-indicator')?.remove();
    }
  }, [accessibility]);

  const t = {
    en: {
      name: 'Samuel Opoku',
      nav: { work: 'Work', approach: 'Approach', experience: 'Experience', contact: 'Contact' },
      hero: {
        role: 'Instructional Designer',
        line: 'I design accessible, learner-centered e-learning for medtech and cultural organizations — from storyboard to Articulate Rise delivery.',
        cta: 'Get in touch',
        cv: 'View CV'
      },
      work: {
        title: 'Selected work',
        subtitle: 'Modules and learning assets that show how I structure content, media, and learner flow.'
      },
      approach: {
        title: 'How I work',
        subtitle: 'Clear objectives, structured content, and careful iteration with subject-matter experts.',
        items: [
          { title: 'Clarify the learning goal', desc: 'Translate specialist input into outcomes, sequence, and tone that fit a non-technical audience.' },
          { title: 'Build for the medium', desc: 'Articulate Rise modules, video, and visual assets shaped for how people actually learn at work.' },
          { title: 'Refine with stakeholders', desc: 'Run review cycles that improve structure, accuracy, and brand alignment before release.' }
        ]
      },
      experience: { title: 'Experience' },
      credentials: {
        title: 'Tools & credentials',
        skillsLabel: 'Core toolkit',
        certsLabel: 'Certifications'
      },
      contact: {
        title: 'Let’s talk',
        desc: 'Open to instructional design and digital learning roles across L&D, product training, and cultural education.',
        email: 'Email',
        linkedin: 'LinkedIn',
        location: 'Lübeck, Germany'
      },
      footer: '© 2026 Samuel Opoku'
    },
    de: {
      name: 'Samuel Opoku',
      nav: { work: 'Arbeit', approach: 'Ansatz', experience: 'Erfahrung', contact: 'Kontakt' },
      hero: {
        role: 'Instructional Designer',
        line: 'Ich gestalte barrierefreies, lernerzentriertes E-Learning für Medtech und Kultureinrichtungen — vom Storyboard bis zur Auslieferung in Articulate Rise.',
        cta: 'Kontakt',
        cv: 'Lebenslauf'
      },
      work: {
        title: 'Ausgewählte Arbeiten',
        subtitle: 'Module und Lernassets, die zeigen, wie ich Inhalt, Medien und Lernfluss strukturiere.'
      },
      approach: {
        title: 'So arbeite ich',
        subtitle: 'Klare Ziele, strukturierte Inhalte und sorgfältige Iteration mit Fachexperten.',
        items: [
          { title: 'Lernziel schärfen', desc: 'Fachinput in Outcomes, Reihenfolge und Ton für nicht-technische Zielgruppen übersetzen.' },
          { title: 'Für das Medium bauen', desc: 'Articulate-Rise-Module, Video und visuelle Assets für reales Lernen im Arbeitsalltag.' },
          { title: 'Mit Stakeholdern verfeinern', desc: 'Review-Zyklen für Struktur, Genauigkeit und Markenpassung vor dem Release.' }
        ]
      },
      experience: { title: 'Erfahrung' },
      credentials: {
        title: 'Tools & Nachweise',
        skillsLabel: 'Kern-Toolkit',
        certsLabel: 'Zertifikate'
      },
      contact: {
        title: 'Sprechen wir',
        desc: 'Offen für Rollen in Instruktionsdesign und Digital Learning in L&D, Produktschulung und Kulturbildung.',
        email: 'E-Mail',
        linkedin: 'LinkedIn',
        location: 'Lübeck, Deutschland'
      },
      footer: '© 2026 Samuel Opoku'
    }
  };

  const copy = t[language] || t.en;

  const projects = [
    {
      title: {
        en: 'Cybersecurity Essentials for Every Employee',
        de: 'Cybersicherheit für alle Mitarbeitenden'
      },
      kind: { en: 'E-Learning · Rise & Synthesia', de: 'E-Learning · Rise & Synthesia' },
      desc: {
        en: 'Practical awareness course on secure habits and organisational safety for everyday employees.',
        de: 'Praxisnaher Kurs zu sicheren Gewohnheiten und organisatorischer Sicherheit für den Arbeitsalltag.'
      },
      href: 'https://charming-sprinkles-d9df51.netlify.app/'
    },
    {
      title: {
        en: 'Combating Climate Change: A Collective Responsibility',
        de: 'Klimawandel bekämpfen — gemeinsame Verantwortung'
      },
      kind: { en: 'E-Learning · Articulate Rise', de: 'E-Learning · Articulate Rise' },
      desc: {
        en: 'Accessible environmental learning on climate awareness and collective action.',
        de: 'Barrierefreies Umweltlernen zu Klimabewusstsein und kollektivem Handeln.'
      },
      href: 'https://spectacular-dango-d6bec1.netlify.app/#/'
    },
    {
      title: {
        en: 'Dräger product & sales training',
        de: 'Dräger Produkt- & Vertriebsschulung'
      },
      kind: { en: 'Product training · Articulate 360', de: 'Produktschulung · Articulate 360' },
      desc: {
        en: 'Controllers, X-am 2800/5800, and vacuum systems modules — samples available on request.',
        de: 'Module zu Controllers, X-am 2800/5800 und Vakuumsystemen — Beispiele auf Anfrage.'
      },
      href: '#contact'
    },
    {
      title: {
        en: 'General — AI learning assistant',
        de: 'General — KI-Lernassistent'
      },
      kind: { en: 'AI project', de: 'KI-Projekt' },
      desc: {
        en: 'Thesis-inspired assistant for Q&A, fact-checking, PDFs, and analysis.',
        de: 'Thesis-inspirierter Assistent für Q&A, Faktenprüfung, PDFs und Analyse.'
      },
      href: 'https://general-ai-wheat.vercel.app'
    }
  ];

  const experience = [
    {
      title: { en: 'Instructional Designer (Freelance)', de: 'Instructional Designer (Freelance)' },
      company: 'Node Center for Curatorial Studies, Berlin',
      date: { en: 'Aug 2026 – Present', de: 'Aug 2026 – heute' },
      image: '/images/node-center.png',
      bullets: {
        en: [
          'Translate subject-matter input into structured, learner-friendly content for specialist audiences',
          'Design Articulate Rise modules for museum and curatorial staff',
          'Manage iterative stakeholder reviews across tone, structure, and visual design'
        ],
        de: [
          'Fachinput in strukturierte, lernfreundliche Inhalte für spezialisierte Zielgruppen übersetzen',
          'Articulate-Rise-Module für Museum- und Kuratoren-Teams gestalten',
          'Iterative Stakeholder-Reviews zu Ton, Struktur und visuellem Design steuern'
        ]
      }
    },
    {
      title: { en: 'E-Learning Developer', de: 'E-Learning-Entwickler' },
      company: 'Dräger, Lübeck',
      date: { en: 'Feb 2026 – Jul 2026', de: 'Feb 2026 – Jul 2026' },
      image: '/images/drager.png',
      bullets: {
        en: [
          'Produced instructional video for global product training (Premiere Pro)',
          'Transferred learning content into Articulate Rise aligned to corporate identity',
          'Created multilingual module versions with AI-assisted workflows'
        ],
        de: [
          'Lehrvideos für globale Produktschulungen produziert (Premiere Pro)',
          'Lerninhalte in Articulate Rise nach Corporate Identity überführt',
          'Mehrsprachige Modulversionen mit KI-gestützten Workflows erstellt'
        ]
      }
    },
    {
      title: { en: 'Digital Learning Designer', de: 'Digital Learning Designer' },
      company: 'Tanz der Kulturen e.V., Hamburg',
      date: { en: 'Jun 2025 – Nov 2025', de: 'Jun 2025 – Nov 2025' },
      image: '/images/tdk.jpg',
      bullets: {
        en: [
          'Designed 25+ multimedia learning assets in Figma',
          'Curated 50+ resources for multicultural art pedagogy (200+ learners)',
          'Localized 300+ pages of German instructional content into English'
        ],
        de: [
          '25+ Multimedia-Lernassets in Figma gestaltet',
          '50+ Ressourcen für multikulturelle Kunstpädagogik kuratiert (200+ Lernende)',
          '300+ Seiten deutscher Unterrichtsinhalte ins Englische lokalisiert'
        ]
      }
    }
  ];

  const skills = [
    'ADDIE', "Bloom's Taxonomy", 'LXD', 'Storyboarding',
    'Articulate 360', 'SCORM', 'Moodle',
    'Premiere Pro', 'Photoshop', 'InDesign', 'Figma', 'Synthesia', 'Descript',
    'HTML', 'CSS', 'Notion', 'Confluence'
  ];

  const certifications = [
    {
      title: { en: 'Instructional Design Foundations & Applications', de: 'Instructional Design Foundations & Applications' },
      issuer: 'University of Illinois',
      link: 'https://www.coursera.org/account/accomplishments/verify/VA2HACXYEOYV'
    },
    {
      title: { en: 'EF SET English — C1 Advanced', de: 'EF SET Englisch — C1 Advanced' },
      issuer: 'EF SET',
      link: 'https://cert.efset.org/1uf78L'
    },
    {
      title: { en: 'Technical Writing', de: 'Technical Writing' },
      issuer: 'Board Infinity',
      link: 'https://bit.ly/446fLNy'
    }
  ];

  const ink = isDarkTheme ? 'text-slate-100' : 'text-[var(--ink)]';
  const soft = isDarkTheme ? 'text-slate-400' : 'text-[var(--ink-soft)]';
  const pageBg = isDarkTheme
    ? 'bg-[#0b1220]'
    : 'bg-[radial-gradient(1200px_600px_at_10%_-10%,#d9e4ef_0%,transparent_55%),radial-gradient(900px_500px_at_90%_10%,#cfdce8_0%,transparent_50%),linear-gradient(180deg,#f4f6f8_0%,#eef2f6_100%)]';
  const surface = isDarkTheme ? 'bg-white/5 border-white/10' : 'bg-white/70 border-[var(--line)]';
  const accent = isDarkTheme ? 'text-sky-300' : 'text-[var(--accent)]';

  const a11yButtons = [
    { key: 'contrast', label: language === 'en' ? 'Contrast' : 'Kontrast' },
    { key: 'largeText', label: language === 'en' ? 'Larger text' : 'Größerer Text' },
    { key: 'textSpacing', label: language === 'en' ? 'Spacing' : 'Abstand' },
    { key: 'dyslexia', label: language === 'en' ? 'Dyslexia font' : 'Dyslexie-Schrift' },
    { key: 'stopAnimations', label: language === 'en' ? 'Stop motion' : 'Bewegung aus' },
    { key: 'hideImages', label: language === 'en' ? 'Hide images' : 'Bilder aus' },
    { key: 'focusIndicator', label: language === 'en' ? 'Focus ring' : 'Fokusring' },
    { key: 'blueLightFilter', label: language === 'en' ? 'Blue light' : 'Blaulicht' }
  ];

  return (
    <div className={`min-h-screen ${pageBg} ${ink}`}>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[100] focus:bg-[var(--accent)] focus:text-white focus:px-4 focus:py-2"
      >
        {language === 'en' ? 'Skip to main content' : 'Zum Hauptinhalt springen'}
      </a>

      <header className={`fixed top-0 inset-x-0 z-50 border-b backdrop-blur-md ${isDarkTheme ? 'bg-[#0b1220]/85 border-white/10' : 'bg-[#f4f6f8]/85 border-[var(--line)]'}`}>
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0">
            <a href="#main" className={`font-display text-lg md:text-xl tracking-tight truncate ${ink}`}>
              {copy.name}
            </a>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-2 py-1 text-xs font-semibold rounded-md border ${language === 'en' ? 'bg-[var(--accent)] text-white border-[var(--accent)]' : `${surface} ${soft}`}`}
                aria-label="English"
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLanguage('de')}
                className={`px-2 py-1 text-xs font-semibold rounded-md border ${language === 'de' ? 'bg-[var(--accent)] text-white border-[var(--accent)]' : `${surface} ${soft}`}`}
                aria-label="Deutsch"
              >
                DE
              </button>
            </div>
          </div>

          <nav className={`hidden md:flex items-center gap-7 text-sm font-medium ${soft}`} aria-label="Main">
            <a href="#work" className="hover:text-[var(--accent)] transition-colors">{copy.nav.work}</a>
            <a href="#approach" className="hover:text-[var(--accent)] transition-colors">{copy.nav.approach}</a>
            <a href="#experience" className="hover:text-[var(--accent)] transition-colors">{copy.nav.experience}</a>
            <a href="#contact" className="hover:text-[var(--accent)] transition-colors">{copy.nav.contact}</a>
            <button type="button" onClick={() => setIsDarkTheme(!isDarkTheme)} className={`p-2 rounded-md border ${surface}`} aria-label="Theme">
              {isDarkTheme ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              type="button"
              onClick={() => setFeaturesEnabled(!featuresEnabled)}
              className={`p-2 rounded-md border ${surface}`}
              aria-label={featuresEnabled ? 'Disable features' : 'Enable features'}
            >
              {featuresEnabled ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            </button>
          </nav>

          <button type="button" className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Menu">
            <span className="block w-5 h-0.5 bg-current mb-1" />
            <span className="block w-5 h-0.5 bg-current mb-1" />
            <span className="block w-5 h-0.5 bg-current" />
          </button>
        </div>
        {isMenuOpen && (
          <div className={`md:hidden border-t px-5 py-3 space-y-2 ${isDarkTheme ? 'border-white/10 bg-[#0b1220]' : 'border-[var(--line)] bg-white'}`}>
            {['work', 'approach', 'experience', 'contact'].map((id) => (
              <a key={id} href={`#${id}`} className="block py-2" onClick={() => setIsMenuOpen(false)}>
                {copy.nav[id]}
              </a>
            ))}
          </div>
        )}
      </header>

      <main id="main">
        {/* Hero — one composition */}
        <section className="relative min-h-[100svh] pt-16 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/images/Instructional_Design_illustration.jpg')" }}
            aria-hidden="true"
          />
          <div className={`absolute inset-0 ${isDarkTheme ? 'bg-[#0b1220]/80' : 'bg-gradient-to-r from-[#f4f6f8]/95 via-[#f4f6f8]/88 to-[#f4f6f8]/35'}`} />
          <div className="relative max-w-6xl mx-auto px-5 py-20 md:py-28 grid md:grid-cols-[1.15fr_0.85fr] gap-12 items-end min-h-[calc(100svh-4rem)]">
            <div className="animate-rise">
              <p className={`font-display text-5xl md:text-7xl leading-[0.95] tracking-tight mb-5 ${ink}`}>
                {copy.name}
              </p>
              <p className={`text-lg md:text-xl font-semibold mb-4 ${accent}`}>{copy.hero.role}</p>
              <p className={`max-w-xl text-base md:text-lg leading-relaxed mb-8 ${soft}`}>{copy.hero.line}</p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-[var(--accent)] text-white font-semibold hover:bg-[var(--accent-soft)] transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  {copy.hero.cta}
                </a>
                <a
                  href={`/cv?lang=${language}`}
                  className={`inline-flex items-center gap-2 px-5 py-3 rounded-md border font-semibold ${surface} ${ink}`}
                >
                  <FileText className="w-4 h-4" />
                  {copy.hero.cv}
                </a>
              </div>
            </div>
            <div className="animate-rise-delay justify-self-end w-full max-w-sm">
              <div className={`relative overflow-hidden rounded-sm border ${isDarkTheme ? 'border-white/15' : 'border-[var(--line)]'} shadow-[0_20px_60px_rgba(15,39,68,0.12)]`}>
                <img
                  src="/images/profile.jpg"
                  alt={copy.name}
                  width={480}
                  height={600}
                  className="w-full h-[420px] object-cover animate-drift"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Work */}
        <section id="work" className="py-24 px-5">
          <div className="max-w-6xl mx-auto">
            <div className="max-w-2xl mb-14">
              <h2 className={`font-display text-3xl md:text-4xl mb-3 ${ink}`}>{copy.work.title}</h2>
              <p className={soft}>{copy.work.subtitle}</p>
            </div>
            <div className="divide-y divide-[var(--line)] dark:divide-white/10 border-y border-[var(--line)] dark:border-white/10">
              {projects.map((p) => (
                <a
                  key={p.href + p.title.en}
                  href={p.href}
                  target={p.href.startsWith('http') ? '_blank' : undefined}
                  rel={p.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="group flex flex-col md:flex-row md:items-baseline gap-2 md:gap-10 py-8 transition-colors hover:bg-white/40 dark:hover:bg-white/[0.03] px-1"
                >
                  <span className={`md:w-56 shrink-0 text-sm font-medium ${accent}`}>{p.kind[language]}</span>
                  <span className="flex-1">
                    <span className={`block font-display text-xl md:text-2xl mb-2 group-hover:text-[var(--accent-soft)] transition-colors ${ink}`}>
                      {p.title[language]}
                    </span>
                    <span className={`block text-[15px] leading-relaxed max-w-2xl ${soft}`}>{p.desc[language]}</span>
                  </span>
                  <ExternalLink className={`w-4 h-4 shrink-0 opacity-40 group-hover:opacity-100 ${soft}`} />
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Approach */}
        <section id="approach" className={`py-24 px-5 ${isDarkTheme ? 'bg-white/[0.03]' : 'bg-white/50'}`}>
          <div className="max-w-6xl mx-auto">
            <div className="max-w-2xl mb-14">
              <h2 className={`font-display text-3xl md:text-4xl mb-3 ${ink}`}>{copy.approach.title}</h2>
              <p className={soft}>{copy.approach.subtitle}</p>
            </div>
            <div className="grid md:grid-cols-3 gap-10 md:gap-12">
              {copy.approach.items.map((item, i) => (
                <div key={item.title}>
                  <p className={`text-xs font-semibold tracking-[0.14em] uppercase mb-3 ${accent}`}>0{i + 1}</p>
                  <h3 className={`font-display text-xl mb-3 ${ink}`}>{item.title}</h3>
                  <p className={`text-[15px] leading-relaxed ${soft}`}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Experience */}
        <section id="experience" className="py-24 px-5">
          <div className="max-w-6xl mx-auto">
            <h2 className={`font-display text-3xl md:text-4xl mb-14 ${ink}`}>{copy.experience.title}</h2>
            <div className="space-y-12">
              {experience.map((job) => (
                <article key={job.company} className="grid md:grid-cols-[88px_1fr] gap-5 md:gap-8">
                  <div className={`w-16 h-16 md:w-20 md:h-20 rounded-sm overflow-hidden border ${surface} bg-white flex items-center justify-center`}>
                    <img src={job.image} alt="" className="w-full h-full object-contain p-1.5" />
                  </div>
                  <div>
                    <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1 mb-3">
                      <div>
                        <h3 className={`font-display text-xl ${ink}`}>{job.title[language]}</h3>
                        <p className={`text-sm font-medium ${accent}`}>{job.company}</p>
                      </div>
                      <p className={`text-sm ${soft}`}>{job.date[language]}</p>
                    </div>
                    <ul className={`space-y-2 text-[15px] leading-relaxed ${soft}`}>
                      {job.bullets[language].map((b) => (
                        <li key={b} className="pl-4 relative before:content-[''] before:absolute before:left-0 before:top-[0.55em] before:w-1.5 before:h-1.5 before:rounded-full before:bg-[var(--accent)]">
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Credentials */}
        <section className={`py-24 px-5 ${isDarkTheme ? 'bg-white/[0.03]' : 'bg-white/50'}`}>
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
            <div>
              <h2 className={`font-display text-3xl mb-3 ${ink}`}>{copy.credentials.title}</h2>
              <p className={`text-sm font-semibold uppercase tracking-[0.12em] mb-5 ${accent}`}>{copy.credentials.skillsLabel}</p>
              <div className="flex flex-wrap gap-2">
                {skills.map((s) => (
                  <span key={s} className={`text-sm px-3 py-1.5 rounded-md border ${surface} ${soft}`}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className={`text-sm font-semibold uppercase tracking-[0.12em] mb-5 ${accent}`}>{copy.credentials.certsLabel}</p>
              <ul className="space-y-4">
                {certifications.map((c) => (
                  <li key={c.link}>
                    <a href={c.link} target="_blank" rel="noopener noreferrer" className={`group block ${ink}`}>
                      <span className="font-display text-lg group-hover:text-[var(--accent-soft)] transition-colors">{c.title[language]}</span>
                      <span className={`block text-sm ${soft}`}>{c.issuer}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-24 px-5">
          <div className="max-w-6xl mx-auto">
            <h2 className={`font-display text-3xl md:text-5xl mb-4 ${ink}`}>{copy.contact.title}</h2>
            <p className={`max-w-xl text-base md:text-lg mb-10 ${soft}`}>{copy.contact.desc}</p>
            <div className="flex flex-wrap gap-3 mb-8">
              <a href="mailto:gideonsammysen@gmail.com" className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-[var(--accent)] text-white font-semibold">
                <Mail className="w-4 h-4" /> {copy.contact.email}
              </a>
              <a href="https://www.linkedin.com/in/samuel-o-4b9bbb2a8" target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2 px-5 py-3 rounded-md border font-semibold ${surface}`}>
                <Linkedin className="w-4 h-4" /> {copy.contact.linkedin}
              </a>
              <a href="https://github.com/Samuelsen1" target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2 px-5 py-3 rounded-md border font-semibold ${surface}`}>
                <Github className="w-4 h-4" /> GitHub
              </a>
            </div>
            <p className={`text-sm ${soft}`}>{copy.contact.location} · +49 171 5811680</p>
          </div>
        </section>
      </main>

      <footer className={`border-t py-8 px-5 ${isDarkTheme ? 'border-white/10' : 'border-[var(--line)]'}`}>
        <div className={`max-w-6xl mx-auto text-sm ${soft}`}>{copy.footer}</div>
      </footer>

      {/* FAB */}
      {featuresEnabled && (
        <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
          {fabExpanded && (
            <>
              <button
                type="button"
                onClick={() => { setFabExpanded(false); setIsAccessibilityOpen(true); }}
                className="w-12 h-12 rounded-full bg-[var(--accent)] text-white flex items-center justify-center shadow-lg"
                aria-label="Accessibility"
              >
                <Award className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => { setFabExpanded(false); setIsChatOpen(true); }}
                className="w-12 h-12 rounded-full bg-[var(--accent)] text-white flex items-center justify-center shadow-lg"
                aria-label="AI Assistant"
              >
                <MessageCircle className="w-5 h-5" />
              </button>
            </>
          )}
          <button
            type="button"
            onClick={() => setFabExpanded(!fabExpanded)}
            className={`w-14 h-14 rounded-full text-white flex items-center justify-center shadow-lg ${fabExpanded ? 'bg-slate-600' : 'bg-[var(--accent)]'}`}
            aria-expanded={fabExpanded}
            aria-label="Features"
          >
            <Plus className={`w-7 h-7 transition-transform ${fabExpanded ? 'rotate-45' : ''}`} />
          </button>
        </div>
      )}

      {/* Chat */}
      {isChatOpen && (
        <div className="fixed inset-0 z-[60] flex items-end md:items-center justify-center md:p-4" onClick={() => setIsChatOpen(false)}>
          <div
            className={`relative w-full md:max-w-md h-[70vh] md:h-[520px] rounded-t-2xl md:rounded-2xl border shadow-2xl flex flex-col overflow-hidden ${isDarkTheme ? 'bg-slate-900 border-white/10' : 'bg-white border-[var(--line)]'}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`flex items-center justify-between p-4 border-b ${isDarkTheme ? 'border-white/10' : 'border-[var(--line)]'}`}>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[var(--accent)] text-white flex items-center justify-center">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div>
                  <p className={`font-semibold ${ink}`}>Samuel AI</p>
                  <p className={`text-xs ${soft}`}>{language === 'en' ? 'Ask about experience & skills' : 'Fragen zu Erfahrung & Skills'}</p>
                </div>
              </div>
              <button type="button" onClick={() => setIsChatOpen(false)} className={`p-2 ${soft}`} aria-label="Close">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {chatMessages.map((message, index) => (
                <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      message.role === 'user'
                        ? 'bg-[var(--accent)] text-white'
                        : isDarkTheme
                          ? 'bg-white/10 text-slate-200'
                          : 'bg-slate-100 text-[var(--ink)]'
                    }`}
                    dangerouslySetInnerHTML={{ __html: sanitizeHtml(formatChatMessage(message.content)) }}
                  />
                </div>
              ))}
              {chatLoading && <p className={`text-sm ${soft}`}>…</p>}
              {chatLastFailed && (
                <button type="button" onClick={() => handleChatSubmit(null, chatLastFailed)} className="text-sm text-[var(--accent)] font-medium">
                  {language === 'en' ? 'Retry' : 'Erneut'}
                </button>
              )}
              <div ref={chatEndRef} />
            </div>
            <form onSubmit={handleChatSubmit} className={`p-4 border-t flex gap-2 ${isDarkTheme ? 'border-white/10' : 'border-[var(--line)]'}`}>
              <input
                ref={chatInputRef}
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder={language === 'en' ? 'Ask a question…' : 'Frage stellen…'}
                className={`flex-1 px-4 py-3 rounded-xl border outline-none focus:border-[var(--accent)] ${isDarkTheme ? 'bg-slate-950 border-white/10 text-white' : 'bg-slate-50 border-slate-200'}`}
              />
              <button type="submit" disabled={chatLoading || !chatInput.trim()} className="px-4 py-3 rounded-xl bg-[var(--accent)] text-white disabled:opacity-40">
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Accessibility */}
      {isAccessibilityOpen && (
        <div className="fixed inset-0 z-[60] flex items-end md:items-center justify-center md:p-4" onClick={() => setIsAccessibilityOpen(false)}>
          <div
            className={`relative w-full md:max-w-md max-h-[80vh] overflow-y-auto rounded-t-2xl md:rounded-2xl border p-5 shadow-2xl ${isDarkTheme ? 'bg-slate-900 border-white/10' : 'bg-white border-[var(--line)]'}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className={`font-display text-xl ${ink}`}>{language === 'en' ? 'Accessibility' : 'Barrierefreiheit'}</h3>
              <button type="button" onClick={() => setIsAccessibilityOpen(false)} aria-label="Close"><X className="w-5 h-5" /></button>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {a11yButtons.map(({ key, label }) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => toggleAccessibility(key)}
                  className={`p-3 rounded-lg text-left text-sm border transition-colors ${
                    accessibility[key] > 0
                      ? 'bg-[var(--accent)] text-white border-[var(--accent)]'
                      : `${surface} ${soft}`
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            <button type="button" onClick={resetAccessibility} className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg border text-sm font-medium ${surface}`}>
              <RotateCcw className="w-4 h-4" />
              {language === 'en' ? 'Reset' : 'Zurücksetzen'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
