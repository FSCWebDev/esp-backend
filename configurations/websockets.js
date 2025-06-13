const http = require("http");
const WebSocket = require("ws");
const logger = require("../utilities/logger");

function isAuthorizedUser(req) {
  return (
    req.headers["authorization"] &&
    (req.headers["authorization"] === `Bearer ${process.env.WEBSOCKET_ADMIN}` ||
      req.headers["authorization"] === `Bearer ${process.env.WEBSOCKET_USER}` ||
      req.headers["authorization"] === `Bearer ${process.env.WEBSOCKET_SENSOR}`)
  );
}
function isAuthorizedAdmin(req) {
  return (
    req.headers["authorization"] &&
    req.headers["authorization"] === `Bearer ${process.env.WEBSOCKET_ADMIN}`
  );
}
function isAuthorizedSensor(req) {
  return (
    req.headers["authorization"] &&
    req.headers["authorization"] === `Bearer ${process.env.WEBSOCKET_SENSOR}`
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
    logger.http("Web Socket Client Connected.");

    // Handles data transferred from client
    ws.on("message", message => {
      // If user is unauthorized, close connection
      if (!isAuthorizedUser(req)) {
        logger.error("Unauthorized User! - 35");
        ws.close();
      }

      // If user is authorized admin & has an action header
      if (isAuthorizedSensor(req) && req.headers["action"]) {
        logger.info("Authorized Sensor!");
        // TODO: Implement handling of soil sensor delivery
        // handleSoilData()
        // TODO: Implement handling of temperature sensor delivery
        // handleTemperatureData()
        // TODO: Implement handling of Trash delivery
        // handleTrashData()
        ws.send("Gathering readings...");
      }
      // If user is authorized admin & has an action header
      if (isAuthorizedAdmin(req) && req.headers["action"]) {
        logger.info("Authorized Admin!");
        // TODO: Implement handling of soil sensor delivery
        // handleSoilData()
        // TODO: Implement handling of temperature sensor delivery
        // handleTemperatureData()
        // TODO: Implement handling of Trash delivery
        // handleTrashData()
        ws.send("Accepting input from admin...");
      }
      if (!isAuthorizedSensor(req) && !isAuthorizedAdmin(req)) {
        // Send feedback to user that is authorized but not an admin
        logger.info("Authorized User!");
        // TODO: Implement handling of sending all data to client
        // handleClientData()
        ws.send("Sending client data...");
      }
    });

    // Handles closed connections.
    ws.on("close", () => {
      logger.info(`Web Socket client disconnected`);
    });

    ws.send("Welcome to the WebSocket server!");
  });

  return server;
};
