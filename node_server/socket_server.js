/*
a sample code of socket sever 


*/

const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
io.on("connection", (socket) => {
  console.log("socket->", socket);
  // all socket events here
});

// Magic Lines
server.prependListener("request", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
});
// instead of "*" your can also add the other domain/servername
server.listen(9000, () => {
  console.log("This is the socket server running");
});
