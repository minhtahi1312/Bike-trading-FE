import React, { useState } from 'react';
import { 
  Search, Filter, Calendar, Eye, 
  AlertTriangle, ShieldAlert, CheckCircle2, Clock, 
  MessageSquare, MoreVertical, Download
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Complaints() {
    const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  // --- MOCK DATA: Danh sách khiếu nại ---
  const complaintsList = [
    { 
      id: 'RP-0921', 
      reporter: { name: 'Nguyễn Văn A', phone: '0901***123' }, 
      target: { type: 'Tin đăng', name: 'Giant TCR Advanced 2021', id: 'XE-8821' },
      reason: 'Xe không đúng mô tả, xước nhiều hơn ảnh', 
      date: '26/10/2023 14:30', 
      status: 'pending', 
      statusText: 'Chờ xử lý' 
    },
    { 
      id: 'RP-0920', 
      reporter: { name: 'Trần Thị Tú', phone: '0988***456' }, 
      target: { type: 'Người dùng', name: 'Shop Xe Đạp Lướt', id: 'USR-112' },
      reason: 'Thái độ người bán không tốt, chửi bới khách', 
      date: '25/10/2023 09:15', 
      status: 'processing', 
      statusText: 'Đang giải quyết' 
    },
    { 
      id: 'RP-0918', 
      reporter: { name: 'Lê Hữu Hoàng', phone: '0912***789' }, 
      target: { type: 'Tin đăng', name: 'Sườn Carbon S-Works', id: 'XE-7713' },
      reason: 'Nghi ngờ hàng giả, tem fake', 
      date: '24/10/2023 16:45', 
      status: 'resolved', 
      statusText: 'Đã giải quyết' 
    },
    { 
      id: 'RP-0915', 
      reporter: { name: 'Phạm Bảo', phone: '0933***222' }, 
      target: { type: 'Người dùng', name: 'Kẻ Lừa Đảo', id: 'USR-999' },
      reason: 'Chuyển cọc nhưng không giao xe, chặn liên lạc', 
      date: '22/10/2023 10:20', 
      status: 'resolved', 
      statusText: 'Đã giải quyết' 
    },
    { 
      id: 'RP-0910', 
      reporter: { name: 'Hoàng Minh', phone: '0977***888' }, 
      target: { type: 'Tin đăng', name: 'Shimano 105 R7000', id: 'PT-4422' },
      reason: 'Spam tin đăng nhiều lần', 
      date: '20/10/2023 08:00', 
      status: 'rejected', 
      statusText: 'Từ chối' 
    },
  ];

  // --- STATS DATA ---
  const stats = [
    { title: 'Cần xử lý', value: '12', icon: <AlertTriangle size={24} />, color: 'text-amber-600', bg: 'bg-amber-100', border: 'hover:border-amber-500/50' },
    { title: 'Đang giải quyết', value: '05', icon: <Clock size={24} />, color: 'text-blue-600', bg: 'bg-blue-100', border: 'hover:border-blue-500/50' },
    { title: 'Đã giải quyết (Tháng)', value: '48', icon: <CheckCircle2 size={24} />, color: 'text-emerald-600', bg: 'bg-emerald-100', border: 'hover:border-emerald-500/50' },
    { title: 'Khóa tài khoản', value: '03', icon: <ShieldAlert size={24} />, color: 'text-red-600', bg: 'bg-red-100', border: 'hover:border-red-500/50' },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'processing': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'resolved': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'rejected': return 'bg-gray-100 text-gray-600 border-gray-200';
      default: return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  };

  const getStatusDot = (status) => {
    switch (status) {
      case 'pending': return 'bg-amber-500 animate-pulse';
      case 'processing': return 'bg-blue-500';
      case 'resolved': return 'bg-emerald-500';
      default: return 'bg-gray-400';
    }
  };

  return (
    <div className="flex flex-col gap-8 font-display">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[#111813] text-3xl font-extrabold tracking-tight">Quản lý Khiếu nại</h1>
          <p className="text-[#637588] text-sm mt-1">Theo dõi, phân tích và xử lý các báo cáo vi phạm từ người dùng.</p>
        </div>
        <div className="flex gap-2 shrink-0">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-[#e5e7eb] rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm text-[#637588]">
            <Download size={18} /> Xuất báo cáo
          </button>
        </div>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className={`bg-white rounded-xl p-5 border border-[#e5e7eb] shadow-sm flex flex-col justify-between h-full gap-4 transition-colors ${stat.border}`}>
            <div className="flex justify-between items-start">
              <div className={`p-2 rounded-lg ${stat.bg} ${stat.color}`}>
                {stat.icon}
              </div>
            </div>
            <div>
              <p className="text-[#637588] text-sm font-medium">{stat.title}</p>
              <h3 className="text-[#111813] text-2xl font-bold mt-1">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* SEARCH & FILTER AREA */}
      <div className="bg-white p-4 rounded-xl border border-[#e5e7eb] shadow-sm flex flex-wrap lg:flex-nowrap items-center gap-4">
        
        {/* Tìm kiếm */}
        <div className="w-full lg:w-1/3">
          <label className="block text-xs font-bold text-[#111813] mb-1.5 uppercase tracking-wide">Tìm kiếm</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af]" size={18} />
            <input 
              type="text" 
              placeholder="Mã khiếu nại, tên người dùng..." 
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#e5e7eb] rounded-lg text-sm text-[#111813] placeholder-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            />
          </div>
        </div>

       {/* Khoảng thời gian */}
        <div className="w-full sm:w-1/2 lg:w-1/3">
          <label className="block text-xs font-bold text-[#111813] mb-1.5 uppercase tracking-wide">Thời gian gửi</label>
          <div className="relative flex items-center">
            <Calendar className="absolute left-3 z-10 text-[#9ca3af] pointer-events-none" size={18} />
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

        {/* Trạng thái */}
        <div className="w-full sm:w-1/2 lg:w-1/4">
          <label className="block text-xs font-bold text-[#111813] mb-1.5 uppercase tracking-wide">Trạng thái</label>
          <select className="w-full px-4 py-2.5 bg-white border border-[#e5e7eb] rounded-lg text-sm text-[#111813] focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all cursor-pointer appearance-none">
            <option value="all">Tất cả trạng thái</option>
            <option value="pending">Chờ xử lý</option>
            <option value="processing">Đang giải quyết</option>
            <option value="resolved">Đã giải quyết</option>
            <option value="rejected">Từ chối</option>
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
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-[#f9fafb] border-b border-[#e5e7eb]">
                <th className="px-6 py-4 text-xs font-bold text-[#637588] uppercase tracking-wider">Mã KN & Ngày gửi</th>
                <th className="px-6 py-4 text-xs font-bold text-[#637588] uppercase tracking-wider">Người khiếu nại</th>
                <th className="px-6 py-4 text-xs font-bold text-[#637588] uppercase tracking-wider">Đối tượng bị báo cáo</th>
                <th className="px-6 py-4 text-xs font-bold text-[#637588] uppercase tracking-wider">Nội dung / Lý do</th>
                <th className="px-6 py-4 text-xs font-bold text-[#637588] uppercase tracking-wider">Trạng thái</th>
                <th className="px-6 py-4 text-xs font-bold text-[#637588] uppercase tracking-wider text-right">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e7eb]">
              {complaintsList.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors group">
                  
                  {/* Mã & Ngày */}
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-bold text-[#111813]">#{item.id}</span>
                      <span className="text-xs text-[#637588] flex items-center gap-1"><Clock size={12}/> {item.date}</span>
                    </div>
                  </td>
                  
                  {/* Người khiếu nại */}
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm font-bold text-[#111813]">{item.reporter.name}</span>
                      <span className="text-xs text-[#637588]">{item.reporter.phone}</span>
                    </div>
                  </td>

                  {/* Đối tượng */}
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">{item.target.type}</span>
                      <span className="text-sm font-semibold text-emerald-600 hover:underline cursor-pointer">{item.target.name}</span>
                      <span className="text-xs text-[#637588] font-mono">{item.target.id}</span>
                    </div>
                  </td>

                  {/* Nội dung */}
                  <td className="px-6 py-4 max-w-xs">
                    <div className="flex items-start gap-2">
                      <MessageSquare size={16} className="text-gray-400 shrink-0 mt-0.5" />
                      <p className="text-sm text-[#111813] font-medium line-clamp-2" title={item.reason}>
                        {item.reason}
                      </p>
                    </div>
                  </td>

                  {/* Trạng thái */}
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${getStatusBadge(item.status)}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${getStatusDot(item.status)}`}></span>
                      {item.statusText}
                    </span>
                  </td>

                  {/* Hành động */}
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end items-center gap-2">
                      <button 
                        onClick={() => navigate(`/admin/reports/${item.id}`)}
                        className="inline-flex items-center justify-center text-[#637588] hover:text-emerald-600 hover:bg-emerald-50 p-2 rounded-lg transition-all tooltip" 
                        title="Xem & Xử lý"
                      >
                        <Eye size={18} />
                      </button>
                      <button className="inline-flex items-center justify-center text-[#637588] hover:bg-gray-100 p-2 rounded-lg transition-all">
                        <MoreVertical size={18} />
                      </button>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 border-t border-[#e5e7eb] bg-white gap-4">
          <div className="text-sm text-[#637588]">
            Hiển thị <span className="font-bold text-[#111813]">1-5</span> trong <span className="font-bold text-[#111813]">68</span> khiếu nại
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
    </div>
  );
}