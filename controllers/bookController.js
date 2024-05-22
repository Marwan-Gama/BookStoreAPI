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
const GetAllBooks = AsyncHandler(async (req, res) => {
  const { minPrice, maxPrice } = req.query;
  let booksList;

  if (minPrice && maxPrice) {
    booksList = await Book.find({
      price: { $gte: minPrice, $lte: maxPrice },
    })
      .sort({ name: 1 })
      .populate("author", ["_id", "firstName", "LastName"]);
  } else {
    booksList = await Book.find()
      .sort({ name: 1 })
      .populate("author", ["_id", "firstName", "LastName"]);
  }

  res.status(200).json(booksList);
});

/**
 * @desc Get book by id
 * @route /api/books
 * @method GET
 * @access public
 */
const GetBookByID = AsyncHandler(async (req, res) => {
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
});

/**
 * @desc Add book
 * @route /api/books
 * @method POST
 * @access private (onle admin)
 */
const AddBook = AsyncHandler(async (req, res) => {
  const { error } = validateCreateBook(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
    price: req.body.price,
    cover: req.body.cover,
  });

  const result = await book.save();
  res.status(201).json(result);
});

/**
 * @desc Update book by id
 * @route /api/books
 * @method PUT
 * @access private (onle admin)
 */
const UpdateBookByID = AsyncHandler(async (req, res) => {
  const { error } = validateUpdateBook(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const book = await Book.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        price: req.body.price,
        cover: req.body.cover,
      },
    },
    { new: true }
  );

  if (book) {
    res.status(200).json({ message: "Book has ben updating" });
  } else {
    res.status(404).json({ message: "Book not find!" });
  }
});

/**
 * @desc Delete book by id
 * @route /api/books
 * @method DELETE
 * @access private (onle admin)
 */
const DeleteBookByID = AsyncHandler(async (req, res) => {
  const book = await Book.findByIdAndDelete(req.params.id);
  if (book) {
    res.status(200).json({ message: "Book has ben deleting" });
  } else {
    res.status(404).json({ message: "Book not find!" });
  }
});

module.exports = {
  GetAllBooks,
  GetBookByID,
  AddBook,
  UpdateBookByID,
  DeleteBookByID,
};
