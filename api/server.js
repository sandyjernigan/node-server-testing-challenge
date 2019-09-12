const express = require('express');

// Routers
const usersRouter = require('./api/users/users-router.js');

const server = express();

server.use(express.json());

// Base Route
server.get('/', (req, res) => {
  res.send("<div align=\'center\'>" + 
    "<p>Hello World!</p>" + 
    "<p>This is the Starting Page.</p>" +
    "</div>");
});

// Routes
server.use('/api/users', usersRouter);

module.exports = server;
