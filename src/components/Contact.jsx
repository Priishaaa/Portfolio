import { motion } from 'framer-motion';
import MagneticButton from './MagneticButton';
import './contact.css';

export default function Contact(){
  return (
    <section id="contact" className="contact">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="label">Get in touch</span>
          <h2 className="contact-title">
            Let&apos;s build <span className="accent-italic">something</span><br />
            worth shipping.
          </h2>

          <MagneticButton
            href="mailto:prishdixit@gmail.com"
            className="contact-email"
            strength={0.25}
          >
            prishdixit@gmail.com
          </MagneticButton>
        </motion.div>

        <div className="footer-row">
          <span>&copy; {new Date().getFullYear()} Prisha</span>
          <div className="footer-links">
            {/* swap these two placeholder URLs for your real profile links */}
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" data-cursor="link">LinkedIn</a>
            <a href="/Prisha-S-Resume.pdf" target="_blank" rel="noreferrer" data-cursor="link">Resume</a>
            <a href="https://behance.net" target="_blank" rel="noreferrer" data-cursor="link">Behance</a>
          </div>
        </div>
      </div>
    </section>
  );
}
