import React, { useState } from 'react';
import { 
  ArrowLeft, ArrowRight,ChevronLeft, ChevronRight, CheckCircle2, 
  Bike, Settings, Disc, ShieldAlert,
  ChevronDown, ChevronUp, Image as ImageIcon,
  Save, AlertCircle, Check, X
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

// --- BỘ DỮ LIỆU TỪ VỰNG CHUẨN CHO API (Kịch bản A) ---
const INSPECTION_OPTIONS = {
  frame: [
    "Hoàn hảo (Không tì vết, sơn zin, không nứt móp)",
    "Khá (Xước dăm, xước sơn nhẹ bề mặt)",
    "Kém (Tróc sơn sâu, móp/trầy xước nặng)",
    "Lỗi nghiêm trọng (Rạn nứt carbon/Gãy/Biến dạng)"
  ],
  drivetrain: [
    "Hoàn hảo (Chuyển số mượt, xích chưa giãn)",
    "Khá (Xích giãn < 0.75%, hoạt động bình thường)",
    "Kém (Xích giãn > 0.75%, líp mòn, nhảy mắt xích)",
    "Lỗi nghiêm trọng (Kẹt số, gãy cùi đề, cong hanger)"
  ],
  brakes: [
    "Hoàn hảo (Vành cân chuẩn, phanh ăn tuyệt đối)",
    "Khá (Má phanh mòn < 50%, vành đảo nhẹ)",
    "Kém (Má phanh mòn > 50%, vành rỗ mòn, cần thay cáp/dầu)",
    "Lỗi nghiêm trọng (Nứt vành, đứt nan hoa, rò rỉ dầu)"
  ]
};

// --- MOCK DATA ---
const MOCK_BIKE = {
  name: "Giant TCR Advanced 2",
  id: "AB3921D",
  price: "28.500.000 ₫",
  condition: "95% (Like New)",
  description: "Xe chính chủ mua mới 2021, ít đi, odo khoảng 2000km. Group 105 R7000 hoạt động hoàn hảo.",
  specs: {
    frame: "Carbon Advanced-Grade",
    size: "M (54cm)",
    paint: "Nguyên bản, không trầy xước lớn"
  },
  media: [
    { id: 1, type: 'image', src: 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=800', label: 'Toàn cảnh - 01/08' },
    { id: 2, type: 'image', src: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800', label: 'Bộ đề sau - 02/08' },
    { id: 3, type: 'video', src: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800', label: 'Video test cối líp' },
  ]
};

export default function MergedInspectionPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  // --- STATE QUẢN LÝ UI ---
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [expandedSection, setExpandedSection] = useState('frame'); 
  const [isFullscreen, setIsFullscreen] = useState(false);

  // --- STATE QUẢN LÝ DỮ LIỆU API ---
  const [formData, setFormData] = useState({
    frame_condition: INSPECTION_OPTIONS.frame[0],
    drivetrain_condition: INSPECTION_OPTIONS.drivetrain[0],
    brakes_wheels_condition: INSPECTION_OPTIONS.brakes[0],
    comment: "",
    score: 100 // Tạm thời set 100
  });

  // --- HANDLERS ---
  const handleOptionSelect = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleComplete = async () => {
    console.log("🚀 Dữ liệu kiểm định gửi đi:", formData);
 
    navigate(`/inspector/result/${id}`);
  };

  // Helper tính toán Status Badge cho Accordion dựa vào chuỗi được chọn
  const getBadgeStatus = (valueStr) => {
    if (valueStr.includes("Hoàn hảo")) return { text: "ĐẠT", color: "bg-emerald-100 text-emerald-700" };
    if (valueStr.includes("Khá")) return { text: "CHÚ Ý", color: "bg-blue-100 text-blue-700" };
    if (valueStr.includes("Kém")) return { text: "CẢNH BÁO", color: "bg-yellow-100 text-yellow-700" };
    return { text: "LỖI", color: "bg-red-100 text-red-700" };
  };

  return (
    <div className="flex flex-col h-screen -m-8 bg-[#f3f4f6] font-display text-[#111813] overflow-hidden">
      
      {/* --- TOP HEADER --- */}
      <header className="bg-white border-b border-[#e5e7eb] h-16 px-6 flex justify-between items-center shrink-0 z-30 relative">
        
        {/* 1. KHỐI TRÁI: Nút Quay lại */}
        <div className="flex-none"> 
          <button 
            onClick={() => navigate('/inspector/dashboard')} 
            className="flex items-center text-[13px] font-bold text-[#637588] hover:text-[#111813] transition-colors py-2 px-3 hover:bg-gray-50 rounded-lg"
          >
            <ArrowLeft size={18} className="mr-2" /> Quay lại danh sách
          </button>
        </div>

        {/* 2. KHỐI GIỮA: Stepper (Gộp 2 bước thành 1) */}
        <div className="flex-1 flex justify-center items-center">
          <div className="flex items-center gap-1 bg-gray-50 p-1 rounded-full border border-[#e5e7eb]">
            
            {/* Bước 1: Kiểm định (Đang Active) */}
            <div className="flex items-center">
              <div className="flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold transition-all select-none bg-white text-emerald-700 shadow-sm ring-1 ring-emerald-100">
                <span className="w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] border border-emerald-600 bg-emerald-600 text-white">
                  1
                </span>
                <span className="whitespace-nowrap">Kiểm định chi tiết</span>
              </div>
            </div>

            {/* Bước 2: Kết quả (Inactive) */}
            <div className="flex items-center">
              <div className="flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold transition-all select-none text-[#9ca3af]">
                <span className="w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] border border-current">
                  2
                </span>
                <span className="whitespace-nowrap">Kết quả kiểm định</span>
              </div>
            </div>

          </div>
        </div>

        {/* 3. KHỐI PHẢI: User Info & Nút Tiếp tục sang trang Kết quả */}
        <div className="flex-none flex items-center gap-4">
          <div className="flex items-center gap-3">
             <div className="text-right hidden xl:block">
                <p className="text-[12px] font-bold text-[#111813]">Nguyễn Văn Kiểm</p>
                <p className="text-[10px] text-[#637588]">Inspector</p>
             </div>
             <img src="https://i.pravatar.cc/150?img=11" className="w-8 h-8 rounded-full border border-[#e5e7eb]" alt="Inspector" />
          </div>
          
          <button 
            onClick={() => navigate(`/inspector/result/${id}`)} 
            className="bg-emerald-600 hover:bg-emerald-700 text-white text-[12px] font-bold px-4 py-2 rounded-lg transition-colors shadow-sm flex items-center gap-1.5"
          >
            Tiếp tục: Kết quả <ArrowRight size={16} />
          </button>
        </div>
      </header>

      {/* --- MAIN CONTENT (2 CỘT) --- */}
      <main className="flex-1 flex overflow-hidden max-w-[1440px] mx-auto w-full p-6 gap-6">
        
        {/* CỘT TRÁI: MEDIA & THÔNG TIN XE (Scrollable) */}
        <div className="w-3/5 flex flex-col gap-6 overflow-y-auto pr-2 pb-10 custom-scrollbar">
          
          {/* Header Title */}
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-black">{MOCK_BIKE.name}</h1>
            <span className="bg-gray-200 text-gray-600 text-xs font-bold px-2 py-1 rounded">ID: {MOCK_BIKE.id}</span>
          </div>

          {/* Album Section */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-sm font-bold flex items-center gap-2">
                <ImageIcon size={18} /> Album Media từ Seller
              </h2>
              <span className="text-xs font-medium text-gray-500">8 ảnh / 2 video</span>
            </div>

            {/* Main Image Viewer */}
            <div
             className="relative w-full aspect-video bg-gray-100 rounded-xl overflow-hidden group border border-gray-200">
              <img src={MOCK_BIKE.media[activeMediaIndex].src} alt="Bike"
              onClick={() => setIsFullscreen(true)}
               className="w-full h-full object-cover" />
              
              <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur text-white text-[11px] font-bold px-3 py-1.5 rounded-full">
                {MOCK_BIKE.media[activeMediaIndex].label}
              </div>

              {/* Navigation Arrows */}
              <div className="absolute bottom-4 left-4 flex gap-2">
                <button 
                  onClick={() => setActiveMediaIndex(prev => prev > 0 ? prev - 1 : prev)}
                  className="w-8 h-8 bg-white text-black rounded-full flex items-center justify-center shadow hover:bg-gray-50"
                >
                  <ChevronLeft size={18} />
                </button>
                <button 
                  onClick={() => setActiveMediaIndex(prev => prev < MOCK_BIKE.media.length - 1 ? prev + 1 : prev)}
                  className="w-8 h-8 bg-white text-black rounded-full flex items-center justify-center shadow hover:bg-gray-50"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3 mt-4">
              {MOCK_BIKE.media.map((item, index) => (
                <div 
                  key={item.id} 
                  onClick={() => setActiveMediaIndex(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${activeMediaIndex === index ? 'border-blue-600 ring-2 ring-blue-600/20' : 'border-transparent hover:opacity-80'}`}
                >
                  <img src={item.src} className="w-full h-full object-cover" />
                </div>
              ))}
              <div className="w-20 h-20 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 bg-gray-50 cursor-pointer hover:bg-gray-100">
                <ImageIcon size={20} />
              </div>
            </div>
          </div>

          {/* Thông tin cơ bản & Specs */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm flex flex-col gap-6">
            <h2 className="text-sm font-bold uppercase tracking-wide">Thông tin cơ bản</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">Giá niêm yết</p>
                <p className="text-lg font-black">{MOCK_BIKE.price}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Tình trạng khai báo</p>
                <p className="text-sm font-bold">{MOCK_BIKE.condition}</p>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
              <p className="text-[10px] text-gray-400 uppercase font-bold mb-2">Mô tả từ người bán</p>
              <p className="text-sm text-gray-600 italic">"{MOCK_BIKE.description}"</p>
            </div>

            <div className="flex items-center gap-4 border-t border-gray-100 pt-6">
              <img src={MOCK_BIKE.media[0].src} className="w-24 h-24 rounded-lg object-cover shadow-sm" />
              <div className="flex-1 grid grid-cols-2 gap-y-3 gap-x-6 text-sm">
                <div className="flex justify-between border-b border-gray-100 pb-1">
                  <span className="text-gray-500">Chất liệu khung:</span>
                  <span className="font-bold">{MOCK_BIKE.specs.frame}</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-1">
                  <span className="text-gray-500">Kích cỡ:</span>
                  <span className="font-bold">{MOCK_BIKE.specs.size}</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-1 col-span-2">
                  <span className="text-gray-500">Tình trạng sơn báo:</span>
                  <span className="font-bold">{MOCK_BIKE.specs.paint}</span>
                </div>
              </div>
            </div>
          </div>

         
        </div>

        {/* CỘT PHẢI: FORM ĐÁNH GIÁ KỸ THUẬT (Sticky) */}
        <aside className="w-2/5 flex flex-col h-full bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden relative">
          
          <div className="p-5 border-b border-gray-200 flex justify-between items-center bg-gray-50 shrink-0">
            <h2 className="text-lg font-black text-[#111813]">Đánh giá kỹ thuật</h2>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-white custom-scrollbar pb-24">
            
            {/* 1. Accordion Khung */}
            <AccordionSection 
              title="Khung sườn & Phuộc" 
              icon={<Bike size={18} />}
              isOpen={expandedSection === 'frame'}
              onClick={() => setExpandedSection(expandedSection === 'frame' ? null : 'frame')}
              statusBadge={getBadgeStatus(formData.frame_condition)}
            >
              <RadioGroup 
                options={INSPECTION_OPTIONS.frame} 
                selectedValue={formData.frame_condition} 
                onChange={(val) => handleOptionSelect('frame_condition', val)} 
              />
            </AccordionSection>

            {/* 2. Accordion Truyền động */}
            <AccordionSection 
              title="Hệ thống truyền động" 
              icon={<Settings size={18} />}
              isOpen={expandedSection === 'drivetrain'}
              onClick={() => setExpandedSection(expandedSection === 'drivetrain' ? null : 'drivetrain')}
              statusBadge={getBadgeStatus(formData.drivetrain_condition)}
            >
              <RadioGroup 
                options={INSPECTION_OPTIONS.drivetrain} 
                selectedValue={formData.drivetrain_condition} 
                onChange={(val) => handleOptionSelect('drivetrain_condition', val)} 
              />
            </AccordionSection>

            {/* 3. Accordion Phanh & Bánh */}
            <AccordionSection 
              title="Phanh & Bánh xe" 
              icon={<Disc size={18} />}
              isOpen={expandedSection === 'brakes'}
              onClick={() => setExpandedSection(expandedSection === 'brakes' ? null : 'brakes')}
              statusBadge={getBadgeStatus(formData.brakes_wheels_condition)}
            >
              <RadioGroup 
                options={INSPECTION_OPTIONS.brakes} 
                selectedValue={formData.brakes_wheels_condition} 
                onChange={(val) => handleOptionSelect('brakes_wheels_condition', val)} 
              />
            </AccordionSection>

            {/* Overall Comment */}
            <div className="pt-4">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2 block">Comment Tổng quan</label>
              <textarea 
                value={formData.comment}
                onChange={(e) => handleOptionSelect('comment', e.target.value)}
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all min-h-[100px]" 
                placeholder="Nhập đánh giá chi tiết tình trạng thực tế của xe để lưu lại hệ thống..."
              />
            </div>
            
          </div>

{/* Action Footer (Sticky at bottom) */}
          <div className="absolute bottom-0 left-0 right-0 p-5 bg-white border-t border-gray-200 flex flex-col gap-3 shadow-[0_-15px_30px_rgba(0,0,0,0.04)] z-10">
            
            {/* Nút Hoàn tất chính */}
            <button 
              onClick={handleComplete} 
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-500/20"
            >
              <CheckCircle2 size={20} /> Hoàn tất & Xem kết quả
            </button>

            {/* Nút Lưu nháp phụ */}
            <button className="w-full text-center text-[13px] font-bold text-gray-400 hover:text-gray-600 py-1 transition-colors">
              Lưu bản nháp
            </button>
            
          </div>

        </aside>
      </main>
      {/* --- POPUP PHÓNG TO ẢNH (CHÈN Ở ĐÂY LÀ CHUẨN NHẤT) --- */}
      {isFullscreen && (
        <div 
          className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center backdrop-blur-sm"
          onClick={() => setIsFullscreen(false)} 
        >
          {/* Nút đóng */}
          <button 
            onClick={(e) => { e.stopPropagation(); setIsFullscreen(false); }}
            className="absolute top-6 right-6 text-white/50 hover:text-white bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition-all"
          >
            <X size={24} />
          </button>

          {/* Ảnh được phóng to */}
          <img 
            src={MOCK_BIKE.media[activeMediaIndex].src} 
            alt="Fullscreen Bike" 
            className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-2xl pointer-events-none"
            onClick={(e) => e.stopPropagation()} 
          />

          {/* Mũi tên trái/phải trên bản phóng to */}
          <button 
            onClick={(e) => { e.stopPropagation(); setActiveMediaIndex(prev => prev > 0 ? prev - 1 : prev); }}
            className="absolute left-8 text-white/50 hover:text-white bg-white/10 hover:bg-white/20 p-4 rounded-full transition-all"
          >
            <ChevronLeft size={36} />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); setActiveMediaIndex(prev => prev < MOCK_BIKE.media.length - 1 ? prev + 1 : prev); }}
            className="absolute right-8 text-white/50 hover:text-white bg-white/10 hover:bg-white/20 p-4 rounded-full transition-all"
          >
            <ChevronRight size={36} />
          </button>

          {/* Nhãn của ảnh */}
          <div className="absolute bottom-10 text-white text-sm font-bold bg-black/60 px-6 py-2.5 rounded-full border border-white/10 backdrop-blur-md">
            {MOCK_BIKE.media[activeMediaIndex].label}
          </div>
        </div>
      )}
    </div>
  );
}

// --- SUB-COMPONENTS CHO FORM ---

function AccordionSection({ title, icon, isOpen, onClick, statusBadge, children }) {
  return (
    <div className={`border rounded-xl overflow-hidden transition-all ${isOpen ? 'border-blue-300 shadow-md ring-4 ring-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
      {/* Header */}
      <div onClick={onClick} className={`p-4 flex items-center justify-between cursor-pointer select-none transition-colors ${isOpen ? 'bg-blue-50/50' : 'bg-white'}`}>
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${isOpen ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'}`}>
            {icon}
          </div>
          <span className="text-sm font-bold text-gray-800">{title}</span>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Status Badge */}
          <span className={`text-[10px] font-black px-2.5 py-1 rounded tracking-wide ${statusBadge.color}`}>
            {statusBadge.text}
          </span>
          {isOpen ? <ChevronUp size={18} className="text-gray-400" /> : <ChevronDown size={18} className="text-gray-400" />}
        </div>
      </div>

      {/* Content (Mở rộng) */}
      {isOpen && (
        <div className="p-4 bg-white border-t border-gray-100">
          {children}
        </div>
      )}
    </div>
  );
}

function RadioGroup({ options, selectedValue, onChange }) {
  return (
    <div className="space-y-2">
      {options.map((opt, idx) => {
        const isSelected = selectedValue === opt;
        // Đổi màu border dựa vào mức độ nghiêm trọng của option
        const activeColorClass = opt.includes("Hoàn hảo") ? 'border-emerald-500 bg-emerald-50' 
                               : opt.includes("Kém") || opt.includes("Lỗi") ? 'border-red-500 bg-red-50' 
                               : 'border-blue-500 bg-blue-50';

        return (
          <label 
            key={idx} 
            className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${isSelected ? activeColorClass : 'border-gray-200 hover:bg-gray-50'}`}
          >
            <div className="mt-0.5 relative flex items-center justify-center w-4 h-4">
              <input 
                type="radio" 
                name={`radio-${options[0]}`} // Dùng option đầu làm group name tạm
                className="peer appearance-none w-4 h-4 border-2 border-gray-300 rounded-full checked:border-current transition-all"
                style={{ color: isSelected ? 'inherit' : '' }}
                checked={isSelected}
                onChange={() => onChange(opt)}
              />
              {isSelected && <div className="absolute w-2 h-2 rounded-full bg-current"></div>}
            </div>
            <span className={`text-sm font-medium ${isSelected ? 'text-gray-900 font-bold' : 'text-gray-600'}`}>
              {opt}
            </span>
          </label>
        );
      })}
    </div>
  );
}