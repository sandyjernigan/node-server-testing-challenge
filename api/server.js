const express = require('express');

const server = express();

server.use(express.json());

// Base Route
server.get('/', (req, res) => {
  res.send("<div align=\'center\'>" + 
    "<p>Hello World!</p>" + 
    "<p>This is the Starting Page.</p>" +
    "</div>");
});

module.exports = server;
