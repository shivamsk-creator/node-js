const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.CONNECTION_STRING);
    // const connect = await mongoose.connect(
    //   "mongodb+srv://shivamsk:charlie7860@contacts.ptztejs.mongodb.net/?retryWrites=true&w=majority"
    // );
    console.log(
      "Database Connection Established",
      connect.connection.host,
      connect.connection.name
    );
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDb;
