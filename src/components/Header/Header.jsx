import { Link, Outlet, useNavigate } from "react-router-dom";
import './Header.css';
import { AiFillHome } from "react-icons/ai";
import { MdSubscriptions, MdWorkHistory, MdWatchLater } from "react-icons/md";
import { BiMoviePlay } from "react-icons/bi"; 
import { FiMenu } from "react-icons/fi";
import { RiPlayListAddFill } from "react-icons/ri";
import { TbFileLike } from "react-icons/tb";
import { useState, useEffect } from "react";

function Header() {
  let navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState("");
  const [popupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    function checkUser() {
      const storedUser = sessionStorage.getItem("username");
      setUser(storedUser);
    }

    checkUser(); // run on mount
    window.addEventListener("storage", checkUser);

    return () => {
      window.removeEventListener("storage", checkUser);
    };
  }, []);

    // ✅ Auto close popup after 3 seconds
    useEffect(() => {
      let timer;
      if (popupOpen) {
        timer = setTimeout(() => {
          setPopupOpen(false);
        }, 5000); // 5 seconds
      }
      return () => clearTimeout(timer);
    }, [popupOpen]);


  function HandleClick() {
    navigate('/Login');
  }
  function HandleChannel(){
    navigate("/channel/channelForm")
  }
  function HandleMainChannel(){
    navigate("/Channel")
  }
  function HandleSignOut() {
    sessionStorage.removeItem("id");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("token");

    window.dispatchEvent(new Event("storage")); 
    navigate('/Login');
  }

  return (
    <div>
      <div className="top-nav">
        <h2>Youtube</h2>
        <div className="user">
          {user ? (
            <div className="avatar-wrapper">
              {/* Avatar circle */}
              <div 
                className="avatar" 
                onClick={() => setPopupOpen(!popupOpen)}
              >
                {user.charAt(0).toUpperCase()}
              </div>

              {/* Popup */}
              {popupOpen && (
                <div className="popup">
                  <p>Hello, {user}!</p>
                  <button onClick={HandleMainChannel}>View Channel</button>
                  <button onClick={HandleChannel}>Create a Channel</button>
                  <button onClick={HandleSignOut}>Sign Out</button>
                  
                </div>
              )}
            </div>
          ) : (
            <button onClick={HandleClick}>Sign In</button>
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
              <Link to="/?filter=shorts">
                <BiMoviePlay size={20} style={{ marginRight: "8px" }} />
                {!collapsed && <span className="label">Shorts</span>}
              </Link>
            </li>
            <li className="list-items">
              <Link to="/Channel">
                <MdSubscriptions size={20} style={{ marginRight: "8px" }} />
                {!collapsed && <span className="label">Subscription</span>}
              </Link>
            </li>

            {!collapsed && (
              <>
                <hr /> 
                <li className="list-items">
                  <Link to="/">
                    <MdWorkHistory size={20} style={{ marginRight: "8px" }} />
                    <span className="label">History</span>
                  </Link>
                </li>
                <li className="list-items">
                  <Link to="/">
                    <RiPlayListAddFill size={20} style={{ marginRight: "8px" }} />
                    <span className="label">Playlists</span>
                  </Link>
                </li>
                <li className="list-items">
                  <Link to="/">
                    <MdWatchLater size={20} style={{ marginRight: "8px" }} />
                    <span className="label">Watch Later</span>
                  </Link>
                </li>
                <li className="list-items">
                  <Link to="/">
                    <TbFileLike size={20} style={{ marginRight: "8px" }} />
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
          <Outlet />
        </div>
      </div>   
    </div>
  );
}

export default Header;
