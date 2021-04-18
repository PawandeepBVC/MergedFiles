// This syntax is called common JS and it must be used to bring in modules with nod
// When we use react it use ES6 syntax can be used to import modules such as
// import ___ from ("./") etc
const express = require("express");
const connectDB = require("./config/db");

//  Initialize express into an variable called app
const app = express();

//  Connect Database
connectDB();

//  Init Middleware
//  Allows us to accept json body data
app.use(express.json({ extended: false }));

//Define Routes
app.use("/api/users", require("./routes/users"));
app.use("/api/authentication", require("./routes/authentication"));
app.use("/api/druglist", require("./routes/druglist"));
app.use("/api/audio", require("./routes/audio"));

app.use(express.static(__dirname + "/build"));

app.get("/", (req, res) => {
   res.render(__dirname + "/build/index.html");
});
console.log("hello");
//  process.env.PORT searches for an environment variable called PORT which will be used during production, port 5000 will be used during development
const PORT = process.env.PORT || 5000;

//  The app object has a method called listen that takes in a port argument which will be the port to listen on
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
