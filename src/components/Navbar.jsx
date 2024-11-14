import { Menu } from 'lucide-react'
import React from 'react'

function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light flex justify-between">
       <div>
        <img className='w-1/2' src='acresal-logo.png'/>

       </div>

       <div className='hidden md:block'>
        <ul className='flex justify-around gap-10'>
          <li className='p-2 hover:text-blue-800 hover:cursor-pointer hover:p-2 hover:rounded-md hover:bg-blue-200'>Home</li>
       

   
          <li className='p-2 hover:text-blue-800 hover:cursor-pointer hover:p-2 hover:rounded-md hover:bg-blue-200'>About Us</li>
        

        
          <li className='p-2 hover:text-blue-800 hover:cursor-pointer hover:p-2 hover:rounded-md hover:bg-blue-200'>Mission</li>
        
          </ul>
       </div>

       <div className='hidden md:block'>
        <button className='bg-blue-700 p-4 text-white rounded-lg'>
          Contact Us
        </button>
       </div>

       <div className='block md:hidden'>
        <Menu/>
       </div>
    

      </nav>
      
    </div>
  )
}

export default Navbar
