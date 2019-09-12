const router = require('express').Router();

const Users = require('./users-model.js');
const restricted = require('../middleware/restricted.js');

router.get('/', restricted, (req, res) => {

  // If the user is an admin they can see all users, otherwise they can only see their own info

  const { sub, role } = req.decodedToken;

  if (role === 'admin') {
    Users.find()
      .then(users => {
        res.json(users);
      })
      .catch(err => res.send(err));
  } else {
    Users.findById(sub)
      .then(user => {
        res.json(user);
      })
      .catch(err => res.send(err));
  }
});

module.exports = router;