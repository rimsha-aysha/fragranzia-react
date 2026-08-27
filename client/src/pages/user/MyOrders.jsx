import React, { useEffect, useState } from "react";
import "./MyOrders.css";
import axios from "../../axios";

import { FaCalendarAlt } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [showReturnPopup, setShowReturnPopup] = useState(false);

  const [returnData, setReturnData] = useState({
    reason: "",
    description: "",
  });

  const canCancel = ["Pending", "Processing"];
const token = localStorage.getItem("token");
  useEffect(() => {
    getMyOrders();
  }, []);

 

const getMyOrders = async () => {
  try {
    const res = await axios.get(
      "/api/orders/my-orders",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setOrders(res.data);

  } catch (err) {
    console.log(err);
  }
};

  const returnOrder = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `/api/orders/${selectedOrder._id}`,
        {
          status: "Return Pending Review",
          returnReason: returnData.reason,
          returnDescription: returnData.description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      getMyOrders();

      setShowReturnPopup(false);
      setSelectedOrder(null);

      setReturnData({
        reason: "",
        description: "",
      });
    } catch (err) {
      console.log(err);
    }
  };

  const cancelOrder = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `/api/orders/cancel/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      getMyOrders();
      setSelectedOrder(null);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className={selectedOrder ? "blur-bg" : ""}>
        {orders.length === 0 ? (
          <h2
            style={{
              textAlign: "center",
              marginTop: "100px",
            }}
          >
            No Orders Yet
          </h2>
        ) : (
          <div className="orders-container">
            {orders.map((order, index) => (
              <div className="order-card" key={index}>
                <div className="order-top">
                  <div className="order-left">
                    <span className="order-id">
                      Order ID:
                      <span className="order-id-span">
                        #{order._id.slice(-6).toUpperCase()}
                      </span>
                    </span>

                    <span className="date">
                      <FaCalendarAlt />
                      <span>
                        {new Date(order.createdAt).toLocaleDateString()}
                      </span>
                    </span>
                  </div>

                  <div className="status">
                    STATUS :
                    <span className="status-option">{order.status}</span>
                  </div>
                </div>

                <div className="order-middle">
                  {order.product ? (
  <>
    <img
      src={order.product.image}
      alt={order.product.name}
    />

    <div className="product-details">
      <h3>{order.product.name}</h3>

      <p>
        Qty: <strong>{order.quantity}</strong>
      </p>

      <p>Price: ₹{order.product.productPrice}</p>
    </div>
  </>
) : (
  <div className="product-details">
    <h3>Product Deleted</h3>
    <p>This product is no longer available.</p>
  </div>
)}
                </div>

                <hr />

                <div className="order-bottom">
                  <div>
                    <p className="grand">GRAND TOTAL</p>
                    <h2>₹{order.product.productPrice}</h2>
                  </div>

                  <button
                    className="view-btn"
                    onClick={() => setSelectedOrder(order)}
                  >
                    <FiSearch />
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedOrder && (
  <div
    className="popup-overlay"
    onClick={() => setSelectedOrder(null)}
  >
    <div
      className="popup-box"
      onClick={(e) => e.stopPropagation()}
    >

      {/* Header */}
      <div className="topof-popup">
        <div>
          <h3>Order Details</h3>
          <p>Order ID: #{selectedOrder._id.slice(-8).toUpperCase()}</p>
        </div>

        <div className="status-badge">
          {selectedOrder.status}
        </div>
      </div>

      {/* Product */}
      <div className="popup-details">

        <img
          src={selectedOrder.product?.image}
          alt={selectedOrder.product?.name}
        />

        <div className="details">

          <h4>{selectedOrder.product?.name}</h4>

          <p>
            <strong>Quantity:</strong> {selectedOrder.quantity}
          </p>

          <p>
            <strong>Price:</strong> ₹
            {selectedOrder.product?.productPrice}
          </p>

          <p>
            <strong>Payment:</strong> {selectedOrder.paymentMethod}
          </p>

          <p>
            <strong>Order Date:</strong>{" "}
            {new Date(selectedOrder.createdAt).toLocaleDateString()}
          </p>

          <p>
            <strong>Expected Delivery:</strong>{" "}
            {selectedOrder.status === "Delivered"
              ? "Delivered"
              : "2-4 Business Days"}
          </p>

        </div>

      </div>

      <hr />

     <div className="bottom-section">

  {/* Shipping Address */}
  <div className="address-box">
    <h4>Shipping Address</h4>

    <p><strong>{selectedOrder.address?.name}</strong></p>

    <p>{selectedOrder.address?.address}</p>

    <p>
      {selectedOrder.address?.city},{" "}
      {selectedOrder.address?.state}
    </p>

    <p>{selectedOrder.address?.pincode}</p>

    <p>Phone: {selectedOrder.address?.phone}</p>
  </div>

  {/* Order Summary */}
  <div className="summary-box">

    <h4>Order Summary</h4>

    <div className="summary-row">
      <span>Items Total</span>
      <span>₹{selectedOrder.product?.productPrice}</span>
    </div>

    <div className="summary-row">
      <span>Shipping</span>
      <span>Free</span>
    </div>

    <div className="summary-row total">
      <span>Total</span>
      <span>₹{selectedOrder.product?.productPrice}</span>
    </div>

  </div>

</div>

      {/* Buttons */}
      <div className="closebtns">

        {canCancel.includes(selectedOrder.status) ? (
          <button
            className="myorder-cancel-btn"
            onClick={() => cancelOrder(selectedOrder._id)}
          >
            Cancel Order
          </button>
        ) : (
          <button
            className="myorder-return-btn"
            onClick={() => setShowReturnPopup(true)}
          >
            Return Order
          </button>
        )}

        <button
          className="myorder-close-btn"
          onClick={() => setSelectedOrder(null)}
        >
          Close
        </button>

      </div>

    </div>
  </div>
)}
           {showReturnPopup && (
  <div
    className="popup-overlay"
    onClick={() => setShowReturnPopup(false)}
  >
    <div
      className="popup-box"
      onClick={(e) => e.stopPropagation()}
    >
      <h3>Return Order</h3>

      <label>Reason for Return</label>

      <select
        value={returnData.reason}
        onChange={(e) =>
          setReturnData({
            ...returnData,
            reason: e.target.value,
          })
        }
      >
        <option value="">Select Reason</option>
        <option value="Damaged Product">Damaged Product</option>
        <option value="Wrong Item Received">Wrong Item Received</option>
        <option value="Product Defective">Product Defective</option>
        <option value="Product Not as Expected">
          Product Not as Expected
        </option>
        <option value="Missing Items">Missing Items</option>
        <option value="Other">Other</option>
      </select>

      <label
        style={{
          marginTop: "15px",
          display: "block",
        }}
      >
        Additional Details
      </label>

      <textarea
        rows="4"
        placeholder="Please describe the reason..."
        value={returnData.description}
        onChange={(e) =>
          setReturnData({
            ...returnData,
            description: e.target.value,
          })
        }
      />

      <div className="closebtns">
        <button
          className="myorder-return-btn"
          onClick={returnOrder}
          disabled={!returnData.reason}
        >
          Submit Request
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default MyOrders;