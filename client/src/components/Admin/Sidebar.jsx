import React, { useState, useEffect } from 'react';
import { LayoutDashboard, FileText, Users, Receipt, List, AlertTriangle, Settings, LogOut, Bike, ChevronDown, ChevronUp, Wallet } from 'lucide-react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import axiosClient from '../../services/axiosClient'; 
import { toast } from 'react-toastify';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Thêm hook này
  const currentPath = location.pathname;

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  
  // State quản lý Dropdown Tổng giao dịch
  const [isTransactionOpen, setIsTransactionOpen] = useState(false);

  useEffect(() => {
    if (currentPath.includes('/admin/transactions') || currentPath.includes('/admin/policy')) {
      setIsTransactionOpen(true);
    }
  }, [currentPath]);

  const isTransactionActive = currentPath.includes('/admin/transactions') || currentPath.includes('/admin/policy') || currentPath.includes('/admin/withdrawals');

  // Chia menu làm 2 phần 
  const menuItemsTop = [
    { icon: LayoutDashboard, label: 'Tổng quan', path: '/admin/dashboard' },
    { icon: FileText, label: 'Tin đăng', path: '/admin/listings' },
    { icon: Users, label: 'Người dùng', path: '/admin/users' },
  ];

  const menuItemsBottom = [
    { icon: List, label: 'Danh mục', path: '/admin/categories' },
    { icon: AlertTriangle, label: 'Khiếu nại', path: '/admin/complaints' },
    { icon: Wallet, label: 'Rút tiền', path: '/admin/withdrawals' }
    
  ];

  // Hàm xử lý khi nhấn "Xác nhận"
  const handleLogout = async () => {
    try {
      await axiosClient.post(
        '/api/Auth/logout',
        {}, 
        { withCredentials: true } 
      );
      toast.success("Đăng xuất thành công!");
    } catch (error) {
      console.error("Lỗi đăng xuất:", error);
    } finally {
      
      localStorage.removeItem('accessToken');
      localStorage.removeItem('role');
      localStorage.removeItem('user');

      setShowLogoutModal(false);
      navigate('/system');
    }
  };

  return (
    <>
      <aside className="w-64 flex-shrink-0 border-r border-[#e5e7eb] bg-surface-light flex flex-col h-full hidden md:flex font-display">
        {/* Logo */}
        <div className="p-6 pb-2">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-600 text-white shadow-sm">
              <Bike size={20} />
            </div>
            <h1 className="text-emerald-700 text-lg font-extrabold tracking-tight">BikeMarket</h1>
          </div>
        </div>
        
        {/* Menu */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <nav className="flex flex-col gap-1.5">
            {/* 1. Render phần trên */}
            {menuItemsTop.map((item, index) => (
              <NavLink 
                key={`top-${index}`}
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

            {/* 2. CỤM DROPDOWN: TỔNG GIAO DỊCH */}
            <div className="flex flex-col">
              <button
                onClick={() => setIsTransactionOpen(!isTransactionOpen)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors w-full text-left ${
                  isTransactionActive
                    ? "bg-emerald-50 text-emerald-700 font-semibold"
                    : "text-[#637588] hover:bg-gray-50 hover:text-emerald-600 font-medium"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Receipt size={20} />
                  <p className="text-sm leading-normal">Tổng giao dịch</p>
                </div>
                {isTransactionOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>

              {/* Menu con xổ xuống */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isTransactionOpen ? "max-h-40 opacity-100 mt-1" : "max-h-0 opacity-0"
                }`}
              >
                <div className="flex flex-col gap-1 pl-11 pr-2 py-1">
                  <NavLink
                    to="/admin/transactions"
                    className={({ isActive }) =>
                      `block px-4 py-2 rounded-lg text-sm transition-colors ${
                        isActive 
                        ? "bg-emerald-500 text-white font-bold shadow-sm" 
                        : "text-[#637588] hover:bg-gray-100 hover:text-[#111813] font-medium"
                      }`
                    }
                  >
                    Giao dịch
                  </NavLink>
                  <NavLink
                    to="/admin/policy"
                    className={({ isActive }) =>
                      `block px-4 py-2 rounded-lg text-sm transition-colors ${
                        isActive 
                        ? "bg-emerald-500 text-white font-bold shadow-sm" 
                        : "text-[#637588] hover:bg-gray-100 hover:text-[#111813] font-medium"
                      }`
                    }
                  >
                    Phí dịch vụ
                  </NavLink>
                </div>
              </div>
            </div>

            {/* 3. Render phần dưới */}
            {menuItemsBottom.map((item, index) => (
              <NavLink 
                key={`bot-${index}`}
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

        {/* User Info & Logout */}
        <div className="p-4 border-t border-[#e5e7eb]">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 p-2 rounded-lg bg-gray-50">
              <img 
                src="https://ui-avatars.com/api/?name=Admin+User&background=10b981&color=fff" 
                className="w-10 h-10 rounded-full border-2 border-emerald-500"
                alt="Admin"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-[#111813] truncate">Admin User</p>
                <p className="text-xs text-[#637588] truncate">Admin</p>
              </div>
            </div>
            
            {/* Nút Đăng xuất: Nhấn vào thì hiện Modal */}
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

      {/* --- POPUP MODAL --- */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm p-6 transform transition-all scale-100">
            {/* Header Modal */}
            <div className="text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 text-red-600">
                <LogOut size={24} />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Đăng xuất?</h3>
              <p className="text-sm text-gray-500 mt-2">
                Bạn có chắc chắn muốn đăng xuất khỏi hệ thống không?
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mt-6">
              <button 
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors"
              >
                Không, ở lại
              </button>
              <button 
                onClick={handleLogout}
                className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors shadow-sm shadow-red-500/30"
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;