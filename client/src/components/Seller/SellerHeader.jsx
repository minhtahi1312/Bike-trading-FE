import { Search, Bell, Plus, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

export default function SellerHeader() {
  return (
    <header className="h-16 bg-[#f9fafb] border-b border-[#e5e7eb] px-6 flex items-center justify-between font-display">
      {/* LEFT – SEARCH */}
      <div className="flex items-center gap-2 w-[420px]"></div>

      {/* RIGHT – ACTIONS */}
      <div className="flex items-center gap-4">
        <Link
          to="/seller/create-listing"
          className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-bold rounded-lg shadow-sm shadow-emerald-500/30 transition"
        >
          <Plus size={18} />
          Đăng tin mới
        </Link>
      </div>
    </header>
  );
}
