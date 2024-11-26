const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection for Travel App
mongoose.connect("mongodb://localhost:27017/travelDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Travel Schema
const travelSchema = new mongoose.Schema({
  destination: String,
  description: String,
  price: Number,
});

const Travel = mongoose.model("Travel", travelSchema);

// Booking Schema
const bookingSchema = new mongoose.Schema({
  destination: String,
  price: Number,
  bookingDate: { type: Date, default: Date.now },
});

const Booking = mongoose.model("Booking", bookingSchema);

// Add a new travel booking
app.post("/book", async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(500).json({ message: "Error booking travel", error });
  }
});

// Get all booking history
app.get("/history", async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching booking history", error });
  }
});

// Get all travel destinations (optional if you want to display destinations from the DB)
app.get("/destinations", async (req, res) => {
  try {
    const destinations = await Travel.find();
    res.status(200).json(destinations);
  } catch (error) {
    res.status(500).json({ message: "Error fetching destinations", error });
  }
});

// Sample travel data (if you want to populate the database with initial data)
app.post("/seed-destinations", async (req, res) => {
  try {
    const destinations = [
      { destination: "Paris", description: "City of Lights", price: 50000 },
      { destination: "Maldives", description: "Tropical paradise", price: 70000 },
      { destination: "New York", description: "The Big Apple", price: 60000 },
    ];
    await Travel.insertMany(destinations);
    res.status(201).json({ message: "Destinations seeded successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error seeding destinations", error });
  }
});

// Get total spent on travel
app.get("/total-spent", async (req, res) => {
    try {
      const bookings = await Booking.find();
      const total = bookings.reduce((sum, booking) => sum + booking.price, 0);
      res.status(200).json({ totalSpent: total });
    } catch (error) {
      res.status(500).json({ message: "Error fetching total spent on travel", error });
    }
  });
  

// Set the server to listen on a specific port
const PORT = 5003;
app.listen(PORT, () => {
  console.log(`Travel server running on port ${PORT}`);
});
