import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, CheckCircle2, Bike, Settings, Disc, 
  ChevronRight, Printer, Share2, Download, AlertTriangle,
  FileText, ShieldCheck, Play, Loader2
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosClient from '../../services/axiosClient';

export default function InspectionResult() {
  const navigate = useNavigate();
  const { id } = useParams();
  
  // --- STATE QUẢN LÝ DỮ LIỆU ---
  const [bike, setBike] = useState(null);
  const [loading, setLoading] = useState(true);

  // --- GIẢ LẬP GỌI API LẤY KẾT QUẢ TỪ BACKEND ---
  useEffect(() => {
    const fetchResultData = async () => {
      setLoading(true);
      try {
        // Sau này bạn dùng API thật: const response = await axiosClient.get(`/api/inspector/result/${id}`);
        
        // MOCK DATA: Giả lập dữ liệu nhận được từ trang Kiểm định trước đó
        setTimeout(() => {
          setBike({
            idDisplay: id?.substring(0, 8).toUpperCase() || 'C6C28F0F',
            name: "Giant TCR Advanced 2",
            image: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=800",
            score: 95, // Điểm số nhập từ trang trước
            comment: "Xe được bảo quản trong điều kiện lý tưởng. Khung sườn không có dấu hiệu nứt gãy carbon. Hệ thống truyền động Shimano 105 hoạt động chính xác. Phanh đĩa nhạy, lực phanh phân bổ đều.",
            inspection: {
              frame: true,         // Đạt
              paintCondition: true,// Đạt
              drivetrain: false,   // Giả sử Lỗi để test UI
              brakes: true         // Đạt
            }
          });
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error("Lỗi tải kết quả:", error);
        setLoading(false);
      }
    };

    fetchResultData();
  }, [id]);

  const handleGoToConfirm = () => {
    console.log("Chuyển sang bước xác nhận cuối cùng cho xe:", id);
    navigate(`/inspector/confirm/${id}`);
  };

  // Helper để chuyển đổi true/false thành UI cho ResultRow
  const getStatus = (isPass) => isPass ? 'safe' : 'danger';
  const getText = (isPass) => isPass ? 'Đạt tiêu chuẩn' : 'Có vấn đề';

  // --- MÀN HÌNH LOADING ĐỒNG BỘ VỚI TRANG TRƯỚC ---
  if (loading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-white">
        <Loader2 className="animate-spin text-emerald-500 mb-4" size={48} />
        <p className="font-bold text-[#637588]">Đang tổng hợp báo cáo kiểm định...</p>
      </div>
    );
  }

  if (!bike) return <div className="p-10 text-center font-bold">Không tìm thấy báo cáo.</div>;

  return (
    <div className="flex flex-col h-screen -m-8 bg-[#f4f7f6] font-display text-[#111813] overflow-hidden">
      
      {/* --- TOP HEADER (Đồng bộ với Detail Page) --- */}
      <header className="bg-white border-b border-[#e5e7eb] h-16 px-6 flex items-center justify-between shrink-0 z-30 relative">
        <div className="flex-none flex items-center gap-4"> 
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-50 rounded-lg text-[#637588] transition-colors">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-[13px] font-bold">Báo cáo Kiểm định: {bike.name}</h1>
            <p className="text-[10px] text-[#637588] font-mono leading-none mt-0.5">Mã xe: #{bike.idDisplay}</p>
          </div>
        </div>

        {/* STEPPER ĐỒNG BỘ: 2 Bước */}
        <div className="flex-1 flex justify-center items-center">
          <div className="flex items-center gap-1 bg-gray-50 p-1 rounded-full border border-[#e5e7eb]">
            
            {/* Bước 1: Đã hoàn thành */}
            <div className="flex items-center">
              <div className="flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold text-emerald-600 transition-all select-none">
                <span className="w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] bg-emerald-100 text-emerald-600">
                  <CheckCircle2 size={10} strokeWidth={3} />
                </span>
                <span className="whitespace-nowrap">Kiểm định chi tiết</span>
              </div>
            </div>

            {/* Bước 2: Đang hiển thị */}
            <div className="flex items-center">
              <div className="flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold transition-all select-none bg-white text-emerald-700 shadow-sm ring-1 ring-emerald-100">
                <span className="w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] border border-emerald-600 bg-emerald-600 text-white">
                  2
                </span>
                <span className="whitespace-nowrap">Kết quả kiểm định</span>
              </div>
            </div>

          </div>
        </div>

        <div className="flex-none flex items-center gap-3">
          <button className="flex items-center gap-2 px-3 py-2 text-[#637588] hover:bg-gray-100 rounded-lg text-[12px] font-bold border border-gray-200 transition-colors">
            <Printer size={16} /> In báo cáo
          </button>
<button onClick={handleGoToConfirm} className="flex items-center gap-2 px-5 py-2 bg-emerald-600 text-white text-[12px] font-bold rounded-lg hover:bg-emerald-700 shadow-lg shadow-emerald-500/20 transition-colors">
            Lưu & Tiếp tục <ChevronRight size={16} />
          </button>
        </div>
      </header>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 overflow-y-auto bg-[#f4f7f6] custom-scrollbar">
        <div className="flex flex-row max-w-[1400px] mx-auto min-h-full">
          
          {/* CỘT TRÁI: TỔNG QUAN (Đổ dữ liệu thật) */}
          <aside className="w-[380px] bg-white border-r border-[#e5e7eb] p-6 shrink-0">
            <div className="sticky top-6 space-y-6 text-left">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-md border border-gray-100">
                <img src={bike.image} className="w-full h-full object-cover" alt="Bike" />
                <div className="absolute top-3 left-3 bg-emerald-600 text-white text-[9px] font-black px-2 py-1 rounded uppercase tracking-widest shadow-lg">Certified</div>
              </div>

              {/* Box Điểm số */}
              <div className={`p-5 rounded-2xl text-white shadow-xl relative overflow-hidden text-left ${bike.score >= 80 ? 'bg-[#111813]' : 'bg-amber-600'}`}>
                <div className="relative z-10">
                  <p className="text-[10px] font-bold text-white/70 uppercase tracking-[0.2em] mb-1">Điểm số tin cậy</p>
                  <h2 className="text-4xl font-black mb-4 text-white">
                    {bike.score} <span className="text-sm font-normal text-white/50">/ 100</span>
                  </h2>
                  <div className="space-y-2">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-white/70">Khung sườn:</span>
                      <span className="text-white font-bold">{bike.inspection.frame ? 'Tuyệt vời' : 'Có lỗi'}</span>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span className="text-white/70">Truyền động:</span>
                      <span className="text-white font-bold">{bike.inspection.drivetrain ? 'Mượt mà' : 'Cần bảo dưỡng'}</span>
                    </div>
                  </div>
                </div>
                <ShieldCheck className="absolute -bottom-4 -right-4 w-24 h-24 text-white/10" />
              </div>

              {/* Comment từ form trước */}
              <div className="space-y-3 text-left">
                <h4 className="text-[11px] font-black uppercase text-gray-400 tracking-wider flex items-center gap-2">
                  <FileText size={14} /> Đánh giá tổng quát
                </h4>
                <p className="text-[13px] text-[#4b5563] leading-relaxed italic bg-gray-50 p-4 rounded-xl border border-gray-100">
                  "{bike.comment}"
                </p>
              </div>
            </div>
          </aside>

          {/* CỘT PHẢI: CHI TIẾT CÁC CỤM */}
          <section className="flex-1 p-8">
            <div className="max-w-4xl mx-auto space-y-10 pb-20">
              
              {/* CỤM 1: KHUNG SƯỜN */}
              <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden text-left">
                <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                  <div className="flex items-center gap-2 text-emerald-700 font-black text-xs uppercase">
                    <Bike size={18} /> Cụm 1: Khung sườn & Sơn
                  </div>
                  {bike.inspection.frame && bike.inspection.paintCondition ? (
                     <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded border border-emerald-100">HOÀN HẢO</span>
                  ) : (
                     <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-1 rounded border border-red-100">PHÁT HIỆN LỖI</span>
                  )}
                </div>
                <div className="p-6 grid grid-cols-12 gap-8">
                  <div className="col-span-5 space-y-3">
                    <div className="rounded-xl overflow-hidden border border-gray-100 shadow-sm relative group aspect-video">
                      <img src="https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=600" className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <div className="col-span-7 space-y-4">
                    {/* Sử dụng dữ liệu thực từ API */}
                    <ResultRow label="1.1 Đánh giá Khung sườn" value={getText(bike.inspection.frame)} status={getStatus(bike.inspection.frame)} />
                    <ResultRow label="1.2 Tình trạng nước sơn" value={getText(bike.inspection.paintCondition)} status={getStatus(bike.inspection.paintCondition)} />
                  </div>
                </div>
              </div>

              {/* CỤM 2: TRUYỀN ĐỘNG */}
              <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden text-left">
                <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                  <div className="flex items-center gap-2 text-purple-700 font-black text-xs uppercase">
                    <Settings size={18} /> Cụm 2: Hệ thống Truyền động
                  </div>
                </div>
                <div className="p-6 grid grid-cols-12 gap-8">
                  <div className="col-span-5 relative group">
                    <div className="rounded-xl overflow-hidden border border-gray-100 shadow-inner relative aspect-[4/3] bg-black flex items-center justify-center">
                      <img src="https://images.unsplash.com/photo-1507035895480-08acdf9b7466?w=600" className="w-full h-full object-cover opacity-60" />
                      <div className="absolute w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-xl"><Play fill="currentColor" size={20} /></div>
                    </div>
                  </div>
                  <div className="col-span-7 flex flex-col justify-center">
                    <ResultRow label="2.1 Đánh giá Truyền động" value={getText(bike.inspection.drivetrain)} status={getStatus(bike.inspection.drivetrain)} />
                    
                    {/* Hiển thị cảnh báo nếu Lỗi */}
                    {!bike.inspection.drivetrain && (
                      <div className="mt-4 p-4 bg-red-50 rounded-xl border border-red-100 text-[12px] text-red-600 flex items-start gap-2">
                        <AlertTriangle size={16} className="shrink-0 mt-0.5" />
                        <span>Hệ thống truyền động không đạt chuẩn. Cần yêu cầu người bán thay thế hoặc bảo dưỡng xích/líp trước khi niêm yết.</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* CỤM 3: PHANH & BÁNH XE */}
              <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden text-left">
                <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                  <div className="flex items-center gap-2 text-amber-600 font-black text-xs uppercase">
                    <Disc size={18} /> Cụm 3: Phanh & Bánh xe
                  </div>
                </div>
                <div className="p-6 grid grid-cols-12 gap-8">
                  <div className="col-span-5 space-y-3">
                    <div className="rounded-xl overflow-hidden border border-gray-100 shadow-sm relative aspect-video">
                      <img src="https://images.unsplash.com/photo-1507035895480-08acdf9b7466?w=600" className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <div className="col-span-7 flex flex-col justify-center">
                    <ResultRow label="3.1 Đánh giá Phanh & Bánh xe" value={getText(bike.inspection.brakes)} status={getStatus(bike.inspection.brakes)} />
                  </div>
                </div>
              </div>

            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

// --- COMPONENT CON (Giữ nguyên của bạn) ---
function ResultRow({ label, value, status }) {
  const statusColors = {
    safe: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    warning: 'text-amber-700 bg-amber-50 border-amber-200',
    danger: 'text-red-700 bg-red-50 border-red-200'
  };

  return (
    <div className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0 transition-all hover:bg-gray-50/50 rounded-lg px-2 -mx-2">
       <span className="text-[13px] font-medium text-gray-600">{label}</span>
       <span className={`text-[11px] font-bold px-3 py-1.5 rounded-full border shadow-sm ${statusColors[status] || statusColors.safe}`}>
          {value}
       </span>
    </div>
  );
}