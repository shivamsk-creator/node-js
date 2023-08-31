const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactsModel");
const { Error } = require("mongoose");

// @desc GET All Contacts
// @desc GET api/contacts
// @access private
const getContact = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id });
  // res.send("This is your contacts GET API");
  res.status(200).json(contacts);
});

// @desc POST All Contacts
// @desc POST api/contacts
// @access private
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
    user_id: req.user.id,
  });
  // res.status(200).json(contact);
  res.status(200).json({ message: "Contact has been created", contact });
});

// @desc GET Single Contact
// @desc GET api/contacts
// @access private
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
// @access private

const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error("Contact Not Found");
  }

  if (contact.user_id.toString() != req.user.id) {
    res.status(403);
    throw new Error("You dont't have permission to update this contact");
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json({ message: "Contact has been Updated", updatedContact });
  //   res.status(301).json({ message: "This is your contacts GET API" });
});

// @desc DEL single Contact
// @desc DEL api/contacts
// @access private

const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  console.log("Id", contact._id);
  console.log("Id from params", req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact Not Found");
  }
  if (contact.user_id.toString() != req.user.id) {
    res.status(403);
    throw new Error("You dont't have permission to delete this contact");
  }
  const response = await Contact.deleteOne({ _id: req.params.id });
  res.status(200).json({ message: "Contact Deleted", response });
  //   res.status(301).json({ message: "This is your contacts GET API" });
});

module.exports = {
  getContact,
  createContact,
  getSingleContact,
  updateContact,
  deleteContact,
};
