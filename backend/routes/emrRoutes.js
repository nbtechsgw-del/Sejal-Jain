const express = require("express");
const router = express.Router();
const EMR = require("../models/EMR");

// Add Medical Record
router.post("/add", async (req, res) => {
    try {
        const record = new EMR(req.body);
        await record.save();

        res.json({ message: "Medical Record Added" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;