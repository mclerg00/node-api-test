const express = require("express");
const router = express.Router();
const authController = require("../../controllers/authController.js");

router.route("/register").post(authController.registerAccount);
router.route("/login").post(authController.loginAccount);
router.route("/delete").delete(authController.deleteAccount);

module.exports = router;
