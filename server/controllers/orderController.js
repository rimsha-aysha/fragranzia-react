const Order = require("../models/Order");
const Product = require("../models/Product");

// Place Order
const placeOrder = async (req, res) => {
  try {
    const product = await Product.findById(req.body.productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    // Check stock
    if (product.productQuantity < req.body.quantity) {
      return res.status(400).json({
        message: "Not enough stock available",
      });
    }

    // Reduce stock
    product.productQuantity -= req.body.quantity;
    await product.save();

    // Create order
    const order = new Order({
      user: req.user._id,
      product: req.body.productId,
      quantity: req.body.quantity,
      address: req.body.address,
      paymentMethod: req.body.paymentMethod,
    });

    await order.save();

    res.status(201).json(order);

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: err.message,
    });
  }
};


// Get All Orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user")
      .populate("product");

    const validOrders = orders.filter(order => order.product);

    res.json(validOrders);

  } catch (err) {
    res.status(500).json(err);
  }
};


// Update Order Status
const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    // Save previous status
    const previousStatus = order.status;

    // Increase stock only once when changing to Returned
    // Do NOT increase stock if reason is Damaged Product
    if (
      previousStatus !== "Returned" &&
      req.body.status === "Returned" &&
      req.body.returnReason !== "Damaged Product"
    ) {
      const product = await Product.findById(order.product);

      if (product) {
        product.productQuantity += order.quantity;
        await product.save();
      }
    }

    // Update order
    order.status = req.body.status;
    order.returnReason = req.body.returnReason;
    order.returnDescription = req.body.returnDescription;

    await order.save();

    res.json(order);

  } catch (err) {
    res.status(500).json(err);
  }
};


// Get Logged-in User Orders
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user._id,
    }).populate("product");

    res.status(200).json(orders);

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: err.message,
    });
  }
};


// Cancel Order
const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {
        status: "Cancelled",
      },
      {
        new: true,
      }
    );

    res.json(order);

  } catch (err) {
    res.status(500).json(err);
  }
};


module.exports = {
  placeOrder,
  getAllOrders,
  updateOrderStatus,
  getMyOrders,
  cancelOrder,
};