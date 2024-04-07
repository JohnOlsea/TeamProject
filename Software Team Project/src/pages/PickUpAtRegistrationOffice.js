import React, { useState } from 'react';
import '../styles/PaymentCompleted.css';
import logo from '../images/KMITLLogo.png';
import kmitlRegisOfficeImage from '../images/kmitlimg2.jpg';
import { useNavigate } from 'react-router-dom';

function PickUpatRegistrationOffice() {
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

        <p className="pc-description">Congratulations on your upcoming graduation!</p>
        <p className="pc-description">We're thrilled that you've chosen the excitement of 'Graduation Day Pickup' to collect your degree certificate. Get ready to embrace the celebration of your achievement surrounded by friends, family, and faculty members. </p>
        <p className="pc-description">Your graduation day will be a moment to cherish forever, and we're honored to be a part of it. </p>
        <p className="pc-description">See you at the ceremony</p>
        
      </div>

    </div>
  );
}

export default PickUpatRegistrationOffice;