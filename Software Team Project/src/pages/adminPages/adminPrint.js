import React, { useState } from 'react';
import logo from '../../images/KMITLLogo.png';
import '../../styles/adminStyles/adminPrint.css';
import { Link } from 'react-router-dom';

function AdminPrint() {
  const userName = "Admin";

  // Mock data
  const [data, setData] = useState([
    { id: 64011671, name: "Thanawat Rodklay", status: "Paid", checked: false },
    { id: 64011546, name: "Phattara Srilachot", status: "Paid", checked: false },
    { id: 64011393, name: "Hannah Ebenezar", status: "Paid", checked: false },

  ]);

  const handleStatusChange = (index, status) => {
    const newData = [...data];
    newData[index].status = status;
    setData(newData);
  };

  const handleCheckboxChange = (index) => {
    const newData = [...data];
    if (index === 0) {
      const allChecked = newData[0].checked;
      newData.forEach((item) => {
        item.checked = !allChecked;
      });
    } else {
      newData[index].checked = !newData[index].checked;
    }
    setData(newData);
  };

  return (
    <div className="app-container">

      <header className="ap-header">
        <div className="ap-header-content">
          <img src={logo} alt="Logo" className="ap-logo" />
          <div>
            <h1 className="ap-title">Print Page</h1>
          </div>
          <p className="ap-admin">{userName}</p>
        </div>
      </header>
      
      <nav className="ap-navbar">
        <div className="ap-navbar-left">
            <p className="ap-subtitle">King Monkut's Institute of Technology Ladkrabang</p>
        </div>
        <div className="ap-navbar-right">
          <button className="ap-logout-button">Logout</button>
        </div>
      </nav>

      <div className="table-container">
        <table className="ap-table">
          <thead>
            <tr>
              <th><input type="checkbox" checked={data.every(item => item.checked)} onChange={() => handleCheckboxChange(0)} /></th>
              <th>ID</th>
              <th>Name</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td><input type="checkbox" checked={row.checked} onChange={() => handleCheckboxChange(index)} /></td>
                <td>{row.id}</td>
                <td>{row.name}</td>
                <td>{row.status}</td>
                <td>
                  <select onChange={(e) => handleStatusChange(index, e.target.value)}>
                    <option value="Paid">Paid</option>
                    <option value="Unpaid">Unpaid</option>
                    <option value="Sent">Sent</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="button-container">
        <Link to="/adminHome" className="ap-button">Back</Link>
        <button className="ap-button">Print</button>
      </div>
    </div>
  );
}

export default AdminPrint;
