import React, { useState } from 'react';
import logo from '../images/KMITLLogo.png';
import kmitlGradImage from '../images/kmitlGrad1.webp'; 
import { useNavigate } from 'react-router-dom';
import GraduationDayPickUpMobile from './GraduationDayPickUpMobile';
import GraduationDayPickUpDesktop from './GraduationDayPickUpDesktop';


function GraduationDayPickup() {

    if (window.innerWidth <= 768) {
        console.log("This is Mobile")
     } else {
        console.log("This is Desktop")
    }

  return (
    <div className="app">
      {/* Conditionally render components based on device width */}
      {window.innerWidth <= 768 ? <GraduationDayPickUpMobile /> : <GraduationDayPickUpDesktop />}
    </div>
  );
}

export default GraduationDayPickup;