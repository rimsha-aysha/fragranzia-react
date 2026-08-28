import React from 'react';
import AdminLayout from '../layout/AdminLayout';
import { Outlet, Navigate } from 'react-router-dom';

const AdminProtectedRoute = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token || role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  );
};

export default AdminProtectedRoute;