import React, { useState } from 'react';
import logo from '../images/KMITLLogo.png';
import '../styles/SeeYourOption.css';
import receiptImage from '../images/receipt.jpg'; 
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

function ChangeReceipt() {
    const userName = "Thongchai Jaidee";
    const navigate = useNavigate();
    const handleHome = () => {
      navigate('/Home');
    };
    const handleLogout = () => {
      navigate('/');
    };
    const [receipt, setReceipt] = useState('../images/receipt.jpg');
    const handleChangeReceipt = () => {
        setReceipt('../images/new_receipt.jpg');
    };
    return (
        <div className="app-container">
            <header className="header">
                <div className="header-content">
                    <img src={logo} alt="Logo" className="logo" />
                    <div>
                        <h1 className="title">Change Receipt</h1>
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
            <div className="receipt-container">
                <img src={receipt} alt="Receipt" className="receipt-image" />
                <button className="change-receipt-button" onClick={handleChangeReceipt}>Change Receipt</button>
            </div>
        </div>
    );
}

export default ChangeReceipt;