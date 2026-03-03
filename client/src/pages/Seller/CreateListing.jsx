import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Bike,
  Ruler,
  Wrench,
  Cog,
  Disc,
  ShieldCheck,
  HelpCircle,
  CheckCircle,
  ThumbsUp,
  ImagePlus,
  Camera,
  DollarSign,
  ImageIcon,
  Video,
  X,
} from "lucide-react";

export default function CreateListing() {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const handleSubmit = async () => {
    if (loading) return;

    try {
      setLoading(true);
      toast.loading("Đang đăng tin...");

      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.dismiss();
      toast.success("Tin đăng đã được tạo và đang chờ duyệt.");

      navigate("/seller/listings");
    } catch (error) {
      toast.dismiss();
      toast.error("Đăng tin thất bại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-10 space-y-8">
      {/* ===== STEP INDICATOR ===== */}
      <div className="flex justify-center gap-10">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                step >= s
                  ? "bg-emerald-500 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {s}
            </div>
            <span className="text-sm font-medium">
              {s === 1 && "Thông tin"}
              {s === 2 && "Kỹ thuật"}
              {s === 3 && "Hình ảnh"}
            </span>
          </div>
        ))}
      </div>

      {/* ===== STEP CONTENT ===== */}
      {step === 1 && <StepBasic />}
      {step === 2 && <StepTechnical />}
      {step === 3 && <StepImages />}

      {/* ===== NAVIGATION BUTTONS ===== */}
      <div className="flex justify-between pt-6">
        {step > 1 ? (
          <button
            onClick={() => setStep(step - 1)}
            className="px-6 py-2 border rounded-lg"
          >
            Quay lại
          </button>
        ) : (
          <div />
        )}

        {step < 3 ? (
          <button
            onClick={() => setStep(step + 1)}
            className="px-6 py-2 bg-emerald-500 text-white rounded-lg"
          >
            Tiếp theo →
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`px-8 py-3 text-white rounded-lg transition
    ${
      loading
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-emerald-600 hover:bg-emerald-700"
    }
  `}
          >
            {loading ? "Đang xử lý..." : "Đăng tin ngay"}
          </button>
        )}
      </div>
    </div>
  );
}

