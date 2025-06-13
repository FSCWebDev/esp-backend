const mongoose = require("mongoose");
const logger = require("../utilities/logger");

module.exports = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    logger.info("Client connected to MongoDB");
  } catch (err) {
    logger.error("MongoDB connection error:", err);
  }
};
