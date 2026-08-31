const express = require("express");

const router = express.Router();

const Admin = require("../models/Admin");

router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    const newAdmin = new Admin({
      email,
      password,
    });

    await newAdmin.save();

    res.status(201).json({
      message: "Admin Registered Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(404).json({
        message: "Admin Not Found",
      });
    }

    if (admin.password !== password) {
      return res.status(400).json({
        message: "Invalid Password",
      });
    }

    res.status(200).json({
      message: "Login Successful",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
});

module.exports = router;