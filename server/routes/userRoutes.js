const express = require("express");

const router = express.Router();

const {
  signUp,
  getUsers,
  login,
  updateProfile,
} = require("../controllers/userController");


// signup
router.post("/", signUp);


// GET
router.get("/", getUsers);

//login
router.post("/login", login);



module.exports = router;