const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  packageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Package",
  },

  packageName: String,

  price: Number,

  // 👇 ADD THESE
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  userName: {
    type: String,
  },

  name: String,

  email: String,

  phone: String,

  travelers: Number,

  travelDate: Date,

  bookingDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model(
  "Booking",
  bookingSchema
);