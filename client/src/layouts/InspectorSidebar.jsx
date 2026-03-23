import React, { useState } from 'react';
import { LayoutDashboard, History, User, LogOut, Bike } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import axiosClient from '../services/axiosClient';
import { toast } from 'react-toastify';

const InspectorSidebar = () => {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Menu riêng cho Inspector
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/inspector/dashboard' },
    { icon: History, label: 'Lịch sử kiểm định', path: '/inspector/history' },
    { icon: User, label: 'Hồ sơ cá nhân', path: '/inspector/profile' },
  ];

  const handleLogout = async () => {
    try {
      await axiosClient.post('/api/Auth/logout');
    } catch (error) {
      console.warn("Lỗi gọi API Logout, tiến hành dọn dẹp LocalStorage:", error);
    } finally {
      localStorage.clear();
      
      setShowLogoutModal(false);

      // Thông báo và chuyển hướng
      toast.success("Đã đăng xuất khỏi tài khoản Kiểm định viên!");
      navigate('/login');
    }
  };

  return (
    <>
      <aside className="w-64 flex-shrink-0 border-r border-[#e5e7eb] bg-white flex flex-col h-full hidden md:flex font-display fixed inset-y-0 left-0 z-50">
        
        {/*  1. LOGO SECTION (Giống hệt Admin) */}
        <div className="p-6 pb-2">
          <div className="flex items-center gap-3">
            {/* Khối xanh bao quanh icon */}
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-600 text-white shadow-sm">
              <Bike size={20} />
            </div>
            {/* Chữ BikeMarket */}
            <h1 className="text-emerald-700 text-lg font-extrabold tracking-tight">BikeMarket</h1>
          </div>
        </div>
        
        {/* 2. MENU */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <div className="px-3 py-2 text-xs font-bold text-[#9ca3af] uppercase tracking-wider mb-1">
            Inspector Portal
          </div>

          <nav className="flex flex-col gap-1.5">
            {menuItems.map((item, index) => (
              <NavLink 
                key={index}
                to={item.path}
                className={({ isActive }) => 
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group ${
                    isActive 
                    ? 'bg-emerald-50 text-emerald-700 font-semibold' 
                    : 'text-[#637588] hover:bg-gray-50 hover:text-emerald-600 font-medium'
                  }`
                }
              >
                <item.icon size={20} />
                <p className="text-sm leading-normal">{item.label}</p>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* 3. USER INFO & LOGOUT */}
        <div className="p-4 border-t border-[#e5e7eb]">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 p-2 rounded-lg bg-gray-50 border border-gray-100">
              <img 
                src="https://i.pravatar.cc/150?img=11" 
                className="w-10 h-10 rounded-full border-2 border-emerald-500"
                alt="KV"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-[#111813] truncate">Nguyễn Văn Kiểm</p>
                <p className="text-xs text-[#637588] truncate">Inspector Senior</p>
              </div>
            </div>
            
            <button 
              onClick={() => setShowLogoutModal(true)}
              className="flex items-center gap-3 px-2 text-[#637588] hover:text-red-600 transition-colors w-full text-left"
            >
              <LogOut size={20} />
              <p className="text-sm font-medium">Đăng xuất</p>
            </button>
          </div>
        </div>
      </aside>

      {/* POPUP LOGOUT */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200 font-display">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm p-6 transform transition-all scale-100">
            <div className="text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 text-red-600">
                <LogOut size={24} />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Đăng xuất?</h3>
              <p className="text-sm text-gray-500 mt-2">
                Bạn có chắc chắn muốn đăng xuất khỏi hệ thống không?
              </p>
            </div>

            <div className="flex gap-3 mt-6">
              <button 
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors"
              >
                Hủy bỏ
              </button>
              <button 
                onClick={handleLogout}
                className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors shadow-sm shadow-red-500/30"
              >
                Đăng xuất
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default InspectorSidebar;