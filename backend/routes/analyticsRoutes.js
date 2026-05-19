const express = require("express");
const router = express.Router();

const Patient = require("../models/Patient");
const Appointment = require("../models/Appointment");
const Bill = require("../models/Bill");

router.get("/", async (req, res) => {

    try {

        console.log("🔥 Analytics API HIT");

        const totalPatients = await Patient.countDocuments();
        const totalAppointments = await Appointment.countDocuments();
        const totalBills = await Bill.countDocuments();

        const paidBills = await Bill.countDocuments({ paymentStatus: "Paid" });
        const pendingBills = await Bill.countDocuments({ paymentStatus: "Pending" });

        const revenueData = await Bill.aggregate([
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: "$totalAmount" }
                }
            }
        ]);

        const totalRevenue =
            revenueData.length > 0 ? revenueData[0].totalRevenue : 0;

        return res.status(200).json({
            totalPatients,
            totalAppointments,
            totalBills,
            paidBills,
            pendingBills,
            totalRevenue
        });

    } catch (error) {

        console.log("❌ Analytics Error:", error);

        return res.status(500).json({
            message: "Server Error",
            error: error.message
        });

    }

});

module.exports = router;