import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import axios from "../../axios";

import {
  FaDollarSign,
  FaRupeeSign,
  FaUsers,
  FaShoppingBag,
} from "react-icons/fa";
import { FiTrendingUp, FiClock, FiBox } from "react-icons/fi";
import { BiPackage } from "react-icons/bi";
import { BsSpeedometer2, BsBagCheck } from "react-icons/bs";
import { HiOutlineShoppingBag, HiOutlineUsers } from "react-icons/hi2";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalCustomers: 0,
    totalCategories: 0,
    totalRevenue: 0,
  });

  const [ordersList, setOrdersList] = useState([]);
  const [productsList, setProductsList] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [recentCustomers, setRecentCustomers] = useState([]);
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [hoveredSlice, setHoveredSlice] = useState(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const products = await axios.get(
        "/api/product"
      );

      const categories = await axios.get(
        "/api/category"
      );

      const users = await axios.get(
        "/api/signUp"
      );

      const orders = await axios.get(
        "/api/orders"
      );

      let revenue = 0;
      const validOrders = Array.isArray(orders.data) ? orders.data : [];
      validOrders.forEach((item) => {
        const price = item.product?.productPrice || 0;
        const qty = item.quantity || 1;
        revenue += Number(price) * Number(qty);
      });

      setStats({
        totalProducts: Array.isArray(products.data) ? products.data.length : 0,
        totalOrders: validOrders.length,
        totalCustomers: Array.isArray(users.data) ? users.data.length : 0,
        totalCategories: Array.isArray(categories.data) ? categories.data.length : 0,
        totalRevenue: revenue,
      });

      setOrdersList(validOrders);
      setProductsList(Array.isArray(products.data) ? products.data : []);
      setRecentOrders(validOrders.slice(-5).reverse());
      setRecentCustomers(
        Array.isArray(users.data) ? users.data.slice(-5).reverse() : []
      );
    } catch (err) {
      console.log("Dashboard fetch error:", err);
    }
  };

  // -------------------------------------------------------------
  // 1. Weekly Orders Data (7 Days)
  // -------------------------------------------------------------
  const last7Days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split("T")[0];
    last7Days.push(dateStr);
  }

  const weeklyOrdersData = last7Days.map((dateStr) => {
    const count = ordersList.filter((order) => {
      if (!order.createdAt) return false;
      const orderDate = new Date(order.createdAt).toISOString().split("T")[0];
      return orderDate === dateStr;
    }).length;
    return { date: dateStr, count };
  });

  const maxOrderCount = Math.max(...weeklyOrdersData.map((d) => d.count), 0);
  const isZeroAll = maxOrderCount === 0;
  const minY = isZeroAll ? -1 : 0;
  const maxY = isZeroAll ? 1 : Math.max(maxOrderCount + 1, 4);
  const yTicks = isZeroAll ? [-1, 0, 1] : [0, Math.ceil(maxY / 2), maxY];

  // SVG dimensions for Line Chart
  const svgWidth = 620;
  const svgHeight = 220;
  const paddingLeft = 45;
  const paddingRight = 25;
  const paddingTop = 25;
  const paddingBottom = 40;
  const plotWidth = svgWidth - paddingLeft - paddingRight;
  const plotHeight = svgHeight - paddingTop - paddingBottom;

  const points = weeklyOrdersData.map((d, i) => {
    const x = paddingLeft + (i / (weeklyOrdersData.length - 1)) * plotWidth;
    const y =
      paddingTop +
      plotHeight -
      ((d.count - minY) / (maxY - minY)) * plotHeight;
    return { x, y, date: d.date, count: d.count };
  });

  const pathD = points.reduce((acc, pt, idx) => {
    return idx === 0 ? `M ${pt.x},${pt.y}` : `${acc} L ${pt.x},${pt.y}`;
  }, "");

  // -------------------------------------------------------------
  // 2. Sales by Category (Donut Chart)
  // -------------------------------------------------------------
  const categorySalesMap = {};
  if (ordersList.length > 0) {
    ordersList.forEach((order) => {
      const cat = order.product?.category || "General";
      const amt = (order.product?.productPrice || 0) * (order.quantity || 1);
      categorySalesMap[cat] = (categorySalesMap[cat] || 0) + (amt > 0 ? amt : 1);
    });
  } else if (productsList.length > 0) {
    productsList.forEach((prod) => {
      const cat = prod.category || "General";
      categorySalesMap[cat] = (categorySalesMap[cat] || 0) + 1;
    });
  } else {
    categorySalesMap["Eau De Parfum"] = 45;
    categorySalesMap["Body Mist"] = 30;
    categorySalesMap["Deodorants"] = 25;
  }

  const categoryColors = [
    "#2563eb", // Blue
    "#10b981", // Emerald
    "#8b5cf6", // Purple
    "#f59e0b", // Amber
    "#ec4899", // Pink
    "#06b6d4", // Cyan
  ];

  const totalCatSum = Object.values(categorySalesMap).reduce(
    (a, b) => a + b,
    0
  );

  const cx = 135;
  const cy = 110;
  const rOuter = 78;
  const rInner = 52;

  let currentAngle = -Math.PI / 2;
  const donutSlices = Object.entries(categorySalesMap).map(
    ([name, val], idx) => {
      const angle = totalCatSum > 0 ? (val / totalCatSum) * 2 * Math.PI : 0;
      const endAngle = currentAngle + angle;

      const x1 = cx + rOuter * Math.cos(currentAngle);
      const y1 = cy + rOuter * Math.sin(currentAngle);
      const x2 = cx + rOuter * Math.cos(endAngle);
      const y2 = cy + rOuter * Math.sin(endAngle);

      const x3 = cx + rInner * Math.cos(endAngle);
      const y3 = cy + rInner * Math.sin(endAngle);
      const x4 = cx + rInner * Math.cos(currentAngle);
      const y4 = cy + rInner * Math.sin(currentAngle);

      const largeArcFlag = angle > Math.PI ? 1 : 0;

      // When only 1 category, full circle
      const isSingle = Object.keys(categorySalesMap).length === 1;
      const pathData = isSingle
        ? `M ${cx} ${cy - rOuter} A ${rOuter} ${rOuter} 0 1 1 ${cx - 0.01} ${cy - rOuter} M ${cx} ${cy - rInner} A ${rInner} ${rInner} 0 1 0 ${cx - 0.01} ${cy - rInner} Z`
        : `M ${x1} ${y1} A ${rOuter} ${rOuter} 0 ${largeArcFlag} 1 ${x2} ${y2} L ${x3} ${y3} A ${rInner} ${rInner} 0 ${largeArcFlag} 0 ${x4} ${y4} Z`;

      const sliceData = {
        name,
        value: val,
        percentage:
          totalCatSum > 0 ? Math.round((val / totalCatSum) * 100) : 0,
        path: pathData,
        color: categoryColors[idx % categoryColors.length],
      };

      currentAngle = endAngle;
      return sliceData;
    }
  );

  const aov =
    stats.totalOrders > 0
      ? Math.round(stats.totalRevenue / stats.totalOrders)
      : 0;

  return (
    <div className="dashboard-body">
      {/* Header */}
      <div className="dashboard-title">
        <div className="dashboard-head">
          <BsSpeedometer2 />
          <h2>Dashboard</h2>
        </div>
        <p>Welcome back Admin 👋</p>
      </div>

      {/* 4 Metric Cards */}
      <div className="overview-cards-grid">
        {/* TOTAL SALES */}
        <div className="stat-card">
          <div className="stat-card-left">
            <span className="stat-card-label">TOTAL SALES</span>
            <div className="stat-card-value">
              ₹{stats.totalRevenue.toLocaleString()}
            </div>
            <div className="stat-card-footer green-badge">
              <FiTrendingUp className="badge-icon" />
              <span>Realistic Store Total</span>
            </div>
          </div>
          <div className="stat-card-icon green-icon-box">
            <FaDollarSign />
          </div>
        </div>

        {/* TOTAL ORDERS */}
        <div className="stat-card">
          <div className="stat-card-left">
            <span className="stat-card-label">TOTAL ORDERS</span>
            <div className="stat-card-value">{stats.totalOrders}</div>
            <div className="stat-card-footer blue-badge">
              <FiClock className="badge-icon" />
              <span>AOV: ₹{aov.toLocaleString()}</span>
            </div>
          </div>
          <div className="stat-card-icon blue-icon-box">
            <HiOutlineShoppingBag />
          </div>
        </div>

        {/* PRODUCTS */}
        <div className="stat-card">
          <div className="stat-card-left">
            <span className="stat-card-label">PRODUCTS</span>
            <div className="stat-card-value">{stats.totalProducts}</div>
            <div className="stat-card-footer purple-badge">
              <FiBox className="badge-icon" />
              <span>Live in Catalog</span>
            </div>
          </div>
          <div className="stat-card-icon purple-icon-box">
            <BiPackage />
          </div>
        </div>

        {/* CUSTOMERS */}
        <div className="stat-card">
          <div className="stat-card-left">
            <span className="stat-card-label">CUSTOMERS</span>
            <div className="stat-card-value">{stats.totalCustomers}</div>
            <div className="stat-card-footer amber-badge">
              <HiOutlineUsers className="badge-icon" />
              <span>Registered Accounts</span>
            </div>
          </div>
          <div className="stat-card-icon amber-icon-box">
            <FaUsers />
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="dashboard-charts-row">
        {/* Left: Weekly Orders Overview */}
        <div className="chart-card orders-overview-card">
          <div className="chart-card-header">
            <h3>Weekly Orders Overview</h3>
            <span className="sync-pill">Realtime Sync</span>
          </div>

          <div className="chart-svg-container">
            <svg
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              className="line-chart-svg"
            >
              {/* Y Grid Lines & Labels */}
              {yTicks.map((tickVal) => {
                const yPos =
                  paddingTop +
                  plotHeight -
                  ((tickVal - minY) / (maxY - minY)) * plotHeight;
                return (
                  <g key={tickVal}>
                    <line
                      x1={paddingLeft}
                      y1={yPos}
                      x2={svgWidth - paddingRight}
                      y2={yPos}
                      stroke="#f1f5f9"
                      strokeWidth="1.2"
                    />
                    <text
                      x={paddingLeft - 10}
                      y={yPos + 4}
                      textAnchor="end"
                      fontSize="11"
                      fill="#94a3b8"
                    >
                      {tickVal}
                    </text>
                  </g>
                );
              })}

              {/* Data Line */}
              <path
                d={pathD}
                fill="none"
                stroke="#3b82f6"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Data Points */}
              {points.map((pt, idx) => (
                <g key={idx}>
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r={hoveredPoint === idx ? 6 : 4}
                    fill="#3b82f6"
                    stroke="#ffffff"
                    strokeWidth="2.5"
                    style={{ cursor: "pointer", transition: "r 0.2s ease" }}
                    onMouseEnter={() => setHoveredPoint(idx)}
                    onMouseLeave={() => setHoveredPoint(null)}
                  />
                  {/* X Date Label */}
                  <text
                    x={pt.x}
                    y={svgHeight - 12}
                    textAnchor="middle"
                    fontSize="10"
                    fill="#94a3b8"
                  >
                    {pt.date}
                  </text>
                </g>
              ))}

              {/* Interactive Tooltip */}
              {hoveredPoint !== null && (
                <g>
                  <rect
                    x={points[hoveredPoint].x - 45}
                    y={points[hoveredPoint].y - 38}
                    width="90"
                    height="28"
                    rx="6"
                    fill="#1e293b"
                  />
                  <text
                    x={points[hoveredPoint].x}
                    y={points[hoveredPoint].y - 20}
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize="11"
                    fontWeight="600"
                  >
                    {points[hoveredPoint].count} Orders
                  </text>
                </g>
              )}
            </svg>
          </div>
        </div>

        {/* Right: Sales by Category Donut */}
        <div className="chart-card category-sales-card">
          <div className="chart-card-header">
            <h3>Sales by Category</h3>
          </div>

          <div className="donut-chart-container">
            <svg viewBox="0 0 270 210" className="donut-chart-svg">
              {donutSlices.map((slice, i) => (
                <path
                  key={i}
                  d={slice.path}
                  fill={slice.color}
                  stroke="#ffffff"
                  strokeWidth="2.5"
                  style={{
                    cursor: "pointer",
                    transition: "transform 0.2s ease, opacity 0.2s ease",
                    opacity:
                      hoveredSlice === null || hoveredSlice === i ? 1 : 0.7,
                    transform:
                      hoveredSlice === i
                        ? "scale(1.03) translate(-3px, -3px)"
                        : "none",
                  }}
                  onMouseEnter={() => setHoveredSlice(i)}
                  onMouseLeave={() => setHoveredSlice(null)}
                />
              ))}

              {/* Center Tooltip/Text */}
              <text
                x={cx}
                y={cy - 4}
                textAnchor="middle"
                fontSize="13"
                fontWeight="700"
                fill="#1e293b"
              >
                {hoveredSlice !== null
                  ? `${donutSlices[hoveredSlice].percentage}%`
                  : `${donutSlices.length}`}
              </text>
              <text
                x={cx}
                y={cy + 14}
                textAnchor="middle"
                fontSize="10"
                fill="#64748b"
              >
                {hoveredSlice !== null
                  ? donutSlices[hoveredSlice].name
                  : "Categories"}
              </text>
            </svg>

            {/* Donut Legend */}
            <div className="donut-legend">
              {donutSlices.map((slice, i) => (
                <div
                  key={i}
                  className={`legend-item ${
                    hoveredSlice === i ? "legend-active" : ""
                  }`}
                  onMouseEnter={() => setHoveredSlice(i)}
                  onMouseLeave={() => setHoveredSlice(null)}
                >
                  <span
                    className="legend-color-box"
                    style={{ backgroundColor: slice.color }}
                  />
                  <span className="legend-name">{slice.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders & Customers Tables */}
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
              {recentOrders.length > 0 ? (
                recentOrders.map((order) => (
                  <tr key={order._id}>
                    <td>#{order._id.slice(-8).toUpperCase()}</td>
                    <td>{order.user?.name || "Guest"}</td>
                    <td>{order.product?.name || "Product"}</td>
                    <td>
                      <span
                        className={`status ${order.status
                          ?.replace(/\s/g, "")
                          .toLowerCase()}`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" style={{ textAlign: "center", color: "#94a3b8" }}>
                    No recent orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

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
              {recentCustomers.length > 0 ? (
                recentCustomers.map((user) => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone || "-"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" style={{ textAlign: "center", color: "#94a3b8" }}>
                    No recent customers found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;