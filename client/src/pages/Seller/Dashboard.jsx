/* eslint-disable */
import React from "react";
import { Eye, Package, Wallet, ShoppingBag } from "lucide-react";

export default function Dashboard() {
  const stats = [
    {
      label: "Tin đăng hiển thị",
      value: 12,
      note: "+2 hôm nay",
      icon: Eye,
      color: "text-blue-600 bg-blue-100",
    },
    {
      label: "Đơn chờ xử lý",
      value: 5,
      note: "+1 mới",
      icon: Package,
      color: "text-yellow-600 bg-yellow-100",
    },
    {
      label: "Doanh thu tạm tính",
      value: "15.5tr ₫",
      note: "+12% tháng này",
      icon: Wallet,
      color: "text-emerald-600 bg-emerald-100",
    },
    {
      label: "Tin đang bán",
      value: 9,
      note: "+1 hôm nay",
      icon: ShoppingBag,
      color: "text-purple-600 bg-purple-100",
    },
  ];

  const orders = [
    {
      id: "#DH-2024",
      product: "Trek Marlin 7",
      customer: "Nguyễn Văn A",
      status: "pending",
      price: "12.500.000đ",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBYHKUb-OXY4LhuARv-D80YSszSzvNiTBpQuWHwV-gRzqpjWM-RxrxGvBn7v9zVwwXeKTuXWKRI7vcrF0Nvo75yMf-v4Qw4EZxoRP5keZ5YTumzmsOQyrp-C247lRr7DERCyY7NLVkXtQq08xDcsJorx6204U3Fk_5bf-aJ5lh0xWFGuESUg3lPCH9KXrFCl3kBq68n7BgLTqDqAOtUrHQNiKFTg1MtPnHZPzWWdDOMEsafN8wF4TBMerT50D6PnKWQ-9pPYkkNur2Q",
    },
    {
      id: "#DH-2023",
      product: "Giant Escape",
      customer: "Trần Thị B",
      status: "shipping",
      price: "8.200.000đ",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDoM2K0wCx3F8R5JWqaK0D4PF0-hgb5rJY-zKMqxsdZcHKnxu185GbgBw1del6odzPk1oIU12y1Ew8d0TFqfTD1GdUOgf2UJCFlLGgekWtN3FACvPmvNd0JMaoNk7IurHdgxp5wlRNfQmrogJHlD8_gNTi9_NN2RkmF4OWbH-e1kYm60usKQJEqivl7KyqzngDoHVsXA0XkM-DkDsHDptx9jobn-wy3M94-LNBPoB8EZn3oWYEU3x90Fk2t96shdfc15eiD8k71Eggc",
    },
    {
      id: "#DH-2022",
      product: "Asama Road",
      customer: "Lê Văn C",
      status: "done",
      price: "5.500.000đ",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDWpGkVnTEPfv8gdWtc9TJaCylIYisxHbAwLbRtYl51H4NEdTH6E3L0W4sQ-kI1Ye1HAaCnV4vZI3ZeWhTaNA9GNGbrq--I3Dkj9Qf0DuKafAk98sYnI8wyLGCSA0Q3OmHDRHZxPa2JFijEeBsSXH55lMzaZOqRDJdjaqCsEo3fxb-JNFYS7J-ywLYryRsbL7s4I0KNB5Ow04ALBtlVjo7b5N3l-yL5F12ehMeDJjryfGdCopCgSbCYjXvgm8hpL2phwnySpeK6fZ_O",
    },
  ];

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
          Đơn hàng 7 ngày qua
        </h3>

        <div className="relative h-48">
          {/* GRID LINES */}
          <div className="absolute inset-0 flex flex-col justify-between text-xs text-gray-300">
            {[5, 4, 3, 2, 1].map((g) => (
              <div key={g} className="flex items-center gap-2">
                <span className="w-4 text-gray-400">{g}</span>
                <div className="flex-1 border-t border-gray-200"></div>
              </div>
            ))}
          </div>

          {/* BARS */}
          <div className="absolute inset-0 flex items-end justify-between gap-4 px-6">
            {[1, 2, 1, 3, 4, 2, 5].map((v, i) => (
              <div key={i} className="flex flex-col items-center flex-1 group">
                {/* VALUE */}
                <span className="text-xs text-gray-500 mb-1 opacity-0 group-hover:opacity-100 transition">
                  {v} đơn
                </span>

                {/* BAR */}
                <div
                  className="w-full bg-gradient-to-t from-emerald-500 to-emerald-400 rounded-t-md transition-all duration-300 group-hover:from-emerald-600 group-hover:to-emerald-500"
                  style={{ height: `${v * 28}px` }}
                />

                {/* DAY */}
                <span className="text-xs text-gray-400 mt-2">
                  {["T2", "T3", "T4", "T5", "T6", "T7", "CN"][i]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== CONTENT GRID ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ===== CỘT TRÁI: ORDERS ===== */}
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b flex justify-between items-center">
            <h3 className="font-bold text-lg text-gray-900">
              Đơn hàng gần đây
            </h3>
            <button className="text-sm font-semibold text-emerald-600 hover:underline">
              Xem tất cả
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-500">
                <tr>
                  <th className="px-6 py-3 text-left">Mã đơn</th>
                  <th className="px-6 py-3 text-left">Sản phẩm</th>
                  <th className="px-6 py-3 text-left">Khách hàng</th>
                  <th className="px-6 py-3 text-left">Trạng thái</th>
                  <th className="px-6 py-3 text-right">Tổng tiền</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {orders.map((o) => (
                  <tr key={o.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">{o.id}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={o.image}
                          alt={o.product}
                          className="w-11 h-11 rounded-lg object-cover bg-gray-100"
                        />
                        <span className="font-medium text-gray-900">
                          {o.product}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">{o.customer}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold
                  ${
                    o.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : o.status === "shipping"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-emerald-100 text-emerald-700"
                  }`}
                      >
                        {o.status === "pending" && "Chờ xử lý"}
                        {o.status === "shipping" && "Đang giao"}
                        {o.status === "done" && "Hoàn thành"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right font-semibold">
                      {o.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ===== CỘT PHẢI: FEATURED + MESSAGES ===== */}
        <div className="flex flex-col gap-6">
          {/* LISTING STATUS */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h3 className="font-bold text-lg mb-4 text-gray-900">
              Trạng thái tin đăng
            </h3>

            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 font-medium">Đã duyệt</span>
                <span className="bg-emerald-100 text-emerald-700 text-sm font-semibold px-3 py-1 rounded-full">
                  12
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-600 font-medium">Chờ duyệt</span>
                <span className="bg-yellow-100 text-yellow-700 text-sm font-semibold px-3 py-1 rounded-full">
                  3
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-600 font-medium">Bị từ chối</span>
                <span className="bg-red-100 text-red-700 text-sm font-semibold px-3 py-1 rounded-full">
                  1
                </span>
              </div>
            </div>
          </div>

          {/* RECENT LISTINGS */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h3 className="font-bold text-lg mb-4 text-gray-900">
              Tin đăng gần đây
            </h3>

            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <span className="font-medium">Trek Marlin 7</span>
                <span className="text-xs px-2 py-1 rounded-full bg-emerald-100 text-emerald-700">
                  Đã duyệt
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="font-medium">Giant Escape 3</span>
                <span className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-700">
                  Chờ duyệt
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="font-medium">Specialized Allez</span>
                <span className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-700">
                  Bị từ chối
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
