const express = require("express")
const dotenv = require("dotenv").config()

const app = express();

const port =process.env.PORT || 8000

app.use("/api/contacts", require("./routes/contactRoutes"))


// app.get("/", (req, res) =>{
//     res.send(`Hey Shivam Your App is Running on port ${port}`)
//     // res.json({message : "This is your contacts GET API"})
// })

app.listen(port, ()=>{
    console.log(`Hey Shivam Your App is Running on port ${port}`)
})