import React, { useState } from 'react';
import { 
  ChevronRight, Share2, FileText, MessageSquare, 
  Settings, Image as ImageIcon, CheckCircle2,
  Bike, Disc, ZoomIn, X
} from 'lucide-react';
import { useNavigate, useParams, Link } from 'react-router-dom';

// --- MOCK DATA (Mô phỏng dữ liệu trả về từ API lấy chi tiết lịch sử) ---
const REPORT_DATA = {
  id: "INSP-99283",
  bikeName: "Giant TCR Advanced 2 - 2021",
  date: "24 thg 10, 2023",
  inspectorName: "Nguyễn Văn Kiểm",
  status: "ĐÃ QUA KIỂM ĐỊNH",
  score: 8.5,
  scoreLabel: "Tình trạng tốt",
  overallComment: "Chiếc Giant TCR này cho thấy rất ít dấu hiệu sử dụng. Khung sườn hoàn hảo về mặt cấu trúc, chỉ có vài vết trầy xước thẩm mỹ nhỏ ở phần gióng đứng. Bộ truyền động cơ học được bảo dưỡng tốt, mặc dù nên thay xích trong vòng 500km tới. Sẵn sàng để bán ngay.",
  
  // Dữ liệu từ Kịch bản A (chuỗi string)
  details: {
    frame_condition: "Hoàn hảo (Không tì vết, sơn zin, không nứt móp)",
    drivetrain_condition: "Khá (Xích giãn < 0.75%, hoạt động bình thường)",
    brakes_condition: "Hoàn hảo (Vành cân chuẩn, phanh ăn tuyệt đối)"
  },
  
  media: [
    "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=400",
    "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=400",
    "https://images.unsplash.com/photo-1576435728678-35d01fd18eac?w=400",
    "https://images.unsplash.com/photo-1507035895480-08acdf9b7466?w=400"
  ]
};

