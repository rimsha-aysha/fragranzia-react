import React, { useState, useEffect } from "react";
import "./AddProduct.css";
import axios from "axios";
// import AdminNavbar from "../../components/admin/AdminNavbar";
import {useParams, useNavigate} from "react-router-dom";
 import { GoPlus } from "react-icons/go";

export const AddProduct = () => {
  const navigate = useNavigate();
 
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

const handleChange = (e) => {
  setProductData({
    ...productData,
    [e.target.name]: e.target.value,

  });
};

const handleAddProduct = async () => {
  try {
    const formData = new FormData();

    formData.append("name", productData.name);
    formData.append("productPrice", productData.productPrice);
    formData.append("salesPrice", productData.salesPrice);
    formData.append("productQuantity", productData.productQuantity);
    formData.append("category", productData.category);

    if (productData.image instanceof File) {
      formData.append("image", productData.image);
    }

    if (id) {
      await axios.put(
        `http://localhost:5000/api/product/${id}`,
        formData
      );

      alert("Product Updated");
      navigate("/showProduct");
    } else {
      await axios.post(
        "http://localhost:5000/api/product",
        formData
      );

      alert("Product Added");
      navigate("/showProduct");
    }
  } catch (error) {
    console.log(error);
    alert("Failed");
  }
};

  useEffect(() => {
  fetchCategories();
}, []);

const fetchCategories = async () => {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/category"
    );

    setCategories(response.data);

  } catch (error) {
    console.log(error);
  }
};

const {id} = useParams();
useEffect(() => {
  if (id) {
    fetchProductById();
  }
}, [id]);

const fetchProductById = async () => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/product/${id}`
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
    console.log(error);
  }
};
  return (
    <div className="add-product-main">

    
         <div className="main-right">

        {/* PRODUCT FORM */}

        <div className="product-container">

          <div className="product-top">

            <div>
              <h2>Add Product</h2>
              <p className="subtext">
                Add your product and necessary information from here
              </p>
            </div>

            <div className="toggle-section">

              <p>Does this product have variants?</p>

              <div
                className={`toggle ${variant ? "active" : ""}`}
                onClick={() => setVariant(!variant)}
              >
                <div className="circle"></div>
              </div>

            </div>

          </div>

          {/* INPUT ROW 1 */}

          <div className="form-row">

            <div className="input-group">
              <label>Product Title/Name</label>
              <input className="product-inp" 
              type="text"
              name="name" 
              value={productData.name}
              onChange={handleChange}/>
            </div>

            <div className="input-group">
              <label>Product Price</label>
              <input className="product-inp" 
              type="text"
              name="productPrice" 
              value={productData.productPrice}
              onChange={handleChange} />
            </div>

            <div className="input-group">
              <label>Sale Price</label>
              <input className="product-inp" 
              type="text" 
              name="salesPrice" 
              value={productData.salesPrice}
              onChange={handleChange}/>
            </div>

            <div className="input-group">
              <label>Product Quantity</label>
              <input className="product-inp"
               type="text"
               name="productQuantity" 
               value={productData.productQuantity} 
               onChange={handleChange}/>
            </div>

          </div>

          {/* INPUT ROW 2 */}

          <div className="form-row">

            {/* <div className="input-group">
              <label>Product Tags (comma separated)</label>
              <input type="text" />
            </div> */}

            <div className="input-group">
              <label>Category</label>

              <select
                  name="category"
  value={productData.category}
  onChange={handleChange}
>
  <option value="">Select Category</option>

  {categories.map((item) => (
    <option key={item._id} value={item.name}>
      {item.name}
    </option>
  ))}
</select>
            </div>

            {/* <div className="input-group">
              <label>Offer</label>

              <select>
                <option>Select Offers</option>
              </select>
            </div> */}

          </div>

          {/* DESCRIPTION */}

          <div className="description-group">

            <label>Product Description</label>

            <textarea rows="6"></textarea>

          </div>

          {/* IMAGE BOX */}

          <div className="upload-section">

            <label>Product Images</label>

            <div className="upload-box">

              <GoPlus className="plus-icon" />

              <p>Click to upload or drag & drop</p>

              <span>(Max 4 images)</span>
                <input
      type="file"
      onChange={(e) =>
        setProductData({
          ...productData,
          image: e.target.files[0],
        })
      }
    />
 

            </div>

          </div>

          {/* BUTTON */}

          <div className="btn-section">
            <button className="cancel-btn">cancel</button>
             <button className="add-btn" onClick={handleAddProduct}>
                 {id ? "Update " : "Add Product"}
                
             </button>
          </div>

        </div>

      </div>

    </div>
  );
};

export default AddProduct;