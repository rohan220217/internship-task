//Auth middleware to protect routes
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/is_admin");

const express = require("express");
const router = express.Router();

const {
  createUser,
  updateUser,
  getAllUsers,
  getUserDetails,
  deleteUser
} = require("../controller/user");

// Creating new users
router.post("/signup", createUser);

//Update user data (only for admin)
router.put("/update/:_id", [auth, isAdmin], updateUser);

//get all users data (only for admin)
router.get("/data", [auth, isAdmin], getAllUsers);

//get user data (only for admin)
router.get("/data/:_id", [auth, isAdmin], getUserDetails);

//delete user data (only for admin)
router.delete("/data/:_id", [auth, isAdmin], deleteUser);

module.exports = router;
