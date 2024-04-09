import React, { useState, useEffect } from 'react';
import '../styles/DegreeCertificateCollection.css';
import logo from '../images/KMITLLogo.png';
import { useNavigate } from 'react-router-dom';
import SeeYourOption from './SeeYourOption';
import axios from "axios";


function DegreeCertificateCollection() {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState('');
  const [userData, setUserData] = useState("Not selected yet");

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

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/update_option', {
        email: userData.email,
        grant_option: selectedOption
      });
      
      switch (selectedOption) {
        case 'Graduation Day Pick up':
          navigate('/graduationDayPickup');
          break;
        case 'Pick up at Registration Office':
          navigate('/pickUpAtRegistrationOffice');
          break;
        case 'Postal Delivery':
          navigate('/Payment');
          break;
        default:
          break;
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  
  const handlePersonalInfo = () => {
    navigate('/personalInfo');
  };
  const handleLogout = () => {
    window.open("http://localhost:5000/logout", "_self");
  };
  const handleHome = () => {
    navigate('/Home');
  };
  return (
    <div className="app-container">
      <header className="header">
        <div className="header-content">
          <img src={logo} alt="Logo" className="logo" />
          <div>
            <h1 className="title">Degree Certificate Collection</h1>
            <p className="subtitle">{userData.displayName}</p>
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
        <p className="announcement-title">🎓 Degree Certificate Collection Options 🎓</p>
  
        <ol className="small-font-left-align">
          <li><span className="orange-text">Graduation Day Pick up:</span> You can choose to collect your degree certificate in person at the campus. This option allows you to celebrate your achievement with friends, family, and faculty members.</li>
          <p className="empty-line">&nbsp;</p>
          <li><span className="orange-text">Get it at the institute office:</span> If you prefer a more streamlined process, you can pick up your certificate at the institute office during regular business hours. This option is convenient for those who have busy schedules.</li>
          <p className="empty-line">&nbsp;</p>
          <li><span className="orange-text">Postal Delivery:</span> For those who are unable to collect their certificate in person, we offer postal delivery services. Your certificate will be securely packaged and sent to the address you provide. Please note that there will be an additional fee for postal delivery.</li>
        </ol>

        <div className="radio-buttons">
            <label>
                <input type="radio" name="pickupOption" value="Graduation Day Pick up" onChange={handleOptionChange}/>
                Graduation Day Pick up
            </label>
            <label>
                <input type="radio" name="pickupOption" value="Pick up at Registration Office" onChange={handleOptionChange}/>
                Pick up at Registration Office
            </label>
            <label>
                <input type="radio" name="pickupOption" value="Postal Delivery" onChange={handleOptionChange}/>
                Postal Delivery
            </label>
        </div>
      </div>

      <div className="button-container">
        <button className="submit-button" onClick={handleSubmit}>Confirm</button>
      </div>
      <div className="button-container">
        <button className="back-to-homepage-button-d" onClick={handleHome}>Back to Home Page</button>
      </div>

      {selectedOption && <SeeYourOption selectedOption={selectedOption} />}
    </div>
  );
}

export default DegreeCertificateCollection;