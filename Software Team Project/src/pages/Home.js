import React from 'react';
import '../styles/Home.css';
import logo from '../images/KMITLLogo.png';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Home() {

  const [userData, setUserData] = useState({});
  console.log("response: ",userData);

  const handleLogout = () => {
    window.open("http://localhost:5000/logout","_self") 
  };

  const getUser = async()=>{
    // try {
    //   const response =  await axios.get("http://localhost:5000/login/success", {withCredentials:  true})
    //   setUserData(response.data.user)
    // } catch (err) {
    //   console.log(err);
    //   navigate('/');
    // }
  }

  useEffect(() => {
    getUser()
  }, [])

  // const userName = "Thongchai Jaidee";
  const userName = userData.displayName;

  const navigate = useNavigate();
  // const handleLogout = () => {
  //   navigate('/');
  // };
  const handlePersonalInfo = () => {
    navigate('/personalInfo');
  };
  const handleDegreeCertificateCollection = () => {
    navigate('/degreeCertificateCollection');
  };
  return (
    <div className="app-container">
      <header className="header">
        <div className="header-content">
          <img src={logo} alt="Logo" className="logo" />
          <div>
            <h1 className="title">Home Page</h1>
<<<<<<< Updated upstream
            <p className="subtitle">{userName}</p>
=======
              <p>{userName}</p>
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
        <p className="small-font-left-align">Whichever option you choose, we're committed to ensuring a smooth and efficient process for you.</p>
        <p className="small-font-left-align">If you have any questions or need further assistance, feel free to reach out to our administration team.</p>
        <p className="small-font-left-align">Once again, congratulations on this incredible milestone. We look forward to celebrating your success with you!</p>
        
=======
        <p className="homepage-description">Dear Graduates, You have <span className='orange-text'>three options</span> to collect your degree certificate:</p>
        

        {/* Buttons for options */}
        <button className="option-button" onClick={() => handleOptionClick("Graduation Day Pickup")}>Graduation Day Pickup</button>
        <div className={`option-description ${selectedOption === "Graduation Day Pickup" ? 'active' : ''}`}>
          <p className="small-font-left-align">
            Join us on Graduation Day to receive your certificate in person. Experience the joy of celebrating your accomplishments with your peers and loved ones.
          </p>
          <button className="choose-option-button" onClick={handleChooseOption}>Choose this option</button>
        </div>

        <button className="option-button" onClick={() => handleOptionClick("Pick up at Registration Office")}>Pick up at Registration Office</button>
        <div className={`option-description ${selectedOption === "Pick up at Registration Office" ? 'active' : ''}`}>
          <p className="small-font-left-align">
            You can visit the institute office at any time during working hours to collect your certificate.
          </p>
          <button className="choose-option-button" onClick={handleChooseOption}>Choose this option</button>
        </div>

        <button className="option-button" onClick={() => handleOptionClick("Postal Delivery")}>Postal Delivery</button>
        <div className={`option-description ${selectedOption === "Postal Delivery" ? 'active' : ''}`}>
          <p className="small-font-left-align">
            Prefer the comfort of receiving your certificate at your doorstep? Opt for postal delivery. Simply provide us with your mailing address, and we'll ensure your certificate reaches you securely.
          </p>
          <button className="choose-option-button" onClick={handleChooseOption}>Choose this option</button>
        </div>
>>>>>>> Stashed changes
      </div>

      <div className="button-container">
        <button className="choose-option-button" onClick={handleDegreeCertificateCollection}>Choose Your Option</button>
      </div>
    </div>
  );
}

export default Home;