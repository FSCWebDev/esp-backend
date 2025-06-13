const http = require("http");
const WebSocket = require("ws");
const logger = require("../utilities/logger");

module.exports = app => {
  const server = http.createServer(app);
  const wss = new WebSocket.Server({ server });

  wss.on("connection", ws => {
    logger.http("Web Socket Client Connected.");

    ws.on("message", message => {
      // TODO: Implement this event with conditions.
      // TODO: If no auth object before Authentication, destroy connection.
      // TODO: Authentication - Check if Authenticated (Based on who they are)
      // TODO: Authorization - Check if Authorized (Based on access level)
      // TODO: If not Authenticated, destroy connection.
      // TODO: If not Authorized but Authenticated, send error response
      // TODO: If Authenticated, Authorize based on access level
      // TODO: If Authorized, grant access to features
      logger.info(`Web Socket client sent: ${message}`);

      ws.send("Got your message: " + message);
    });

    ws.on("close", () => {
      logger.info(`Web Socket client disconnected`);
    });

    ws.send("Welcome to the raw WebSocket server!");
  });

  return server;
};
