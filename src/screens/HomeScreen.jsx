import React from 'react'
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

function HomeScreen() {
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
   <hr className='my-5 font-bold text-4xl'></hr>
   <ImprovingLiveHood/>
   <SwiperSlide/>
   <Partners/>
   <Footer/>
    </div>
  )
}

export default HomeScreen
