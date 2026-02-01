import React, { useState } from 'react';
import { 
  Search, Bell, Hourglass, CheckCircle, Zap, 
  MoreVertical, Filter 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
export default function HomeInspector() {
    const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');

  // --- DỮ LIỆU GIẢ LẬP ---
  const stats = [
    { id: 1, title: 'Xe cần kiểm định', value: '12', unit: 'xe', icon: <Hourglass size={24} />, className: 'bg-amber-100 text-amber-600' },
    { id: 2, title: 'Đã xong hôm nay', value: '05', sub: '+20%', unit: 'xe', icon: <CheckCircle size={24} />, className: 'bg-emerald-100 text-emerald-600' },
    { id: 3, title: 'Hiệu suất trung bình', value: '25m', unit: '/ xe', icon: <Zap size={24} />, className: 'bg-blue-100 text-blue-600' },
  ];

  const bikes = [
    { id: 'XE-8821', name: 'Trek Marlin 7', image: 'https://images.unsplash.com/photo-1576435728678-35d01fd18eac?w=100', seller: 'Nguyễn Văn A', phone: '0912 345 678', date: '20/10/2023', status: 'pending', statusText: 'Chờ kiểm định' },
    { id: 'XE-9902', name: 'Giant Escape 2', image: 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=100', seller: 'Trần Thị B', phone: '0988 123 456', date: '21/10/2023', status: 'processing', statusText: 'Đang xử lý' },
    { id: 'XE-7713', name: 'Galaxy ML200', image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=100', seller: 'Lê Văn C', phone: '0905 555 888', date: '19/10/2023', status: 'pending', statusText: 'Chờ kiểm định' },
    { id: 'XE-5511', name: 'Trinx M136', image: 'https://images.unsplash.com/photo-1596483553232-0697945037d0?w=100', seller: 'Hoàng Văn E', phone: '0911 222 333', date: '18/10/2023', status: 'done', statusText: 'Đã hoàn tất' },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending': return 'bg-amber-50 text-amber-700 border border-amber-100';
      case 'processing': return 'bg-blue-50 text-blue-700 border border-blue-100';
      case 'done': return 'bg-emerald-50 text-emerald-700 border border-emerald-100';
      default: return 'bg-gray-50 text-gray-600';
    }
  };

  return (
    <>
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-[#111813] text-3xl font-extrabold tracking-tight">Danh sách kiểm định</h1>
          <p className="text-[#637588] text-sm mt-1">Quản lý và xử lý các yêu cầu kiểm định xe mới nhất.</p>
        </div>
        <div className="flex gap-2">
           <button className="flex items-center gap-2 px-4 py-2 bg-white border border-[#e5e7eb] rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm text-[#637588]">
              <Bell size={18} /> Thông báo
              <span className="flex h-2 w-2 rounded-full bg-red-500 -ml-1"></span>
           </button>
        </div>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.id} className="bg-white rounded-xl p-5 border border-[#e5e7eb] shadow-sm flex flex-col justify-between h-full gap-4 hover:border-emerald-500/50 transition-colors">
            <div className="flex justify-between items-start">
              <div className={`p-2 rounded-lg ${stat.className}`}>
                {stat.icon}
              </div>
              {stat.sub && (
                <span className="flex items-center text-green-600 text-xs font-bold bg-green-50 px-2 py-1 rounded-full">
                  {stat.sub}
                </span>
              )}
            </div>
            <div>
              <p className="text-[#637588] text-sm font-medium">{stat.title}</p>
              <h3 className="text-[#111813] text-2xl font-bold mt-1">
                {stat.value} <span className="text-sm font-normal text-[#9ca3af]">{stat.unit}</span>
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* SEARCH & FILTER */}
      <div className="bg-white p-4 rounded-xl border border-[#e5e7eb] shadow-sm mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af]" size={18} />
          <input 
            type="text" 
            placeholder="Tìm kiếm mã tin, tên xe..." 
            className="w-full pl-10 pr-4 py-2 bg-white border border-[#e5e7eb] rounded-lg text-sm text-[#111813] placeholder-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
          />
        </div>
        
        <div className="flex gap-2">
          {['all', 'pending', 'processing', 'done'].map(tab => {
            const label = { all: 'Tất cả', pending: 'Chờ duyệt', processing: 'Đang xử lý', done: 'Hoàn tất' };
            return (
              <button 
                key={tab}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                  activeTab === tab 
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                    : 'bg-white text-[#637588] border-[#e5e7eb] hover:bg-gray-50'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {label[tab]}
              </button>
            )
          })}
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl border border-[#e5e7eb] shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-[#e5e7eb] flex justify-between items-center">
          <h3 className="text-[#111813] text-lg font-bold">Danh sách xe</h3>
          <button className="flex items-center gap-1 text-sm font-semibold text-[#637588] hover:text-emerald-600">
             <Filter size={16} /> Bộ lọc
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f9fafb]">
                <th className="px-6 py-3 text-xs font-semibold text-[#637588] uppercase">Thông tin xe</th>
                <th className="px-6 py-3 text-xs font-semibold text-[#637588] uppercase">Người bán</th>
                <th className="px-6 py-3 text-xs font-semibold text-[#637588] uppercase">Ngày tạo</th>
                <th className="px-6 py-3 text-xs font-semibold text-[#637588] uppercase">Trạng thái</th>
                <th className="px-6 py-3 text-xs font-semibold text-[#637588] uppercase text-right">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e7eb]">
              {bikes.map((bike) => (
                <tr key={bike.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={bike.image} alt={bike.name} className="w-10 h-10 rounded-lg object-cover border border-[#e5e7eb]" />
                      <div>
                        <p className="font-bold text-[#111813] text-sm">{bike.name}</p>
                        <span className="text-xs text-[#637588] font-mono">{bike.id}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-[#111813]">{bike.seller}</p>
                    <p className="text-xs text-[#637588]">{bike.phone}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-[#637588]">{bike.date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${getStatusBadge(bike.status)}`}>
                      {bike.statusText}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {bike.status === 'pending' && <button onClick={() => navigate(`/inspector/inspection/${bike.id}`)} className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors shadow-sm shadow-emerald-500/30">Kiểm định</button>}
                    {bike.status === 'processing' && <button className="bg-white border border-[#e5e7eb] hover:bg-gray-50 text-[#111813] text-xs font-bold px-3 py-1.5 rounded-lg transition-colors">Tiếp tục</button>}
                    {bike.status === 'done' && <button className="text-[#9ca3af] hover:text-emerald-600 p-1.5 rounded-lg transition-colors"><MoreVertical size={18} /></button>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* --- PAGINATION (PHÂN TRANG) - ĐÃ BỔ SUNG --- */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-[#e5e7eb] bg-white">
            {/* Bên trái: Thông tin số lượng */}
            <div className="text-sm text-[#637588]">
              Hiển thị <span className="font-medium text-[#111813]">1</span> đến <span className="font-medium text-[#111813]">4</span> trong <span className="font-medium text-[#111813]">128</span> tin
            </div>
            
            {/* Bên phải: Các nút điều hướng */}
            <div className="flex items-center gap-1.5">
              <button disabled className="px-3 py-1.5 border border-[#e5e7eb] rounded-lg text-sm text-[#637588] hover:bg-gray-50 hover:text-[#111813] transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                Trước
              </button>
              
              <button className="px-3 py-1.5 border border-emerald-600 bg-emerald-600 text-white rounded-lg text-sm font-medium shadow-sm">
                1
              </button>
              
              <button className="px-3 py-1.5 border border-[#e5e7eb] bg-white text-[#637588] hover:bg-gray-50 hover:text-[#111813] rounded-lg text-sm font-medium transition-colors">
                2
              </button>
              
              <button className="px-3 py-1.5 border border-[#e5e7eb] bg-white text-[#637588] hover:bg-gray-50 hover:text-[#111813] rounded-lg text-sm font-medium transition-colors">
                3
              </button>
              
              <span className="px-1 text-[#637588] select-none">...</span>
              
              <button className="px-3 py-1.5 border border-[#e5e7eb] rounded-lg text-sm text-[#637588] hover:bg-gray-50 hover:text-[#111813] transition-colors">
                Tiếp
              </button>
            </div>
        </div>
        {/* ------------------------------------------- */}

      </div>
    </>
  );
}