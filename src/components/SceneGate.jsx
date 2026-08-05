import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import './sceneGate.css';

// Five real projects, trimmed to what a recruiter needs at a glance --
// full detail lives on the resume, not crammed onto a departure board.
// Each is paired with a Bangalore locality for the route-step flavor.
const PROJECTS = [
  {
    id: 'lame-rides',
    name: 'Lame Rides',
    description: 'Public Transport App',
    tools: ['Figma', 'User Research', 'Prototyping'],
    station: 'Majestic',
    url: 'https://www.behance.net/gallery/235221947/Lame-Rides',
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
    url: 'https://www.behance.net/gallery/235214143/MyGlow',
  },
  {
    id: 'flow-sheet',
    name: 'Flow Sheet',
    description: 'Sales Management App',
    tools: ['Figma', 'Wireframing', 'Prototyping'],
    station: 'Cubbon Park',
    url: 'https://www.behance.net/gallery/235670135/Flow-Sheet',
  },
  {
    id: 'hocon-erp',
    name: 'Hocon-ERP',
    description: 'Full-Stack ERP App',
    tools: ['React.js', 'Node.js', 'PostgreSQL'],
    station: 'Whitefield',
  },
];

// Drawn, not photographed -- but styled after the real thing: Namma
// Metro's actual livery is a purple/maroon nose with headlights, a
// silver-grey body, a red accent stripe, and black tinted windows.
// Sized to sit inside the scene, not to swallow the page.
function TrainIllustration(){
  return (
    <svg className="ts-train" viewBox="0 0 1880 190" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="tsBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d7d9dc" />
          <stop offset="100%" stopColor="#aeb2b8" />
        </linearGradient>
        <linearGradient id="tsNose" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#5c1f45" />
          <stop offset="100%" stopColor="#8c2f66" />
        </linearGradient>
      </defs>

      {/* ===== car 1 (lead car, with the nose) ===== */}
      <path d="M150,30 H690 Q710,30 710,52 V148 Q710,168 690,168 H150 Z" fill="url(#tsBody)" stroke="#3a3c40" strokeWidth="2" />
      <rect x="150" y="24" width="560" height="10" rx="5" fill="#8a8e94" />

      {/* nose (aerodynamic front) */}
      <path d="M150,30 Q60,34 24,80 Q10,100 24,120 Q60,166 150,168 Z" fill="url(#tsNose)" stroke="#3a1530" strokeWidth="2" />
      <rect x="52" y="70" width="66" height="40" rx="8" fill="#171018" opacity="0.9" />
      <circle cx="46" cy="132" r="8" fill="#ffe9a8" stroke="#3a1530" strokeWidth="1.5" />
      <circle cx="76" cy="140" r="7" fill="#ffe9a8" stroke="#3a1530" strokeWidth="1.5" />
      <rect x="40" y="52" width="30" height="10" rx="4" fill="#e6425e" />

      {/* window band, car 1 */}
      {Array.from({ length: 8 }).map((_, i) => (
        <rect key={`c1-w-${i}`} x={168 + i * 66} y="52" width="50" height="40" rx="6" fill="#15171a" stroke="#3a3c40" />
      ))}

      {/* door seams, car 1 */}
      {Array.from({ length: 3 }).map((_, i) => (
        <rect key={`c1-d-${i}`} x={280 + i * 140} y="30" width="2" height="138" fill="#8a8e94" opacity="0.6" />
      ))}

      {/* accent stripe, car 1 */}
      <rect x="150" y="128" width="560" height="10" fill="#b3273e" />
      <rect x="150" y="128" width="560" height="3" fill="#f0c25a" />

      {/* coupler linking car 1 to car 2 */}
      <rect x="706" y="66" width="24" height="68" rx="3" fill="#26282c" />

      {/* ===== car 2 (trailing car) ===== */}
      <path d="M730,30 H1270 Q1280,30 1280,42 V158 Q1280,168 1270,168 H730 Q722,168 722,148 V52 Q722,30 730,30 Z" fill="url(#tsBody)" stroke="#3a3c40" strokeWidth="2" />
      <rect x="730" y="24" width="540" height="10" rx="5" fill="#8a8e94" />

      {/* window band, car 2 */}
      {Array.from({ length: 8 }).map((_, i) => (
        <rect key={`c2-w-${i}`} x={748 + i * 64} y="52" width="48" height="40" rx="6" fill="#15171a" stroke="#3a3c40" />
      ))}

      {/* door seams, car 2 */}
      {Array.from({ length: 3 }).map((_, i) => (
        <rect key={`c2-d-${i}`} x={858 + i * 140} y="30" width="2" height="138" fill="#8a8e94" opacity="0.6" />
      ))}

      {/* accent stripe, car 2 */}
      <rect x="730" y="128" width="550" height="10" fill="#b3273e" />
      <rect x="730" y="128" width="550" height="3" fill="#f0c25a" />

      {/* coupler linking car 2 to car 3 */}
      <rect x="1286" y="66" width="24" height="68" rx="3" fill="#26282c" />

      {/* ===== car 3 (trailing car, last in the rake) ===== */}
      <path d="M1310,30 H1850 Q1860,30 1860,42 V158 Q1860,168 1850,168 H1310 Q1302,168 1302,148 V52 Q1302,30 1310,30 Z" fill="url(#tsBody)" stroke="#3a3c40" strokeWidth="2" />
      <rect x="1310" y="24" width="540" height="10" rx="5" fill="#8a8e94" />

      {/* window band, car 3 */}
      {Array.from({ length: 8 }).map((_, i) => (
        <rect key={`c3-w-${i}`} x={1328 + i * 64} y="52" width="48" height="40" rx="6" fill="#15171a" stroke="#3a3c40" />
      ))}

      {/* door seams, car 3 */}
      {Array.from({ length: 3 }).map((_, i) => (
        <rect key={`c3-d-${i}`} x={1438 + i * 140} y="30" width="2" height="138" fill="#8a8e94" opacity="0.6" />
      ))}

      {/* accent stripe, car 3 */}
      <rect x="1310" y="128" width="550" height="10" fill="#b3273e" />
      <rect x="1310" y="128" width="550" height="3" fill="#f0c25a" />

      {/* rear cap -- rounded off, this is the last visible car */}
      <rect x="1858" y="52" width="8" height="96" rx="3" fill="#26282c" />

      {/* bogies + wheels, spread across all three cars */}
      {[110, 260, 420, 580, 780, 930, 1080, 1220, 1360, 1510, 1660, 1800].map((x) => (
        <g key={x}>
          <rect x={x} y="164" width="70" height="14" rx="3" fill="#1c1d20" />
          <circle cx={x + 12} cy="182" r="9" fill="#0e0e10" stroke="#3a3c40" strokeWidth="2" />
          <circle cx={x + 58} cy="182" r="9" fill="#0e0e10" stroke="#3a3c40" strokeWidth="2" />
        </g>
      ))}
    </svg>
  );
}

