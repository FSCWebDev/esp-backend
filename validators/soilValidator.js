const Joi = require("joi");

// Sensor ID      Sensor ID
// Zone ID        Zone of sensor (placement)
// Location       Indoors/Outdoors
// Reading        Reading gathered from sensor
// Timestamp      Current timestamp of creation/update

const schema = Joi.object({
  sensor_id: Joi.string()
    .description("Sensor ID for the current sensor")
    .alphanum()
    .length(12)
    .required(),
  zone_id: Joi.string()
    .description("Zone ID related to internal placement of sensor")
    .alphanum()
    .length(8)
    .required(),
  location: Joi.string()
    .description("Sensor location is either indoors or outdoors")
    .valid("indoors", "outdoors")
    .required(),
  reading: Joi.number()
    .description("Sensor readings")
    .min(-20)
    .precision(2)
    .required(),
  timestamp: Joi.date()
    .description("Timestamp for creation/update")
    .default(Date.now()),
});

module.exports = schema;
