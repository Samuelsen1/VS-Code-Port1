'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Code, BookOpen, Briefcase, Mail, Linkedin, Github, ExternalLink, Zap, CheckCircle, Trending Up, FileText, Sun, Moon, Volume2, Eye, EyeOff, Lightbulb, Type, Square, RotateCcw, Type as TypeIcon, MessageCircle, Send, X, Search, Plus, Navigation, Copy, Check, Phone, Award } from 'lucide-react';
import sanitizeHtml from 'sanitize-html';

// Lightweight sanitizer: strip script/iframe/on* to prevent XSS (add DOMPurify for stricter allowlist if needed)
function sanitizeHtmlString(html) {
  if (typeof html !== 'string') return '';
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<iframe\b[^>]*>[\s\S]*?<\/iframe>/gi, '')
    .replace(/\s+on\w+\s*=\s*["'][^"']*["']/gi, '')
    .replace(/\s+on\w+\s*=\s*[^\s>]*/gi, '');
}

export default function PortfolioWebsite() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState('en');
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [featuresEnabled, setFeaturesEnabled] = useState(true);
  
  // Chatbot state
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const [chatLastFailed, setChatLastFailed] = useState(null);
  const chatEndRef = useRef(null);
  const chatInputRef = useRef(null);
  const chatModalRef = useRef(null);

  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const m = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(m?.matches ?? false);
    const f = () => setReducedMotion(m?.matches ?? false);
    m?.addEventListener?.('change', f);
    return () => m?.removeEventListener?.('change', f);
  }, []);
  
  // Animated counter states
  const [counts, setCounts] = useState({ improvement: 0, completion: 0, usage: 0 });
  const [hasAnimated, setHasAnimated] = useState(false);
  const metricsRefMobile = useRef(null);
  const metricsRefDesktop = useRef(null);
  
  // Accessibility states
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
      blueLightFilter: 0
    });
  };

  const binaryFeatures = ['mark', 'stopAnimations', 'hideImages'];
  
  const toggleAccessibility = useCallback((setting) => {
    setTimeout(() => {
      setAccessibility(prev => {
        if (binaryFeatures.includes(setting)) {
          return { ...prev, [setting]: prev[setting] === 0 ? 1 : 0 };
        }
        if (setting === 'blueLightFilter') {
          const current = prev[setting];
          return { ...prev, [setting]: current >= 5 ? 0 : current + 1 };
        }
        return { ...prev, [setting]: prev[setting] === 0 ? 1 : (prev[setting] === 1 ? 2 : 0) };
      });
    }, 0);
  }, []);

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
        if (parsed && typeof parsed === 'object') setAccessibility(prev => ({ ...prev, ...parsed }));
      }
    } catch (e) { /* ignore */ }
  }, []);

  useEffect(() => {
    if (!featuresEnabled) {
      setIsAccessibilityOpen(false);
      setIsChatOpen(false);
    }
  }, [featuresEnabled]);

  useEffect(() => {
    document.documentElement.lang = language === 'en' ? 'en' : 'de';
    document.documentElement.dir = 'ltr';
    if (typeof window !== 'undefined') localStorage.setItem('language', language);
  }, [language]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const html = document.documentElement;
      const body = document.body;
      if (isDarkTheme) {
        html.style.backgroundColor = '#0f172a';
        body.style.backgroundColor = '#0f172a';
      } else {
        html.style.backgroundColor = '#ffffff';
        body.style.backgroundColor = '#ffffff';
      }
    }
  }, [isDarkTheme]);

  const formatChatMessage = (text) => {
    if (!text) return '';
    let formatted = text
      .replace(/\*\*(.+?)\*\*/g, '<strong class="font-bold">$1</strong>')
      .replace(/\*(.+?)\*/g, '<em class="italic">$1</em>')
      .replace(/^([-•]) (.+)$/gm, '<li class="ml-4">$2</li>')
      .replace(/(<li.+?<\/li>)/gs, '<ul class="list-disc ml-4 my-2">$1</ul>');
    return formatted;
  };

  const sanitizeChatHtml = (html) => sanitizeHtml(html);
  
  const handleChatSubmit = async (e, retryMessage) => {
    e?.preventDefault?.();
    const toSend = (retryMessage != null && retryMessage !== '') ? retryMessage : chatInput.trim();
    if (!toSend) return;

    if (retryMessage) {
      setChatMessages(prev => { const n = [...prev]; if (n[n.length - 1]?.role === 'assistant') n.pop(); return n; });
    } else {
      setChatInput('');
      setChatMessages(prev => [...prev, { role: 'user', content: toSend }]);
    }
    setChatLastFailed(null);
    setChatLoading(true);

    const historyForApi = retryMessage ? chatMessages.slice(0, -1) : chatMessages;
    const errContent = language === 'en' ? 'Sorry, I encountered an error. Please try again or contact Samuel directly at gideonsammysen@gmail.com' : 'Entschuldigung, ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut oder kontaktieren Sie Samuel unter gideonsammysen@gmail.com';

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: toSend, language, history: historyForApi.slice(-10) }),
      });
      const data = await response.json();

      if (response.ok) {
        setChatMessages(prev => [...prev, { role: 'assistant', content: data.response, poweredBy: data.poweredBy || null }]);
      } else {
        setChatMessages(prev => [...prev, { role: 'assistant', content: errContent, isError: true }]);
        setChatLastFailed(toSend);
      }
    } catch (error) {
      console.error('Chat error:', error);
      setChatMessages(prev => [...prev, { role: 'assistant', content: errContent, isError: true }]);
      setChatLastFailed(toSend);
    } finally {
      setChatLoading(false);
    }
  };
  
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages]);

  useEffect(() => {
    if (isChatOpen && chatMessages.length === 0) {
      setChatMessages([
        {
          role: 'assistant',
          content:
            language === 'en'
              ? `Hi! I'm Samuel's AI assistant. I can answer questions about his work, experience, skills, availability, or anything else work-related. Feel free to ask! 😊`
              : `Hallo! Ich bin Samuels KI-Assistent. Ich kann Fragen über seine Arbeit, Erfahrung, Fähigkeiten, Verfügbarkeit oder andere berufliche Themen beantworten. Fragen Sie einfach! 😊`,
        },
      ]);
    }
  }, [isChatOpen, language, chatMessages.length]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleEscape = (e) => { if (e.key === 'Escape') setIsChatOpen(false); };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  useEffect(() => {
    if (isChatOpen && typeof window !== 'undefined') {
      setTimeout(() => { if (window.innerWidth <= 768) chatInputRef.current?.click(); }, 100);
    }
  }, [isChatOpen]);

  useEffect(() => {
    const root = document.documentElement;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion && accessibility.stopAnimations === 0) {
      const style = document.getElementById('a11y-reduced-motion') || document.createElement('style');
      style.id = 'a11y-reduced-motion';
      style.textContent = '* { animation: none !important; transition: none !important; }';
      if (!document.getElementById('a11y-reduced-motion')) document.head.appendChild(style);
    } else if (!prefersReducedMotion) {
      const style = document.getElementById('a11y-reduced-motion');
      if (style) style.remove();
    }

    if (accessibility.contrast === 0) {
      root.style.filter = '';
    } else if (accessibility.contrast === 1) {
      root.style.filter = 'contrast(1.5)';
    } else {
      root.style.filter = 'contrast(2)';
    }

    if (accessibility.mark === 1) {
      const style = document.getElementById('a11y-mark') || document.createElement('style');
      style.id = 'a11y-mark';
      style.textContent = 'body { background: linear-gradient(90deg, rgba(255, 0, 0, 0.1) 0%, transparent 100%); }';
      if (!document.getElementById('a11y-mark')) document.head.appendChild(style);
    } else {
      const style = document.getElementById('a11y-mark');
      if (style) style.remove();
    }

    if (accessibility.largeText > 0) {
      const scale = 1 + accessibility.largeText * 0.2;
      root.style.fontSize = `${scale * 100}%`;
    } else {
      root.style.fontSize = '100%';
    }

    if (accessibility.textSpacing > 0) {
      const spacing = 1 + accessibility.textSpacing * 0.5;
      root.style.letterSpacing = `${spacing}px`;
      root.style.lineHeight = `${spacing + 1.2}`;
      root.style.wordSpacing = `${spacing}px`;
    } else {
      root.style.letterSpacing = '0';
      root.style.lineHeight = '1.5';
      root.style.wordSpacing = '0';
    }

    if (accessibility.hideImages === 1) {
      const style = document.getElementById('a11y-hide-images') || document.createElement('style');
      style.id = 'a11y-hide-images';
      style.textContent = 'img { display: none !important; }';
      if (!document.getElementById('a11y-hide-images')) document.head.appendChild(style);
    } else {
      const style = document.getElementById('a11y-hide-images');
      if (style) style.remove();
    }

    if (accessibility.dyslexia > 0) {
      root.style.fontFamily = 'Courier New, monospace';
    } else {
      root.style.fontFamily = 'system-ui, -apple-system, sans-serif';
    }

    if (accessibility.rowHeight > 0) {
      root.style.lineHeight = `${2 + accessibility.rowHeight * 0.5}`;
    }

    if (accessibility.focusIndicator > 0) {
      const style = document.getElementById('a11y-focus') || document.createElement('style');
      style.id = 'a11y-focus';
      const size = 3 + accessibility.focusIndicator;
      style.textContent = `*:focus { outline: ${size}px solid #ff00ff !important; outline-offset: 2px; }`;
      if (!document.getElementById('a11y-focus')) document.head.appendChild(style);
    } else {
      const style = document.getElementById('a11y-focus');
      if (style) style.remove();
    }

    if (accessibility.blueLightFilter > 0) {
      const levels = [0, 'rgba(255, 200, 87, 0.1)', 'rgba(255, 152, 0, 0.15)', 'rgba(255, 87, 34, 0.2)', 'rgba(244, 67, 54, 0.25)', 'rgba(233, 30, 99, 0.3)'];
      root.style.backgroundColor = levels[accessibility.blueLightFilter] || 'transparent';
    } else {
      root.style.backgroundColor = '';
    }
  }, [accessibility]);

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

  // Content translations and data
  const t = {
    en: {
      hero: {
        title: 'Samuel Afriyie Opoku',
        subtitle: 'Instructional Designer | Digital Learning Professional',
        desc: 'Crafting accessible, learner-centered e-learning experiences that drive impact in education and professional development.',
        cta1: 'Get In Touch',
        cta2: 'Ask AI',
        cta3: 'Download CV'
      },
      about: {
        title: 'About Me',
        desc: 'I'm an instructional designer and digital learning professional with a passion for creating accessible, engaging learning experiences. My background combines pedagogical theory with practical expertise in e-learning development, multimedia production, and technical communication.'
      },
      skills: {
        title: 'Skills & Competencies',
        desc: 'A comprehensive toolkit for designing and delivering impactful learning solutions',
        skillsCategories: [
          { title: 'Instructional Design', items: ['ADDIE', 'Bloom\'s Taxonomy', 'Adult Learning Theory', 'Storyboarding', 'LXD', 'Curriculum Development'] },
          { title: 'E-Learning Development', items: ['Articulate 360', 'SCORM', 'LMS Administration', 'Learning Analytics', 'Moodle'] },
          { title: 'Multimedia Production', items: ['Photo Editing', 'Infographics', 'Video Creation & Editing', 'Adobe Creative Suite'] },
          { title: 'Technical Communication', items: ['User Guides', 'Documentation', 'Content Localization', 'Cross-Cultural Adaptation'] }
        ]
      },
      experience: {
        title: 'Professional Experience',
        items: [
          {
            title: 'Instructional Designer (Freelance)',
            company: 'Node Center for Curatorial Studies, Berlin',
            date: 'Aug 2026 – Present',
            description: 'Translate subject-matter input into structured, learner-friendly content. Design and develop e-learning modules in Articulate Rise. Incorporate stakeholder feedback through iterative refinement.'
          },
          {
            title: 'E-Learning Developer',
            company: 'Dräger, Lübeck',
            date: 'Feb 2026 – July 2026',
            description: 'Produce instructional videos with Adobe Premiere Pro. Build and transfer content into Articulate Rise. Create multilingual versions using AI-powered tools.'
          },
          {
            title: 'Digital Learning Designer',
            company: 'Tanz der Kulturen e.V., Hamburg',
            date: 'June 2025 – Nov 2025',
            description: 'Design 25+ accessible multimedia assets in Figma. Curate and structure 50+ educational resources. Localize 300+ pages of instructional content.'
          }
        ]
      },
      certifications: {
        title: 'Certifications & Training',
        items: [
          'Instructional Design Foundations & Applications — University of Illinois',
          'EF SET English Certificate — C1 Advanced (67/100)',
          'Technical Writing Course — Board Infinity'
        ]
      },
      contact: {
        title: 'Get In Touch',
        subtitle: 'I\'d love to hear about your project or learning challenge.',
        phone: '01715811680',
        email: 'gideonsammysen@gmail.com'
      },
      footer: {
        credit: '© 2026 Samuel Afriyie Opoku. All rights reserved.'
      }
    },
    de: {
      hero: {
        title: 'Samuel Afriyie Opoku',
        subtitle: 'Instructional Designer | Digital Learning Professional',
        desc: 'Ich entwickle barrierefreie, lernerzentrierte E-Learning-Lösungen, die in Bildung und beruflicher Entwicklung wirken.',
        cta1: 'Kontakt',
        cta2: 'KI-Assistent',
        cta3: 'Lebenslauf'
      },
      about: {
        title: 'Über mich',
        desc: 'Ich bin ein Instructional Designer und Digital Learning Professional mit Leidenschaft für barrierefreie und ansprechende Lernerfahrungen. Mein Hintergrund verbindet pädagogische Theorie mit praktischer Expertise in E-Learning-Entwicklung, Multimedia-Produktion und technischer Kommunikation.'
      },
      skills: {
        title: 'Fähigkeiten & Kompetenzen',
        desc: 'Ein umfassendes Toolkit zur Gestaltung und Bereitstellung wirkungsvoller Lernlösungen',
        skillsCategories: [
          { title: 'Instructional Design', items: ['ADDIE', 'Bloom\'s Taxonomie', 'Erwachsenenpädagogik', 'Storyboarding', 'LXD', 'Curriculumentwicklung'] },
          { title: 'E-Learning-Entwicklung', items: ['Articulate 360', 'SCORM', 'LMS-Verwaltung', 'Learning Analytics', 'Moodle'] },
          { title: 'Multimedia-Produktion', items: ['Fotobearbeitung', 'Infografiken', 'Videoproduktion', 'Adobe Creative Suite'] },
          { title: 'Technische Kommunikation', items: ['Benutzerhandbücher', 'Dokumentation', 'Inhaltslocalisierung', 'Transkulturelle Anpassung'] }
        ]
      },
      experience: {
        title: 'Berufserfahrung',
        items: [
          {
            title: 'Instructional Designer (Freiberuflich)',
            company: 'Node Center for Curatorial Studies, Berlin',
            date: 'Aug 2026 – Gegenwart',
            description: 'Übersetze Fachvorgaben in strukturierte, lernerorientierte Inhalte. Entwickle E-Learning-Module in Articulate Rise. Integriere Stakeholder-Feedback durch iterative Verfeinerung.'
          },
          {
            title: 'E-Learning-Entwickler',
            company: 'Dräger, Lübeck',
            date: 'Feb 2026 – Juli 2026',
            description: 'Erstelle Schulungsvideos mit Adobe Premiere Pro. Entwickle und transferiere Inhalte in Articulate Rise. Erstelle mehrsprachige Versionen mit KI-Tools.'
          },
          {
            title: 'Digital Learning Designer',
            company: 'Tanz der Kulturen e.V., Hamburg',
            date: 'Juni 2025 – Nov 2025',
            description: 'Entwerfe 25+ barrierefreie Multimedia-Assets in Figma. Kuratiere und strukturiere 50+ Lernressourcen. Lokalisiere 300+ Seiten Schulungsinhalte.'
          }
        ]
      },
      certifications: {
        title: 'Zertifizierungen & Schulungen',
        items: [
          'Instructional Design Foundations & Applications — Universität Illinois',
          'EF SET English Certificate — C1 Advanced (67/100)',
          'Technical Writing Course — Board Infinity'
        ]
      },
      contact: {
        title: 'Kontakt',
        subtitle: 'Ich freue mich auf Ihre Nachricht zu Ihrem Projekt oder einer Lernherausforderung.',
        phone: '01715811680',
        email: 'gideonsammysen@gmail.com'
      },
      footer: {
        credit: '© 2026 Samuel Afriyie Opoku. Alle Rechte vorbehalten.'
      }
    }
  };

  const lang = t[language] || t.en;

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkTheme ? 'bg-slate-950 text-white' : 'bg-white text-gray-900'}`}>
      {/* Navigation */}
      <nav className={`sticky top-0 z-40 backdrop-blur-md transition-colors ${isDarkTheme ? 'bg-slate-900/80 border-slate-800' : 'bg-white/80 border-gray-200'} border-b`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">SAO</div>
            
            <div className="hidden md:flex gap-8">
              {['About', 'Skills', 'Experience', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className={`transition-colors ${isDarkTheme ? 'hover:text-indigo-400' : 'hover:text-indigo-600'}`}
                >
                  {item}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setLanguage(language === 'en' ? 'de' : 'en')}
                className={`px-3 py-2 rounded transition-colors ${isDarkTheme ? 'bg-slate-800 hover:bg-slate-700' : 'bg-gray-100 hover:bg-gray-200'}`}
              >
                {language === 'en' ? 'DE' : 'EN'}
              </button>
              
              <button
                onClick={() => setIsDarkTheme(!isDarkTheme)}
                className={`p-2 rounded transition-colors ${isDarkTheme ? 'bg-slate-800 hover:bg-slate-700' : 'bg-gray-100 hover:bg-gray-200'}`}
              >
                {isDarkTheme ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              {featuresEnabled && (
                <button
                  onClick={() => setIsAccessibilityOpen(!isAccessibilityOpen)}
                  className={`p-2 rounded transition-colors ${isDarkTheme ? 'bg-slate-800 hover:bg-slate-700' : 'bg-gray-100 hover:bg-gray-200'}`}
                  aria-label={language === 'en' ? 'Accessibility' : 'Barrierefreiheit'}
                >
                  <Lightbulb className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className={`relative min-h-screen flex items-center justify-center overflow-hidden ${isDarkTheme ? 'bg-gradient-to-br from-slate-900 via-slate-950 to-black' : 'bg-gradient-to-br from-white via-indigo-50 to-purple-50'}`}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className={`absolute top-20 right-20 w-96 h-96 rounded-full blur-3xl ${isDarkTheme ? 'bg-indigo-600/8' : 'bg-indigo-300/20'}`}></div>
          <div className={`absolute -bottom-20 -left-20 w-96 h-96 rounded-full blur-3xl ${isDarkTheme ? 'bg-purple-600/8' : 'bg-purple-300/20'}`}></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 py-20">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            {lang.hero.title}
          </h1>
          <p className="text-2xl md:text-3xl font-semibold mb-4 text-indigo-600">
            {lang.hero.subtitle}
          </p>
          <p className={`text-lg mb-12 max-w-2xl mx-auto ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>
            {lang.hero.desc}
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center mb-12">
            <a
              href={`mailto:${lang.contact.email}`}
              className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
            >
              {lang.hero.cta1}
            </a>
            <button
              onClick={() => setIsChatOpen(true)}
              className="px-8 py-3 border-2 border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-600 hover:text-white transition-colors font-semibold"
            >
              {lang.hero.cta2}
            </button>
            <a
              href="/cv"
              className="px-8 py-3 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
            >
              {lang.hero.cta3}
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={`py-20 px-4 ${isDarkTheme ? 'bg-slate-900' : 'bg-white'}`}>
        <div className="max-w-6xl mx-auto">
          <h2 className={`text-4xl font-bold mb-12 text-center ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>
            {lang.about.title}
          </h2>
          <p className={`text-lg max-w-3xl mx-auto ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
            {lang.about.desc}
          </p>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className={`py-20 px-4 ${isDarkTheme ? 'bg-slate-950' : 'bg-gray-50'}`}>
        <div className="max-w-6xl mx-auto">
          <h2 className={`text-4xl font-bold mb-12 text-center ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>
            {lang.skills.title}
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {lang.skills.skillsCategories.map((cat, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-lg ${isDarkTheme ? 'bg-slate-800' : 'bg-white'} shadow-md hover:shadow-lg transition-shadow`}
              >
                <h3 className="text-xl font-bold mb-4 text-indigo-600">{cat.title}</h3>
                <ul className="space-y-2">
                  {cat.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                      <span className={isDarkTheme ? 'text-gray-300' : 'text-gray-700'}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className={`py-20 px-4 ${isDarkTheme ? 'bg-slate-900' : 'bg-white'}`}>
        <div className="max-w-6xl mx-auto">
          <h2 className={`text-4xl font-bold mb-12 text-center ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>
            {lang.experience.title}
          </h2>
          <div className="space-y-8">
            {lang.experience.items.map((exp, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-lg ${isDarkTheme ? 'bg-slate-800' : 'bg-gray-50'} border-l-4 border-indigo-600`}
              >
                <h3 className="text-xl font-bold text-indigo-600">{exp.title}</h3>
                <p className={`text-sm mb-2 ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>
                  {exp.company} • {exp.date}
                </p>
                <p className={isDarkTheme ? 'text-gray-300' : 'text-gray-700'}>{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className={`py-20 px-4 ${isDarkTheme ? 'bg-slate-950' : 'bg-gray-50'}`}>
        <div className="max-w-6xl mx-auto">
          <h2 className={`text-4xl font-bold mb-12 text-center ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>
            {lang.certifications.title}
          </h2>
          <ul className="space-y-4 max-w-3xl mx-auto">
            {lang.certifications.items.map((cert, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <Award className="w-6 h-6 text-indigo-600 mt-1 flex-shrink-0" />
                <span className={isDarkTheme ? 'text-gray-300' : 'text-gray-700'}>{cert}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={`py-20 px-4 ${isDarkTheme ? 'bg-slate-900' : 'bg-white'}`}>
        <div className="max-w-6xl mx-auto text-center">
          <h2 className={`text-4xl font-bold mb-6 ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>
            {lang.contact.title}
          </h2>
          <p className={`text-lg mb-8 ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
            {lang.contact.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href={`mailto:${lang.contact.email}`}
              className="flex items-center gap-3 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Mail className="w-5 h-5" />
              {lang.contact.email}
            </a>
            <a
              href={`tel:${lang.contact.phone}`}
              className="flex items-center gap-3 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Phone className="w-5 h-5" />
              {lang.contact.phone}
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-6 text-center ${isDarkTheme ? 'bg-slate-950 border-slate-800' : 'bg-gray-50 border-gray-200'} border-t`}>
        <p className={isDarkTheme ? 'text-gray-400' : 'text-gray-600'}>{lang.footer.credit}</p>
      </footer>

      {/* AI Chat Button */}
      {featuresEnabled && (
        <button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform z-40"
          style={{
            background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
            boxShadow: '0 4px 15px rgba(99, 102, 241, 0.4)'
          }}
          aria-label={language === 'en' ? 'AI Assistant' : 'KI-Assistent'}
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Chat Modal */}
      {isChatOpen && (
        <div className="fixed inset-0 z-[60] flex items-end md:items-center justify-center md:p-4" onClick={() => setIsChatOpen(false)}>
          <div
            className={`relative w-full md:max-w-md max-h-[75vh] h-[65vh] md:h-[500px] rounded-t-3xl md:rounded-3xl shadow-2xl flex flex-col overflow-hidden ${isDarkTheme ? 'bg-gray-900' : 'bg-white'}`}
            style={{ border: '3px solid #6366f1' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`flex items-center justify-between p-4 border-b flex-shrink-0 ${isDarkTheme ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gradient-to-r from-indigo-50 to-purple-50'}`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className={`font-bold ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>
                    {language === 'en' ? 'Ask about Samuel' : 'Fragen Sie über Samuel'}
                  </h3>
                  <p className={`text-xs ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>
                    {language === 'en' ? 'AI Assistant' : 'KI-Assistent'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsChatOpen(false)}
                className={`p-2 rounded-lg transition-colors ${isDarkTheme ? 'hover:bg-gray-700 text-gray-400 hover:text-white' : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'}`}
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className={`flex-1 overflow-y-auto p-4 space-y-4 ${isDarkTheme ? 'bg-gray-900' : 'bg-gray-50'}`}>
              {chatMessages.map((message, index) => (
                <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${message.role === 'user' ? 'bg-indigo-600 text-white' : isDarkTheme ? 'bg-gray-800 text-gray-200 border border-gray-700' : 'bg-white text-gray-900 border border-gray-200 shadow-sm'}`}>
                    <div className="text-sm leading-relaxed prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: sanitizeChatHtml(formatChatMessage(message.content)) }} />
                  </div>
                </div>
              ))}
              {chatLoading && (
                <div className="flex justify-start">
                  <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${isDarkTheme ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200 shadow-sm'}`}>
                    <span className="text-sm text-gray-500">{language === 'en' ? 'Thinking…' : 'Denke…'}</span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            <form onSubmit={handleChatSubmit} className={`p-4 border-t flex-shrink-0 ${isDarkTheme ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
              <div className="flex gap-2">
                <input
                  ref={chatInputRef}
                  type="text"
                  inputMode="text"
                  autoComplete="off"
                  autoCapitalize="sentences"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder={language === 'en' ? 'Ask anything...' : 'Fragen Sie alles...'}
                  className={`flex-1 px-4 py-3 rounded-xl border transition-colors ${isDarkTheme ? 'bg-gray-900 border-gray-700 text-white placeholder-gray-500 focus:border-indigo-500' : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400 focus:border-indigo-500'} focus:outline-none focus:ring-2 focus:ring-indigo-500/20`}
                  style={{ fontSize: '16px' }}
                />
                <button
                  type="submit"
                  disabled={chatLoading || !chatInput.trim()}
                  className="px-5 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Accessibility Panel */}
      {isAccessibilityOpen && (
        <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${isDarkTheme ? 'bg-black/50' : 'bg-white/50'}`} onClick={() => setIsAccessibilityOpen(false)}>
          <div
            className={`${isDarkTheme ? 'bg-slate-800' : 'bg-white'} rounded-lg p-6 max-w-md w-full shadow-2xl max-h-[80vh] overflow-y-auto`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">{language === 'en' ? 'Accessibility' : 'Barrierefreiheit'}</h2>
              <button onClick={() => setIsAccessibilityOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              {[
                { key: 'contrast', label: language === 'en' ? 'Contrast' : 'Kontrast' },
                { key: 'mark', label: language === 'en' ? 'Mark Content' : 'Inhalte markieren', binary: true },
                { key: 'largeText', label: language === 'en' ? 'Large Text' : 'Großer Text' },
                { key: 'textSpacing', label: language === 'en' ? 'Text Spacing' : 'Textabstand' },
                { key: 'stopAnimations', label: language === 'en' ? 'Stop Animations' : 'Animationen stoppen', binary: true },
                { key: 'hideImages', label: language === 'en' ? 'Hide Images' : 'Bilder ausblenden', binary: true },
                { key: 'dyslexia', label: language === 'en' ? 'Dyslexia Font' : 'Dyslexie-Schrift' },
                { key: 'rowHeight', label: language === 'en' ? 'Row Height' : 'Zeilenhöhe' },
                { key: 'focusIndicator', label: language === 'en' ? 'Focus Indicator' : 'Fokus-Indikator' },
                { key: 'blueLightFilter', label: language === 'en' ? 'Blue Light Filter' : 'Blaulichtfilter' }
              ].map(({ key, label, binary }) => (
                <button
                  key={key}
                  onClick={() => toggleAccessibility(key)}
                  className={`w-full p-3 rounded text-left transition-colors ${accessibility[key] === 0 ? (isDarkTheme ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200') : (isDarkTheme ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-indigo-200 hover:bg-indigo-300')}`}
                >
                  {label} {binary ? (accessibility[key] === 1 ? '✓' : '') : `(${accessibility[key]})`}
                </button>
              ))}
              
              <button
                onClick={resetAccessibility}
                className="w-full mt-4 p-3 rounded bg-red-600 hover:bg-red-700 text-white transition-colors"
              >
                {language === 'en' ? 'Reset All' : 'Alle zurücksetzen'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
