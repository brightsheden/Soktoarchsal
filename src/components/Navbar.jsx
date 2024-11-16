import { Menu } from 'lucide-react'
import React from 'react'
import { DrawerPlacement } from './Drawer';
import { Link } from 'react-router-dom';
import { FaSquareWhatsapp } from 'react-icons/fa6';

function Navbar() {
  const [openRight, setOpenRight] = React.useState(false);

 
  const openDrawerRight = () => setOpenRight(true);
  const closeDrawerRight = () => setOpenRight(false);
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light flex justify-between">
       <Link to="/">
        <img className='w-1/2' src='acresal-logo.png'/>

       </Link>

       <div className='hidden md:block'>
        <ul className='flex justify-around gap-10'>
          <li className='p-2 hover:text-blue-800 hover:cursor-pointer hover:p-2 hover:rounded-md hover:bg-blue-200'>
            <Link href='/'>
            Home
            </Link>
         
            </li>
       

   
          <li className='p-2 hover:text-blue-800 hover:cursor-pointer hover:p-2 hover:rounded-md hover:bg-blue-200'>
            <a href='#about'>
            About Us

            </a>
            
            </li>
        

        
          <li className='p-2 hover:text-blue-800 hover:cursor-pointer hover:p-2 hover:rounded-md hover:bg-blue-200'>
            <a href='#mission'>
            Mission
            </a>
           
            
            </li>


            
          <li className='p-2 hover:text-blue-800 hover:cursor-pointer hover:p-2 hover:rounded-md hover:bg-blue-200'>
            <a href='#gallery'>
            Gallery
            </a>
           
            
            </li>
        
          </ul>
       </div>

       <div className='hidden md:block'>
        <a href='https://wa.me/+2348037321960' target='_blank' className='bg-blue-700 hover:bg-green-700 p-3 text-white rounded-lg flex items-center gap-2'>
          <FaSquareWhatsapp className='text-2xl'/> Send a message

        </a>
       </div>

       <div className='block md:hidden'>
        
        <Menu onClick={openDrawerRight} />
       </div>

       <div className={openRight ? '' : 'hidden'}>
    <DrawerPlacement openDrawerRight={openDrawerRight} openRight={openRight} closeDrawerRight={closeDrawerRight}/>
</div>
    

      </nav>
      
    </div>
  )
}

export default Navbar
