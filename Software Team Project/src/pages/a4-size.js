import React, { useEffect } from 'react';
import './a4-size.css'; // Import your CSS file

const A4Size = ({ data }) => {
  // Split data into groups of 4
  const groupsOfFour = [];
  for (let i = 0; i < data.length; i += 4) {
    groupsOfFour.push(data.slice(i, i + 4));
  }

  return (
    <div>
      {groupsOfFour.map((group, index) => (
        <div className="a4-page" key={index}>
          <div className="grid-container">
            {group.map((item, idx) => (
              <div className="box" key={idx}>
                <p>Name: {item.name}</p>
                <p>Tel No: {item.tel_no}</p>
                <p>Address: {item.address}</p>
                <p>Subdistrict: {item.subdistrict}</p>
                <p>District: {item.district}</p>
                <p>Province: {item.province}</p>
                <p>Post Code: {item.post_code}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default A4Size;
