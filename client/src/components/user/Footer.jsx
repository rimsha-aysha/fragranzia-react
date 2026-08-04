import React from "react";
import "./Footer.css";
import {
  FaEnvelope,
  FaPhone,
  FaInstagram,
  FaFacebook,
  FaXTwitter,
  FaYoutube,
  FaLinkedin
} from "react-icons/fa6";


export const Footer=()=>{

    return(
       
    
 <div className="footer-container">

      {/* Top Section */}
      <div className="footer-top">

        {/* Brand */}
        <div className="brand">
          <h1>Fragranzia</h1>
        </div>

        {/* Pages */}
        <div className="links">
          <h5>Pages</h5>
          <p>Home</p>
          <p>Products</p>
          <p>Gifting</p>
          <p>About</p>
          <p>Profile</p>
        </div>

        {/* Quick Links */}
        <div className="links">
          <h5>Quick Links</h5>
          <p>Privacy Policy</p>
          <p>Terms & Conditions</p>
          <p>FAQs</p>
          <p>Customer Service</p>
        </div>

        {/* Contact */}
        <div className="contact">
          <div className="contact-item">
            <FaEnvelope />
            <span>Fragranzia@gmail.com</span>
          </div>

          <div className="contact-item">
            <FaPhone />
            <span>+91 8793546732</span>
          </div>

          <h5 className="social-title">Social Media</h5>

          <div className="social-icons">
            <FaInstagram />
            <FaFacebook />
            <FaXTwitter />
            <FaYoutube />
            <FaLinkedin />
          </div>
        </div>

      </div>

      {/* Bottom Section */}
      <div className="footer-bottom">

        <div className="footer-left">
          <span>Web Accessibility</span>
          <span>Terms of Use</span>
          <span>Privacy Statement</span>
          <span>Contact Us</span>
        </div>

        <div className="footer-right">
          © 2024 Fragranzia Company. All rights reserved.
        </div>

      </div>

    </div>
    )
}
export default Footer;