import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import './experienceStack.css';

// Pulled straight from the resume -- edit copy here if anything changes.
const EXPERIENCES = [
  {
    id: 'lxl',
    company: 'Lxl Ideas',
    role: 'Design Intern',
    tag: 'Sept – Oct 2024',
    theme: 'cream',
    base: { top: 0, left: 0, rotate: -3 },
    points: [
      'Designed accessible, responsive interfaces in Figma for the Krayon educational app, mapping clear user journeys for a non-technical audience.',
      "Rebuilt the product landing page's information hierarchy and visual system alongside developers and content teams, carrying the design through to implementation.",
    ],
  },
  {
    id: 'hocon',
    company: 'Hocon Technologies',
    role: 'UI Designer & Developer Intern',
    tag: 'Apr – Jul 2026',
    theme: 'amber',
    base: { top: 40, left: 40, rotate: 2 },
    points: [
      "Delivered four production interface modules (authentication, project dashboards, issue tracking, dependency management) for the company's in-house ERP, translating raw business requirements directly into shipped screens for a 21-person internal team.",
      'Built a reusable pattern library (cards, filters, modals) adopted across every module, and designed the PostgreSQL schema behind it, with every endpoint verified in Postman before a screen shipped.',
      'Scoped requirements directly with stakeholders and iterated designs against real usage feedback, eliminating the handoff cycle between design and build entirely, over a 4-month engagement.',
    ],
  },
];

function ExperienceCard({ exp, expandedId, setExpandedId, hasHover, offsetScale, onHeight }){
  const isExpanded = expandedId === exp.id;
  const isDimmed = expandedId && !isExpanded;
  const ref = useRef(null);

  // Report this card's height, so the stack can grow to fit it when it's open.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => onHeight(exp.id, el.offsetHeight));
    ro.observe(el);
    return () => ro.disconnect();
  }, [exp.id, onHeight]);

  const toggle = () => setExpandedId(isExpanded ? null : exp.id);
  // Phones: a smaller fan-out, so the back card doesn't spill past the screen edge.
  const left = exp.base.left * offsetScale;
  const top = exp.base.top * offsetScale;

  const target = isExpanded
    ? { x: 0, y: 0, rotate: 0, scale: 1.04, zIndex: 30, opacity: 1 }
    : isDimmed
      ? { x: left + 10 * offsetScale, y: top + 16, rotate: exp.base.rotate * 1.4, scale: 0.92, zIndex: 5, opacity: 0.55 }
      : { x: left, y: top, rotate: exp.base.rotate, scale: 1, zIndex: 10, opacity: 1 };

  return (
    <motion.article
      ref={ref}
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
  const [isNarrow, setIsNarrow] = useState(false);
  const [heights, setHeights] = useState({});

  useEffect(() => {
    setHasHover(window.matchMedia('(hover: hover) and (pointer: fine)').matches);
    const mq = window.matchMedia('(max-width: 520px)');
    const update = () => setIsNarrow(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const onHeight = useRef((id, h) => setHeights((prev) => (prev[id] === h ? prev : { ...prev, [id]: h }))).current;
  // Open card's height (it scales to 1.04) plus room for the card peeking behind it.
  const openHeight = expandedId && heights[expandedId] ? Math.ceil(heights[expandedId] * 1.04) + 48 : undefined;

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
          style={openHeight ? { height: openHeight } : undefined}
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
              offsetScale={isNarrow ? 0.4 : 1}
              onHeight={onHeight}
            />
          ))}
        </motion.div>

        {!hasHover && <p className="exp-hint">Tap a card to read more.</p>}
      </div>
    </section>
  );
}
