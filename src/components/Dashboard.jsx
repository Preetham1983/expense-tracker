import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
// Import Chart.js
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title, CategoryScale, LinearScale } from 'chart.js';

// Register the components
ChartJS.register(ArcElement, Tooltip, Legend, Title, CategoryScale, LinearScale);

// Now you can use the chart components such as pie charts

const Dashboard = () => {
  const [foodData, setFoodData] = useState([]);
  const [movieData, setMovieData] = useState([]);
  const [travelData, setTravelData] = useState([]);

  const [totalSpending, setTotalSpending] = useState({
    food: 0,
    movies: 0,
    travel: 0,
  });

  useEffect(() => {
    const fetchFoodData = async () => {
      try {
        const response = await axios.get('http://localhost:5001/food');
        console.log("Food Data:", response.data); // Check the food data
        setFoodData(response.data);
        setTotalSpending(prevState => ({
          ...prevState,
          food: response.data.reduce((sum, item) => sum + item.price, 0),
        }));
      } catch (error) {
        console.error("Error fetching food data:", error);
      }
    };
  
    const fetchMovieData = async () => {
      try {
        const response = await axios.get('http://localhost:5002/movies');
        console.log("Movie Data:", response.data); // Check the movie data
        setMovieData(response.data);
        setTotalSpending(prevState => ({
          ...prevState,
          movies: response.data.reduce((sum, movie) => sum + movie.price, 0),
        }));
      } catch (error) {
        console.error("Error fetching movie data:", error);
      }
    };
  
    const fetchTravelData = async () => {
      try {
        const response = await axios.get('http://localhost:5003/destinations');
        console.log("Travel Data:", response.data); // Check the travel data
        setTravelData(response.data);
        setTotalSpending(prevState => ({
          ...prevState,
          travel: response.data.reduce((sum, destination) => sum + destination.price, 0),
        }));
      } catch (error) {
        console.error("Error fetching travel data:", error);
      }
    };
  
    fetchFoodData();
    fetchMovieData();
    fetchTravelData();
  }, []);
  
  const data = {
    labels: ['Food', 'Movies', 'Travel'],
    datasets: [
      {
        data: [totalSpending.food, totalSpending.movies, totalSpending.travel],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <div className="pie-chart">
        <Pie data={data} />
      </div>
      <div className="summary">
        <h2>Total Spending</h2>
        <ul>
          <li>Food: ${totalSpending.food}</li>
          <li>Movies: ${totalSpending.movies}</li>
          <li>Travel: ${totalSpending.travel}</li>
        </ul>
      </div>
      <div className="booking-summary">
        <h2>Total Bookings</h2>
        <ul>
          <li>Food: {foodData.length} items</li>
          <li>Movies: {movieData.length} bookings</li>
          <li>Travel: {travelData.length} destinations</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;










