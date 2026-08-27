import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaCartShopping, FaRegBell } from "react-icons/fa6";
import { BsPersonFill } from "react-icons/bs";
import { IoSearch } from "react-icons/io5";
import { FaHeart, FaRegHeart } from "react-icons/fa";

export const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user"); // optional
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white">
      <div className="container">

        <div className="fragrance">
          <a className="navbar-brand" href="#">Fragranzia</a>
        </div>

        <div className="one">

          <div className="menu">
            <Link
              style={{ color: "rgb(8, 8, 84)", fontWeight: 500 }}
              to="/Main"
              className={`navbar-brand ${location.pathname === "/Main" ? "active" : ""}`}
            >
              Home
            </Link>

            <Link
              to="/products"
              className={`navbar-brand ${location.pathname === "/products" ? "active" : ""}`}
            >
              Products
            </Link>

            <a className="navbar-brand" href="#">Gifting</a>

            <Link
              to="/About"
              className={`navbar-brand ${location.pathname === "/About" ? "active" : ""}`}
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
  className={location.pathname === "/Cart" ? "active" : ""}
>
  <FaCartShopping />
</Link>

  <Link
  to="/Wishlist"
  className={location.pathname === "/Wishlist" ? "active" : ""}
>
 < FaHeart />
</Link>


    <FaRegBell />

           {token ? (
  <>
    <Link
      to="/MainProfile"
      className={location.pathname === "/MainProfile" ? "active" : ""}
    >
      <BsPersonFill />
    </Link>

    <button className="logout-btn" onClick={handleLogout}>
      Logout
    </button>
  </>
) : (
  <>
    <Link to="/login" className="login-btn">
      Sign In
    </Link>

    <Link to="/signup" className="signup-btn">
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