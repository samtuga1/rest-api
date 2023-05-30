const express = require("express");

const { body } = require("express-validator");

const router = express.Router();

router.put("/signup", [
  body("email").trim().isLength({ min: 5 }).contains("@"),
  body("password").trim().isLength({ min: 6 }),
  body("name").trim().isLength({ min: 5 }),
]);

module.exports = router;
