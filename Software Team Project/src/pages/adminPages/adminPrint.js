import React, { useState, useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from '../../images/KMITLLogo.png';
import settingIcon from '../../images/setting-icon.png'; 
import '../../styles/adminStyles/adminPrint.css';
import logoutLogo from "../../images/logoutLogo.png";
import { IoHomeOutline } from "react-icons/io5";


function AdminPrint() {
  const userName = "Admin";
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  const handlePrintAllStudents = () => {
    navigate('/adminPrintAllStudents');
  }

  const handlePrintGraduationDayStudents = () => {
    navigate('/adminPrintGraduationDayStudents')
  }

  const handlePrintRegistrationOffice = () => {
    navigate('/adminPrintRegistrationOffice');
  }

  const handlePrintPostalDelivery = () => {
    navigate('/adminPrintPostalDelivery');
  }

  const handlePrintUnshippedStudents = () => {
    navigate('/adminPrintUnshippedStudents');
  }

  const handleBacktToHome = () => {
    navigate('/adminHome')
  }

  return (
    <div className="app-container">
      <header className="am-header">
        <div className="am-header-content">
          <img src={logo} alt="Logo" className="am-logo" />
          <div className="am-header-right">
              <img src={logoutLogo} alt="logoutLogo" className="logo-logout-am" onClick={handleLogout}/>
          </div>
          <div className="am-header-left">
              <IoHomeOutline size={35} color="white" class="backToHomeIcon" onClick={handleBacktToHome}/>
          </div>
          <div>
            <h1 className="am-title">Print</h1>
            <p className="am-admin">{userName}</p>
          </div>
        </div>
      </header>
      

      <p></p>
      
    <div className='am-btn-container'>
      <button className='am-btn-choices' onClick={handlePrintAllStudents}>Print All Students</button>
      <p className='choices-description'>Print all Students in the table</p>
    </div>

    <div className='am-btn-container'>
      <button className='am-btn-choices' onClick={handlePrintGraduationDayStudents}>Print Graduation Day Students</button>
      <p className='choices-description'>Print all student that chose to come to the graduation ceremony</p>
    </div>

    <div className='am-btn-container'>
      <button className='am-btn-choices' onClick={handlePrintRegistrationOffice}>Print Registration Office Students</button>
      <p className='choices-description'>Print all student that chose to pick it up at the registration office</p>
    </div>

    <div className='am-btn-container'>
      <button className='am-btn-choices' onClick={handlePrintPostalDelivery}>Print Postal Delivery Students</button>
      <p className='choices-description'>Print all student that wants the certificate to be delivered at their doorsteps</p>
    </div>

    <div className='am-btn-container'>
      <button className='am-btn-choices' onClick={handlePrintUnshippedStudents}>Print Unshipped Students</button>
      <p className='choices-description'>Print all students that we haven't shipped their certificates yet</p>
    </div>
    </div>
  );
}

export default AdminPrint;