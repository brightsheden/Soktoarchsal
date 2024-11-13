import React from 'react'

function MissionAndVission() {
  return (
    <div className='flex justify-between flex-col md:flex-row container p-4 gap-4'>
        <div>
            <h2 className='font-bold text-blue-800 text-2xl '>Our Mission</h2>
            <span className='text-sm text-gray-500 font-bold'>Cultivating Sustainability, Empowering Communities</span>
            <p className='text-base  leading-8'>
            We aim to drive sustainable land management practices across Sokoto, reducing the vulnerability of our communities and promoting environmental stewardship. Our commitment is to strengthen local resilience, inclusivity, and productivity through thoughtful, climate-resilient landscape interventions.
            </p>

        </div>

        <div className='w-full'>
            <img className='md:motion-preset-oscillate w-full' src='arcsallogo.png'/>

        </div>

        <div>
            <h2 className='font-bold text-blue-800 text-2xl '>Our Vission</h2>
            <span className='text-sm text-gray-500 font-bold'>A Thriving Sokoto, Built on Sustainable Landscapes and Community Well-being</span>
            <p className='text-base  leading-8'>
            We envision a future where Sokoto’s landscapes flourish with restored vitality, and our communities are empowered to thrive sustainably. By fostering resilience, inclusivity, and eco-conscious practices, we aim to build a strong foundation for generations to come.
            </p>

        </div>
      
    </div>
  )
}

export default MissionAndVission
