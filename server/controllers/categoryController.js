const Category = require("../models/Category");

const addCategory = async (req, res) => {

  try {

    console.log(req.body);

    const category = await Category.create(req.body);

    res.status(201).json(category);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

const fetchCategory = async (req, res) => {

  try {

    const categories = await Category.find();

    res.status(200).json(categories);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteCategory = async (req, res) => {
  console.log("DELETE CATEGORY HIT");
  try {
    const { id } = req.params;

    await Category.findByIdAndDelete(id);

    res.status(200).json({
      message: "category Deleted Successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addCategory,
  fetchCategory,
  deleteCategory,
};