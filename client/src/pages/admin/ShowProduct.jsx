import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"
import "./ShowProduct.css";
import axios from "axios";

import AdminNavbar from "../../components/admin/AdminNavbar";

import { MdDashboard } from "react-icons/md";
import { AiFillProduct } from "react-icons/ai";
import { MdCategory } from "react-icons/md";
import { MdLocalOffer } from "react-icons/md";
import { RiCoupon2Line } from "react-icons/ri";
import { IoMdPeople } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { TbLogout } from "react-icons/tb";
// import { FaBell } from "react-icons/fa";
// import { IoPersonCircleSharp } from "react-icons/io5";
import { GoPlus } from "react-icons/go";
import UserService from "../../services/UserService";

export const ShowProduct=()=>{
  const navigate = useNavigate();
  const {getProduct} =  UserService()
    const location = useLocation();

    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
  try {
    // const response = await axios.get(
    //   "http://localhost:5000/api/product"
    // );
const response = await getProduct()
    setProducts(response);

  } catch (error) {
    console.log(error);
  }
};
useEffect(() => {
  fetchProducts();
}, []);

const handleDelete = async (id) => {
  try {
    await axios.delete(
      `http://localhost:5000/api/product/${id}`
    );

    alert("Product Deleted");

    fetchProducts();
    
  } catch (error) {
    console.log(error);
    alert("Failed to delete product");
  }
};


return(
   <div className="ShowProduct-body">

<div className="Show-product-main">
   
    <div className="main-right">
    
    <div className="first-buttons" >
        <div className="ex-im-btn">
            <button>Export</button>
            <button>Import</button>
        </div>
        <div>
            <button className="Add-product-btn"><Link to="/add-product" className={location.pathname === "/add-product" ? "active" : ""}><GoPlus />Add Product</Link></button>
        </div>
        
    
    </div>
    <div className=" input-category">
    <div >
        <input className="input-search" type="
        text"  placeholder="Search products"/>
    </div>
    <div>
        <select className="select" name="categories" id="" placeholder="categories">
            <option value="">All Categories</option>
        </select>
    </div>
     <div>
        <select className="select" name="categories" id="" placeholder="categories">
            <option value="">Any variant Status</option>
        </select>
    </div>
    <div>
        <button className="reset-btn">Reset Filters</button>
    </div>
    </div>
    </div>

   
    
    
</div>
 <div className="table-div">
  <div className="table-scroll">
    <table>
      <thead>
        <tr>
          <th>Product Name</th>
          <th>Category</th>
          <th>Variants</th>
          <th>Price</th>
          <th>Sale Price</th>
          <th>Stocks</th>
          <th>Action</th>
          <th>Status</th>
        </tr>
      </thead>

      <tbody>
        {products.length > 0 ? (
          products.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>Perfume</td>
              <td>No Variant</td>
              <td>{product.productPrice}</td>
              <td>{product.salesPrice}</td>
              <td>{product.productQuantity}</td>
              <td>
                <button
                  className="edit-btn-1"
                  onClick={() => navigate(`/edit-product/${product._id}`)}
                >
                  Edit
                </button>

                <button
                  className="delete-btn-1"
                  onClick={() => handleDelete(product._id)}
                >
                  Delete
                </button>
              </td>

              <td>Active</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="8">No Products Available</td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
</div>
</div>

)


}
export default ShowProduct;

