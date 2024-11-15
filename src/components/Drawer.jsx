import React, { useEffect } from "react";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
  ButtonGroup,
} from "@material-tailwind/react";
import { FaHome, FaList, FaMoneyBill, FaNewspaper, FaSignOutAlt, FaSuitcase, FaUser, FaUsers, FaVideo, FaYoutube } from "react-icons/fa";
//import { Link, useNavigate } from "react-router-dom";
import { Link } from "react-scroll";


 
export function DrawerPlacement({openRight, closeDrawerRight}) { 

    // Function to handle the activation of a link.
    const handleSetActive = (to) => {
      console.log(to);
    };
  return (
    <React.Fragment>
      <div className="flex flex-wrap gap-4">
       
      </div>
    
      <Drawer
        placement="left"
        open={openRight}
        onClose={closeDrawerRight}
        className="text-white bg-white"
      >
        <div className="flex flex-col px-2 py-6 bg-white text-blue-700 backdrop-blur-3xl">


        <div className="flex justify-between items-center mb-2 ">
          <Typography variant="h5" className="text-blue-700">
           Sokoto Acresal
          </Typography>
          <IconButton
            variant="text"
            className="text-blue-700"
            onClick={closeDrawerRight}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-7 w-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>

        </div>
          <div className="flex justify-center my-2">
            <img src='acresal-logo.png'/>
          </div>
      
          <div className="">
          <ul className="">
            <Link to={'/'}>
            <li className="nav-link">
              <span><FaHome/></span>

              <span> Home</span>
              
             </li>

            </Link>

            <Link 
            onClick={closeDrawerRight}
            activeClass="active" 
            to="about" 
            spy={true} 
            smooth={true} 
            offset={50} 
            duration={500} 
            onSetActive={handleSetActive}>
            <li className="nav-link">
              

              <span>About Us</span>
              
             </li>

            </Link>

            <Link 
              onClick={closeDrawerRight}
              activeClass="active" 
              to="mission" 
              spy={true} 
              smooth={true} 
              offset={50} 
              duration={500} 
              onSetActive={handleSetActive}>
            <li className="nav-link">
              

              <span>Our Mission</span>
              
             </li>

            </Link>

            <Link 
              onClick={closeDrawerRight}
              activeClass="active" 
              to="impact" 
              spy={true} 
              smooth={true} 
              offset={50} 
              duration={500} 
              onSetActive={handleSetActive}>
            <li className="nav-link">
              

              <span>Our Impact</span>
              
             </li>

            </Link>





  
        
           
          </ul>
         
        </div>
        </div>

       
      </Drawer>
      
    </React.Fragment>
  );
}