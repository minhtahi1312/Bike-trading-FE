import { Bell, Bike, Heart, Search, ShoppingCart, Loader2 } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// LƯU Ý: Nhớ import axiosClient của bạn vào đây
// import axiosClient from 'đường/dẫn/đến/axiosClient';

// Đưa hàm gọi API ra ngoài component hoặc import từ file service
const searchListings = async (name = "", pageNumber = 1, pageSize = 5) => {
  // Try catch để an toàn hơn khi mạng lỗi
  try {
    const response = await axiosClient.get('/api/buyer/listings/search', {
      params: { name, pageNumber, pageSize }
    });
    return response.data;
  } catch (error) {
    console.error("Lỗi khi gọi API search:", error);
    return null;
  }
};

const BuyerHeader = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // --- STATE DÀNH CHO TÌM KIẾM ---
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const searchRef = useRef(null);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Xử lý click ra ngoài để đóng Menu và Dropdown tìm kiếm
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Đóng menu avatar
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
      // Đóng dropdown tìm kiếm
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Xử lý gọi API Tìm kiếm khi gõ phím (Debounce 500ms)
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchTerm.trim() !== '') {
        setIsSearching(true);
        const data = await searchListings(searchTerm, 1, 5); // Lấy 5 kết quả đầu tiên
        
        if (data) {
          // Tuỳ thuộc vào backend trả về data.items hay data là mảng, bạn chỉnh lại chỗ này nhé
          const items = data.items || data || []; 
          setSearchResults(items);
          setShowSearchDropdown(true);
        }
        setIsSearching(false);
      } else {
        setSearchResults([]);
        setShowSearchDropdown(false);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const handleWishlistClick = () => navigate('/homebuyer/wishlist');
  const CartBuyerClick = () => navigate('/homebuyer/cart');
  const HomeBuyerClick = () => navigate('/homebuyer');

  // Chuyển hướng khi ấn Enter
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && searchTerm.trim() !== '') {
      setShowSearchDropdown(false);
      // Chuyển sang trang kết quả tìm kiếm đầy đủ (bạn có thể tạo route này sau)
      navigate(`/homebuyer/search?name=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <div className="w-full bg-white border-b border-[#e5e7eb] sticky top-0 z-50">
      <div className="w-full ">
        <header className="flex items-center justify-between whitespace-nowrap px-4 lg:px-10 py-3">
          <div className="flex items-center gap-8">
            <div className="p-6 pb-2">
              <button onClick={HomeBuyerClick}>
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-600 text-white shadow-sm">
                    <Bike size={20} />
                  </div>
                  <h1 className="text-emerald-700 text-lg font-extrabold tracking-tight">BikeMarket</h1>
                </div>
              </button>
            </div>
            
            {/* --- KHU VỰC THANH TÌM KIẾM --- */}
            <div className="hidden md:flex flex-col min-w-40 !h-10 w-96 relative" ref={searchRef}>
              <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
                <div className="text-[#61896f] flex border-none bg-[#f0f4f2] items-center justify-center pl-4 rounded-l-lg border-r-0">
                  {isSearching ? (
                    <Loader2 className="animate-spin text-emerald-600" size={20} />
                  ) : (
                    <span className="material-symbols-outlined" style={{ fontSize: "24px" }}>
                      <Search strokeWidth={1.25} size={20} />
                    </span>
                  )}
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onFocus={() => { if (searchResults.length > 0) setShowSearchDropdown(true); }}
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111813] focus:outline-0 focus:ring-0 border-none bg-[#f0f4f2] focus:border-none h-full placeholder:text-[#61896f] px-4 rounded-l-none border-l-0 pl-2 text-sm font-normal leading-normal"
                  placeholder="Tìm kiếm xe đạp mơ ước..."
                />
              </div>

              {/* Dropdown kết quả tìm kiếm */}
              {showSearchDropdown && searchTerm.trim() !== '' && (
                <div className="absolute top-12 left-0 w-full bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-50">
                  {searchResults.length > 0 ? (
                    <ul className="py-2">
                      {searchResults.map((bike) => (
                        <li 
                          key={bike.id} 
                          onClick={() => {
                            setShowSearchDropdown(false);
                            navigate(`/homebuyer/bike/${bike.id}`); // Đường dẫn tới trang chi tiết xe
                          }}
                          className="px-4 py-3 hover:bg-gray-50 cursor-pointer flex items-center gap-3 border-b border-gray-100 last:border-none"
                        >
                          {/* Sửa lại key hình ảnh (imageUrl, thumbnail...) tùy thuộc vào API của bạn */}
                          <img 
                            src={bike.imageUrl || "https://via.placeholder.com/40"} 
                            alt={bike.name} 
                            className="w-10 h-10 object-cover rounded-md bg-gray-100"
                          />
                          <div className="flex flex-col overflow-hidden">
                            <span className="text-sm font-semibold text-gray-800 truncate">{bike.name}</span>
                            <span className="text-xs text-emerald-600 font-medium">
                              {bike.price ? `${bike.price.toLocaleString('vi-VN')} đ` : 'Liên hệ'}
                            </span>
                          </div>
                        </li>
                      ))}
                      <li 
                        onClick={() => handleKeyDown({ key: 'Enter' })}
                        className="px-4 py-2 text-center text-xs text-emerald-600 font-semibold hover:bg-gray-50 cursor-pointer"
                      >
                        Xem tất cả kết quả
                      </li>
                    </ul>
                  ) : (
                    <div className="px-4 py-4 text-sm text-gray-500 text-center">
                      {!isSearching && "Không tìm thấy kết quả nào."}
                    </div>
                  )}
                </div>
              )}
            </div>
            {/* --- KẾT THÚC KHU VỰC THANH TÌM KIẾM --- */}

          </div>
          
          <div className="flex flex-1 justify-end gap-4 lg:gap-8 items-center">
            <div className="flex gap-3 items-center">
              <button onClick={CartBuyerClick} className="relative">
                <span className="material-symbols-outlined"><ShoppingCart strokeWidth={3} /></span>
                <span className="absolute top-1 right-1 size-2 bg-red-500 rounded-full border-2 border-surface-light dark:border-surface-dark"></span>
              </button>
             
              <button
                onClick={handleWishlistClick}
                className="flex size-10 items-center justify-center rounded-lg bg-[#f0f4f2] hover:bg-[#e2e8e5] text-[#111813]"
                title="Xe yêu thích"
              >
                <span className="material-symbols-outlined" style={{ fontSize: "24px" }}>
                  <Heart strokeWidth={3} />
                </span>
              </button>
             <div className="relative inline-block" ref={menuRef}>
      
      {/* Nút Avatar */}
      <div
        onClick={toggleMenu}
        className="bg-center bg-no-repeat bg-cover rounded-full size-10 border-2 border-white shadow-sm cursor-pointer hover:ring-2 hover:ring-gray-300 transition-all"
        style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAZCJXctLpVot0sNndJ_n88PWplpqfErAYBxhjyKuEFyzpVqzM0q-QEhhhKelYBZXtQuzTukcrh9QJlVsvuw5zQRjtx7FPCiFEi-M-_omZTS8NfM3F__UI4r56M2QUnEWQjujdXVGezT9q1iD_YRe3bHiyNsOnH0E7qhSFJPCry3HPr1XNXc58j68uD2qBcjga6QVTOf0LN1VY-DRe8p70sQ5-3ea3N-iDTXhbhUKHFJMl94OLjIcCuPvdoN7gsQ0lN10GhzvSyS4bo")' }}
      ></div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-100 z-50 overflow-hidden">
          <ul className="py-1 text-sm text-gray-700">
            <li>
             <button onClick={() => navigate('/homebuyer/order')} className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors">
                Đơn hàng của tôi
             </button>
            </li>
            <hr className="border-gray-100 my-1" />
            <li>
              <button 
                onClick={() => navigate('')}
                className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 transition-colors"
              >
                Đăng xuất
              </button>
            </li>
          </ul>
        </div>
      )}
      
    </div>
            </div>
          </div>
        </header>
      </div>
    </div>
  )
}

export default BuyerHeader;