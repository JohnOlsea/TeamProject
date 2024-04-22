import React, { useEffect } from "react";
import "./a4-size.css";
import logo from "../images/KMITLLogo.png";
import { useLocation } from "react-router-dom";

const A4Page = () => {
  const location = useLocation();
  const data = location.state.data;

  console.log(data);

  const groupsOfFour = [];
  for (let i = 0; i < data.length; i += 4) {
    groupsOfFour.push(data.slice(i, i + 4));
  }

  return (
    <div>
      {groupsOfFour.map((group, index) => (
        <div className="a4-page" key={index}>
          <div className="grid-container">
            {group.map((row, idx) => (
              <div className="box" key={idx} style={{border: "2px solid black", borderRadius: "15px"}}>
                <img src={logo} className="logo-print" />
                <div className="sender-info">
                  <div className="sender-info-t" style={{fontSize:"13px", marginLeft:"-150px"}}>
                    <h2 style={{ color: "orange" }}>Sender</h2>
                    <p>Sender : KMTIL</p>
                    <p>Tel. : 02-329-8000</p>
                  </div>
                </div>
                <div className="divider"></div>
                <div className="consignee-info" style={{fontSize:"13px", marginLeft:"15px"}}>
                  <h2 style={{ color: "orange" }}>Consignee</h2>
                  <p>Consignee : {row.name}</p>
                  <p>Tel. : {row.tel_no}</p>
                  <p>Address : {row.address}</p>
                  <p>Subdistrict : {row.subdistrict}</p>
                  <p>District : {row.district}</p>
                  <p>Province : {row.province}</p>
                  <p>Postcode : {row.post_code}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default A4Page;
