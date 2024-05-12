const express = require("express");
const router = express.Router();
const AsyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} = require("../middlewares/verifyToken");
const { User, ValidateUpdateUser } = require("../models/User");

/**
 * @desc  Get all users
 * @route /api/users
 * @method PUT
 * @access private (Only for Admin)
 */
router.get(
  "/",
  verifyTokenAndAdmin,
  AsyncHandler(async (req, res) => {
    const usersList = await User.find();
    res.status(200).json(usersList);
  })
);

/**
 * @desc  Update user by id
 * @route /api/users
 * @method PUT
 * @access private
 */
router.put(
  "/:id",
  verifyTokenAndAuthorization,
  AsyncHandler(async (req, res) => {
    const { error } = ValidateUpdateUser(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    console.log(req.headers);

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          email: req.body.email,
          password: req.body.password,
          username: req.body.username,
        },
      },
      { new: true }
    );

    res.status(200).json(user);
  })
);

module.exports = router;
