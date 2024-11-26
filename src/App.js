import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Food from "./components/Food";
import Movies from "./components/Movies";
import Travel from "./components/Travel";
import Dashboard from "./components/Dashboard";
import "./styles/App.css";

const App = () => {
  return (
    <Router>
      <div className="app">
        {/* Navbar */}
        <nav className="navbar">
          <h1 className="navbar-title">Expense Tracker</h1>
          <ul className="navbar-links">
            <li>
              <Link to="/">Dashboard</Link>
            </li>
            <li>
              <Link to="/food">Food</Link>
            </li>
            <li>
              <Link to="/movies">Movies</Link>
            </li>
            <li>
              <Link to="/travel">Travel</Link>
            </li>
          </ul>
        </nav>

        {/* Page Content */}
        <div className="content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/food" element={<Food />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/travel" element={<Travel />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;

