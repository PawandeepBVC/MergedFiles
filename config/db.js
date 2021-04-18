// Include mongoose for interaction with database
const mongoose = require("mongoose");
// Include config so we have access to our global variables
const config = require("config");
// Initialize a variable db to the mongoURI by getting the mongoURI global variable from default.json
const db = config.get("mongoURI");

//  Keep in mind that mongoose returns promises
const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });

    console.log("MongoDB Connected");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
