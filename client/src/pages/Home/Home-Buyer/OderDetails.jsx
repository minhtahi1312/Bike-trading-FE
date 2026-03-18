import { NotebookText } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getOrder } from "../../../services/axiosClient";

export default function OrderDetail() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const loadOrder = async () => {
        setIsLoading(true);
        try {
            const data = await getOrder(id);
            console.log("✅ Dữ liệu đơn hàng:", data);
            setOrder(data);
        } catch (err) {
            console.error("❌ Lỗi lấy thông tin đơn hàng:", err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            loadOrder();
        }
    }, [id]);

    const formatPrice = (price) => {
        if (price === undefined || price === null) return "0đ";
        return price.toLocaleString('vi-VN') + 'đ';
    };

    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toLocaleString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusInfo = (status) => {
        switch (status) {
            case "Paid":
                return { text: "Chờ xác nhận", color: "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400" };
            case "Confirmed":
                return { text: "Đang chuẩn bị", color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" };
            case "Shipping":
                return { text: "Đang giao", color: "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400" };
            case "Completed":
                return { text: "Hoàn tất", color: "bg-emerald-100 text-emerald-600 dark:text-emerald-400" };
            case "Canceled":
                return { text: "Đã hủy", color: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400" };
            default:
                return { text: status, color: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400" };
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!order) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-background-light dark:bg-background-dark p-4">
                <h2 className="text-xl font-bold mb-4">Không tìm thấy thông tin đơn hàng</h2>
                <button
                    onClick={() => navigate('/homebuyer/order')}
                    className="px-6 py-2 bg-primary text-background-dark font-bold rounded-lg"
                >
                    Quay lại danh sách
                </button>
            </div>
        );
    }

    const statusInfo = getStatusInfo(order.status);
    const orderSteps = [
        { id: "Pending", label: "Đã đặt hàng", icon: <NotebookText size={20} /> },
        { id: "Paid", label: "Chờ xác nhận", icon: "receipt_long" }, // Thay icon phù hợp nếu cần
        { id: "Confirmed", label: "Đang chuẩn bị", icon: "inventory_2" },
        { id: "Shipping", label: "Đang giao", icon: "local_shipping" },
        { id: "Completed", label: "Hoàn tất", icon: "check_circle" },
    ];

    const currentStatusIndex = orderSteps.findIndex(s => s.id === order.status);

    return (
        <div className="bg-background-light dark:bg-background-dark text-[#111813] dark:text-white min-h-screen flex flex-col font-display">
            {/* Main Content */}
            <main className="flex-1 w-full px-4 md:px-10 py-8">
                <button
                    onClick={() => navigate('/homebuyer/order')}
                    className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary mb-6 transition-colors"
                >
                    <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                    Quay lại Đơn hàng của tôi
                </button>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <h1 className="text-2xl font-bold tracking-tight">Chi tiết đơn hàng #{order.id?.split('-')[0].toUpperCase()}</h1>
                            <span className={`px-3 py-1 ${statusInfo.color} text-xs font-bold rounded-full uppercase tracking-wider`}>
                                {statusInfo.text}
                            </span>
                        </div>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                            Ngày đặt hàng: {formatDate(order.createdAt)} | {statusInfo.text}
                        </p>
                    </div>

                </div>

                {/* Stepper Process Mới */}
                {order.status !== "Canceled" && (
                    <div className="bg-surface-light dark:bg-surface-dark border-gray-200 dark:border-gray-700 rounded-xl border py-6 px-2 sm:px-6 mb-6 shadow-sm overflow-hidden">
                        <div className="flex items-center justify-between relative w-full mx-auto">

                            <div className="absolute top-5 left-12 right-12 h-1 bg-gray-200 dark:bg-gray-700" />

                            <div className="absolute top-5 left-12 right-12 h-1">
                                <div
                                    className="h-full bg-emerald-500 transition-all duration-500"
                                    style={{
                                        width: currentStatusIndex >= 0
                                            ? `${(currentStatusIndex / (orderSteps.length - 1)) * 100}%`
                                            : "0%",
                                    }}
                                />
                            </div>

                            {orderSteps.map((step, index) => {
                                const isActive = index === currentStatusIndex; // Đang ở bước này
                                const isDone = index < currentStatusIndex;     // Đã qua bước này

                                return (
                                    <div
                                        key={step.id}
                                        className="flex flex-col items-center relative z-10 w-24" // Tâm là 48px
                                    >
                                        <div
                                            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300
                            ${isDone || isActive
                                                    ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/30"
                                                    : "bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
                                                }`}
                                        >
                                            {typeof step.icon === 'string' ? (
                                                <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>
                                                    {step.icon}
                                                </span>
                                            ) : (
                                                step.icon
                                            )}
                                        </div>

                                        <p
                                            className={`text-xs mt-2 font-medium text-center whitespace-nowrap
                            ${isDone || isActive ? "text-emerald-600 dark:text-emerald-400" : "text-gray-400 dark:text-gray-500"}`}
                                        >
                                            {step.label}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Order Info & Summary Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        {order.status === "Completed" && (
                            <div className="bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/30 rounded-xl p-4 flex gap-4">
                                <div className="shrink-0 size-10 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>check_circle</span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-emerald-800 dark:text-emerald-400">Giao dịch thành công</h3>
                                    <p className="text-sm text-emerald-700 dark:text-emerald-500/80">Bạn đã xác nhận nhận hàng. Người bán sẽ sớm nhận được khoản thanh toán.</p>
                                </div>
                            </div>
                        )}

                        {order.orderItems?.map((item) => (
                            <div key={item.id} className="bg-surface-light dark:bg-surface-dark rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
                                <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-gray-400">person</span>
                                        <span className="text-sm font-semibold">Người bán: Hệ thống Cycled</span>
                                    </div>
                                </div>
                                <div className="p-5 flex gap-5">
                                    <div
                                        className="w-32 h-24 rounded-lg bg-gray-100 dark:bg-gray-800 bg-cover bg-center shrink-0"
                                        style={{ backgroundImage: `url('${item.thumbnail || 'https://via.placeholder.com/150'}')` }}
                                    ></div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                                            Phân loại: {item.category} / {item.brand}
                                        </p>
                                        <div className="flex justify-between items-end">
                                            <span className="text-gray-600 dark:text-gray-400 text-sm">x1</span>
                                            <span className="font-bold text-lg text-primary">{formatPrice(item.unitPrice)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

{order.status === "Completed" && (
    <div className="bg-surface-light dark:bg-surface-dark rounded-xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm">
        <h3 className="font-bold mb-4 flex items-center gap-2 text-[#111813] dark:text-white">
            <span className="material-symbols-outlined text-yellow-500">star</span>
            Đánh giá của bạn
        </h3>
        
        {/* Phần hiển thị sao */}
        <div className="flex items-center gap-1 text-yellow-400 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
                <span 
                    key={star} 
                    className="material-symbols-outlined cursor-pointer hover:scale-110 transition-transform" 
                    style={{ fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}
                >
                    star
                </span>
            ))}
        </div>

        {/* Ô nhập nội dung đánh giá */}
        <div className="flex flex-col gap-3">
            <textarea
                placeholder="Chia sẻ cảm nhận của bạn về sản phẩm này..."
                className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#2bee6c] transition-all min-h-[100px] resize-none"
            />
            
            {/* Nút gửi UI */}
            <button 
                className="self-end px-6 py-2 bg-[#2bee6c] hover:bg-[#1fb350] text-[#111813] font-bold rounded-lg shadow-md transition-all flex items-center gap-2 active:scale-95"
            >
                <span className="material-symbols-outlined text-[18px]">send</span>
                Gửi đánh giá
            </button>
        </div>
    </div>
)}
                    </div>

                    <div className="space-y-6">
                        <div className="bg-surface-light dark:bg-surface-dark rounded-xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm">
                            <h3 className="font-bold mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-gray-400">location_on</span>
                                Địa chỉ nhận hàng
                            </h3>
                            <div className="space-y-1">
                                <p className="text-sm font-bold">{order.receiverName}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{order.receiverPhone}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{order.receiverAddress}</p>
                            </div>
                        </div>

                        <div className="bg-surface-light dark:bg-surface-dark rounded-xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm">
                            <h3 className="font-bold mb-4">Tóm tắt thanh toán</h3>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-500 dark:text-gray-400">Tổng tiền hàng</span>
                                    <span>{formatPrice(order.totalAmount)}</span>
                                </div>
                                <div className="pt-3 border-t border-gray-100 dark:border-gray-700 flex justify-between items-end">
                                    <span className="font-bold">Tổng số tiền</span>
                                    <span className="text-xl font-bold text-primary">{formatPrice(order.totalAmount)}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3">
                            <button
                                onClick={() => navigate('/homebuyer')}
                                className="w-full py-3 bg-primary text-background-dark font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-opacity-90 transition-all flex items-center justify-center gap-2"
                            >
                                <span className="material-symbols-outlined">shopping_cart</span>
                                Tiếp tục mua sắm
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}