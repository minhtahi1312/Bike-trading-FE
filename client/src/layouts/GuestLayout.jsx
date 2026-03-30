
import { Outlet } from "react-router-dom";
import React from "react";
import GuestHeader from "../components/Guest/GuestHeader";
import GuestFooter from "../components/Guest/GuestFooter";
export default function GuestLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark text-[#111813] overflow-x-hidden">
      <GuestHeader />
      <main className="flex-grow">
        <Outlet />
      </main>
      <GuestFooter />
    </div>
  );
}