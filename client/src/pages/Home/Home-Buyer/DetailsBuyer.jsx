import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// Đảm bảo đường dẫn này trỏ đúng đến file chứa hàm getBikeDetail của bạn
import { getBikeDetail } from '../../../services/axiosClient';

const BikeMarketDetail = () => {
    const { id } = useParams(); // Lấy ID từ URL (VD: /bike-market/123 -> id = 123)

    // SỬA LỖI: Sử dụng useState thay vì useActionState
    const [bike, setBike] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBikeDetail = async () => {
            if (!id) return; // Nếu không có id thì không gọi API

            try {
                setLoading(true);
                const data = await getBikeDetail(id);
                console.log("Lỗi khi tải thông tin xe:", data);
                // Lưu dữ liệu vào state (kiểm tra lại API trả về data trực tiếp hay qua trường data.data)
                setBike(data);
                setError(null);
            } catch (err) {
                console.error("Lỗi khi tải thông tin xe:", err);
                setError('Không thể tải thông tin xe đạp. Vui lòng thử lại sau.');
            } finally {
                setLoading(false);
            }
        };

        fetchBikeDetail();
    }, [id]);

    // 1. Hiển thị trạng thái đang tải
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#f6f8f6] dark:bg-[#102216]">
                <div className="text-emerald-600 font-bold flex items-center gap-2">
                    <span className="material-symbols-outlined animate-spin">progress_activity</span>
                    Đang tải thông tin...
                </div>
            </div>
        );
    }

    // 2. Hiển thị khi có lỗi
    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#f6f8f6] dark:bg-[#102216]">
                <div className="text-red-500 font-bold flex items-center gap-2">
                    <span className="material-symbols-outlined">error</span>
                    {error}
                </div>
            </div>
        );
    }

    // 3. Hiển thị khi không tìm thấy dữ liệu xe
    if (!bike) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#f6f8f6] dark:bg-[#102216]">
                <div className="text-gray-500 font-bold">Không tìm thấy thông tin xe.</div>
            </div>
        );
    }
    // Phải có dòng này ở đầu Component
    const [listing, setListing] = useState(null);
    // --- RENDER GIAO DIỆN CHÍNH ---
    return (
        <div className="bg-[#f6f8f6] dark:bg-[#102216] text-[#111813] dark:text-white font-['Lexend','Noto_Sans',sans-serif] overflow-hidden w-full flex flex-col">
            <main className="flex-1 flex flex-col h-full overflow-hidden relative">
                <div className="flex-1 overflow-y-auto p-4 lg:p-8 scroll-smooth bg-[#f6f8f6] dark:bg-[#102216] 
                [&::-webkit-scrollbar]:!hidden 
                [-ms-overflow-style:none] 
                [scrollbar-width:none]">
                    <div className="max-w-[1200px] mx-auto flex flex-col gap-6">

                        {/* Header / Actions */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                                <div className="flex items-center gap-3">
                                    {/* HIỂN THỊ TITLE TỪ LISTING */}
                                    <h2 className="text-[#111813] dark:text-white text-2xl lg:text-3xl font-bold leading-tight">
                                        {listing.title}
                                    </h2>
                                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${listing.status === 'active' || bike.bikeStatus === 2 ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border-green-200 dark:border-green-800' : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-700'}`}>
                                        {listing.status === 'active' || bike.bikeStatus === 2 ? 'Đang hiển thị' : 'Đã bán / Ẩn'}
                                    </span>
                                </div>
                                {/* HIỂN THỊ CREATEDAT */}
                                <p className="text-[#637588] dark:text-[#a0aec0] text-sm mt-1">
                                    Đăng ngày {new Date(listing.createdAt).toLocaleDateString('vi-VN')} • Mã tin: #{listing.listingId?.slice(0, 8) || id}
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                            {/* Left Column (Images & Description) */}
                            <div className="xl:col-span-2 flex flex-col gap-6">
                                {/* Image Gallery */}
                                <div className="bg-[#ffffff] dark:bg-[#1c2e22] rounded-xl border border-[#e5e7eb] dark:border-[#2a3c30] p-4 shadow-sm">
                                    <div className="w-full aspect-video rounded-lg overflow-hidden bg-gray-100 mb-4 relative group">
                                        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url("${bike.medias?.[0]?.image || ''}")` }}></div>
                                        <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm flex items-center gap-2">
                                            <span className="material-symbols-outlined text-[18px]">photo_camera</span>
                                            1/{bike.medias?.length || 0}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-4 gap-4">
                                        {(bike.medias || []).slice(0, 4).map((m, index) => (
                                            <div key={index} className={`aspect-square rounded-lg bg-gray-100 bg-cover bg-center cursor-pointer hover:opacity-80 transition-opacity ${index === 0 ? 'border-2 border-[#2bee6c]' : ''}`} style={{ backgroundImage: `url("${m.image}")` }}>
                                                {index === 3 && bike.medias?.length > 4 && (
                                                    <div className="w-full h-full bg-black/40 flex items-center justify-center rounded-lg text-white font-bold text-lg">
                                                        +{bike.medias.length - 4}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* HIỂN THỊ DESCRIPTION TỪ LISTING */}
                                <div className="bg-[#ffffff] dark:bg-[#1c2e22] rounded-xl border border-[#e5e7eb] dark:border-[#2a3c30] p-6 shadow-sm">
                                    <h3 className="text-lg font-bold text-[#111813] dark:text-white mb-4 border-b border-[#f0f4f2] dark:border-[#2a3c30] pb-2">Mô tả chi tiết</h3>
                                    <div className="prose dark:prose-invert max-w-none text-[#374151] dark:text-[#cbd5e1] text-sm leading-relaxed whitespace-pre-line">
                                        {listing.description || 'Chưa có mô tả cho sản phẩm này.'}
                                    </div>
                                </div>
                            </div>

                            {/* Right Column (Payment Card, Specs) */}
                            <div className="flex flex-col gap-6">
                                {/* Payment Card */}
                                <div className="bg-[#ffffff] dark:bg-[#1c2e22] rounded-2xl border border-[#e5e7eb] dark:border-[#2a3c30] p-6 shadow-md flex flex-col gap-6">
                                    <div className="flex justify-between items-start">
                                        <div className="flex flex-col gap-2">
                                            <h2 className="text-2xl font-extrabold text-[#111813] dark:text-white tracking-tight">{bike.brand} {bike.category}</h2>
                                            <div className="inline-flex items-center w-fit px-3 py-1 bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 text-green-700 dark:text-green-400 rounded-full">
                                                <span className="size-1.5 bg-green-500 rounded-full mr-2"></span>
                                                <span className="text-[10px] font-bold uppercase tracking-wider">Tình trạng: {bike.overall || "N/A"}</span>
                                            </div>
                                        </div>
                                        <button className="text-gray-300 hover:text-red-500 transition-colors">
                                            <span className="material-symbols-outlined text-[28px]">favorite</span>
                                        </button>
                                    </div>

                                    <div className="flex flex-wrap gap-2 text-[#637588] dark:text-[#a0aec0] text-[10px] font-bold uppercase tracking-widest">
                                        <span>Size {bike.frameSize}</span>
                                        <span>•</span>
                                        <span>{bike.frameMaterial}</span>
                                        <span>•</span>
                                        <span>{bike.paint}</span>
                                    </div>

                                    <div className="flex items-baseline gap-3">
                                        <span className="text-3xl font-black text-emerald-700 dark:text-emerald-400 tracking-tight">
                                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(bike.price || 0)}
                                        </span>
                                    </div>

                                    <div className="flex flex-col gap-3 pt-2">
                                        <button className="flex items-center justify-center gap-3 bg-[#066e48] text-white font-bold py-4 rounded-xl hover:bg-[#055a3b] transition-all shadow-lg shadow-emerald-900/10 group">
                                            <span className="material-symbols-outlined">shopping_cart_checkout</span>
                                            Mua ngay
                                        </button>
                                        <button
                                            onClick={() => handleAddToCart(bike.id)}
                                            className="flex items-center justify-center gap-3 bg-[#10b981] text-white font-bold py-4 rounded-xl hover:bg-[#059669] transition-all shadow-lg shadow-emerald-500/10 group">
                                            <span className="material-symbols-outlined">add_shopping_cart</span>
                                            Thêm vào giỏ hàng
                                        </button>
                                    </div>
                                </div>

                                {/* Tech Specs */}
                                <div className="bg-[#ffffff] dark:bg-[#1c2e22] rounded-xl border border-[#e5e7eb] dark:border-[#2a3c30] p-5 shadow-sm">
                                    <h3 className="text-base font-bold text-[#111813] dark:text-white mb-4">Thông số kỹ thuật</h3>
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-2 gap-y-2 text-sm border-b border-gray-100 dark:border-gray-800 pb-3">
                                            <div className="text-[#637588] dark:text-[#a0aec0]">Groupset</div>
                                            <div className="text-right font-medium">{bike.groupset}</div>
                                            <div className="text-[#637588] dark:text-[#a0aec0]">Vận hành</div>
                                            <div className="text-right font-medium text-green-500">{bike.operating}</div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-y-2 text-sm">
                                            <div className="text-[#637588] dark:text-[#a0aec0]">Vành & Lốp</div>
                                            <div className="text-right font-medium">{bike.tireRim}</div>
                                            <div className="text-[#637588] dark:text-[#a0aec0]">Phanh</div>
                                            <div className="text-right font-medium">{bike.brakeType}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};



export default BikeMarketDetail;