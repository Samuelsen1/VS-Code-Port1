'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';
import { copy } from '../lib/content';

export default function ProjectCard({ project, index = 0, large = false }) {
  const { language } = useLanguage();
  const t = copy[language].projectsPage;
  const href = project.link || (project.requestOnly ? '/contact' : null);
  const Wrapper = href ? (href.startsWith('/') ? Link : 'a') : 'div';
  const wrapperProps = href
    ? href.startsWith('/')
      ? { href }
      : { href, target: '_blank', rel: 'noopener noreferrer' }
    : {};

  return (
    <Wrapper
      {...wrapperProps}
      className={`project-card group ${large ? 'project-card-large' : ''}`}
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="project-card-media">
        <img
          src={project.image}
          alt={project.title[language]}
          loading="lazy"
          decoding="async"
        />
        <div className="project-card-veil" />
        <span className="project-card-badge">{project.subtitle[language]}</span>
      </div>
      <div className="project-card-body">
        <h3>{project.title[language]}</h3>
        <p>{project.description[language]}</p>
        <div className="project-card-meta">
          <span className="project-card-tools">
            {project.tools.slice(0, 4).join(' · ')}
          </span>
          <span className="project-card-cta">
            {project.requestOnly ? t.request : t.open}
            <ArrowUpRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </Wrapper>
  );
}
