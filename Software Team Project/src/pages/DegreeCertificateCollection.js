import React from 'react';
import '../styles/PersonalInfo.css';
import logo from '../images/KMITLLogo.png';
import { Link } from 'react-router-dom';

function Home() {
  const userName = "Thongchai Jaidee";

  return (
    <div className="app-container">
      <header className="header">
        <div className="header-content">
          <img src={logo} alt="Logo" className="logo" />
          <div>
            <h1 className="title">Degree Certificate Collection</h1>
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
      
    </div>
  );
}

export default Home;
