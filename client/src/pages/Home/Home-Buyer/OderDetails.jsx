import { NotebookText } from "lucide-react";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function OrderDetail() {
    const navigate = useNavigate();
    const { id } = useParams();
    return (
        <div className="bg-background-light dark:bg-background-dark text-[#111813] dark:text-white min-h-screen flex flex-col font-display">


            {/* Main Content */}
            <main className="flex-1 w-full max-w-[1000px] mx-auto px-4 md:px-10 py-8">
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
                            <h1 className="text-2xl font-bold tracking-tight">Chi tiết đơn hàng #{id || 'ORD-66219'}</h1>
                            <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold rounded-full uppercase tracking-wider">Hoàn tất</span>
                        </div>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">Ngày đặt hàng: 10/09/2023 14:30 | Giao dịch thành công</p>
                    </div>
                    <div className="flex gap-2">
                        <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                            <span className="material-symbols-outlined text-[18px]">receipt_long</span>
                            Xuất hóa đơn
                        </button>
                    </div>
                </div>

                {/* Stepper Process */}
                <div className="bg-surface-light dark:bg-surface-dark rounded-xl border border-gray-200 dark:border-gray-700 p-8 mb-6 shadow-sm">
                    <div className="flex items-center justify-between relative">
                        {/* Bước 1: Đã đặt hàng */}
                        <div className="flex flex-col items-center z-10 w-24">
                            <div className="size-10 rounded-full bg-white border border-emerald-custom text-emerald-custom flex items-center justify-center mb-2 shadow-lg shadow-emerald-500/20">
                                <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>
                                    <NotebookText size={20} />
                                </span>
                            </div>
                            <span className="text-xs font-semibold text-emerald-custom text-center whitespace-nowrap">Đã đặt hàng</span>
                            <span className="text-[10px] text-gray-400 mt-1">10/09/2023</span>
                        </div>

                        {/* Mũi tên 1 -> 2 */}
                        <div className="flex-1 flex justify-center items-start pt-2">
                            <span className="material-symbols-outlined text-emerald-custom/50 text-2xl">chevron_right</span>
                        </div>

                        {/* Bước 2: Đã thanh toán */}
                        <div className="flex flex-col items-center z-10 w-24">
                            <div className="size-10 rounded-full bg-white border border-emerald-custom text-emerald-custom flex items-center justify-center mb-2 shadow-lg shadow-emerald-500/20">
                                <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>
                                    payments
                                </span>
                            </div>
                            <span className="text-xs font-semibold text-emerald-custom text-center whitespace-nowrap">Đã thanh toán</span>
                            <span className="text-[10px] text-gray-400 mt-1">10/09/2023</span>
                        </div>

                        {/* Mũi tên 2 -> 3 */}
                        <div className="flex-1 flex justify-center items-start pt-2">
                            <span className="material-symbols-outlined text-emerald-custom/50 text-2xl">chevron_right</span>
                        </div>

                        {/* Bước 3: Đang giao */}
                        <div className="flex flex-col items-center z-10 w-24">
                            <div className="size-10 rounded-full bg-white border border-emerald-custom text-emerald-custom flex items-center justify-center mb-2 shadow-lg shadow-emerald-500/20">
                                <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>
                                    local_shipping
                                </span>
                            </div>
                            <span className="text-xs font-semibold text-emerald-custom text-center whitespace-nowrap">Đang giao</span>
                            <span className="text-[10px] text-gray-400 mt-1">11/09/2023</span>
                        </div>

                        {/* Mũi tên 3 -> 4 */}
                        <div className="flex-1 flex justify-center items-start pt-2">
                            <span className="material-symbols-outlined text-emerald-custom/50 text-2xl">chevron_right</span>
                        </div>

                        {/* Bước 4: Hoàn tất */}
                        <div className="flex flex-col items-center z-10 w-24">
                            <div className="size-10 rounded-full bg-white border border-emerald-custom text-emerald-custom flex items-center justify-center mb-2 shadow-lg shadow-emerald-500/20">
                                <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>
                                    verified
                                </span>
                            </div>
                            <span className="text-xs font-semibold text-emerald-custom text-center whitespace-nowrap">Hoàn tất</span>
                            <span className="text-[10px] text-gray-400 mt-1">12/09/2023</span>
                        </div>
                    </div>
                </div>
                {/* Order Info & Summary Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/30 rounded-xl p-4 flex gap-4">
                            <div className="shrink-0 size-10 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>check_circle</span>
                            </div>
                            <div>
                                <h3 className="font-bold text-emerald-800 dark:text-emerald-400">Giao dịch thành công</h3>
                                <p className="text-sm text-emerald-700 dark:text-emerald-500/80">Bạn đã xác nhận nhận hàng. Người bán sẽ sớm nhận được khoản thanh toán.</p>
                            </div>
                        </div>

                        <div className="bg-surface-light dark:bg-surface-dark rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
                            <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-gray-400">person</span>
                                    <span className="text-sm font-semibold">Người bán: Nguyễn Văn C</span>
                                </div>
                                <button className="text-sm text-primary font-medium hover:underline flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[18px]">chat</span>
                                    Chat ngay
                                </button>
                            </div>
                            <div className="p-5 flex gap-5">
                                <div
                                    className="w-32 h-24 rounded-lg bg-gray-100 dark:bg-gray-800 bg-cover bg-center shrink-0"
                                    style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAoQyP-8P1EEj4Y2qKW4iNWCK9tpDHrLE13JmGn0ECDx7e2appHP7Wrf4hzMr6HCad6fIJ_47vaFteeSUX8HPFxDELz9NRzSUCkcGg2fDKT0ELhdR9SG17G28jvc-cuj_pRH7oLC2Ka64JHAROKdpLhNsETvec0VLQyoUk8hU5Cc8H2oAOTN-OMus1WgJhAN1V1c6Gm36yr3APBkbkTfBOWN2Q7T0q64eZ3BE2xydEWLFXi4NxE0YJkPIOiI39VbIvsnl5jxPCBZY1j')" }}
                                ></div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-lg mb-1">Peugeot Vintage Road Bike</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Phân loại: Vintage Classic / Size M</p>
                                    <div className="flex justify-between items-end">
                                        <span className="text-gray-600 dark:text-gray-400 text-sm">x1</span>
                                        <span className="font-bold text-lg text-primary">4.500.000đ</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-surface-light dark:bg-surface-dark rounded-xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm">
                            <h3 className="font-bold mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-yellow-500">star</span>
                                Đánh giá của bạn
                            </h3>
                            <div className="flex items-center gap-1 text-yellow-400 mb-3">
                                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>star</span>
                                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>star</span>
                                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>star</span>
                                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>star</span>
                                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>star</span>
                                <span className="ml-2 text-sm font-semibold text-gray-700 dark:text-gray-300">Tuyệt vời</span>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border border-gray-100 dark:border-gray-700">
                                <p className="text-sm italic text-gray-600 dark:text-gray-400">"Xe rất đẹp, đúng như mô tả. Người bán tư vấn nhiệt tình và giao hàng rất cẩn thận. Rất hài lòng với trải nghiệm mua sắm này!"</p>
                            </div>
                            <div className="mt-3 flex gap-2">
                                <div
                                    className="size-16 rounded border border-gray-200 dark:border-gray-700 bg-cover bg-center"
                                    style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAoQyP-8P1EEj4Y2qKW4iNWCK9tpDHrLE13JmGn0ECDx7e2appHP7Wrf4hzMr6HCad6fIJ_47vaFteeSUX8HPFxDELz9NRzSUCkcGg2fDKT0ELhdR9SG17G28jvc-cuj_pRH7oLC2Ka64JHAROKdpLhNsETvec0VLQyoUk8hU5Cc8H2oAOTN-OMus1WgJhAN1V1c6Gm36yr3APBkbkTfBOWN2Q7T0q64eZ3BE2xydEWLFXi4NxE0YJkPIOiI39VbIvsnl5jxPCBZY1j')" }}
                                ></div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-surface-light dark:bg-surface-dark rounded-xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm">
                            <h3 className="font-bold mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-gray-400">location_on</span>
                                Địa chỉ nhận hàng
                            </h3>
                            <div className="space-y-1">
                                <p className="text-sm font-bold">Lê Minh Tuấn</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">(+84) 90 123 4567</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">123 Đường Phan Xích Long, Phường 2, Quận Phú Nhuận, TP. Hồ Chí Minh</p>
                            </div>
                        </div>

                        <div className="bg-surface-light dark:bg-surface-dark rounded-xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm">
                            <h3 className="font-bold mb-4">Tóm tắt thanh toán</h3>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-500 dark:text-gray-400">Tổng tiền hàng</span>
                                    <span>4.500.000đ</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500 dark:text-gray-400">Phí vận chuyển</span>
                                    <span>150.000đ</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500 dark:text-gray-400">Giảm giá phí vận chuyển</span>
                                    <span className="text-emerald-500">-50.000đ</span>
                                </div>
                                <div className="pt-3 border-t border-gray-100 dark:border-gray-700 flex justify-between items-end">
                                    <span className="font-bold">Tổng số tiền</span>
                                    <span className="text-xl font-bold text-primary">4.600.000đ</span>
                                </div>
                                <div className="flex justify-between items-center text-xs text-gray-400 pt-1">
                                    <span>Phương thức: Thẻ tín dụng</span>
                                    <span>Visa **** 4422</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3">
                            <button className="w-full py-3 bg-primary text-background-dark font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-opacity-90 transition-all flex items-center justify-center gap-2">
                                <span className="material-symbols-outlined">shopping_cart</span>
                                Mua lại xe này
                            </button>
                            <button className="w-full py-3 border border-gray-200 dark:border-gray-700 bg-white dark:bg-surface-dark font-semibold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all flex items-center justify-center gap-2">
                                <span className="material-symbols-outlined">description</span>
                                Xuất hóa đơn điện tử
                            </button>
                            <button className="w-full py-3 border border-gray-200 dark:border-gray-700 bg-white dark:bg-surface-dark font-semibold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all flex items-center justify-center gap-2 text-gray-500">
                                <span className="material-symbols-outlined">chat</span>
                                Liên hệ hỗ trợ
                            </button>
                        </div>
                    </div>
                </div>
            </main>


        </div>
    );
}