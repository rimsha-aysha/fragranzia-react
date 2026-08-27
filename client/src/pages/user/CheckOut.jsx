import React, { useEffect, useState } from "react";
import "./Checkout.css";

import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();

const products = location.state?.products || [];

  const [addresses, setAddresses] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const savedAddresses =
      JSON.parse(localStorage.getItem("addresses")) || [];

    setAddresses(savedAddresses);
  }, []);

  if (products.length === 0) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "60px" }}>
        No Products Selected
      </h2>
    );
  }

  const totalPrice = products.reduce(
    (sum, item) => sum + Number(item.productPrice) * item.quantity,
    0
  );

  const placeOrder = async () => {
    try {
      const token = localStorage.getItem("token");

      const primaryAddress = addresses.find(
        (item) => item.isPrimary
      );

      for (const item of products) {
        await axios.post(
          "http://localhost:5000/api/orders",
          {
            productId: item._id,
            quantity: item.quantity,
            address: primaryAddress,
            paymentMethod: "Cash On Delivery",
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      // Clear cart after successful checkout
      localStorage.removeItem("cart");

      setShowSuccess(true);

    } catch (err) {
      console.log(err);
    }
  };
  return (
   <>


  <div className="checkout-container">

    {/* LEFT */}
    <div className="checkout-left">

      <h2 className="checkout-title">Checkout</h2>

      {products.map((item) => (
        <div className="product-card" key={item._id}>

          <img
            src={item.image}
            alt={item.name}
          />

          <div className="product-details">

            <h3>{item.name}</h3>

            <p>Quantity : {item.quantity}</p>

            <h2>₹ {item.productPrice}</h2>

          </div>

        </div>
      ))}

      <h3 className="section-title">Personal Details</h3>

      <button className="paymentpage-btn">Add Address +</button>
      <button className="paymentpage-btn">Home</button>
      <button className="paymentpage-btn">Office</button>
      <button className="paymentpage-btn">Other</button>

      <h4 className="paymentpage-addresstitle">Address</h4>

      <div className="address-list">

        {addresses.length > 0 ? (

          addresses.map((item, index) => (

            <div
              key={index}
              className={`checkout-address-card ${
                item.isPrimary ? "selected-address" : ""
              }`}
            >

              <div className="address-top">

                <h4>{item.name}</h4>

                {item.isPrimary && <span>Primary</span>}

              </div>

              <p>
                {item.address}, {item.city}, {item.state}, {item.pincode}
              </p>

              <p>{item.phone}</p>

            </div>

          ))

        ) : (

          <p>No Address Found</p>

        )}

      </div>

    </div>

    {/* RIGHT */}
    <div className="checkout-right">

      <div className="price-card">

        <h2>Price Details</h2>

        <div className="price-row">
          <span>Price</span>
          <span>₹ {totalPrice}</span>
        </div>

        <div className="price-row">
          <span>Discount</span>
          <span className="green">- ₹0</span>
        </div>

        <div className="price-row">
          <span>Delivery Charge</span>
          <span className="green">FREE</span>
        </div>

        <hr />

        <div className="price-row total">
          <span>Total Amount</span>
          <span>₹ {totalPrice}</span>
        </div>

      </div>

      <div className="payment-card">

        <h2>Payment Method</h2>

        <label>
          <input type="radio" name="payment" defaultChecked />
          Cash On Delivery
        </label>

        <label>
          <input type="radio" name="payment" />
          Credit / Debit Card
        </label>

        <label>
          <input type="radio" name="payment" />
          Google Pay / UPI
        </label>

        <label>
          <input type="radio" name="payment" />
          Net Banking
        </label>

        <button
          className="place-order"
          onClick={placeOrder}
        >
          Place Order
        </button>

      </div>

    </div>

  </div>

  {showSuccess && (
    <div className="success-overlay">

      <div className="success-modal">

        <div className="success-icon">✅</div>

        <h2>Order Placed Successfully!</h2>

        <p>
          Thank you for shopping with Fragranzia.
          Your order has been placed successfully.
        </p>

        <div className="success-btns">

          <button
            className="track-btn"
            onClick={() =>
              navigate("/mainprofile", {
                state: { activeTab: "orders" },
              })
            }
          >
            Track Order
          </button>

          <button
            className="home-btn"
            onClick={() => navigate("/main")}
          >
            Back to Home
          </button>

        </div>

      </div>

    </div>
  )}

</>
  );
};

export default Checkout;