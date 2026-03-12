import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getMyOrder, cancelOrder } from "../../../services/axiosClient";

export default function OrderBuyer() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Tabs danh mục
  const tabs = [
    { id: "all", name: "Tất cả" },
    { id: "waiting", name: "Chờ xác nhận" },

    { id: "shipping", name: "Đang giao" },
    { id: "completed", name: "Hoàn tất" },
    { id: "canceled", name: "Đã hủy" },
  ];

  const loadMyOrder = async () => {
    setIsLoading(true);
    try {
      const data = await getMyOrder();
      console.log("✅ Dữ liệu đơn hàng:", data);
      setOrders(Array.isArray(data) ? data : data?.data || []);
    } catch (err) {
      console.error("❌ Lỗi lấy thông tin đơn hàng:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadMyOrder();
  }, []);

  const handleCancelOrder = async (orderId) => {
    const isConfirm = window.confirm("Bạn có chắc chắn muốn hủy đơn hàng này không?");
    if (!isConfirm) return;

    try {
      await cancelOrder(orderId);
      alert("Hủy đơn hàng thành công!");
      setActiveTab("canceled");
      loadMyOrder();
    } catch (error) {
      console.error("Lỗi khi hủy đơn:", error);
      alert("Hủy đơn hàng thất bại. Vui lòng thử lại!");
    }
  };

  const getStatusInfo = (status) => {
    switch (String(status)) {
      case "Pending":
      case "Paid":
        return { text: "Chờ xác nhận", tabId: "waiting", colorClass: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300" };
      case "Confirmed":
        return { text: "Đang chuẩn bị", tabId: "processing", colorClass: "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300" };
      // case "Processing":
      case "Shipping":
        return { text: "Đang giao", tabId: "shipping", colorClass: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300" };
      case "Completed":
        return { text: "Hoàn tất", tabId: "completed", colorClass: "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300" };
      // case "Cancelled":
      case "Cancelled":
        return { text: "Đã hủy", tabId: "canceled", colorClass: "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300" };
      default:
        return { text: status || "Không rõ", tabId: "all", colorClass: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300" };
    }
  };

  const formatPrice = (price) => {
    if (price === undefined || price === null) return "0đ";
    return price.toLocaleString('vi-VN') + 'đ';
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  const filteredOrders = activeTab === "all"
    ? orders
    : orders.filter(order => getStatusInfo(order?.status).tabId === activeTab);

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-[#111813] dark:text-white font-display">
      <main className="flex-1 w-full max-w-[1200px] mx-auto px-4 md:px-10 py-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-[#111813] dark:text-white mb-2">Đơn hàng của tôi</h1>
            <p className="text-gray-500 dark:text-gray-400">Quản lý và theo dõi quá trình mua bán xe đạp của bạn</p>
          </div>

        </div>

        {/* Tabs */}
        <div className="mb-6 overflow-x-auto">
          <div className="flex border-b border-gray-200 dark:border-gray-700 min-w-max">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 border-b-2 font-medium text-sm transition-colors ${activeTab === tab.id
                    ? "border-[#111813] dark:border-primary text-[#111813] dark:text-primary font-semibold"
                    : "border-transparent text-gray-500 hover:text-[#111813] dark:hover:text-white"
                  }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>

        {/* Danh sách đơn hàng (Render Động) */}
        <div className="flex flex-col gap-4">
          {isLoading ? (
            <div className="text-center py-10 text-gray-500">Đang tải dữ liệu...</div>
          ) : filteredOrders.length > 0 ? (
            filteredOrders.map((order) => {
              const statusInfo = getStatusInfo(order?.status);

              return (
                <section key={order?.id} className="group bg-surface-light dark:bg-surface-dark rounded-xl border border-primary/40 dark:border-primary/30 p-4 md:p-5 shadow-sm hover:shadow-md transition-all duration-200">
                  <div className="flex flex-col md:flex-row gap-5">

                    {/* Hình ảnh mô phỏng */}
                    <div className="shrink-0 relative">
                      <div className="w-full md:w-[160px] aspect-[4/3] rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                        <span className="material-symbols-outlined text-4xl text-gray-400">pedal_bike</span>
                      </div>
                      <div className={`absolute top-2 left-2 text-xs font-bold px-2 py-1 rounded backdrop-blur-sm ${statusInfo.colorClass}`}>
                        {statusInfo.text}
                      </div>
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                        <div>
                          <h3 className="text-lg font-bold text-[#111813] dark:text-white mb-1">
                            Đơn hàng gồm {order?.totalItems || 0} sản phẩm
                          </h3>
                          <div className="flex flex-col gap-1 text-sm text-gray-500 dark:text-gray-400">
                            <span>Người nhận: <strong>{order?.receiverName || "Chưa cập nhật"}</strong></span>
                            <span>Mã đơn: <span className="uppercase">{order?.id?.split('-')[0] || order?.id}</span></span>
                            <span>Ngày đặt: {formatDate(order?.createdAt)}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500 mb-1">Tổng tiền</p>
                          <p className="text-xl font-bold text-primary dark:text-primary">
                            {formatPrice(order?.totalAmount)}
                          </p>
                        </div>
                      </div>

                      {/* Nút thao tác */}
                      <div className="flex flex-wrap items-center justify-end gap-3 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                        {order?.status === "Pending" && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCancelOrder(order?.id);
                            }}
                            className="px-4 py-2 rounded-lg text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                          >
                            Hủy đơn hàng
                          </button>
                        )}
                        <button
                          onClick={() => navigate(`/homebuyer/order/${order.id}`)}
                          className="px-5 py-2 rounded-lg text-sm font-medium border border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 bg-transparent text-[#111813] dark:text-white transition-colors"
                        >
                          Xem chi tiết
                        </button>
                      </div>
                    </div>
                  </div>
                </section>
              );
            })
          ) : (
            <div className="text-center py-10 border border-dashed border-gray-300 dark:border-gray-700 rounded-xl">
              <p className="text-gray-500 dark:text-gray-400">Không có đơn hàng nào để hiển thị.</p>
            </div>
          )}
        </div>

      </main>
    </div>
  );
}