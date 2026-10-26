import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './awards.css';

// Both from the resume. To show the real certificate later, add
// `image: certificateImg` (an import from ../assets) and it replaces the medal.
const AWARDS = [
  {
    id: 'anokhya',
    rank: 1,
    place: '1st place',
    event: 'Anokhya 2.0',
    project: 'Lame Rides',
    summary: 'A public transport app built around route planning and real-time bus tracking, taken from user research to a high-fidelity prototype.',
    tools: 'Figma · User research · Prototyping',
    url: 'https://www.behance.net/gallery/235221947/Lame-Rides',
    metal: 'gold',
    tilt: -3,
  },
  {
    id: 'tech-desafio',
    rank: 3,
    place: '3rd place',
    event: 'Tech Desafío',
    project: 'Connect Smart',
    summary: 'A smart-home management concept with customisable dashboards and automation controls, backed by a full design system.',
    tools: 'Figma · Interaction design · Design system',
    url: 'https://www.behance.net/gallery/253824175/Connect-Smart',
    metal: 'bronze',
    tilt: 2.5,
  },
];

function Medal({ rank, metal }){
  return (
    <svg className={`award-medal award-medal-${metal}`} viewBox="0 0 120 150" aria-hidden="true">
      <path d="M38 0h18l14 46H52Z" className="award-ribbon-a" />
      <path d="M82 0H64L50 46h18Z" className="award-ribbon-b" />
      <circle cx="60" cy="96" r="44" className="award-disc" />
      <circle cx="60" cy="96" r="35" className="award-disc-inner" />
      <text x="60" y="110" textAnchor="middle" className="award-disc-text">{rank}</text>
    </svg>
  );
}

// A framed award hanging on the wall. It sways when you point at it and
// flips over (click or tap) to show the project behind it.
function AwardFrame({ award, index, hasHover }){
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      className="award-hang"
      initial={{ opacity: 0, y: -40, rotate: award.tilt * 3 }}
      whileInView={{ opacity: 1, y: 0, rotate: award.tilt }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ type: 'spring', stiffness: 90, damping: 9, delay: index * 0.15 }}
      whileHover={hasHover && !flipped ? { rotate: [award.tilt, award.tilt - 4, award.tilt + 3, award.tilt - 1.5, award.tilt], transition: { duration: 1.2 } } : undefined}
      style={{ transformOrigin: '50% 0%' }}
    >
      <svg className="award-string" viewBox="0 0 200 60" preserveAspectRatio="none" aria-hidden="true">
        <path d="M30 60 L100 6 L170 60" />
        <circle cx="100" cy="6" r="5" />
      </svg>

      <motion.div
        className="award-card"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <button
          type="button"
          className="award-face award-front"
          onClick={() => setFlipped(true)}
          aria-label={`${award.place}, ${award.event}. Show the project`}
          aria-hidden={flipped}
          tabIndex={flipped ? -1 : 0}
          style={{ pointerEvents: flipped ? 'none' : 'auto' }}
          data-cursor="link"
          data-cursor-label="Flip"
        >
          <span className="award-kicker">Inter-college UI/UX competition</span>
          {award.image ? (
            <img className="award-image" src={award.image} alt="" />
          ) : (
            <Medal rank={award.rank} metal={award.metal} />
          )}
          <span className="award-place">{award.place}</span>
          <span className="award-event">{award.event}</span>
        </button>

        <div className="award-face award-back" aria-hidden={!flipped} style={{ pointerEvents: flipped ? 'auto' : 'none' }}>
          <span className="award-kicker">{award.place} · {award.event}</span>
          <h3 className="award-project">{award.project}</h3>
          <p className="award-summary">{award.summary}</p>
          <p className="award-tools">{award.tools}</p>
          <div className="award-back-row">
            <a
              href={award.url}
              target="_blank"
              rel="noreferrer"
              className="award-link"
              tabIndex={flipped ? 0 : -1}
              data-cursor="link"
            >
              See it on Behance &rarr;
            </a>
            <button
              type="button"
              className="award-flip-back"
              onClick={() => setFlipped(false)}
              tabIndex={flipped ? 0 : -1}
              data-cursor="link"
            >
              Flip back
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Awards(){
  const [hasHover, setHasHover] = useState(true);

  useEffect(() => {
    setHasHover(window.matchMedia('(hover: hover) and (pointer: fine)').matches);
  }, []);

  return (
    <section id="awards" className="awards">
      <div className="container">
        <motion.div
          className="awards-head"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="label">Awards</span>
          <h2 className="awards-title">
            Two podiums, <span className="accent-italic">both for design.</span>
          </h2>
          <p className="awards-hint">{hasHover ? 'Click a frame to turn it over' : 'Tap a frame to turn it over'}</p>
        </motion.div>

        <div className="awards-wall">
          {AWARDS.map((a, i) => (
            <AwardFrame key={a.id} award={a} index={i} hasHover={hasHover} />
          ))}
        </div>
      </div>
    </section>
  );
}
