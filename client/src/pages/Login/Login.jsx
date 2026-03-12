
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Login.css"; 
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import axiosClient from "../../services/axiosClient";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";

const RoleSelector = ({ role, setRole }) => {
  return (
    <div>
      <div className="section-label">Bạn là ai?</div>
      <div className="role-buttons" role="tablist" aria-label="Role selector">
        <button
          className={`role-btn ${role === "buyer" ? "active" : ""}`}
          onClick={() => setRole("buyer")}
          aria-pressed={role === "buyer"}
        >
          <span className="icon-box">🛒</span>
          <div>
            <div style={{ fontWeight: 700 }}>Người mua</div>
            <div style={{ fontSize: 12, color: "var(--muted)" }}>Tìm mua</div>
          </div>
        </button>

        <button
          className={`role-btn ${role === "seller" ? "active" : ""}`}
          onClick={() => setRole("seller")}
          aria-pressed={role === "seller"}
        >
          <span className="icon-box">🏷️</span>
          <div>
            <div style={{ fontWeight: 700 }}>Người bán</div>
            <div style={{ fontSize: 12, color: "var(--muted)" }}>Đăng bán</div>
          </div>
        </button>
      </div>
    </div>
  );
};

const LoginForm = ({ role, tab, setTab }) => {
  const navigate = useNavigate();

  // --- STATE ---
  const [isAgreed, setIsAgreed] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false); // Thêm state Loading

  // State riêng cho form Đăng Ký
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);

  // State cho Popup OTP
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  
 
  const handleResendOtp = async () => {
    if (!email) {
      toast.warning("Vui lòng nhập email để gửi lại mã!");
      return;
    }

    try {
      setLoading(true);
      const response = await axiosClient.post("/api/Auth/resend-otp", {
        email: email,
      });

      if (response.data && response.data.success === true) {
        toast.success(response.data.message || "Mã OTP mới đã được gửi lại!");
      } else {
        toast.error(
          response.data.message || "Không thể gửi lại mã, vui lòng thử lại!",
        );
      }
    } catch (error) {
      console.error("Resend OTP Error:", error);
      toast.error("Lỗi hệ thống khi gửi lại OTP!");
    } finally {
      setLoading(false);
    }
  };
  // --- 1. XỬ LÝ ĐĂNG NHẬP (CÓ CHỖ CHỜ SẴN CHO SELLER & INSPECTOR) ---
  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Vui lòng nhập email và mật khẩu!");
      return;
    }

    try {
      setLoading(true);
      const response = await axiosClient.post("/api/Auth/signin", {
        email: email,
        password: password,
      });

      console.log("LOGIN RESPONSE:", response.data);
      console.log("UI ROLE:", role);

      if (response.data && response.data.success === true) {
        // --- BƯỚC 1: CHUẨN HÓA ROLE (SỐ -> CHỮ) ---
        const rawRole = response.data.role || response.data.Role;
        let serverRoleStr = "UNKNOWN";

        // Nếu Server trả về Số (1, 2, 3...)
        if (!isNaN(rawRole) && Number(rawRole) > 0) {
          const roleId = Number(rawRole);
          switch (roleId) {
            case 1:
              serverRoleStr = "ADMIN";
              break;
            case 2:
              serverRoleStr = "BUYER";
              break;
            case 3:
              serverRoleStr = "SELLER";
              break;
            case 4:
              serverRoleStr = "INSPECTOR";
              break;
          }
        }
        // Nếu Server trả về Chữ ("Admin", "Buyer"...)
        else if (typeof rawRole === "string") {
          serverRoleStr = rawRole.toUpperCase();
        }

        console.log("Role chuẩn hóa:", serverRoleStr);

        // --- BƯỚC 2: LƯU TOKEN ---
        localStorage.setItem("accessToken", response.data.token);
        localStorage.setItem("refreshToken", response.data.refreshToken);
        localStorage.setItem("role", serverRoleStr);
        localStorage.setItem(
          "user",
          JSON.stringify({ email: email, role: serverRoleStr }),
        );

        // --- BƯỚC 3: ĐIỀU HƯỚNG THEO ROLE ---

        // === NHÓM QUẢN TRỊ (ADMIN & INSPECTOR) ===
        if (serverRoleStr === 'ADMIN' || serverRoleStr === 'INSPECTOR') {
             toast.success(`Xin chào ${serverRoleStr === 'ADMIN' ? 'Quản trị viên' : 'Kiểm duyệt viên'}!`);
             
             if (serverRoleStr === 'ADMIN') {
                 navigate("/admin/dashboard");
             } else {
                
                 navigate("/inspector/dashboard");
             }
             return; 
        }

        // === NHÓM NGƯỜI DÙNG (BUYER & SELLER) ===
        const uiRoleUpper = role.toUpperCase(); // Role đang chọn trên UI

        if (serverRoleStr === uiRoleUpper) {
          toast.success("Đăng nhập thành công!");

          if (serverRoleStr === "BUYER") {
            navigate("/homebuyer");
          } else {
            // [TODO]: SAU NÀY CÓ TRANG SELLER THÌ SỬA DÒNG DƯỚI
            // Ví dụ: navigate("/homeseller");
            navigate("/seller");
          }
        } else {
          // Báo lỗi nếu chọn sai tab
          let roleNameTV = serverRoleStr;
          if (serverRoleStr === "ADMIN") roleNameTV = "Quản trị viên";
          if (serverRoleStr === "BUYER") roleNameTV = "Người mua";
          if (serverRoleStr === "SELLER") roleNameTV = "Người bán";
          if (serverRoleStr === "INSPECTOR") roleNameTV = "Người kiểm duyệt";

          toast.error(
            `Tài khoản này là ${roleNameTV}. Vui lòng chọn đúng vai trò phía trên!`,
          );
        }
      } else {
        toast.error(response.data.message || "Đăng nhập thất bại!");
      }

} catch (error) {
    console.error("Login Error:", error);
    const resData = error.response?.data;
    const serverMsg = resData?.message || "";
    const errorMsgLow = serverMsg.toLowerCase();

    // Kiểm tra message từ BE
    if (errorMsgLow.includes("chưa xác minh email") || errorMsgLow.includes("kích hoạt")) {
        
        // 1. Bật Modal OTP lên ngay lập tức
        setShowOtpModal(true); 

        // 2. Thông báo cho người dùng
        toast.info("Tài khoản chưa xác thực. Hệ thống đang gửi lại mã OTP...");

        // 3. Tự động chạy API gửi lại mã (Gọi sau cùng)
        handleResendOtp(); 
        
    } else {
        toast.error(serverMsg || "Sai tài khoản hoặc mật khẩu!");
    }
} finally {
      setLoading(false);
    }
  };
  // 2. XỬ LÝ NÚT ĐĂNG KÝ
  const handleRegisterClick = async (e) => {
    e.preventDefault();
    if (!isAgreed) {
    toast.warning("Bạn phải đồng ý với Điều khoản dịch vụ để tiếp tục!");
    return;
    }
    // Validate dữ liệu
    if (!email || !password || !fullName || !phone) {
      toast.warning("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    if (password !== confirmPwd) {
      toast.error("Mật khẩu xác nhận không khớp!");
      return;
    }

    try {
      setLoading(true);

      // Quy đổi Role: Buyer = 2, Seller = 3
      const roleId = role === "seller" ? 3 : 2;

      // --- GỌI API TẠO TÀI KHOẢN ---
      // Hệ thống sẽ tạo User và tự gửi OTP về mail
      const response = await axiosClient.post("/api/Auth/signup", {
        fullName: fullName,
        phoneNumber: phone,
        email: email,
        password: password,
        role: roleId,
      });

      if (response.data && response.data.success === true) {
        toast.success(
          "Đăng ký thành công! Vui lòng kiểm tra Email để lấy mã OTP.",
        );

        // Mở Popup để nhập mã vừa được gửi
        setShowOtpModal(true);
      } else {
        toast.error(response.data.message || "Đăng ký thất bại!");
      }
    } catch (error) {
      console.error("Register Error:", error);
      const resData = error.response?.data;

      // Gộp lỗi để check cho chắc
      const errorMsg = (
        (resData?.message || "") +
        (resData?.title || "") +
        JSON.stringify(resData?.errors || "")
      ).toLowerCase();

      // --- LOGIC XỬ LÝ LỖI "ĐÃ TỒN TẠI" ---
      if (
        errorMsg.includes("tồn tại") ||
        errorMsg.includes("exists") ||
        errorMsg.includes("duplicate") ||
        errorMsg.includes("đã được sử dụng")
      ) {
        toast.warning(
          "Email/SĐT này đã đăng ký! Vui lòng Đăng Nhập để xác thực.",
          { autoClose: 4000 },
        );

        // CHUYỂN NGAY SANG TAB ĐĂNG NHẬP
        setTab("login");

        // Mẹo: Lúc này Email và Pass người dùng vừa nhập vẫn còn trong State
        // Họ chỉ cần bấm nút "Đăng nhập" bên tab kia là sẽ kích hoạt luồng gửi OTP
      } else {
        toast.error(resData?.message || "Đăng ký thất bại!");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otpCode) {
      toast.warning("Vui lòng nhập mã OTP!");
      return;
    }

    try {
      setLoading(true);

      // Gọi API Verify chuẩn
      const response = await axiosClient.post("/api/Auth/verify-otp", {
        email: email,
        otp: otpCode,
      });

      if (response.data && response.data.success === true) {
        toast.success("Xác thực thành công! Bạn có thể đăng nhập ngay.");

        // Đóng popup và chuyển về tab Login
        setShowOtpModal(false);
        setTab("login");

        // Reset form cho sạch sẽ
        setEmail("");
        setPassword("");
        setFullName("");
        setPhone("");
        setConfirmPwd("");
        setOtpCode("");
      } else {
        toast.error(
          response.data.message || "Mã OTP không đúng hoặc đã hết hạn!",
        );
      }
    } catch (error) {
      console.error("Verify Error:", error);
      const message = error.response?.data?.message || "Lỗi xác thực!";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  // --- SỬA LẠI PHẦN RETURN CUỐI CÙNG NHƯ SAU ---
  return (
    <>
      {/* 1. NẾU LÀ TAB ĐĂNG KÝ THÌ HIỆN FORM ĐĂNG KÝ */}
      {tab === "register" && (
        <form onSubmit={handleRegisterClick}>
          <div className="form-group">
            <label style={{ marginBottom: 8, display: "block" }}>
              Họ và tên
            </label>
            <input
              type="text"
              placeholder="Nguyễn Văn A"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          {/* Hàng 2: Email + SĐT */}
          <div className="form-row">
            <div className="form-group">
              <label style={{ marginBottom: 8, display: "block" }}>Email</label>
              <input
                type="text"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label style={{ marginBottom: 8, display: "block" }}>
                Số điện thoại
              </label>
              <input
                type="text"
                placeholder="09xx xxx xxx"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>

          {/* Hàng 3: Mật khẩu + Xác nhận */}
          <div className="form-row">
            <div className="form-group">
              <label style={{ marginBottom: 8, display: "block" }}>
                Mật khẩu
              </label>
              <div style={{ position: "relative", width: "100%" }}>
                <input
                  type={showPwd ? "text" : "password"}
                  placeholder="........"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ width: "100%", paddingRight: "35px" }}
                />
                <span
                  onClick={() => setShowPwd(!showPwd)}
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    color: "#666",
                    display: "flex",
                    zIndex: 10,
                  }}
                >
                  {showPwd ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                </span>
              </div>
            </div>

            <div className="form-group">
              <label style={{ marginBottom: 8, display: "block" }}>
                Xác nhận mật khẩu
              </label>
              <div style={{ position: "relative", width: "100%" }}>
                <input
                  type={showConfirmPwd ? "text" : "password"}
                  placeholder="........"
                  value={confirmPwd}
                  onChange={(e) => setConfirmPwd(e.target.value)}
                  style={{ width: "100%", paddingRight: "35px" }}
                />
                <span
                  onClick={() => setShowConfirmPwd(!showConfirmPwd)}
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    color: "#666",
                    display: "flex",
                    zIndex: 10,
                  }}
                >
                  {showConfirmPwd ? (
                    <FaEyeSlash size={16} />
                  ) : (
                    <FaEye size={16} />
                  )}
                </span>
              </div>
            </div>
          </div>

          <div
            className="options"
            style={{ alignItems: "flex-start", marginTop: 10 }}
          >
            <input
              type="checkbox"
              id="terms"
              style={{ marginTop: 4, width: "auto", marginRight: 8 }}
              checked={isAgreed}
            onChange={(e) => setIsAgreed(e.target.checked)}
            />
            <label
              htmlFor="terms"
              style={{ fontSize: 13, lineHeight: 1.4, color: "#555" }}
            >
              Tôi đồng ý với các{" "}
              <a href="#" style={{ color: "#10b981", fontWeight: 600 }}>
                Điều khoản dịch vụ
              </a>{" "}
              và{" "}
              <a href="#" style={{ color: "#10b981", fontWeight: 600 }}>
                Chính sách an toàn
              </a>{" "}
              của BikeMarket.
            </label>
          </div>

          <button
            type="submit"
            className="submit-btn"
            style={{ marginTop: 20 }}
          >
            Đăng ký ngay &rarr;
          </button>

          {/* CODE PHÂN CÁCH (DIVIDER) BẠN ĐÃ LÀM */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              margin: "24px 0",
            }}
          >
            <div
              style={{ flex: 1, height: "1px", backgroundColor: "#e5e7eb" }}
            ></div>
            <span
              style={{
                padding: "0 15px",
                color: "#9ca3af",
                fontSize: "13px",
                fontWeight: 500,
                whiteSpace: "nowrap",
              }}
            >
              Hoặc đăng ký bằng
            </span>
            <div
              style={{ flex: 1, height: "1px", backgroundColor: "#e5e7eb" }}
            ></div>
          </div>

          <button type="button" className="google-btn">
            <FcGoogle size={22} style={{ marginRight: 10 }} /> Tiếp tục với
            Google
          </button>
          <div className="footer-text">
            Đã có tài khoản?{" "}
            <strong
              style={{ color: "var(--green)", cursor: "pointer" }}
              onClick={() => setTab("login")}
            >
              Đăng nhập
            </strong>
          </div>
        </form>
      )}

      {/* 2. NẾU LÀ TAB ĐĂNG NHẬP THÌ HIỆN FORM ĐĂNG NHẬP */}
      {tab === "login" && (
        <form onSubmit={handleLoginSubmit}>
          <div className="form-group">
            <label style={{ marginBottom: 8, display: "block" }}>
              Email hoặc số điện thoại
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
            />
          </div>

          <div className="form-group">
            <label style={{ marginBottom: 8, display: "block" }}>
              Mật khẩu
            </label>
            <div style={{ position: "relative", width: "100%" }}>
              <input
                type={showPwd ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nhập mật khẩu"
                style={{ width: "100%", paddingRight: "40px" }}
              />
              <span
                onClick={() => setShowPwd(!showPwd)}
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                  zIndex: 10,
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
            <a href="#" onClick={(e) => e.preventDefault()}>
              Quên mật khẩu?
            </a>
          </div>

          {/* Cập nhật nút bấm để hiện Loading */}
          <button
            type="submit"
            className="submit-btn"
            disabled={loading}
            style={{
              opacity: loading ? 0.7 : 1,
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Đang xử lý..." : "Đăng nhập →"}
          </button>

          {/* CODE PHÂN CÁCH (DIVIDER) */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              margin: "24px 0",
            }}
          >
            <div
              style={{ flex: 1, height: "1px", backgroundColor: "#e5e7eb" }}
            ></div>
            <span
              style={{
                padding: "0 15px",
                color: "#9ca3af",
                fontSize: "13px",
                fontWeight: 500,
                whiteSpace: "nowrap",
              }}
            >
              Hoặc đăng nhập với
            </span>
            <div
              style={{ flex: 1, height: "1px", backgroundColor: "#e5e7eb" }}
            ></div>
          </div>

          <button type="button" className="google-btn">
            <FcGoogle size={22} style={{ marginRight: 10 }} /> Tiếp tục với
            Google
          </button>

          <div className="footer-text">
            Chưa có tài khoản?{" "}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setTab("register");
              }}
              style={{ color: "var(--green)" }}
            >
              Đăng ký ngay
            </a>
          </div>
        </form>
      )}

      {/* 3. POPUP OTP (ĐỂ RA NGOÀI CÙNG ĐỂ NÓ HIỆN ĐƯỢC Ở CẢ 2 TAB) */}
      {showOtpModal && (
        <div className="otp-overlay">
          <div className="otp-box">
            <span className="otp-icon">📩</span>
            <h3 style={{ margin: 0, color: "#0c3b2e" }}>Xác thực OTP</h3>
            <p style={{ color: "#666", fontSize: "14px", marginTop: "8px" }}>
              Mã xác thực đã được gửi đến email <br />{" "}
              <strong>{email || "email của bạn"}</strong>
            </p>

            <input
              type="text"
              className="otp-input form-control"
              maxLength="6"
              placeholder="000000"
              value={otpCode}
              onChange={(e) =>
                setOtpCode(e.target.value.replace(/[^0-9]/g, ""))
              }
              style={{
                width: "100%",
                padding: "10px",
                fontSize: "24px",
                letterSpacing: "8px",
                textAlign: "center",
                margin: "20px 0",
                border: "1px solid #ddd",
                borderRadius: "8px",
              }}
              autoFocus
            />

            <div
              className="otp-actions"
              style={{ display: "flex", gap: "10px" }}
            >
              <button
                type="button"
                className="btn-cancel"
                onClick={() => setShowOtpModal(false)}
                style={{
                  flex: 1,
                  padding: "12px",
                  border: "1px solid #ddd",
                  background: "#f8f9fa",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                Hủy bỏ
              </button>
              <button
                type="button"
                className="btn-confirm"
                onClick={handleVerifyOtp}
                style={{
                  flex: 1,
                  padding: "12px",
                  background: "#10b981",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Xác nhận
              </button>
            </div>

            <p
              style={{
                fontSize: "12px",
                marginTop: "15px",
                color: "#888",
                cursor: "pointer",
              }}
            >
              Chưa nhận được mã?{" "}
              <u
                style={{ color: "var(--green)", cursor: "pointer" }}
                onClick={handleResendOtp}
              >
                Gửi lại
              </u>
            </p>
          </div>
        </div>
      )}
    </>
  );
};
const Login = () => {
  const location = useLocation();
  const [role, setRole] = useState("buyer");

  const [tab, setTab] = useState(location.state?.activeTab === "register" ? "register" : "login");
useEffect(() => {
    if (location.state?.activeTab) {
      setTab(location.state.activeTab);
    }
  }, [location.state]);
// >>>>>>> main
  return (
    <div className="login-page">
      {/* CỘT TRÁI */}
      <div className="left-panel">
        <img
          src="https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?q=80&w=2070&auto=format&fit=crop"
          alt="Bike"
          className="bg-image"
        />
        <div className="panel-content">
          <div className="brand-tag">
            <span>✔ GIAO DỊCH AN TOÀN & NHANH CHÓNG</span>
          </div>
          <h1>Cộng đồng mua bán xe đạp tin cậy</h1>
          <p>
            Đăng nhập để bắt đầu hành trình mua bán xe đạp chuyên nghiệp và an
            toàn nhất.
          </p>
        </div>
      </div>

      {/* CỘT PHẢI */}
      <div className="right-panel">
        <div className="form-content">
          <div className="header">
            <h2>{tab === "login" ? "Đăng nhập" : "Đăng ký tài khoản mới"}</h2>
            <p>
              {tab === "login"
                ? "Vui lòng chọn vai trò để tiếp tục."
                : "Khám phá ngay hàng ngàn mẫu xe đạp thể thao chất lượng."}
            </p>
          </div>
          <RoleSelector role={role} setRole={setRole} />

          <div
            className="auth-tabs"
            role="tablist"
            aria-label="Auth tabs"
            style={{ marginBottom: 18 }}
          >
            <div
              className={`tab ${tab === "login" ? "active" : ""}`}
              onClick={() => setTab("login")}
            >
              Đăng nhập
            </div>
            <div
              className={`tab ${tab === "register" ? "active" : ""}`}
              onClick={() => setTab("register")}
            >
              Đăng ký
            </div>
          </div>

          <LoginForm role={role} tab={tab} setTab={setTab} />
        </div>
      </div>
    </div>
  );
};

export default Login;
