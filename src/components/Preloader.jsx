import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import './preloader.css';

// A short, one-time intro: a counter ticks to 100 while a curtain sits
// over the page, then both panels wipe away. Runs once per page load,
// skipped entirely for reduced-motion users.
export default function Preloader({ onDone }){
  const [done, setDone] = useState(false);
  const count = useMotionValue(0);
  const spring = useSpring(count, { damping: 30, stiffness: 60 });
  const rounded = useTransform(spring, (v) => Math.round(v));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setDone(true);
      onDone?.();
      return;
    }

    const unsub = rounded.on('change', (v) => setDisplay(v));
    count.set(100);

    const timer = setTimeout(() => {
      setDone(true);
      onDone?.();
    }, 1500);

    return () => {
      unsub();
      clearTimeout(timer);
    };
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="preloader"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          <motion.div
            className="preloader-panel"
            initial={{ scaleY: 1 }}
            animate={{ scaleY: 0 }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 1.0 }}
          />
          <div className="preloader-count">
            <span>{display}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
