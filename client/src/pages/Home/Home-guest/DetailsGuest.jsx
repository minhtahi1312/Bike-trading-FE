import React, { useState, useEffect } from 'react';
import { Navigate, useParams, useNavigate, useLocation } from 'react-router-dom';
import { addCartItem, addToWishlist, buyNowOrder, getBikeDetail, getWishlist, removeFromWishlist } from '../../../services/axiosClient';
import { toast } from 'react-toastify';
import { Heart } from 'lucide-react';

const DetailsGuest = () => {
    const { id } = useParams();
    const navigate = useNavigate();


    const [bike, setBike] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);


    const [wishlistIds, setWishlistIds] = useState(new Set());
    useEffect(() => {
        loadWishlist();
    }, []);

    const loadWishlist = async () => {
        try {
            const response = await getWishlist();
            const dataArray = Array.isArray(response) ? response : response?.data || [];

            const ids = new Set();
            dataArray.forEach(item => {
                const bikeId = item.bikeId || item?.bike?.id;
                if (bikeId) ids.add(bikeId);
            });

            setWishlistIds(ids);
        } catch (err) {
            console.error("Load wishlist lỗi:", err);
        }
    };
    const bikeId = bike?.bikes?.[0]?.id;
    const isWishlisted = wishlistIds.has(bikeId);
    /*---------------------------------------*/

    const initialSelected = JSON.parse(localStorage.getItem('selectedCartItems')) || [];
    const [selectedItems, setSelectedItems] = useState(initialSelected);
    // 2. FETCH DỮ LIỆU
    useEffect(() => {
        const fetchListingDetail = async () => {
            if (!id) return;

            try {
                setLoading(true);
                const data = await getBikeDetail(id);
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

    /* --------- API WISHLIST--------- */
    const handleWishlistToggle = async (bikeId) => {
        try {
            if (wishlistIds.has(bikeId)) {
                await removeFromWishlist(bikeId);

                setWishlistIds(prev => {
                    const newSet = new Set(prev);
                    newSet.delete(bikeId);
                    return newSet;
                });

                toast.success("Đã xóa khỏi danh sách yêu thích");
            } else {
                await addToWishlist(bikeId);

                setWishlistIds(prev => {
                    const newSet = new Set(prev);
                    newSet.add(bikeId);
                    return newSet;
                });
                
                toast.success("Đã thêm vào danh sách yêu thích");
            }
        } catch (err) {
            toast.error("Lỗi wishlist");
        }
    };
    /*-------- API CART --------- */
    const handleAddCartItem = async () => {
        try {
            await addCartItem(bike.bikes[0].id);
            toast.success("Đã thêm vào giỏ hàng!");
        } catch (err) {
            console.error("Lỗi khi thêm vào giỏ hàng:", err);
            toast.error("Xe đã có trong giỏ hàng.");
        }
    };




    /* --------- API BUY NOW --------- */
    const handleBuyNow = async () => {
        const bikeId = bike?.bikes?.[0]?.id;

        if (!bikeId) {
            toast.error("Không tìm thấy mã sản phẩm.");
            return;
        }

        try {
            const response = await buyNowOrder(bikeId);

            toast.success("Đặt hàng thành công!");
            navigate('/homebuyer/cart');
        } catch (err) {
            const errorMessage = err.response?.data?.message || "Đặt hàng thất bại. Vui lòng thử lại!";
            toast.error(errorMessage);
        }
    };
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#f6f8f6] dark:bg-[#102216]">
                <div className="text-[#066e48] font-bold flex items-center gap-2">
                    <span className="material-symbols-outlined animate-spin">progress_activity</span>
                    Đang tải thông tin...
                </div>
            </div>
        );
    }

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

    if (!bike) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#f6f8f6] dark:bg-[#102216]">
                <div className="text-gray-500 font-bold">Không tìm thấy thông tin xe.</div>
            </div>
        );
    }

    const medias = bike?.bikes?.[0]?.medias || [];
    const activeMedia = medias[activeIndex] || {};
    const isActiveVideo = activeMedia.videoUrl || activeMedia.video;
    const renderInspectionItem = (label, value) => (
        <div className="flex justify-between items-center py-2 border-b border-gray-50 dark:border-gray-800 last:border-0">
            <span className="text-sm text-gray-600 dark:text-gray-400">{label}</span>
            <span className={`text-sm font-bold ${value === true ? 'text-emerald-500' : 'text-red-500'}`}>

                {value === true ? "Tốt" : value === false ? "Không đạt" : "N/A"}
            </span>
        </div>
    );

    const bikeInfo = bike?.bikes?.[0] || {};
    const inspectionData = bike?.bikes?.[0]?.inspections?.[0] || {};
    const status = bike?.status === 3 ? "Active" : "Sold";


    const reviews = bike?.sellerReviewSummary?.latestReviews || [];
    const sellerName = bike?.sellerReviewSummary?.sellerName;
    const joinDate = bike?.sellerReviewSummary?.joinDate;
    const averageRating = bike?.sellerReviewSummary?.averageRating;
    const totalReviews = bike?.sellerReviewSummary?.totalReviews;
    console.log("🚀 ~ file: DetailsBuyer.jsx:263 ~ BikeMarketDetail ~ reviews:", reviews, sellerName, joinDate);
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
                            {/* Left Column  */}
                            <div className="xl:col-span-2 flex flex-col gap-6">
                                <div className="bg-[#ffffff] dark:bg-[#1c2e22] rounded-xl border border-[#e5e7eb] dark:border-[#2a3c30] p-4 shadow-sm">
                                    <div className="w-full aspect-video rounded-lg overflow-hidden bg-gray-100 mb-4 relative group">

                                        {isActiveVideo ? (
                                            <video
                                                key={isActiveVideo}
                                                src={isActiveVideo}
                                                controls
                                                autoPlay
                                                className="absolute inset-0 w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div
                                                className="absolute inset-0 bg-cover bg-center transition-all duration-300"
                                                style={{ backgroundImage: `url("${activeMedia.image || ''}")` }}
                                            ></div>
                                        )}

                                        <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm flex items-center gap-2 z-10">
                                            <span className="material-symbols-outlined text-[18px]">photo_camera</span>
                                            {activeIndex + 1}/{medias.length || 0}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-4 gap-4">
                                        {medias.slice(0, 4).map((media, index) => {
                                            const isVideo = media.videoUrl || media.video;

                                            return (
                                                <div
                                                    key={index}
                                                    onClick={() => setActiveIndex(index)}
                                                    className={`aspect-square rounded-lg bg-gray-100 bg-cover bg-center cursor-pointer hover:opacity-80 transition-all relative ${activeIndex === index ? 'border-2 border-[#2bee6c] scale-[1.02] shadow-md' : 'opacity-70'
                                                        }`}
                                                    style={{ backgroundImage: `url("${media.image || ''}")` }}
                                                >
                                                    {isVideo && (
                                                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg">
                                                            <span className="material-symbols-outlined text-white text-3xl drop-shadow-md">play_circle</span>
                                                        </div>
                                                    )}

                                                    {index === 3 && medias.length > 4 && (
                                                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg text-white font-bold text-lg">
                                                            +{medias.length - 4}
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
                                <div className="bg-[#ffffff] dark:bg-[#1c2e22] rounded-xl border border-[#e5e7eb] dark:border-[#2a3c30] p-6 shadow-sm mt-6">
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">

                                        {/* Phần Trái */}
                                        <div className="flex items-center gap-5">
                                            {/* Avatar & Badge Tích xanh */}
                                            <div className="relative">
                                                <div className="w-[84px] h-[84px] rounded-full bg-[#f6aa41] p-1 shadow-sm">
                                                    <img
                                                        src="https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg"
                                                        alt="Avatar Người Bán"
                                                        className="w-full h-full rounded-full object-cover bg-white"
                                                    />
                                                </div>
                                                <div className="absolute bottom-0 right-0 bg-[#00d856] rounded-full w-6 h-6 flex items-center justify-center border-2 border-white dark:border-[#1c2e22]">
                                                    <span className="material-symbols-outlined text-black text-[14px] font-bold">check_circle</span>
                                                </div>
                                            </div>

                                            {/* Tên, Rating & Labels */}
                                            <div className="flex flex-col gap-1.5">
                                                <h2 className="text-2xl font-bold text-[#111813] dark:text-white">
                                                    {sellerName}
                                                </h2>

                                                {/* Rating & Total Reviews */}
                                                <div className="flex items-center gap-2">
                                                    <div className="flex items-center text-[#ffc107]">
                                                        {[...Array(5)].map((_, i) => (
                                                            <span key={i} className="material-symbols-outlined text-[18px] [font-variation-settings:'FILL'_1]">star</span>
                                                        ))}
                                                    </div>
                                                    <span className="font-bold text-[#111813] dark:text-white text-base">
                                                        {averageRating}
                                                    </span>
                                                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                                        ({totalReviews} đánh giá)
                                                    </span>
                                                </div>

                                                {/* Tags (Uy tín & Kiểm định) */}
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className="text-[11px] font-bold text-[#059669] bg-[#d1fae5] dark:bg-[#064e3b]/50 px-3 py-1.5 rounded-full uppercase tracking-wide">
                                                        Người bán uy tín
                                                    </span>
                                                    <span className="text-[11px] font-bold text-[#2563eb] bg-[#eff6ff] dark:bg-[#1e3a8a]/50 px-3 py-1.5 rounded-full uppercase tracking-wide">
                                                        Đã kiểm định
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Phần Phải: Thống kê (Tỷ lệ phản hồi & Thời gian) */}
                                        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">

                                            <div className="border border-[#e5e7eb] dark:border-[#2a3c30] rounded-xl p-4 flex-1 min-w-[180px] bg-white dark:bg-[#1c2e22]">
                                                <p className="text-[11px] font-bold text-[#6b7280] dark:text-gray-400 uppercase tracking-widest mb-1.5">
                                                    Tỷ lệ phản hồi
                                                </p>
                                                <div className="flex items-center gap-2">
                                                    <span className="material-symbols-outlined text-[#10b981] text-[20px] [font-variation-settings:'FILL'_1]">bolt</span>
                                                    <span className="font-bold text-[#111813] dark:text-white text-[15px]">
                                                        98% <span className="font-normal">(trong 1h)</span>
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="border border-[#e5e7eb] dark:border-[#2a3c30] rounded-xl p-4 flex-1 min-w-[180px] bg-white dark:bg-[#1c2e22]">
                                                <p className="text-[11px] font-bold text-[#6b7280] dark:text-gray-400 uppercase tracking-widest mb-1.5">
                                                    Thời gian tham gia
                                                </p>
                                                <div className="flex items-center gap-2">
                                                    <span className="material-symbols-outlined text-[#3b82f6] text-[18px]">calendar_today</span>
                                                    <span className="font-bold text-[#111813] dark:text-white text-[15px]">
                                                        {joinDate}
                                                    </span>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className="bg-[#ffffff] dark:bg-[#1c2e22] rounded-xl border border-[#e5e7eb] dark:border-[#2a3c30] p-6 shadow-sm mt-6">
                                    <div className="flex items-center justify-between mb-6 border-b border-[#f0f4f2] dark:border-[#2a3c30] pb-4">
                                        <h3 className="text-lg font-bold text-[#111813] dark:text-white">
                                            Đánh giá từ người mua ({reviews.length})
                                        </h3>
                                        {bike?.sellerReviewSummary?.totalReviews > 0 && (
                                            <div className="flex items-center gap-1.5 bg-yellow-50 dark:bg-yellow-900/20 px-3 py-1 rounded-full border border-yellow-100 dark:border-yellow-800/50">
                                                <span className="text-sm font-black text-yellow-600 dark:text-yellow-400">
                                                    {/* Lấy thẳng điểm trung bình từ API, thêm toFixed(1) để luôn hiển thị dạng 5.0, 4.5... */}
                                                    {bike?.sellerReviewSummary?.averageRating?.toFixed(1) || "0.0"}
                                                </span>
                                                <span className="material-symbols-outlined text-yellow-500 text-[18px] [font-variation-settings:'FILL'_1]">star</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="space-y-6">
                                        {reviews.length > 0 ? (
                                            reviews.map((review, index) => (
                                                <div key={index} className="flex flex-col gap-3 pb-6 border-b border-gray-50 dark:border-gray-800 last:border-0 last:pb-0">
                                                    <div className="flex justify-between items-start">
                                                        <div className="flex items-center gap-3">
                                                            {/* Avatar lấy chữ cái đầu của reviewerName */}
                                                            <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-700 dark:text-emerald-400 font-bold text-sm uppercase">
                                                                {review.reviewerName?.charAt(0) || "U"}
                                                            </div>
                                                            <div>
                                                                <h4 className="text-sm font-bold text-[#111813] dark:text-white capitalize">
                                                                    {review.reviewerName}
                                                                </h4>
                                                                <div className="flex items-center gap-1 mt-0.5">
                                                                    {[...Array(5)].map((_, i) => (
                                                                        <span
                                                                            key={i}
                                                                            className={`material-symbols-outlined text-[14px] ${i < review.rating
                                                                                ? 'text-yellow-400 [font-variation-settings:\'FILL\'_1]'
                                                                                : 'text-gray-200 dark:text-gray-700'
                                                                                }`}
                                                                        >
                                                                            star
                                                                        </span>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/* Hiển thị ngày tháng có sẵn từ API */}
                                                        <span className="text-[11px] font-medium text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-800/50 px-2 py-1 rounded-md">
                                                            {review.date}
                                                        </span>
                                                    </div>

                                                    {/* Nội dung đánh giá */}
                                                    <p className="text-sm text-[#374151] dark:text-[#cbd5e1] leading-relaxed italic mt-1 bg-gray-50/50 dark:bg-[#1a271d] p-3 rounded-lg border border-gray-100 dark:border-gray-800">
                                                        "{review.comment}"
                                                    </p>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="py-8 flex flex-col items-center justify-center text-center bg-gray-50 dark:bg-black/10 rounded-xl border border-dashed border-gray-200 dark:border-gray-800">
                                                <span className="material-symbols-outlined text-gray-300 dark:text-gray-600 text-5xl mb-3">rate_review</span>
                                                <p className="text-sm text-gray-500 font-medium">Chưa có đánh giá nào cho sản phẩm này.</p>
                                                <p className="text-xs text-gray-400 mt-1">Hãy là người đầu tiên để lại nhận xét sau khi mua hàng nhé!</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-6">
                                {(status === "Active" || status === "Sold") && (
                                    <div className="bg-white dark:bg-[#1c2e22] p-6 rounded-xl border border-[#e5e7eb] dark:border-[#2a3c30] shadow-sm mt-6">
                                        <h3 className="font-bold text-[#111813] dark:text-white mb-4 flex items-center gap-2">
                                            <span className="material-symbols-outlined text-emerald-500">verified_user</span>
                                            Trạng thái kiểm định
                                        </h3>

                                        <div className="space-y-1 mb-6">

                                            {renderInspectionItem("Khung xe", inspectionData.frame)}
                                            {renderInspectionItem("Chất lượng sơn", inspectionData.paintCondition)}

                                            {renderInspectionItem("Hệ thống truyền động", inspectionData.drivetrain)}
                                            {renderInspectionItem("Phanh", inspectionData.brakes)}
                                        </div>

                                        <div className="bg-gray-50 dark:bg-black/20 p-4 rounded-lg border border-gray-100 dark:border-gray-800">
                                            <div className="flex justify-between items-end mb-2">
                                                <p className="text-xs font-bold uppercase text-gray-500">Chất lượng tổng thể</p>
                                                <p className="font-black text-emerald-600 dark:text-emerald-400 text-lg">
                                                    {inspectionData.score || 0}/100
                                                </p>
                                            </div>

                                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-4">
                                                <div
                                                    className="bg-emerald-500 h-2.5 rounded-full transition-all duration-1000"
                                                    style={{ width: `${inspectionData.score || 0}%` }}
                                                />
                                            </div>

                                            <div className="pt-3 border-t border-gray-200 dark:border-gray-800">
                                                <p className="text-xs font-bold uppercase text-gray-500 mb-2">Nhận xét từ chuyên gia</p>
                                                <p className="text-sm text-gray-700 dark:text-gray-300 italic leading-relaxed">
                                                    "{inspectionData.comment && inspectionData.comment.trim() !== ""
                                                        ? inspectionData.comment
                                                        : "Không có nhận xét chi tiết"}"
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div className="bg-[#ffffff] dark:bg-[#1c2e22] rounded-2xl border border-[#e5e7eb] dark:border-[#2a3c30] p-6 shadow-md flex flex-col gap-6">
                                    <div className="flex justify-between items-start">
                                        <div className="flex flex-col gap-2">
                                            <h2 className="text-2xl font-extrabold text-[#111813] dark:text-white tracking-tight">{bike?.bikes?.[0]?.brand} {bike?.bikes?.[0]?.category}</h2>
                                            <div className="inline-flex items-center w-fit px-3 py-1 bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 text-green-700 dark:text-green-400 rounded-full">
                                                <span className="size-1.5 bg-green-500 rounded-full mr-2"></span>
                                                <span className="text-[10px] font-bold uppercase tracking-wider">Độ mới: {bike?.bikes?.[0]?.overall}</span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => navigate(`/login`)}
                                            className="transition-all active:scale-90 p-2"
                                        >
                                            <Heart
                                                size={28}
                                                color={isWishlisted ? "#ef4444" : "currentColor"}
                                                fill={isWishlisted ? "#ef4444" : "none"}
                                                strokeWidth={2}
                                            />
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
                                        <span className="text-3xl font-black text-[#066e48] dark:text-emerald-400 tracking-tight">
                                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(bike?.bikes?.[0]?.price || 0)}
                                        </span>
                                    </div>

                                    <div className="flex flex-col gap-3 pt-2">
                                        <button  onClick={() => navigate(`/login`)} className="flex items-center justify-center gap-3 bg-[#066e48] text-white font-bold py-4 rounded-xl hover:bg-[#055a3b] transition-all shadow-lg shadow-emerald-900/10 group">
                                            <span className="material-symbols-outlined [font-variation-settings:'FILL'_1] group-hover:scale-110 transition-transform">shopping_cart_checkout</span>
                                            Mua ngay
                                        </button>
                                        <button  onClick={() => navigate(`/login`)} className="flex items-center justify-center gap-3 bg-[#066e48] text-white font-bold py-4 rounded-xl hover:bg-[#055a3b] transition-all shadow-lg shadow-emerald-500/10 group">
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
                                                <div className="text-right font-medium text-[#111813] dark:text-white">{bikeInfo.brand || 'N/A'}</div>

                                                <div className="text-[#637588] dark:text-[#a0aec0]">Loại xe</div>
                                                <div className="text-right font-medium text-[#111813] dark:text-white">{bikeInfo.category || 'N/A'}</div>

                                                <div className="text-[#637588] dark:text-[#a0aec0]">Kích thước</div>
                                                <div className="text-right font-medium text-[#111813] dark:text-white">Size {bikeInfo.frameSize || 'N/A'}</div>

                                                <div className="text-[#637588] dark:text-[#a0aec0]">Chất liệu khung</div>
                                                <div className="text-right font-medium text-[#111813] dark:text-white">{bikeInfo.frameMaterial || 'N/A'}</div>

                                                <div className="text-[#637588] dark:text-[#a0aec0]">Màu sơn</div>
                                                <div className="text-right font-medium text-[#111813] dark:text-white">{bikeInfo.paint || 'N/A'}</div>

                                                <div className="text-[#637588] dark:text-[#a0aec0]">Bộ truyền động</div>
                                                <div className="text-right font-medium text-[#111813] dark:text-white">{bikeInfo.groupset || 'N/A'}</div>

                                                <div className="text-[#637588] dark:text-[#a0aec0]">Vận hành</div>
                                                <div className="text-right font-medium text-[#111813] dark:text-white">{bikeInfo.operating || 'N/A'}</div>

                                                <div className="text-[#637588] dark:text-[#a0aec0]">Vành / Lốp</div>
                                                <div className="text-right font-medium text-[#111813] dark:text-white">{bikeInfo.tireRim || 'N/A'}</div>

                                                <div className="text-[#637588] dark:text-[#a0aec0]">Loại phanh</div>
                                                <div className="text-right font-medium text-[#111813] dark:text-white">{bikeInfo.brakeType || 'N/A'}</div>

                                                <div className="text-[#637588] dark:text-[#a0aec0]">Tổng thể</div>
                                                <div className="text-right font-medium text-[#111813] dark:text-white">{bikeInfo.overall || 'N/A'}</div>
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

export default DetailsGuest;