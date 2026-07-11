const express = require("express");
const router = express.Router();

const HotelBooking = require("../models/HotelBooking");
const Hotel = require("../models/Hotel");

// ADD HOTEL BOOKING
router.post("/add", async (req, res) => {
  try {
    const booking = new HotelBooking(req.body);

    await booking.save();

    // Find hotel
    const hotel = await Hotel.findOne({
      name: req.body.hotelName,
    });

    if (
      hotel &&
      hotel.availableRooms > 0
    ) {
      hotel.availableRooms =
        hotel.availableRooms - 1;

      await hotel.save();
    }

    res.json({
      message:
        "Hotel Booked Successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// GET ALL HOTEL BOOKINGS
router.get("/all", async (req, res) => {
  try {
    const bookings =
      await HotelBooking.find();

    res.json(bookings);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;