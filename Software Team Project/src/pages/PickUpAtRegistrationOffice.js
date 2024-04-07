import React, { useState } from 'react';
import '../styles/PaymentCompleted.css';
import logo from '../images/KMITLLogo.png';
import kmitlRegisOfficeImage from '../images/kmitlimg2.jpg';
import { useNavigate } from 'react-router-dom';
import PickUpAtRegistrationOfficeDesktop from './PickUpAtRegistrationOfficeDesktop';
import PickUpAtRegistrationOfficeMobile from './PickUpAtRegistrationOfficeMobile';

function PickUpAtRegistrationOffice() {

    if (window.innerWidth <= 768) {
        console.log("This is Mobile")
     } else {
        console.log("This is Desktop")
    }

  return (
    <div className="app">
      {/* Conditionally render components based on device width */}
      {window.innerWidth <= 768 ? <PickUpAtRegistrationOfficeMobile /> : <PickUpAtRegistrationOfficeDesktop />}
    </div>
  );
}

export default PickUpAtRegistrationOffice;