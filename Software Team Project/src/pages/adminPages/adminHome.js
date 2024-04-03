import React from 'react';
import logo from '../../images/KMITLLogo.png';
import '../../styles/adminStyles.css/adminHome.css';
import { Link } from 'react-router-dom';

function adminHome() {
  const userName = "Admin";

  return (
    <div className="app-container">
      <header className="header">
        <div className="am-header-content">
          <img src={logo} alt="Logo" className="am-logo" />
          <div>
            <h1 className="title">Home Page</h1>
            <p className="am-subtitle">{userName}</p>
          </div>
        </div>
      </header>
      <nav className="am-navbar">
        <div className="am-navbar-left">
            <p className="am-subtitle">King Monkut's Institute of Technology Ladkrabang</p>
        </div>
        <div className="am-navbar-right">
          <button className="am-logout-button">Logout</button>
        </div>
        
      </nav>
    </div>
  );
}

export default adminHome;
