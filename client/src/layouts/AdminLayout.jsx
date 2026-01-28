import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Admin/Sidebar';
import { Search, Bell, Menu } from 'lucide-react';

const AdminLayout = () => {
  return (
    <div className="flex h-screen w-full bg-background-light overflow-hidden font-display">
      <Sidebar />
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        <header className="flex items-center justify-between border-b border-[#e5e7eb] bg-surface-light px-6 py-3 flex-shrink-0 z-10">
          <div className="flex items-center gap-4 lg:hidden">
            <button className="p-1 rounded-md hover:bg-gray-100">
              <Menu />
            </button>
            <div className="text-[#111813] font-bold text-emerald-700">BikeMarket</div>
          </div>

          <div className="hidden lg:flex flex-1 max-w-[480px]">
            <div className="flex w-full items-center rounded-lg h-10 bg-[#f0f4f2] px-3 gap-2 border border-transparent focus-within:border-emerald-500/50 transition-all">
              <Search size={18} className="text-[#61896f]" />
              <input 
                className="w-full bg-transparent border-none text-[#111813] placeholder:text-[#61896f] focus:outline-none text-sm" 
                placeholder="Tìm kiếm người dùng, tin đăng..."
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-4">
            <button className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-[#f0f4f2] text-[#111813] transition-colors">
              <Bell size={20} />
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto bg-background-light p-6 lg:p-10">
           <div className="max-w-[1200px] mx-auto">
              <Outlet />
           </div>
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;