import React from "react";
import { FaShoppingCart, FaTags } from "react-icons/fa"; // Icon giỏ hàng và thẻ tag

const RoleSelector = ({ role, setRole }) => {
  return (
    <div className="role-selector-container">
      <p className="section-label">BẠN LÀ AI?</p>
      <div className="role-buttons">
        {/* Nút Người mua */}
        <button
          className={`role-btn ${role === "buyer" ? "active" : ""}`}
          onClick={() => setRole("buyer")}
        >
          <div className="icon-box">
            <FaShoppingCart />
          </div>
          <span>Người mua</span>
        </button>

        {/* Nút Người bán */}
        <button
          className={`role-btn ${role === "seller" ? "active" : ""}`}
          onClick={() => setRole("seller")}
        >
          <div className="icon-box">
             <FaTags />
          </div>
          <span>Người bán</span>
        </button>
      </div>
    </div>
  );
};

export default RoleSelector;