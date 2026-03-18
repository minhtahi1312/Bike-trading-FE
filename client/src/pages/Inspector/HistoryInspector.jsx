import React, { useState, useEffect } from 'react';
import { Search, Filter, Calendar, Eye, BarChart3, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DatePicker from "react-datepicker";
import axiosClient from "../../services/axiosClient";
import "react-datepicker/dist/react-datepicker.css";

export default function HistoryInspector() {
  
  const navigate = useNavigate();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [historyList, setHistoryList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(10);

  const fetchHistory = async () => {
  setLoading(true);
  try {
    const response = await axiosClient.get('/api/inspector/inspection-history', {
      params: {
        pageNumber: pageNumber,
        pageSize: pageSize
      }
    });
    // Gán dữ liệu từ API vào state
    setHistoryList(response.data.items);
    setTotalPages(response.data.totalPages);
  } catch (error) {
    console.error("Lỗi fetch API:", error);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchHistory();
}, [pageNumber]);

  const getResultBadge = (result) => {
    switch (result) {
      case 'passed': return 'bg-emerald-50 text-emerald-700 border border-emerald-100';
      case 'failed': return 'bg-red-50 text-red-700 border border-red-100';
      default: return 'bg-gray-50 text-gray-600';
    }
  };

  const getResultDot = (result) => {
    return result === 'passed' ? 'bg-emerald-500' : 'bg-red-500';
  };

  return (
    <>
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-[#111813] text-3xl font-extrabold tracking-tight">Lịch sử Kiểm định</h1>
          <p className="text-[#637588] text-sm mt-1">Quản lý và xem lại danh sách tất cả các xe bạn đã thực hiện kiểm định.</p>
        </div>
      </div>

      {/* TỔNG QUAN THỐNG KÊ (Dựa theo thiết kế ảnh) */}
      <div className="bg-white rounded-xl p-6 border border-[#e5e7eb] shadow-sm mb-8 max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-[#111813] font-bold text-base">
  Tháng này (T{new Date().getMonth() + 1}/{new Date().getFullYear()})
</h3>
          <BarChart3 className="text-emerald-500" size={20} />
        </div>
        
        <div className="flex items-end gap-3 mb-6">
          <span className="text-4xl font-extrabold text-[#111813]">45</span>
          <span className="flex items-center text-emerald-600 text-xs font-bold bg-emerald-50 px-2 py-1 rounded-full mb-1">
            +12%
          </span>
        </div>

        <div className="space-y-3">
          {/* Progress Đạt */}
          <div>
            <div className="flex justify-between text-sm mb-1.5">
              <span className="text-[#637588] font-medium">Đạt (36)</span>
              <span className="text-[#111813] font-bold">80%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '80%' }}></div>
            </div>
          </div>
          
          {/* Progress Không đạt */}
          <div>
            <div className="flex justify-between text-sm mb-1.5">
              <span className="text-[#637588] font-medium">Không đạt (9)</span>
              <span className="text-[#111813] font-bold">20%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div className="bg-red-500 h-2 rounded-full" style={{ width: '20%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* SEARCH & FILTER AREA */}
      <div className="bg-white p-4 rounded-xl border border-[#e5e7eb] shadow-sm mb-6 flex flex-wrap lg:flex-nowrap items-center gap-4">
        {/* Tìm kiếm */}
        <div className="w-full lg:w-1/3">
          <label className="block text-xs font-bold text-[#111813] mb-1.5 uppercase tracking-wide">Tìm kiếm</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af]" size={18} />
            <input 
              type="text" 
              placeholder="Nhập tên xe hoặc mã tin..." 
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#e5e7eb] rounded-lg text-sm text-[#111813] placeholder-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            />
          </div>
        </div>

       {/* Khoảng thời gian */}
        <div className="w-full sm:w-1/2 lg:w-1/3">
          <label className="block text-xs font-bold text-[#111813] mb-1.5 uppercase tracking-wide">Khoảng thời gian</label>
          <div className="relative flex items-center">
            {/* Icon lịch */}
            <Calendar className="absolute left-3 z-10 text-[#9ca3af] pointer-events-none" size={18} />
            
            {/* Component DatePicker thay cho thẻ input */}
            <DatePicker
              selectsRange={true}
              startDate={startDate}
              endDate={endDate}
              onChange={(update) => setDateRange(update)}
              placeholderText="Từ ngày - Đến ngày"
              dateFormat="dd/MM/yyyy"
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#e5e7eb] rounded-lg text-sm text-[#111813] placeholder-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all cursor-pointer"
            />
          </div>
        </div>

        {/* Trạng thái kết quả */}
        <div className="w-full sm:w-1/2 lg:w-1/4">
          <label className="block text-xs font-bold text-[#111813] mb-1.5 uppercase tracking-wide">Kết quả</label>
          <select className="w-full px-4 py-2.5 bg-white border border-[#e5e7eb] rounded-lg text-sm text-[#111813] focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all cursor-pointer appearance-none">
            <option value="all">Tất cả</option>
            <option value="passed">Đạt</option>
            <option value="failed">Không đạt</option>
          </select>
        </div>

        {/* Nút Lọc */}
        <div className="w-full lg:w-auto self-end">
          <button className="w-full lg:w-auto flex items-center justify-center gap-2 px-6 py-2.5 bg-[#111813] hover:bg-gray-800 text-white rounded-lg text-sm font-semibold transition-colors shadow-sm">
            <Filter size={16} /> Lọc
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl border border-[#e5e7eb] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white border-b border-[#e5e7eb]">
                <th className="px-6 py-4 text-xs font-bold text-[#637588] uppercase tracking-wider">Mã tin</th>
                <th className="px-6 py-4 text-xs font-bold text-[#637588] uppercase tracking-wider">Tên xe</th>
                <th className="px-6 py-4 text-xs font-bold text-[#637588] uppercase tracking-wider">Người bán</th>
                <th className="px-6 py-4 text-xs font-bold text-[#637588] uppercase tracking-wider">Ngày kiểm định</th>
                <th className="px-6 py-4 text-xs font-bold text-[#637588] uppercase tracking-wider">Kết quả</th>
                <th className="px-6 py-4 text-xs font-bold text-[#637588] uppercase tracking-wider text-center">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e7eb]">
              {historyList.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-[#637588]">#{item.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={item.image} alt={item.name} className="w-12 h-8 rounded object-cover border border-[#e5e7eb]" />
                      <div>
                        <p className="font-bold text-[#111813] text-sm">{item.name}</p>
                        <span className="text-xs text-[#637588]">{item.type}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-semibold text-[#111813]">{item.seller}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-[#111813]">{item.date}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${getResultBadge(item.result)}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${getResultDot(item.result)}`}></span>
                      {item.resultText}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button 
                      onClick={() => navigate(`/inspector/history/${item.id}`)} 
                      className="inline-flex items-center justify-center text-[#9ca3af] hover:text-emerald-600 hover:bg-emerald-50 p-2 rounded-full transition-all"
                      title="Xem chi tiết"
                    >
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 border-t border-[#e5e7eb] bg-white gap-4">
          <div className="text-sm text-[#637588]">
            Hiển thị <span className="font-bold text-[#111813]">1-5</span> trong <span className="font-bold text-[#111813]">45</span> kết quả
          </div>
          
          <div className="flex items-center gap-1.5">
            <button disabled className="w-8 h-8 flex items-center justify-center border border-[#e5e7eb] rounded-lg text-sm text-[#637588] hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              &lt;
            </button>
            <button className="w-8 h-8 flex items-center justify-center border border-emerald-600 bg-emerald-600 text-white rounded-lg text-sm font-bold shadow-sm">
              1
            </button>
            <button className="w-8 h-8 flex items-center justify-center border border-[#e5e7eb] bg-white text-[#637588] hover:bg-gray-50 hover:text-[#111813] rounded-lg text-sm font-medium transition-colors">
              2
            </button>
            <button className="w-8 h-8 flex items-center justify-center border border-[#e5e7eb] bg-white text-[#637588] hover:bg-gray-50 hover:text-[#111813] rounded-lg text-sm font-medium transition-colors">
              3
            </button>
            <span className="px-1 text-[#637588] select-none">...</span>
            <button className="w-8 h-8 flex items-center justify-center border border-[#e5e7eb] rounded-lg text-sm text-[#637588] hover:bg-gray-50 hover:text-[#111813] transition-colors">
              &gt;
            </button>
          </div>
        </div>
      </div>
    </>
  );
}