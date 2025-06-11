const Joi = require("joi");

// zone_id: String,
//   name: String,
//   description: String,
//   sensor_ids: Array,

const schema = Joi.object({
  zone_id: Joi.string()
    .description("Zone ID for placement purposes")
    .alphanum()
    .required(),
  name: Joi.string().description("Name for the zone").alphanum().required(),
  description: Joi.string()
    .description("Description used to describe zone")
    .alphanum()
    .required(),
  sensor_ids: Joi.array()
    .description("Array used for sensor ids used in zone")
    .min(0)
    .max(10)
    .unique()
    .default([]),
});

module.exports = schema;
