import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaCartShopping, FaRegBell } from "react-icons/fa6";
import { BsPersonFill } from "react-icons/bs";
import { IoSearch, IoMenu, IoClose } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";

export const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const closeMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="navbar user-navbar">
      <div className="container user-navbar-container">

        <div className="fragrance">
          <Link className="navbar-brand" to="/" onClick={closeMenu}>Fragranzia</Link>
        </div>

        <button 
          className="mobile-toggle-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation"
        >
          {mobileMenuOpen ? <IoClose size={26} /> : <IoMenu size={26} />}
        </button>

        <div className={`one ${mobileMenuOpen ? "mobile-open" : ""}`}>

          <div className="menu">
            <Link
              to="/"
              className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
              onClick={closeMenu}
            >
              Home
            </Link>

            <Link
              to="/products"
              className={`nav-link ${location.pathname === "/products" ? "active" : ""}`}
              onClick={closeMenu}
            >
              Products
            </Link>

            <Link
              to="/products"
              className="nav-link"
              onClick={closeMenu}
            >
              Gifting
            </Link>

            <Link
              to="/About"
              className={`nav-link ${location.pathname === "/About" ? "active" : ""}`}
              onClick={closeMenu}
            >
              About
            </Link>
          </div>

          <div className="lens">
            <IoSearch className="search-icon" />
            <input
              type="search"
              className="search"
              placeholder="Search here"
            />
          </div>

          <div className="icons">
            <Link
              to="/Cart"
              className={`nav-icon-link ${location.pathname === "/Cart" ? "active" : ""}`}
              onClick={closeMenu}
            >
              <FaCartShopping />
            </Link>

            <Link
              to="/Wishlist"
              className={`nav-icon-link ${location.pathname === "/Wishlist" ? "active" : ""}`}
              onClick={closeMenu}
            >
              <FaHeart />
            </Link>

            <span className="bell-icon"><FaRegBell /></span>

            {token ? (
              <>
                <Link
                  to="/MainProfile"
                  className={`nav-icon-link ${location.pathname === "/MainProfile" ? "active" : ""}`}
                  onClick={closeMenu}
                >
                  <BsPersonFill />
                </Link>

                <button className="logout-btn" onClick={() => { closeMenu(); handleLogout(); }}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="login-btn" onClick={closeMenu}>
                  Sign In
                </Link>

                <Link to="/signup" className="signup-btn" onClick={closeMenu}>
                  Sign Up
                </Link>
              </>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;