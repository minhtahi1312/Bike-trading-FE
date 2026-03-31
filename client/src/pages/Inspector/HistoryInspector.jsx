import React, { useState, useEffect } from "react";
import { Search, Filter, Calendar, Eye, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import axiosClient from "../../services/axiosClient";
import "react-datepicker/dist/react-datepicker.css";

export default function HistoryInspector() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
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
      const response = await axiosClient.get(
        "/api/inspector/inspection-history",
        {
          params: {
            pageNumber: pageNumber,
            pageSize: pageSize,
          },
        },
      );
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
      case "passed":
        return "bg-emerald-50 text-emerald-700 border border-emerald-100";
      case "failed":
        return "bg-red-50 text-red-700 border border-red-100";
      default:
        return "bg-gray-50 text-gray-600";
    }
  };

  const getResultDot = (result) => {
    return result === "passed" ? "bg-emerald-500" : "bg-red-500";
  };

  return (
    <>
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-[#111813] text-3xl font-extrabold tracking-tight">
            Lịch sử các xe đã được kiểm định
          </h1>
          <p className="text-[#637588] text-sm mt-1">
            Quản lý và xem lại danh sách tất cả các xe đã thực hiện kiểm
            định.
          </p>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl border border-[#e5e7eb] shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex flex-col justify-center items-center py-20 gap-3">
            <Loader2 className="animate-spin text-emerald-500" size={40} />
            <p className="text-sm text-[#637588] font-medium">
              Đang tải dữ liệu...
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white border-b border-[#e5e7eb]">
                  <th className="px-6 py-4 text-xs font-bold text-[#637588] uppercase tracking-wider">
                    Mã tin
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-[#637588] uppercase tracking-wider">
                    Tên xe
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-[#637588] uppercase tracking-wider">
                    Ngày kiểm định
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-[#637588] uppercase tracking-wider">
                    Kết quả
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-[#637588] uppercase tracking-wider text-center">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e5e7eb]">
                {historyList && historyList.length > 0 ? (
                  historyList.map((item) => (
                    <tr
                      key={item.inspectionId}
                      className="hover:bg-gray-50 transition-colors group"
                    >
                      <td className="px-6 py-4">
                        <span className="text-sm font-bold text-[#637588]">
                          #{item.bikeCode}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={item.thumbnail}
                            alt={item.bikeName}
                            className="w-12 h-8 rounded object-cover border border-[#e5e7eb]"
                            onError={(e) => {
                              e.target.src = "https://via.placeholder.com/150";
                            }}
                          />
                          <div>
                            <p className="font-bold text-[#111813] text-sm">
                              {item.bikeName}
                            </p>
                            <span className="text-xs text-[#637588]">
                              {item.bikeStatus}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span className="text-sm font-medium text-[#111813]">
                          {item.inspectionDate
                            ? new Date(item.inspectionDate).toLocaleDateString(
                                "vi-VN",
                              )
                            : "---"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold 
    ${item.score >= 50 ? getResultBadge("passed") : getResultBadge("failed")}`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full 
      ${item.score >= 50 ? getResultDot("passed") : getResultDot("failed")}`}
                          ></span>
                          {item.score >= 50 ? "Đạt" : " Không đạt"} 
                    
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() =>
                            navigate(`/inspector/history/${item.inspectionId}`)
                          }
                          className="inline-flex items-center justify-center text-[#9ca3af] hover:text-emerald-600 hover:bg-emerald-50 p-2 rounded-full transition-all"
                          title="Xem chi tiết"
                        >
                          <Eye size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-10 text-center text-[#637588]"
                    >
                      Chưa có dữ liệu lịch sử kiểm định.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* PAGINATION */}
        <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 border-t border-[#e5e7eb] bg-white gap-4">
          <div className="text-sm text-[#637588]">
            Hiển thị trang{" "}
            <span className="font-bold text-[#111813]">{pageNumber}</span> trên{" "}
            <span className="font-bold text-[#111813]">{totalPages}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              disabled={pageNumber === 1}
              onClick={() => setPageNumber((prev) => prev - 1)}
              className="w-8 h-8 flex items-center justify-center border border-[#e5e7eb] rounded-lg disabled:opacity-50 hover:bg-gray-50"
            >
              &lt;
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => setPageNumber(i + 1)}
                className={`w-8 h-8 rounded-lg text-sm font-bold transition-all ${pageNumber === i + 1 ? "bg-emerald-600 text-white shadow-sm" : "bg-white text-[#637588] border border-[#e5e7eb] hover:bg-gray-50"}`}
              >
                {i + 1}
              </button>
            ))}

            <button
              disabled={pageNumber === totalPages}
              onClick={() => setPageNumber((prev) => prev + 1)}
              className="w-8 h-8 flex items-center justify-center border border-[#e5e7eb] rounded-lg disabled:opacity-50 hover:bg-gray-50"
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
