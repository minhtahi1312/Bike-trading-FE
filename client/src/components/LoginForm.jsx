import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";

const LoginForm = ({ role }) => {
  console.log("Vai trò hiện tại:", role); // Thêm dòng này vào đầu hàm
  // ... code cũ
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="login-form-container">
      {/* Input Email */}
      <div className="form-group">
        <label>Email hoặc số điện thoại</label>
        <input type="text" placeholder="example@email.com" />
      </div>

      {/* Input Password */}
      <div className="form-group">
        <div className="label-row">
          <label>Mật khẩu</label>
          <a href="#" className="forgot-pass">Quên mật khẩu?</a>
        </div>
        <div className="input-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="........"
          />
          <span
            className="eye-icon"
            onClick={() => setShowPassword(!showPassword)}
            
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
      </div>

      {/* Checkbox Ghi nhớ */}
      <div className="remember-me">
        <input type="checkbox" id="remember" />
        <label htmlFor="remember">Ghi nhớ đăng nhập</label>
      </div>

      {/* Nút Đăng nhập */}
      <button className="submit-btn">Đăng nhập &rarr;</button>

      <div className="divider">
        <span>Hoặc đăng nhập với</span>
      </div>

      {/* Nút Google */}
      <button className="google-btn">
        <FaGoogle className="google-icon" /> Tiếp tục với Google
      </button>

      <p className="footer-text">
        Chưa có tài khoản? <a href="#">Đăng ký ngay</a>
      </p>
    </div>
  );
};

export default LoginForm;