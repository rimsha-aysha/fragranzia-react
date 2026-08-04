import React from "react";
import "./AdminSidebar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { MdDashboard, MdCategory } from "react-icons/md";
import { AiFillProduct } from "react-icons/ai";
import { IoMdPeople } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { TbLogout } from "react-icons/tb";

export const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove admin token
    localStorage.removeItem("token");

    // If you store admin info separately, remove it too
    localStorage.removeItem("admin");

    // Redirect to login
    navigate("/adminlogin");
  };

  return (
    <div className="sidebar">
      <h4 className="Dashtar">Dashtar</h4>

      <button className="items">
        <Link
          to="/dashboard"
          className={location.pathname === "/dashboard" ? "active" : ""}
        >
          <MdDashboard className="icons" />
          <p>Dashboard</p>
        </Link>
      </button>

      <button className="items">
        <Link
          to="/showProduct"
          className={location.pathname === "/showProduct" ? "active" : ""}
        >
          <AiFillProduct className="icons" />
          <p>Products</p>
        </Link>
      </button>

      <button className="items">
        <Link
          to="/showPage"
          className={location.pathname === "/showPage" ? "active" : ""}
        >
          <MdCategory className="icons" />
          <p>Categories</p>
        </Link>
      </button>

      <button className="items">
        <Link
          to="/customers"
          className={location.pathname === "/customers" ? "active" : ""}
        >
          <IoMdPeople className="icons" />
          <p>Customers</p>
        </Link>
      </button>

      <button className="items">
        <Link
          to="/admin-order"
          className={location.pathname === "/admin-order" ? "active" : ""}
        >
          <IoCartOutline className="icons" />
          <p>Orders</p>
        </Link>
      </button>

      <div>
        <button className="logout-button" onClick={handleLogout}>
          <TbLogout /> LogOut
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;