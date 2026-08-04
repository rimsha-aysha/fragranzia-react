import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Product.css";

import { BsSliders } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import Swal from "sweetalert2";

const Products = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
  fetchProducts();
}, []);
const navigate = useNavigate();
const [wishlist, setWishlist] = useState(
  JSON.parse(localStorage.getItem("wishlist")) || []
);

const addToWishlist = (product) => {
  const token = localStorage.getItem("token");

  if (!token) {
    Swal.fire({
      icon: "warning",
      title: "Login Required",
      text: "Please login to add products to your wishlist.",
    });
    navigate("/login");
    return;
  }

  const alreadyExists = wishlist.find(
    (item) => item._id === product._id
  );

  if (alreadyExists) {
    Swal.fire({
      icon: "info",
      title: "Already Added",
      text: "This product is already in your wishlist.",
    });
    return;
  }

  const updatedWishlist = [...wishlist, product];

  setWishlist(updatedWishlist);

  localStorage.setItem(
    "wishlist",
    JSON.stringify(updatedWishlist)
  );

  Swal.fire({
    icon: "success",
    title: "Added!",
    text: "Product added to your wishlist.",
    timer: 1500,
    showConfirmButton: false,
  });
};

const fetchProducts = async () => {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/product"
    );

    console.log("API Response:", response.data);

    setProducts(response.data);
  } catch (error) {
    console.log("Error:", error);
  }
};
console.log("Products state:", products);
  



  return (
    <div>

     
      <div className="product-header">
        <div className="top-banner">
          ENJOY FESTIVE DISCOUNT! FREE SHIPPING ABOVE ₹999!
        </div>

        <div className="header-content">

          <div className="title-section">
            <h1>All Products</h1>
            <p>Home &gt; Products</p>
          </div>

          <div className="sort-section">
            <span className="label">Sort By:</span>
            <span className="active">Relevance</span>
            <span>Newest First</span>
            <span>Popularity</span>
            <span>Price: Low to High</span>
            <span>Price: High to Low</span>
          </div>

          <div className="filter-icon">
            <span>Filter</span>
            <BsSliders />
          </div>

        </div>
      </div>

     
   
  
<div className="product-grid">
   {/* <h2>Total Products: {products.length}</h2> */}
  {products.map((item,index) => (
    <Link key={item._id} to={`/single/${item._id}`} className="product-link">
    <div className="product-wrapper">
 
      <div className={index % 2 === 0 ? "div1" : "div"}>
        <div className="image-box">
 <div className="image-box">
  <img
    className="image"
    src={`http://localhost:5000/uploads/${item.image}`}
    alt={item.name}
  />

  {wishlist.some((wish) => wish._id === item._id) ? (
    <FaHeart className="heart-icon filled" />
  ) : (
    <FaRegHeart
      className="heart-icon"
      onClick={(e) => {
        e.preventDefault();
        addToWishlist(item);
      }}
    />
  )}
</div>
</div>
      </div>

      <p className="product-name">
        {item.name}
      </p>

      <h3 className="product-price">
        ₹{item.productPrice}
      </h3>

      <button className="buttonn">
        Add to Cart
      </button>

    </div>
    </Link> 
  ))}

</div>


        <button className="load-btn">Load More</button>

       
    

    </div>
  );
};

export default Products;