import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Star } from "lucide-react";
import { AlertTriangle } from "lucide-react";
import { useEffect, useState } from "react";
import { getMe } from "../../services/axiosClient";

import {
  LayoutDashboard,
  FileText,
  ShoppingCart,
  Wallet,
  LogOut,
  Bike,
} from "lucide-react";

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
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(null);
  const handleLogout = async () => {
    try {
      await axiosClient.post("/api/Auth/logout");
    } catch (error) {
      console.warn("Lỗi gọi API Logout, tiến hành dọn dẹp FE:", error);
    } finally {
      localStorage.clear();

      toast.success("Đăng xuất thành công");

      navigate("/login", { replace: true });
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getMe();
        setUser(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
  }, []);

  return (
    <>
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

                    <span
                      className={`transition-transform ${isOpen ? "rotate-90" : ""}`}
                    >
                      ▶
                    </span>
                  </button>

                  <div
                    className={`ml-6 overflow-hidden transition-all duration-300 ${
                      isOpen ? "max-h-40 mt-1" : "max-h-0"
                    }`}
                  >
                    <div className="relative pl-4 space-y-1">
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
          <div
            onClick={() => navigate("/seller/profile")}
            className="flex items-center gap-3 p-2 rounded-lg bg-gray-50 cursor-pointer hover:bg-gray-100 transition"
          >
            <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold">
              {user?.fullName?.charAt(0)?.toUpperCase() || "U"}
            </div>
            <div>
              <p className="text-sm font-bold text-[#111813]">
                {user?.fullName || "Loading..."}
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowLogoutModal(true)}
            className="mt-4 flex items-center gap-3 text-sm text-[#637588] hover:text-red-600"
          >
            <LogOut size={18} />
            Đăng xuất
          </button>
        </div>
      </aside>
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-80 shadow-lg">
            <h3 className="text-lg font-bold mb-4">Xác nhận đăng xuất</h3>

            <p className="text-sm text-gray-600 mb-6">
              Bạn có chắc muốn đăng xuất khỏi hệ thống?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 rounded-lg border"
              >
                Huỷ
              </button>

              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg bg-red-500 text-white"
              >
                Đăng xuất
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
