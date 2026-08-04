import React, { useEffect, useState } from "react";
import "./Cart.css";
import { FaPlus, FaMinus, FaShare } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import { useNavigate } from "react-router-dom";

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    const wishlist =
      JSON.parse(localStorage.getItem("wishlist")) || [];

    setWishlistItems(wishlist);
  }, []);

  const moveToCart = (product) => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.push(product);

  localStorage.setItem("cart", JSON.stringify(cart));

  const updatedWishlist = wishlistItems.filter(
    (item) => item._id !== product._id
  );

  setWishlistItems(updatedWishlist);

  localStorage.setItem(
    "wishlist",
    JSON.stringify(updatedWishlist)
  );

  navigate("/cart");
};

  const removeFromWishlist = (id) => {
  const updatedWishlist = wishlistItems.filter(
    (item) => item._id !== id
  );

  setWishlistItems(updatedWishlist);

  localStorage.setItem(
    "wishlist",
    JSON.stringify(updatedWishlist)
  );
};

 
  return (
<div>
    
    <div className="main">
        
      {/* ---------------- Main First ---------------- */}
      <div className="main-first">
        <div className="cart">
          <h3>Wishlist</h3>
          <p>Home {">"} Wishlist</p>
        </div>

        {wishlistItems.length === 0 ? (
  <h3>No items in wishlist</h3>
) : (
  wishlistItems.map((item) => (
    <div className="cart-box" key={item._id}>
      <div>
        <img
          className="big_img"
          src={`http://localhost:5000/uploads/${item.image}`}
          alt={item.name}
        />
      </div>

      <div>
        <h5>{item.name}</h5>

        <div className="rupees">
          <h2 style={{ fontWeight: "700" }}>
            Rs {item.productPrice}
          </h2>

          <h6
            style={{
              textDecoration: "line-through",
              fontWeight: "100",
            }}
          >
            Rs {item.oldPrice}
          </h6>
        </div>

        <button
          className="delete"
          onClick={() => removeFromWishlist(item._id)}
        >
          <MdDelete /> Delete
        </button>

       

        <button
          className="buy"
          onClick={() => moveToCart(item)}
        >
          Move To Cart
        </button>
      </div>
    </div>
  ))
)}
      </div>

     
      </div>
   
    </div>
  );
};

export default Wishlist;