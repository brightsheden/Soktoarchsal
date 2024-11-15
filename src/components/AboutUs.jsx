import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Element } from 'react-scroll';

function AboutUs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (

    <div name='about' id='about' ref={ref} className="element py-16 md:py-24 lg:py-32">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-12 text-center text-blue-800"
          initial={{ opacity: 0, y: -50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          ABOUT US
          <p className='text-center motion-preset-slide-right  mb-5 text-base'>
        Empowering Sokoto Through Resilient Landscape Management
        </p>
        </motion.h2>
       
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-white  p-6">
              <motion.p 
                className="text-lg md:text-xl text-gray-700 mb-6 text-center"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                The Agro-Climatic Resilience in Semi-Arid Landscapes (ACReSAL) Project, Sokoto SPMU, is a pioneering initiative dedicated to revitalizing our landscapes and uplifting our communities. With a mission rooted in sustainable landscape management, ACReSAL Sokoto plays a key role in the nationwide goal of restoring four million hectares by 2030. By rehabilitating over 50,000 hectares of degraded land, we’re not only boosting productivity but are also paving the way for environmental sustainability and improved livelihoods.


              </motion.p>
     
            </div>
          </motion.div>
          
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <img
              className="w-full rounded-lg shadow-2xl"
              src="/images/img1.jpeg"
              alt="About Us Image"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;