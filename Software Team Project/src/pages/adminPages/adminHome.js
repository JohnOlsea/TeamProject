import React from 'react';
import '/Users/teerapatwattanamanont/Documents/GitHub/TeamProject/Software Team Project/src/styles/adminStyles.css/adminHome.css';
import logo from '../../images/KMITLLogo.png';
import { Link } from 'react-router-dom';

function adminHome() {
  const userName = "Admin";

  return (
    <div className="app-container">
      <header className="header">
        <div className="header-content">
          <img src={logo} alt="Logo" className="logo" />
          <div>
            <h1 className="title">Home Page</h1>
            <p className="subtitle">{userName}</p>
          </div>
        </div>
      </header>
      <nav className="navbar">
        <div className="navbar-right">
          <button className="logout-button">Logout</button>
        </div>
      </nav>
    </div>
  );
}

export default adminHome;
