const express = require("express");
const {
  registerUser,
  loginUser,
  currentUser,
  getUsers,
} = require("../controllers/userController");
const validateToken = require("../middleware/validateTokenHandler");

const router = express.Router();

router.get("/", validateToken, getUsers);

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/current", validateToken, currentUser);

module.exports = router;
