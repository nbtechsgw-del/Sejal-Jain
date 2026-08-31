const express = require("express");
const router = express.Router();

const Razorpay = require("razorpay");
const crypto = require("crypto");

const Booking = require("../models/Booking");
const Package = require("../models/Package");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});


// CREATE ORDER
router.post("/create-order", async (req, res) => {
  try {

    const options = {
      amount: req.body.amount * 100,
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    };

    const order =
      await razorpay.orders.create(options);

    res.json(order);

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });

  }
});


// VERIFY PAYMENT
router.post("/verify-payment", async (req, res) => {

  try {

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      bookingData,
    } = req.body;

    const body =
      razorpay_order_id +
      "|" +
      razorpay_payment_id;

    const expectedSignature =
      crypto
        .createHmac(
          "sha256",
          process.env.RAZORPAY_KEY_SECRET
        )
        .update(body.toString())
        .digest("hex");

    if (
      expectedSignature ===
      razorpay_signature
    ) {

      // Package Find
      const pkg =
        await Package.findById(
          bookingData.packageId
        );

      if (!pkg) {
        return res.status(404).json({
          success: false,
          message: "Package Not Found",
        });
      }

      // Availability Check
      if (pkg.availability <= 0) {
        return res.status(400).json({
          success: false,
          message: "Package Sold Out",
        });
      }

      // Save Booking
      const booking =
        new Booking({
          packageId:
            bookingData.packageId,

          packageName:
            bookingData.packageName,

          price:
            bookingData.price,
        });

      await booking.save();

      // Reduce Availability
      pkg.availability =
        pkg.availability - 1;

      await pkg.save();

      res.json({
        success: true,
        message:
          "Payment Verified & Booking Saved",
      });

    } else {

      res.status(400).json({
        success: false,
        message: "Invalid Signature",
      });

    }

  } catch (error) {
  console.log("RAZORPAY ERROR:", error);

  res.status(500).json({
    error: error.message,
  });
}

});

module.exports = router;