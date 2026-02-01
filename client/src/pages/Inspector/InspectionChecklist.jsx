import React, { useState } from 'react';
import { 
  ArrowLeft, CheckCircle2, Bike, Settings, Disc, 
  Plus, X, Save, ArrowRight, Image as ImageIcon
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

export default function InspectionChecklist() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeStep, setActiveStep] = useState(2); 
  
  // --- STATE QUẢN LÝ DỮ LIỆU (Giữ nguyên từ code cũ) ---
  const [chainWear, setChainWear] = useState(0.5);
  const [evidenceImages, setEvidenceImages] = useState([]);

  const handleUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => URL.createObjectURL(file));
    setEvidenceImages([...evidenceImages, ...newImages]);
  };
const handleSaveAndContinue = () => {
    // Giả lập logic lưu dữ liệu tại đây nếu cần
    console.log("Đang lưu kết quả cho xe:", id);
    
    // Chuyển hướng sang trang kết quả
    navigate(`/inspector/result/${id}`);
  };
  return (
    <div className="flex flex-col h-screen -m-8 bg-[#f9fafb] font-display text-[#111813] overflow-hidden">
      
      {/* --- TOP HEADER (Cấu trúc đồng nhất) --- */}
      <header className="bg-white border-b border-[#e5e7eb] h-16 px-6 flex items-center shrink-0 z-30 relative">
        <div className="flex-none"> 
          <button onClick={() => navigate(-1)} className="flex items-center text-[13px] font-bold text-[#637588] hover:text-[#111813] transition-colors py-2 px-3 hover:bg-gray-50 rounded-lg">
            <ArrowLeft size={18} className="mr-2" /> Quay lại danh sách
          </button>
        </div>

        <div className="flex-1 flex justify-center items-center">
          <div className="flex items-center gap-1 bg-gray-50 p-1 rounded-full border border-[#e5e7eb]">
            {['Xem Media', 'Checklist', 'Kết quả'].map((step, index) => {
              const stepNum = index + 1;
              const isActive = stepNum === activeStep;
              const isCompleted = stepNum < activeStep;
              return (
                <div key={index} className="flex items-center">
                  <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold transition-all select-none ${
                    isActive ? 'bg-white text-emerald-700 shadow-sm ring-1 ring-emerald-100' : isCompleted ? 'text-emerald-600' : 'text-[#9ca3af]'
                  }`}>
                    {isCompleted ? <CheckCircle2 size={14} /> : (
                      <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] border ${isActive ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-current'}`}>
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

        <div className="flex-none flex items-center gap-4">
          <div className="flex items-center gap-3">
             <div className="text-right hidden xl:block">
                <p className="text-[12px] font-bold text-[#111813]">Nguyễn Văn Kiểm</p>
                <p className="text-[10px] text-[#637588]">Inspector</p>
             </div>
             <img src="https://i.pravatar.cc/150?img=11" className="w-8 h-8 rounded-full border border-[#e5e7eb]" alt="Inspector" />
          </div>
          <button onClick={handleSaveAndContinue} className="bg-emerald-600 hover:bg-emerald-700 text-white text-[12px] font-bold px-4 py-2 rounded-lg transition-colors shadow-sm">
            Tiếp tục: Xác nhận &rarr;
          </button>
        </div>
      </header>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 flex overflow-hidden">
        
        {/* CỘT TRÁI: HIỂN THỊ XE (Nền tối, giữ card thông tin) */}
        <div className="w-[45%] bg-[#18181b] relative flex flex-col justify-center items-center p-10 overflow-hidden shrink-0">
           <div className="w-full max-w-md">
              <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
                <img src="https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=800" className="w-full h-56 object-cover" alt="Bike" />
                <div className="p-5">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-xl font-black text-[#111813]">Giant TCR Advanced 2</h2>
                      <p className="text-[11px] text-[#637588] mt-0.5 font-medium">Model 2021 • Carbon • M (54cm)</p>
                    </div>
                    <span className="bg-emerald-100 text-emerald-700 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest">Active</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 py-3 border-t border-gray-100">
                    <div>
                      <p className="text-[9px] text-[#9ca3af] font-bold uppercase tracking-widest">Giá mong muốn</p>
                      <p className="text-sm font-bold text-[#111813]">28.500.000 ₫</p>
                    </div>
                    <div>
                      <p className="text-[9px] text-[#9ca3af] font-bold uppercase tracking-widest">Size</p>
                      <p className="text-sm font-bold text-[#111813]">M (54cm)</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 bg-white/5 border border-white/10 p-4 rounded-xl backdrop-blur-sm">
                <p className="text-[9px] font-bold text-emerald-400 uppercase mb-1.5 tracking-wider">Mô tả từ người bán</p>
                <p className="text-[12px] text-gray-300 italic leading-relaxed opacity-80">
                  "Xe chính chủ mua mới 2021, ít đi, odo khoảng 2000km. Group 105 R7000 hoạt động hoàn hảo..."
                </p>
              </div>
           </div>
        </div>

        {/* CỘT PHẢI: CHI TIẾT CHECKLIST (Cuộn độc lập, khôi phục toàn bộ thuộc tính cũ) */}
        <aside className="flex-1 bg-white border-l border-[#e5e7eb] flex flex-col shadow-2xl z-20">
          <div className="p-4 border-b border-[#e5e7eb] flex justify-between items-center bg-white shrink-0">
             <h3 className="font-black text-[#111813] uppercase tracking-tight text-[12px]">Chi tiết Checklist</h3>
             <span className="text-[9px] font-bold bg-gray-100 px-2 py-1 rounded text-gray-500 uppercase">0/3 Hoàn thành</span>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-6 bg-[#f9fafb]">
            
            {/* 1. KHUNG SƯỜN & PHUỘC */}
            <section className="space-y-3">
              <div className="flex items-center gap-2 text-emerald-600">
                <Bike size={16} />
                <span className="text-[11px] font-black uppercase">1. Khung sườn & Phuộc (Frame)</span>
              </div>
              <div className="bg-white p-5 rounded-xl border border-[#e5e7eb] shadow-sm space-y-5">
                <div>
                  <label className="text-[10px] font-bold text-[#637588] uppercase block mb-3">Tình trạng sơn (Paint Condition)</label>
                  <div className="grid grid-cols-3 gap-2">
                    <CheckOption label="Tốt (Good)" sub="Trầy xước nhẹ" active />
                    <CheckOption label="Khá (Fair)" sub="Tróc sơn nhỏ" />
                    <CheckOption label="Kém (Poor)" sub="Sơn lại / Bong tróc" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <ToggleField label="Nứt Carbon (Cracks)" options={['Không nứt', 'Phát hiện lỗi']} />
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-[#637588] uppercase block">Bi cổ thả (Headset)</label>
                    <div className="flex items-center justify-between p-2.5 bg-gray-50 rounded-lg border border-gray-100">
                      <span className="text-[10px] text-gray-400 italic">Rơ / Kêu?</span>
                      <Switch />
                    </div>
                  </div>
                </div>
                <textarea className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-[11px] outline-none" rows="2" placeholder="Ghi chú của Inspector về khung sườn..." />
              </div>
            </section>

            {/* 2. TRUYỀN ĐỘNG */}
            <section className="space-y-3">
              <div className="flex items-center gap-2 text-purple-600">
                <Settings size={16} />
                <span className="text-[11px] font-black uppercase">2. Truyền động (Drivetrain)</span>
              </div>
              <div className="bg-white p-5 rounded-xl border border-[#e5e7eb] shadow-sm space-y-6">
                <div className="space-y-3">
                   <div className="flex justify-between text-[10px] font-bold">
                      <span className="text-gray-400 uppercase">Độ giãn xích (Chain Wear)</span>
                      <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 font-mono">{chainWear}% (Tốt)</span>
                   </div>
                   <input type="range" className="w-full accent-emerald-600 h-1" value={chainWear} onChange={(e) => setChainWear(e.target.value)} min="0" max="1" step="0.1" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <SelectField label="Líp (Cassette)" options={['Như mới (Không mòn răng)', 'Mòn nhẹ', 'Cần thay thế']} />
                  <ToggleField label="Chuyển số (Shifting)" options={['Mượt mà', 'Cần chỉnh']} />
                </div>
              </div>
            </section>

            {/* 3. PHANH & BÁNH XE */}
 <section className="space-y-3">
              <div className="flex items-center gap-2 text-[#059669]">
                <Disc size={18} className="text-emerald-600" />
                <span className="text-[12px] font-black uppercase tracking-tight">Cụm 3: Phanh & Bánh xe</span>
              </div>
              
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
                
                {/* 3.1 Độ dày má phanh */}
                <div className="space-y-3">
                  <label className="text-[11px] font-bold text-gray-700 uppercase">3.1 Độ dày má phanh</label>
                  <div className="grid grid-cols-3 gap-3">
                    <button className="py-2 px-4 rounded-lg border border-gray-200 text-[11px] font-bold text-gray-500 hover:border-emerald-500 hover:text-emerald-600 transition-all">Còn đầy</button>
                    <button className="py-2 px-4 rounded-lg border-emerald-500 bg-emerald-50 text-emerald-700 text-[11px] font-bold">Trung bình</button>
                    <button className="py-2 px-4 rounded-lg border border-gray-200 text-[11px] font-bold text-gray-500 hover:border-emerald-500 hover:text-emerald-600 transition-all">Cần thay</button>
                  </div>
                </div>

                {/* 3.2 Độ đảo vành */}
                <div className="space-y-3">
                  <label className="text-[11px] font-bold text-gray-700 uppercase">3.2 Độ đảo vành (Truing)</label>
                  <div className="flex items-center gap-6">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input type="radio" name="truing" className="w-4 h-4 accent-emerald-600" />
                      <span className="text-[12px] text-gray-600 group-hover:text-emerald-600 transition-colors">Vành cân đối</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input type="radio" name="truing" className="w-4 h-4 accent-emerald-600" />
                      <span className="text-[12px] text-gray-600 group-hover:text-emerald-600 transition-colors">Có hiện tượng đảo nhẹ</span>
                    </label>
                  </div>
                </div>

                {/* 3.3 Tình trạng lốp */}
                <div className="space-y-3 pt-2">
                  <label className="text-[11px] font-bold text-gray-700 uppercase">3.3 Tình trạng lốp</label>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-gray-50 border border-gray-200 px-4 py-2 rounded-full text-[12px] text-gray-500 font-medium">
                      Continental Grand Prix 5000
                    </div>
                    <div className="bg-emerald-50 text-emerald-600 border border-emerald-100 px-4 py-2 rounded-full text-[11px] font-black uppercase tracking-wider">
                      Độ bám tốt
                    </div>
                  </div>
                </div>

                {/* Ghi chú thêm cho phần phanh */}
                <textarea 
                  className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-[12px] outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all" 
                  rows="2" 
                  placeholder="Ghi chú thêm cho cụm phanh & bánh xe..."
                />
              </div>
            </section>

            {/* 4. TẢI LÊN BẰNG CHỨNG */}
            <section className="space-y-3">
               <div className="flex items-center gap-2 text-[#637588]">
                  <ImageIcon size={16} />
                  <span className="text-[11px] font-black uppercase">Tải lên bằng chứng (Evidence)</span>
               </div>
               <div className="grid grid-cols-4 gap-2">
                  {evidenceImages.map((src, i) => (
                    <div key={i} className="aspect-square rounded-lg border overflow-hidden relative group">
                       <img src={src} className="w-full h-full object-cover" />
                       <button onClick={() => setEvidenceImages(evidenceImages.filter((_, idx) => idx !== i))} className="absolute inset-0 bg-red-500/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"><X size={14} /></button>
                    </div>
                  ))}
                  <label className="aspect-square border-2 border-dashed border-gray-200 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-emerald-50 transition-all">
                     <Plus size={16} className="text-gray-400" />
                     <span className="text-[8px] font-bold text-gray-400 mt-1 uppercase">Thêm ảnh</span>
                     <input type="file" multiple className="hidden" onChange={handleUpload} />
                  </label>
               </div>
            </section>

            {/* 5. KẾT LUẬN CUỐI CÙNG (Khôi phục từ code cũ) */}
            <section className="space-y-3">
               <div className="bg-white p-5 rounded-xl border border-[#e5e7eb] shadow-sm space-y-4">
                  <div>
                    <label className="text-[11px] font-black text-[#111813] uppercase block mb-3">Kết luận cuối cùng của Inspector</label>
                    <textarea className="w-full h-24 p-3 bg-gray-50 border border-gray-200 rounded-xl text-[11px] outline-none" placeholder="Tóm tắt tình trạng xe..." />
                  </div>

                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 bg-emerald-600 rounded-full text-white"><CheckCircle2 size={16} /></div>
                      <div>
                        <p className="text-[11px] font-bold text-emerald-900 leading-none">Trạng thái xác thực</p>
                        <p className="text-[9px] text-emerald-700/70 italic mt-0.5">Xe đạt chuẩn Certified.</p>
                      </div>
                    </div>
                    <Switch active />
                  </div>
               </div>
            </section>
          </div>

          {/* Action Footer */}
          <div className="p-4 border-t border-[#e5e7eb] bg-white">
            <button onClick={handleSaveAndContinue} className="w-full flex items-center justify-center gap-2 bg-[#111813] hover:bg-black text-white font-bold py-3 rounded-xl text-[12px] transition-all">
               <Save size={16} /> Lưu kết quả kiểm định
            </button>
          </div>
        </aside>
      </main>
    </div>
  );
}

// --- SUB-COMPONENTS (Khôi phục toàn bộ từ code cũ) ---
function CheckOption({ label, sub, active }) {
  return (
    <button className={`p-2.5 rounded-lg border-2 text-left transition-all ${
      active ? 'bg-emerald-50 border-emerald-500 text-emerald-700' : 'bg-white border-gray-100 text-gray-400 hover:border-gray-200'
    }`}>
      <p className="text-[10px] font-black uppercase tracking-tight leading-none">{label}</p>
      {sub && <p className="text-[8px] font-medium opacity-60 italic mt-0.5 leading-none">{sub}</p>}
    </button>
  );
}

function ToggleField({ label, options }) {
  return (
    <div className="space-y-1.5">
      <label className="text-[10px] font-bold text-[#637588] uppercase block">{label}</label>
      <div className="flex p-1 bg-gray-100 rounded-lg">
        <button className="flex-1 py-1 text-[9px] font-bold bg-white text-emerald-600 rounded shadow-sm uppercase">{options[0]}</button>
        <button className="flex-1 py-1 text-[9px] font-bold text-gray-400 uppercase">{options[1]}</button>
      </div>
    </div>
  );
}

function SelectField({ label, options }) {
  return (
    <div className="space-y-1.5">
      <label className="text-[10px] font-bold text-[#637588] uppercase block">{label}</label>
      <select className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg text-[10px] font-bold outline-none">
        {options.map((opt, i) => <option key={i}>{opt}</option>)}
      </select>
    </div>
  );
}

function Switch({ active }) {
  return (
    <div className={`w-8 h-4.5 rounded-full relative p-0.5 transition-colors cursor-pointer ${active ? 'bg-emerald-600' : 'bg-gray-200'}`}>
      <div className={`w-3.5 h-3.5 bg-white rounded-full shadow-sm transition-transform ${active ? 'translate-x-3.5' : 'translate-x-0'}`} />
    </div>
  );
}