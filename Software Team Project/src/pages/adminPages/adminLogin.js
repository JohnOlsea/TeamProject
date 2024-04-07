import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import '../../styles/adminStyles/adminLogin.css';
import '../../styles/adminStyles/adminLoginButton.css';
import '../../styles/adminStyles/adminGoogleButton.css';
import logo from '../../images/KMITLLogo.png'; 
export const StyledContainer = styled.div`
  display: grid;
  justify-items: center;
  margin-top: 5%;
`;
export const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  margin-top: 8px;
`;
function AdminLogin() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const mockUserData = {
    email: 'sea@a.com',
    password: 'sss'
  };
  const [authenticated, setAuthenticated] = useState(false);
  const [inputError, setInputError] = useState({
    email: false,
    password: false
  });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
    setInputError({ ...inputError, [id]: false });
    setErrorMessage('');
  };
  const handleSubmit = () => {
    if (formData.email === mockUserData.email && formData.password === mockUserData.password) {
      setAuthenticated(true);
      navigate('/adminHome');
    } else {
      setAuthenticated(false);
      setInputError({
        email: formData.email !== mockUserData.email,
        password: formData.password !== mockUserData.password
      });
      setErrorMessage('Invalid Email or Password. Please try again.');
    }
  };
  return (
    <div className="al-app-container">
      <header className="al-header">
        <div className="al-header-content">
          <img src={logo} alt="Logo" className="al-logo" />
          <h1 className="al-title">KMITL Graduation Registration</h1>
        </div>
      </header>
      <nav className="al-navbar">
        King Mongkut's Institute of Technology Ladkrabang
      </nav>
      <div className="al-login-form">
      <StyledContainer>
      <h4
          style={{
            textAlign: "left",
            marginBottom: "8px",
            fontFamily: "Lato",
          }}
        >
          Email
        </h4>
        <div className={`al-input-group ${inputError.email ? 'al-input-error':''}`}>
          <input type="email" id="email" value={formData.email} onChange={handleInputChange}/>
        </div>
        <h4
          style={{
            textAlign: "left",
            marginBottom: "8px",
            fontFamily: "Lato",
          }}
        >
        Password
        </h4>
        <div className={`al-input-group ${inputError.password ? 'al-input-error':''}`}>
          <input type="password" id="password" value={formData.password} onChange={handleInputChange}/>
        </div>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        <button className="adm-login-button" onClick={handleSubmit}>Login</button>
        <p style={{ textAlign: "center", marginBottom: "8px", fontFamily: "Lato" }}>OR</p>
        <button className="adm-google-button">Sign In with Google</button></StyledContainer>
        
      </div>
    </div>
  );
}

export default AdminLogin;