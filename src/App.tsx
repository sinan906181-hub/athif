import React, { useState, useEffect } from 'react';
import { ContentProvider, useContent } from './context/ContentContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { AdminPortal } from './components/AdminPortal';
import { ServiceDetailModal, SkillDetailModal } from './components/Modals';
import { ToastContainer } from './components/Toast';

function AppContent() {
  const { data } = useContent();
  const [activeSection, setActiveSection] = useState('home');

  const bgStyle = data.appearance?.bgStyle;
  const bgClass =
    bgStyle === 'midnight-navy'
      ? 'bg-[#04060e]'
      : bgStyle === 'pure-black'
      ? 'bg-black'
      : 'bg-[#050509]';

  useEffect(() => {
    const sections = ['home', 'about', 'services', 'skills', 'contact'];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`min-h-screen text-white selection:bg-purple-600/30 selection:text-cyan-300 relative font-sans overflow-x-hidden ${bgClass}`}>
      {/* Sticky Cinematic Navbar */}
      <Navbar activeSection={activeSection} />

      {/* Main Studio Sections */}
      <main>
        <Hero />
        <About />
        <Services />
        <Skills />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Detail Modals */}
      <ServiceDetailModal />
      <SkillDetailModal />

      {/* Secret Admin Portal — Hidden until Ctrl+Shift+S */}
      <AdminPortal />

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
}

export default function App() {
  return (
    <ContentProvider>
      <AppContent />
    </ContentProvider>
  );
}
