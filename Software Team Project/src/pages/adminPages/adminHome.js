import React, { useState } from 'react';
import logo from '../../images/KMITLLogo.png';
import '../../styles/adminStyles/adminHome.css';
import { Link } from 'react-router-dom';

function AdminHome() {
  const userName = "Admin";

  // Mock data
  const [data, setData] = useState([
    { id: 64011671, name: "Thanawat Rodklay", status: "Paid", checked: false },
    { id: 64011555, name: "Phuttiphat Leaungmanotham", status: "Unpaid", checked: false },
    { id: 64011655, name: "Teerapat Wattanamanont", status: "Sent", checked: false },
    { id: 64011378, name: "Chiho Li", status: "Paid", checked: false },
    { id: 64011331, name: "Akararat Pattanamontri", status: "Paid", checked: false },
    { id: 64011426, name: "Kasita Sansanthad", status: "Paid", checked: false },
    { id: 64011397, name: "Jade Chuapakdee", status: "Paid", checked: false },
    { id: 64011683, name: "Thitiwat Sornmanee", status: "Paid", checked: false },
    { id: 64011643, name: "Suriya Chaubey", status: "Paid", checked: false },
    { id: 64011470, name: "Natchapon Manachaipraset", status: "Paid", checked: false },
    { id: 64011546, name: "Phattara Srilachot", status: "Paid", checked: false },
    { id: 64011752, name: "Theint Nandarsu", status: "Paid", checked: false },
    { id: 64011393, name: "Hannah Ebenezar", status: "Paid", checked: false },

  ]);

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
  

  return (
    <div className="app-container">

      <header className="am-header">
        <div className="am-header-content">
          <img src={logo} alt="Logo" className="am-logo" />
          <div>
            <h1 className="am-title">Home</h1>
          </div>
          <p className="am-admin">{userName}</p>
        </div>
      </header>
      
      <nav className="am-navbar">
        <div className="am-navbar-left">
            <p className="am-subtitle">King Monkut's Institute of Technology Ladkrabang</p>
        </div>
        <div className="am-navbar-right">
          <button className="am-logout-button">Logout</button>
        </div>
      </nav>

      <div className="table-container">
        <table className="am-table">
          <thead>
            <tr>
              <th><input type="checkbox" checked={data.every(item => item.checked)} onChange={handleAllCheckboxChange} /></th>
              <th>ID</th>
              <th>Name</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td><input type="checkbox" checked={row.checked} onChange={() => handleCheckboxChange(index)} /></td>
                <td>{row.id}</td>
                <td>{row.name}</td>
                <td>{row.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="button-container">
      <Link to="/adminPrint" className="am-button">Print</Link>
        <button className="am-button">Update</button>
      </div>
    </div>
  );
}

export default AdminHome;
