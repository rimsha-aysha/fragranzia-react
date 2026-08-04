import React, { useState } from "react";
import "./MainProfile.css";


import Profile from "./Profile";
import Address from "./Address";
import MyOrders from "./MyOrders";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const MainProfile = () => {

 const location = useLocation();

const [activeTab, setActiveTab] = useState(
  location.state?.activeTab || "profile"
);

useEffect(() => {
  if (location.state?.activeTab) {
    setActiveTab(location.state.activeTab);
  }
}, [location.state]);

  return (
    <div>
     
      <div className="profile-container">

        {/* Heading */}
        <div className="profile-top">
         <h1>
  {activeTab === "profile"
    ? "Profile"
    : activeTab === "address"
    ? "Address"
    : "My Orders"}
</h1>

<p>
  Home <span>{">"}</span>

  {activeTab === "profile"
    ? " Profile"
    : activeTab === "address"
    ? " Address"
    : " My Orders"}
</p>
        </div>

        {/* Tabs */}
        <div className="profile-tabs">

          <button
            className={activeTab === "profile" ? "active-tab" : ""}
            onClick={() => setActiveTab("profile")}
          >
            Profile
          </button>

          <button
            className={activeTab === "address" ? "active-tab" : ""}
            onClick={() => setActiveTab("address")}
          >
            Address
          </button>

          <button
            className={activeTab === "orders" ? "active-tab" : ""}
            onClick={() => setActiveTab("orders")}
          >
            My Orders
          </button>

        </div>

        {/* Changing Pages */}
        <div className="profile-content">

          {activeTab === "profile" ? (
            <Profile />
          ) : activeTab === "address" ? (
            <Address />
          ) : (
            <MyOrders />
          )}

        </div>

      </div>
    </div>
  );
};

export default MainProfile;