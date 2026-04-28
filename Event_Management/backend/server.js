const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connect
mongoose.connect("mongodb://127.0.0.1:27017/eventDB")
.then(() => console.log("DB Connected"))
.catch(err => console.log(err));

// Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});

const eventSchema = new mongoose.Schema({
  name: String,
  date: String,
  venue: String,
  price: Number
});

const Event = mongoose.model("Event", eventSchema);

const User = mongoose.model("User", userSchema);

// REGISTER API
app.post("/register", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.send("User Registered");
});

// LOGIN API
app.post("/login", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
    password: req.body.password
  });

  if (user) {
    res.send("Success");
  } else {
    res.send("Fail");
  }
});

app.post("/addEvent", async (req, res) => {
  const event = new Event(req.body);
  await event.save();
  res.send("Event Added Successfully");
});

app.get("/events", async (req, res) => {
  const events = await Event.find();
  res.json(events);
});

// SERVER
app.listen(5000, () => console.log("Server running on port 5000"));