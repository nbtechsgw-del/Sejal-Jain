const express = require("express");
const router = express.Router();

const User = require("../models/User");

// REGISTER USER
router.post("/register", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();

    res.json({ message: "User Registered Successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// LOGIN USER
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });

    if (!user) {
      return res.status(400).json({
        message: "User Not Found",
      });
    }

    if (user.password !== req.body.password) {
      return res.status(400).json({
        message: "Invalid Password",
      });
    }

    res.json({
      message: "Login Successful",
      user,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;