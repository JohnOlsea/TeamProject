import React, { useState, useRef} from 'react';
import '../styles/Payment.css';
import logo from '../images/KMITLLogo.png';
import kmitlQRCode from '../images/kmitlQRCode.png'; 
import receiptImage from '../images/receipt.jpg'; 
import { useNavigate } from 'react-router-dom';

function Payment() {
  const userName = "Thongchai Jaidee";
  const [receiptUploaded, setReceiptUploaded] = useState(false);
  const [receiptFile, setReceiptFile] = useState(null);
  const [submitClicked, setSubmitClicked] = useState(false);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const handleLogout = () => {
    navigate('/');
  };
  const handlePersonalInfo = () => {
    navigate('/personalInfo');
  };
  
  const handleFileChange = (event) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setReceiptUploaded(true);
      setReceiptFile(file);
    }
  };
  const handleUploadButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleRemoveReceipt = () => {
    setReceiptUploaded(false);
    setReceiptFile(null);
  };
  const handleSubmit = () => {
    setSubmitClicked(true);
    if (receiptUploaded) {
      navigate('/AddressConfirmation');
    }
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
          <button className="nav-button" onClick={handlePersonalInfo}>Personal Information</button>
        </div>
        <div className="navbar-right">
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      <div className="pm-announcement">
        <img src={kmitlQRCode} alt="QRCode Image" className="qrcode-image" /> 
      </div>
        {receiptUploaded && (
          <div style={{ display: "flex", justifyContent:"center"}}>
            <p style={{ color: "#0aec0a", marginRight:"5%"}}>Receipt uploaded successfully!</p>
            <button className="remove-receipt-button" onClick={handleRemoveReceipt}>Remove</button>
          </div>
        )}
      <div className="button-container" >
      <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: 'none' }}
          ref={fileInputRef}
        />
        <button className="upload-receipt-button" onClick={handleUploadButtonClick}>Upload Receipt</button>

      </div>

      <div className="button-container">
        <button className="payment-submit-button" onClick={handleSubmit}>Submit</button>
      </div>
      {submitClicked && !receiptUploaded && (
          <p style={{ color: 'red', textAlign:'center'}}>Please upload a receipt before submitting.</p>
        )}

    </div>
  );
}

export default Payment;