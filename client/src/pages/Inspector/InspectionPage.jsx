import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Bike,
  Settings,
  Disc,
  ShieldAlert,
  ChevronDown,
  ChevronUp,
  Image as ImageIcon,
  Save,
  AlertCircle,
  Check,
  X,
  Loader2,
  PlayCircle
} from "lucide-react";
import axiosClient from "../../services/axiosClient";
import { useNavigate, useParams } from "react-router-dom";

export default function MergedInspectionPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [bike, setBike] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "info",
  });
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const showToast = (message, type = "error") => {
    setToast({ show: true, message, type });
    setTimeout(
      () => setToast({ show: false, message: "", type: "info" }),
      3000,
    );
  };
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // --- STATE QUẢN LÝ DỮ LIỆU API ---
  const [formData, setFormData] = useState({
    frame: true,
    paintCondition: true,
    drivetrain: true,
    brakes: true,
    score: 100,
    comment: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() => {
    const fetchBikeDetails = async () => {
      setLoading(true);
      try {
        // Gọi API với ID truyền vào Header 'x-pendingbike-id' như Swagger yêu cầu
        const response = await axiosClient.get(
          "/api/inspector/pending-bike-details",
          {
            headers: {
              "x-pendingbike-id": id,
            },
          },
        );

        const data = response.data;

        // Chuyển đổi dữ liệu từ API sang cấu trúc để hiển thị trên giao diện
        setBike({
          realId: data.id,
          name: `${data.brand} ${data.category}`,
          idDisplay: data.id.substring(0, 8).toUpperCase(),
          price: data.price.toLocaleString("vi-VN") + " ₫",
          condition: `${data.overall} - ${data.operating}`,
          description: "Thông tin chi tiết cấu hình xe từ hệ thống.",
          specs: {
            frame: data.frameMaterial,
            size: data.frameSize,
            paint: data.paint,
            groupset: data.groupset,
            brakeType: data.brakeType,
            tireRim: data.tireRim,
          },

          media:
            data.medias && data.medias.length > 0
              ? data.medias.map((m, idx) => ({
                  id: m.id,
                  src: m.image || m.videoUrl,
                  type: m.videoUrl ? "video" : "image",
                  label: m.videoUrl
                    ? `Video bằng chứng ${idx + 1}`
                    : `Ảnh chi tiết ${idx + 1}`,
                }))
              : [
                  {
                    id: 0,
                    src: "https://via.placeholder.com/800?text=No+Image",
                    label: "Không có ảnh",
                  },
                ],
        });
      } catch (error) {
        console.error("Lỗi lấy chi tiết xe:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchBikeDetails();
  }, [id]);

  const handleToggle = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleComplete = async () => {
    if (isSubmitting) return;
    if (formData.score < 0 || formData.score > 100) {
      showToast("Điểm số phải nằm trong khoảng 0 - 100.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axiosClient.post(
        "/api/inspector/approve-bike",
        formData,
        { headers: { "x-bike-id": bike.realId } },
      );

      if (response.status === 200 || response.status === 201) {
        showToast("Đã phê duyệt xe thành công!", "success");
        setTimeout(() => navigate("/inspector/HomeInspector"), 1500);
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Có lỗi xảy ra!";
      showToast(errorMsg, "error");
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleReject = () => {
    if (!formData.comment || formData.comment.trim() === "") {
      showToast("Vui lòng nhập lý do từ chối vào ô 'Comment Tổng quan' trước!");
      return;
    }

    setRejectReason(formData.comment);
    setIsRejectModalOpen(true);
  };

  const handleConfirmReject = async () => {
    if (!rejectReason.trim()) {
      showToast("Vui lòng nhập lý do từ chối cụ thể.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axiosClient.post(
        "/api/inspector/reject-bike",
        { comment: rejectReason },
        {
          headers: {
            "x-bike-id": bike.realId,
          },
        },
      );

      if (response.status === 200 || response.status === 201) {
        showToast("Đã từ chối xe thành công.", "success");
        setIsRejectModalOpen(false);
        setTimeout(() => navigate("/inspector/HomeInspector"), 1500);
      }
    } catch (error) {
      console.error("Lỗi khi Reject xe:", error);
      const errorMsg = error.response?.data?.message || "Không thể từ chối xe.";
      showToast(errorMsg, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- GIỮ NGUYÊN PHẦN LOADING VÀ CHECK BIKE ---
  if (loading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-white">
        <Loader2 className="animate-spin text-emerald-500 mb-4" size={48} />
        <p className="font-bold text-[#637588]">Đang tải cấu hình xe...</p>
      </div>
    );
  }

  if (!bike) {
    return (
      <div className="h-screen flex items-center justify-center text-[#637588] font-bold">
        Không tìm thấy dữ liệu xe.
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen -m-8 bg-[#f3f4f6] font-display text-[#111813] overflow-hidden">
      {/* --- TOP HEADER --- */}
      <header className="bg-white border-b border-[#e5e7eb] h-16 px-6 flex justify-between items-center shrink-0 z-30 relative">
        {/* 1. KHỐI TRÁI: Nút Quay lại */}
        <div className="flex-none">
          <button
            onClick={() => navigate("/inspector/dashboard")}
            className="flex items-center text-[13px] font-bold text-[#637588] hover:text-[#111813] transition-colors py-2 px-3 hover:bg-gray-50 rounded-lg"
          >
            <ArrowLeft size={18} className="mr-2" /> Quay lại danh sách
          </button>
        </div>
      </header>

      {/* --- MAIN CONTENT (2 CỘT) --- */}
      <main className="flex-1 flex overflow-hidden max-w-[1440px] mx-auto w-full p-6 gap-6">
        {/* CỘT TRÁI: MEDIA & THÔNG TIN XE (Scrollable) */}
        <div className="w-3/5 flex flex-col gap-6 overflow-y-auto pr-2 pb-10 custom-scrollbar">
          {/* Header Title */}
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-black">{bike.name}</h1>
            <span className="bg-gray-200 text-gray-600 text-xs font-bold px-2 py-1 rounded">
              ID: {bike.idDisplay}
            </span>
          </div>

          {/* Album Section */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-sm font-bold flex items-center gap-2">
                <ImageIcon size={18} /> Album Media từ Seller
              </h2>
              <span className="text-xs font-medium text-gray-500">
                8 ảnh / 2 video
              </span>
            </div>

            {/* Main Image Viewer */}
            <div className="relative w-full aspect-video bg-gray-100 rounded-xl overflow-hidden group border border-gray-200">
  {bike.media[activeMediaIndex]?.type === 'video' ? (
    <video
      src={bike.media[activeMediaIndex]?.src}
      controls
      className="w-full h-full object-contain bg-black"
    />
  ) : (
    <img
      src={bike.media[activeMediaIndex]?.src}
      alt="Bike"
      onClick={() => setIsFullscreen(true)}
      className="w-full h-full object-cover cursor-zoom-in"
    />
  )}

              <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur text-white text-[11px] font-bold px-3 py-1.5 rounded-full">
                {bike.media[activeMediaIndex]?.label}
              </div>

              {/* Navigation Arrows */}
              <div className="absolute bottom-4 left-4 flex gap-2">
                <button
                  onClick={() =>
                    setActiveMediaIndex((prev) => (prev > 0 ? prev - 1 : prev))
                  }
                  className="w-8 h-8 bg-white text-black rounded-full flex items-center justify-center shadow hover:bg-gray-50"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={() =>
                    setActiveMediaIndex((prev) =>
                      prev < bike.media.length - 1 ? prev + 1 : prev,
                    )
                  }
                  className="w-8 h-8 bg-white text-black rounded-full flex items-center justify-center shadow hover:bg-gray-50"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            {/* Thumbnails */}
<div className="flex gap-3 mt-4">
  {bike.media.map((item, index) => (
    <div
      key={item.id}
      onClick={() => setActiveMediaIndex(index)}
      className={`relative w-20 h-20 rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
        activeMediaIndex === index ? "border-blue-600 ring-2 ring-blue-600/20" : "border-transparent hover:opacity-80"
      }`}
    >
      {/* NẾU LÀ VIDEO THÌ HIỆN ICON PLAY, NẾU LÀ ẢNH THÌ HIỆN ẢNH */}
      {item.type === 'video' ? (
        <div className="w-full h-full flex items-center justify-center bg-gray-800">
          <PlayCircle size={24} className="text-white opacity-80" />
        </div>
      ) : (
        <img src={item.src} className="w-full h-full object-cover" />
      )}
    </div>
  ))}
  <div className="w-20 h-20 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 bg-gray-50 cursor-pointer hover:bg-gray-100 shrink-0">
    <ImageIcon size={20} />
  </div>
</div>
          </div>

          {/* Thông tin cơ bản & Specs */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm flex flex-col gap-6">
            <h2 className="text-sm font-bold uppercase tracking-wide">
              Thông tin cơ bản
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">Giá niêm yết</p>
                <p className="text-lg font-black">{bike.price}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">
                  Tình trạng khai báo
                </p>
                <p className="text-sm font-bold">{bike.condition}</p>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
              <p className="text-[10px] text-gray-400 uppercase font-bold mb-2">
                Mô tả từ người bán
              </p>
              <p className="text-sm text-gray-600 italic">
                "{bike.description}"
              </p>
            </div>

            <div className="flex items-center gap-4 border-t border-gray-100 pt-6">
              <img
                src={bike.media[0]?.src}
                className="w-24 h-24 rounded-lg object-cover shadow-sm border border-gray-100"
                alt="Thumbnail"
              />

              <div className="flex-1 grid grid-cols-2 gap-y-3 gap-x-6 text-sm">
                <div className="flex justify-between border-b border-gray-100 pb-1">
                  <span className="text-gray-500">Chất liệu:</span>
                  <span className="font-bold text-right text-[#111813]">
                    {bike.specs.frame}
                  </span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-1">
                  <span className="text-gray-500">Kích cỡ:</span>
                  <span className="font-bold text-right text-[#111813]">
                    {bike.specs.size}
                  </span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-1">
                  <span className="text-gray-500">Màu sơn:</span>
                  <span className="font-bold text-right text-[#111813]">
                    {bike.specs.paint}
                  </span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-1">
                  <span className="text-gray-500">Truyền động:</span>
                  <span
                    className="font-bold text-right text-[#111813] truncate max-w-[120px]"
                    title={bike.specs.groupset}
                  >
                    {bike.specs.groupset}
                  </span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-1">
                  <span className="text-gray-500">Loại phanh:</span>
                  <span
                    className="font-bold text-right text-[#111813] truncate max-w-[120px]"
                    title={bike.specs.brakeType}
                  >
                    {bike.specs.brakeType}
                  </span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-1">
                  <span className="text-gray-500">Vành & Lốp:</span>
                  <span
                    className="font-bold text-right text-[#111813] truncate max-w-[120px]"
                    title={bike.specs.tireRim}
                  >
                    {bike.specs.tireRim}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CỘT PHẢI: FORM ĐÁNH GIÁ KỸ THUẬT (Sticky) */}
        <aside className="w-2/5 flex flex-col h-full bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden relative">
          <div className="p-5 border-b border-gray-200 flex justify-between items-center bg-gray-50 shrink-0">
            <h2 className="text-lg font-black text-[#111813]">
              Đánh giá kỹ thuật
            </h2>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-white custom-scrollbar pb-24">
            <InlineToggleItem
              title="Khung sườn"
              icon={<Bike size={18} />}
              value={formData.frame}
              onChange={(val) => handleToggle("frame", val)}
            />

            <InlineToggleItem
              title="Tình trạng nước sơn"
              icon={<AlertCircle size={18} />}
              value={formData.paintCondition}
              onChange={(val) => handleToggle("paintCondition", val)}
            />

            <InlineToggleItem
              title="Hệ thống truyền động"
              icon={<Settings size={18} />}
              value={formData.drivetrain}
              onChange={(val) => handleToggle("drivetrain", val)}
            />

            <InlineToggleItem
              title="Phanh & Bánh xe"
              icon={<Disc size={18} />}
              value={formData.brakes}
              onChange={(val) => handleToggle("brakes", val)}
            />
            {/* Thêm ô Nhập Điểm (Score) vào đây */}
            <div className="pt-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2 block">
                Điểm đánh giá (Score)
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.score}
                  onChange={(e) =>
                    handleToggle("score", Number(e.target.value))
                  }
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                  placeholder="Nhập điểm..."
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-400">
                  / 100
                </span>
              </div>
            </div>

            {/* Overall Comment */}
            <div className="pt-4">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2 block">
                Comment Tổng quan
              </label>
              <textarea
                value={formData.comment}
                onChange={(e) => handleToggle("comment", e.target.value)}
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all min-h-[100px]"
                placeholder="Nhập đánh giá chi tiết tình trạng thực tế của xe để lưu lại hệ thống..."
              />
            </div>
          </div>

          {/* Action Footer (Sticky at bottom) */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 flex flex-col gap-2.5 shadow-[0_-10px_20px_rgba(0,0,0,0.03)] z-10">
            {/* Nút Hoàn tất chính */}
            <button
              onClick={handleComplete}
              disabled={isSubmitting}
              className={`w-full text-sm font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all 
                ${
                  isSubmitting
                    ? "bg-emerald-50 text-emerald-400 border border-emerald-200 cursor-not-allowed opacity-70"
                    : "bg-emerald-50 hover:bg-emerald-100 border border-emerald-500 text-emerald-700"
                }`}
            >
              {isSubmitting ? (
                <span>Đang xử lý...</span>
              ) : (
                <>
                  <CheckCircle2 size={18} /> Hoàn tất & Xem kết quả
                </>
              )}
            </button>

            {/* Nút Từ chối */}
            <button
              onClick={handleReject}
              disabled={isSubmitting}
              className={`w-full border text-sm font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all 
    ${
      isSubmitting
        ? "bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed"
        : "bg-red-50 hover:bg-red-100 border-red-400 text-red-600"
    }`}
            >
              {isSubmitting ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <>
                  <X size={18} /> Từ chối
                </>
              )}
            </button>
          </div>
        </aside>
      </main>
      {/* --- POPUP PHÓNG TO ẢNH  --- */}
      {isFullscreen && (
        <div
          className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center backdrop-blur-sm"
          onClick={() => setIsFullscreen(false)}
        >
          {/* Nút đóng */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsFullscreen(false);
            }}
            className="absolute top-6 right-6 text-white/50 hover:text-white bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition-all"
          >
            <X size={24} />
          </button>

          {/* Ảnh được phóng to */}
          {bike.media[activeMediaIndex]?.type === 'video' ? (
  <video
    src={bike.media[activeMediaIndex]?.src}
    controls
    autoPlay
    className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-2xl"
    onClick={(e) => e.stopPropagation()}
  />
) : (
  <img
    src={bike.media[activeMediaIndex]?.src}
    alt="Fullscreen Bike"
    className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-2xl pointer-events-none"
    onClick={(e) => e.stopPropagation()}
  />
)}

          {/* Mũi tên trái/phải trên bản phóng to */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveMediaIndex((prev) => (prev > 0 ? prev - 1 : prev));
            }}
            className="absolute left-8 text-white/50 hover:text-white bg-white/10 hover:bg-white/20 p-4 rounded-full transition-all"
          >
            <ChevronLeft size={36} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveMediaIndex((prev) =>
                prev < bike.media.length - 1 ? prev + 1 : prev,
              );
            }}
            className="absolute right-8 text-white/50 hover:text-white bg-white/10 hover:bg-white/20 p-4 rounded-full transition-all"
          >
            <ChevronRight size={36} />
          </button>

          {/* Nhãn của ảnh */}
          <div className="absolute bottom-10 text-white text-sm font-bold bg-black/60 px-6 py-2.5 rounded-full border border-white/10 backdrop-blur-md">
            {bike.media[activeMediaIndex]?.label}
          </div>
        </div>
      )}
      {toast.show && (
        <div className="fixed top-10 left-1/2 -translate-x-1/2 z-[10001] animate-in slide-in-from-top duration-300">
          <div
            className={`flex items-center gap-3 px-6 py-3 rounded-2xl shadow-2xl border ${
              toast.type === "error"
                ? "bg-red-50 border-red-200 text-red-700"
                : "bg-emerald-50 border-emerald-200 text-emerald-700"
            }`}
          >
            {toast.type === "error" ? (
              <AlertCircle size={20} />
            ) : (
              <CheckCircle2 size={20} />
            )}
            <span className="text-sm font-bold">{toast.message}</span>
          </div>
        </div>
      )}

      {/* --- MODAL XÁC NHẬN TỪ CHỐI (Hiện ở giữa màn hình) --- */}
      {isRejectModalOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
          {/* Lớp nền mờ */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => !isSubmitting && setIsRejectModalOpen(false)}
          ></div>

          {/* Khung nội dung Modal */}
          <div className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in duration-200">
            <div className="p-6">
              <div className="flex items-center gap-3 text-red-600 mb-4">
                <div className="p-2 bg-red-50 rounded-full">
                  <AlertCircle size={24} />
                </div>
                <h3 className="text-xl font-black">Xác nhận từ chối</h3>
              </div>

              <p className="text-sm text-gray-500 mb-4">
                Lý do từ chối xe <strong>{bike.name}</strong>:
              </p>

              <textarea
                autoFocus
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="Nhập lý do cụ thể..."
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all min-h-[120px] resize-none"
              />
            </div>

            <div className="flex items-center gap-3 p-4 bg-gray-50 border-t border-gray-100">
              <button
                disabled={isSubmitting}
                onClick={() => setIsRejectModalOpen(false)}
                className="flex-1 px-4 py-2.5 text-sm font-bold text-gray-500 hover:text-gray-700 transition-colors"
              >
                Hủy bỏ
              </button>
              <button
                disabled={isSubmitting || !rejectReason.trim()}
                onClick={handleConfirmReject}
                className={`flex-[2] px-4 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all 
                  ${
                    isSubmitting || !rejectReason.trim()
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-200"
                  }`}
              >
                {isSubmitting ? (
                  <Loader2 className="animate-spin" size={18} />
                ) : (
                  "Xác nhận từ chối"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function InlineToggleItem({ title, icon, value, onChange }) {
  return (
    <div className="flex items-center justify-between p-3 mb-3 border border-gray-200 rounded-xl bg-white hover:border-emerald-200 transition-colors shadow-sm">
      {/* Nửa bên trái: Icon và Tiêu đề */}
      <div className="flex items-center gap-3">
        <div className="p-2 bg-slate-50 rounded-lg text-slate-600 border border-slate-100">
          {icon}
        </div>
        <span className="text-[13px] font-bold text-gray-800">{title}</span>
      </div>

      {/* Nửa bên phải: Cụm nút Đạt / Lỗi kiểu Segmented Control */}
      <div className="flex items-center bg-gray-100 p-1 rounded-lg border border-gray-200">
        <button
          onClick={() => onChange(true)}
          className={`flex items-center gap-1.5 px-4 py-1.5 rounded-md text-xs font-bold transition-all ${
            value === true
              ? "bg-white text-emerald-600 shadow-sm border border-gray-200"
              : "text-gray-400 hover:text-gray-600"
          }`}
        >
          <Check size={14} /> Đạt
        </button>
        <button
          onClick={() => onChange(false)}
          className={`flex items-center gap-1.5 px-4 py-1.5 rounded-md text-xs font-bold transition-all ${
            value === false
              ? "bg-white text-red-600 shadow-sm border border-gray-200"
              : "text-gray-400 hover:text-gray-600"
          }`}
        >
          <X size={14} /> Lỗi
        </button>
      </div>
    </div>
  );
}
