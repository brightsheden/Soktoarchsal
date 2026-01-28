import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Play } from 'lucide-react';

const heroVariants = [
  {
    backgroundImage: "url('/images/img1.jpeg')",
    title: 'Building a Resilient Future for Our Land',
    subtitle: 'Welcome to ACReSAL Sokoto',
    description: "Join us as we transform landscapes and promote sustainability. We are dedicated to building a resilient future for our communities.",
    buttonText: 'Explore Mission',
  },
  {
    backgroundImage: "url('/images/img2.jpeg')",
    title: 'Restoring Our Precious Ecosystem',
    subtitle: 'Impact & Dedication',
    description: "Through innovation and dedication, we're restoring over 50,000 hectares and empowering vulnerable communities across the region.",
    buttonText: 'Join the Mission',
  },
  {
    backgroundImage: "url('/images/img3.jpeg')",
    title: 'Sustainable Land Management Solutions',
    subtitle: 'Future Focused',
    description: "Together, we can ensure Sokoto thrives in harmony with the environment. Be part of the change for a sustainable tomorrow.",
    buttonText: 'Take Action',
  },
  {
    backgroundImage: "url('/images/img4.jpeg')",
    title: 'A Greener Sokoto for the Generations',
    subtitle: 'Sustainable Growth',
    description: "Discover how ACReSAL is making a difference in promoting resilience and long-term environmental sustainability.",
    buttonText: 'Discover More',
  },
];

const Hero = () => {
  const [currentVariant, setCurrentVariant] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVariant((prev) => (prev + 1) % heroVariants.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-slate-900">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentVariant}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: heroVariants[currentVariant].backgroundImage }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/40 to-transparent" />
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="relative h-full flex items-center container mx-auto px-4 md:px-8">
        <div className="max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentVariant}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 text-primary-light text-sm font-bold uppercase tracking-widest mb-6">
                {heroVariants[currentVariant].subtitle}
              </span>

              <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6">
                {heroVariants[currentVariant].title}
              </h1>

              <p className="text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl">
                {heroVariants[currentVariant].description}
              </p>

              <div className="flex flex-wrap gap-5">
                <button className="btn-primary-premium group">
                  {heroVariants[currentVariant].buttonText}
                  <ChevronRight size={20} className="transition-transform group-hover:translate-x-1" />
                </button>
                <button className="px-8 py-3 rounded-full font-semibold text-white border border-white/30 backdrop-blur-sm transition-all hover:bg-white/10 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    <Play size={16} fill="white" />
                  </div>
                  Watch Video
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Progress Indicators */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-4 z-10">
        {heroVariants.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentVariant(index)}
            className="group relative py-4 focus:outline-none"
          >
            <div className={`h-1 rounded-full transition-all duration-500 ${currentVariant === index ? 'w-12 bg-primary' : 'w-6 bg-white/30 group-hover:bg-white/50'
              }`} />
          </button>
        ))}
      </div>

      {/* Slide Numbers */}
      <div className="absolute bottom-8 right-8 hidden md:flex items-baseline gap-2">
        <span className="text-4xl font-bold text-white">0{currentVariant + 1}</span>
        <span className="text-slate-500 font-medium">/ 0{heroVariants.length}</span>
      </div>
    </div>
  );
};

export default Hero;