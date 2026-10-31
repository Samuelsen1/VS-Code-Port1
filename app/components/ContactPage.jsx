'use client';

import { Mail, Linkedin, MapPin, Phone, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';
import { site } from '../lib/content';
import Reveal from './Reveal';

export default function ContactPage() {
  const { t } = useLanguage();

  const items = [
    {
      icon: Mail,
      label: t.contactPage.email,
      value: site.email,
      href: `mailto:${site.email}`,
    },
    {
      icon: Linkedin,
      label: t.contactPage.linkedin,
      value: 'linkedin.com/in/samuel-o-4b9bbb2a8',
      href: site.linkedin,
      external: true,
    },
    {
      icon: Phone,
      label: t.contactPage.phone,
      value: site.phone,
      href: `tel:${site.phone.replace(/\s/g, '')}`,
    },
    {
      icon: MapPin,
      label: t.contactPage.location,
      value: site.location,
    },
  ];

  return (
    <section className="section page-hero contact-page">
      <div className="section-inner contact-layout">
        <Reveal className="page-intro">
          <p className="eyebrow">{t.nav.contact}</p>
          <h1>{t.contactPage.title}</h1>
          <p className="lead">{t.contactPage.desc}</p>
          <a href={`mailto:${site.email}`} className="btn-primary contact-main-cta">
            {t.contactPage.email}
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </Reveal>

        <div className="contact-cards">
          {items.map((item, i) => {
            const Icon = item.icon;
            const inner = (
              <>
                <span className="contact-icon">
                  <Icon className="w-5 h-5" />
                </span>
                <div>
                  <p className="contact-label">{item.label}</p>
                  <p className="contact-value">{item.value}</p>
                </div>
              </>
            );
            return (
              <Reveal key={item.label} delay={i * 70} className="contact-card">
                {item.href ? (
                  <a
                    href={item.href}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                  >
                    {inner}
                  </a>
                ) : (
                  <div>{inner}</div>
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
