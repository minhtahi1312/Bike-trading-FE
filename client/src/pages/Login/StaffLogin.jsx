import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axiosClient from "../../services/axiosClient";
import { toast } from "react-toastify";

const StaffLogin = () => {
  const navigate = useNavigate();
  
  // Chỉ giữ lại các State cần thiết cho Đăng nhập nội bộ
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [remember, setRemember] = useState(false);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Vui lòng nhập đầy đủ thông tin hệ thống!");
      return;
    }

    try {
      setLoading(true);
      const response = await axiosClient.post("/api/Auth/signin", {
        email: email,
        password: password,
      });

      if (response.data && response.data.success === true) {
        // --- LOGIC CHUẨN HÓA ROLE TỪ CODE CŨ CỦA BẠN ---
        const rawRole = response.data.role || response.data.Role;
        let serverRoleStr = "UNKNOWN";

        if (!isNaN(rawRole) && Number(rawRole) > 0) {
          const roleId = Number(rawRole);
          if (roleId === 1) serverRoleStr = "ADMIN";
          if (roleId === 4) serverRoleStr = "INSPECTOR";
        } else if (typeof rawRole === "string") {
          serverRoleStr = rawRole.toUpperCase();
        }

        // --- KIỂM TRA QUYỀN TRUY CẬP NỘI BỘ ---
        if (serverRoleStr === "ADMIN" || serverRoleStr === "INSPECTOR") {
          // Lưu Token & Thông tin
          const token = response.data.token || response.data.accessToken;
          if (token) localStorage.setItem("accessToken", token);
          localStorage.setItem("role", serverRoleStr);
          localStorage.setItem("user", JSON.stringify({ email, role: serverRoleStr }));

          toast.success(`Chào mừng ${serverRoleStr === "ADMIN" ? "Quản trị viên" : "Kiểm định viên"}!`);

          // Điều hướng đúng Dashboard
          if (serverRoleStr === "ADMIN") navigate("/admin/dashboard");
          else navigate("/inspector/dashboard");
        } else {
          // Nếu là Buyer/Seller (Role 2, 3) nhưng cố tình vào trang này
          toast.error("Tài khoản không có quyền truy cập vùng quản trị!");
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Sai tài khoản hoặc mật khẩu quản trị!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* CỘT TRÁI - GIỮ NGUYÊN GIAO DIỆN XE ĐẠP ĐẸP MẮT */}
      <div className="left-panel">
        <img
          src="https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?q=80&w=2070&auto=format&fit=crop"
          alt="Bike"
          className="bg-image"
        />
        <div className="panel-content">
          <div className="brand-tag">
            <span>✔ HỆ THỐNG QUẢN TRỊ NỘI BỘ</span>
          </div>
          <h1>Cộng đồng mua bán xe đạp tin cậy</h1>
          <p>Đăng nhập dành riêng cho Admin và Inspector để vận hành hệ thống.</p>
        </div>
      </div>

      {/* CỘT PHẢI - FORM GỌN GÀNG, KHÔNG ROLE SELECTOR, KHÔNG TAB ĐĂNG KÝ */}
      <div className="right-panel">
        <div className="form-content">
          <div className="header">
            <h2 style={{ color: "#111827", fontSize: "32px" }}>Đăng nhập Quản trị</h2>
            <p>Vui lòng nhập tài khoản nhân viên để tiếp tục.</p>
          </div>

          <form onSubmit={handleLoginSubmit} style={{ marginTop: "30px" }}>
            <div className="form-group">
              <label>Email hoặc mã nhân viên</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@bikemarket.com"
                required
              />
            </div>

            <div className="form-group">
              <label>Mật khẩu</label>
              <div style={{ position: "relative", width: "100%" }}>
                <input
                  type={showPwd ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Nhập mật khẩu bảo mật"
                  style={{ width: "100%", paddingRight: "40px" }}
                  required
                />
                <span
                  onClick={() => setShowPwd(!showPwd)}
                  style={{
                    position: "absolute",
                    right: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    color: "#666",
                    display: "flex",
                  }}
                >
                  {showPwd ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                </span>
              </div>
            </div>

            <div className="options">
              <label className="remember-me">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />{" "}
                Ghi nhớ đăng nhập
              </label>
            </div>

            <button
              type="submit"
              className="submit-btn"
              disabled={loading}
              style={{
                background: "#111827", // Màu đen/xám đậm chuyên nghiệp cho Admin
                opacity: loading ? 0.7 : 1,
                marginTop: "10px"
              }}
            >
              {loading ? "Đang xác thực..." : "Truy cập hệ thống →"}
            </button>

            <div className="footer-text">
              Bạn không có quyền truy cập?{" "}
              <a href="/" style={{ color: "var(--green)", fontWeight: "bold" }}>
                Quay lại trang chủ
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StaffLogin;