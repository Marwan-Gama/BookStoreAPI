const express = require("express");
const router = express.Router();
const AsyncHandler = require("express-async-handler");
const {
  Book,
  validateUpdateBook,
  validateCreateBook,
} = require("../models/Book");

/**
 * @desc Get all books
 * @route /api/books
 * @method GET
 * @access public
 */
router.get(
  "/",
  AsyncHandler(async (req, res) => {
    const booksList = await Book.find()
      .sort({ name: 1 })
      .populate("author", ["_id", "firstName", "LastName"]);
    res.status(200).json(booksList);
  })
);

/**
 * @desc Add book
 * @route /api/books
 * @method POST
 * @access public
 */
router.post(
  "/",
  AsyncHandler(async (req, res) => {
    const { error } = validateCreateBook(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const book = new Book({
      name: req.body.name,
      author: req.body.author,
    });

    const result = await book.save();
    res.status(201).json(result);
  })
);

/**
 * @desc Update book by id
 * @route /api/books
 * @method PUT
 * @access public
 */
router.put(
  "/:id",
  AsyncHandler(async (req, res) => {
    const { error } = validateUpdateBook(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const book = await Book.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          name: req.body.name,
          author: req.body.author,
        },
      },
      { new: true }
    );

    if (book) {
      res.status(200).json({ message: "Book has ben updating" });
    } else {
      res.status(404).json({ message: "Book not find!" });
    }
  })
);

/**
 * @desc Delete book by id
 * @route /api/books
 * @method DELETE
 * @access public
 */
router.delete(
  "/:id",
  AsyncHandler(async (req, res) => {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (book) {
      res.status(200).json({ message: "Book has ben deleting" });
    } else {
      res.status(404).json({ message: "Book not find!" });
    }
  })
);

/**
 * @desc Get book by id
 * @route /api/books
 * @method GET
 * @access public
 */
router.get(
  "/:id",
  AsyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id).populate("author", [
      "_id",
      "firstName",
      "LastName",
    ]);
    if (book) {
      res.status(200).json(book);
    } else {
      res
        .status(404)
        .json({ message: `Book With ID ${req.params.id} Not Found!` });
    }
  })
);

module.exports = router;
