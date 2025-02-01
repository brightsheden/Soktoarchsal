import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Events, animateScroll as scroll, scrollSpy } from 'react-scroll';
import { useLocation } from 'react-router-dom';


import Header from '../components/Header'
import Hero from '../components/Hero'
import Dhero from '../components/Dhero'
import PartnerLogo from '../components/PartnerLogo'
import AboutUs from '../components/AboutUs'
import MissionAndVission from '../components/MissionAndVission'
import OurImpact from '../components/OurImpact'
import OurApproachSection from '../components/Approach'
import SwiperSlide from '../components/SwiperSlide'
import WhereWeLocate from '../components/WhereWeLocate'
import AcreSalComponent from '../components/AcreSalComponent'
import AcresalCountDown from '../components/AcresalCountDown'
import MovingBubbles from '../components/MovingBubles'
import ImprovingLiveHood from '../components/ImprovingLiveHood'
import Partners from '../components/Partners'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

import PhotoGallery from '../components/Gallery'

import OurBlogs from '../components/OurBlogs'

// Animation wrapper component
const AnimatedSection = ({ children, animation = 'fade' }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  const animations = {
    fade: {
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0 }
    },
    slideRight: {
      hidden: { opacity: 0, x: -100 },
      visible: { opacity: 1, x: 0 }
    },
    slideLeft: {
      hidden: { opacity: 0, x: 100 },
      visible: { opacity: 1, x: 0 }
    },
    scale: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1 }
    },
    slideUp: {
      hidden: { opacity: 0, y: 100 },
      visible: { opacity: 1, y: 0 }
    }
  };

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={animations[animation]}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

function HomeScreen() {
  const useScrollToSection = () => {
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
  };

  useScrollToSection();

  useEffect(() => {
    Events.scrollEvent.register('begin', (to, element) => {
      console.log('begin', to, element);
    });

    Events.scrollEvent.register('end', (to, element) => {
      console.log('end', to, element);
    });

    scrollSpy.update();

    return () => {
      Events.scrollEvent.remove('begin');
      Events.scrollEvent.remove('end');
    };
  }, []);

  return (
    <div className="overflow-hidden">
      <Navbar />
      
      {/* Hero with fade-in animation */}
      <AnimatedSection animation="fade">
        <Hero />
      </AnimatedSection>

      {/* Partner logos sliding from left */}
      <AnimatedSection animation="slideRight">
        <PartnerLogo />
      </AnimatedSection>

      {/* About Us section scaling up */}
      <AnimatedSection animation="scale">
        <AboutUs />
      </AnimatedSection>

      {/* ACReSAL component sliding from right */}
      <AnimatedSection animation="slideLeft">
        <AcreSalComponent />
      </AnimatedSection>

      {/* Moving bubbles with fade animation */}
      <AnimatedSection animation="fade">
        <MovingBubbles />
      </AnimatedSection>

      {/* Swiper sliding from left */}
      {/* <AnimatedSection animation="slideRight">
        <SwiperSlide />
      </AnimatedSection> */}

      {/* Our Impact scaling up */}
      <AnimatedSection animation="scale">
        <OurImpact />
      </AnimatedSection>

      {/* Location sliding from right */}
      <AnimatedSection animation="slideLeft">
        <WhereWeLocate />
      </AnimatedSection>

      {/* Second Moving Bubbles */}
      <AnimatedSection animation="fade">
        <MovingBubbles />
      </AnimatedSection>

      {/* Photo Gallery sliding up */}
      <AnimatedSection animation="slideUp">
        <PhotoGallery />
      </AnimatedSection>

      {/* Partners section sliding from left */}
      <AnimatedSection animation="slideRight">
        <Partners />
      </AnimatedSection>

      {/* Our Blogs scaling up */}
      <AnimatedSection animation="scale">
        <OurBlogs />
      </AnimatedSection>

      {/* Footer fading in */}
      <AnimatedSection animation="fade">
        <Footer />
      </AnimatedSection>
    </div>
  );
}

export default HomeScreen;