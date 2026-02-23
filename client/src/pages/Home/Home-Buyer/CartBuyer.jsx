import { RulerDimensionLine, ShieldCheck, Trash } from 'lucide-react';
import React from 'react';

const CartBuyer = () => {
  const images = {
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop",
    // 2 Sản phẩm chính trong giỏ
    tarmac: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=600&auto=format&fit=crop",
    tcr: "https://cdn.road.cc/sites/default/files/2021-giant-tcr-advanced-pro-1-disc_0.jpg",
    
    // 4 Link ảnh bạn cung cấp đã được gắn vào đây:
    suggested_1: "https://th.bing.com/th/id/R.1761721b6da8ceb9ed8e8e0b37935926?rik=vHMfIUsaQxWKTA&pid=ImgRaw&r=0",
    suggested_2: "https://tse1.mm.bing.net/th/id/OIP.eDL9U3vqrjepuaj4XzQjQgHaE7?rs=1&pid=ImgDetMain&o=7&rm=3",
    suggested_3: "https://fujiko.vn/wp-content/uploads/2023/06/z4388767909178_8568076a3ad3923efe926730de040784.jpg",
    suggested_4: "https://th.bing.com/th/id/R.d0add4abcb66439cbddd14ba513bbd47?rik=BYdFe%2fiDBurONQ&riu=http%3a%2f%2ffujiko.vn%2fwp-content%2fuploads%2f2023%2f06%2fz5508139247481_f7cc67795189e220332933eae1d988f8.jpg&ehk=4S2sOLEXCJ6Bu1ObdKuLJSqtzcr1WbFyB6eQ5rJUcBg%3d&risl=&pid=ImgRaw&r=0"
  };

  return (
    <div className="bg-[#f6f8f6] text-[#111813] font-['Lexend',sans-serif] min-h-screen overflow-x-hidden">
      {/* Header (Giữ nguyên như cũ) */}
      {/* <div className="w-full bg-white border-b border-[#e5e7eb] sticky top-0 z-50">
        <div className="max-w-[1440px] mx-auto">
          <header className="flex items-center justify-between whitespace-nowrap px-4 lg:px-10 py-3">
            <div className="flex items-center gap-8">
              <a className="flex items-center gap-2 text-[#111813]" href="#">
                <div className="size-8 text-[#2bee6c]">
                  <span className="material-symbols-outlined" style={{ fontSize: '32px', fontVariationSettings: "'FILL' 1" }}>pedal_bike</span>
                </div>
                <h2 className="text-[#111813] text-xl font-bold leading-tight tracking-[-0.015em]">BikeSafe</h2>
              </a>
              <div className="hidden md:flex flex-col min-w-40 h-10 w-96">
                <div className="flex w-full flex-1 items-stretch rounded-lg h-full overflow-hidden">
                  <div className="text-[#61896f] flex border-none bg-[#f0f4f2] items-center justify-center pl-4">
                    <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>search</span>
                  </div>
                  <input className="flex w-full min-w-0 flex-1 border-none bg-[#f0f4f2] focus:ring-0 text-[#111813] placeholder:text-[#61896f] px-4 pl-2 text-sm" placeholder="Tìm kiếm xe đạp, phụ kiện..." />
                </div>
              </div>
            </div>
            <div className="flex flex-1 justify-end gap-4 lg:gap-8 items-center">
              <div className="hidden lg:flex items-center gap-6">
                <a className="text-[#111813] text-sm font-medium hover:text-[#2bee6c] transition-colors" href="#">Tin tức</a>
                <a className="text-[#111813] text-sm font-medium hover:text-[#2bee6c] transition-colors" href="#">Cộng đồng</a>
                <a className="text-[#111813] text-sm font-medium hover:text-[#2bee6c] transition-colors" href="#">Đơn hàng của tôi</a>
              </div>
              <div className="flex gap-3 items-center border-l pl-6 border-gray-200">
                <button className="flex size-10 items-center justify-center rounded-lg bg-[#f0f4f2] hover:bg-[#e2e8e5] relative">
                  <span className="material-symbols-outlined">notifications</span>
                  <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full"></span>
                </button>
                <div className="bg-center bg-no-repeat bg-cover rounded-full size-10 border-2 border-white shadow-sm cursor-pointer" style={{ backgroundImage: `url(${images.avatar})` }}></div>
              </div>
            </div>
          </header>
        </div>
      </div> */}

      <main className="w-full max-w-[1440px] mx-auto px-4 lg:px-10 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#111813]">Giỏ hàng của bạn <span className="text-lg font-normal text-gray-500 ml-2">(2 sản phẩm)</span></h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Content: Cart Items */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            {/* Tarmac Item */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-6 relative group">
              <div className="w-full sm:w-48 aspect-[4/3] rounded-xl bg-gray-100 bg-center bg-cover shrink-0" style={{ backgroundImage: `url(${images.tarmac})` }}></div>
              <div className="flex flex-col flex-1 py-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-[#111813] hover:text-[#2bee6c] transition-colors cursor-pointer">Specialized Tarmac SL7 Expert</h3>
                    <div className="flex flex-wrap gap-3 mt-2">
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <span className="material-symbols-outlined text-sm"><RulerDimensionLine size={16} /></span> Size 54
                      </div>
                      <div className="flex items-center gap-1 text-xs font-bold text-[#10b981] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 uppercase">
                        <span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}><ShieldCheck size={14} /></span> Đã kiểm định
                      </div>
                    </div>
                  </div>
                  <button className="p-2 text-gray-400 hover:text-red-500 transition-colors"><span className="material-symbols-outlined"><Trash /></span></button>
                </div>
                <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">Giá bán:</p>
                    <p className="text-2xl font-black text-[#2bee6c]">85.000.000 đ</p>
                  </div>
                  <div className="text-xs text-gray-400 italic">Sản phẩm độc bản</div>
                </div>
              </div>
            </div>

            {/* Giant Item */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-6 relative group">
              <div className="w-full sm:w-48 aspect-[4/3] rounded-xl bg-gray-100 bg-center bg-cover shrink-0" style={{ backgroundImage: `url(${images.tcr})` }}></div>
              <div className="flex flex-col flex-1 py-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-[#111813] hover:text-[#2bee6c] transition-colors cursor-pointer">Giant TCR Advanced Pro Disc</h3>
                    <div className="flex flex-wrap gap-3 mt-2">
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <span className="material-symbols-outlined text-sm"><RulerDimensionLine size={16} /></span> Size M
                      </div>
                      <div className="flex items-center gap-1 text-xs font-bold text-[#10b981] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 uppercase">
                        <span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}><ShieldCheck size={14} /></span> Đã kiểm định
                      </div>
                    </div>
                  </div>
                  <button className="p-2 text-gray-400 hover:text-red-500 transition-colors"><span className="material-symbols-outlined"><Trash size={24} /></span></button>
                </div>
                <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">Giá bán:</p>
                    <p className="text-2xl font-black text-[#2bee6c]">42.500.000 đ</p>
                  </div>
                  <div className="text-xs text-gray-400 italic">Sản phẩm độc bản</div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar (Giữ nguyên) */}
          <div className="lg:col-span-4 flex flex-col gap-6 sticky top-24">
            <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
              <h2 className="text-xl font-bold mb-6">Tóm tắt đơn hàng</h2>
              <div className="space-y-4 mb-6 text-sm">
                <div className="flex justify-between text-gray-600"><span>Tạm tính (2 sản phẩm)</span><span className="font-medium text-[#111813]">127.500.000 đ</span></div>
                <div className="flex justify-between text-gray-600"><span>Phí vận chuyển dự kiến</span><span className="font-medium text-[#111813]">500.000 đ</span></div>
                <div className="border-t border-dashed border-gray-200 pt-4 flex justify-between items-center"><span className="text-lg font-bold">Tổng cộng</span><span className="text-2xl font-black text-[#2bee6c]">128.000.000 đ</span></div>
              </div>
              <button className="w-full bg-[#2bee6c] hover:bg-[#1fb350] text-[#111813] py-4 rounded-xl font-black text-lg shadow-lg shadow-[#2bee6c]/20 transition-all">THANH TOÁN NGAY</button>
            </div>
          </div>
        </div>

        {/* --- PHẦN GỢI Ý ĐÃ GẮN LINK ẢNH CỦA BẠN --- */}
        <div className="mt-16">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-2xl font-bold">Sản phẩm gợi ý</h2>
              <p className="text-gray-500 text-sm">Dựa trên các sản phẩm bạn đã xem</p>
            </div>
            <a className="text-[#2bee6c] font-bold hover:underline flex items-center gap-1 text-sm" href="#">
              Xem thêm <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_forward</span>
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Bianchi Oltre XR4 Disc", price: "110.000.000", img: images.suggested_1, meta: "Size 55", loc: "Đà Nẵng", icon: "straighten" },
              { name: "Trek Marlin 7 - 2022", price: "15.000.000", img: images.suggested_2, meta: "Size M", loc: "Cần Thơ", icon: "straighten" },
              { name: "Mingu Hybrid 2024", price: "2.450.000", img: images.suggested_3, meta: "Phụ kiện", loc: "Còn hàng", icon: "category" },
              { name: "Custom Fixed Gear 8bar", price: "18.000.000", img: images.suggested_4, meta: "Size 52", loc: "TP.HCM", icon: "straighten" }
            ].map((product, idx) => (
              <div key={idx} className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all flex flex-col cursor-pointer">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <div 
                    className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500" 
                    style={{ backgroundImage: `url(${product.img})` }}
                  ></div>
                </div>
                <div className="p-4 flex flex-col flex-1 gap-2">
                  <h3 className="text-sm font-bold text-[#111813] line-clamp-1 group-hover:text-[#2bee6c] transition-colors">{product.name}</h3>
                  <p className="text-base font-bold text-[#2bee6c]">{product.price} đ</p>
                  <div className="flex items-center gap-2 text-[10px] text-gray-400 mt-auto pt-2 border-t border-gray-50">
                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">{product.icon}</span> {product.meta}</span>
                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">{product.icon === "category" ? "inventory_2" : "location_on"}</span> {product.loc}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer (Giữ nguyên) */}
    </div>
  );
};

export default CartBuyer;