import React, { useState } from 'react';
import '../styles/PersonalInfo.css';
import logo from '../images/KMITLLogo.png';
import { useNavigate } from 'react-router-dom';

function PersonalInfo() {
  const userName = "Thongchai Jaidee";
  const navigate = useNavigate();
  const [studentId, setStudentId] = useState('');
  const [citizenId, setCitizenId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [faculty, setFaculty] = useState('');
  const [major, setMajor] = useState('');
  const [yearOfAdmission, setYearOfAdmission] = useState('');
  const [yearOfGraduation, setYearOfGraduation] = useState('');
  const [validationErrors, setValidationErrors] = useState({
    studentId: false,
    citizenId: false,
    firstName: false,
    lastName: false,
    dateOfBirth: false,
    gender: false,
    phoneNumber: false,
    faculty: false,
    major: false,
    yearOfAdmission: false,
    yearOfGraduation: false
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const handleLogout = () => {
    navigate('/');
  };
  const handleHome = () => {
    navigate('/Home');
  };
  const handleSave = () => {
    const errors = {};
    if (!studentId.trim()) {
      errors.studentId = true;
    }
    if (!citizenId.trim()) {
      errors.citizenId = true;
    }
    if (!firstName.trim()) {
      errors.firstName = true;
    }
    if (!lastName.trim()) {
      errors.lastName = true;
    }
    if (!dateOfBirth.trim()) {
      errors.dateOfBirth = true;
    }
    if (!gender.trim()) {
      errors.gender = true;
    }
    if (!phoneNumber.trim()) {
      errors.phoneNumber = true;
    }
    if (!faculty.trim()) {
      errors.faculty = true;
    }
    if (!major.trim()) {
      errors.major = true;
    }
    if (!yearOfAdmission.trim()) {
      errors.yearOfAdmission = true;
    }
    if (!yearOfGraduation.trim()) {
      errors.yearOfGraduation = true;
    }
    setValidationErrors(errors);
    if (Object.keys(errors).length === 0) {
      setSaveSuccess(true);
      setErrorMessage('');
    } else {
      setErrorMessage('All fields are required');
      setSaveSuccess(false);
    }
  };
  const handleCancel = () => {
    const confirmCancel = window.confirm('Are you sure you want to cancel?');
    if (confirmCancel) {
      setStudentId('');
      setCitizenId('');
      setFirstName('');
      setLastName('');
      setDateOfBirth('');
      setGender('');
      setPhoneNumber('');
      setFaculty('');
      setMajor('');
      setYearOfAdmission('');
      setYearOfGraduation('');
    }
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

      <div className="data-container">
        <div className="data-row">
          <div className={`data-field ${validationErrors.studentId ? 'invalid-input' : ''}`}>
            <label htmlFor="studentId">Student ID</label>
            <input type="text" id="studentId" value={studentId} onChange={(e) => setStudentId(e.target.value)} />
          </div>
          <div className={`data-field ${validationErrors.citizenId ? 'invalid-input' : ''}`}>
            <label htmlFor="citizenId">Citizen ID</label>
            <input type="text" id="citizenId" value={citizenId} onChange={(e) => setCitizenId(e.target.value)} />
          </div>
        </div>
        <div className="data-row">
          <div className={`data-field ${validationErrors.firstName ? 'invalid-input' : ''}`}>
            <label htmlFor="firstName">First Name</label>
            <input type="text" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          </div>
          <div className={`data-field ${validationErrors.lastName ? 'invalid-input' : ''}`}>
            <label htmlFor="lastName">Last Name</label>
            <input type="text" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </div>
        </div>
        <div className="data-row">
          <div className={`data-field ${validationErrors.dateOfBirth ? 'invalid-input' : ''}`}>
            <label htmlFor="dateOfBirth">Date of Birth</label>
            <input type="date" id="dateOfBirth" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
          </div>
        </div>
        <div className="data-row">
        <div className={`data-field ${validationErrors.gender ? 'invalid-input' : ''}`}>
            <label htmlFor="gender">Gender</label>
            <select id="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className={`data-field ${validationErrors.phoneNumber ? 'invalid-input' : ''}`}>
              <label htmlFor="phoneNumber">Phone Number</label>
              <input type="text" id="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
          </div>
        </div>
        <div className="data-row">
          <div className={`data-field ${validationErrors.faculty ? 'invalid-input' : ''}`}>
            <label htmlFor="faculty">Faculty</label>
            <input type="text" id="faculty" value={faculty} onChange={(e) => setFaculty(e.target.value)} />
          </div>
          <div className={`data-field ${validationErrors.major ? 'invalid-input' : ''}`}>
            <label htmlFor="major">Major</label>
            <input type="text" id="major" value={major} onChange={(e) => setMajor(e.target.value)} />
          </div>
        </div>
        <div className="data-row">
          <div className={`data-field ${validationErrors.yearOfAdmission ? 'invalid-input' : ''}`}>
            <label htmlFor="yearOfAdmission">Year of Admission</label>
            <input type="text" id="yearOfAdmission" value={yearOfAdmission} onChange={(e) => setYearOfAdmission(e.target.value)} />
          </div>
          <div className={`data-field ${validationErrors.yearOfGraduation ? 'invalid-input' : ''}`}>
            <label htmlFor="yearOfGraduation">Year of Graduation</label>
            <input type="text" id="yearOfGraduation" value={yearOfGraduation} onChange={(e) => setYearOfGraduation(e.target.value)} />
          </div>
        </div>
      </div>
      {errorMessage && !saveSuccess && (
        <p className="error-message" style={{ textAlign: 'center', color: 'red' }}>{errorMessage}</p>
      )}
      {saveSuccess && (
        <p className="success-message" style={{ textAlign: 'center', color: 'green' }}>Save successful!</p>
      )}
      <div style={{ display: "flex", justifyContent: "center", marginTop: "5%" }}>
      <button 
          className="back-button"
          onClick={handleCancel}
          style={{ backgroundColor: 'white', 
                   color: '#FF6E2F', 
                   border: '2px solid black',
                   borderRadius:"5px", 
                   padding: '10px', 
                   fontSize: '100%',
                   width:"40%",
                }}
        >
          Cancel
        </button>
        <button 
          className="save-button" 
          onClick={handleSave}
          style={{ backgroundColor: 'white', 
                   color: '#FF6E2F', 
                   border: '2px solid black',
                   borderRadius:"5px",  
                   padding: '10px', 
                   fontSize: '100%',
                   marginLeft: '5%',
                   width:"40%", 
                }}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default PersonalInfo;