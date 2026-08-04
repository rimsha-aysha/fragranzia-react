const express = require("express");
const cors = require("cors");
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const signUpRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");
const profileRoutes = require("./routes/profileRoutes");
const connectDb = require("./config/db");

// require("dotenv").config();
connectDb();

const app = express();
app.use(cors());
app.use(express.json());


app.use("/api/category",categoryRoutes);
app.use("/api/product",productRoutes);
app.use("/api/signUp",signUpRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/orders", orderRoutes);
app.use("/api/profile", profileRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));