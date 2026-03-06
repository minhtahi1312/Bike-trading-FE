import React, { useState, useEffect } from "react";
import { Bell, Bike, ChevronLeft, ChevronRight, Heart, MapPinCheckInside, RulerDimensionLine, Search, ShieldCheck, SlidersHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getSellerListings, addToWishlist } from "../../../services/axiosClient";
export default function Homebuyer() {
  const [sortBy, setSortBy] = useState("Mới nhất");
  const [verifiedOnly, setVerifiedOnly] = useState(true);
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [wishlistIds, setWishlistIds] = useState(new Set());
  //add to wishlist
  const handleAddToWishlist = async (bikeId) => {
    try {
      await addToWishlist(bikeId);
      setWishlistIds((prev) => new Set(prev).add(bikeId));
      console.log("✅ added bike to wishlist", bikeId);
    } catch (error) {
      console.error("❌ error adding to wishlist", error);
    }
  };

  useEffect(() => {
    loadSellerListings();

  }, []);

  const loadSellerListings = async () => {
    setLoading(true);
    try {
      const data = await getSellerListings();
      console.log("Raw seller listings data:", data);

      // Vì data là một Array, chúng ta map trực tiếp trên data
      // Nếu data có thể null/undefined, dùng (data || [])
      const formattedBikes = (data || []).map((item) => ({
        id: item.id,
        name: item.title || "Chưa có tên xe",

        price: item.price ? `${item.price.toLocaleString("vi-VN")} đ` : "0 đ",

        size: item.size || "N/A",
        location: item.location || "Chưa xác định",

        image: item.thumbnail || "https://via.placeholder.com/400x300",

        verified: item.isInspected || false,

        condition: item.overall || "N/A",
        newTag: item.isNew || false,
      }));

      console.log("✅ Seller listings loaded:", formattedBikes);
      setBikes(formattedBikes);
    } catch (error) {
      console.error("❌ Failed to load seller listings:", error);
      setBikes([]);
    } finally {
      setLoading(false);
    }
  };
  //Addto wishlist
  const watchedBikes = [

  ];
  const navigate = useNavigate();

  const handleWishlistClick = () => {
    navigate('/homebuyer/Wishlist');
  };
  return (
    <div className="bg-background-light dark:bg-background-dark text-[#111813] overflow-x-hidden">
      {/* Header */}


      {/* Main Layout Container */}
      <div className="layout-container flex h-full grow flex-col">
        <div className="w-full  px-4 lg:px-10 py-6 flex flex-col gap-8">
          {/* Hero Section */}
          <div className="@container">
            <div
              className="flex min-h-[320px] flex-col gap-6 bg-cover bg-center bg-no-repeat rounded-xl items-start justify-end px-6 pb-10 md:px-10 overflow-hidden relative shadow-lg"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.7) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuBs4rwvI8579xuy0IdSVJBqNLVUkeAPqUSXnSU_Eu4ygrUqqBZX3CPf_sK7g8l1Np0MjxjVydqutLDmsL15m-qpjKpVsVBVwbsIqBNNUAKvyUzUsBXBflA83NP6HlJk02lGknmvpSEOJHHqxl2EhzcP2p7GQbZ6L7OKpxHGhsDaU4qMrD1BGPY4c7-4ow9WW4F91EHSOtKLp3yhDf0dkylZosJRTzZchuihj-m6shJcf-Tlzax3GIehdGgAby3xgMFCtAr1LFfGDpQ1")',
              }}
            >
              <div className="relative z-10 flex flex-col gap-3 text-left max-w-2xl">
                <div className="inline-flex items-center gap-2 bg-primary/90 backdrop-blur-sm px-3 py-1 rounded-full w-fit">
                  <span className="material-symbols-outlined text-black" style={{ fontSize: "16px" }}>
                    <ShieldCheck size={24} />
                  </span>
                  <span className="text-xs font-bold text-black uppercase tracking-wide">Đối tác tin cậy</span>
                </div>
                <h1 className="text-white text-3xl font-black leading-tight tracking-[-0.033em] md:text-5xl">
                  Chào mừng trở lại, Minh!
                </h1>
                <p className="text-white/90 text-sm font-normal leading-normal md:text-lg">
                  Có 5 xe đạp mới phù hợp với bộ lọc tìm kiếm "Road bike size 52" của bạn.
                </p>
                <div className="flex gap-3 mt-2">
                  <button className="flex h-10 px-5 bg-white text-black hover:bg-gray-100 transition-colors text-sm font-bold items-center justify-center rounded-lg">
                    Xem gợi ý mới
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-4 flex flex-col gap-8">
              {/* Current Order Card */}
              <div className="bg-white rounded-xl border border-[#e5e7eb] p-5 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-[#111813]">Đơn hàng hiện tại</h3>
                  <a className="text-primary text-sm font-bold hover:underline" href="#">
                    Chi tiết
                  </a>
                </div>
                <div className="flex gap-4">
                  <div
                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-16 shrink-0"
                    style={{
                      backgroundImage:
                        'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAXjxvX0p-T7AAY5XVNWApZ6MPrPPP2zUR8foAOg7_MHFq1nK83fWL4baMD28IB0zGAZ44dQT8p5E_RdfBendVUxGUTetz8D8qsFO6rxYDsTVws0QEv-t2HAGYOmTrQ_c_uIVeHUqYmbI9VwfinbodIlqV1O4Ejq-vUqFOh2pCdVwVkfvgJ6ty8mMuGQhWNXo7AXQ4XL8dzBrt1KcAGKGk7DyCBB201kQt-aRTuTRECiCL5mvyPMHsd2eMW4Q2--sF4TjMmL_pYCKYs")',
                    }}
                  ></div>
                  <div className="flex flex-col justify-center gap-1">
                    <p className="text-[#111813] text-sm font-bold leading-tight">Trek Madone SL 6</p>
                    <p className="text-[#61896f] text-xs">Mã đơn: #882910</p>
                    <div className="inline-flex items-center gap-1 text-[#111813] text-xs font-medium bg-[#f0f4f2] px-2 py-0.5 rounded-full w-fit">
                      <span className="size-2 rounded-full bg-blue-500 animate-pulse"></span>
                      Đang vận chuyển
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-[#f0f4f2]">
                  <div className="flex justify-between text-xs mb-1.5 font-medium">
                    <span className="text-[#111813]">Tiến độ giao hàng</span>
                    <span className="text-primary">75%</span>
                  </div>
                  <div className="w-full overflow-hidden rounded-full bg-[#f0f4f2] h-2">
                    <div className="h-full rounded-full bg-primary" style={{ width: "75%" }}></div>
                  </div>
                  <p className="text-[#61896f] text-xs mt-2 text-right">Dự kiến: 25/10/2023</p>
                </div>
              </div>

              {/* Watched Bikes Card */}
              <div className="bg-white rounded-xl border border-[#e5e7eb] p-5 shadow-sm flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-[#111813]">Xe đang theo dõi</h3>
                  <a className="text-sm font-medium text-[#61896f] hover:text-primary" href="#">
                    Xem tất cả (4)
                  </a>
                </div>
                {watchedBikes.map((bike) => (
                  <div key={bike.id} className="flex gap-3 items-center p-2 hover:bg-[#f9fafb] rounded-lg transition-colors cursor-pointer group">
                    <div
                      className="bg-center bg-no-repeat aspect-square bg-cover rounded-md size-14 shrink-0"
                      style={{ backgroundImage: `url("${bike.image}")` }}
                    ></div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-[#111813] truncate group-hover:text-primary transition-colors">
                        {bike.name}
                      </h4>
                      <p className="text-xs text-[#61896f]">{bike.price}</p>
                    </div>
                    <button className="text-red-500 hover:text-red-600">
                      <span className="material-symbols-outlined filled" style={{ fontSize: "20px" }}>
                        favorite
                      </span>
                    </button>
                  </div>
                ))}
              </div>

              {/* Trust Card */}
              <div className="bg-primary rounded-xl p-6 text-[#111813] relative overflow-hidden shadow-sm">
                <div className="relative z-10">
                  <h3 className="font-bold text-xl mb-2">Mua xe an tâm</h3>
                  <p className="text-sm text-[#111813]/80 mb-4">
                    Mọi chiếc xe có nhãn "Đã kiểm định" đều được chuyên gia của chúng tôi xác nhận chất lượng.
                  </p>
                  <button className="bg-[#111813] text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-opacity-90">
                    Tìm hiểu thêm
                  </button>
                </div>
                <div className="absolute -bottom-4 -right-4 opacity-20">
                  <span className="material-symbols-outlined text-white" style={{ fontSize: "120px" }}>
                    verified
                  </span>
                </div>
              </div>
            </div>

            {/* Main Area */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              {/* Filters Bar */}
              <div className="bg-white p-4 rounded-xl border border-[#e5e7eb] shadow-sm flex flex-col md:flex-row gap-4 items-start md:items-center justify-between  z-30">
                <div className="flex flex-wrap gap-2 items-center">
                  <button className="flex items-center gap-2 px-3 py-1.5 bg-[#f0f4f2] hover:bg-primary/20 rounded-lg text-sm font-medium text-[#111813] border border-transparent hover:border-primary transition-all">
                    <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
                      <SlidersHorizontal strokeWidth={3} />
                    </span>
                    Bộ lọc
                  </button>
                  <div className="h-6 w-px bg-gray-200 mx-1 hidden md:block"></div>
                  <label className="flex items-center gap-2 cursor-pointer bg-green-50 px-3 py-1.5 rounded-lg border border-green-100 hover:border-primary transition-all">
                    <div className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={verifiedOnly}
                        onChange={(e) => setVerifiedOnly(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                    </div>
                    <span className="text-sm font-medium text-[#111813] flex items-center gap-1">
                      <span className="material-symbols-outlined text-primary filled" style={{ fontSize: "16px" }}>
                        <ShieldCheck strokeWidth={3} />
                      </span>
                      Đã kiểm định
                    </span>
                  </label>
                  <div className="hidden sm:flex gap-2">
                    <button className="px-3 py-1.5 rounded-lg border border-[#e5e7eb] text-sm hover:border-primary hover:text-primary transition-colors bg-white">
                      Road
                    </button>
                    <button className="px-3 py-1.5 rounded-lg border border-[#e5e7eb] text-sm hover:border-primary hover:text-primary transition-colors bg-white">
                      MTB
                    </button>
                    <button className="px-3 py-1.5 rounded-lg border border-[#e5e7eb] text-sm hover:border-primary hover:text-primary transition-colors bg-white">
                      Touring
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-auto">
                  <span className="text-sm text-[#61896f]">Sắp xếp:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="form-select bg-transparent border-none text-sm font-bold text-[#111813] focus:ring-0 p-0 pr-8 cursor-pointer"
                  >
                    <option>Mới nhất</option>
                    <option>Giá thấp đến cao</option>
                    <option>Giá cao đến thấp</option>
                  </select>
                </div>
              </div>

              {/* Bikes Grid */}
              {loading ? (
                <div className="flex items-center justify-center col-span-full h-64">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-gray-500">Đang tải danh sách xe...</p>
                  </div>
                </div>
              ) : bikes.length === 0 ? (
                <div className="flex items-center justify-center col-span-full h-64">
                  <div className="text-center">
                    <p className="text-gray-500">Không tìm thấy xe nào.</p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {bikes.map((bike) => (
                    <div key={bike.id} className="group bg-white rounded-xl border border-[#e5e7eb] overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col">
                      <div className="relative aspect-[4/3] overflow-hidden">
                        {bike.verified && (
                          <div className="absolute top-3 left-3 z-10 bg-primary text-[#111813] text-xs font-bold px-2 py-1 rounded flex items-center gap-1 shadow-sm">
                            <span className="material-symbols-outlined filled" style={{ fontSize: "14px" }}>
                              <ShieldCheck strokeWidth={3} />
                            </span>
                            ĐÃ KIỂM ĐỊNH
                          </div>
                        )}
                        {bike.newTag && (
                          <div className="absolute top-3 left-3 z-10 bg-gray-900/80 text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1 shadow-sm backdrop-blur-sm">
                            MỚI ĐĂNG
                          </div>
                        )}
                        <button
                          onClick={() => handleAddToWishlist(bike.id)}
                          disabled={wishlistIds.has(bike.id)}
                          className={`absolute top-3 right-3 z-10 bg-white/80 p-1.5 rounded-full hover:bg-white transition-colors ${wishlistIds.has(bike.id) ? "text-red-500" : "text-gray-500"
                            }`}
                        >
                          <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>
                            <Heart strokeWidth={3} />
                          </span>
                        </button>
                        <div
                          className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                          style={{ backgroundImage: `url("${bike.image}")` }}
                        ></div>
                      </div>
                      <div className="p-4 flex flex-col flex-1 gap-2">
                        <h3 className="text-base font-bold text-[#111813] line-clamp-2">{bike.name}</h3>
                        <p className="text-lg font-bold text-primary">{bike.price}</p>
                        <div className="flex items-center gap-4 text-xs text-[#61896f] mt-auto pt-2 border-t border-gray-100">
                          <div className="flex items-center gap-1">
                            <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>
                              <RulerDimensionLine strokeWidth={1.25} />
                            </span>
                            Size {bike.size}
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>
                              <MapPinCheckInside strokeWidth={1.25} />
                            </span>
                            {bike.location}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Pagination */}
              <div className="flex justify-center mt-6">
                <nav className="flex items-center gap-2">
                  <button className="p-2 rounded-lg border border-[#e5e7eb] hover:bg-gray-50 text-gray-500 disabled:opacity-50">
                    <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>
                      <ChevronLeft strokeWidth={3} />
                    </span>
                  </button>
                  <button className="w-10 h-10 rounded-lg bg-primary text-[#111813] font-bold text-sm">1</button>
                  <button className="w-10 h-10 rounded-lg border border-[#e5e7eb] hover:bg-gray-50 text-[#111813] font-medium text-sm">
                    2
                  </button>
                  <button className="w-10 h-10 rounded-lg border border-[#e5e7eb] hover:bg-gray-50 text-[#111813] font-medium text-sm">
                    3
                  </button>
                  <span className="text-gray-400">...</span>
                  <button className="w-10 h-10 rounded-lg border border-[#e5e7eb] hover:bg-gray-50 text-[#111813] font-medium text-sm">
                    12
                  </button>
                  <button className="p-2 rounded-lg border border-[#e5e7eb] hover:bg-gray-50 text-gray-500">
                    <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>
                      <ChevronRight strokeWidth={3} />
                    </span>
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
