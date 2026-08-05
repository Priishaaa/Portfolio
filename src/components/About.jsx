import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import './about.css';

const SEQUENCE = ['ideas', 'meaningful'];
const HOLD_MS = 2800;

// A small curled hint-arrow (not a straight one) that sits above a
// highlighted word. `flip` mirrors it for words on the right side of the line.
function CurlyArrow({ className = '', flip = false }){
  return (
    <svg
      className={`curly-arrow ${className}`}
      width="34"
      height="28"
      viewBox="0 0 34 28"
      fill="none"
      style={{ transform: flip ? 'scaleX(-1)' : 'none' }}
      aria-hidden="true"
    >
      <path
        d="M3 6c6 8 14 10 20 4-2 3-2 6 0 8"
        stroke="var(--accent)"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M17 15c1 2 3 3 6 3"
        stroke="var(--accent)"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

// The two little animated sequences that fill the blank right-hand panel,
// shown automatically as each word takes its turn glowing.
function IdeasReveal(){
  return (
    <motion.div
      className="reveal-flow"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="reveal-chip reveal-chip-note"
        initial={{ opacity: 0, y: 14, rotate: -6 }}
        animate={{ opacity: 1, y: 0, rotate: -4 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        Sticky notes
      </motion.div>

      <motion.svg
        className="reveal-arrow"
        width="54" height="24" viewBox="0 0 54 24" fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.25 }}
      >
        <motion.path d="M2 12h42" stroke="var(--accent)" strokeWidth="1.5" />
        <path d="M38 6l8 6-8 6" stroke="var(--accent)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </motion.svg>

      <motion.div
        className="reveal-chip reveal-chip-sketch"
        initial={{ opacity: 0, y: 14, rotate: 5 }}
        animate={{ opacity: 1, y: 0, rotate: 3 }}
        transition={{ duration: 0.4, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M4 20 L15 6 L19 10 L8 20 Z" stroke="currentColor" strokeWidth="1.6" />
          <path d="M14 7l3 3" stroke="currentColor" strokeWidth="1.6" />
        </svg>
        Sketches
      </motion.div>
    </motion.div>
  );
}

function MeaningfulReveal(){
  return (
    <motion.div
      className="reveal-mock"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="reveal-mock-head">
        <span className="reveal-mock-dot" />
        <span className="reveal-mock-dot" />
        <span className="reveal-mock-dot" />
        <span className="reveal-mock-title">Polished UI</span>
      </div>

      <div className="reveal-mock-body">
        <motion.span
          className="reveal-mock-toggle"
          animate={{ backgroundColor: ['#0c0c0d', '#b08d5a', '#0c0c0d'] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <motion.span
            className="reveal-mock-knob"
            animate={{ x: [0, 16, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.span>
        <span className="reveal-mock-caption">subtle micro-interactions</span>
      </div>
    </motion.div>
  );
}

export default function About(){
  const [started, setStarted] = useState(false);
  const [active, setActive] = useState(null);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    setActive(SEQUENCE[0]);
    const id = setInterval(() => {
      i = (i + 1) % SEQUENCE.length;
      setActive(SEQUENCE[i]);
    }, HOLD_MS);

    return () => clearInterval(id);
  }, [started]);

  return (
    <section id="about" className="about">
      <div className="container about-grid">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          onViewportEnter={() => setStarted(true)}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="label about-label">About</span>
          <p className="about-quote">
            I enjoy turning{' '}
            <span className="about-hover-wrap">
              <span className={`about-hot-word ${active === 'ideas' ? 'is-glowing' : ''}`}>
                IDEAS
              </span>
            </span>{' '}
            into digital experiences that feel intuitive and purposeful. Every
            project is another chance to learn, create, and make something{' '}
            <span className="about-hover-wrap">
              <CurlyArrow className="curly-arrow-meaningful" flip />
              <span className={`about-hot-word ${active === 'meaningful' ? 'is-glowing' : ''}`}>
                MEANINGFUL
              </span>
            </span>.
          </p>
        </motion.div>

        <motion.div
          className="about-reveal"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        >
          <AnimatePresence mode="wait">
            {active === 'ideas' && <IdeasReveal key="ideas" />}
            {active === 'meaningful' && <MeaningfulReveal key="meaningful" />}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
