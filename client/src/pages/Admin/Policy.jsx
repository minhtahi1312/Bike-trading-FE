import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../services/axiosClient";
import {
  Search,
  Filter,
  Download,
  Save,
  Wallet,
  CheckCircle,
  ArrowUpRight,
  Eye,
  Calendar,
  DollarSign,
  X,
  Edit,
  Trash2,
  Clock,
} from "lucide-react";

const Policy = () => {
  const navigate = useNavigate();

  // --- 1. CẬP NHẬT LẠI STATE ĐỂ QUẢN LÝ MODAL VÀ FORM ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editingPolicyId, setEditingPolicyId] = useState(null);
  const [formData, setFormData] = useState({
    description: "",
    percentOfSystem: 5.0,
    appliedDate: "",
  });
  const [currentPolicy, setCurrentPolicy] = useState({
    percentOfSystem: null,
    appliedDate: null,
    isLoadingData: true,
    hasPolicy: false,
  });
  const [policies, setPolicies] = useState([]);
  const [isLoadingTable, setIsLoadingTable] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // --- 2. GỌI API  ---
  const fetchAllPolicies = async () => {
    setIsLoadingTable(true);
    try {
      const response = await axiosClient.get("/api/Policy/all");
      setPolicies(response.data);
    } catch (error) {
      console.error("Lỗi lấy danh sách Policy:", error);
    } finally {
      setIsLoadingTable(false);
    }
  };
  const fetchCurrentPolicy = async () => {
    try {
      const response = await axiosClient.get("/api/Policy/current");

      // Với axios, dữ liệu nằm trong response.data
      const data = response.data;
      setCurrentPolicy({
        percentOfSystem: data.percentOfSystem,
        appliedDate: data.appliedDate,
        isLoadingData: false,
        hasPolicy: true,
      });
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setCurrentPolicy((prev) => ({
          ...prev,
          isLoadingData: false,
          hasPolicy: false,
        }));
      } else {
        console.error("Lỗi khi lấy Policy:", error);
        setCurrentPolicy((prev) => ({ ...prev, isLoadingData: false }));
      }
    }
  };
  useEffect(() => {
    fetchCurrentPolicy();
    fetchAllPolicies();
  }, []);
  const formatDate = (isoString) => {
    if (!isoString) return "Chưa có";
    const date = new Date(isoString);
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };
  const formatTime = (isoString) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    return date.toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatForDatetimeLocal = (isoString) => {
    if (!isoString) return "";
    try {
      const date = new Date(isoString);
      // Đảm bảo date hợp lệ trước khi xử lý tiếp
      if (isNaN(date.getTime())) return "";

      // Lấy chuỗi YYYY-MM-DDTHH:mm theo giờ local chuẩn xác hơn
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");

      return `${year}-${month}-${day}T${hours}:${minutes}`;
    } catch (error) {
      console.error("Lỗi parse ngày:", error);
      return "";
    }
  };

  const renderTimelineStatus = (status) => {
    if (status === "Chờ hiệu lực") {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-600 border border-amber-200 whitespace-nowrap">
          <Clock size={12} /> Chờ hiệu lực
        </span>
      );
    }
    if (status === "Đang áp dụng" || status === "Hiệu lực") {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600 border border-emerald-200 whitespace-nowrap">
          <CheckCircle size={12} /> Đang áp dụng
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-500 border border-gray-200 whitespace-nowrap">
        {status}
      </span>
    );
  };

  const handleEditClick = (policy) => {
    setEditingPolicyId(policy.id);
    setFormData({
      description: policy.description,
      percentOfSystem: policy.percentOfSystem,
      appliedDate: formatForDatetimeLocal(policy.appliedDate),
    });
    setIsModalOpen(true);
  };

  const handleSubmitPolicy = async () => {
    if (!formData.description.trim()) {
      alert("Vui lòng nhập mô tả chính sách!");
      return;
    }
    if (!formData.appliedDate) {
      alert("Vui lòng chọn ngày giờ áp dụng!");
      return;
    }

    const percentSystem = parseFloat(formData.percentOfSystem);
    if (isNaN(percentSystem) || percentSystem < 0 || percentSystem > 100) {
      alert("Vui lòng nhập mức phí hợp lệ (từ 0 đến 100)!");
      return;
    }

    const selectedDate = new Date(formData.appliedDate);
    if (selectedDate <= new Date()) {
      alert("Lỗi: Ngày áp dụng phải ở thì tương lai!");
      return;
    }

    setIsLoading(true);
    try {
      const payload = {
        description: formData.description,
        percentOfSystem: percentSystem,
        percentOfSeller: 100 - percentSystem,
        appliedDate: formData.appliedDate + ":00",
      };

      const response = editingPolicyId
        ? await axiosClient.put(`/api/Policy/${editingPolicyId}`, payload)
        : await axiosClient.post("/api/Policy", payload);

      const data = response.data;

      if (data.success) {
        alert(
          editingPolicyId
            ? "Cập nhật Policy thành công!"
            : "Tạo Policy thành công!",
        );
        setIsModalOpen(false);
        setEditingPolicyId(null);
        setFormData({ description: "", percentOfSystem: 5.0, appliedDate: "" });

        fetchAllPolicies();
        fetchCurrentPolicy();
      } else {
        alert("Có lỗi xảy ra: " + (data.message || "Không thể thực hiện"));
      }
    } catch (error) {
      console.error("Lỗi khi kết nối API:", error);
      const errorMsg =
        error.response?.data?.message || "Lỗi kết nối đến máy chủ.";
      alert(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };
  const handleViewDetail = (id) => {
    navigate(`/admin/transactions/${encodeURIComponent(id)}`);
  };

  const handleDeletePolicy = async (id) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa chính sách này không?",
    );
    if (!confirmDelete) return;

    try {
      // Chỉ cần truyền ID, axiosClient tự thêm baseURL và Token
      const response = await axiosClient.delete(`/api/Policy/${id}`);

      if (response.data.success) {
        alert("Xóa Policy thành công!");
        fetchAllPolicies();
        fetchCurrentPolicy();
      } else {
        alert(
          "Có lỗi xảy ra: " + (response.data.message || "Không thể xóa Policy"),
        );
      }
    } catch (error) {
      console.error("Lỗi khi xóa:", error);
      alert(error.response?.data?.message || "Lỗi kết nối đến máy chủ.");
    }
  };

  const filteredPolicies = policies.filter((policy) =>
    policy.description?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // 2. Tính toán vị trí cắt mảng cho trang hiện tại
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // 3. Lấy ra danh sách policy chỉ hiển thị trên trang này
  const currentPolicies = filteredPolicies.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  // 4. Tính tổng số trang
  const totalPages = Math.ceil(filteredPolicies.length / itemsPerPage);

  // Khi gõ tìm kiếm, tự động quay về trang 1 để không bị lỗi trống dữ liệu
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  return (
    <div className="flex flex-col gap-8 font-display text-[#111813] bg-gray-50/50 min-h-screen relative">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            Giao dịch & Phí dịch vụ
          </h1>
          <p className="text-[#637588] text-base mt-2">
            Quản lý dòng tiền, theo dõi doanh thu và cấu hình phí hệ thống.
          </p>
        </div>
      </div>

      {/* TOP SECTION */}
      <div className="w-full">
        <div className="w-full bg-white rounded-xl border border-[#e5e7eb] shadow-sm p-6 relative overflow-hidden flex flex-col justify-between min-h-[220px]">
          <div className="absolute -right-10 -top-10 w-64 h-64 bg-emerald-50 rounded-full blur-3xl opacity-60 pointer-events-none"></div>
          <div className="absolute -right-4 -bottom-6 opacity-[0.03] pointer-events-none text-emerald-900 transform -rotate-12">
            <Wallet size={160} />
          </div>

          <div>
            <div className="flex justify-between items-start mb-2 relative z-10">
              <h2 className="text-lg font-bold flex items-center gap-3 text-[#111813]">
                <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600 border border-emerald-100">
                  <DollarSign size={20} />
                </div>
                Cấu hình phí dịch vụ
              </h2>
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border ${currentPolicy.hasPolicy ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-amber-50 text-amber-600 border-amber-100"}`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${currentPolicy.hasPolicy ? "bg-emerald-500 animate-pulse" : "bg-amber-500"}`}
                ></span>
                {currentPolicy.hasPolicy
                  ? "Đang áp dụng"
                  : "Chưa có chính sách"}
              </span>
            </div>

            <p className="text-[#637588] text-sm mb-6 max-w-md relative z-10 mt-2">
              Mức phí hệ thống hiện tại đang được áp dụng cho các giao dịch
              thành công. Bạn có thể lên lịch chính sách mới cho tương lai.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 relative z-10">
            <div className="flex items-center gap-8">
              <div>
                <p className="text-xs font-bold text-[#637588] uppercase mb-1 tracking-wider">
                  Hệ thống thu
                </p>
                <div className="flex items-baseline gap-1">
                  {/* Dùng biến currentPolicy để hiển thị thay vì fix cứng */}
                  <span className="text-5xl font-black text-[#111813]">
                    {currentPolicy.isLoadingData
                      ? "--"
                      : currentPolicy.hasPolicy
                        ? currentPolicy.percentOfSystem
                        : "0.0"}
                  </span>
                  <span className="text-xl font-bold text-gray-400">%</span>
                </div>
              </div>

              <div className="h-12 w-[1px] bg-gray-200"></div>

              <div>
                <p className="text-xs font-bold text-[#637588] uppercase mb-1 tracking-wider">
                  Ngày áp dụng
                </p>
                <div className="flex items-center gap-2 text-[#111813] mt-2">
                  <Calendar
                    size={20}
                    className={
                      currentPolicy.hasPolicy
                        ? "text-emerald-500"
                        : "text-gray-400"
                    }
                  />
                  {/* Dùng hàm formatDate để chuyển đổi ngày */}
                  <span className="text-xl font-bold">
                    {currentPolicy.isLoadingData
                      ? "Đang tải..."
                      : formatDate(currentPolicy.appliedDate)}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setEditingPolicyId(null);
                setFormData({
                  description: "",
                  percentOfSystem: 5.0,
                  appliedDate: "",
                });
                setIsModalOpen(true);
              }}
              className="flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-emerald-500/30 whitespace-nowrap group"
            >
              Tạo chính sách mới
              <ArrowUpRight
                size={18}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              />
            </button>
          </div>
        </div>
      </div>

      {/* MAIN TABLE */}
      <div className="bg-white border border-[#e5e7eb] rounded-xl shadow-sm flex flex-col min-h-[400px]">
        <div className="p-5 border-b border-[#e5e7eb] bg-[#fcfdfd] flex justify-between items-center rounded-t-xl">
          <h3 className="text-lg font-bold text-[#111813]">
            Lịch sử thiết lập chính sách
          </h3>
          <div className="relative w-64">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={16}
            />
            <input
              type="text"
              placeholder="Tìm kiếm mô tả..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-[#111813]"
            />
          </div>
        </div>

        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f9fafb] border-b border-[#e5e7eb]">
                <th className="px-5 py-4 text-xs font-bold text-[#637588] uppercase tracking-wider">
                  Mô tả chính sách
                </th>
                <th className="px-5 py-4 text-xs font-bold text-[#637588] uppercase tracking-wider text-right">
                  Sàn thu
                </th>
                <th className="px-5 py-4 text-xs font-bold text-[#637588] uppercase tracking-wider text-right">
                  Người bán
                </th>
                <th className="px-5 py-4 text-xs font-bold text-[#637588] uppercase tracking-wider">
                  Ngày áp dụng
                </th>
                <th className="px-5 py-4 text-xs font-bold text-[#637588] uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-5 py-4 text-xs font-bold text-[#637588] uppercase tracking-wider text-right">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e7eb]">
              {isLoadingTable ? (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-10 text-gray-500 font-medium"
                  >
                    Đang tải dữ liệu...
                  </td>
                </tr>
              ) : currentPolicies.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-10 text-gray-500 font-medium"
                  >
                    Chưa có chính sách nào được thiết lập.
                  </td>
                </tr>
              ) : (
                currentPolicies.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-5 py-4">
                      <p
                        className="text-sm font-bold text-[#111813] max-w-[250px] truncate"
                        title={item.description}
                      >
                        {item.description}
                      </p>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <span className="text-sm font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
                        {item.percentOfSystem}%
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <span className="text-sm font-bold text-gray-600">
                        {item.percentOfSeller}%
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-[#111813]">
                          {formatDate(item.appliedDate)}
                        </span>
                        <span className="text-xs text-[#637588]">
                          {formatTime(item.appliedDate)}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      {renderTimelineStatus(item.timelineStatus)}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleEditClick(item)}
                          disabled={item.timelineStatus !== "Chờ hiệu lực"} 
                          className={`p-2 rounded-lg transition-colors ${
                            item.timelineStatus === "Chờ hiệu lực"
                              ? "text-blue-500 hover:bg-blue-50" 
                              : "text-gray-300 cursor-not-allowed" 
                          }`}
                          title={
                            item.timelineStatus === "Chờ hiệu lực"
                              ? "Sửa"
                              : "Chỉ được phép sửa chính sách chưa áp dụng"
                          }
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDeletePolicy(item.id)} 
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          title="Xóa"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between px-5 py-4 bg-white border-t border-[#e5e7eb] rounded-b-xl gap-4">
            <span className="text-sm text-[#637588]">
              Hiển thị{" "}
              <span className="font-bold text-[#111813]">
                {filteredPolicies.length > 0 ? indexOfFirstItem + 1 : 0}
              </span>{" "}
              đến{" "}
              <span className="font-bold text-[#111813]">
                {Math.min(indexOfLastItem, filteredPolicies.length)}
              </span>{" "}
              trong số{" "}
              <span className="font-bold text-[#111813]">
                {filteredPolicies.length}
              </span>{" "}
              chính sách
            </span>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 text-sm font-medium border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Trước
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (number) => (
                  <button
                    key={number}
                    onClick={() => setCurrentPage(number)}
                    className={`w-8 h-8 flex items-center justify-center text-sm font-bold border rounded-lg transition-colors ${
                      currentPage === number
                        ? "bg-emerald-500 text-white border-emerald-500"
                        : "border-gray-200 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {number}
                  </button>
                ),
              )}

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 text-sm font-medium border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Sau
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 4. CODE HIỂN THỊ MODAL NHẬP DỮ LIỆU */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/50">
              <h3 className="text-lg font-extrabold text-[#111813]">
                {editingPolicyId
                  ? "Chỉnh sửa chính sách phí"
                  : "Tạo chính sách phí mới"}
              </h3>
              <button
                onClick={() => !isLoading && setIsModalOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 flex flex-col gap-5">
              <div>
                <label className="block text-sm font-bold text-[#111813] mb-2">
                  Mô tả chính sách
                </label>
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="VD: Cập nhật phí giao dịch..."
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-[#111813] mb-2">
                    Mức phí hệ thống
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      name="percentOfSystem"
                      value={formData.percentOfSystem}
                      onChange={handleInputChange}
                      step="0.1"
                      className="w-full pl-4 pr-8 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 font-bold">
                      %
                    </span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#637588] mb-2">
                    Người bán nhận
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      disabled
                      value={100 - (parseFloat(formData.percentOfSystem) || 0)}
                      className="w-full pl-4 pr-8 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-500 cursor-not-allowed"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold">
                      %
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-[#111813] mb-2">
                  Ngày giờ áp dụng
                </label>
                <input
                  type="datetime-local"
                  name="appliedDate"
                  value={formData.appliedDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                />
                <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                  <CheckCircle size={12} className="text-emerald-500" /> Chọn
                  ngày lớn hơn hiện tại.
                </p>
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setEditingPolicyId(null);
                }}
                disabled={isLoading}
                className="px-5 py-2.5 text-sm font-bold text-gray-600 hover:bg-gray-200 rounded-xl transition-colors disabled:opacity-50"
              >
                Hủy bỏ
              </button>
              <button
                onClick={handleSubmitPolicy}
                disabled={isLoading}
                className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-bold rounded-xl transition-all shadow-md shadow-emerald-500/20 disabled:bg-gray-400 disabled:shadow-none"
              >
                {isLoading
                  ? "Đang xử lý..."
                  : editingPolicyId
                    ? "Lưu thay đổi"
                    : "Xác nhận tạo"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Policy;
