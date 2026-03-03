import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, CheckCircle, XCircle, User, MapPin, 
  Phone, ChevronRight, Store, ExternalLink, Shield 
} from 'lucide-react';

const TransactionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock Data
  const transaction = {
    id: decodeURIComponent(id || '#BM-83920'), 
    date: '24/05/2024 - 14:30',
    status: 'deposit', // deposit, completed, cancelled
    currentStep: 2,
    buyer: {
      name: 'Nguyễn Văn An',
      phone: '0912 345 678',
      address: '123 Đường Láng, Đống Đa, Hà Nội',
      avatar: 'https://ui-avatars.com/api/?name=Nguyen+Van+An&background=random',
      verified: true
    },
    seller: {
      name: 'Cửa hàng Xe Máy Hà Nội',
      contact: '0987 654 321 (Mr. Bình)',
      address: '45 Nguyễn Trãi, Thanh Xuân, Hà Nội',
      avatar: 'https://ui-avatars.com/api/?name=Xe+May+HN&background=0D8ABC&color=fff',
      isPartner: true
    },
    financial: {
      product: 'Honda SH 150i ABS 2022',
      price: '85.000.000 ₫',
      deposit: '- 5.000.000 ₫',
      systemFee: '+ 1.700.000 ₫',
      inspectionFee: '+ 300.000 ₫',
      remaining: '82.000.000 ₫'
    },
    paymentHistory: [
      {
        date: '24/05/2024 - 14:35',
        title: 'Thanh toán đặt cọc',
        amount: '+ 5.000.000 ₫',
        method: 'VNPAY-QR',
        status: 'success'
      },
      {
        date: 'Dự kiến',
        title: 'Thanh toán còn lại',
        amount: '82.000.000 ₫',
        method: 'Chờ xử lý',
        status: 'pending'
      }
    ]
  };

  const steps = [
    { id: 1, label: 'Chờ xác nhận' },
    { id: 2, label: 'Đã cọc' },
    { id: 3, label: 'Đang kiểm định' },
    { id: 4, label: 'Đã giao hàng' },
    { id: 5, label: 'Hoàn tất' }
  ];

  // Helper render badge trạng thái
  const renderStatusBadge = (status) => {
    switch(status) {
        case 'deposit':
            return (
                <div className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-xs font-bold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                    Đã thanh toán cọc
                </div>
            );
        case 'completed':
            return (
                <div className="px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-bold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    Hoàn tất
                </div>
            );
        default:
            return (
                <div className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg text-xs font-bold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-gray-400"></span>
                    {status}
                </div>
            );
    }
  };

  return (
    <div className="font-display text-[#111813] bg-gray-50/50 min-h-screen pb-10">
      
      {/* --- HEADER --- */}
      <div className="flex items-center justify-between mb-6 bg-white p-4 rounded-xl border border-[#e5e7eb] shadow-sm">
        <div className="flex items-center gap-3">
          <button 
             onClick={() => navigate(-1)}
             className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors"
          >
             <ArrowLeft size={20} />
          </button>
          <div className="flex items-center gap-2 text-sm text-gray-500">
             <span>Giao dịch</span>
             <ChevronRight size={16} />
             <span className="font-bold text-[#111813]">Chi tiết {transaction.id}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
           {renderStatusBadge(transaction.status)}
        </div>
      </div>

      {/* --- MAIN LAYOUT --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         
         {/* === CỘT TRÁI: NỘI DUNG (2/3) === */}
         <div className="lg:col-span-2 space-y-6">
            
            {/* 1. Stepper */}
            <div className="bg-white p-8 rounded-xl border border-[#e5e7eb] shadow-sm overflow-x-auto">
                <div className="flex justify-between items-center relative min-w-[500px]">
                    <div className="absolute top-4 left-0 w-full h-1 bg-gray-100 -z-0 rounded-full"></div>
                    <div 
                      className="absolute top-4 left-0 h-1 bg-emerald-500 -z-0 rounded-full transition-all duration-500"
                      style={{ width: `${((transaction.currentStep - 1) / (steps.length - 1)) * 100}%` }}
                    ></div>

                    {steps.map((step) => {
                    const isActive = step.id <= transaction.currentStep;
                    const isCurrent = step.id === transaction.currentStep;
                    
                    return (
                        <div key={step.id} className="flex flex-col items-center relative z-10 group cursor-default">
                            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-300 ${
                                isActive 
                                ? 'bg-emerald-500 border-emerald-500 text-white shadow-md shadow-emerald-500/30' 
                                : 'bg-white border-gray-200 text-gray-400'
                            }`}>
                                {isActive ? <CheckCircle size={16} /> : step.id}
                            </div>
                            <span className={`mt-3 text-xs font-bold uppercase transition-colors ${
                                isCurrent ? 'text-emerald-600' : 'text-gray-400'
                            }`}>
                                {step.label}
                            </span>
                        </div>
                    );
                    })}
                </div>
            </div>

            {/* 2. Thông tin 2 bên */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl border border-[#e5e7eb] shadow-sm relative overflow-hidden">
                    <div className="flex items-center gap-2 mb-6 text-blue-600">
                        <User size={20} /> <h3 className="font-bold text-[#111813]">Người mua</h3>
                    </div>
                    <div className="flex gap-4">
                        <img src={transaction.buyer.avatar} className="w-14 h-14 rounded-full border border-gray-100" alt="" />
                        <div className="space-y-1">
                            <div className="font-bold text-[#111813]">{transaction.buyer.name}</div>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <Phone size={14}/> {transaction.buyer.phone}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-500 line-clamp-1">
                                <MapPin size={14}/> {transaction.buyer.address}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-[#e5e7eb] shadow-sm relative overflow-hidden">
                    <div className="flex items-center gap-2 mb-6 text-orange-600">
                        <Store size={20} /> <h3 className="font-bold text-[#111813]">Người bán</h3>
                    </div>
                    <div className="flex gap-4">
                        <img src={transaction.seller.avatar} className="w-14 h-14 rounded-full border border-gray-100" alt="" />
                        <div className="space-y-1">
                            <div className="font-bold text-[#111813]">{transaction.seller.name}</div>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <Phone size={14}/> {transaction.seller.contact}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-500 line-clamp-1">
                                <MapPin size={14}/> {transaction.seller.address}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. Chi tiết tài chính */}
            <div className="bg-white p-6 rounded-xl border border-[#e5e7eb] shadow-sm">
                <h3 className="font-bold text-[#111813] mb-6">Chi tiết tài chính</h3>
                <div className="space-y-4">
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500">Sản phẩm</span>
                        <span className="font-bold text-[#111813]">{transaction.financial.product}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500">Giá trị xe</span>
                        <span className="font-bold text-[#111813] text-lg">{transaction.financial.price}</span>
                    </div>
                    <hr className="border-gray-100" />
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500 flex items-center gap-1"><CheckCircle size={14} className="text-emerald-500"/> Số tiền đã cọc</span>
                        <span className="font-bold text-emerald-600">{transaction.financial.deposit}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500">Phí dịch vụ hệ thống (2%)</span>
                        <span className="font-bold text-[#111813]">{transaction.financial.systemFee}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500">Phí kiểm định</span>
                        <span className="font-bold text-[#111813]">{transaction.financial.inspectionFee}</span>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl flex justify-between items-center mt-4">
                        <span className="font-bold text-[#111813]">Số tiền còn lại phải thanh toán</span>
                        <span className="font-extrabold text-2xl text-[#111813]">{transaction.financial.remaining}</span>
                    </div>
                </div>
            </div>
         </div>

         {/* === CỘT PHẢI: SIDEBAR (1/3) === */}
         <div className="lg:col-span-1 space-y-6">
            
            {/* 1. Xử lý đơn hàng */}
            <div className="bg-white rounded-xl border border-[#e5e7eb] shadow-sm overflow-hidden">
                <div className="bg-blue-600 p-4 text-white">
                    <h3 className="font-bold flex items-center gap-2">
                        <Shield size={20} /> Xử lý đơn hàng
                    </h3>
                    <p className="text-blue-100 text-xs mt-1 opacity-90">
                        Cập nhật trạng thái hoặc hủy bỏ giao dịch này.
                    </p>
                </div>
                <div className="p-5 space-y-3">
                    <button className="w-full flex items-center justify-center gap-2 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-bold shadow-lg shadow-emerald-600/20 transition-all">
                        <CheckCircle size={18} /> Xác nhận đã giao xe
                    </button>
                    <button className="w-full flex items-center justify-center gap-2 py-3 border border-red-200 text-red-600 bg-red-50 hover:bg-red-100 rounded-xl text-sm font-bold transition-colors">
                        <XCircle size={18} /> Hủy giao dịch
                    </button>
                </div>
            </div>

            {/* 2. Lịch sử thanh toán */}
            <div className="bg-white p-6 rounded-xl border border-[#e5e7eb] shadow-sm">
                <h3 className="font-bold text-[#111813] mb-6">Lịch sử thanh toán</h3>
                <div className="relative space-y-8 pl-2">
                    <div className="absolute left-[7px] top-2 h-[calc(100%-20px)] w-[2px] bg-gray-100"></div>
                    {transaction.paymentHistory.map((log, idx) => (
                    <div key={idx} className="relative pl-6">
                        <div className={`absolute left-0 top-1.5 w-4 h-4 rounded-full border-2 ${
                            log.status === 'success' ? 'bg-emerald-500 border-emerald-100' : 'bg-gray-300 border-gray-100'
                        }`}></div>
                        
                        <div className="text-xs text-gray-400 mb-1">{log.date}</div>
                        <div className="font-bold text-sm text-[#111813]">{log.title}</div>
                        <div className={`font-bold ${log.status === 'success' ? 'text-emerald-600' : 'text-gray-400'}`}>
                            {log.amount}
                        </div>
                        
                        {log.status === 'success' && (
                            <div className="flex items-center gap-2 mt-2">
                                <span className="text-[10px] font-bold bg-gray-100 text-gray-600 px-2 py-0.5 rounded border border-gray-200 uppercase">
                                {log.method}
                                </span>
                                <a href="#" className="text-[10px] font-bold text-blue-600 hover:underline flex items-center gap-0.5">
                                Xem bill <ExternalLink size={10} />
                                </a>
                            </div>
                        )}
                        {log.status === 'pending' && (
                            <span className="inline-block mt-2 text-[10px] font-bold bg-gray-100 text-gray-500 px-2 py-0.5 rounded border border-gray-200 uppercase">
                                {log.method}
                            </span>
                        )}
                    </div>
                    ))}
                </div>
            </div>

         </div>
      </div>
    </div>
  );
};

export default TransactionDetail;