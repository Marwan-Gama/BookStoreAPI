const Joi = require("joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

// User Schema
const UserSchema = mongoose.Schema(
  {
    email: {
      type: String,
      require: true,
      trim: true,
      minlenth: 5,
      maxlenth: 100,
      unique: true,
    },
    username: {
      type: String,
      require: true,
      trim: true,
      minlenth: 2,
      maxlenth: 200,
    },
    password: {
      type: String,
      require: true,
      trim: true,
      minlenth: 6,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

UserSchema.methods.generateToken = function() {
  return jwt.sign(
    { id: this._id, isAdmin: this.isAdmin },
    process.env.JWT_SECRET_KEY
  );
};

// User model
const User = mongoose.model("User", UserSchema);

// Validate Register User
function ValidateRegisterUser(obj) {
  const schema = Joi.object({
    email: Joi.string()
      .trim()
      .min(5)
      .max(100)
      .required(),
    username: Joi.string()
      .trim()
      .min(2)
      .max(200)
      .required(),
    password: Joi.string()
      .trim()
      .min(6)
      .required(),
  });
  return schema.validate(obj);
}

// Validate Login User
function ValidateLoginUser(obj) {
  const schema = Joi.object({
    email: Joi.string()
      .trim()
      .min(5)
      .max(100)
      .required(),
    password: Joi.string()
      .trim()
      .min(6)
      .required(),
  });
  return schema.validate(obj);
}

// Validate Update User
function ValidateUpdateUser(obj) {
  const schema = Joi.object({
    email: Joi.string()
      .trim()
      .min(5)
      .max(100),
    username: Joi.string()
      .trim()
      .min(2)
      .max(200),
    password: Joi.string()
      .trim()
      .min(6),
  });
  return schema.validate(obj);
}

module.exports = {
  User,
  ValidateRegisterUser,
  ValidateLoginUser,
  ValidateUpdateUser,
};
