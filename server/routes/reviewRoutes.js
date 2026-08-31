const express = require("express");
const router = express.Router();

const Review = require("../models/Review");

// ADD REVIEW
router.post("/add", async (req, res) => {
  try {
    const review = new Review(req.body);
    await review.save();

    res.json({
      message: "Review Added",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// GET REVIEWS
router.get("/all", async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;