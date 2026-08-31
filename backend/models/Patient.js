const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
    patientId: String,
    name: String,
    age: Number,
    gender: String,
    phone: String,
    address: String,
    bloodGroup: String,

    //  EMR PART
    diagnosis: String,
    treatments: String,
    allergies: String,
    prescriptions: String,
    labReports: String
});

module.exports = mongoose.model("Patient", patientSchema);