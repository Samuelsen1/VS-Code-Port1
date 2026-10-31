'use client';

import { useMemo, useState } from 'react';
import { useLanguage } from '../lib/LanguageContext';
import { categories, projects } from '../lib/content';
import ProjectCard from './ProjectCard';
import Reveal from './Reveal';

export default function ProjectsPage() {
  const { language, t } = useLanguage();
  const [filter, setFilter] = useState('all');

  const filtered = useMemo(() => {
    if (filter === 'all') return projects;
    return projects.filter((p) => p.category === filter);
  }, [filter]);

  return (
    <section className="section page-hero">
      <div className="section-inner">
        <Reveal className="page-intro">
          <p className="eyebrow">{t.projectsPage.title}</p>
          <h1>{t.projectsPage.desc}</h1>
        </Reveal>

        <Reveal delay={80} className="filter-row">
          <button
            type="button"
            className={filter === 'all' ? 'is-active' : ''}
            onClick={() => setFilter('all')}
          >
            {t.projectsPage.filterAll}
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              className={filter === c.id ? 'is-active' : ''}
              onClick={() => setFilter(c.id)}
            >
              {c[language]}
            </button>
          ))}
        </Reveal>

        <div className="projects-grid">
          {filtered.map((p, i) => (
            <Reveal key={p.id} delay={Math.min(i * 50, 300)}>
              <ProjectCard project={p} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
