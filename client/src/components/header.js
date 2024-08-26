import { Link } from "react-router-dom";
import './header.css';

function Header() {
  return (
    <>
      <div className="Hi">
        <div className="nav">
          <img src="/Pic/logo.png" alt="Hello"/>
      
        <div className="feat"> 
          <a href="/">FAQ</a>
          <a href="/">About</a>
        </div>

        <div className="featu"> 
          <Link to="/login">
            <a>Login</a>
          </Link>
        </div>
        </div>
      </div>
    </>
  );
}
  
  export default Header;