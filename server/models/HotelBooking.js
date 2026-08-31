const mongoose = require("mongoose");

const hotelBookingSchema =
  new mongoose.Schema({
    hotelName: String,

    price: Number,

    checkIn: Date,

    checkOut: Date,

    bookingStatus: {
      type: String,
      default: "Booked",
    },

    bookingDate: {
      type: Date,
      default: Date.now,
    },
  });

module.exports = mongoose.model(
  "HotelBooking",
  hotelBookingSchema
);