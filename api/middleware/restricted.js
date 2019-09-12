const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../users/users-model.js');

module.exports = (req, res, next) => {
  const token =  req.headers.authorization;
  
  // see if there is a token
  if (token) { 
    //  rehash the header + payload + secret and see if it matches our verify signature
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      // check if it is valid, error if not
      if (err) {
        // error
        res.status(401).json({
          message: 'not verified'
        });
      } else { 
        // token is valid
        req.decodedToken = decodedToken;
        next();
      }
    });
  } else {
    res.status(400).json({
      message: 'no token provided'
    });
  }

};
