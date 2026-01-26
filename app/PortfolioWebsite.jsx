import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Code, BookOpen, Briefcase, Mail, Linkedin, Github, ExternalLink, Zap, CheckCircle, TrendingUp, FileText, Sun, Moon, Target, Users, Sparkles, X, Eye, EyeOff, Lightbulb, Type, Square, Volume2, Image, AlignCenter, RotateCcw, Heart, MessageCircle, Send, Award, Bot, Search, Navigation, Copy, Plus } from 'lucide-react';

// Lightweight sanitizer: strip script/iframe/on* to prevent XSS (add DOMPurify for stricter allowlist if needed)
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
  const [isDarkTheme, setIsDarkTheme] = useState(false); // Light theme by default, toggle for dark/night mode
  const [featuresEnabled, setFeaturesEnabled] = useState(true); // Controls accessibility panel and AI assistants
  
  // Chatbot state
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const [chatLastFailed, setChatLastFailed] = useState(null); // for Retry
  const chatEndRef = useRef(null);
  const chatInputRef = useRef(null);
  const chatModalRef = useRef(null);

  // Navitoir (Navigation AI) state
  const [isNavitoirOpen, setIsNavitoirOpen] = useState(false);
  const [navitoirInput, setNavitoirInput] = useState('');
  const [navitoirMessages, setNavitoirMessages] = useState([]);
  const [navitoirLoading, setNavitoirLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [fabExpanded, setFabExpanded] = useState(false);
  const navitoirEndRef = useRef(null);
  const navitoirInputRef = useRef(null);

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
    blueLightFilter: 0
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
      blueLightFilter: 0
    });
  };

  // Binary features only toggle between 0 and 1
  const binaryFeatures = ['mark', 'stopAnimations', 'hideImages'];
  
  const toggleAccessibility = useCallback((setting) => {
    // Use setTimeout to defer state update and prevent blocking
    setTimeout(() => {
      setAccessibility(prev => {
        if (binaryFeatures.includes(setting)) {
          // Binary toggle: 0 -> 1 -> 0
          return { ...prev, [setting]: prev[setting] === 0 ? 1 : 0 };
        }
        if (setting === 'blueLightFilter') {
          // Blue light filter: 0 -> 1 -> 2 -> 3 -> 4 -> 5 -> 0 (5 levels)
          const current = prev[setting];
          return { ...prev, [setting]: current >= 5 ? 0 : current + 1 };
        }
        // Gradual toggle: 0 -> 1 -> 2 -> 0
        return { ...prev, [setting]: prev[setting] === 0 ? 1 : (prev[setting] === 1 ? 2 : 0) };
      });
    }, 0);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language === 'en' ? 'en' : 'de';
    document.documentElement.dir = 'ltr';
    
    // Store language preference in localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', language);
    }
  }, [language]);

  // Hydrate featuresEnabled, isDarkTheme, accessibility from localStorage on mount
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

  // Persist featuresEnabled, isDarkTheme, accessibility to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') localStorage.setItem('featuresEnabled', String(featuresEnabled));
  }, [featuresEnabled]);
  useEffect(() => {
    if (typeof window !== 'undefined') localStorage.setItem('isDarkTheme', String(isDarkTheme));
  }, [isDarkTheme]);
  useEffect(() => {
    if (typeof window !== 'undefined') localStorage.setItem('accessibility', JSON.stringify(accessibility));
  }, [accessibility]);

  // Close all feature modals when features are disabled
  useEffect(() => {
    if (!featuresEnabled) {
      setIsAccessibilityOpen(false);
      setIsNavitoirOpen(false);
      setIsChatOpen(false);
    }
  }, [featuresEnabled]);

  // Apply dark theme background to html and body to prevent white background on horizontal scroll
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const html = document.documentElement;
      const body = document.body;
      
      if (isDarkTheme) {
        html.style.backgroundColor = '#0f172a'; // slate-950
        body.style.backgroundColor = '#0f172a'; // slate-950
      } else {
        html.style.backgroundColor = '#ffffff';
        body.style.backgroundColor = '#ffffff';
      }
    }
  }, [isDarkTheme]);

  // Format chat messages with proper HTML formatting
  const formatChatMessage = (text) => {
    if (!text) return '';
    
    let formatted = text
      // Convert **bold** to <strong>
      .replace(/\*\*(.+?)\*\*/g, '<strong class="font-bold">$1</strong>')
      // Convert *italic* to <em>
      .replace(/\*(.+?)\*/g, '<em class="italic">$1</em>')
      // Convert bullet points with emojis
      .replace(/^([✅❌📧📱📍💼🗣️📄🎓📚🌐🛠️📅🎨👤📏♿📊])\s(.+)$/gm, '<div class="flex gap-2 my-1"><span>$1</span><span>$2</span></div>')
      // Convert regular bullet points
      .replace(/^- (.+)$/gm, '<li class="ml-4">$1</li>')
      // Convert section headers (lines ending with colon)
      .replace(/^(.+:)$/gm, '<div class="font-semibold mt-3 mb-1">$1</div>')
      // Convert line breaks
      .replace(/\n\n/g, '<br/><br/>')
      .replace(/\n/g, '<br/>');
    
    // Wrap list items in ul
    if (formatted.includes('<li')) {
      formatted = formatted.replace(/(<li.+?<\/li>)/gs, '<ul class="list-disc ml-4 my-2">$1</ul>');
    }
    
    return formatted;
  };

  const sanitizeChatHtml = (html) => sanitizeHtml(html);
  
  // Handle chatbot
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
    const errContent = language === 'en' ? 'Sorry, I encountered an error. Please try again or contact Samuel directly at gideonsammysen@gmail.com' : 'Entschuldigung, ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut oder kontaktieren Sie Samuel direkt unter gideonsammysen@gmail.com';

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
  
  // Scroll to bottom of chat
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages]);

  // Initial greeting message when chat opens
  useEffect(() => {
    if (isChatOpen && chatMessages.length === 0) {
      const navitoirIcon = '<img src="data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'16\' height=\'16\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%236366f1\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\' style=\'display: inline-block; vertical-align: middle; margin-right: 6px; margin-left: 0;\'%3E%3Cpolygon points=\'3 11 22 2 13 21 11 13 3 11\'/%3E%3C/svg%3E" alt="Navitoir" style="width: 16px; height: 16px; display: inline-block; vertical-align: middle; margin-right: 6px;" />';
      setChatMessages([
        {
          role: 'assistant',
          content:
            language === 'en'
              ? `Hi, I'm Samuel's AI assistant. If you want to know about him, his experience, skills, education, availability, personality or anything else, I'm here to assist you 😊.\n\nIf you're searching for something or need navigation aid, use ${navitoirIcon}<strong>Navitoir</strong>, my assistant for prompt navigation.`
              : `Hallo, ich bin Samuels KI-Assistent. Wenn Sie mehr über ihn, seine Erfahrung, Fähigkeiten, Ausbildung, Verfügbarkeit, Persönlichkeit oder sonst etwas wissen möchten, helfe ich Ihnen gerne weiter 😊.\n\nWenn Sie nach etwas suchen oder Navigationshilfe benötigen, verwenden Sie ${navitoirIcon}<strong>Navitoir</strong>, meinen Assistenten für schnelle Navigation.`,
        },
      ]);
    }
  }, [isChatOpen, language, chatMessages.length]);

  // Initial greeting message when Navitoir opens
  useEffect(() => {
    if (isNavitoirOpen && navitoirMessages.length === 0) {
      setNavitoirMessages([
        {
          role: 'assistant',
          content:
            language === 'en'
              ? "👋 Hi! I'm <strong>Navitoir</strong>, your navigation AI assistant. I can help you find, navigate, and even control any section of this website!\n\nSay \"go to\" or \"show me\" to navigate.\nSay \"open\" to navigate and open a link.\n\nTry:\n\"Take me to projects\"\n\"Open CV\"\n(Accessibility): \"Say 'increase blue light filter to level 3' or 'increase dyslexia font to level 2'\""
              : "👋 Hallo! Ich bin <strong>Navitoir</strong>, Ihr Navigations-KI-Assistent. Ich kann Ihnen helfen, jeden Bereich dieser Website zu finden, zu navigieren und sogar zu steuern!\n\nSagen Sie \"gehe zu\" oder \"zeige mir\" zum Navigieren.\nSagen Sie \"öffne\" zum Navigieren und Link öffnen.\n\nVersuchen Sie:\n\"Zeige Projekte\"\n\"Öffne Lebenslauf\"\n(Barrierefreiheit): \"Sagen Sie 'Blaulichtfilter auf Stufe 3 erhöhen' oder 'Dyslexie-Schrift auf Stufe 2 erhöhen'\"",
        },
      ]);
    }
  }, [isNavitoirOpen, language, navitoirMessages.length]);

  // Handle Navitoir navigation; chipValue: when provided (e.g. from quick-reply chip), use it instead of input
  const handleNavitoirSubmit = async (e, chipValue) => {
    e?.preventDefault?.();
    const raw = (chipValue != null && String(chipValue).trim() !== '') ? String(chipValue).trim() : navitoirInput.trim();
    if (!raw) return;

    const userQuery = raw.toLowerCase();
    if (!chipValue) setNavitoirInput('');
    setNavitoirMessages(prev => [...prev, { role: 'user', content: userQuery }]);
    setNavitoirLoading(true);

    // Helper: true if query contains any of the terms (enables synonym/typo tolerance)
    const matchesAny = (terms) => terms.some(t => t && userQuery.includes(t));

    // Handoff: content question (not navigation) -> suggest main AI and open it
    const contentQ = matchesAny(['tell me about', 'what is his', 'describe his', 'explain his', 'erzähl mir über', 'was ist seine', 'beschreib seine', 'tell me more about', 'erzähl mehr über', 'who is he', 'wer ist er']);
    const navCmd = matchesAny(['go to', 'show me', 'open', 'zeige', 'öffne', 'gehe zu', 'take me to', 'navigate', 'navigate to']);
    if (contentQ && !navCmd) {
      setNavitoirMessages(prev => [...prev, {
        role: 'assistant',
        content: language === 'en'
          ? 'For questions about Samuel, use the green <strong>AI Assistant</strong> — I\'ll open it for you.'
          : 'Für Fragen über Samuel nutzen Sie den grünen <strong>KI-Assistenten</strong> — ich öffne ihn für Sie.'
      }]);
      setNavitoirLoading(false);
      setIsChatOpen(true);
      return;
    }

    // Check if user wants to "open" something (navigate + open link)
    const wantsToOpen = matchesAny([
      'open', 'öffne', 'öffnen', 'show', 'zeige', 'display', 'view', 'load', 'launch', 'get', 'fetch', 'give me', 'gib mir',
      'anzeigen', 'ansehen', 'aufrufen', 'laden', 'öffne mir', 'zeig mir', 'show me', 'display me', 'view the', 'open the',
      'open up', 'bring up', 'pull up', 'öffnen Sie', 'zeigen Sie', 'ansehen', 'aufmachen', 'hochladen'
    ]);

    // Accessibility feature mapping: many synonyms per feature; we iterate by key length (longer first)
    const accessibilityMap = {
      'accessibility': { key: null, name: language === 'en' ? 'Accessibility Panel' : 'Barrierefreiheitspanel' },
      'barrierefreiheit': { key: null, name: language === 'en' ? 'Accessibility Panel' : 'Barrierefreiheitspanel' },
      'a11y': { key: null, name: language === 'en' ? 'Accessibility Panel' : 'Barrierefreiheitspanel' },
      'dyslexia font': { key: 'dyslexia', name: language === 'en' ? 'Dyslexia Font' : 'Dyslexie-Schrift' },
      'dyslexia': { key: 'dyslexia', name: language === 'en' ? 'Dyslexia Font' : 'Dyslexie-Schrift' },
      'dyslexie': { key: 'dyslexia', name: language === 'en' ? 'Dyslexia Font' : 'Dyslexie-Schrift' },
      'dyslexicschrift': { key: 'dyslexia', name: language === 'en' ? 'Dyslexia Font' : 'Dyslexie-Schrift' },
      'readable font': { key: 'dyslexia', name: language === 'en' ? 'Dyslexia Font' : 'Dyslexie-Schrift' },
      'blue light filter': { key: 'blueLightFilter', name: language === 'en' ? 'Blue Light Filter' : 'Blaulichtfilter' },
      'blue light': { key: 'blueLightFilter', name: language === 'en' ? 'Blue Light Filter' : 'Blaulichtfilter' },
      'bluelight': { key: 'blueLightFilter', name: language === 'en' ? 'Blue Light Filter' : 'Blaulichtfilter' },
      'blaulicht': { key: 'blueLightFilter', name: language === 'en' ? 'Blue Light Filter' : 'Blaulichtfilter' },
      'blaulichtfilter': { key: 'blueLightFilter', name: language === 'en' ? 'Blue Light Filter' : 'Blaulichtfilter' },
      'hide images': { key: 'hideImages', name: language === 'en' ? 'Hide Images' : 'Bilder verbergen' },
      'images': { key: 'hideImages', name: language === 'en' ? 'Hide Images' : 'Bilder verbergen' },
      'image': { key: 'hideImages', name: language === 'en' ? 'Hide Images' : 'Bilder verbergen' },
      'bilder': { key: 'hideImages', name: language === 'en' ? 'Hide Images' : 'Bilder verbergen' },
      'bilder verbergen': { key: 'hideImages', name: language === 'en' ? 'Hide Images' : 'Bilder verbergen' },
      'pictures': { key: 'hideImages', name: language === 'en' ? 'Hide Images' : 'Bilder verbergen' },
      'photos': { key: 'hideImages', name: language === 'en' ? 'Hide Images' : 'Bilder verbergen' },
      'contrast': { key: 'contrast', name: language === 'en' ? 'Contrast' : 'Kontrast' },
      'kontrast': { key: 'contrast', name: language === 'en' ? 'Contrast' : 'Kontrast' },
      'text size': { key: 'largeText', name: language === 'en' ? 'Larger Text' : 'Größere Schrift' },
      'large text': { key: 'largeText', name: language === 'en' ? 'Larger Text' : 'Größere Schrift' },
      'font size': { key: 'largeText', name: language === 'en' ? 'Larger Text' : 'Größere Schrift' },
      'larger text': { key: 'largeText', name: language === 'en' ? 'Larger Text' : 'Größere Schrift' },
      'bigger text': { key: 'largeText', name: language === 'en' ? 'Larger Text' : 'Größere Schrift' },
      'bigger font': { key: 'largeText', name: language === 'en' ? 'Larger Text' : 'Größere Schrift' },
      'größere schrift': { key: 'largeText', name: language === 'en' ? 'Larger Text' : 'Größere Schrift' },
      'text spacing': { key: 'textSpacing', name: language === 'en' ? 'Text Spacing' : 'Textabstand' },
      'spacing': { key: 'textSpacing', name: language === 'en' ? 'Text Spacing' : 'Textabstand' },
      'textabstand': { key: 'textSpacing', name: language === 'en' ? 'Text Spacing' : 'Textabstand' },
      'letter spacing': { key: 'textSpacing', name: language === 'en' ? 'Text Spacing' : 'Textabstand' },
      'stop animations': { key: 'stopAnimations', name: language === 'en' ? 'Stop Animations' : 'Animationen stoppen' },
      'animations': { key: 'stopAnimations', name: language === 'en' ? 'Stop Animations' : 'Animationen stoppen' },
      'animation': { key: 'stopAnimations', name: language === 'en' ? 'Stop Animations' : 'Animationen stoppen' },
      'animationen': { key: 'stopAnimations', name: language === 'en' ? 'Stop Animations' : 'Animationen stoppen' },
      'motion': { key: 'stopAnimations', name: language === 'en' ? 'Stop Animations' : 'Animationen stoppen' },
      'bewegung': { key: 'stopAnimations', name: language === 'en' ? 'Stop Animations' : 'Animationen stoppen' },
      'row height': { key: 'rowHeight', name: language === 'en' ? 'Row Height' : 'Zeilenhöhe' },
      'line height': { key: 'rowHeight', name: language === 'en' ? 'Row Height' : 'Zeilenhöhe' },
      'zeilenhöhe': { key: 'rowHeight', name: language === 'en' ? 'Row Height' : 'Zeilenhöhe' },
      'line spacing': { key: 'rowHeight', name: language === 'en' ? 'Row Height' : 'Zeilenhöhe' },
      'focus indicator': { key: 'focusIndicator', name: language === 'en' ? 'Focus Indicator' : 'Fokus-Anzeige' },
      'focus': { key: 'focusIndicator', name: language === 'en' ? 'Focus Indicator' : 'Fokus-Anzeige' },
      'fokus': { key: 'focusIndicator', name: language === 'en' ? 'Focus Indicator' : 'Fokus-Anzeige' },
      'focus ring': { key: 'focusIndicator', name: language === 'en' ? 'Focus Indicator' : 'Fokus-Anzeige' },
      'mark links': { key: 'mark', name: language === 'en' ? 'Mark Links' : 'Links markieren' },
      'links': { key: 'mark', name: language === 'en' ? 'Mark Links' : 'Links markieren' },
      'link': { key: 'mark', name: language === 'en' ? 'Mark Links' : 'Links markieren' },
      'links markieren': { key: 'mark', name: language === 'en' ? 'Mark Links' : 'Links markieren' },
      'hyperlink': { key: 'mark', name: language === 'en' ? 'Mark Links' : 'Links markieren' },
    };

    // Check for accessibility panel opening
    if (matchesAny(['accessibility', 'barrierefreiheit', 'a11y', 'accessibility panel', 'barrierefreiheitspanel'])) {
      setIsAccessibilityOpen(true);
      setNavitoirMessages(prev => [...prev, {
        role: 'assistant',
        content: language === 'en'
          ? `✅ Opening <strong>Accessibility Panel</strong>...`
          : `✅ Öffne <strong>Barrierefreiheitspanel</strong>...`
      }]);
      setNavitoirLoading(false);
      setTimeout(() => setIsNavitoirOpen(false), 500);
      return;
    }

    // Check for accessibility feature control (iterate longer keys first for specificity)
    let matchedFeature = null;
    const a11yEntries = Object.entries(accessibilityMap).filter(([, f]) => f.key != null);
    a11yEntries.sort((a, b) => b[0].length - a[0].length);
    for (const [key, feature] of a11yEntries) {
      if (userQuery.includes(key)) {
        matchedFeature = feature;
        break;
      }
    }

    if (matchedFeature) {
      const featureKey = matchedFeature.key;
      const currentValue = accessibility[featureKey];
      const isBinary = binaryFeatures.includes(featureKey);
      const isBlueLight = featureKey === 'blueLightFilter';
      
      // Extract specific level (level 3, stufe 2, auf 5, lvl 4, to 3)
      const levelMatch = userQuery.match(/(?:level|stufe|auf|lvl|to)\s*(\d+)/i);
      const specifiedLevel = levelMatch ? parseInt(levelMatch[1], 10) : null;

      // Action synonyms: many ways to say increase/decrease/on/off
      const wantsIncrease = matchesAny([
        'increase', 'max', 'full', 'maximum', 'maximal', 'erhöhen', 'hoch', 'up', 'raise', 'boost', 'more', 'mehr',
        'stronger', 'stärker', 'strong', 'stark', 'intensify', 'verstärken', 'turn up', 'aufdrehen', 'make stronger',
        'crank up', 'amplify', 'add', 'plus', 'höher', 'raise the', 'bump up', 'set to max', 'auf maximum'
      ]);
      const wantsDecrease = matchesAny([
        'decrease', 'reduce', 'lower', 'reduzieren', 'verringern', 'less', 'weniger', 'down', 'dim', 'minimize',
        'weaker', 'schwächer', 'weak', 'schwach', 'turn down', 'abdrehen', 'minus', 'tiefer', 'lower the',
        'dial down', 'cut', 'reduce the', 'min', 'minimum', 'minimal', 'auf minimum', 'aus'
      ]);
      const wantsTurnOn = matchesAny([
        'turn on', 'enable', 'open', 'activate', 'einschalten', 'aktivieren', 'on', 'an', 'start', 'starten',
        'use', 'nutzen', 'utilize', 'switch on', 'anschalten', 'aktivieren', 'turn up', 'ein', 'yes', 'ja',
        'please on', 'bitte an', 'can you turn on', 'can you enable', 'mach an', 'schalt ein'
      ]);
      const wantsTurnOff = matchesAny([
        'turn off', 'disable', 'close', 'deactivate', 'ausschalten', 'deaktivieren', 'off', 'aus', 'stop', 'stoppen',
        'switch off', 'abschalten', 'no', 'nein', 'remove', 'entfernen', 'kill', 'beenden', 'bitte aus', 'mach aus'
      ]);

      let newValue = currentValue;
      let action = '';

      // If specific level is mentioned, jump to that level
      if (specifiedLevel !== null) {
        if (isBlueLight) {
          // Blue light filter: 0-5 levels
          newValue = Math.max(0, Math.min(5, specifiedLevel));
          action = language === 'en' ? `set to level ${newValue}` : `auf Stufe ${newValue} gesetzt`;
        } else if (!isBinary) {
          // Gradual features: 0, 1, 2 levels
          newValue = Math.max(0, Math.min(2, specifiedLevel));
          action = language === 'en' 
            ? (newValue === 0 ? 'turned off' : (newValue === 1 ? 'set to light level' : 'set to full level'))
            : (newValue === 0 ? 'ausgeschaltet' : (newValue === 1 ? 'auf leichte Stufe gesetzt' : 'auf volle Stufe gesetzt'));
        } else {
          // Binary features: only 0 or 1
          newValue = specifiedLevel > 0 ? 1 : 0;
          action = language === 'en' ? (newValue === 1 ? 'turned on' : 'turned off') : (newValue === 1 ? 'eingeschaltet' : 'ausgeschaltet');
        }
      } else if (wantsTurnOff || (currentValue > 0 && !wantsIncrease && !wantsDecrease && !wantsTurnOn)) {
        // Turn off
        newValue = 0;
        action = language === 'en' ? 'turned off' : 'ausgeschaltet';
      } else if (wantsTurnOn || currentValue === 0) {
        // Turn on or increase
        if (isBinary) {
          newValue = 1;
          action = language === 'en' ? 'turned on' : 'eingeschaltet';
        } else if (isBlueLight) {
          if (wantsIncrease && currentValue > 0) {
            newValue = Math.min(5, currentValue + 1);
            action = language === 'en' ? `increased to level ${newValue}` : `auf Stufe ${newValue} erhöht`;
          } else if (wantsDecrease && currentValue > 1) {
            newValue = Math.max(1, currentValue - 1);
            action = language === 'en' ? `decreased to level ${newValue}` : `auf Stufe ${newValue} verringert`;
          } else {
            newValue = currentValue === 0 ? 1 : (currentValue >= 5 ? 0 : currentValue + 1);
            action = language === 'en' ? (newValue === 0 ? 'turned off' : `set to level ${newValue}`) : (newValue === 0 ? 'ausgeschaltet' : `auf Stufe ${newValue} gesetzt`);
          }
        } else {
          if (wantsIncrease && currentValue > 0) {
            newValue = 2;
            action = language === 'en' ? 'increased to full' : 'auf voll erhöht';
          } else {
            newValue = currentValue === 0 ? 1 : 2;
            action = language === 'en' ? (newValue === 1 ? 'turned on (light)' : 'increased to full') : (newValue === 1 ? 'eingeschaltet (leicht)' : 'auf voll erhöht');
          }
        }
      } else if (wantsIncrease) {
        // Increase
        if (isBlueLight) {
          newValue = Math.min(5, currentValue + 1);
          action = language === 'en' ? `increased to level ${newValue}` : `auf Stufe ${newValue} erhöht`;
        } else if (!isBinary) {
          newValue = 2;
          action = language === 'en' ? 'increased to full' : 'auf voll erhöht';
        }
      } else if (wantsDecrease) {
        // Decrease
        if (isBlueLight) {
          newValue = Math.max(0, currentValue - 1);
          action = language === 'en' ? (newValue === 0 ? 'turned off' : `decreased to level ${newValue}`) : (newValue === 0 ? 'ausgeschaltet' : `auf Stufe ${newValue} verringert`);
        } else if (!isBinary && currentValue === 2) {
          newValue = 1;
          action = language === 'en' ? 'decreased to light' : 'auf leicht verringert';
        }
      }

      // Apply the change
      if (newValue !== currentValue) {
        setAccessibility(prev => ({ ...prev, [featureKey]: newValue }));
        setNavitoirMessages(prev => [...prev, {
          role: 'assistant',
          content: language === 'en'
            ? `✅ <strong>${matchedFeature.name}</strong> ${action}.`
            : `✅ <strong>${matchedFeature.name}</strong> ${action}.`
        }]);
        setNavitoirLoading(false);
        setTimeout(() => setIsNavitoirOpen(false), 800);
        return;
      } else {
        setNavitoirMessages(prev => [...prev, {
          role: 'assistant',
          content: language === 'en'
            ? `ℹ️ <strong>${matchedFeature.name}</strong> is already ${currentValue === 0 ? 'off' : (isBlueLight ? `at level ${currentValue}` : (currentValue === 1 ? 'at light level' : 'at full level'))}.`
            : `ℹ️ <strong>${matchedFeature.name}</strong> ist bereits ${currentValue === 0 ? 'aus' : (isBlueLight ? `auf Stufe ${currentValue}` : (currentValue === 1 ? 'auf leichter Stufe' : 'auf voller Stufe'))}.`
        }]);
        setNavitoirLoading(false);
        return;
      }
    }

    // Theme switching (after accessibility so "blue light filter" is not misread as "light theme")
    const wantsDark = matchesAny([
      'dark theme', 'dark mode', 'dunkles thema', 'dunkel', 'night', 'night mode', 'nacht', 'nachtmodus',
      'darker', 'dunkler', 'dark', 'black theme', 'schwarzes thema', 'dunkelmodus'
    ]);
    const wantsLight = matchesAny([
      'light theme', 'light mode', 'helles thema', 'hell', 'day', 'day mode', 'tag', 'daylight',
      'lighter', 'heller', 'bright', 'bright mode', 'hellmodus', 'light', 'weiß', 'weiss'
    ]) && !/blue\s*light|bluelight|blaulicht/i.test(userQuery);
    if (wantsDark && !wantsLight) {
      if (!isDarkTheme) {
        setIsDarkTheme(true);
        setNavitoirMessages(prev => [...prev, {
          role: 'assistant',
          content: language === 'en'
            ? `✅ Switched to <strong>Dark Theme</strong>.`
            : `✅ Zu <strong>dunklem Thema</strong> gewechselt.`
        }]);
        setNavitoirLoading(false);
        setTimeout(() => setIsNavitoirOpen(false), 800);
        return;
      } else {
        setNavitoirMessages(prev => [...prev, {
          role: 'assistant',
          content: language === 'en'
            ? `ℹ️ Already using <strong>Dark Theme</strong>.`
            : `ℹ️ Bereits <strong>dunkles Thema</strong> aktiv.`
        }]);
        setNavitoirLoading(false);
        return;
      }
    }
    if (wantsLight && !wantsDark) {
      if (isDarkTheme) {
        setIsDarkTheme(false);
        setNavitoirMessages(prev => [...prev, {
          role: 'assistant',
          content: language === 'en'
            ? `✅ Switched to <strong>Light Theme</strong>.`
            : `✅ Zu <strong>hellem Thema</strong> gewechselt.`
        }]);
        setNavitoirLoading(false);
        setTimeout(() => setIsNavitoirOpen(false), 800);
        return;
      } else {
        setNavitoirMessages(prev => [...prev, {
          role: 'assistant',
          content: language === 'en'
            ? `ℹ️ Already using <strong>Light Theme</strong>.`
            : `ℹ️ Bereits <strong>helles Thema</strong> aktiv.`
        }]);
        setNavitoirLoading(false);
        return;
      }
    }

    // Section mapping: each section has id, name, and an array of trigger terms (longer = more specific)
    const sectionTerms = [
      {
        id: 'about',
        name: language === 'en' ? 'About' : 'Über mich',
        terms: ['about me', 'about you', 'about samuel', 'about him', 'who is', 'who are', 'intro', 'introduction', 'bio', 'biography', 'myself', 'overview', 'person', 'samuel', 'über mich', 'über dich', 'wer ist', 'vorstellung', 'einführung', 'steckbrief', 'referenz', 'about', 'who', 'wer', 'you', 'dich', 'ihn', 'read about', 'tell me about']
      },
      {
        id: 'projects',
        name: language === 'en' ? 'Projects' : 'Projekte',
        terms: ['projects', 'project', 'portfolio', 'showcase', 'work', 'works', 'what have you done', 'what have you built', 'projekte', 'projekt', 'arbeiten', 'referenzen', 'beispiele', 'samples', 'portfolio work', 'projcts', 'my work', 'deine arbeit', 'your work', 'show me your work', 'zeig projekte', 'take me to projects', 'general', 'general ai']
      },
      {
        id: 'skills',
        name: language === 'en' ? 'Skills' : 'Fähigkeiten',
        terms: ['skills', 'skill', 'abilities', 'ability', 'technologies', 'technology', 'tech', 'tools', 'what can you do', 'fähigkeiten', 'fähigkeit', 'technologien', 'können', 'was kannst du', 'tools', 'stack', 'expertise', 'kompetenz', 'competencies', 'skils', 'technologie']
      },
      {
        id: 'experience',
        name: language === 'en' ? 'Experience' : 'Erfahrung',
        terms: ['experience', 'experiences', 'work experience', 'job', 'jobs', 'career', 'employment', 'history', 'work history', 'where have you worked', 'erfahrung', 'beruf', 'karriere', 'arbeitserfahrung', 'wo hast du gearbeitet', 'experiance', 'employment history', 'job history', 'arbeit', 'berufserfahrung', 'professional experience']
      },
      {
        id: 'certifications',
        name: language === 'en' ? 'Certifications' : 'Zertifikate',
        terms: ['certifications', 'certificate', 'certificates', 'cert', 'certs', 'training', 'qualifications', 'credentials', 'credits', 'badges', 'courses', 'zertifikate', 'zertifikat', 'schulungen', 'qualifikationen', 'kurse', 'bildung', 'diploma', 'diplomas', 'qualification', 'trainings', 'cerifications', 'certifictes', 'certs']
      },
      {
        id: 'contact',
        name: language === 'en' ? 'Contact' : 'Kontakt',
        terms: ['contact', 'contacts', 'get in touch', 'reach', 'reach out', 'email', 'e-mail', 'message', 'send message', 'how to contact', 'where to contact', 'kontakt', 'kontaktdaten', 'erreichbar', 'nachricht', 'wie kontaktiere ich', 'touch', 'reach me', 'call', 'phone', 'linkedin', 'form', 'formular', 'contct', 'contact you', 'contact info', 'write you', 'schreiben']
      },
      {
        id: 'main-content',
        name: language === 'en' ? 'Home' : 'Startseite',
        terms: ['home', 'main', 'top', 'start', 'top of page', 'startseite', 'anfang', 'nach oben', 'hauptseite', 'beginning', 'hero', 'landing', 'above', 'oben', 'back to top', 'zurück nach oben', 'go up', 'scroll up', 'take me to the top', 'go to top']
      }
    ];

    // CV / Resume: many ways to ask for it
    const cvTerms = [
      'cv', 'resume', 'résumé', 'resumé', 'lebenslauf', 'curriculum', 'curriculum vitae', 'vitae', 'curriculum vitae',
      'work history', 'job history', 'professional summary', 'berufslebenslauf', 'lebenslauf anzeigen', 'cv anzeigen',
      'download cv', 'download resume', 'pdf', 'his cv', 'your cv', 'dein lebenslauf', 'ihr lebenslauf', 'view cv', 'see cv'
    ];
    const wantsCv = matchesAny(cvTerms);
    const cvUrl = `/cv?lang=${language}`;

    // Certification links: order matters (more specific first)
    const certLinkEntries = [
      ['technical writing certificate', certifications.find(c => c.title.en.toLowerCase().includes('technical writing'))?.link],
      ['technical writing cert', certifications.find(c => c.title.en.toLowerCase().includes('technical writing'))?.link],
      ['technical writing', certifications.find(c => c.title.en.toLowerCase().includes('technical writing'))?.link],
      ['technical cert', certifications.find(c => c.title.en.toLowerCase().includes('technical writing'))?.link],
      ['technical', certifications.find(c => c.title.en.toLowerCase().includes('technical writing'))?.link],
      ['digital learning design', certifications.find(c => c.title.en.toLowerCase().includes('digital learning'))?.link],
      ['digital learning cert', certifications.find(c => c.title.en.toLowerCase().includes('digital learning'))?.link],
      ['digital learning', certifications.find(c => c.title.en.toLowerCase().includes('digital learning'))?.link],
      ['uiuc', certifications.find(c => c.issuer?.en?.toLowerCase().includes('illinois'))?.link],
      ['illinois', certifications.find(c => c.issuer?.en?.toLowerCase().includes('illinois'))?.link],
      ['university of illinois', certifications.find(c => c.issuer?.en?.toLowerCase().includes('illinois'))?.link],
      ['board infinity', certifications.find(c => c.issuer?.en?.toLowerCase().includes('board'))?.link],
      ['board infinity cert', certifications.find(c => c.issuer?.en?.toLowerCase().includes('board'))?.link],
      ['board', certifications.find(c => c.issuer?.en?.toLowerCase().includes('board'))?.link],
      ['ef set', certifications.find(c => c.title.en.toLowerCase().includes('ef set'))?.link],
      ['efset', certifications.find(c => c.title.en.toLowerCase().includes('ef set'))?.link],
      ['english certificate', certifications.find(c => c.title.en.toLowerCase().includes('ef set'))?.link],
      ['english cert', certifications.find(c => c.title.en.toLowerCase().includes('ef set'))?.link],
      ['english', certifications.find(c => c.title.en.toLowerCase().includes('ef set'))?.link],
      ['c1 english', certifications.find(c => c.title.en.toLowerCase().includes('ef set'))?.link],
      ['c1', certifications.find(c => c.title.en.toLowerCase().includes('ef set'))?.link],
    ].filter(([, link]) => link);

    // Project links (e.g. General): open in new tab; with wantsToOpen, scroll to projects first
    const projectLinkEntries = [
      ['general', 'https://general-ai-wheat.vercel.app'],
      ['general ai', 'https://general-ai-wheat.vercel.app'],
    ];

    // Check for CV requests
    if (wantsCv) {
      if (wantsToOpen) {
        // Navigate to main first, then open CV
        setTimeout(() => {
          const mainElement = document.getElementById('main-content');
          if (mainElement) {
            mainElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setTimeout(() => {
              window.open(cvUrl, '_blank');
              setIsNavitoirOpen(false);
            }, 800);
          }
        }, 100);
        setToast({ text: language === 'en' ? 'Opening CV in new tab' : 'Lebenslauf in neuem Tab öffnen' });
        setNavitoirMessages(prev => [...prev, {
          role: 'assistant',
          content: language === 'en'
            ? `✅ Navigating to homepage, then opening <strong>CV</strong>...`
            : `✅ Navigiere zur Startseite, dann öffne ich den <strong>Lebenslauf</strong>...`
        }]);
        setNavitoirLoading(false);
        return;
      } else {
        // Just navigate to main (CV link is there)
        setTimeout(() => {
          const element = document.getElementById('main-content');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setTimeout(() => setIsNavitoirOpen(false), 500);
          }
        }, 100);
        setNavitoirMessages(prev => [...prev, {
          role: 'assistant',
          content: language === 'en'
            ? `✅ Navigating to <strong>Home</strong> section where you can access the CV...`
            : `✅ Navigiere zum Bereich <strong>Startseite</strong>, wo Sie auf den Lebenslauf zugreifen können...`
        }]);
        setNavitoirLoading(false);
        return;
      }
    }

    // Check for certification link opening (iterate more specific keys first)
    if (wantsToOpen) {
      let certLink = null;
      for (const [key, link] of certLinkEntries) {
        if (userQuery.includes(key)) {
          certLink = link;
          break;
        }
      }

      if (certLink) {
        // Navigate to certifications first, then open link
        setTimeout(() => {
          const certElement = document.getElementById('certifications');
          if (certElement) {
            certElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setTimeout(() => {
              window.open(certLink, '_blank');
              setIsNavitoirOpen(false);
            }, 800);
          }
        }, 100);
        setToast({ text: language === 'en' ? 'Opening link in new tab' : 'Link in neuem Tab öffnen' });
        setNavitoirMessages(prev => [...prev, {
          role: 'assistant',
          content: language === 'en'
            ? `✅ Navigating to <strong>Certifications</strong> section, then opening the certificate...`
            : `✅ Navigiere zum Bereich <strong>Zertifikate</strong>, dann öffne ich das Zertifikat...`
        }]);
        setNavitoirLoading(false);
        return;
      }

      // Check for project links (e.g. General)
      let projectLink = null;
      for (const [key, link] of projectLinkEntries) {
        if (userQuery.includes(key)) {
          projectLink = link;
          break;
        }
      }
      if (projectLink) {
        setTimeout(() => {
          const projElement = document.getElementById('projects');
          if (projElement) {
            projElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setTimeout(() => {
              window.open(projectLink, '_blank');
              setIsNavitoirOpen(false);
            }, 800);
          }
        }, 100);
        setToast({ text: language === 'en' ? 'Opening General in new tab' : 'General in neuem Tab öffnen' });
        setNavitoirMessages(prev => [...prev, {
          role: 'assistant',
          content: language === 'en'
            ? `✅ Navigating to <strong>Projects</strong>, then opening <strong>General</strong>...`
            : `✅ Navigiere zu <strong>Projekte</strong>, dann öffne ich <strong>General</strong>...`
        }]);
        setNavitoirLoading(false);
        return;
      }
    }

    // Find best-matching section: score = length of longest matching term (specificity)
    let targetSection = null;
    let bestScore = 0;
    for (const section of sectionTerms) {
      for (const term of section.terms) {
        if (userQuery.includes(term) && term.length > bestScore) {
          bestScore = term.length;
          targetSection = { id: section.id, name: section.name };
        }
      }
    }

    if (targetSection) {
      // Navigate to section
      setTimeout(() => {
        const element = document.getElementById(targetSection.id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          // Close Navitoir after navigation
          setTimeout(() => setIsNavitoirOpen(false), 500);
        }
      }, 100);

      setNavitoirMessages(prev => [...prev, {
        role: 'assistant',
        content: language === 'en'
          ? `✅ Navigating to <strong>${targetSection.name}</strong> section...`
          : `✅ Navigiere zum Bereich <strong>${targetSection.name}</strong>...`
      }]);
      setNavitoirLoading(false);
    } else {
      // No match found
      setNavitoirMessages(prev => [...prev, {
        role: 'assistant',
        content: language === 'en'
          ? `I can help you navigate to: About, Projects, Skills, Experience, Certifications, or Contact. I can also open CV or specific certificates. What would you like to see?`
          : `Ich kann Sie zu folgenden Bereichen navigieren: Über mich, Projekte, Fähigkeiten, Erfahrung, Zertifikate oder Kontakt. Ich kann auch den Lebenslauf oder bestimmte Zertifikate öffnen. Was möchten Sie sehen?`
      }]);
      setNavitoirLoading(false);
    }
  };

  // Scroll to bottom of Navitoir chat
  useEffect(() => {
    if (navitoirEndRef.current) {
      navitoirEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [navitoirMessages]);

  // Clear toast after delay
  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 2500);
      return () => clearTimeout(t);
    }
  }, [toast]);

  // Escape to close modals
  useEffect(() => {
    if (!isNavitoirOpen) return;
    const f = (e) => { if (e.key === 'Escape') setIsNavitoirOpen(false); };
    document.addEventListener('keydown', f);
    return () => document.removeEventListener('keydown', f);
  }, [isNavitoirOpen]);
  useEffect(() => {
    if (!isChatOpen) return;
    const f = (e) => { if (e.key === 'Escape') setIsChatOpen(false); };
    document.addEventListener('keydown', f);
    return () => document.removeEventListener('keydown', f);
  }, [isChatOpen]);

  // Auto-focus chat input when modal opens (for mobile keyboard)
  useEffect(() => {
    if (isChatOpen && chatInputRef.current) {
      // Use setTimeout to ensure the modal is fully rendered
      setTimeout(() => {
        chatInputRef.current?.focus();
        // Also trigger click on mobile to ensure keyboard appears
        if (window.innerWidth <= 768) {
          chatInputRef.current?.click();
        }
      }, 100);
    }
  }, [isChatOpen]);


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
    // Build filter string combining all active filters
    const filters = [];
    
    if (accessibility.contrast > 0) {
      const contrast = 1 + (accessibility.contrast === 1 ? 0.25 : 0.5);
      filters.push(`contrast(${contrast})`);
    }
    
    // Blue light filter: uses overlay approach for proper warm tone (5 intensity levels)
    if (accessibility.blueLightFilter > 0) {
      const style = document.getElementById('a11y-blue-light-filter') || document.createElement('style');
      style.id = 'a11y-blue-light-filter';
      // 5 intensity levels: 0.1, 0.15, 0.2, 0.25, 0.3
      const opacityMap = { 1: 0.1, 2: 0.15, 3: 0.2, 4: 0.25, 5: 0.3 };
      const opacity = opacityMap[accessibility.blueLightFilter] || 0.15;
      style.textContent = `
        html::before {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(255, 200, 100, ${opacity});
          pointer-events: none;
          z-index: 999999;
          mix-blend-mode: multiply;
        }
      `;
      if (!document.getElementById('a11y-blue-light-filter')) {
        document.head.appendChild(style);
      }
    } else {
      const style = document.getElementById('a11y-blue-light-filter');
      if (style) style.remove();
    }
    
    // Only apply filter if there are active filters, otherwise clear it
    root.style.filter = filters.length > 0 ? filters.join(' ') : '';

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
      // Only set line-height if rowHeight is not active (rowHeight takes priority)
      if (accessibility.rowHeight === 0) {
        root.style.lineHeight = `${1.8 * (multiplier * 0.8)}`;
      }
    } else {
      root.style.letterSpacing = 'normal';
      root.style.wordSpacing = 'normal';
      // Only reset line-height if rowHeight is not active
      if (accessibility.rowHeight === 0) {
        root.style.lineHeight = 'normal';
      }
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
      // Load Lexend font from Google Fonts if not already loaded
      if (!document.getElementById('lexend-font')) {
        const link = document.createElement('link');
        link.id = 'lexend-font';
        link.rel = 'stylesheet';
        link.href = 'https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700&display=swap';
        document.head.appendChild(link);
      }
      
      // Apply dyslexia-friendly styling with two distinct intensity levels
      const style = document.getElementById('a11y-dyslexia-font') || document.createElement('style');
      style.id = 'a11y-dyslexia-font';
      
      if (accessibility.dyslexia === 1) {
        // Level 1 (Light): Lexend font with moderate spacing
        style.textContent = `
          * {
            font-family: "Lexend", "Comic Sans MS", "Trebuchet MS", sans-serif !important;
            letter-spacing: 0.08em !important;
            word-spacing: 0.2em !important;
          }
        `;
      } else {
        // Level 2 (Full): Lexend font with more dramatic spacing and adjustments
        style.textContent = `
          * {
            font-family: "Lexend", "Comic Sans MS", "Trebuchet MS", sans-serif !important;
            letter-spacing: 0.15em !important;
            word-spacing: 0.4em !important;
            font-weight: 500 !important;
          }
          p, span, div, li, td, th {
            font-size: 1.05em !important;
          }
        `;
      }
      
      if (!document.getElementById('a11y-dyslexia-font')) {
        document.head.appendChild(style);
      }
    } else {
      // Remove dyslexia font style and font link
      const style = document.getElementById('a11y-dyslexia-font');
      if (style) style.remove();
      const link = document.getElementById('lexend-font');
      if (link) link.remove();
    }

    if (accessibility.rowHeight > 0) {
      const height = accessibility.rowHeight === 1 ? 2 : 2.5;
      // Use style tag with !important to override all elements' line-height
      const style = document.getElementById('a11y-row-height') || document.createElement('style');
      style.id = 'a11y-row-height';
      style.textContent = `
        * {
          line-height: ${height} !important;
        }
      `;
      if (!document.getElementById('a11y-row-height')) {
        document.head.appendChild(style);
      }
    } else {
      // Remove row height style when disabled
      const style = document.getElementById('a11y-row-height');
      if (style) style.remove();
      // Re-apply textSpacing line-height if it's active
      if (accessibility.textSpacing > 0) {
        const multiplier = accessibility.textSpacing === 1 ? 1 : 1.5;
        root.style.lineHeight = `${1.8 * (multiplier * 0.8)}`;
      }
    }

    if (accessibility.mark > 0) {
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
        certifications: "Certifications",
        contact: "Contact"
      },
      hero: {
        available: "Available for Opportunities",
        title: "Digital Learning Designer",
        subtitle: "Technical Writing & Documentation",
        desc: "Transforming complex concepts into engaging, high-impact digital learning experiences. Leveraging learning science, multimedia design, and technical communication to create scalable, accessible solutions that drive measurable results.",
        viewProjects: "View Projects",
        getInTouch: "Get In Touch",
        viewCV: "View CV"
      },
      about: {
        title: "About Me",
        desc: "Digital Learning Designer specializing in creating engaging, accessible educational experiences that transform how people learn. I combine instructional design expertise (ADDIE, Bloom's Taxonomy, Adult Learning Theory) with modern technology to develop impactful e-learning modules, interactive courses, and multimedia content. With a strong foundation in technical communication, I also create clear documentation, user guides, and knowledge bases that make complex information accessible to diverse audiences. Committed to WCAG 2.1 accessibility standards and measurable learning outcomes."
      },
      projects: {
        title: "Featured Projects",
        desc: "Digital learning design projects categorized by type and impact",
        viewAll: "View Full Portfolio",
        eLearning: "E-Learning Modules",
        knowledge: "Knowledge Base",
        techWriting: "Technical Writing",
        webProject: "AI Project"
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
            image: "/images/tdk.jpg",
            certificate: { url: "/TDK_Intern_Cert.pdf", type: "pdf" }
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
            image: "/images/nss.jpg",
            certificate: { url: "/National_Service.pdf", type: "pdf" }
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
        desc: "Looking for a digital learning designer who combines learning science with technical expertise? Let's connect and discuss how I can help transform your learning initiatives.",
        email: "Email Me",
        linkedin: "LinkedIn Profile",
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
        connect: "Connect",
        copyright: "© 2025 Samuel Afriyie Opoku • Digital Learning Designer & E-Learning Developer",
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
          desc: "Full-stack toolkit spanning e-learning authoring (Articulate 360) and multimedia design (Adobe Suite)."
        },
        {
          title: "Measurable Impact",
          desc: "Delivering learning solutions with proven results: 40% knowledge gains, 96% completion rates, and sustained behavioral change."
        }
      ],
      skillsCategories: [
        {
          title: "Digital Learning Design",
          items: ["ADDIE Framework", "Bloom's Taxonomy", "Adult Learning Theory", "Storyboarding", "LXD", "Curriculum Development"]
        },
        {
          title: "E-Learning Tools",
          items: ["Articulate 360 (Storyline, Rise)", "Moodle", "SCORM", "Adobe Premiere Pro", "Adobe Photoshop", "Figma"]
        },
        {
          title: "Content Creation",
          items: ["Technical Writing", "Multimedia Design", "Knowledge Base Documentation", "Cross-Cultural Adaptation"]
        },
        {
          title: "Web & Development Tools",
          items: ["HTML", "CSS", "Markdown", "GitHub", "VS Code", "Vercel"]
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
        certifications: "Zertifikate",
        contact: "Kontakt"
      },
      hero: {
        available: "Verfügbar für neue Möglichkeiten",
        title: "Digital Learning Designer",
        subtitle: "Technical Writing & Dokumentation",
        desc: "Komplexe Konzepte in ansprechende, wirkungsvolle digitale Lernerfahrungen verwandeln. Lernwissenschaft, Multimediadesign und technische Kommunikation für skalierbare, barrierefreie Lösungen mit messbaren Ergebnissen.",
        viewProjects: "Projekte ansehen",
        getInTouch: "Kontakt aufnehmen",
        viewCV: "Lebenslauf anfordern"
      },
      about: {
        title: "Über mich",
        desc: "Als Digital Learning Designer spezialisiere ich mich auf die Entwicklung ansprechender, barrierefreier Bildungserlebnisse, die die Art, wie Menschen lernen, transformieren. Ich kombiniere Instructional Design-Expertise (ADDIE, Bloom's Taxonomie, Erwachsenenlerntheorie) mit moderner Technologie, um wirkungsvolle E-Learning-Module, interaktive Kurse und Multimedia-Inhalte zu entwickeln. Mit fundiertem Hintergrund in technischer Kommunikation erstelle ich auch klare Dokumentationen, Benutzerhandbücher und Wissensdatenbanken, die komplexe Informationen für diverse Zielgruppen zugänglich machen. Engagiert für WCAG 2.1-Barrierefreiheit und messbare Lernergebnisse."
      },
      projects: {
        title: "Ausgewählte Projekte",
        desc: "Digital Learning Design-Projekte nach Typ und Wirkung kategorisiert",
        viewAll: "Gesamtes Portfolio ansehen",
        eLearning: "E-Learning-Module",
        knowledge: "Wissensdatenbank",
        techWriting: "Technisches Schreiben",
        webProject: "AI-Projekt"
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
            image: "/images/tdk.jpg",
            certificate: { url: "/TDK_Intern_Cert.pdf", type: "pdf" }
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
            image: "/images/nss.jpg",
            certificate: { url: "/National_Service.pdf", type: "pdf" }
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
        desc: "Suchen Sie einen Digital Learning Designer, der Lernwissenschaft mit technischer Expertise verbindet? Lassen Sie uns sprechen, wie ich Ihre Lerninitiativen transformieren kann.",
        email: "E-Mail senden",
        linkedin: "LinkedIn Profil",
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
        connect: "Verbinden",
        copyright: "© 2025 Samuel Afriyie Opoku • Digital Learning Designer & E-Learning Entwickler",
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
          desc: "Full-Stack-Toolkit für E-Learning-Autorentools (Articulate 360) und Multimediadesign (Adobe Suite)."
        },
        {
          title: "Messbare Wirkung",
          desc: "Lernlösungen mit nachweisbaren Ergebnissen: 40% Wissenszuwachs, 96% Abschlussrate und nachhaltige Verhaltensänderung."
        }
      ],
      skillsCategories: [
        {
          title: "Digitales Lerndesign",
          items: ["ADDIE-Framework", "Bloom's Taxonomie", "Erwachsenenlerntheorie", "Storyboarding", "LXD", "Curriculumentwicklung"]
        },
        {
          title: "E-Learning-Tools",
          items: ["Articulate 360 (Storyline, Rise)", "Moodle", "SCORM", "Adobe Premiere Pro", "Adobe Photoshop", "Figma"]
        },
        {
          title: "Content-Erstellung",
          items: ["Technisches Schreiben", "Multimediadesign", "Wissensdatenbank-Dokumentation", "Interkulturelle Anpassung"]
        },
        {
          title: "Web & Entwicklungstools",
          items: ["HTML", "CSS", "Markdown", "GitHub", "VS Code", "Vercel"]
        }
      ]
    }
  };

  // Projects with translations
  const projects = [
    {
      title: {
        en: "General",
        de: "General"
      },
      category: {
        en: "AI Project",
        de: "AI-Projekt"
      },
      description: {
        en: "An advanced AI assistant: answers questions, fact-checks, reads PDFs and images, and delivers qualitative and quantitative analysis. Powered by Wikipedia, web search, weather, definitions, news, and DeepSeek API. Built by Samuel.",
        de: "Ein KI-Assistent: beantwortet Fragen, prüft Fakten, liest PDFs und Bilder, qualitative und quantitative Analysen. Nutzt Wikipedia, Websuche, Wetter, Definitionen, News und DeepSeek API. Erstellt von Samuel."
      },
      tools: {
        en: ["Wikipedia", "Web Search", "DeepSeek API", "Vercel", "PDF", "Image Analysis"],
        de: ["Wikipedia", "Websuche", "DeepSeek API", "Vercel", "PDF", "Bildanalyse"]
      },
      results: {
        en: ["Fact-checking", "PDF & image analysis", "Quantitative and qualitative judgments", "Short, accurate answers"],
        de: ["Faktenprüfung", "PDF- und Bildanalyse", "Quantitative und qualitative Bewertungen", "Kurze, präzise Antworten"]
      },
      link: "https://general-ai-wheat.vercel.app",
      featured: true
    },
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
        de: "Leitfaden zur Klimawandel-Minderung"
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
    <div className={`min-h-screen ${isDarkTheme ? 'bg-slate-950' : 'bg-white'}`}>
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
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.04);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .card-light:hover {
          border-color: #cbd5e1;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.12), 0 8px 10px -6px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(59, 130, 246, 0.1);
          transform: translateY(-2px);
        }
        .hover-lift {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .hover-lift:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px -12px rgba(59, 130, 246, 0.3), 0 8px 16px -4px rgba(0, 0, 0, 0.1);
        }
        .text-gradient {
          background: linear-gradient(135deg, #1e40af 0%, #3b82f6 40%, #6366f1 70%, #8b5cf6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          background-size: 200% 200%;
          animation: gradient-shift 8s ease infinite;
        }
        .btn-gradient {
          background: linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #6366f1 100%);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 14px 0 rgba(59, 130, 246, 0.25);
        }
        .btn-gradient:hover {
          background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 50%, #4f46e5 100%);
          transform: translateY(-2px);
          box-shadow: 0 12px 24px -4px rgba(59, 130, 246, 0.5);
        }
        .section-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.4), rgba(99, 102, 241, 0.4), transparent);
        }
        .glass-card {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }
      `}</style>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        body { 
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; 
          letter-spacing: -0.011em;
          line-height: 1.6;
        }
        h1, h2, h3, h4, h5, h6 { 
          font-family: 'Inter', sans-serif; 
          letter-spacing: -0.025em;
          line-height: 1.2;
          font-weight: 700;
        }
        p {
          letter-spacing: -0.003em;
          line-height: 1.65;
        }
      `}</style>

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
                  <img src="/images/us.svg.webp" alt="English" width="20" height="20" loading="lazy" className="w-5 h-5 rounded-sm" />
                </button>
                <button
                  className={`px-2.5 py-1.5 rounded-lg text-sm font-medium border transition-all duration-200 flex items-center gap-1.5 ${language === 'de' ? 'bg-blue-600 text-white border-blue-600 shadow-md' : 'bg-white/80 text-gray-700 border-gray-200 hover:border-blue-300'}`}
                  onClick={() => setLanguage('de')}
                  aria-label="Switch to German"
                >
                  <img src="/images/ger.svg.png" alt="Deutsch" width="20" height="20" loading="lazy" className="w-5 h-5 rounded-sm" />
                </button>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#about" className={`${isDarkTheme ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-blue-600'} transition-all duration-300 font-medium relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all hover:after:w-full hover:scale-105`}>{t[language].nav.about}</a>
              <a href="#projects" className={`${isDarkTheme ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-blue-600'} transition-all duration-300 font-medium relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all hover:after:w-full hover:scale-105`}>{t[language].nav.projects}</a>
              <a href="#skills" className={`${isDarkTheme ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-blue-600'} transition-all duration-300 font-medium relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all hover:after:w-full hover:scale-105`}>{t[language].nav.skills}</a>
              <a href="#experience" className={`${isDarkTheme ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-blue-600'} transition-all duration-300 font-medium relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all hover:after:w-full hover:scale-105`}>{t[language].nav.experience}</a>
              <a href="#certifications" className={`${isDarkTheme ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-blue-600'} transition-all duration-300 font-medium relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all hover:after:w-full hover:scale-105`}>{t[language].nav.certifications}</a>
              <a href="#contact" className={`${isDarkTheme ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-blue-600'} transition-all duration-300 font-medium relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all hover:after:w-full hover:scale-105`}>{t[language].nav.contact}</a>
              {/* Features Toggle */}
              <button
                onClick={() => {
                  setFeaturesEnabled(!featuresEnabled);
                  if (!featuresEnabled === false) {
                    setIsAccessibilityOpen(false);
                    setIsNavitoirOpen(false);
                    setIsChatOpen(false);
                  }
                }}
                className={`p-2.5 rounded-xl border transition-all duration-300 flex items-center gap-2 ${featuresEnabled ? 'bg-green-600 text-white border-green-600 shadow-md hover:bg-green-700' : 'bg-gray-400 text-white border-gray-400 shadow-md hover:bg-gray-500'}`}
                aria-label={featuresEnabled ? (language === 'en' ? 'Disable features' : 'Funktionen deaktivieren') : (language === 'en' ? 'Enable features' : 'Funktionen aktivieren')}
                title={featuresEnabled ? (language === 'en' ? 'Disable Accessibility & AI Features' : 'Barrierefreiheit & KI-Funktionen deaktivieren') : (language === 'en' ? 'Enable Accessibility & AI Features' : 'Barrierefreiheit & KI-Funktionen aktivieren')}
              >
                {featuresEnabled ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                <span className="hidden lg:inline text-sm font-medium">{featuresEnabled ? (language === 'en' ? 'Features: On' : 'Funktionen: An') : (language === 'en' ? 'Features: Off' : 'Funktionen: Aus')}</span>
              </button>
              {/* Theme Toggle */}
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
            <a href="#certifications" className="block px-4 py-3 text-gray-700 hover:bg-blue-50">{t[language].nav.certifications}</a>
            <a href="#contact" className="block px-4 py-3 text-gray-700 hover:bg-blue-50">{t[language].nav.contact}</a>
            {/* Mobile Features Toggle */}
            <button
              onClick={() => {
                setFeaturesEnabled(!featuresEnabled);
                if (!featuresEnabled === false) {
                  setIsAccessibilityOpen(false);
                  setIsNavitoirOpen(false);
                  setIsChatOpen(false);
                }
              }}
              className={`w-full flex items-center justify-center gap-2 px-4 py-3 ${featuresEnabled ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-600'}`}
            >
              {featuresEnabled ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              <span className="font-medium">{featuresEnabled ? (language === 'en' ? 'Disable Features' : 'Funktionen deaktivieren') : (language === 'en' ? 'Enable Features' : 'Funktionen aktivieren')}</span>
            </button>
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
      <section id="main-content" className={`pt-28 pb-20 md:pt-32 md:pb-24 px-4 relative overflow-hidden ${isDarkTheme ? 'bg-gradient-to-br from-gray-950 via-slate-950 to-gray-950' : 'bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-50/30'}`}>
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
                  <div className={`absolute -inset-2 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition-all duration-700 scale-100 group-hover:scale-105`}></div>
                  <img
                    src="/images/profile.jpg"
                    alt={t[language].name}
                    width="192"
                    height="256"
                    className={`relative rounded-2xl object-cover shadow-2xl flex-shrink-0 transition-all duration-500 group-hover:scale-[1.03] w-36 h-48 md:w-44 md:h-56 lg:w-48 lg:h-64 ${isDarkTheme ? 'border-4 border-white/90 ring-4 ring-blue-500/20' : 'border-4 border-white shadow-2xl ring-4 ring-blue-100/50'}`}
                  />
                </div>
                <div>
                  <h1 className={`text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-2 md:mb-3 ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>
                    {t[language].hero.title}
                  </h1>
                  {t[language].hero.subtitle && (
                    <p className={`text-sm md:text-base font-medium tracking-wide ${isDarkTheme ? 'text-blue-300/70' : 'text-gray-500'}`}>
                      {t[language].hero.subtitle}
                    </p>
                  )}
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
                  className={`inline-flex items-center justify-center gap-2 px-4 py-3.5 md:py-4 rounded-xl font-semibold border transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-1 w-[180px] ${isDarkTheme ? 'bg-white text-blue-700 hover:bg-blue-50 border-white hover:border-blue-100 shadow-blue-500/20' : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 border-blue-600 shadow-blue-500/30'}`}
                >
                  <Mail className="w-5 h-5" />
                  {t[language].hero.getInTouch}
                </a>
                <a 
                  href={`/cv?lang=${language}`}
                  className={`inline-flex items-center justify-center gap-2 px-4 py-3.5 md:py-4 rounded-xl font-semibold border transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-1 w-[180px] ${isDarkTheme ? 'bg-gradient-to-r from-blue-500/30 to-indigo-500/30 backdrop-blur-md text-white border-blue-400/30 hover:from-blue-500/40 hover:to-indigo-500/40 shadow-blue-500/20' : 'bg-white/90 backdrop-blur-sm text-blue-700 border-blue-200 hover:bg-white hover:border-blue-300 shadow-blue-500/20'}`}
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
              <div key={idx} className={`p-8 rounded-2xl hover-lift group transition-all duration-300 ${isDarkTheme ? 'bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20' : 'card-light'}`}>
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 group-hover:shadow-2xl transition-all duration-300 group-hover:rotate-3">
                  {idx === 0 && <BookOpen className="w-8 h-8 text-white" />}
                  {idx === 1 && <Code className="w-8 h-8 text-white" />}
                  {idx === 2 && <TrendingUp className="w-8 h-8 text-white" />}
                </div>
                <h3 className={`text-xl font-bold mb-4 ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>{card.title}</h3>
                <p className={`leading-relaxed ${isDarkTheme ? 'text-blue-100/90' : 'text-gray-600'}`}>{card.desc}</p>
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
              <span className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300">
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
                      <img src={imgSrc} alt={project.title[language]} width="420" height="208" loading="lazy" decoding="async" className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-3 py-1.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full text-xs font-semibold shadow-md">
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
              <span className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300">
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
                  <a key={index} href={project.link} target="_blank" rel="noopener noreferrer" className={`rounded-2xl overflow-hidden group block flex flex-col relative hover-lift transition-all duration-300 ${isDarkTheme ? 'bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20' : 'card-light'}`} style={{width: '100%', maxWidth: '420px', minHeight: '520px', textDecoration: 'none'}}>
                    <div className="relative overflow-hidden rounded-t-2xl">
                      <img src={imgSrc} alt={project.title[language]} width="420" height="208" loading="lazy" decoding="async" className="w-full h-52 object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-3 py-1.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full text-xs font-semibold shadow-md">
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
          <div className="mb-16">
            <h3 className={`text-2xl font-bold mb-8 flex items-center gap-3 ${isDarkTheme ? 'text-white' : 'text-gray-800'}`}>
              <span className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300">
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
                  <a key={index} href={project.link} target="_blank" rel="noopener noreferrer" className={`rounded-2xl overflow-hidden group block flex flex-col relative hover-lift transition-all duration-300 ${isDarkTheme ? 'bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20' : 'card-light'}`} style={{width: '100%', maxWidth: '420px', minHeight: '520px', textDecoration: 'none'}}>
                    <div className="relative overflow-hidden rounded-t-2xl">
                      <img src={imgSrc} alt={project.title[language]} width="420" height="208" loading="lazy" decoding="async" className="w-full h-52 object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-3 py-1.5 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-full text-xs font-semibold shadow-md">
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

          {/* AI Project — General */}
          <div className="mb-12">
            <h3 className={`text-2xl font-bold mb-8 flex items-center gap-3 ${isDarkTheme ? 'text-white' : 'text-gray-800'}`}>
              <span className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                <Sparkles className="w-5 h-5 text-white" />
              </span>
              {t[language].projects.webProject}
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.filter(p => p.title.en === "General").map((project, index) => (
                <a key={index} href={project.link} target="_blank" rel="noopener noreferrer" className={`rounded-2xl overflow-hidden group block flex flex-col relative hover-lift transition-all duration-300 ${isDarkTheme ? 'bg-white/10 backdrop-blur-xl border border-white/10' : 'card-light'}`} style={{width: '100%', maxWidth: '420px', minHeight: '520px', textDecoration: 'none'}}>
                  <div className="relative overflow-hidden">
                    <img src="/images/general.png" alt={project.title[language]} width="420" height="208" loading="lazy" decoding="async" className="w-full h-52 object-contain bg-black transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-3 py-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full text-xs font-semibold shadow-md">
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
              ))}
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
                        width="56"
                        height="56"
                        loading="lazy"
                        decoding="async"
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
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <p className={`font-semibold ${item.highlight ? (isDarkTheme ? 'text-blue-300' : 'text-blue-600') : (isDarkTheme ? 'text-blue-200' : 'text-gray-600')}`}>{(item.company && item.company[language]) || ''}</p>
                      {item.certificate && (
                        <a
                          href={item.certificate.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border transition-all duration-200 text-xs font-medium ${
                            isDarkTheme 
                              ? 'bg-gradient-to-r from-blue-500/20 to-indigo-500/20 border-blue-400/40 text-blue-200 hover:from-blue-500/30 hover:to-indigo-500/30 hover:border-blue-400/60 hover:shadow-lg hover:shadow-blue-500/20' 
                              : 'bg-gradient-to-r from-indigo-50 to-blue-50 border-indigo-200/60 text-indigo-700 hover:from-indigo-100 hover:to-blue-100 hover:border-indigo-300 hover:shadow-sm'
                          }`}
                          title={language === 'de' ? 'Zertifikat anzeigen' : 'View Certificate'}
                        >
                          <Award className="w-3.5 h-3.5" />
                          <span>{language === 'de' ? 'Zertifikat' : 'Certificate'}</span>
                        </a>
                      )}
                    </div>
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
      <section id="certifications" className={`py-24 px-4 relative overflow-hidden ${isDarkTheme ? 'bg-gradient-to-br from-gray-950 via-slate-950 to-gray-950' : 'bg-white'}`}>
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
                      width="400"
                      height="144"
                      loading="lazy"
                      decoding="async"
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
              className={`inline-flex items-center gap-3 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 ${isDarkTheme ? 'bg-white text-blue-600 hover:bg-gray-50 shadow-blue-500/20' : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-blue-500/30'}`}
            >
              <Mail className="w-5 h-5" />
              {t[language].contact.email}
            </a>
            <a 
              href="https://www.linkedin.com/in/samuel-o-4b9bbb2a8" 
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-3 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 ${isDarkTheme ? 'bg-gradient-to-r from-white/15 to-white/10 backdrop-blur-md text-white border border-white/20 hover:from-white/20 hover:to-white/15' : 'bg-white text-blue-600 border border-blue-200 hover:bg-blue-50 hover:border-blue-300 shadow-blue-500/10'}`}
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
                <a href="#certifications" className={`block transition-colors duration-200 ${isDarkTheme ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-blue-600'}`}>{t[language].nav.certifications}</a>
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
              <h3 className={`text-lg font-bold mb-6 ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>{t[language].footer.connect}</h3>
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
            <a href="#main-content" className={`inline-block mt-2 text-sm ${isDarkTheme ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}>
              {language === 'en' ? 'Back to top' : 'Nach oben'}
            </a>
          </div>
        </div>
      </footer>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[70] px-4 py-2 rounded-lg shadow-lg text-sm bg-gray-800 text-white">
          {toast.text}
        </div>
      )}

      {/* Accessibility Panel Modal - Mobile (full screen) */}
      {isAccessibilityOpen && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center md:hidden" onClick={() => setIsAccessibilityOpen(false)}>
          <div 
            className="relative w-full max-h-[75vh] h-[70vh] rounded-t-3xl shadow-2xl overflow-hidden flex flex-col border"
            style={{
              background: isDarkTheme ? 'rgba(15,23,42,0.98)' : 'rgba(255,255,255,0.98)',
              borderColor: 'rgba(59,130,246,0.2)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header bar - BLUE */}
            <div 
              className="flex justify-between items-center px-4 py-3 border-b flex-shrink-0 min-h-[52px]" 
              style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)', borderColor: 'rgba(255,255,255,0.15)' }}
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
                    { key: 'largeText', label: language === 'en' ? 'Larger Text' : 'Größere Schrift', fullLabel: language === 'en' ? 'Large Text' : 'Große Schrift', icon: '/images/larger-font.png' },
                    { key: 'contrast', label: language === 'en' ? 'Contrast' : 'Kontrast', fullLabel: language === 'en' ? 'Full Contrast' : 'Voller Kontrast', icon: '/images/contrast.png' },
                    { key: 'blueLightFilter', label: language === 'en' ? 'Blue Light Filter' : 'Blaulichtfilter', fullLabel: language === 'en' ? 'Strong Filter' : 'Starker Filter', icon: '/images/white-balance.png?v=1' },
                    { key: 'mark', label: language === 'en' ? 'Mark Links' : 'Links markieren', icon: '/images/link.png', isBinary: true },
                    { key: 'textSpacing', label: language === 'en' ? 'Text Spacing' : 'Textabstand', fullLabel: language === 'en' ? 'Full Spacing' : 'Voller Abstand', icon: '/images/spacing.png' },
                    { key: 'stopAnimations', label: language === 'en' ? 'Stop Animations' : 'Animationen stoppen', icon: '/images/pause-button.png', isBinary: true },
                    { key: 'hideImages', label: language === 'en' ? 'Hide Images' : 'Bilder verbergen', icon: '/images/hide-images.png', isBinary: true },
                    { key: 'dyslexia', label: language === 'en' ? 'Dyslexia Font' : 'Dyslexie-Schrift', fullLabel: language === 'en' ? 'Full Dyslexia' : 'Voll Dyslexie', icon: '/images/dyslexia.png' },
                    { key: 'rowHeight', label: language === 'en' ? 'Row Height' : 'Zeilenhöhe', fullLabel: language === 'en' ? 'Max Height' : 'Max. Höhe', icon: '/images/row-height.png' },
                    { key: 'focusIndicator', label: language === 'en' ? 'Focus Indicator' : 'Fokus-Anzeige', fullLabel: language === 'en' ? 'Strong Focus' : 'Starker Fokus', icon: '/images/focus.png' }
                  ].map(setting => {
                    const isActive = accessibility[setting.key] > 0;
                    const isFull = setting.key === 'blueLightFilter' ? accessibility[setting.key] === 5 : accessibility[setting.key] === 2;
                    const isImageIcon = typeof setting.icon === 'string';
                    const isBinary = setting.isBinary === true;
                    const maxLevel = setting.key === 'blueLightFilter' ? 5 : 2;
                  
                    return (
                      <button 
                        key={setting.key}
                        onClick={() => toggleAccessibility(setting.key)}
                        aria-pressed={isActive}
                        aria-label={`${setting.label}${isActive ? ` - ${isFull ? setting.fullLabel || setting.label : language === 'en' ? 'Enabled' : 'Aktiviert'}` : ''}`}
                        className={`flex flex-col items-center gap-2 p-3 rounded-2xl transition-all border-2 text-sm font-medium ${
                          !isActive 
                            ? (isDarkTheme ? 'bg-transparent border-gray-700/40 hover:border-blue-400/40' : 'bg-gray-50 border-gray-200 hover:border-blue-400/40')
                            : (isDarkTheme ? 'bg-blue-500/20 border-blue-400' : 'bg-blue-100 border-blue-400')
                        }`}
                      >
                        <div className="w-8 h-8 rounded-md flex items-center justify-center" style={{ background: isActive ? 'linear-gradient(90deg,#3b82f6,#2563eb)' : 'transparent' }}>
                          {isImageIcon ? (
                            <img src={setting.icon} alt={setting.label} width="24" height="24" loading="lazy" className={`w-6 h-6 ${isActive ? 'brightness-0 invert' : ''}`} />
                          ) : (
                            <setting.icon className={`w-6 h-6 ${isActive ? 'text-white' : (isDarkTheme ? 'text-gray-400' : 'text-gray-600')}`} />
                          )}
                        </div>
                        <span className={`text-xs text-center leading-tight ${isActive ? (isDarkTheme ? 'text-blue-100' : 'text-blue-900') : (isDarkTheme ? 'text-gray-300' : 'text-gray-700')}`}>
                          {!isActive ? setting.label : (isFull && !isBinary ? (setting.fullLabel || setting.label) : setting.label)}
                        </span>
                        {/* Intensity bars - 1 for binary, 2-5 for gradual */}
                        <div className="flex gap-0.5 mt-2">
                          <span className={`h-1 rounded-sm transition-all ${accessibility[setting.key] >= 1 ? 'bg-blue-600 w-3' : (isDarkTheme ? 'bg-gray-700/30 w-2' : 'bg-gray-300 w-2')}`} />
                          {!isBinary && (
                            <>
                              <span className={`h-1 rounded-sm transition-all ${accessibility[setting.key] >= 2 ? 'bg-blue-600 w-3' : (isDarkTheme ? 'bg-gray-700/30 w-2' : 'bg-gray-300 w-2')}`} />
                              {setting.key === 'blueLightFilter' && (
                                <>
                                  <span className={`h-1 rounded-sm transition-all ${accessibility[setting.key] >= 3 ? 'bg-blue-600 w-3' : (isDarkTheme ? 'bg-gray-700/30 w-2' : 'bg-gray-300 w-2')}`} />
                                  <span className={`h-1 rounded-sm transition-all ${accessibility[setting.key] >= 4 ? 'bg-blue-600 w-3' : (isDarkTheme ? 'bg-gray-700/30 w-2' : 'bg-gray-300 w-2')}`} />
                                  <span className={`h-1 rounded-sm transition-all ${accessibility[setting.key] >= 5 ? 'bg-blue-600 w-3' : (isDarkTheme ? 'bg-gray-700/30 w-2' : 'bg-gray-300 w-2')}`} />
                                </>
                              )}
                            </>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Reset Button */}
                <button
                  onClick={resetAccessibility}
                  className={`w-full mt-6 py-2.5 px-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 border ${isDarkTheme ? 'bg-blue-600/20 text-blue-100 border-blue-500/40 hover:bg-blue-600/30' : 'bg-blue-100 text-blue-900 border-blue-300 hover:bg-blue-200'}`}
                >
                  <RotateCcw className="w-4 h-4" />
                  {language === 'en' ? 'Reset All' : 'Alle zurücksetzen'}
                </button>
              <a href="/accessibility" className={`block text-center text-sm mt-3 ${isDarkTheme ? 'text-blue-300 hover:text-blue-200' : 'text-blue-600 hover:text-blue-700'}`}>
                {language === 'en' ? 'Learn more' : 'Mehr erfahren'}
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Floating Accessibility Button - Desktop only (hidden on mobile, use expandable FAB) */}
      <div className="fixed left-6 bottom-6 z-50 max-md:hidden">
          {isAccessibilityOpen && (
            <div 
              className="absolute bottom-20 left-0 w-80 rounded-3xl shadow-2xl backdrop-blur-xl mb-4 overflow-hidden flex flex-col border"
              style={{
                background: isDarkTheme ? 'rgba(15,23,42,0.95)' : 'rgba(255,255,255,0.98)',
                borderColor: 'rgba(59,130,246,0.12)',
                maxHeight: '60vh'
              }}
            >
              {/* Header bar - BLUE */}
              <div 
                className="flex justify-between items-center px-4 py-3 border-b flex-shrink-0 min-h-[52px]" 
                style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)', borderColor: 'rgba(255,255,255,0.15)' }}
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
                    { key: 'largeText', label: language === 'en' ? 'Larger Text' : 'Größere Schrift', fullLabel: language === 'en' ? 'Large Text' : 'Große Schrift', icon: '/images/larger-font.png' },
                    { key: 'contrast', label: language === 'en' ? 'Contrast' : 'Kontrast', fullLabel: language === 'en' ? 'Full Contrast' : 'Voller Kontrast', icon: '/images/contrast.png' },
                    { key: 'blueLightFilter', label: language === 'en' ? 'Blue Light Filter' : 'Blaulichtfilter', fullLabel: language === 'en' ? 'Strong Filter' : 'Starker Filter', icon: '/images/white-balance.png?v=1' },
                    { key: 'mark', label: language === 'en' ? 'Mark Links' : 'Links markieren', icon: '/images/link.png', isBinary: true },
                    { key: 'textSpacing', label: language === 'en' ? 'Text Spacing' : 'Textabstand', fullLabel: language === 'en' ? 'Full Spacing' : 'Voller Abstand', icon: '/images/spacing.png' },
                    { key: 'stopAnimations', label: language === 'en' ? 'Stop Animations' : 'Animationen stoppen', icon: '/images/pause-button.png', isBinary: true },
                    { key: 'hideImages', label: language === 'en' ? 'Hide Images' : 'Bilder verbergen', icon: '/images/hide-images.png', isBinary: true },
                    { key: 'dyslexia', label: language === 'en' ? 'Dyslexia Font' : 'Dyslexie-Schrift', fullLabel: language === 'en' ? 'Full Dyslexia' : 'Voll Dyslexie', icon: '/images/dyslexia.png' },
                    { key: 'rowHeight', label: language === 'en' ? 'Row Height' : 'Zeilenhöhe', fullLabel: language === 'en' ? 'Max Height' : 'Max. Höhe', icon: '/images/row-height.png' },
                    { key: 'focusIndicator', label: language === 'en' ? 'Focus Indicator' : 'Fokus-Anzeige', fullLabel: language === 'en' ? 'Strong Focus' : 'Starker Fokus', icon: '/images/focus.png' }
                  ].map(setting => {
                    const isActive = accessibility[setting.key] > 0;
                    const isFull = setting.key === 'blueLightFilter' ? accessibility[setting.key] === 5 : accessibility[setting.key] === 2;
                    const isImageIcon = typeof setting.icon === 'string';
                    const isBinary = setting.isBinary === true;
                    const maxLevel = setting.key === 'blueLightFilter' ? 5 : 2;
                  
                    return (
                      <button 
                        key={setting.key}
                        onClick={() => toggleAccessibility(setting.key)}
                        aria-pressed={isActive}
                        aria-label={`${setting.label}${isActive ? ` - ${isFull ? setting.fullLabel || setting.label : language === 'en' ? 'Enabled' : 'Aktiviert'}` : ''}`}
                        className={`flex flex-col items-center gap-2 p-3 rounded-2xl transition-all border-2 text-sm font-medium ${
                          !isActive 
                            ? (isDarkTheme ? 'bg-transparent border-gray-700/40 hover:border-blue-400/40' : 'bg-gray-50 border-gray-200 hover:border-blue-400/40')
                            : (isDarkTheme ? 'bg-blue-500/20 border-blue-400' : 'bg-blue-100 border-blue-400')
                        }`}
                      >
                        <div className="w-8 h-8 rounded-md flex items-center justify-center" style={{ background: isActive ? 'linear-gradient(90deg,#3b82f6,#2563eb)' : 'transparent' }}>
                          {isImageIcon ? (
                            <img src={setting.icon} alt={setting.label} width="24" height="24" loading="lazy" className={`w-6 h-6 ${isActive ? 'brightness-0 invert' : ''}`} />
                          ) : (
                            <setting.icon className={`w-6 h-6 ${isActive ? 'text-white' : (isDarkTheme ? 'text-gray-400' : 'text-gray-600')}`} />
                          )}
                        </div>
                        <span className={`text-xs text-center leading-tight ${isActive ? (isDarkTheme ? 'text-blue-100' : 'text-blue-900') : (isDarkTheme ? 'text-gray-300' : 'text-gray-700')}`}>
                          {!isActive ? setting.label : (isFull && !isBinary ? (setting.fullLabel || setting.label) : setting.label)}
                        </span>
                        {/* Intensity bars - 1 for binary, 2-5 for gradual */}
                        <div className="flex gap-0.5 mt-2">
                          <span className={`h-1 rounded-sm transition-all ${accessibility[setting.key] >= 1 ? 'bg-blue-600 w-3' : (isDarkTheme ? 'bg-gray-700/30 w-2' : 'bg-gray-300 w-2')}`} />
                          {!isBinary && (
                            <>
                              <span className={`h-1 rounded-sm transition-all ${accessibility[setting.key] >= 2 ? 'bg-blue-600 w-3' : (isDarkTheme ? 'bg-gray-700/30 w-2' : 'bg-gray-300 w-2')}`} />
                              {setting.key === 'blueLightFilter' && (
                                <>
                                  <span className={`h-1 rounded-sm transition-all ${accessibility[setting.key] >= 3 ? 'bg-blue-600 w-3' : (isDarkTheme ? 'bg-gray-700/30 w-2' : 'bg-gray-300 w-2')}`} />
                                  <span className={`h-1 rounded-sm transition-all ${accessibility[setting.key] >= 4 ? 'bg-blue-600 w-3' : (isDarkTheme ? 'bg-gray-700/30 w-2' : 'bg-gray-300 w-2')}`} />
                                  <span className={`h-1 rounded-sm transition-all ${accessibility[setting.key] >= 5 ? 'bg-blue-600 w-3' : (isDarkTheme ? 'bg-gray-700/30 w-2' : 'bg-gray-300 w-2')}`} />
                                </>
                              )}
                            </>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Reset Button */}
                <button
                  onClick={resetAccessibility}
                  className={`w-full mt-6 py-2.5 px-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 border ${isDarkTheme ? 'bg-blue-600/20 text-blue-100 border-blue-500/40 hover:bg-blue-600/30' : 'bg-blue-100 text-blue-900 border-blue-300 hover:bg-blue-200'}`}
                >
                  <RotateCcw className="w-4 h-4" />
                  {language === 'en' ? 'Reset All' : 'Alle zurücksetzen'}
                </button>
                <a href="/accessibility" className={`block text-center text-sm mt-3 ${isDarkTheme ? 'text-blue-300 hover:text-blue-200' : 'text-blue-600 hover:text-blue-700'}`}>
                  {language === 'en' ? 'Learn more' : 'Mehr erfahren'}
                </a>
              </div>
            </div>
          )}

        {/* Floating Button */}
        {featuresEnabled && (
          <button
            onClick={() => setIsAccessibilityOpen(!isAccessibilityOpen)}
            className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-white transition-all duration-300 relative group ${
              isAccessibilityOpen ? 'scale-95' : 'hover:scale-110'
            }`}
            style={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
              boxShadow: isDarkTheme 
                ? '0 4px 12px rgba(59, 130, 246, 0.4), inset 0 1px 2px rgba(255, 255, 255, 0.1)' 
                : '0 4px 15px rgba(59, 130, 246, 0.35), inset 0 1px 2px rgba(255, 255, 255, 0.2)'
            }}
            aria-label={language === 'en' ? 'Accessibility options' : 'Barrierefreiheitsoptionen'}
            title={language === 'en' ? 'Accessibility' : 'Barrierefreiheit'}
          >
            <img src="/images/accessibility.png?v=2" alt="Accessibility" width="64" height="64" loading="lazy" className="w-[60px] h-[60px] brightness-0 invert" style={{ objectFit: 'contain' }} />
            {/* Subtle border effect */}
            <div 
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                border: '2px solid rgba(255, 255, 255, 0.15)',
                boxShadow: 'inset 0 0 20px rgba(255, 255, 255, 0.05)'
              }}
            />
          </button>
        )}
      </div>

      {/* Floating AI Buttons - hidden on mobile (use expandable FAB) */}
      {featuresEnabled && (
        <div className="fixed right-6 bottom-6 z-50 flex flex-col gap-3 max-md:hidden">
          {/* Navitoir Button */}
          <button
            onClick={() => setIsNavitoirOpen(true)}
            className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-white transition-all duration-300 relative group ${
              isNavitoirOpen ? 'scale-95' : 'hover:scale-110'
            }`}
            style={{
              background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
              boxShadow: isDarkTheme 
                ? '0 4px 12px rgba(99, 102, 241, 0.4), inset 0 1px 2px rgba(255, 255, 255, 0.1)' 
                : '0 4px 15px rgba(99, 102, 241, 0.35), inset 0 1px 2px rgba(255, 255, 255, 0.2)'
            }}
            aria-label={language === 'en' ? 'Navitoir - Navigation Assistant' : 'Navitoir - Navigationsassistent'}
            title={language === 'en' ? 'Navitoir - Navigation Assistant' : 'Navitoir - Navigationsassistent'}
          >
            <Navigation className="w-6 h-6" />
            {/* Subtle border effect */}
            <div 
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                border: '2px solid rgba(255, 255, 255, 0.15)',
                boxShadow: 'inset 0 0 20px rgba(255, 255, 255, 0.05)'
              }}
            />
          </button>

          {/* AI Assistant Button */}
          <button
            onClick={() => setIsChatOpen(true)}
            className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-white transition-all duration-300 relative group ${
              isChatOpen ? 'scale-95' : 'hover:scale-110'
            }`}
            style={{
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              boxShadow: isDarkTheme 
                ? '0 4px 12px rgba(16, 185, 129, 0.4), inset 0 1px 2px rgba(255, 255, 255, 0.1)' 
                : '0 4px 15px rgba(16, 185, 129, 0.35), inset 0 1px 2px rgba(255, 255, 255, 0.2)'
            }}
            aria-label={language === 'en' ? 'AI Assistant' : 'KI-Assistent'}
            title={language === 'en' ? 'AI Assistant' : 'KI-Assistent'}
          >
            <img src="/images/ai.png" alt="AI Assistant" width="51" height="51" loading="lazy" className="w-[51px] h-[51px] brightness-0 invert" />
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
      )}

      {/* Mobile: single FAB that expands to Accessibility, Navitoir, AI */}
      {featuresEnabled && (
        <div className="fixed right-6 bottom-24 z-50 md:hidden flex flex-col items-end gap-3">
          {fabExpanded && (
            <>
              <button 
                onClick={() => { setFabExpanded(false); setIsAccessibilityOpen(true); }} 
                className="w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg transition-all hover:scale-110 active:scale-95 border-2 border-white/30" 
                style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)', boxShadow: '0 4px 15px rgba(59, 130, 246, 0.4)' }} 
                aria-label={language === 'en' ? 'Accessibility' : 'Barrierefreiheit'}
              >
                <img src="/images/accessibility.png?v=2" alt="" width="40" height="40" className="w-10 h-10 brightness-0 invert" />
              </button>
              <button 
                onClick={() => { setFabExpanded(false); setIsNavitoirOpen(true); }} 
                className="w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg transition-all hover:scale-110 active:scale-95 border-2 border-white/30" 
                style={{ background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)', boxShadow: '0 4px 15px rgba(99, 102, 241, 0.4)' }} 
                aria-label="Navitoir"
              >
                <Navigation className="w-10 h-10" />
              </button>
              <button 
                onClick={() => { setFabExpanded(false); setIsChatOpen(true); }} 
                className="w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg transition-all hover:scale-110 active:scale-95 border-2 border-white/30" 
                style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', boxShadow: '0 4px 15px rgba(16, 185, 129, 0.4)' }} 
                aria-label={language === 'en' ? 'AI Assistant' : 'KI-Assistent'}
              >
                <img src="/images/ai.png" alt="" width="40" height="40" className="w-10 h-10 brightness-0 invert" />
              </button>
            </>
          )}
          <button 
            onClick={() => setFabExpanded(!fabExpanded)} 
            className={`w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg transition-all hover:scale-110 active:scale-95 border-2 border-white/30 ${fabExpanded ? 'bg-gray-600' : 'bg-indigo-600'}`} 
            aria-label={language === 'en' ? 'Features' : 'Funktionen'} 
            aria-expanded={fabExpanded}
            style={{ boxShadow: fabExpanded ? '0 4px 15px rgba(75, 85, 99, 0.4)' : '0 4px 15px rgba(99, 102, 241, 0.4)' }}
          >
            <Plus className={`w-10 h-10 transition-transform duration-300 ${fabExpanded ? 'rotate-45' : ''}`} />
          </button>
        </div>
      )}
      
      {/* Navitoir Modal */}
      {isNavitoirOpen && (
        <div className="fixed inset-0 z-[60] flex items-end md:items-center justify-center md:p-4" onClick={() => setIsNavitoirOpen(false)}>
          <div 
            className={`relative w-full md:max-w-md max-h-[75vh] h-[65vh] md:h-[500px] rounded-t-3xl md:rounded-3xl shadow-2xl flex flex-col overflow-hidden ${isDarkTheme ? 'bg-gray-900' : 'bg-white'}`}
            style={{ border: '3px solid #6366f1' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className={`flex items-center justify-between p-4 border-b flex-shrink-0 ${isDarkTheme ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gradient-to-r from-indigo-50 to-purple-50'}`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
                  <Navigation className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className={`font-bold ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>Navitoir</h3>
                  <p className={`text-xs ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>{language === 'en' ? 'Navigation Assistant' : 'Navigationsassistent'}</p>
                </div>
              </div>
              <button onClick={() => setIsNavitoirOpen(false)} className={`p-2 rounded-lg transition-colors ${isDarkTheme ? 'hover:bg-gray-700 text-gray-400 hover:text-white' : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'}`} aria-label="Close Navitoir">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className={`flex-1 overflow-y-auto p-4 space-y-4 ${isDarkTheme ? 'bg-gray-900' : 'bg-gray-50'}`}>
              {navitoirMessages.map((message, index) => (
                <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${message.role === 'user' ? 'bg-indigo-600 text-white' : isDarkTheme ? 'bg-gray-800 text-gray-200 border border-gray-700' : 'bg-white text-gray-900 border border-gray-200 shadow-sm'}`}>
                    <div className="text-sm leading-relaxed prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: sanitizeChatHtml(formatChatMessage(message.content)) }} />
                  </div>
                </div>
              ))}
              {navitoirLoading && (
                <div className="flex justify-start">
                  <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${isDarkTheme ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200 shadow-sm'}`}>
                    <span className="text-sm text-gray-500">{language === 'en' ? 'Thinking…' : 'Denke…'}</span>
                  </div>
                </div>
              )}
              <div ref={navitoirEndRef} />
            </div>

            {/* Input Form */}
            <form onSubmit={handleNavitoirSubmit} className={`p-4 border-t flex-shrink-0 ${isDarkTheme ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
              <div className="flex flex-wrap gap-2 mb-2">
                {[ { v: language === 'en' ? 'projects' : 'projekte', l: language === 'en' ? 'Projects' : 'Projekte' }, { v: language === 'en' ? 'contact' : 'kontakt', l: language === 'en' ? 'Contact' : 'Kontakt' }, { v: language === 'en' ? 'open cv' : 'öffne lebenslauf', l: language === 'en' ? 'Open CV' : 'Lebenslauf öffnen' }, { v: language === 'en' ? 'certifications' : 'zertifikate', l: language === 'en' ? 'Certifications' : 'Zertifikate' } ].map(({ v, l }) => (
                  <button key={v} type="button" onClick={() => handleNavitoirSubmit({ preventDefault: () => {} }, v)} className={`px-3 py-1.5 rounded-lg text-xs font-medium border ${isDarkTheme ? 'bg-gray-800 border-gray-600 text-gray-300 hover:border-indigo-500' : 'bg-gray-100 border-gray-300 text-gray-700 hover:border-indigo-400'}`}>{l}</button>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  ref={navitoirInputRef}
                  type="text"
                  inputMode="text"
                  autoComplete="off"
                  autoCapitalize="sentences"
                  value={navitoirInput}
                  onChange={(e) => setNavitoirInput(e.target.value)}
                  placeholder={language === 'en' ? 'Search or navigate to a section...' : 'Suchen oder zu einem Bereich navigieren...'}
                  className={`flex-1 px-4 py-3 rounded-xl border transition-colors ${isDarkTheme ? 'bg-gray-900 border-gray-700 text-white placeholder-gray-500 focus:border-indigo-500' : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400 focus:border-indigo-500'} focus:outline-none focus:ring-2 focus:ring-indigo-500/20`}
                />
                <button
                  type="submit"
                  disabled={navitoirLoading || !navitoirInput.trim()}
                  className="px-5 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* AI Chatbot Modal */}
      {isChatOpen && (
        <div className="fixed inset-0 z-[60] flex items-end md:items-center justify-center md:p-4" onClick={() => setIsChatOpen(false)}>
          <div 
            className={`relative w-full md:max-w-md max-h-[75vh] h-[65vh] md:h-[500px] rounded-t-3xl md:rounded-3xl shadow-2xl flex flex-col overflow-hidden ${isDarkTheme ? 'bg-gray-900' : 'bg-white'}`}
            style={{ border: '3px solid #10b981' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className={`flex items-center justify-between p-4 border-b ${isDarkTheme ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gradient-to-r from-green-50 to-emerald-50'}`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
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

            {/* Chat Messages */}
            <div className={`flex-1 overflow-y-auto p-4 space-y-4 ${isDarkTheme ? 'bg-gray-900' : 'bg-gray-50'}`}>
              {chatMessages.map((message, index) => (
                <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${message.role === 'user' ? 'bg-green-600 text-white' : isDarkTheme ? 'bg-gray-800 text-gray-200 border border-gray-700' : 'bg-white text-gray-900 border border-gray-200 shadow-sm'}`}>
                    <div className="text-sm leading-relaxed prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: sanitizeChatHtml(formatChatMessage(message.content)) }} />
                    {message.role === 'assistant' && (
                      <button
                        type="button"
                        onClick={() => { try { navigator.clipboard?.writeText(message.content); setToast?.({ text: language === 'en' ? 'Copied' : 'Kopiert' }); } catch (_) {} }}
                        className={`mt-2 text-xs ${isDarkTheme ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'} flex items-center gap-1`}
                        aria-label={language === 'en' ? 'Copy' : 'Kopieren'}
                      >
                        <Copy className="w-3 h-3" /> {language === 'en' ? 'Copy' : 'Kopieren'}
                      </button>
                    )}
                  </div>
                </div>
              ))}
              {chatLoading && (
                <div className="flex justify-start">
                  <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${isDarkTheme ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200 shadow-sm'}`}>
                    {reducedMotion ? (
                      <span className="text-sm text-gray-500">…</span>
                    ) : (
                      <div className="flex gap-2">
                        <div className={`w-2 h-2 rounded-full animate-bounce ${isDarkTheme ? 'bg-gray-500' : 'bg-gray-400'}`} style={{ animationDelay: '0ms' }} />
                        <div className={`w-2 h-2 rounded-full animate-bounce ${isDarkTheme ? 'bg-gray-500' : 'bg-gray-400'}`} style={{ animationDelay: '150ms' }} />
                        <div className={`w-2 h-2 rounded-full animate-bounce ${isDarkTheme ? 'bg-gray-500' : 'bg-gray-400'}`} style={{ animationDelay: '300ms' }} />
                      </div>
                    )}
                  </div>
                </div>
              )}
              {chatLastFailed && chatMessages.length > 0 && chatMessages[chatMessages.length - 1]?.isError && (
                <div className="flex justify-start">
                  <button type="button" onClick={() => handleChatSubmit({ preventDefault: () => {} }, chatLastFailed)} className="px-4 py-2 rounded-xl bg-green-600 text-white text-sm font-medium hover:bg-green-700">
                    {language === 'en' ? 'Retry' : 'Erneut versuchen'}
                  </button>
                </div>
              )}
              {chatMessages.length > 0 && chatMessages[chatMessages.length - 1]?.role === 'assistant' && chatMessages[chatMessages.length - 1]?.poweredBy === 'openai' && (
                <p className="text-xs text-gray-500">Powered by OpenAI. AI may make mistakes.</p>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input Form */}
            <form onSubmit={handleChatSubmit} className={`p-4 border-t ${isDarkTheme ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
              <div className="flex gap-2">
                <input
                  ref={chatInputRef}
                  type="text"
                  inputMode="text"
                  autoComplete="off"
                  autoCapitalize="sentences"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder={language === 'en' ? 'Ask about skills, experience, education...' : 'Fragen Sie über Fähigkeiten, Erfahrung, Ausbildung...'}
                  className={`flex-1 px-4 py-3 rounded-xl border transition-colors ${isDarkTheme ? 'bg-gray-900 border-gray-700 text-white placeholder-gray-500 focus:border-green-500' : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400 focus:border-green-500'} focus:outline-none focus:ring-2 focus:ring-green-500/20`}
                  disabled={chatLoading}
                />
                <button
                  type="submit"
                  disabled={chatLoading || !chatInput.trim()}
                  className="px-5 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}


