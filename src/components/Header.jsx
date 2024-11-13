import { Mail, Phone } from 'lucide-react'
import React from 'react'
import { FaPhone } from 'react-icons/fa'
import { FaInstagram, FaTwitter } from 'react-icons/fa6'
import { MdFacebook } from 'react-icons/md'

function Header() {
  return (
    <div className=' bg-blue-700 p-5 flex flex-col md:flex-row justify-between'>
      <div className='flex space-x-2'>
        <span className='flex text-white  sm:text-sx items-center gap-2'>
            <Phone style={{
                width:"20px",
                height:"20px"
            }}/>
            <span className='text-xs'>
            +23470-222-222
            </span>
            
        </span>

        <span className='flex text-white sm:text-sm  items-center gap-2'>
            <Mail style={{
                width:"20px",
                height:"20px"
            }} size={10} className='w-10 h-10 text-sm'/>

<span className='text-xs'>
acrsalsokoto@gmail.com
            </span>
           
        </span>

      </div>

      <div className='hidden md:flex items-center justify-between gap-4'>
        <button className='p-2 bg-white rounded-md text-[10px] '>
            Email Us
        </button>
        <div className='text-white flex justify-between gap-4 text-xl'>
        <MdFacebook className='size-6'/>
        <FaInstagram className='size-6' />
        <FaTwitter className='size-6'/>


        </div>
        
      </div>



    </div>
  )
}

export default Header
