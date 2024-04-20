import React, { useState, useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from '../../images/KMITLLogo.png';
import '../../styles/adminStyles/adminPrint.css';
import { styled } from 'styled-components';
import axios from 'axios';

function AdminPrint() {
  const { state} = useLocation();
  const [data, setData] = useState([]);
  const userName = "Admin";
  const navigate = useNavigate();

  const getStudentInfo = async () => {
    const response = await axios.get("http://localhost:5000/admin/get_all_student_info_to_print")
    .then((response) => {
      console.log("Response:", response.data);
      setData(response.data)
    })
    .catch((error) => {
      console.error("Error:", error);
    });
    }

  useEffect(() => {
    getStudentInfo();
  }, []);

  const handleLogout = () => {
    navigate('/adminLogin');
  };

  const handleBack = () => {
    navigate('/adminHome');
  };

  const handleStatusChange = (index, status) => {
    const newData = [...data];
    newData[index].status = status;
    setData(newData);
  };

  const handleCheckboxChange = (index) => {
    const newData = [...data];
    newData[index].checked = !newData[index].checked;
    setData(newData);
  
    const addressSections = document.querySelectorAll('.address-section');
    addressSections[index].classList.toggle('selected');
  };
  
  
  const handleAllCheckboxChange = () => {
    const newData = data.map((item) => ({
      ...item,
      checked: !data.every((item) => item.checked),
    }));
    setData(newData);
  
    const addressSections = document.querySelectorAll('.address-section');
    addressSections.forEach((row, index) => {
      if (newData[index].checked) {
        row.classList.add('selected');
      } else {
        row.classList.remove('selected');
      }
    });
  };
  

  const handlePrint = () => {
    const selectedRows = data.filter(row => row.checked);
    if (selectedRows.length > 0) {
      const nonSelectedRows = document.querySelectorAll('.address-section:not(.selected)');
      nonSelectedRows.forEach(row => row.style.display = 'none');
  
      window.print();
  
      nonSelectedRows.forEach(row => row.style.display = 'block');
    } else {
      alert('Please select at least one row to print.');
    }
  };
  

  return (
    <div className="app-container">

      <header className="ap-header">
        <div className="ap-header-content">
          <img src={logo} alt="Logo" className="ap-logo" />
          <div>
            <h1 className="ap-title">Print</h1>
            <p className="ap-admin">{userName}</p>
          </div>
        </div>
      </header>

      <nav className="ap-navbar">
        <div className="navbar-left">
          <button className="see-all-students-nav-button" onClick={handleBack}>Back to Home</button>
        </div>
        <div className="navbar-right">
          <button className="logout-button">Logout</button>
        </div>
      </nav>
      <p></p>

      <div className="am-table-container">
        <table className="ap-table">
          <thead>
            <tr>
              <th><input type="checkbox" checked={data.every(item => item.checked)} onChange={handleAllCheckboxChange} /></th>
              <th>Name</th>
              <th>Tel.</th>
              <th>Address</th>
              <th>Subdistrict</th>
              <th>District</th>
              <th>Province</th>
              <th>Postcode</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td><input type="checkbox" checked={row.checked} onChange={() => handleCheckboxChange(index)} /></td>
                <td>{row.name}</td>
                <td>{row.tel_no}</td>
                <td>{row.address}</td>
                <td>{row.subdistrict}</td>
                <td>{row.district}</td>
                <td>{row.province}</td>
                <td>{row.post_code}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="button-container">
        <button className="ap-button" onClick={handleBack}>Back</button>
        <button className="ap-button" onClick={handlePrint}>Print</button>
      </div>
      <div className="address-container">
  {data.map((row, index) => (
    <div key={index} className="address-section">
      <img src={logo} alt="Logo" className="ap-logo-pr" />
      <div className="sender-info">
        <div className="sender-info-t">
          <h2 style={{color:"orange"}}>Sender</h2>
          <p>Sender : KMTIL</p>
          <p>Tel. : 02-329-8000</p>
        </div>
      </div>
      <div className="divider"></div>
      <div className="consignee-info">
        <h2 style={{color:"orange"}}>Consignee</h2>
        <p>Consignee : {row.name}</p>
        <p>Tel. : {row.tel}</p>
        <p>Address : {row.address}</p>
        <p>Subdistrict : {row.subdistrict}</p>
        <p>District : {row.district}</p>
        <p>Province : {row.province}</p>
        <p>Postcode : {row.postcode}</p>
      </div>
    </div>
  ))}
</div>



    </div>
  );
}

export default AdminPrint;