import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/adminStyles/adminPrint.css';
import AdminHeader from './adminHeader';

function AdminPrint() {
  const userName = "Admin";
  const navigate = useNavigate();

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

  const handleBackToHome = () => {
    navigate("/adminHome");  
  };

  return (
    <div className="app-container">
      <AdminHeader 
        title="Print" 
        userName={userName} 
        onBack={handleBackToHome} 
        backIconType="home" 
      /> 
  
      <div className="am-main-container">
        <div className="am-main-item">
          <div className="am-btn-container">
            <button className="am-btn-choices" onClick={handlePrintGraduationDayStudents}>Print Graduation Day Students</button>
            <p className="choices-description">Print all student that chose to come to the graduation ceremony</p>
          </div>
          <div className="am-btn-container">
            <button className="am-btn-choices" onClick={handlePrintRegistrationOffice}>Print Registration Office Students</button>
            <p className="choices-description">Print all student that chose to pick it up at the registration office</p>
          </div>
        </div>
        <div className="am-main-item">
          <div className="am-btn-container">
            <button className="am-btn-choices" onClick={handlePrintPostalDelivery}>Print Postal Delivery Students</button>
            <p className="choices-description">Print all student that wants the certificate to be delivered at their doorsteps</p>
          </div>
          <div className="am-btn-container">
            <button className="am-btn-choices" onClick={handlePrintUnshippedStudents}>Print Unshipped Students</button>
            <p className="choices-description">Print all students that we haven't shipped their certificates yet</p>
          </div>
        </div>
      </div>
      <div className="am-btn-container">
        <button className="am-btn-printall" onClick={handlePrintAllStudents}>Print All Students</button>
        <p className="choices-description">Print all Students in the table</p>
      </div>
    </div>
  );
  
}

export default AdminPrint;