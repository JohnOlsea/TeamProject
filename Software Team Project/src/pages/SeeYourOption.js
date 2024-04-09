import React, { useState } from 'react';
import logo from '../images/KMITLLogo.png';
import '../styles/SeeYourOption.css';
import receiptImage from '../images/receipt.jpg'; 
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

function SeeYourOption({ selectedOption }) {
  const userName = "Thongchai Jaidee";
  const [receiptVisible, setReceiptVisible] = useState(false);
  const [addressInfo, setAddressInfo] = useState({
    receiver: "Thanawat Rodklay",
    phonenumber: "099-999-9999",
    address: "456 Elm Street",
    subdistrict: "Uptown",
    district: "Metro City",
    province: "Bangkok",
    postalCode: "10240"
  });
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();

  const handleHome = () => {
    navigate('/Home');
  };

  const handleLogout = () => {
    navigate('/');
  };

  const handleSeeReceipt = () => {
    window.open(receiptImage, '_blank');
    };
  const handleChangeReceipt = () => {
    navigate('/changeReceipt');
  };
  const handleOptionChange = () => {
    navigate('/degreeCertificateCollection');
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = () => {
    setEditMode(false);
    console.log('Edited data:', addressInfo);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddressInfo({ ...addressInfo, [name]: value });
  };

  // Mocking the option text (to be replaced by data from the database)
  const optionText = "Postal Office";

  return (
    <div className="app-container">
      <header className="header">
        <div className="header-content">
          <img src={logo} alt="Logo" className="logo" />
          <div>
            <h1 className="title">See Your Option</h1>
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

      <div className="option-details">
        <h2>Your Option: <span className="orange-text">{optionText}</span></h2>
        <button className="syo-change-your-option-button" onClick={handleOptionChange}>Change Your Option</button>
      </div>
      <div className="receipt-div">
        <button className="syo-change-your-option-button"
        onClick={handleSeeReceipt} 
        style={{marginRight:"5%"}}>
          See Receipt
        </button>
        <button className="syo-change-your-option-button" onClick={handleChangeReceipt}>
          Change Receipt
        </button>
      </div>
      <div className="address-info-table">
        <table>
          <tbody>
            <tr>
              <th>Name:</th>
              <td>{addressInfo.receiver}</td>
            </tr>
            <tr>
              <th>Tel.:</th>
              <td>
                {editMode ? (
                  <input type="text" name="phonenumber" value={addressInfo.phonenumber} onChange={handleInputChange} />
                ) : (
                  addressInfo.phonenumber
                )}
              </td>
            </tr>
            <tr>
              <th>Address:</th>
              <td>
                {editMode ? (
                  <input type="text" name="address" value={addressInfo.address} onChange={handleInputChange} />
                ) : (
                  addressInfo.address
                )}
              </td>
            </tr>
            <tr>
              <th>Subdistrict:</th>
              <td>
                {editMode ? (
                  <input type="text" name="subdistrict" value={addressInfo.subdistrict} onChange={handleInputChange} />
                ) : (
                  addressInfo.subdistrict
                )}
              </td>
            </tr>
            <tr>
              <th>District:</th>
              <td>
                {editMode ? (
                  <input type="text" name="district" value={addressInfo.district} onChange={handleInputChange} />
                ) : (
                  addressInfo.district
                )}
              </td>
            </tr>
            <tr>
              <th>Province:</th>
              <td>
                {editMode ? (
                  <input type="text" name="province" value={addressInfo.province} onChange={handleInputChange} />
                ) : (
                  addressInfo.province
                )}
              </td>
            </tr>
            <tr>
              <th>PostCode:</th>
              <td>
                {editMode ? (
                  <input type="text" name="postalCode" value={addressInfo.postalCode} onChange={handleInputChange} />
                ) : (
                  addressInfo.postalCode
                )}
              </td>
            </tr>
          </tbody>
        </table>
        {editMode ? (
          <button className="syo-change-your-option-button" onClick={handleSave}>Save</button>
        ) : (
          <button className="syo-change-your-option-button" onClick={handleEdit}>Edit</button>
        )}
      </div>

      <div className="option-details">
        <h2>Delivery Status: {optionText} </h2>
      </div>

      <div className="option-details">
        <h2>Shipping ID: {optionText} </h2>
      </div>
    </div>

    
  );
}

export default SeeYourOption;
