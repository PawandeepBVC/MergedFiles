const express = require("express");
const router = express.Router();
// To limit the data that is sent we can use the express-validator dependency
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const User = require("../models/User");

//  @route          POST api/users
//  @description    Register a user
//  @access         Public
router.post(
  "/",
  [
    //  validation to make sure a name is entered
    check("name", "Please add your name").not().isEmpty(),
    //  validation to make sure an email is entered
    check("email", "Please include a valid email").isEmail(),
    //  validation to make sure the studentID is a minimum of 6 chars
    check(
      "studentID",
      "Please enter a studentID with 6 or more numbers"
    ).isLength({ min: 6 }),
    //  validation to make sure the password is a minimum of 6 chars
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // destructure req.body
    const { name, email, studentID, password } = req.body;

    try {
      // find user by email from monngoDB database
      let user = await User.findOne({ email });

      //check if user already exists
      if (user) {
        res.status(400).json({ msg: "User already exists" });
      }

      user = new User({
        name,
        email,
        studentID,
        password,
      });

      // create a salt to be ablet to encrypt the password
      const salt = await bcrypt.genSalt(10);

      // hash the password using the plaintext password and the salt
      user.password = await bcrypt.hash(password, salt);

      // save the user in the database;
      await user.save();

      // used to test with postman/mongoDB if user was saved in the db
      //res.send("User saved");

      // The payload is the object that will be sent in the json web token
      const payload = {
        user: {
          id: user.id,
        },
      };

      // To generate a jwt the token must be signed
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
