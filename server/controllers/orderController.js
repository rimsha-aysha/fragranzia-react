const Order = require("../models/Order");

// Place Order
const placeOrder = async (req, res) => {
  try {
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
    res.status(500).json(err);
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
// Update Order Status
const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status,
        returnReason: req.body.returnReason,
        returnDescription: req.body.returnDescription,
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