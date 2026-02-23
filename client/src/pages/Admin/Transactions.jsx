import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, Filter, Download, Save, 
  Wallet, CheckCircle, ArrowUpRight, Eye, Calendar, DollarSign 
} from 'lucide-react';

const Transactions = () => {
    const navigate = useNavigate();
    const handleViewDetail = (id) => {
    navigate(`/admin/transactions/${encodeURIComponent(id)}`);
    };
  // Mock Data
  const transactions = [
    {
      id: '#BM-83920',
      buyer: { name: "Nguyễn Văn A", avatar: "https://ui-avatars.com/api/?name=Nguyen+Van+A&background=random" },
      seller: { name: "Lê Thị B", avatar: "https://ui-avatars.com/api/?name=Le+Thi+B&background=random" },
      value: "15.000.000 ₫",
      fee: "+ 750.000 ₫",
      status: "completed", 
      date: "10/02/2024"
    },
    {
      id: '#BM-83919',
      buyer: { name: "Trần Minh C", avatar: "https://ui-avatars.com/api/?name=Tran+Minh+C&background=random" },
      seller: { name: "Shop Xe Đạp X", avatar: "https://ui-avatars.com/api/?name=Shop+Xe+X&background=0D8ABC&color=fff" },
      value: "8.500.000 ₫",
      fee: "425.000 ₫",
      status: "deposit", 
      date: "09/02/2024"
    },
    {
      id: '#BM-83918',
      buyer: { name: "Hoàng Văn E", avatar: "https://ui-avatars.com/api/?name=Hoang+Van+E&background=random" },
      seller: { name: "Phạm Thị F", avatar: "https://ui-avatars.com/api/?name=Pham+Thi+F&background=random" },
      value: "32.000.000 ₫",
      fee: "1.600.000 ₫",
      status: "refunded", 
      date: "08/02/2024"
    },
    {
      id: '#BM-83917',
      buyer: { name: "Đoàn Văn G", avatar: "https://ui-avatars.com/api/?name=Doan+Van+G&background=random" },
      seller: { name: "Lý Thị H", avatar: "https://ui-avatars.com/api/?name=Ly+Thi+H&background=random" },
      value: "4.200.000 ₫",
      fee: "+ 210.000 ₫",
      status: "completed",
      date: "08/02/2024"
    },
    {
      id: '#BM-83916',
      buyer: { name: "Vũ Văn I", avatar: "https://ui-avatars.com/api/?name=Vu+Van+I&background=random" },
      seller: { name: "Trần K", avatar: "https://ui-avatars.com/api/?name=Tran+K&background=random" },
      value: "12.500.000 ₫",
      fee: "625.000 ₫",
      status: "deposit",
      date: "07/02/2024"
    },
  ];

  const renderStatus = (status) => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 border border-emerald-200 whitespace-nowrap">
            Hoàn tất
          </span>
        );
      case 'deposit':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-600 border border-blue-100 whitespace-nowrap">
            Đã cọc
          </span>
        );
      case 'refunded':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-500 border border-gray-200 whitespace-nowrap">
            Hoàn trả
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col gap-8 font-display text-[#111813] bg-gray-50/50 min-h-screen">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Giao dịch & Phí dịch vụ</h1>
          <p className="text-[#637588] text-base mt-2">
            Quản lý dòng tiền, theo dõi doanh thu và cấu hình phí hệ thống.
          </p>
        </div>
        <button className="flex items-center gap-2 px-5 py-3 bg-white border border-gray-200 hover:bg-gray-50 text-[#111813] rounded-xl text-sm font-bold transition-all shadow-sm whitespace-nowrap">
          <Download size={18} className="text-emerald-600" /> Xuất báo cáo Excel
        </button>
      </div>

      {/* TOP SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT: Config */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-[#e5e7eb] shadow-sm p-6 relative overflow-hidden">
            <div className="absolute right-0 top-0 w-64 h-full bg-gradient-to-l from-emerald-50 to-transparent opacity-50 pointer-events-none"></div>

            <h2 className="text-lg font-bold flex items-center gap-2 mb-4">
               <DollarSign className="text-emerald-500" size={20} /> Cấu hình phí dịch vụ
            </h2>
            <div className="flex flex-col md:flex-row gap-6 items-start">
               <div className="flex-1">
                 <p className="text-[#637588] text-sm mb-6 leading-relaxed">
                   Điều chỉnh phần trăm (%) phí hệ thống thu trên mỗi giao dịch thành công. 
                 </p>
                 
                 <div className="flex items-end gap-4">
                    <div className="w-40">
                      <label className="block text-xs font-bold text-[#637588] uppercase mb-2">Mức phí hiện tại</label>
                      <div className="relative">
                        <input 
                          type="text" 
                          defaultValue="5.0" 
                          className="w-full pl-4 pr-8 py-3 bg-gray-50 border border-gray-200 rounded-xl text-xl font-bold text-[#111813] focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">%</span>
                      </div>
                    </div>
                    <button className="flex items-center gap-2 px-6 py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-emerald-500/30 mb-[1px] whitespace-nowrap">
                       <Save size={18} /> Lưu thay đổi
                    </button>
                 </div>
               </div>
               
               <div className="hidden md:flex items-center justify-center w-48 h-full">
                  <div className="w-32 h-32 bg-emerald-100 rounded-full flex items-center justify-center relative">
                     <Wallet size={48} className="text-emerald-600" />
                     <div className="absolute -top-2 -right-2 bg-white p-2 rounded-lg shadow-sm border border-gray-100">
                        <span className="text-xs font-bold text-emerald-600">+5%</span>
                     </div>
                  </div>
               </div>
            </div>
        </div>

        {/* RIGHT: Stats */}
        <div className="lg:col-span-1 flex flex-col gap-6">
           <div className="bg-white rounded-xl border border-[#e5e7eb] shadow-sm p-5 flex flex-col justify-center h-full hover:border-blue-200 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                 <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                    <Wallet size={20} />
                 </div>
                 <span className="text-xs font-bold text-[#637588] uppercase tracking-wider">Tổng doanh thu phí</span>
              </div>
              <div className="text-2xl font-extrabold text-[#111813]">1.250.000.000 ₫</div>
           </div>

           <div className="bg-white rounded-xl border border-[#e5e7eb] shadow-sm p-5 flex flex-col justify-center h-full hover:border-emerald-200 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                 <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                    <CheckCircle size={20} />
                 </div>
                 <span className="text-xs font-bold text-[#637588] uppercase tracking-wider">Giao dịch thành công</span>
              </div>
              <div className="text-2xl font-extrabold text-[#111813]">8,432</div>
           </div>
        </div>
      </div>

      {/* MAIN TABLE */}
      <div className="bg-white border border-[#e5e7eb] rounded-xl shadow-sm flex flex-col min-h-[500px]">
        
        {/* Toolbar */}
        <div className="p-4 flex flex-col md:flex-row gap-3 justify-between items-center bg-[#fcfdfd] border-b border-[#e5e7eb]">
           <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Tìm kiếm..." 
                className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-[#111813]"
              />
           </div>

           <div className="flex gap-2 w-full md:w-auto">
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-bold text-[#637588] hover:bg-gray-50 whitespace-nowrap">
                 <Calendar size={16} /> Tháng này
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-bold text-[#637588] hover:bg-gray-50 whitespace-nowrap">
                 <Filter size={16} /> Lọc
              </button>
           </div>
        </div>

        {/* Table Content */}
        {/* overflow-x-auto vẫn giữ để an toàn trên mobile, nhưng trên PC sẽ không hiện scroll do width vừa đủ */}
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f9fafb] border-b border-[#e5e7eb]">
                {/* Giảm padding px-6 -> px-4 */}
                <th className="px-4 py-4 text-xs font-bold text-[#637588] uppercase tracking-wider whitespace-nowrap">Mã đơn</th>
                <th className="px-4 py-4 text-xs font-bold text-[#637588] uppercase tracking-wider">Người mua</th>
                <th className="px-4 py-4 text-xs font-bold text-[#637588] uppercase tracking-wider">Người bán</th>
                <th className="px-4 py-4 text-xs font-bold text-[#637588] uppercase tracking-wider text-right whitespace-nowrap">Giá trị</th>
                <th className="px-4 py-4 text-xs font-bold text-[#637588] uppercase tracking-wider text-right whitespace-nowrap">Phí (5%)</th>
                <th className="px-4 py-4 text-xs font-bold text-[#637588] uppercase tracking-wider text-center">Trạng thái</th>
                <th className="px-4 py-4 text-xs font-bold text-[#637588] uppercase tracking-wider text-right">#</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e7eb]">
               {transactions.map((item) => (
                 <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    {/* Mã đơn */}
                    <td className="px-4 py-4 text-sm font-bold text-[#111813] whitespace-nowrap">{item.id}</td>
                    
                    {/* Người mua - Bỏ min-w cố định, dùng max-w và truncate */}
                    <td className="px-4 py-4">
                       <div className="flex items-center gap-3 max-w-[180px]">
                          <img src={item.buyer.avatar} alt="" className="w-8 h-8 rounded-full border border-gray-200 flex-shrink-0" />
                          <span className="text-sm font-bold text-[#111813] truncate" title={item.buyer.name}>
                            {item.buyer.name}
                          </span>
                       </div>
                    </td>

                    {/* Người bán - Bỏ min-w cố định, dùng max-w và truncate */}
                    <td className="px-4 py-4">
                       <div className="flex items-center gap-3 max-w-[180px]">
                          <img src={item.seller.avatar} alt="" className="w-8 h-8 rounded-full border border-gray-200 flex-shrink-0" />
                          <span className="text-sm font-medium text-[#111813] truncate" title={item.seller.name}>
                            {item.seller.name}
                          </span>
                       </div>
                    </td>

                    {/* Giá trị */}
                    <td className="px-4 py-4 text-right text-sm font-bold text-[#111813] whitespace-nowrap">
                        {item.value}
                    </td>
                    
                    {/* Phí */}
                    <td className="px-4 py-4 text-right text-sm font-bold text-emerald-600 whitespace-nowrap">
                        {item.fee}
                    </td>

                    {/* Trạng thái */}
                    <td className="px-4 py-4 text-center">
                       {renderStatus(item.status)}
                    </td>

                    {/* Hành động */}
                    <td className="px-4 py-4 text-right">
                       <button onClick={() => handleViewDetail(item.id)} className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
                         title="Xem chi tiết"
                       >
                          <Eye size={16} />
                       </button>
                    </td>
                 </tr>
               ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-[#e5e7eb] flex items-center justify-between bg-white rounded-b-xl">
           <span className="text-sm font-medium text-[#637588]">Hiển thị 1-5 / 240</span>
           <div className="flex gap-1">
              <button className="px-3 py-1 text-sm border border-gray-200 rounded hover:bg-gray-50 text-[#637588] font-medium">Trước</button>
              <button className="px-3 py-1 text-sm bg-emerald-600 text-white rounded font-bold">1</button>
              <button className="px-3 py-1 text-sm border border-gray-200 rounded hover:bg-gray-50 text-[#637588] font-medium">2</button>
              <button className="px-3 py-1 text-sm border border-gray-200 rounded hover:bg-gray-50 text-[#637588] font-medium">Sau</button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;