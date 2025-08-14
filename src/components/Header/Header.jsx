import { Link } from "react-router-dom";
import './Header.css'
import { useNavigate } from "react-router-dom";

function Header() {
    let navigate=useNavigate()
  function HandleClick(){
    navigate('/Login')
  }
  return (
    <div>
        <div className="top-nav">
            <h2>Youtube</h2>
            <button onClick={HandleClick}>Sign In</button>
        </div>
        
    <nav className="Navbar">
      <ul className="list">
        <li className="list-items">
          <Link to="/">Home</Link>
        </li>
        <li className="list-items">
          <Link to="/">Shorts</Link>
        </li>
        <li className="list-items">
          <Link to="/">Subsciptions</Link>
        </li>
      </ul>
    </nav>
    </div>
    
  );
}

export default Header;
