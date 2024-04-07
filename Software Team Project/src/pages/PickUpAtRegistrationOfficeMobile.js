import React, { useState } from 'react';
import '../styles/PickUpAtRegistrationOfficeMobile.css';
import logo from '../images/KMITLLogo.png';
import kmitlRegisOfficeImage from '../images/kmitlimg2.jpg';
import { useNavigate } from 'react-router-dom';

function PickUpatRegistrationOfficeMobile() {
  const userName = "Thongchai Jaidee";
  const [selectedOption, setSelectedOption] = useState('');
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate('/');
  };
  const handleHome = () => {
    navigate('/Home');
  };
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="app-container">
      <header className="header">
        <div className="header-content">
          <img src={logo} alt="Logo" className="logo" />
          <div>
            <h1 className="title">Pick Up at Registration Office</h1>
            <p className="subtitle">{userName}</p>
          </div>
        </div>
      </header>
      <nav className="navbar">
        <div className="navbar-left">
          <button className="nav-button" onClick={handleHome}>Home Page</button>
        </div>
        <div className="navbar-right">
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      <div className="pc-announcement">
        <p className="pc-announcement-title">🎓 Pick Up at Registration Office 🎓</p>
        <img src={kmitlRegisOfficeImage} alt="Graduation Image" className="grad-image" />

        <p className="pc-description2">🎉 Congratulation 🎉</p>
        <p className="pc-description">Opting to pick up your degree certificate at the registration office during our regular business hours is a smart choice for those with busy schedules.</p>
        <p className="pc-description">We understand the demands of balancing academics and other commitments, and we're here to make the process as convenient as possible for you. </p>
        <p className="pc-description">Our office is open from 9:00 - 17:00</p>
        <p className="pc-description">Our dedicated staff will be ready to assist you in collecting your certificate and celebrating this significant milestone. </p>
        <p className="pc-description">Your certificate awaits your triumphant arrival!</p>
        
      </div>

      <div className="button-container">
        <button className="back-to-homepage-button-mb" onClick={handleHome}>Back to Home Page</button>
      </div>

    </div>
  );
}

export default PickUpatRegistrationOfficeMobile;