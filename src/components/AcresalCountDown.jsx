import React from 'react'
import CountUp from 'react-countup'

function AcresalCountDown() {
  return (
    <div className='min-h-screen my-5 p-5'>
   {/*  <div>
        <h2 className='text-2xl text-blue-700'>Acresal Stats</h2>
     </div> */}

{/* stats container */ }
     <div className='grid grid-cols-1 md:grid-cols-4 gap-4 '>

        <div className='text-center block border-2 border-dashed border-blue-800 rounded-md p-5 space-y-2'>
            <h2 className='text-5xl font-bold motion-preset-blink '><CountUp duration={60} end={6}/></h2>
            <p className='text-blue-700 font-bold text-2xl'>Years</p>
            <div className='block text-sm '>
        The project  duration is 6 years ending in 2028
        </div>
        </div>

        <div className='text-center block border-2 border-dashed border-blue-800 rounded-md p-5 space-y-2'>
            <h2 className='text-5xl font-bold motion-preset-blink  '><CountUp duration={60} end={20}/></h2>
            <p className='text-blue-700 font-bold text-2xl'>Northern States</p>
            <div className='block text-xs'>
            The project is implemented in the 19 Northern States and the FCT.
        </div>
        </div>





        <div className='text-center block border-2 border-dashed border-blue-800 rounded-md p-5 space-y-2'>
            <h2 className='text-5xl font-bold '><CountUp duration={60} end={2} /> </h2>
            <p className='text-blue-700 font-bold text-2xl'>Watersheds</p>
            <div className='block text-sm'>
            Geographical areas that directs rain into rivers and streams.
        </div>
        </div>

        <div className='text-center block border-2 border-dashed border-blue-800 rounded-md p-5 space-y-2'>
            <h2 className='text-5xl font-bold '>4</h2>
            <p className='text-blue-700 font-bold text-2xl'>Project Components</p>
            <div className='block text-sm'>
            The project is has four key components
        </div>
        </div>

        <div className='text-center block border-2 border-dashed border-blue-800 rounded-md p-5 space-y-2'>
            <h2 className='text-5xl font-bold '><CountUp duration={30} end={29451} /> </h2>
            <p className='text-blue-700 font-bold text-2xl'>Beneficiaries</p>
            <div className='block text-sm'>
            The number of individuals that have benefitted from our interventions
        </div>
        </div>

        <div className='text-center block border-2 border-dashed border-blue-800 rounded-md p-5 space-y-2'>
            <h2 className='text-5xl font-bold '><CountUp duration={30} end={298.26} /> </h2>
            <p className='text-blue-700 font-bold text-2xl'>Hectares restored</p>
            <div className='block text-sm'>
            The size of land in hectares restored by our interventions 
        </div>
        </div>


        <div className='text-center block border-2 border-dashed border-blue-800 rounded-md p-5 space-y-2'>
            <h2 className='text-5xl font-bold '><CountUp duration={30} end={91} /> </h2>
            <p className='text-blue-700 font-bold text-2xl'>CIGs Supported</p>
            <div className='block text-sm'>
            Number of Community Interest groups we have supported
        </div>
        </div>


        <div className='text-center block border-2 border-dashed border-blue-800 rounded-md p-5 space-y-2'>
            <h2 className='text-5xl font-bold '><CountUp duration={30} end={24} /> </h2>
            <p className='text-blue-700 font-bold text-2xl'>CIGs Supported</p>
            <div className='block text-sm'>
            Communities Impacted
        </div>
        </div>




   
     
     

     </div>

    </div>
  )
}

export default AcresalCountDown
