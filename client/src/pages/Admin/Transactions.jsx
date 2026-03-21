import React, { useState, useEffect } from "react";
import { Search, Calendar, Filter } from "lucide-react";
import axiosClient from "../../services/axiosClient";

export default function Transactions() {
  const [searchTerm, setSearchTerm] = useState("");
  
  const [transactionsData, setTransactionsData] = useState({
    totalSystemFee: 0,
    transactionCount: 0,
    data: []
  });
  const [isLoading, setIsLoading] = useState(true);

  // --- THÊM STATE CHO PHÂN TRANG ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Đặt số lượng hiển thị trên 1 trang (bạn có thể đổi thành 5, 20...)

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setIsLoading(true);
        const response = await axiosClient.get('/api/admin/transactions');
        setTransactionsData(response.data);
      } catch (error) {
        console.error("Lỗi khi tải danh sách giao dịch:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  // Reset về trang 1 nếu người dùng gõ tìm kiếm
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const formatCurrency = (amount) => {
    if (amount === undefined || amount === null) return "0 đ";
    return amount.toLocaleString("vi-VN") + " đ";
  };

  const formatShortId = (id) => {
    if (!id) return "";
    return "#" + id.substring(0, 8).toUpperCase();
  };

  // Bước 1: Lọc dữ liệu theo Search
  const filteredTransactions = transactionsData.data.filter((tx) => {
    let searchLower = searchTerm.toLowerCase();
    if (searchLower.startsWith('#')) {
      searchLower = searchLower.substring(1);
    }
    return (
      (tx.transactionId && tx.transactionId.toLowerCase().includes(searchLower)) ||
      (tx.orderId && tx.orderId.toLowerCase().includes(searchLower))
    );
  });

  
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
 
  const currentItems = filteredTransactions.slice(indexOfFirstItem, indexOfLastItem);

 
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Tạo mảng số trang để render nút (ví dụ: [1, 2, 3])
  const getPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  return (
    <div className="flex flex-col gap-8 font-display text-[#111813] bg-gray-50/50 min-h-screen relative">
      {/* TIÊU ĐỀ & THỐNG KÊ (GIỮ NGUYÊN) */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Lịch sử giao dịch</h1>
          <p className="text-[#637588] text-base mt-2">
            Quản lý dòng tiền, theo dõi trạng thái đơn hàng và doanh thu từ các giao dịch.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 shrink-0">
          <div className="bg-white px-6 py-4 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-center min-w-[200px]">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Tổng giao dịch</p>
            <p className="text-2xl font-black text-[#111813]">{isLoading ? "..." : transactionsData.transactionCount}</p>
          </div>

          <div className="bg-white px-6 py-4 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-center min-w-[200px]">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Tổng phí dịch vụ</p>
            <p className="text-2xl font-black text-[#111813]">{isLoading ? "..." : formatCurrency(transactionsData.totalSystemFee)}</p>
          </div>
        </div>
      </div>

      {/* BẢNG DỮ LIỆU */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden w-full flex flex-col min-h-[500px]">
        {/* TOOLBAR */}
        <div className="p-4 flex flex-col sm:flex-row justify-between items-center gap-4 border-b border-gray-100 shrink-0 bg-[#fcfdfd]">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Tìm kiếm mã giao dịch hoặc đơn hàng..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
            />
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto shrink-0">
            <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors whitespace-nowrap">
              <Calendar size={16} /> Tháng này
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors whitespace-nowrap">
              <Filter size={16} /> Lọc
            </button>
          </div>
        </div>

        {/* TABLE CONTAINER */}
        <div className="overflow-x-auto w-full flex-1">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-[#f9fafb] border-b border-[#e5e7eb]">
                <th className="px-6 py-4 text-xs font-bold text-[#637588] uppercase tracking-wider w-[30%]">Mã đơn hàng</th>
                <th className="px-6 py-4 text-xs font-bold text-[#637588] uppercase tracking-wider text-center w-[20%]">Giá trị</th>
                <th className="px-6 py-4 text-xs font-bold text-[#637588] uppercase tracking-wider text-center w-[25%]">Phí hệ thống</th>
                <th className="px-6 py-4 text-xs font-bold text-[#637588] uppercase tracking-wider text-center w-[25%]">Chính sách áp dụng</th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-[#e5e7eb]">
              {isLoading ? (
                <tr>
                  <td colSpan="4" className="px-6 py-10 text-center text-[#637588] font-medium">
                    <div className="flex justify-center items-center gap-2">
                      <div className="w-5 h-5 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                      Đang tải dữ liệu...
                    </div>
                  </td>
                </tr>
              ) : filteredTransactions.length === 0 ? (
                 <tr>
                  <td colSpan="4" className="px-6 py-10 text-center text-gray-500 font-medium">
                    Không tìm thấy giao dịch nào.
                  </td>
                </tr>
              ) : (
                /* ĐÃ ĐỔI TỪ filteredTransactions.map SANG currentItems.map */
                currentItems.map((tx, index) => (
                  <tr key={tx.transactionId || index} className="hover:bg-gray-50/80 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-extrabold text-[#111813] tracking-wide" title={`ID gốc: ${tx.orderId}`}>
                            {formatShortId(tx.orderId)}
                          </span>
                          {tx.status === "Paid" && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-green-100 text-green-700 uppercase tracking-wide">
                              Đã thanh toán
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-[#637588] font-medium flex items-center gap-1.5">
                          <Calendar size={12} />
                          {tx.createdAt}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-[#111813] text-center tabular-nums whitespace-nowrap">
                      {formatCurrency(tx.totalAmount)}
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-emerald-600 text-center tabular-nums whitespace-nowrap bg-emerald-50/30 group-hover:bg-emerald-50/60 transition-colors">
                      + {formatCurrency(tx.systemFee)}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-xs font-bold text-[#475569] bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-md inline-block">
                        {tx.appliedPercent}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* --- FOOTER: THANH PHÂN TRANG (PAGINATION) --- */}
        {!isLoading && filteredTransactions.length > 0 && (
          <div className="px-6 py-4 border-t border-[#e5e7eb] flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white shrink-0 rounded-b-2xl">
            {/* Cập nhật phần "Hiển thị x-y trong số z" */}
            <span className="text-sm text-[#637588] font-medium whitespace-nowrap">
              Hiển thị <span className="font-bold text-[#111813]">{indexOfFirstItem + 1} - {Math.min(indexOfLastItem, filteredTransactions.length)}</span> trong số <span className="font-bold text-[#111813]">{filteredTransactions.length}</span> giao dịch
            </span>
            
            <div className="flex gap-1 shrink-0">
              {/* Nút Trước */}
              <button 
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className={`px-3 py-1.5 text-sm border border-gray-200 rounded-lg font-medium transition-colors whitespace-nowrap
                  ${currentPage === 1 ? 'text-gray-400 bg-gray-50 cursor-not-allowed opacity-50' : 'text-[#637588] hover:bg-gray-50'}
                `}
              >
                Trước
              </button>

              {/* Danh sách các số trang */}
              {getPageNumbers().map(number => (
                <button 
                  key={number}
                  onClick={() => handlePageClick(number)}
                  className={`w-8 h-8 flex items-center justify-center text-sm font-bold rounded-lg transition-colors border
                    ${currentPage === number 
                      ? 'bg-emerald-500 text-white border-emerald-500 shadow-sm' 
                      : 'border-transparent text-gray-600 hover:bg-gray-100 hover:border-gray-200'
                    }
                  `}
                >
                  {number}
                </button>
              ))}

              {/* Nút Sau */}
              <button 
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`px-3 py-1.5 text-sm border border-gray-200 rounded-lg font-medium transition-colors whitespace-nowrap
                  ${currentPage === totalPages ? 'text-gray-400 bg-gray-50 cursor-not-allowed opacity-50' : 'text-[#637588] hover:bg-gray-50'}
                `}
              >
                Sau
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}