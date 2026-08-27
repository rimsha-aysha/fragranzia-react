
import { useState, useEffect } from "react";
import "./Profile.css";
import { FaEyeSlash } from "react-icons/fa";

import axios from "../../axios";
const Profile = () => {
  const [profile, setProfile] = useState({
  name: "",
  email: "",
  phone: "",
  dob: "",
  gender: "",
});
const token = localStorage.getItem("token");

useEffect(() => {
  axios.get("/api/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    setProfile(res.data);
  });
}, []);
const handleUpdate = async () => {
  try {
    await axios.put(
      "/api/profile",
      profile,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Profile updated successfully");
  } catch (err) {
    console.log(err);
  }
};
  return (
    <div>
      
      {/* Form */}
      <div className="profile-form">
        <div className="input-group">
          <label>Full Name</label>
          <input type="text"
           value={profile.name}
  onChange={(e) =>
    setProfile({ ...profile, name: e.target.value })
  } />
        </div>

        <div className="input-group">
          <label>Email</label>
          <input type="email" 
            value={profile.email}
  onChange={(e) =>
    setProfile({ ...profile, email: e.target.value })
  }/>
        </div>

        <div className="input-group">
          <label>Phone Number</label>
          <input type="text" 
          value={profile.phone}
  onChange={(e) =>
    setProfile({ ...profile, phone: e.target.value })
  } />
        </div>

        <div className="input-group">
          <label>Date of Birth</label>
          <input
  type="date"
  value={profile.dob ? profile.dob.split("T")[0] : ""}
  onChange={(e) =>
    setProfile({
      ...profile,
      dob: e.target.value,
    })
  }
/>
        </div>

        <div className="input-group">
          <label>Gender</label>
          <select
  value={profile.gender}
  onChange={(e) =>
    setProfile({
      ...profile,
      gender: e.target.value,
    })
  }
>
  <option value="">Select Gender</option>
  <option value="Male">Male</option>
  <option value="Female">Female</option>
  <option value="Other">Other</option>
</select>
        </div>

        <div className="input-group password-box">
          <label>Password</label>

          <div className="password-input">
            <input type="password" placeholder="" />
            <FaEyeSlash className="eye-icon" />
          </div>
        </div>
      </div>

      {/* Button */}
      <div className="edit-btn-container">
        <button onClick={handleUpdate} className="edit-btn">Save</button>
      </div>
    </div>
    
  );
};

export default Profile;