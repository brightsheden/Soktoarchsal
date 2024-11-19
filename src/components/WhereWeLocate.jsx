import React from 'react'
import MapboxMap from './Map'
import LeafletMap from './LeafletMap'

function WhereWeLocate() {
  return (
    <div className='my-5 font-popins'>
        <div className='my-5'>
            <h1 className="font-bold text-2xl md:text-5xl text-center  text-blue-700 font-popins">Where We Locate</h1>
        </div>
        <div>
           <LeafletMap/>
        </div>
      
    </div>
  )
}

export default WhereWeLocate
