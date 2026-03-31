import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Clock,
  Shield,
  CheckCircle,
  XCircle,
  AlertCircle,
  PlayCircle,
  ExternalLink,
  Star,
  ChevronRight,
  Tag,
  Bike,
} from "lucide-react";
import ConfirmModal from "../../components/ConfirmModal";
import axiosClient from "../../services/axiosClient";

const ListingDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeImage, setActiveImage] = useState(0);
  const [listingData, setListingData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [toast, setToast] = useState({ show: false, message: "", type: "info" });

  const showToast = (message, type = "info") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast((prev) => ({ ...prev, show: false })), 3000);
  };

  useEffect(() => {
    const fetchDetail = async () => {
      setIsLoading(true);
      try {
        const response = await axiosClient.get(
          `/api/admin/listing/detail/${id}`,
        );
        setListingData(response.data);
      } catch (error) {
        console.error("Lỗi lấy chi tiết tin đăng:", error);
        alert("Không thể tải thông tin chi tiết tin đăng này.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  // --- HÀM XỬ LÝ PHÊ DUYỆT ---
  const handleApprove = async () => {
  setIsSubmitting(true);
    try {
      await axiosClient.patch(`/api/admin/listing/approve/${id}`, {
        isApproved: true, 
      });
      showToast("Phê duyệt tin đăng thành công!", "success");
      setIsApproveModalOpen(false);
      setTimeout(() => navigate("/admin/listings"), 1500);
    } catch (error) {
      console.error("Lỗi duyệt tin:", error);
      alert("Không thể phê duyệt tin.");
    }finally {
      setIsSubmitting(false);
  }
};

  const handleReject = async () => {
  setIsSubmitting(true);
    try {
      await axiosClient.patch(`/api/admin/listing/approve/${id}`, {
        isApproved: false,
      });

      showToast("Đã từ chối tin đăng!", "success");
      setIsRejectModalOpen(false);
      setTimeout(() => {
      navigate("/admin/listings");
    }, 1500);
    } catch (error) {
      console.error("Lỗi từ chối tin:", error);
      alert("Không thể từ chối tin.");
    }finally {
      setIsSubmitting(false);
  }
};

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
          <p className="text-gray-500 font-medium">
            Đang tải chi tiết tin đăng...
          </p>
        </div>
      </div>
    );
  }

  if (!listingData) {
    return (
      <div className="p-10 text-center font-bold text-gray-500">
        Không tìm thấy dữ liệu tin đăng.
      </div>
    );
  }

  // Lấy dữ liệu xe đầu tiên 
  const bikeInfo =
    listingData.bikes && listingData.bikes.length > 0
      ? listingData.bikes[0]
      : null;

  // --- HÀM MAP TRẠNG THÁI DỰA TRÊN THÔNG SỐ CỦA BẠN ---
  const getDetailStatusDisplay = (listStatus, bikeStatus) => {
    // 1. Chờ duyệt
    if (listStatus === 2) {
      return {
        text: "Chờ duyệt",
        bg: "bg-yellow-100",
        textCol: "text-yellow-700",
        dot: "bg-yellow-500",
      };
    }
    // 2. Bị từ chối
    if (listStatus === 5) {
      return {
        text: "Bị từ chối",
        bg: "bg-red-100",
        textCol: "text-red-700",
        dot: "bg-red-500",
      };
    }
    // 3. Xử lý logic gộp của Đang kiểm định và Đã công khai
    if (listStatus === 3) {
      if (bikeStatus === 1) {
        return {
          text: "Đang kiểm định",
          bg: "bg-purple-100",
          textCol: "text-purple-700",
          dot: "bg-purple-500",
        };
      }
      if (bikeStatus === 2) {
        return {
          text: "Đã công khai",
          bg: "bg-emerald-100",
          textCol: "text-emerald-700",
          dot: "bg-emerald-500",
        };
      }
    }

    // Mặc định phòng hờ lỗi data
    return {
      text: "Chưa xác định",
      bg: "bg-gray-100",
      textCol: "text-gray-700",
      dot: "bg-gray-500",
    };
  };

  // Khởi tạo config màu sắc và text
  const statusConfig = getDetailStatusDisplay(
    listingData.status,
    bikeInfo?.status,
  );

  return (
    <div className="font-display text-[#111813] bg-gray-50/50 min-h-screen pb-10">
      {/* --- HEADER: BREADCRUMB & TOP BAR --- */}
      <div className="flex items-center justify-between mb-6 bg-white p-4 rounded-xl border border-[#e5e7eb] shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>Tin đăng</span>
            <ChevronRight size={16} />
            <span className="font-bold text-[#111813]">
              Chi tiết #{listingData.id.substring(0, 8).toUpperCase()}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 ${statusConfig.bg} ${statusConfig.textCol}`}
          >
            <span
              className={`w-2 h-2 rounded-full animate-pulse ${statusConfig.dot}`}
            ></span>
            {statusConfig.text}
          </div>
        </div>
      </div>

      {/* --- MAIN LAYOUT --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* === CỘT TRÁI: NỘI DUNG (2/3) === */}
        <div className="lg:col-span-2 space-y-6">
          {/* 1. Hình ảnh & Video */}
          <div className="bg-white p-6 rounded-xl border border-[#e5e7eb] shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg">Hình ảnh & Video</h3>
              <span className="text-sm text-gray-500">
                {bikeInfo?.medias?.length || 0} file đính kèm
              </span>
            </div>

            {/* --- KHUNG HIỂN THỊ CHÍNH (ẢNH HOẶC VIDEO TO NHẤT) --- */}
            <div className="aspect-video w-full bg-gray-100 rounded-xl overflow-hidden mb-4 border border-gray-100 flex items-center justify-center relative">
              {bikeInfo?.medias?.[activeImage]?.videoUrl ? (
                // Nếu phần tử đang chọn có videoUrl -> Hiển thị Video
                <video
                  src={bikeInfo.medias[activeImage].videoUrl}
                  controls
                  className="w-full h-full object-cover bg-black"
                />
              ) : (
                // Nếu không có videoUrl -> Hiển thị Ảnh
                <img
                  src={
                    bikeInfo?.medias?.[activeImage]?.image ||
                    "https://placehold.co/800x450?text=Chua+co+anh"
                  }
                  alt={listingData?.title || "Main View"}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = "https://placehold.co/800x450?text=Loi+anh";
                  }}
                />
              )}
            </div>

            {/* --- DANH SÁCH THUMBNAILS NHỎ BÊN DƯỚI --- */}
            {bikeInfo?.medias && bikeInfo.medias.length > 0 && (
              <div className="grid grid-cols-4 md:grid-cols-5 gap-3">
                {bikeInfo.medias.map((media, idx) => (
                  <div
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`aspect-video rounded-lg overflow-hidden cursor-pointer border-2 transition-all relative ${
                      activeImage === idx
                        ? "border-emerald-500 opacity-100"
                        : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    {media.videoUrl ? (
                      <div className="relative w-full h-full">
                        <img
                          src={media.videoUrl.replace(
                            /\.(mp4|webm|mov)$/i,
                            ".jpg",
                          )}
                          alt={`Video Thumb ${idx}`}
                          className="w-full h-full object-cover"
                          // Nếu lỗi không lấy được ảnh, fallback về một ảnh mặc định
                          onError={(e) => {
                            e.target.src =
                              "https://placehold.co/150x100?text=Video";
                          }}
                        />
                        {/* Lớp phủ mờ màu đen và Icon Play đè lên trên ảnh để nhận diện là Video */}
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white transition-all hover:bg-black/20">
                          <PlayCircle size={24} />
                        </div>
                      </div>
                    ) : (
                      // NẾU LÀ ẢNH: Hiển thị ảnh bình thường
                      <img
                        src={
                          media.image || "https://placehold.co/150x100?text=Loi"
                        }
                        alt={`Thumb ${idx}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src =
                            "https://placehold.co/150x100?text=Loi";
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 2. Thông tin chi tiết */}
          <div className="bg-white p-6 rounded-xl border border-[#e5e7eb] shadow-sm">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-2xl font-extrabold text-[#111813] leading-snug">
                  {listingData.title}
                </h1>
                {/* Hiển thị ngày tạo (createdAt) */}
                <div className="flex items-center gap-2 text-xs text-gray-500 mt-2">
                  <Clock size={14} />
                  <span>
                    Đăng ngày:{" "}
                    {new Date(listingData.createdAt).toLocaleDateString(
                      "vi-VN",
                    )}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-extrabold text-emerald-600">
                  {bikeInfo?.price
                    ? `${bikeInfo.price.toLocaleString("vi-VN")} ₫`
                    : "Liên hệ"}
                </div>
              </div>
            </div>

            {/* BẢNG THÔNG SỐ KỸ THUẬT  */}
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2 border-t border-gray-100 pt-6">
              <Bike size={20} className="text-emerald-600" /> Thông số kỹ thuật
              xe
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-8 bg-gray-50 p-5 rounded-xl border border-gray-100 mb-6">
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-gray-500 text-sm">Thương hiệu</span>
                <span className="font-bold text-sm text-[#111813]">
                  {bikeInfo?.brand || "-"}
                </span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-gray-500 text-sm">Loại xe</span>
                <span className="font-bold text-sm text-[#111813]">
                  {bikeInfo?.category || "-"}
                </span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-gray-500 text-sm">Size khung</span>
                <span className="font-bold text-sm text-[#111813]">
                  {bikeInfo?.frameSize || "-"}
                </span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-gray-500 text-sm">Chất liệu</span>
                <span className="font-bold text-sm text-[#111813]">
                  {bikeInfo?.frameMaterial || "-"}
                </span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-gray-500 text-sm">Màu sơn</span>
                <span className="font-bold text-sm text-[#111813]">
                  {bikeInfo?.paint || "-"}
                </span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-gray-500 text-sm">Bộ truyền động</span>
                <span className="font-bold text-sm text-[#111813]">
                  {bikeInfo?.groupset || "-"}
                </span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-gray-500 text-sm">Vành/Lốp</span>
                <span className="font-bold text-sm text-[#111813]">
                  {bikeInfo?.tireRim || "-"}
                </span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-gray-500 text-sm">Loại phanh</span>
                <span className="font-bold text-sm text-[#111813]">
                  {bikeInfo?.brakeType || "-"}
                </span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2 md:col-span-2">
                <span className="text-gray-500 text-sm">Độ mới tổng thể</span>
                <span className="font-bold text-sm text-emerald-600">
                  {bikeInfo?.overall || "-"}
                </span>
              </div>
            </div>

            <h3 className="font-bold text-lg mb-3">Mô tả từ người bán</h3>
            <div className="text-sm text-[#4b5563] leading-7 whitespace-pre-line bg-gray-50 p-4 rounded-lg border border-gray-100">
              {listingData.description || "Không có mô tả."}
            </div>
          </div>
          
        </div>
      
        {/* === CỘT PHẢI: SIDEBAR  === */}
        <div className="lg:col-span-1 space-y-6">
          {/* 1. Quyết định duyệt tin */}
          {listingData.status === 2 && (
            <div className="bg-white rounded-xl border border-[#e5e7eb] shadow-sm overflow-hidden">
              <div className="bg-emerald-600 p-4 text-white">
                <h3 className="font-bold flex items-center gap-2">
                  <CheckCircle size={20} /> Quyết định duyệt tin
                </h3>
                <p className="text-emerald-100 text-xs mt-1 opacity-90">
                  Vui lòng kiểm tra kỹ nội dung trước khi phê duyệt.
                </p>
              </div>

              <div className="p-5 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#637588] uppercase mb-2">
                    Lý do từ chối (nếu có)
                  </label>
                  <textarea
                    rows="3"
                    placeholder="Nhập lý do từ chối để gửi thông báo cho người bán..."
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all resize-none"
                  ></textarea>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setIsRejectModalOpen(true)}
                    className="flex items-center justify-center gap-2 py-3 border border-red-200 text-red-600 bg-red-50 hover:bg-red-100 rounded-xl text-sm font-bold transition-colors"
                  >
                    <XCircle size={18} /> Từ chối
                  </button>

                 
                  <button
                    onClick={() => setIsApproveModalOpen(true)}
                    className="flex items-center justify-center gap-2 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-bold shadow-lg shadow-emerald-600/20 transition-all"
                  >
                    <CheckCircle size={18} /> Phê duyệt
                  </button>
                </div>
              </div>
            </div>
          )}
          {/* 2. Thông tin người bán */}
          <div className="bg-white p-5 rounded-xl border border-[#e5e7eb] shadow-sm">
            <h3 className="font-bold text-[#111813] mb-4 border-b border-gray-100 pb-2">
              Thông tin người bán
            </h3>

            <div className="flex items-center gap-3 mb-4">
              {/* Không có link ảnh avatar, nên dùng chữ cái đầu của Tên làm Avatar mặc định */}
              <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center font-bold text-emerald-700 border border-emerald-200 text-xl uppercase">
                {listingData?.seller?.fullName?.charAt(0) || "U"}
              </div>
              <div className="flex flex-col">
                <div className="font-bold text-[#111813] text-base">
                  {listingData?.seller?.fullName || "Chưa cập nhật"}
                </div>
                <span className="text-[10px] text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded mt-0.5 w-fit">
                  Thành viên BikeStore
                </span>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center py-2 border-b border-gray-50">
                <span className="text-gray-500">Email</span>
                <span className="font-medium text-[#111813]">
                  {listingData?.seller?.email || "Không có"}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-50">
                <span className="text-gray-500">Số điện thoại</span>
                <span className="font-bold text-[#111813]">
                  {listingData?.seller?.phoneNumber || "Không có"}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-50">
                <span className="text-gray-500">ID Người bán</span>
                {/* ID khá dài nên dùng truncate để cắt bớt, di chuột vào sẽ thấy toàn bộ (thẻ title) */}
                <span
                  className="font-mono text-xs text-gray-400 max-w-[120px] truncate"
                  title={listingData?.seller?.id}
                >
                  {listingData?.seller?.id}
                </span>
              </div>
            </div>

            
          </div>

          {/* 3. Tiêu chuẩn cộng đồng */}
          <div className="bg-blue-50/50 p-5 rounded-xl border border-blue-100">
            <h3 className="font-bold text-blue-800 mb-3 flex items-center gap-2">
              <Shield size={18} /> Tiêu chuẩn cộng đồng
            </h3>
            <ul className="space-y-2">
              <li className="flex gap-2 text-xs text-blue-900/80 leading-snug">
                <div className="min-w-[4px] h-[4px] bg-blue-400 rounded-full mt-1.5"></div>
                Nội dung không chứa từ ngữ thô tục, xúc phạm.
              </li>
              <li className="flex gap-2 text-xs text-blue-900/80 leading-snug">
                <div className="min-w-[4px] h-[4px] bg-blue-400 rounded-full mt-1.5"></div>
                Hình ảnh rõ nét, không chứa watermark của đối thủ.
              </li>
              <li className="flex gap-2 text-xs text-blue-900/80 leading-snug">
                <div className="min-w-[4px] h-[4px] bg-blue-400 rounded-full mt-1.5"></div>
                Giá bán minh bạch, không để giá ảo (1đ, 0đ).
              </li>
            </ul>
          </div>
        </div>
      </div>
      {toast.show && (
        <div className="fixed top-10 left-1/2 -translate-x-1/2 z-[10001] animate-in slide-in-from-top duration-300">
          <div className={`flex items-center gap-3 px-6 py-3 rounded-2xl shadow-2xl border ${
            toast.type === "error" 
              ? "bg-red-50 border-red-200 text-red-700" 
              : "bg-emerald-50 border-emerald-200 text-emerald-700"
          }`}>
            {toast.type === "error" ? <AlertCircle size={20} /> : <CheckCircle size={20} />}
            <span className="text-sm font-bold">{toast.message}</span>
          </div>
        </div>
      )}
      <ConfirmModal
        isOpen={isApproveModalOpen}
        onClose={() => setIsApproveModalOpen(false)}
        onConfirm={handleApprove}
        title="Xác nhận phê duyệt"
        description={`Bạn đang phê duyệt tin đăng: ${listingData.title}. Tin này sẽ được chuyển sang bước kiểm định tiếp theo.`}
        type="success"
        confirmText="Đồng ý duyệt"
        isLoading={isSubmitting}
      />

      {/* Modal Từ chối */}
      <ConfirmModal
        isOpen={isRejectModalOpen}
        onClose={() => setIsRejectModalOpen(false)}
        onConfirm={handleReject}
        title="Xác nhận từ chối"
        description={`Bạn có chắc chắn muốn từ chối tin đăng này không?`}
        type="danger"
        confirmText="Từ chối ngay"
        isLoading={isSubmitting}
      >
        {rejectReason && (
          <div className="mt-2 p-3 bg-red-50 border border-red-100 rounded-lg text-xs text-red-700">
            <strong>Lý do gửi cho người bán:</strong> {rejectReason}
          </div>
        )}
      </ConfirmModal>
    </div>
  );
};

export default ListingDetail;
