const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema({
  name: String,

  image: String,

  description: String,

  price: Number,

  rooms: Number,

  availableRooms: Number,

  rating: {
    type: Number,
    default: 0,
  },

  destinationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Destination",
  },
});

module.exports =
  mongoose.models.Hotel ||
  mongoose.model("Hotel", hotelSchema);