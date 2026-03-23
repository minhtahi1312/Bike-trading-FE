import React, { useEffect, useState } from "react";
import { ListFilter, Trash, Heart, MapPin, RulerDimensionLine, Shapes, Settings, Truck, Trello, ChartColumnStacked } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getWishlist, removeFromWishlist } from "../../../services/axiosClient";
import { toast } from "react-toastify";

function formatVND(n) {
  if (typeof n === 'string') return n;
  return n ? n.toLocaleString("vi-VN") + " ₫" : "0 ₫";
}

export default function Wishlist() {
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Danh sách yêu thích - BikeMarket";
    loadWishlist();
  }, []);

  const loadWishlist = async () => {
    setLoading(true);
    try {
      const response = await getWishlist();
      const dataArray = Array.isArray(response) ? response : response?.data || [];
      const formattedData = dataArray.map(item => {
        const bikeData = item.bike || item;
        const bikeId = item.bikeId || bikeData.id;
        const listingId = item.listingId ; 
        
        return {
          listingId: listingId,
          id: bikeId,
          wishlistId: item.id,
          bikeId: bikeId,
          title: bikeData.title || bikeData.name || 'Chưa có tên xe',
          price: bikeData.price || 0,
          brand: bikeData.brand || 'N/A',
          category: bikeData.category || 'N/A',
          bikeStatus: bikeData.bikeStatus || 'N/A',
          image: bikeData.thumbnail || bikeData.imageUrl || 'https://via.placeholder.com/400x300',
          size: bikeData.size || 'N/A',
          location: bikeData.location || 'N/A',
          material: bikeData.material || 'N/A',
          groupset: bikeData.groupset || 'N/A',
          year: bikeData.year || '',
          sold: bikeData.bikeStatus && bikeData.bikeStatus.toLowerCase() !== "available"
        };
      });
      
      setBikes(formattedData);
    } catch (e) {
      console.error('❌ Failed to load wishlist:', e);
      toast.error("Không thể tải danh sách yêu thích");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (bikeId) => {
    if (!window.confirm("Bạn có muốn xóa xe này khỏi danh sách yêu thích?")) return;

    try {
      await removeFromWishlist(bikeId);
      setBikes((prevBikes) => prevBikes.filter((b) => b.bikeId !== bikeId));
      toast.success("Đã xóa khỏi danh sách yêu thích");
    } catch (e) {
      console.error('❌ Lỗi khi xóa:', e);
      toast.error("Không thể xóa sản phẩm");
    }
  };

  const handleView = (id) => {
    navigate(`/homebuyer/details/${id}`);
  };

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col text-[#111813] dark:text-white transition-colors duration-200">
      <main className="flex-grow w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-2">Danh sách yêu thích</h1>
      
            <p className="text-[#066e48] text-base">Bạn đã lưu <span className="font-bold text-[#111813] dark:text-white">{bikes.length} xe đạp</span> vào danh sách.</p>
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-3">
          
            <button className="flex h-9 items-center rounded-full bg-[#066e48] text-white px-4 text-sm font-bold shadow-sm">Tất cả</button>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
           
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#066e48] mb-4"></div>
            <p className="text-gray-500">Đang tải danh sách...</p>
          </div>
        ) : bikes.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 shadow-sm">
            <Heart size={48} className="mx-auto mb-4 text-gray-300" />
            <p className="text-gray-500 text-lg">Danh sách yêu thích của bạn đang trống</p>
            <button 
              onClick={() => navigate('/homebuyer')}
              className="mt-4 text-[#066e48] font-bold hover:underline"
            >
              Khám phá xe ngay
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {bikes.map((b) => (
              <article key={b.wishlistId || b.listingId} className={`group relative flex flex-col bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-[#e5e7eb] dark:border-gray-700 hover:border-[#066e48]/50 transition-all duration-300 ${b.sold ? "opacity-75" : ""}`}>
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 cursor-pointer" onClick={() => navigate(`/homebuyer/details/${b.listingId}`)}>
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" 
                    style={{ backgroundImage: `url('${b.image}')` }} 
                  />
                  
                  {b.sold && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-[1px]">
                      <span className="bg-red-500 text-white px-3 py-1 rounded text-sm font-bold uppercase shadow-lg">Đã bán</span>
                    </div>
                  )}

                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    <span className="bg-[#066e48]/95 backdrop-blur-sm text-white font-bold text-[10px] px-2 py-1 rounded shadow-sm uppercase tracking-wider">
                      {b.bikeStatus || 'CÓ SẴN'}
                    </span>
                  </div>

                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(b.bikeId);
                    }} 
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/90 text-gray-400 hover:text-red-500 hover:scale-110 transition-all shadow-md"
                    title="Xóa khỏi yêu thích"
                  >
                    <Trash size={16} strokeWidth={2.5} />
                  </button>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <div className="flex-1">
                    <h3 
                      className="text-base font-bold text-[#111813] dark:text-white leading-snug line-clamp-2 group-hover:text-[#066e48] transition-colors mb-2 cursor-pointer min-h-[2.5rem]" 
                      onClick={() => !b.sold && handleView(b.id)}
                    >
                      {b.title}
                    </h3>
                    
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      <span className="px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-700 text-[10px] font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                        {b.brand}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-900/30 text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                        {b.category}
                      </span>
                    </div>

                    <div className="text-xl font-black text-[#066e48] mb-4">
                      {formatVND(b.price)}
                    </div>

                    <div className="grid grid-cols-2 gap-y-2 gap-x-2 text-[11px] text-[#066e48] mb-2">
                      <div className="flex items-center gap-1.5"><Trello size={16} strokeWidth={1.25} /><span>Brand: {b.brand}</span></div>
                      <div className="flex items-center gap-1.5"><ChartColumnStacked size={16} strokeWidth={1.25} /><span className="truncate">Category: {b.category}</span></div>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <button 
                      onClick={() => handleView(b.listingId)} 
                      disabled={b.sold}
                      className={`w-full flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-bold transition-all ${
                        b.sold 
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                        : "bg-[#f0f4f2] hover:bg-[#066e48] hover:text-white text-[#111813] shadow-sm active:scale-95"
                      }`}
                    >
                      {b.sold ? "Đã bán" : "Xem chi tiết"}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}