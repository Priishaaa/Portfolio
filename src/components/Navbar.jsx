import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './navbar.css';

const LINKS = [
  { label: 'Home', href: '#top' },
  { label: 'Projects', href: '#work' },
  { label: 'Best Work', href: '#best-work' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar(){
  const [scrolled, setScrolled] = useState(false);
  const [activeHref, setActiveHref] = useState('#top');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lightweight scroll-spy: whichever section occupies the middle of the
  // viewport gets the active underline in the nav.
  useEffect(() => {
    const sections = LINKS
      .map((l) => document.querySelector(l.href))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHref(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleClick = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (!el) return;
    if (window.__lenis) {
      window.__lenis.scrollTo(el, { offset: -40 });
    } else {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.header
      className={`nav-wrap ${scrolled ? 'is-scrolled' : ''}`}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 1.6 }}
    >
      <nav className="nav-pill" aria-label="Primary">
        <a href="#top" className="nav-mark" onClick={(e) => handleClick(e, '#top')} data-cursor="link">
          PS
        </a>

        <ul className="nav-links">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={activeHref === l.href ? 'is-active' : ''}
                onClick={(e) => handleClick(e, l.href)}
                data-cursor="link"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </motion.header>
  );
}
