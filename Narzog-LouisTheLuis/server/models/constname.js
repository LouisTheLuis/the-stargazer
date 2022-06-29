const mongoose = require("mongoose");

const ConstNameSchema = new mongoose.Schema({
  data: Array,
});

// compile model from schema
module.exports = mongoose.model("constname", ConstNameSchema);