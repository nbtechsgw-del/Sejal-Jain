const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
    patientId: {
        type: String,
        required: true
    },
    doctorName: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    reason: {
        type: String
    },
    status: {
        type: String,
        default: "Pending"
    },

    disease: {
   type: String
},
});

module.exports = mongoose.model("Appointment", appointmentSchema);