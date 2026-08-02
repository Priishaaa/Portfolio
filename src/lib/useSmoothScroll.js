import { useEffect } from 'react';
import Lenis from 'lenis';

// Sets up buttery smooth scrolling for the whole page.
// Also exposes the Lenis instance on window so other components
// (nav links, the waveform ticker) can read scroll velocity/progress.
export default function useSmoothScroll(){
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
    });

    window.__lenis = lenis;

    function raf(time){
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const id = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);
}
