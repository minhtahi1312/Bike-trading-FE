import React, { useState } from "react";
import { Search, Calendar, Filter, Eye } from "lucide-react";

// Dữ liệu mẫu đã được thêm trường "date" (Ngày hoàn tất)
const mockTransactions = [
  {
    id: "#BM-83920",
    date: "20/03/2026",
    value: 15000000,
    fee: 750000,
    policy: "5%",
  },
  {
    id: "#BM-83919",
    date: "19/03/2026",
    value: 8500000,
    fee: 425000,
    policy: "5%",
  },
  {
    id: "#BM-83918",
    date: "18/03/2026",
    value: 32000000,
    fee: 1280000,
    policy: "4%",
  },
  {
    id: "#BM-83917",
    date: "15/03/2026",
    value: 4200000,
    fee: 210000,
    policy: "5%",
  },
  {
    id: "#BM-83916",
    date: "12/03/2026",
    value: 12500000,
    fee: 375000,
    policy: "3%",
  },
];
export default function Transactions() {
  const [searchTerm, setSearchTerm] = useState("");

  // Hàm format tiền tệ VNĐ
  const formatCurrency = (amount) => {
    return amount.toLocaleString("vi-VN") + " đ";
  };

  const totalFee = 3040000;

  return (
    <div className="flex flex-col gap-8 font-display text-[#111813] bg-gray-50/50 min-h-screen relative">
      {/* TIÊU ĐỀ */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            Lịch sử giao dịch
          </h1>
          <p className="text-[#637588] text-base mt-2">
            Quản lý dòng tiền, theo dõi trạng thái đơn hàng và doanh thu từ các
            giao dịch trên hệ thống.
          </p>
        </div>
        <div className="bg-white px-6 py-4 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-center shrink-0 min-w-[200px]">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
            Tổng phí dịch vụ
          </p>
          <p className="text-2xl font-black text-[#111813]">
            {formatCurrency(totalFee)}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden w-full flex flex-col min-h-[500px]">
        {/* TOOLBAR */}
        <div className="p-4 flex flex-col sm:flex-row justify-between items-center gap-4 border-b border-gray-100 shrink-0 bg-[#fcfdfd]">
          <div className="relative w-full sm:w-96">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Tìm kiếm mã giao dịch..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
            />
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto shrink-0">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors whitespace-nowrap">
              <Calendar size={16} /> Tháng này
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors whitespace-nowrap">
              <Filter size={16} /> Lọc
            </button>
          </div>
        </div>

        {/* TABLE CONTAINER */}
        <div className="overflow-x-auto w-full flex-1">
          <table className="w-full text-left border-collapse min-w-[800px] table-fixed">
            <thead>
              <tr className="bg-[#f9fafb] border-b border-[#e5e7eb]">
                {/* Chia đều 4 cột, mỗi cột w-[25%] */}
                <th className="px-6 py-4 text-xs font-bold text-[#637588] uppercase tracking-wider w-[25%]">
                  Mã đơn
                </th>
                <th className="px-6 py-4 text-xs font-bold text-[#637588] uppercase tracking-wider text-center w-[25%]">
                  Giá trị
                </th>
                <th className="px-6 py-4 text-xs font-bold text-[#637588] uppercase tracking-wider text-center w-[25%]">
                  Phí hệ thống
                </th>
                <th className="px-6 py-4 text-xs font-bold text-[#637588] uppercase tracking-wider text-center w-[25%]">
                  Chính sách áp dụng
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e7eb]">
              {mockTransactions.map((tx, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  {/* CỘT MÃ ĐƠN & NGÀY */}
                  <td className="px-6 py-5 w-[25%]">
                    <div className="flex flex-col">
                      <span
                        className="text-sm font-bold text-[#111813] truncate"
                        title={tx.id}
                      >
                        {tx.id}
                      </span>
                      <span className="text-xs text-[#637588] mt-0.5 font-medium">
                        {tx.date}
                      </span>
                    </div>
                  </td>

                  {/* CỘT GIÁ TRỊ (Đã đổi thành text-center) */}
                  <td className="px-6 py-5 text-sm font-bold text-[#111813] text-center tabular-nums whitespace-nowrap w-[25%]">
                    {formatCurrency(tx.value)}
                  </td>

                  {/* CỘT PHÍ HỆ THỐNG (Đã đổi thành text-center) */}
                  <td className="px-6 py-5 text-sm font-bold text-emerald-600 text-center tabular-nums whitespace-nowrap w-[25%]">
                    + {formatCurrency(tx.fee)}
                  </td>

                  {/* CỘT CHÍNH SÁCH (Đã đổi thành text-center) */}
                  <td className="px-6 py-5 text-center w-[25%]">
                    <span
                      className="text-sm font-medium text-[#637588] bg-gray-100 px-3 py-1.5 rounded-lg truncate inline-block max-w-[90%]"
                      title={tx.policy}
                    >
                      {tx.policy}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* FOOTER - PAGINATION */}
        <div className="px-6 py-4 border-t border-[#e5e7eb] flex items-center justify-between bg-white shrink-0 rounded-b-2xl">
          <span className="text-sm text-[#637588] font-medium whitespace-nowrap">
            Hiển thị <span className="font-bold text-[#111813]">1-5</span> trong
            số <span className="font-bold text-[#111813]">240</span> giao dịch
          </span>
          <div className="flex gap-1 shrink-0">
            <button className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg text-[#637588] font-medium hover:bg-gray-50 transition-colors whitespace-nowrap">
              Trước
            </button>
            <button className="w-8 h-8 flex items-center justify-center text-sm font-bold bg-emerald-500 text-white rounded-lg shadow-sm border border-emerald-500">
              1
            </button>
            <button className="w-8 h-8 flex items-center justify-center text-sm font-bold border border-gray-200 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
              2
            </button>
            <button className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg text-[#637588] font-medium hover:bg-gray-50 transition-colors whitespace-nowrap">
              Sau
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
