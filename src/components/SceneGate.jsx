import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import './sceneGate.css';

// Seven real projects, trimmed to what a recruiter needs at a glance --
// full detail lives on the resume, not crammed onto a departure board.
// Each is paired with a Bangalore locality for the route-step flavor.
const PROJECTS = [
  {
    id: 'vibe',
    name: 'Vibe',
    description: 'Daily Mood-Tracking Social App',
    tools: ['React', 'Node.js', 'Web Push API'],
    station: 'Jayanagar',
    url: 'https://vibe-app-brown.vercel.app',
  },
  {
    id: 'hocon-erp',
    name: 'Hocon-ERP',
    description: 'Full-Stack ERP App',
    tools: ['React.js', 'Node.js', 'PostgreSQL'],
    station: 'Whitefield',
  },
  {
    id: 'mentioned',
    name: 'Mentioned',
    description: 'AI Visibility Web App',
    tools: ['React.js', 'Node.js', 'Gemini API'],
    station: 'Electronic City',
    url: 'https://mentioned-virid.vercel.app/',
  },
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
    url: 'https://www.behance.net/gallery/253824175/Connect-Smart',
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

// Bengaluru time for the platform board, ticking over each minute.
function useBengaluruTime(){
  const format = () => new Date().toLocaleTimeString('en-IN', {
    timeZone: 'Asia/Kolkata', hour: 'numeric', minute: '2-digit', hour12: true,
  });
  const [time, setTime] = useState(format);
  useEffect(() => {
    const id = setInterval(() => setTime(format()), 10000);
    return () => clearInterval(id);
  }, []);
  return time;
}

// A soft two-note "next station" chime, made in the browser (no audio file).
function playChime(ctx){
  const now = ctx.currentTime;
  [[659.25, 0], [523.25, 0.3]].forEach(([freq, at]) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0, now + at);
    gain.gain.linearRampToValueAtTime(0.16, now + at + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + at + 0.9);
    osc.connect(gain).connect(ctx.destination);
    osc.start(now + at);
    osc.stop(now + at + 1);
  });
}

const SOUND_KEY = 'metro-sound';

// A click-triggered gate -- "Scene?" + a button. Click it and the doors
// slide apart to reveal the train showcase behind them, in the same
// section (not a separate page further down). Scrolling past afterwards
// closes the doors again, so it resets if you scroll back up to it.
export default function SceneGate(){
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [inView, setInView] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const audioRef = useRef(null);
  const touchStart = useRef(null);
  const sectionRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const time = useBengaluruTime();
  const project = PROJECTS[index];

  useEffect(() => {
    // Sound stays off unless this visitor turned it on before.
    try { setSoundOn(localStorage.getItem(SOUND_KEY) === 'on'); } catch { /* storage blocked */ }
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.4 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

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

  // Drive the train: arrow keys on a keyboard, a sideways swipe on a phone.
  useEffect(() => {
    if (!open || !inView) return;
    const onKey = (e) => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      e.preventDefault();
      go(e.key === 'ArrowRight' ? 1 : -1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, inView]);

  const onTouchStart = (e) => {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };
  const onTouchEnd = (e) => {
    if (!touchStart.current) return;
    const dx = e.changedTouches[0].clientX - touchStart.current.x;
    const dy = e.changedTouches[0].clientY - touchStart.current.y;
    touchStart.current = null;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) go(dx < 0 ? 1 : -1);
  };

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    try { localStorage.setItem(SOUND_KEY, next ? 'on' : 'off'); } catch { /* storage blocked */ }
    if (next) {
      audioRef.current ??= new (window.AudioContext || window.webkitAudioContext)();
      audioRef.current.resume();
      playChime(audioRef.current);
    }
  };

  // The chime plays as the train comes to a stop.
  const onTrainStopped = (definition) => {
    if (soundOn && audioRef.current && definition?.x === '0%') playChime(audioRef.current);
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
          <h2 className="ts-heading">Seven projects, one route.</h2>

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

            <div className="ts-platform" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
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
                  <span className="ts-clock" aria-label={`Bengaluru time ${time}`}>{time}</span>
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

              {/* The train leaves the platform and the next one pulls in, slowing to a stop. */}
              <div className="ts-train-clip">
                <AnimatePresence mode="wait" custom={direction} initial={false}>
                  <motion.div
                    key={project.id}
                    className="ts-train-run"
                    initial={reduceMotion ? false : { x: direction > 0 ? '105%' : '-105%' }}
                    animate={{ x: '0%' }}
                    exit={reduceMotion ? undefined : { x: direction > 0 ? '-105%' : '105%', transition: { duration: 0.45, ease: [0.55, 0, 1, 0.45] } }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    onAnimationComplete={onTrainStopped}
                  >
                    <TrainIllustration />
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="ts-track" aria-hidden="true" />
            </div>

            <button type="button" className="ts-arrow ts-arrow-right" onClick={() => go(1)} aria-label="Next project" data-cursor="link">
              &#8594;
            </button>
          </div>

          <div className="ts-controls">
            <button
              type="button"
              className={`ts-sound ${soundOn ? 'is-on' : ''}`}
              onClick={toggleSound}
              aria-pressed={soundOn}
              data-cursor="link"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M4 9v6h4l5 4V5L8 9H4Z" fill="currentColor" />
                {soundOn ? (
                  <path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                ) : (
                  <path d="m16 9 5 6m0-6-5 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                )}
              </svg>
              {soundOn ? 'Chime on' : 'Chime off'}
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
