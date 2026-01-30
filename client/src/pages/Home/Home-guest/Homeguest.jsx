import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bike, HandCoins, PiggyBank, Search, ShieldCheck, ShoppingCart, Tag, ChevronDown, HeartPlus, MapPinCheckInside } from 'lucide-react';

export default function Homeguest() {
  const [email, setEmail] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const bikes = [
    {
      id: 1,
      name: 'Trek Emonda SL 6',
      price: '45.000.000',
      originalPrice: null,
      location: 'Hà Nội',
      category: 'Road Bike',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZ3cmHcUvP4oLBORy1QIrMe4gvOqrWLZLvkWFihax_ifCxiSdVnm8q1VeToLBuC6iO_o3NPCK--vwaC6_KvgoRCwbNNw3nbGIFDS4iCCGhTsZxthOSJZouS5RkovvmOUjfx983iB2kjkd3W7zgemdFX7LZu29itqOojfSG8yu24dKjZmUyHaW63T0Qjxq--AGbBSMFYzMSEU5486y2mSXVp36T_A4lz7Si7uLIMN78qAmOKBtS99NCbMTPC6GCttSTNIKt1cbFdwtL',
      verified: true,
      seller: 'Minh Tuấn',
      sellerAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZmd1_9CE_qNo7K_CxWo73kVjaaY4NGoxrExj9_CA4orY4iwbDUCTwjeKKkMMAET_YrNONNgSlZGzpZBVRcwdc4RWa1_ckmfvV-eciPsCV_yRDHRrWGdD9f5I2ydf1QuRA3amUp1YV8CPecCarnXKo0igSvc8HdXa9oqSnSBTlKUhnr9vJlnEdl_gWJTYucq930QOlaAF8yMkif4BV8dQSZ9_XqWCfc_e2pqtCMOsiDK2mVVFgOcgr4SjcS9pASj_iSMTeOWMqYfNu',
      timeAgo: '2 giờ trước',
    },
    {
      id: 2,
      name: 'Giant TCR Advanced',
      price: '32.500.000',
      originalPrice: null,
      location: 'TP. Hồ Chí Minh',
      category: 'Road Bike',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCVDFbVEQ4s_x3lhU1ulmdAxoVRZs1JF2NuUcDBg0gyWxlmpmmoUGCmUF9s3ukAn-3dNqaa5Zp8cMzBKZPY-yqm0WxJQVAvh1IurUp35LVIlPZyqMfEfGsFqEX0gBJAhBQ2K1xIkq-G2Cc9EAIdafHxPsVyhyc19asWHV-V_ldurMsok9DqQYZTRGEKQMzu3cEOX6yGlgqVDw0v3sXebtNrOMf7CCuiwWzMRaq2HbN9KGSTajTg9BZJfyTzWd-IdzPkX66OajTA87oQ',
      verified: false,
      seller: 'Lan Anh',
      sellerAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD8U6cDYPZWWwhg7BA_SHn8U_6f7Nt138M6kuaNW1l1ZG3GOm0RmfeXOAzPbFSlPZiIHaaQf-ogT5cxUfwsfhgRjctNm9xpjtXueqkKO2-1Yu7IbRK1a7Vx1Y_fo5uk5lv6mgtRf3WqndKk0hx9Mu-GZ2cklnyqhkC208tIfPAJauNM16UAx8gfAKsmlAKXkoUwoNlMfhzwHB-RovjPjVVrXGyvxt2f3yUxN6RlKTTgAt5vDh5boqK8MlTlx0nmprUAWMvPBplWLRPT',
      timeAgo: '5 giờ trước',
    },
    {
      id: 3,
      name: 'Specialized Rockhopper',
      price: '12.800.000',
      originalPrice: '15.000.000',
      location: 'Đà Nẵng',
      category: 'MTB',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDNDl852RARv-7HnSEkSdXpnQx-9R9jAdiVaR4qT1XOyFYpDH4CajO4iOuktJNoM0PYlkj6aotDMy5cgyicJTH03UubeuK3Pa4tLREmB7yTVCtDVgSWCQjXl5RIg8kTBhsY7uDV321Nw64JCxCZMrM4Rnd8xq_S2qMKtvqeAN3ZzZPIuY1TXV_Ac4plKo_EGZpFCJgYU0zcNnrFAstKL5oAmQbxvKOxbDc_PlxrQ0EULosJCeBnavi4PF2F-0U9wm2wHtaoPJGzrW30',
      verified: false,
      seller: 'Hoàng Nam',
      sellerAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCnW3velB_pHgycS6J9MJiNvk2it4SUlbXzqYziKsjSCSR8pSmj21gpdFeoN_LmEhGNPr_V577jEa_HuhJMrvrf9C50g4Ml1J06ihJ3zEj3pA9c5pS665zTkXZyZatSa9PvDjRtAeYd9oofFuttSDH4g7Z6YNFSFvewD-x9RuJ5hWBqy0TIpciXunWaLdlUa0QePV-4txDNjuZxLa5_tbh9ljYSKLGZyTSZgknYnaiE3cJFlbY4U9zZBZRqHqhsbAj2o4abzXtd2mER',
      timeAgo: '1 ngày trước',
      discount: true,
    },
    {
      id: 4,
      name: 'Raleigh Vintage 1985',
      price: '8.500.000',
      originalPrice: null,
      location: 'Hà Nội',
      category: 'Touring',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDPCVAQNSGqS-dZ33_th7c_nrL-Tt3M8EYbV_THY1_L6dfpHxLGgIiAkL69EpGLhVjpiBT4DgTCc7JY2UJBDdf_KmNNqUmml3-cVg-HNi1YGm8FA79bqTje-eKHJxVfhhuh1f9PiSVbLEz5I7t3koPfWwLS_Z0xoz-gIGsRaDpxs-majKsd-1i-n4Gy9Tmdn7B1jovomF5WYhpO8_2NCB7GYmw1kBxwk6CVSpwfO7tRJ2bOPHhvKwxPM4GXG5HTCJW26W057_nmCyF4',
      verified: false,
      seller: 'Thu Hà',
      sellerAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC81pky6XMP_CyshqcEUyN2PYH8i2kKyBeYhyRuX_5Ef22M8oe-OLB8W61GqWkpe4yEYPNwIsaLkhgY77Ih9Nr8tWpVyxR3sV_DUyGaUkDJejhMhRHf74fcRI5juwGMh5UuU5Ta6eHDg69gDQLBRw4mW0k4M8zANg346gRocdmwlxe9JBsHezz91zqjd62N-V3tdXauGDIKonW13NY3HXJFQSM1Ph9Wa6C41tnAorvEvwxqM3iNvlzB2iZJEQguuQ7huhCnjlTwdT33',
      timeAgo: '3 ngày trước',
    },
  ];

  const trustItems = [
    {
      icon: <ShieldCheck strokeWidth={3}  />,
      title: 'Người bán đã xác thực',
      description: 'Mọi người bán trên BikeMarket đều phải xác minh danh tính để đảm bảo an toàn cho giao dịch.',
    },
    {
      icon: <Search strokeWidth={3} />,
      title: 'Kiểm duyệt tin đăng',
      description: 'Các tin đăng bán xe được đội ngũ kỹ thuật kiểm tra thông tin kỹ càng trước khi hiển thị.',
    },
    {
      icon: <HandCoins strokeWidth={3}  />,
      title: 'Minh bạch giá cả',
      description: 'So sánh giá dễ dàng và không có phí ẩn. Giao dịch trực tiếp, không qua trung gian.',
    },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  const handleNewsletterSignup = (e) => {
    e.preventDefault();
    console.log('Signup email:', email);
    setEmail('');
  };

  return (
    <div className={`flex flex-col min-h-screen w-full transition-colors duration-200 ${darkMode ? 'bg-primary-dark text-white' : 'bg-background-light text-gray-900'}`}>
      {/* Header */}
      <header className={`sticky top-0 z-50 w-full transition-colors duration-200 border-b ${darkMode ? 'bg-surface-dark border-gray-700' : 'bg-surface-light border-gray-200'}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-10 py-3 gap-8">
          <div className="p-6 pb-2 pl-0">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-600 text-white shadow-sm">
                <Bike size={20} />
              </div>
              <h1 className="text-emerald-700 text-lg font-extrabold tracking-tight">BikeMarket</h1>
            </div>
          </div>

          <div className="flex items-center gap-6 ml-auto">
            <nav className="hidden md:flex items-center gap-8">
              <a href="#" className={`text-sm font-medium transition-colors ${darkMode ? 'text-gray-300 hover:text-primary' : 'text-gray-900 hover:text-primary'}`}>Mua xe</a>
              <a href="#" className={`text-sm font-medium transition-colors ${darkMode ? 'text-gray-300 hover:text-primary' : 'text-gray-900 hover:text-primary'}`}>Bán xe</a>
              <a href="#" className={`text-sm font-medium transition-colors ${darkMode ? 'text-gray-300 hover:text-primary' : 'text-gray-900 hover:text-primary'}`}>Cộng đồng</a>
            </nav>

            <div className="flex gap-3">
              <Link to="/login" className={`flex items-center justify-center h-10 px-4 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${darkMode ? 'bg-surface-dark hover:bg-gray-700 text-white' : 'bg-gray-100 hover:bg-gray-200 text-black'}`}>Đăng nhập</Link>
              <Link to="/login?tab=register" className="flex items-center justify-center h-10 px-4 rounded-lg text-sm font-bold bg-primary hover:bg-primary-dark text-black shadow-md transition-all whitespace-nowrap">Đăng ký</Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 flex-col items-center w-full">
        {/* Hero Section */}
        <section className="w-full max-w-7xl mx-auto px-4 md:px-10 py-6 relative">
          <div className="rounded-2xl overflow-hidden min-h-[24rem] flex flex-col items-center justify-center text-center bg-cover bg-center" style={{ backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.6) 100%), url('https://lh3.googleusercontent.com/aida-public/AB6AXuBcM5ouA-k4id5Vz7haRJDbIgt6EHl7O0PdBbbXCrWUsFORIKj-MltmkLut6w3yTL_oahEP-68DtdBPXvjW9D2nXxAfLJQ9CKM2JOflgWpH6NDntKnmxQAu-3PWduJHXH1_JMBX2sO81Qmro1k6Zi5PLLhYzHjA-tQtri4qMsKxHKmib2H4hD3X7OKufq4l7pZ2PR60Cs1HKUsmVMHU_A18CTTrztArq1QbVAllAzTTbLlwSevIOHwEBFyewbeYd2iNES4_QqoeILDq')" }}>
            <div className="relative z-10 flex flex-col items-center max-w-4xl p-4">
              <h1 className="text-white text-2xl md:text-5xl font-black leading-tight -tracking-wide mb-4 drop-shadow-md">Mua bán xe đạp thể thao cũ:<br />An toàn & Minh bạch</h1>
              <h2 className="text-gray-100 text-base md:text-xl font-medium leading-relaxed max-w-2xl mb-8 drop-shadow-md">
                Nền tảng kết nối đam mê xe đạp với quy trình kiểm duyệt uy tín nhất Việt Nam.
                Tìm chiếc xe mơ ước của bạn ngay hôm nay.
              </h2>
              <div className="flex flex-wrap gap-4 justify-center">
                <button className="flex items-center gap-2 h-12 px-8 rounded-lg text-base font-bold bg-primary hover:bg-primary-dark text-gray-900 shadow-lg transform hover:scale-105 transition-all whitespace-nowrap">
                  <span><ShoppingCart /></span>
                  <span>Mua xe ngay</span>
                </button>
                <button className="flex items-center gap-2 h-12 px-8 rounded-lg text-base font-bold bg-white/90 hover:bg-white text-gray-900 backdrop-blur-sm shadow-lg transform hover:scale-105 transition-all whitespace-nowrap">
                  <span><Tag /></span>
                  <span>Đăng bán xe</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Search & Filter Bar - ĐÃ SỬA THEO YÊU CẦU STYLE MỚI */}
        <section className="w-75 max-w-7xl mx-auto -mt-8 mb-12 px-4 md:px-10 relative z-20">
          <div className={`rounded-xl shadow-lg border transition-colors ${darkMode ? 'bg-surface-dark border-gray-700' : 'bg-white border-gray-200'} p-6`}>

            {/* Hàng 1: Ô tìm kiếm (Style xám nhạt, không viền) */}
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 mb-6">
              <div className={`flex-1 relative flex items-center rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <span className={`absolute left-4 text-xl ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}><Search size={20} /></span>
                <input
                  type="text"
                  placeholder="Tìm kiếm theo tên xe, thương hiệu (ví dụ: Trek, Giant...)"
                  className="w-full h-12 pl-12 pr-4 bg-transparent border-none outline-none text-sm placeholder-gray-500 text-gray-900 rounded-lg"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button type="submit" className="h-12 px-8 bg-primary hover:bg-emerald-500 text-gray-900 rounded-lg font-bold whitespace-nowrap transition-colors text-sm shadow-sm">Tìm kiếm</button>
            </form>

            {/* Hàng 2: Bộ lọc (Style viên thuốc - Pill shape) */}
            <div className="flex flex-wrap items-center gap-3">
              <span className={`text-sm font-bold mr-2 ${darkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>Bộ lọc nhanh:</span>

              <button className={`flex items-center gap-2 h-10 px-5 rounded-full text-sm font-medium transition-all ${darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}`}>
                <span>Loại xe: Tất cả</span>
                <ChevronDown size={14} />
              </button>

              <button className={`flex items-center gap-2 h-10 px-5 rounded-full text-sm font-medium transition-all ${darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}`}>
                <span>Khoảng giá</span>
                <ChevronDown size={14} />
              </button>

              <button className={`flex items-center gap-2 h-10 px-5 rounded-full text-sm font-medium transition-all ${darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}`}>
                <span>Thương hiệu</span>
                <ChevronDown size={14} />
              </button>

              <button className={`flex items-center gap-2 h-10 px-5 rounded-full text-sm font-medium transition-all ${darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}`}>
                <span>Địa điểm</span>
                <ChevronDown size={14} />
              </button>
            </div>

          </div>
        </section>

        {/* Trust Assurance Section */}
        <section className={`w-full py-16 md:py-20 px-4 md:px-10 transition-colors ${darkMode ? 'bg-surface-dark' : 'bg-white'}`}>
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {trustItems.map((item, index) => (
              <div key={index} className={`flex flex-col items-center text-center p-6 rounded-xl transition-colors ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-50'}`}>
                <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-4 ${darkMode ? 'bg-primary/30 text-primary' : 'bg-primary/20 text-primary'}`}>{item.icon}</div>
                <h3 className={`text-lg font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{item.title}</h3>
                <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Listings */}
        <section className="w-full max-w-7xl mx-auto px-4 md:px-10 py-12">
          <div className="flex items-center justify-between mb-8 px-2">
            <h2 className={`text-2xl md:text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Xe nổi bật hôm nay</h2>
            <a href="#" className="text-primary font-bold flex items-center gap-1 hover:underline transition-all">
              Xem tất cả <span>→</span>
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {bikes.map((bike) => (
              <div key={bike.id} className={`rounded-xl overflow-hidden shadow-md border transition-all hover:shadow-lg hover:-translate-y-1 flex flex-col ${darkMode ? 'bg-surface-dark border-gray-700' : 'bg-white border-gray-200'}`}>
                <div className="relative aspect-video overflow-hidden bg-gray-200">
                  {bike.verified && (
                    <div className="absolute top-3 left-3 text-xs font-bold px-2 py-1 rounded bg-primary text-gray-900 z-10 shadow-md">Đã kiểm định</div>
                  )}
                  {bike.discount && (
                    <div className="absolute top-3 left-3 text-xs font-bold px-2 py-1 rounded bg-red-500 text-white z-10 shadow-md">Giảm giá sâu</div>
                  )}
                  <button className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-lg transition-all z-11 ${darkMode ? 'bg-white/30 hover:bg-white hover:text-red-500' : 'bg-white/50 hover:bg-white hover:text-red-500'}`}><HeartPlus /></button>
                  <img
                    src={bike.image}
                    alt={bike.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>

                <div className="p-4 flex flex-col flex-1 gap-2">
                  <h3 className={`font-bold text-lg truncate transition-colors hover:text-primary ${darkMode ? 'text-white' : 'text-gray-900'}`}>{bike.name}</h3>
                  <p className={`font-bold text-xl mb-3 ${darkMode ? 'text-primary' : 'text-primary'}`}>
                    {bike.price} ₫
                    {bike.originalPrice && (
                      <span className="text-xs text-gray-400 line-through font-normal ml-2">{bike.originalPrice} ₫</span>
                    )}
                  </p>
                  <div className={`flex items-center gap-2 text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-black'}`}>
                    
                    <span className="flex items-center gap-1">
                      <MapPinCheckInside size={24} />
                      {bike.location}
                    </span>

                    <span>•</span>
                    <span>{bike.category}</span>
                  </div>

                  <div className={`flex items-center gap-3 pt-3 border-t mt-auto ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <img src={bike.sellerAvatar} alt={bike.seller} className="w-8 h-8 rounded-full object-cover bg-gray-300 flex-shrink-0" />
                    <span className={`text-sm font-medium flex-1 ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>{bike.seller}</span>
                    <span className="text-xs text-gray-400 ml-auto">{bike.timeAgo}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <button className={`px-8 py-3 rounded-lg font-bold transition-all border ${darkMode ? 'bg-surface-dark border-gray-600 text-white hover:bg-gray-700' : 'bg-white border-gray-300 text-gray-900 hover:bg-gray-100'}`}>Xem thêm xe khác</button>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className={`w-full py-16 md:py-20 px-4 md:px-10 mt-8 transition-colors ${darkMode ? 'bg-surface-dark' : 'bg-background-light'}`}>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className={`text-2xl md:text-3xl font-black mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Không tìm thấy chiếc xe ưng ý?</h2>
            <p className={`mb-8 max-w-2xl mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Đăng ký nhận thông báo để biết ngay khi có chiếc xe phù hợp với nhu cầu của bạn được đăng bán.
            </p>
            <form onSubmit={handleNewsletterSignup} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Nhập email của bạn"
                className={`flex-1 h-12 px-4 rounded-lg text-sm transition-all outline-none ${darkMode ? 'bg-gray-800 text-white placeholder-gray-500 focus:ring-2 focus:ring-primary' : 'bg-white text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-primary'}`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className={`h-12 px-6 rounded-lg font-bold transition-opacity whitespace-nowrap text-sm ${darkMode ? 'bg-primary text-gray-900 hover:opacity-90' : 'bg-gray-900 text-white hover:opacity-90'}`}>Đăng ký nhận tin</button>
            </form>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className={`transition-colors border-t ${darkMode ? 'bg-surface-dark border-gray-700' : 'bg-surface-light border-gray-200'} p-8 md:p-10 mt-auto`}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 md:gap-0 items-center md:justify-between">
          <div className="p-6 pb-2 pl-0">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-600 text-white shadow-sm">
                <Bike size={20} />
              </div>
              <h1 className="text-emerald-700 text-lg font-extrabold tracking-tight">BikeMarket</h1>
            </div>
          </div>

          <nav className="flex gap-8 flex-wrap justify-center">
            <a href="#" className={`text-sm transition-colors ${darkMode ? 'text-gray-400 hover:text-primary' : 'text-gray-500 hover:text-primary'}`}>Về chúng tôi</a>
            <a href="#" className={`text-sm transition-colors ${darkMode ? 'text-gray-400 hover:text-primary' : 'text-gray-500 hover:text-primary'}`}>Quy chế hoạt động</a>
            <a href="#" className={`text-sm transition-colors ${darkMode ? 'text-gray-400 hover:text-primary' : 'text-gray-500 hover:text-primary'}`}>Chính sách bảo mật</a>
            <a href="#" className={`text-sm transition-colors ${darkMode ? 'text-gray-400 hover:text-primary' : 'text-gray-500 hover:text-primary'}`}>Liên hệ</a>
          </nav>

          <div className={`text-sm text-center md:text-right ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            © 2026 BikeMarket. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}