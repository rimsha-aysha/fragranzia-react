import React, { useState } from 'react';
import AdminSidebar from "../admin/AdminSidebar";
import AdminNavbar from '../admin/AdminNavbar';
import './AdminLayout.css';

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className='admin-layout-main'>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="admin-sidebar-overlay" 
          onClick={() => setSidebarOpen(false)} 
        />
      )}

      <AdminSidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />

      <div className="admin-content-wrapper">
        <AdminNavbar 
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
        />
        <div className="admin-children-container">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;