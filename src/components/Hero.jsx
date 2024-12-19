import React, { useState, useEffect } from 'react';

const heroVariants = [
  {
    backgroundImage: "url('/images/img1.jpeg')",
    title: 'Welcome to ACReSAL Sokoto – Building a Resilient Future for Our Land and Communities',
    description: "Building a resilient future for our land and communities. Join us as we transform landscapes and promote sustainability.",
    buttonText: 'Learn More',
    animation: 'slide-right'
  },
  {
    backgroundImage: "url('/images/img2.jpeg')",
    title: 'Restoring Our Ecosystem',
    description: "Through innovation and dedication, we're restoring over 50,000 hectares and empowering vulnerable communities.",
    buttonText: 'Join the Mission',
    animation: 'slide-up'
  },
  {
    backgroundImage: "url('/images/img3.jpeg')",
    title: 'Sustainable Land Management',
    description: "Together, we can ensure Sokoto thrives in harmony with the environment. Be part of the change.",
    buttonText: 'Take Action',
    animation: 'fade'
  },
  {
    backgroundImage: "url('/images/img4.jpeg')",
    title: 'A Greener Sokoto for Tomorrow',
    description: "Discover how ACReSAL is making a difference in promoting resilience and sustainability.",
    buttonText: 'Discover More',
    animation: 'zoom'
  },
];

const Hero = () => {
  const [currentVariant, setCurrentVariant] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [exitAnimation, setExitAnimation] = useState('');
  const [enterAnimation, setEnterAnimation] = useState('');
  const [displayedText, setDisplayedText] = useState('');
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  const getAnimationClasses = (type, isExit = false) => {
    const animations = {
      'slide-right': {
        enter: 'translate-x-0 opacity-100',
        exit: '-translate-x-full opacity-0',
        initial: 'translate-x-full opacity-0'
      },
      'slide-left': {
        enter: 'translate-x-0 opacity-100',
        exit: 'translate-x-full opacity-0',
        initial: '-translate-x-full opacity-0'
      },
      'slide-up': {
        enter: 'translate-y-0 opacity-100',
        exit: 'translate-y-full opacity-0',
        initial: '-translate-y-full opacity-0'
      },
      'slide-down': {
        enter: 'translate-y-0 opacity-100',
        exit: '-translate-y-full opacity-0',
        initial: 'translate-y-full opacity-0'
      },
      'fade': {
        enter: 'opacity-100',
        exit: 'opacity-0',
        initial: 'opacity-0'
      },
      'zoom': {
        enter: 'scale-100 opacity-100',
        exit: 'scale-50 opacity-0',
        initial: 'scale-150 opacity-0'
      }
    };

    return animations[type] ? (isExit ? animations[type].exit : animations[type].enter) : '';
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleSlideChange((currentVariant + 1) % heroVariants.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [currentVariant]);

  // Typewriter effect
  useEffect(() => {
    const text = heroVariants[currentVariant].title;
    if (currentCharIndex < text.length && isTyping) {
      const timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, currentCharIndex + 1));
        setCurrentCharIndex(prev => prev + 1);
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [currentCharIndex, currentVariant, isTyping]);

  const handleSlideChange = (newIndex) => {
    setIsTransitioning(true);
    setIsTyping(false);
    setExitAnimation(getAnimationClasses(heroVariants[currentVariant].animation, true));
    
    setTimeout(() => {
      setCurrentVariant(newIndex);
      setEnterAnimation(getAnimationClasses(heroVariants[newIndex].animation));
      setCurrentCharIndex(0);
      setDisplayedText('');
      setIsTyping(true);
      setIsTransitioning(false);
    }, 500);
  };

  const { backgroundImage, title, description, buttonText } = heroVariants[currentVariant];

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div
        className={`absolute inset-0 transition-all duration-700 ${
          isTransitioning ? 'scale-110' : 'scale-100'
        }`}
        style={{
          backgroundImage,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="relative h-full flex items-center justify-center px-4">
        <div 
          className={`max-w-4xl text-center transition-all duration-500 transform
            ${isTransitioning ? exitAnimation : enterAnimation}`}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            {displayedText}
            <span className="animate-blink">|</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-200 mb-8">
            {description}
          </p>

          <div className="flex gap-4 justify-center">
            <a
              href="/#about"
              className="inline-flex items-center px-8 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg transform transition-all duration-300 hover:scale-105 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
            >
              {buttonText}
            </a>
            <button
              className="inline-flex items-center px-8 py-3 text-lg font-semibold text-blue-600 bg-white rounded-lg transform transition-all duration-300 hover:scale-105 hover:bg-gray-100 focus:ring-4 focus:ring-blue-300"
            >
              Watch Video
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
        {heroVariants.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentVariant === index ? 'bg-white scale-125' : 'bg-white/50'
            }`}
            onClick={() => handleSlideChange(index)}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 1s infinite;
        }
      `}</style>
    </div>
  );
};

export default Hero;