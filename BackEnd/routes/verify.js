// Name: Aaryan, Kevin, Matt, and Camryn 
// modified version of verify file from sample code given.
var jwt = require("jsonwebtoken");
var config = require("../config.js"); 
var User = require("../models/users"); 

// Function to generate a token
exports.getToken = function (user) {
  return jwt.sign(
    {
      id: user._id,
      username: user.username,
      role: user.role,
    },
    config.database.secretKey,
    {
      expiresIn: 3600, // Expires in 1 hour
    }
  );
};

// Middleware to verify that the token is valid
exports.verifyOrdinaryUser = function (req, res, next) {
  var token =
    req.body.token || req.query.token || req.headers["x-access-token"];
  if (token) {
    jwt.verify(token, config.database.secretKey, function (err, decoded) {
      if (err) {
        var err = new Error("You are not authenticated!");
        err.status = 401;
        return next(err);
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    var err = new Error("No token provided!");
    err.status = 403;
    return next(err);
  }
};

// Middleware to verify that the user is an admin
exports.verifyAdmin = function (req, res, next) {
  if (req.decoded && req.decoded.role === "admin") {
    next();
  } else {
    var err = new Error("You are not authorized!");
    err.status = 403;
    return next(err);
  }
};
