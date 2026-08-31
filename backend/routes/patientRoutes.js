const express = require("express");
const router = express.Router();

const Patient = require("../models/Patient");


// ➤ ADD PATIENT
router.post("/add", async (req, res) => {
    try {

        const newPatient = new Patient(req.body);

        await newPatient.save();

        res.status(201).json({
            message: "Patient Added Successfully",
            patient: newPatient
        });

    } catch (error) {

        res.status(500).json({
            message: "Error adding patient",
            error: error.message
        });

    }
});


// ➤ GET ALL PATIENTS
router.get("/", async (req, res) => {
    try {

        const patients = await Patient.find();

        res.status(200).json(patients);

    } catch (error) {

        res.status(500).json({
            message: "Error fetching patients",
            error: error.message
        });

    }
});


// ➤ GET SINGLE PATIENT
router.get("/:patientId", async (req, res) => {
    try {

        const patient = await Patient.findOne({
            patientId: req.params.patientId
        });

        if (!patient) {
            return res.status(404).json({
                message: "Patient not found"
            });
        }

        res.status(200).json(patient);

    } catch (error) {

        res.status(500).json({
            message: "Error fetching patient",
            error: error.message
        });

    }
});


// ➤ UPDATE PATIENT (MAIN FIX)
router.put("/update/:patientId", async (req, res) => {
    try {

        const updatedPatient = await Patient.findOneAndUpdate(
            { patientId: req.params.patientId },
            req.body,
            { new: true }
        );

        if (!updatedPatient) {
            return res.status(404).json({
                message: "Patient not found"
            });
        }

        res.status(200).json({
            message: "Patient Updated Successfully",
            patient: updatedPatient
        });

    } catch (error) {

        res.status(500).json({
            message: "Error updating patient",
            error: error.message
        });

    }
});


// ➤ DELETE PATIENT
router.delete("/delete/:patientId", async (req, res) => {
    try {

        const deletedPatient = await Patient.findOneAndDelete({
            patientId: req.params.patientId
        });

        if (!deletedPatient) {
            return res.status(404).json({
                message: "Patient not found"
            });
        }

        res.status(200).json({
            message: "Patient Deleted Successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: "Error deleting patient",
            error: error.message
        });

    }
});

module.exports = router;