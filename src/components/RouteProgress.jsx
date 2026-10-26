import { useEffect, useRef, useState } from 'react';
import './routeProgress.css';

// The whole page as one metro line: a station per section, and a train
// that rides down it as you scroll. Tap a station to go there.
const STATIONS = [
  { id: 'top', label: 'Home' },
  { id: 'work', label: 'Work' },
  { id: 'best-work', label: 'Metro' },
  { id: 'graphics', label: 'Cooked' },
  { id: 'awards', label: 'Awards' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

export default function RouteProgress(){
  const [progress, setProgress] = useState(0); // 0..1 along the line
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(false);
  const frame = useRef(0);

  useEffect(() => {
    const measure = () => {
      frame.current = 0;
      const els = STATIONS.map((s) => document.getElementById(s.id));
      if (els.some((el) => !el)) return;
      const tops = els.map((el) => el.getBoundingClientRect().top + window.scrollY);
      const anchor = window.scrollY + window.innerHeight * 0.5;
      const atBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4;

      let i = 0;
      while (i < tops.length - 1 && anchor >= tops[i + 1]) i++;
      const next = tops[i + 1];
      const part = next === undefined ? 0 : Math.min(1, Math.max(0, (anchor - tops[i]) / (next - tops[i])));
      const last = STATIONS.length - 1;

      setProgress(atBottom ? 1 : (i + part) / last);
      setCurrent(atBottom ? last : i);
      setVisible(window.scrollY > window.innerHeight * 0.5);
    };
    const onScroll = () => { if (!frame.current) frame.current = requestAnimationFrame(measure); };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(frame.current);
    };
  }, []);

  const goTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (window.__lenis) window.__lenis.scrollTo(el);
    else el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className={`route ${visible ? 'is-visible' : ''}`}
      aria-label="Page route"
      style={{ '--progress': progress }}
    >
      <div className="route-line" aria-hidden="true">
        <span className="route-line-done" />
      </div>
      <span className="route-train" aria-hidden="true" />
      <ol>
        {STATIONS.map((s, i) => (
          <li key={s.id} style={{ '--at': i / (STATIONS.length - 1) }}>
            <button
              type="button"
              className={`route-stop ${i === current ? 'is-current' : ''} ${i < current ? 'is-passed' : ''}`}
              onClick={() => goTo(s.id)}
              aria-current={i === current ? 'location' : undefined}
              tabIndex={visible ? 0 : -1}
              data-cursor="link"
            >
              <span className="route-dot" aria-hidden="true" />
              <span className="route-label">{s.label}</span>
            </button>
          </li>
        ))}
      </ol>
    </nav>
  );
}
