import React from 'react';
import { Outlet } from 'react-router-dom';
import InspectorSidebar from './InspectorSidebar'; // Import cái Sidebar vừa tạo

const InspectorLayout = () => {
  return (
    <div className="flex min-h-screen bg-[#f9fafb] font-display text-[#111813]">
      {/* Sidebar cố định bên trái */}
      <InspectorSidebar />

      {/* Nội dung chính thay đổi (Dashboard, History...) */}
      <main className="flex-1 ml-64 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default InspectorLayout;