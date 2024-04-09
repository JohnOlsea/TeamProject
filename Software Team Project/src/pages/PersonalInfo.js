import React, { useState, useEffect } from "react";
import "../styles/PersonalInfo.css";
import logo from "../images/KMITLLogo.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function PersonalInfo() {
  const [userData, setUserData] = useState({});

  const [personalInfo, setPersonalInfo] = useState({
    studentId: "",
    nameTitle: "",
    firstName: "",
    lastName: "",
    major: "",
    facultyName: "",
    certificateDegree: "",
  });

  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:5000/login/success", {
        withCredentials: true,
      });
      setUserData(response.data.user);
      const email = response.data.user.email;
      getInfo(email);
    } catch (err) {
      console.log(err);
      navigate('/');
    }
  };

  const getInfo = async(email) => {
    if (email) {
        try {
            const response = await axios.post("http://localhost:5000/get_personal_info", {
                email: email
            });
            setPersonalInfo(
              {studentId:response.data[0].student_id,
                nameTitle: response.data[0].name_title,
                firstName: response.data[0].firstname,
                lastName: response.data[0].surname,
                major: response.data[0].major,
                facultyName: response.data[0].faculty,
                certificateDegree: response.data[0].degree});
        } catch (err) {
            console.log(err);
        }
    } else {
        console.log("email is undefined");
    }
}

  useEffect(() => {
    getUser();
  }, []);

  const navigate = useNavigate();
  const handleLogout = () => {
    window.open("http://localhost:5000/logout","_self") 
  };
  const handleHome = () => {
    navigate("/Home");
  };
  return (
    <div className="app-container">
      <header className="header">
        <div className="header-content">
          <img src={logo} alt="Logo" className="logo" />
          <div>
            <h1 className="title">Personal Information</h1>
            <p className="subtitle">{userData.displayName}</p>
          </div>
        </div>
      </header>
      <nav className="navbar">
        <div className="navbar-left">
          <button className="nav-button" onClick={handleHome}>
            Home Page
          </button>
        </div>
        <div className="navbar-right">
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>
      <div className="personal-info-table">
        <table>
          <tbody>
            <tr>
              <th>Student ID :</th>
              <td>{personalInfo.studentId}</td>
            </tr>
            <tr>
              <th>Name Title :</th>
              <td>{personalInfo.nameTitle}</td>
            </tr>
            <tr>
              <th>First Name :</th>
              <td>{personalInfo.firstName}</td>
            </tr>
            <tr>
              <th>Last Name :</th>
              <td>{personalInfo.lastName}</td>
            </tr>
            <tr>
              <th>Major :</th>
              <td>{personalInfo.major}</td>
            </tr>
            <tr>
              <th>Faculty Name :</th>
              <td>{personalInfo.facultyName}</td>
            </tr>
            <tr>
              <th>Certificate Degree :</th>
              <td>{personalInfo.certificateDegree}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PersonalInfo;
