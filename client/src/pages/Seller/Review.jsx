import React from "react";

const mockReviews = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    rating: 5,
    content:
      "Xe đạp Trek Marlin 7 mình nhận được rất ưng ý. Ngoại hình còn mới 98% như shop mô tả. Giao hàng nhanh, đóng gói cẩn thận.",
    product: "Trek Marlin 7 - Size M",
    date: "20/05/2024 14:30",
    reply:
      "Cảm ơn bạn đã tin tưởng ủng hộ shop! Chúc bạn có trải nghiệm tuyệt vời 🚴‍♂️",
  },
  {
    id: 2,
    name: "Trần Thị B",
    rating: 4,
    content:
      "Xe Giant Escape đi khá ổn trong tầm giá. Tuy nhiên giao hàng hơi chậm.",
    product: "Giant Escape 3",
    date: "19/05/2024 09:15",
    reply: null,
  },
];

export default function ReviewPage() {
  const avgRating = 4.9;
  const totalReviews = 128;

  return (
    <div className="p-6 space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Đánh giá & Uy tín Shop
        </h1>
        <p className="text-gray-500 text-sm">
          Quản lý phản hồi từ khách hàng và chỉ số uy tín của cửa hàng
        </p>
      </div>

      {/* OVERVIEW */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex gap-10">
        {/* LEFT */}
        <div className="w-56 text-center flex flex-col justify-center">
          <p className="text-5xl font-bold text-gray-900 leading-none">
            4.9<span className="text-xl text-gray-400">/5</span>
          </p>

          <div className="flex justify-center gap-1 text-yellow-400 text-lg mt-2">
            {"★★★★★"}
          </div>

          <p className="text-sm text-gray-500 mt-2">128 Đánh giá</p>
        </div>

        {/* RIGHT */}
        <div className="flex-1 space-y-3">
          {[
            { star: 5, value: 108 },
            { star: 4, value: 12 },
            { star: 3, value: 4 },
            { star: 2, value: 2 },
            { star: 1, value: 2 },
          ].map((item, i) => {
            const percent = (item.value / 128) * 100;

            return (
              <div key={i} className="flex items-center gap-3">
                <span className="w-10 text-sm text-gray-600">
                  {item.star} sao
                </span>

                <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full transition-all"
                    style={{ width: `${percent}%` }}
                  />
                </div>

                <span className="text-sm text-gray-500 w-10 text-right">
                  {item.value}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* FILTER */}
      <div className="flex gap-2">
        {["Tất cả", "5 Sao", "4 Sao", "3 Sao"].map((f, i) => (
          <button
            key={i}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              i === 0
                ? "bg-emerald-500 text-white shadow-sm"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* REVIEW LIST */}
      <div className="space-y-4">
        {mockReviews.map((r) => (
          <div
            key={r.id}
            className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition"
          >
            {/* HEADER */}
            <div className="flex justify-between items-start">
              <div className="flex gap-3">
                {/* AVATAR */}
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600">
                  {r.name.charAt(0)}
                </div>

                <div>
                  <p className="font-semibold text-gray-900">{r.name}</p>

                  <div className="flex items-center gap-1 text-yellow-400 text-sm">
                    {"★".repeat(r.rating)}
                    {"☆".repeat(5 - r.rating)}
                  </div>
                </div>
              </div>

              <span className="text-xs text-gray-400">{r.date}</span>
            </div>

            {/* CONTENT */}
            <p className="mt-3 text-sm text-gray-700 leading-relaxed">
              {r.content}
            </p>

            {/* PRODUCT */}
            <div className="mt-3 flex items-center gap-3 bg-gray-50 border border-gray-100 p-3 rounded-xl">
              {/* IMAGE */}
              <div className="w-14 h-14 rounded-lg overflow-hidden bg-gray-200 flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1485965120184-e220f721d03e"
                  alt="bike"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* INFO */}
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">{r.product}</p>

                <p className="text-xs text-gray-400 mt-1">
                  Mã đơn: #DH2024 • Xe địa hình
                </p>
              </div>
            </div>

            {/* REPLY */}
            {r.reply && (
              <div className="mt-4 bg-emerald-50 border border-emerald-100 p-3 rounded-lg text-sm text-emerald-700">
                <span className="font-semibold">Phản hồi của shop:</span>{" "}
                {r.reply}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
