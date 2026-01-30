import { Outlet } from "react-router-dom";
import SellerSidebar from "../components/Seller/SellerSidebar";
import SellerHeader from "../components/Seller/SellerHeader";

export default function SellerLayout() {
  return (
    <div className="flex min-h-screen bg-[#f9fafb] font-display">
      {/* SIDEBAR */}
      <SellerSidebar />

      {/* MAIN */}
      <div className="flex flex-col flex-1 min-w-0">
        <SellerHeader />

        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
