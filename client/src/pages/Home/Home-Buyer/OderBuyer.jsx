import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getMyOrder, cancelOrder, postReport } from "../../../services/axiosClient";

export default function OrderBuyer() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [issueType, setIssueType] = useState(""); 
  const [reportDescription, setReportDescription] = useState(""); 

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

  
  const handleOpenReport = (orderId) => {
    setSelectedOrderId(orderId);
    setIssueType(""); 
    setReportDescription(""); 
    setIsModalOpen(true);
  };


  const handleSubmitReport = async () => {
    if (!issueType) {
      alert("Vui lòng chọn loại vấn đề!");
      return;
    }

    setIsSubmitting(true);

    try {
    
      const payload = {
        orderId: selectedOrderId,
        type: issueType,          
        reason: reportDescription 
      };
      
      console.log("Đang gửi báo cáo với payload:", payload);
      const response = await postReport(payload);
      
      console.log("Gửi báo cáo thành công:", response);
      alert("Báo cáo của bạn đã được gửi thành công!");
      setIsModalOpen(false);
      
     

    } catch (error) {
      console.error("Lỗi khi submit báo cáo:", error);
      alert("Đã có lỗi xảy ra khi gửi báo cáo. Vui lòng thử lại sau!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusInfo = (status) => {
    switch (String(status)) {
      case "Paid":
        return { text: "Chờ xác nhận", tabId: "waiting", colorClass: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300" };
      case "Confirmed":
        return { text: "Đang chuẩn bị", tabId: "processing", colorClass: "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300" };
      case "Shipping":
        return { text: "Đang giao", tabId: "shipping", colorClass: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300" };
      case "Completed":
        return { text: "Hoàn tất", tabId: "completed", colorClass: "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300" };
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
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-[#111813] dark:text-white font-display relative">
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

        {/* Danh sách đơn hàng */}
        <div className="flex flex-col gap-4">
          {isLoading ? (
            <div className="text-center py-10 text-[#066e48] font-medium flex items-center justify-center gap-2">
              <span className="material-symbols-outlined animate-spin">progress_activity</span>
              Đang tải dữ liệu...
            </div>
          ) : filteredOrders.length > 0 ? (
            filteredOrders.map((order) => {
              const statusInfo = getStatusInfo(order?.status);

              return (
                <section key={order?.id} className="group bg-surface-light dark:bg-surface-dark rounded-xl border border-primary/40 dark:border-primary/30 p-4 md:p-5 shadow-sm hover:shadow-md transition-all duration-200">
                  <div className="flex flex-col md:flex-row gap-5">

                    <div className="shrink-0 relative group">
                      <div className="w-full md:w-[160px] aspect-[4/3] rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden border border-gray-200 dark:border-gray-700">
                        {(order?.thumbnail || order?.orderItems?.[0]?.thumbnail) ? (
                          <img
                            src={order.thumbnail || order.orderItems[0].thumbnail}
                            alt="Sản phẩm"
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "https://via.placeholder.com/160x120?text=No+Image";
                            }}
                          />
                        ) : (
                          <div className="flex flex-col items-center">
                            <span className="material-symbols-outlined text-4xl text-gray-400">pedal_bike</span>
                            <span className="text-[10px] text-gray-400">No Image Data</span>
                          </div>
                        )}
                      </div>

                      <div className={`absolute top-2 left-2 px-2 py-1 rounded-md text-[10px] font-bold uppercase shadow-sm backdrop-blur-sm 
                          ${order?.status === 'Pending' ? 'bg-orange-500/80 text-white' :
                          order?.status === 'Paid' ? 'bg-yellow-500/80 text-white' :
                            order?.status === 'Shipping' ? 'bg-blue-500/80 text-white' :
                              order?.status === 'Completed' ? 'bg-green-500/80 text-white' :
                                order?.status === 'Cancelled' ? 'bg-red-500/80 text-white' :
                                  'bg-gray-500/80 text-white'}`}
                      >
                        {order?.status === 'Pending' && 'Chờ thanh toán'}
                        {order?.status === 'Paid' && 'Chờ xác nhận'}
                        {order?.status === 'Shipping' && 'Đang giao'}
                        {order?.status === 'Completed' && 'Hoàn tất'}
                        {order?.status === 'Cancelled' && 'Đã hủy'}
                        {!['Pending', 'Paid', 'Shipping', 'Completed', 'Cancelled'].includes(order?.status) && 'Không xác định'}
                      </div>
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                        <div>
                          <h3 className="text-lg font-bold text-[#111813] dark:text-white mb-1">
                            Mã đơn: <span className="uppercase">{order?.id?.split('-')[0] || order?.id}</span>
                          </h3>
                          <div className="flex flex-col gap-1 text-sm text-gray-500 dark:text-gray-400">
                            <span>Người nhận: <strong>{order?.receiverName || "Chưa cập nhật"}</strong></span>
                            <span>Ngày đặt: {formatDate(order?.createdAt)}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500 mb-1">Tổng tiền</p>
                          <p className="text-xl font-bold text-[#066e48]">
                            {formatPrice(order?.totalAmount)}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center justify-end gap-3 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                        {/* Nút Báo Cáo */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenReport(order?.id);
                          }}
                          className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
                        >
                          Báo cáo
                        </button>

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
                          className="px-5 py-2 rounded-lg text-sm font-medium bg-[#066e48] hover:bg-[#055a3b] text-white shadow-sm transition-colors"
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

      {/* --- Modal Báo Cáo --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-[#111813]/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-opacity">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">

            {/* Header Modal */}
            <div className="flex justify-between items-center p-5 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
              <div>
                <h2 className="text-lg font-bold text-[#111813] dark:text-white">Báo cáo đơn hàng</h2>
                <p className="text-xs text-[#637588] dark:text-gray-400 mt-0.5">
                  Mã đơn: {selectedOrderId?.split('-')[0] || selectedOrderId}
                </p>
              </div>
              <button
                onClick={() => !isSubmitting && setIsModalOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                disabled={isSubmitting}
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            {/* Nội dung Modal: Form báo cáo */}
            <div className="p-5 flex flex-col gap-4">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Hãy cho chúng tôi biết vấn đề bạn gặp phải với đơn hàng này.
              </p>

              {/* Dropdown chọn loại vấn đề */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Loại vấn đề <span className="text-red-500">*</span>
                </label>
                <select
                  value={issueType}
                  onChange={(e) => setIssueType(Number(e.target.value))}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-[#111813] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#066e48]"
                >
                  <option value="" disabled>-- Chọn loại vấn đề --</option>
                  <option value={1}>Vấn đề về đơn hàng (Order Issue)</option>
                  <option value={2}>Vấn đề từ người bán (Seller Issue)</option>
                  <option value={3}>Vấn đề từ người mua (Buyer Issue)</option>
                  <option value={4}>Vấn đề thanh toán (Payment Issue)</option>
                  <option value={5}>Khác (Other)</option>
                </select>
              </div>

              {/* Textarea để nhập chi tiết (Tùy chọn) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Mô tả chi tiết
                </label>
                <textarea
                  rows="3"
                  value={reportDescription}
                  onChange={(e) => setReportDescription(e.target.value)}
                  placeholder="Nhập chi tiết vấn đề bạn gặp phải..."
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-[#111813] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#066e48] resize-none"
                ></textarea>
              </div>
            </div>

            {/* Footer Modal */}
            <div className="p-5 border-t border-gray-100 dark:border-gray-700 flex justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg dark:text-gray-300 dark:hover:bg-gray-700"
              >
                Hủy
              </button>
              <button
                onClick={handleSubmitReport}
                className="px-4 py-2 text-sm font-medium bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors disabled:opacity-50"
                disabled={isSubmitting || !issueType} // Disable nếu đang submit hoặc chưa chọn Issue Type
              >
                {isSubmitting ? "Đang gửi..." : "Gửi báo cáo"}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}