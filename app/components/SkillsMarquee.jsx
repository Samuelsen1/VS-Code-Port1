'use client';

const SKILLS = [
  'Articulate 360',
  'SAM',
  'ADDIE',
  'Microlearning',
  'Rise',
  'Premiere Pro',
  'LXD',
  'WCAG',
];

function SkillRow({ suffix = '' }) {
  // Enough items that one row is wider than typical viewports
  const items = [...SKILLS, ...SKILLS, ...SKILLS];
  return (
    <div className="marquee-row" aria-hidden={suffix ? true : undefined}>
      {items.map((item, i) => (
        <span key={`${suffix}${item}-${i}`}>{item}</span>
      ))}
    </div>
  );
}

export default function SkillsMarquee() {
  return (
    <div className="hero-marquee" aria-hidden="true">
      <div className="marquee-track">
        <SkillRow />
        <SkillRow suffix="b-" />
      </div>
    </div>
  );
}
