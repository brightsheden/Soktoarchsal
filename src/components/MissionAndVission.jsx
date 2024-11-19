import React, { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import './mission.css'

function MissionAndVission() {
  const missionRef = useRef(null)
  const visionRef = useRef(null)
  const logoRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in')
        }
      })
    })

    observer.observe(missionRef.current)
    observer.observe(visionRef.current)
    observer.observe(logoRef.current)

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <div name="mission" id='mission' className='flex justify-between flex-col md:flex-row container p-4 gap-4'>
      <motion.div 
        ref={missionRef}
        className='opacity-0 translate-x-[-200px]'
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className='font-bold text-blue-800 text-2xl  font-popins'>Our Mission</h2>
        <span className='text-sm text-gray-500 font-bold  font-popins'>Cultivating Sustainability, Empowering Communities</span>
        <p className='text-base  leading-8 font-popins'>
          We aim to drive sustainable land management practices across Sokoto, reducing the vulnerability of our communities and promoting environmental stewardship. Our commitment is to strengthen local resilience, inclusivity, and productivity through thoughtful, climate-resilient landscape interventions.
        </p>
      </motion.div>

      <motion.div 
        ref={logoRef}
        className='opacity-0 scale-[0.5] w-[80%]'
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <img className='w-full' src='arcsallogo.png'/>
      </motion.div>

      <motion.div 
        ref={visionRef}
        className='opacity-0 translate-x-[200px]'
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <h2 className='font-bold text-blue-800 text-2xl font-popins '>Our Vission</h2>
        <span className='text-sm text-gray-500 font-bold font-popins'>A Thriving Sokoto, Built on Sustainable Landscapes and Community Well-being</span>
        <p className='text-base  leading-8 font-popins'>
          We envision a future where Sokoto’s landscapes flourish with restored vitality, and our communities are empowered to thrive sustainably. By fostering resilience, inclusivity, and eco-conscious practices, we aim to build a strong foundation for generations to come.
        </p>
      </motion.div>
    </div>
  )
}

export default MissionAndVission