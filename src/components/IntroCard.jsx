import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion';
import Marquee from './Marquee';
import './introCard.css';

// Curated for a recruiter skimming in 10 seconds -- not the full resume
// list, just what proves the "designer who also ships code" claim.
const SKILLS = ['Figma', 'React.js', 'Node.js', 'JavaScript', 'Framer', 'PostgreSQL', 'UI/UX Design', 'Prototyping'];

// A single premium card, pinned full-screen while its own scroll runs.
// Scroll drives rotateY: the card starts turned away as if rotating in
// from behind you, faces you square in the middle of the scroll, then
// keeps rotating -- the opposite direction -- as the next section takes
// over. Mouse movement adds a small independent rotateX tilt on top, so
// it never sits fully still even mid-scroll.
export default function IntroCard(){
  const wrapperRef = useRef(null);
  const cardRef = useRef(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const mouseRotateX = useSpring(useTransform(py, [-0.5, 0.5], [8, -8]), { damping: 20, stiffness: 120 });

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start start', 'end end'],
  });

  const scrollRotateY = useTransform(scrollYProgress, [0, 0.5, 1], [-65, 0, 65]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.82, 1, 0.82]);
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  const handleMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width - 0.5);
    py.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleLeave = () => { px.set(0); py.set(0); };

  return (
    <section className="intro-card-scene" ref={wrapperRef}>
      {/* floating decorative shapes around the card, filling the empty space */}
      {/* purely decorative -- a small "constellation" of minimal outline
          nodes around the card, filling the empty space without meaning
          anything specific */}
      <motion.span className="intro-node intro-node-a" animate={{ y: [0, -16, 0] }} transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }} aria-hidden="true">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="3" fill="currentColor" /></svg>
      </motion.span>
      <motion.span className="intro-node intro-node-b" animate={{ y: [0, 14, 0] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }} aria-hidden="true">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
      </motion.span>
      <motion.span className="intro-node intro-node-c" animate={{ y: [0, -10, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }} aria-hidden="true">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.6" /></svg>
      </motion.span>
      <motion.span className="intro-node intro-node-d" animate={{ rotate: [0, 20, 0] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }} aria-hidden="true">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><rect x="4" y="4" width="16" height="16" rx="4" stroke="currentColor" strokeWidth="1.6" /></svg>
      </motion.span>

      <div className="intro-card-sticky">
        <div className="intro-card-perspective">
          <motion.div
            ref={cardRef}
            className="intro-card"
            style={{ rotateX: mouseRotateX, rotateY: scrollRotateY, scale, opacity }}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
          >
            <div className="intro-card-grid" aria-hidden="true" />
            <div className="intro-card-corner" aria-hidden="true" />
            <div className="intro-card-ring" aria-hidden="true" />
            <div className="intro-card-diagonal" aria-hidden="true" />

            <span className="intro-card-eyebrow"> &middot; </span>

            <h2 className="intro-card-title">
              <span className="italic">Creative</span> Developer
            </h2>

            <div className="intro-card-divider" aria-hidden="true" />

            <div className="intro-card-location">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 22s7-7.5 7-12.5A7 7 0 0 0 5 9.5C5 14.5 12 22 12 22Z" stroke="currentColor" strokeWidth="1.6" />
                <circle cx="12" cy="9.5" r="2.4" stroke="currentColor" strokeWidth="1.6" />
              </svg>
              Based in Bangalore, India
            </div>

            <div className="intro-card-skills">
              <Marquee items={SKILLS} speed={18} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
