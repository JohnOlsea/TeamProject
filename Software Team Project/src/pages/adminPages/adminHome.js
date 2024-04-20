import React, { useState, useEffect } from "react";
import logo from "../../images/KMITLLogo.png";
import settingIcon from "../../images/setting-icon.png";
import "../../styles/adminStyles/adminHome.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AdminHome() {
  const userName = "Admin";
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const [verificationStatus, setVerificationStatus] = useState({});
  const [changeIndex, setChangeIndex] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedShippingID, setSelectedShippingID] = useState("");
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);

  const getAllStudentOptionInfo = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/admin/get_all_student_option_info"
      );
      // console.log(response.data);
      var temp = response.data;
      temp.forEach((student_info) => {
        student_info.checked = false;
        if (student_info.grant_option === null) {
          student_info.grant_option = "Not Selected Yet";
        }
      });
      console.log(response.data);
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

  const handlePrintAddresses = () => {
    navigate("/adminPrint");
  };

  const handleCancel = () => {
    setShowPopup(false);
  };

  const handleUpdate = async () => {
    const selectedData = data.filter((item) => item.checked);
    selectedData.forEach((item) => {
      console.log(item);
    });
    await axios.post("http://localhost:5000/admin/update_student_option_info", 
  {data:selectedData})
    window.location.reload()
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
  };

  const renderVerifyReceipt = (index) => {
    const payment_status = data[index].payment_status;
    const status = data[index].receipt_verification;

    if (payment_status === "unpaid") {
      return <td style={{ backgroundColor: "gray", textAlign: "center" }}></td>;
    } else {
      return (
        <td
          style={{
            textAlign: "center",
            backgroundColor:
              status === "Verified"
                ? "green"
                : status === "Rejected"
                ? "red"
                : "",
          }}
        >
          {status === "Verified" ? (
            <span
              onClick={() => handleVerifyReceipt(index, "Change")}
              style={{ cursor: "pointer" }}
            >
              Change
            </span>
          ) : status === "Rejected" ? (
            <span
              onClick={() => handleVerifyReceipt(index, "Change")}
              style={{ cursor: "pointer" }}
            >
              Change
            </span>
          ) : (
            <>
              <button
                className="reject-button"
                onClick={() => handleVerifyReceipt(index, "Reject")}
              >
                Reject
              </button>
              <button
                className="verify-button"
                onClick={() => handleVerifyReceipt(index, "Verify")}
              >
                Verify
              </button>
            </>
          )}
        </td>
      );
    }
  };

  const renderReceipt = (sid, payment_status) => {
    if (payment_status === "unpaid") {
      return <td style={{ backgroundColor: "gray", textAlign: "center" }}></td>;
    } else {
      return (
        <td style={{ textAlign: "center" }}>
          <button
            className="view-button"
            onClick={() => handleViewReceipt(sid)}
          >
            View
          </button>
        </td>
      );
    }
  };

  const renderShippingID = (
    shipping_id,
    payment_status,
    grant_option,
    index
  ) => {
    if (
      grant_option === "Not Selected Yet" ||
      grant_option === "Graduation Day Pickup" ||
      grant_option === "Pickup at Registration Office" ||
      payment_status === "unpaid"
    ) {
      return <td style={{ backgroundColor: "gray", textAlign: "center" }}></td>;
    } else {
      return (
        <td className="shipping-id-cell">
          <input type="text" value={shipping_id} readOnly />
          <a
            href="#"
            className="settings-icon"
            onClick={(e) => handleSettingsClick(e, shipping_id, index)}
          >
            <img src={settingIcon} alt="Settings" />
          </a>
        </td>
      );
    }
  };

  const handleViewReceipt = async (sid) => {
    const response = await axios.get(
      `http://localhost:5000/get_receipt_image?sid=${sid}`
    );
    console.log(response.data.image_path);
    window.open(
      `http://localhost:5000/images/${response.data.image_path}`,
      "_blank"
    );
  };

  const handleSettingsClick = (e, shipping_id, index) => {
    e.preventDefault();
    setSelectedShippingID(shipping_id);
    setSelectedRowIndex(index);
    setShowPopup(true);
  };

  const handleVerifyReceipt = (index, action) => {
    const newData = [...data];
    if (action === "Verify" || action === "Change") {
      const newStatus = action === "Verify" ? "Verified" : "";
      newData[index].receipt_verification = newStatus;
      setVerificationStatus((prevStatus) => ({
        ...prevStatus,
        [index]: newStatus,
      }));
      if (action !== "Change") {
        newData[index].checked = true;
      }
    } else if (action === "Reject") {
      newData[index].receipt_verification = "Rejected";
      setChangeIndex(index);
      setVerificationStatus((prevStatus) => ({
        ...prevStatus,
        [index]: "Rejected",
      }));
      if (action !== "Change") {
        newData[index].checked = true;
      }
    }
    setData(newData);
  };

  const handleUndoReject = (index) => {
    const newData = [...data];
    newData[index].receipt_verification = "";
    setChangeIndex(null);
    setVerificationStatus((prevStatus) => ({
      ...prevStatus,
      [index]: "",
    }));
    setData(newData);
  };

  const handleCheckboxChange = (index) => {
    const newData = [...data];
    newData[index].checked = !newData[index].checked;
    setData(newData);
  };

  const handleAllCheckboxChange = () => {
    const newData = data.map((item) => ({
      ...item,
      checked: !data.every((item) => item.checked),
    }));
    setData(newData);
  };

  const handleSave = () => {
    const newData = [...data];
    if (selectedRowIndex !== null) {
      newData[selectedRowIndex].shipping_id = selectedShippingID;
      newData[selectedRowIndex].checked = true;
      setData(newData);
    }
    setShowPopup(false);
  };

  return (
    <div className="app-container">
      <header className="am-header">
        <div className="am-header-content">
          <img src={logo} alt="Logo" className="am-logo" />
          <div>
            <h1 className="am-title">Home</h1>
            <p className="am-admin">{userName}</p>
          </div>
        </div>
      </header>

      <nav className="am-navbar">
        <div className="navbar-left">
          <button
            className="print-student-address-nav-button"
            onClick={handlePrintAddresses}
          >
            Print Student Address
          </button>
        </div>
        <div className="navbar-right">
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>
      <p></p>
      <div className="am-table-container">
        <table className="am-table">
          <thead>
            <tr>
              <th>
                Checked
              </th>
              <th>ID</th>
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
              <th>Receipt</th>
              <th>Verify Receipt</th>
              <th>Shipping ID</th>
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
                    disabled  
                  />
                </td>
                <td>{row.student_id}</td>
                <td style={{ textAlign: "left" }}>{row.name}</td>
                <td>
                  {!row.grant_option ? "Not selected Yet" : row.grant_option}
                </td>
                <td>{row.payment_status == "unpaid" ? "Unpaid" : "Paid"}</td>
                {renderReceipt(row.student_id, row.payment_status)}
                {renderVerifyReceipt(index)}
                {renderShippingID(
                  row.shipping_id,
                  row.payment_status,
                  row.grant_option,
                  index
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showPopup && (
        <div className="popup-container">
          <div className="popup">
            <h2>Edit Shipping ID</h2>
            <input
              type="text"
              value={selectedShippingID}
              onChange={(e) => setSelectedShippingID(e.target.value)}
            />
            <div className="button-container">
              <button className="popup-button-cancel" onClick={handleCancel}>
                Cancel
              </button>
              <button className="popup-button-save" onClick={handleSave}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="button-container">
        <button className="am-update-button" onClick={handleUpdate}>
          Update
        </button>
      </div>
    </div>
  );
}

export default AdminHome;
