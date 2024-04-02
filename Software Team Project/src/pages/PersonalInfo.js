import React from 'react';
import '../styles/PersonalInfo.css';
import logo from '../images/KMITLLogo.png';
import { Link } from 'react-router-dom';

function PersonalInfo() {
  const userName = "Thongchai Jaidee";

  return (
    <div className="app-container">
      <header className="header">
        <div className="header-content">
          <img src={logo} alt="Logo" className="logo" />
          <div>
            <h1 className="title">Personal Information</h1>
            <p className="subtitle">{userName}</p>
          </div>
        </div>
      </header>
      <nav className="navbar">
        <div className="navbar-left">
          <button className="nav-button" onClick={() => window.location.href='/home'}>Home Page</button>
        </div>
        <div className="navbar-right">
          <button className="logout-button">Logout</button>
        </div>
      </nav>

      <div className="data-container">
        <div className="data-field">
          <label htmlFor="studentId">Student ID</label>
          <input type="text" id="studentId" />
        </div>
        <div className="data-field">
          <label htmlFor="citizenId">Citizen ID</label>
          <input type="text" id="citizenId" />
        </div>
        <div className="data-field">
          <label htmlFor="firstName">First Name</label>
          <input type="text" id="firstName" />
        </div>
        <div className="data-field">
          <label htmlFor="lastName">Last Name</label>
          <input type="text" id="lastName" />
        </div>
      </div>
      
    </div>
  );
}

export default PersonalInfo;
