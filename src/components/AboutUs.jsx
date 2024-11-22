import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

import { BiBulb, BiSkipNext } from 'react-icons/bi';

function AboutUs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (

    <div  id='about' ref={ref} className="py-16 md:py-24 lg:py-32">
      <div className="container mx-auto px-4">

    {/*    <motion.h2 
          className="font-popins text-4xl md:text-5xl lg:text-6xl font-bold mb-12 text-center text-blue-800"
          initial={{ opacity: 0, y: -50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          ABOUT US
          <p className='font-popins text-center motion-preset-slide-right  mb-5 text-base'>
        Empowering Sokoto Through Resilient Landscape Management
        </p>
        </motion.h2>
       */}


        <div className="flex  flex-col lg:flex-row items-center gap-12 font-popins">
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-white  space-y-5 ">
              <span className='font-popins text-gray-500 text-left mb-5 text-xl'>Welcome to (Sokoto ACReSAL)  </span>  
                <h2 className='font-popins text-4xl font-bold'>Agro-Climatic Resilience In Semi-Arid Landscapes</h2>
            </div>

            <p className='my-2 leading-2 text-gray-500 text-1xl font-medium'>
            The Agro-Climatic Resilience in Semi-Arid Landscapes (ACReSAL) Project, Sokoto SPMU, is a pioneering initiative dedicated to revitalizing our landscapes and uplifting our communities. With a mission rooted in sustainable landscape management, 
            </p>

           

            <div className='my-2'>
              <div className='flex flex-col  md:flex-row items-center'>
                <div className='flex justify-center'>
                  <BiBulb className='text-blue-700 text-4xl md:text-8xl'/>
                </div>
                <di className="leading-2 text-gray-600 text-1xl font-medium'">
                  <h2 className='font-popins text-2xl md:text-3xl font-bold mb-2 text-blue-700 text-center md:text-left'>Our Mission</h2>
                We aim to drive sustainable land management practices across Sokoto, reducing the vulnerability of our communities and promoting environmental stewardship. Our commitment is to strengthen local resilience, inclusivity, and productivity through thoughtful, climate-resilient landscape interventions.

                </di>
              </div>

              <div className='flex flex-col  md:flex-row items-center mt-5'>
                <div className='flex justify-center'>
                  <BiSkipNext className='text-blue-700 text-4xl md:text-8xl'/>
                </div>
                <div className='leading-2 text-gray-600 text-1xl font-medium'>
                  <h2 className='font-popins text-2xl md:text-3xl font-bold mb-2 text-blue-700 text-center md:text-left'>Our Vission</h2>
                
                  We envision a future where Sokoto’s landscapes flourish with restored vitality, and our communities are empowered to thrive sustainably. By fostering resilience, inclusivity, and eco-conscious practices, we aim to build a strong foundation for generations to come

                </div>
              </div>

            </div>
          </motion.div>
          
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <img
              className="w-full  shadow-2xl"
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