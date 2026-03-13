/* eslint-disable */
import React, { useMemo, useState, useEffect } from "react";
import { Search, Filter, FileDown } from "lucide-react";

import { useNavigate } from "react-router-dom";

const PAGE_SIZE = 5;

export default function SellerOrders() {
  const navigate = useNavigate();

  // ===== STATE =====
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);

  // ===== FETCH API =====
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(
          "https://bikestore-b7e3gudmenczf8bn.southeastasia-01.azurewebsites.net/api/seller/orders/paid",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          },
        );

        const data = await res.json();

        console.log("SELLER ORDERS:", data);

        setOrders(data.items || data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // ===== STATUS MAP =====
  const statusMap = {
    Paid: { label: "Đã thanh toán", style: "bg-yellow-100 text-yellow-700" },
    Confirmed: { label: "Đã xác nhận", style: "bg-blue-100 text-blue-700" },
    Shipping: { label: "Đang giao", style: "bg-indigo-100 text-indigo-700" },
    Completed: {
      label: "Hoàn thành",
      style: "bg-emerald-100 text-emerald-700",
    },
    Cancelled: { label: "Đã huỷ", style: "bg-gray-200 text-gray-600" },
  };

  // ===== FILTER =====
  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const matchStatus = status === "all" || o.status === status;

      const matchSearch =
        search === "" ||
        o.receiverName?.toLowerCase().includes(search.toLowerCase()) ||
        o.items?.[0]?.bikeBrand?.toLowerCase().includes(search.toLowerCase());

      return matchStatus && matchSearch;
    });
  }, [orders, status, search]);

  // ===== PAGINATION =====
  const total = filteredOrders.length;
  const totalPages = Math.ceil(total / PAGE_SIZE);

  const start = (page - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;

  const pageOrders = filteredOrders.slice(start, end);

  const confirmOrder = async (id) => {
    await fetch(
      "https://bikestore-b7e3gudmenczf8bn.southeastasia-01.azurewebsites.net/api/seller/orders/confirm",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({ orderId: id }),
      },
    );
  };

  const shippingOrder = async (id) => {
    await fetch(
      "https://bikestore-b7e3gudmenczf8bn.southeastasia-01.azurewebsites.net/api/seller/orders/shipping",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({ orderId: id }),
      },
    );
  };

  const completeOrder = async (id) => {
    await fetch(
      "https://bikestore-b7e3gudmenczf8bn.southeastasia-01.azurewebsites.net/api/seller/orders/complete",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({ orderId: id }),
      },
    );
  };

  // ===== LOADING =====
  if (loading) {
    return (
      <div className="p-10 text-center text-gray-500">Đang tải đơn hàng...</div>
    );
  }

  return (
    <div className="space-y-6">
      {/* ===== HEADER ===== */}
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">
          Đơn hàng của tôi
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Quản lý và theo dõi các giao dịch bán xe của bạn
        </p>
      </div>

      {/* ===== TABS + ACTION ===== */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {[
            { key: "all", label: `Tất cả (${orders.length})` },
            { key: "Paid", label: "Đã thanh toán" },
            { key: "Shipping", label: "Đang giao" },
            { key: "Completed", label: "Hoàn thành" },
            { key: "Cancelled", label: "Đã huỷ" },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => {
                setStatus(t.key);
                setPage(1);
              }}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                status === t.key
                  ? "bg-emerald-100 text-emerald-700"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <button className="border rounded-lg px-3 py-2 text-sm flex items-center gap-1 hover:bg-gray-50">
            <Filter size={16} /> Lọc
          </button>

          <button className="border rounded-lg px-3 py-2 text-sm flex items-center gap-1 hover:bg-gray-50">
            <FileDown size={16} /> Xuất file
          </button>
        </div>
      </div>

      {/* ===== SEARCH ===== */}
      <div className="relative max-w-sm">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          placeholder="Tìm kiếm đơn hàng, khách hàng..."
          className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-emerald-500"
        />
      </div>

      {/* ===== TABLE ===== */}
      <div className="bg-white border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              <th className="px-6 py-3 text-left">Sản phẩm</th>
              <th className="px-6 py-3 text-left">Tên người mua</th>
              <th className="px-6 py-3 text-left">Ngày đặt</th>
              <th className="px-6 py-3 text-left">Trạng thái</th>
              <th className="px-6 py-3 text-right">Tổng tiền</th>
              <th className="px-6 py-3 text-right">Thao tác</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {pageOrders.map((o) => (
              <tr key={o.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={o.items?.[0]?.image}
                      className="w-12 h-12 rounded-lg object-cover"
                    />

                    <div>
                      <div className="font-medium">
                        {o.items?.[0]?.bikeBrand}
                      </div>

                      <div className="text-xs text-gray-500">
                        {o.items?.[0]?.bikeCategory}
                      </div>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4">
                  <div className="font-medium">{o.receiverName}</div>
                  <div className="text-xs text-gray-500">{o.receiverPhone}</div>
                </td>

                <td className="px-6 py-4 text-gray-500">
                  {new Date(o.createdAt).toLocaleDateString("vi-VN")}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${statusMap[o.status]?.style}`}
                  >
                    {statusMap[o.status]?.label}
                  </span>
                </td>

                <td className="px-6 py-4 text-right font-semibold">
                  {o.totalAmount?.toLocaleString("vi-VN")} đ
                </td>

                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => navigate(`/seller/orders/${o.id}`)}
                    className="px-3 py-1.5 bg-emerald-500 text-white rounded-lg text-sm"
                  >
                    Chi tiết
                  </button>

                  {o.status === "Paid" && (
                    <button
                      onClick={() => confirmOrder(o.id)}
                      className="px-3 py-1.5 bg-blue-500 text-white rounded-lg text-sm"
                    >
                      Xác nhận
                    </button>
                  )}

                  {o.status === "Confirmed" && (
                    <button
                      onClick={() => shippingOrder(o.id)}
                      className="px-3 py-1.5 bg-indigo-500 text-white rounded-lg text-sm"
                    >
                      Giao hàng
                    </button>
                  )}

                  {o.status === "Shipping" && (
                    <button
                      onClick={() => completeOrder(o.id)}
                      className="px-3 py-1.5 bg-purple-500 text-white rounded-lg text-sm"
                    >
                      Hoàn thành
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* ===== PAGINATION ===== */}
        <div className="flex items-center justify-between px-6 py-4">
          <p className="text-sm text-gray-500">
            Hiển thị {start + 1} đến {Math.min(end, total)} của {total} đơn hàng
          </p>

          <div className="flex gap-1">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="px-3 py-1 border rounded-lg text-sm disabled:opacity-40"
            >
              Trước
            </button>

            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`w-8 h-8 rounded-lg text-sm font-medium ${
                  page === i + 1
                    ? "bg-emerald-500 text-white"
                    : "border hover:bg-gray-50"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="px-3 py-1 border rounded-lg text-sm disabled:opacity-40"
            >
              Tiếp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
