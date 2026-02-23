import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, MapPin, Clock, Shield, CheckCircle, 
  XCircle, AlertCircle, PlayCircle, ExternalLink, 
  Star, ChevronRight, Tag
} from 'lucide-react';

const ListingDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeImage, setActiveImage] = useState(0);

  // Mock Data: Dựa trên hình mẫu Giant TCR Advanced Pro
  const listing = {
    id: id,
    code: '#BM-29384',
    name: 'Giant TCR Advanced Pro 1 Disc - 2022',
    price: '45.000.000 ₫',
    originalPrice: '52.000.000 ₫',
    status: 'pending', // pending
    category: 'Road Bike',
    location: 'TP. Hồ Chí Minh',
    time: 'Đăng 2 giờ trước',
    description: `Cần bán xe Giant TCR Advanced Pro 1 Disc đời 2022, size M phù hợp chiều cao 1m70-1m80. 
    
Xe mới đi được khoảng 2000km, bảo dưỡng định kỳ tại hãng. Khung carbon không một vết xước, groupset Ultegra hoạt động hoàn hảo. Đã nâng cấp bánh carbon SLR 1 42mm. 

Tặng kèm gọng nước và bàn đạp can Shimano. Xem xe tại nhà riêng quận 7.`,
    images: [
      "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=800&q=80", // Ảnh chính (Giant bike placeholder)
      "https://images.unsplash.com/photo-1576435728678-35d0160181f7?w=800&q=80",
      "https://images.unsplash.com/photo-1507035895480-08acdf9b6bc9?w=800&q=80",
      "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800&q=80"
    ],
    video: true,
    seller: {
      name: 'Nguyễn Văn A',
      avatar: 'https://ui-avatars.com/api/?name=Nguyen+Van+A&background=0D8ABC&color=fff',
      verified: true,
      rating: 4.8,
      ratingCount: 24,
      joinTime: '2 năm trước',
      sales: 15, // Đã bán
      successRate: '12 thành công'
    }
  };

  return (
    <div className="font-display text-[#111813] bg-gray-50/50 min-h-screen pb-10">
      
      {/* --- HEADER: BREADCRUMB & TOP BAR --- */}
      <div className="flex items-center justify-between mb-6 bg-white p-4 rounded-xl border border-[#e5e7eb] shadow-sm">
        <div className="flex items-center gap-3">
          <button 
             onClick={() => navigate(-1)}
             className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors"
          >
             <ArrowLeft size={20} />
          </button>
          <div className="flex items-center gap-2 text-sm text-gray-500">
             <span>Tin đăng</span>
             <ChevronRight size={16} />
             <span className="font-bold text-[#111813]">Chi tiết {listing.code}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
           <div className="px-3 py-1.5 bg-yellow-100 text-yellow-700 rounded-lg text-xs font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></span>
              Đang chờ duyệt
           </div>
        </div>
      </div>

      {/* --- MAIN LAYOUT --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* === CỘT TRÁI: NỘI DUNG (2/3) === */}
        <div className="lg:col-span-2 space-y-6">
           
           {/* 1. Hình ảnh & Video */}
           <div className="bg-white p-6 rounded-xl border border-[#e5e7eb] shadow-sm">
              <div className="flex justify-between items-center mb-4">
                 <h3 className="font-bold text-lg">Hình ảnh & Video</h3>
                 <span className="text-sm text-gray-500">6 ảnh • 1 video</span>
              </div>
              
              {/* Main Image View */}
              <div className="aspect-video w-full bg-gray-100 rounded-xl overflow-hidden mb-4 border border-gray-100">
                 <img 
                   src={listing.images[activeImage]} 
                   alt="Main View" 
                   className="w-full h-full object-cover" 
                 />
              </div>

              {/* Thumbnails */}
              <div className="grid grid-cols-4 gap-4">
                 {listing.images.map((img, idx) => (
                   <div 
                      key={idx} 
                      onClick={() => setActiveImage(idx)}
                      className={`aspect-video rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                         activeImage === idx ? 'border-emerald-500 opacity-100' : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                   >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                   </div>
                 ))}
                 
                 {/* Video Thumbnail Placeholder */}
                 {listing.video && (
                    <div className="aspect-video rounded-lg bg-[#111813] flex items-center justify-center cursor-pointer group relative overflow-hidden">
                       <div className="absolute inset-0 bg-white/10 group-hover:bg-white/20 transition-colors"></div>
                       <PlayCircle size={32} className="text-white relative z-10" />
                       <span className="absolute bottom-1 right-2 text-[10px] font-bold text-white bg-black/50 px-1 rounded">00:45</span>
                    </div>
                 )}
              </div>
           </div>

           {/* 2. Thông tin chi tiết */}
           <div className="bg-white p-6 rounded-xl border border-[#e5e7eb] shadow-sm">
              <div className="flex justify-between items-start mb-2">
                 <h1 className="text-2xl font-extrabold text-[#111813] leading-snug max-w-xl">
                    {listing.name}
                 </h1>
                 <div className="text-right">
                    <div className="text-2xl font-extrabold text-emerald-600">{listing.price}</div>
                    <div className="text-sm text-gray-400 line-through font-medium">{listing.originalPrice}</div>
                 </div>
              </div>

              {/* Metadata Tags */}
              <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-6 pb-6 border-b border-gray-100">
                 <span className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg font-medium">
                    <Tag size={16} /> {listing.category}
                 </span>
                 <span className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg font-medium">
                    <MapPin size={16} /> {listing.location}
                 </span>
                 <span className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg font-medium">
                    <Clock size={16} /> {listing.time}
                 </span>
              </div>

              {/* Description */}
              <h3 className="font-bold text-lg mb-3">Mô tả từ người bán</h3>
              <div className="text-sm text-[#4b5563] leading-7 whitespace-pre-line">
                 {listing.description}
              </div>
           </div>
        </div>

        {/* === CỘT PHẢI: SIDEBAR (1/3) === */}
        <div className="lg:col-span-1 space-y-6">
           
           {/* 1. Quyết định duyệt tin (Box quan trọng nhất) */}
           <div className="bg-white rounded-xl border border-[#e5e7eb] shadow-sm overflow-hidden">
              <div className="bg-emerald-600 p-4 text-white">
                 <h3 className="font-bold flex items-center gap-2">
                    <CheckCircle size={20} /> Quyết định duyệt tin
                 </h3>
                 <p className="text-emerald-100 text-xs mt-1 opacity-90">
                    Vui lòng kiểm tra kỹ nội dung trước khi phê duyệt.
                 </p>
              </div>
              
              <div className="p-5 space-y-4">
                 <div>
                    <label className="block text-xs font-bold text-[#637588] uppercase mb-2">Lý do từ chối (nếu có)</label>
                    <textarea 
                       rows="3" 
                       placeholder="Nhập lý do từ chối để gửi thông báo cho người bán..."
                       className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all resize-none"
                    ></textarea>
                 </div>
                 
                 <div className="grid grid-cols-2 gap-3">
                    <button className="flex items-center justify-center gap-2 py-3 border border-red-200 text-red-600 bg-red-50 hover:bg-red-100 rounded-xl text-sm font-bold transition-colors">
                       <XCircle size={18} /> Từ chối
                    </button>
                    <button className="flex items-center justify-center gap-2 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-bold shadow-lg shadow-emerald-600/20 transition-all">
                       <CheckCircle size={18} /> Phê duyệt
                    </button>
                 </div>
              </div>
           </div>

           {/* 2. Thông tin người bán */}
           <div className="bg-white p-5 rounded-xl border border-[#e5e7eb] shadow-sm">
              <h3 className="font-bold text-[#111813] mb-4 border-b border-gray-100 pb-2">Thông tin người bán</h3>
              
              <div className="flex items-center gap-3 mb-4">
                 <img src={listing.seller.avatar} alt="Seller" className="w-12 h-12 rounded-full border border-gray-200" />
                 <div>
                    <div className="font-bold text-[#111813] text-base">{listing.seller.name}</div>
                    {listing.seller.verified && (
                       <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-1 bg-emerald-50 px-1.5 py-0.5 rounded mt-0.5 w-fit">
                          <Shield size={10} /> Tài khoản xác thực
                       </span>
                    )}
                 </div>
              </div>

              <div className="space-y-3 text-sm">
                 <div className="flex justify-between items-center py-2 border-b border-gray-50">
                    <span className="text-gray-500">Độ uy tín</span>
                    <span className="font-bold flex items-center gap-1">
                       {listing.seller.rating} <Star size={12} className="text-yellow-500 fill-yellow-500" />
                       <span className="text-gray-400 text-xs font-normal">({listing.seller.ratingCount} đánh giá)</span>
                    </span>
                 </div>
                 <div className="flex justify-between items-center py-2 border-b border-gray-50">
                    <span className="text-gray-500">Tham gia</span>
                    <span className="font-medium text-[#111813]">{listing.seller.joinTime}</span>
                 </div>
                 <div className="flex justify-between items-center py-2 border-b border-gray-50">
                    <span className="text-gray-500">Lịch sử đăng</span>
                    <span className="font-medium text-[#111813]">
                       {listing.seller.sales} tin <span className="text-xs text-gray-400 font-normal">({listing.seller.successRate})</span>
                    </span>
                 </div>
              </div>

              <button className="w-full mt-4 flex items-center justify-center gap-2 text-emerald-600 text-xs font-bold hover:underline">
                 Xem hồ sơ chi tiết <ExternalLink size={12} />
              </button>
           </div>

           {/* 3. Tiêu chuẩn cộng đồng */}
           <div className="bg-blue-50/50 p-5 rounded-xl border border-blue-100">
              <h3 className="font-bold text-blue-800 mb-3 flex items-center gap-2">
                 <Shield size={18} /> Tiêu chuẩn cộng đồng
              </h3>
              <ul className="space-y-2">
                 <li className="flex gap-2 text-xs text-blue-900/80 leading-snug">
                    <div className="min-w-[4px] h-[4px] bg-blue-400 rounded-full mt-1.5"></div>
                    Nội dung không chứa từ ngữ thô tục, xúc phạm.
                 </li>
                 <li className="flex gap-2 text-xs text-blue-900/80 leading-snug">
                    <div className="min-w-[4px] h-[4px] bg-blue-400 rounded-full mt-1.5"></div>
                    Hình ảnh rõ nét, không chứa watermark của đối thủ.
                 </li>
                 <li className="flex gap-2 text-xs text-blue-900/80 leading-snug">
                    <div className="min-w-[4px] h-[4px] bg-blue-400 rounded-full mt-1.5"></div>
                    Giá bán minh bạch, không để giá ảo (1đ, 0đ).
                 </li>
              </ul>
           </div>

        </div>
      </div>
    </div>
  );
};

export default ListingDetail;