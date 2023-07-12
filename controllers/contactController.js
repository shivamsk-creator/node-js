const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactsModel");
const { Error } = require("mongoose");

// @desc GET All Contacts
// @desc GET api/contacts
// @access public
const getContact = asyncHandler(async (req, res) => {
  const contacts = await Contact.find();
  // res.send("This is your contacts GET API");
  res.status(200).json(contacts);
});

// @desc POST All Contacts
// @desc POST api/contacts
// @access public
const createContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(500);
    throw new Error("All The Fields are mandatory");
  }

  const contact = await Contact.create({
    name,
    email,
    phone,
  });
  res.status(200).json(contact);
  //   res.status(301).json({ message: "This is your contacts GET API" });
});

// @desc GET Single Contact
// @desc GET api/contacts
// @access public
const getSingleContact = asyncHandler(async (req, res) => {
  console.log("Params", req.params.id);
  const contact = await Contact.findById(req.params.id);
  console.log("Contact is", contact);
  if (!contact) {
    console.log("There's an error");
    res.status(404);
    throw new Error("Contact Not Found");
  }

  res.status(200).json(contact);
});

// @desc PUT single Contact
// @desc PUT api/contacts
// @access public

const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error("Contact Not Found");
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedContact);
  //   res.status(301).json({ message: "This is your contacts GET API" });
});

// @desc DEL single Contact
// @desc DEL api/contacts
// @access public

const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  console.log(contact);
  if (!contact) {
    res.status(404);
    throw new Error("Contact Not Found");
  }
  Contact.findOneAndDelete({ _id: contact._id });
  res.status(200).send("Contact Deleted");
  //   res.status(301).json({ message: "This is your contacts GET API" });
});

module.exports = {
  getContact,
  createContact,
  getSingleContact,
  updateContact,
  deleteContact,
};
