import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Admin/Sidebar';
import { Menu } from 'lucide-react';

const AdminLayout = () => {
  return (
    <div className="flex h-screen w-full bg-background-light overflow-hidden font-display">
      <Sidebar />
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        <header className="lg:hidden flex items-center justify-between border-b border-[#e5e7eb] bg-surface-light px-6 py-3 flex-shrink-0 z-10">
          <div className="flex items-center gap-4 lg:hidden">
            <button className="p-1 rounded-md hover:bg-gray-100">
              <Menu />
            </button>
            <div className="text-[#111813] font-bold text-emerald-700">BikeMarket</div>
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