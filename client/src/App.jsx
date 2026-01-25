import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';
import Dashboard from './pages/Admin/Dashboard';
import Login from './pages/Login/Login';
import Listings from './pages/Admin/Listings';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 1. Route cho trang Login */}
        <Route path="/login" element={<Login />} />
        
        {/* 2. Route cho khu vực Admin (Có Sidebar & Header bao quanh) */}
        <Route path="/admin" element={<AdminLayout />}>
          {/* Khi vào /admin thì tự động nhảy sang /admin/dashboard */}
          <Route index element={<Navigate to="dashboard" replace />} />
          
          {/* Trang Dashboard chính */}
          <Route path="dashboard" element={<Dashboard />} />
          
          <Route path="listings" element={<Listings />} />
        </Route>

        {/* 3. Mặc định: Nếu gõ linh tinh thì chuyển về trang Login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;