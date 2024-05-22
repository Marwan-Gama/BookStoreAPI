const Joi = require("joi");
const mongoose = require("mongoose");

// Author Schema
const AuthorSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      require: true,
      trim: true,
      minlenth: 3,
      maxlenth: 200,
    },
    lastName: {
      type: String,
      require: true,
      trim: true,
      minlenth: 3,
      maxlenth: 200,
    },
    nationality: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    image: {
      type: String,
      default: "default-avatar.png",
    },
  },
  { timestamps: true }
);

// Author model
const Author = mongoose.model("Author", AuthorSchema);

// Validate Create author
function validateCreateAuthor(obj) {
  const schema = Joi.object({
    firstName: Joi.string()
      .min(3)
      .max(200)
      .required(),
    lastName: Joi.string()
      .min(3)
      .max(200)
      .required(),
    nationality: Joi.string()
      .trim()
      .min(2)
      .max(100)
      .required(),
    image: Joi.string(),
  });
  return schema.validate(obj);
}

// Validate update author
function validateUpdateAuthor(obj) {
  const schema = Joi.object({
    firstName: Joi.string()
      .min(3)
      .max(200),
    lastName: Joi.string()
      .min(3)
      .max(200),
    nationality: Joi.string()
      .trim()
      .min(2)
      .max(100),
    image: Joi.string(),
  });
  return schema.validate(obj);
}

module.exports = {
  Author,
  validateCreateAuthor,
  validateUpdateAuthor,
};
