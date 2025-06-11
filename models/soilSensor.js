const mongoose = require("mongoose");
// Sensor ID      Sensor ID
// Zone ID        Zone of sensor (placement)
// Location       Indoors/Outdoors
// Reading        Reading gathered from sensor
// Timestamp      Current timestamp of creation/update

const soilSensorSchema = mongoose.Schema({
  sensor_id: String,
  zone_id: String,
  location: String,
  reading: Number,
  timestamp: { type: Date, default: Date.now },
});

const SoilSensor = mongoose.Model("SoilSensor", soilSensorSchema);

module.exports = SoilSensor;
