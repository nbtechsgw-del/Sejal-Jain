const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema({
  title: String,
  destination: String,
  price: Number,
  description: String,
  image: String,

  itinerary: String,
  duration: String,
  availability: Number,
  offer: String,
  type: String
});

module.exports = mongoose.model("Package", packageSchema);