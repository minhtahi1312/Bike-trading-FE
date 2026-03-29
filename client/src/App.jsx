import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from "react-hot-toast";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/Admin/Dashboard";
import Listings from "./pages/Admin/Listings";
import WithdrawalManagement from "./pages/Admin/WithdrawalManagement";
import Login from "./pages/Login/Login";
import StaffLogin from "./pages/Login/StaffLogin";
import ResetPassword from './pages/Login/ResetPassword'
import Homebuyer from "./pages/Home/Home-Buyer/Homebuyer";
import Wishlistbuyer from "./pages/Home/Home-Buyer/Wishlistbuyer";
import CartBuyer from "./pages/Home/Home-Buyer/CartBuyer";
import Homeguest from "./pages/Home/Home-guest/Homeguest";
import HomeInspector from "./pages/Inspector/HomeInspector";
import InspectorLayout from "./layouts/InspectorLayout";
import InspectionPage from "./pages/Inspector/InspectionPage";
import HistoryInspector from "./pages/Inspector/HistoryInspector";
import InspectionHistoryDetail from "./pages/Inspector/InspectionHistoryDetail";
import InspectorProfile from "./pages/Inspector/InspectorProfile";
import SellerLayout from "./layouts/SellerLayout";
import SellerDashboard from "./pages/Seller/Dashboard";
import SellerReview from "./pages/Seller/Review";
import SellerReport from "./pages/Seller/Report";

import SellerListings from "./pages/Seller/Listing";
import SellerOrders from "./pages/Seller/Orders";
import Users from "./pages/Admin/Users";
import Policy from "./pages/Admin/Policy";
import Categories from "./pages/Admin/Categories";
import ListingDetail from "./pages/Admin/ListingDetail";
import Complaints from "./pages/Admin/Complaints";
import Transactions from "./pages/Admin/Transactions";
import SellerListingDetail from "./pages/Seller/ListingDetail";
import SellerOrderDetail from "./pages/Seller/OrderDetail";
import CreateListing from "./pages/Seller/CreateListing";

import Wallet from "./pages/Seller/Wallet";
import Withdraw from "./pages/Seller/Withdraw";
import TransactionsPage from "./pages/Seller/TransactionsPage";

import BuyerLayout from "./layouts/BuyerLayout";
import PaymentBuyer from "./pages/Home/Home-Buyer/PaymentBuyer";
import BikeDetailPage from "./pages/Home/Home-Buyer/DetailsBuyer";
import OderBuyer from "./pages/Home/Home-Buyer/OderBuyer";
import CheckoutPage from "./pages/Home/Home-Buyer/CheckOutBuyer";
import OrderDetail from "./pages/Home/Home-Buyer/OderDetails";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Homeguest />} />
        <Route path="/homeguest" element={<Homeguest />} />

        <Route path="/homebuyer" element={<BuyerLayout />}>
          <Route index element={<Homebuyer />} />
          <Route path="wishlist" element={<Wishlistbuyer />} />
          <Route path="cart" element={<CartBuyer />} />
          <Route path="payment/:id" element={<PaymentBuyer />} />
          <Route path="details/:id" element={<BikeDetailPage />} />
          <Route path="order" element={<OderBuyer />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="order/:id" element={<OrderDetail />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/system" element={<StaffLogin />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/inspector" element={<InspectorLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<HomeInspector />} />
          <Route path="inspect/:id" element={<InspectionPage />} />
          <Route path="history" element={<HistoryInspector />} />
          <Route path="history/:id" element={<InspectionHistoryDetail />} />
          <Route path="profile" element={<InspectorProfile />} />
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="listings" element={<Listings />} />
          <Route path="users" element={<Users />} />
          <Route path="policy" element={<Policy />} />
          <Route path="categories" element={<Categories />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="listings/:id" element={<ListingDetail />} />
          <Route path="complaints" element={<Complaints />} />
          <Route path="withdrawals" element={<WithdrawalManagement />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />

        <Route path="/seller" element={<SellerLayout />}>
          <Route index element={<SellerDashboard />} />
          <Route path="dashboard" element={<SellerDashboard />} />
          <Route path="listings" element={<SellerListings />} />
          <Route path="orders" element={<SellerOrders />} />
          <Route path="listings/:id" element={<SellerListingDetail />} />
          <Route path="orders/:id" element={<SellerOrderDetail />} />
          <Route path="create-listing" element={<CreateListing />} />
          <Route path="edit-listing/:id" element={<CreateListing />} />
          <Route path="reviews" element={<SellerReview />} />
          <Route path="reports" element={<SellerReport />} />

          <Route path="wallet" element={<Wallet />} />
          <Route path="withdraw" element={<Withdraw />} />
          <Route path="transactions" element={<TransactionsPage />} />
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
