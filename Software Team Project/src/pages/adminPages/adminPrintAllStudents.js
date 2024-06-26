import React, { useState, useEffect } from "react";
import logo from "../../images/KMITLLogo.png";
import logoKreso from "../../images/Logo Name Only/Logo Name Only PNG file/1x/Kreso Logo - White.png";
import settingIcon from "../../images/setting-icon.png";
import "../../styles/adminStyles/adminPrintAll.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logoutLogo from "../../images/logoutLogo.png";
import * as XLSX from "xlsx";
import { IoChevronBackCircleOutline } from "react-icons/io5";

function AdminPrintAllStudents() {
  const userName = "Admin";
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const getAllStudentOptionInfo = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/admin/get_all_student_option_info"
      );
      var temp = response.data;
      temp.forEach((student_info) => {
        student_info.checked = false;
        if (student_info.grant_option === null) {
          student_info.grant_option = "Not Selected Yet";
        }
      });
      setData(response.data);
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

  const handleSortOptionSelected = (selectedOption) => {
    const sortedData = [...data].sort((a, b) => {
      // Priority for selected option (replace 'selectedOption' with your actual variable)
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
      }

      // Specific order for "Postal Delivery", "Non-Delivery", "Not Selected Yet"
      const optionOrder = {
        "Postal Delivery": 3,
        "Pickup at Registration Office": 2,
        "Graduation Day Pickup": 1,
        "Not Selected Yet": 0,
      };

      // Compare based on predefined order
      return optionOrder[a.grant_option] - optionOrder[b.grant_option];
    });

    setData(sortedData);
  }

  return (
    <div className="app-container">
      <header className="ap-header">
        <div className="ap-header-content">
          <img src={logoKreso} alt="Logo" className="am-logo" />
          <div className="am-header-right">
              <img src={logoutLogo} alt="logoutLogo" className="logo-logout-am" onClick={handleLogout}/>
          </div>
          <div className="am-header-left">
              <IoChevronBackCircleOutline size={40} color="white" class="backIcon" onClick={handleBack}/>
          </div>
          <div>
            <h1 className="ap-title">Print All Students</h1>
            <p className="ap-admin">{userName}</p>
          </div>
        </div>
      </header>

      
      <h2 style={{textAlign:'center'}}>All Students That Will Be Graduated</h2>
      <div className="ap-table-container">
        <table className="ap-table">
          <thead>
            <tr>
              <th>Student ID</th>
              <th style={{ textAlign: "left" }}>Name</th>
              <th>
                <span className="option-selected-text">Option Selected</span>
                <div className="dropdown">
                  <button className="dropbtn">&#9660;</button>
                  <div className="dropdown-content">
                    <a onClick={() => handleSortOptionSelected("Graduation Day Pickup")}>
                      &#9660; Graduation Day Pickup
                    </a>
                    <a onClick={() => handleSortOptionSelected("Pickup at Registration Office")}>
                      &#9660; Pickup at Registration Office
                    </a>
                    <a
                      onClick={() =>
                        handleSortOptionSelected("Postal Delivery")
                      }
                    >
                      &#9660; Postal Delivery
                    </a>
                    <a
                      onClick={() =>
                        handleSortOptionSelected("Not Selected Yet")
                      }
                    >
                      &#9660; Not Selected Yet
                    </a>
                  </div>
                </div>
              </th>
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
            </tr>
          </thead>
            <tbody>
                {data.map((row, index) => (
                <tr key={index}>
                <td>{row.student_id}</td>
                <td style={{ textAlign: "left" }}>{row.name}</td>
                <td>{row.grant_option}</td>
                <td>{row.payment_status}</td>
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

export default AdminPrintAllStudents;