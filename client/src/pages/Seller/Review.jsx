import { getSellerReviews, getReviewSummary } from "../../services/axiosClient";
import { useEffect, useState } from "react";

export default function ReviewPage() {
  const [reviews, setReviews] = useState([]);
  const [summary, setSummary] = useState(null);
  const [filterStar, setFilterStar] = useState("all");
  const filteredReviews =
    filterStar === "all"
      ? reviews
      : reviews.filter((r) => r.rating === filterStar);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reviewData = await getSellerReviews();
        const summaryData = await getReviewSummary();

        setReviews(reviewData);
        setSummary(summaryData);
      } catch (err) {
        console.error("Fetch review error:", err);
      }
    };

    fetchData();
  }, []);

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
            {summary?.averageRating?.toFixed(1) || 0}
            <span className="text-xl text-gray-400">/5</span>
          </p>

          <div className="flex justify-center gap-1 text-yellow-400 text-lg mt-2">
            {"★".repeat(Math.round(summary?.averageRating || 0))}
          </div>

          <p className="text-sm text-gray-500 mt-2">
            {summary?.totalReviews || 0} Đánh giá
          </p>
        </div>

        {/* RIGHT */}
        <div className="flex-1 space-y-3">
          {[
            { star: 5, value: summary?.fiveStars || 0 },
            { star: 4, value: summary?.fourStars || 0 },
            { star: 3, value: summary?.threeStars || 0 },
            { star: 2, value: summary?.twoStars || 0 },
            { star: 1, value: summary?.oneStar || 0 },
          ].map((item, i) => {
            const percent =
              summary?.totalReviews > 0
                ? (item.value / summary.totalReviews) * 100
                : 0;

            return (
              <div key={item.star} className="flex items-center gap-3">
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
      {/* ===== FILTER ===== */}
      <div className="flex gap-2">
        {[
          { label: "Tất cả", value: "all" },
          { label: "5 Sao", value: 5 },
          { label: "4 Sao", value: 4 },
          { label: "3 Sao", value: 3 },
          { label: "2 Sao", value: 2 },
          { label: "1 Sao", value: 1 },
        ].map((f) => (
          <button
            key={f.value}
            onClick={() => setFilterStar(f.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              filterStar === f.value
                ? "bg-emerald-500 text-white shadow-sm"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* REVIEW LIST */}
      <div className="space-y-4">
        {filteredReviews.map((r) => (
          <div
            key={r.reviewId}
            className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition"
          >
            {/* HEADER */}
            <div className="flex justify-between items-start">
              <div className="flex gap-3">
                {/* AVATAR */}
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600">
                  {r.reviewerName
                    ? r.reviewerName.charAt(0).toUpperCase()
                    : "?"}
                </div>

                <div>
                  <p className="font-semibold text-gray-900">
                    {r.reviewerName?.trim() ? r.reviewerName : "Người dùng"}
                  </p>

                  <div className="flex items-center gap-1 text-yellow-400 text-sm">
                    {"★".repeat(r.rating)}
                    {"☆".repeat(5 - r.rating)}
                  </div>
                </div>
              </div>

              <span className="text-xs text-gray-400">
                {new Date(r.createdAt).toLocaleString("vi-VN")}
              </span>
            </div>

            {/* CONTENT */}
            <p className="mt-3 text-sm text-gray-700 leading-relaxed">
              {r.comment}
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
          </div>
        ))}
      </div>
    </div>
  );
}
