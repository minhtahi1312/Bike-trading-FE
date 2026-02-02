/* eslint-disable */
import React from "react";
import { Search, Pencil, Eye, Calendar, Heart } from "lucide-react";

export default function SellerListings() {
  const listings = [
    {
      id: 1,
      title: "Trek Marlin 7 - 2022",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBYHKUb-OXY4LhuARv-D80YSszSzvNiTBpQuWHwV-gRzqpjWM-RxrxGvBn7v9zVwwXeKTuXWKRI7vcrF0Nvo75yMf-v4Qw4EZxoRP5keZ5YTumzmsOQyrp-C247lRr7DERCyY7NLVkXtQq08xDcsJorx6204U3Fk_5bf-aJ5lh0xWFGuESUg3lPCH9KXrFCl3kBq68n7BgLTqDqAOtUrHQNiKFTg1MtPnHZPzWWdDOMEsafN8wF4TBMerT50D6PnKWQ-9pPYkkNur2Q",
      status: "approved",
      date: "20/10/2023",
      views: 1245,
      likes: 42,
      price: "12.500.000đ",
      desc: "Xe còn mới 95%, đã bảo dưỡng đầy đủ. Phù hợp cho người mới bắt đầu chơi MTB.",
    },
    {
      id: 2,
      title: "Giant Escape 2 City Disc",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDoM2K0wCx3F8R5JWqaK0D4PF0-hgb5rJY-zKMqxsdZcHKnxu185GbgBw1del6odzPk1oIU12y1Ew8d0TFqfTD1GdUOgf2UJCFlLGgekWtN3FACvPmvNd0JMaoNk7IurHdgxp5wlRNfQmrogJHlD8_gNTi9_NN2RkmF4OWbH-e1kYm60usKQJEqivl7KyqzngDoHVsXA0XkM-DkDsHDptx9jobn-wy3M94-LNBPoB8EZn3oWYEU3x90Fk2t96shdfc15eiD8k71Eggc",
      status: "pending",
      date: "22/10/2023",
      views: 0,
      likes: 0,
      price: "8.200.000đ",
      desc: "Dòng xe touring đường phố, phanh đĩa dầu. Xe chính chủ, ít đi.",
    },
    {
      id: 3,
      title: "Specialized Rockhopper Elite 29",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDWpGkVnTEPfv8gdWtc9TJaCylIYisxHbAwLbRtYl51H4NEdTH6E3L0W4sQ-kI1Ye1HAaCnV4vZI3ZeWhTaNA9GNGbrq--I3Dkj9Qf0DuKafAk98sYnI8wyLGCSA0Q3OmHDRHZxPa2JFijEeBsSXH55lMzaZOqRDJdjaqCsEo3fxb-JNFYS7J-ywLYryRsbL7s4I0KNB5Ow04ALBtlVjo7b5N3l-yL5F12ehMeDJjryfGdCopCgSbCYjXvgm8hpL2phwnySpeK6fZ_O",
      status: "review",
      date: "18/10/2023",
      views: 0,
      likes: 0,
      price: "18.000.000đ",
      desc: "Xe MTB chuyên nghiệp, khung nhôm siêu nhẹ. Đang gửi trung tâm thẩm định.",
    },
  ];

  const statusMap = {
    approved: "Đã duyệt",
    pending: "Chờ duyệt",
    review: "Đang kiểm định",
    sold: "Đã bán",
  };

  const statusStyle = {
    approved: "bg-emerald-100 text-emerald-700",
    pending: "bg-yellow-100 text-yellow-700",
    review: "bg-blue-100 text-blue-700",
    sold: "bg-gray-200 text-gray-600",
  };

  return (
    <div className="space-y-6">
      {/* ===== HEADER ===== */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold text-gray-900">
          Tin đăng của tôi
        </h1>
        <span className="text-sm text-gray-500">
          Tổng số tin: {listings.length}
        </span>
      </div>

      {/* ===== FILTER ===== */}
      <div className="bg-white border rounded-xl p-4 flex flex-col lg:flex-row gap-4">
        <div className="flex-1 relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            placeholder="Tìm kiếm theo tên xe..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <select className="border rounded-lg px-3 py-2 text-sm">
          <option>Tất cả trạng thái</option>
          <option>Đã duyệt</option>
          <option>Chờ duyệt</option>
          <option>Đang kiểm định</option>
          <option>Đã bán</option>
        </select>

        <select className="border rounded-lg px-3 py-2 text-sm">
          <option>Mới nhất</option>
          <option>Cũ nhất</option>
        </select>
      </div>

      {/* ===== LIST ===== */}
      <div className="space-y-4">
        {listings.map((item) => (
          <div
            key={item.id}
            className="bg-white border rounded-xl p-4 flex gap-4"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-40 h-28 object-cover rounded-lg"
            />

            <div className="flex-1 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded-full ${statusStyle[item.status]}`}
                >
                  {statusMap[item.status]}
                </span>
              </div>

              <h3 className="font-bold text-gray-900">{item.title}</h3>

              <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <Calendar size={14} className="text-gray-400" />
                  {item.date}
                </span>

                <span className="flex items-center gap-1">
                  <Eye size={14} className="text-blue-500" />
                  {item.views} lượt xem
                </span>

                <span className="flex items-center gap-1">
                  <Heart size={14} className="text-rose-500" />
                  {item.likes} quan tâm
                </span>
              </div>

              <p className="text-sm text-gray-600 line-clamp-2">{item.desc}</p>
            </div>

            <div className="flex flex-col items-end justify-between">
              <p className="font-bold text-emerald-600 text-lg">{item.price}</p>

              <div className="flex gap-2">
                <button className="border rounded-lg px-3 py-1 text-sm hover:bg-gray-50">
                  Ẩn tin
                </button>
                <button className="border rounded-lg px-3 py-1 text-sm flex items-center gap-1 hover:bg-gray-50">
                  <Pencil size={14} /> Chỉnh sửa
                </button>
                <button className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg px-3 py-1 text-sm flex items-center gap-1">
                  <Eye size={14} /> Xem chi tiết
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
