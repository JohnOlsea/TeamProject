import React from 'react';
import logo from '../images/KMITLLogo.png';
import '../styles/SeeYourOption.css';
import { useNavigate } from 'react-router-dom';

function SeeYourOption({ selectedOption }) {
  const userName = "Thongchai Jaidee";
  const navigate = useNavigate();

  const handlePersonalInfo = () => {
    navigate('/personalInfo');
  };

  const handleLogout = () => {
    navigate('/');
  };

  const handleOptionChange = () => {
    // Define the functionality to change the option here
    // For example, you can navigate to a different page to change the option
    navigate('/degreeCertificateCollection');
  };

  // Mocking the option text (to be replaced by data from the database)
  const optionText = "Graduation Day Pickup";

  return (
    <div className="app-container">
      <header className="header">
        <div className="header-content">
          <img src={logo} alt="Logo" className="logo" />
          <div>
            <h1 className="title">See Your Option</h1>
            <p className="subtitle">{userName}</p>
          </div>
        </div>
      </header>

      <nav className="navbar">
        <div className="navbar-left">
          <button className="nav-button" onClick={handlePersonalInfo}>Personal Information</button>
        </div>
        <div className="navbar-right">
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      <div className="option-details">
        <h2>Your Option: <span className="orange-text">{optionText}</span></h2>
        <button className="syo-change-your-option-button" onClick={handleOptionChange}>Change Your Option</button>
      </div>

      <div className="option-details">
        <h2>Delivery Status: </h2>
      </div>

      <div className="option-details">
        <h2>Shipping ID: </h2>
      </div>

      
      
      
      
    </div>

    
  );
}

export default SeeYourOption;
