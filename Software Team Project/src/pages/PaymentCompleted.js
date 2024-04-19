import React, { useState, useEffect } from "react";
import "../styles/PaymentCompleted.css";
import logo from "../images/KMITLLogo.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function PaymentCompleted() {
  const [userData, setUserData] = useState({});
  const [info, setInfo] = useState({
    "student_id": '',
    "name": '',
    "tel_no": '',
    "address": '',
    "subdistrict": '',
    "district": '',
    "province": '',
    "post_code": ''
});

  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:5000/login/success", {
        withCredentials: true,
      });
      setUserData(response.data.user);
      const email = response.data.user.email;
      getAddress(email);
    } catch (err) {
      console.log(err);
      navigate("/");
    }
  };

  const getAddress = async (email) => {
    if (email) {
      try {
        const student_id = email.split('@')[0]
        const response = await axios.get(
          `http://localhost:5000/get_address/${student_id}`,
        );
        const info = response.data[0]
        setInfo({
          "student_id": info.student_id,
          "name": info.name,
          "tel_no": info.tel_no,
          "address": info.address,
          "subdistrict": info.subdistrict,
          "district": info.district,
          "province": info.province,
          "post_code": info.post_code
      })
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("email is undefined");
    }
  };

  useEffect(() => {
    getUser();
    
  }, []);

  const [selectedOption, setSelectedOption] = useState("");
  const navigate = useNavigate();
  const handleLogout = () => {
    window.open("http://localhost:5000/logout","_self") 
  };
  const handleHome = () => {
    navigate("/Home");
  };
  const handlePersonalInfo = () => {
    navigate("/personalInfo");
  };
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="app-container">
      <header className="header">
        <div className="header-content">
          <img src={logo} alt="Logo" className="logo" />
          <div>
            <h1 className="title">Payment Completed</h1>
            <p className="subtitle">{userData.displayName}</p>
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

      <div className="pc-announcement">
        <p className="pc-announcement-title">Congratulations! 🎉</p>

        <p className="pc-description">
          Your payment for the delivery of your graduation certificate has been
          successfully processed.{" "}
        </p>
        <p className="pc-description">
          You're one step closer to holding your hard-earned achievement in your
          hands. Sit back and relax as we swiftly handle the delivery process.{" "}
        </p>
        <p className="pc-description">
          Expect your certificate to arrive at your doorstep soon! 📜✨{" "}
        </p>
        <p className="pc-description">
          If you have any further inquiries, feel free to reach out. We're here
          to assist you every step of the way.{" "}
        </p>

        <p className="pc-description">
          Student ID: <span className="orange-text">{info.student_id}</span> <br />
          Name: <span className="orange-text">{info.name}</span> <br />
          Address: <span className="orange-text">{info.address}</span> <br />
          Subdistrict: <span className="orange-text">{info.subdistrict}</span> <br />
          District: <span className="orange-text">{info.district}</span> <br />
          Province: <span className="orange-text">{info.province}</span> <br />
          Postal Code: <span className="orange-text">{info.post_code}</span>
        </p>
      </div>

      <div className="button-container">
        <button className="pc-back-to-homepage-button" onClick={handleHome}>
          Back to Home Page
        </button>
      </div>
    </div>
  );
}

export default PaymentCompleted;
