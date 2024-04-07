import React, { useState } from 'react';
import logo from '../../images/KMITLLogo.png';
import '../../styles/adminStyles/adminShowUpdatedStatus.css';
import { useNavigate } from 'react-router-dom';

function AdminShowUpdatedStatus() {
  const userName = "Admin";
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate('/adminLogin');
  };
  const handleGotoHome = () => {
    navigate('/adminHome');
  };

  // Mock data
  const [data, setData] = useState([
    { id: 64011671, name: "Thanawat Rodklay", status: "Paid", checked: false },
    { id: 64011546, name: "Phattara Srilachot", status: "Paid", checked: false },
    { id: 64011393, name: "Hannah Ebenezar", status: "Paid", checked: false },

  ]);

  return (
    <div className="app-container">

      <header className="asus-header">
        <div className="asus-header-content">
          <img src={logo} alt="Logo" className="asus-logo" />
          <div>
            <h1 className="asus-title">Show Updated Status</h1>
          </div>
          <p className="asus-admin">{userName}</p>
        </div>
      </header>
      
      <nav className="asus-navbar">
        <div className="asus-navbar-left">
            <p className="asus-subtitle">King Monkut's Institute of Technology Ladkrabang</p>
        </div>
        <div className="asus-navbar-right">
          <button className="asus-logout-button" onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      <div className="table-container">
        <table className="asus-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td>{row.id}</td>
                <td>{row.name}</td>
                <td>{row.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
        <div>
            <h2 className="asus-description">Status has been updated!</h2>
        </div>
      
      <div className="asus-button-container">
        <button className="asus-button" onClick={handleGotoHome}>Home Page</button>
      </div>

    </div>
  );
}

export default AdminShowUpdatedStatus;