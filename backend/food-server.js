
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection for Food App
mongoose.connect("mongodb://localhost:27017/foodDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Food Schema
const foodSchema = new mongoose.Schema({
  itemName: String,
  description: String,
  price: Number,
});

const Food = mongoose.model("Food", foodSchema);

// Add a new food purchase
app.post("/food", async (req, res) => {
  try {
    const newFood = new Food(req.body);
    await newFood.save();
    res.status(201).json(newFood);
  } catch (error) {
    res.status(500).json({ message: "Error adding food item", error });
  }
});

// Get all food purchases
app.get("/food", async (req, res) => {
  try {
    const foods = await Food.find();
    res.status(200).json(foods);
  } catch (error) {
    res.status(500).json({ message: "Error fetching food items", error });
  }
});
app.get("/history", async (req, res) => {
    try {
      const bookings = await Food.find();
      res.status(200).json(bookings);
    } catch (error) {
      res.status(500).json({ message: "Error fetching booking history", error });
    }
  });
// Get total spent on food
app.get("/total-spent", async (req, res) => {
    try {
      const foods = await Food.find();
      const total = foods.reduce((sum, food) => sum + food.price, 0);
      res.status(200).json({ totalSpent: total });
    } catch (error) {
      res.status(500).json({ message: "Error fetching total spent on food", error });
    }
  });
  

const PORT = 5001;
app.listen(PORT, () => console.log(`Food server running on port ${PORT}`));
