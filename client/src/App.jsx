import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// --- 1. IMPORT CẦN THIẾT (Phải cài npm install react-toastify trước nhé) ---
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// -------------------------------------------------------------------------

import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/Admin/Dashboard";
import Listings from "./pages/Admin/Listings";
import Login from "./pages/Login/Login";
import Homebuyer from "./pages/Home/Home-Buyer/Homebuyer";
import Homeguest from "./pages/Home/Home-guest/Homeguest";
import SellerLayout from "./layouts/SellerLayout";
import SellerDashboard from "./pages/Seller/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homeguest />} />
        <Route path="/homeguest" element={<Homeguest />} />
        <Route path="/homebuyer" element={<Homebuyer />} />

        <Route path="/login" element={<Login />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="listings" element={<Listings />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />

        <Route path="/seller" element={<SellerLayout />}>
          <Route index element={<SellerDashboard />} />
          <Route path="dashboard" element={<SellerDashboard />} />
        </Route>
      </Routes>

      {/* --- 2. THÊM CÁI KHUNG HIỂN THỊ NÀY VÀO CUỐI --- */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* ------------------------------------------------ */}
    </BrowserRouter>
  );
}

export default App;
