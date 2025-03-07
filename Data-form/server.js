require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Connection Error:", err));


// Define Schema
const userSchema = new mongoose.Schema({
  name: String,
  phone: String,
});

const User = mongoose.model("User", userSchema);


// Handle form submission
app.post('/submit', async (req, res) => {
  try {
    const { name, phone } = req.body;
    const newUser = new User({ name, phone });
    await newUser.save();
    res.status(201).json({ message: "Data saved successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
