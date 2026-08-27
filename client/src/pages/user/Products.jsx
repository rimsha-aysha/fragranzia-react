import React, { useEffect, useState } from "react";
import axios from "../../axios";
import "./Product.css";

import { BsSliders } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import Swal from "sweetalert2";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [sortOption, setSortOption] = useState("Relevance");
  const [showFilter, setShowFilter] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const navigate = useNavigate();

  const [wishlist, setWishlist] = useState(
    JSON.parse(localStorage.getItem("wishlist")) || []
  );

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "/api/product"
      );

      console.log("API Response:", response.data);

      setProducts(response.data);
      setFilteredProducts(response.data);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  // -------------------------
  // WISHLIST
  // -------------------------

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

  // -------------------------
  // CART
  // -------------------------

  const addToCart = async (product) => {
    const token = localStorage.getItem("token");

    if (!token) {
      await Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please login to continue.",
      });
      navigate("/login");
      return;
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));

    await Swal.fire({
      icon: "success",
      title: "Success",
      text: "Product added to cart successfully!",
      timer: 1500,
      showConfirmButton: false,
    });
    navigate("/cart");
  };

  // -------------------------
  // SORT PRODUCTS
  // -------------------------

  const handleSort = (option) => {
    setSortOption(option);

    let sortedProducts = [...filteredProducts];

    if (option === "Relevance") {
      sortedProducts = [...products];
    }

    else if (option === "Newest First") {
      sortedProducts.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
    }

    else if (option === "Popularity") {
      sortedProducts.sort((a, b) => {
        return (b.sales || b.popularity || 0) -
          (a.sales || a.popularity || 0);
      });
    }

    else if (option === "Price: Low to High") {
      sortedProducts.sort((a, b) => {
        return Number(a.productPrice) - Number(b.productPrice);
      });
    }

    else if (option === "Price: High to Low") {
      sortedProducts.sort((a, b) => {
        return Number(b.productPrice) - Number(a.productPrice);
      });
    }

    setFilteredProducts(sortedProducts);
  };

  // -------------------------
  // FILTER
  // -------------------------

  const applyFilter = () => {
    let result = [...products];

    // Category filter
    if (selectedCategory !== "All") {
      result = result.filter(
        (item) => item.category === selectedCategory
      );
    }

    // Minimum price
    if (minPrice !== "") {
      result = result.filter(
        (item) => Number(item.productPrice) >= Number(minPrice)
      );
    }

    // Maximum price
    if (maxPrice !== "") {
      result = result.filter(
        (item) => Number(item.productPrice) <= Number(maxPrice)
      );
    }

    setFilteredProducts(result);
    setShowFilter(false);
  };

  // -------------------------
  // RESET FILTER
  // -------------------------

  const resetFilter = () => {
    setSelectedCategory("All");
    setMinPrice("");
    setMaxPrice("");

    setFilteredProducts(products);
    setSortOption("Relevance");
  };

  // Get unique categories
  const categories = [
    "All",
    ...new Set(products.map((item) => item.category)),
  ];

  return (
    <div>

      {/* HEADER */}

      <div className="product-header">

        <div className="top-banner">
          ENJOY FESTIVE DISCOUNT! FREE SHIPPING ABOVE ₹999!
        </div>

        <div className="header-content">

          <div className="title-section">
            <h1>All Products</h1>
            <p>Home &gt; Products</p>
          </div>

          {/* SORT */}

          <div className="sort-section">

            <span className="label">
              Sort By:
            </span>

            <span
              className={sortOption === "Relevance" ? "active" : ""}
              onClick={() => handleSort("Relevance")}
            >
              Relevance
            </span>

            <span
              className={sortOption === "Newest First" ? "active" : ""}
              onClick={() => handleSort("Newest First")}
            >
              Newest First
            </span>

            <span
              className={sortOption === "Popularity" ? "active" : ""}
              onClick={() => handleSort("Popularity")}
            >
              Popularity
            </span>

            <span
              className={
                sortOption === "Price: Low to High"
                  ? "active"
                  : ""
              }
              onClick={() =>
                handleSort("Price: Low to High")
              }
            >
              Price: Low to High
            </span>

            <span
              className={
                sortOption === "Price: High to Low"
                  ? "active"
                  : ""
              }
              onClick={() =>
                handleSort("Price: High to Low")
              }
            >
              Price: High to Low
            </span>

          </div>

          {/* FILTER BUTTON */}

          <div className="filter-container">

            <div
              className="filter-icon"
              onClick={() => setShowFilter(!showFilter)}
            >
              <span>Filter</span>
              <BsSliders />
            </div>

            {showFilter && (
              <div className="filter-dropdown">

                <div
                  onClick={() => {
                    handleSort("Relevance");
                    setShowFilter(false);
                  }}
                >
                  Relevance
                </div>

                <div
                  onClick={() => {
                    handleSort("Newest First");
                    setShowFilter(false);
                  }}
                >
                  Newest First
                </div>

                <div
                  onClick={() => {
                    handleSort("Popularity");
                    setShowFilter(false);
                  }}
                >
                  Popularity
                </div>

                <div
                  onClick={() => {
                    handleSort("Price: Low to High");
                    setShowFilter(false);
                  }}
                >
                  Price: Low to High
                </div>

                <div
                  onClick={() => {
                    handleSort("Price: High to Low");
                    setShowFilter(false);
                  }}
                >
                  Price: High to Low
                </div>

              </div>
            )}

          </div>

        </div>

      </div>







      {/* PRODUCTS */}

      <div className="product-grid">

        {filteredProducts.length > 0 ? (

          filteredProducts.map((item, index) => (

            <Link
              key={item._id}
              to={`/single/${item._id}`}
              className="product-link"
            >

              <div className="product-wrapper">

                <div
                  className={
                    index % 2 === 0
                      ? "div1"
                      : "div"
                  }
                >

                  <div className="image-box">

                    <img
                      className="image"
                      src={item.image}
                      alt={item.name}
                    />

                    {wishlist.some(
                      (wish) => wish._id === item._id
                    ) ? (

                      <FaHeart
                        className="heart-icon filled"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                      />

                    ) : (

                      <FaRegHeart
                        className="heart-icon"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          addToWishlist(item);
                        }}
                      />

                    )}

                  </div>

                </div>


                <p className="product-name">
                  {item.name}
                </p>


                <h3 className="product-price">
                  ₹{item.productPrice}
                </h3>


                <button
                  className="buttonn"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    addToCart(item);
                  }}
                >
                  Add to Cart
                </button>

              </div>

            </Link>

          ))

        ) : (

          <p className="no-products">
            No products found.
          </p>

        )}

      </div>


      <button className="load-btn">
        Load More
      </button>

    </div>
  );
};

export default Products;