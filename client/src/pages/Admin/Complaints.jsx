import React, { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Calendar,
  Eye,
  AlertTriangle,
  ShieldAlert,
  CheckCircle2,
  Clock,
  MessageSquare,
  MoreVertical,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axiosClient from "../../services/axiosClient";

export default function Complaints() {
  const navigate = useNavigate();

  // --- STATES CHÍNH ---
  const [reportsData, setReportsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeReasonId, setActiveReasonId] = useState(null);
  // States Lọc & Tìm kiếm
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  // States Phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // --- GỌI API ---
  useEffect(() => {
    const fetchReports = async () => {
      try {
        setIsLoading(true);
        const response = await axiosClient.get("/api/admin/list-reports");
        // Vì API trả về mảng trực tiếp, nên ta set thẳng response.data
        setReportsData(response.data);
      } catch (error) {
        console.error("Lỗi khi tải danh sách báo cáo:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReports();
  }, []);

  // Reset về trang 1 khi thay đổi tìm kiếm hoặc bộ lọc
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);

  useEffect(() => {
    const handleClickOutside = () => {
      setActiveReasonId(null);
    };

    if (activeReasonId) {
      window.addEventListener("click", handleClickOutside);
    }

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [activeReasonId]);

  // --- LOGIC MAP STATUS (API trả về tiếng Anh: Pending, Resolved, Rejected...) ---
  const getStatusBadge = (status) => {
    const s = status?.toLowerCase() || "";
    switch (s) {
      case "pending":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "processing":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "resolved":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "rejected":
        return "bg-gray-100 text-gray-600 border-gray-200";
      default:
        return "bg-gray-50 text-gray-600 border-gray-200";
    }
  };

  const getStatusDot = (status) => {
    const s = status?.toLowerCase() || "";
    switch (s) {
      case "pending":
        return "bg-amber-500 animate-pulse";
      case "processing":
        return "bg-blue-500";
      case "resolved":
        return "bg-emerald-500";
      default:
        return "bg-gray-400";
    }
  };

  const getStatusText = (status) => {
    const s = status?.toLowerCase() || "";
    switch (s) {
      case "pending":
        return "Chờ xử lý";
      case "processing":
        return "Đang xử lý";
      case "resolved":
        return "Đã giải quyết";
      case "rejected":
        return "Từ chối";
      default:
        return status;
    }
  };

  const pendingCount = reportsData.filter(
    (r) => r.status?.toLowerCase() === "pending",
  ).length;
  const processingCount = reportsData.filter(
    (r) => r.status?.toLowerCase() === "processing",
  ).length;
  const resolvedCount = reportsData.filter(
    (r) => r.status?.toLowerCase() === "resolved",
  ).length;
  const rejectedCount = reportsData.filter(
    (r) => r.status?.toLowerCase() === "rejected",
  ).length;

  const stats = [
    {
      title: "Chờ xử lý",
      value: isLoading ? "..." : pendingCount,
      icon: <AlertTriangle size={24} />,
      color: "text-amber-600",
      bg: "bg-amber-100",
      border: "hover:border-amber-500/50",
    },
    {
      title: "Đang giải quyết",
      value: isLoading ? "..." : processingCount,
      icon: <Clock size={24} />,
      color: "text-blue-600",
      bg: "bg-blue-100",
      border: "hover:border-blue-500/50",
    },
    {
      title: "Đã giải quyết",
      value: isLoading ? "..." : resolvedCount,
      icon: <CheckCircle2 size={24} />,
      color: "text-emerald-600",
      bg: "bg-emerald-100",
      border: "hover:border-emerald-500/50",
    },
    {
      title: "Từ chối",
      value: isLoading ? "..." : rejectedCount,
      icon: <ShieldAlert size={24} />,
      color: "text-gray-600",
      bg: "bg-gray-100",
      border: "hover:border-gray-500/50",
    },
  ];

  // --- BƯỚC 1: LỌC DỮ LIỆU ---
  const filteredReports = reportsData.filter((report) => {
    // 1. Lọc theo Search (reportCode, reporterName, reporterPhone)
    let searchLower = searchTerm.toLowerCase();
    if (searchLower.startsWith("#")) {
      searchLower = searchLower.substring(1);
    }

    const matchesSearch =
      (report.reportCode &&
        report.reportCode.toLowerCase().includes(searchLower)) ||
      (report.reporterName &&
        report.reporterName.toLowerCase().includes(searchLower)) ||
      (report.reporterPhone &&
        report.reporterPhone.toLowerCase().includes(searchLower));

    // 2. Lọc theo Trạng thái dropdown
    const matchesStatus =
      statusFilter === "all" ||
      (report.status &&
        report.status.toLowerCase() === statusFilter.toLowerCase());

    // 3. (Tùy chọn nâng cao) Lọc theo ngày - Hiện tại mình cứ để true vì cần xử lý chuỗi ngày giờ hơi phức tạp
    // const matchesDate = true;

    return matchesSearch && matchesStatus;
  });

  // --- BƯỚC 2: PHÂN TRANG DỮ LIỆU ĐÃ LỌC ---
  const totalPages = Math.ceil(filteredReports.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredReports.slice(indexOfFirstItem, indexOfLastItem);

  // Hàm tạo mảng số trang để render ([1, 2, 3...])
  const getPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  return (
    <div className="flex flex-col gap-6 font-display pb-10">
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[#111813] text-3xl font-extrabold tracking-tight">
            Quản lý Khiếu nại
          </h1>
          <p className="text-[#637588] text-sm mt-1">
            Theo dõi, phân tích và xử lý các báo cáo vi phạm từ người dùng.
          </p>
        </div>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`bg-white rounded-xl p-5 border border-[#e5e7eb] shadow-sm flex flex-col justify-between h-full gap-4 transition-colors ${stat.border}`}
          >
            <div className="flex justify-between items-start">
              <div className={`p-2 rounded-lg ${stat.bg} ${stat.color}`}>
                {stat.icon}
              </div>
            </div>
            <div>
              <p className="text-[#637588] text-sm font-medium">{stat.title}</p>
              <h3 className="text-[#111813] text-2xl font-bold mt-1">
                {stat.value}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* SEARCH & FILTER AREA */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden w-full flex flex-col min-h-[600px]">
        {/* TOOLBAR: Ô tìm kiếm nằm dính vào khung */}
        <div className="p-4 border-b border-gray-100 bg-[#fcfdfd] shrink-0">
          <div className="relative w-full max-w-md">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Tìm theo mã khiếu nại, tên hoặc SĐT..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
            />
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto w-full flex-1">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-[#f9fafb] border-b border-[#e5e7eb]">
                <th className="px-6 py-4 text-xs font-bold text-[#637588] uppercase tracking-wider w-[15%]">
                  Mã KN
                </th>
                <th className="px-6 py-4 text-xs font-bold text-[#637588] uppercase tracking-wider w-[15%]">
                  Người Gửi
                </th>
                <th className="px-6 py-4 text-xs font-bold text-[#637588] uppercase tracking-wider w-[20%]">
                  Đối tượng
                </th>
                <th className="px-6 py-4 text-xs font-bold text-[#637588] uppercase tracking-wider w-[150px]">
                  Nội dung / Lý do
                </th>
                <th className="px-6 py-4 text-xs font-bold text-[#637588] uppercase tracking-wider w-[140px]">
                  Trạng thái
                </th>
                {/* Thay cột Hành động thành cột Loại báo cáo */}
                <th className="px-6 py-4 text-xs font-bold text-[#637588] uppercase tracking-wider w-[18%] whitespace-nowrap">
                  Loại báo cáo
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e7eb]">
              {isLoading ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-10 text-center text-[#637588] font-medium"
                  >
                    <div className="flex justify-center items-center gap-2">
                      <div className="w-5 h-5 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                      Đang tải dữ liệu...
                    </div>
                  </td>
                </tr>
              ) : filteredReports.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-10 text-center text-gray-500 font-medium"
                  >
                    Không tìm thấy báo cáo nào phù hợp.
                  </td>
                </tr>
              ) : (
                currentItems.map((item, index) => (
                  <tr
                    key={item.reportId || index}
                    className="hover:bg-gray-50/80 transition-colors group"
                  >
                    {/* Mã & Ngày */}
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <span className="text-sm font-bold text-[#111813]">
                          {item.reportCode}
                        </span>
                        <span className="text-xs text-[#637588] flex items-center gap-1">
                          <Clock size={12} />
                          {item.createdAt ? item.createdAt.split(" ")[0] : ""}
                        </span>
                      </div>
                    </td>

                    {/* Người khiếu nại */}
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-sm font-bold text-[#111813]">
                          {item.reporterName}
                        </span>
                        <span className="text-xs text-[#637588]">
                          {item.reporterPhone}
                        </span>
                      </div>
                    </td>

                    {/* Đối tượng */}
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <span
                          className="text-sm font-semibold text-emerald-600 hover:underline truncate"
                          title={item.bikeTitle || item.sellerName}
                        >
                          {item.bikeTitle ? item.bikeTitle : item.sellerName}
                        </span>
                        {item.bikeCode && (
                          <span className="text-xs text-[#637588] font-mono">
                            {item.bikeCode}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Nội dung */}
                    <td className="px-6 py-4 max-w-[200px] relative">
                      <div className="flex items-start gap-2">
                        {/* Nút bấm để mở/đóng ô nội dung */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveReasonId(
                              activeReasonId === item.reportId
                                ? null
                                : item.reportId,
                            );
                          }}
                          className={`shrink-0 mt-0.5 transition-colors ${activeReasonId === item.reportId ? "text-emerald-500" : "text-gray-400 hover:text-emerald-500"}`}
                        >
                          <MessageSquare size={16} />
                        </button>

                        {/* Nội dung thu gọn (line-clamp) */}
                        <p className="text-sm text-[#111813] font-medium line-clamp-2">
                          {item.reason}
                        </p>

                        {/* Ô nhỏ hiện nội dung đầy đủ (Popover) */}
                        {activeReasonId === item.reportId && (
                          <div className="absolute z-[100] top-full left-6 mt-2 w-72 p-4 bg-white border border-gray-200 rounded-xl shadow-2xl animate-in fade-in zoom-in duration-200">
                            {/* Mũi tên trỏ lên */}
                            <div className="absolute -top-2 left-4 w-4 h-4 bg-white border-t border-l border-gray-200 rotate-45"></div>

                            <div className="relative">
                              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                                Nội dung chi tiết:
                              </h4>
                              <p className="text-sm text-[#111813] leading-relaxed max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                                {item.reason}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                    {/* Trạng thái */}
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border whitespace-nowrap ${getStatusBadge(item.status)}`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full shrink-0 ${getStatusDot(item.status)}`}
                        ></span>
                        {getStatusText(item.status)}
                      </span>
                    </td>

                    {/* Loại Báo Cáo */}
                    <td className="px-6 py-4">
                      <span className="text-xs font-bold text-[#475569] bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-md inline-block whitespace-nowrap">
                        {item.reportType}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        {!isLoading && filteredReports.length > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 border-t border-[#e5e7eb] bg-white gap-4 shrink-0 rounded-b-xl">
            <div className="text-sm text-[#637588]">
              Hiển thị{" "}
              <span className="font-bold text-[#111813]">
                {indexOfFirstItem + 1}-
                {Math.min(indexOfLastItem, filteredReports.length)}
              </span>{" "}
              trong{" "}
              <span className="font-bold text-[#111813]">
                {filteredReports.length}
              </span>{" "}
              khiếu nại
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="w-8 h-8 flex items-center justify-center border border-[#e5e7eb] rounded-lg text-sm text-[#637588] hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                &lt;
              </button>

              {getPageNumbers().map((num) => (
                <button
                  key={num}
                  onClick={() => setCurrentPage(num)}
                  className={`w-8 h-8 flex items-center justify-center border rounded-lg text-sm font-medium transition-colors
                    ${
                      currentPage === num
                        ? "border-emerald-600 bg-emerald-600 text-white shadow-sm font-bold"
                        : "border-[#e5e7eb] bg-white text-[#637588] hover:bg-gray-50 hover:text-[#111813]"
                    }
                  `}
                >
                  {num}
                </button>
              ))}

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="w-8 h-8 flex items-center justify-center border border-[#e5e7eb] rounded-lg text-sm text-[#637588] hover:bg-gray-50 hover:text-[#111813] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                &gt;
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
