import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ShowPage.css";


import { MdDashboard } from "react-icons/md";
import { AiFillProduct } from "react-icons/ai";
import { MdCategory } from "react-icons/md";
import { MdLocalOffer } from "react-icons/md";
import { RiCoupon2Line } from "react-icons/ri";
import { IoMdPeople } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { TbLogout } from "react-icons/tb";

import { GoPlus } from "react-icons/go";
import Category from "./Category";
import AdminNavbar from "../../components/admin/AdminNavbar";
import UserService from "../../services/UserService";
export const ShowPage=()=>{
   const [categories, setCategories] = useState([]);
   const {getCategory} =  UserService()
    let [category,setShowCategory]=useState(false)
   

    useEffect(() => {
  fetchCategories();
}, []);

const fetchCategories = async () => {
  try {

    // const response = await axios.get(
    //   "http://localhost:5000/api/category"
    // );
     const response = await getCategory()

    setCategories(response);

  } catch (error) {
    console.log(error);
  }
};

const handleDelete = async (id) => {
  try {
    await axios.delete(
      `http://localhost:5000/api/category/${id}`
    );

    alert("category Deleted");

    fetchCategories();

  } catch (error) {
    console.log(error);
    alert("Failed to delete category");
  }
};

return(
   <div className="Showpage-body">

<div className="Show-page-main">
  
     
    <div className="main-right">
 
    <div className="first-buttons" >
        <div className="ex-im-btn">
            <button>Export</button>
            <button>Import</button>
        </div>
        <div>
            <button className="Add-category-btn" onClick={() => setShowCategory(true)}><GoPlus />Add Category</button>
        </div>
        
    
    </div>
    <div className=" input-category">
    <div >
        <input className="input-search" type="
        text"  placeholder="Search Categories"/>
    </div>
    <div>
        <select className="select" name="categories" id="" placeholder="categories">
            <option value="">All Categories</option>
        </select>
    </div>
    <div>
        <button className="reset-btn">Reset Filters</button>
    </div>
    </div>
    </div>
    
    
</div>
<div className="cate">
    {category && (
  <Category
    setShowCategory={setShowCategory}
    fetchCategories={fetchCategories}
  />
)}
</div>

 <div className="table-div">
  <div>
        <table>
             <thead>
      <tr>
        <th>Name</th>
        <th>Description</th>
        <th>Parent Category</th>
        <th>Actions</th>
        <th>Status</th>
       
      </tr>
    </thead>
    <tbody>

  {categories.length > 0 ? (
    categories.map((item) => (
      <tr key={item._id}>
        <td>{item.name}</td>
        <td>{item.description}</td>
        <td>{item.parentCategory}</td>
       <td>
          <button className="edit-btn-1" >Edit</button>
          <button className="delete-btn-1" onClick={() => handleDelete(item._id)}>Delete</button>
        </td>
        <td><button className="block-btn" >block</button></td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="5" className="empty">
        No Categories Available
      </td>
    </tr>
  )}

</tbody>
        </table>
        </div>
    </div>

    <div className="last-twobtn-text">
        <button className="next-btn">Next</button>
        <p>Page 1 of 2</p>
        <button className="previous-btn">Previous</button>
        
    </div>

</div>

)


}
export default ShowPage;

