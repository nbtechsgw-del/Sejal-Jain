const express = require("express");

const router = express.Router();

const Destination = require("../models/Destination");


// ADD DESTINATION
router.post("/add", async (req, res) => {

  try {

    const destination = new Destination(req.body);

    await destination.save();

    res.json({
      message: "Destination Added",
    });

  } catch (error) {

    console.log("ADD ERROR:", error);

    res.status(500).json({
      message: error.message,
    });

  }

});


// GET ALL DESTINATIONS
router.get("/all", async (req, res) => {

  try {

    const data = await Destination.find();

    res.json(data);

  } catch (error) {

    console.log("GET ERROR:", error);

    res.status(500).json({
      message: error.message,
    });

  }

});


// DELETE DESTINATION
router.delete("/delete/:id", async (req, res) => {

  try {

    await Destination.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Deleted",
    });

  } catch (error) {

    console.log("DELETE ERROR:", error);

    res.status(500).json({
      message: error.message,
    });

  }

});


// UPDATE DESTINATION
router.put("/update/:id", async (req, res) => {

  try {

    await Destination.findByIdAndUpdate(
      req.params.id,
      req.body
    );

    res.json({
      message: "Updated",
    });

  } catch (error) {

    console.log("UPDATE ERROR:", error);

    res.status(500).json({
      message: error.message,
    });

  }

});

module.exports = router;