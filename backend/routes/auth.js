const express = require("express");
const router = express.Router();

const {
  loginUser,
  forgotPassword
}= require('../controller/auth');

// Logging in users
router.post("/login", loginUser);

// Change password
router.post('/forgotpassword', forgotPassword)

module.exports = router;
