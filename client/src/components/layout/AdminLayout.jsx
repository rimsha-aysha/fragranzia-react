import React from 'react';
import AdminSidebar from "../admin/AdminSidebar";
import AdminNavbar from '../admin/AdminNavbar';
const AdminLayout = ({ children}) => {
  return (
    <div style={{background:"#f5f6fa", minHeight: "100vh"}} className='admin-layout-main'>
        <AdminSidebar/>
        <div style={{width:"100%"}} >
        {/* <div style={{marginLeft: "240px",}}> */}
             <AdminNavbar/>
             <div style={{ padding: "10px" }}>
    {children}
</div>

        </div>
    </div>
  );
};

export default AdminLayout;