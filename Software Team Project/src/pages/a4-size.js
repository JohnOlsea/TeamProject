import React, { useEffect } from 'react';
import './a4-size.css';
import logo from '../images/KMITLLogo.png';

const A4Page = ({ data }) => {
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
                <img src={logo} className="logo-print"/>
                <p className='a4-content'>Name: {item.name}</p>
                <p className='a4-content'>Tel No: {item.tel_no}</p>
                <p className='a4-content'>Address: {item.address}</p>
                <p className='a4-content'>Subdistrict: {item.subdistrict}</p>
                <p className='a4-content'>District: {item.district}</p>
                <p className='a4-content'>Province: {item.province}</p>
                <p className='a4-content'>Post Code: {item.post_code}</p>
              </div>
            ))}
            {/* Fill empty boxes if the group has less than 4 items */}
            {[...Array(4 - group.length)].map((_, idx) => (
              <div className="box empty" key={group.length + idx}></div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default A4Page;
