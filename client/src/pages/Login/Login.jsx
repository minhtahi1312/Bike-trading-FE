// ...existing code...
import React, { useState } from "react";
import "./Login.css"; // File CSS đã tạo
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
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
            <div style={{fontWeight:700}}>Người mua</div>
            <div style={{fontSize:12, color:"var(--muted)"}}>Tìm mua</div>
          </div>
        </button>

        <button
          className={`role-btn ${role === "seller" ? "active" : ""}`}
          onClick={() => setRole("seller")}
          aria-pressed={role === "seller"}
        >
          <span className="icon-box">🏷️</span>
          <div>
            <div style={{fontWeight:700}}>Người bán</div>
            <div style={{fontSize:12, color:"var(--muted)"}}>Đăng bán</div>
          </div>
        </button>
      </div>
    </div>
  );
};

/* --- BẮT ĐẦU ĐOẠN CODE THAY THẾ CHO LoginForm --- */
const LoginForm = ({ role, tab }) => {
  // State chung
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  // State riêng cho form Đăng Ký
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);

  // State cho Popup OTP (Mới thêm)
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpCode, setOtpCode] = useState("");

  // 1. Xử lý khi bấm nút Đăng Nhập
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // Call API Login ở đây
    console.log("LOGIN:", { email, password, remember, role });
    alert("Đã gửi yêu cầu Đăng nhập!");
  };

  // 2. Xử lý khi bấm nút Đăng Ký (Hiện Popup OTP chứ chưa gửi ngay)
  const handleRegisterClick = (e) => {
    e.preventDefault();
    // Validate sơ bộ
    if (!email || !password || !fullName) {
      alert("Vui lòng nhập đầy đủ thông tin trước khi đăng ký!");
      return;
    }
    // Mở popup OTP
    setShowOtpModal(true);
    console.log(`OTP sent to ${email}`);
  };

  
 // 3. Xử lý xác thực OTP
  const handleVerifyOtp = () => {
    // --- GIẢ LẬP GỌI API ---
    // Sau này call API sau
    // Ví dụ: const res = await api.checkOtp(email, otpCode);
    const isOtpValid = otpCode === "123456"; 
    // -----------------------

    if (isOtpValid) {
      // TRƯỜNG HỢP THÀNH CÔNG
      setShowOtpModal(false);
      console.log("Đăng ký thành công:", { role, fullName, email, phone, password });
      
      // Thông báo chuẩn
      alert("Đăng ký tài khoản thành công!");
      
      // TODO: Chuyển hướng người dùng (Navigate)
    } else {
      // TRƯỜNG HỢP THẤT BẠI
      // Hiển thị message lỗi như bạn yêu cầu
      alert("Mã OTP không hợp lệ. Vui lòng kiểm tra lại!");
      
      // Xóa mã cũ để người dùng nhập lại cho nhanh
      setOtpCode(""); 
    }
  };

  // --- GIAO DIỆN ĐĂNG KÝ (Có kèm Popup OTP) ---
  if (tab === "register") {
    return (
      <>
        <form onSubmit={handleRegisterClick}>
          {/* Hàng 1: Họ tên */}
          <div className="form-group">
            <label style={{marginBottom:8, display:'block'}}>Họ và tên</label>
            <input type="text" placeholder="Nguyễn Văn A" value={fullName} onChange={(e) => setFullName(e.target.value)} />
          </div>

          {/* Hàng 2: Email + SĐT */}
          <div className="form-row">
            <div className="form-group">
              <label style={{marginBottom:8, display:'block'}}>Email</label>
              <input type="text" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="form-group">
              <label style={{marginBottom:8, display:'block'}}>Số điện thoại</label>
              <input type="text" placeholder="09xx xxx xxx" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
          </div>

          {/* Hàng 3: Mật khẩu + Xác nhận */}
          <div className="form-row">
            <div className="form-group">
              <label style={{marginBottom:8, display:'block'}}>Mật khẩu</label>
              <div style={{ position: "relative", width: "100%" }}>
                <input 
                   type={showPwd ? "text" : "password"} 
                   placeholder="........" 
                   value={password} onChange={(e) => setPassword(e.target.value)}
                   style={{ width: "100%", paddingRight: "35px" }} 
                />
                <span onClick={() => setShowPwd(!showPwd)} style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", cursor: "pointer", color: "#666", display: "flex", zIndex:10 }}>
                  {showPwd ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                </span>
              </div>
            </div>

            <div className="form-group">
              <label style={{marginBottom:8, display:'block'}}>Xác nhận mật khẩu</label>
              <div style={{ position: "relative", width: "100%" }}>
                <input 
                   type={showConfirmPwd ? "text" : "password"} 
                   placeholder="........" 
                   value={confirmPwd} onChange={(e) => setConfirmPwd(e.target.value)}
                   style={{ width: "100%", paddingRight: "35px" }} 
                />
                <span onClick={() => setShowConfirmPwd(!showConfirmPwd)} style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", cursor: "pointer", color: "#666", display: "flex", zIndex:10 }}>
                  {showConfirmPwd ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                </span>
              </div>
            </div>
          </div>

          <div className="options" style={{alignItems: 'flex-start', marginTop: 10}}>
            <input type="checkbox" id="terms" style={{marginTop: 4, width: 'auto', marginRight: 8}} />
            <label htmlFor="terms" style={{fontSize: 13, lineHeight: 1.4, color: '#555'}}>
              Tôi đồng ý với các <a href="#" style={{color:'#10b981', fontWeight: 600}}>Điều khoản dịch vụ</a> và <a href="#" style={{color:'#10b981', fontWeight: 600}}>Chính sách an toàn</a> của BikeMarket.
            </label>
          </div>

          {/* Nút bấm Đăng ký -> Sẽ mở Popup */}
          <button type="submit" className="submit-btn" style={{marginTop:20}}>Đăng ký ngay &rarr;</button>

          <div className="divider"><span>HOẶC ĐĂNG KÝ BẰNG</span></div>
          <button type="button" className="google-btn">
            <FcGoogle size={22} style={{ marginRight: 10 }} /> Tiếp tục với Google
          </button>
          <div className="footer-text">Đã có tài khoản? <strong style={{color:"var(--green)", cursor:"pointer"}}>Đăng nhập</strong></div>
        </form>

        {/* --- PHẦN POPUP OTP (Chỉ hiện khi showOtpModal = true) --- */}
        {showOtpModal && (
          <div className="otp-overlay">
            <div className="otp-box">
              <span className="otp-icon">📩</span>
              <h3 style={{margin:0, color:'#0c3b2e'}}>Xác thực OTP</h3>
              <p style={{color:'#666', fontSize:'14px', marginTop:'8px'}}>
                Mã xác thực đã được gửi đến email <br/> <strong>{email || "email của bạn"}</strong>
              </p>
              
              <input 
                type="text" 
                className="otp-input form-control" 
                maxLength="6" 
                placeholder="000000"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value.replace(/[^0-9]/g, ''))} // Chỉ nhập số
                style={{
                  width: '100%', padding: '10px', fontSize: '24px', letterSpacing: '8px', 
                  textAlign: 'center', margin: '20px 0', border: '1px solid #ddd', borderRadius: '8px'
                }}
                autoFocus
              />

              <div className="otp-actions" style={{display:'flex', gap:'10px'}}>
                <button type="button" className="btn-cancel" onClick={() => setShowOtpModal(false)} style={{flex:1, padding:'12px', border:'1px solid #ddd', background:'#f8f9fa', borderRadius:'8px', cursor:'pointer'}}>Hủy bỏ</button>
                <button type="button" className="btn-confirm" onClick={handleVerifyOtp} style={{flex:1, padding:'12px', background:'#10b981', color:'white', border:'none', borderRadius:'8px', cursor:'pointer', fontWeight:'bold'}}>Xác nhận</button>
              </div>
              
              <p style={{fontSize:'12px', marginTop:'15px', color:'#888', cursor:'pointer'}}>Chưa nhận được mã? <u style={{color:'var(--green)'}}>Gửi lại</u></p>
            </div>
          </div>
        )}
      </>
    );
  }

  // --- GIAO DIỆN ĐĂNG NHẬP (Giữ nguyên) ---
  return (
    <form onSubmit={handleLoginSubmit}>
      <div className="form-group">
        <label style={{marginBottom:8, display:'block'}}>Email hoặc số điện thoại</label>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="example@email.com" />
      </div>

      <div className="form-group">
        <label style={{marginBottom:8, display:'block'}}>Mật khẩu</label>
        <div style={{ position: "relative", width: "100%" }}>
          <input 
             type={showPwd ? "text" : "password"} 
             value={password} onChange={(e) => setPassword(e.target.value)}
             placeholder="Tạo mật khẩu" 
             style={{ width: "100%", paddingRight: "40px" }} 
          />
          <span onClick={() => setShowPwd(!showPwd)} style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", cursor: "pointer", zIndex: 10, color: "#666", display: "flex" }}>
            {showPwd ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
          </span>
        </div>
      </div>

      <div className="options">
        <label className="remember-me">
          <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} /> Ghi nhớ đăng nhập
        </label>
        <a href="#" onClick={(e)=>e.preventDefault()}>Quên mật khẩu?</a>
      </div>

      <button type="submit" className="submit-btn">Đăng nhập →</button>

      <div className="divider"><span>Hoặc đăng nhập với</span></div>

      <button type="button" className="google-btn">
        <FcGoogle size={22} style={{ marginRight: 10 }} /> Tiếp tục với Google
      </button>

      <div className="footer-text">Chưa có tài khoản? <a href="#" onClick={(e)=>e.preventDefault()} style={{color:"var(--green)"}}>Đăng ký ngay</a></div>
    </form>
  );
};
/* --- KẾT THÚC ĐOẠN CODE THAY THẾ --- */

