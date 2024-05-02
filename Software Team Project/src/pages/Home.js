import React from "react";
import "../styles/Home.css";
import logo from "../images/KMITLLogo.png";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function Home() {
  const [option, setOption] = useState({});
  const [userData, setUserData] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  
  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:8000/login/success", {
        withCredentials: true,
      });
      setUserData(response.data.user);
      const email = response.data.user.email;
      const fname = response.data.user.given_name;
      const sname = response.data.user.family_name;
      getOption(email, fname, sname);
    } catch (err) {
      console.log(err);
      navigate("/");
    }
  };

  const getOption = async (email, fname, sname) => {
    try {
      const student_id = email.split("@")[0];
      const response = await axios.get(
        `http://localhost:8000/grant_option/${student_id}?fname=${fname}&sname=${sname}`
      );
      console.log(response.data);
      if (response.data.grant_option != null)
        setOption(response.data.grant_option);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const userName = userData.displayName;

  const navigate = useNavigate();

  const handleLogout = () => {
    window.open("http://localhost:8000/logout", "_self");
  };
  const handleSeeYourOption = () => {
    navigate("/seeyouroption")
  }
  const handlePersonalInfo = () => {
    navigate("/personalInfo");
  };
  const handleDegreeCertificateCollection = () => {
    navigate("/degreeCertificateCollection");
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option === selectedOption ? null : option);
  };

  const handleChooseOption = () => {
    setShowPopup(true); 
  };

  const handleClosePopup = async () => {
    setShowPopup(false);
    const response = await axios.post('http://localhost:8000/update_option', {
      email: userData.email,
      grant_option: selectedOption
    });
    await axios.post('http://localhost:8000/create_image_path', {
      email: userData.email
    })
    navigate('/seeYourOption')
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://locaslhost:8000/update_option', {
        email: userData.email,
        grant_option: selectedOption
      });
      await axios.post('http://localhost:8000/create_image_path', {
        email: userData.email
      })
      switch (selectedOption) {
        case 'Graduation Day Pickup':
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


  return (
    <div className="app-container">
      <header className="header-homepage">
        <div className="header-content">
          <img src={logo} alt="Logo" className="logo-homepage" />
          <div>
            <h1 className="title">Home Page</h1>
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
      <div className="announcement">
        <p className="announcement-title-homepage">🎓📜 Welcome Graduates 📜🎓</p>
        {/* <p className="announcement-title2">How to Obtain Your Degree Certificate</p> */}

        <div style={{marginTop:'5%'}}>
          {Object.keys(option).length > 0 ? (
            <React.Fragment >
              <p className="small-font-center-align" style={{ color: '#0aec0a', fontWeight: 'bold'}}>Option: {option}</p>
              <button className="home-see-your-option-button" onClick={() => handleSeeYourOption()}>See your option</button>
            </React.Fragment>
          ) : (
              <p className="small-font-center-align" style={{ color: 'red', fontWeight: 'bold'}}>
                Option: No option selected
              </p>
          )}
        </div>

        <p className="small-font-left-align" style={{textAlign:"center"}}>Dear Graduates, You have <span className='orange-text'>three options</span> to collect your degree certificate:</p>
        

        {/* Buttons for options */}
        <button className="option-button" onClick={() => {handleOptionClick("Graduation Day Pickup"); handleChooseOption()}}>
          Graduation Day Pickup<br/>
          <span style={{color: 'black'}}>มารับเองที่พิธีมอบปริญญาบัตร<br/></span>
          1,500 THB
        </button>


        <button className="option-button" onClick={() => {handleOptionClick("Pickup at Registration Office"); handleChooseOption()}}>
          Pickup at Registration Office<br/>
          <span style={{color: 'black'}}>มารับเองที่สำนักทะเบียนตึกอธิการ<br/></span>
          1,500 THB
        </button>
  

        <button className="option-button" onClick={() => {handleOptionClick("Postal Delivery"); handleChooseOption();}}>
          Postal Delivery<br/>
          <span style={{color: 'black'}}>ส่งมอบทางไปรณีย์<br/></span>
          1,750 THB
        </button>

      </div>

      {/* Pop-up message */}
      {showPopup && (
        <div className="popup-homepage">
          <div className="popup-content">
            <p className='selected-option'><span className='orange-text'>{selectedOption}</span> option selected</p>
            <button onClick={handleClosePopup} className="close-popup-button">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
