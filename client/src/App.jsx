import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';


import AdminLayout from './layouts/AdminLayout';
import Dashboard from './pages/Admin/Dashboard';
import Listings from './pages/Admin/Listings';
import Login from './pages/Login/Login';
import Homebuyer from './pages/Home/Home-Buyer/Homebuyer';
import Homeguest from './pages/Home/Home-guest/Homeguest';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homeguest />} />
        <Route path="/homeguest" element={<Homeguest />} />
        <Route path="/homebuyer" element={<Homebuyer />} />
        
        <Route path="/login" element={<Login />} />
        
        <Route path="/admin" element={<AdminLayout />}>
          {/* Vào /admin tự nhảy sang dashboard */}
          <Route index element={<Navigate to="dashboard" replace />} />
          
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="listings" element={<Listings />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;