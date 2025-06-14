const SoilValidator = require("../../validators/soilValidator");
const SoilModel = require("../../models/soilSensor");
const logger = require("../../utilities/logger");

function isAuthorizedAdmin(req) {
  return (
    req.headers["authorization"] &&
    req.headers["authorization"] === `Bearer ${process.env.WEBSOCKET_ADMIN}`
  );
}

async function handleAdminSoilData(ws, message) {
  logger.info("Data sent in: " + message);
  const data = JSON.parse(message);

  // Validation
  const { error, value } = SoilValidator.validate(data);
  if (error) {
    logger.error("Client sent incorrect data format");
    ws.send("Error! Needs to be in the correct format");
    return;
  }

  // MongoDB Updating
  try {
    await SoilModel.findOneAndUpdate(
      { sensor_id: value["sensor_id"] },
      { ...value, timestamp: Date.now() },
      { upsert: true }
    );
    logger.info("Document created/updated for sensor: " + value["sensor_id"]);
  } catch (error) {
    logger.error(error);
  }
}

function handleAdminMessages(ws, req, message) {
  // If user is authorized admin & has an action header
  if (isAuthorizedAdmin(req) && req.headers["action"]) {
    logger.info("Authorized Admin!");
    // TODO: Implement handling of soil sensor delivery
    handleAdminSoilData(ws, message);
    // TODO: Implement handling of temperature sensor delivery
    // handleTemperatureData()
    // TODO: Implement handling of Trash delivery
    // handleTrashData()
    ws.send("Gathering readings...");
  }
}

module.exports = handleAdminMessages;
