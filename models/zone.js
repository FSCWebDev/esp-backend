const mongoose = require("mongoose");

const zoneSchema = mongoose.Schema({
  zone_id: String,
  name: String,
  description: String,
  sensor_ids: Array,
});

const Zone = mongoose.Model("Zone", zoneSchema);

module.exports = Zone;
