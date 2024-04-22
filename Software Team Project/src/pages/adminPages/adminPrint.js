import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom'; 
import logo from '../../images/KMITLLogo.png';
import settingIcon from '../../images/setting-icon.png'; 
import '../../styles/adminStyles/adminPrint.css';
import { useNavigate } from 'react-router-dom';

function AdminPrint() {
  const userName = "Admin";
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/adminLogin');
  };

  const handleSeeAllUnprintedStudents = () => {
    navigate('/adminSeeAllUnprintedStudents');
  };

  const handlePrintAllStudents = () => {
    navigate('/adminPrintAllStudents');
  }

  const handlePrintGraduationDayStudents = () => {
    navigate('/adminPrintGraduationDayStudents')
  }

  const handlePrintRegistrationOffice = () => {
    navigate('/adminPrintRegistrationOffice');
  }

  const handlePrintPostalDelivery = () => {
    navigate('/adminPrintPostalDelivery');
  }

  const handlePrintUnshippedStudents = () => {
    navigate('/adminPrintUnshippedStudents');
  }

  const handlePrintUnprintedStudents = () => {
    navigate('/adminPrintUnprintedStudents');
  }

  const handleBacktToHome = () => {
    navigate('/adminHome')
  }

  const handleCancel = () => {
    setShowPopup(false);
  };
  
  const handleUpdate = () => {
    const selectedData = data.filter(item => item.checked);
    selectedData.forEach(item => {
      console.log("ID:", item.id);
      console.log("Name:", item.name);
      console.log("Verify Receipt:", item.verifyReceipt);
      console.log("Shipping ID:", item.shippingID);
    });
  };

  const handleSort = (selectedOption) => {
    const sortedData = [...data].sort((a, b) => {
      if (a.optionSelected === selectedOption && b.optionSelected !== selectedOption) {
        return -1; 
      } else if (a.optionSelected !== selectedOption && b.optionSelected === selectedOption) {
        return 1; 
      } else {
        return 0;
      }
    });
  
    setData(sortedData);
  };
  
  const handleSortPaymentStatus = (selectedOption) => {
    const sortedData = [...data].sort((a, b) => {
      if (selectedOption === 'Paid') {
        return a.paymentStatus === 'Paid' ? -1 : b.paymentStatus === 'Paid' ? 1 : 0;
      } else if (selectedOption === 'Unpaid') {
        return a.paymentStatus === 'Unpaid' ? -1 : b.paymentStatus === 'Unpaid' ? 1 : 0;
      }
      return 0; 
    });
  
    setData(sortedData);
  };
  
  const handleSortOptionSelected = (selectedOption) => {
    const sortedData = [...data].sort((a, b) => {
      if (a.optionSelected === selectedOption && b.optionSelected !== selectedOption) {
        return -1; 
      } else if (a.optionSelected !== selectedOption && b.optionSelected === selectedOption) {
        return 1; 
      } else if (a.optionSelected === "Non-Delivery" && b.optionSelected === "Postal Delivery") {
        return -1; 
      } else if (a.optionSelected === "Postal Delivery" && b.optionSelected === "Non-Delivery") {
        return 1; 
      } else {
        return a.optionSelected.localeCompare(b.optionSelected);
      }
    });
  
    setData(sortedData);
  };
  
  const renderVerifyReceipt = (index) => {
    const paymentStatus = data[index].paymentStatus;
    const status = verificationStatus[index];
  
    if (paymentStatus === "Unpaid") {
      return (
        <td style={{ backgroundColor: 'gray', textAlign: 'center' }}></td>
      );
    } else {
      let cellStyle = {};
      if (status === 'Verified') {
        cellStyle.backgroundColor = 'green';
      } else if (status === 'Rejected') {
        cellStyle.backgroundColor = 'red';
      } else if (status === null) {
        cellStyle.backgroundColor = 'gray';
      }
  
      let buttonComponent;
      if (status === 'Verified' || status === 'Rejected') {
        buttonComponent = <span onClick={() => handleVerifyReceipt(index, 'Change')} style={{ cursor: 'pointer', color: 'white' }}>Change</span>;
      } else if (status !== null) {
        buttonComponent = (
          <>
            <button className="reject-button" onClick={() => handleVerifyReceipt(index, 'Reject')}>Reject</button>
            <button className="verify-button" onClick={() => handleVerifyReceipt(index, 'Verify')}>Verify</button>
          </>
        );
      }
  
      return (
        <td style={{ textAlign: 'center', ...cellStyle }}>
          {buttonComponent}
        </td>
      );
    }
  };
  
  const renderReceipt = (receipt, paymentStatus) => {
    if (paymentStatus === "Unpaid") {
      return (
        <td style={{ backgroundColor: 'gray', textAlign: 'center' }}></td>
      );
    } else {
      return (
        <td style={{ textAlign: 'center' }}>
          <button className="view-button" onClick={() => handleViewReceipt(receipt)}>View</button>
        </td>
      );
    }
  };
  
  const renderShippingID = (shippingID, paymentStatus, optionSelected, index) => {
    if (optionSelected === "Graduation Day Pickup" || optionSelected === "Pick Up at Registration Office" || paymentStatus === "Unpaid") {
      return (
        <td style={{ backgroundColor: 'gray', textAlign: 'center' }}></td>
      );
    } else {
      return (
        <td className="shipping-id-cell">
          {shippingID ? (
            <>
              <input type="text" value={shippingID} readOnly />
              <a href="#" className="settings-icon" onClick={(e) => handleSettingsClick(e, shippingID, index)}>
                <img src={settingIcon} alt="Settings" />
              </a>
            </>
          ) : null}
        </td>
      );
    }
  };
  
  const handleViewReceipt = (receipt) => {
  
  };
  
  const handleSettingsClick = (e, shippingID, index) => {
    e.preventDefault();
    setSelectedShippingID(shippingID);
    setSelectedRowIndex(index);
    setShowPopup(true);
  };

  const [data, setData] = useState([
    { id: 64011671, name: "Thanawat Rodklay", optionSelected: "Postal Delivery", optionSortOrder: 1, paymentStatus: "Paid", checked: false, receipt: "123456", verifyReceipt: "Verified", shippingID: null },
    { id: 64011655, name: "Teerapat Wattanamanont", optionSelected: "Postal Delivery", optionSortOrder: 3, paymentStatus: "Paid", checked: false, receipt: "123456", verifyReceipt: "Rejected", shippingID: "EGXXXXXXXXXTH" },
    { id: 64011555, name: "Phutthiphat Lueangmanotham", optionSelected: "Graduation Day Pickup", optionSortOrder: 1, paymentStatus: "Paid", checked: false, receipt: "123456", verifyReceipt: "Waiting", shippingID: "EGXXXXXXXXXTH" },
    { id: 64011331, name: "Akararat Pattanamontri", optionSelected: "Postal Delivery", optionSortOrder: 3, paymentStatus: "Paid", checked: false, receipt: "123456", verifyReceipt: null, shippingID: "EGXXXXXXXXXTH" },
    { id: 64011378, name: "Chiho Li", optionSelected: "Postal Delivery", optionSortOrder: 3, paymentStatus: "Paid", checked: false, receipt: "123456", verifyReceipt: "Verified", shippingID: "EGXXXXXXXXXTH" },
    { id: 64011470, name: "Natchapon Manachaiprasert", optionSelected: "Graduation Day Pickup", optionSortOrder: 1, paymentStatus: "Paid", checked: false, receipt: "123456", verifyReceipt: "Verified", shippingID: "EGXXXXXXXXXTH" },
    { id: 64011643, name: "Suriya Chaubey", optionSelected: "Graduation Day Pickup", optionSortOrder: 1, paymentStatus: "Unpaid", checked: false, receipt: "123456", verifyReceipt: "Verified", shippingID: "EGXXXXXXXXXTH" },
    { id: 64011397, name: "Jade Chuapakdee", optionSelected: "Postal Delivery", optionSortOrder: 3, paymentStatus: "Paid", checked: false, receipt: "123456", verifyReceipt: "Verified", shippingID: "EGXXXXXXXXXTH" },
    { id: 64011546, name: "Phatthara Srilachot", optionSelected: "Pick Up at Registration Office", optionSortOrder: 2, paymentStatus: "Paid", checked: false, receipt: "123456", verifyReceipt: "Verified", shippingID: null },
    { id: 64011683, name: "Thitiwat Sornmanee", optionSelected: "Graduation Day Pickup", optionSortOrder: 1, paymentStatus: "Unpaid", checked: false, receipt: "123456", verifyReceipt: "Verified", shippingID: "EGXXXXXXXXXTH" },
    { id: 64011478, name: "Nattawat Chaokraisith", optionSelected: "Pick Up at Registration Office", optionSortOrder: 2, paymentStatus: "Unpaid", checked: false, receipt: "123456", verifyReceipt: "Verified", shippingID: "EGXXXXXXXXXTH" },
    { id: 64011366, name: "Chananon Kanunghet", optionSelected: "Graduation Day Pickup", optionSortOrder: 1, paymentStatus: "Paid", checked: false, receipt: "123456", verifyReceipt: "Verified", shippingID: "EGXXXXXXXXXTH" },
  ]);

  const [verificationStatus, setVerificationStatus] = useState({});
  const [changeIndex, setChangeIndex] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedShippingID, setSelectedShippingID] = useState("");
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);

  const handleVerifyReceipt = (index, action) => {
    const newData = [...data];
    if (action === 'Verify' || action === 'Change') {
      const newStatus = action === 'Verify' ? 'Verified' : '';
      newData[index].verifyReceipt = newStatus;
      setVerificationStatus(prevStatus => ({
        ...prevStatus,
        [index]: newStatus
      }));
      if (action === 'Change') {
        setChangeIndex(null);
        newData[index].checked = false;
      } else {
        newData[index].checked = true;
      }
    } else if (action === 'Reject') {
      newData[index].verifyReceipt = 'Rejected';
      setChangeIndex(index);
      setVerificationStatus(prevStatus => ({
        ...prevStatus,
        [index]: 'Rejected'
      }));
      newData[index].checked = !newData[index].checked;
    }
    setData(newData);
  };
  
  useEffect(() => {
    const initialVerificationStatus = {};
    data.forEach((item, index) => {
      initialVerificationStatus[index] = item.verifyReceipt;
    });
    setVerificationStatus(initialVerificationStatus);
  }, [data]);

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

  const handleSave = () => {
    const newData = [...data];
    if (selectedRowIndex !== null) {
      newData[selectedRowIndex].shippingID = selectedShippingID;
      setData(newData);
    }
    setShowPopup(false);
  };

  return (
    <div className="app-container">
      <header className="am-header">
        <div className="am-header-content">
          <img src={logo} alt="Logo" className="am-logo" />
          <div>
            <h1 className="am-title">Print</h1>
            <p className="am-admin">{userName}</p>
          </div>
        </div>
      </header>
      
      <nav className="am-navbar">
        <div className="ap-navbar-left">
          <button className="back-to-home-nav-button" onClick={handleBacktToHome}>Back to Home</button>
        </div>
        <div className="navbar-right">
          <button className="logout-button">Logout</button>
        </div>
      </nav>
      <p></p>
      
    <div className='am-btn-container'>
      <button className='am-btn-choices' onClick={handlePrintAllStudents}>Print All Students</button>
      <p className='choices-description'>Print all Students in the table</p>
    </div>

    <div className='am-btn-container'>
      <button className='am-btn-choices' onClick={handlePrintGraduationDayStudents}>Print Graduation Day Students</button>
      <p className='choices-description'>Print all student that chose to come to the graduation ceremony</p>
    </div>

    <div className='am-btn-container'>
      <button className='am-btn-choices' onClick={handlePrintRegistrationOffice}>Print Registration Office Students</button>
      <p className='choices-description'>Print all student that chose to pick it up at the registration office</p>
    </div>

    <div className='am-btn-container'>
      <button className='am-btn-choices' onClick={handlePrintPostalDelivery}>Print Postal Delivery Students</button>
      <p className='choices-description'>Print all student that wants the certificate to be delivered at their doorsteps</p>
    </div>

    <div className='am-btn-container'>
      <button className='am-btn-choices' onClick={handlePrintUnshippedStudents}>Print Unshipped Students</button>
      <p className='choices-description'>Print all students that we haven't shipped their certificates yet</p>
    </div>

    {/* <div className='am-btn-container'>
      <button className='am-btn-choices' onClick={handlePrintUnprintedStudents}>Print Unprinted Students</button>
      <p className='choices-description'>Print all student that we haven't printed yet</p>
    </div> */}
      
      {showPopup && (
        <div className="popup-container">
          <div className="popup">
            <h2>Edit Shipping ID</h2>
            <input type="text" value={selectedShippingID} onChange={(e) => setSelectedShippingID(e.target.value)} />
            <div className="button-container">
              <button className="popup-button-cancel" onClick={handleCancel}>Cancel</button>
              <button className="popup-button-save" onClick={handleSave}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminPrint;