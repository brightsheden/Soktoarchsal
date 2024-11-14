import React from 'react'

function Footer() {
  return (
    

     <footer className="footer p-10 bg-base-200 text-base-content justify-between">
       <div className='border-2  '>
        <img className='w-1/2   ' src='acresal-logo.png'/>
         <p className='w-1/2 text-xs'>
         Sokoto State is participating in the ACReSAL project  which is a multi-sectoral and multi-institutional scheme, covering Environment, Agriculture and Water. The project is to support the state combat desertification, restore degraded lands and special ecosystems for agriculture and biodiversity conservation.
         </p>
       </div> 
       <div className=' border-2 w-full'>
         <span className="footer-title text-blue-700">Quick Links</span> 
         <a className="link link-hover">Home</a> 
         <a className="link link-hover">About Us</a> 
         <a className="link link-hover">Mission</a> 
         <a className="link link-hover">Gallery</a>
       </div> 
       <div className=''>
         <span className="footer-title">Contact Us</span> 
            <p>
                Mock Address
            </p>
            <p>
                Phone: 123-456-7890 , 123-456-7890

            </p>
       </div> 
     
     </footer>

  )
}

export default Footer
