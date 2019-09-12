const express = require('express');

// Routers
const authRouter = require('./auth/auth-router.js');
const usersRouter = require('./users/users-router.js');

const server = express();

server.use(express.json());

// TODO: Add Testing for GET /
// Base Route
server.get('/', (req, res) => {
  res.send("<div align=\'center\'>" + 
    "<p>Hello World!</p>" + 
    "<p>This is the Starting Page.</p>" +
    "</div>");
});

// Routes
server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);

module.exports = server;
