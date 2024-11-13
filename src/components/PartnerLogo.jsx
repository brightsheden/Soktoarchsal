import React, { useRef ,useEffect} from 'react'

function PartnerLogo() {
    const scrollRef = useRef(null);

    useEffect(() => {
      const scrollContainer = scrollRef.current;
      if (scrollContainer) {
        const scrollWidth = scrollContainer.scrollWidth;
        const animationDuration = scrollWidth / 50; // Adjust speed here
  
        scrollContainer.style.animation = `scroll ${animationDuration}s linear infinite`;
      }
    }, []);
  return (
    <div className=' '>
      
        <div className="container mx-auto bg-white overflow-hidden my-5 p-4">
        <div 
          ref={scrollRef}
          className="flex space-x-4 infinite-scroll"
          style={{
            display: 'flex',
            width: 'max-content',
          }}
        >
          <div className="w-40 flex-shrink-0">
          <img className='w-full' src='nigeria.png'/>
          </div>
          <div className="w-40 flex-shrink-0">
          <img className='w-full' src='sokotogovehouse.jpg'/>
          </div>
          <div className="w-40 flex-shrink-0">
          <img className='w-full' src='arcsallogo.png'/>
          </div>
          <div className="w-40 flex-shrink-0">
          <img className='w-full' src='wordbanklogo.png'/>
          </div>

          <div className="w-40 flex-shrink-0">
          <img className='w-full' src='nigeria.png'/>
          </div>
          <div className="w-40 flex-shrink-0">
          <img className='w-full' src='sokotogovehouse.jpg'/>
          </div>
          <div className="w-40 flex-shrink-0">
          <img className='w-full' src='arcsallogo.png'/>
          </div>
          <div className="w-40 flex-shrink-0">
          <img className='w-full' src='wordbanklogo.png'/>
          </div>

        <div className="w-40 flex-shrink-0">
          <img className='w-full' src='nigeria.png'/>
          </div>
          <div className="w-40 flex-shrink-0">
          <img className='w-full' src='sokotogovehouse.jpg'/>
          </div>
          <div className="w-40 flex-shrink-0">
          <img className='w-full' src='arcsallogo.png'/>
          </div>
          <div className="w-40 flex-shrink-0">
          <img className='w-full' src='wordbanklogo.png'/>
          </div>


        </div>
      </div>
      
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .infinite-scroll {
          display: flex;
          width: max-content;
        }
      `}</style>
      
    </div>
  )
}

export default PartnerLogo
