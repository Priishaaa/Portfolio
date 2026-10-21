import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
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
  // Phones: the links live in a drop-down sheet under the pill.
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

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
    setMenuOpen(false);
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

        <button
          type="button"
          className="nav-toggle"
          aria-expanded={menuOpen}
          aria-controls="nav-sheet"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span className={`nav-toggle-icon ${menuOpen ? 'is-open' : ''}`} aria-hidden="true">
            <span />
            <span />
          </span>
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="nav-sheet"
            className="nav-sheet"
            aria-label="Primary (mobile)"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <ul>
              {LINKS.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i, duration: 0.3 }}
                >
                  <a
                    href={l.href}
                    className={activeHref === l.href ? 'is-active' : ''}
                    onClick={(e) => handleClick(e, l.href)}
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
