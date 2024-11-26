const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// MongoDB Connection for Dashboard App
mongoose.connect('mongodb://localhost:27017/dashboardDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Function to get data from the Food server
const getFoodData = async () => {
  try {
    const foodPurchases = await Food.find(); // Assuming 'Food' is already defined
    const totalSpentFood = foodPurchases.reduce((acc, food) => acc + food.price, 0);
    return { totalSpentFood, foodPurchases };
  } catch (error) {
    console.error('Error fetching food data:', error);
    throw error;
  }
};

// Function to get data from the Movies server
const getMoviesData = async () => {
  try {
    const movieBookings = await Booking.find(); // Assuming 'Booking' is already defined in the movies server
    const totalSpentMovies = movieBookings.reduce((acc, booking) => acc + booking.price, 0);
    return { totalSpentMovies, movieBookings };
  } catch (error) {
    console.error('Error fetching movie data:', error);
    throw error;
  }
};

// Function to get data from the Travel server
const getTravelData = async () => {
  try {
    const travelBookings = await Booking.find(); // Assuming 'Booking' is already defined in the travel server
    const totalSpentTravel = travelBookings.reduce((acc, booking) => acc + booking.price, 0);
    return { totalSpentTravel, travelBookings };
  } catch (error) {
    console.error('Error fetching travel data:', error);
    throw error;
  }
};

// Endpoint to get dashboard data
app.get('/dashboard', async (req, res) => {
  try {
    const [foodData, moviesData, travelData] = await Promise.all([getFoodData(), getMoviesData(), getTravelData()]);

    const totalSpent = {
      food: foodData.totalSpentFood,
      movies: moviesData.totalSpentMovies,
      travel: travelData.totalSpentTravel,
    };

    // Send the data as JSON response
    res.status(200).json({
      totalSpent,
      foodPurchases: foodData.foodPurchases,
      movieBookings: moviesData.movieBookings,
      travelBookings: travelData.travelBookings,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching dashboard data', error });
  }
});

// Set the server to listen on a specific port
const PORT = 5004;  // You can choose any port for the dashboard server
app.listen(PORT, () => {
  console.log(`Dashboard server running on port ${PORT}`);
});


