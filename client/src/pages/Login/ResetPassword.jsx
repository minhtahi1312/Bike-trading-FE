import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import axiosClient from "../../services/axiosClient";
// Tái sử dụng CSS của trang Login nếu muốn, hoặc viết CSS inline cho nhanh
import "../Login/Login.css"; 

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // Lấy token từ URL (ví dụ: ?token=abcxyz...)
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error("Đường dẫn không hợp lệ hoặc đã hết hạn!");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Mật khẩu xác nhận không khớp!");
      return;
    }

    if (newPassword.length < 6) {
      toast.warning("Mật khẩu phải có ít nhất 6 ký tự!");
      return;
    }
    if (!/[A-Z]/.test(newPassword)) {
      toast.warning("Mật khẩu phải chứa ít nhất 1 chữ in hoa (A-Z)!");
      return;
    }

    // 3. Kiểm tra phải có ít nhất 1 ký tự đặc biệt
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(newPassword)) {
      toast.warning("Mật khẩu phải chứa ít nhất 1 ký tự đặc biệt (VD: @, #, $,...)!");
      return;
    }

    try {
      setLoading(true);
      
      const response = await axiosClient.post(
    "/api/Auth/reset-password-by-link", 
    { newPassword, confirmPassword },
    { headers: { Authorization: `Bearer ${token}` } }
  );

  toast.success("Đặt lại mật khẩu thành công! Vui lòng đăng nhập lại.");
  navigate("/login"); 

} catch (error) {
  console.error("Reset Password Error:", error);
  const serverMsg = error.response?.data?.message;
  toast.error(serverMsg || "Lỗi hệ thống khi đặt lại mật khẩu!");
} finally {
  setLoading(false);
}
  };

  return (
    <div className="login-page" style={{ justifyContent: "center", alignItems: "center", display: "flex", height: "100vh", backgroundColor: "#f3f4f6" }}>
      <div className="form-content" style={{ backgroundColor: "white", padding: "40px", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)", width: "100%", maxWidth: "450px" }}>
        <div className="header" style={{ textAlign: "center", marginBottom: "30px" }}>
          <h2>Đặt lại mật khẩu mới</h2>
          <p>Vui lòng nhập mật khẩu mới cho tài khoản của bạn.</p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Ô Nhập mật khẩu mới */}
          <div className="form-group" style={{ marginBottom: "20px" }}>
            <label style={{ marginBottom: 8, display: "block", fontWeight: 500 }}>Mật khẩu mới</label>
            <div style={{ position: "relative", width: "100%" }}>
              <input
                type={showPwd ? "text" : "password"}
                placeholder="Nhập mật khẩu mới"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                style={{ width: "100%", padding: "10px", paddingRight: "40px", border: "1px solid #ddd", borderRadius: "4px" }}
                required
              />
              <span
                onClick={() => setShowPwd(!showPwd)}
                style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", cursor: "pointer", color: "#666" }}
              >
                {showPwd ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </span>
            </div>
          </div>

          {/* Ô Xác nhận mật khẩu mới */}
          <div className="form-group" style={{ marginBottom: "20px" }}>
            <label style={{ marginBottom: 8, display: "block", fontWeight: 500 }}>Xác nhận mật khẩu</label>
            <div style={{ position: "relative", width: "100%" }}>
              <input
                type={showConfirmPwd ? "text" : "password"}
                placeholder="Nhập lại mật khẩu mới"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={{ width: "100%", padding: "10px", paddingRight: "40px", border: "1px solid #ddd", borderRadius: "4px" }}
                required
              />
              <span
                onClick={() => setShowConfirmPwd(!showConfirmPwd)}
                style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", cursor: "pointer", color: "#666" }}
              >
                {showConfirmPwd ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="submit-btn"
            disabled={loading}
            style={{ width: "100%", padding: "12px", backgroundColor: "#10b981", color: "white", border: "none", borderRadius: "4px", fontWeight: "bold", cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1 }}
          >
            {loading ? "Đang xử lý..." : "Xác nhận đổi mật khẩu"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;