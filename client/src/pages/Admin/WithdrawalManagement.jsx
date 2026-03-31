import React, { useState, useEffect } from "react";
import { 
  Search, Clock, CheckCircle2, XCircle, Banknote, 
  ArrowUpRight, MoreHorizontal, Loader2, ChevronLeft, ChevronRight
} from "lucide-react";
import axiosClient from "../../services/axiosClient";
import ConfirmModal from "../../components/ConfirmModal";
import { toast } from "react-hot-toast"; 

export default function WithdrawalManagement() {
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null); 
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    id: null,
    type: null,
    actionText: ""
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; 

  useEffect(() => {
    fetchWithdrawals();
  }, []);

 
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);

  const fetchWithdrawals = async () => {
    try {
      setLoading(true);
      const response = await axiosClient.get("/api/admin/withdrawals");
      setWithdrawals(response.data);
    } catch (error) {
      toast.error("Không thể tải danh sách rút tiền");
    } finally {
      setLoading(false);
    }
  };

  const getStatusDetails = (status) => {
    const s = typeof status === 'string' ? status.toLowerCase() : status;
    switch (s) {
      case 1: case "pending":
        return { text: "Đang chờ", badge: "bg-amber-50 text-amber-700 border-amber-200", dot: "bg-amber-500 animate-pulse" };
      case 2: case "paid": case "success":
        return { text: "Thành công", badge: "bg-emerald-50 text-emerald-700 border-emerald-200", dot: "bg-emerald-500" };
      case 3: case "failed": case "rejected":
        return { text: "Thất bại", badge: "bg-red-50 text-red-700 border-red-200", dot: "bg-red-500" };
      default:
        return { text: status || "N/A", badge: "bg-gray-50 text-gray-500 border-gray-200", dot: "bg-gray-400" };
    }
  };

  const openConfirmModal = (id, type) => {
    const actionText = type === 'approve' ? 'duyệt chi' : 'từ chối';
    setConfirmModal({ isOpen: true, id, type, actionText });
  };

  // Hàm 2: Gọi API khi bấm "Xác nhận" trong Modal
  const executeAction = async () => {
    const { id, type, actionText } = confirmModal;
    try {
      setActionLoading(id);
      await axiosClient.put(`/api/admin/withdrawals/${id}/${type}`);
      toast.success(`Đã ${actionText} thành công!`);
      
      setConfirmModal({ ...confirmModal, isOpen: false }); // Đóng modal
      fetchWithdrawals(); 
    } catch (error) {
      toast.error(`Có lỗi xảy ra: ${error.response?.data?.message || "Thao tác thất bại"}`);
    } finally {
      setActionLoading(null);
    }
  }
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

 
  const filteredWithdrawals = withdrawals.filter(item => {
    const matchesSearch = item.transactionCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.requesterName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || String(item.status).toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  
  const totalPages = Math.ceil(filteredWithdrawals.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredWithdrawals.slice(indexOfFirstItem, indexOfLastItem);

  const getPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const stats = [
    { label: "Tổng yêu cầu", value: withdrawals.length, icon: <Banknote size={20}/>, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Đang chờ duyệt", value: withdrawals.filter(w => w.status === 1 || String(w.status).toLowerCase() === "pending").length, icon: <Clock size={20}/>, color: "text-amber-600", bg: "bg-amber-50" },
    { label: "Đã thanh toán", value: withdrawals.filter(w => w.status === 2 || String(w.status).toLowerCase() === "paid").length, icon: <CheckCircle2 size={20}/>, color: "text-emerald-600", bg: "bg-emerald-50" },
  ];

  return (
    <div className="flex flex-col gap-6 pb-10 font-display">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-[#111813] text-3xl font-extrabold tracking-tight">Quản lý Rút tiền</h1>
          <p className="text-[#637588] text-sm mt-1">Quản lý và phê duyệt các giao dịch thanh toán.</p>
        </div>
      </div>

      {/* QUICK STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-[#e5e7eb] shadow-sm flex items-center gap-4">
            <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>{stat.icon}</div>
            <div>
              <p className="text-[#637588] text-xs font-bold uppercase tracking-wider">{stat.label}</p>
              <h3 className="text-[#111813] text-2xl font-black mt-0.5">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* KHỐI DỮ LIỆU THỐNG NHẤT */}
      <div className="bg-white rounded-2xl border border-[#e5e7eb] shadow-sm overflow-hidden flex flex-col min-h-[550px]">
        
        {/* TOOLBAR */}
        <div className="p-4 border-b border-[#e5e7eb] bg-[#fcfdfd] flex flex-wrap md:flex-nowrap items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af]" size={18} />
            <input 
              type="text" 
              placeholder="Tìm mã GD, tên người dùng..." 
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#e5e7eb] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <span className="text-xs font-bold text-[#637588] uppercase tracking-wider">Trạng thái:</span>
            <select 
              className="px-4 py-2 bg-white border border-[#e5e7eb] rounded-lg text-sm focus:outline-none cursor-pointer appearance-none min-w-[150px]"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">Tất cả</option>
              <option value="pending">Đang chờ</option>
              <option value="paid">Thành công</option>
              <option value="failed">Thất bại</option>
            </select>
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f9fafb] border-b border-[#e5e7eb]">
                <th className="px-6 py-4 text-[10px] font-bold text-[#637588] uppercase tracking-wider">Thông tin GD</th>
                <th className="px-6 py-4 text-[10px] font-bold text-[#637588] uppercase tracking-wider">Người rút</th>
                <th className="px-6 py-4 text-[10px] font-bold text-[#637588] uppercase tracking-wider">Số tiền</th>
                <th className="px-6 py-4 text-[10px] font-bold text-[#637588] uppercase tracking-wider">Ngân hàng</th>
                <th className="px-6 py-4 text-[10px] font-bold text-[#637588] uppercase tracking-wider text-center">Trạng thái</th>
                <th className="px-6 py-4 text-[10px] font-bold text-[#637588] uppercase tracking-wider text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e7eb]">
              {loading ? (
                <tr><td colSpan="6" className="py-20 text-center text-gray-400 font-medium italic">Đang tải dữ liệu...</td></tr>
              ) : currentItems.length > 0 ? (
                currentItems.map((item) => {
                  const statusStyle = getStatusDetails(item.status);
                  const isPending = item.status === 1 || String(item.status).toLowerCase() === "pending";
                  return (
                    <tr key={item.transactionId} className="hover:bg-gray-50/80 transition-colors group">
                      <td className="px-6 py-4 text-sm font-bold text-[#111813]">
                        {item.transactionCode}
                        <span className="block text-[10px] text-[#637588] font-mono mt-1 font-normal">{item.requestDate}</span>
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-[#111813]">
                        {item.requesterName}
                        <div className="text-xs text-[#637588] font-normal mt-0.5 line-clamp-1 italic">"{item.description}"</div>
                      </td>
                      <td className="px-6 py-4 text-sm font-black text-emerald-600">{formatCurrency(item.amount)}</td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-0.5">
                          <div className="text-sm font-bold text-[#111813] flex items-center gap-1">
                            {item.bankName} <ArrowUpRight size={12} className="text-[#9ca3af]"/>
                          </div>
                          <div className="text-xs font-mono text-[#637588]">{item.bankAccountNumber}</div>
                          <div className="text-[10px] font-bold text-[#9ca3af] uppercase">{item.bankAccountName}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold border whitespace-nowrap ${statusStyle.badge}`}>
                          <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${statusStyle.dot}`}></span>
                          {statusStyle.text}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          {isPending && (
                            <>
                              {actionLoading === item.transactionId ? (
                                <Loader2 className="animate-spin text-emerald-600" size={20} />
                              ) : (
                                <>
                                  <button onClick={() => openConfirmModal(item.transactionId, 'approve')} className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all" title="Duyệt chi"><CheckCircle2 size={18} /></button>
                                  <button onClick={() => openConfirmModal(item.transactionId, 'reject')} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all" title="Từ chối"><XCircle size={18} /></button>
                                </>
                              )}
                            </>
                          )}
                          {!isPending && <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg"><MoreHorizontal size={18}/></button>}
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr><td colSpan="6" className="py-20 text-center text-gray-400">Không tìm thấy kết quả nào.</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* --- THANH PHÂN TRANG (FOOTER) --- */}
        {!loading && filteredWithdrawals.length > 0 && (
          <div className="px-6 py-4 border-t border-[#e5e7eb] flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#fcfdfd]">
            <span className="text-sm text-[#637588] font-medium whitespace-nowrap">
              Hiển thị <span className="font-bold text-[#111813]">{indexOfFirstItem + 1} - {Math.min(indexOfLastItem, filteredWithdrawals.length)}</span> trong số <span className="font-bold text-[#111813]">{filteredWithdrawals.length}</span> giao dịch
            </span>
            
            <div className="flex gap-1 shrink-0">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-3 py-1.5 text-sm border border-gray-200 rounded-lg font-medium transition-colors ${currentPage === 1 ? 'text-gray-400 bg-gray-50 cursor-not-allowed opacity-50' : 'text-[#637588] hover:bg-gray-50'}`}
              >
                Trước
              </button>

              {getPageNumbers().map(number => (
                <button 
                  key={number}
                  onClick={() => setCurrentPage(number)}
                  className={`w-8 h-8 flex items-center justify-center text-sm font-bold rounded-lg transition-colors border ${currentPage === number ? 'bg-emerald-500 text-white border-emerald-500 shadow-sm' : 'border-transparent text-gray-600 hover:bg-gray-100 hover:border-gray-200'}`}
                >
                  {number}
                </button>
              ))}

              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`px-3 py-1.5 text-sm border border-gray-200 rounded-lg font-medium transition-colors ${currentPage === totalPages ? 'text-gray-400 bg-gray-50 cursor-not-allowed opacity-50' : 'text-[#637588] hover:bg-gray-50'}`}
              >
                Sau
              </button>
            </div>
          </div>
        )}
      </div>
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={() => !actionLoading && setConfirmModal({ ...confirmModal, isOpen: false })}
        onConfirm={executeAction}
        title={`Xác nhận ${confirmModal.actionText}`}
        description={`Bạn có chắc chắn muốn ${confirmModal.actionText} yêu cầu rút tiền này không?`}
        type={confirmModal.type === 'reject' ? "danger" : "success"}
        confirmText={`Xác nhận ${confirmModal.actionText}`}
        isLoading={actionLoading === confirmModal.id}
      />
    </div>
  );
}
