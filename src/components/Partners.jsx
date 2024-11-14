import React from 'react'

function Partners() {
  return (
    <div className='my-5 p-5'>
        <div  className='my-5'>
            <h2 className='text-left font-bold text-4xl text-blue-700'>
                Our Partners
            </h2>
        </div>


<div className='p-5 flex flex-col justify-center md:justify-between md:flex-row gap-4'>
          <div className="w-40 flex-shrink-0">
          <img className='w-[100%] rounded-full' src='nigeria.png'/>
          </div>
          <div className="w-40 flex-shrink-0">
          <img className='w-[80%]' src='sokotogovehouse.jpg'/>
          </div>
          <div className="w-40 flex-shrink-0">
          <img className='w-[80%]' src='arcsallogo.png'/>
          </div>
          <div className="w-40 flex-shrink-0">
          <img className='w-[100%]' src='wordbanklogo.png'/>
          </div>

          <div className="w-40 flex-shrink-0">
          <img className='w-[80%]' src='fma.png'/>
          </div>
      
    </div>
    </div>
 
  )
}

export default Partners
