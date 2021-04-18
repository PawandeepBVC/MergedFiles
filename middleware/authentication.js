//  middleware is a fucntion that has access to the req res object

//  This piece of middleware can be called whenever we want to verify that the user is allowed to access a protected route

// Include jsonwebtoken to verify the token
const jwt = require("jsonwebtoken");
//  Include config because we need access to the jwt secret variable
const config = require("config");

module.exports = function (req, res, next) {
  //  Get token from the header
  const token = req.header("x-auth-token");

  //  Check if there is a token in the header
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    //  Verify the token and pull out the payload
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    //  Pull out the payload so that there is access to it within the route
    req.user = decoded.user;

    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
