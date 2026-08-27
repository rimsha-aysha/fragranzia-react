const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    productPrice: {
      type: Number,
      required: true,
    },

    salesPrice: {
      type: Number,
    },

    productQuantity: {
      type: Number,
      required: true,
    },

    category: {
      type: String,
    },

    image: {
      type: String,
    },

    // Used for Popularity sorting
    sales: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);