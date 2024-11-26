const express = require('express');
const cors = require('cors'); // For handling cross-origin requests
const app = express();
const port = 5000; // You can change this port as needed

// Enable CORS (Cross-Origin Resource Sharing)
app.use(cors());

// Mock data for each category
const moviesData = [
  { title: 'Movie 1', price: 150 },
  { title: 'Movie 2', price: 200 },
  { title: 'Movie 3', price: 100 },
];

const foodData = [
  { item: 'Pizza', price: 300 },
  { item: 'Burger', price: 120 },
  { item: 'Pasta', price: 180 },
];

const travelData = [
  { destination: 'Paris', price: 5000 },
  { destination: 'New York', price: 4500 },
  { destination: 'Tokyo', price: 4000 },
];

// API Endpoints

// Movies endpoint
app.get('/getMovies', (req, res) => {
  res.json(moviesData);
});

// Food endpoint
app.get('/getFood', (req, res) => {
  res.json(foodData);
});

// Travel endpoint
app.get('/getTravel', (req, res) => {
  res.json(travelData);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
