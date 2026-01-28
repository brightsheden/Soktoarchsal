import React, { useEffect, useState } from 'react'
import { Menu, X, MessageSquare, ExternalLink } from 'lucide-react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { FaSquareWhatsapp } from 'react-icons/fa6'
import { DrawerPlacement } from './Drawer'
import Logo from '../../public/acresal-logo.png'

function Navbar() {
  const [openRight, setOpenRight] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const openDrawerRight = () => setOpenRight(true)
  const closeDrawerRight = () => setOpenRight(false)

  const navigateToSection = (path, sectionId) => {
    navigate(path, {
      state: { scrollToSection: sectionId }
    })
  }

  const navLinks = [
    { path: '/', label: 'Home', sectionId: null },
    { path: '/', label: 'About Us', sectionId: 'about' },
    { path: '/', label: 'Mission', sectionId: 'about' },
    { path: '/', label: 'Gallery', sectionId: 'gallery' },
    { path: '/news', label: 'News', sectionId: null },
    { path: '/login', label: 'Staff Portal', sectionId: null }
  ]

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass-nav py-3' : 'bg-transparent py-5'
      }`}>
      <div className='container mx-auto px-4 md:px-8'>
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="relative z-10 transition-transform duration-300 hover:scale-105">
            <img
              className={`transition-all duration-300 ${scrolled ? 'w-32' : 'w-40'}`}
              src={Logo}
              alt='acresal logo'
            />
          </Link>

          {/* Desktop Navigation */}
          <div className='hidden lg:block'>
            <ul className='flex items-center space-x-8'>
              {navLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => {
                      if (link.sectionId) {
                        navigateToSection(link.path, link.sectionId)
                      } else {
                        navigate(link.path)
                      }
                    }}
                    className={`nav-link text-sm uppercase tracking-wider font-semibold ${scrolled ? 'text-slate-700' : 'text-white drop-shadow-md'
                      }`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* WhatsApp CTA & Mobile Menu */}
          <div className='flex items-center gap-4'>
            <a
              href='https://wa.me/+2348037321960'
              target='_blank'
              rel="noopener noreferrer"
              className='hidden md:flex btn-primary-premium scale-90 md:scale-100'
            >
              <FaSquareWhatsapp className='text-xl' />
              <span className='hidden sm:inline'>Contact Us</span>
            </a>

            <button
              onClick={openDrawerRight}
              className={`lg:hidden p-2 rounded-full transition-colors ${scrolled ? 'hover:bg-gray-100 text-slate-900' : 'hover:bg-white/10 text-white'
                }`}
            >
              <Menu size={28} />
            </button>
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
    </div>
  )
}

export default Navbar;