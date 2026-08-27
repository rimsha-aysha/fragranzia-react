import React, { useState, useEffect } from "react";
import "./AddProduct.css";
import axios from "../../axios";
import { useParams, useNavigate } from "react-router-dom";
import { GoPlus } from "react-icons/go";
import Swal from "sweetalert2";

export const AddProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [variant, setVariant] = useState(false);
  const [categories, setCategories] = useState([]);

  const [productData, setProductData] = useState({
    name: "",
    productPrice: "",
    salesPrice: "",
    productQuantity: "",
    category: "",
    image: null,
  });

  // -----------------------------
  // Handle Input Changes
  // -----------------------------
  const handleChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
  };

  // -----------------------------
  // Fetch Categories
  // -----------------------------
  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "/api/category"
      );

      setCategories(response.data);
    } catch (error) {
      console.log("Category Error:", error);
    }
  };

  // -----------------------------
  // Fetch Product For Edit
  // -----------------------------
  const fetchProductById = async () => {
    try {
      const response = await axios.get(
        `/api/product/${id}`
      );

      setProductData({
        name: response.data.name,
        productPrice: response.data.productPrice,
        salesPrice: response.data.salesPrice,
        productQuantity: response.data.productQuantity,
        category: response.data.category,
        image: response.data.image,
      });
    } catch (error) {
      console.log("Product Fetch Error:", error);
    }
  };

  // -----------------------------
  // useEffect
  // -----------------------------
  useEffect(() => {
    fetchCategories();

    if (id) {
      fetchProductById();
    }
  }, [id]);

  // -----------------------------
  // Add / Update Product
  // -----------------------------
  const handleAddProduct = async () => {
    try {
      const formData = new FormData();

      formData.append("name", productData.name);
      formData.append("productPrice", productData.productPrice);
      formData.append("salesPrice", productData.salesPrice);
      formData.append(
        "productQuantity",
        productData.productQuantity
      );
      formData.append("category", productData.category);

      // Add image only if a new file is selected
      if (productData.image instanceof File) {
        formData.append("image", productData.image);
      }

      // -----------------------------
      // UPDATE PRODUCT
      // -----------------------------
      if (id) {
        await axios.put(
          `/api/product/${id}`,
          formData
        );

        await Swal.fire({
          icon: "success",
          title: "Product Updated!",
          text: "Product updated successfully.",
          timer: 1500,
          showConfirmButton: false,
        });

        navigate("/showProduct");
      }

      // -----------------------------
      // ADD PRODUCT
      // -----------------------------
      else {
        await axios.post(
          "/api/product",
          formData
        );

        await Swal.fire({
          icon: "success",
          title: "Product Added!",
          text: "Product added successfully.",
          timer: 1500,
          showConfirmButton: false,
        });

        navigate("/showProduct");
      }
    } catch (error) {
      console.log("Product Error:", error);

      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: "Something went wrong. Please try again.",
      });
    }
  };

  // -----------------------------
  // Cancel
  // -----------------------------
  const handleCancel = () => {
    navigate("/showProduct");
  };

  return (
    <div className="add-product-main">

      <div className="main-right">

        <div className="product-container">

          {/* TOP SECTION */}

          <div className="product-top">

            <div>
              <h2>
                {id ? "Update Product" : "Add Product"}
              </h2>

              <p className="subtext">
                {id
                  ? "Update your product information"
                  : "Add your product and necessary information from here"}
              </p>
            </div>

            <div className="toggle-section">

              <p>Does this product have variants?</p>

              <div
                className={`toggle ${
                  variant ? "active" : ""
                }`}
                onClick={() => setVariant(!variant)}
              >
                <div className="circle"></div>
              </div>

            </div>

          </div>


          {/* INPUT ROW 1 */}

          <div className="form-row">

            {/* PRODUCT NAME */}

            <div className="input-group">

              <label>Product Title/Name</label>

              <input
                className="product-inp"
                type="text"
                name="name"
                value={productData.name}
                onChange={handleChange}
              />

            </div>


            {/* PRODUCT PRICE */}

            <div className="input-group">

              <label>Product Price</label>

              <input
                className="product-inp"
                type="number"
                name="productPrice"
                value={productData.productPrice}
                onChange={handleChange}
              />

            </div>


            {/* SALE PRICE */}

            <div className="input-group">

              <label>Sale Price</label>

              <input
                className="product-inp"
                type="number"
                name="salesPrice"
                value={productData.salesPrice}
                onChange={handleChange}
              />

            </div>


            {/* QUANTITY */}

            <div className="input-group">

              <label>Product Quantity</label>

              <input
                className="product-inp"
                type="number"
                name="productQuantity"
                value={productData.productQuantity}
                onChange={handleChange}
              />

            </div>

          </div>


          {/* INPUT ROW 2 */}

          <div className="form-row">

            {/* CATEGORY */}

            <div className="input-group">

              <label>Category</label>

              <select
                name="category"
                value={productData.category}
                onChange={handleChange}
              >

                <option value="">
                  Select Category
                </option>

                {categories.map((item) => (
                  <option
                    key={item._id}
                    value={item.name}
                  >
                    {item.name}
                  </option>
                ))}

              </select>

            </div>

          </div>


          {/* DESCRIPTION */}

          <div className="description-group">

            <label>Product Description</label>

            <textarea rows="6"></textarea>

          </div>


          {/* IMAGE UPLOAD */}

          <div className="upload-section">

            <label>Product Images</label>

            <div className="upload-box">

              <GoPlus className="plus-icon" />

              <p>
                Click to upload or drag & drop
              </p>

              <span>
                (Max 4 images)
              </span>

              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setProductData({
                    ...productData,
                    image: e.target.files[0],
                  })
                }
              />

            </div>

          </div>


          {/* BUTTONS */}

          <div className="btn-section">

            <button
              className="cancel-btn"
              onClick={handleCancel}
            >
              Cancel
            </button>

            <button
              className="add-btn"
              onClick={handleAddProduct}
            >
              {id ? "Update" : "Add Product"}
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default AddProduct;