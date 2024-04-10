import React, { useEffect, useState } from 'react';
import '../styles/GraduationDayPickUpDesktop.css';
import logo from '../images/KMITLLogo.png';
import kmitlGradImage from '../images/kmitlGrad1.webp'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

function GraduationDayPickupDesktop() {
  const [userData, setUserData] = useState({});
  const userName = userData.displayName;
  
  const navigate = useNavigate();

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

  const handleLogout = () => {
    window.open("http://localhost:5000/logout", "_self");
  };
  const handleHome = () => {
    navigate('/Home');
  };
  const handlePersonalInfo = () => {
    navigate('/personalInfo');
  };
  const handlePayNow = () => {
    navigate('/paymentNondelivery')
  }
  
  return (
    <div className="app-container">
      <header className="header">
        <div className="header-content">
          <img src={logo} alt="Logo" className="logo" />
          <div>
            <h1 className="title">Graduation Day Pickup</h1>
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

      <div className="gdp-announcement">
        <p className="gdp-announcement-title-dt">🎓 Graduation Day Pick Up 🎓</p>
        <img src={kmitlGradImage} alt="Graduation Image" className="gradPU-image-dt"/> 

        <p className="gdp-description2-dt">🎉 Congratulations on your upcoming graduation!🎉 </p>
        <p className="gdp-description-dt">We're thrilled that you've chosen the excitement of 'Graduation Day Pickup' to collect your degree certificate. Get ready to embrace the celebration of your achievement surrounded by friends, family, and faculty members. </p>
        <p className="gdp-description-dt">Your graduation day will be a moment to cherish forever, and we're honored to be a part of it. </p>
        <p className="gdp-description-dt">See you at the ceremony!</p>
        
      </div>

      <div className="button-container">
      <button 
          className="back-to-homepage-gdp-button-mb" 
          onClick={handlePayNow}
          style={{marginLeft:"3%", marginRight:"2%"}}
        >
          Pay Now
        </button>
        <button 
          className="back-to-homepage-gdp-button-mb" 
          onClick={handleHome}
          style={{marginRight:"3%"}}
        >
          Back to Home Page
        </button>
      </div>

    </div>
  );
}

export default GraduationDayPickupDesktop;