const Login = () => {
  const [role, setRole] = useState("buyer");
  const [tab, setTab] = useState("login"); // 'login' | 'register'

  return (
    <div className="login-page">
      {/* CỘT TRÁI */}
      <div className="left-panel">
        <img src="https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?q=80&w=2070&auto=format&fit=crop" alt="Bike" className="bg-image" />
        <div className="panel-content">
          <div className="brand-tag">
            <span>✔ GIAO DỊCH AN TOÀN & NHANH CHÓNG</span>
          </div>
          <h1>Cộng đồng mua bán xe đạp tin cậy</h1>
          <p>Đăng nhập để bắt đầu hành trình mua bán xe đạp chuyên nghiệp và an toàn nhất.</p>
        </div>
      </div>

      {/* CỘT PHẢI */}
      <div className="right-panel">
        <div className="form-content">
         <div className="header">
            <h2>
              {tab === "login" ? "Đăng nhập" : "Đăng ký tài khoản mới"}
            </h2>
            <p>
              {tab === "login" 
                ? "Vui lòng chọn vai trò để tiếp tục." 
                : "Khám phá ngay hàng ngàn mẫu xe đạp thể thao chất lượng."}
            </p>
          </div>
          <RoleSelector role={role} setRole={setRole} />

          <div className="auth-tabs" role="tablist" aria-label="Auth tabs" style={{marginBottom:18}}>
            <div className={`tab ${tab === "login" ? "active" : ""}`} onClick={() => setTab("login")}>Đăng nhập</div>
            <div className={`tab ${tab === "register" ? "active" : ""}`} onClick={() => setTab("register")}>Đăng ký</div>
          </div>

          <LoginForm role={role} tab={tab} />
        </div>
      </div>
    </div>
  );
};

export default Login;
// ...existing code...