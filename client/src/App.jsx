import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



import AdminLayout from './layouts/AdminLayout';
import Dashboard from './pages/Admin/Dashboard';
import Listings from './pages/Admin/Listings';
import Login from './pages/Login/Login';
import Homebuyer from './pages/Home/Home-Buyer/Homebuyer';
import Wishlistbuyer from './pages/Home/Home-Buyer/Wishlistbuyer';
import CartBuyer from './pages/Home/Home-Buyer/CartBuyer';
import Homeguest from './pages/Home/Home-guest/Homeguest';
import HomeInspector from './pages/Inspector/HomeInspector';
import InspectorLayout from './layouts/InspectorLayout';
import InspectionDetail from './pages/Inspector/InspectionDetail';
import InspectionChecklist from './pages/Inspector/InspectionChecklist';
import InspectionResult from './pages/Inspector/InspectionResult';
import InspectionFinalConfirmation from './pages/Inspector/InspectionFinalConfirmation';
import SellerLayout from './layouts/SellerLayout';
import SellerDashboard from "./pages/Seller/Dashboard";
import BuyerLayout from './layouts/BuyerLayout';
import PaymentBuyer from './pages/Home/Home-Buyer/PaymentBuyer';
import CarDetail from './pages/Home/Home-Buyer/Details/CarDetail';
import OderBuyer from './pages/Home/Home-Buyer/OderBuyer';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homeguest />} />
        <Route path="/homeguest" element={<Homeguest />} />

        <Route path="/homebuyer" element={<BuyerLayout />}>
          <Route index element={<Homebuyer />} />
          <Route path="wishlist" element={<Wishlistbuyer />} />
          <Route path="cart" element={<CartBuyer />} />
          <Route path="payment" element={<PaymentBuyer />} />
          <Route path="details/:id" element={<CarDetail />} />
          <Route path="oder" element={<OderBuyer />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/inspector" element={<InspectorLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<HomeInspector />} />
          <Route path="inspection/:id" element={<InspectionDetail />} />
          <Route path="checklist/:id" element={<InspectionChecklist />} />
          <Route path="result/:id" element={<InspectionResult />} />
          <Route path="confirm/:id" element={<InspectionFinalConfirmation />} />
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="listings" element={<Listings />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />

        <Route path="/seller" element={<SellerLayout />}>
          <Route index element={<SellerDashboard />} />
          <Route path="dashboard" element={<SellerDashboard />} />
          <Route path="listings" element={<SellerListings />} />
          <Route path="orders" element={<SellerOrders />} />
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
