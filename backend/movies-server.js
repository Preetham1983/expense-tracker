const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection for Movies App
mongoose.connect("mongodb://localhost:27017/moviesDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Movies Schema
const movieSchema = new mongoose.Schema({
  movieName: String,
  description: String,
  price: Number,
});

const Movie = mongoose.model("Movie", movieSchema);

// Booking Schema
const bookingSchema = new mongoose.Schema({
  movieName: String,
  price: Number,
  bookingDate: { type: Date, default: Date.now },
});

const Booking = mongoose.model("Booking", bookingSchema);

// Add a new movie booking
app.post("/book", async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(500).json({ message: "Error booking movie", error });
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

// Get all movies (optional if you need to display movie list)
app.get("/movies", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ message: "Error fetching movies", error });
  }
});

// Sample movie data (if you want to populate the database with initial data)
app.post("/seed-movies", async (req, res) => {
  try {
    const movies = [
      { movieName: "Inception", description: "Sci-fi thriller", price: 300 },
      { movieName: "Avengers", description: "Superhero action", price: 250 },
      { movieName: "Interstellar", description: "Space exploration", price: 350 },
    ];
    await Movie.insertMany(movies);
    res.status(201).json({ message: "Movies seeded successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error seeding movies", error });
  }
});

// Get total spent on movies
app.get("/total-spent", async (req, res) => {
    try {
      const bookings = await Booking.find();
      const total = bookings.reduce((sum, booking) => sum + booking.price, 0);
      res.status(200).json({ totalSpent: total });
    } catch (error) {
      res.status(500).json({ message: "Error fetching total spent on movies", error });
    }
  });
  

// Set the server to listen on a specific port
const PORT = 5002;
app.listen(PORT, () => {
  console.log(`Movies server running on port ${PORT}`);
});

