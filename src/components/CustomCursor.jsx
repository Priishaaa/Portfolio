import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import './customCursor.css';

// A small dot that expands into a soft ring on any [data-cursor="link"],
// and can show a short contextual word (via [data-cursor-label]) --
// e.g. "View" over a project frame. This + magnetic buttons are the
// site's two recurring interaction signatures.
//
// Visibility on both light and dark sections comes from customCursor.css:
// a solid accent-colored dot with a dual dark+light outline ring, so it
// reads against any background without needing to track page theme.
export default function CustomCursor(){
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState('');
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { damping: 35, stiffness: 700, mass: 0.2 });
  const springY = useSpring(y, { damping: 35, stiffness: 700, mass: 0.2 });

  useEffect(() => {
    const isFine = window.matchMedia('(pointer: fine)').matches;
    if (!isFine) return;
    setEnabled(true);
    document.body.classList.add('has-custom-cursor');

    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const over = (e) => {
      const target = e.target.closest('[data-cursor="link"]');
      setHovering(!!target);
      setLabel(target?.dataset.cursorLabel || '');
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', over);

    return () => {
      document.body.classList.remove('has-custom-cursor');
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      className="cc-root"
      style={{ translateX: springX, translateY: springY }}
      aria-hidden="true"
    >
      <motion.div
        className={`cc-ring ${label ? 'has-label' : ''}`}
        animate={{
          scale: hovering ? (label ? 2.6 : 1.8) : 1,
          opacity: hovering ? 1 : 0.9,
        }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        {label && <span className="cc-label">{label}</span>}
      </motion.div>
    </motion.div>
  );
}
