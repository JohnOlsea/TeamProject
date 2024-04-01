import '../styles/Login.css';
import logo from '../images/KMITLLogo.png'; 

function Login() {
  return (
    <div className="app-container">
      <header className="header">
        <div className="header-content">
          <img src={logo} alt="Logo" className="logo" />
          <h1 className="title">KMITL Graduation Registration</h1>
        </div>
      </header>
      <nav className="navbar">
        King Mongkut's Institute of Technology Ladkrabang
      </nav>
      <div className="login-form">
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input type="text" id="email" />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" />
        </div>
        <button className="login-btn">Login</button>
        <p>OR</p>
        <button className="google-signin-btn">Sign In with Google</button>
      </div>
    </div>
  );
}

export default Login;
