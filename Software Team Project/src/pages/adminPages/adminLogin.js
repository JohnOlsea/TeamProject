import '../../styles/adminStyles/adminLogin.css';
import logo from '../../images/KMITLLogo.png'; 

function AdminLogin() {
  return (
    <div className="al-app-container">
      <header className="al-header">
        <div className="al-header-content">
          <img src={logo} alt="Logo" className="al-logo" />
          <h1 className="al-title">KMITL Graduation Registration</h1>
        </div>
      </header>
      <nav className="al-navbar">
        King Mongkut's Institute of Technology Ladkrabang
      </nav>
      <div className="al-login-form">
        <div className="al-input-group">
          <label htmlFor="email">Email</label>
          <input type="text" id="email" />
        </div>
        <div className="al-input-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" />
        </div>
        <button className="al-login-btn">Login</button>
        <p>OR</p>
        <button className="al-google-signin-btn">Sign In with Google</button>
      </div>
    </div>
  );
}

export default AdminLogin;