function StepProgress({ step }) {
  const steps = [
    { id: 1, label: "Thông tin" },
    { id: 2, label: "Kỹ thuật" },
    { id: 3, label: "Hình ảnh" },
  ];

  return (
    <div className="w-full flex justify-center mb-10">
      <div className="flex items-center w-full max-w-3xl">
        {steps.map((item, index) => {
          const isActive = step === item.id;
          const isCompleted = step > item.id;

          return (
            <div key={item.id} className="flex items-center flex-1">
              {/* Circle */}
              <div className="flex flex-col items-center w-full relative">
                <div
                  className={`
                    w-10 h-10 flex items-center justify-center rounded-full
                    text-sm font-semibold transition-all duration-300
                    ${
                      isCompleted
                        ? "bg-emerald-500 text-white"
                        : isActive
                          ? "bg-emerald-500 text-white ring-4 ring-emerald-100"
                          : "bg-gray-200 text-gray-500"
                    }
                  `}
                >
                  {isCompleted ? "✓" : item.id}
                </div>

                <span
                  className={`mt-3 text-sm font-medium ${
                    isActive || isCompleted ? "text-gray-900" : "text-gray-400"
                  }`}
                >
                  {item.label}
                </span>
              </div>

              {/* Line */}
              {index !== steps.length - 1 && (
                <div
                  className={`h-1 flex-1 mx-2 transition-all duration-300 ${
                    step > item.id ? "bg-emerald-500" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
function StepBasic() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-gray-900">
          Bước 1: Thông tin tin đăng
        </h1>
        <p className="text-gray-500 mt-2">
          Cung cấp các thông tin nền tảng giúp người mua dễ dàng tìm thấy tin
          đăng của bạn.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-8">
        {/* LEFT SIDE - FORM */}
        <div className="col-span-2 bg-white border rounded-2xl p-8 space-y-6 shadow-sm">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold uppercase tracking-wide text-gray-600 mb-2">
              Tiêu đề tin đăng *
            </label>
            <input
              placeholder="Ví dụ: Xe đạp Road Giant TCR Advanced 2022"
              className="w-full border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold uppercase tracking-wide text-gray-600 mb-2">
              Mô tả chi tiết *
            </label>
            <textarea
              rows={6}
              placeholder="Viết về lịch sử sử dụng xe, tình trạng bảo dưỡng..."
              className="w-full border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-2">
              <span>Tối thiểu 30 ký tự để được duyệt nhanh</span>
              <span>0 / 3000 ký tự</span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE PANEL */}
        <div className="space-y-6">
          {/* Tip Card */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6">
            <h3 className="font-bold text-lg mb-4 text-emerald-700">
              💡 Mẹo bán nhanh
            </h3>
            <ul className="space-y-3 text-sm text-gray-700">
              <li>✔️ Mô tả trung thực giúp tăng 80% tỷ lệ tin tưởng.</li>
              <li>✔️ Giá cả hợp lý giúp cạnh tranh hơn.</li>
            </ul>
          </div>

          {/* Security Card */}
          <div className="bg-white border rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-lg mb-3">🔐 An toàn & Bảo mật</h3>
            <p className="text-sm text-gray-600">
              Thông tin của bạn được bảo mật. Chúng tôi chỉ chia sẻ thông tin
              khi giao dịch được xác thực.
            </p>
            <button className="mt-3 text-emerald-600 text-sm font-semibold hover:underline">
              Xem quy tắc cộng đồng →
            </button>
          </div>

          {/* Preview Box */}
          <div className="border-2 border-dashed rounded-2xl p-6 text-center text-gray-400 text-sm">
            Xem trước nhanh
          </div>
        </div>
      </div>
    </div>
  );
}

function StepTechnical() {
  const [selectedSize, setSelectedSize] = useState("M");
  const [condition, setCondition] = useState("good");
  const [price, setPrice] = useState("");
  const handlePriceChange = (e) => {
    const rawValue = e.target.value.replace(/\D/g, ""); // chỉ giữ số

    if (!rawValue) {
      setPrice("");
      return;
    }

    const formatted = Number(rawValue).toLocaleString("vi-VN");
    setPrice(formatted);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-0">
      {/* ===== TITLE ===== */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">
          Tạo tin - Bước 2: Thông số kỹ thuật xe
        </h2>
        <p className="text-gray-500 mt-1">
          Vui lòng cung cấp chính xác các thông số để tăng độ tin cậy cho bài
          đăng của bạn.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ================= LEFT ================= */}
        <div className="lg:col-span-2 space-y-6">
          {/* 1️⃣ PHÂN LOẠI XE */}
          <div className="bg-white border rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Bike className="w-5 h-5 text-emerald-600" />
              <h3 className="font-semibold text-lg">Phân loại xe</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">
                  Danh mục xe <span className="text-red-500">*</span>
                </label>
                <select className="mt-1 w-full border rounded-lg px-3 py-2">
                  <option>Chọn danh mục</option>
                  <option>Road Bike</option>
                  <option>MTB</option>
                  <option>Gravel</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium">
                  Hãng xe <span className="text-red-500">*</span>
                </label>
                <select className="mt-1 w-full border rounded-lg px-3 py-2">
                  <option>Chọn hãng</option>
                  <option>Specialized</option>
                  <option>Trek</option>
                  <option>Giant</option>
                </select>
              </div>
            </div>
          </div>

          {/* 2️⃣ SIZE */}
          <div className="bg-white border rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Ruler className="w-5 h-5 text-emerald-600" />
              <h3 className="font-semibold text-lg">Kích thước khung (Size)</h3>
            </div>

            <div className="flex gap-3">
              {["XS", "S", "M", "L", "XL"].map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 border rounded-lg transition
                    ${
                      selectedSize === size
                        ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                        : "hover:border-emerald-400"
                    }
                  `}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* 3️⃣ KHUNG & PHUỘC */}
          <div className="bg-white border rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Wrench className="w-5 h-5 text-emerald-600" />
              <h3 className="font-semibold text-lg">Khung & Phuộc</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">
                  Chất liệu khung <span className="text-red-500">*</span>
                </label>
                <select className="mt-1 w-full border rounded-lg px-3 py-2">
                  <option>Chọn chất liệu</option>
                  <option>Carbon</option>
                  <option>Nhôm</option>
                  <option>Thép</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium">
                  Tình trạng nước sơn <span className="text-red-500">*</span>
                </label>
                <select className="mt-1 w-full border rounded-lg px-3 py-2">
                  <option>Như mới</option>
                  <option>Mòn nhẹ</option>
                  <option>Cần sơn lại</option>
                </select>
              </div>
            </div>
          </div>

          {/* 4️⃣ HỆ THỐNG TRUYỀN ĐỘNG */}
          <div className="bg-white border rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Cog className="w-5 h-5 text-emerald-600" />
              <h3 className="font-semibold text-lg">Hệ thống truyền động</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                className="border rounded-lg px-3 py-2"
                placeholder="Ví dụ: Shimano 105 R7000"
              />

              <select className="border rounded-lg px-3 py-2">
                <option>Đánh giá tình trạng</option>
                <option>Như mới</option>
                <option>Mòn nhẹ</option>
                <option>Cần thay</option>
              </select>
            </div>
          </div>

          {/* 5️⃣ PHANH & BÁNH XE */}
          <div className="bg-white border rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Disc className="w-5 h-5 text-emerald-600" />
              <h3 className="font-semibold text-lg">Phanh & Bánh xe</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select className="border rounded-lg px-3 py-2">
                <option>Chọn loại phanh</option>
                <option>Phanh đĩa</option>
                <option>Phanh vành</option>
              </select>

              <select className="border rounded-lg px-3 py-2">
                <option>Chọn tình trạng</option>
                <option>Như mới</option>
                <option>Mòn nhẹ</option>
                <option>Cần thay</option>
              </select>
            </div>
          </div>

          {/* 6️⃣ TỔNG QUAN XE */}
          <div className="bg-white border rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold text-lg mb-4">
              Tổng quan xe (Seller tự đánh giá)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <ConditionCard
                active={condition === "new"}
                onClick={() => setCondition("new")}
                icon={<CheckCircle className="w-6 h-6 text-emerald-600" />}
                title="Như mới"
                desc="Không trầy xước, linh kiện nguyên bản."
              />

              <ConditionCard
                active={condition === "good"}
                onClick={() => setCondition("good")}
                icon={<ThumbsUp className="w-6 h-6 text-amber-500" />}
                title="Tốt"
                desc="Có xước dăm nhẹ, hoạt động ổn định."
              />

              <ConditionCard
                active={condition === "fair"}
                onClick={() => setCondition("fair")}
                icon={<Wrench className="w-6 h-6 text-orange-500" />}
                title="Khá"
                desc="Có trầy rõ, cần bảo dưỡng nhẹ."
              />
            </div>
          </div>

          {/* 7️⃣ GIÁ MONG MUỐN */}
          <div className="bg-white border rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <DollarSign className="w-5 h-5 text-emerald-600" />
              <h3 className="font-semibold text-lg">
                Mức giá mong muốn <span className="text-red-500">*</span>
              </h3>
            </div>

            <div className="flex">
              <input
                type="text"
                value={price}
                onChange={handlePriceChange}
                placeholder="0"
                className="w-full border rounded-l-xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500"
              />
              <span className="px-6 flex items-center bg-gray-100 border border-l-0 rounded-r-xl text-sm font-medium text-gray-600">
                VND
              </span>
            </div>
          </div>
        </div>
        {/* Price */}

        {/* ================= RIGHT ================= */}
        <div className="space-y-6">
          <div className="bg-white border rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <h3 className="font-semibold text-lg">Tiêu chuẩn kiểm định</h3>
            </div>

            <p className="text-sm text-gray-500 mb-4">
              Để đảm bảo minh bạch, các thông số này sẽ được Inspector đối soát
              qua 3 tiêu chí:
            </p>

            <ul className="space-y-4 text-sm">
              {[
                "Tính xác thực linh kiện",
                "Tình trạng vật lý",
                "Khả năng vận hành",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-500" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-5 bg-gray-50 p-3 rounded-lg text-xs text-gray-500 italic">
              "Nhập thông số chính xác giúp Seller rút ngắn 50% thời gian kiểm
              định."
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-2">
              <HelpCircle className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-blue-700">
                Bạn không biết cấu hình?
              </h3>
            </div>
            <p className="text-sm text-blue-600">
              Sử dụng công cụ tra cứu cấu hình theo đời xe (Model year).
            </p>
            <button className="mt-3 text-sm font-medium text-blue-700 hover:underline">
              Tra cứu ngay →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function StepImages() {
  const [images, setImages] = useState([]);
  const [video, setVideo] = useState(null);

  /* ================= IMAGE ================= */
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    const preview = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...preview]);
  };

  const removeImage = (indexToRemove) => {
    setImages((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  /* ================= VIDEO ================= */
  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setVideo({
      file,
      url: URL.createObjectURL(file),
    });
  };

  const removeVideo = () => {
    setVideo(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-0">
      {/* ===== TITLE ===== */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">
          HÌNH ẢNH & VIDEO TỔNG QUÁT
        </h2>
        <p className="text-emerald-600 mt-1">
          Tải lên những hình ảnh đẹp nhất để thu hút người mua.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ================= LEFT ================= */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* ================= IMAGE ================= */}
            <div className="bg-white border rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold mb-4">Hình ảnh</h3>

              <label className="border-2 border-dashed rounded-xl h-48 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition">
                <Camera className="w-10 h-10 text-emerald-500 mb-3" />
                <p className="font-medium">Tải hình ảnh</p>
                <p className="text-sm text-gray-500">JPG, PNG</p>

                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>

              {/* ===== THUMBNAILS ===== */}
              {images.length > 0 && (
                <div className="flex gap-4 mt-6 flex-wrap">
                  {images.map((img, index) => (
                    <div
                      key={index}
                      className="relative w-28 h-24 rounded-lg overflow-hidden border border-emerald-400 group"
                    >
                      {/* Badge đại diện */}
                      {index === 0 && (
                        <span className="absolute top-1 left-1 bg-emerald-500 text-white text-xs px-2 py-0.5 rounded">
                          Ảnh đại diện
                        </span>
                      )}

                      {/* Nút xoá */}
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-black/60 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                      >
                        <X size={14} />
                      </button>

                      <img
                        src={img.url}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}

                  {/* Ô thêm ảnh */}
                  <label className="w-28 h-24 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-50">
                    <ImagePlus className="w-6 h-6 text-gray-400" />
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </label>
                </div>
              )}
            </div>

            {/* ================= VIDEO ================= */}
            <div className="bg-white border rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold mb-4">Video</h3>

              <label className="border-2 border-dashed rounded-xl h-48 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition">
                <Video className="w-10 h-10 text-blue-500 mb-3" />
                <p className="font-medium">Tải video</p>
                <p className="text-sm text-gray-500">MP4</p>

                <input
                  type="file"
                  accept="video/*"
                  className="hidden"
                  onChange={handleVideoUpload}
                />
              </label>

              {video && (
                <div className="mt-6 relative">
                  {/* Nút X */}
                  <button
                    type="button"
                    onClick={removeVideo}
                    className="absolute top-2 right-2 z-10 bg-black/70 hover:bg-black text-white p-1.5 rounded-full transition"
                  >
                    <X size={14} />
                  </button>

                  <video
                    src={video.url}
                    controls
                    className="w-full rounded-lg border"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ================= RIGHT ================= */}
        <div className="space-y-6">
          <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
            <div className="h-40 bg-gray-100 flex items-center justify-center">
              {images.length > 0 ? (
                <img
                  src={images[0].url}
                  alt=""
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-400">Xem trước hiển thị</span>
              )}
            </div>

            <div className="p-4 space-y-2">
              <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded">
                ROAD BIKE
              </span>

              <h4 className="font-semibold text-sm">
                Tên xe sẽ hiển thị ở đây
              </h4>

              <p className="text-emerald-600 font-bold">45.000.000 VNĐ</p>

              <div className="text-xs text-gray-500">
                Quận 7, TP. Hồ Chí Minh
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
function ConditionCard({ active, onClick, icon, title, desc }) {
  return (
    <div
      onClick={onClick}
      className={`rounded-xl p-5 text-center cursor-pointer transition border
        ${
          active
            ? "border-emerald-500 bg-emerald-50"
            : "hover:border-emerald-400"
        }
      `}
    >
      <div className="mx-auto mb-2">{icon}</div>
      <h4 className="font-semibold">{title}</h4>
      <p className="text-sm text-gray-500 mt-1">{desc}</p>
    </div>
  );
}
