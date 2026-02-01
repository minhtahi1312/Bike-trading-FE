import React, { useState } from 'react';
import { 
  ChevronLeft, ChevronRight, ZoomIn, RotateCw, Maximize, 
  Check, AlertCircle, Play, Flag, Save, ArrowLeft,
  CheckCircle2
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

export default function InspectionDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeStep, setActiveStep] = useState(1); 
  const [selectedMediaId, setSelectedMediaId] = useState(1);

  // Mock Data
  const mediaList = [
    { id: 1, type: 'image', src: 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=800', label: 'Tổng quan xe', status: 'checked' },
    { id: 2, type: 'image', src: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800', label: 'Bộ đề sau', status: 'issue' },
    { id: 3, type: 'image', src: 'https://images.unsplash.com/photo-1576435728678-35d01fd18eac?w=800', label: 'Khung sườn', status: 'checked' },
    { id: 4, type: 'image', src: 'https://images.unsplash.com/photo-1507035895480-08acdf9b7466?w=800', label: 'Ghi đông', status: 'unseen' },
    { id: 5, type: 'image', src: 'https://images.unsplash.com/photo-1596483553232-0697945037d0?w=800', label: 'Bánh trước', status: 'unseen' },
    { id: 6, type: 'video', src: '#', label: 'Video quay xe', status: 'unseen' },
  ];

  const selectedMedia = mediaList.find(m => m.id === selectedMediaId);

  return (
    // Class -m-8 để lấp đầy khoảng trắng padding của Layout cha
    <div className="flex flex-col h-screen -m-8 bg-[#f9fafb] font-display text-[#111813]">
      
{/* --- TOP HEADER --- */}
<header className="bg-white border-b border-[#e5e7eb] h-16 px-6 flex items-center shrink-0 z-30 relative">
  
  {/* 1. KHỐI TRÁI: Chứa nút Quay lại */}
  <div className="flex-none"> 
    <button 
      onClick={() => navigate('/inspector/dashboard')}
      className="flex items-center text-sm font-bold text-[#637588] hover:text-[#111813] transition-colors py-2 px-3 hover:bg-gray-50 rounded-lg"
    >
      <ArrowLeft size={20} className="mr-2" /> Quay lại danh sách
    </button>
  </div>

  {/* 2. KHỐI GIỮA: Dùng flex-1 để chiếm hết khoảng trống và căn giữa nội dung bên trong nó */}
  <div className="flex-1 flex justify-center items-center">
    <div className="flex items-center gap-1 bg-gray-50 p-1 rounded-full border border-[#e5e7eb]">
      {['Xem Media', 'Checklist', 'Kết quả'].map((step, index) => {
        const stepNum = index + 1;
        const isActive = stepNum === activeStep;
        const isCompleted = stepNum < activeStep;
        
        return (
          <div key={index} className="flex items-center">
            <div 
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer select-none ${
                isActive 
                  ? 'bg-white text-emerald-700 shadow-sm ring-1 ring-emerald-100' 
                  : isCompleted ? 'text-emerald-600 hover:bg-white/50' : 'text-[#9ca3af]'
              }`}
              onClick={() => setActiveStep(stepNum)}
            >
              {isCompleted ? <CheckCircle2 size={16} /> : (
                <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] border ${
                  isActive ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-current'
                }`}>
                  {stepNum}
                </span>
              )}
              <span className="whitespace-nowrap">{step}</span>
            </div>
          </div>
        );
      })}
    </div>
  </div>

  {/* 3. KHỐI PHẢI: Chứa info và nút Tiếp theo */}
  <div className="flex-none flex items-center gap-4">
    <div className="flex items-center gap-3">
       <div className="text-right hidden xl:block">
          <p className="text-xs font-bold text-[#111813]">Nguyễn Văn Kiểm</p>
          <p className="text-[10px] text-[#637588]">Inspector</p>
       </div>
       <img src="https://i.pravatar.cc/150?img=11" className="w-9 h-9 rounded-full border border-[#e5e7eb]" alt="Inspector" />
    </div>
    <div className="h-8 w-[1px] bg-[#e5e7eb]"></div>
    <button className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold px-5 py-2.5 rounded-lg transition-colors shadow-sm shadow-emerald-500/20">
      Tiếp theo &rarr;
    </button>
  </div>
