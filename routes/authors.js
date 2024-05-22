const express = require("express");
const router = express.Router();
const { verifyTokenAndAdmin } = require("../middlewares/verifyToken");
const {
  GetAllAuthors,
  AddAuthor,
  UpdateAutherByID,
  DeleteAutherByID,
  GetAuthorByID,
} = require("../controllers/authorsController");

// /api/authors/
router
  .route("/")
  .get(GetAllAuthors)
  .post(verifyTokenAndAdmin, AddAuthor);

// /api/authors/:id
router
  .route("/:id")
  .put(verifyTokenAndAdmin, UpdateAutherByID)
  .delete(verifyTokenAndAdmin, DeleteAutherByID)
  .get(GetAuthorByID);

module.exports = router;
