'use client';

import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../lib/LanguageContext';
import { projects, site } from '../lib/content';
import ProjectCard from './ProjectCard';
import Reveal from './Reveal';

function Metric({ value, suffix, label }) {
  const ref = useRef(null);
  const [n, setN] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        const start = performance.now();
        const tick = (now) => {
          const p = Math.min(1, (now - start) / 1100);
          setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        io.disconnect();
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);

  return (
    <div className="metric" ref={ref}>
      <p className="metric-value">
        {n}
        <span>{suffix}</span>
      </p>
      <p className="metric-label">{label}</p>
    </div>
  );
}

export default function HomePage() {
  const { language, t } = useLanguage();
  const featured = projects.filter((p) => p.featured).slice(0, 5);

  return (
    <>
      <section className="hero">
        <div className="hero-plane" aria-hidden="true" />
        <div className="hero-inner">
          <div className="hero-copy">
            <p className="hero-brand reveal reveal-in">{t.hero.brand}</p>
            <h1 className="hero-title reveal reveal-in" style={{ transitionDelay: '80ms' }}>
              {t.hero.role}
            </h1>
            <p className="hero-line reveal reveal-in" style={{ transitionDelay: '160ms' }}>
              {t.hero.line}
            </p>
            <div className="hero-ctas reveal reveal-in" style={{ transitionDelay: '240ms' }}>
              <Link href="/projects" className="btn-primary">
                {t.hero.ctaWork}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/contact" className="btn-ghost">
                {t.hero.ctaContact}
              </Link>
              <Link href="/cv" className="btn-text">
                {t.hero.ctaCv}
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="hero-visual reveal reveal-in" style={{ transitionDelay: '200ms' }}>
            <div className="hero-portrait">
              <img src="/images/profile.jpg?v=3" alt={site.name} />
            </div>
            <div className="hero-float-card">
              <p>Node Center · Berlin</p>
              <p>Freelance Instructional Designer</p>
            </div>
          </div>
        </div>
        <div className="hero-marquee" aria-hidden="true">
          <div className="marquee-track">
            {['Articulate 360', 'SAM', 'ADDIE', 'Microlearning', 'Rise', 'Premiere Pro', 'LXD', 'WCAG'].map(
              (item) => (
                <span key={item}>{item}</span>
              )
            )}
            {['Articulate 360', 'SAM', 'ADDIE', 'Microlearning', 'Rise', 'Premiere Pro', 'LXD', 'WCAG'].map(
              (item) => (
                <span key={`${item}-2`}>{item}</span>
              )
            )}
          </div>
        </div>
      </section>

      <section className="section featured-section">
        <div className="section-inner">
          <Reveal className="section-head">
            <p className="eyebrow">{t.featured.title}</p>
            <div className="section-head-row">
              <h2>{t.featured.desc}</h2>
              <Link href="/projects" className="btn-ghost">
                {t.featured.all}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>
          <div className="featured-grid">
            {featured.map((p, i) => (
              <Reveal key={p.id} delay={i * 70} className={i === 0 ? 'featured-span' : ''}>
                <ProjectCard project={p} index={i} large={i === 0} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section about-section">
        <div className="section-inner about-grid">
          <Reveal>
            <p className="eyebrow">{t.about.title}</p>
            <h2 className="about-title">{t.about.body}</h2>
          </Reveal>
          <Reveal delay={120} className="metrics-panel">
            <p className="eyebrow">{t.metrics.title}</p>
            <div className="metrics-row">
              {t.metrics.items.map((m) => (
                <Metric key={m.label} {...m} />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section cta-band">
        <div className="section-inner">
          <Reveal className="cta-band-inner">
            <h2>{language === 'de' ? 'Bereit für das nächste Lernprojekt?' : 'Ready for the next learning project?'}</h2>
            <Link href="/contact" className="btn-primary">
              {t.hero.ctaContact}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
