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
    const usersList = await User.find().select("-password");
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

/**
 * @desc  Get User By ID
 * @route /api/users
 * @method GET
 * @access private (only admin && user himself)
 */
router.get(
  "/:id",
  verifyTokenAndAuthorization,
  AsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select("-password");
    if (user) {
      res.status(200).json(user);
    } else {
      return res.status(404).json({ message: "User Not Found" });
    }
  })
);

/**
 * @desc  Delete User By ID
 * @route /api/users
 * @method DELETE
 * @access private (only admin && user himself)
 */
router.delete(
  "/:id",
  verifyTokenAndAuthorization,
  AsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "user has ben deleted successfuly" });
    } else {
      return res.status(404).json({ message: "User Not Found" });
    }
  })
);

module.exports = router;
