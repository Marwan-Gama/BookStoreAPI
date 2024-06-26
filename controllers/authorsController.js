const asyncHandler = require("express-async-handler");
const {
  Author,
  validateCreateAuthor,
  validateUpdateAuthor,
} = require("../models/Author");

/**
 * @desc Get all authors
 * @route /api/authors
 * @method GET
 * @access public
 */
const GetAllAuthors = asyncHandler(async (req, res) => {
  const { pageNumber, authorPerPage } = req.query;
  let authorsList;
  if (pageNumber && authorPerPage) {
    authorsList = await Author.find()
      .sort({ firstName: 1 })
      .skip((pageNumber - 1) * authorPerPage)
      .limit(authorPerPage);
  } else {
    authorsList = await Author.find().sort({ firstName: 1 });
  }
  res.status(200).json(authorsList);
});

/**
 * @desc Add author
 * @route /api/authors
 * @method POST
 * @access private (onle admin)
 */
const AddAuthor = asyncHandler(async (req, res) => {
  const { error } = validateCreateAuthor(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const author = new Author({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    nationality: req.body.nationality,
    image: req.body.image,
  });

  const result = await author.save();
  res.status(201).json(result);
});

/**
 * @desc Update author by id
 * @route /api/authors
 * @method PUT
 * @access private (onle admin)
 */
const UpdateAutherByID = asyncHandler(async (req, res) => {
  const { error } = validateUpdateAuthor(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const author = await Author.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        nationality: req.body.nationality,
        image: req.body.image,
      },
    },
    { new: true }
  );

  res.status(200).json(author);
});

/**
 * @desc Delete author by id
 * @route /api/authors
 * @method DELETE
 * @access private (onle admin)
 */
const DeleteAutherByID = asyncHandler(async (req, res) => {
  const author = await Author.findByIdAndDelete(req.params.id);
  if (author) {
    res.status(200).json({ message: "Author has ben deleting" });
  } else {
    res.status(404).json({ message: "Author not find!" });
  }
});

/**
 * @desc Get author by id
 * @route /api/authors
 * @method GET
 * @access public
 */
const GetAuthorByID = asyncHandler(async (req, res) => {
  const author = await Author.findById(req.params.id);
  if (author) {
    res.status(200).json(author);
  } else {
    res
      .status(404)
      .json({ message: `Author With ID ${req.params.id} Not Found!` });
  }
});

module.exports = {
  GetAllAuthors,
  AddAuthor,
  UpdateAutherByID,
  DeleteAutherByID,
  GetAuthorByID,
};
