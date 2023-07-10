const asyncHandler = require("express-async-handler");
// @desc GET All Contacts
// @desc GET api/contacts
// @access public

const getContact = asyncHandler(async (req, res) => {
  res.send("This is your contacts GET API");
  //   res.status(301).json({ message: "This is your contacts GET API" });
});

// @desc POST All Contacts
// @desc POST api/contacts
// @access public
const createContact = asyncHandler(async (req, res) => {
  // console.log("WE GET From Body : " + req.body);

  const { name, course, clg } = req.body;
  if (!name || !course || !clg) {
    res.status(500);
    throw new Error("All The Fields are mandatory");
  }
  res.send("This is your contacts POST API");
  //   res.status(301).json({ message: "This is your contacts GET API" });
});

// @desc GET Single Contact
// @desc GET api/contacts
// @access public

const getSingleContact = asyncHandler(async (req, res) => {
  res.send(`This is your contacts GET API for ${req.params.id}`);
  //   res.status(301).json({ message: "This is your contacts GET API" });
});

// @desc PUT single Contact
// @desc PUT api/contacts
// @access public

const updateContact = asyncHandler(async (req, res) => {
  res.send(`This is your contacts Update API for ${req.params.id}`);
  //   res.status(301).json({ message: "This is your contacts GET API" });
});

// @desc DEL single Contact
// @desc DEL api/contacts
// @access public

const deleteContact = asyncHandler(async (req, res) => {
  res.send(`This is your contacts DELETE API for ${req.params.id}`);
  //   res.status(301).json({ message: "This is your contacts GET API" });
});

module.exports = {
  getContact,
  createContact,
  getSingleContact,
  updateContact,
  deleteContact,
};
