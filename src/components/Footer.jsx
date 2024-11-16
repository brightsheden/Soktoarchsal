import { Phone } from 'lucide-react';
import React from 'react';
import { FaInstagramSquare, FaTwitterSquare, FaWhatsappSquare } from 'react-icons/fa';
import { FaTwitter, FaWhatsapp } from 'react-icons/fa6';
import { MdFacebook } from 'react-icons/md';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-base-200 text-base-content">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Logo and Description Section */}
          <div className="space-y-4">
            <div className="w-1/2 max-w-[200px]">
              <img 
                src="acresal-logo.png"
                alt="ACReSAL Logo" 
                className="w-full h-auto"
              />
            </div>
            <p className="text-sm max-w-md">
              Sokoto State is participating in the ACReSAL project which is a multi-sectoral 
              and multi-institutional scheme, covering Environment, Agriculture and Water. 
              The project is to support the state combat desertification, restore degraded 
              lands and special ecosystems for agriculture and biodiversity conservation.
            </p>
          </div>

          {/* Quick Links Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-blue-700">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              <a href="/" className="hover:text-blue-700 transition-colors">
                Home
              </a>
              <a href="#about" className="hover:text-blue-700 transition-colors">
                About Us
              </a>
              <a href="#mission" className="hover:text-blue-700 transition-colors">
                Mission
              </a>
              <a href="#gallery" className="hover:text-blue-700 transition-colors">
                Gallery
              </a>
            </nav>
          </div>

          {/* Contact Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-blue-700">Contact Us</h3>
            <div className="space-y-2">
              <p className='font-semibold'>Address: N0 20 Zamfara Road, Sokoto, Sokoto State.</p>
              <p className="space-y-1">
                <a href='tel:08098049358' className="flex items-center gap-2 font-semibold"><Phone className='text-blue-700' size={18}/>  Call:08098049358</a>
                <a href='https://wa.me/+2348037321960' className="flex items-center gap-2 font-bold"><FaWhatsapp className='text-blue-700 text-1xl'/>  08037321960 </a>
              </p>
            </div>
            <div>
              <h2 className='font-semibold'>Social Media Handles</h2>
              
              <div className='flex items-center space-x-5 mt-2'>
                <a href='https://web.facebook.com/profile.php?id=100084274891426' target="_blank">
                  <MdFacebook className='size-6 text-blue-700'/>
                </a>
                
                <a href='https://www.instagram.com/sokoto_acresal/' target="_blank">
                  <FaInstagramSquare className='size-6 text-blue-700' />
                </a>

                <a href='https://x.com/AcresalSokoto' target="_blank">
                  <FaTwitterSquare className='size-6 text-blue-700'/>
                </a>

                <a href='https://wa.me/+2348037321960' target="_blank">
                  <FaWhatsappSquare className='size-6 text-blue-700'/>
                </a>
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