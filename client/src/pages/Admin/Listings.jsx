import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosClient from "../../services/axiosClient";
import {
  Plus, Search, Calendar, Filter, Eye, Check, X,
  MoreVertical, Star, AlertCircle, Clock
} from 'lucide-react';

const Listings = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const [data, setData] = useState([]); 
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const fetchListData = async (tabId) => {
  setIsLoading(true);
  try {
    // Ánh xạ Tab ID với Endpoint tương ứng dựa trên ảnh bạn cung cấp
    const apiMap = {
      'pending': '/api/admin/listing/pending-list',     //
      'inspecting': '/api/admin/listing/inspecting-list', //
      'public': '/api/admin/listing/active-list',        //
      'rejected': '/api/admin/listing/rejected-list',    //
      'all': '/api/admin/listing/pending-list'           // Tạm thời để pending khi chưa có API tổng hợp
    };

    const endpoint = apiMap[tabId] || apiMap.pending;
    const response = await axiosClient.get(endpoint);
    
    // Nếu API rỗng (như ảnh 4), response.data sẽ là []
    setData(response.data);
  } catch (error) {
    console.error(`Lỗi fetch API cho tab ${tabId}:`, error);
    setData([]); // Trả về mảng rỗng nếu lỗi để tránh crash giao diện
  } finally {
    setIsLoading(false);
  }
};
useEffect(() => {
  fetchListData(activeTab);
}, [activeTab]);

  const handleViewDetail = (id) => {
    navigate(`/admin/listings/${id}`);
  };
  

  const tabs = [
    { id: 'all', label: 'Tất cả' },
    { id: 'pending', label: 'Chờ duyệt', count: 15 },
    { id: 'inspecting', label: 'Đang kiểm định' },
    { id: 'public', label: 'Đã công khai' },
    { id: 'rejected', label: 'Bị từ chối' },
  ];

  const renderBadge = (text, color) => {
    const colors = {
      gray: 'bg-gray-100 text-gray-600',
      yellow: 'bg-yellow-50 text-yellow-700 border border-yellow-200',
      purple: 'bg-purple-50 text-purple-700 border border-purple-200',
      green: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
      blue: 'bg-blue-50 text-blue-700 border border-blue-200',
      red: 'bg-red-50 text-red-700 border border-red-200',
    };
    return (
      <span className={`inline-flex items-center justify-center px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap min-w-[90px] ${colors[color] || colors.gray}`}>
        {text}
      </span>
    );
  };

  // Hàm xử lý khi ảnh bị lỗi (QUAN TRỌNG)
  const handleImageError = (e) => {
    e.target.src = "https://placehold.co/400x300?text=No+Image"; // Ảnh thay thế nếu link chính bị hỏng
  };

  return (
    <div className="flex flex-col gap-6 font-display text-[#111813]">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Kiểm duyệt Tin đăng</h1>
          <p className="text-[#637588] text-sm mt-2 max-w-2xl">
            Xem xét và xử lý các tin đăng bán xe từ người bán. Đảm bảo chất lượng nội dung và an toàn cho người mua.
          </p>
        </div>

        <div className="flex gap-3">
          <div className="bg-white px-4 py-2 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center min-w-[100px]">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Cần duyệt</span>
            <span className="text-xl font-bold text-[#111813]">
              {isLoading ? '...' : data.length}
            </span>
          </div>
          <div className="bg-white px-4 py-2 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center min-w-[100px]">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Hôm nay</span>
            <span className="text-xl font-bold text-[#111813]">42</span>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT CARD */}
      <div className="bg-white border border-[#e5e7eb] rounded-xl shadow-sm flex flex-col min-h-[600px]">

        {/* TABS */}
        <div className="flex overflow-x-auto border-b border-[#e5e7eb] px-6">
         {tabs.map((tab) => (
  <button
    key={tab.id}
    onClick={() => setActiveTab(tab.id)}
    className={`py-4 px-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap flex items-center gap-2 ${
      activeTab === tab.id
        ? 'border-emerald-600 text-emerald-700'
        : 'border-transparent text-[#637588] hover:text-[#111813]'
    }`}
  >
    {tab.label}
    
    {/* LOGIC MỚI: Chỉ hiển thị số lượng của Tab đang được chọn */}
    {activeTab === tab.id && !isLoading && (
      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 animate-in fade-in zoom-in">
        {data.length}
      </span>
    )}
  </button>
))}
        </div>

        {/* TOOLBAR */}
        <div className="p-5 flex flex-col sm:flex-row gap-3 justify-between items-center bg-[#fcfdfd]">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Tìm kiếm theo mã tin, tên xe, hoặc người bán..."
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 text-[#637588]">
              <Calendar size={16} /> Thời gian
            </button>
            <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 text-[#637588]">
              <Filter size={16} /> Bộ lọc
            </button>
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f9fafb] border-y border-[#e5e7eb]">
                <th className="px-6 py-3 w-[50px]">
                  <input type="checkbox" className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" />
                </th>
                <th className="px-6 py-3 text-xs font-bold text-[#637588] uppercase tracking-wider">Thông tin xe</th>
                <th className="px-6 py-3 text-xs font-bold text-[#637588] uppercase tracking-wider">Người bán</th>
                <th className="px-6 py-3 text-xs font-bold text-[#637588] uppercase tracking-wider">Giá bán</th>
                <th className="px-6 py-3 text-xs font-bold text-[#637588] uppercase tracking-wider text-center">Inspector</th>
                <th className="px-6 py-3 text-xs font-bold text-[#637588] uppercase tracking-wider text-center">Trạng thái</th>
                <th className="px-6 py-3 text-xs font-bold text-[#637588] uppercase tracking-wider text-right">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e7eb]">
  {/* TRƯỜNG HỢP 1: ĐANG TẢI DỮ LIỆU */}
  {isLoading ? (
    <tr>
      <td colSpan="7" className="px-6 py-20 text-center">
        <div className="flex flex-col items-center gap-3">
          {/* Vòng xoay loading */}
          <div className="w-10 h-10 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
          <p className="text-sm text-gray-500 font-medium">Đang tải dữ liệu tin đăng...</p>
        </div>
      </td>
    </tr>
  ) : data && data.length > 0 ? (
    /* TRƯỜNG HỢP 2: CÓ DỮ LIỆU (HIỂN THỊ DANH SÁCH) */
    data.map((item) => {
      const isRiskyOrRejected = item.status === 'Từ chối'; // Tùy biến điều kiện làm mờ dòng

      return (
        <tr
          key={item.id}
          className={`hover:bg-gray-50 group transition-colors border-b border-gray-100 ${
            isRiskyOrRejected ? 'opacity-50 bg-gray-50/50 grayscale-[30%]' : ''
          }`}
        >
          {/* 1. Checkbox */}
          <td className="px-6 py-4">
            <input type="checkbox" className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" />
          </td>

          {/* 2. Thông tin xe */}
          <td className="px-6 py-4">
            <div className="flex gap-4">
              <div className="w-16 h-12 rounded-lg overflow-hidden border border-gray-200 flex-shrink-0 bg-gray-50">
                <img 
                  src={item.thumbnail || "https://placehold.co/400x300?text=No+Image"} 
                  alt={item.title}
                  className="w-full h-full object-cover" 
                  onError={handleImageError}
                />
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-emerald-600 mb-0.5">#{item.id.substring(0, 8).toUpperCase()}</span>
                <span className="text-sm font-bold text-[#111813] line-clamp-1">{item.title}</span>
                <div className="flex items-center gap-2 text-xs text-[#637588] mt-1">
                  <Clock size={10} /> 
                  <span>{new Date(item.createdAt).toLocaleDateString('vi-VN')}</span>
                </div>
              </div>
            </div>
          </td>

          {/* 3. Người bán */}
          <td className="px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-xs font-bold text-emerald-700">
                {item.sellerName ? item.sellerName.charAt(0).toUpperCase() : 'U'}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-[#111813]">{item.sellerName || 'Chưa rõ'}</span>
                <span className="text-[10px] text-[#637588]">Thành viên BikeStore</span>
              </div>
            </div>
          </td>

          {/* 4. Giá bán */}
          <td className="px-6 py-4">
            <div className="text-sm font-bold text-[#111813]">
              {item.price ? `${item.price.toLocaleString('vi-VN')} đ` : 'Liên hệ'}
            </div>
          </td>

          {/* 5. Inspector */}
          <td className="px-6 py-4 text-center">
            {renderBadge(item.inspectorName || 'Chưa có', item.inspectorName === 'Chưa có' ? 'gray' : 'purple')}
          </td>

          {/* 6. Trạng thái */}
          <td className="px-6 py-4 text-center">
            <div className="flex flex-col items-center gap-1">
              {/* Badge động theo status từ API */}
              {renderBadge(item.status === 1 ? 'Chờ duyệt' : 'Khác', item.status === 1 ? 'yellow' : 'blue')}
              <span className="text-[10px] text-[#9ca3af] flex items-center gap-1">
                <Clock size={10} /> {new Date(item.createdAt).toLocaleDateString('vi-VN')}
              </span>
            </div>
          </td>

          {/* 7. Hành động */}
          <td className="px-6 py-4 text-right">
            <div className="flex justify-end gap-2">
              <button 
                onClick={() => handleViewDetail(item.id)} 
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-50 text-gray-500 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                title="Xem chi tiết"
              >
                <Eye size={16} />
              </button>
            </div>
          </td>
        </tr>
      );
    })
  ) : (
    /* TRƯỜNG HỢP 3: DỮ LIỆU RỖNG (EMPTY) */
    <tr>
      <td colSpan="7" className="px-6 py-24 text-center">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center">
            <AlertCircle size={40} className="text-gray-300" />
          </div>
          <div className="max-w-xs mx-auto">
            <p className="text-lg font-bold text-[#111813]">Chưa có tin đăng nào</p>
            <p className="text-sm text-[#637588] mt-1">
              Danh sách mục này hiện đang trống. Vui lòng quay lại sau hoặc kiểm tra các mục khác.
            </p>
          </div>
        </div>
      </td>
    </tr>
  )}
</tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="px-6 py-4 border-t border-[#e5e7eb] flex items-center justify-between">
          <span className="text-sm text-[#637588]">Hiển thị 1 đến 4 trong 128 tin</span>
          <div className="flex gap-1">
            <button className="px-3 py-1 text-sm border border-gray-200 rounded hover:bg-gray-50 text-[#637588]">Trước</button>
            <button className="px-3 py-1 text-sm bg-emerald-600 text-white rounded font-medium">1</button>
            <button className="px-3 py-1 text-sm border border-gray-200 rounded hover:bg-gray-50 text-[#637588]">2</button>
            <button className="px-3 py-1 text-sm border border-gray-200 rounded hover:bg-gray-50 text-[#637588]">3</button>
            <span className="px-2 py-1 text-gray-400">...</span>
            <button className="px-3 py-1 text-sm border border-gray-200 rounded hover:bg-gray-50 text-[#637588]">Tiếp</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Listings;