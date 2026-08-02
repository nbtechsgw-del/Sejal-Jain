const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/db");

const adminRoutes = require("./routes/adminRoutes");
const packageRoutes = require("./routes/packageRoutes");
const destinationRoutes = require("./routes/destinationRoutes");
const hotelRoutes = require("./routes/hotelRoutes");
const userRoutes = require("./routes/userRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const hotelBookingRoutes =
  require("./routes/hotelBookingRoutes");

  const reviewRoutes =
  require("./routes/reviewRoutes");
  const aiRoutes = require("./routes/aiRoutes");




const app = express();

app.use(cors());
app.use(express.json());

// DB connect
connectDB();

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/package", packageRoutes);
app.use("/api/destination", destinationRoutes);
app.use("/api/hotel", hotelRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/user", userRoutes);
app.use("/api/booking", bookingRoutes);
app.use(
  "/api/hotel-booking",
  hotelBookingRoutes
);

app.use("/api/review", reviewRoutes);
app.use("/api/payment", require("./routes/paymentRoutes"));

// Test route
app.get("/", (req, res) => {
  res.send("Tourism Server Running");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});