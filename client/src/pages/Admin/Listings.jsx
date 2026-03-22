import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../services/axiosClient";
import {
  Plus,
  Search,
  Calendar,
  Filter,
  Eye,
  Check,
  X,
  MoreVertical,
  Star,
  AlertCircle,
  Clock,
} from "lucide-react";

const Listings = () => {
  const [activeTab, setActiveTab] = useState(() => {
    return sessionStorage.getItem("adminListingTab") || "pending";
  });
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const navigate = useNavigate();
  const fetchListData = async (tabId) => {
    setIsLoading(true);
    try {
      const apiMap = {
        pending: "/api/admin/listing/pending-list", //
        inspecting: "/api/admin/listing/inspecting-list", //
        public: "/api/admin/listing/active-list", //
        rejected: "/api/admin/listing/rejected-list", //
      };

      const endpoint = apiMap[tabId] || apiMap.pending;
      const response = await axiosClient.get(endpoint);

      setData(response.data);
    } catch (error) {
      console.error(`Lỗi fetch API cho tab ${tabId}:`, error);
      setData([]);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    sessionStorage.setItem("adminListingTab", activeTab);
    fetchListData(activeTab);
  }, [activeTab]);

  const handleViewDetail = (id) => {
    navigate(`/admin/listings/${id}`);
  };

  const tabs = [
    { id: "pending", label: "Chờ duyệt", count: 15 },
    { id: "inspecting", label: "Đang kiểm định" },
    { id: "public", label: "Đã công khai" },
    { id: "rejected", label: "Bị từ chối" },
  ];

  const renderBadge = (text, color) => {
    const colors = {
      gray: "bg-gray-100 text-gray-600",
      yellow: "bg-yellow-50 text-yellow-700 border border-yellow-200",
      purple: "bg-purple-50 text-purple-700 border border-purple-200",
      green: "bg-emerald-50 text-emerald-700 border border-emerald-200",
      blue: "bg-blue-50 text-blue-700 border border-blue-200",
      red: "bg-red-50 text-red-700 border border-red-200",
    };
    return (
      <span
        className={`inline-flex items-center justify-center px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap min-w-[90px] ${colors[color] || colors.gray}`}
      >
        {text}
      </span>
    );
  };

  // Hàm xử lý khi ảnh bị lỗi
  const handleImageError = (e) => {
    e.target.src = "https://placehold.co/400x300?text=No+Image";
  };
  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const currentData = data.slice(startIndex, endIndex);

  return (
    <div className="flex flex-col gap-6 font-display text-[#111813]">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            Kiểm duyệt Tin đăng
          </h1>
          <p className="text-[#637588] text-sm mt-2 max-w-2xl">
            Xem xét và xử lý các tin đăng bán xe từ người bán. Đảm bảo chất
            lượng nội dung và an toàn cho người mua.
          </p>
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
                  ? "border-emerald-600 text-emerald-700"
                  : "border-transparent text-[#637588] hover:text-[#111813]"
              }`}
            >
              {tab.label}

              {activeTab === tab.id && !isLoading && (
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 animate-in fade-in zoom-in">
                  {data.length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f9fafb] border-y border-[#e5e7eb]">
                <th className="px-6 py-3 text-xs font-bold text-[#637588] uppercase tracking-wider whitespace-nowrap align-middle text-left">
                  Thông tin xe
                </th>
                <th className="px-6 py-3 text-xs font-bold text-[#637588] uppercase tracking-wider whitespace-nowrap align-middle text-center">
                  Người bán
                </th>
                <th className="px-6 py-3 text-xs font-bold text-[#637588] uppercase tracking-wider whitespace-nowrap align-middle text-center">
                  Giá bán
                </th>
                <th className="px-6 py-3 text-xs font-bold text-[#637588] uppercase tracking-wider whitespace-nowrap align-middle text-center">
                  Inspector
                </th>
                <th className="px-6 py-3 text-xs font-bold text-[#637588] uppercase tracking-wider whitespace-nowrap align-middle text-center">
                  Trạng thái
                </th>
                <th className="px-6 py-3 text-xs font-bold text-[#637588] uppercase tracking-wider whitespace-nowrap align-middle text-center">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e7eb]">
              {isLoading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center gap-3">
                      {/* Vòng xoay loading */}
                      <div className="w-10 h-10 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
                      <p className="text-sm text-gray-500 font-medium">
                        Đang tải dữ liệu tin đăng...
                      </p>
                    </div>
                  </td>
                </tr>
              ) : currentData && currentData.length > 0 ? (
                currentData.map((item) => {
                  const isRiskyOrRejected = item.listingStatus === "Rejected";

                  return (
                    <tr
                      key={item.id}
                      className={`hover:bg-gray-50 group transition-colors border-b border-gray-100 ${
                        isRiskyOrRejected
                          ? "opacity-50 bg-gray-50/50 grayscale-[30%]"
                          : ""
                      }`}
                    >
                      {/* Đã xóa phần Checkbox ở đây */}

                      {/* 1. Thông tin xe (trước đó là mục 2) */}
                      <td className="px-6 py-4">
                        <div className="flex gap-4">
                          <div className="w-16 h-12 rounded-lg overflow-hidden border border-gray-200 flex-shrink-0 bg-gray-50">
                            <img
                              src={
                                item.thumbnail ||
                                "https://placehold.co/400x300?text=No+Image"
                              }
                              alt={item.title}
                              className="w-full h-full object-cover"
                              onError={handleImageError}
                            />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[11px] font-bold text-emerald-600 mb-0.5">
                              #{item.id.substring(0, 8).toUpperCase()}
                            </span>
                            <span className="text-sm font-bold text-[#111813] line-clamp-1">
                              {item.title}
                            </span>
                            <div className="flex items-center gap-2 text-xs text-[#637588] mt-1">
                              <Clock size={10} />
                              <span>
                                {new Date(item.createdAt).toLocaleDateString(
                                  "vi-VN",
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* 2. Người bán */}
                      <td className="px-6 py-4">
                        {/* Thêm justify-center để đưa cụm Avatar + Tên vào giữa ô */}
                        <div className="flex items-center justify-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-xs font-bold text-emerald-700 flex-shrink-0">
                            {item.sellerName
                              ? item.sellerName.charAt(0).toUpperCase()
                              : "U"}
                          </div>
                          {/* Thêm text-left ở đây để Tên và chữ "Thành viên..." vẫn thẳng lề với nhau */}
                          <div className="flex flex-col text-left">
                            <span className="text-sm font-medium text-[#111813] whitespace-nowrap">
                              {item.sellerName || "Chưa rõ"}
                            </span>
                            <span className="text-[10px] text-[#637588] whitespace-nowrap">
                              Thành viên BikeStore
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* 3. Giá bán */}
                      {/* Thêm text-center trực tiếp vào thẻ td */}
                      <td className="px-6 py-4 text-center">
                        <div className="text-sm font-bold text-[#111813] whitespace-nowrap">
                          {item.price
                            ? `${item.price.toLocaleString("vi-VN")} đ`
                            : "Liên hệ"}
                        </div>
                      </td>

                      {/* 4. Inspector */}
                      <td className="px-6 py-4 text-center">
                        {renderBadge(
                          item.inspectorName || "Chưa có",
                          item.inspectorName === "Chưa có" ? "gray" : "purple",
                        )}
                      </td>

                      {/* 5. Trạng thái */}
                      <td className="px-6 py-4 text-center">
                        <div className="flex flex-col items-center gap-1">
                          {(() => {
                            let text = "Khác";
                            let color = "blue";

                            if (item.listingStatus === "PendingApproval") {
                              text = "Chờ duyệt";
                              color = "yellow";
                            } else if (item.listingStatus === "Rejected") {
                              text = "Từ chối";
                              color = "red";
                            } else if (item.listingStatus === "Active") {
                              if (item.bikeStatus === "PendingInspection") {
                                text = "Đang kiểm định";
                                color = "purple";
                              } else if (item.bikeStatus === "Available") {
                                text = "Đã công khai";
                                color = "green";
                              }
                            }

                            return renderBadge(text, color);
                          })()}
                          <span className="text-[10px] text-[#9ca3af] flex items-center gap-1">
                            <Clock size={10} />{" "}
                            {new Date(item.createdAt).toLocaleDateString(
                              "vi-VN",
                            )}
                          </span>
                        </div>
                      </td>

                      {/* 6. Hành động */}
                      <td className="px-6 py-4 text-center">
                        <div className="flex justify-center gap-2">
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
                  <td colSpan="6" className="px-6 py-24 text-center">
                    <div className="flex flex-col items-center justify-center gap-4">
                      <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center">
                        <AlertCircle size={40} className="text-gray-300" />
                      </div>
                      <div className="max-w-xs mx-auto">
                        <p className="text-lg font-bold text-[#111813]">
                          Chưa có tin đăng nào
                        </p>
                        <p className="text-sm text-[#637588] mt-1">
                          Danh sách mục này hiện đang trống. Vui lòng quay lại
                          sau hoặc kiểm tra các mục khác.
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
        {totalItems > 0 && (
          <div className="px-6 py-4 border-t border-[#e5e7eb] flex items-center justify-between">
            <span className="text-sm text-[#637588]">
              Hiển thị {startIndex + 1} đến {Math.min(endIndex, totalItems)}{" "}
              trong {totalItems} tin
            </span>
            <div className="flex gap-1">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 text-sm border border-gray-200 rounded text-[#637588] hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-colors"
              >
                Trước
              </button>

              {/* Vòng lặp in ra các nút số trang */}
              {[...Array(totalPages)].map((_, index) => {
                const pageNum = index + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`px-3 py-1 text-sm border rounded font-medium transition-colors ${
                      currentPage === pageNum
                        ? "bg-emerald-600 text-white border-emerald-600"
                        : "border-gray-200 text-[#637588] hover:bg-gray-50"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-3 py-1 text-sm border border-gray-200 rounded text-[#637588] hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-colors"
              >
                Tiếp
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Listings;
