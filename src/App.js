// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WeatherDashboard from "./WeatherDashboard.tsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WeatherDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
