const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
    doctorName: String,
    specialization: String
});

module.exports = mongoose.model("Doctor", doctorSchema);