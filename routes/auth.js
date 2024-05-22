const express = require("express");
const router = express.Router();
const { RegisterNewUser, LoginUser } = require("../controllers/authController");

//  /api/auth/register
router.post("/register", RegisterNewUser);

//  /api/auth/login
router.post("/login", LoginUser);

module.exports = router;
