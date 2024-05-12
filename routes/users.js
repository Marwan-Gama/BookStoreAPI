const express = require("express");
const router = express.Router();
const AsyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const verifyToken = require("../middlewares/verifyToken");
const { User, ValidateUpdateUser } = require("../models/User");

/**
 * @desc  Get all users
 * @route /api/users
 * @method PUT
 * @access private
 */
router.get(
  "/",
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
  verifyToken,
  AsyncHandler(async (req, res) => {
    if (req.user.id != req.params.id) {
      return res
        .status(403)
        .json({ message: "You are not allowed to this action" });
    }

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
