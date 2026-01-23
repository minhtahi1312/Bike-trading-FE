import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import Homebuyer from "./pages/Home/Home-Buyer/Homebuyer";
import Homeguest from "./pages/Home/Home-guest/Homeguest";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homeguest />} />
        <Route path="/homebuyer" element={<Homebuyer />} />
        <Route path="/homeguest" element={<Homeguest />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;

