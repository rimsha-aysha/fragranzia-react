import React, { useState, useEffect } from "react";
import "./Main.css";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import Swal from "sweetalert2";

export const Main = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/product"
      );

      console.log("API Response:", response.data);

      setProducts(response.data);
    } catch (error) {
      console.log("Error:", error);
    }
  };
  console.log("Products state:", products);


  const addToCart = async (product) => {

    const token = localStorage.getItem("token");

    if (!token) {
      await Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please login to continue.",
      });
      navigate("/login");
      return;
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push(product);

    localStorage.setItem("cart", JSON.stringify(cart));

    await Swal.fire({
      icon: "success",
      title: "Success",
      text: "Product added to cart successfully!",
      timer: 1500,
      showConfirmButton: false,
    });
    navigate("/cart");
  };

  const addToWishlist = async (product) => {

    const token = localStorage.getItem("token");

    if (!token) {
      await Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please login to add products to your wishlist.",
        confirmButtonText: "OK",
      });
      navigate("/login");
      return;
    }

    const alreadyExists = wishlist.find(
      (item) => item._id === product._id
    );
    if (alreadyExists) {
      await Swal.fire({
        icon: "info",
        title: "Already Added",
        text: "This product is already in your wishlist.",
        confirmButtonText: "OK",
      });
      return;
    }

    const updatedWishlist = [...wishlist, product];

    setWishlist(updatedWishlist);

    localStorage.setItem(
      "wishlist",
      JSON.stringify(updatedWishlist)
    );

    await Swal.fire({
      icon: "success",
      title: "Added!",
      text: "Product added to your wishlist.",
      timer: 1500,
      showConfirmButton: false,
    });

  };


  const [wishlist, setWishlist] = useState(
    JSON.parse(localStorage.getItem("wishlist")) || []
  );

  const categories = [
    {
      name: "Eau De Parfum",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRinOZiyg8zm2_cEnYpYQMkFs424vkBt7j_A-1GjQZORXeDmx-nwbDMa3WhteJ-CpguNls&usqp=CAU"
    },
    {
      name: "Concentrated",
      image: "https://www.chanel.com/images//t_one//w_0.51,h_0.51,c_crop/q_auto:good,f_autoplus,fl_lossy,dpr_1.1/w_1020/coco-mademoiselle-eau-de-parfum-intense-spray-6-8fl-oz--packshot-default-116670-9564861431838.jpg"
    },
    {
      name: "Deodorants",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKe7WGH8zewfiuS0Bp4b9wxZGxBIW6bnm-nSYVKFe5h35jTsBI09ocEFbJ84jXflD7ePs&usqp=CAU"
    },
    {
      name: "Body Mist",
      image: "https://media6.ppl-media.com/tr:h-750,w-750,c-at_max,dpr-2/static/img/product/206377/guess-seductive-woman-eau-de-toilette-75ml_3_display_1599110410_4bcf9f4b.jpg"
    },
    {
      name: "Combo",
      image: "https://www.scentstore.com/wp-content/uploads/elementor/thumbs/YSL_Libre_Intense_90-ovlu40u5xmn1vhiga8wfv6mrt6ea4qnx1l99ye2rg0.jpg"
    }
  ];




  return (

    <div className="main-full body">

      <div className="first">
        ENJOY FESTIVE DISCOUNT! FREE SHIPPING ABOVE 999!
      </div>



      <div className="second">
        <h4>Discover perfumes that <br /> celebrate individuality</h4>
        <p>Every moment with an unforgettable <br />essence.</p>
        <button> Shop now</button>

        <div className="background-removed">
          <img className="perfumee1" src="/2bcb4f47-c0e3-458f-8ace-4ad9ddaccd55 2.png" alt="" />
          <img className="perfumee2" src="2bcb4f47-c0e3-458f-8ace-4ad9ddaccd55 1.png" alt="" />

        </div>

      </div>



      <div className="third">
        <div className="third-in">
          <h4>Unlock Exclusive <br />Offers</h4>
          <p>Discover special deals <br /> tailored just for you!</p>
          <img className="perfume3" src="/perfume3-removebg-preview.png" alt="" />
        </div>
        <div className="third-in">
          <h4 style={{ marginleft: "-7px" }}>Gift a Scents to your loved one.</h4>
          <p style={{ marginleft: "49px" }}>Make your love more beautiful</p>
          <img className="perfume4" src="/perfume4-removebg-preview.png" alt="" />
        </div>
        <div className="third-in">
          <h4>Luxury Scents <br />Starting at $4,000</h4>
          <img className="perfume5" src="/perfume5-removebg-preview.png" alt="" />
          <img className="Group" src="/Group 1.png" alt="" />
        </div>

      </div>



      <div className="four">
        <div className="four-in">
          <div>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css" integrity="sha512-2SwdPD6INVrV/lHTZbO2nodKhrnDdJK9/kg2XD1r9uGqPo1cUbujc+IYdlYdEErWNu69gVcYgdxlmVmzTWnetw==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
            <i className="fa-regular fa-truck fa-2xl" style={{ color: "#20488d" }}></i>
          </div>
          <div>
            <h5>Fast & Reliable Delivery</h5>
            <p>Get your order's delivered on time,<br />every time.</p>
          </div>
        </div>

        <div className="four-in">
          <div>
            <i className="fa-solid fa-shield fa-2xl" style={{ color: "#20488d" }}></i>
          </div>
          <div>
            <h5>Secure Payments</h5>
            <p>Shop with confidence using our <br /> encrypted payment gateways.</p>
          </div>

        </div>

        <div className="four-in">
          <div>
            <i className="fa-solid fa-location-dot fa-2xl" style={{ color: "#20488d" }}></i>
          </div>
          <div>
            <h5>24/7 Customer Support</h5>
            <p>We're here to assist you anytime,<br />anywhere.</p>
          </div>

        </div>
      </div>


      <div className="six">
        {products.map((item, index) => (
         
          <div className="six-in" key={item._id || index}>

            <div className={index % 2 === 0 ? "div1" : "div"}>
               
              <img
  className="image"
  src={item.image}
  alt={item.name}
/>
              {wishlist.some((wish) => wish._id === item._id) ? (
                <FaHeart className="heart-icon filled" />
              ) : (
                <FaRegHeart
                  className="heart-icon"
                  onClick={() => addToWishlist(item)}
                />
              )}

            </div>

            <p>{item.name}</p>

            <h3>
              Rs {item.productPrice}{" "}
              {item.oldPrice && (
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: "100",
                    textDecoration: "line-through",
                    marginLeft: "6px"
                  }}
                >
                  Rs {item.oldPrice}
                </span>
              )}
            </h3>

            <button onClick={() => addToCart(item)}>Add to Cart</button>
          </div>
))}
      </div>


      <div className="seven">
        <h3>"It's an art,A craft,A science,At Fragranzia,we're <br /> in the business of creating memories that last forever <br /> through our fragrances."</h3>
      </div>

      <div className="long_img">
        <div><img className="long" src="/front-view-expensive-perfume-light-table-scent 1.png" alt="" />
          <h1>New Arriavals</h1>
        </div>
        <div>
          <img className="long" src="/caucasian-woman-applying-perfume-her-neck 1.png" alt="" />
          <h1>Limited Edition</h1>
        </div>
        <div>
          <img className="long" src="/small-perfume-bottle-with-black-lid-decorated-with-cinnamon-stick 1.png" alt="" />
          <h1>Best Sellers</h1>
        </div>
      </div>

      <div className="five-1">
        <div>Explore Categories</div>
        <div className="see"><u>see all</u></div>
      </div>


      <div className="eight">
        {categories.map((item, index) => (
          <div key={index}>
            <div className="imgg">
              <img className="image2" src={item.image} alt={item.name} />
            </div>
            <h5>{item.name}</h5>
          </div>
        ))}
      </div>


      <div className="six">
        {products.map((item, index) => (
          <div className="six-in" key={item._id || index}>

            <div className={index % 2 === 0 ? "div1" : "div"}>
              <img
                className="image"
                src={item.image}
                alt={item.name}
              />
              {wishlist.some((wish) => wish._id === item._id) ? (
                <FaHeart className="heart-icon filled" />
              ) : (
                <FaRegHeart
                  className="heart-icon"
                  onClick={() => addToWishlist(item)}
                />
              )}

            </div>

            <p>{item.name}</p>

            <h3>
              Rs {item.productPrice}{" "}
              {item.oldPrice && (
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: "100",
                    textDecoration: "line-through",
                    marginLeft: "6px"
                  }}
                >
                  Rs {item.oldPrice}
                </span>
              )}
            </h3>

            <button onClick={() => addToCart(item)}>Add to Cart</button>
          </div>
        ))}
      </div>

      <div className="nine">
        <h4>Elegance in every bottle</h4>
        <p>Discover timeless fragnances crafted for every moment.</p>
        <button> Shop now</button>
        <img className="perfume6" src="/perfume6.avif" alt="" />
        <img className="perfume7" src="/perfume6.avif" alt="" />

      </div>


    </div>
  )
}
export default Main;