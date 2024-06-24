import React from 'react';
import logoKreso from "../../images/Logo Name Only/Logo Name Only PNG file/1x/Kreso Logo - White.png";
import logoutLogo from "../../images/logoutLogo.png";
import { IoChevronBackCircleOutline, IoHomeOutline } from "react-icons/io5";
import { MdLocalPrintshop } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import "../../styles/adminStyles/adminHeader.css";

function AdminHeader({ title, userName, onBack, backIconType }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  const handleBack = () => {
    navigate("/adminPrint")
  }

  return (
    <header className="ah-header">
      <div className="ah-header-content">
        <div className="ah-header-left">
          {backIconType === 'home' ? (
            <IoHomeOutline size={35} color="white" className="ah-back-icon" onClick={onBack} />
          ) : backIconType === 'print' ? (
            <MdLocalPrintshop size={40} color="white" className="ah-back-icon" onClick={onBack} />
          ) : (
            <IoChevronBackCircleOutline size={40} color="white" className="ah-back-icon" onClick={handleBack} />
          )}
        </div>
        <img src={logoKreso} alt="Logo" className="ah-logo" />
        <div>
          <h1 className="ah-title">{title}</h1>
        </div>
        <div className="ah-header-right">
          <img src={logoutLogo} alt="logoutLogo" className="ah-logo-logout" onClick={handleLogout}/>
        </div>
      </div>
    </header>
  );
}

export default AdminHeader;
