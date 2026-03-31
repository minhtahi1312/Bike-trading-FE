import React, { useState, useEffect } from "react";
import {
  ChevronRight,
  FileText,
  MessageSquare,
  Settings,
  Image as ImageIcon,
  CheckCircle2,
  Bike,
  Disc,
  ZoomIn,
  X,
  Loader2,
  Tag,
  Info,
  ShieldCheck,
  PlayCircle,
  ArrowLeft,
  AlertCircle,Star,
} from "lucide-react";
import axiosClient from "../../services/axiosClient";
import { useNavigate, useParams, Link } from "react-router-dom";

export default function InspectionHistoryDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      try {
        const response = await axiosClient.get(
          "/api/inspector/inspection-history-details",
          { headers: { "X-inspection-id": id } },
        );
        setData(response.data);
      } catch (error) {
        console.error("Lỗi fetch detail:", error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchDetail();
  }, [id]);

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center bg-[#f9fafb]">
        <Loader2 className="animate-spin text-emerald-600" size={48} />
      </div>
    );

  if (!data)
    return (
      <div className="p-10 text-center font-bold text-gray-500">
        Không tìm thấy dữ liệu báo cáo.
      </div>
    );

  return (
    <div className="flex-1 bg-[#f9fafb] p-8 font-display text-[#111813] min-h-screen">
      {/* 1. TOP NAVIGATION */}
      <div className="flex items-center gap-5 mb-8">
        <button
          onClick={() => navigate("/inspector/history")}
          className="flex items-center gap-2 text-[#637588] hover:text-emerald-700 transition-all group shrink-0"
        >
          <div className="p-1.5 bg-white rounded-lg border border-gray-200 shadow-sm group-hover:border-emerald-400 group-hover:bg-emerald-50 transition-all">
            <ArrowLeft size={16} />
          </div>
          <span className="text-sm font-bold">Quay lại danh sách</span>
        </button>
        <div className="w-[1px] h-4 bg-gray-300"></div>
        <div className="flex items-center gap-2 text-sm text-[#637588] font-medium">
          <Link
            to="/inspector/history"
            className="hover:text-emerald-600 transition-colors"
          >
            Kiểm định
          </Link>
          <ChevronRight size={14} className="text-gray-400" />
          <span className="font-bold text-[#111813]">
            Chi tiết #{data.inspectionId?.slice(0, 8)}
          </span>
        </div>
      </div>

      {/* 2. HEADER INFO & ACTIONS */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-emerald-100 text-emerald-700 text-[10px] font-black px-2.5 py-1 rounded tracking-widest uppercase border border-emerald-200">
              <CheckCircle2 size={12} className="inline mr-1" />{" "}
              {data.bikeStatus}
            </span>
            <span className="bg-blue-50 text-blue-700 text-[10px] font-black px-2.5 py-1 rounded tracking-widest uppercase border border-blue-100">
              {data.listingStatus}
            </span>
          </div>
          <h1 className="text-3xl font-black text-[#111813] tracking-tight uppercase">
            {data.brand} {data.category}
          </h1>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] text-[#637588] font-medium mt-3">
            <span className="flex items-center gap-1.5 font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md">
              <Tag size={14} /> Giá niêm yết:{" "}
              {data.price?.toLocaleString("vi-VN")} ₫
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-emerald-600" /> Mã ID:{" "}
              {data.inspectionId}
            </span>
            <span className="flex items-center gap-1.5">
              <ImageIcon size={14} className="text-emerald-600" /> Ngày kiểm:{" "}
              {new Date(data.inspectionDate).toLocaleDateString("vi-VN")}
            </span>
          </div>
        </div>
      </div>

      {/* 3. QUICK STATS CARD */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        {/* Score Card - Emerald Theme */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center">
          <div className="relative w-24 h-24 flex items-center justify-center mb-3">
            <svg className="absolute inset-0 w-full h-full transform -rotate-90">
              <circle
                cx="48"
                cy="48"
                r="44"
                stroke="#f0fdf4"
                strokeWidth="6"
                fill="none"
              />
              <circle
                cx="48"
                cy="48"
                r="44"
                stroke="#10b981"
                strokeWidth="6"
                fill="none"
                strokeDasharray="276"
                strokeDashoffset={276 - (data.score / 100) * 276}
                strokeLinecap="round"
              />
            </svg>
            <span className="text-3xl font-black text-[#111813]">
              {data.score}
            </span>
          </div>
          <p className="text-[11px] text-emerald-700 font-black uppercase tracking-widest">
            Điểm chất lượng
          </p>
        </div>

        <div className="lg:col-span-1 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <h4 className="text-[11px] text-emerald-700 font-black uppercase tracking-widest mb-4 flex items-center gap-2">
            <Info size={14} /> Thông số kỹ thuật
          </h4>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Size:</span>
              <span className="font-bold">{data.frameSize}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Chất liệu:</span>
              <span className="font-bold">{data.frameMaterial}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Phanh:</span>
              <span className="font-bold">{data.brakeType}</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
          <div>
            <h4 className="text-[11px] text-emerald-700 font-black uppercase tracking-widest mb-2 flex items-center gap-2">
              <MessageSquare size={14} /> Nhận xét từ Inspector
            </h4>
            <p className="text-sm text-[#111813] font-medium leading-relaxed italic">
              "{data.comment || "Không có nhận xét bổ sung."}"
            </p>
          </div>
          <div className="pt-4 border-t border-gray-50">
            <h4 className="text-[11px] text-gray-400 font-black uppercase tracking-widest mb-2 flex items-center gap-2">
              <FileText size={14} /> Mô tả từ người bán
            </h4>
            <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
              {data.listingDescription || "Người bán không cung cấp mô tả."}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 4. INSPECTION CHECKLIST */}
        <div className="col-span-2 space-y-5">
          <h3 className="text-[15px] font-black text-[#111813] flex items-center gap-2 mb-4 uppercase tracking-tight">
            <Settings size={20} className="text-emerald-600" /> Chi tiết hạng
            mục kiểm tra
          </h3>

          <CategoryCard
            icon={<Bike size={20} />}
            title="Khung sườn"
            statusText={data.frame ? "ĐẠT" : "KHÔNG ĐẠT"}
            statusClass={
              data.frame
                ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                : "bg-red-50 text-red-700 border-red-100"
            }
            mainText={
              data.frame
                ? "Kết cấu khung ổn định"
                : "Khung có dấu hiệu biến dạng/nứt"
            }
            subText={`Chất liệu: ${data.frameMaterial}`}
          />

          {/* 2. Tình trạng sơn  */}
          <CategoryCard
            icon={<AlertCircle size={20} />}
            title="Tình trạng sơn"
            statusText={data.paintCondition ? "ĐẠT" : "KHÔNG ĐẠT"}
            statusClass={
              data.paintCondition
                ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                : "bg-red-50 text-red-700 border-red-100"
            }
            mainText={
              data.paintCondition
                ? "Sơn nguyên bản (Zin)"
                : "Sơn đã qua xử lý/trầy xước"
            }
            subText={`Chi tiết bề mặt: ${data.paint}`}
          />

          <CategoryCard
            icon={<Settings size={20} />}
            title="Hệ thống truyền động"
            statusText={data.drivetrain ? "ĐẠT" : "CHÚ Ý"}
            statusClass={
              data.drivetrain
                ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                : "bg-emerald-50 text-emerald-600 border-emerald-100"
            }
           mainText={data.operating || "Không có mô tả vận hành"}
            subText={`Groupset: ${data.groupset}`}
          />

          <CategoryCard
            icon={<Disc size={20} />}
            title="Phanh & Bánh xe"
            statusText={data.brakes ? "ĐẠT" : "KHÔNG ĐẠT"}
            statusClass={
              data.brakes
                ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                : "bg-red-50 text-red-700 border-red-100"
            }
            mainText={`Hệ thống: ${data.brakeType}`}
            subText={`Tình trạng vành/lốp: ${data.tireRim}`}
          />
        </div>

        {/* 5. MEDIA GALLERY */}
        <div className="col-span-1 space-y-6">
          <h3 className="text-[15px] font-black text-[#111813] flex items-center gap-2 mb-4 uppercase tracking-tight">
            <ImageIcon size={20} className="text-emerald-600" /> Hình ảnh &
            Video thực tế
          </h3>

          <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm">
            <div className="grid grid-cols-2 gap-3 mb-4">
              {data.medias?.map(
                (media, idx) =>
                  media.image && (
                    <div
                      key={media.id || idx}
                      onClick={() => setFullscreenImage(media.image)}
                      className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer border border-gray-100"
                    >
                      <img
                        src={media.image}
                        alt="Bằng chứng"
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-emerald-600/0 group-hover:bg-emerald-600/20 transition-all flex items-center justify-center">
                        <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  ),
              )}
            </div>

            {data.medias
              ?.filter((m) => m.videoUrl)
              .map((media, idx) => (
                <div key={`vid-${idx}`} className="mt-4">
                  <div className="flex items-center gap-2 text-[10px] font-black text-emerald-700 uppercase mb-2">
                    <PlayCircle size={14} /> Video kiểm định
                  </div>
                  <video
                    src={media.videoUrl}
                    controls
                    className="w-full rounded-2xl shadow-sm border border-emerald-100"
                  />
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* LIGHTBOX */}
      {fullscreenImage && (
        <div
          className="fixed inset-0 z-[9999] bg-[#111813]/95 flex items-center justify-center backdrop-blur-md"
          onClick={() => setFullscreenImage(null)}
        >
          <button className="absolute top-6 right-6 text-white/50 hover:text-white bg-white/10 p-2.5 rounded-full transition-all">
            <X size={24} />
          </button>
          <img
            src={fullscreenImage}
            alt="Fullscreen"
            className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-2xl"
          />
        </div>
      )}
    </div>
  );
}

function CategoryCard({
  icon,
  title,
  statusText,
  statusClass,
  mainText,
  subText,
}) {
  return (
    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm transition-all hover:shadow-md hover:border-emerald-100">
      <div className="flex justify-between items-center mb-5 pb-4 border-b border-gray-50">
        <div className="flex items-center gap-3 text-gray-700">
          {/* Icon Emerald */}
          <div className="p-2 bg-emerald-50 rounded-xl text-emerald-600">
            {icon}
          </div>
          <h4 className="font-bold text-[15px]">{title}</h4>
        </div>
        <span
          className={`text-[10px] font-black px-3 py-1 rounded-lg uppercase tracking-widest border ${statusClass}`}
        >
          {statusText}
        </span>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-xs text-gray-400 font-black uppercase tracking-widest">
          Đánh giá chuyên gia
        </span>
        <div className="flex flex-col mt-1">
          <span className="text-sm font-bold text-gray-800">{mainText}</span>
          {subText && (
            <span className="text-sm text-emerald-700/70 italic mt-0.5 font-medium">
              Ghi chú: {subText}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