// A click-triggered gate -- "Scene?" + a button. Click it and the doors
// slide apart to reveal the train showcase behind them, in the same
// section (not a separate page further down). Scrolling past afterwards
// closes the doors again, so it resets if you scroll back up to it.
export default function SceneGate(){
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const sectionRef = useRef(null);
  const project = PROJECTS[index];

  useEffect(() => {
    const el = sectionRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
          setOpen(false);
        }
      },
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const go = (delta) => {
    setDirection(delta);
    setIndex((i) => (i + delta + PROJECTS.length) % PROJECTS.length);
  };

  const jumpTo = (i) => {
    if (i === index) return;
    setDirection(i > index ? 1 : -1);
    setIndex(i);
  };

  return (
    <section id="best-work" className="gate-scene" ref={sectionRef}>
      <div className="gate-peek" aria-hidden="true" />

      {open && (
        <motion.div
          className="train-showcase"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.55 }}
        >
          <span className="label ts-label">Best Work</span>
          <h2 className="ts-heading">Five projects, one route.</h2>

          <div className="ts-route">
            <div className="ts-route-line" aria-hidden="true" />
            {PROJECTS.map((p, i) => (
              <button
                key={p.id}
                type="button"
                className={`ts-route-stop ${i === index ? 'is-active' : ''}`}
                onClick={() => jumpTo(i)}
                data-cursor="link"
              >
                <span className="ts-route-node">
                  {i === index && (
                    <motion.span className="ts-route-ring" layoutId="ts-route-ring" transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} />
                  )}
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M12 22s7-7.5 7-12.5A7 7 0 0 0 5 9.5C5 14.5 12 22 12 22Z" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </span>
                <span className="ts-route-label">{p.station}</span>
              </button>
            ))}
          </div>

          <div className="ts-stage">
            <button type="button" className="ts-arrow ts-arrow-left" onClick={() => go(-1)} aria-label="Previous project" data-cursor="link">
              &#8592;
            </button>

            <div className="ts-platform">
              <AnimatePresence mode="wait">
                <motion.div
                  key={project.id + '-welcome'}
                  className="ts-welcome-strip"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  <span>Welcome to Namma Metro</span>
                  <span className="ts-welcome-next">Next destination: {project.station}</span>
                </motion.div>
              </AnimatePresence>

              <div className="ts-board-clip">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={project.id}
                    className="ts-board-group"
                    custom={direction}
                    initial={{ x: direction > 0 ? '110%' : '-110%', opacity: 0.4 }}
                    animate={{ x: '0%', opacity: 1 }}
                    exit={{ x: direction > 0 ? '-110%' : '110%', opacity: 0.4 }}
                    transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
                  >
                    <div className="ts-sign">
                      <span className="ts-sign-station">{project.station}</span>
                      <span className="ts-sign-name">{project.name}</span>
                    </div>

                    <div className="ts-info">
                      <div className="ts-info-head">
                        <span>Project Info</span>
                        <span className="ts-info-badge">{String(index + 1).padStart(2, '0')}</span>
                      </div>
                      <p className="ts-info-desc">{project.description}</p>
                      <ul className="ts-info-tools">
                        {project.tools.map((t, i) => (
                          <li key={t}>
                            <span className={`ts-info-icon ${i % 2 === 0 ? 'is-a' : 'is-b'}`} />
                            {t}
                          </li>
                        ))}
                      </ul>
                      {project.url ? (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noreferrer"
                          className="ts-view"
                          data-cursor="link"
                        >
                          View &rarr;
                        </a>
                      ) : (
                        <span className="ts-view-disabled" title="Case study coming soon">View &rarr;</span>
                      )}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <TrainIllustration />
              <div className="ts-track" aria-hidden="true" />
            </div>

            <button type="button" className="ts-arrow ts-arrow-right" onClick={() => go(1)} aria-label="Next project" data-cursor="link">
              &#8594;
            </button>
          </div>
        </motion.div>
      )}

      <motion.div
        className="gate-door gate-door-left"
        animate={{ x: open ? '-100%' : '0%' }}
        transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
      >
        <div className="gate-door-stripe" />
      </motion.div>
      <motion.div
        className="gate-door gate-door-right"
        animate={{ x: open ? '100%' : '0%' }}
        transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
      >
        <div className="gate-door-stripe" />
      </motion.div>

      <motion.div
        className="gate-content"
        animate={{ opacity: open ? 0 : 1, scale: open ? 0.9 : 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{ pointerEvents: open ? 'none' : 'auto' }}
      >
        <h2 className="gate-title">Scene?</h2>
        <motion.button
          type="button"
          className="gate-button"
          onClick={() => setOpen(true)}
          data-cursor="link"
          animate={{ scale: [1, 1.06, 1], boxShadow: [
            '0 0 0 0 rgba(176,141,90,0.5)',
            '0 0 0 14px rgba(176,141,90,0)',
            '0 0 0 0 rgba(176,141,90,0)',
          ] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          Lessgooo
        </motion.button>
      </motion.div>
    </section>
  );
}
