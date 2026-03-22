import React, { useState, useEffect } from "react";
import axiosClient from "../../services/axiosClient";
import { Bell, Filter, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
export default function HomeInspector() {
  const navigate = useNavigate();

  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    pageNumber: 1,
    pageSize: 5,
    totalPages: 1,
  });
  const fetchBikes = async (page = 1) => {
    setLoading(true);
    try {
      const response = await axiosClient.get(`/api/inspector/pending-bikes`, {
        params: {
          pageNumber: page,
          pageSize: pagination.pageSize,
        },
      });

      const mappedData = response.data.items.map((item) => ({
        id: item.bikeCode,
        realId: item.id,
        name: item.bikeName,
        image: item.thumbnail,
        seller: item.sellerName,
        phone: item.sellerPhoneNumber,
        date: new Date(item.createdAt).toLocaleDateString("vi-VN"),
        status: "pending",
        statusText: "Chờ kiểm định",
      }));

      setBikes(mappedData);
      setPagination((prev) => ({
        ...prev,
        pageNumber: page,
        totalPages: response.data.totalPages,
      }));
    } catch (error) {
      console.error("Lỗi API:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBikes(pagination.pageNumber);
  }, [pagination.pageNumber]);
  

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return "bg-amber-50 text-amber-700 border border-amber-100";
      case "processing":
        return "bg-blue-50 text-blue-700 border border-blue-100";
      case "done":
        return "bg-emerald-50 text-emerald-700 border border-emerald-100";
      default:
        return "bg-gray-50 text-gray-600";
    }
  };

  return (
    <>
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-[#111813] text-3xl font-extrabold tracking-tight">
            Danh sách kiểm định
          </h1>
          <p className="text-[#637588] text-sm mt-1">
            Quản lý và xử lý các yêu cầu kiểm định xe mới nhất.
          </p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-[#e5e7eb] rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm text-[#637588]">
            <Bell size={18} /> Thông báo
            <span className="flex h-2 w-2 rounded-full bg-red-500 -ml-1"></span>
          </button>
        </div>
      </div>

     

      {/* TABLE */}
      <div className="bg-white rounded-xl border border-[#e5e7eb] shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-[#e5e7eb] flex justify-between items-center">
          <h3 className="text-[#111813] text-lg font-bold">Danh sách xe</h3>
          <button className="flex items-center gap-1 text-sm font-semibold text-[#637588] hover:text-emerald-600">
            <Filter size={16} /> Bộ lọc
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f9fafb]">
                <th className="px-6 py-3 text-xs font-semibold text-[#637588] uppercase">
                  Thông tin xe
                </th>
                <th className="px-6 py-3 text-xs font-semibold text-[#637588] uppercase">
                  Người bán
                </th>
                <th className="px-6 py-3 text-xs font-semibold text-[#637588] uppercase">
                  Ngày tạo
                </th>
                <th className="px-6 py-3 text-xs font-semibold text-[#637588] uppercase">
                  Trạng thái
                </th>
                <th className="px-6 py-3 text-xs font-semibold text-[#637588] uppercase text-right">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e7eb]">
              {loading ? (
                <tr>
                  <td colSpan="5" className="py-20 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <Loader2
                        className="animate-spin text-emerald-500"
                        size={32}
                      />
                      <p className="text-sm text-[#637588]">
                        Đang tải danh sách xe...
                      </p>
                    </div>
                  </td>
                </tr>
              ) : bikes.length > 0 ? (
                bikes.map((bike) => (
                  <tr
                    key={bike.realId}
                    className="hover:bg-gray-50 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={bike.image}
                          alt={bike.name}
                          className="w-10 h-10 rounded-lg object-cover border border-[#e5e7eb]"
                        />
                        <div>
                          <p className="font-bold text-[#111813] text-sm">
                            {bike.name}
                          </p>
                          <span className="text-xs text-[#637588] font-mono">
                            {bike.id}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-[#111813]">
                        {bike.seller}
                      </p>
                      <p className="text-xs text-[#637588]">{bike.phone}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#637588]">
                      {bike.date}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${getStatusBadge(bike.status)}`}
                      >
                        {bike.statusText}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() =>
                          navigate(`/inspector/inspect/${bike.realId}`)
                        }
                        className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm shadow-emerald-500/30"
                      >
                        Kiểm định
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-20 text-center text-[#637588]">
                    Không tìm thấy xe nào đang chờ kiểm định.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION (PHÂN TRANG)  */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-[#e5e7eb] bg-white">
          {/* Bên trái: Thông tin số lượng */}
          <div className="text-sm text-[#637588]">
            Trang{" "}
            <span className="font-medium text-[#111813]">
              {pagination.pageNumber}
            </span>{" "}
            trên{" "}
            <span className="font-medium text-[#111813]">
              {pagination.totalPages}
            </span>
          </div>

          {/* Bên phải: Các nút điều hướng */}
          <div className="flex items-center gap-1.5">
            <button
              disabled={pagination.pageNumber <= 1}
              onClick={() => fetchBikes(pagination.pageNumber - 1)}
              className="px-3 py-1.5 border border-[#e5e7eb] rounded-lg text-sm text-[#637588] hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Trước
            </button>

            <div className="px-4 py-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-lg text-sm font-bold">
              {pagination.pageNumber}
            </div>

            <button
              disabled={pagination.pageNumber >= pagination.totalPages}
              onClick={() => fetchBikes(pagination.pageNumber + 1)}
              className="px-3 py-1.5 border border-[#e5e7eb] rounded-lg text-sm text-[#637588] hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Tiếp
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
