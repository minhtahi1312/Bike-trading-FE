import React, { useState } from 'react';
import { 
  User, Mail, Phone, MapPin, Calendar, 
  Award, Shield, Camera, Edit2, Key,
  CheckCircle2, Bike, Clock
} from 'lucide-react';

export default function InspectorProfile() {
  const [activeTab, setActiveTab] = useState('info');

  // --- MOCK DATA ---
  const inspectorData = {
    name: "Nguyễn Văn Kiểm",
    role: "Senior Inspector",
    email: "kiem.nv@bikemarket.vn",
    phone: "0988 123 456",
    location: "Quận 7, TP. Hồ Chí Minh",
    joinDate: "Tháng 02, 2022",
    avatar: "https://i.pravatar.cc/150?img=11",
    bio: "Kỹ thuật viên với hơn 5 năm kinh nghiệm trong lĩnh vực bảo dưỡng và lắp ráp xe đạp thể thao cao cấp. Chuyên gia đánh giá khung Carbon và hệ thống truyền động điện tử.",
    stats: {
      totalInspected: 1248,
      passRate: "78%",
      avgTime: "24 phút"
    },
    skills: ["Chuyên gia Carbon", "Chứng chỉ Shimano", "Sram eTap AXS"]
  };

  return (
    <div className="max-w-6xl mx-auto">
      
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-[#111813] text-3xl font-extrabold tracking-tight">Hồ sơ cá nhân</h1>
        <p className="text-[#637588] text-sm mt-1">Quản lý thông tin cá nhân, bảo mật và xem hiệu suất làm việc.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* CỘT TRÁI: THÔNG TIN TÓM TẮT & STATS */}
        <div className="col-span-1 space-y-6">
          
          {/* Card Avatar & Basic Info */}
          <div className="bg-white rounded-2xl border border-[#e5e7eb] shadow-sm overflow-hidden">
            {/* Cover Photo */}
            <div className="h-24 bg-gradient-to-r from-emerald-500 to-teal-600"></div>
            
            <div className="px-6 pb-6 relative">
              {/* Avatar */}
              <div className="relative w-24 h-24 mx-auto -mt-12 mb-4">
                <img 
                  src={inspectorData.avatar} 
                  alt="Avatar" 
                  className="w-full h-full rounded-full border-4 border-white object-cover bg-white shadow-md"
                />
                <button className="absolute bottom-0 right-0 p-1.5 bg-white border border-gray-200 rounded-full text-gray-600 hover:text-emerald-600 shadow-sm transition-colors">
                  <Camera size={14} />
                </button>
              </div>

              {/* Name & Role */}
              <div className="text-center mb-6">
                <h2 className="text-xl font-black text-[#111813]">{inspectorData.name}</h2>
                <span className="inline-flex items-center gap-1 mt-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase tracking-widest">
                  <Shield size={12} /> {inspectorData.role}
                </span>
              </div>

              {/* Contact Details */}
              <div className="space-y-4 text-sm">
                <div className="flex items-center gap-3 text-[#637588]">
                  <Mail size={16} className="text-gray-400" />
                  <span className="font-medium">{inspectorData.email}</span>
                </div>
                <div className="flex items-center gap-3 text-[#637588]">
                  <Phone size={16} className="text-gray-400" />
                  <span className="font-medium">{inspectorData.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-[#637588]">
                  <MapPin size={16} className="text-gray-400" />
                  <span className="font-medium">{inspectorData.location}</span>
                </div>
                <div className="flex items-center gap-3 text-[#637588]">
                  <Calendar size={16} className="text-gray-400" />
                  <span className="font-medium">Tham gia: {inspectorData.joinDate}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card Skills */}
          <div className="bg-white rounded-2xl border border-[#e5e7eb] shadow-sm p-6">
            <h3 className="text-sm font-bold text-[#111813] uppercase tracking-wide mb-4 flex items-center gap-2">
              <Award size={18} className="text-orange-500" /> Chứng chỉ & Kỹ năng
            </h3>
            <div className="flex flex-wrap gap-2">
              {inspectorData.skills.map((skill, index) => (
                <span key={index} className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-bold text-gray-700">
                  {skill}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* CỘT PHẢI: HIỆU SUẤT & FORM CHỈNH SỬA */}
        <div className="col-span-1 lg:col-span-2 space-y-6">
          
          {/* Quick Stats Row */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-[#e5e7eb] shadow-sm flex flex-col justify-center">
              <div className="flex items-center gap-2 text-[#637588] mb-2">
                <Bike size={16} /> <span className="text-xs font-bold uppercase">Đã kiểm định</span>
              </div>
              <p className="text-2xl font-black text-[#111813]">{inspectorData.stats.totalInspected} <span className="text-sm font-medium text-gray-400">xe</span></p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-[#e5e7eb] shadow-sm flex flex-col justify-center">
              <div className="flex items-center gap-2 text-[#637588] mb-2">
                <CheckCircle2 size={16} className="text-emerald-500" /> <span className="text-xs font-bold uppercase">Tỷ lệ Đạt</span>
              </div>
              <p className="text-2xl font-black text-[#111813]">{inspectorData.stats.passRate}</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-[#e5e7eb] shadow-sm flex flex-col justify-center">
              <div className="flex items-center gap-2 text-[#637588] mb-2">
                <Clock size={16} className="text-blue-500" /> <span className="text-xs font-bold uppercase">Tốc độ TB</span>
              </div>
              <p className="text-2xl font-black text-[#111813]">{inspectorData.stats.avgTime} <span className="text-sm font-medium text-gray-400">/xe</span></p>
            </div>
          </div>

          {/* Main Form Area */}
          <div className="bg-white rounded-2xl border border-[#e5e7eb] shadow-sm overflow-hidden">
            
            {/* Tabs */}
            <div className="flex border-b border-[#e5e7eb] px-2 bg-gray-50/50">
              <button 
                onClick={() => setActiveTab('info')}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-bold transition-all border-b-2 ${
                  activeTab === 'info' ? 'border-emerald-600 text-emerald-700 bg-white' : 'border-transparent text-[#637588] hover:text-[#111813]'
                }`}
              >
                <User size={16} /> Thông tin cá nhân
              </button>
              <button 
                onClick={() => setActiveTab('security')}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-bold transition-all border-b-2 ${
                  activeTab === 'security' ? 'border-emerald-600 text-emerald-700 bg-white' : 'border-transparent text-[#637588] hover:text-[#111813]'
                }`}
              >
                <Key size={16} /> Bảo mật & Mật khẩu
              </button>
            </div>

            {/* Tab Content: Thông tin cá nhân */}
            {activeTab === 'info' && (
              <div className="p-6 sm:p-8">
                <form className="space-y-6">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-[#111813] uppercase tracking-wide">Họ và tên</label>
                      <input type="text" defaultValue={inspectorData.name} className="w-full px-4 py-2.5 bg-gray-50 border border-[#e5e7eb] rounded-xl text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-[#111813] uppercase tracking-wide">Số điện thoại</label>
                      <input type="text" defaultValue={inspectorData.phone} className="w-full px-4 py-2.5 bg-gray-50 border border-[#e5e7eb] rounded-xl text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[#111813] uppercase tracking-wide">Email liên hệ</label>
                    <input type="email" defaultValue={inspectorData.email} disabled className="w-full px-4 py-2.5 bg-gray-100 border border-[#e5e7eb] rounded-xl text-sm font-medium text-gray-500 cursor-not-allowed" />
                    <p className="text-[11px] text-gray-400 font-medium">Email này dùng để đăng nhập, vui lòng liên hệ Admin nếu muốn thay đổi.</p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[#111813] uppercase tracking-wide">Kinh nghiệm & Tiểu sử (Bio)</label>
                    <textarea 
                      rows="4" 
                      defaultValue={inspectorData.bio} 
                      className="w-full px-4 py-3 bg-gray-50 border border-[#e5e7eb] rounded-xl text-sm font-medium leading-relaxed focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all resize-none"
                    ></textarea>
                  </div>

                  <div className="pt-4 border-t border-gray-100 flex justify-end">
                    <button type="button" className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-bold transition-colors shadow-sm shadow-emerald-500/20">
                      <Edit2 size={16} /> Lưu thay đổi
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Tab Content: Bảo mật */}
            {activeTab === 'security' && (
              <div className="p-6 sm:p-8">
                <form className="space-y-6 max-w-md">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[#111813] uppercase tracking-wide">Mật khẩu hiện tại</label>
                    <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 bg-gray-50 border border-[#e5e7eb] rounded-xl text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[#111813] uppercase tracking-wide">Mật khẩu mới</label>
                    <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 bg-gray-50 border border-[#e5e7eb] rounded-xl text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[#111813] uppercase tracking-wide">Xác nhận mật khẩu mới</label>
                    <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 bg-gray-50 border border-[#e5e7eb] rounded-xl text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all" />
                  </div>
                  <div className="pt-4 border-t border-gray-100">
                    <button type="button" className="px-6 py-2.5 bg-[#111813] hover:bg-black text-white rounded-xl text-sm font-bold transition-colors shadow-sm">
                      Cập nhật mật khẩu
                    </button>
                  </div>
                </form>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}