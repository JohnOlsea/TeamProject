import React from 'react';
import '../styles/Home.css';
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
            <h1 className="title">Home Page</h1>
            <p className="subtitle">{userName}</p>
          </div>
        </div>
      </header>
      <nav className="navbar">
        <div className="navbar-left">
          <button className="nav-button" onClick={() => window.location.href='/personalInfo'}>Personal Information</button>
        </div>
        <div className="navbar-right">
          <button className="logout-button">Logout</button>
        </div>
      </nav>
      <div className="announcement">
        <p className="announcement-title">🎓📜 Important Announcement 📜🎓</p>
        <p className="announcement-title2">How to Obtain Your Degree Certificate</p>

        <p className="small-font-left-align">Dear Graduates,</p>
        <p className="small-font-left-align">Congratulations on your remarkable achievement! We understand that obtaining your degree certificate is a significant moment, and we're here to make the process as convenient as possible for you. You have three options to collect your degree certificate:</p>
  
        <ol className="small-font-left-align">
          <li><span className="orange-text">Graduation Day Pickup:</span> Join us on Graduation Day to receive your certificate in person. Experience the joy of celebrating your accomplishments with your peers and loved ones.</li>
          <p className="empty-line">&nbsp;</p>
          <li><span className="orange-text">Institute Office Pickup:</span> You can visit the institute office at any time during working hours to collect your certificate.</li>
          <p className="empty-line">&nbsp;</p>
          <li><span className="orange-text">Postal Delivery:</span> Prefer the comfort of receiving your certificate at your doorstep? Opt for postal delivery. Simply provide us with your mailing address, and we'll ensure your certificate reaches you securely.</li>
        </ol>

        <p className="small-font-left-align">Whichever option you choose, we're committed to ensuring a smooth and efficient process for you.</p>
        <p className="small-font-left-align">If you have any questions or need further assistance, feel free to reach out to our administration team.</p>
        <p className="small-font-left-align">Once again, congratulations on this incredible milestone. We look forward to celebrating your success with you!</p>
        
      </div>

      <div className="button-container">
        <button className="choose-option-button">Choose Your Option</button>
      </div>
      
    </div>
  );
}

export default Home;
