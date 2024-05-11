const express = require("express");
const router = express.Router();
const AsyncHandler = require("express-async-handler");
const {
  User,
  ValidateLoginUser,
  ValidateRegisterUser,
  ValidateUpdateUser,
} = require("../models/User");

/**
 * @desc  Register New User
 * @route /api/auth
 * @method POST
 * @access puplic
 */
router.post(
  "/register",
  AsyncHandler(async (req, res) => {
    const { error } = ValidateRegisterUser(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ message: "this user already registered" });
    }

    user = new User({
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      isAdmin: req.body.isAdmin,
    });

    const result = await user.save();
    res.status(201).json(result);
  })
);

module.exports = router;
