const express = require("express");
const router = express.Router();
const { verifyTokenAndAdmin } = require("../middlewares/verifyToken");
const {
  GetAllBooks,
  GetBookByID,
  AddBook,
  UpdateBookByID,
  DeleteBookByID,
} = require("../controllers/bookController");

//  /api/books/
router
  .route("/")
  .get(GetAllBooks)
  .post(verifyTokenAndAdmin, AddBook);

//  /api/books/:id
router
  .route("/:id")
  .put(verifyTokenAndAdmin, UpdateBookByID)
  .delete(verifyTokenAndAdmin, DeleteBookByID)
  .get(GetBookByID);

module.exports = router;
