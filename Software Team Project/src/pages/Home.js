import '../styles/App.css';
import logo from '../images/KMITLLogo.png'; 

function Home() {

  return (
    <div className="app-container">
      <header className="header">
        <div className="header-content">
          <img src={logo} alt="Logo" className="logo" />
          <h1 className="title">Home Page</h1>
        </div>
      </header>
      <nav className="navbar">
        King Mongkut's Institute of Technology Ladkrabang
      </nav>
    </div>
  );
}

export default Home;