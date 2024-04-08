import React from 'react';
import logo from '../images/KMITLLogo.png';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function SeeYourOption({ selectedOption }) {
    const userName = "Thongchai Jaidee";
    const navigate = useNavigate();
    const handlePersonalInfo = () => {
        navigate('/personalInfo');
      };
    const handleLogout = () => {
        navigate('/');
      };
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
        <h2>Option: {selectedOption}</h2>
        {/* Render additional details based on the selected option */}
        {selectedOption === 'graduationDay' && (
          <>
            <p>Your option details for Graduation Day Pickup</p>
            <button>Change Your Option</button>
          </>
        )}
        {selectedOption === 'registrationOffice' && (
          <>
            <p>Your option details for Pick up at Registration Office</p>
            <button>Change Your Option</button>
          </>
        )}
        {selectedOption === 'postalOffice' && (
          <>
            <p>Your option details for Postal Office</p>
            <button>Change Your Option</button>
            <button>See Receipt</button>
            <table>
              {/* Render address details here */}
              <tbody>
                <tr>
                  <td>Address:</td>
                  <td>Your address details here</td>
                </tr>
                {/* Add more details like delivery status and shipping ID */}
              </tbody>
            </table>
            <button>Edit Address</button>
          </>
        )}
      </div>
        </div>
      );
}

export default SeeYourOption;