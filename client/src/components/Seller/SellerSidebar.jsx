import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  ShoppingCart,
  MessageCircle,
  Wallet,
  LogOut,
  Bike,
} from "lucide-react";

const menu = [
  { icon: LayoutDashboard, label: "Tổng quan", path: "/seller/dashboard" },
  { icon: FileText, label: "Tin đăng", path: "/seller/listings" },
  { icon: ShoppingCart, label: "Đơn hàng", path: "/seller/orders" },
  { icon: MessageCircle, label: "Tin nhắn", path: "/seller/messages" },
  { icon: Wallet, label: "Ví tiền", path: "/seller/wallet" },
];

export default function SellerSidebar() {
  return (
    <aside className="w-64 hidden md:flex flex-col border-r border-[#e5e7eb] bg-white">
      {/* LOGO */}
      <div className="p-6 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
            <Bike size={20} />
          </div>
          <h1 className="text-lg font-extrabold text-emerald-700 tracking-tight">
            BikeMarket
          </h1>
        </div>
      </div>

      {/* MENU */}
      <nav className="flex-1 px-4 space-y-1">
        {menu.map((item, i) => (
          <NavLink
            key={i}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition ${
                isActive
                  ? "bg-emerald-50 text-emerald-700 font-semibold"
                  : "text-[#637588] hover:bg-gray-50 hover:text-emerald-600 font-medium"
              }`
            }
          >
            <item.icon size={20} />
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* USER */}
      <div className="p-4 border-t border-[#e5e7eb]">
        <div className="flex items-center gap-3 p-2 rounded-lg bg-gray-50">
          <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold">
            S
          </div>
          <div>
            <p className="text-sm font-bold text-[#111813]">Seller</p>
            <p className="text-xs text-[#637588]">Cửa hàng</p>
          </div>
        </div>

        <button className="mt-4 flex items-center gap-3 text-sm text-[#637588] hover:text-red-600">
          <LogOut size={18} />
          Đăng xuất
        </button>
      </div>
    </aside>
  );
}
