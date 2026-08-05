import { useEffect, useState } from 'react';
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

export default function GraphicGrid(){
  const [revealed, setRevealed] = useState(false);
  const [hoveredId, setHoveredId] = useState(null);
  const [hasHover, setHasHover] = useState(true);

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    setHasHover(fine);
    if (!fine) setRevealed(true); // touch devices: skip the discovery interaction, just show the grid
  }, []);

  return (
    <section
      id="graphics"
      className="grid-scene"
      onMouseEnter={() => hasHover && setRevealed(true)}
      onMouseLeave={() => { if (hasHover) { setRevealed(false); setHoveredId(null); } }}
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
      >
        Hover to see magic
      </motion.p>

      <div className={`grid-cards ${revealed ? 'is-revealed' : ''}`}>
        {DESIGNS.map((d) => {
          const isHovered = hoveredId === d.id;
          const isDimmed = hoveredId && !isHovered;

          return (
            <motion.button
              key={d.id}
              type="button"
              className="grid-card"
              style={{ top: `${d.top}%`, left: `${d.left}%` }}
              data-cursor="link"
              onMouseEnter={() => setHoveredId(d.id)}
              onMouseLeave={() => setHoveredId(null)}
              animate={{
                rotate: isHovered ? 0 : d.rotate,
                scale: revealed ? (isHovered ? 1.35 : isDimmed ? 0.88 : 1) : 0.6,
                opacity: revealed ? (isDimmed ? 0.5 : 1) : 0,
                zIndex: isHovered ? 20 : d.z,
              }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <img src={d.src} alt={d.alt} loading="lazy" />
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}
