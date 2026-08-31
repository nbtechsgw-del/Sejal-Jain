const express = require("express");

const router = express.Router();

const Bill = require("../models/Bill");


// 🟢 ADD BILL
router.post("/add", async (req, res) => {

    try {

        const bill = new Bill(req.body);

        await bill.save();

        res.status(201).json({
            message: "Bill Generated Successfully",
            bill
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// 🟢 GET ALL BILLS
router.get("/", async (req, res) => {

    try {

        const bills = await Bill.find();

        res.status(200).json(bills);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// 🟢 DELETE BILL
router.delete("/:id", async (req, res) => {

    try {

        await Bill.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Bill Deleted"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

module.exports = router;