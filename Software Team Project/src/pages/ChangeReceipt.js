import React, { useState, useRef, useEffect} from 'react';
import '../styles/Payment.css';
import logo from '../images/KMITLLogo.png';
import kmitlQRCode from '../images/kmitlQRCode.png'; 
import receiptImage from '../images/receipt.jpg'; 
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function ChangeReceipt() {
  const [receiptUploaded, setReceiptUploaded] = useState(false);
  const [receiptFile, setReceiptFile] = useState(null);
  const [submitClicked, setSubmitClicked] = useState(false);
  const [userData, setUserData] = useState({});
  const userName = userData.displayName;

  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:5000/login/success", {
        withCredentials: true,
      });
      setUserData(response.data.user);
    } catch (err) {
      console.log(err);
      navigate("/");
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const navigate = useNavigate();
  const fileInputRef = useRef(null);
 
  const handleLogout = () => {
    window.open("http://localhost:5000/logout", "_self");
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
      const formData = new FormData();
      formData.append('image', receiptFile);
      formData.append('student_id', userData.email.split("@")[0]);
      axios.post("http://localhost:5000/upload_receipt", formData)
      .then(res => console.log(res))
      .catch(err => console.log(err));  
      navigate('/seeyouroption');
    }
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

export default ChangeReceipt;