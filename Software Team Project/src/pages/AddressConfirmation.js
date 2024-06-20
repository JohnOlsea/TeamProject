import React, { useState, useEffect } from "react";
import "../styles/PersonalInfo.css";
import logo from "../images/KMITLLogo.png";
import logoutLogo from '../images/logoutLogo.png'
import "../styles/AddressConfirmation.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PersonalInfo from "./PersonalInfo";
import Header from "./Header";

function AddressConfirmation() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState("");
  const [receiver, setReceiver] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [address, setAddress] = useState("");
  const [subdistrict, setSubdistrict] = useState("");
  const [district, setDistrict] = useState("");
  const [province, setProvince] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [validationErrors, setValidationErrors] = useState({
    receiver: false,
    phonenumber: false,
    address: false,
    subdistrict: false,
    district: false,
    province: false,
    postalCode: false,
  });
  const [errorMessage, setErrorMessage] = useState("");

  // useEffect(() => {
  //   getUser();
  // }, []);

  // const getUser = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:5000/login/success", {
  //       withCredentials: true,
  //     });
  //     setUserData(response.data.user);
  //     setReceiver(response.data.user.displayName);
  //   } catch (err) {
  //     console.log(err);
  //     navigate("/");
  //   }
  // };

  const handleLogout = () => {
    window.open("http://localhost:5000/logout", "_self");
  };
  const handlePersonalInfo = () => {
    navigate("/personalInfo");
  };
  const handleSave = () => {
    const errors = {};
    if (!phonenumber.trim()) {
      errors.phonenumber = true;
    }
    if (!address.trim()) {
      errors.address = true;
    }
    if (!subdistrict.trim()) {
      errors.subdistrict = true;
    }
    if (!district.trim()) {
      errors.district = true;
    }
    if (!province.trim()) {
      errors.province = true;
    }
    if (!postalCode.trim()) {
      errors.postalCode = true;
    }
    setValidationErrors(errors);
    setErrorMessage("All fields are required");
    if (Object.keys(errors).length === 0) {
      const data = {
        student_id: userData.email.split("@")[0],
        name: receiver,
        tel_no: phonenumber,
        address: address,
        subdistrict: subdistrict,
        district: district,
        province: province,
        post_code: postalCode,
      };
      console.log(data);
      axios
        .post("http://localhost:5000/update_address", data)
        .then((response) => {
          console.log("Response:", response.data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
      navigate('/PaymentCompleted');
    }
  };
  const handleBack = () => {
    navigate("/Payment");
  };
  return (
    <div className="app-container">
      <Header title="Address Confirmation" userData={userData} />
      {/* <nav className="navbar">
        <div className="navbar-left">
          <button className="nav-button" onClick={handlePersonalInfo}>
            Personal Information
          </button>
        </div>
        <div className="navbar-right">
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav> */}
      
      <div className="announcement-addressconfirm">
        <p className="announcement-title-addressconfirm">
          ⚠ Address Confirmation ⚠
        </p>
      </div>

      <div className="address-inputs">
        <div className="address-inline-inputs">
          <div
            className={`add-input-group ${
              validationErrors.receiver ? "error" : ""
            }`}
          >
            <label htmlFor="receiver">Receiver</label>
            <input
              type="text"
              placeholder={receiver}
              value={receiver}
              readOnly={true}
            />
          </div>
          <div
            className={`add-input-group ${
              validationErrors.phonenumber ? "error" : ""
            }`}
          >
            <label htmlFor="phonenumber">Phone Number</label>
            <input
              type="text"
              placeholder="Phone No."
              value={phonenumber}
              onChange={(e) => setPhonenumber(e.target.value)}
              style={{ marginLeft: "5%" }}
            />
          </div>
        </div>
        <div
          className={`add-input-group ${
            validationErrors.address ? "error" : ""
          }`}
        >
          <label htmlFor="address">Address</label>
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="address-inline-inputs">
          <div
            className={`add-input-group ${
              validationErrors.subdistrict ? "error" : ""
            }`}
          >
            <label htmlFor="subdistrict" style={{ marginLeft: "4%" }}>
              Subdistrict
            </label>
            <input
              type="text"
              placeholder="Subdistrict"
              value={subdistrict}
              onChange={(e) => setSubdistrict(e.target.value)}
            />
          </div>
          <div
            className={`add-input-group ${
              validationErrors.district ? "error" : ""
            }`}
          >
            <label htmlFor="district" style={{ marginLeft: "4%" }}>
              District
            </label>
            <input
              type="text"
              placeholder="District"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              style={{ marginLeft: "5%" }}
            />
          </div>
        </div>
        <div className="address-inline-inputs">
          <div
            className={`add-input-group ${
              validationErrors.province ? "error" : ""
            }`}
          >
            <label htmlFor="province">Province</label>
            <input
              type="text"
              placeholder="Province"
              value={province}
              onChange={(e) => setProvince(e.target.value)}
            />
          </div>
          <div
            className={`add-input-group ${
              validationErrors.postalCode ? "error" : ""
            }`}
          >
            <label htmlFor="postalCode">Postal Code</label>
            <input
              type="text"
              placeholder="Postal Code"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              style={{ marginLeft: "5%" }}
            />
          </div>
        </div>
      </div>
      {errorMessage && (
        <p
          className="error-message"
          style={{ textAlign: "center", color: "red" }}
        >
          {errorMessage}
        </p>
      )}
      <div style={{display:"flex", 
                   justifyContent:"center", 
                   marginTop:"5%",
                   marginBottom:"5%",
                  }}
      >
        <button
          className="back-button"
          onClick={handleBack}
          style={{
            backgroundColor: "white",
            color: "#FF6E2F",
            border: "2px solid black",
            borderRadius: "5px",
            padding: "10px",
            fontSize: "100%",
            width: "40%",
          }}
        >
          Back
        </button>
        <button
          className="save-button"
          onClick={handleSave}
          style={{
            backgroundColor: "white",
            color: "#FF6E2F",
            border: "2px solid black",
            borderRadius: "5px",
            padding: "10px",
            fontSize: "100%",
            marginLeft: "10%",
            width: "40%",
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default AddressConfirmation;
