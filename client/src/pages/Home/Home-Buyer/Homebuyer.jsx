import { useState, useEffect } from "react";
import { getSellerListings, addToWishlist, getWishlist, removeFromWishlist, filterBuyerListings } from "../../../services/axiosClient";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ChartColumnStacked, ChevronLeft, ChevronRight, Heart, ShieldCheck, SlidersHorizontal, Trello } from "lucide-react";

export const CATEGORY_OPTIONS = [
  { label: "Mtb", value: "Mtb" },
  { label: "Road", value: "Road" },
  { label: "City-hybrid", value: "City-hybrid" },
  { label: "E-bike", value: "E-bike" },
  { label: "Touring", value: "Touring" },
  { label: "Folding", value: "Folding" },
  { label: "Gravel", value: "Gravel" },
  { label: "Fixed-gear", value: "Fixed-gear" },
  { label: "Kids", value: "Kids" },
  { label: "Bmx", value: "Bmx" },
  { label: "Fat-bike", value: "Fat-bike" },
  { label: "Other", value: "Other" }
];

export const BRAND_OPTIONS = [
  // Top các hãng phổ thông & cao cấp được tìm kiếm nhiều nhất
  { label: "Giant", value: "Giant" },
  { label: "Trek", value: "Trek" },
  { label: "Specialized", value: "Specialized" },
  { label: "Merida", value: "Merida" },
  { label: "Cannondale", value: "Cannondale" },
  
  // Các hãng phổ biến ở phân khúc tầm trung/giá rẻ tại VN
  { label: "Trinx", value: "Trinx" },
  { label: "Galaxy", value: "Galaxy" },
  { label: "Asama", value: "Asama" },
  { label: "Fornix", value: "Fornix" },
  { label: "Twitter", value: "Twitter" },

  // Phân khúc cao cấp / Châu Âu
  { label: "Scott", value: "Scott" },
  { label: "Canyon", value: "Canyon" },
  { label: "Bianchi", value: "Bianchi" },
  { label: "Cervelo", value: "Cervelo" },
  { label: "Pinarello", value: "Pinarello" },
  { label: "Bmc", value: "Bmc" },
  { label: "Santa-cruz", value: "Santa-cruz" }, // Nổi tiếng về MTB
  { label: "Orbea", value: "Orbea" },
  { label: "Cube", value: "Cube" },
  { label: "Colnago", value: "Colnago" },
  { label: "Brompton", value: "Brompton" }, // Nổi tiếng về xe gấp
  
  { label: "Other", value: "Other" }
];

export default function Homebuyer() {
  const [sortBy, setSortBy] = useState("Mới nhất");
  const [verifiedOnly, setVerifiedOnly] = useState(true);
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [wishlistIds, setWishlistIds] = useState(new Set());
  const [watchedBikes, setWatchedBikes] = useState([]);
  
  // 1. Thêm state lưu trữ bộ lọc đang chọn
  const [filters, setFilters] = useState({
    category: "",
    brand: ""
  });

  // 2. Hàm xử lý khi bấm chọn bộ lọc (có chặn event để không bị đóng menu)
  const handleSelectFilter = (e, type, value) => {
    e.preventDefault();
    e.stopPropagation();
    
    setFilters(prev => ({
      ...prev,
      [type]: prev[type] === value ? "" : value // Bấm lại thì hủy chọn
    }));
  };

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
    
  }, []);

  useEffect(() => { loadWishlist(); }, []);

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

  // 1. Cập nhật useEffect: Lắng nghe sự thay đổi của filters
  useEffect(() => {
    loadSellerListings();
  }, [filters]); // <-- Đưa filters vào đây để tự động gọi lại API khi bộ lọc thay đổi

  // Lấy wishlist 1 lần lúc mới vào trang
  useEffect(() => {
    loadWishlist();
  }, []);

  // 2. Cập nhật hàm gọi danh sách xe
  const loadSellerListings = async () => {
    setLoading(true);
    try {
      const filterList = [filters.category, filters.brand].filter(Boolean);

      const responseData = await filterBuyerListings(filterList, 1, 12);
      
      const rawBikes = Array.isArray(responseData) 
        ? responseData 
        : (responseData?.items || responseData?.data || []);

      const formattedBikes = rawBikes.map((item) => ({
        listingId: item.id || item.listingId,
        id: item.bikeId || item.id,
        name: item.title || item.name || "Chưa có tên xe",
        price: item.price ? `${item.price.toLocaleString("vi-VN")} đ` : "0 đ",
        size: item.size || "N/A",
        location: item.location || "Chưa xác định",
        image: item.thumbnail || item.imageUrl || "https://via.placeholder.com/400x300",
        verified: item.isInspected || false,
        condition: item.overall || "N/A",
        newTag: item.isNew || false,
        brand: item.brand || "Chưa xác định",
        category: item.category || "Chưa xác định",
      }));
      
      setBikes(formattedBikes);
    } catch (error) {
      console.error("❌ Failed to load seller listings:", error);
      setBikes([]); // Nếu lỗi thì hiển thị mảng rỗng
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
              <div className="relative z-[50] bg-white p-4 rounded-xl border border-[#e5e7eb] shadow-sm flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
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
                      <div className="absolute top-full left-0 mt-2 w-[600px] bg-white rounded-xl shadow-xl border border-gray-100 p-6 z-[9999] flex gap-6 cursor-default" onClick={(e) => e.stopPropagation()}>
                        
                        {/* CỘT 1: DANH MỤC XE */}
                        <div className="flex-1">
                          <div className="px-3 py-2 text-xs font-bold text-emerald-600 uppercase tracking-wider mb-2 border-b border-emerald-100">
                            Danh mục xe
                          </div>
                          <div className="flex flex-col gap-1 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                          

                            {CATEGORY_OPTIONS?.map((cat) => (
                              <button 
                                key={cat.value}
                                type="button"
                                onClick={(e) => handleSelectFilter(e, "category", cat.value)}
                                className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                                  filters.category === cat.value 
                                    ? "bg-emerald-500 text-white font-bold shadow-md shadow-emerald-200" 
                                    : "text-[#111813] hover:bg-emerald-50 hover:text-emerald-600"
                                }`}
                              >
                                {cat.label}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* CỘT 2: HÃNG XE */}
                        <div className="flex-1 border-l border-gray-100 pl-6">
                          <div className="px-3 py-2 text-xs font-bold text-emerald-600 uppercase tracking-wider mb-2 border-b border-emerald-100">
                            Thương hiệu
                          </div>
                          <div className="flex flex-col gap-1 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                           

                            {BRAND_OPTIONS?.map((brand) => (
                              <button 
                                key={brand.value}
                                type="button"
                                onClick={(e) => handleSelectFilter(e, "brand", brand.value)}
                                className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                                  filters.brand === brand.value 
                                    ? "bg-emerald-500 text-white font-bold shadow-md shadow-emerald-200" 
                                    : "text-[#111813] hover:bg-emerald-50 hover:text-emerald-600"
                                }`}
                              >
                                {brand.label}
                              </button>
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