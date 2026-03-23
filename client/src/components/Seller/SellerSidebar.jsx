import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Star } from "lucide-react";
import { AlertTriangle } from "lucide-react";
import {
  LayoutDashboard,
  FileText,
  ShoppingCart,
  Wallet,
  LogOut,
  Bike,
} from "lucide-react";
import { useState } from "react";
import axiosClient from "../../services/axiosClient";

const menu = [
  { icon: LayoutDashboard, label: "Tổng quan", path: "/seller/dashboard" },
  { icon: FileText, label: "Tin đăng", path: "/seller/listings" },
  { icon: ShoppingCart, label: "Đơn hàng", path: "/seller/orders" },
  {
    icon: Star,
    label: "Đánh giá & Uy tín",
    path: "/seller/reviews",
  },

  {
    icon: AlertTriangle,
    label: "Khiếu nại",
    path: "/seller/reports",
  },
  {
    icon: Wallet,
    label: "Ví tiền",
    children: [
      { label: "Tài chính", path: "/seller/wallet" },
      { label: "Giao dịch", path: "/seller/transactions" },
    ],
  },
];

export default function SellerSidebar() {
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(null);
  const handleLogout = async () => {
    try {
      // Gọi API Logout để BE dọn Session và Cookie refreshToken
      await axiosClient.post("/api/Auth/logout");
    } catch (error) {
      console.warn("Lỗi gọi API Logout, tiến hành dọn dẹp FE:", error);
    } finally {
      // Dọn sạch toàn bộ LocalStorage
      localStorage.clear();

      toast.success("Đăng xuất thành công");

      // Chuyển hướng về trang login
      navigate("/login", { replace: true });
    }
  };

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
        {menu.map((item, i) => {
          if (item.children) {
            const isOpen = openMenu === i;

            return (
              <div key={i}>
                {/* PARENT */}
                <button
                  onClick={() => setOpenMenu(isOpen ? null : i)}
                  className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium text-[#637588] hover:bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <item.icon size={20} />
                    {item.label}
                  </div>

                  {/* icon mũi tên */}
                  <span
                    className={`transition-transform ${isOpen ? "rotate-90" : ""}`}
                  >
                    ▶
                  </span>
                </button>

                {/* CHILDREN */}
                <div
                  className={`ml-6 overflow-hidden transition-all duration-300 ${
                    isOpen ? "max-h-40 mt-1" : "max-h-0"
                  }`}
                >
                  <div className="relative pl-4 space-y-1">
                    {/* ĐƯỜNG DỌC */}
                    <div className="absolute left-1 top-0 bottom-0 w-[2px] bg-gray-200"></div>

                    {item.children.map((child, j) => (
                      <NavLink
                        key={j}
                        to={child.path}
                        className={({ isActive }) =>
                          `relative block px-3 py-2 rounded-lg text-sm transition ${
                            isActive
                              ? "bg-emerald-50 text-emerald-700 font-semibold"
                              : "text-[#637588] hover:bg-gray-50 hover:text-emerald-600"
                          }`
                        }
                      >
                        {/* ĐƯỜNG NGANG */}
                        <span className="absolute left-[-12px] top-1/2 w-3 h-[2px] bg-gray-200"></span>

                        {child.label}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>
            );
          }

          return (
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
          );
        })}
      </nav>

      {/* USER */}
      <div className="p-4 border-t border-[#e5e7eb]">
        <div className="flex items-center gap-3 p-2 rounded-lg bg-gray-50">
          <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold">
            S
          </div>
          <div>
            <p className="text-sm font-bold text-[#111813]">Trần Anh Tuấn</p>
            <p className="text-xs text-[#637588]">Cửa hàng</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="mt-4 flex items-center gap-3 text-sm text-[#637588] hover:text-red-600"
        >
          <LogOut size={18} />
          Đăng xuất
        </button>
      </div>
    </aside>
  );
}
