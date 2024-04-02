import React, { useState } from 'react';
import '../styles/PaymentCompleted.css';
import logo from '../images/KMITLLogo.png';
import { Link } from 'react-router-dom';

function PaymentCompleted() {
  const userName = "Thongchai Jaidee";
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="app-container">
      <header className="header">
        <div className="header-content">
          <img src={logo} alt="Logo" className="logo" />
          <div>
            <h1 className="title">Payment Completed</h1>
            <p className="subtitle">{userName}</p>
          </div>
        </div>
      </header>
      <nav className="navbar">
        <div className="navbar-left">
          <button className="nav-button" onClick={() => window.location.href='/personalInfo'}>Personal Information</button>
        </div>
        <div className="navbar-right">
          <button className="logout-button">Logout</button>
        </div>
      </nav>

      <div className="pc-announcement">
        <p className="pc-announcement-title">Congratulations! 🎉</p>

        <p className="pc-description">Your payment for the delivery of your graduation certificate has been successfully processed. </p>
        <p className="pc-description">You're one step closer to holding your hard-earned achievement in your hands. Sit back and relax as we swiftly handle the delivery process. </p>
        <p className="pc-description">Expect your certificate to arrive at your doorstep soon! 📜✨ </p>
        <p className="pc-description">If you have any further inquiries, feel free to reach out. We're here to assist you every step of the way. </p>
        
      </div>

    </div>
  );
}

export default PaymentCompleted;
