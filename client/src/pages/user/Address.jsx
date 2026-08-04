
import React, { useState, useEffect } from "react";
import "./Address.css";

import { FaHome } from "react-icons/fa";
import { MdOutlineWorkOutline } from "react-icons/md";
import { LuMapPinned } from "react-icons/lu";
import {
  FiSearch,
  FiShoppingCart,
  FiBell,
  FiUser,
  FiPhone,
} from "react-icons/fi";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";

const Address = () => {
     const [showForm, setShowForm] = useState(false);
     const [addresses, setAddresses] = useState([]);
     const [formData, setFormData] = useState({
  name: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  landmark: "",
  pincode: "",
  altPhone: "",
});
useEffect(() => {
  const savedAddresses =
    JSON.parse(localStorage.getItem("addresses")) || [];

  setAddresses(savedAddresses);
}, []);
const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};
const saveAddress = (e) => {
  e.preventDefault();

  const updatedAddresses = addresses.map((address) => ({
    ...address,
    isPrimary: false,
  }));

  const newAddress = {
    ...formData,
    isPrimary: true,
  };

  updatedAddresses.push(newAddress);

  setAddresses(updatedAddresses);

  localStorage.setItem(
    "addresses",
    JSON.stringify(updatedAddresses)
  );

  setFormData({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    landmark: "",
    pincode: "",
    altPhone: "",
  });

  setShowForm(false);
};

const setPrimaryAddress = (index) => {
  const updatedAddresses = addresses.map((address, i) => ({
    ...address,
    isPrimary: i === index,
  }));

  setAddresses(updatedAddresses);

  localStorage.setItem(
    "addresses",
    JSON.stringify(updatedAddresses)
  );
};
  return (
    
       <div className="Address-main">

 <div className="address-containerr">      
{addresses.map((item, index) => (
  <div className="address-card" onClick={() => setPrimaryAddress(index)} key={index}>
    <div className="card-top">
      <h3>Address {index + 1}</h3>
    </div>

    <h4>{item.name}</h4>

    <p>
      {item.address}, {item.city},
      {item.state}, {item.pincode}
    </p>

    <div className="phone">
      <FiPhone />
      <span>{item.phone}</span>
    </div>
    <h4>
 
  {item.isPrimary && (
    <span className="primary-badge">
      Primary
    </span>
  )}
</h4>




  </div>
))}
</div> 
       
        <div className="button-div">
           <button onClick={()=>setShowForm(true)} className="add-address-btn ">Add Address</button>
        </div>
          {showForm && (

  <div className="modal-overlay">

    <div className="address-container">
          <button
  className="close-btn"
  onClick={() => setShowForm(false)}
>
  X
</button>
  <h3>Address Type</h3> 

      {/* Address Type Buttons */}
      <div className="address-type">

        <button className="active-type">
          <FaHome /> Home
        </button>

        <button>
          <MdOutlineWorkOutline /> Office
        </button>

        <button>
          <LuMapPinned /> Other
        </button>

      </div>

      {/* Form */}
      <form onSubmit={saveAddress} className="address-form">

        {/* Row 1 */}
        <div className="form-row">

          <div className="form-group">
            <label>Full Name</label>
            <input type="text" 
            placeholder="Enter full name" 
            name="name"
            value={formData.name}
            onChange={handleChange}
           />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="text"
              placeholder="Enter 10-digit mobile number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

        </div>

        {/* Address */}
        <div className="form-group">
          <label>Address</label>

          <textarea
            rows="5"
            placeholder="Enter house or building details"
            name="address"
            value={formData.address}
            onChange={handleChange}
          ></textarea>
        </div>

        {/* Row 2 */}
        <div className="form-row">

          <div className="form-group">
            <label>City/District</label>
            <input type="text" 
            placeholder="Enter City/District"
            name="city"
            value={formData.city}
            onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>State</label>
            <input type="text"
             placeholder="Enter state"
             name="state"
             value={formData.state}
             onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Land Mark</label>
            <input type="text" 
            placeholder="Enter state"
            name="landmark"
            value={formData.landmark}
            onChange={handleChange} />
          </div>

        </div>

        {/* Row 3 */}
        <div className="form-row">

          <div className="form-group">
            <label>PinCode</label>
            <input type="text" 
            placeholder="Enter state"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Alternative Phone number(Optional)</label>
            <input type="text"
             placeholder="Enter state"
             name="altPhone" 
             value={formData.altPhone}
             onChange={handleChange} />
          </div>
            

        </div>
  

        {/* Save Button */}
        <div className="save-btn-div">
          <button type="submit" className="save-btn" >Save</button>
        </div>

      </form>

    </div>

  </div>


)}

      </div>
   
    
  );
};

export default Address;