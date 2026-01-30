import React, { useState } from "react";
import "./Homeseller.css";

export default function Homeseller() {
  const messages = [
    {
      id: 1,
      name: "Minh Hoàng",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCLvtmGEUzyKIAXmsV1g8JRWpdEtN8dqsmCa8ipPSM7fqrJ0gG4f8sdGwNNbBAbvO0ZrsTIhF3a_cB777hcri2sIb4oU5RY-PvRzXPolnb0IwGcCYU0gleSm4Qq_MCI4sGBpZlQe1UQrvJVzoeKGVLIIC3PpVpsjh7efNT6Y-6nYIYyC_f6LqILCN7eldi-v0J1GLUoGcAlrYym393zD_EkKms9wAfcR6tmx7dlVeoG66zJC009fPPppfd_2I4X0xbQ6Y7NNZX4cPWE",
      content: "Xe này còn fix giá không shop?",
      time: "5p trước",
      unread: true,
    },
    {
      id: 2,
      name: "Thu Hà",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDP7CB2kGcEWHGUXkyYZ2nbi9sVhLoLE6s9UUztaoDgWwPKVw-fom56sgvSJFA5JahH59FH8bdsxeoyEPPb5WoFhXFYVjCOCunx54092yg1C72andVlz9GSlKr_fmJcszGfAi_J3mH8rNrh8UN8dNVuFtkZA_yGjx0g7lEZC-cQS458wPXqU45PVORjFiblSln43yV9sTaiig52z8b41VHmB9s-qHVJcMQueGLXWuD8oCb5AnmZjB3eCAdS4s2t8ffWHxV_OYULC2WA",
      content: "Đã gửi yêu cầu đặt hàng",
      time: "1h trước",
      unread: true,
    },
  ];

  // ===== STATE (giống tư duy Homebuyer) =====
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [orderFilter, setOrderFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const handleEditPost = () => {
    alert("Bạn vừa bấm Chỉnh sửa");
  };

  const handleBoostPost = () => {
    alert("Bạn vừa bấm Đẩy tin 🚀");
  };

  // ===== STATS DATA =====
  const stats = [
    {
      id: 1,
      label: "Tin đăng hiển thị",
      value: 12,
      note: "+2 hôm nay",
      type: "posts",
    },
    {
      id: 2,
      label: "Đơn chờ xử lý",
      value: 5,
      note: "+1 mới",
      type: "orders",
    },
    {
      id: 3,
      label: "Doanh thu tạm tính",
      value: "15.5tr ₫",
      note: "+12% tháng này",
      type: "revenue",
    },
    {
      id: 4,
      label: "Tin nhắn chưa đọc",
      value: 3,
      note: "",
      type: "messages",
    },
  ];

  // ===== ORDERS DATA (giống bikes[]) =====
  const orders = [
    {
      id: "#DH-2024",
      product: "Trek Marlin 7",
      customer: "Nguyễn Văn A",
      price: "12.500.000đ",
      status: "pending",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBYHKUb-OXY4LhuARv-D80YSszSzvNiTBpQuWHwV-gRzqpjWM-RxrxGvBn7v9zVwwXeKTuXWKRI7vcrF0Nvo75yMf-v4Qw4EZxoRP5keZ5YTumzmsOQyrp-C247lRr7DERCyY7NLVkXtQq08xDcsJorx6204U3Fk_5bf-aJ5lh0xWFGuESUg3lPCH9KXrFCl3kBq68n7BgLTqDqAOtUrHQNiKFTg1MtPnHZPzWWdDOMEsafN8wF4TBMerT50D6PnKWQ-9pPYkkNur2Q", // 👈 bạn gắn link thật
    },
    {
      id: "#DH-2023",
      product: "Giant Escape",
      customer: "Trần Thị B",
      price: "8.200.000đ",
      status: "shipping",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDoM2K0wCx3F8R5JWqaK0D4PF0-hgb5rJY-zKMqxsdZcHKnxu185GbgBw1del6odzPk1oIU12y1Ew8d0TFqfTD1GdUOgf2UJCFlLGgekWtN3FACvPmvNd0JMaoNk7IurHdgxp5wlRNfQmrogJHlD8_gNTi9_NN2RkmF4OWbH-e1kYm60usKQJEqivl7KyqzngDoHVsXA0XkM-DkDsHDptx9jobn-wy3M94-LNBPoB8EZn3oWYEU3x90Fk2t96shdfc15eiD8k71Eggc",
    },
    {
      id: "#DH-2022",
      product: "Asama Road",
      customer: "Lê Văn C",
      price: "5.500.000đ",
      status: "done",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDWpGkVnTEPfv8gdWtc9TJaCylIYisxHbAwLbRtYl51H4NEdTH6E3L0W4sQ-kI1Ye1HAaCnV4vZI3ZeWhTaNA9GNGbrq--I3Dkj9Qf0DuKafAk98sYnI8wyLGCSA0Q3OmHDRHZxPa2JFijEeBsSXH55lMzaZOqRDJdjaqCsEo3fxb-JNFYS7J-ywLYryRsbL7s4I0KNB5Ow04ALBtlVjo7b5N3l-yL5F12ehMeDJjryfGdCopCgSbCYjXvgm8hpL2phwnySpeK6fZ_O",
    },
  ];

  // ===== FEATURED POST (giống watchedBikes) =====
  const featuredPost = {
    name: "Specialized Rockhopper",
    price: "18.000.000đ",
    views: "1.2k",
    createdAt: "2 ngày trước",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAETyWklrNRjlP7ABOOjXV-lVYWeQMcA8nf_O6mGW8ZDpxmwEKv6kk2gFnY41tvpQfOYbY3VQdumO-1AtqhP8cbqw_OZrVr3qvV9MtsGenfBKRZZCyCVR1zqQCWgD4b4VMEHAlpD8nITEyG-N5kRO7dnSFUHzA6AORKVobwoRWipsKx-BErxZSrSxgJNpOupv4X-H-K9CifPwhuBwvdPvtW4srueBcy4k62lXIJDP-WUQv1UhbY0dKelv4PkLBGQm5Z5IZeM8LsKchH",
  };

  // ⚠️ TẠM THỜI return trống
  return (
    <div className="seller-layout">
      {/* ===== SIDEBAR ===== */}
      <aside className="seller-sidebar">
        {/* Logo */}
        <div className="seller-logo">
          <span className="material-symbols-outlined filled">store</span>
          <h2>BikeMarket</h2>
        </div>

        {/* Shop info */}
        <div className="seller-shop">
          {/* ⚠️ TODO: bạn gắn LINK AVATAR SHOP ở đây */}
          <div
            className="shop-avatar"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAA_6L52Fs9QRw8o7lhBmZ9N6lJRto5doBKD8xwGTQ4Xqh-NwnizNpnxofKI8UQ-yU3s-Nd__o0NNAU3ceISBQnBpE3s93_L2NdoP4Wa-JiH_An0nhAtLIN_AkZXJS5uzLfGaB_giUEWgNUeGLugWF35j_Nsr5Y-2FhsKL_BmR7pLxHo8xYXzPYRtXHbhjUJXkDJld65fIz11YbL-z1C4ITnoyy1z7qw8REzkwpXkdj1PPkG36aJkbhfrGueow8E5CuI_jFaMBuxy3B')`,
            }}
          ></div>

          <div className="shop-info">
            <strong>Cửa hàng xe đạp</strong>
            <span className="verified">
              <span className="material-symbols-outlined filled">
                verified_user
              </span>
              Đã xác thực
            </span>
          </div>
        </div>

        {/* Menu */}
        <nav className="seller-menu">
          {[
            { key: "dashboard", label: "Tổng quan", icon: "dashboard" },
            {
              key: "posts",
              label: "Tin đăng của tôi",
              icon: "directions_bike",
            },
            { key: "orders", label: "Đơn hàng", icon: "inventory", badge: 2 },
            { key: "messages", label: "Tin nhắn", icon: "chat" },
            { key: "wallet", label: "Ví tiền", icon: "account_balance_wallet" },
          ].map((item) => (
            <div
              key={item.key}
              className={`menu-item ${activeMenu === item.key ? "active" : ""}`}
              onClick={() => setActiveMenu(item.key)}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span className="menu-label">{item.label}</span>

              {item.badge && <span className="menu-badge">{item.badge}</span>}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="seller-footer">
          <div className="menu-item">
            <span className="material-symbols-outlined">settings</span>
            <span>Cài đặt tài khoản</span>
          </div>

          <div className="menu-item logout">
            <span className="material-symbols-outlined">logout</span>
            <span>Đăng xuất</span>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT – tạm để trống */}
      <main className="seller-main">
        {/* ===== HEADER ===== */}
        <header className="seller-header">
          {/* Search */}
          <div className="seller-search">
            <span className="material-symbols-outlined">search</span>
            <input type="text" placeholder="Tìm kiếm đơn hàng, khách hàng..." />
          </div>

          {/* Actions */}
          <div className="seller-actions">
            <button className="create-post-btn">
              <span className="material-symbols-outlined">add</span>
              Đăng tin mới
            </button>

            <button className="icon-btn">
              <span className="material-symbols-outlined">notifications</span>
              <span className="icon-badge">3</span>
            </button>

            <button className="icon-btn">
              <span className="material-symbols-outlined">chat</span>
            </button>
          </div>
        </header>
        {/* ===== STATS ===== */}
        <div className="seller-stats">
          {stats.map((item) => (
            <div key={item.id} className={`stat-card ${item.type}`}>
              {/* TOP ROW */}
              <div className="stat-top">
                <div className="stat-icon">
                  <span className="material-symbols-outlined filled">
                    {item.type === "posts" && "visibility"}
                    {item.type === "orders" && "inventory"}
                    {item.type === "revenue" && "payments"}
                    {item.type === "messages" && "chat"}
                  </span>
                </div>

                {item.note && <span className="stat-note">{item.note}</span>}
              </div>

              {/* CONTENT */}
              <div className="stat-content">
                <span className="stat-label">{item.label}</span>
                <strong className="stat-value">{item.value}</strong>
              </div>
            </div>
          ))}
        </div>
        {/* ===== ORDERS + FEATURED GRID ===== */}
        <div className="seller-content-grid">
          {/* ===== CỘT TRÁI ===== */}
          <div className="seller-left">
            {/* ===== RECENT ORDERS ===== */}
            <section className="seller-section">
              <div className="section-header">
                <h3>Đơn hàng gần đây</h3>
                <button className="link-btn">Xem tất cả</button>
              </div>

              <div className="orders-table">
                <div className="orders-head">
                  <span>Mã đơn</span>
                  <span>Sản phẩm</span>
                  <span>Khách hàng</span>
                  <span>Trạng thái</span>
                  <span>Tổng tiền</span>
                </div>

                {orders.map((order) => (
                  <div key={order.id} className="orders-row">
                    <span>{order.id}</span>

                    <span className="product-cell">
                      <img
                        src={order.image}
                        alt={order.product}
                        className="product-thumb"
                      />
                      <span className="product-name">{order.product}</span>
                    </span>

                    <span>{order.customer}</span>

                    <span className={`status ${order.status}`}>
                      <span className="status-dot"></span>
                      {order.status === "pending" && "Chờ xử lý"}
                      {order.status === "shipping" && "Đang giao"}
                      {order.status === "done" && "Hoàn thành"}
                    </span>

                    <strong>{order.price}</strong>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* ===== CỘT PHẢI ===== */}
          <div className="seller-right">
            {/* ===== FEATURED POST ===== */}
            <aside className="featured-post">
              <h3>Tin nổi bật của bạn</h3>

              <div className="featured-card">
                <div
                  className="featured-image"
                  style={{
                    backgroundImage: `url(${featuredPost.image})`,
                  }}
                >
                  <span className="featured-views">
                    {featuredPost.views} lượt xem
                  </span>
                </div>

                <div className="featured-info">
                  <strong>{featuredPost.name}</strong>
                  <span className="featured-price">{featuredPost.price}</span>
                  <p>Đăng {featuredPost.createdAt}</p>

                  <div className="featured-actions">
                    <button className="btn-secondary">Chỉnh sửa</button>
                    <button className="btn-primary">Đẩy tin</button>
                  </div>
                </div>
              </div>
            </aside>

            {/* ===== MESSAGES ===== */}
            <aside className="messages-box">
              <h3>
                Tin nhắn mới <span className="badge">2</span>
              </h3>

              {messages.map((msg) => (
                <div key={msg.id} className="message-item">
                  <img src={msg.avatar} alt={msg.name} />
                  <div>
                    <strong>{msg.name}</strong>
                    <p>{msg.text}</p>
                  </div>
                  <span className="time">{msg.time}</span>
                </div>
              ))}
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}
