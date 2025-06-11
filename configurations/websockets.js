const http = require("http");
const WebSocket = require("ws");

module.exports = app => {
  const server = http.createServer(app);
  const wss = new WebSocket.Server({ server });

  wss.on("connection", ws => {
    console.log("New WebSocket client connected");

    ws.on("message", message => {
      console.log("Received: ", message.toString());

      ws.send("Got your message: " + message);
    });

    ws.on("close", () => {
      console.log("WebSocket client disconnected");
    });

    ws.send("Welcome to the raw WebSocket server!");
  });

  return server;
};
