import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../axios";
import { useNavigate } from "react-router-dom";
import "./Single.css";
import { FaStar, FaPlus, FaMinus, FaTag } from "react-icons/fa";
import Swal from "sweetalert2";

const getImageSrc = (image) => {
  if (!image) return "/perfume3-removebg-preview.png";
  if (typeof image === "string") {
    if (image.startsWith("http://") || image.startsWith("https://") || image.startsWith("/")) {
      return image;
    }
return `https://fragranzia-react.onrender.com/uploads/${image}`;  }
  return "/perfume3-removebg-preview.png";
};

export const Single = () => {

const navigate = useNavigate();
    const {id} = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
  const fetchProduct = async () => {
    try {
      const res = await axios.get(
        `/api/product/${id}`
      );
      console.log(res.data);

      setProduct(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  fetchProduct();
}, [id]);

if (!product) {
  return <h2>Loading...</h2>;
}

const addToCart = (product) => {
 
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.push(product);

  localStorage.setItem("cart", JSON.stringify(cart));

  Swal.fire({
  icon: "success",
  title: "Added!",
  text: "Product added to cart successfully.",
  timer: 1500,
  showConfirmButton: false,
});

  navigate("/cart");
};


const purchaseNow = () => {
  navigate("/checkout", {
    state: {
      products: [
        {
          ...product,
          quantity: 1,
        },
      ],
    },
  });
};


    return(
        <div>
         
 

    <div className="main">
      

      <div>
        <div className="left">

          <div className="one">
            Home &gt; Products &gt; Kyros Eua De Parfum 100ml For Men
          </div>

          <div className="left-in">

            <div>
              <div className="image-divv">
                <img 
                  className="img1" 
                  src={getImageSrc(product.image)}
                  alt={product.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/perfume3-removebg-preview.png";
                  }}
                /> 
              </div>

              <div className="image-div">
                <img 
                  className="img1" 
                  src={getImageSrc(product.image)}
                  alt={product.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/perfume3-removebg-preview.png";
                  }}
                /> 
              </div>

              <div className="image-div">
                <img 
                  className="img1" 
                  src={getImageSrc(product.image)}
                  alt={product.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/perfume3-removebg-preview.png";
                  }}
                />            
              </div> 
            </div>

            <div>
              <img
                className="big_img"
                src={getImageSrc(product.image)}
                alt={product.name}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/perfume3-removebg-preview.png";
                }}
              />
            </div>

          </div>
        </div>

        <div className="buttons">
          <button onClick={purchaseNow} className="btnn1">Purchase Now</button><br />
          <button onClick={()=>addToCart(product)} className="btnn2">Add to cart</button>
        </div>
      </div>

      {/* RIGHT */}
      <div className="right">

        <div>
          <h4>{product.name}</h4>
          <h6>Autograph</h6>

          <div className="rate">
            <div className="inside">
              <h6>5</h6>
              <FaStar style={{ color: "#28d244" }} />
            </div>

            <div>
              <h6>1,000 Ratings</h6>
            </div>
          </div>

          <h6 style={{ color: "rgb(218, 53, 53)" }}>
            Hurry only few stocks left!
          </h6>

          <div className="rupees">
            <h1>{product.productPrice}</h1>
            <h6 style={{ textDecoration: "line-through", fontWeight: 100 }}>
              Rs 1000
            </h6>
            <h5 style={{ color: "#28d244" }}>61% Off</h5>
          </div>

          <div className="box">
            <FaPlus size={12} />
            <h4>1</h4>
            <FaMinus size={12} />
          </div>

          <h4 className="delivery">Delivery</h4>
          <p>
            Delivery by 28 Aug, Wednesday | Free <br />
            if ordered before 9:24 PM
          </p>

          <h4>Description</h4>
          <p className="para">
           {product.description}
          </p>

          <h4 style={{ marginTop: "30px" }}>Available Offers</h4>

          <div style={{ marginTop: "40px" }}>
            <p>
              <FaTag style={{ color: "#1cca30" }} /> Buy two of the same product
              and get a third one free
            </p>
          </div>

          <div>
            <p>
              <FaTag style={{ color: "#1cca30" }} /> Enjoy Free standard shipping
              on orders exceeding 1399.
            </p>
          </div>

          <div>
            <p>
              <FaTag style={{ color: "#1cca30" }} /> Get 15% off your first order
            </p>
          </div>

          <div>
            <p>
              <FaTag style={{ color: "#1cca30" }} /> Receive a free tote case
              with purchase of any perfume over 2,000
            </p>
          </div>

        </div>

      </div>

    </div>

     <div className="five">
        <div>
          Suggested for you{" "}
          <span style={{ color: "white" }}>khsdckas</span>
        </div>

        <div>
          <img
            style={{ height: "40px", width: "90px" }}
            src="Frame 34.png"
            alt=""
          />
        </div>
      </div>

      {/* Products */}
      {/* <div className="six">
        {data.map((item, index) => (
          <div className="six-in" key={item.id}>

            <div className={index % 2 === 0 ? "div" : "div1"}>
              <img className="image" src={item.img} alt="" />
            </div>

            <p>Autograph eau de parfum 100 ml for men</p>

            <h3>
              RS {item.price}{" "}
              <span
                style={{
                  fontSize: "15px",
                  fontWeight: 100,
                  textDecoration: "line-through"
                }}
              >
                Rs{item.oldPrice}
              </span>
            </h3>

            <button>Add to Cart</button>

          </div> 
        ))}
      </div>*/}

    

        </div>
    )
}
export default Single;