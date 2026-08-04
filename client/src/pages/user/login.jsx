
import "./Login.css";
import React, { useState } from "react";
import { IoPerson } from "react-icons/io5";
import { IoMdMail } from "react-icons/io";
import { FaGoogle } from "react-icons/fa";
import { IoLogoFacebook } from "react-icons/io5";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const Login=()=>{
  const navigate = useNavigate();
    const [formData, setFormData] = useState({
      email: "",
      password: ""
    });  
     const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {

    const res = await axios.post(
      "http://localhost:5000/api/signUp/login",
      formData
    );

    localStorage.setItem("token",res.data.role);

  await Swal.fire({
  icon: "success",
  title: "Success",
  text: "Login Successful",
  timer: 1500,
  showConfirmButton: false,
});

   if (res.data.role === "admin") {
  navigate("/admin");
} else {
  navigate("/main");
}

  } catch (error) {

  await Swal.fire({
  icon: "error",
  title: "Login Failed",
  text: error.response?.data?.message || "Invalid email or password",
});

  }
};

    return(
        <div>
             <div className="main-l">
    <div className="img-l">
            <h1>Let's Gets Started!</h1>
            <p>Create your account and Unlock the <br/>full potential of Fragranzia.</p>
        </div>
        <form className='text' onSubmit={handleSubmit}>
       
        <div className="text-l">
          <div className="button-l"> 
            <button className="btn1-l"><FaGoogle className="google-icon-l" />
             Google</button>
        <button className="btn1-l"><IoLogoFacebook className='facebook-icon-l' />
                Facebook</button>
            </div>

             <div className="line-l">
                {/* <hr className="hr-l"></hr> */}
                <div className="example-l">
                    <div>or sign up with email</div>
                {/* <div><hr className="hr-l"></hr></div> */}
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
             <div > <IoPerson className="icon-l" /> </div>
                </div>

                <div className="just-l">
                <input type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}/>
               <div><IoMdMail className="icon-l"/></div>
              </div>

             </div>


             <div className="forgot-l">
            <a href="#"> Forgot password?</a>
           </div>

           <div className="btn3-l">
                <button type="submit">Log In</button>
             </div>

            <div className="last-l">
  Don't have an Account? <Link to="/signup">Sign up</Link>
</div>

        </div>
        </form>
        
    



        </div>

        </div>
    )
}
export default Login
