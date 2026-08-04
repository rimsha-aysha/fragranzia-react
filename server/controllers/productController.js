const Product = require("../models/Product");

// ADD PRODUCT
const addProduct = async (req, res) => {
  try {
   const {
  name,
  productPrice,
  salesPrice,
  productQuantity,
  category,
} = req.body;

const image = req.file ? req.file.filename : "";

const product = new Product({
  name,
  productPrice,
  salesPrice,
  productQuantity,
  category,
  image,
});

    await product.save();

    res.status(201).json({
      message: "Product Added Successfully",
      product,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// FETCH PRODUCTS
const fetchProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json(products);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE PRODUCT
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    await Product.findByIdAndDelete(id);

    res.status(200).json({
      message: "Product Deleted Successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


const getSingleProduct = async (req, res) => {
  console.log("ID RECEIVED:", req.params.id);

  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};
const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json(product);
};

const updateProduct = async (req, res) => {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(product);
};

module.exports = {
  addProduct,
  fetchProducts,
  deleteProduct,
  getSingleProduct,
  getProductById,
  updateProduct,

};