import React from "react";
import { Outlet } from "react-router-dom";
import BuyerHeader from "../components/Buyer/Buyerheader";
import Buyerfooter from "../components/Buyer/Buyerfooter";


export default function BuyerLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark text-[#111813] overflow-x-hidden">
      <BuyerHeader />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Buyerfooter />
    </div>
  );
}