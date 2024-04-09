import React, { useState } from 'react';
import '../styles/PersonalInfo.css';
import logo from '../images/KMITLLogo.png';
import { useNavigate } from 'react-router-dom';

function PersonalInfo() {
  const userName = "Thongchai Jaidee";
  const [personalInfo, setPersonalInfo] = useState({
    studentId: "64011XXX",
    nameTitle: "Mr.",
    firstName: "Thongchai",
    lastName: "Jaidee",
    major: "Computer Science",
    facultyName: "Faculty of Engineering",
    certificateDegree: "Bachelor's Degree"
  });
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate('/');
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
            <h1 className="title">Personal Information</h1>
            <p className="subtitle">{userName}</p>
          </div>
        </div>
      </header>
      <nav className="navbar">
        <div className="navbar-left">
          <button className="nav-button" onClick={handleHome}>Home Page</button>
        </div>
        <div className="navbar-right">
          <button className="logout-button" onClick={handleLogout}>Logout</button>
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