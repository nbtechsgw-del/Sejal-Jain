const express = require("express");
const router = express.Router();

const Booking = require("../models/Booking");
const Package = require("../models/Package");


// ADD BOOKING
router.post("/add", async (req, res) => {

  try {

    const pkg = await Package.findById(
      req.body.packageId
    );

    if (!pkg) {
      return res.status(404).json({
        message: "Package Not Found",
      });
    }

    if (pkg.availability <= 0) {
      return res.status(400).json({
        message: "Package Sold Out",
      });
    }

    const booking = new Booking({
      packageId: req.body.packageId,
      packageName: req.body.packageName,
      price: req.body.price,
    });

    await booking.save();

    // Reduce available seats
    pkg.availability =
      pkg.availability - 1;
console.log(
  "Availability:",
  pkg.availability
);
    await pkg.save();

    res.json({
      message: "Booking Successful",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});


// GET ALL BOOKINGS
router.get("/all", async (req, res) => {

  try {

    const bookings = await Booking.find();

    res.json(bookings);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});

module.exports = router;