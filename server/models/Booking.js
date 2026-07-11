const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  packageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Package",
  },

  packageName: String,

  price: Number,

  bookingDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model(
  "Booking",
  bookingSchema
);