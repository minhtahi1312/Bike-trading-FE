import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// Đảm bảo đường dẫn này trỏ đúng đến file chứa hàm getBikeDetail của bạn
import { addCartItem, getBikeDetail } from '../../../services/axiosClient';

const BikeMarketDetail = () => {
    const { id } = useParams(); // Lấy ID từ URL (VD: /bike-market/123 -> id = 123)

    // SỬA LỖI: Sử dụng useState thay vì useActionState
    const [bike, setBike] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchListingDetail = async () => {
            if (!id) return;

            try {
                setLoading(true);
                // GIẢ SỬ: Bạn đổi hàm API thành getListingDetail hoặc truyền đúng endpoint của Listing
                const data = await getBikeDetail(id);
                console.log("👉 DỮ LIỆU TỪ API TRẢ VỀ:", data); // Thêm dòng này!                // Nếu API trả về Listing object chứa Bike object bên trong (ví dụ: data.bike)
                // Bạn có thể cần setBike(data.bike) tùy vào cấu trúc JSON của Backend
                setBike(data);

                setError(null);
            } catch (err) {
                console.error("Lỗi khi tải thông tin từ Listing ID:", err);
                setError('Không thể tìm thấy tin đăng này.');
            } finally {
                setLoading(false);
            }
        };

        fetchListingDetail();
    }, [id]);

    const handleAddCartItem = async () => {
        try {
            // Gọi API để thêm vào giỏ hàng
            await addCartItem(bike.bikes[0].id);
            alert('Đã thêm vào giỏ hàng!');
        } catch (err) {  
            console.error("Lỗi khi thêm vào giỏ hàng:", err);
                        alert('thêm cc!');

           } 
    
    };



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

    // --- RENDER GIAO DIỆN CHÍNH ---
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
                                    <h2 className="text-[#111813] dark:text-white text-2xl lg:text-3xl font-bold leading-tight">
                                        {bike.title}
                                    </h2>
                                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${bike.status === 3 ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border-green-200 dark:border-green-800' : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-700'}`}>
                                        {bike.status === 3 ? 'Đang hiển thị' : 'Đã bán / Ẩn'}
                                    </span>
                                </div>
                                <p className="text-[#637588] dark:text-[#a0aec0] text-sm mt-1">
                                    Đăng ngày {new Date(bike.createdAt).toLocaleDateString('vi-VN')} • Mã tin: #{bike.listingId || id}
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                            {/* Left Column (Images & Description) */}
                            <div className="xl:col-span-2 flex flex-col gap-6">
                                <div className="bg-[#ffffff] dark:bg-[#1c2e22] rounded-xl border border-[#e5e7eb] dark:border-[#2a3c30] p-4 shadow-sm">
                                    <div className="w-full aspect-video rounded-lg overflow-hidden bg-gray-100 mb-4 relative group">

                                        {/* HIỂN THỊ MAIN MEDIA: Nếu media đầu tiên là video thì hiện <video>, ngược lại hiện ảnh */}
                                        {(bike?.bikes?.[0]?.medias?.[0]?.videoUrl || bike?.bikes?.[0]?.medias?.[0]?.video) ? (
                                            <video
                                                src={bike?.bikes?.[0]?.medias?.[0]?.videoUrl || bike?.bikes?.[0]?.medias?.[0]?.video}
                                                controls
                                                className="absolute inset-0 w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url("${bike?.bikes?.[0]?.medias?.[1]?.image || bike?.bikes?.[0]?.medias?.[0]?.image || ''}")` }}></div>
                                        )}

                                        <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm flex items-center gap-2 z-10">
                                            <span className="material-symbols-outlined text-[18px]">photo_camera</span>
                                            1/{bike?.bikes?.[0]?.medias?.length || 0}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-4 gap-4">
                                        {(bike?.bikes?.[0]?.medias || []).slice(0, 4).map((media, index) => {
                                            // Kiểm tra xem phần tử này có phải video không
                                            const isVideo = media.videoUrl || media.video;

                                            return (
                                                <div
                                                    key={index}
                                                    className={`aspect-square rounded-lg bg-gray-100 bg-cover bg-center cursor-pointer hover:opacity-80 transition-opacity relative ${index === 0 ? 'border-2 border-[#2bee6c]' : ''}`}
                                                    style={{ backgroundImage: `url("${media.image || ''}")` }}
                                                >
                                                    {/* NẾU LÀ VIDEO: Hiện icon Play ở giữa ảnh thu nhỏ */}
                                                    {isVideo && (
                                                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg">
                                                            <span className="material-symbols-outlined text-white text-3xl drop-shadow-md">play_circle</span>
                                                        </div>
                                                    )}

                                                    {/* NẾU LÀ ẢNH CUỐI CÙNG VÀ CÒN NHIỀU ẢNH KHÁC: Hiện lớp phủ +số lượng */}
                                                    {index === 3 && bike?.bikes?.[0]?.medias?.length > 4 && (
                                                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg text-white font-bold text-lg">
                                                            +{bike?.bikes?.[0]?.medias?.length - 4}
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div className="bg-[#ffffff] dark:bg-[#1c2e22] rounded-xl border border-[#e5e7eb] dark:border-[#2a3c30] p-6 shadow-sm">
                                    <h3 className="text-lg font-bold text-[#111813] dark:text-white mb-4 border-b border-[#f0f4f2] dark:border-[#2a3c30] pb-2">Mô tả chi tiết</h3>
                                    <div className="prose dark:prose-invert max-w-none text-[#374151] dark:text-[#cbd5e1] text-sm leading-relaxed whitespace-pre-line">
                                        {bike.description || 'Chưa có mô tả cho sản phẩm này.'}
                                    </div>
                                </div>
                            </div>

                            {/* Right Column (Payment Card, Stats, Specs) */}
                            <div className="flex flex-col gap-6">

                                {/* Payment Card */}
                                <div className="bg-[#ffffff] dark:bg-[#1c2e22] rounded-2xl border border-[#e5e7eb] dark:border-[#2a3c30] p-6 shadow-md flex flex-col gap-6">
                                    <div className="flex justify-between items-start">
                                        <div className="flex flex-col gap-2">
                                            <h2 className="text-2xl font-extrabold text-[#111813] dark:text-white tracking-tight">{bike?.bikes?.[0]?.brand} {bike?.bikes?.[0]?.category}</h2>
                                            <div className="inline-flex items-center w-fit px-3 py-1 bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 text-green-700 dark:text-green-400 rounded-full">
                                                <span className="size-1.5 bg-green-500 rounded-full mr-2"></span>
                                                <span className="text-[10px] font-bold uppercase tracking-wider">Độ mới: {bike?.bikes?.[0]?.overall}</span>
                                            </div>
                                        </div>
                                        <button className="text-gray-300 hover:text-red-500 transition-colors">
                                            <span className="material-symbols-outlined text-[28px]">favorite</span>
                                        </button>
                                    </div>

                                    <div className="flex flex-wrap gap-2 text-[#637588] dark:text-[#a0aec0] text-[10px] font-bold uppercase tracking-widest">
                                        <span>Khung {bike?.bikes?.[0]?.frameMaterial}</span>
                                        <span>•</span>
                                        <span>Size {bike?.bikes?.[0]?.frameSize}</span>
                                        <span>•</span>
                                        <span>Phanh {bike?.bikes?.[0]?.brakeType}</span>
                                    </div>

                                    <div className="flex items-baseline gap-3">
                                        <span className="text-3xl font-black text-emerald-700 dark:text-emerald-400 tracking-tight">
                                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(bike?.bikes?.[0]?.price || 0)}
                                        </span>
                                    </div>

                                    <div className="flex flex-col gap-3 pt-2">
                                        <button className="flex items-center justify-center gap-3 bg-[#066e48] text-white font-bold py-4 rounded-xl hover:bg-[#055a3b] transition-all shadow-lg shadow-emerald-900/10 group">
                                            <span className="material-symbols-outlined [font-variation-settings:'FILL'_1] group-hover:scale-110 transition-transform">shopping_cart_checkout</span>
                                            Mua ngay
                                        </button>
                                        <button onClick={handleAddCartItem  } className="flex items-center justify-center gap-3 bg-[#10b981] text-white font-bold py-4 rounded-xl hover:bg-[#059669] transition-all shadow-lg shadow-emerald-500/10 group">
                                            <span className="material-symbols-outlined [font-variation-settings:'FILL'_1] group-hover:scale-110 transition-transform">add_shopping_cart</span>
                                            Thêm vào giỏ hàng
                                        </button>
                                    </div>
                                </div>

                                {/* Tech Specs */}
                                <div className="bg-[#ffffff] dark:bg-[#1c2e22] rounded-xl border border-[#e5e7eb] dark:border-[#2a3c30] p-5 shadow-sm">
                                    <h3 className="text-base font-bold text-[#111813] dark:text-white mb-4">Thông số kỹ thuật</h3>
                                    <div className="space-y-5">
                                        <div>
                                            <h4 className="text-xs font-bold uppercase text-[#94a3b8] dark:text-[#64748b] mb-3 flex items-center gap-2">
                                                <span className="material-symbols-outlined text-[16px]">info</span> Tổng quan
                                            </h4>
                                            <div className="grid grid-cols-2 gap-y-2 text-sm">
                                                <div className="text-[#637588] dark:text-[#a0aec0]">Thương hiệu</div>
                                                <div className="text-right font-medium text-[#111813] dark:text-white">{bike?.bikes?.[0]?.brand || 'N/A'}</div>

                                                <div className="text-[#637588] dark:text-[#a0aec0]">Loại xe</div>
                                                <div className="text-right font-medium text-[#111813] dark:text-white">{bike?.bikes?.[0]?.category || 'N/A'}</div>

                                                <div className="text-[#637588] dark:text-[#a0aec0]">Kích thước</div>
                                                <div className="text-right font-medium text-[#111813] dark:text-white">Size {bike?.bikes?.[0]?.frameSize || 'N/A'}</div>

                                                <div className="text-[#637588] dark:text-[#a0aec0]">Chất liệu khung</div>
                                                <div className="text-right font-medium text-[#111813] dark:text-white">{bike?.bikes?.[0]?.frameMaterial || 'N/A'}</div>

                                                <div className="text-[#637588] dark:text-[#a0aec0]">Màu sơn</div>
                                                <div className="text-right font-medium text-[#111813] dark:text-white">{bike?.bikes?.[0]?.paint || 'N/A'}</div>

                                                <div className="text-[#637588] dark:text-[#a0aec0]">Bộ truyền động</div>
                                                <div className="text-right font-medium text-[#111813] dark:text-white">{bike?.bikes?.[0]?.groupset || 'N/A'}</div>

                                                <div className="text-[#637588] dark:text-[#a0aec0]">Vận hành</div>
                                                <div className="text-right font-medium text-[#111813] dark:text-white">{bike?.bikes?.[0]?.operating || 'N/A'}</div>
                                                <div className="text-[#637588] dark:text-[#a0aec0]">Vành / Lốp</div>
                                                <div className="text-right font-medium text-[#111813] dark:text-white">{bike?.bikes?.[0]?.tireRim || 'N/A'}</div>

                                                <div className="text-[#637588] dark:text-[#a0aec0]">Loại phanh</div>
                                                <div className="text-right font-medium text-[#111813] dark:text-white">{bike?.bikes?.[0]?.brakeType || 'N/A'}</div>

                                                <div className="text-[#637588] dark:text-[#a0aec0]">Tổng thể</div>
                                                <div className="text-right font-medium text-[#111813] dark:text-white">{bike?.bikes?.[0]?.overall || 'N/A'}</div>

                                            </div>
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