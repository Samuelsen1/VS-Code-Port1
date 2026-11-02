'use client';

import { useCallback, useEffect, useState } from 'react';
import { RotateCcw, X } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

const DEFAULTS = {
  contrast: 0,
  mark: 0,
  largeText: 0,
  textSpacing: 0,
  stopAnimations: 0,
  hideImages: 0,
  dyslexia: 0,
  rowHeight: 0,
  focusIndicator: 0,
  blueLightFilter: 0,
};

const BINARY = ['mark', 'stopAnimations', 'hideImages'];

export default function AccessibilityPanel() {
  const { language } = useLanguage();
  const [open, setOpen] = useState(false);
  const [accessibility, setAccessibility] = useState(DEFAULTS);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('accessibility');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === 'object') {
          setAccessibility((prev) => ({ ...prev, ...parsed }));
        }
      }
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('accessibility', JSON.stringify(accessibility));
    } catch {
      /* ignore */
    }
  }, [accessibility]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => {
    const root = document.documentElement;
    document.getElementById('a11y-reduced-motion')?.remove();

    const filters = [];
    if (accessibility.contrast > 0) {
      filters.push(`contrast(${1 + (accessibility.contrast === 1 ? 0.25 : 0.5)})`);
    }
    root.style.filter = filters.length ? filters.join(' ') : '';

    if (accessibility.blueLightFilter > 0) {
      let style = document.getElementById('a11y-blue-light-filter');
      if (!style) {
        style = document.createElement('style');
        style.id = 'a11y-blue-light-filter';
        document.head.appendChild(style);
      }
      const opacityMap = { 1: 0.1, 2: 0.15, 3: 0.2, 4: 0.25, 5: 0.3 };
      const opacity = opacityMap[accessibility.blueLightFilter] || 0.15;
      style.textContent = `
        html::before {
          content: '';
          position: fixed;
          inset: 0;
          width: 100%;
          height: 100%;
          background: rgba(255, 200, 100, ${opacity});
          pointer-events: none;
          z-index: 999999;
          mix-blend-mode: multiply;
        }
      `;
    } else {
      document.getElementById('a11y-blue-light-filter')?.remove();
    }

    root.style.fontSize = accessibility.largeText > 0
      ? accessibility.largeText === 1 ? '110%' : '120%'
      : '100%';

    if (accessibility.textSpacing > 0) {
      const multiplier = accessibility.textSpacing === 1 ? 1 : 1.5;
      root.style.letterSpacing = `${0.15 * multiplier}em`;
      root.style.wordSpacing = `${0.5 * multiplier}em`;
      if (accessibility.rowHeight === 0) {
        root.style.lineHeight = `${1.8 * (multiplier * 0.8)}`;
      }
    } else {
      root.style.letterSpacing = 'normal';
      root.style.wordSpacing = 'normal';
      if (accessibility.rowHeight === 0) root.style.lineHeight = 'normal';
    }

    if (accessibility.stopAnimations > 0) {
      let style = document.getElementById('a11y-disable-animations');
      if (!style) {
        style = document.createElement('style');
        style.id = 'a11y-disable-animations';
        document.head.appendChild(style);
      }
      style.textContent = '* { animation: none !important; transition: none !important; }';
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
      let style = document.getElementById('a11y-dyslexia-font');
      if (!style) {
        style = document.createElement('style');
        style.id = 'a11y-dyslexia-font';
        document.head.appendChild(style);
      }
      style.textContent = accessibility.dyslexia === 1
        ? `* { font-family: "Lexend", "Trebuchet MS", sans-serif !important; letter-spacing: 0.08em !important; word-spacing: 0.2em !important; }`
        : `* { font-family: "Lexend", "Trebuchet MS", sans-serif !important; letter-spacing: 0.15em !important; word-spacing: 0.4em !important; font-weight: 500 !important; }
           p, span, div, li, td, th { font-size: 1.05em !important; }`;
    } else {
      document.getElementById('a11y-dyslexia-font')?.remove();
      document.getElementById('lexend-font')?.remove();
    }

    if (accessibility.rowHeight > 0) {
      let style = document.getElementById('a11y-row-height');
      if (!style) {
        style = document.createElement('style');
        style.id = 'a11y-row-height';
        document.head.appendChild(style);
      }
      const height = accessibility.rowHeight === 1 ? 2 : 2.5;
      style.textContent = `* { line-height: ${height} !important; }`;
    } else {
      document.getElementById('a11y-row-height')?.remove();
      if (accessibility.textSpacing > 0) {
        const multiplier = accessibility.textSpacing === 1 ? 1 : 1.5;
        root.style.lineHeight = `${1.8 * (multiplier * 0.8)}`;
      }
    }

    document.querySelectorAll('a').forEach((link) => {
      if (accessibility.mark > 0) {
        link.style.outline = '2px solid #0000FF';
        link.style.outlineOffset = '2px';
      } else {
        link.style.outline = '';
        link.style.outlineOffset = '';
      }
    });

    if (accessibility.focusIndicator > 0) {
      let style = document.getElementById('a11y-focus-indicator');
      if (!style) {
        style = document.createElement('style');
        style.id = 'a11y-focus-indicator';
        document.head.appendChild(style);
      }
      const thickness = accessibility.focusIndicator === 1 ? '2px' : '4px';
      const color = accessibility.focusIndicator === 1 ? '#1a74b8' : '#ff0000';
      style.textContent = `
        *:focus-visible, button:focus, a:focus, input:focus {
          outline: ${thickness} solid ${color} !important;
          outline-offset: 2px !important;
        }
      `;
    } else {
      document.getElementById('a11y-focus-indicator')?.remove();
    }
  }, [accessibility]);

  const toggle = useCallback((setting) => {
    setAccessibility((prev) => {
      if (BINARY.includes(setting)) {
        return { ...prev, [setting]: prev[setting] === 0 ? 1 : 0 };
      }
      if (setting === 'blueLightFilter') {
        return { ...prev, [setting]: prev[setting] >= 5 ? 0 : prev[setting] + 1 };
      }
      return {
        ...prev,
        [setting]: prev[setting] === 0 ? 1 : prev[setting] === 1 ? 2 : 0,
      };
    });
  }, []);

  const reset = () => setAccessibility(DEFAULTS);

  const settings = [
    { key: 'largeText', label: language === 'en' ? 'Larger Text' : 'Größere Schrift', fullLabel: language === 'en' ? 'Large Text' : 'Große Schrift', icon: '/images/larger-font.png' },
    { key: 'contrast', label: language === 'en' ? 'Contrast' : 'Kontrast', fullLabel: language === 'en' ? 'Full Contrast' : 'Voller Kontrast', icon: '/images/contrast.png' },
    { key: 'blueLightFilter', label: language === 'en' ? 'Blue Light Filter' : 'Blaulichtfilter', fullLabel: language === 'en' ? 'Strong Filter' : 'Starker Filter', icon: '/images/white-balance.png?v=1' },
    { key: 'mark', label: language === 'en' ? 'Mark Links' : 'Links markieren', icon: '/images/link.png', isBinary: true },
    { key: 'textSpacing', label: language === 'en' ? 'Text Spacing' : 'Textabstand', fullLabel: language === 'en' ? 'Full Spacing' : 'Voller Abstand', icon: '/images/spacing.png' },
    { key: 'stopAnimations', label: language === 'en' ? 'Stop Animations' : 'Animationen stoppen', icon: '/images/pause-button.png', isBinary: true },
    { key: 'hideImages', label: language === 'en' ? 'Hide Images' : 'Bilder verbergen', icon: '/images/hide-images.png', isBinary: true },
    { key: 'dyslexia', label: language === 'en' ? 'Dyslexia Font' : 'Dyslexie-Schrift', fullLabel: language === 'en' ? 'Full Dyslexia' : 'Voll Dyslexie', icon: '/images/dyslexia.png' },
    { key: 'rowHeight', label: language === 'en' ? 'Row Height' : 'Zeilenhöhe', fullLabel: language === 'en' ? 'Max Height' : 'Max. Höhe', icon: '/images/row-height.png' },
    { key: 'focusIndicator', label: language === 'en' ? 'Focus Indicator' : 'Fokus-Anzeige', fullLabel: language === 'en' ? 'Strong Focus' : 'Starker Fokus', icon: '/images/focus.png' },
  ];

  const panel = (
    <div className="a11y-panel" role="dialog" aria-label={language === 'en' ? 'Accessibility' : 'Barrierefreiheit'}>
      <div className="a11y-panel-head">
        <h3>{language === 'en' ? 'Accessibility' : 'Barrierefreiheit'}</h3>
        <button type="button" onClick={() => setOpen(false)} aria-label="Close">
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="a11y-panel-body">
        <div className="a11y-grid">
          {settings.map((setting) => {
            const level = accessibility[setting.key];
            const isActive = level > 0;
            const isFull = setting.key === 'blueLightFilter' ? level === 5 : level === 2;
            const isBinary = setting.isBinary === true;
            return (
              <button
                key={setting.key}
                type="button"
                className={`a11y-tile ${isActive ? 'is-active' : ''}`}
                onClick={() => toggle(setting.key)}
                aria-pressed={isActive}
              >
                <span className="a11y-tile-icon">
                  <img src={setting.icon} alt="" width="24" height="24" />
                </span>
                <span className="a11y-tile-label">
                  {isActive && isFull && !isBinary ? setting.fullLabel || setting.label : setting.label}
                </span>
                <span className="a11y-bars" aria-hidden="true">
                  <i className={level >= 1 ? 'on' : ''} />
                  {!isBinary && (
                    <>
                      <i className={level >= 2 ? 'on' : ''} />
                      {setting.key === 'blueLightFilter' && (
                        <>
                          <i className={level >= 3 ? 'on' : ''} />
                          <i className={level >= 4 ? 'on' : ''} />
                          <i className={level >= 5 ? 'on' : ''} />
                        </>
                      )}
                    </>
                  )}
                </span>
              </button>
            );
          })}
        </div>
        <button type="button" className="a11y-reset" onClick={reset}>
          <RotateCcw className="w-4 h-4" />
          {language === 'en' ? 'Reset All' : 'Alle zurücksetzen'}
        </button>
        <a href="/accessibility" className="a11y-more">
          {language === 'en' ? 'Learn more' : 'Mehr erfahren'}
        </a>
      </div>
    </div>
  );

  return (
    <div className={`a11y-fab-wrap ${open ? 'is-open' : ''}`}>
      {open && (
        <>
          <button
            type="button"
            className="a11y-backdrop"
            aria-label="Close accessibility panel"
            onClick={() => setOpen(false)}
          />
          <div className="a11y-panel-slot">{panel}</div>
        </>
      )}
      <button
        type="button"
        className={`a11y-fab ${open ? 'is-open' : ''}`}
        onClick={() => setOpen((v) => !v)}
        aria-label={language === 'en' ? 'Accessibility options' : 'Barrierefreiheitsoptionen'}
        aria-expanded={open}
      >
        <img src="/images/accessibility.png?v=2" alt="" width="56" height="56" />
      </button>
    </div>
  );
}
