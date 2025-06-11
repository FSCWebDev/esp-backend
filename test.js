const soilValidationSchema = require("./validators/soilValidator");

const soilSensorOne = {
  sensor_id: "f12a35d876a1",
  zone_id: "f12a35d8",
  location: "indoors",
  reading: -20,
  timestamp: "2025-01-02",
};

console.log(soilValidationSchema.validate(soilSensorOne));
