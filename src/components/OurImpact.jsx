import React from 'react'

function OurImpact() {
  return (
    <div name='impact' className='bg-white container my-8'>
        <div className='text-center my-4'>
            <h2 className='text-2xl md:text-[50px] font-bold text-blue-700 mb-5 font-popins'>Our Impact</h2>
            <span  className='text-blue-700 font-semibold font-popins '> Transforming Land, Transforming Lives </span>
        </div>

{/* card container */}
        <div className='flex flex-col md:flex-row gap-5 p-4 '>
        <div
                className="mb-8 border-2 border-primary-button p-4 rounded-lg shadow-lg shadow-gray-200 hover:motion-preset-pop "
              
              >
                <img
                  className="w-full max-h-48 object-cover mb-4"
                  src='https://img.freepik.com/free-photo/growing-organic-ecological-plants-fields-background_1268-30622.jpg?t=st=1731497740~exp=1731501340~hmac=9de6c13c5df2ef7b88eb306dcb01f4516b9fd778b4ab6b130bc338c11c8c3a09&w=826'
                  alt={`Image for `}
                  
                />
                <h3 className="text-xl font-bold mb-2">{''}</h3>
                <p className="text-gray-700 font-popins">{"Restore over 50,000 hectares of land, contributing to a nationwide target of 1 million hectares."}</p>
              </div>

              <div
                className="font-popins mb-8 border-2 border-primary-button p-4 rounded-lg shadow-lg shadow-gray-200 hover:motion-preset-pop "
              
            
              >
                <img
                  className="w-full max-h-48 object-cover mb-4"
                  src='https://img.freepik.com/free-photo/smart-agriculture-iot-with-hand-planting-tree-background_53876-124627.jpg?t=st=1731504415~exp=1731508015~hmac=8de1e16047ef6185e0af9fe8c1587517da92507da7ace5cdeb77b8fa7d17bcee&w=360'
                  alt={`Image for `}
                  
                />
                <h3 className="text-xl font-bold mb-2">{''}</h3>
                <p className="text-gray-700">{"Strengthen land use planning and food productivity for a more resilient agriculture sector."}</p>
              </div>

              <div
                className="mb-8 font-popins border-2 border-primary-button p-4 rounded-lg shadow-lg shadow-gray-200 hover:motion-preset-pop "
              
            
              >
                <img
                  className="w-full max-h-48 object-cover mb-4"
                  src='https://img.freepik.com/premium-photo/adventure-tents-cars-park-forest-outdoor-landscape-morning_1417-26257.jpg?w=740'
                  alt={`Image for `}
                  
                />
                <h3 className="text-xl font-bold mb-2">{''}</h3>
                <p className="text-gray-700">{"Include and empower women, youth, the elderly, persons with disabilities, and marginalized groups across local communities."}</p>
              </div>

        </div>

      
    </div>
  )
}

export default OurImpact
