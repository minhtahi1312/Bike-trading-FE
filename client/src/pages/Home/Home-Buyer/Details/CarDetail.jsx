import React, { useState } from "react";
import CarInfor from "./CarInfor";
import CarRelated from "./CarRelated";

export default function CarDetail() {
  const [activeTab, setActiveTab] = useState("description");

  const tabs = [
    { id: "description", label: "Mô tả chi tiết" },
    { id: "specs", label: "Thông số kỹ thuật" },
    { id: "condition", label: "Tình trạng xe" },
  ];

  return (
    <main className="flex-1 w-full mx-auto px-4 md:px-8 py-6 bg-white">
      {/* Breadcrumbs */}
      <div className="flex flex-wrap gap-2 pb-6">
        <a
          className="text-[#61896f] hover:text-primary text-sm font-medium leading-normal flex items-center gap-1"
          href="#"
        >
          Trang chủ{" "}
          <span className="material-symbols-outlined text-[16px]">
            chevron_right
          </span>
        </a>
        <a
          className="text-[#61896f] hover:text-primary text-sm font-medium leading-normal flex items-center gap-1"
          href="#"
        >
          Xe đạp địa hình{" "}
          <span className="material-symbols-outlined text-[16px]">
            chevron_right
          </span>
        </a>
        <span className="text-[#111813] dark:text-white text-sm font-medium leading-normal line-clamp-1">
          Trek Marlin 7 - 2021 Model
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Gallery */}
        <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-6">
          {/* Image Grid */}
          <div className="w-full bg-white dark:bg-[#1a3524] rounded-xl overflow-hidden shadow-sm border border-[#f0f4f2] dark:border-[#2a4534]">
            <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-4 md:grid-rows-2 gap-1 md:gap-2 h-[500px] p-2">
              {/* Main Image */}
              <div className="col-span-1 md:col-span-3 row-span-2 md:row-span-2 relative group cursor-pointer overflow-hidden rounded-lg">
                <div
                  className="w-full h-full bg-center bg-no-repeat bg-cover transition-transform duration-500 group-hover:scale-105"
                  style={{
                    backgroundImage:
                      'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD3mkGbDtlpJtvUgPESgKzE10_oSJ7HRvQ0H8x9P8jniNo75xKvVoixElyLrIM9XP8pjP1Ng5pJT1v5svdPHimIkmtkvPE36XW3HFhpD4C-WEGaWgKfYNSeiALx_0_NEZTxaq4b2pnm8eqWTFTZlvMdnPLBtpqB7Ow3udqwfPLqx6Gaogp-5dKFtOaKOMSvRsw4PmDxaco-u2f9zgrPX4rLs4XF07MqLgTGNji_j8FZYMZyQ2ZB7XiWys9AR43TJmFSh0tbrYm_CaD9")',
                  }}
                ></div>
                <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-xs flex items-center gap-1 backdrop-blur-sm">
                  <span className="material-symbols-outlined text-sm">
                    photo_library
                  </span>{" "}
                  1/8
                </div>
              </div>
              {/* Thumbnails */}
              <div className="hidden md:block col-span-1 row-span-1 relative cursor-pointer overflow-hidden rounded-lg">
                <div
                  className="w-full h-full bg-center bg-no-repeat bg-cover hover:opacity-90 transition-opacity"
                  style={{
                    backgroundImage:
                      'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDCIoTlMVDwrgM5H81jMJAwkOOe4tu9QfO9vGj-ZJnH4bOhuaVFe_BqpydhrCeLl_vxG2AEhUVfjSgUXBnt6th4Ka--Z1OKXM_Gko9UoToK0sNVcSx6INiO77UAHKrlwlZxYBwonP7bfox7YqCVifTxPiyLDVAPINNsqCSn5ZgvVAgqCwwZKDd0NIX1YfYT3xOGNe95Vnaed9kLKqzWTdRdehI_yYROSGsRhY3HKLhsJVFciFyqMGDZhFrqyjkXjjc3h2GyFTkxelBT")',
                  }}
                ></div>
              </div>
              <div className="hidden md:block col-span-1 row-span-1 relative cursor-pointer overflow-hidden rounded-lg">
                <div
                  className="w-full h-full bg-center bg-no-repeat bg-cover hover:opacity-90 transition-opacity"
                  style={{
                    backgroundImage:
                      'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCEhfarMDUj20dspZQjFggV-WEuptlgc6xY6OKLjF8vum33Yu3upaBl-djuFCJ7BkcHZKAg7kgm3qkqwuUVW5FG7RBKclOtNWpU9ZYVYeSRnMY9Kxl3KIwoYs7rO5RdXBgSfC2V8hPj9cPsS0XLgwUrVJw9yVzzSXMS0fMitNCqsoOCDwazwYx7T9YLgEdVEBj8PFI23ZnJXf46IDS-3WHzeiv8LUy5s_Mf68LmOAEfsafA0nYB2h0xAUrQrC0VXBhBT9xZAQt8zNcn")',
                  }}
                ></div>
              </div>
            </div>
            {/* Mobile thumbnails (scrollable) */}
            <div className="flex md:hidden gap-2 overflow-x-auto p-2 pt-0 no-scrollbar">
              {[
                "https://lh3.googleusercontent.com/aida-public/AB6AXuBg8CeGit8SY1absmeyk-nYGxdvxK2kuromKoj2aHsGuZ0uBaBZGZoyYyGGNsQ30oxfzfTI5Mgx0sesjSKGNFJ9Kuw-kvj-6cL8I0F88Q2mwmfAiFSsZVRyW9QsH3QuVuqhJe915l6GuiPaAJ8W269XuDvCHbgEkiJk3e-OLkfx37Ep_BbRI1kGYtoRcUsCzUmJJ0SGWuGGv-1pIVmlpUME9F7EgT4xYQi5jIMVg7EGFtSl80U-PJfV1xnSsuwXl4J5ZBy_HavxnOV5",
                "https://lh3.googleusercontent.com/aida-public/AB6AXuAS_QkytCR44Kxza74VQqqARFMNdM8b2V9vgfoVhAUmkp7_JRu5Uukr1IsKuRfa5KHkVz1MSEOaJpfhGpcwlaZwZtrGN9O0V9zzad2Ji_QtvRaHU6liZjCtBmcBs1MV6dBP33KEqdQK2k28YEGDWIF-ms5P0CEndehv8vqwFbe-fCeiVe7XxwFykkO7gv6cgl9wf5Hq68Yp1JwE7arsZVgp3-zE474m7d58ITLuroBda7Jh7IolfuXnAwqKhyB6_-EnX44TlNe7V96t",
                "https://lh3.googleusercontent.com/aida-public/AB6AXuBkVrVOtP6SRJq-hAhH11wZHsnZBGstv9r5LwgNG5IQ6fkBRVE3Pj-xp8iGk5L8cw4-yBm-89ex2hGs5-fEKZo-oYHZnkVnrcABn7c4uYxk-BaQCkUBHbmLGXT8HBK0AE_cRZw3KyK74TMh63NgWYpSdspFN16vTkzINsSmy4BeTrCpvtfFYBbr3iUOSjma9HoaZwSvLG9TPSAR2Z7AgxTGH_UDvm9IzY6zXgs3ehKbNLaeplDhB5iw_XH2nhg_B-Y0DWX7_R5o9POz",
              ].map((url, index) => (
                <div
                  key={index}
                  className="w-24 h-24 flex-shrink-0 rounded-lg bg-cover bg-center"
                  style={{ backgroundImage: `url("${url}")` }}
                ></div>
              ))}
            </div>
          </div>

          {/* Details Tabs Section */}
          <div className="bg-white dark:bg-[#1a3524] rounded-xl shadow-sm border border-[#f0f4f2] dark:border-[#2a4534] overflow-hidden">
            <div className="flex border-b border-[#f0f4f2] dark:border-[#2a4534]">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-4 text-sm transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? "font-bold text-[#111813] dark:text-white border-b-2 border-primary"
                      : "font-medium text-[#61896f] hover:text-[#111813] dark:hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="p-6 md:p-8">
              {activeTab === "description" && (
                <div className="prose dark:prose-invert max-w-none text-sm md:text-base text-[#3c4a40] dark:text-gray-300">
                  <p className="mb-4">
                    Xe đạp địa hình Trek Marlin 7 đời 2021, mình mua chính hãng
                    tại đại lý Trek Vietnam. Xe chủ yếu đạp cuối tuần quanh Hồ
                    Tây, chưa đi trail nặng bao giờ.
                  </p>
                  <p className="mb-4">
                    Tình trạng còn rất mới, khoảng 98%. Đã nâng cấp pedal nhôm
                    và cặp lốp Maxxis mới. Xe vừa được bảo dưỡng full dầu mỡ,
                    chỉ việc mang về chạy.
                  </p>
                  <p>Phù hợp cho các bạn cao từ 1m65 - 1m75 (Size M).</p>
                  <h4 className="text-[#111813] dark:text-white font-bold text-lg mt-6 mb-3">
                    Thông số nổi bật:
                  </h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Khung nhôm Alpha Silver Aluminum nhẹ và bền.</li>
                    <li>Phuộc RockShox Judy lò xo cuộn, hành trình 100mm.</li>
                    <li>Bộ truyền động Shimano Deore 1x10 tốc độ mượt mà.</li>
                    <li>Phanh đĩa thủy lực Shimano MT200 an toàn.</li>
                  </ul>
                </div>
              )}
              {activeTab === "specs" && (
                <div className="text-[#3c4a40] dark:text-gray-300">
                  <p>Nội dung thông số kỹ thuật đang được cập nhật...</p>
                </div>
              )}
              {activeTab === "condition" && (
                <div className="text-[#3c4a40] dark:text-gray-300">
                  <p>Nội dung tình trạng xe đang được cập nhật...</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Product Info & Actions */}
        <CarInfor />
      </div>

      {/* Related Products */}
      <CarRelated />
    </main>
  );
}

