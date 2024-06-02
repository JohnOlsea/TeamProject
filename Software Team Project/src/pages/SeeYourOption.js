import React, { useState, useEffect } from "react";
import logo from "../images/KMITLLogo.png";
import logoKreso from "../images/Logo Name Only/Logo Name Only PNG file/1x/Kreso Logo - White.png";
import logoutLogo from '../images/logoutLogo.png'
import "../styles/SeeYourOption.css";
import receiptImage from "../images/receipt.jpg";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import axios from "axios";
import "../styles/PersonalInfo.css";

function SeeYourOption() {

  const [showPopup, setShowPopup] = useState(false);


  const [userData, setUserData] = useState({});
  const [selectedOption, setSelectedOption] = useState("");
  const [image, setImage] = useState(null);
  const [receipt_verification, setReceiptVerification] = useState(null);
  const [student_id, setStudentID] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [shipping_id, setShippingID] = useState(null);
  const [delivery_status, setDeliveryStatus] = useState("Unshipped");
  const [addressInfo, setAddressInfo] = useState({
    student_id: "-",
    name: "-",
    tel_no: "-",
    address: "-",
    subdistrict: "-",
    district: "-",
    province: "-",
    post_code: "-",
  });
  const [personalInfo, setPersonalInfo] = useState({
    studentId: "-",
    nameTitle: "-.",
    firstName: "-",
    lastName: "-",
    major: "-",
    facultyName: "-",
    certificateDegree: "-",
  });
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();

  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:5000/login/success", {
        withCredentials: true,
      });
      setUserData(response.data.user);
      const email = response.data.user.email;
      const fname = response.data.user.given_name;
      const sname = response.data.user.family_name;
      setStudentID(email.split("@")[0]);
      setFirstname(fname);
      setLastname(sname);
      getOption(email, fname, sname);
      getReceiptVerification(email);
      getPersonalInfo(email);
      getShippingID(email);
      getAddress(email, fname, sname);
      getImage(email);
    } catch (err) {
      console.log(err);
      // navigate("/");
    }
  };

  const getOption = async (email, fname, sname) => {
    try {
      const student_id = email.split("@")[0];
      const response = await axios.get(
        `http://localhost:5000/grant_option/${student_id}?fname=${fname}&sname=${sname}`
      );
      console.log(response.data);
      if (response.data.grant_option != null)
        setSelectedOption(response.data.grant_option);
    } catch (err) {
      console.log(err);
    }
  };

  const getPersonalInfo = async (email) => {
    if (email) {
      try {
        const response = await axios.post(
          "http://localhost:5000/get_personal_info",
          {
            email: email,
          }
        );
        setPersonalInfo({
          studentId: response.data[0].student_id,
          nameTitle: response.data[0].name_title,
          firstName: response.data[0].firstname,
          lastName: response.data[0].surname,
          major: response.data[0].major,
          facultyName: response.data[0].faculty,
          certificateDegree: response.data[0].degree,
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("email is undefined");
    }
  };

  const getShippingID = async (email) => {
    try {
      const student_id = email.split("@")[0];
      const response = await axios.get(
        `http://localhost:5000/shipping_id/${student_id}`
      );
      console.log(response.data);
      if (response.data.shipping_id != null) {
        setShippingID(response.data.shipping_id);
        setDeliveryStatus("Shipped");
      } else {
        setShippingID("-");
      }
      console.log("Sip id:", response.data.shipping_id);
    } catch (err) {
      console.log(err);
    }
  };

  const getReceiptVerification = async (email) => {
    try {
      const student_id = email.split("@")[0];
      const response = await axios.get(
        `http://localhost:5000/get_receipt_verification/${student_id}`
      );
      console.log("receipt verification, ", response.data);
      if (response.data[0].receipt_verification != null) {
        console.log("Not null");
        setReceiptVerification(response.data[0].receipt_verification);
      } else {
        setShippingID("-");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getImage = async (email) => {
    try {
      const student_id = email.split("@")[0];
      const response = await axios
        .get(`http://localhost:5000/get_receipt_image?sid=${student_id}`)
        .then((res) => {
          console.log("Image Path:", res.data.image_path);
          setImage(res.data.image_path);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };

  const getAddress = async (email, fname, sname) => {
    if (email) {
      try {
        const student_id = email.split("@")[0];
        const response = await axios.get(
          `http://localhost:5000/get_address/${student_id}`
        );
        const info = response.data[0];
        if (info) {
          setAddressInfo({
            student_id: info.student_id,
            name: info.name,
            tel_no: info.tel_no,
            address: info.address,
            subdistrict: info.subdistrict,
            district: info.district,
            province: info.province,
            post_code: info.post_code,
          });
        } else {
          await axios.post(`http://localhost:5000/update_address`,
         {
          student_id: student_id,
          name: `${fname} ${sname}` ,
          tel_no: "-",
          address: "-",
          subdistrict: "-",
          district: "-",
          province: "-",
          post_code: "-",
        }).then((response) => {
          console.log("Response:", response.data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("email is undefined");
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleHome = () => {
    navigate("/Home");
  };

  const handleLogout = () => {
    window.open("http://localhost:5000/logout", "_self");
  };

  const handleSeeReceipt = () => {
    window.open("http://localhost:5000/images/" + image, "_blank");
  };
  const handleChangeReceipt = () => {
    navigate("/changeReceipt");
  };
  const handleUploadReceipt = () => {
    navigate("/payment");
  };
  const handleChangeOption = () => {
    navigate("/home");
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleShowPopup = () => {
    setShowPopup(true);
  };
  
  const handleClosePopup = () => {
    setShowPopup(false);
  };
  

  const handleSave = () => {
    setEditMode(false);
    console.log("Edited data:", addressInfo);
    addressInfo.student_id = student_id;
    addressInfo.name = userData.displayName;
    console.log("Edited data:", addressInfo);

    axios
      .post("http://localhost:5000/update_address", addressInfo)
      .then((response) => {
        console.log("Response:", response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddressInfo({ ...addressInfo, [name]: value });
  };

  const Popup = ({ onClose }) => {
    return (
      <div className="popup-overlay">
        <div className="popup-content">
          <h2>Your receipt is waiting to be verified</h2>
          <p>If you have any questions, please contact the KMITL Registration Office</p>
          <p>Tel: 02-329-8000</p>
          <p>Fax: 0-2329-8106</p>
          <p>Email: pr.kmitl@kmitl.ac.th</p>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    );
  };
  
  return (
    <div className="app-container">
      <header className="header">
        <div className="header-content">
          <img src={logoKreso} alt="Logo" className="logoKreso" />
          <div>
            <div className="logoutDiv">
              <img src={logoutLogo} alt="logoutLogo" className="logo-logout-syo" onClick={handleLogout}/>
            </div>
            <div className="seeYourOptionTitle">
              <h1 className="syo-title">See Your Option</h1>
              {/* <p className="subtitle">{userData.displayName}</p> */}
            </div>
          </div>
        </div>
      </header>
  
      {delivery_status === "Unshipped" ? (
        <div className="option-details">
          <h2>
            Your Option: <br></br><span className="orange-text">{selectedOption}</span>
          </h2>
          <button
            className="syo-change-your-option-button"
            onClick={receipt_verification === "Waiting to be verified" ? handleShowPopup : handleChangeOption}
          >
            Change Your Delivery Option
          </button>
        </div>
      ) : (
        <div className="option-details">
          <h2>
            Your Option: <br></br><span className="orange-text">{selectedOption}</span>
          </h2>
          <button className="syo-change-your-option-button-inactive">
            Cannot Change Your Option
          </button>
        </div>
      )}
  
      {image ? (
        <div className="option-details">
          <h2>
            Payment Verification:{" "}
            <br></br><span className="orange-text">{receipt_verification}</span>
          </h2>
        </div>
      ) : (
        <div className="option-details">
          <h2>
            Payment Status: <br></br><span className="orange-text">Unpaid</span>
          </h2>
        </div>
      )}
  
      {!image ? (
        <div>
          <div className="receipt-div" style={{ justifyContent: "center" }}>
            <button
              className="upload-receipt-button-syo"
              onClick={handleUploadReceipt}
            >
              Make Payment
            </button>
          </div>
        </div>
      ) : receipt_verification !== "Verified" ? (
        <div className="receipt-div">
          <button
            className="syo-see-receipt-button"
            onClick={handleSeeReceipt}
            style={{ marginRight: "5%" }}
          >
            See Receipt
          </button>
          <button
            className="syo-update-receipt-button"
            onClick={handleChangeReceipt}
          >
            Update Receipt
          </button>
        </div>
      ) : (
        <div></div>
      )}
      {selectedOption == "Postal Delivery" ? (
        <div className="address-info-table">
          <table>
            <tbody>
              <tr>
                <th>Name :</th>
                <td>{userData.displayName}</td>
              </tr>
              <tr>
                <th>Phone number:</th>
                <td>
                  {editMode ? (
                    <input
                      type="text"
                      name="tel_no"
                      value={addressInfo.tel_no}
                      onChange={handleInputChange}
                    />
                  ) : (
                    addressInfo.tel_no
                  )}
                </td>
              </tr>
              <tr>
                <th>Address :</th>
                <td>
                  {editMode ? (
                    <input
                      type="text"
                      name="address"
                      value={addressInfo.address}
                      onChange={handleInputChange}
                    />
                  ) : (
                    addressInfo.address
                  )}
                </td>
              </tr>
              <tr>
                <th>Subdistrict :</th>
                <td>
                  {editMode ? (
                    <input
                      type="text"
                      name="subdistrict"
                      value={addressInfo.subdistrict}
                      onChange={handleInputChange}
                    />
                  ) : (
                    addressInfo.subdistrict
                  )}
                </td>
              </tr>
              <tr>
                <th>District :</th>
                <td>
                  {editMode ? (
                    <input
                      type="text"
                      name="district"
                      value={addressInfo.district}
                      onChange={handleInputChange}
                    />
                  ) : (
                    addressInfo.district
                  )}
                </td>
              </tr>
              <tr>
                <th>Province :</th>
                <td>
                  {editMode ? (
                    <input
                      type="text"
                      name="province"
                      value={addressInfo.province}
                      onChange={handleInputChange}
                    />
                  ) : (
                    addressInfo.province
                  )}
                </td>
              </tr>
              <tr>
                <th>PostCode :</th>
                <td>
                  {editMode ? (
                    <input
                      type="text"
                      name="post_code"
                      value={addressInfo.post_code}
                      onChange={handleInputChange}
                    />
                  ) : (
                    addressInfo.post_code
                  )}
                </td>
              </tr>
            </tbody>
          </table>
          {editMode ? (
            <button
              className="edit-and-save-option-button"
              onClick={handleSave}
            >
              Save
            </button>
          ) : image ? (
            delivery_status === "Unshipped" ? (
              <button
                className="edit-and-save-option-button"
                onClick={handleEdit}
              >
                Edit
              </button>
            ) : (
              <button className="edit-and-save-option-button-inactive">
                Edit
              </button>
            )
          ) : (
            <p
              style={{
                color: "red",
                textAlign: "center",
                marginTop: "7%",
                marginBottom: "1%",
              }}
            >
              Please upload a receipt before editting.
            </p>
          )}
        </div>
      ) : (
        <div className="personal-info-table">
          <table>
            <tbody>
              <tr>
                <th>Student ID :</th>
                <td>{student_id}</td>
              </tr>
              <tr>
                <th>Name Title :</th>
                <td>{personalInfo.nameTitle}</td>
              </tr>
              <tr>
                <th>First Name :</th>
                <td>{firstname}</td>
              </tr>
              <tr>
                <th>Last Name :</th>
                <td>{lastname}</td>
              </tr>
              <tr>
                <th>Major :</th>
                <td>{personalInfo.major}</td>
              </tr>
              <tr>
                <th>Faculty Name :</th>
                <td>{personalInfo.facultyName}</td>
              </tr>
              <tr>
                <th>Certificate Degree :</th>
                <td>{personalInfo.certificateDegree}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
  
      {selectedOption === "Postal Delivery" && (
        <div className="option-details">
          <h2>
            Delivery Status:{" "}
            <span className="orange-text">{delivery_status}</span>{" "}
          </h2>
        </div>
      )}
      {selectedOption === "Postal Delivery" && (
        <div className="shipid-details">
          <h2>
            Shipping ID: <span className="orange-text">{shipping_id}</span>{" "}
          </h2>
        </div>
      )}
  
      {showPopup && <Popup onClose={handleClosePopup} />}
    </div>
  );
  
}

export default SeeYourOption;
