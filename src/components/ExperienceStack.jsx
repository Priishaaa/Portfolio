import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './experienceStack.css';

// Pulled straight from the resume -- edit copy here if anything changes.
const EXPERIENCES = [
  {
    id: 'lxl',
    company: 'Lxl Ideas',
    role: 'Designer Intern',
    tag: 'Sept – Oct 2024',
    theme: 'cream',
    base: { top: 0, left: 0, rotate: -3 },
    points: [
      'Designed intuitive user interfaces for the Krayon educational app in Figma, focused on accessibility, responsive layouts, and seamless user journeys.',
      'Redesigned the product landing page, improving information hierarchy and visual consistency.',
      'Collaborated with developers and content teams to translate design concepts into implementation while maintaining a consistent design system.',
    ],
  },
  {
    id: 'hocon',
    company: 'Hocon Technologies',
    role: 'UI/UX Designer & Full-Stack Developer Intern',
    tag: 'Apr – Aug 2026',
    theme: 'amber',
    base: { top: 40, left: 40, rotate: 2 },
    points: [
      "Designed UI and contributed to development of the company's in-house ERP application, collaborating on business requirements.",
      'Worked on authentication, project dashboards, issue tracking, and dependency management modules.',
      'Designed PostgreSQL schemas, managed databases in pgAdmin, and tested API endpoints with Postman for seamless integration.',
      'Collaborated with stakeholders to gather requirements and improve workflows through iterative development.',
    ],
  },
];

function ExperienceCard({ exp, expandedId, setExpandedId, hasHover }){
  const isExpanded = expandedId === exp.id;
  const isDimmed = expandedId && !isExpanded;

  const toggle = () => setExpandedId(isExpanded ? null : exp.id);

  const target = isExpanded
    ? { x: 0, y: 0, rotate: 0, scale: 1.04, zIndex: 30, opacity: 1 }
    : isDimmed
      ? { x: exp.base.left + 10, y: exp.base.top + 16, rotate: exp.base.rotate * 1.4, scale: 0.92, zIndex: 5, opacity: 0.55 }
      : { x: exp.base.left, y: exp.base.top, rotate: exp.base.rotate, scale: 1, zIndex: 10, opacity: 1 };

  return (
    <motion.article
      className={`exp-card exp-card-${exp.theme}`}
      animate={target}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => hasHover && setExpandedId(exp.id)}
      onMouseLeave={() => hasHover && setExpandedId(null)}
      onClick={() => !hasHover && toggle()}
      data-cursor="link"
    >
      <span className="exp-corner-tag">{exp.tag}</span>

      <div className="exp-card-head">
        <span className="exp-company">{exp.company}</span>
        <span className="exp-role">{exp.role}</span>
      </div>

      <div className={`exp-detail ${isExpanded ? 'is-open' : ''}`}>
        <div className="exp-detail-inner">
          <ul>
            {exp.points.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
        </div>
      </div>
    </motion.article>
  );
}

// A small paper note that hangs from a hook, top-right of the section --
// a direct shortcut for anyone skimming rather than reading. Scrolls to
// the graphics showcase.
function BestWorkHint(){
  const goToBestWork = (e) => {
    e.preventDefault();
    const el = document.querySelector('#graphics');
    if (!el) return;
    if (window.__lenis) window.__lenis.scrollTo(el, { offset: -20 });
    else el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="best-work-hook-wrap">
      <span className="best-work-hook" aria-hidden="true" />
      <span className="best-work-string" aria-hidden="true" />
      <motion.a
        href="#graphics"
        className="best-work-hint"
        onClick={goToBestWork}
        data-cursor="link"
        animate={{ rotate: [-3, 3, -3] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: 'top center' }}
      >
        <span className="best-work-pin" aria-hidden="true" />
        Worth a look — but if you&apos;re short on time, jump to the next section for my best work.
      </motion.a>
    </div>
  );
}

export default function ExperienceStack(){
  const [expandedId, setExpandedId] = useState(null);
  const [hasHover, setHasHover] = useState(true);

  useEffect(() => {
    setHasHover(window.matchMedia('(hover: hover) and (pointer: fine)').matches);
  }, []);

  return (
    <section id="work" className="exp-scene">
      <BestWorkHint />

      <div className="container exp-container">
        <motion.span
          className="label"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          Projects
        </motion.span>
        <motion.h2
          className="exp-heading"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          <span className="exp-heading-w-wrap">
            <span className="exp-sticky-note" aria-hidden="true" />
            <span>W</span>
          </span>here ideas got real.
        </motion.h2>

        <motion.div
          className={`exp-stack ${expandedId ? 'has-expanded' : ''}`}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          {EXPERIENCES.map((exp) => (
            <ExperienceCard
              key={exp.id}
              exp={exp}
              expandedId={expandedId}
              setExpandedId={setExpandedId}
              hasHover={hasHover}
            />
          ))}
        </motion.div>

        {!hasHover && <p className="exp-hint">Tap a card to read more.</p>}
      </div>
    </section>
  );
}
