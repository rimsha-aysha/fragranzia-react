const express = require("express");
console.log("Category Routes Loaded");

const router = express.Router();

const {
  addCategory,
  fetchCategory,
  deleteCategory,
} = require("../controllers/categoryController");

router.post("/", addCategory);

router.get("/", fetchCategory);

router.delete("/:id", deleteCategory)

module.exports = router;