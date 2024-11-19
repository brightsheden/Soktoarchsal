import React, { useEffect } from 'react'
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
import { Events, animateScroll as scroll, scrollSpy } from 'react-scroll';
import PhotoGallery from '../components/Gallery'
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer'



function HomeScreen() {

const { ref: ref1, inView: inView1 } = useInView();
const controls1 = useAnimation();


const variants = {
  hidden: { opacity: 0, x: '-100vw' },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0 }
};

if (window.innerWidth > 768) {
  variants.hidden.x = '-50vw';
}

React.useEffect(() => {
  if (inView1) {
    controls1.start('visible');
  } else {
    controls1.start('hidden');
  }
}, [controls1, inView1]);



  useEffect(() => {
    
    // Registering the 'begin' event and logging it to the console when triggered.
    Events.scrollEvent.register('begin', (to, element) => {
      console.log('begin', to, element);
    });

    // Registering the 'end' event and logging it to the console when triggered.
    Events.scrollEvent.register('end', (to, element) => {
      console.log('end', to, element);
    });

    // Updating scrollSpy when the component mounts.
    scrollSpy.update();

    // Returning a cleanup function to remove the registered events when the component unmounts.
    return () => {
      Events.scrollEvent.remove('begin');
      Events.scrollEvent.remove('end');
    };
  }, []);


  return (
    <div>
      <Navbar/>
  
    <Hero/>
    <PartnerLogo/>
    <AboutUs/>
    <motion.div
             ref={ref1}
             initial="hidden"
             animate={controls1}
             variants={variants}
             transition={{ duration: 1.5 }}
    >
 <AcreSalComponent/>

    </motion.div>
    <MovingBubbles/>
    <SwiperSlide/>
    <OurImpact/>
   
   <WhereWeLocate/>
 
 
  
   <MovingBubbles/>

   <PhotoGallery/>
   <Partners/>
   <Footer/>
    </div>
  )
}

export default HomeScreen
