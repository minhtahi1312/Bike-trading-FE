import React, { useState, useEffect } from "react";
import axiosClient from "../../services/axiosClient";
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  AlertCircle,
  Layers,
  Tag,
  Settings,
} from "lucide-react";

const Categories = () => {
  const [activeTab, setActiveTab] = useState("brands"); 

  const [listData, setListData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;

  // --- EFFECT DEBOUNCE TÌM KIẾM ---
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const fetchCategoryData = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (debouncedSearch) params.append("search", debouncedSearch);
      params.append("page", currentPage);
      params.append("size", pageSize);

      let endpoint = "";
      if (activeTab === "brands") endpoint = "/api/admin/list-brands";
      else if (activeTab === "types") endpoint = "/api/admin/list-categories";
      else if (activeTab === "groupsets") endpoint = "/api/admin/list-groupsets";

      const response = await axiosClient.get(`${endpoint}?${params.toString()}`);
      const data = response.data;

      setListData(data.items || []);
      setTotalPages(data.totalPage || 1);

    } catch (error) {
      console.error(`Lỗi tải danh sách ${activeTab}:`, error);
      setListData([]);
      setTotalPages(1);
    } finally {
      setIsLoading(false);
    }
  };

  
  useEffect(() => {
    fetchCategoryData();
  }, [activeTab, debouncedSearch, currentPage]);

  
  useEffect(() => {
    setCurrentPage(1);
    setSearchTerm("");
    setDebouncedSearch("");
  }, [activeTab]);

  // Render Table Content
  const renderTableRows = () => {
    if (isLoading) {
      return (
        <tr>
          <td colSpan="5" className="px-6 py-20 text-center">
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
              <p className="text-sm text-gray-500 font-medium">Đang tải dữ liệu...</p>
            </div>
          </td>
        </tr>
      );
    }

    if (!listData || listData.length === 0) {
      return (
        <tr>
          <td colSpan="5" className="px-6 py-24 text-center">
            <div className="flex flex-col items-center justify-center gap-4">
              <AlertCircle size={40} className="text-gray-300" />
              <p className="text-sm text-[#637588]">Chưa có dữ liệu cho danh mục này.</p>
            </div>
          </td>
        </tr>
      );
    }

    return listData.map((item, index) => (
      <tr key={item.stt || index} className="hover:bg-gray-50 transition-colors group border-b border-gray-100">
        <td className="px-6 py-4 text-sm font-bold text-[#637588] text-center w-[5%]">{item.stt}</td>
        <td className="px-6 py-4 w-[35%] text-sm font-bold text-[#111813] capitalize">
          {activeTab === "brands" ? item.tenThuongHieu :
           activeTab === "types" ? item.tenLoaiXe :
           item.name || item.tenDanhMuc}
        </td>
        <td className="px-6 py-4 text-sm font-bold text-[#111813] text-center w-[20%]">{item.tongTinDang}</td>
        <td className="px-6 py-4 text-sm font-bold text-[#111813] text-center w-[20%]">{item.soLuongSP}</td>
        <td className="px-6 py-4 text-sm font-bold text-emerald-600 text-center w-[20%]">{item.daBan}</td>
      </tr>
    ));
  };

  return (
    <div className="flex flex-col gap-6 font-display text-[#111813] bg-gray-50/50 min-h-screen">
      {/* --- HEADER --- */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight flex items-center justify-between">
          Quản lý Danh mục
          <span className="flex items-center gap-2 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100 animate-pulse">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Hệ thống đồng bộ
          </span>
        </h1>
        <p className="text-[#637588] text-sm mt-2 max-w-3xl">
          Quản lý dữ liệu gốc cho các bộ lọc, form đăng bán và checklist kiểm định. Dữ liệu tại đây sẽ đồng bộ toàn hệ thống.
        </p>
      </div>

      {/* --- MAIN CONTENT CARD --- */}
      <div className="bg-white border border-[#e5e7eb] rounded-xl shadow-sm flex flex-col min-h-[600px]">
        {/* TABS HEADER */}
        <div className="flex border-b border-[#e5e7eb] px-6 pt-2">
          {[
            { id: "brands", label: "Thương hiệu (Brands)", icon: <Tag size={16} /> },
            { id: "types", label: "Danh mục xe (Categories)", icon: <Layers size={16} /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-4 text-sm font-bold border-b-2 transition-all ${
                activeTab === tab.id
                  ? "border-emerald-500 text-emerald-600"
                  : "border-transparent text-[#637588] hover:text-[#111813] hover:bg-gray-50 rounded-t-lg"
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* TOOLBAR */}
        <div className="p-5 flex flex-col md:flex-row gap-3 justify-between items-center bg-[#fcfdfd] border-b border-[#e5e7eb]">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={`Tìm kiếm ${activeTab === "brands" ? "thương hiệu" : "danh mục"}...`}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-[#111813]"
            />
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f9fafb] border-b border-[#e5e7eb]">
                <th className="px-6 py-4 text-xs font-bold text-[#637588] uppercase tracking-wider text-center w-[5%]">#</th>
                <th className="px-6 py-4 text-xs font-bold text-[#637588] uppercase tracking-wider w-[35%]">
                  {activeTab === "brands" ? "Tên thương hiệu" : "Tên danh mục"}
                </th>
                <th className="px-6 py-4 text-xs font-bold text-[#637588] uppercase tracking-wider text-center w-[20%]">Tổng tin đăng</th>
                <th className="px-6 py-4 text-xs font-bold text-[#637588] uppercase tracking-wider text-center w-[20%]">Số lượng SP</th>
                <th className="px-6 py-4 text-xs font-bold text-[#637588] uppercase tracking-wider text-center w-[20%]">Đã bán</th>
              </tr>
            </thead>
            <tbody className={`divide-y divide-[#e5e7eb] ${isLoading ? 'opacity-50' : ''}`}>
               {renderTableRows()}
            </tbody>
          </table>
        </div>

        {/* FOOTER  */}
        {!isLoading && listData.length > 0 && (
          <div className="px-6 py-4 border-t border-[#e5e7eb] flex items-center justify-between bg-white rounded-b-xl">
            <span className="text-sm text-[#637588] font-medium">
               Trang <span className="font-bold text-[#111813]">{currentPage}</span> / {totalPages}
            </span>

            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1 || isLoading}
                className="px-4 py-1.5 text-sm border border-gray-200 rounded-lg text-[#637588] hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
              >
                Trước
              </button>

              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage >= totalPages || isLoading}
                className="px-4 py-1.5 text-sm border border-gray-200 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:bg-gray-400 disabled:border-transparent disabled:cursor-not-allowed transition-colors font-bold shadow-sm shadow-emerald-600/20 disabled:shadow-none"
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

export default Categories;