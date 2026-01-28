import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Events, scrollSpy } from 'react-scroll';

import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import PartnerLogo from '../components/PartnerLogo';
import AboutUs from '../components/AboutUs';
import AcreSalComponent from '../components/AcreSalComponent';
import OurImpact from '../components/OurImpact';
import WhereWeLocate from '../components/WhereWeLocate';
import PhotoGallery from '../components/Gallery';
import Partners from '../components/Partners';
import OurBlogs from '../components/OurBlogs';
import Footer from '../components/Footer';

function HomeScreen() {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollToSection) {
      const sectionId = location.state.scrollToSection;
      window.history.replaceState({}, document.title);

      const timer = setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [location]);

  useEffect(() => {
    scrollSpy.update();
    return () => { };
  }, []);

  return (
    <div className="bg-white">
      <Navbar />

      <main>
        <Hero />

        {/* We can keep PartnerLogo here as a separator or trust it inside Partners section */}
        {/* <PartnerLogo /> */}

        <AboutUs />

        <AcreSalComponent />

        <OurImpact />

        <PhotoGallery />

        <WhereWeLocate />

        <Partners />

        <OurBlogs />
      </main>

      <Footer />
    </div>
  );
}

export default HomeScreen;