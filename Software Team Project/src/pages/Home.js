import React from "react";
import "../styles/Home.css";
import logo from "../images/KMITLLogo.png";
import logoKreso from "../images/Logo Name Only/Logo Name Only PNG file/1x/Kreso Logo - White.png";
import logoutLogo from "../images/logoutLogo.png";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function Home() {
  const [option, setOption] = useState({});
  const [userData, setUserData] = useState({});
  const [selectedOption, setSelectedOption] = useState(null);
  
  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:5000/login/success", {
        withCredentials: true,
      });
      setUserData(response.data.user);
      const email = response.data.user.email;
      const fname = response.data.user.given_name;
      const sname = response.data.user.family_name;
      getOption(email, fname, sname);
    } catch (err) {
      console.log(err);
      // navigate("/");
    }
  };

  const getOption = async (email, fname, sname) => {
    try {
      const student_id = email.split("@")[0];
      const response = await axios.get(
        `http://localhost:5000/grant_option/${student_id}?fname=${fname}&sname=${sname}`
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
    window.open("http://localhost:5000/logout", "_self");
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

  const handleOptionClick = async (option) => {
    setSelectedOption(option);

    try {
      await axios.post('http://localhost:5000/update_option', {
        email: userData.email,
        grant_option: option
      });
      await axios.post('http://localhost:5000/create_image_path', {
        email: userData.email
      });
      navigate('/seeYourOption');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="app-container">
      <header className="header-homepage">
        <div className="header-content">
          <img src={logoKreso} alt="Logo" className="logo-homepage" />
        
          <div>

            <div className="logoutDiv">
              <img src={logoutLogo} alt="logoutLogo" className="logo-logout-home" onClick={handleLogout}/>
            </div>

            <div className="homeTitle">
              <h1 className="titleHomePage">Home Page</h1>
            </div>
            
          </div>
          
        </div>
      </header>
      <div className="announcement">
        <p className="announcement-title-homepage">🎓📜 Welcome Graduates 📜🎓</p>

        <div style={{marginTop:'5%'}}>
          {Object.keys(option).length > 0 ? (
            <React.Fragment >
              <button className="home-see-your-option-button" onClick={() => handleSeeYourOption()}>See your option</button>
            </React.Fragment>
          ) : null}
        </div>


        <p className="small-font-left-align" style={{textAlign:"center"}}>Dear Graduates, You have <span className='orange-text'>three options</span> to collect your degree certificate:</p>
        

        {/* Buttons for options */}
        <button className="option-button" onClick={() => handleOptionClick("Graduation Day Pickup")}>
          Graduation Day Pickup<br/>
          <span style={{color: 'black'}}>มารับเองที่พิธีมอบปริญญาบัตร<br/></span>
          1,500 THB
        </button>


        <button className="option-button" onClick={() => handleOptionClick("Pickup at Registration Office")}>
          Pickup at Registration Office<br/>
          <span style={{color: 'black'}}>มารับเองที่สำนักทะเบียนตึกอธิการ<br/></span>
          1,500 THB
        </button>
  

        <button className="option-button" onClick={() => handleOptionClick("Postal Delivery")}>
          Postal Delivery<br/>
          <span style={{color: 'black'}}>ส่งมอบทางไปรณีย์<br/></span>
          1,750 THB
        </button>

      </div>
    </div>
  );
}

export default Home;