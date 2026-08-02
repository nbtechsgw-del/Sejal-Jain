const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  packageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Package",
  },

  packageName: {
    type: String,
  },

  // 👇 ADD THESE
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  userName: {
    type: String,
  },

  rating: {
    type: Number,
    required: true,
  },

  comment: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model(
  "Review",
  reviewSchema
);