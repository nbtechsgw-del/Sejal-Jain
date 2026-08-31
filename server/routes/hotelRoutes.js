const express = require("express");
const router = express.Router();

const Hotel = require("../models/Hotel");


// ADD HOTEL
router.post("/add", async (req, res) => {

  try {

    const hotel = new Hotel(req.body);

    await hotel.save();

    res.json({
      message: "Hotel Added Successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});


// GET ALL HOTELS

// GET ALL HOTELS (WITH DESTINATION NAME)
router.get("/all", async (req, res) => {
  try {
    const hotels = await Hotel.find().populate("destinationId");

    res.json(hotels);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// DELETE HOTEL
router.delete("/delete/:id", async (req, res) => {

  try {

    await Hotel.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Hotel Deleted",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});


// UPDATE HOTEL
router.put("/update/:id", async (req, res) => {

  try {

    await Hotel.findByIdAndUpdate(
      req.params.id,
      req.body
    );

    res.json({
      message: "Hotel Updated",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});

module.exports = router;