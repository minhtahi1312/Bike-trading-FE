import { useState } from "react";
import { getSellerListings, addToWishlist, getWishlist, removeFromWishlist } from "../../../services/axiosClient";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChartColumnStacked, ChevronLeft, ChevronRight, Heart, ShieldCheck, SlidersHorizontal, Trello } from "lucide-react";

export default function Homebuyer() {
  const [sortBy, setSortBy] = useState("Mới nhất");
  const [verifiedOnly, setVerifiedOnly] = useState(true);
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [wishlistIds, setWishlistIds] = useState(new Set());
  const [watchedBikes, setWatchedBikes] = useState([]);

  // Toggle wishlist (Thêm hoặc Xóa)
  const handleWishlistToggle = async (bikeId) => {
    try {
      if (wishlistIds.has(bikeId)) {
        await removeFromWishlist(bikeId);
        setWishlistIds((prev) => {
          const newSet = new Set(prev);
          newSet.delete(bikeId);
          return newSet;
        });
        toast.info("Đã xóa khỏi danh sách yêu thích");
      } else {
        await addToWishlist(bikeId);
        setWishlistIds((prev) => {
          const newSet = new Set(prev);
          newSet.add(bikeId);
          return newSet;
        });
        toast.success("Đã thêm vào danh sách yêu thích");
      }
      loadWishlist();
    } catch (error) {
      console.error("❌ Lỗi khi cập nhật wishlist:", error);
      toast.error("Thao tác thất bại. Vui lòng thử lại.");
    }
  };

  useEffect(() => {
    loadSellerListings();
    loadWishlist();
  }, []);

  const loadWishlist = async () => {
    try {
      const response = await getWishlist();
      const dataArray = Array.isArray(response) ? response : response?.data || [];
      const ids = new Set();
      const wishlistBikes = [];

      dataArray.forEach(item => {
        const bikeData = item.bike || item;
        const bikeId = item.bikeId || bikeData.id;
        if (bikeId) {
          ids.add(bikeId);
          wishlistBikes.push({
            listingId: item.listingId,
            id: bikeId,
            name: bikeData.title || bikeData.name || "Chưa có tên xe",
            price: bikeData.price ? `${bikeData.price.toLocaleString("vi-VN")} đ` : "0 đ",
            image: bikeData.thumbnail || bikeData.imageUrl || "https://via.placeholder.com/400x300"
          });
        }
      });
      setWishlistIds(ids);
      setWatchedBikes(wishlistBikes.slice(0, 4));
    } catch (error) {
      console.error("❌ Failed to load wishlist:", error);
    }
  };

  const loadSellerListings = async () => {
    setLoading(true);
    try {
      const data = await getSellerListings();
      const formattedBikes = (data || []).map((item) => ({
        listingId: item.id,
        id: item.bikeId,
        name: item.title || "Chưa có tên xe",
        price: item.price ? `${item.price.toLocaleString("vi-VN")} đ` : "0 đ",
        size: item.size || "N/A",
        location: item.location || "Chưa xác định",
        image: item.thumbnail || "https://via.placeholder.com/400x300",
        verified: item.isInspected || false,
        condition: item.overall || "N/A",
        newTag: item.isNew || false,
        brand: item.brand || "Chưa xác định",
        category: item.category || "Chưa xác định",
      }));
      setBikes(formattedBikes);
    } catch (error) {
      console.error("❌ Failed to load seller listings:", error);
      setBikes([]);
    } finally {
      setLoading(false);
    }
  };

  const navigate = useNavigate();
  const handleWishlistClick = () => navigate('/homebuyer/wishlist');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = () => setIsFilterOpen(false);
    if (isFilterOpen) window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, [isFilterOpen]);

  return (
    <div className="bg-background-light dark:bg-background-dark text-[#111813] overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <div className="w-full px-4 lg:px-10 py-6 flex flex-col gap-8">
          
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
                <h1 className="text-white text-3xl font-black leading-tight tracking-[-0.033em] md:text-5xl">
                  Mua xe bằng niềm tin, nhận xe bằng chất lượng
                </h1>
                <p className="text-white/90 text-sm font-normal leading-normal md:text-lg">
                  Hành trình mới bắt đầu từ đây! Chúng tôi tìm thấy <span className="font-bold text-white">{bikes.length}</span> lựa chọn hoàn hảo dành riêng cho bạn
                </p>
               
              </div>
            </div>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Sidebar */}
            <div className="lg:col-span-4 flex flex-col gap-8">
              <div className="bg-white rounded-xl border border-[#e5e7eb] p-5 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-[#111813]">Đơn hàng hiện tại</h3>
                  <a className="text-emerald-600 text-sm font-bold hover:underline" href="#">Chi tiết</a>
                </div>
                <div className="flex gap-4">
                  <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-16 shrink-0"
                    style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAXjxvX0p-T7AAY5XVNWApZ6MPrPPP2zUR8foAOg7_MHFq1nK83fWL4baMD28IB0zGAZ44dQT8p5E_RdfBendVUxGUTetz8D8qsFO6rxYDsTVws0QEv-t2HAGYOmTrQ_c_uIVeHUqYmbI9VwfinbodIlqV1O4Ejq-vUqFOh2pCdVwVkfvgJ6ty8mMuGQhWNXo7AXQ4XL8dzBrt1KcAGKGk7DyCBB201kQt-aRTuTRECiCL5mvyPMHsd2eMW4Q2--sF4TjMmL_pYCKYs")' }}></div>
                  <div className="flex flex-col justify-center gap-1">
                    <p className="text-[#111813] text-sm font-bold leading-tight">Trek Madone SL 6</p>
                    <p className="text-emerald-700 text-xs">Mã đơn: #882910</p>
                    <div className="inline-flex items-center gap-1 text-[#111813] text-xs font-medium bg-emerald-50 px-2 py-0.5 rounded-full w-fit">
                      <span className="size-2 rounded-full bg-blue-500 animate-pulse"></span>
                      Đang vận chuyển
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-[#f0f4f2]">
                  <div className="flex justify-between text-xs mb-1.5 font-medium">
                    <span className="text-[#111813]">Tiến độ giao hàng</span>
                    <span className="text-emerald-600">75%</span>
                  </div>
                  <div className="w-full overflow-hidden rounded-full bg-emerald-50 h-2">
                    <div className="h-full rounded-full bg-emerald-500" style={{ width: "75%" }}></div>
                  </div>
                  <p className="text-emerald-700 text-xs mt-2 text-right">Dự kiến: 25/10/2023</p>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-[#e5e7eb] p-5 shadow-sm flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-[#111813]">Xe đang theo dõi</h3>
                  <button onClick={handleWishlistClick} className="text-sm font-medium text-emerald-700 hover:text-emerald-500">
                    Xem tất cả ({watchedBikes.length})
                  </button>
                </div>
                {watchedBikes.map((bike) => (
                  <div key={bike.listingId} className="flex gap-3 items-center p-2 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer group"
                    onClick={() => navigate(`/homebuyer/details/${bike.listingId}`)}>
                    <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-md size-14 shrink-0"
                      style={{ backgroundImage: `url("${bike.image}")` }}></div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-[#111813] truncate group-hover:text-emerald-600 transition-colors">{bike.name}</h4>
                      <p className="text-xs text-emerald-700">{bike.price}</p>
                    </div>
                    <button className="text-red-500 hover:text-red-700 transition-colors"
                      onClick={(e) => { e.stopPropagation(); handleWishlistToggle(bike.id); }}>
                      <Heart size={18} fill="currentColor" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="bg-emerald-500 rounded-xl p-6 text-white relative overflow-hidden shadow-sm">
                <div className="relative z-10">
                  <h3 className="font-bold text-xl mb-2">Mua xe an tâm</h3>
                  <p className="text-sm text-white/90 mb-4">
                    Chúng tôi chỉ giới thiệu những chiếc xe có chất lượng thực thụ, đã được bảo chứng bởi đội ngũ chuyên môn
                  </p>
                </div>
                <div className="absolute -bottom-4 -right-4 opacity-20">
                  <ShieldCheck size={120} />
                </div>
              </div>
            </div>

            {/* Main Area */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              <div className="relative z-[50] bg-white p-4 rounded-xl border border-[#e5e7eb] shadow-sm flex flex-col md:flex-row gap-4 items-start md:items-center justify-between z-30">
                <div className="flex flex-wrap gap-2 items-center">
                  <div className="relative inline-block" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => setIsFilterOpen(!isFilterOpen)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${
                        isFilterOpen ? "bg-emerald-100 border-emerald-500 text-emerald-600" : "bg-emerald-50 border-transparent text-[#111813] hover:bg-emerald-100"
                      }`}
                    >
                      <SlidersHorizontal size={18} strokeWidth={2.5} />
                      Bộ lọc
                      <span className={`material-symbols-outlined transition-transform duration-200 ${isFilterOpen ? 'rotate-180' : ''}`} style={{ fontSize: "16px" }}>
                        expand_more
                      </span>
                    </button>

                    {isFilterOpen && (
                      <div className="absolute top-full left-0 mt-2 w-[700px] bg-white rounded-xl shadow-xl border border-gray-100 p-6 z-[9999] flex gap-8">
                        <div className="flex-1">
                          <div className="px-3 py-2 text-xs font-bold text-emerald-600 uppercase tracking-wider mb-1 border-b border-emerald-100">Xe Road</div>
                          <div className="flex flex-col gap-1 mt-2">
                            {["Xe đua tiêu chuẩn", "Khí động học (Aero)", "Đường dài (Endurance)", "3 môn phối hợp (TT)"].map(item => (
                              <button key={item} className="w-full text-left px-3 py-1.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 rounded-lg transition-colors">{item}</button>
                            ))}
                          </div>
                        </div>
                        <div className="flex-1 border-x border-gray-100 px-4">
                          <div className="px-3 py-2 text-xs font-bold text-emerald-600 uppercase tracking-wider mb-1 border-b border-emerald-100">Xe MTB</div>
                          <div className="flex flex-col gap-1 mt-2">
                            {["Băng đồng (XC)", "Địa hình Trail", "Địa hình Enduro", "Đổ đèo (Downhill)"].map(item => (
                              <button key={item} className="w-full text-left px-3 py-1.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 rounded-lg transition-colors">{item}</button>
                            ))}
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="px-3 py-2 text-xs font-bold text-emerald-600 uppercase tracking-wider mb-1 border-b border-emerald-100">Dòng khác</div>
                          <div className="grid grid-cols-1 gap-1 mt-2">
                            {["Gravel", "Touring", "BMX", "Fixed Gear", "City / Hybrid", "Fat Bike", "E-Bike"].map((item) => (
                              <button key={item} className="w-full text-left px-3 py-1.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 rounded-lg transition-colors">{item}</button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="h-6 w-px bg-gray-200 mx-1 hidden md:block"></div>
                  <div className="hidden sm:flex gap-2">
                    {["Road", "MTB", "Touring"].map(cat => (
                      <button key={cat} className="px-3 py-1.5 rounded-lg border border-[#e5e7eb] text-sm hover:border-emerald-500 hover:text-emerald-600 transition-colors bg-white">{cat}</button>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-auto">
                  <span className="text-sm text-emerald-700">Sắp xếp:</span>
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
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4"></div>
                    <p className="text-gray-500">Đang tải danh sách xe...</p>
                  </div>
                </div>
              ) : bikes.length === 0 ? (
                <div className="flex items-center justify-center col-span-full h-64">
                  <div className="text-center"><p className="text-gray-500">Không tìm thấy xe nào.</p></div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {bikes.map((bike) => (
                    <div key={bike.listingId} className="group bg-white rounded-xl border border-[#e5e7eb] overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col cursor-pointer"
                      onClick={() => navigate(`/homebuyer/details/${bike.listingId}`)}>
                      <div className="relative aspect-[4/3] overflow-hidden">
                        {bike.verified && (
                          <div className="absolute top-3 left-3 z-[10] bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1 shadow-sm">
                            <ShieldCheck size={14} strokeWidth={3} /> ĐÃ KIỂM ĐỊNH
                          </div>
                        )}
                        {bike.newTag && (
                          <div className="absolute top-3 left-3 z-10 bg-gray-900/80 text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1 shadow-sm backdrop-blur-sm">MỚI ĐĂNG</div>
                        )}
                        <button type="button"
                          onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleWishlistToggle(bike.id); }}
                          className={`absolute top-3 right-3 z-[30] p-2 rounded-full bg-white/90 shadow-md transition-all duration-200 hover:scale-110 active:scale-95 ${wishlistIds.has(bike.id) ? "text-red-500" : "text-gray-400 hover:text-red-500"}`}>
                          <Heart size={20} fill={wishlistIds.has(bike.id) ? "currentColor" : "none"} strokeWidth={2.5} />
                        </button>
                        <div className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                          style={{ backgroundImage: `url("${bike.image}")` }}></div>
                      </div>
                      <div className="p-4 flex flex-col flex-1 gap-2">
                        <h3 className="text-base font-bold text-[#111813] line-clamp-2 min-h-[2.5rem]">{bike.name}</h3>
                        <p className="text-lg font-bold text-emerald-600">{bike.price}</p>
                        <div className="flex items-center gap-4 text-xs text-emerald-700 py-2">
                          <div className="flex items-center gap-1"><Trello size={16} strokeWidth={1.25} /> Brand: {bike.brand}</div>
                          <div className="flex items-center gap-1"><ChartColumnStacked size={16} strokeWidth={1.25} /> {bike.category}</div>
                        </div>
                        <button className="mt-auto w-full py-2.5 bg-emerald-50 hover:bg-emerald-500 hover:text-white text-emerald-700 font-bold text-sm rounded-lg transition-all duration-200 flex items-center justify-center gap-2">
                          Xem chi tiết <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>arrow_forward</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Pagination */}
              <div className="flex justify-center mt-6">
                <nav className="flex items-center gap-2">
                  <button className="p-2 rounded-lg border border-[#e5e7eb] hover:bg-emerald-50 text-gray-500 disabled:opacity-50">
                    <ChevronLeft size={20} strokeWidth={3} />
                  </button>
                  <button className="w-10 h-10 rounded-lg bg-emerald-500 text-white font-bold text-sm">1</button>
                  <button className="w-10 h-10 rounded-lg border border-[#e5e7eb] hover:bg-emerald-50 text-[#111813] font-medium text-sm">2</button>
                  <button className="w-10 h-10 rounded-lg border border-[#e5e7eb] hover:bg-emerald-50 text-[#111813] font-medium text-sm">3</button>
                  <span className="text-gray-400">...</span>
                  <button className="w-10 h-10 rounded-lg border border-[#e5e7eb] hover:bg-emerald-50 text-[#111813] font-medium text-sm">12</button>
                  <button className="p-2 rounded-lg border border-[#e5e7eb] hover:bg-emerald-50 text-gray-500">
                    <ChevronRight size={20} strokeWidth={3} />
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