import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import MagneticButton from './MagneticButton';
import './hero.css';
import s1 from "../assets/projects/s1.png";
import s2 from "../assets/projects/s2.png";
import s3 from "../assets/projects/s3.png";
import s4 from "../assets/projects/s4.png";

// Replace `image` with a real screenshot import once you have one, e.g.
// `image: erpDashboardImg` after `import erpDashboardImg from '../assets/projects/erp-dashboard.png'`.
// Left as a gradient placeholder for now so this file works standalone.
//
// `home` is the card's resting position as a % of the hero box, kept out
// near the edges so nothing ever sits on top of the centered headline.
// `depth` drives how strongly it parallaxes with the cursor and how far
// back it sits (lower depth = further back = smaller, dimmer, slower).
  const CARDS = [
  {
    id: "1",
    image: s1,
    home: { x: 12, y: 18 },
    depth: 1,
    rotate: -7,
    size: 280,
  },

  {
    id: "2",
    image: s2,
    home: { x: 84, y: 16 },
    depth: 0.9,
    rotate: 6,
    size: 250,
  },

  {
    id: "3",
    image: s3,
    home: { x: 10, y: 72 },
    depth: 0.75,
    rotate: 8,
    size: 220,
  },

  {
    id: "4",
    image: s4,
    home: { x: 86, y: 74 },
    depth: 0.85,
    rotate: -6,
    size: 240,
  },
];

const LERP = 0.08; // how quickly cards/spotlight catch up to target -- lower = laggier, more "magnetic"

export default function Hero(){
  const heroRef = useRef(null);
  const spotlightRef = useRef(null);
  const cardRefs = useRef({});
  const rafId = useRef(null);

  // Mutable, non-reactive state used by the animation loop. Kept out of
  // React state entirely so 60fps pointer tracking never triggers re-renders.
  const pointer = useRef({ x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5, vx: 0 });

  const [active, setActive] = useState(false); // cursor is inside + has moved
  const [enabled, setEnabled] = useState(false); // fine-pointer device, motion allowed

  useEffect(() => {
    const isFine = window.matchMedia('(pointer: fine)').matches;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!isFine || prefersReduced) return;
    setEnabled(true);

    const hero = heroRef.current;

    const handleMove = (e) => {
      const rect = hero.getBoundingClientRect();
      pointer.current.targetX = (e.clientX - rect.left) / rect.width;
      pointer.current.targetY = (e.clientY - rect.top) / rect.height;
      setActive(true);
    };

    const handleLeave = () => setActive(false);

    hero.addEventListener('mousemove', handleMove);
    hero.addEventListener('mouseleave', handleLeave);

    const tick = (time) => {
      const p = pointer.current;
      p.vx = p.targetX - p.x;
      p.x += (p.targetX - p.x) * LERP;
      p.y += (p.targetY - p.y) * LERP;

      // cursor position as -1..1 offset from hero center
      const offX = (p.x - 0.5) * 2;
      const offY = (p.y - 0.5) * 2;

      if (spotlightRef.current) {
        spotlightRef.current.style.transform =
          `translate3d(${p.x * 100}%, ${p.y * 100}%, 0)`;
      }

      CARDS.forEach((card) => {
        const el = cardRefs.current[card.id];
        if (!el) return;
        const parallaxX = offX * 22 * card.depth;
        const parallaxY = offY * 18 * card.depth;
        const tilt = card.rotate + p.vx * 40 * card.depth;
        const bob = Math.sin(time / 1400 + card.home.x) * 6 * card.depth;
        el.style.transform =
          `translate3d(calc(-50% + ${parallaxX}px), calc(-50% + ${parallaxY + bob}px), 0) rotate(${tilt}deg)`;
      });

      rafId.current = requestAnimationFrame(tick);
    };
    rafId.current = requestAnimationFrame(tick);

    return () => {
      hero.removeEventListener('mousemove', handleMove);
      hero.removeEventListener('mouseleave', handleLeave);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  const line = {
    hidden: { y: '110%' },
    show: { y: '0%', transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section id="top" ref={heroRef} className="hero">
      <div className="hero-bg" aria-hidden="true" />
      {enabled && <div ref={spotlightRef} className="hero-spotlight" aria-hidden="true" />}

      <div className="hero-center">
        <h1 className="hero-title hero-title-3d">
          <span className="line-clip"><motion.span className="hero-line" variants={line} initial="hidden" animate="show" transition={{ delay: 0.4 }}>PRISHA.</motion.span></span>
        </h1>

        <motion.p
          className="hero-intro"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          Creating experiences that invite people to explore.
        </motion.p>

        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
        
        </motion.div>
      </div>

      {enabled && (
        <div className={`hero-cards ${active ? 'is-active' : ''}`} aria-hidden="true">
          {CARDS.map((card) => (
            <div
              key={card.id}
              ref={(el) => { cardRefs.current[card.id] = el; }}
              className="float-card"
              style={{
                left: `${card.home.x}%`,
                top: `${card.home.y}%`,
                width: card.size,
                zIndex: Math.round(card.depth * 10),
                opacity: 0.45 + card.depth * 0.5,
                filter: `blur(${(1 - card.depth) * 2.5}px)`,
              }}
            >
              <div className="float-card-media">
  <img
    src={card.image}
    alt=""
    className="float-card-image"
    draggable={false}
  />
</div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
