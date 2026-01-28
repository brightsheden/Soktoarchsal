import React from 'react';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Send } from 'lucide-react';
import { FaSquareWhatsapp } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import Logo from '../../public/acresal-logo.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { href: 'https://web.facebook.com/profile.php?id=100084274891426', icon: <Facebook size={20} />, label: 'Facebook' },
    { href: 'https://www.instagram.com/sokoto_acresal/', icon: <Instagram size={20} />, label: 'Instagram' },
    { href: 'https://x.com/AcresalSokoto', icon: <Twitter size={20} />, label: 'Twitter' },
    { href: 'https://wa.me/+2348037321960', icon: <FaSquareWhatsapp size={20} />, label: 'WhatsApp' }
  ];

  const quickLinks = [
    { href: '/', label: 'Home' },
    { href: '/#about', label: 'About Us' },
    { href: '/#gallery', label: 'Our Gallery' },
    { href: '/news', label: 'News & Updates' },
    { href: '/login', label: 'Staff Portal' }
  ];

  return (
    <footer className="bg-slate-900 text-slate-300 pt-20 pb-10 overflow-hidden relative">
      {/* Background Pattern */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/10 -skew-x-12 transform origin-top-right transition-all duration-1000" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Section */}
          <div className="col-span-1 lg:col-span-1">
            <Link to="/" className="inline-block mb-8">
              <img src={Logo} alt="ACReSAL Logo" className="h-16 w-auto brightness-0 invert" />
            </Link>
            <p className="text-slate-400 leading-relaxed mb-8">
              Supporting Sokoto State in combating desertification, restoring degraded lands, and ensuring sustainable agriculture and biodiversity conservation for a resilient future.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700 text-slate-400 transition-all hover:bg-primary hover:text-white hover:border-primary"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:pl-8">
            <h3 className="text-white text-xl font-bold mb-8">Quick Links</h3>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="flex items-center gap-2 hover:text-primary-light transition-colors group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary text-transparent">.</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-white text-xl font-bold mb-8">Get In Touch</h3>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center shrink-0">
                  <MapPin size={20} className="text-primary-light" />
                </div>
                <p className="text-slate-400">N0 20 Zamfara Road, Sokoto, Sokoto State, Nigeria.</p>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center shrink-0">
                  <Phone size={20} className="text-primary-light" />
                </div>
                <div>
                  <a href="tel:08098049358" className="block text-slate-400 hover:text-white transition-colors">08098049358</a>
                  <a href="tel:08037321960" className="block text-slate-400 hover:text-white transition-colors">08037321960</a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center shrink-0">
                  <Mail size={20} className="text-primary-light" />
                </div>
                <a href="mailto:info@sokotoacresal.gov.ng" className="text-slate-400 hover:text-white transition-colors">info@sokotoacresal.gov.ng</a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white text-xl font-bold mb-8">Newsletter</h3>
            <p className="text-slate-400 mb-6">Stay updated with our latest news and environmental initiatives.</p>
            <div className="relative">
              <input
                type="email"
                placeholder="Email Address"
                className="w-full bg-slate-800 border border-slate-700 rounded-full py-3 px-6 text-white placeholder:text-slate-500 focus:outline-none focus:border-primary transition-colors"
              />
              <button className="absolute right-1.5 top-1.5 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white transition-transform hover:scale-110 active:scale-95">
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-slate-500">
            &copy; {currentYear} Sokoto ACReSAL. All rights reserved.
          </p>
          <div className="flex items-center gap-8 text-sm text-slate-500">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
