import React, { useState } from 'react';
import '../styles/Payment.css';
import logo from '../images/KMITLLogo.png';
import kmitlQRCode from '../images/kmitlQRCode.png'; 
import { Link } from 'react-router-dom';

function Payment() {
  const userName = "Thongchai Jaidee";
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="app-container">
      <header className="header">
        <div className="header-content">
          <img src={logo} alt="Logo" className="logo" />
          <div>
            <h1 className="title">Payment</h1>
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

      <div className="pm-announcement">
        <img src={kmitlQRCode} alt="QRCode Image" className="qrcode-image" /> 
      </div>

      <div className="button-container">
        <button className="upload-receipt-button">Upload Receipt</button>
      </div>

      <div className="button-container">
        <button className="payment-submit-button">Submit</button>
      </div>


    </div>
  );
}

export default Payment;
