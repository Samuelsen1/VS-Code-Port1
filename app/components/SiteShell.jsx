'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';
import { site } from '../lib/content';
import ChatWidget from './ChatWidget';
import AccessibilityPanel from './AccessibilityPanel';

const links = [
  { href: '/projects', key: 'work' },
  { href: '/experience', key: 'experience' },
  { href: '/contact', key: 'contact' },
];

export default function SiteShell({ children }) {
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isCv = pathname?.startsWith('/cv');

  return (
    <div className="site-root">
      <div className="ambient" aria-hidden="true">
        <span className="orb orb-a" />
        <span className="orb orb-b" />
        <span className="grain" />
      </div>

      <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="site-header-inner">
          <Link href="/" className="brand">
            <span className="brand-mark">S</span>
            <span className="brand-text">{site.name}</span>
          </Link>

          <nav className="site-nav" aria-label="Main">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={pathname === l.href ? 'is-active' : ''}
              >
                {t.nav[l.key]}
              </Link>
            ))}
            <Link href="/cv" className="nav-cv">
              {t.nav.cv}
            </Link>
          </nav>

          <div className="header-actions">
            <div className="lang-toggle" role="group" aria-label="Language">
              <button
                type="button"
                className={language === 'en' ? 'is-active' : ''}
                onClick={() => setLanguage('en')}
              >
                EN
              </button>
              <button
                type="button"
                className={language === 'de' ? 'is-active' : ''}
                onClick={() => setLanguage('de')}
              >
                DE
              </button>
            </div>
            <button
              type="button"
              className="menu-btn"
              onClick={() => setOpen((v) => !v)}
              aria-label="Menu"
              aria-expanded={open}
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="mobile-nav">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className={pathname === l.href ? 'is-active' : ''}>
                {t.nav[l.key]}
              </Link>
            ))}
            <Link href="/cv">{t.nav.cv}</Link>
          </div>
        )}
      </header>

      <main className={isCv ? 'main-cv' : 'main-site'}>{children}</main>

      {!isCv && (
        <footer className="site-footer">
          <div className="site-footer-inner">
            <div>
              <p className="footer-brand">{site.name}</p>
              <p className="footer-tag">{t.footer.tag}</p>
            </div>
            <div className="footer-links">
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
              <a href={site.github} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
              <a href={`mailto:${site.email}`}>Email</a>
            </div>
            <p className="footer-copy">{t.footer.rights}</p>
          </div>
        </footer>
      )}

      <AccessibilityPanel />
      <ChatWidget />
    </div>
  );
}
