import React from 'react';
import { Phone } from 'lucide-react';
import { 
  FaInstagramSquare, 
  FaTwitterSquare, 
  FaWhatsappSquare 
} from 'react-icons/fa';
import { MdFacebook } from 'react-icons/md';
import { FaLocationPin } from 'react-icons/fa6';
import Logo from '../../public/acresal-logo.png'


const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      href: 'https://web.facebook.com/profile.php?id=100084274891426',
      icon: <MdFacebook className="w-6 h-6 text-blue-700" />,
      label: 'Facebook'
    },
    {
      href: 'https://www.instagram.com/sokoto_acresal/',
      icon: <FaInstagramSquare className="w-6 h-6 text-blue-700" />,
      label: 'Instagram'
    },
    {
      href: 'https://x.com/AcresalSokoto',
      icon: <FaTwitterSquare className="w-6 h-6 text-blue-700" />,
      label: 'Twitter'
    },
    {
      href: 'https://wa.me/+2348037321960',
      icon: <FaWhatsappSquare className="w-6 h-6 text-blue-700" />,
      label: 'WhatsApp'
    }
  ];

  const quickLinks = [
    { href: '/', label: 'Home' },
    { href: '#about', label: 'About Us' },
    { href: '#mission', label: 'Mission' },
    { href: '#gallery', label: 'Gallery' }
  ];

  return (
    <footer
      className="bg-cover bg-center text-base-content relative"
      style={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url('${Logo}')`,
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Logo and Description Section */}
          <div className="space-y-4">
            <div className="w-1/2 max-w-[200px]">
              <img
                src={Logo}
                alt="ACReSAL Logo"
                className="w-full h-auto"
              />
            </div>
            <p className="text-sm max-w-md">
              Sokoto State is participating in the ACReSAL project which is a 
              multi-sectoral and multi-institutional scheme, covering Environment, 
              Agriculture and Water. The project is to support the state combat 
              desertification, restore degraded lands and special ecosystems for 
              agriculture and biodiversity conservation.
            </p>
          </div>

          {/* Quick Links Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-blue-700">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              {quickLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="hover:text-blue-700 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-blue-700">Contact Us</h3>
            <div className="space-y-2">
              <p className="font-semibold flex items-center gap-1">
               <span><FaLocationPin className='text-blue-700 text-1xl'/> </span> N0 20 Zamfara Road, Sokoto, Sokoto State.
              </p>
              <div className="space-y-1">
                <a 
                  href="tel:08098049358" 
                  className="flex items-center gap-2 font-semibold"
                >
                  <Phone className="text-blue-700" size={18} />
                  Call: 08098049358
                </a>
                <a 
                  href="https://wa.me/+2348037321960" 
                  className="flex items-center gap-2 font-bold"
                >
                  <FaWhatsappSquare className="text-blue-700 text-xl" />
                  08037321960
                </a>
              </div>
            </div>

            <div>
              <h2 className="font-semibold">Social Media Handles</h2>
              <div className="flex items-center space-x-5 mt-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-4 text-center text-xs text-gray-600 bg-white">
        &copy; {currentYear} ACReSAL Sokoto. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
