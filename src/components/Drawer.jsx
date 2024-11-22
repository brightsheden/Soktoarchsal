import React from "react";
import { useNavigate } from 'react-router-dom';
import {
  Drawer,
  Typography,
  IconButton,
} from "@material-tailwind/react";

export function DrawerPlacement({openRight, closeDrawerRight}) { 
    const navigate = useNavigate();

    const navigateToSection = (path, sectionId) => {
      // Navigate first
      navigate(path, {
        state: { scrollToSection: sectionId }
      });

      // Optional: Close drawer after navigation
      closeDrawerRight();
    };

    const navLinks = [
      { 
        path: '/', 
        label: 'Home',
        sectionId: null
      },
      { 
        path: '/', 
        label: 'About Us',
        sectionId: 'about'
      },
      { 
        path: '/', 
        label: 'Mission',
        sectionId: 'about'
      },
      { 
        path: '/', 
        label: 'Gallery',
        sectionId: 'gallery'
      },
      {
        path: '/news',
        label: 'News',
        sectionId: null
      },
      {
        path: '/login',
        label: 'Staff Login',
        sectionId: null
      }
    ];

    return (
      <React.Fragment>
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
              <img src='acresal-logo.png' alt="Acresal Logo"/>
            </div>
      
            <div>
              <ul>
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <div 
                      onClick={() => {
                        // If section exists, navigate with section
                        if (link.sectionId) {
                          navigateToSection(link.path, link.sectionId);
                        } else {
                          // Otherwise, just navigate to the path
                          navigate(link.path);
                          closeDrawerRight();
                        }
                      }}
                      className='
                        relative 
                        text-gray-700 
                        font-medium 
                        px-3 
                        py-2 
                        rounded-md 
                        transition-all 
                        duration-300 
                        hover:text-blue-700 
                        hover:bg-blue-50
                        group
                        cursor-pointer
                      '
                    >
                      {link.label}
                      <span 
                        className='
                          absolute 
                          bottom-0 
                          left-0 
                          w-0 
                          h-0.5 
                          bg-blue-700 
                          transition-all 
                          duration-300 
                          group-hover:w-full
                        '
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Drawer>
      </React.Fragment>
    );
}