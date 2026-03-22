import { getSellerReports } from "../../services/axiosClient";
import Pagination from "../../components/Seller/Pagination";
import React, { useEffect, useState } from "react";

export default function ReportPage() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const REPORT_TYPE = {
    1: "Vấn đề đơn hàng",
    2: "Vấn đề người bán",
    3: "Vấn đề người mua",
    4: "Vấn đề thanh toán",
    5: "Khác",
  };

  const colors = [
    "bg-red-100 text-red-600",
    "bg-blue-100 text-blue-600",
    "bg-yellow-100 text-yellow-600",
    "bg-purple-100 text-purple-600",
  ];

  const getColor = (name) => {
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const getInitial = (name) => {
    return name?.charAt(0).toUpperCase() || "?";
  };
  const pageSize = 5;

  const getTypeStyle = (type) => {
    switch (type) {
      case 1:
        return "bg-blue-50 text-blue-700";
      case 2:
        return "bg-yellow-50 text-yellow-700";
      case 3:
        return "bg-purple-50 text-purple-700";
      case 4:
        return "bg-red-50 text-red-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  // format date
  const formatDate = (date) => {
    return new Date(date).toLocaleString("vi-VN");
  };

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const data = await getSellerReports();
        setReports(data);
      } catch (err) {
        console.error("Lỗi fetch reports:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  // FILTER
  const filteredReports =
    selectedType === "all"
      ? reports
      : reports.filter((r) => r.type === Number(selectedType));

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedType, sortOrder]);

  // SORT
  const sortedReports = [...filteredReports].sort((a, b) => {
    if (sortOrder === "newest") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    return new Date(a.createdAt) - new Date(b.createdAt);
  });

  // PAGINATION
  const totalPages = Math.ceil(sortedReports.length / pageSize);

  const paginatedReports = sortedReports.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );
  return (
    <div className="p-6 space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Báo cáo & Khiếu nại
        </h1>
        <p className="text-gray-500 text-sm">
          Danh sách các báo cáo từ người dùng
        </p>
      </div>

      <div className="flex gap-4">
        {/* FILTER TYPE */}
        <select
          className="border rounded px-3 py-2 text-sm"
          value={selectedType}
          onChange={(e) => {
            setSelectedType(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="all">Tất cả loại</option>
          {Object.entries(REPORT_TYPE).map(([key, value]) => (
            <option key={key} value={key}>
              {value}
            </option>
          ))}
        </select>

        {/* SORT */}
        <select
          className="border rounded px-3 py-2 text-sm"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="newest">Mới nhất</option>
          <option value="oldest">Cũ nhất</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {/* HEADER */}
        <div className="grid grid-cols-4 px-6 py-4 text-xs font-semibold text-gray-500 uppercase bg-gray-50 border-b">
          <div>Mã KN & Ngày gửi</div>
          <div>Người khiếu nại</div>
          <div>Nội dung / Lý do</div>
          <div className="text-center">Loại báo cáo</div>
        </div>

        {/* BODY */}
        <div className="divide-y">
          {loading ? (
            <p className="p-6 text-center">Đang tải...</p>
          ) : reports.length === 0 ? (
            <p className="p-6 text-center">Không có dữ liệu</p>
          ) : (
            paginatedReports.map((r) => (
              <div
                key={r.reportId}
                className="grid grid-cols-4 px-6 py-5 items-center hover:bg-gray-50 transition"
              >
                {/* ID + DATE */}
                <div>
                  <p className="font-semibold text-gray-900">
                    #{r.reportId.slice(0, 8)}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {formatDate(r.createdAt)}
                  </p>
                </div>

                {/* USER */}
                <div className="flex items-center gap-3">
                  {/* AVATAR */}
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${getColor(
                      r.reporterName,
                    )}`}
                  >
                    {getInitial(r.reporterName)}
                  </div>

                  {/* INFO */}
                  <div>
                    <p className="font-medium text-gray-900">
                      {r.reporterName}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {r.reporterPhone}
                    </p>
                  </div>
                </div>

                {/* CONTENT */}
                <div className="text-sm text-gray-700 max-w-md">{r.reason}</div>

                {/* TYPE */}
                <div className="flex justify-center">
                  <span
                    className={`text-xs px-3 py-1.5 rounded-full font-medium ${getTypeStyle(
                      r.type,
                    )}`}
                  >
                    {REPORT_TYPE[r.type]}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* FOOTER (tạm giữ cứng, lát làm pagination thật) */}
        <div className="border-t">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}
