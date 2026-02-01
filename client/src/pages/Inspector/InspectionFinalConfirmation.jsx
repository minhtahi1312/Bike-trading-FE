import React, { useState } from 'react';
import { 
  ArrowLeft, CheckCircle2, Bike, Settings, Disc, 
  ChevronRight, AlertTriangle, ShieldCheck, FileText, 
  Send, XCircle, Info, Clock
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function InspectionFinalConfirmation() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [decision, setDecision] = useState('pass'); // pass hoặc fail
    const handleSubmitReport = () => {
    // 1. Thêm logic gọi API để cập nhật trạng thái xe vào Database tại đây
    console.log(`Đã chốt kết quả cho xe ${id}: ${decision === 'pass' ? 'ĐẠT' : 'KHÔNG ĐẠT'}`);

    // 2. Sau khi xử lý xong, điều hướng về trang Dashboard của Inspector
    toast.success("Gửi báo cáo thành công!", {
      position: "top-right",
      autoClose: 2000, // Tự đóng sau 2 giây
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored", 
    });
    navigate('/inspector/dashboard');
  };
  return (
    <div className="flex flex-col h-screen -m-8 bg-[#f4f7f6] font-display text-[#111813] overflow-hidden">
      
      {/* --- TOP HEADER --- */}
      <header className="bg-white border-b border-[#e5e7eb] h-16 px-6 flex items-center shrink-0 z-30 relative">
        <div className="flex-none flex items-center gap-4"> 
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-lg text-[#637588]">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-[13px] font-bold uppercase tracking-wider">Chốt kết quả & Xuất báo cáo</h1>
        </div>

        <div className="flex-1 flex justify-center items-center">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs">
              <CheckCircle2 size={16} /> 1. Thực hiện kiểm định
            </div>
            <div className="w-12 h-[2px] bg-emerald-200"></div>
            <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs bg-emerald-50 px-4 py-1.5 rounded-full ring-1 ring-emerald-200">
              <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px]">2</span>
              2. Chốt kết quả
            </div>
          </div>
        </div>

        <div className="flex-none">
          <img src="https://i.pravatar.cc/150?img=11" className="w-9 h-9 rounded-full border border-emerald-500 p-0.5" alt="Inspector" />
        </div>
      </header>

     <main className="flex-1 overflow-y-auto bg-[#f8fafc]">
        {/* Container bọc cả 2 cột để căn giữa và gộp chung 1 luồng cuộn */}
        <div className="flex flex-row max-w-[1400px] mx-auto min-h-full">
          
          {/* CỘT TRÁI: TÓM TẮT DỮ LIỆU (Bỏ overflow-y-auto ở đây) */}
          <section className="flex-1 p-8">
            <div className="max-w-3xl ml-auto space-y-6">
              
              {/* Thẻ Xe chính */}
              <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden relative">
                 <img src="https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800" className="w-full h-48 object-cover opacity-90" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                    <p className="text-emerald-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-1 text-left">ROAD BIKE • CARBON</p>
                    <h2 className="text-2xl font-black text-white uppercase tracking-tight text-left">Giant TCR Advanced 2 - 2021</h2>
                    <div className="flex gap-4 mt-2 text-white/70 text-[11px] font-medium">
                      <span className="flex items-center gap-1"><Info size={14}/> ID: {id || '#12345'}</span>
                      <span className="flex items-center gap-1"><Clock size={14}/> Kiểm định: 25/05/2024</span>
                    </div>
                 </div>
              </div>

              {/* Chỉ số tổng quan */}
              <div className="grid grid-cols-3 gap-4">
                 <SummaryCard icon={<ShieldCheck className="text-emerald-500"/>} label="Điểm tổng quan" value="88" sub="/100" status="Tốt" />
                 <SummaryCard icon={<AlertTriangle className="text-orange-500"/>} label="Vấn đề phát hiện" value="2" sub="lỗi nhỏ" status="Cần lưu ý" />
                 <SummaryCard icon={<Clock className="text-blue-500"/>} label="Thời gian kiểm định" value="50" sub="phút" />
              </div>

              {/* Tóm tắt hạng mục */}
              <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 space-y-4 text-left">
                <h3 className="text-sm font-black uppercase tracking-tight flex justify-between">
                  Tóm tắt hạng mục <span className="text-emerald-600 text-[10px] font-bold cursor-pointer hover:underline">Xem báo cáo chi tiết</span>
                </h3>
                <div className="space-y-3">
                  <ItemSummaryRow icon={<Bike size={18}/>} label="Khung sườn (Frame)" desc="Khung Carbon nguyên bản, không nứt gãy. Vết xước dăm nhỏ không ảnh hưởng." status="Đạt chuẩn" statusColor="text-emerald-600 bg-emerald-50" />
                  <ItemSummaryRow icon={<Settings size={18}/>} label="Truyền động (Drivetrain)" desc="Group Shimano 105 hoạt động trơn tru. Xích mòn tự nhiên, chưa cần thay." status="Tốt" statusColor="text-emerald-600 bg-emerald-50" />
                  <ItemSummaryRow icon={<Disc size={18}/>} label="Phanh (Brakes)" desc="Phanh vành Shimano 105. Má phanh trước đã mòn >70%, lực phanh hơi yếu." status="Cần lưu ý" statusColor="text-orange-600 bg-orange-50" />
                </div>
              </div>

              {/* Vấn đề cần lưu ý */}
              <div className="bg-orange-50/50 rounded-2xl border border-orange-100 p-6 text-left mb-10">
                 <h4 className="flex items-center gap-2 text-orange-700 text-xs font-black uppercase mb-4">
                   <AlertTriangle size={16} /> Các vấn đề người mua cần lưu ý
                 </h4>
                 <ul className="space-y-2 text-[12px] text-orange-800/80 font-medium list-disc list-inside">
                    <li>Má phanh trước mòn {'>'} 70%, cần thay thế sớm.</li>
                    <li>Vết trầy xước nhỏ ở dóng đứng (Seat tube).</li>
                    <li>Dây quấn ghi đông hơi bạc màu do thời gian.</li>
                 </ul>
              </div>
            </div>
          </section>

          {/* CỘT PHẢI: QUYẾT ĐỊNH CUỐI CÙNG (Bám theo khi cuộn) */}
          <aside className="w-[400px] bg-white border-l border-[#e5e7eb] p-8 shadow-sm">
            <div className="sticky top-8 space-y-8 text-left">
              <div>
                <h3 className="text-lg font-black text-[#111813] mb-1">Quyết định cuối cùng</h3>
                <p className="text-[11px] text-gray-500 font-medium uppercase tracking-wider">Chọn trạng thái để hoàn tất quy trình</p>
              </div>

              <div className="space-y-3">
                 <button 
                   onClick={() => setDecision('pass')}
                   className={`w-full p-4 rounded-2xl border-2 text-left transition-all relative ${decision === 'pass' ? 'border-emerald-500 bg-emerald-50 shadow-md ring-1 ring-emerald-200' : 'border-gray-100 hover:border-emerald-200'}`}
                 >
                    <div className="flex items-start gap-4">
                       <div className={`p-2 rounded-full ${decision === 'pass' ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-400'}`}>
                          <ShieldCheck size={20} />
                       </div>
                       <div>
                          <p className="text-[13px] font-black text-gray-900 leading-none mb-1">Đạt kiểm định</p>
                          <p className="text-[10px] text-gray-500 leading-relaxed font-medium">Xe đủ điều kiện an toàn vận hành. Cấp nhãn "Inspector Verified".</p>
                       </div>
                    </div>
                    {decision === 'pass' && <div className="absolute top-4 right-4 text-emerald-600"><CheckCircle2 size={20} /></div>}
                 </button>

                 <button 
                   onClick={() => setDecision('fail')}
                   className={`w-full p-4 rounded-2xl border-2 text-left transition-all relative ${decision === 'fail' ? 'border-red-500 bg-red-50 shadow-md ring-1 ring-red-200' : 'border-gray-100 hover:border-red-200'}`}
                 >
                    <div className="flex items-start gap-4">
                       <div className={`p-2 rounded-full ${decision === 'fail' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-400'}`}>
                          <XCircle size={20} />
                       </div>
                       <div>
                          <p className="text-[13px] font-black text-gray-900 leading-none mb-1">Không đạt kiểm định</p>
                          <p className="text-[10px] text-gray-500 leading-relaxed font-medium">Xe có lỗi nghiêm trọng hoặc không khớp mô tả. Cấp nhãn cảnh báo.</p>
                       </div>
                    </div>
                    {decision === 'fail' && <div className="absolute top-4 right-4 text-red-600"><CheckCircle2 size={20} /></div>}
                 </button>
              </div>

              <div className="space-y-3 pt-4 border-t border-gray-100">
                 <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Ghi chú cho Admin (Tùy chọn)</label>
                 <textarea 
                   className="w-full h-32 p-4 bg-gray-50 border border-gray-200 rounded-2xl text-[12px] focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all placeholder:text-gray-400 resize-none"
                   placeholder="Nhập ghi chú về tranh chấp, rủi ro hoặc thông tin nhạy cảm cần lưu ý..."
                 />
              </div>

              <div className="pt-6 border-t border-gray-100 flex flex-col gap-3">
                 <button 
                    onClick={handleSubmitReport}
                    className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-black text-sm hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2 group"
                 >
                    <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /> Gửi báo cáo & Cập nhật
                 </button>
                 <button onClick={() => navigate(-1)} className="w-full py-2 text-gray-400 text-[11px] font-bold hover:text-emerald-700 transition-all flex items-center justify-center gap-1">
                    <ArrowLeft size={14} /> Quay lại trang Kiểm định
                 </button>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

// --- Sub-components chuyên biệt ---

function SummaryCard({ icon, label, value, sub, status }) {
  return (
    <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-sm flex flex-col items-center text-center space-y-2">
       <div className="p-3 bg-gray-50 rounded-2xl mb-1">{icon}</div>
       <p className="text-[10px] font-bold text-gray-400 uppercase leading-none">{label}</p>
       <div className="flex items-baseline gap-1">
          <span className="text-2xl font-black text-gray-900">{value}</span>
          <span className="text-[10px] font-bold text-gray-400 uppercase">{sub}</span>
       </div>
       {status && <span className="text-[9px] font-black uppercase text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">{status}</span>}
    </div>
  );
}

function ItemSummaryRow({ icon, label, desc, status, statusColor }) {
  return (
    <div className="flex items-start gap-4 p-4 hover:bg-gray-50 transition-all rounded-2xl group border border-transparent hover:border-gray-100">
       <div className="p-2 bg-gray-100 rounded-xl text-gray-400 group-hover:bg-white group-hover:text-emerald-600 shadow-sm transition-all">{icon}</div>
       <div className="flex-1">
          <div className="flex justify-between items-center mb-1">
             <h4 className="text-[12px] font-black text-gray-900">{label}</h4>
             <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${statusColor}`}>{status}</span>
          </div>
          <p className="text-[11px] text-gray-500 leading-relaxed font-medium">{desc}</p>
       </div>
    </div>
  );
}