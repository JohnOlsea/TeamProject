import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header"
import "../styles/PersonalInfo.css";
import BACKENDURL from "../service/service";

function PersonalInfo() {
  const [userData, setUserData] = useState({});

  const [personalInfo, setPersonalInfo] = useState({
    studentId: "-",
    nameTitle: "-",
    firstName: "-",
    lastName: "-",
    major: "-",
    facultyName: "-",
    certificateDegree: "-",
  });

  const getUser = async () => {
    try {
      const response = await axios.get(`${BACKENDURL}/login/success`, {
        withCredentials: true,
      });
      setUserData(response.data.user);
      const email = response.data.user.email;
      getInfo(email);
    } catch (err) {
      console.log(err);
      // navigate("/");
    }
  };

  const getInfo = async (email) => {
    if (email) {
      try {
        const response = await axios.post(
          `${BACKENDURL}/get_personal_info`,
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

  useEffect(() => {
    getUser();
  }, []);

  const navigate = useNavigate();
  const handleLogout = () => {
    window.open(`${BACKENDURL}/logout`, "_self");
  };
  const handleHome = () => {
    navigate("/Home");
  };
  return (
    <div className="app-container">
      <Header title="Personal Info" userData={userData} />
      <div className="personal-info-table">
        <table>
          <tbody>
            <tr>
              <th>Student ID :</th>
              <td>{userData.email ? userData.email.split("@")[0] : ""}</td>
            </tr>
            <tr>
              <th>Name Title :</th>
              <td>{personalInfo.nameTitle}</td>
            </tr>
            <tr>
              <th>First Name :</th>
              <td>{userData.given_name}</td>
            </tr>
            <tr>
              <th>Last Name :</th>
              <td>{userData.family_name}</td>
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
    </div>
  );
}

export default PersonalInfo;
