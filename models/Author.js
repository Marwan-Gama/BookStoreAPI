const Joi = require("joi");
const mongoose = require("mongoose");

const AuthorSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      require: true,
      trim: true,
      minlenth: 3,
      maxlenth: 200,
    },
    LastName: {
      type: String,
      require: true,
      trim: true,
      minlenth: 3,
      maxlenth: 200,
    },
  },
  { timestamps: true }
);

const Author = mongoose.model("Author", AuthorSchema);

// Validate Create author
function validateCreateAuthor(obj) {
  const schema = Joi.object({
    firstName: Joi.string()
      .min(3)
      .max(200)
      .required(),
    LastName: Joi.string()
      .min(3)
      .max(200)
      .required(),
  });
  return schema.validate(obj);
}

// Validate update author
function validateUpdateAuthor(obj) {
  const schema = Joi.object({
    firstName: Joi.string()
      .min(3)
      .max(200),
    LastName: Joi.string()
      .min(3)
      .max(200),
  });
  return schema.validate(obj);
}

module.exports = {
  Author,
  validateCreateAuthor,
  validateUpdateAuthor,
};
