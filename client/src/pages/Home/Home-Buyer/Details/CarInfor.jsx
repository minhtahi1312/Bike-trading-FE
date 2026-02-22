import React from "react";

const CarInfor = () => {
  return (
    <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-6">
      <div className="bg-white dark:bg-[#1a3524] p-6 rounded-xl shadow-sm border border-[#f0f4f2] dark:border-[#2a4534] lg:sticky lg:top-24">
        {/* Categories/Meta */}
        <div className="flex justify-between items-start mb-2">
          <span className="bg-[#f0f4f2] dark:bg-[#2a4534] text-[#61896f] dark:text-primary text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">
            Mountain Bike
          </span>
          <div className="flex items-center text-[#61896f] text-xs gap-1">
            <span className="material-symbols-outlined text-[14px]">
              schedule
            </span>{" "}
            2 giờ trước
          </div>
        </div>
        {/* Title */}
        <h1 className="text-[#111813] dark:text-white text-2xl md:text-3xl font-bold leading-tight mb-2">
          Trek Marlin 7 - 2021 Model - Size M
        </h1>
        {/* Location */}
        <p className="text-[#61896f] text-sm font-normal leading-normal flex items-center gap-1 mb-6">
          <span className="material-symbols-outlined text-[18px]">
            location_on
          </span>{" "}
          Cầu Giấy, Hà Nội
        </p>
        {/* Price Section */}
        <div className="flex items-end gap-3 mb-6 pb-6 border-b border-[#f0f4f2] dark:border-[#2a4534]">
          <span className="text-primary text-3xl font-extrabold tracking-tight">
            12.500.000 đ
          </span>
          <span className="text-[#61896f] line-through text-lg mb-1">
            15.000.000 đ
          </span>
        </div>
        {/* Verification Badge */}
        <div className="flex items-center gap-3 bg-primary/10 dark:bg-primary/20 p-3 rounded-lg mb-6 border border-primary/20">
          <div className="bg-primary rounded-full p-1 text-[#111813] flex items-center justify-center">
            <span className="material-symbols-outlined text-[18px]">
              verified_user
            </span>
          </div>
          <div>
            <p className="text-[#111813] dark:text-white text-sm font-bold">
              Đã kiểm định bởi BikeMarket
            </p>
            <p className="text-[#61896f] dark:text-gray-400 text-xs">
              Đảm bảo đúng mô tả 100%
            </p>
          </div>
        </div>
        {/* Condition Gauge */}
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium text-[#111813] dark:text-white">
              Tình trạng xe
            </span>
            <span className="font-bold text-primary">Rất mới (98%)</span>
          </div>
          <div className="w-full bg-[#f0f4f2] dark:bg-[#0d1a12] rounded-full h-2.5">
            <div
              className="bg-primary h-2.5 rounded-full"
              style={{ width: "98%" }}
            ></div>
          </div>
        </div>
        {/* Seller Info */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white dark:border-[#2a4534] shadow-sm">
            <div
              className="w-full h-full bg-center bg-cover"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBxv_uFq4AaYeKbt54DoMWea7oW9dGRQot07WuJgnu1lSrIdlF9h5Nlxg-0FsXLfMx8f1UUhZCzksmAOWHZlB6zpXE5SOKc8o4RP9ZoOcNMJMAd9xcyTptG4e0GmGnbHyA_GACerrdPveQQzPPzxZtX9UF-orbfqCegcDQUS9mbs6k2sOcYv8-jLBZLj7A2oBBjUg4IHhPruovqQqQ-fYIDu41jZ-ABATE2XEZgUzmuHZHZu_LaT7V7A33rlA439_hizQqg-Se5i-Zk")',
              }}
            ></div>
          </div>
          <div className="flex-1">
            <h3 className="text-[#111813] dark:text-white font-bold text-base">
              Minh Tuấn
            </h3>
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-yellow-500 text-[16px] fill-current">
                star
              </span>
              <span className="text-[#111813] dark:text-white text-sm font-bold">
                4.8
              </span>
              <span className="text-[#61896f] text-sm">(24 đánh giá)</span>
            </div>
          </div>
          <button className="text-[#61896f] hover:bg-[#f0f4f2] dark:hover:bg-[#2a4534] p-2 rounded-full transition-colors">
            <span className="material-symbols-outlined">more_horiz</span>
          </button>
        </div>
        {/* Actions */}
        <div className="flex flex-col gap-3">
          <button className="flex w-full cursor-pointer items-center justify-center rounded-lg h-12 px-4 bg-primary text-[#111813] text-base font-bold tracking-[0.015em] hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
            Đặt cọc ngay
          </button>
          <button className="flex w-full cursor-pointer items-center justify-center rounded-lg h-12 px-4 bg-white dark:bg-[#1a3524] border border-[#f0f4f2] dark:border-[#2a4534] text-[#111813] dark:text-white text-base font-bold tracking-[0.015em] hover:bg-[#f0f4f2] dark:hover:bg-[#2a4534] transition-colors gap-2">
            <span className="material-symbols-outlined text-[20px]">
              chat_bubble
            </span>{" "}
            Chat với người bán
          </button>
        </div>
        {/* Safety Banner */}
        <div className="mt-6 pt-6 border-t border-[#f0f4f2] dark:border-[#2a4534] flex gap-3">
          <span className="material-symbols-outlined text-[#61896f] text-[20px]">
            shield
          </span>
          <p className="text-xs text-[#61896f]">
            <span className="font-bold">Bảo vệ người mua:</span> Hoàn tiền 100%
            nếu xe không đúng mô tả hoặc có lỗi kỹ thuật nghiêm trọng trong 3
            ngày đầu.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CarInfor;
