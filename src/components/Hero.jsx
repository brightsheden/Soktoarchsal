import React, { useState, useEffect } from 'react';

function Hero() {
  const [welcomeText, setWelcomeText] = useState('');

  useEffect(() => {
    const welcomeMessage = 'Welcome to ACReSAL Sokoto – Building a Resilient Future for Our Land and Communities';
    let index = 0;
    const interval = setInterval(() => {
      setWelcomeText(welcomeMessage.slice(0, index + 1));
      index++;
      if (index > welcomeMessage.length) {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        backgroundImage: "url('/images/img3.jpeg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundBlendMode: 'multiply',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      }}
      className="min-h-screen flex items-center pt-8 pb-0"
    >
      <div className="text-center text-white w-full">
        <div className="text-[30px] md:text-[50px] font-bold ">{welcomeText}</div>
        <div>
          <p className="my-5 text-sm">
            Together, we're transforming Sokoto's landscapes to secure a sustainable future. Through the ACReSAL Project, we're
            restoring over 50,000 hectares, promoting sustainable land management, and helping vulnerable communities thrive in
            harmony with the environment. Join us on this journey to resilience.
          </p>
        </div>
        <div className="mt-[40px] flex justify-center ">
          <button className="bg-[#FF6600] text-white p-4 rounded-md hover:bg-green-800">Explore Our Vision</button>
        </div>
      </div>
    </div>
  );
}

export default Hero;