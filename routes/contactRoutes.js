const express = require("express");
const router = express.Router();


router.route("/api/contacts", (req, res) =>{
    // res.send("This is your contacts GET API")
    res.status(301).json({message : "This is your contacts GET API"})
})

module.exports = router;