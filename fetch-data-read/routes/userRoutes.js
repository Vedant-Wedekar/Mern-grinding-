const express = require("express");
const User = require("../models/user");

const router = express.Router();

// Add a new user
router.post("/add", async (req, res) => {
    try {
        const { name, email } = req.body;
        const newUser = new User({ name, email });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: "Error adding user" });
    }
});

// Get all users
router.get("/", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users" });
    }
});

module.exports = router;
