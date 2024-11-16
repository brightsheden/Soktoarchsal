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
            +234-8098049358
            </span>
            
        </span>

        <span className='flex text-white sm:text-sm  items-center gap-2'>
            <Mail style={{
                width:"20px",
                height:"20px"
            }} size={10} className='w-10 h-10 text-sm'/>

<a href='mailto:sokotoacresal@gmail.com' className='text-xs'>
sokotoacresal@gmail.com
            </a>
           
        </span>

      </div>

      <div className='hidden md:flex items-center justify-between gap-4'>
        <a href='mailto:mailto:sokotoacresal@gmail.com' className='p-2 bg-white rounded-md text-[10px] '>
            Email Us
        </a>
        <div className='text-white flex justify-between gap-4 text-xl'>
         
        <a href='https://web.facebook.com/profile.php?id=100084274891426' target="_blank">
        <MdFacebook className='size-6'/>
          </a>
        
        <a href='https://www.instagram.com/sokoto_acresal/' target="_blank">
        <FaInstagram className='size-6' />
          </a>

          <a href='https://x.com/AcresalSokoto' target="_blank">
          <FaTwitter className='size-6'/>
          </a>
        
       


        </div>
        
      </div>



    </div>
  )
}

export default Header
