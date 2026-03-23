import { Bell, Bike, Heart, Search, ShoppingCart } from "lucide-react";
import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import axiosClient from "../../services/axiosClient";

const BuyerHeader = () => {
  
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const toggleMenu = () => setIsOpen(!isOpen);

  /*----------------*/
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const handleWishlistClick = () => {
    navigate("/homebuyer/wishlist");
  };
  const CartBuyerClick = () => {
    navigate("/homebuyer/cart");
  };
  const HomeBuyerClick = () => {
    navigate("/homebuyer");
  };
  const handleLogout = async () => {
    try {
      // Gọi API Logout
      await axiosClient.post("/api/Auth/logout");
    } catch (error) {
      console.warn(
        "Lỗi gọi API Logout, tiến hành dọn dẹp LocalStorage:",
        error,
      );
    } finally {
      // Dọn sạch toàn bộ dữ liệu ở Frontend
      localStorage.clear();
      setIsOpen(false);
      toast.success("Đăng xuất thành công!");
      navigate("/login");
    }
  };

  return (
    <div className="w-full bg-white border-b border-[#e5e7eb] sticky top-0 z-50">
      <div className="w-full ">
        <header className="flex items-center justify-between whitespace-nowrap px-4 lg:px-10 py-3">
          <div className="flex items-center gap-8">
            <div className="p-6 pb-2">
              <button onClick={HomeBuyerClick}>
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-600 text-white shadow-sm">
                    <Bike size={20} />
                  </div>
                  <h1 className="text-emerald-700 text-lg font-extrabold tracking-tight">
                    BikeMarket
                  </h1>
                </div>
              </button>
            </div>
          </div>
          <div className="flex flex-1 justify-end gap-4 lg:gap-8 items-center">
            <div className="flex gap-3 items-center">
              <button onClick={CartBuyerClick}>
                <span className="material-symbols-outlined">
                  <ShoppingCart strokeWidth={3} />
                </span>
                <span className="absolute top-1 right-1 size-2 bg-red-500 rounded-full border-2 border-surface-light dark:border-surface-dark"></span>
              </button>

              <button
                onClick={handleWishlistClick}
                className="flex size-10 items-center justify-center rounded-lg bg-[#f0f4f2] hover:bg-[#e2e8e5] text-[#111813]"
                title="Xe yêu thích"
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: "24px" }}
                >
                  <Heart strokeWidth={3} />
                </span>
              </button>
              <div className="relative inline-block" ref={menuRef}>
                {/* Nút Avatar (Đoạn code của bạn) */}
                <div
                  onClick={toggleMenu}
                  className="bg-center bg-no-repeat bg-cover rounded-full size-10 border-2 border-white shadow-sm cursor-pointer hover:ring-2 hover:ring-gray-300 transition-all"
                  style={{
                    backgroundImage:
                      'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAZCJXctLpVot0sNndJ_n88PWplpqfErAYBxhjyKuEFyzpVqzM0q-QEhhhKelYBZXtQuzTukcrh9QJlVsvuw5zQRjtx7FPCiFEi-M-_omZTS8NfM3F__UI4r56M2QUnEWQjujdXVGezT9q1iD_YRe3bHiyNsOnH0E7qhSFJPCry3HPr1XNXc58j68uD2qBcjga6QVTOf0LN1VY-DRe8p70sQ5-3ea3N-iDTXhbhUKHFJMl94OLjIcCuPvdoN7gsQ0lN10GhzvSyS4bo")',
                  }}
                ></div>

                {/* Dropdown Menu */}
                {isOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-100 z-50 overflow-hidden">
                    <ul className="py-1 text-sm text-gray-700">
                      <li>
                        <button
                          onClick={() => navigate("/homebuyer/order")}
                          className="w-full text-left"
                        >
                          <a className="block px-4 py-2 hover:bg-gray-100 transition-colors">
                            Đơn hàng của tôi
                          </a>
                        </button>
                      </li>
                      <hr className="border-gray-100 my-1" />
                      <li>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 transition-colors"
                        >
                          Đăng xuất
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>
      </div>
    </div>
  );
};

export default BuyerHeader;
