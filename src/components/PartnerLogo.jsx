import React from 'react';
import { motion } from 'framer-motion';

const partners = [
  { name: 'Nigeria Bureau of Statistics', logo: 'nigeria.png' },
  { name: 'Sokoto Government House', logo: 'sokotogovehouse.jpg' },
  { name: 'ACReSAL National', logo: 'arcsallogo.png' },
  { name: 'World Bank', logo: 'wordbanklogo.png' },
];

function PartnerLogo() {
  // Triple the partners for seamless loop
  const duplicatedPartners = [...partners, ...partners, ...partners];

  return (
    <div className="relative py-10 bg-white overflow-hidden group">
      {/* Fade Gradients */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />

      <motion.div
        className="flex gap-16 items-center"
        animate={{
          x: [0, -100 * partners.length],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 20,
            ease: "linear",
          },
        }}
        style={{ width: 'max-content' }}
      >
        {duplicatedPartners.map((p, i) => (
          <div
            key={i}
            className="w-48 transition-all duration-300 filter grayscale hover:grayscale-0 opacity-60 hover:opacity-100 scale-90 hover:scale-105"
          >
            <img
              src={p.logo}
              alt={p.name}
              className="w-full h-24 object-contain"
            />
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export default PartnerLogo;
