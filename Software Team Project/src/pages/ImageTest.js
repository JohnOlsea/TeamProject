import React from "react";
import "../styles/Home.css";
import logo from "../images/KMITLLogo.png";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import BACKENDURL from "../service/service";

function ImageTest() {

    const [image, setImage] = useState({})

    useEffect(() => {
        axios.get('http://192.168.15.57:5000/get_reciept_image?sid=64011671')
        .then(res => {
            // setImage(res.data[0].image)
            console.log(res.data.image_path);
            setImage(res.data.image_path)
        })
        .catch(err => console.log(err))
    })



  return (
    <div className="app-container">
      <p>Test Image</p>
      <img src={`${BACKENDURL}/images/`+image}></img>
    </div>
  );
}

export default ImageTest;
