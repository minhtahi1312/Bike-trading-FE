import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCart, getCartItems, deleteCartItem, toggleCartItem, isBuying, } from "../../../services/axiosClient";
import { toast } from 'react-toastify';

const CartBuyer = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);


  const [items, setItems] = useState([]); 
  
  const [summary, setSummary] = useState({ totalAmount: 0 }); 
  const hasInvalidItem = items.some(item => item.isSelected && item.bikeStatus !== 'Available');
  // load sản phâm
  const loadItems = async () => {
    try {
      const item = await getCartItems();
      setItems(item || []);
    } catch (err) {
      console.error("Lỗi lấy danh sách:", err);
    }
  };
  // load tổng số tiền
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
    } catch (err) {
      console.error("Lỗi không lấy được item:", err);
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
      try {
        await Promise.all([
          loadItems(),
          loadSummary(),
          isBuy()
        ]);
      } catch (error) {
        console.error("Lỗi khi khởi tạo giỏ hàng", error);
      } finally {
        setLoading(false);
      }
    };

    initData();
    // Tự động làm mới sau 10s 
    const interval = setInterval(() => {
    loadItems();
    loadSummary();
  }, 1000);
  return () => clearInterval(interval); 
  }, []);
  // API tích chọn sản phẩm
  const handleToggle = async (id) => {
    try {
      await toggleCartItem(id);
      await Promise.all([loadItems(), loadSummary()]);
    } catch (err) {
      toast.error("Không thể thay đổi trạng thái chọn");
    }
  };
  // APi xóa sản phẩm
  const handleDelete = async (id) => {
    if (window.confirm("Xóa sản phẩm này?")) {
      try {
        await deleteCartItem(id);
        await Promise.all([loadItems(), loadSummary()]);
        toast.success("Đã xóa sản phẩm khỏi giỏ hàng");
      } catch (err) {
        toast.error("Không thể xóa sản phẩm");
      }
    }
  };

  if (loading) return <div className="p-20 text-center font-bold">Đang tải...</div>;

  return (
    <div className="min-h-screen bg-[#f6f8f6] p-4 lg:p-10 text-[#111813]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        
        <div className="lg:col-span-8 space-y-4">
          <h1 className="text-3xl font-bold mb-6">Giỏ hàng ({items.length})</h1>
          {items.map((item) => (
            <div key={item.id} className="bg-white p-4 rounded-2xl flex gap-6 border border-gray-100 shadow-sm items-center relative">

              <input
                type="checkbox"
                checked={item.isSelected}
                onChange={() => handleToggle(item.id)}
                className="w-6 h-6 accent-emerald-500 cursor-pointer shrink-0"
              />

              <div
                className="w-40 aspect-video rounded-xl bg-cover bg-center bg-gray-100 shrink-0"
                style={{ backgroundImage: `url(${item.imageUrl})` }}
              />

              <div className="flex-1 flex flex-col min-h-[100px]">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-xl text-[#111813] line-clamp-1">{item.bikeTitle}</h3>

                  <button onClick={() => handleDelete(item.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>

                <div className="mt-auto flex justify-between items-end">
                  <p className="text-emerald-600 text-2xl font-black">
                    {item.unitPrice?.toLocaleString('vi-VN')} đ
                  </p>

                  <div className="flex items-center">
                    <span className={`text-xs font-bold px-3 py-1 rounded-lg border ${item.bikeStatus === 'Available'
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                      : item.bikeStatus === 'PendingInspection'
                        ? 'bg-red-50 border-red-200 text-red-700'
                        : 'bg-gray-50 border-gray-200 text-gray-700'
                      }`}>
                      {item.bikeStatus === 'Available'
                        ? '● Còn Hàng'
                        : item.bikeStatus === 'PendingInspection'
                          ? '● Đang Chờ Kiểm Tra'
                          : `● ${item.bikeStatus}`}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

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
                <span className="text-emerald-600">
                  {(summary.totalAmount > 0 ? summary.totalAmount : 0).toLocaleString('vi-VN')} đ
                </span>
              </div>
            </div>
            <button
              disabled={summary.totalAmount === 0}
              onClick={() => navigate('/homebuyer/checkout')}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white disabled:bg-gray-200 disabled:text-gray-400 py-4 rounded-xl font-black text-lg shadow-lg transition-all"
            >
              {hasInvalidItem ? "Có sản phẩm không khả dụng" : "Xác Nhận"}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CartBuyer;