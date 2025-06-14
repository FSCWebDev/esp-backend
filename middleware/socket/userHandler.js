const SoilModel = require("../../models/soilSensor");
const logger = require("../../utilities/logger");

function ensureAuthorizedUser(ws, req) {
  return (
    ws.authorized &&
    req.headers["authorization"] === `Bearer ${process.env.WEBSOCKET_USER}`
  );
}

async function handleUserSoilData(ws, message) {
  logger.info(message);

  const docs = await SoilModel.find({}, { _id: 0, __v: 0 });
  logger.info(docs);
}

function handleClientMessages(ws, req, message) {
  if (ensureAuthorizedUser(ws, req)) {
    logger.info("Authorized User!");
    handleUserSoilData(ws, message);
    // TODO: Implement handling of temperature sensor delivery
    // handleTemperatureData()
    // TODO: Implement handling of Trash delivery
    // handleTrashData()
    ws.send("Gathering readings...");
  }
}

module.exports = handleClientMessages;
