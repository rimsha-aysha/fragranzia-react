const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },

    quantity: Number,

    address: Object,

    paymentMethod: String,

    status: {
      type: String,
      default: "Pending",
    },
     returnReason: {
  type: String,
  default: "",
},

returnDescription: {
  type: String,
  default: "",
},
  },
  { timestamps: true }

);

module.exports = mongoose.model("Order", orderSchema);