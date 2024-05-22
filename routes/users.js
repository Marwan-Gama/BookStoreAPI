const express = require("express");
const router = express.Router();
const {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} = require("../middlewares/verifyToken");
const {
  GetAllUsers,
  UpdateUserByID,
  GetUserByID,
  DeleteUserByID,
} = require("../controllers/usersController");

// /api/users/
router.route("/").get(verifyTokenAndAdmin, GetAllUsers);

// /api/users/:id
router
  .route("/:id")
  .put(verifyTokenAndAuthorization, UpdateUserByID)
  .get(verifyTokenAndAuthorization, GetUserByID)
  .delete(verifyTokenAndAuthorization, DeleteUserByID);

module.exports = router;
