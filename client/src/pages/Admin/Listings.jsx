import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Plus, Search, Calendar, Filter, Eye, Check, X,
  MoreVertical, Star, AlertCircle, Clock
} from 'lucide-react';

const Listings = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const navigate = useNavigate();
  const handleViewDetail = (id) => {
    navigate(`/admin/listings/${id}`);
  };
  // Dữ liệu giả lập (Mock Data)
  const listings = [
    {
      id: 1,
      code: '#BM-29384',
      name: 'Honda Winner X Sport',
      year: 2022,
      km: '12,000 km',
      image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=500&q=80',
      seller: { name: 'Nguyễn Tuấn', avatar: 'https://ui-avatars.com/api/?name=Nguyen+Tuan&background=random', rating: 4.8 },
      price: '28.500.000 ₫',
      inspectorStatus: 'Chưa kiểm',
      inspectorColor: 'gray',
      status: 'Chờ duyệt',
      statusColor: 'yellow',
      time: '2 phút trước'
    },
    {
      id: 2,
      code: '#BM-29383',
      name: 'Yamaha Exciter 155 VVA',
      year: 2020,
      km: '24,000 km',
      image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=500&q=80',
      seller: { name: 'Trần Văn B', avatar: 'https://ui-avatars.com/api/?name=Tran+Van&background=random', rating: 0 },
      price: '31.000.000 ₫',
      inspectorStatus: 'Đang kiểm',
      inspectorColor: 'purple',
      status: 'Chờ duyệt',
      statusColor: 'yellow',
      time: '15 phút trước'
    },
    {
      id: 3,
      code: '#BM-29380',
      name: 'Honda SH 150i ABS',
      year: 2023,
      km: '5,000 km',
      image: 'https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=500&q=80',
      seller: { name: 'Hoàng Motor', avatar: 'https://ui-avatars.com/api/?name=Hoang+Motor&background=0D8ABC&color=fff', rating: 5.0, verified: true },
      price: '85.000.000 ₫',
      inspectorStatus: 'Đạt chuẩn',
      inspectorColor: 'green',
      status: 'Công khai',
      statusColor: 'blue',
      time: '1 giờ trước'
    },
    {
      id: 4,
      code: '#BM-29379',
      name: 'Wave Alpha 110cc',
      year: 2015,
      km: 'Unknown',
      // Dùng link ảnh từ nguồn cực kỳ ổn định (Wikimedia)
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/da/d3/2014_Honda_Wave_110i.jpg/640px-2014_Honda_Wave_110i.jpg',
      seller: { name: 'User 9283', avatar: null, rating: 0, reported: true },
      price: '5.000.000 ₫',
      inspectorStatus: 'Rủi ro',
      inspectorColor: 'red',
      status: 'Từ chối',
      statusColor: 'red',
      time: '2 giờ trước'
    }
  ];

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
            <span className="text-xl font-bold text-[#111813]">15</span>
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
              className={`py-4 px-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap flex items-center gap-2 ${activeTab === tab.id
                  ? 'border-emerald-600 text-emerald-700'
                  : 'border-transparent text-[#637588] hover:text-[#111813]'
                }`}
            >
              {tab.label}
              {tab.count && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${activeTab === tab.id ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600'}`}>
                  {tab.count}
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
              {listings.map((item) => {
                const isRiskyOrRejected = item.inspectorStatus === 'Rủi ro' || item.status === 'Từ chối';

                return (
                  <tr
                    key={item.id}
                    className={`hover:bg-gray-50 group transition-colors border-b border-gray-100 ${
                      isRiskyOrRejected ? 'opacity-50 bg-gray-50/50 grayscale-[30%]' : ''
                    }`}
                  >
                    <td className="px-6 py-4">
                      <input type="checkbox" className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" />
                    </td>

                    {/* Cột Thông tin xe */}
                    <td className="px-6 py-4">
                      <div className="flex gap-4">
                        <div className="w-16 h-12 rounded-lg overflow-hidden border border-gray-200 flex-shrink-0 bg-gray-50">
                          {/* SỬA QUAN TRỌNG: Thêm onError để tự fix ảnh lỗi */}
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-full object-cover" 
                            onError={handleImageError}
                          />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[11px] font-bold text-emerald-600 mb-0.5">{item.code}</span>
                          <span className="text-sm font-bold text-[#111813] line-clamp-1">{item.name}</span>
                          <div className="flex items-center gap-2 text-xs text-[#637588] mt-1">
                            <span>{item.year}</span>
                            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                            <span>{item.km}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Cột Người bán */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {item.seller.avatar ? (
                          <img src={item.seller.avatar} className="w-8 h-8 rounded-full border border-gray-200" alt="" />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500">U</div>
                        )}
                        <div className="flex flex-col">
                          <div className="flex items-center gap-1">
                            <span className={`text-sm font-medium ${item.seller.reported ? 'text-red-600' : 'text-[#111813]'}`}>{item.seller.name}</span>
                            {item.seller.verified && <Check size={12} className="text-blue-500 bg-blue-100 rounded-full p-0.5" />}
                          </div>
                          <div className="flex items-center gap-1 text-xs text-[#637588]">
                            <Star size={10} className="text-yellow-500 fill-yellow-500" />
                            <span>{item.seller.rating || 'N/A'}</span>
                            {item.seller.reported && <span className="text-red-500 ml-1 text-[10px] bg-red-50 px-1 rounded">Reported</span>}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Cột Giá */}
                    <td className="px-6 py-4">
                      <div className="text-sm font-bold text-[#111813]">{item.price}</div>
                    </td>

                    {/* Cột Inspector */}
                    <td className="px-6 py-4 text-center">
                      {renderBadge(item.inspectorStatus, item.inspectorColor)}
                    </td>

                    {/* Cột Trạng thái */}
                    <td className="px-6 py-4 text-center">
                      <div className="flex flex-col items-center gap-1">
                        {renderBadge(item.status, item.statusColor)}
                        <span className="text-[10px] text-[#9ca3af] flex items-center gap-1">
                          <Clock size={10} /> {item.time}
                        </span>
                      </div>
                    </td>

                    {/* Cột Hành động */}
                    <td className="px-6 py-4 text-right">
                      {item.status === 'Chờ duyệt' ? (
                        <div className="flex justify-end gap-2">
                          <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-colors" title="Duyệt ngay">
                            <Check size={16} />
                          </button>
                          <button onClick={() => handleViewDetail(item.id)} className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-50 text-gray-500 hover:bg-gray-200 transition-colors" title="Xem chi tiết">
                            <Eye size={16} />
                          </button>
                        </div>
                      ) : (
                        <div className="flex justify-end gap-2">
                          <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
                            <MoreVertical size={16} />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
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