const relatedProducts = [
  {
    name: "Giant ATX 660 - 2020",
    seller: "Hùng Cường",
    price: "7.200.000 đ",
    condition: "95%",
    location: "Hà Nội",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCiofV7f2PyqpnDnZsvFlKPPH9U_CSfgm9ptmS7bRG-vliRHY_N-uCJicfnzQddz9pV3pVhu0Zdfss6X0LdESHMf5zApS_Y236rIOggGcBj8a6lgYjc1vKSPSORedRJxZrlsooqzyXNWslgaEOmRyRrhpFuF2SQTyl-gwCbiZ8l4njLOi9l32XKdven3K6Zmlf2N7MLsUT4OmlgIPZB5M427QaMV9aPeVupNqCjSjSTq0e3PgUBwkCZ8bs-jY5hhKkFVBh5oJdaGd0e",
  },
  {
    name: "Specialized Rockhopper",
    seller: "Bike Shop A",
    price: "15.500.000 đ",
    condition: "Like New",
    location: "TP.HCM",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBMQ3rBJKiqkmDtlvweGbDUCav3QcxU3MZwvtqalSS3cxxPsLnEmHRIO2D8EffUGMgRLCcRvGF0ATpRWQJ0BPWz34jnRwtKiiXh6Bj7WYxHutrDpWBVk-q9mckqAyCEv4Q292C5qVX1IIKA6DV1QFudGOEgS63NlHncdgewGy3cSVQ7jcJWC2cFC0JLrGDJOl8HlBpZOyMkIFAbB6m3ryXR4LoN77UIS0oWWMFDxKVeZl181MlBzdVodjsFqUQbWgTyWOoIKxCTS603",
  },
  {
    name: "Cannondale Trail 5",
    seller: "Trần Linh",
    price: "11.000.000 đ",
    condition: "90%",
    location: "Đà Nẵng",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDHVkxgwGzLEIZJbct0Mrq5hqY4rZGi2Qn4m4RFxMOXmWcYFJ75TgH5jRE7tqjB-SmhBlcs59F2F866dusW5qQ7RpgjE0JMRtBJf4TECZEdZDfVemdZw6Jiy3iOa2kHroLb2X-6L0p_wFoStV7vZUQkCQ2oRkxZ2m2bPULeb3z-46xS_oF-eLXbO3DScaKolQI-s9WSlZQvz4zE2uhhZMEO0TckM_BrmhMancXCxP4f2Ij9Gu5L94301GAd10pbj535oOiGzwgF3gNo",
  },
  {
    name: "Road Bike Twitter R10",
    seller: "Nam Nguyen",
    price: "9.500.000 đ",
    condition: "99%",
    location: "Hà Nội",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCLuJqpmjf0-ZOi5OWpwWFPBNoj1N3cYAgB2gKub25XGKk-rUQw-SBrQnFN3WT7wOwOi8KKzO_bOIfIGkPKCSr3W6FKL8DR__QzkOz5ohxDV7p-PZswYEE_UXPSKx7NqdoBspU2yp3tmJt-qtpfKRvfdD_RdNxhyNAVAakkfmIecIVyDi9jOBgt49_ACXOtcy7CNfNH9CrY-fxQuXSIaWDGraY-dCw2t9JCFTxJBrwaHnXHB3bMHE8wGpI7CPmYaYbGd1tWxC2Cla5T",
  },
];
