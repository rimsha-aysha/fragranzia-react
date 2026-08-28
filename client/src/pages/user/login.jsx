
import "./Login.css";
import React, { useState } from "react";
import { IoPerson } from "react-icons/io5";
import { IoMdMail } from "react-icons/io";
import { FaGoogle } from "react-icons/fa";
import { IoLogoFacebook } from "react-icons/io5";
import axios from "../../axios";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "/api/signUp/login",
        formData
      );

      const { token, role, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("role", role || "user");

      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      }

      await Swal.fire({
        icon: "success",
        title: "Success",
        text:
          role === "admin"
            ? "Welcome back, Admin!"
            : "Login Successful",
        timer: 1500,
        showConfirmButton: false,
      });

      if (role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/");
      }

    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "Login Failed",
        text:
          error.response?.data?.message ||
          "Invalid email or password",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="main-l">

        <div className="img-l">
          <h1>Let's Gets Started!</h1>
          <p>
            Create your account and Unlock the <br />
            full potential of Fragranzia.
          </p>
        </div>

        <form className="text" onSubmit={handleSubmit}>

          <div className="text-l">

            <div className="button-l">
              <button type="button" className="btn1-l">
                <FaGoogle className="google-icon-l" />
                Google
              </button>

              <button type="button" className="btn1-l">
                <IoLogoFacebook className="facebook-icon-l" />
                Facebook
              </button>
            </div>

            <div className="line-l">
              <div className="example-l">
                <div>or sign up with email</div>
              </div>
            </div>

            <div className="btn2-l">

              <div className="just-l">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                />

                <div>
                  <IoPerson className="icon-l" />
                </div>
              </div>

              <div className="just-l">
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                />

                <div>
                  <IoMdMail className="icon-l" />
                </div>
              </div>

            </div>

            <div className="forgot-l">
              <a href="#">Forgot password?</a>
            </div>

            <div className="btn3-l">
              <button type="submit" disabled={loading}>
                {loading ? "Logging In..." : "Log In"}
              </button>
            </div>

            <div className="last-l">
              Don't have an Account?{" "}
              <Link to="/signup">Sign up</Link>
            </div>

          </div>

        </form>

      </div>
    </div>
  );
};

export default Login;

