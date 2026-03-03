/* eslint-disable */
import React, { useMemo, useState } from "react";
import { Search, Filter, FileDown } from "lucide-react";
import { Link } from "react-router-dom";

const PAGE_SIZE = 5;

export default function SellerOrders() {
  // ===== MOCK DATA =====
  const orders = [
    {
      id: "DH-2024",
      product: "Trek Marlin 7 - 2022",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBYHKUb-OXY4LhuARv-D80YSszSzvNiTBpQuWHwV-gRzqpjWM-RxrxGvBn7v9zVwwXeKTuXWKRI7vcrF0Nvo75yMf-v4Qw4EZxoRP5keZ5YTumzmsOQyrp-C247lRr7DERCyY7NLVkXtQq08xDcsJorx6204U3Fk_5bf-aJ5lh0xWFGuESUg3lPCH9KXrFCl3kBq68n7BgLTqDqAOtUrHQNiKFTg1MtPnHZPzWWdDOMEsafN8wF4TBMerT50D6PnKWQ-9pPYkkNur2Q",
      buyer: "Nguyễn Văn A",
      date: "10/10/2023 · 09:30",
      status: "pending",
      price: "12.500.000đ",
    },
    {
      id: "DH-2023",
      product: "Giant Escape 2 City",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDoM2K0wCx3F8R5JWqaK0D4PF0-hgb5rJY-zKMqxsdZcHKnxu185GbgBw1del6odzPk1oIU12y1Ew8d0TFqfTD1GdUOgf2UJCFlLGgekWtN3FACvPmvNd0JMaoNk7IurHdgxp5wlRNfQmrogJHlD8_gNTi9_NN2RkmF4OWbH-e1kYm60usKQJEqivl7KyqzngDoHVsXA0XkM-DkDsHDptx9jobn-wy3M94-LNBPoB8EZn3oWYEU3x90Fk2t96shdfc15eiD8k71Eggc",
      buyer: "Trần Thị B",
      date: "09/10/2023 · 14:15",
      status: "shipping",
      price: "8.200.000đ",
    },
    {
      id: "DH-2022",
      product: "Asama Solano",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDWpGkVnTEPfv8gdWtc9TJaCylIYisxHbAwLbRtYl51H4NEdTH6E3L0W4sQ-kI1Ye1HAaCnV4vZI3ZeWhTaNA9GNGbrq--I3Dkj9Qf0DuKafAk98sYnI8wyLGCSA0Q3OmHDRHZxPa2JFijEeBsSXH55lMzaZOqRDJdjaqCsEo3fxb-JNFYS7J-ywLYryRsbL7s4I0KNB5Ow04ALBtlVjo7b5N3l-yL5F12ehMeDJjryfGdCopCgSbCYjXvgm8hpL2phwnySpeK6fZ_O",
      buyer: "Lê Văn C",
      date: "08/10/2023 · 10:45",
      status: "done",
      price: "5.500.000đ",
    },
  ];

  // ===== STATE =====
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);

  // ===== STATUS MAP =====
  const statusMap = {
    pending: { label: "Chờ xác nhận", style: "bg-yellow-100 text-yellow-700" },
    shipping: { label: "Đang giao", style: "bg-blue-100 text-blue-700" },
    done: { label: "Hoàn thành", style: "bg-emerald-100 text-emerald-700" },
    cancel: { label: "Đã huỷ", style: "bg-gray-200 text-gray-600" },
  };

  // ===== FILTER =====
  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const matchStatus = status === "all" || o.status === status;
      const matchSearch =
        o.product.toLowerCase().includes(search.toLowerCase()) ||
        o.buyer.toLowerCase().includes(search.toLowerCase());
      return matchStatus && matchSearch;
    });
  }, [orders, status, search]);

  // ===== PAGINATION =====
  const total = filteredOrders.length;
  const totalPages = Math.ceil(total / PAGE_SIZE);
  const start = (page - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const pageOrders = filteredOrders.slice(start, end);

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
            { key: "pending", label: "Chờ xác nhận" },
            { key: "shipping", label: "Đang giao" },
            { key: "done", label: "Hoàn thành" },
            { key: "cancel", label: "Đã huỷ" },
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
              <th className="px-6 py-3 text-left">Mã đơn</th>
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
                <td className="px-6 py-4 font-medium">{o.id}</td>

                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={o.image}
                      alt={o.product}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <span className="font-medium">{o.product}</span>
                  </div>
                </td>

                <td className="px-6 py-4">{o.buyer}</td>
                <td className="px-6 py-4 text-gray-500">{o.date}</td>

                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      statusMap[o.status].style
                    }`}
                  >
                    {statusMap[o.status].label}
                  </span>
                </td>

                <td className="px-6 py-4 text-right font-semibold">
                  {o.price}
                </td>

                <td className="px-6 py-4 text-right">
                  <Link
                    to={`/seller/orders/${o.id}`}
                    className="text-emerald-600 hover:underline text-sm font-medium"
                  >
                    Xem chi tiết
                  </Link>
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
