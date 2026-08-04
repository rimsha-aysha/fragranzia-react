import React from "react";
import "./About.css";


import { Link } from "react-router-dom";

import {
  FaCartShopping,
  FaInstagram,
  FaFacebook,
  FaYoutube,
  FaLinkedin,
  FaXTwitter,
} from "react-icons/fa6";

import { FaRegBell, FaRegUser, FaPhoneAlt } from "react-icons/fa";

import { IoSearch, IoMail } from "react-icons/io5";

// import image1 from "/assets/caucasian-woman-applying-perfume-her-neck 2.png";
// import image2 from "/caucasian-woman-applying-perfume-her-neck 2 (1).png";

const menuItems = [
  { name: "Home", path: "/" },
  { name: "Products", path: "/products" },
  { name: "Gifting", path: "/gifting" },
  { name: "About", path: "/about" },
];

const aboutParagraphs = [
  "At Fragranzia, we believe that a perfume is more than just a scent—it's a story, an art, and a science combined to create memories that linger. Our journey began with a vision to craft exquisite fragrances that capture the essence of individuality and elevate every moment into something timeless.",

  "Guided by passion and precision, we source the finest ingredients from around the world to create perfumes that resonate with authenticity and luxury. Each bottle is a masterpiece, meticulously crafted to deliver an unparalleled sensory experience.",

  "Our commitment goes beyond creating fragrances. We aim to inspire confidence, evoke emotions, and celebrate uniqueness through every drop we produce. Fragranzia isn’t just a brand—it’s a celebration of you, your style, and your moments.",

  "With a legacy built on quality, artistry, and innovation, we invite you to explore our collection and find a scent that speaks your story.",
];

const pages = [
  "Home",
  "Products",
  "Gifting",
  "About",
  "Profile",
];

const quickLinks = [
  "Privacy Policy",
  "Terms and Conditions",
  "FAQs",
  "Customer Service",
];

export const About = () => {
  return (
    <>

    

     <div>

       

        </div>

       

     
      {/* ABOUT SECTION */}

      <div className="full">

        <div className="left-side">

          <div className="cart">
            <h3>About Fragranzia</h3>
            <p>Home &gt; About</p>
          </div>

          <div className="paragraph">

            {aboutParagraphs.map((para, index) => (
              <p key={index} className="aboutpara">
                {para}
              </p>
            ))}

          </div>

        </div>

        {/* RIGHT IMAGES */}

        <div className="right-side">

          <img className="last-image1" src="caucasian-woman-applying-perfume-her-neck 2.png" alt="Perfume Model" />

          <img className="last-image2" src="caucasian-woman-applying-perfume-her-neck 2 (1).png" alt="Perfume Model" /> 

        </div>

      </div>

     
    </>
  );
};

export default About;