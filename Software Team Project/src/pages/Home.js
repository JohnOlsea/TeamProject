import React from "react";
import "../styles/Home.css";
import logo from "../images/KMITLLogo.png";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function Home() {
  const BACKEND_IP_PATH = "localhost";
  
  const [option, setOption] = useState({});
  const [userData, setUserData] = useState({});
  
  const getUser = async () => {
    try {
      const response = await axios.get(`http://${BACKEND_IP_PATH}:5000/login/success`, {
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
        `http://${BACKEND_IP_PATH}:5000/grant_option/${student_id}?fname=${fname}&sname=${sname}`
      );
      console.log(response.data);
      if (response.data.grant_option != null)
        setOption(response.data.grant_option);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const accessToken = sessionStorage.getItem('accessToken');
    console.log("access token:", accessToken);
    getUser();
  }, []);

  const userName = userData.displayName;

  const navigate = useNavigate();

  const handleLogout = () => {
    window.open(`http://${BACKEND_IP_PATH}:5000/logout`, "_self");
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
  return (
    <div className="app-container">
      <header className="header">
        <div className="header-content">
          <img src={logo} alt="Logo" className="logo" />
          <div>
            <h1 className="title">Home Page</h1>
            <p className="subtitle">{userName}</p>
          </div>
        </div>
      </header>
      <nav className="navbar">
        <div className="navbar-left">
          <button className="nav-button" onClick={handlePersonalInfo}>
            Personal Information
          </button>
        </div>
        <div className="navbar-right">
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>
      <div className="announcement">
        <p className="announcement-title">🎓📜 Important Announcement 📜🎓</p>
        <p className="announcement-title2">
          How to Obtain Your Degree Certificate
        </p>

        <p className="small-font-left-align">Dear Graduates,</p>
        <p className="small-font-left-align">
          Congratulations on your remarkable achievement! We understand that
          obtaining your degree certificate is a significant moment, and we're
          here to make the process as convenient as possible for you. You have
          three options to collect your degree certificate:
        </p>

        <ol className="small-font-left-align">
          <li>
            <span className="orange-text">Graduation Day Pickup:</span> Join us
            on Graduation Day to receive your certificate in person. Experience
            the joy of celebrating your accomplishments with your peers and
            loved ones.
          </li>
          <p className="empty-line">&nbsp;</p>
          <li>
            <span className="orange-text">Institute Office Pickup:</span> You
            can visit the institute office at any time during working hours to
            collect your certificate.
          </li>
          <p className="empty-line">&nbsp;</p>
          <li>
            <span className="orange-text">Postal Delivery:</span> Prefer the
            comfort of receiving your certificate at your doorstep? Opt for
            postal delivery. Simply provide us with your mailing address, and
            we'll ensure your certificate reaches you securely.
          </li>
        </ol>

        <p className="small-font-left-align">
          Whichever option you choose, we're committed to ensuring a smooth and
          efficient process for you.
        </p>
        <p className="small-font-left-align">
          If you have any questions or need further assistance, feel free to
          reach out to our administration team.
        </p>
        <p className="small-font-left-align">
          Once again, congratulations on this incredible milestone. We look
          forward to celebrating your success with you!
        </p>
      </div>
      {Object.keys(option).length > 0 ? (
          <React.Fragment>
            <p className="small-font-center-align" style={{ color: '#0aec0a'}}>Option: {option}</p>
          </React.Fragment>
        ) : (
            <p className="small-font-center-align" style={{ color: 'red'}}>
              Option: No option selected
            </p>
        )}
      <div className="button-container">
        {Object.keys(option).length > 0 ? (
          <React.Fragment>
            <button
              className="see-option-button"
              onClick={handleSeeYourOption}
            >
              See your option
            </button>
          </React.Fragment>
        ) : (
            <button
              className="choose-option-button"
              onClick={handleDegreeCertificateCollection}
            >
                Choose Your Option
            </button>
        )}
      </div>
    </div>
  );
}

export default Home;
