import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Food.css";

const FoodApp = () => {
  const [foodItems, setFoodItems] = useState([
    { itemName: "Burger", description: "Tasty chicken burger", price: 150 },
    { itemName: "Pizza", description: "Cheese burst pizza", price: 300 },
    { itemName: "Chocolate", description: "Delicious dark chocolate", price: 50 },
  ]);
  const [history, setHistory] = useState([]);

  const buyFood = async (food) => {
    try {
      await axios.post("http://localhost:5001/food", food);
      alert("Food purchased successfully!");
      fetchHistory();
    } catch (error) {
      console.error("Error purchasing food:", error);
      alert("Failed to purchase food. Please try again.");
    }
  };
  
  

  const fetchHistory = async () => {
    try {
      const response = await axios.get("http://localhost:5001/history");
      setHistory(response.data);
    } catch (error) {
      console.error("Error fetching history:", error);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className="food-app">
      <h1>Food App</h1>
      <div className="food-items">
        {foodItems.map((food, index) => (
          <div key={index} className="food-card">
            <h3>{food.itemName}</h3>
            <p>{food.description}</p>
            <p>₹{food.price}</p>
            <button onClick={() => buyFood(food)}>Buy</button>
          </div>
        ))}
      </div>
      <h2>Purchase History</h2>
      {history.length > 0 ? (
        <ul className="history-list">
          {history.map((item, index) => (
            <li key={index} className="history-item">
              {item.itemName} - ₹{item.price}
            </li>
          ))}
        </ul>
      ) : (
        <p>No purchases yet.</p>
      )}
    </div>
  );
};

export default FoodApp;

