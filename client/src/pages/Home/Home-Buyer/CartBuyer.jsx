import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCart, getCartItems, deleteCartItem, toggleCartItem, isBuying , } from "../../../services/axiosClient";

const CartBuyer = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  
  // Tách biệt 2 nguồn dữ liệu
  const [items, setItems] = useState([]); // Danh sách sản phẩm (có chứa isSelected)
  const [summary, setSummary] = useState({ totalAmount: 0 }); // Tổng tiền từ server

  // Hiển thị sản phẩm trong giỏ hàng
  const loadItems = async () => {
    try {
      const data = await getCartItems();
      setItems(data || []);
    } catch (err) {
      console.error("Lỗi lấy danh sách:", err);
    }
  };

  // Hiển thị tổng tiền (từ API Cart)
  const loadSummary = async () => {
    try {
      const data = await getCart();
      setSummary(data || { totalAmount: 0 });
    } catch (err) {
      console.error("Lỗi lấy tổng tiền:", err);
    }
  };
  const isBuy = async () => {
    try {
      const data = await isBuying();
      console.log("isBuying response:", data);
    } catch (err) {
      console.error("Lỗi lấy tổng tiền:", err);
    }
  };
  const x = 1;

  setTimeout(() => {
    console.log("x =", x); 
    isBuy();
  }, x * 1000);

  useEffect(() => {
    const initData = async () => {
      setLoading(true);
      await Promise.all([loadItems(), loadSummary()]);
      setLoading(false);
    };
    initData();
  }, []);

  // XỬ LÝ DẤU TÍCH: Gọi API toggle và load lại cả 2 để cập nhật tiền
  const handleToggle = async (id) => {
    try {
      await toggleCartItem(id); // Gọi API thay đổi trạng thái trong DB
      await Promise.all([loadItems(), loadSummary()]); // Cập nhật lại giao diện và tiền ngay lập tức
    } catch (err) {
      alert("Không thể thay đổi trạng thái chọn");
    }
  };
  // xóa sản phẩm khỏi giỏ hàng
  const handleDelete = async (id) => {
    if (window.confirm("Xóa sản phẩm này?")) {
      try {
        await deleteCartItem(id);
        await Promise.all([loadItems(), loadSummary()]);
      } catch (err) {
        alert("Xóa thất bại");
      }
    }
  };

  if (loading) return <div className="p-20 text-center font-bold">Đang tải...</div>;

  return (
    <div className="min-h-screen bg-[#f6f8f6] p-4 lg:p-10 text-[#111813]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* CỘT DANH SÁCH SẢN PHẨM */}
        <div className="lg:col-span-8 space-y-4">
          <h1 className="text-3xl font-bold mb-6">Giỏ hàng ({items.length})</h1>
          {items.map((item) => (
            <div key={item.id} className="bg-white p-4 rounded-2xl flex gap-6 border border-gray-100 shadow-sm items-center">
              
              {/* PHỤC HỒI DẤU TÍCH Ở ĐÂY */}
              <input
                type="checkbox"
                checked={item.isSelected} // Quan trọng: Lấy từ API
                onChange={() => handleToggle(item.id)}
                className="w-6 h-6 accent-[#2bee6c] cursor-pointer shrink-0"
              />

              <div 
                className="w-40 aspect-video rounded-xl bg-cover bg-center bg-gray-100 shrink-0"
                style={{ backgroundImage: `url(${item.imageUrl})` }}
              />
              
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-xl">{item.bikeTitle}</h3>
                  <button onClick={() => handleDelete(item.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>
                <p className="text-[#2bee6c] text-2xl font-black mt-2">
                  {item.unitPrice?.toLocaleString('vi-VN')} đ
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CỘT TÓM TẮT THANH TOÁN */}
        <div className="lg:col-span-4">
          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 sticky top-24">
            <h2 className="text-xl font-bold mb-6">Tóm tắt đơn hàng</h2>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Tạm tính:</span>
                <span className="font-bold text-[#111813]">
                  {summary.totalAmount?.toLocaleString('vi-VN')} đ
                </span>
              </div>
              <div className="border-t border-dashed pt-4 flex justify-between items-center font-black text-2xl">
                <span>Tổng cộng:</span>
                <span className="text-[#2bee6c]">
                  {(summary.totalAmount > 0 ? summary.totalAmount : 0).toLocaleString('vi-VN')} đ
                </span>
              </div>
            </div>
            <button 
              disabled={summary.totalAmount === 0}
              onClick={() => navigate('/homebuyer/checkout')}
              className="w-full bg-[#2bee6c] hover:bg-[#1fb350] disabled:bg-gray-200 disabled:text-gray-400 py-4 rounded-xl font-black text-lg shadow-lg transition-all"
            >
              THANH TOÁN NGAY
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CartBuyer;