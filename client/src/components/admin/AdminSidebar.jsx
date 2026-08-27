import React from "react";
import "./AdminSidebar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { MdDashboard, MdOutlineLocalOffer } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import { BsGrid3X3Gap } from "react-icons/bs";
import { HiOutlineUsers } from "react-icons/hi2";
import { IoCartOutline, IoClose } from "react-icons/io5";
import { TbLogout } from "react-icons/tb";

export const AdminSidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    navigate("/adminlogin");
  };

  const handleNavClick = () => {
    if (onClose) onClose();
  };

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: <MdDashboard className="sidebar-icon" /> },
    { name: "Products", path: "/showProduct", icon: <BsGrid3X3Gap className="sidebar-icon" /> },
    { name: "Categories", path: "/showPage", icon: <BiCategory className="sidebar-icon" /> },
    { name: "Offers", path: "/category", icon: <MdOutlineLocalOffer className="sidebar-icon" /> },
    { name: "Customers", path: "/customers", icon: <HiOutlineUsers className="sidebar-icon" /> },
    { name: "Orders", path: "/admin-order", icon: <IoCartOutline className="sidebar-icon" /> },
  ];

  return (
    <aside className={`sidebar ${isOpen ? "sidebar-mobile-open" : ""}`}>
      <div className="sidebar-top">
        <div className="sidebar-logo">
          <h2 className="dashtar-brand">Dashtar</h2>
          <button 
            className="sidebar-close-btn" 
            onClick={onClose} 
            aria-label="Close sidebar"
          >
            <IoClose size={22} />
          </button>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`sidebar-nav-item ${isActive ? "active" : ""}`}
                onClick={handleNavClick}
              >
                {item.icon}
                <span className="sidebar-nav-label">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="sidebar-bottom">
        <button className="sidebar-logout-btn" onClick={handleLogout}>
          <TbLogout className="logout-icon" />
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;