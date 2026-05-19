const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const patientRoutes = require("./routes/patientRoutes");
const authRoutes = require("./routes/auth");
const emrRoutes = require("./routes/emrRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const billRoutes = require("./routes/billRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const doctorRoutes = require("./routes/doctorRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

console.log("🟢 Server starting...");

// Routes
app.use("/api/patients", patientRoutes);
console.log("✔ Patients route loaded");

app.use("/api/auth", authRoutes);
console.log("✔ Auth route loaded");

app.use("/api/emr", emrRoutes);
console.log("✔ EMR route loaded");

app.use("/api/appointments", appointmentRoutes);
console.log("✔ Appointments route loaded");

app.use("/api/bills", billRoutes);
console.log("bill route loaded");

app.use("/api/analytics", analyticsRoutes);
console.log("analyticsRoutes route loaded");

app.use("/api/doctors", doctorRoutes);
console.log("doctor route loaded");

app.get("/hello", (req, res) => {
    res.send("HELLO SERVER WORKING");
});

// Test route
app.get("/", (req, res) => {
    res.send("API Running");
    console.log("🏠 Root API hit");
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("🟢 MongoDB Connected Successfully");
})
.catch((err) => {
    console.log("🔴 Mongo Error:", err);
});

// Server start
const PORT = 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});