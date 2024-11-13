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

function HomeScreen() {
  return (
    <div>
    <Header/>
    <Hero/>
    <PartnerLogo/>
    <AboutUs/>
    <MissionAndVission/>
    <OurImpact/>
    <SwiperSlide/>
   <WhereWeLocate/>
    </div>
  )
}

export default HomeScreen
