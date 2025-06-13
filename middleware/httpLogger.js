const morgan = require("morgan");
const logger = require("../utilities/logger");
const stream = {
  write: message => logger.http(message.trim()),
};

module.exports = morgan("tiny", { stream });
