import React, { useState } from 'react';
import './Homeguest.css';

export default function Homeguest() {
  const [email, setEmail] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBikeType, setSelectedBikeType] = useState('all');
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
      icon: '✓',
      title: 'Người bán đã xác thực',
      description: 'Mọi người bán trên BikeMarket đều phải xác minh danh tính để đảm bảo an toàn cho giao dịch.',
    },
    {
      icon: '🔍',
      title: 'Kiểm duyệt tin đăng',
      description: 'Các tin đăng bán xe được đội ngũ kỹ thuật kiểm tra thông tin kỹ càng trước khi hiển thị.',
    },
    {
      icon: '💰',
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
    <div className={`homeguest-page ${darkMode ? 'dark-mode' : ''}`}>
      {/* Header */}
      <header className="header">
        <div className="header-container">
          <div className="logo">
            <span className="logo-icon">🚲</span>
            <h2 className="logo-text">BikeMarket</h2>
          </div>

<div className="nav-and-buttons">

          <nav className="nav-menu">
            <a href="#" className="nav-link">Mua xe</a>
            <a href="#" className="nav-link">Bán xe</a>
            <a href="#" className="nav-link">Cộng đồng</a>
          </nav>

          <div className="header-buttons">
            <button className="btn-login">Đăng nhập</button>
            <button className="btn-signup">Đăng ký</button>
          </div>
</div>

        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">Mua bán xe đạp thể thao cũ:<br />An toàn & Minh bạch</h1>
            <h2 className="hero-subtitle">
              Nền tảng kết nối đam mê xe đạp với quy trình kiểm duyệt uy tín nhất Việt Nam. 
              Tìm chiếc xe mơ ước của bạn ngay hôm nay.
            </h2>
            <div className="hero-buttons">
              <button className="btn-hero btn-primary">
                <span>🛒</span>
                <span>Mua xe ngay</span>
              </button>
              <button className="btn-hero btn-secondary">
                <span>💼</span>
                <span>Đăng bán xe</span>
              </button>
            </div>
          </div>
        </section>

        {/* Search & Filter Bar */}
        <section className="search-section">
          <div className="search-container">
            <form onSubmit={handleSearch} className="search-form">
              <div className="search-input-wrapper">
                <span className="search-icon">🔍</span>
                <input
                  type="text"
                  placeholder="Tìm kiếm theo tên xe, thương hiệu (ví dụ: Trek, Giant...)"
                  className="search-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button type="submit" className="btn-search">Tìm kiếm</button>
            </form>

            <div className="quick-filters">
              <span className="filters-label">Bộ lọc nhanh:</span>
              <button className="filter-chip">
                <span>Loại xe: Tất cả</span>
                <span>▼</span>
              </button>
              <button className="filter-chip">
                <span>Khoảng giá</span>
                <span>▼</span>
              </button>
              <button className="filter-chip">
                <span>Thương hiệu</span>
                <span>▼</span>
              </button>
              <button className="filter-chip">
                <span>Địa điểm</span>
                <span>▼</span>
              </button>
            </div>
          </div>
        </section>

        {/* Trust Assurance Section */}
        <section className="trust-section">
          <div className="trust-container">
            {trustItems.map((item, index) => (
              <div key={index} className="trust-item">
                <div className="trust-icon">{item.icon}</div>
                <h3 className="trust-title">{item.title}</h3>
                <p className="trust-description">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Listings */}
        <section className="featured-section">
          <div className="featured-header">
            <h2 className="featured-title">Xe nổi bật hôm nay</h2>
            <a href="#" className="featured-link">
              Xem tất cả <span>→</span>
            </a>
          </div>

          <div className="bikes-grid">
            {bikes.map((bike) => (
              <div key={bike.id} className="bike-card">
                <div className="bike-image-wrapper">
                  {bike.verified && (
                    <div className="bike-badge verified-badge">Đã kiểm định</div>
                  )}
                  {bike.discount && (
                    <div className="bike-badge discount-badge">Giảm giá sâu</div>
                  )}
                  <button className="favorite-btn">♡</button>
                  <img
                    src={bike.image}
                    alt={bike.name}
                    className="bike-image"
                  />
                </div>

                <div className="bike-info">
                  <h3 className="bike-name">{bike.name}</h3>
                  <p className="bike-price">
                    {bike.price} ₫
                    {bike.originalPrice && (
                      <span className="original-price">{bike.originalPrice} ₫</span>
                    )}
                  </p>
                  <div className="bike-meta">
                    <span>📍 {bike.location}</span>
                    <span>•</span>
                    <span>{bike.category}</span>
                  </div>

                  <div className="bike-seller">
                    <img src={bike.sellerAvatar} alt={bike.seller} className="seller-avatar" />
                    <span className="seller-name">{bike.seller}</span>
                    <span className="time-ago">{bike.timeAgo}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="featured-footer">
            <button className="btn-load-more">Xem thêm xe khác</button>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="newsletter-section">
          <div className="newsletter-container">
            <h2 className="newsletter-title">Không tìm thấy chiếc xe ưng ý?</h2>
            <p className="newsletter-subtitle">
              Đăng ký nhận thông báo để biết ngay khi có chiếc xe phù hợp với nhu cầu của bạn được đăng bán.
            </p>
            <form onSubmit={handleNewsletterSignup} className="newsletter-form">
              <input
                type="email"
                placeholder="Nhập email của bạn"
                className="newsletter-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="btn-newsletter">Đăng ký nhận tin</button>
            </form>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-left">
            <div className="footer-logo">
              <span className="logo-icon">🚲</span>
              <span className="logo-text">BikeMarket</span>
            </div>
          </div>

          <nav className="footer-links">
            <a href="#" className="footer-link">Về chúng tôi</a>
            <a href="#" className="footer-link">Quy chế hoạt động</a>
            <a href="#" className="footer-link">Chính sách bảo mật</a>
            <a href="#" className="footer-link">Liên hệ</a>
          </nav>

          <div className="footer-copyright">
            © 2026 BikeMarket. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
