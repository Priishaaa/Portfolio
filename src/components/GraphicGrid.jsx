import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import hushed from '../assets/graphics/hushed.webp';
import wave from '../assets/graphics/wave.webp';
import awPoster from '../assets/graphics/aw-poster.webp';
import brush from '../assets/graphics/brush.webp';
import './graphicGrid.css';

// Scattered placement for each card when revealed -- rough position (%),
// rotation, and a base z-index so they overlap like a loosely-tossed
// stack of prints rather than a tidy grid.
const DESIGNS = [
  { id: 'hushed', src: hushed, alt: 'Hushed — poster study', top: 18, left: 20, rotate: -6, z: 2 },
  { id: 'wave', src: wave, alt: 'Waveform — poster study', top: 12, left: 56, rotate: 4, z: 3 },
  { id: 'aw-poster', src: awPoster, alt: 'AW — poster study', top: 46, left: 12, rotate: 5, z: 1 },
  { id: 'brush', src: brush, alt: 'Brush — poster study', top: 44, left: 60, rotate: -4, z: 4 },
];

// Desktop: hover the section to reveal the prints, hover a print to lift it.
// Touch: the same reveal on a tap ("Tap to see magic"), then tap a print to
// bring it forward. Scrolling away resets it, so the reveal happens again.
export default function GraphicGrid(){
  const [revealed, setRevealed] = useState(false);
  const [hoveredId, setHoveredId] = useState(null);
  const [hasHover, setHasHover] = useState(true);
  const sectionRef = useRef(null);

  useEffect(() => {
    setHasHover(window.matchMedia('(hover: hover) and (pointer: fine)').matches);
  }, []);

  // Touch: put the prints away again once the section scrolls out of view.
  useEffect(() => {
    if (hasHover) return;
    const el = sectionRef.current;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) { setRevealed(false); setHoveredId(null); }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasHover]);

  return (
    <section
      id="graphics"
      ref={sectionRef}
      className={`grid-scene ${revealed ? 'is-revealed' : ''}`}
      onMouseEnter={() => hasHover && setRevealed(true)}
      onMouseLeave={() => { if (hasHover) { setRevealed(false); setHoveredId(null); } }}
      onClick={() => { if (!hasHover && !revealed) setRevealed(true); }}
    >
      <motion.h2
        className="grid-title"
        animate={{ opacity: revealed ? 0.25 : 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        Cooked
      </motion.h2>

      <motion.p
        className="grid-hint"
        animate={{ opacity: revealed ? 0 : 1, y: revealed ? 8 : 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        aria-hidden={revealed}
      >
        {hasHover ? 'Hover to see magic' : 'Tap to see magic'}
      </motion.p>

      <div className={`grid-cards ${revealed ? 'is-revealed' : ''}`}>
        {DESIGNS.map((d, i) => {
          const isHovered = hoveredId === d.id;
          const isDimmed = hoveredId && !isHovered;

          return (
            <motion.button
              key={d.id}
              type="button"
              className="grid-card"
              // Touch: grow from the outer corner, so a tapped print enlarges into the grid, not off-screen.
              style={hasHover
                ? { top: `${d.top}%`, left: `${d.left}%` }
                : { originX: i % 2 === 0 ? 0 : 1, originY: i < 2 ? 0 : 1 }}
              data-cursor="link"
              aria-label={d.alt}
              aria-pressed={hasHover ? undefined : isHovered}
              onMouseEnter={() => hasHover && setHoveredId(d.id)}
              onMouseLeave={() => hasHover && setHoveredId(null)}
              onClick={(e) => {
                if (hasHover) return;
                e.stopPropagation();
                setHoveredId(isHovered ? null : d.id);
              }}
              animate={{
                // A gentler tilt and lift on touch screens, where the prints sit in a tight grid.
                rotate: isHovered ? 0 : hasHover ? d.rotate : d.rotate * 0.4,
                scale: revealed ? (isHovered ? (hasHover ? 1.35 : 1.32) : isDimmed ? 0.88 : 1) : 0.6,
                opacity: revealed ? (isDimmed ? (hasHover ? 0.5 : 0.3) : 1) : 0,
                y: revealed || hasHover ? 0 : 40,
                zIndex: isHovered ? 20 : d.z,
              }}
              // Touch: deal the prints in one after another.
              // A tapped print glides up rather than snapping.
              transition={{
                duration: hasHover ? 0.5 : 0.7,
                ease: [0.16, 1, 0.3, 1],
                delay: !hasHover && revealed && !hoveredId ? i * 0.09 : 0,
              }}
            >
              <img src={d.src} alt="" loading="lazy" />
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}
