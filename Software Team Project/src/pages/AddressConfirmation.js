import React, { useState } from 'react';
import '../styles/PersonalInfo.css';
import logo from '../images/KMITLLogo.png'; 
import '../styles/AddressConfirmation.css';
import { useNavigate } from 'react-router-dom';
import PersonalInfo from './PersonalInfo';

function AddressConfirmation() {
  const userName = "Thongchai Jaidee";
  const navigate = useNavigate();
  const [receiver, setReceiver] = useState('');
  const [address, setAddress] = useState('');
  const [province, setProvince] = useState('');
  const [country, setCountry] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [validationErrors, setValidationErrors] = useState({
    receiver: false,
    address: false,
    province: false,
    country: false,
    postalCode: false
  });
  const [errorMessage, setErrorMessage] = useState('');
  const handleLogout = () => {
    navigate('/');
  };
  const handleHome = () => {
    navigate('/Home');
  };
  const handleSave = () => {
    const errors = {};
    if (!receiver.trim()) {
      errors.receiver = true;
    }
    if (!address.trim()) {
      errors.address = true;
    }
    if (!province.trim()) {
      errors.province = true;
    }
    if (!country.trim()) {
      errors.country = true;
    }
    if (!postalCode.trim()) {
      errors.postalCode = true;
    }
    setValidationErrors(errors);
    setErrorMessage('All fields are required');
    if (Object.keys(errors).length === 0) {
      navigate('/PaymentCompleted');
    }
  };
  const handleBack = () => {
    navigate('/Payment');
  };
  return (
    <div className="app-container">
      <header className="header">
        <div className="header-content">
          <img src={logo} alt="Logo" className="logo" />
          <div>
            <h1 className="title">Address Confirmation</h1>
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
      <div className="announcement-addressconfirm">
      <p className="announcement-title-addressconfirm">⚠ Address Confirmation ⚠</p>
      </div>
      <div className="address-inputs">
        <div className={`input-group ${validationErrors.receiver ? 'error' : ''}`}>        
          <label htmlFor="receiver">Receiver</label>
          <input
            type="text"
            placeholder="Firstname - Lastname"
            value={receiver}
            onChange={(e) => setReceiver(e.target.value)}
          />
        </div>
        <div className={`input-group ${validationErrors.address ? 'error' : ''}`}>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="address-inline-inputs">
          <div className={`input-group ${validationErrors.province ? 'error' : ''}`}>
            <label htmlFor="province">Province</label>
            <input
              type="text"
              placeholder="Province"
              value={province}
              onChange={(e) => setProvince(e.target.value)}
            />
          </div>
          <div className={`input-group ${validationErrors.country ? 'error' : ''}`}>
            <label htmlFor="country" style={{marginLeft:"4%"}}>Country</label>
            <input
              type="text"
              placeholder="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              style={{marginLeft:"4%"}}
            />
          </div>
        </div>
        <div className="address-postal-inputs">
          <div className={`input-group ${validationErrors.postalCode ? 'error' : ''}`}>
            <label htmlFor="postalCode">Postal Code</label>
            <input
              type="text"
              placeholder="Postal Code"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </div>
        </div>
      </div>
      {errorMessage && (
        <p className="error-message" style={{ textAlign: 'center', color: 'red' }}>{errorMessage}</p>
      )}
      <div style={{display:"flex", 
                   justifyContent:"center", 
                   marginTop:"10%"
                  }}
      >
        <button 
          className="back-button"
          onClick={handleBack}
          style={{ backgroundColor: 'white', 
                   color: '#FF6E2F', 
                   border: '2px solid black',
                   borderRadius:"5px", 
                   padding: '10px', 
                   fontSize: '100%',
                   width:"40%",
                }}
        >
          Back
        </button>
        <button 
          className="save-button" 
          onClick={handleSave}
          style={{ backgroundColor: 'white', 
                   color: '#FF6E2F', 
                   border: '2px solid black',
                   borderRadius:"5px",  
                   padding: '10px', 
                   fontSize: '100%',
                   marginLeft: '10%',
                   width:"40%", 
                }}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default AddressConfirmation;