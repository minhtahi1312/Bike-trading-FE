import React, { useState } from "react";
import "./Homebuyer.css";

export default function Homebuyer() {
  const [sortBy, setSortBy] = useState("Mới nhất");
  const [verifiedOnly, setVerifiedOnly] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  // Bikes data
  const bikes = [
    {
      id: 1,
      name: "Specialized Tarmac SL7 Expert",
      price: "85.000.000 đ",
      size: "54",
      location: "TP.HCM",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDThrm3THpCEaUG5eYcy9oyRECfjRd2zq0_ZKvAu5_tys_rovBsdeN87NdegZZwjyBhb1So34IGEESD1tQMLj_n8KdVI29BvBZ7y3See-YQWTRo5RwYRpmwM3RYmBOBhvQdUb0og53QRhUpb9SKAcc_t-1hCcv9epubiJHvLrLlHFCLeJBQjYOWd_OOlCxjMt7EeoWoCVgOqYgIrYzy1AOkENJ6Zxvo1xuZgeRff5zr2gMsLQ6Mq7VuULXNtFj2KuFYy_GptMEBzKEu",
      verified: true,
      newTag: false,
    },
    {
      id: 2,
      name: "Giant TCR Advanced Pro Disc",
      price: "42.500.000 đ",
      size: "M",
      location: "Hà Nội",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDydEk8Ij49uUNqtj1Ba-FGvhDr4tI3WvC-d2emi-UGeJqZOSH9sqX7tJG_QKCVa2JWudDREyNvw6UPPhj4XxywD_LcWAy1TghknAJtzmQrayZimmfj0btmt4WqJcaALifpZPGuN-eEIQsulaUScScDjm7hsVIOQbzCADEgoL4kdGWcm4lOVndccAYp-yvfDL5dgzqwApw6rhqBkb7D3t1qmvz3KwaHypAzQA88HTSL6asp9JZUhFmgmPxSojDMDBE_oY8uZyQyBWfJ",
      verified: false,
      newTag: true,
    },
    {
      id: 3,
      name: "Bianchi Oltre XR4 Disc",
      price: "110.000.000 đ",
      size: "55",
      location: "Đà Nẵng",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuD_MMM8dCnT0jddY4OMuBlFsKXSHpgy8t6hKGvd6YBJIc6YIKYD4A4NZjezZUmpZfWjp-Pp0Jmc72WthRGiEYm3C6KhXGHj2kczuiQyw7rPnlfFJbjKF1cFxTx5PbH4MSkzssheaPtq3zh4byl2gZnw2pV_6qLDS9XCImOZq9GllVSXa0A4ajkipeSjq-a7oAJoTi0cykQLResBfuMFE1H8xRD1FITnYWda7mmBrSZf1gov1RbOdkXV_TkOCzSowKCdKLF1H_aj4_rO",
      verified: true,
      newTag: false,
    },
    {
      id: 4,
      name: "Vintage Steel Peugeot Frame",
      price: "8.500.000 đ",
      size: "L",
      location: "Hà Nội",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDL8RCdjbQNlmJg9Cn_6VrpgwqeKPl9IZKJrR74RvUFCskkLzjfMbJJrUTs4FBXnGgVUkzRJb_7CNWbNtbR-ULleHG4YT-8BtmsTyjc-9Ut3a6tUN2gLGS4i06_Mw9LGX3MWG9T665GVvYsJfIXFvI9uctXmZBsFwsCIEbfx9vldiVzZSCPrhNteOtLzblmM5NQKck136U2xkFxfTclBkQXdqMBEC9cz_50NtKCtYJJSpMRdLUkZH26ZPDSFNEjEOHiYF0nNiadzzXx",
      verified: false,
      newTag: false,
    },
    {
      id: 5,
      name: "Trek Marlin 7 - 2022",
      price: "15.000.000 đ",
      size: "M",
      location: "Cần Thơ",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCWzTYA4oBdnOFaRua62jE9o1Z9V7-hJZFh_KK8RLMewKqvwxtWTYK_yv8cLAlCggTpazyXidPpViQS13jB7ZZ51gYE4-Mn-HZsiVcY-Cbjt1C2VshxdaEXZv2srEcRxCBUv962DTmCKUhFNrIR4NlaBZXWa2_jRjRIgUlyQQhcFzyIG3fZwn6Q_dWGhI8MpkrUj4QG41Hbd4Ef7_kf9HvDJQZ-SgX8h3e_nQbABfs7VKoQlWEbwlpRftweOIbuISwD_L_oxLIzIl9Q",
      verified: true,
      newTag: false,
    },
    {
      id: 6,
      name: "Custom Fixed Gear 8bar",
      price: "18.000.000 đ",
      size: "52",
      location: "TP.HCM",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAAA3WAHO0MKPDevVVntdTbEeS1BwBwBfoPrcOyuWWm-n3IyFqdrmfTFD1DrHa0ZSPLSqChHJUfhmgxdrNW52K-sQQcQxLM9tbDCavXM_YFgORB67Rg9SliUWOBv1h8bLjQShyn86M89JzjjyAlmWmfk9HPIPfSZPTTbhifhORuIW36IpPtNe0jGISeI-VySDBm-Tjchi1yfVQfyowsz2r4_uPTdpwU4ztkAGsIiw9kPv-OxDt9A1KtkTd_Tpw1bWvvGoBrxj0XcuGy",
      verified: false,
      newTag: false,
    },
  ];

  // Watched bikes data
  const watchedBikes = [
    {
      id: 1,
      name: "Giant Escape 2",
      price: "12.000.000 đ",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBC3GqtGutypL6WKw1pCEaqFm0mDuJs8cJvf7pCDDhDxYVUIllstsmuM-TgSALxgh3cHwA-154ctGfPILFe98NApIg3Ah75-DnrCgkRlaLZGFkqqeudLLcbvBGE7ipJzvUd6pOogqJF8Snih6dtDZsVpn2WtT2ECbklqxQnmDTfquMCUhmnetryNVPTnLE_Dy-y17nOoCkyFVdVuIHwY9HG3XqNzh2pCKf127uXb9hiUfE0aqlFJur4Glh3bpxYLayOsRxfi05mmey9",
    },
    {
      id: 2,
      name: "Cannondale Synapse",
      price: "18.500.000 đ",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDLxhusgdDVG80WQ34iY3MPMrM9HkoTYHEk4BScilLSHY863_bhfE-n6MESa9yl6yV7hUExIqGevk8UgZ1TxvPLxP8wbWOGa2W5mSbaclVgJRKsw1DWIetmZW-ZqRfqSVHMx92AEfgTSwxYabTr853W6Yv1jFAEPH6G7MfjddHtV0Lpqizg7S0zmdmuCsNp7h4CkJIrIHe5jNw0JMgccIynMTrdxZT0Tptk9riJQ0wvOZ_4g_ZKTviFt0LGLTY9C39uYJCfBpBvsfjA",
    },
  ];

  return (
    <div className="homebuyer-page">
      {/* Header */}
      <div className="header-wrapper">
        <header className="header">
          <div className="header-left">
            <div className="logo">
              <span className="material-symbols-outlined filled">pedal_bike</span>
              <h2>BikeSafe</h2>
            </div>
            <div className="search-box">
              <span className="material-symbols-outlined">search</span>
              <input
                type="text"
                placeholder="Tìm kiếm xe đạp mơ ước..."
              />
            </div>
          </div>
          <div className="header-right">
            <nav className="nav-menu">
              <a href="#" className="nav-link active">Mua xe</a>
              <a href="#" className="nav-link">Tin tức</a>
              <a href="#" className="nav-link">Hỗ trợ</a>
              <a href="#" className="nav-link">Đơn hàng của tôi</a>
            </nav>
            <div className="header-icons">
              <button className="icon-btn notification-btn">
                <span className="material-symbols-outlined">notifications</span>
                <span className="notification-dot"></span>
              </button>
              <button className="icon-btn">
                <span className="material-symbols-outlined">favorite</span>
              </button>
              <div
                className="avatar"
                style={{
                  backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAZCJXctLpVot0sNndJ_n88PWplpqfErAYBxhjyKuEFyzpVqzM0q-QEhhhKelYBZXtQuzTukcrh9QJlVsvuw5zQRjtx7FPCiFEi-M-_omZTS8NfM3F__UI4r56M2QUnEWQjujdXVGezT9q1iD_YRe3bHiyNsOnH0E7qhSFJPCry3HPr1XNXc58j68uD2qBcjga6QVTOf0LN1VY-DRe8p70sQ5-3ea3N-iDTXhbhUKHFJMl94OLjIcCuPvdoN7gsQ0lN10GhzvSyS4bo')",
                }}
              ></div>
            </div>
          </div>
        </header>
      </div>

      {/* Hero Banner */}
      <div className="hero-banner">
        <div className="hero-content">
          <div className="trust-badge">
            <span className="material-symbols-outlined filled">verified_user</span>
            <span>Đối tác tin cậy</span>
          </div>
          <h1>Chào mừng trở lại, Minh!</h1>
          <p>Có 5 xe đạp mới phù hợp với bộ lọc tìm kiếm "Road bike size 52" của bạn.</p>
          <button className="hero-btn">Xem gợi ý mới</button>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-container">
        <div className="content-wrapper">
          {/* Sidebar */}
          <aside className="sidebar">
            {/* Current Order Card */}
            <div className="card">
              <div className="card-header">
                <h3>Đơn hàng hiện tại</h3>
                <a href="#" className="link">Chi tiết</a>
              </div>
              <div className="order-content">
                <div className="order-image"></div>
                <div className="order-info">
                  <p className="order-name">Trek Madone SL 6</p>
                  <p className="order-id">Mã đơn: #882910</p>
                  <div className="order-status">
                    <span className="status-dot"></span>
                    Đang vận chuyển
                  </div>
                </div>
              </div>
              <div className="progress-section">
                <div className="progress-header">
                  <span>Tiến độ giao hàng</span>
                  <span className="primary">75%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: "75%" }}></div>
                </div>
                <p className="progress-text">Dự kiến: 25/10/2023</p>
              </div>
            </div>

            {/* Watched Bikes Card */}
            <div className="card">
              <div className="card-header">
                <h3>Xe đang theo dõi</h3>
                <a href="#" className="link">Xem tất cả (4)</a>
              </div>
              <div className="watched-list">
                {watchedBikes.map((bike) => (
                  <div key={bike.id} className="watched-item">
                    <div
                      className="watched-image"
                      style={{ backgroundImage: `url('${bike.image}')` }}
                    ></div>
                    <div className="watched-info">
                      <h4>{bike.name}</h4>
                      <p>{bike.price}</p>
                    </div>
                    <button className="favorite-btn filled">
                      <span className="material-symbols-outlined filled">favorite</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust Card */}
            <div className="trust-card">
              <div className="trust-content">
                <h3>Mua xe an tâm</h3>
                <p>
                  Mọi chiếc xe có nhãn "Đã kiểm định" đều được chuyên gia của chúng tôi
                  xác nhận chất lượng.
                </p>
                <button className="trust-btn">Tìm hiểu thêm</button>
              </div>
              <div className="trust-icon">
                <span className="material-symbols-outlined">verified</span>
              </div>
            </div>
          </aside>

          {/* Main Area */}
          <main className="main-area">
            {/* Filters Bar */}
            <div className="filters-bar">
              <div className="filters-left">
                <button className="filter-btn">
                  <span className="material-symbols-outlined">tune</span>
                  Bộ lọc
                </button>
                <div className="divider"></div>
                <label className="verified-toggle">
                  <input
                    type="checkbox"
                    checked={verifiedOnly}
                    onChange={(e) => setVerifiedOnly(e.target.checked)}
                  />
                  <div className="toggle-switch"></div>
                  <span className="material-symbols-outlined filled">verified_user</span>
                  <span>Đã kiểm định</span>
                </label>
                <div className="bike-types">
                  <button className="type-btn">Road</button>
                  <button className="type-btn">MTB</button>
                  <button className="type-btn">Touring</button>
                </div>
              </div>
              <div className="filters-right">
                <span>Sắp xếp:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="sort-select"
                >
                  <option>Mới nhất</option>
                  <option>Giá thấp đến cao</option>
                  <option>Giá cao đến thấp</option>
                </select>
              </div>
            </div>

            {/* Bikes Grid */}
            <div className="bikes-grid">
              {bikes.map((bike) => (
                <div key={bike.id} className="bike-card">
                  <div className="bike-image-wrapper">
                    {bike.verified && (
                      <div className="badge verified-badge">
                        <span className="material-symbols-outlined filled">verified_user</span>
                        ĐÃ KIỂM ĐỊNH
                      </div>
                    )}
                    {bike.newTag && (
                      <div className="badge new-badge">
                        MỚI ĐĂNG
                      </div>
                    )}
                    <button className="favorite-btn">
                      <span className="material-symbols-outlined">favorite</span>
                    </button>
                    <div
                      className="bike-image"
                      style={{ backgroundImage: `url('${bike.image}')` }}
                    ></div>
                  </div>
                  <div className="bike-info">
                    <h3>{bike.name}</h3>
                    <p className="price">{bike.price}</p>
                    <div className="bike-details">
                      <div className="detail">
                        <span className="material-symbols-outlined">straighten</span>
                        <span>Size {bike.size}</span>
                      </div>
                      <div className="detail">
                        <span className="material-symbols-outlined">location_on</span>
                        <span>{bike.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="pagination">
              <button className="pagination-btn">
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button className="pagination-page active">1</button>
              <button className="pagination-page">2</button>
              <button className="pagination-page">3</button>
              <span className="pagination-dots">...</span>
              <button className="pagination-page">12</button>
              <button className="pagination-btn">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
