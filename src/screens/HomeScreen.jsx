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

function HomeScreen() {


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
    <Header/>
    <Hero/>
    <PartnerLogo/>
    <AboutUs/>
    <MissionAndVission/>
    <OurImpact/>
    <SwiperSlide/>
   <WhereWeLocate/>
   <MovingBubbles/>
   <AcreSalComponent/>
   <MovingBubbles/>
   <AcresalCountDown/>
  
   <ImprovingLiveHood/>
   <SwiperSlide/>
   <Partners/>
   <Footer/>
    </div>
  )
}

export default HomeScreen
