import React from "react";
import "./AdminNavbar.css";
import { FaBell } from "react-icons/fa";
import { IoPersonCircleSharp } from "react-icons/io5";

export const AdminNavbar = () => {
  return (
    <div className="Admin-navbar">
      <div><p className="admin-control-panel">Admin Control Panel</p></div>
      <div className="nav-right">
        <div className="bell">
          <FaBell />
          <span className="notification">3</span>
        </div>
        <IoPersonCircleSharp />

        <p>Admin User <br /><span className="super-admin">Super Admin</span></p>


      </div>





    </div>
  );
};
export default AdminNavbar;