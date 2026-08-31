const mongoose = require("mongoose");

const billSchema = new mongoose.Schema({

    patientId: {
        type: String,
        required: true
    },

    patientName: {
        type: String,
        required: true
    },

    doctorFees: {
        type: Number,
        required: true
    },

    medicineCharges: {
        type: Number,
        required: true
    },

    treatmentCharges: {
        type: Number,
        required: true
    },

    totalAmount: {
        type: Number,
        required: true
    },

    paymentStatus: {
        type: String,
        default: "Pending"
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("Bill", billSchema);