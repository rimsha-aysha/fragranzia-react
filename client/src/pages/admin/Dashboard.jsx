import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import axios from "axios";

import {
  FaBoxOpen,
  FaUsers,
  FaShoppingCart,
  FaRupeeSign,
} from "react-icons/fa";

import { BiCategory } from "react-icons/bi";
import { BsSpeedometer2 } from "react-icons/bs";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalCustomers: 0,
    totalCategories: 0,
    totalRevenue: 0,
  });

  const [recentOrders, setRecentOrders] = useState([]);
  const [recentCustomers, setRecentCustomers] = useState([]);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const products = await axios.get(
        "http://localhost:5000/api/product"
      );

      const categories = await axios.get(
        "http://localhost:5000/api/category"
      );

      const users = await axios.get(
        "http://localhost:5000/api/signUp"
      );

      const orders = await axios.get(
        "http://localhost:5000/api/orders"
      );

      let revenue = 0;

      orders.data.forEach((item) => {
        revenue +=
          item.product.productPrice * item.quantity;
      });

      setStats({
        totalProducts: products.data.length,
        totalOrders: orders.data.length,
        totalCustomers: users.data.length,
        totalCategories: categories.data.length,
        totalRevenue: revenue,
      });

      setRecentOrders(
        orders.data.slice(-5).reverse()
      );

      setRecentCustomers(
        users.data.slice(-5).reverse()
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="dashboard-body">

      <div className="dashboard-title">
        <div className="dashboard-head">
          <BsSpeedometer2 />
          <h2>Dashboard</h2>
        </div>

        <p>
          Welcome back Admin 👋
        </p>
      </div>

      <div className="dashboard-cards">

        <div className="dashboard-card">
          <div className="card-icon blue">
            <FaBoxOpen />
          </div>

          <div>
            <h3>{stats.totalProducts}</h3>
            <p>Total Products</p>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-icon green">
            <FaShoppingCart />
          </div>

          <div>
            <h3>{stats.totalOrders}</h3>
            <p>Total Orders</p>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-icon orange">
            <FaUsers />
          </div>

          <div>
            <h3>{stats.totalCustomers}</h3>
            <p>Total Customers</p>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-icon purple">
            <BiCategory />
          </div>

          <div>
            <h3>{stats.totalCategories}</h3>
            <p>Total Categories</p>
          </div>
        </div>

        <div className="dashboard-card revenue-card">
          <div className="card-icon red">
            <FaRupeeSign />
          </div>

          <div>
            <h3>₹{stats.totalRevenue}</h3>
            <p>Total Revenue</p>
          </div>
        </div>

      </div>
            {/* Recent Orders */}

      <div className="dashboard-section">

        <div className="dashboard-table">

          <div className="table-header">
            <h3>Recent Orders</h3>
          </div>

          <table>

            <thead>

              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Product</th>
                <th>Status</th>
              </tr>

            </thead>

            <tbody>

              {recentOrders.map((order) => (

                <tr key={order._id}>

                  <td>
                    #{order._id.slice(-8).toUpperCase()}
                  </td>

                  <td>
                    {order.user?.name}
                  </td>

                  <td>
                    {order.product?.name}
                  </td>

                  <td>

                    <span
                      className={`status ${order.status
                        .replace(/\s/g, "")
                        .toLowerCase()}`}
                    >
                      {order.status}
                    </span>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>



        {/* Recent Customers */}

        <div className="dashboard-table">

          <div className="table-header">
            <h3>Recent Customers</h3>
          </div>

          <table>

            <thead>

              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
              </tr>

            </thead>

            <tbody>

              {recentCustomers.map((user) => (

                <tr key={user._id}>

                  <td>{user.name}</td>

                  <td>{user.email}</td>

                  <td>{user.phone}</td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default Dashboard;