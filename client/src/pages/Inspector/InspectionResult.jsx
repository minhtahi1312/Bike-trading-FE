import React, { useState } from 'react';
import { 
  ArrowLeft, CheckCircle2, Bike, Settings, Disc, 
  ChevronRight, Printer, Share2, Download, AlertTriangle,
  FileText, ShieldCheck, Play
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

export default function InspectionResult() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeStep, setActiveStep] = useState(3); // Bước 3: Kết quả
const handleGoToConfirm = () => {
    console.log("Chuyển sang bước xác nhận cuối cùng cho xe:", id);
    // Phải navigate sang đường dẫn 'confirm' mà bạn đã tạo trong App.jsx
    navigate(`/inspector/confirm/${id}`);
  };
  return (
    <div className="flex flex-col h-screen -m-8 bg-[#f4f7f6] font-display text-[#111813] overflow-hidden">
      
{/* --- TOP HEADER (Cố định) --- */}
      <header className="bg-white border-b border-[#e5e7eb] h-16 px-6 flex items-center shrink-0 z-30 relative">
        <div className="flex-none flex items-center gap-4"> 
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-50 rounded-lg text-[#637588]">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-[13px] font-bold">Kiểm định Hoàn tất: Giant TCR Advanced 2</h1>
            <p className="text-[10px] text-[#637588] font-mono leading-none">Mã xe: {id || '#XE-8821'}</p>
          </div>
        </div>

        {/* Stepper Center */}
        <div className="flex-1 flex justify-center items-center">
          <div className="flex items-center gap-1 bg-gray-50 p-1 rounded-full border border-[#e5e7eb]">
            {['Xem Media', 'Checklist', 'Kết quả'].map((step, index) => {
              const stepNum = index + 1;
              const isActive = stepNum === activeStep;
              return (
                <div key={index} className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold transition-all ${
                  isActive ? 'bg-white text-emerald-700 shadow-sm ring-1 ring-emerald-100' : 'text-emerald-600 opacity-60'
                }`}>
                  <CheckCircle2 size={14} />
                  <span className="whitespace-nowrap">{step}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex-none flex items-center gap-3">
          <button className="flex items-center gap-2 px-3 py-2 text-[#637588] hover:bg-gray-100 rounded-lg text-[12px] font-bold border border-gray-200">
            <Printer size={16} /> Tạm lưu
          </button>
          <button onClick={handleGoToConfirm} className="flex items-center gap-2 px-5 py-2 bg-emerald-600 text-white text-[12px] font-bold rounded-lg hover:bg-emerald-700 shadow-lg shadow-emerald-500/20">
            Lưu & Tiếp tục <ChevronRight size={16} />
          </button>
        </div>
      </header>

      {/* --- MAIN CONTENT (Chỉ 1 thanh cuộn duy nhất) --- */}
      <main className="flex-1 overflow-y-auto bg-[#f4f7f6]">
        <div className="flex flex-row max-w-[1400px] mx-auto min-h-full">
          
          {/* CỘT TRÁI: TỔNG QUAN (Sticky) */}
          <aside className="w-[380px] bg-white border-r border-[#e5e7eb] p-6 shrink-0">
            <div className="sticky top-6 space-y-6 text-left">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-md border border-gray-100">
                <img src="https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=800" className="w-full h-full object-cover" />
                <div className="absolute top-3 left-3 bg-emerald-600 text-white text-[9px] font-black px-2 py-1 rounded uppercase tracking-widest shadow-lg">Certified</div>
              </div>

              <div className="p-5 bg-[#111813] rounded-2xl text-white shadow-xl relative overflow-hidden text-left">
                <div className="relative z-10">
                  <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-[0.2em] mb-1">Điểm số tin cậy</p>
                  <h2 className="text-4xl font-black mb-4">9.5 <span className="text-sm font-normal text-gray-400">/ 10</span></h2>
                  <div className="space-y-2">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-gray-400">Tình trạng khung:</span>
                      <span className="text-emerald-400 font-bold">Tuyệt vời</span>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span className="text-gray-400">Truyền động:</span>
                      <span className="text-emerald-400 font-bold">Mượt mà</span>
                    </div>
                  </div>
                </div>
                <ShieldCheck className="absolute -bottom-4 -right-4 w-24 h-24 text-white/5" />
              </div>

              <div className="space-y-3 text-left">
                <h4 className="text-[11px] font-black uppercase text-gray-400 tracking-wider flex items-center gap-2">
                  <FileText size={14} /> Đánh giá tổng quát
                </h4>
                <p className="text-[13px] text-[#4b5563] leading-relaxed italic bg-gray-50 p-4 rounded-xl border border-gray-100">
                  "Xe được bảo quản trong điều kiện lý tưởng. Khung sườn không có dấu hiệu nứt gãy carbon. Hệ thống truyền động Shimano 105 hoạt động chính xác. Phanh đĩa nhạy, lực phanh phân bổ đều."
                </p>
              </div>
            </div>
          </aside>

          {/* CỘT PHẢI: CHI TIẾT CÁC CỤM (Cuộn chung luồng) */}
          <section className="flex-1 p-8">
            <div className="max-w-4xl mx-auto space-y-10 pb-20">
              
              {/* CỤM 1: KHUNG SƯỜN */}
              <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden text-left">
                <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                  <div className="flex items-center gap-2 text-emerald-700 font-black text-xs uppercase">
                    <Bike size={18} /> Cụm 1: Khung sườn & Phuộc
                  </div>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">3/3 HOÀN THÀNH</span>
                </div>
                <div className="p-6 grid grid-cols-12 gap-8">
                  <div className="col-span-5 space-y-3">
                    <div className="rounded-xl overflow-hidden border border-gray-100 shadow-sm relative group aspect-video">
                      <img src="https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=600" className="w-full h-full object-cover" />
                      <span className="absolute bottom-2 left-2 bg-black/60 text-white text-[8px] px-2 py-1 rounded">Ảnh toàn cảnh khung</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-center text-gray-400 text-[10px]">
                      <div className="rounded-lg overflow-hidden border border-gray-100 aspect-square bg-gray-50 flex items-center justify-center">Cận cảnh cổ</div>
                      <div className="rounded-lg overflow-hidden border border-gray-100 aspect-square bg-gray-50 flex items-center justify-center">Gầm khung</div>
                    </div>
                  </div>
                  <div className="col-span-7 space-y-6">
                    <ResultRow label="1.1 Tình trạng nước sơn" value="Nguyên bản" status="safe" />
                    <ResultRow label="1.2 Kiểm tra nứt/gãy Carbon" value="An toàn" status="safe" />
                    <ResultRow label="1.3 Độ rơ bộ cổ" value="Mượt mà, không rơ" status="safe" />
                    <div className="mt-4 p-4 bg-gray-50 rounded-xl border-l-4 border-emerald-500 text-[12px] text-gray-500 italic">
                      "Ghi chú: Không phát hiện vết trầy xước sâu ở khu vực ống dưới."
                    </div>
                  </div>
                </div>
              </div>

              {/* CỤM 2: TRUYỀN ĐỘNG */}
              <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden text-left">
                <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                  <div className="flex items-center gap-2 text-purple-700 font-black text-xs uppercase">
                    <Settings size={18} /> Cụm 2: Hệ thống Truyền động
                  </div>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">3/3 HOÀN THÀNH</span>
                </div>
                <div className="p-6 grid grid-cols-12 gap-8">
                  <div className="col-span-5 relative group">
                    <div className="rounded-xl overflow-hidden border border-gray-100 shadow-inner relative aspect-[4/3] bg-black flex items-center justify-center">
                      <img src="https://images.unsplash.com/photo-1507035895480-08acdf9b7466?w=600" className="w-full h-full object-cover opacity-60" />
                      <div className="absolute w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-xl"><Play fill="currentColor" size={20} /></div>
                      <span className="absolute bottom-3 left-3 bg-black/60 text-[9px] text-white px-2 py-1 rounded">Video quay xích (0:15)</span>
                    </div>
                  </div>
                  <div className="col-span-7 space-y-8">
                    <div className="space-y-3">
                      <div className="flex justify-between items-end">
                        <span className="text-[11px] font-bold text-gray-400 uppercase">2.1 Độ giãn xích (Wear %)</span>
                        <span className="text-sm font-black text-emerald-600">0.5%</span>
                      </div>
                      <div className="h-1.5 w-full bg-gray-100 rounded-full relative">
                        <div className="absolute h-full w-[50%] bg-emerald-500 rounded-full"></div>
                      </div>
                      <div className="flex justify-between text-[9px] font-black uppercase text-gray-300">
                        <span>Mới (0%)</span>
                        <span className="text-amber-400">Thay thế (0.75%)</span>
                        <span className="text-red-400">Nguy hiểm (1.0%)</span>
                      </div>
                    </div>
                    <ResultRow label="2.2 Tình trạng răng líp" value="Sắc nét" status="safe" />
                    <ResultRow label="2.3 Độ nhạy chuyển số" value="Mượt mà" status="safe" />
                  </div>
                </div>
              </div>

              {/* CỤM 3: PHANH & BÁNH XE */}
              <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden text-left">
                <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                  <div className="flex items-center gap-2 text-amber-600 font-black text-xs uppercase">
                    <Disc size={18} /> Cụm 3: Phanh & Bánh xe
                  </div>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">3/3 HOÀN THÀNH</span>
                </div>
                <div className="p-6 grid grid-cols-12 gap-8">
                  <div className="col-span-5 space-y-3">
                    <div className="rounded-xl overflow-hidden border border-gray-100 shadow-sm relative aspect-video">
                      <img src="https://images.unsplash.com/photo-1507035895480-08acdf9b7466?w=600" className="w-full h-full object-cover" />
                      <span className="absolute bottom-2 left-2 bg-black/60 text-white text-[8px] px-2 py-1 rounded">Bề mặt vành</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-center text-gray-400 text-[10px]">
                      <div className="rounded-lg overflow-hidden border border-gray-100 aspect-square bg-gray-50 flex items-center justify-center">Má phanh</div>
                      <div className="rounded-lg overflow-hidden border border-gray-100 aspect-square bg-gray-50 flex items-center justify-center">Lốp xe</div>
                    </div>
                  </div>
                  <div className="col-span-7 space-y-6">
                    <ResultRow label="3.1 Độ dày má phanh" value="Còn đầy" status="safe" />
                    <ResultRow label="3.2 Độ đảo vành" value="Vành cân đối" status="safe" />
                    <ResultRow label="3.3 Tình trạng lốp" value="Độ bám tốt" status="safe" />
                    <div className="mt-4 p-4 bg-amber-50 rounded-xl border-l-4 border-amber-500 text-[12px] text-amber-700 italic">
                      "Ghi chú: Lốp sau hơi mòn nhẹ ở giữa nhưng vẫn trong ngưỡng an toàn."
                    </div>
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

// --- COMPONENT CON CHO DÒNG KẾT QUẢ ---
function ResultRow({ label, value, status }) {
  const statusColors = {
    safe: 'text-emerald-600 bg-emerald-50 border-emerald-100',
    warning: 'text-amber-600 bg-amber-50 border-amber-100',
    danger: 'text-red-600 bg-red-50 border-red-100'
  };

  return (
    <div className="flex items-center justify-between py-1 border-b border-gray-50 last:border-0 transition-all hover:bg-gray-50/50 rounded-lg px-2 -mx-2">
       <span className="text-[12px] font-medium text-gray-500">{label}</span>
       <span className={`text-[11px] font-bold px-3 py-1 rounded-full border ${statusColors[status] || statusColors.safe}`}>
          {value}
       </span>
    </div>
  );
}