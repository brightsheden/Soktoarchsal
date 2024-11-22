import React, { useEffect } from 'react'
import { Menu } from 'lucide-react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { FaSquareWhatsapp } from 'react-icons/fa6'
import { DrawerPlacement } from './Drawer'
import Logo from '../../public/acresal-logo.png' //

function Navbar() {
  const [openRight, setOpenRight] = React.useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const openDrawerRight = () => setOpenRight(true)
  const closeDrawerRight = () => setOpenRight(false)

  const navigateToSection = (path, sectionId) => {
    // Always navigate first
    navigate(path, {
      state: { scrollToSection: sectionId }
    })
  }

  // This hook will be used in your home page component


  const navLinks = [
    { 
      path: '/', 
      label: 'Home',
      sectionId: null
    },
    { 
      path: '/', 
      label: 'About Us',
      sectionId: 'about'
    },
    { 
      path: '/', 
      label: 'Mission',
      sectionId: 'about'
    },
    { 
      path: '/', 
      label: 'Gallery',
      sectionId: 'gallery'
    },
    {
      path: '/news',
      label: 'News',
      sectionId: null
    },
    {
      path: '/login',
      label: 'staff login',
      sectionId: null
    }
  ]

  return (
    <div className='container mx-auto'>
      <nav className="navbar flex items-center justify-between py-4 px-6 bg-white shadow-sm">
        {/* Logo */}
        <Link to="/" className="transition-transform duration-300 hover:scale-105">
          <img 
            className='w-40 h-auto object-contain' 
            src={Logo} 
            alt='acresal logo'
          />
        </Link>

        {/* Desktop Navigation */}
        <div className='hidden md:block'>
          <ul className='flex items-center space-x-6'>
            {navLinks.map((link) => (
              <li key={link.label}>
                <div 
                  onClick={() => {
                    // If section exists, navigate with section
                    if (link.sectionId) {
                      navigateToSection(link.path, link.sectionId)
                    } else {
                      // Otherwise, just navigate to the path
                      navigate(link.path)
                    }
                  }}
                  className='
                    relative 
                    text-gray-700 
                    font-medium 
                    px-3 
                    py-2 
                    rounded-md 
                    transition-all 
                    duration-300 
                    hover:text-blue-700 
                    hover:bg-blue-50
                    group
                    cursor-pointer
                  '
                >
                  {link.label}
                  <span 
                    className='
                      absolute 
                      bottom-0 
                      left-0 
                      w-0 
                      h-0.5 
                      bg-blue-700 
                      transition-all 
                      duration-300 
                      group-hover:w-full
                    '
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* WhatsApp CTA */}
        <div className='hidden md:block'>
          <a 
            href='https://wa.me/+2348037321960' 
            target='_blank' 
            rel="noopener noreferrer"
            className='
              flex 
              items-center 
              gap-2 
              bg-green-600 
              text-white 
              px-4 
              py-2 
              rounded-lg 
              transition-all 
              duration-300 
              hover:bg-green-700 
              hover:shadow-md 
              hover:scale-105
            '
          >
            <FaSquareWhatsapp className='text-2xl'/>
            <span className='font-medium'>Send a message</span>
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <div className='block md:hidden'>
          <Menu 
            onClick={openDrawerRight} 
            className='
              text-gray-700 
              cursor-pointer 
              hover:text-blue-700 
              transition-colors 
              duration-300
            '
          />
        </div>

        {/* Mobile Drawer */}
        {openRight && (
          <DrawerPlacement 
            openDrawerRight={openDrawerRight} 
            openRight={openRight} 
            closeDrawerRight={closeDrawerRight}
          />
        )}
      </nav>
    </div>
  )
}

export default Navbar