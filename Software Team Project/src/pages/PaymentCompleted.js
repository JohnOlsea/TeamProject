import React, { useState } from 'react';
import '../styles/PaymentCompleted.css';
import logo from '../images/KMITLLogo.png';
import { useNavigate } from 'react-router-dom';

function PaymentCompleted() {
  const userName = "Thongchai Jaidee";
  const studentId = 64011555;
  const address = "1 Chalong Krung 1 Alley, Lat Krabang";
  const province = "Bangkok";
  const country = "Thailand";
  const postalCode = 10520;

  const [selectedOption, setSelectedOption] = useState('');
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate('/');
  };
  const handleHome = () => {
    navigate('/Home');
  };
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="app-container">
      <header className="header">
        <div className="header-content">
          <img src={logo} alt="Logo" className="logo" />
          <div>
            <h1 className="title">Payment Completed</h1>
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

      <div className="pc-announcement">
        <p className="pc-announcement-title">Congratulations! 🎉</p>

        <p className="pc-description">Your payment for the delivery of your graduation certificate has been successfully processed. </p>
        <p className="pc-description">You're one step closer to holding your hard-earned achievement in your hands. Sit back and relax as we swiftly handle the delivery process. </p>
        <p className="pc-description">Expect your certificate to arrive at your doorstep soon! 📜✨ </p>
        <p className="pc-description">If you have any further inquiries, feel free to reach out. We're here to assist you every step of the way. </p>
        
        <p className="pc-description">
            Student ID: <span className="orange-text">{studentId}</span> <br />
            Name: <span className="orange-text">{userName}</span> <br />
            Address: <span className="orange-text">{address}</span> <br />
            Province: <span className="orange-text">{province}</span> <br />
            Country: <span className="orange-text">{country}</span> <br />
            Postal Code: <span className="orange-text">{postalCode}</span> 
        </p>

      </div>

      <div className="button-container">
        <button className="pc-back-to-homepage-button" onClick={handleHome}>Back to Home Page</button>
      </div>

    </div>
  );
}

export default PaymentCompleted;