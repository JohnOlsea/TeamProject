import React, { useState } from 'react';
import logo from '../../images/KMITLLogo.png';
import '../../styles/adminStyles/adminUpdateStatus.css';
import { useLocation, useNavigate } from 'react-router-dom';

function AdminUpdateStatus() {
  const { state: { selectedData } } = useLocation();
  const userName = "Admin";
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/adminLogin');
  };

  const handleBack = () => {
    navigate('/adminHome');
  };

  const handleConfirm = () => {
    const updatedData = data.map(item => ({ ...item }));
    navigate('/adminShowUpdatedStatus', { state: { updatedData } });
  };
  

  const [data, setData] = useState(selectedData || []);

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
      <header className="aus-header">
        <div className="aus-header-content">
          <img src={logo} alt="Logo" className="aus-logo" />
          <div>
            <h1 className="aus-title">Update Status</h1>
          </div>
          <p className="aus-admin">{userName}</p>
        </div>
      </header>
      
      <nav className="aus-navbar">
        <div className="aus-navbar-left">
            <p className="aus-subtitle">King Monkut's Institute of Technology Ladkrabang</p>
        </div>
        <div className="aus-navbar-right">
          <button className="aus-logout-button" onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      <div className="table-container">
        <table className="aus-table">
          <thead>
            <tr>
              <th><input type="checkbox" checked={data.every(item => item.checked)} onChange={() => handleCheckboxChange(0)} /></th>
              <th>ID</th>
              <th>Name</th>
              <th>Status</th>
              <th>Shipping ID</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td><input type="checkbox" checked={row.checked} onChange={() => handleCheckboxChange(index)} /></td>
                <td>{row.id}</td>
                <td>{row.name}</td>
                <td>
                  <select value={row.status} onChange={(e) => handleStatusChange(index, e.target.value)}>
                    <option value="Paid">Paid</option>
                    <option value="Unpaid">Unpaid</option>
                    <option value="Reject">Reject</option>
                    <option value="Verified">Verified</option>
                    <option value="Sent">Sent</option>
                    <option value="Non-Delivery">Non-Delivery</option>
                  </select>
                </td>
                <td>{row.shippingID}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="button-container">
        <button className="aus-button" onClick={handleBack}>Back</button>
        <button className="aus-button" onClick={handleConfirm}>Confirm</button>
      </div>
    </div>
  );
}

export default AdminUpdateStatus;
