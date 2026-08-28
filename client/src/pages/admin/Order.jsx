import React, { useEffect, useState } from "react";
import "./Order.css";
import axios from "../../axios";
import { BsBox2 } from "react-icons/bs";
import { FaRegEye } from "react-icons/fa";

const getImageSrc = (image) => {
  if (!image) return "/perfume3-removebg-preview.png";
  if (typeof image === "string") {
    if (image.startsWith("http://") || image.startsWith("https://") || image.startsWith("/")) {
      return image;
    }
return `https://fragranzia-react.onrender.com/uploads/${image}`;  }
  return "/perfume3-removebg-preview.png";
};

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null)


  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    const res = await axios.get("/api/orders");
    setOrders(res.data);
  };
  const updateStatus = async (id, status) => {
    try {

      await axios.put(
        `/api/orders/${id}`,
        { status }
      );

      getOrders();

    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div>
      <div className={selectedOrder ? "blur-bg" : ""}>
        <div className="order-body">
          <div className="order-top">
            <div>
              <div className="iconandtitle">
                <BsBox2 />
                <h2>Order Management</h2>
              </div>

              <p className="paragraph">Monitor, track and update customer orders dynamically</p>
            </div>
          </div>

          <div className="table-div">
            <table className="table-order">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Product Details</th>
                  <th>Actions</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody className="tbody-order">
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>
                      #{order._id.slice(-8).toUpperCase()}
                    </td>

                    <td className="customer-cell">

                      <strong>{order.user.name}</strong>



                      {order.user.phone}



                      {order.user.email}

                    </td>

                    <td>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>

                    <td className="product-details">

                     <img
  src={order.product?.image}
  width="40"
  height="40"
  alt={order.product?.name || "Product"}
/>

                      <div>
                        <p>{order.product.name}</p>
                        <small>
                          Qty : {order.quantity}
                        </small>
                      </div>

                    </td>
                    <td>

                      <button
                        className="details-btn"
                        onClick={() => setSelectedOrder(order)}
                      >
                        <FaRegEye className="eye-icon" />
                        Show Details
                      </button>

                    </td>

                    <td>
                      <select className="statuss"
                        value={order.status}
                        onChange={(e) =>
                          updateStatus(order._id, e.target.value)
                        }
                      >
                        <option className="sts-pending" value="Pending">Pending</option>
                        <option className="sts-processing" value="Processing">Processing</option>
                        <option className="sts-shipped" value="Shipped">Shipped</option>
                        <option className="sts-delivery" value="Out for Delivery">Out for Delivery</option>
                        <option className="sts-delivered" value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                        <option value="Return Requested">Return Requested</option>
                        <option value="Returned">Returned</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {selectedOrder && (
        <div
          className="popup-showdetails"
          onClick={() => setSelectedOrder(null)}
        >
          <div
            className="showdetails-box"
            onClick={(e) => e.stopPropagation()}
          >

            {/* Header */}
            <div className="showdetails-header">
              <div className="header-first">
                <h5><b>Order Details</b></h5>
                <p>{selectedOrder._id}</p>
              </div>


            </div>

            {/* Top Cards */}
            <div className="details-grid">

              {/* Customer */}
              <div className="detail-card">
                <h6>CUSTOMER DETAILS</h6>

                <h4>{selectedOrder.user?.name}</h4>

                <p>User ID : {selectedOrder.user?._id}</p>

                <p>{selectedOrder.user?.phone}</p>

                <p>{selectedOrder.user?.email}</p>
              </div>

              {/* Address */}
              <div className="detail-card">
                <h4>SHIPPING ADDRESS</h4>

                <p>{selectedOrder.address?.name}</p>

                <p>{selectedOrder.address?.address}</p>

                <p>
                  {selectedOrder.address?.city},{" "}
                  {selectedOrder.address?.state}
                </p>

                <p>{selectedOrder.address?.pincode}</p>

                <p>{selectedOrder.address?.phone}</p>
              </div>

              {/* Payment */}
              <div className="detail-card">
                <h4>ORDER & PAYMENT</h4>

                <p>
                  Order Date :
                  {new Date(
                    selectedOrder.createdAt
                  ).toLocaleString()}
                </p>

                <p>
                  Payment :
                  {selectedOrder.status}
                </p>

                <p>
                  Method :
                  {selectedOrder.paymentMethod}
                </p>
              </div>

            </div>

            {/* Ordered Items */}
            <div className="ordered-items">

              <h4>ITEMS ORDERED</h4>

              <div className="ordered-product">

                <img
                  src={getImageSrc(selectedOrder.product?.image)}
                  alt={selectedOrder.product?.name || "Product"}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/perfume3-removebg-preview.png";
                  }}
                />
                <div className="product-info">
                  <h3>{selectedOrder.product.name}</h3>

                  <p>
                    Qty : {selectedOrder.quantity}
                  </p>
                </div>

                <div className="price-info">
                  <p>
                    ₹{selectedOrder.product.productPrice}
                  </p>
                </div>

              </div>

            </div>
            <div className="showdetails-footer">
              <button
                className="closebtn-showdetails"
                onClick={() => setSelectedOrder(null)}
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default Order;