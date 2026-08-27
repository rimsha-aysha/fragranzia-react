import React, { useEffect, useState } from "react";
import "./Cart.css";
import { FaPlus, FaMinus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const getImageSrc = (image) => {
  if (!image) return "/perfume3-removebg-preview.png";
  if (typeof image === "string") {
    if (image.startsWith("http://") || image.startsWith("https://") || image.startsWith("/")) {
      return image;
    }
    return `http://localhost:5000/uploads/${image}`;
  }
  return "/perfume3-removebg-preview.png";
};

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = cart.map((item) => ({
      ...item,
      quantity: item.quantity || 1,
    }));
    setCartItems(updatedCart);
  }, []);

  const removeItem = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const total = cartItems.reduce(
    (sum, item) => sum + Number(item.productPrice || 0) * (item.quantity || 1),
    0
  );

  const increaseQuantity = (index) => {
    const updatedCart = [...cartItems];
    updatedCart[index].quantity = (updatedCart[index].quantity || 1) + 1;
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const decreaseQuantity = (index) => {
    const updatedCart = [...cartItems];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
      setCartItems(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  const proceedToBuy = () => {
    navigate("/checkout", {
      state: {
        products: cartItems,
      },
    });
  };

  return (
    <div>
      <div className="main">
        {/* ---------------- Main First ---------------- */}
        <div className="main-first">
          <div className="cart">
            <h3>Cart</h3>
            <p>Home {">"} Cart</p>
          </div>

          {cartItems.length === 0 ? (
            <h3>Your cart is empty</h3>
          ) : (
            cartItems.map((item, index) => (
              <div className="cart-box" key={index}>
                <div>
                  <img
                    className="big_img"
                    src={getImageSrc(item.image)}
                    alt={item.name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/perfume3-removebg-preview.png";
                    }}
                  />
                </div>

                <div>
                  <h5>{item.name}</h5>

                  <div className="box">
                    <FaMinus
                      size={12}
                      onClick={() => decreaseQuantity(index)}
                      style={{ cursor: "pointer" }}
                    />
                    <h5>{item.quantity || 1}</h5>
                    <FaPlus
                      size={12}
                      onClick={() => increaseQuantity(index)}
                      style={{ cursor: "pointer" }}
                    />
                  </div>

                  <div className="rupees">
                    <h2 style={{ fontWeight: "700" }}>
                      Rs {item.productPrice}
                    </h2>
                    {item.oldPrice && (
                      <h6
                        style={{
                          textDecoration: "line-through",
                          fontWeight: "100",
                        }}
                      >
                        Rs {item.oldPrice}
                      </h6>
                    )}
                  </div>

                  <button
                    className="delete"
                    onClick={() => removeItem(index)}
                  >
                    <MdDelete /> Delete
                  </button>

                  <button className="buy" onClick={proceedToBuy}>
                    Buy
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* ---------------- Main Second ---------------- */}
        <div className="main-second">
          <div className="small-box">
            <h5
              style={{
                marginBottom: "10px",
                fontWeight: "700",
              }}
            >
              Check out
            </h5>

            <div className="checkout-row">
              <p>Price ({cartItems.length} items)</p>
              <p style={{ fontWeight: "700" }}>Rs. {total}</p>
            </div>

            <div className="checkout-row">
              <p>Discount</p>
              <p>Rs 0</p>
            </div>

            <div className="checkout-row">
              <p>Delivery Charge</p>
              <p style={{ color: "#28d244" }}>Free</p>
            </div>

            <div className="checkout-total">
              <p style={{ fontWeight: "700" }}>Total Amount</p>
              <h5>Rs {total}</h5>
            </div>
          </div>

          <button onClick={proceedToBuy} className="proceed_btn">
            Proceed to Buy
          </button>

          <p className="small-para">
            Safe and secure Payments. Easy <br />
            returns. 100% Authentic products.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cart;