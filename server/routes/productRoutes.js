const express = require("express");
const upload = require("../middleware/upload");

const router = express.Router();

const {
  addProduct,
  fetchProducts,
  deleteProduct,
  getSingleProduct,
  updateProduct,
} = require("../controllers/productController");

// Add Product
router.post("/", upload.single("image"), addProduct);

// Get All Products
router.get("/", fetchProducts);

// Get Single Product
router.get("/:id", getSingleProduct);

// Update Product
router.put("/:id", upload.single("image"), updateProduct);

// Delete Product
router.delete("/:id", deleteProduct);

module.exports = router;