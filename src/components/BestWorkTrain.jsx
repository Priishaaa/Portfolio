import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import './bestWorkTrain.css';

// Five real projects, trimmed to just what a recruiter needs at a glance --
// full detail lives on the resume, not crammed onto a departure board.
// Each is paired with a Bangalore locality for the route-map flavor below.
const PROJECTS = [
  {
    id: 'lame-rides',
    name: 'Lame Rides',
    description: 'Public Transport App',
    tools: ['Figma', 'User Research', 'Prototyping'],
    station: 'Majestic',
  },
  {
    id: 'connect-smart',
    name: 'Connect Smart',
    description: 'Smart Home App',
    tools: ['Figma', 'Prototyping', 'Interaction Design'],
    station: 'Indiranagar',
  },
  {
    id: 'my-glow',
    name: 'My Glow',
    description: 'Beauty E-commerce App',
    tools: ['Figma', 'Wireframing', 'Prototyping'],
    station: 'MG Road',
  },
  {
    id: 'flow-sheet',
    name: 'Flow Sheet',
    description: 'Sales Management App',
    tools: ['Figma', 'Wireframing', 'Prototyping'],
    station: 'Cubbon Park',
  },
  {
    id: 'hocon-erp',
    name: 'Hocon-ERP',
    description: 'Full-Stack ERP App',
    tools: ['React.js', 'Node.js', 'PostgreSQL'],
    station: 'Whitefield',
  },
];

export default function BestWorkTrain(){
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const project = PROJECTS[index];

  const go = (delta) => {
    setDirection(delta);
    setIndex((i) => (i + delta + PROJECTS.length) % PROJECTS.length);
  };

  return (
    <section id="best-work" className="bw-scene">
      <motion.div
        className="bw-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="bw-wordmark">Namma Metro</span>
        <AnimatePresence mode="wait">
          <motion.span
            key={project.station}
            className="bw-current-station"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
          >
            {project.station}
          </motion.span>
        </AnimatePresence>
      </motion.div>

      <motion.div
        className="bw-route"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      >
        {PROJECTS.map((p, i) => (
          <button
            key={p.id}
            type="button"
            className={`bw-route-stop ${i === index ? 'is-active' : ''}`}
            onClick={() => { setDirection(i > index ? 1 : -1); setIndex(i); }}
            data-cursor="link"
          >
            {i === index && (
              <motion.span className="bw-route-pill" layoutId="bw-route-pill" transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} />
            )}
            <span className="bw-route-label">{p.station}</span>
          </button>
        ))}
      </motion.div>

      <div className="bw-stage">
        <button type="button" className="bw-arrow bw-arrow-left" onClick={() => go(-1)} aria-label="Previous project" data-cursor="link">
          &#8592;
        </button>

        <div className="bw-platform">
          <div className="bw-board">
            <span className="bw-view-disabled" title="Case study coming soon">View &rarr;</span>

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={project.id}
                className="bw-board-main"
                custom={direction}
                initial={{ x: direction > 0 ? 40 : -40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: direction > 0 ? -40 : 40, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="bw-project-name">{project.name}</span>
                <span className="bw-project-desc">{project.description}</span>
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.ul
                key={project.id + '-tools'}
                className="bw-tools"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                {project.tools.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </motion.ul>
            </AnimatePresence>
          </div>

          <div className="bw-train" aria-hidden="true">
            <div className="bw-train-roof" />
            <div className="bw-train-stripe" />
            <div className="bw-train-windows">
              {Array.from({ length: 6 }).map((_, i) => <span key={i} />)}
            </div>
            <div className="bw-train-base" />
            <div className="bw-train-wheels">
              <span /><span /><span /><span />
            </div>
          </div>
          <div className="bw-track" aria-hidden="true" />
        </div>

        <button type="button" className="bw-arrow bw-arrow-right" onClick={() => go(1)} aria-label="Next project" data-cursor="link">
          &#8594;
        </button>
      </div>
    </section>
  );
}
