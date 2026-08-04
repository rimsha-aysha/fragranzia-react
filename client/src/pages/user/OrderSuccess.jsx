import React from "react";
import { useNavigate } from "react-router-dom";
import "./OrderSuccess.css";
import { FaCheckCircle } from "react-icons/fa";

const OrderSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="success-page">

      <div className="success-card">

        <FaCheckCircle className="success-icon"/>

        <h1>Thank You!</h1>

        <h3>Your order has been placed successfully.</h3>

        <p>
          We have received your order and will start processing it soon.
        </p>

        <div className="success-buttons">
          <button
            className="home-btn"
            onClick={() => navigate("/")}
          >
            Back to Home
          </button>

           <button
            className="track-btn"
            onClick={() => navigate("/orders")}
          >
            Track Order
          </button>

        </div>

      </div>

    </div>
  );
};

export default OrderSuccess;