import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import '../styles/Login.css';
import '../styles/LoginButton.css';
import '../styles/GoogleButton.css';
import logo from '../images/KMITLLogo.png'; 
import axios  from 'axios';
export const StyledContainer = styled.div`
  display: grid;
  justify-items: center;
`;
export const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  margin-top: 8px;
`;
function Login() {

  const getUser = ()=>{
    // try {
    //   const response =  await axios.get("http://localhost:5000/login/success", {withCredentials:  true})
    //   navigate('/home')
    // } catch (err) {
    //   console.log(err);
    //   navigate('/');
    // }
  }

  useEffect(() => {
    getUser()
  }, [])

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const mockUserData = {
    email: 'e@e.com',
    password: '123'
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


  const handleGoogleLogin = () => {
      window.open("http://localhost:5000/auth/google","_self")
  };

  const handleSubmit = () => {
    if (formData.email === mockUserData.email && formData.password === mockUserData.password) {
      setAuthenticated(true);
      navigate('/home');
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
    <div className="app-container">
      <header className="header">
        <div className="header-content">
          <img src={logo} alt="Logo" className="logo" />
          <h1 className="title">KMITL Graduation Registration</h1>
        </div>
      </header>
      <nav className="navbar">
        King Mongkut's Institute of Technology Ladkrabang
      </nav>
      <div className="login-form">
      <StyledContainer>
        <h4
          style={{
            marginBottom: "8px",
            fontFamily: "Lato",
          }}
        >
          Email
        </h4>
        <div className={`input-group ${inputError.email ? 'input-error' : ''}`}>
          <input type="email" id="email" value={formData.email} onChange={handleInputChange}/>
        </div>
        <h4
          style={{
            marginBottom: "8px",
            fontFamily: "Lato",
          }}
        >
        Password
        </h4>
        <div className={`input-group ${inputError.password ? 'input-error' : ''}`}>
          <input type="password" id="password" value={formData.password} onChange={handleInputChange} />
        </div>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        <button className="login-button" onClick={handleSubmit}>Login</button>
        <p style={{ textAlign: "center", marginBottom: "8px", fontFamily: "Lato" }}>OR</p>
        <button className="google-button" onClick={handleGoogleLogin}>Sign In with Google</button></StyledContainer>
        
      </div>
    </div>
  );
}

export default Login;