</header>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 flex overflow-hidden">
        
        {/* LEFT COLUMN: MEDIA VIEWER (70%) */}
        <div className="flex-1 bg-[#18181b] relative flex flex-col justify-center items-center overflow-hidden group">
          
          {/* Main Image */}
          <div className="relative w-full h-full p-6 flex items-center justify-center">
             {selectedMedia.type === 'video' ? (
                <div className="w-full h-full max-h-[80vh] bg-black flex items-center justify-center rounded-lg border border-white/10 text-white">
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm"><Play size={32} fill="white" /></div>
                        <span className="text-sm font-medium">Video Player Placeholder</span>
                    </div>
                </div>
             ) : (
                <img 
                  src={selectedMedia.src} 
                  alt="Inspection Detail" 
                  className="max-w-full max-h-[85vh] object-contain shadow-2xl rounded-sm"
                />
             )}
          </div>

          {/* Navigation Arrows */}
          <button className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center backdrop-blur-md transition-all border border-white/10">
            <ChevronLeft size={24} />
          </button>
          <button className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center backdrop-blur-md transition-all border border-white/10">
            <ChevronRight size={24} />
          </button>

          {/* Bottom Toolbar */}
          <div className="absolute bottom-8 bg-[#27272a]/90 backdrop-blur border border-white/10 px-6 py-3 rounded-full flex gap-6 text-white shadow-xl">
            <button className="hover:text-emerald-400 tooltip transition-colors"><ZoomIn size={20} /></button>
            <button className="hover:text-emerald-400 transition-colors"><RotateCw size={20} /></button>
            <div className="w-[1px] bg-white/20 h-5 self-center"></div>
            <button className="hover:text-emerald-400 transition-colors"><Maximize size={20} /></button>
          </div>

          {/* Image Info Overlay */}
          <div className="absolute top-6 left-6 bg-black/60 backdrop-blur-md text-white px-4 py-2.5 rounded-lg border border-white/10 shadow-lg">
            <h2 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                {selectedMedia.label}
            </h2>
            <p className="text-xs text-gray-300 mt-1 font-mono opacity-80">Media ID: #{selectedMedia.id}</p>
          </div>
        </div>

        {/* RIGHT COLUMN: SIDEBAR TOOLS (30%) */}
        <aside className="w-[420px] bg-white border-l border-[#e5e7eb] flex flex-col shadow-xl z-20">
          
          {/* 1. Filter Tabs */}
          <div className="p-4 border-b border-[#e5e7eb]">
            <div className="flex bg-[#f3f4f6] p-1 rounded-lg">
                {['Tất cả', 'Ảnh', 'Video', 'Chưa xem'].map((tab) => (
                    <button 
                        key={tab}
                        className="flex-1 py-1.5 text-xs font-bold text-[#637588] hover:text-[#111813] hover:bg-white rounded-md transition-all focus:bg-white focus:text-[#111813] focus:shadow-sm"
                    >
                        {tab}
                    </button>
                ))}
            </div>
          </div>

          {/* 2. Thumbnail Grid (Scrollable) */}
          <div className="flex-1 overflow-y-auto p-4 bg-[#f9fafb]">
            <div className="grid grid-cols-2 gap-3">
                {mediaList.map((item) => (
                    <div 
                        key={item.id}
                        onClick={() => setSelectedMediaId(item.id)}
                        className={`relative aspect-square rounded-xl overflow-hidden border-2 cursor-pointer group transition-all ${
                            selectedMediaId === item.id 
                            ? 'border-emerald-500 ring-2 ring-emerald-500/20 shadow-md' 
                            : 'border-transparent hover:border-[#d1d5db]'
                        }`}
                    >
                        <img src={item.type === 'video' ? 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800' : item.src} alt={item.label} className="w-full h-full object-cover" />
                        
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-3 pt-8">
                            <p className="text-[11px] font-bold text-white truncate">{item.label}</p>
                        </div>

                        <div className="absolute top-2 right-2">
                            {item.status === 'checked' && <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-white border-2 border-white shadow-sm"><Check size={14} strokeWidth={4} /></div>}
                            {item.status === 'issue' && <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white border-2 border-white shadow-sm"><AlertCircle size={14} strokeWidth={3} /></div>}
                        </div>
                    </div>
                ))}
            </div>
          </div>

          {/* 3. Evaluation Form (Bottom Fixed) */}
          <div className="p-5 border-t border-[#e5e7eb] bg-white">
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-[#111813]">Đánh giá chi tiết này</h3>
                <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-[#637588]">Phát hiện lỗi?</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" value="" className="sr-only peer" />
                        <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-red-500"></div>
                    </label>
                </div>
            </div>

            <textarea 
                className="w-full h-24 p-3 bg-gray-50 border border-[#e5e7eb] rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all resize-none placeholder:text-[#9ca3af] mb-3"
                placeholder="Nhập ghi chú chi tiết về tình trạng..."
            ></textarea>

            <div className="flex gap-3">
                <button onClick={() => navigate(`/inspector/checklist/${id}`)} className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold py-2.5 rounded-lg transition-colors shadow-sm shadow-emerald-500/20">
                    <Save size={18} /> Lưu & Tiếp tục
                </button>
                <button className="flex items-center justify-center px-3 py-2.5 bg-gray-100 hover:bg-red-50 text-[#637588] hover:text-red-600 rounded-lg border border-transparent hover:border-red-100 transition-colors tooltip" title="Gắn cờ">
                    <Flag size={18} />
                </button>
            </div>
          </div>

        </aside>
      </main>
    </div>
  );
}