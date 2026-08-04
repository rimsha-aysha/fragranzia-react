const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/verifyToken");

const {
  placeOrder,
  getAllOrders,
  updateOrderStatus,
  getMyOrders,
  cancelOrder,
} = require("../controllers/orderController");

// Place Order
router.post("/", verifyToken, placeOrder);

// Get All Orders
router.get("/", getAllOrders);

// Update Order Status
router.put("/:id", updateOrderStatus);

// Get Logged-in User Orders
router.get("/my-orders", verifyToken, getMyOrders);

router.put("/cancel/:id", verifyToken, cancelOrder);

module.exports = router;