import React from 'react';
import logoKreso from "../images/Logo Name Only/Logo Name Only PNG file/1x/Kreso Logo - White.png";
import logoutLogo from '../images/logoutLogo.png';
import { useNavigate } from 'react-router-dom';
import '../styles/Header.css';

function Header({ title, userData }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    window.open("http://localhost:5000/logout", "_self");
  };

  return (
    <header className="headerHeader">
      <div className="header-content">
        <div className="header-left">
          <img src={logoKreso} alt="Logo" className="logo-header" />
        </div>
        <div className="header-center">
          <h1 className="title-header">{title}</h1>
          {userData && <p className="subtitle-header">{userData.displayName}</p>}
        </div>
        <div className="header-right">
          <img src={logoutLogo} alt="logoutLogo" className="logout-header" onClick={handleLogout} />
        </div>
      </div>
    </header>
  );
}

export default Header;
