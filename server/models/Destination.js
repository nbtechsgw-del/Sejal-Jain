const mongoose = require("mongoose");

const destinationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  image: {
    type: String,
  },

  description: {
    type: String,
  },

  location: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  mapLink: {
    type: String,
  },
});

module.exports = mongoose.model(
  "Destination",
  destinationSchema
);