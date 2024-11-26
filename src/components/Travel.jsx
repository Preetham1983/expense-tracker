import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Travel.css";

const TravelApp = () => {
  const [destinations, setDestinations] = useState([
    { destination: "Paris", description: "City of Lights", price: 50000 },
    { destination: "Maldives", description: "Tropical paradise", price: 70000 },
    { destination: "New York", description: "The Big Apple", price: 60000 },
  ]);
  const [history, setHistory] = useState([]);

  const bookTravel = async (travel) => {
    await axios.post("http://localhost:5003/book", travel);
    alert("Travel booked successfully!");
    fetchHistory();
  };

  const fetchHistory = async () => {
    const response = await axios.get("http://localhost:5003/history");
    setHistory(response.data);
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className="travel-app">
      <h1>Travel App</h1>
      <div className="travel-list">
        {destinations.map((destination, index) => (
          <div key={index} className="travel-card">
            <h3>{destination.destination}</h3>
            <p>{destination.description}</p>
            <p>₹{destination.price}</p>
            <button onClick={() => bookTravel(destination)}>Book</button>
          </div>
        ))}
      </div>
      <h2>Booking History</h2>
      <ul>
        {history.map((item, index) => (
          <li key={index}>
            {item.destination} - ₹{item.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TravelApp;
