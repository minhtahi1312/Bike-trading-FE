import { Search, Bell, Plus, MessageSquare } from "lucide-react";

export default function SellerHeader() {
  return (
    <header className="h-16 bg-[#f9fafb] border-b border-[#e5e7eb] px-6 flex items-center justify-between font-display">
      {/* LEFT – SEARCH */}
      <div className="flex items-center gap-2 w-[420px] bg-[#f0f4f2] px-3 py-2 rounded-lg">
        <Search size={18} className="text-[#637588]" />
        <input
          type="text"
          placeholder="Tìm kiếm đơn hàng, tin đăng..."
          className="bg-transparent outline-none text-sm w-full text-[#111813] placeholder-[#637588]"
        />
      </div>

      {/* RIGHT – ACTIONS */}
      <div className="flex items-center gap-4">
        {/* Create post */}
        <button className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-bold rounded-lg shadow-sm shadow-emerald-500/30 transition">
          <Plus size={18} />
          Đăng tin mới
        </button>

        {/* Notification */}
        <button className="relative w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition">
          <Bell size={20} className="text-[#637588]" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        <button className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition">
          <MessageSquare size={20} className="text-[#637588]" />
        </button>
      </div>
    </header>
  );
}
