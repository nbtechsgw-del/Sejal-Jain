const express = require("express");
const router = express.Router();

const Appointment = require("../models/Appointment");

// GET ALL
router.get("/", async (req, res) => {
    try {
        const data = await Appointment.find();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST
router.post("/book", async (req, res) => {
    try {
        const data = new Appointment(req.body);
        await data.save();
        res.json({ message: "Booked" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;