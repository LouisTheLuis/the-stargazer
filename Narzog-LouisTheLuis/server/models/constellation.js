const mongoose = require("mongoose");

const ConstellationSchema = new mongoose.Schema({
  name: String,
  min: Array,
  max: Array,
  area: Number,
});

// compile model from schema
module.exports = mongoose.model("constellation", ConstellationSchema);