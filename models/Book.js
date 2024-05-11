const Joi = require("joi");
const mongoose = require("mongoose");

// Book Schema
const BookSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      trim: true,
      minlenth: 3,
      maxlenth: 200,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "Author",
      trim: true,
      minlenth: 3,
      maxlenth: 200,
    },
  },
  { timestamps: true }
);

// Book model
const Book = mongoose.model("Book", BookSchema);

// Validate Create Book
function validateCreateBook(obj) {
  const schema = Joi.object({
    name: Joi.string()
      .min(3)
      .max(200)
      .required(),
    author: Joi.string()
      .min(3)
      .max(200)
      .required(),
  });
  return schema.validate(obj);
}

// Validate update Book
function validateUpdateBook(obj) {
  const schema = Joi.object({
    name: Joi.string()
      .min(3)
      .max(200),
    author: Joi.string()
      .min(3)
      .max(200),
  });
  return schema.validate(obj);
}

module.exports = {
  Book,
  validateUpdateBook,
  validateCreateBook,
};
