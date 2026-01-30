import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import logo from "../assets/images/default.png";
// import { useNavigate } from "react-router-dom";

function Header({ role, setRole, isDashboard, onMenuClick }) {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [activeSection, setActiveSection] = useState("home");
// const navigate = useNavigate();
   
const getTitle = () => {
  if (location.pathname.startsWith("/admin")) return "Admin Dashboard";
  if (location.pathname.startsWith("/user")) return "User Dashboard";
  return "NewsHub";
};


  useEffect(() => {
    if (!isHome) return;

    const sections = ["home", "about", "contact"];
    const onScroll = () => {
      const pos = window.scrollY + 120;
      sections.forEach((sec) => {
        const el = document.getElementById(sec);
        if (
          el &&
          el.offsetTop <= pos &&
          el.offsetTop + el.offsetHeight > pos
        ) {
          setActiveSection(sec);
        }
      });
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  return (
    <header className="app-header">
      <div className="nav-container">

        {/* LEFT SIDE <div className="header-left">  */}
          {/* <Link to={ role === "admin" ? "/admin" : role === "user" ? "/user" : "/" } className="logo" > */}
          {/* <Link to="/" className="logo">

           <img src={logo} alt="logo" /> 
           <span>NewsHub</span>
            {/* <span>{getTitle()}</span> */}
           {/* </Link>  */} 
           {/* </div> */}
 
<div className="header-left">
  <Link to="/" className="logo">
    <img src={logo} alt="logo" />
    <span>{getTitle()}</span>
  </Link>
</div>


        {/* ===== CENTER DASHBOARD TITLE ===== */}
        {/* {role && (
          <div className="dashboard-title">
            {role === "admin" ? "Admin Dashboard" : "User Dashboard"}
          </div>
        )} */}

        




        {/* NAV */}
        <nav className="nav-links">

          {/* ================= BEFORE LOGIN ================= */}
          {!role && (
            <>
              {isHome ? (
                <ScrollLink
                  to="home"
                  smooth
                  duration={100}
                  offset={-80}
                  className={activeSection === "home" ? "nav-active" : ""}
                >
                  Home
                </ScrollLink>
              ) : (
                <Link to="/">Home</Link>
              )}

              {isHome ? (
                <ScrollLink
                  to="about"
                  smooth={false}
                  duration={100}
                  offset={-80}
                  className={activeSection === "about" ? "nav-active" : ""}
                >
                  About
                </ScrollLink>
              ) : (
                <Link to="/about">About</Link>
              )}

              {isHome ? (
                <ScrollLink
                  to="contact"
                  smooth
                  duration={100}
                  offset={-80}
                  className={activeSection === "contact" ? "nav-active" : ""}
                >
                  Contact
                </ScrollLink>
              ) : (
                <Link to="/#contact">Contact</Link>
              )}

              <Link to="/login" className="login-btn">
                Login
              </Link>
            </>
          )}

          {/* ================= AFTER LOGIN ================= */}
          {role && (
            <>
              {/* <span className="nav-link nav-user">
                {role === "admin" ? "Admin" : "User"}
              </span> */}
              <Link
  to={role === "admin" ? "/admin" : "/user"}
  className="nav-link nav-user"
>
  {role === "admin" ? "Admin" : "User"}
</Link>


              <button
                className="logout-btn"
                onClick={() => {
                   localStorage.removeItem("role");
                  setRole(null);
                  window.location.href = "/";
                }}
              >
                Logout
              </button>
            </>
          )}

        </nav>
      </div>
    </header>
  );
}

export default Header;


