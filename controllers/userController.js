const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// @desc GET All Users
// @desc GET api/users
// @access public
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  // res.send("This is your contacts GET API");
  res.status(200).json(users);
});

// @desc Register a user
// @desc POST api/users/register
// @access public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User Already registered");
  }

  // Hashed Password
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("HAshed Password", hashedPassword);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  console.log("user created", user);

  if (user) {
    res.status(201);
    res.json({
      _id: user.id,
      email: user.email,
    });
  } else {
    throw new Error("User data not valid");
  }
  res.json({ message: "Register the user" });
});

// @desc login a user
// @desc POST api/users/login
// @access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const user = await User.findOne({ email });
  //   Compare password with hashed password
  if (user && (await bcrypt.compare(password, user.password))) {
    const accesstoken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );
    res.status(200).json({ accesstoken });
  } else {
    res.status(401);
    throw new Error("Email or password invalid");
  }

  res.json({ message: "login the user" });
});

// @desc get current user information
// @desc GET api/users/current
// @access private
const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

module.exports = { registerUser, loginUser, currentUser, getUsers };
