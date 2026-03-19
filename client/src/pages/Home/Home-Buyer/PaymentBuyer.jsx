import React, { useState, useEffect } from "react";
import { getOrder, getPayos, getMyOrder } from "../../../services/axiosClient";
import { useNavigate, useParams } from "react-router-dom";

export default function PaymentBuyer() {
  const navigate = useNavigate();
  const [order, setOrder] = useState(null); 
  const { id } = useParams(); 

  const loadOrder = async () => {
    try {
      console.log("🔍 Lấy thông tin đơn hàng với ID:", id);
      const order = await getOrder(id);
      console.log("✅ Dữ liệu đơn hàng:", order);
      setOrder(order);
    } catch (err) {
      console.error("❌ Lỗi lấy thông tin đơn hàng:", err);
    }
  };

  useEffect(() => {
    loadOrder();
  }, [id]);

  const handlePayment = async () => {
    try {
      const orders = await getMyOrder();
      const orderId = orders[0].id;
      console.log("Order ID để thanh toán:", orderId);
      const urlQR = await getPayos(orderId);
      console.log("URL QR Code:", urlQR.data.checkoutUrl);
      window.location.href = urlQR.data.checkoutUrl;
    } catch (error) {
      console.error("Lỗi khi thanh toán", error);
      alert("Có lỗi xảy ra khi xử lý đơn hàng. Vui lòng thử lại.");
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-[#111813] dark:text-gray-100 overflow-x-hidden min-h-screen">
      <main className="layout-container flex flex-col min-h-screen max-w-[1200px] mx-auto px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          <div className="lg:col-span-8 flex flex-col gap-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-[#111813] dark:text-white mb-2">Xem Lại Đơn Hàng</h1>
              <p className="text-[#066e48] dark:text-gray-400">Vui lòng kiểm tra lại thông tin sản phẩm và thực hiện chuyển khoản.</p>
            </div>

            {/* Thông tin nhận hàng */}
            <section className="bg-white dark:bg-[#1a2c20] rounded-xl p-6 shadow-sm border border-[#e0e0e0] dark:border-[#2a3c30]">
              <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-[#066e48]">local_shipping</span>
                Thông tin nhận hàng
              </h3>
              <div className="flex flex-col sm:flex-row gap-4 justify-between bg-[#f6f8f6] dark:bg-[#233529] p-4 rounded-lg">
                <div className="flex items-start gap-4">
                  <div className="text-[#111813] dark:text-white flex items-center justify-center rounded-lg bg-white dark:bg-[#2a3c30] h-10 w-10 shadow-sm">
                    <span className="material-symbols-outlined text-lg">location_on</span>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-base font-bold text-[#111813] dark:text-white">
                      {order?.receiverName} <span className="text-gray-500 font-normal text-sm ml-2">| {order?.receiverPhone}</span>
                    </p>
                    <p className="text-[#066e48] dark:text-gray-300 text-sm mt-1">{order?.receiverAddress}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Danh sách sản phẩm */}
            <section className="bg-white dark:bg-[#1a2c20] rounded-xl p-6 shadow-sm border border-[#e0e0e0] dark:border-[#2a3c30]">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#066e48]">shopping_bag</span>
                Sản phẩm
              </h3>

              {order?.orderItems && order?.orderItems.length > 0 ? (
                order.orderItems.map((item) => (
                  <div key={item.id} className="flex flex-col md:flex-row gap-6 items-start border-b border-[#f0f4f2] dark:border-[#2a3c30] pb-6 mb-6 last:mb-0 last:pb-0 last:border-0">
                    <div className="w-full md:w-40 aspect-[4/3] rounded-lg bg-gray-100 overflow-hidden shrink-0 relative group">
                      <div
                        className="w-full h-full bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                        style={{ backgroundImage: `url("${item.thumbnail || 'https://via.placeholder.com/150'}")` }}
                      />
                      <div className="absolute top-2 left-2 bg-black/70 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                        Đã kiểm định
                      </div>
                    </div>

                    <div className="flex-1 w-full">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-xl font-bold text-[#111813] dark:text-white">
                            {item.title}
                          </h4>
                          <p className="text-[#066e48] mt-1 font-bold">
                            {item.unitPrice?.toLocaleString('vi-VN')} đ
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-xs font-medium dark:bg-blue-900/30 dark:text-blue-300">
                              {item.category}
                            </span>
                            <span className="px-2 py-0.5 rounded bg-green-50 text-green-700 text-xs font-medium dark:bg-green-900/30 dark:text-green-300">
                              {item.brand}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500 py-4 text-center">Không có sản phẩm nào</p>
              )}
            </section>
          </div>

          {/* Sidebar thanh toán */}
          <aside className="lg:col-span-4 sticky top-24">
            <div className="bg-white dark:bg-[#1a2c20] rounded-xl shadow-lg border border-[#e0e0e0] dark:border-[#2a3c30] overflow-hidden">
              <div className="p-6 border-b border-[#f0f4f2] dark:border-[#2a3c30]">
                <h3 className="text-lg font-bold mb-4">Chi tiết thanh toán</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#066e48] dark:text-gray-400">Tổng tiền hàng ({order?.orderItems?.length} món)</span>
                    <span className="font-medium">{order?.totalAmount?.toLocaleString('vi-VN')} đ</span>
                  </div>
                </div>
                <div className="my-4 pt-4 border-t border-dashed border-gray-300 dark:border-gray-600">
                  <div className="flex justify-between items-end">
                    <span className="font-bold text-lg text-[#111813] dark:text-white">Tổng thanh toán</span>
                    <span className="font-bold text-2xl text-[#066e48]">{order?.totalAmount?.toLocaleString('vi-VN')} đ</span>
                  </div>
                </div>
              </div>
              <div className="p-6 bg-[#f9fafb] dark:bg-[#233529]">
                <button 
                  onClick={handlePayment}  
                  className="w-full bg-[#066e48] hover:bg-[#055a3b] text-white font-bold text-lg py-4 rounded-xl shadow-md transition-all transform active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <span>Xác Nhận</span>
                  <span className="material-symbols-outlined font-bold">check_circle</span>
                </button>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}