export default function InspectionHistoryDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [fullscreenImage, setFullscreenImage] = useState(null);

  // Helper sinh màu badge dựa trên text
  const getBadgeStyle = (text) => {
    if (text.includes("Hoàn hảo")) return "bg-emerald-100 text-emerald-700";
    if (text.includes("Khá")) return "bg-amber-100 text-amber-700";
    if (text.includes("Kém")) return "bg-red-100 text-red-700";
    return "bg-gray-100 text-gray-700";
  };

  const getBadgeText = (text) => {
    if (text.includes("Hoàn hảo")) return "XUẤT SẮC";
    if (text.includes("Khá")) return "CHÚ Ý";
    if (text.includes("Kém")) return "CẦN THAY THẾ";
    return "ĐÁNH GIÁ LẠI";
  };

  return (
    <div className="flex-1 bg-[#f9fafb] p-8 font-display text-[#111813] min-h-screen">
      
      {/* 1. BREADCRUMBS */}
      <div className="flex items-center gap-2 text-sm text-[#637588] mb-6 font-medium">
        <Link to="/inspector/history" className="hover:text-[#111813] transition-colors">Kiểm định</Link>
        <ChevronRight size={16} />
        <span className="font-bold text-[#111813]">Báo cáo #{REPORT_DATA.id}</span>
      </div>

      {/* 2. HEADER INFO & ACTIONS */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-8">
        <div>
          <span className="inline-block bg-emerald-100 text-emerald-700 text-[10px] font-black px-2.5 py-1 rounded tracking-widest uppercase mb-3">
            <CheckCircle2 size={12} className="inline mr-1 -mt-0.5" /> {REPORT_DATA.status}
          </span>
          <h1 className="text-3xl font-black text-[#111813] tracking-tight">{REPORT_DATA.bikeName}</h1>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] text-[#637588] font-medium mt-3">
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span> Mã số: {REPORT_DATA.id}</span>
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span> Ngày: {REPORT_DATA.date}</span>
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span> Kiểm định viên: <span className="font-bold text-[#111813]">{REPORT_DATA.inspectorName}</span></span>
          </div>
        </div>
        
        <div className="flex gap-3 shrink-0">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 hover:border-gray-300 rounded-xl shadow-sm hover:bg-gray-50 font-bold text-sm text-gray-700 transition-all">
            <Share2 size={18} /> Chia sẻ báo cáo
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-[#ea580c] hover:bg-[#c2410c] text-white rounded-xl shadow-sm shadow-orange-500/20 font-bold text-sm transition-all">
            <FileText size={18} /> Xuất PDF
          </button>
        </div>
      </div>

      {/* 3. SUMMARY CARDS (ĐIỂM & NHẬN XÉT) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        
        {/* Điểm tổng quan */}
        <div className="col-span-1 bg-white p-6 rounded-3xl border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex items-center gap-6">
          <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
            {/* Vòng tròn cam */}
            <svg className="absolute inset-0 w-full h-full transform -rotate-90">
              <circle cx="48" cy="48" r="44" stroke="#fef3c7" strokeWidth="6" fill="none" />
              <circle cx="48" cy="48" r="44" stroke="#ea580c" strokeWidth="6" fill="none" strokeDasharray="276" strokeDashoffset="41" strokeLinecap="round" />
            </svg>
            <span className="text-3xl font-black text-[#111813]">{REPORT_DATA.score}</span>
          </div>
          <div>
            <p className="text-[11px] text-[#637588] font-black uppercase tracking-widest mb-1">Điểm tổng quan</p>
            <p className="text-xl font-black text-[#111813]">{REPORT_DATA.scoreLabel}</p>
          </div>
        </div>

        {/* Nhận xét chung */}
        <div className="col-span-2 bg-white p-6 rounded-3xl border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex items-start gap-5">
          <div className="p-3.5 bg-orange-50 text-orange-600 rounded-2xl shrink-0">
            <MessageSquare size={24} fill="currentColor" className="opacity-20 absolute" />
            <MessageSquare size={24} className="relative z-10" />
          </div>
          <div>
            <p className="text-[11px] text-[#637588] font-black uppercase tracking-widest mb-2">Nhận xét chung của người kiểm định</p>
            <p className="text-sm text-[#111813] leading-relaxed font-medium">
              {REPORT_DATA.overallComment}
            </p>
          </div>
        </div>
      </div>

      {/* 4. MAIN DETAILS (2 CỘT) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* CỘT TRÁI: DANH MỤC KIỂM ĐỊNH */}
        <div className="col-span-2 space-y-5">
          <h3 className="text-[15px] font-black text-[#111813] flex items-center gap-2 mb-4 uppercase tracking-tight">
            <Settings size={20} className="text-orange-500" /> Danh mục kiểm định chi tiết
          </h3>

          {/* Card 1: Khung sườn */}
          <CategoryCard 
            icon={<Bike size={20} />}
            title="Khung sườn & Phuộc"
            statusText={getBadgeText(REPORT_DATA.details.frame_condition)}
            statusClass={getBadgeStyle(REPORT_DATA.details.frame_condition)}
            resultString={REPORT_DATA.details.frame_condition}
          />

          {/* Card 2: Truyền động */}
          <CategoryCard 
            icon={<Settings size={20} />}
            title="Hệ thống truyền động"
            statusText={getBadgeText(REPORT_DATA.details.drivetrain_condition)}
            statusClass={getBadgeStyle(REPORT_DATA.details.drivetrain_condition)}
            resultString={REPORT_DATA.details.drivetrain_condition}
          />

          {/* Card 3: Phanh */}
          <CategoryCard 
            icon={<Disc size={20} />}
            title="Phanh & Bánh xe"
            statusText={getBadgeText(REPORT_DATA.details.brakes_condition)}
            statusClass={getBadgeStyle(REPORT_DATA.details.brakes_condition)}
            resultString={REPORT_DATA.details.brakes_condition}
          />
        </div>

        {/* CỘT PHẢI: MEDIA & ACTION */}
        <div className="col-span-1 space-y-6">
          <h3 className="text-[15px] font-black text-[#111813] flex items-center gap-2 mb-4 uppercase tracking-tight">
            <ImageIcon size={20} className="text-orange-500" /> Thư viện bằng chứng
          </h3>

          {/* Image Grid */}
          <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
            <div className="grid grid-cols-2 gap-3 mb-4">
              {REPORT_DATA.media.map((img, idx) => (
                <div 
                  key={idx} 
                  onClick={() => setFullscreenImage(img)}
                  className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer border border-gray-100"
                >
                  <img src={img} alt="Evidence" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-md" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Box (Dành cho Admin duyệt hoặc xem) */}
          <div className="bg-orange-50/50 p-6 rounded-3xl border border-orange-100">
            <h4 className="font-black text-gray-900 mb-2">Trạng thái báo cáo</h4>
            <p className="text-xs text-gray-600 font-medium leading-relaxed mb-6">
              Báo cáo này đã được hoàn tất và niêm phong bởi Inspector. Nó đã sẵn sàng để công khai trên tin đăng của người bán.
            </p>
            <button className="w-full py-3 bg-[#111813] hover:bg-black text-white font-bold rounded-xl transition-colors mb-3">
              Xem lại tin đăng
            </button>
            <button className="w-full py-3 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold rounded-xl transition-colors">
              Lịch sử chỉnh sửa
            </button>
          </div>
        </div>

      </div>

      {/* --- POPUP LIGHTBOX XEM ẢNH --- */}
      {fullscreenImage && (
        <div className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center backdrop-blur-sm" onClick={() => setFullscreenImage(null)}>
          <button className="absolute top-6 right-6 text-white/50 hover:text-white bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition-all">
            <X size={24} />
          </button>
          <img src={fullscreenImage} alt="Fullscreen" className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-2xl pointer-events-none" />
        </div>
      )}

    </div>
  );
}

// --- SUB COMPONENT CARD HIỂN THỊ DANH MỤC ---
function CategoryCard({ icon, title, statusText, statusClass, resultString }) {
  // Cắt chuỗi Kịch bản A thành Tiêu đề chính và Mô tả trong ngoặc
  // Ví dụ: "Hoàn hảo (Không tì vết...)" -> mainText: "Hoàn hảo", subText: "Không tì vết..."
  const match = resultString.match(/^(.*?)\s*\((.*?)\)$/);
  const mainText = match ? match[1] : resultString;
  const subText = match ? match[2] : "";

  return (
    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
      {/* Header Card */}
      <div className="flex justify-between items-center mb-5 pb-4 border-b border-gray-50">
        <div className="flex items-center gap-3 text-gray-700">
          <div className="p-2 bg-gray-50 rounded-xl text-gray-500">{icon}</div>
          <h4 className="font-bold text-[15px]">{title}</h4>
        </div>
        <span className={`text-[10px] font-black px-3 py-1 rounded-lg uppercase tracking-widest ${statusClass}`}>
          {statusText}
        </span>
      </div>

      {/* Nội dung đánh giá */}
      <div className="flex flex-col gap-1">
        <span className="text-xs text-gray-400 font-black uppercase tracking-widest">Đánh giá thực tế</span>
        <div className="flex items-baseline gap-2 mt-1">
          <span className="text-sm font-bold text-emerald-600">{mainText}:</span>
          <span className="text-sm font-medium text-gray-700">{subText || resultString}</span>
        </div>
      </div>
    </div>
  );
}