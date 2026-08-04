import React, { useState } from "react";
import "./SignUp.css";
import axios from "axios";
import { IoPerson } from "react-icons/io5";
import { IoMdMail } from "react-icons/io";
import { IoLockClosedSharp } from "react-icons/io5";
import { FaGoogle } from "react-icons/fa";
import { IoLogoFacebook } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "", 
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitSignUp = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
  "http://localhost:5000/api/signUp",
  formData
);

      console.log(response.data);

      alert("Signup completed successfully");

      setFormData({
        name: "",
        email: "",
        password: "",
      });

      navigate("/login");
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Failed to Signup"
      );
    }
  };

  return (
    <div className="main">
      <div className="img">
        <h1>Let's Get Started!</h1>
        <p>
          Create your account and unlock the
          <br />
          full potential of Fragranzia.
        </p>
      </div>

      <form className="text" onSubmit={handleSubmitSignUp}>
        <div className="button">
          <button type="button" className="btn1">
            <FaGoogle /> Google
          </button>

          <button type="button" className="btn1">
            <IoLogoFacebook /> Facebook
          </button>
        </div>

        <div className="btn2">
          <div className="just">
            <IoPerson className="icon" />
            <input
              type="text"
              name="name"
              placeholder="Enter your username"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="just">
            <IoMdMail className="icon" />
            <input
              type="email"
              name="email"
              placeholder="Enter your E-Mail"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="just">
            <IoLockClosedSharp className="icon" />
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div>
          
          <input className="checkbox-signup" type="checkbox" required /> Agree with{" "}
          <a href="#">terms and conditions</a>
        </div>

        <div className="btn3">
          <button type="submit">Sign Up</button>
        </div>

        <div className="lastt">
          Already have an Account? <Link to="/login">Sign In</Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp;