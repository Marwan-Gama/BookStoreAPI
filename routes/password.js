const express = require("express");
const { getForgotPasswordView } = require("../controllers/passwordControler");
const router = express.Router();

// /password/forget-password
router.route("/forgot-password").get(getForgotPasswordView);

module.exports = router;
