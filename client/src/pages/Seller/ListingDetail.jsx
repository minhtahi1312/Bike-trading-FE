import { useParams } from "react-router-dom";
import { useState } from "react";

const ListingDetail = () => {
  const { id } = useParams();

  const [activeImage, setActiveImage] = useState(0);

  const listing = {
    id,
    title: "Specialized Rockhopper 2023",
    code: "SP-8821",
    date: "12/04/2024",
    price: 18000000,
    location: "Hà Nội",
    views: 1245,
    likes: 48,
    messages: 12,
    inspectionScore: 92,
    frameStatus: "Tốt",
    drivetrainStatus: "Khá",
    images: ["/bike1.jpg", "/bike2.jpg", "/bike3.jpg", "/bike4.jpg"],
    description: `Cần bán xe đạp địa hình Specialized Rockhopper bản 2023,
màu xanh rêu, size M phù hợp chiều cao 1m65 - 1m75.`,
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">{listing.title}</h1>
          <p className="text-gray-500">
            Đăng ngày {listing.date} • Mã tin #{listing.code}
          </p>
        </div>

        <div className="flex gap-3">
          <button className="bg-red-100 text-red-600 px-4 py-2 rounded-lg">
            Xóa tin
          </button>
          <button className="bg-black text-white px-4 py-2 rounded-lg">
            Chỉnh sửa tin
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* LEFT */}
        <div className="col-span-2 space-y-6">
          {/* GALLERY */}
          <div className="bg-white p-4 rounded-xl shadow">
            <img
              src={listing.images[activeImage]}
              className="w-full h-[400px] object-cover rounded-lg"
              alt=""
            />

            <div className="flex gap-3 mt-4">
              {listing.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  onClick={() => setActiveImage(index)}
                  className={`w-24 h-20 object-cover rounded-lg cursor-pointer border-2 ${
                    activeImage === index
                      ? "border-green-500"
                      : "border-transparent"
                  }`}
                  alt=""
                />
              ))}
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-lg font-semibold mb-3">Mô tả chi tiết</h3>
            <p className="text-gray-600 whitespace-pre-line">
              {listing.description}
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="space-y-6">
          {/* STATS */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-semibold mb-4">Thống kê hoạt động</h3>

            <div className="flex justify-between mb-4">
              <div className="text-center">
                <p className="text-2xl font-bold">{listing.views}</p>
                <p className="text-gray-500 text-sm">Lượt xem</p>
              </div>

              <div className="text-center">
                <p className="text-2xl font-bold text-red-500">
                  {listing.likes}
                </p>
                <p className="text-gray-500 text-sm">Quan tâm</p>
              </div>
            </div>

            <p className="text-sm text-gray-600">
              Tin nhắn hỏi mua: {listing.messages}
            </p>
          </div>

          {/* INSPECTION */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-semibold mb-4">Trạng thái Kiểm định</h3>

            <p className="text-green-600 font-semibold mb-2">
              Đã hoàn tất kiểm định
            </p>

            <p className="text-xl font-bold text-green-600 mb-2">
              {listing.inspectionScore}/100
            </p>

            <div className="text-sm text-gray-600">
              <p>Khung sườn: {listing.frameStatus}</p>
              <p>Bộ truyền động: {listing.drivetrainStatus}</p>
            </div>

            <button className="mt-4 w-full bg-green-500 text-white py-2 rounded-lg">
              Xem báo cáo chi tiết
            </button>
          </div>

          {/* TECHNICAL INFO */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-semibold mb-4">Thông số kỹ thuật</h3>

            <p className="text-2xl font-bold text-green-600 mb-3">
              {listing.price.toLocaleString()}đ
            </p>

            <div className="text-sm text-gray-600 space-y-2">
              <p>Địa điểm: {listing.location}</p>
              <p>Thương hiệu: Specialized</p>
              <p>Dòng xe: Rockhopper</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetail;
