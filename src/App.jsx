import { Analytics } from '@vercel/analytics/react';
import useSmoothScroll from './lib/useSmoothScroll';
import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import About from './components/About';
import RouteProgress from './components/RouteProgress';
import Contact from './components/Contact';

function App(){
  useSmoothScroll();

  return (
    <>
      <Preloader />
      <CustomCursor />
      <Navbar />
      <RouteProgress />
      <main>
        <Hero />
        <Projects />
        <About />
        <Contact />
      </main>
      <Analytics />
    </>
  );
}

export default App;
