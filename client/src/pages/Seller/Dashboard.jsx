/* eslint-disable */

import { Eye, Package, Wallet, ShoppingBag, Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const isNewOrder = (date) => {
    if (!date) return false;

    const diff = Date.now() - new Date(date).getTime();
    return diff < 24 * 60 * 60 * 1000; // 24h
  };
  const getInitial = (name) => {
    return name?.charAt(0).toUpperCase() || "?";
  };

  const colors = [
    "bg-red-100 text-red-600",
    "bg-blue-100 text-blue-600",
    "bg-yellow-100 text-yellow-600",
    "bg-purple-100 text-purple-600",
    "bg-emerald-100 text-emerald-600",
  ];

  const getColor = (name) => {
    const index = name?.charCodeAt(0) % colors.length;
    return colors[index];
  };
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    fetch(`${import.meta.env.VITE_API_URL}/api/SellerDashboard/dashboard`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((res) => setData(res))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (data) {
      setTimeout(() => setAnimate(true), 100);
    }
  }, [data]);

  if (!data)
    return (
      <div className="flex justify-center items-center h-40 text-gray-400">
        Đang tải dữ liệu...
      </div>
    );
  const max = Math.max(...data.orderChart.map((i) => i.value), 1);

  const stats = data
    ? [
        {
          label: "Tin đăng hiển thị",
          value: data.cards.activeListings,
          icon: Eye,
          color: "text-blue-600 bg-blue-100",
        },
        {
          label: "Chờ xác nhận",
          value: data.cards.pendingOrders,
          icon: Package,
          color: "text-yellow-600 bg-yellow-100",
        },
        {
          label: "Doanh thu",
          value:
            (data?.cards?.totalRevenue || 0).toLocaleString("vi-VN") + " ₫",
          icon: Wallet,
          color: "text-emerald-600 bg-emerald-100",
        },
        {
          label: "Tin bị từ chối",
          value: data.cards.rejectedListings,
          icon: ShoppingBag,
          color: "text-red-600 bg-red-100",
        },
      ]
    : [];

  const orders = data?.recentOrders || [];

  return (
    <div className="space-y-8">
      {/* ===== HEADER ===== */}
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900">
          Tổng quan cửa hàng
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Theo dõi hoạt động kinh doanh của bạn
        </p>
      </div>

      {/* ===== STATS ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((item, idx) => (
          <div
            key={idx}
            className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col gap-4 hover:border-emerald-500/50 transition"
          >
            <div className="flex items-center justify-between">
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center ${item.color}`}
              >
                <item.icon size={22} />
              </div>
              {item.note && (
                <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                  {item.note}
                </span>
              )}
            </div>

            <div>
              <p className="text-sm text-gray-500 font-medium">{item.label}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {item.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ===== CHART ===== */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="font-bold text-lg text-gray-900 mb-6">
          Đơn hàng 7 ngày gần nhất
        </h3>

        <div className="relative h-64">
          {/* GRID */}
          <div className="absolute inset-0 flex flex-col justify-between">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="border-t border-gray-200 w-full"></div>
            ))}
          </div>

          {/* BARS */}
          <div className="absolute inset-0 flex items-end gap-3 h-full">
            {data?.orderChart.map((item, i) => (
              <div
                key={i}
                className="flex flex-col items-center flex-1 group relative"
              >
                {/* 🔥 TOOLTIP */}
                <div className="absolute -top-10 opacity-0 translate-y-2 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                  <div className="bg-gray-900 text-white text-xs px-2 py-1 rounded shadow-md whitespace-nowrap">
                    {item.value} đơn
                  </div>
                  <div className="w-2 h-2 bg-gray-900 rotate-45 mx-auto -mt-1"></div>
                </div>

                {/* BAR */}
                <div
                  className="w-full bg-gradient-to-t from-emerald-500 to-emerald-400 hover:from-emerald-600 hover:to-emerald-500 rounded-t-md transition-all duration-700 ease-out"
                  style={{
                    height: animate ? `${item.value * 20}px` : "0px",
                    transitionDelay: `${i * 100}ms`,
                  }}
                />

                {/* LABEL */}
                <span className="text-xs text-gray-400 mt-2">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== CONTENT GRID ===== */}
      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          {/* HEADER */}
          <div className="px-6 py-4 border-b flex justify-between items-center">
            <h3 className="font-bold text-lg text-gray-900">
              Đơn hàng gần đây
            </h3>
            <button
              onClick={() => navigate("/seller/orders")}
              className="text-sm font-semibold text-emerald-600 hover:underline"
            >
              Xem tất cả
            </button>
          </div>

          {/* TABLE */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              {/* HEADER */}
              <thead className="bg-gray-50 text-gray-500">
                <tr>
                  <th className="px-6 py-3 text-left">Mã đơn</th>
                  <th className="px-6 py-3 text-left">Ngày thanh toán</th>
                  <th className="px-6 py-3 text-left">Khách hàng</th>
                  <th className="px-6 py-3 text-left">Trạng thái</th>
                  <th className="px-6 py-3 text-right">Tổng tiền</th>
                </tr>
              </thead>

              {/* BODY */}
              <tbody className="divide-y">
                {orders.map((o) => (
                  <tr
                    key={o.orderId}
                    onClick={(e) => {
                      e.stopPropagation();

                      navigate(`/seller/orders/${o.items?.[0]?.id}`);
                    }}
                    className={`cursor-pointer hover:bg-emerald-50/50 hover:shadow-sm transition-all duration-200 ${
                      isNewOrder(o.date) ? "bg-emerald-50/60" : ""
                    }`}
                  >
                    {/* ID */}
                    <td className="px-6 py-4 font-medium flex items-center gap-2">
                      #{o.orderId.slice(0, 6)}
                      {isNewOrder(o.date) && (
                        <span className="text-xs bg-emerald-500 text-white px-2 py-0.5 rounded-full">
                          Mới
                        </span>
                      )}
                    </td>

                    {/*  NGÀY THANH TOÁN */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar size={16} className="text-gray-400" />
                        {o.date
                          ? new Date(o.date).toLocaleDateString("vi-VN")
                          : "--"}
                      </div>
                    </td>

                    {/* CUSTOMER */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {/* AVATAR */}
                        <div
                          className={`w-9 h-9 rounded-full flex items-center justify-center font-semibold transition transform hover:scale-110 cursor-pointer ${getColor(
                            o.customerName,
                          )}`}
                          title={o.customerName}
                        >
                          {getInitial(o.customerName)}
                        </div>

                        {/* NAME */}
                        <span className="font-medium">
                          {o.customerName || "--"}
                        </span>
                      </div>
                    </td>

                    {/* STATUS */}
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${
                          o.status === "Shipping"
                            ? "bg-blue-100 text-blue-700"
                            : o.status === "Completed"
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        <span className="w-2 h-2 rounded-full bg-current"></span>

                        {o.status === "Shipping" && "Đang giao"}
                        {o.status === "Completed" && "Hoàn thành"}
                        {o.status === "Pending" && "Chờ xử lý"}
                      </span>
                    </td>

                    {/* PRICE */}
                    <td className="px-6 py-4 text-right font-semibold">
                      {o.totalAmount?.toLocaleString("vi-VN") || 0} ₫
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
