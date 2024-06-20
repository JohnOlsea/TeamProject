import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import "../styles/Home.css";

function Home() {
  const [option, setOption] = useState({});
  const [userData, setUserData] = useState({});

  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:5000/login/success", {
        withCredentials: true,
      });
      setUserData(response.data.user);
      const email = response.data.user.email;
      const fname = response.data.user.given_name;
      const sname = response.data.user.family_name;
      getOption(email, fname, sname);
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
        setOption(response.data.grant_option);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const navigate = useNavigate();

  const handleOptionClick = async (option) => {
    try {
      await axios.post('http://localhost:5000/update_option', {
        email: userData.email,
        grant_option: option
      });
      await axios.post('http://localhost:5000/create_image_path', {
        email: userData.email
      });
      navigate('/seeYourOption');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="app-container">
      <Header title="Home" userData={userData} />
      <div className="announcement">
        <p className="announcement-title-homepage">🎓📜 Welcome Graduates 📜🎓</p>
        <div style={{ marginTop: '5%' }}>
          {Object.keys(option).length > 0 && (
            <button className="home-see-your-option-button" onClick={() => navigate("/seeyouroption")}>See your option</button>
          )}
        </div>
        <p className="small-font-left-align" style={{ textAlign: "center" }}>Dear Graduates, You have <span className='orange-text'>three options</span> to collect your degree certificate:</p>
        <button className="option-button" onClick={() => handleOptionClick("Graduation Day Pickup")}>
          Graduation Day Pickup<br />
          <span style={{ color: 'black' }}>มารับเองที่พิธีมอบปริญญาบัตร<br /></span>
          1,500 THB
        </button>
        <button className="option-button" onClick={() => handleOptionClick("Pickup at Registration Office")}>
          Pickup at Registration Office<br />
          <span style={{ color: 'black' }}>มารับเองที่สำนักทะเบียนตึกอธิการ<br /></span>
          1,500 THB
        </button>
        <button className="option-button" onClick={() => handleOptionClick("Postal Delivery")}>
          Postal Delivery<br />
          <span style={{ color: 'black' }}>ส่งมอบทางไปรณีย์<br /></span>
          1,750 THB
        </button>
      </div>
    </div>
  );
}

export default Home;
