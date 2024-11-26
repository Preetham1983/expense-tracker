import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Movies.css";

const MoviesApp = () => {
  const [movies, setMovies] = useState([
    { movieName: "Inception", description: "Sci-fi thriller", price: 300 },
    { movieName: "Avengers", description: "Superhero action", price: 250 },
    { movieName: "Interstellar", description: "Space exploration", price: 350 },
  ]);
  const [history, setHistory] = useState([]);

  const bookMovie = async (movie) => {
    try {
        const response = await axios.post('http://localhost:5002/book', {
        });
        console.log(response.data);
      } catch (error) {
        console.error("Error in booking movie:", error);
      }
    alert("Movie booked successfully!");
    fetchHistory();
  };

  const fetchHistory = async () => {
    const response = await axios.get("http://localhost:5002/history");
    setHistory(response.data);
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className="movies-app">
      <h1>Movies App</h1>
      <div className="movies-list">
        {movies.map((movie, index) => (
          <div key={index} className="movie-card">
            <h3>{movie.movieName}</h3>
            <p>{movie.description}</p>
            <p>₹{movie.price}</p>
            <button onClick={() => bookMovie(movie)}>Book</button>
          </div>
        ))}
      </div>
      <h2>Booking History</h2>
      <ul>
        {history.map((item, index) => (
          <li key={index}>
            {item.movieName} - ₹{item.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MoviesApp;
