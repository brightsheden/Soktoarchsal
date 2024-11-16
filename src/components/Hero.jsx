import React, { useState, useEffect } from 'react';
import './Hero.css'
import ReactTypingEffect from 'react-typing-effect';

const heroVariants = [
  {
    backgroundImage: "url('/images/img1.jpeg')",
    title: 'Welcome to ACReSAL Sokoto – Building a Resilient Future for Our Land and Communities',
    description:
      "Building a resilient future for our land and communities. Join us as we transform landscapes and promote sustainability.",
    buttonText: 'Learn More',
  },
  {
    backgroundImage: "url('/images/img2.jpeg')",
    title: 'Restoring Our Ecosystem',
    description:
      "Through innovation and dedication, we're restoring over 50,000 hectares and empowering vulnerable communities.",
    buttonText: 'Join the Mission',
  },
  {
    backgroundImage: "url('/images/img3.jpeg')",
    title: 'Sustainable Land Management',
    description:
      "Together, we can ensure Sokoto thrives in harmony with the environment. Be part of the change.",
    buttonText: 'Take Action',
  },
  {
    backgroundImage: "url('/images/img4.jpeg')",
    title: 'A Greener Sokoto for Tomorrow',
    description:
      "Discover how ACReSAL is making a difference in promoting resilience and sustainability.",
    buttonText: 'Discover More',
  },
];

function Hero() {
  const [currentVariant, setCurrentVariant] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVariant((prev) => (prev + 1) % heroVariants.length);
    }, 8000); // Change interval time as needed (in milliseconds)

    return () => clearInterval(interval);
  }, []);

  const { backgroundImage, title, description, buttonText } = heroVariants[currentVariant];

  return (
    <div
      style={{
        backgroundImage,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundBlendMode: 'multiply',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      }}
      className="min-h-screen flex items-center justify-center text-center text-white transition-all duration-1000"
    >
      <div>
        <h1 className="text-[30px] md:text-[50px] font-bold motion-preset-slide-right">
        <ReactTypingEffect
                text={[`${title}`]}
                typingDelay={1000}
                speed={100}
                cursorRenderer={cursor => <span>{cursor}</span>}
                displayTextRenderer={(title, i) => {
                  return (
                    <span>{title}</span>
                  );
                }}
       />
        </h1>
        <p className="my-5 text-sm motion-preset-typewriter">{description}</p>
        <a href='/#about' className="bg-blue-700 text-white p-4 rounded-md hover:bg-green-800">
          {buttonText}
        </a>
      </div>
    </div>
  );
}

export default Hero;
