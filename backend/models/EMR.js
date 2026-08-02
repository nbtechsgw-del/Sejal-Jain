const mongoose = require("mongoose");

const emrSchema = new mongoose.Schema({
    patientId: String,
    diagnosis: String,
    treatments: String,
    allergies: String,
    prescriptions: String,
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("EMR", emrSchema);