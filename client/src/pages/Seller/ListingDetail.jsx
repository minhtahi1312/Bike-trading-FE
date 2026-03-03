import { useParams } from "react-router-dom";
import { useState } from "react";
import { Eye, Heart, ShieldCheck, CheckCircle, FileText } from "lucide-react";
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

    brand: "Specialized",
    model: "Rockhopper",
    category: "MTB (Địa hình)",
    size: "Size M",
    weight: "14.2kg",

    frameMaterial: "Nhôm A1 Premium Aluminum",
    fork: "SR Suntour XCM 29 (100mm)",
    groupset: "Shimano Deore 1x10",
    crankset: "Shimano 30T",
    cassette: "11-42T",
    brakes: "Shimano MT200 (Thủy lực)",
    wheelSize: "29 inch",
    tire: "Ground Control Sport 29x2.3",
    condition: "Nguyên bản 95%",
    usageTime: "Đã sử dụng 6 tháng",

    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBYHKUb-OXY4LhuARv-D80YSszSzvNiTBpQuWHwV-gRzqpjWM-RxrxGvBn7v9zVwwXeKTuXWKRI7vcrF0Nvo75yMf-v4Qw4EZxoRP5keZ5YTumzmsOQyrp-C247lRr7DERCyY7NLVkXtQq08xDcsJorx6204U3Fk_5bf-aJ5lh0xWFGuESUg3lPCH9KXrFCl3kBq68n7BgLTqDqAOtUrHQNiKFTg1MtPnHZPzWWdDOMEsafN8wF4TBMerT50D6PnKWQ-9pPYkkNur2Q",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAETyWklrNRjlP7ABOOjXV-lVYWeQMcA8nf_O6mGW8ZDpxmwEKv6kk2gFnY41tvpQfOYbY3VQdumO-1AtqhP8cbqw_OZrVr3qvV9MtsGenfBKRZZCyCVR1zqQCWgD4b4VMEHAlpD8nITEyG-N5kRO7dnSFUHzA6AORKVobwoRWipsKx-BErxZSrSxgJNpOupv4X-H-K9CifPwhuBwvdPvtW4srueBcy4k62lXIJDP-WUQv1UhbY0dKelv4PkLBGQm5Z5IZeM8LsKchH",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDWpGkVnTEPfv8gdWtc9TJaCylIYisxHbAwLbRtYl51H4NEdTH6E3L0W4sQ-kI1Ye1HAaCnV4vZI3ZeWhTaNA9GNGbrq--I3Dkj9Qf0DuKafAk98sYnI8wyLGCSA0Q3OmHDRHZxPa2JFijEeBsSXH55lMzaZOqRDJdjaqCsEo3fxb-JNFYS7J-ywLYryRsbL7s4I0KNB5Ow04ALBtlVjo7b5N3l-yL5F12ehMeDJjryfGdCopCgSbCYjXvgm8hpL2phwnySpeK6fZ_O",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDoM2K0wCx3F8R5JWqaK0D4PF0-hgb5rJY-zKMqxsdZcHKnxu185GbgBw1del6odzPk1oIU12y1Ew8d0TFqfTD1GdUOgf2UJCFlLGgekWtN3FACvPmvNd0JMaoNk7IurHdgxp5wlRNfQmrogJHlD8_gNTi9_NN2RkmF4OWbH-e1kYm60usKQJEqivl7KyqzngDoHVsXA0XkM-DkDsHDptx9jobn-wy3M94-LNBPoB8EZn3oWYEU3x90Fk2t96shdfc15eiD8k71Eggc",
    ],

    description: `
Cần bán xe đạp địa hình Specialized Rockhopper bản 2023,
màu xanh rêu, size M phù hợp chiều cao 1m65 - 1m75.

Xe mua cuối năm 2023, sử dụng nhẹ nhàng cuối tuần.
Chưa từng va chạm mạnh, khung sườn còn rất mới.

Tình trạng chi tiết:
• Khung sườn nhôm A1 Premium Aluminum nhẹ và bền
• Bộ truyền động Shimano Deore 1x10 hoạt động mượt
• Phuộc trước SR Suntour XCM hành trình 100mm
• Phanh đĩa thủy lực Shimano MT200 an toàn tuyệt đối
• Lốp Ground Control Sport 29x2.3 bám đường tốt

Bao test toàn bộ xe.
Tặng kèm bình nước + giá đỡ + khóa chống trộm.
`,
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

            <div className="flex gap-4 mb-4">
              <div className="flex-1 bg-gray-100 rounded-lg p-4 text-center">
                <Eye className="mx-auto mb-2 text-blue-500" size={22} />
                <p className="text-xl font-bold">
                  {listing.views.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500">Lượt xem</p>
              </div>

              <div className="flex-1 bg-gray-100 rounded-lg p-4 text-center">
                <Heart className="mx-auto mb-2 text-red-500" size={22} />
                <p className="text-xl font-bold text-red-500">
                  {listing.likes}
                </p>
                <p className="text-sm text-gray-500">Quan tâm</p>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Tin nhắn hỏi mua</span>
                <span className="font-semibold">{listing.messages}</span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-emerald-500 h-2 rounded-full"
                  style={{ width: "60%" }}
                />
              </div>
            </div>
          </div>

          {/* INSPECTION */}
          <div className="bg-white p-6 rounded-xl shadow relative overflow-hidden">
            {/* background shield mờ */}
            <ShieldCheck
              className="absolute right-4 top-4 text-emerald-100"
              size={120}
            />

            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <ShieldCheck className="text-emerald-500" size={20} />
              Trạng thái Kiểm định
            </h3>

            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="text-emerald-500" size={20} />
              <p className="text-emerald-600 font-semibold">
                Đã hoàn tất kiểm định
              </p>
            </div>

            <p className="text-sm text-gray-500 mb-3">Cập nhật: 14/04/2024</p>

            <div className="bg-gray-100 p-3 rounded-lg mb-4">
              <div className="flex justify-between mb-1">
                <span className="text-gray-600">Chất lượng tổng thể</span>
                <span className="text-emerald-600 font-bold">
                  {listing.inspectionScore}/100
                </span>
              </div>

              <div className="flex justify-between text-sm mt-2">
                <span>Khung sườn</span>
                <span className="bg-emerald-100 text-emerald-700 px-2 rounded">
                  {listing.frameStatus}
                </span>
              </div>

              <div className="flex justify-between text-sm mt-1">
                <span>Bộ truyền động</span>
                <span className="bg-yellow-100 text-yellow-700 px-2 rounded">
                  {listing.drivetrainStatus}
                </span>
              </div>
            </div>

            <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded-lg flex items-center justify-center gap-2">
              <FileText size={18} />
              Xem báo cáo chi tiết
            </button>
          </div>

          {/* TECHNICAL INFO */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-semibold mb-4">Thông số kỹ thuật</h3>

            <p className="text-2xl font-bold text-emerald-600 mb-3">
              {listing.price.toLocaleString()}
            </p>

            <div className="text-sm text-gray-700 space-y-2">
              <p>
                <strong>Địa điểm:</strong> {listing.location}
              </p>
              <p>
                <strong>Thương hiệu:</strong> {listing.brand}
              </p>
              <p>
                <strong>Dòng xe:</strong> {listing.model}
              </p>
              <p>
                <strong>Loại xe:</strong> {listing.category}
              </p>
              <p>
                <strong>Kích thước:</strong> {listing.size}
              </p>
              <p>
                <strong>Trọng lượng:</strong> {listing.weight}
              </p>

              <hr className="my-2" />

              <p>
                <strong>Chất liệu khung:</strong> {listing.frameMaterial}
              </p>
              <p>
                <strong>Phuộc trước:</strong> {listing.fork}
              </p>

              <hr className="my-2" />

              <p>
                <strong>Groupset:</strong> {listing.groupset}
              </p>
              <p>
                <strong>Đùi đĩa:</strong> {listing.crankset}
              </p>
              <p>
                <strong>Líp:</strong> {listing.cassette}
              </p>

              <hr className="my-2" />

              <p>
                <strong>Phanh:</strong> {listing.brakes}
              </p>
              <p>
                <strong>Kích thước bánh:</strong> {listing.wheelSize}
              </p>
              <p>
                <strong>Lốp:</strong> {listing.tire}
              </p>

              <hr className="my-2" />

              <p>
                <strong>Tình trạng:</strong> {listing.condition}
              </p>
              <p>
                <strong>Thời gian sử dụng:</strong> {listing.usageTime}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetail;
