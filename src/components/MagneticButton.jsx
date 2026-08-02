import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

// Wraps any link/button so it gently pulls toward the cursor within its
// own bounds, then springs back on leave. Used on the nav CTA, the hero
// buttons, and the contact link -- the site's other recurring motion cue.
export default function MagneticButton({ children, className = '', strength = 0.4, as: Tag = 'a', ...props }){
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { damping: 18, stiffness: 200, mass: 0.4 });
  const springY = useSpring(y, { damping: 18, stiffness: 200, mass: 0.4 });

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * strength);
    y.set(relY * strength);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  const MotionTag = motion(Tag);

  return (
    <MotionTag
      ref={ref}
      className={`magnetic ${className}`}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      data-cursor="link"
      {...props}
    >
      {children}
    </MotionTag>
  );
}
