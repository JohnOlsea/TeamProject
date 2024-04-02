import React, { useState } from 'react';
import '../styles/DegreeCertificateCollection.css';
import logo from '../images/KMITLLogo.png';
import { Link } from 'react-router-dom';

function DegreeCertificateCollection() {
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
            <h1 className="title">Degree Certificate Collection</h1>
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
        <p className="announcement-title">🎓 Degree Certificate Collection Options 🎓</p>
  
        <ol className="small-font-left-align">
          <li><span className="orange-text">Graduation Day Pickup:</span> You can choose to collect your degree certificate in person at the campus. This option allows you to celebrate your achievement with friends, family, and faculty members.</li>
          <p className="empty-line">&nbsp;</p>
          <li><span className="orange-text">Get it at the institute office:</span> If you prefer a more streamlined process, you can pick up your certificate at the institute office during regular business hours. This option is convenient for those who have busy schedules.</li>
          <p className="empty-line">&nbsp;</p>
          <li><span className="orange-text">Postal Delivery:</span> For those who are unable to collect their certificate in person, we offer postal delivery services. Your certificate will be securely packaged and sent to the address you provide. Please note that there will be an additional fee for postal delivery.</li>
        </ol>

        <div className="radio-buttons">
            <label>
                <input type="radio" name="pickupOption" value="graduationDay" />
                Graduation Day Pickup
            </label>
            <label>
                <input type="radio" name="pickupOption" value="registrationOffice" />
                Pick up at Registration Office
            </label>
            <label>
                <input type="radio" name="pickupOption" value="postalOffice" />
                Postal Office
            </label>
        </div>


      </div>

      <div className="button-container">
        <button className="submit-button">Submit</button>
      </div>

    </div>
  );
}

export default DegreeCertificateCollection;
