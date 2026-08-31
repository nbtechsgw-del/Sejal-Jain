const express = require("express");
const router = express.Router();

const Package = require("../models/Package");


// ✅ ADD PACKAGE


router.post("/add", async (req, res) => {
  try {

    console.log(req.body); // ADD THIS

    const newPackage = new Package(req.body);
    await newPackage.save();

    res.json({ message: "Package Added Successfully" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// 📦 GET ALL PACKAGES
router.get("/all", async (req, res) => {
  try {
    const data = await Package.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ✏️ UPDATE PACKAGE
router.put("/update/:id", async (req, res) => {
  try {
    await Package.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: "Package Updated Successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ❌ DELETE PACKAGE
router.delete("/delete/:id", async (req, res) => {
  try {
    await Package.findByIdAndDelete(req.params.id);
    res.json({ message: "Package Deleted Successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;