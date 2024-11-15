import React from 'react'
import MapboxMap from './Map'

function WhereWeLocate() {
  return (
    <div className='my-5'>
        <div className='my-5'>
            <h1 className="font-bold text-2xl md:text-5xl text-center  text-blue-700">Where We Locate</h1>
        </div>
        <div>
           <MapboxMap/>
        </div>
      
    </div>
  )
}

export default WhereWeLocate
