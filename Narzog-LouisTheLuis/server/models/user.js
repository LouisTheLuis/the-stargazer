const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  googleid: String,
  score: Number, 
  compscore: Number,
  currentcomp: Number,
  initial: Number,
  picture: String, 
});

// compile model from schema
module.exports = mongoose.model("user", UserSchema);
