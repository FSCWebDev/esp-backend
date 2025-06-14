const http = require("http");
const WebSocket = require("ws");

const handleSensorMessages = require("../middleware/socket/sensorHandler");
const handleAdminMessages = require("../middleware/socket/adminHandler");
const handleClientMessages = require("../middleware/socket/userHandler");

const logger = require("../utilities/logger");

function isAuthorizedUser(req) {
  return (
    req.headers["authorization"] &&
    (req.headers["authorization"] === `Bearer ${process.env.WEBSOCKET_ADMIN}` ||
      req.headers["authorization"] === `Bearer ${process.env.WEBSOCKET_USER}` ||
      req.headers["authorization"] === `Bearer ${process.env.WEBSOCKET_SENSOR}`)
  );
}

module.exports = app => {
  const server = http.createServer(app);
  const wss = new WebSocket.Server({ server });

  // Handles connection establishment
  wss.on("connection", (ws, req) => {
    // If user is unauthorized, close connection
    if (!isAuthorizedUser(req)) {
      logger.error("Unauthorized User! - 29");
      ws.close();
    }
    ws.authorized = true;
    logger.info("Web Socket Client Connected.");

    // Handles data transferred from client
    ws.on("message", message => {
      handleSensorMessages(ws, req, message);
      handleAdminMessages(ws, req, message);
      handleClientMessages(ws, req, message);
      // if (ensureAuthorizedUser(ws, req)) {
      //   // Send feedback to user that is authorized but not an admin
      //   logger.info("Authorized User!");
      //   // TODO: Implement handling of sending all data to client
      //   // handleClientData()
      //   ws.send("Sending client data...");
      // }
    });

    // Handles closed connections.
    ws.on("close", () => {
      logger.info(`Web Socket client disconnected`);
    });

    ws.send("Welcome to the WebSocket server!");
  });

  return server;
};

// REDACTED: Belongs to handleSensorSoilData - message is apparently an object.
// if (typeof message !== "string") {
//   logger.error("Client didn't send stringified JSON");
//   ws.send("Error! Needs to be a stringified JSON object");
//   return;
// }
