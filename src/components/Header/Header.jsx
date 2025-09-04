import { Link, Outlet } from "react-router-dom";
import './Header.css'
import { useNavigate } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { MdSubscriptions } from "react-icons/md";
import { BiMoviePlay } from "react-icons/bi"; // using for Shorts
import { FiMenu } from "react-icons/fi";
import { useState ,useEffect} from "react";

function Header() {
    let navigate=useNavigate()
    const [collapsed, setCollapsed] = useState(false);
    const [user, setUser] = useState("");

    useEffect(() => {
        const storedUser = sessionStorage.getItem("username");
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

  function HandleClick(){
    navigate('/Login')
  }

  return (
    <div>
        <div className="top-nav">
          <h2>Youtube</h2>
          <div className="user">
               {user ? (
                  <p> {user}!</p> // show username if logged in
                ) : (
                  <button onClick={HandleClick}>Sign In</button> // show sign in button only if no user
                )}
          </div>
          
         
        </div>

    <div className="container">
        <nav className={`Navbar ${collapsed ? "collapsed" : ""}`}>
        <button className="hamburger" onClick={() => setCollapsed(!collapsed)}>
          <FiMenu size={24} />
        </button>
      <ul className="list">
        <li className="list-items">
          <Link to="/">
           <AiFillHome size={20} style={{ marginRight: "8px" }} />
           {!collapsed && <span className="label">Home</span>}
          </Link>
        </li>
        <li className="list-items">
          <Link to="/">
          <BiMoviePlay size={20} style={{ marginRight: "8px" }} />
          {!collapsed && <span className="label">Shorts</span>}
          </Link>
        </li>
        <li className="list-items">
          <Link to="/">
          <MdSubscriptions size={20} style={{ marginRight: "8px" }} />
          {!collapsed && <span className="label">Subscription</span>}
          </Link>
        </li>

         {!collapsed && (
          <>
            <hr /> 
            <li className="list-items">
              <Link to="/">
              <MdSubscriptions size={20} style={{ marginRight: "8px" }} />
              <span className="label">History</span>
              </Link>
            </li>
            <li className="list-items">
              <Link to="/">
              <MdSubscriptions size={20} style={{ marginRight: "8px" }} />
              <span className="label">Playlists</span>
              </Link>
            </li>
            <li className="list-items">
              <Link to="/">
              <MdSubscriptions size={20} style={{ marginRight: "8px" }} />
              <span className="label">Watch Later</span>
              </Link>
            </li>
            <li className="list-items">
              <Link to="/">
              <MdSubscriptions size={20} style={{ marginRight: "8px" }} />
              <span className="label">Liked Videos</span>
              </Link>
            </li>
            <p>Trending </p>
            <hr />
            <li className="list-items">
              <Link to="/">
              <MdSubscriptions size={20} style={{ marginRight: "8px" }} />
              <span className="label">Trending</span>
              </Link>
            </li>
          </>
         )}

      </ul>
    </nav>

    <div className="content">
      <Outlet/>
    </div>
    </div>   
      
    </div>
    
  );
}

export default Header;
