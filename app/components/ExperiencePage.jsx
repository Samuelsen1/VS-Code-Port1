'use client';

import { ExternalLink } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';
import { certifications, education, experience, skills } from '../lib/content';
import Reveal from './Reveal';

export default function ExperiencePage() {
  const { language, t } = useLanguage();

  return (
    <section className="section page-hero">
      <div className="section-inner">
        <Reveal className="page-intro">
          <p className="eyebrow">{t.experiencePage.title}</p>
          <h1>{t.experiencePage.desc}</h1>
        </Reveal>

        <div className="experience-layout">
          <div className="timeline">
            {experience.map((job, i) => (
              <Reveal key={job.company + job.date.en} delay={i * 60} className="timeline-item">
                <div className="timeline-dot" />
                <div className="timeline-card">
                  <div className="timeline-top">
                    <div>
                      <h3>{job.title[language]}</h3>
                      <p className="timeline-company">{job.company}</p>
                    </div>
                    <span className={`timeline-date ${job.current ? 'is-current' : ''}`}>
                      {job.date[language]}
                    </span>
                  </div>
                  <ul>
                    {job.bullets[language].map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                  {job.references && (
                    <div className="ref-links">
                      {job.references.map((r) => (
                        <a key={r.url} href={r.url} target="_blank" rel="noopener noreferrer">
                          {r.label}
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>

          <aside className="experience-aside">
            <Reveal className="aside-block">
              <h2>{t.experiencePage.education}</h2>
              {education.map((ed) => (
                <div key={ed.date} className="edu-card">
                  <h3>{ed.title[language]}</h3>
                  <p>{ed.school[language]}</p>
                  <p className="muted">{ed.date} · {ed.grade[language]}</p>
                  <p className="thesis">{ed.thesis[language]}</p>
                </div>
              ))}
            </Reveal>

            <Reveal delay={100} className="aside-block">
              <h2>{t.experiencePage.certifications}</h2>
              <div className="cert-list">
                {certifications.map((c) => (
                  <a key={c.link} href={c.link} target="_blank" rel="noopener noreferrer" className="cert-card">
                    <img src={c.image} alt="" />
                    <div>
                      <h3>{c.title}</h3>
                      <p>{c.issuer}</p>
                      <p className="muted">{c.date}</p>
                    </div>
                  </a>
                ))}
              </div>
            </Reveal>

            <Reveal delay={140} className="aside-block">
              <h2>{language === 'de' ? 'Kompetenzen' : 'Skills'}</h2>
              <div className="skills-stack">
                {skills.map((s) => (
                  <div key={s.title.en}>
                    <h3>{s.title[language]}</h3>
                    <p>{s.items.join(' · ')}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </aside>
        </div>
      </div>
    </section>
  );
}
