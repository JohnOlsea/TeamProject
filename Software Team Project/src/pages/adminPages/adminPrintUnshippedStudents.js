import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logoKreso from "../../images/Logo Name Only/Logo Name Only PNG file/1x/Kreso Logo - White.png";
import logo from "../../images/KMITLLogo.png";
import "../../styles/adminStyles/adminPrint.css";
import { styled } from "styled-components";
import axios from "axios";
import logoutLogo from "../../images/logoutLogo.png";
import { IoHomeOutline } from "react-icons/io5";
import { IoChevronBackCircleOutline } from "react-icons/io5";

function AdminPrintUnshippedStudents() {
  const { state } = useLocation();
  const [data, setData] = useState([]);
  const userName = "Admin";
  const navigate = useNavigate();

  const getStudentInfo = async () => {
    const response = await axios
      .get("http://localhost:5000/admin/get_all_student_info_to_print")
      .then((response) => {
        console.log("Response:", response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    getStudentInfo();
  }, []);

  const handleLogout = () => {
    navigate("/adminLogin");
  };

  const handleBack = () => {
    navigate("/adminHome");
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

    const addressSections = document.querySelectorAll(".address-section");
    addressSections[index].classList.toggle("selected");
  };

  // const handleAllCheckboxChange = () => {
  //   const newData = data.map((item) => ({
  //     ...item,
  //     checked: !data.every((item) => item.checked),
  //   }));
  //   setData(newData);

  //   const addressSections = document.querySelectorAll(".address-section");
  //   addressSections.forEach((row, index) => {
  //     if (newData[index].checked) {
  //       row.classList.add("selected");
  //     } else {
  //       row.classList.remove("selected");
  //     }
  //   });
  // };

  const handleAllCheckboxChange = () => {
    if (data.length > 0) {
      const newData = data.map((item) => ({
        ...item,
        checked: !data.every((item) => item.checked),
      }));
      setData(newData);
    }
  };
  
  // useEffect to update DOM elements after state has been updated
  useEffect(() => {
    const addressSections = document.querySelectorAll(".address-section");
    addressSections.forEach((row, index) => {
      if (data[index] && data[index].checked) {
        row.classList.add("selected");
      } else {
        row.classList.remove("selected");
      }
    });
  }, [data]);
  
  

  const handlePrint = () => {
    const selectedRows = data.filter((row) => row.checked);
    if (selectedRows.length > 0) {
      const nonSelectedRows = document.querySelectorAll(
        ".address-section:not(.selected)"
      );
      nonSelectedRows.forEach((row) => (row.style.display = "none"));

      window.print();

      nonSelectedRows.forEach((row) => (row.style.display = "block"));
    } else {
      alert("Please select at least one row to print.");
    }
  };

  const totalPages = Math.ceil(data.length / 4);

  return (
    <div className="app-container">
      <header className="ap-header">
        <div className="ap-header-content">
          <img src={logoKreso} alt="Logo" className="ap-logo" />
          <div className="am-header-right">
              <img src={logoutLogo} alt="logoutLogo" className="logo-logout-am" onClick={handleLogout}/>
          </div>
          <div className="am-header-left">
              <IoChevronBackCircleOutline size={40} color="white" class="backToHomeIcon" onClick={handleBack}/>
          </div>
          <div>
            <h1 className="ap-title">Print Unshipped Students</h1>
            <p className="ap-admin">{userName}</p>
          </div>
        </div>
      </header>
      <p></p>

      <div className="am-table-container">
        <table className="ap-table">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={data.every((item) => item.checked)}
                  onChange={handleAllCheckboxChange}
                />
              </th>
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
                <td>
                  <input
                    type="checkbox"
                    checked={row.checked}
                    onChange={() => handleCheckboxChange(index)}
                  />
                </td>
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
        <button className="ap-button" onClick={handlePrint}>
          Print
        </button>
      </div>
      <div className="address-container">
        {data.map((row, index) => (
          <div key={index} className="address-section">
            <img src={logo} alt="Logo" className="ap-logo-pr" />
            <div className="sender-info">
              <div className="sender-info-t">
                <h2 style={{ color: "orange", fontWeight: "bold"}}>ผู้จัดส่ง</h2>
                <p >สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง ถนนฉลองกรุง เขตลาดกระบัง กรุงเทพฯ 10520, ประเทศไทย</p>
                <p>02-329-8000</p>
              </div>
            </div>
            <div className="divider"></div>
            <div className="consignee-info">
              <h2 style={{ color: "orange", marginBottom: "20px" }}>
                ผู้รับ
              </h2>
              <p>
                <span style={{ fontWeight: "bold" }}>ผู้รับ: </span>
                {row.name}
              </p>
              <p>
                <span style={{ fontWeight: "bold" }}>เบอร์: </span>
                {row.tel_no}
              </p>
              <p>
                <span style={{ fontWeight: "bold" }}>ที่อยู่: </span>
                {row.address}, {row.subdistrict}, {row.province}, {row.post_code}
              </p>
            </div>
          </div>
        ))}

        {/* Add empty boxes to ensure each page has exactly 4 boxes */}
      {(totalPages * 4 - data.length) % 4 !== 0 && 
        Array.from({ length: (totalPages * 4 - data.length) % 4 }).map((_, index) => (
          <div key={`empty-${index}`} className="address-section empty-box"></div>
        ))
      }
      </div>
    </div>
  );
}

export default AdminPrintUnshippedStudents;
