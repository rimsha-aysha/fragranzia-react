const Product = require("../models/Product");
const cloudinary = require("../config/cloudinary");

const addProduct = async (req, res) => {
  try {
    const {
      name,
      productPrice,
      salesPrice,
      productQuantity,
      category,
    } = req.body;

    let image = "";

    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "fragranzia/products",
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        );

        stream.end(req.file.buffer);
      });

      image = result.secure_url;
    }

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
    console.error("Cloudinary/Product Error:", error);

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
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    // Update normal product fields
    product.name = req.body.name;
    product.productPrice = req.body.productPrice;
    product.salesPrice = req.body.salesPrice;
    product.productQuantity = req.body.productQuantity;
    product.category = req.body.category;

    // Upload new image to Cloudinary only if a new image was selected
    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "fragranzia/products",
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        );

        stream.end(req.file.buffer);
      });

      product.image = result.secure_url;
    }

    await product.save();

    res.json({
      message: "Product updated successfully",
      product,
    });

  } catch (error) {
    console.error("Cloudinary Update Error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addProduct,
  fetchProducts,
  deleteProduct,
  getSingleProduct,
  getProductById,
  updateProduct,

};