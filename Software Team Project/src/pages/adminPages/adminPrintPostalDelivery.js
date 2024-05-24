import React, { useState, useEffect } from "react";
import logo from "../../images/KMITLLogo.png";
import settingIcon from "../../images/setting-icon.png";
import "../../styles/adminStyles/adminPrintAll.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logoutLogo from "../../images/logoutLogo.png";
import * as XLSX from "xlsx";

function AdminPrintPostalDelivery() {
  const userName = "Admin";
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const getAllStudentOptionInfo = async () => {
    try {
      const response = await axios.get("http://localhost:8000/admin/get_all_student_option_info");
      const filteredData = response.data.filter(student_info => student_info.grant_option === 'Postal Delivery');
      setData(filteredData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllStudentOptionInfo();
  }, []);

  const handleLogout = () => {
    navigate("/login");
  };

  const handleBack = () => {
    navigate("/adminPrint");
  };
  const handleExportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(data.map(row => ({
      "Student ID": row.student_id,
      "Name": row.name,
      "Payment Status": row.payment_status
    })));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Students");
    XLSX.writeFile(wb, "GraduationDayStudents.xlsx");
  };

  const handleSort = (selectedOption) => {
    const sortedData = [...data].sort((a, b) => {
      if (
        a.grant_option === selectedOption &&
        b.grant_option !== selectedOption
      ) {
        return -1;
      } else if (
        a.grant_option !== selectedOption &&
        b.grant_option === selectedOption
      ) {
        return 1;
      } else {
        return 0;
      }
    });

    setData(sortedData);
  };

  const handleSortPaymentStatus = (selectedOption) => {
    const sortedData = [...data].sort((a, b) => {
      if (selectedOption === "paid") {
        return a.payment_status === "paid"
          ? -1
          : b.payment_status === "paid"
          ? 1
          : 0;
      } else if (selectedOption === "unpaid") {
        return a.payment_status === "unpaid"
          ? -1
          : b.payment_status === "unpaid"
          ? 1
          : 0;
      }
      return 0;
    });

    setData(sortedData);
  };

  return (
    <div className="app-container">
      <header className="ap-header">
        <div className="ap-header-content">
          <img src={logo} alt="Logo" className="am-logo" />
          <div className="am-header-right">
              <img src={logoutLogo} alt="logoutLogo" className="logo-logout-am" onClick={handleLogout}/>
          </div>
          <div>
            <h1 className="ap-title">Print All Postal Service Students</h1>
            <p className="ap-admin">{userName}</p>
          </div>
        </div>
      </header>

      <nav className="ap-navbar">
        <div className="am-navbar-left">
          <button
            className="back-to-home-nav-button"
            onClick={handleBack}
          >
            Back 
          </button>
        </div>
      </nav>
      <h2 style={{textAlign:'center'}}>All Students Selected Postal Delivery</h2>
      <div className="ap-table-container">
        <table className="ap-table">
          <thead>
            <tr>
              <th>Student ID</th>
              <th style={{ textAlign: "left" }}>Name</th>
              <th>
                <span className="payment-status-text">Payment Status</span>
                <div className="dropdown">
                  <button className="dropbtn">&#9660;</button>
                  <div className="dropdown-content">
                    <a onClick={() => handleSortPaymentStatus("paid")}>
                      &#9660; Paid
                    </a>
                    <a onClick={() => handleSortPaymentStatus("unpaid")}>
                      &#9660; Unpaid
                    </a>
                  </div>
                </div>
              </th>
              <th>Receipt Status</th>
              <th>Shipping ID</th>
            </tr>
          </thead>
            <tbody>
                {data.map((row, index) => (
                <tr key={index}>
                <td>{row.student_id}</td>
                <td style={{ textAlign: "left" }}>{row.name}</td>
                <td>{row.payment_status === "Unpaid" ? "Unpaid" : "Paid"}</td>
                <td>{row.receipt_verification }</td>
                <td>{row.shipping_id === null ? "Not shipped yet" : row.shipping_id}</td>
                </tr>
                ))}
            </tbody>
        </table>
      </div>

      <div className="button-container">
        <button className="am-update-button" onClick={handleExportToExcel}>
          Export to Excel
        </button>
      </div>
    </div>
  );
}

export default AdminPrintPostalDelivery;