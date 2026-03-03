import React, { useEffect, useState } from "react";
import { Bike, ChevronRight, House, ListFilter, MapPin, RulerDimensionLine, Search, Settings, Shapes, Trash, Truck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getWishlist, removeFromWishlist } from "../../../services/axiosClient";

function formatVND(n) {
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
      // BƯỚC 1: Lấy dữ liệu (Hiện tại đang dùng Mock Data để bạn test giao diện)
      // Khi API đã sẵn sàng, hãy đổi dòng dưới thành: const response = await getWishlist();
      const response = [
        {
          "id": "d4a5b3f2-7c31-4b1d-9f89-1234567890ab", // Wishlist ID
          "userId": "a12b3c4d-5e6f-7890-ab12-cd34567890ef",
          "bike": {
            "id": "b98c7d6e-5f4a-3b2c-1d0e-9f87654321ab",
            "name": "Test Bike – Giant TCR 0",
            "price": 45000000,
            "imageUrl": "https://images.giant-bicycles.com/b_white,c_pad,h_650,q_80/no68p9p9p9p9p9p9p9p9/TCR_Advanced_Pro_0.jpg",
            "size": "M",
            "year": 2024,
            "category": "Road Bike",
            "material": "Carbon",
            "groupset": "Shimano Ultegra",
            "location": "TP. Hồ Chí Minh",
            "seller": "Nguyễn Văn A",
            "sellerAvatar": "https://i.pravatar.cc/150?u=a",
            "freeship": true,
            "sold": false
          }
        },
        {
          "id": "e5f6g7h8-90ab-cdef-1234-567890abcdef",
          "bike": {
            "id": "c1d2e3f4-5678-90ab-cdef-1234567890gh",
            "name": "Trek Emonda SL 6",
            "price": 35000000,
            "imageUrl": "https://trek.scene7.com/is/image/TrekBicycleProducts/EmondaSL6_21_32561_A_Primary",
            "size": "S",
            "year": 2023,
            "category": "Road Bike",
            "material": "Carbon",
            "groupset": "Shimano 105",
            "location": "Hà Nội",
            "seller": "Bike Store HN",
            "sellerAvatar": "https://i.pravatar.cc/150?u=b",
            "freeship": false,
            "sold": true
          }
        }
      ];

      // BƯỚC 2: Mapping dữ liệu để khớp với các biến trong JSX của bạn
      const formattedData = response.map(item => ({
        ...item.bike,             // Lấy các thuộc tính từ object bike
        wishlistId: item.id,      // Lưu ID của wishlist để dùng cho hàm xóa
        title: item.bike.name,    // Chuyển 'name' thành 'title'
        image: item.bike.imageUrl // Chuyển 'imageUrl' thành 'image'
      }));

      setBikes(formattedData);
    } catch (e) {
      console.error('failed to load wishlist', e);
    } finally {
      setLoading(false);
    }
  };

 const handleDelete = async (wishlistId) => {
    // 1. Hỏi xác nhận để tránh bấm nhầm
    if (!window.confirm("Bạn có muốn xóa xe này khỏi danh sách yêu thích?")) return;

    try {
      console.log("Đang xóa ID:", wishlistId);
      // 2. Gọi API xóa lên Server
      await removeFromWishlist(wishlistId);

      // 3. CẬP NHẬT STATE TẠI CHỖ: 
      // Lọc bỏ sản phẩm có wishlistId vừa xóa ra khỏi danh sách đang hiển thị
      setBikes((prevBikes) => prevBikes.filter((b) => b.wishlistId !== wishlistId));
      
      console.log("Xóa thành công ID:", wishlistId);
    } catch (e) {
      console.error('Lỗi khi xóa:', e);
      alert("Không thể xóa sản phẩm. Vui lòng kiểm tra lại kết nối hoặc Token.");
      
      // Nếu lỗi, có thể gọi lại loadWishlist() để đồng bộ lại dữ liệu chuẩn từ Server
      loadWishlist(); 
    }
  };

  const handleView = (id) => {
    navigate(`/bike-detail/${id}`);
  };

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col text-text-main dark:text-white transition-colors duration-200">
      <main className="flex-grow w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-text-main dark:text-white mb-2">Danh sách yêu thích</h1>
            <p className="text-text-sub text-base">Bạn đã lưu <span className="font-bold text-text-main dark:text-white">{bikes.length} xe đạp</span> vào danh sách.</p>
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-3">
             {/* Các nút lọc giữ nguyên */}
             <button className="group flex h-9 items-center gap-2 rounded-full border border-border-light dark:border-border-dark bg-white dark:bg-surface-dark px-4 text-sm font-medium hover:border-primary">
              <ListFilter size={18} /> Lọc
            </button>
            <button className="flex h-9 items-center rounded-full bg-primary text-black px-4 text-sm font-bold">Tất cả</button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {loading ? (
            <p className="text-center col-span-full py-20 text-gray-500">Đang tải...</p>
          ) : bikes.length === 0 ? (
            <p className="text-center col-span-full py-20 text-gray-500">Không có sản phẩm yêu thích</p>
          ) : (
            bikes.map((b) => (
              <article key={b.wishlistId} className={`group relative flex flex-col ${b.sold ? "opacity-75" : ""} bg-surface-light dark:bg-surface-dark rounded-xl overflow-hidden shadow-soft border border-transparent hover:border-primary/50 transition-all duration-300`}>
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                  <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: `url('${b.image}')` }} />
                  {b.sold && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-[1px]">
                      <span className="bg-red-500 text-white px-3 py-1 rounded text-sm font-bold uppercase">Đã bán</span>
                    </div>
                  )}
                  {b.freeship && (
                    <div className="absolute top-3 left-3 flex flex-col gap-1">
                      <span className="inline-flex items-center gap-1 rounded bg-white/90 dark:bg-black/80 px-2 py-1 text-xs font-bold text-blue-600 backdrop-blur-sm">
                        <Truck size={14} /> Freeship
                      </span>
                    </div>
                  )}
                  <button onClick={() => handleDelete(b.wishlistId)} className="absolute top-3 right-3 p-2 rounded-full bg-white/90 dark:bg-black/60 text-gray-400 hover:text-red-500 transition-colors shadow-sm">
                    <Trash size={16} />
                  </button>
                </div>

                <div className="flex flex-1 flex-col p-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-text-main dark:text-white leading-tight line-clamp-1 group-hover:text-primary">{b.title}</h3>
                    <p className="text-text-sub text-xs font-medium mb-3">{b.year} • {b.category}</p>
                    <div className="text-xl font-bold text-primary mb-4">{formatVND(b.price)}</div>
                    <div className="grid grid-cols-2 gap-y-2 gap-x-1 text-xs text-text-sub mb-4">
                      <div className="flex items-center gap-1.5"><RulerDimensionLine size={16} /><span>Size {b.size}</span></div>
                      <div className="flex items-center gap-1.5"><Shapes size={16} /><span>{b.material}</span></div>
                      <div className="flex items-center gap-1.5"><Settings size={16} /><span>{b.groupset}</span></div>
                      <div className="flex items-center gap-1.5"><MapPin size={16} /><span className="truncate">{b.location}</span></div>
                    </div>
                  </div>
                  <div className="mt-2 pt-3 border-t border-border-light dark:border-border-dark flex items-center gap-3">
                    <div className="flex items-center gap-2 text-xs font-medium text-text-main dark:text-white">
                      <div className="size-6 rounded-full bg-gray-200 bg-cover bg-center" style={{ backgroundImage: `url('${b.sellerAvatar}')` }} />
                      {b.seller}
                    </div>
                    <button onClick={() => handleView(b.id)} className={`ml-auto flex items-center justify-center rounded-lg ${b.sold ? "bg-gray-100 text-text-sub" : "bg-primary/10 hover:bg-primary text-primary hover:text-black"} px-3 py-2 text-sm font-bold transition-all`} disabled={b.sold}>
                      {b.sold ? "Đã bán" : "Xem chi tiết"}
                    </button>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </main>
    </div>
  );
}