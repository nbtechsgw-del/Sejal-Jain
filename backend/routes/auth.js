const express = require("express");
const router = express.Router();

const User = require("../models/User");


// REGISTER
router.post("/register", async (req, res) => {

    try {

        const user = new User(req.body);

        await user.save();

        res.status(201).json({
            message: "User Registered Successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// LOGIN
router.post("/login", async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User Not Found"
            });
        }

        if (user.password !== password) {
            return res.status(400).json({
                message: "Invalid Password"
            });
        }

        res.status(200).json({
            message: "Login Successful",
            user
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

module.exports = router;