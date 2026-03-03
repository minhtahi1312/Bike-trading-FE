import React, { useState } from 'react';
import { 
  ChevronRight, AlertTriangle, User, Image as ImageIcon, 
  MessageSquare, Clock, ShieldAlert, CheckCircle2, 
  XCircle, ExternalLink, Bike, History, FileText
} from 'lucide-react';
import { useNavigate, useParams, Link } from 'react-router-dom';

export default function ComplaintDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [fullscreenImage, setFullscreenImage] = useState(null);

  // --- MOCK DATA: Chi tiết một khiếu nại ---
  const REPORT_DATA = {
    id: id || "RP-0921",
    status: "pending",
    statusText: "Chờ xử lý",
    date: "26 thg 10, 2023 - 14:30",
    reason: "Xe không đúng mô tả, xước nhiều hơn ảnh",
    description: "Chào admin, hôm qua tôi có qua xem chiếc Giant TCR của bạn Tú đăng bán. Trong hình xe rất mới không có vết xước, nhưng thực tế phần phuộc trước bị xước dăm rất nhiều, líp cũng có dấu hiệu rỉ sét mài mòn mạnh. Tôi nghi ngờ người bán dùng ảnh mạng hoặc ảnh chụp từ lúc mới mua để lừa người dùng. Mong admin kiểm tra lại tin đăng này.",
    
    // Bằng chứng đính kèm (Hình ảnh/Video người report gửi)
    evidence: [
      "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=400",
      "https://images.unsplash.com/photo-1576435728678-35d01fd18eac?w=400"
    ],

    // Người gửi khiếu nại
    reporter: {
      id: "USR-442",
      name: "Nguyễn Văn A",
      phone: "0901 234 567",
      email: "nguyenvana@gmail.com",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
      trustScore: 98 // Điểm uy tín
    },

    // Đối tượng bị khiếu nại (Tin đăng xe)
    target: {
      type: "Tin đăng",
      id: "XE-8821",
      name: "Giant TCR Advanced 2021",
      image: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=400",
      price: "28.500.000 ₫",
      owner: "Trần Thị Tú (USR-112)"
    },

    // Tiến trình
    timeline: [
      { time: "14:30", date: "26/10/2023", title: "Gửi khiếu nại", desc: "Nguyễn Văn A tạo báo cáo." },
      { time: "14:35", date: "26/10/2023", title: "Hệ thống tiếp nhận", desc: "Tự động ẩn tin đăng tạm thời chờ Admin duyệt." }
    ]
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'processing': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'resolved': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'rejected': return 'bg-gray-100 text-gray-700 border-gray-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="flex-1 font-display text-[#111813] max-w-6xl mx-auto pb-12">
      
      {/* 1. BREADCRUMBS */}
      <div className="flex items-center gap-2 text-sm text-[#637588] mb-6 font-medium">
        <Link to="/admin/reports" className="hover:text-[#111813] transition-colors">Khiếu nại</Link>
        <ChevronRight size={16} />
        <span className="font-bold text-[#111813]">Chi tiết #{REPORT_DATA.id}</span>
      </div>

      {/* 2. HEADER */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${getStatusBadge(REPORT_DATA.status)}`}>
              <AlertTriangle size={14} /> {REPORT_DATA.statusText}
            </span>
            <span className="text-sm font-medium text-[#637588] flex items-center gap-1.5">
              <Clock size={14} /> {REPORT_DATA.date}
            </span>
          </div>
          <h1 className="text-3xl font-black text-[#111813] tracking-tight">{REPORT_DATA.reason}</h1>
        </div>
      </div>

      {/* 3. MAIN CONTENT (GRID 2 CỘT) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* ================= CỘT TRÁI (NỘI DUNG CHÍNH) ================= */}
        <div className="col-span-2 space-y-6">
          
          {/* Card 1: Nội dung chi tiết & Bằng chứng */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8">
            <h3 className="text-lg font-black text-[#111813] mb-6 flex items-center gap-2">
              <MessageSquare size={20} className="text-amber-500" /> Nội dung báo cáo
            </h3>
            
            <div className="bg-amber-50/50 p-5 rounded-2xl border border-amber-100 text-sm leading-relaxed text-gray-800 font-medium mb-6 italic">
              "{REPORT_DATA.description}"
            </div>

            <h4 className="text-sm font-bold text-[#111813] uppercase tracking-wider mb-4 flex items-center gap-2 mt-8">
              <ImageIcon size={18} className="text-gray-400" /> Bằng chứng đính kèm
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {REPORT_DATA.evidence.map((img, idx) => (
                <div 
                  key={idx} 
                  onClick={() => setFullscreenImage(img)}
                  className="relative aspect-video rounded-xl overflow-hidden cursor-pointer border border-gray-200 group"
                >
                  <img src={img} alt="Evidence" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Card 2: Đối tượng bị khiếu nại */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8">
            <h3 className="text-lg font-black text-[#111813] mb-6 flex items-center gap-2">
              <Bike size={20} className="text-blue-500" /> Đối tượng bị báo cáo ({REPORT_DATA.target.type})
            </h3>
            
            <div className="flex items-start sm:items-center gap-5 p-5 bg-gray-50 rounded-2xl border border-gray-100 flex-col sm:flex-row">
              <img src={REPORT_DATA.target.image} alt="Target" className="w-full sm:w-28 h-28 rounded-xl object-cover shadow-sm border border-gray-200 shrink-0" />
              <div className="flex-1 w-full">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 bg-white px-2 py-1 rounded border border-gray-200">ID: {REPORT_DATA.target.id}</span>
                    <h4 className="font-bold text-lg text-[#111813] mt-2 leading-tight">{REPORT_DATA.target.name}</h4>
                    <p className="text-emerald-600 font-black mt-1">{REPORT_DATA.target.price}</p>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-200/60 flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-500">Chủ sở hữu: <strong className="text-gray-900">{REPORT_DATA.target.owner}</strong></span>
                  <button className="text-blue-600 hover:text-blue-800 text-xs font-bold flex items-center gap-1">
                    Xem tin đăng <ExternalLink size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= CỘT PHẢI (THAO TÁC & THÔNG TIN BÊN LỀ) ================= */}
        <div className="col-span-1 space-y-6">

          {/* Card 3: Xử lý khiếu nại (Action Panel) */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-orange-500"></div>
            <h3 className="text-[15px] font-black text-[#111813] mb-5 uppercase tracking-tight flex items-center gap-2">
              <ShieldAlert size={18} className="text-amber-500" /> Quyết định xử lý
            </h3>

            <div className="space-y-3">
              <button className="w-full flex items-center justify-center gap-2 py-3 bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white border border-emerald-200 hover:border-emerald-600 font-bold rounded-xl transition-all shadow-sm">
                <CheckCircle2 size={18} /> Khiếu nại đúng (Gỡ tin)
              </button>
              <button className="w-full flex items-center justify-center gap-2 py-3 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white border border-red-200 hover:border-red-600 font-bold rounded-xl transition-all shadow-sm">
                <ShieldAlert size={18} /> Cảnh cáo Người bán
              </button>
              <button className="w-full flex items-center justify-center gap-2 py-3 bg-white text-gray-600 hover:bg-gray-100 border border-gray-300 font-bold rounded-xl transition-all shadow-sm">
                <XCircle size={18} /> Bác bỏ khiếu nại
              </button>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-100">
              <textarea 
                placeholder="Ghi chú nội bộ cho quyết định xử lý..." 
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 resize-none h-24"
              ></textarea>
            </div>
          </div>
          
          {/* Card 4: Người gửi */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
            <h3 className="text-[15px] font-black text-[#111813] mb-5 uppercase tracking-tight flex items-center gap-2">
              <User size={18} className="text-blue-500" /> Người gửi báo cáo
            </h3>
            
            <div className="flex items-center gap-4 mb-4">
              <img src={REPORT_DATA.reporter.avatar} alt="Avatar" className="w-12 h-12 rounded-full border border-gray-200" />
              <div>
                <p className="font-bold text-gray-900">{REPORT_DATA.reporter.name}</p>
                <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded uppercase">Điểm uy tín: {REPORT_DATA.reporter.trustScore}/100</span>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between pb-1">
                <span className="text-gray-500">SĐT:</span><span className="font-semibold text-gray-900">{REPORT_DATA.reporter.phone}</span>
              </div>
              <div className="flex justify-between pb-1">
                <span className="text-gray-500">Email:</span><span className="font-semibold text-gray-900">{REPORT_DATA.reporter.email}</span>
              </div>
            </div>
            <button className="w-full mt-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold rounded-xl transition-colors text-xs border border-gray-200">Xem lịch sử user này</button>
          </div>

          {/* Card 5: Timeline */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
            <h3 className="text-[15px] font-black text-[#111813] mb-5 uppercase tracking-tight flex items-center gap-2">
              <History size={18} className="text-gray-500" /> Nhật ký hệ thống
            </h3>
            <div className="relative border-l-2 border-gray-100 ml-3 space-y-5">
              {REPORT_DATA.timeline.map((step, index) => (
                <div key={index} className="relative pl-5">
                  <span className="absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 border-white bg-gray-300"></span>
                  <div className="flex flex-col gap-0.5">
                    <h4 className="text-sm font-bold text-gray-800">{step.title}</h4>
                    <span className="text-[10px] font-bold text-gray-400">{step.time} • {step.date}</span>
                    <p className="text-xs text-gray-600 mt-1">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* POPUP LIGHTBOX XEM ẢNH */}
      {fullscreenImage && (
        <div className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center backdrop-blur-sm" onClick={() => setFullscreenImage(null)}>
          <button className="absolute top-6 right-6 text-white/50 hover:text-white bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition-all">
            <XCircle size={24} />
          </button>
          <img src={fullscreenImage} alt="Fullscreen Evidence" className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-2xl pointer-events-none" />
        </div>
      )}

    </div>
  );
}