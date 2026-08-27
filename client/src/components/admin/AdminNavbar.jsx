import React from "react";
import "./AdminNavbar.css";
import { FaBell } from "react-icons/fa";
import { IoPersonCircleSharp, IoMenu } from "react-icons/io5";

export const AdminNavbar = ({ onToggleSidebar }) => {
  return (
    <div className="Admin-navbar">
      <div className="nav-left-section">
        <button 
          className="admin-hamburger-btn" 
          onClick={onToggleSidebar}
          aria-label="Toggle Admin Sidebar"
        >
          <IoMenu size={24} />
        </button>
        <p className="admin-control-panel">Admin Control Panel</p>
      </div>

      <div className="nav-right">
        <div className="bell">
          <FaBell />
          <span className="notification">3</span>
        </div>
        <IoPersonCircleSharp />
        <p className="admin-user-text">
          Admin User <br />
          <span className="super-admin">Super Admin</span>
        </p>
      </div>
    </div>
  );
};

export default AdminNavbar;