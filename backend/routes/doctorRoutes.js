const express = require("express");
const router = express.Router();

const Doctor = require("../models/Doctor");


// GET ALL DOCTORS
router.get("/", async (req, res) => {

    try {

        const doctors = await Doctor.find();

        res.json(doctors);

    } catch (err) {

        console.log(err);

        res.status(500).json({
            error: err.message
        });

    }

});


// ADD DOCTOR
router.post("/add", async (req, res) => {

    try {

        const doctor = new Doctor(req.body);

        await doctor.save();

        res.json({
            message: "Doctor added successfully",
            doctor
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            error: err.message
        });

    }

});

module.exports = router;