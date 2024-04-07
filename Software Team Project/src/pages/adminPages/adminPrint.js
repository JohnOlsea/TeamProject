import React, { useState } from 'react';
import logo from '../../images/KMITLLogo.png';
import '../../styles/adminStyles/adminPrint.css';
import { useNavigate } from 'react-router-dom';

function AdminPrint() {
  const userName = "Admin";
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate('/adminLogin');
  };
  const handleBack = () => {
    navigate('/adminHome');
  };
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

  const handlePrint = () => {
    window.print();
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
          <button className="ap-logout-button" onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      <div className="table-container">
        <table className="ap-table">
          <thead>
            <tr>
              <th><input type="checkbox" checked={data.every(item => item.checked)} onChange={handleAllCheckboxChange} /></th>
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
        <button className="ap-button" onClick={handleBack}>Back</button>
        <button className="ap-button" onClick={handlePrint}>Print</button>
      </div>
    </div>
  );
}

export default AdminPrint;