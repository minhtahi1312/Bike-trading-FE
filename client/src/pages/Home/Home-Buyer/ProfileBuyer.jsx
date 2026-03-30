import React, { useEffect, useRef, useState } from 'react';
import {
    User, Mail, Phone, MapPin, Calendar,
    Award, Camera, Edit2, Key,
    Bike, ShoppingBag, Heart, Star, UserCheck
} from 'lucide-react';
import { changePassword, getMe, uploadAvatar } from '../../../services/axiosClient';
import { toast } from 'react-toastify';

export default function BuyerProfile() {
    const [activeTab, setActiveTab] = useState('info');
    // load thông tin cá nhân 
    const [loading, setLoading] = useState(true);
    /*------------ Trạng thái khi upload ảnh lên------------*/
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef(null);
    /*------------------------*/



    /*----------- thay đổi mật khẩu-------------*/
    const [isChanging, setIsChanging] = useState(false);
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const handlePasswordInputChange = (e) => {
        const { name, value } = e.target;
        setPasswordData(prev => ({ ...prev, [name]: value }));
    };


    const handleUpdatePassword = async (e) => {
        e.preventDefault();



        if (passwordData.newPassword !== passwordData.confirmPassword) {
            alert("Mật khẩu xác nhận không khớp!");
            return;
        }

        try {
            setIsChanging(true);
            const payload = {
                currentPassword: passwordData.currentPassword,
                newPassword: passwordData.newPassword,
                confirmPassword: passwordData.confirmPassword
            };
            await changePassword(payload);
            toast.success("Đổi mật khẩu thành công!");

            setPasswordData({
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            });
        } catch (error) {
            console.error("Lỗi đổi mật khẩu:", error);
            alert(error.response?.data?.message || "Đổi mật khẩu thất bại. Vui lòng thử lại.");
        } finally {
            setIsChanging(false);
        }
    };
    /*----------------------------------------------------*/
    const [userData, setUserData] = useState({
        fullName: '',
        role: 'Thành viên',
        email: '',
        phoneNumber: '',
        location: '',
        joinDate: '',
        avatar: '',
        bio: '',
        stats: {
            totalOrders: 0,
            wishlist: 0,
            points: 0
        },
        interests: []
    });

    /*----------------------------- API profile----------------------  */
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setLoading(true);
                const res = await getMe();

                if (res) {
                    const finalAvatar = res.avtUrl || res.avatar;
                    if (finalAvatar) {
                        localStorage.setItem('user_avatar', finalAvatar);
                        // Bắn tín hiệu để BuyerHeader.js tự động load lại ảnh
                        window.dispatchEvent(new Event('avatar_updated'));
                    }
                    setUserData(prev => ({
                        ...prev,
                        ...res, // Giải tất cả dữ liệu từ API vào state
                        // Nếu API trả về key khác, hãy map thủ công ở đây:
                        fullName: res.fullName || res.name || prev.name,
                        phoneNumber: res.phoneNumber || res.phone || prev.phone,
                        avatar: res.avtUrl || res.avatar || prev.avatar
                    }));
                }
            } catch (error) {
                console.error("Lỗi:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchUserData();
    }, []);
    // Hiển thị thông tin cá nhân
    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
                <span className="ml-3 text-gray-500 font-medium">Đang tải hồ sơ...</span>
            </div>
        );
    }

    /* ------------------------ API upload ảnh ------------------------*/
    const handleAvatarChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('File', file);

        try {
            setUploading(true);
            const response = await uploadAvatar(formData);
            const newUrl = response.avtUrl || response.avatarUrl || response;

            // 1. Cập nhật state tại chỗ (bạn đã làm)
            setUserData(prev => ({ ...prev, avatar: newUrl }));

            // 2. Lưu vào localStorage để Header có thể lấy
            localStorage.setItem('user_avatar', newUrl);

            // 3. Bắn tín hiệu "avatar_updated"
            window.dispatchEvent(new Event('avatar_updated'));

            toast.success("Cập nhật ảnh đại diện thành công!");
        } catch (error) {
            console.error(error);
        } finally {
            setUploading(false);
        }
    };
    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    /*---------------------------------------------------------------*/
    return (




        <div className="max-w-6xl mx-auto p-4">
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleAvatarChange}
                className="hidden"
                accept="image/*"
            />
            {/* HEADER */}
            <div className="mb-8">
                <h1 className="text-[#111813] text-3xl font-extrabold tracking-tight">Hồ sơ của tôi</h1>
                <p className="text-[#637588] text-sm mt-1">Quản lý thông tin cá nhân và theo dõi đơn hàng của bạn.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* CỘT TRÁI: THÔNG TIN TÓM TẮT */}
                <div className="col-span-1 space-y-6">

                    <div className="bg-white rounded-2xl border border-[#e5e7eb] shadow-sm overflow-hidden">
                        <div className="h-24 bg-gradient-to-r from-blue-500 to-emerald-500"></div>

                        <div className="px-6 pb-6 relative">
                            {/* Avatar */}
                            <div className="relative w-32 h-32 mx-auto -mt-16 mb-4">
                                <img
                                    src={userData?.avatar || "https://via.placeholder.com/150"}
                                    alt="Avatar"
                                    className="w-full h-full rounded-full border-4 border-white object-cover bg-white shadow-lg"
                                />
                                <button
                                    onClick={triggerFileInput}
                                    className="absolute bottom-1 right-1 p-2 bg-white border border-gray-200 rounded-full text-gray-600 hover:text-emerald-600 shadow-md transition-colors"
                                >
                                    <Camera size={18} />
                                </button>
                            </div>

                            {/* Name & Role */}
                            <div className="text-center mb-6">
                                <h2 className="text-xl font-black text-[#111813]">{userData?.fullName || "Chưa cập nhật tên"}</h2>
                                <span className="inline-flex items-center gap-1 mt-1 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-widest">
                                    <UserCheck size={12} /> {userData?.role}
                                </span>
                            </div>

                            {/* <div className="space-y-4 text-sm">
                                <div className="flex items-center gap-3 text-[#637588]">
                                    <Mail size={16} className="text-gray-400" />
                                    <span className="font-medium">{userData?.email || "Chưa có email"}</span>
                                </div>
                                <div className="flex items-center gap-3 text-[#637588]">
                                    <Phone size={16} className="text-gray-400" />
                                    <span className="font-medium">{userData?.phoneNumber || "Chưa có SĐT"}</span>
                                </div>

                                <div className="flex items-center gap-3 text-[#637588]">
                                    <Calendar size={16} className="text-gray-400" />
                                    <span className="font-medium">Tham gia: {userData?.joinDate || "Mới đây"}</span>
                                </div>
                            </div> */}
                        </div>
                    </div>

                    {/* Card Interests */}
                    {/* <div className="bg-white rounded-2xl border border-[#e5e7eb] shadow-sm p-6">
                        <h3 className="text-sm font-bold text-[#111813] uppercase tracking-wide mb-4 flex items-center gap-2">
                            <Star size={18} className="text-orange-500" /> Sở thích xe đạp
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {userData?.interests?.length > 0 ? (
                                userData.interests.map((item, index) => (
                                    <span key={index} className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-bold text-gray-700">
                                        {item}
                                    </span>
                                ))
                            ) : (
                                <p className="text-xs text-gray-400 italic">Chưa có thông tin sở thích</p>
                            )}
                        </div>
                    </div> */}

                </div>

                {/* CỘT PHẢI: STATS & FORM */}
                <div className="col-span-1 lg:col-span-2 space-y-6">

                    {/* Quick Stats */}
                    {/* <div className="grid grid-cols-3 gap-4">
                        <div className="bg-white p-5 rounded-2xl border border-[#e5e7eb] shadow-sm">
                            <div className="flex items-center gap-2 text-[#637588] mb-2">
                                <ShoppingBag size={16} className="text-blue-500" /> <span className="text-xs font-bold uppercase">Đơn hàng</span>
                            </div>
                            <p className="text-2xl font-black text-[#111813]">{userData?.stats?.totalOrders || 0}</p>
                        </div>
                        <div className="bg-white p-5 rounded-2xl border border-[#e5e7eb] shadow-sm">
                            <div className="flex items-center gap-2 text-[#637588] mb-2">
                                <Heart size={16} className="text-pink-500" /> <span className="text-xs font-bold uppercase">Yêu thích</span>
                            </div>
                            <p className="text-2xl font-black text-[#111813]">{userData?.stats?.wishlist || 0}</p>
                        </div>
                        <div className="bg-white p-5 rounded-2xl border border-[#e5e7eb] shadow-sm">
                            <div className="flex items-center gap-2 text-[#637588] mb-2">
                                <Award size={16} className="text-yellow-500" /> <span className="text-xs font-bold uppercase">BikePoint</span>
                            </div>
                            <p className="text-2xl font-black text-[#111813]">{userData?.stats?.points || 0}</p>
                        </div>
                    </div> */}

                    <div className="bg-white rounded-2xl border border-[#e5e7eb] shadow-sm overflow-hidden">
                        {/* Tabs */}
                        <div className="flex border-b border-[#e5e7eb] bg-gray-50/50">
                            <button
                                onClick={() => setActiveTab('info')}
                                className={`flex items-center gap-2 px-6 py-4 text-sm font-bold transition-all border-b-2 ${activeTab === 'info' ? 'border-emerald-600 text-emerald-700 bg-white' : 'border-transparent text-[#637588] hover:text-[#111813]'
                                    }`}
                            >
                                <User size={16} /> Thông tin cá nhân
                            </button>
                            <button
                                onClick={() => setActiveTab('security')}
                                className={`flex items-center gap-2 px-6 py-4 text-sm font-bold transition-all border-b-2 ${activeTab === 'security' ? 'border-emerald-600 text-emerald-700 bg-white' : 'border-transparent text-[#637588] hover:text-[#111813]'
                                    }`}
                            >
                                <Key size={16} /> Bảo mật
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6 sm:p-8">
                            {activeTab === 'info' ? (
                                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        {/* Họ và tên */}
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-[#111813] uppercase tracking-wide">Họ và tên</label>
                                            <input
                                                type="text"
                                                value={userData?.fullName || "Chưa cập nhật"}
                                                readOnly
                                                className="w-full px-4 py-2.5 bg-gray-100 border border-[#e5e7eb] rounded-xl text-sm font-medium text-gray-500 cursor-not-allowed outline-none"
                                            />
                                        </div>

                                        {/* Số điện thoại */}
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-[#111813] uppercase tracking-wide">Số điện thoại</label>
                                            <input
                                                type="text"
                                                value={userData?.phoneNumber || "Chưa cập nhật"}
                                                readOnly
                                                className="w-full px-4 py-2.5 bg-gray-100 border border-[#e5e7eb] rounded-xl text-sm font-medium text-gray-500 cursor-not-allowed outline-none"
                                            />
                                        </div>

                                        <div className="space-y-2 col-span-full">
                                            <label className="text-xs font-bold text-[#111813] uppercase tracking-wide">Email</label>
                                            <input
                                                type="text"
                                                value={userData?.email || "Chưa cập nhật"}
                                                readOnly
                                                className="w-full px-4 py-2.5 bg-gray-100 border border-[#e5e7eb] rounded-xl text-sm font-medium text-gray-500 cursor-not-allowed outline-none"
                                            />
                                        </div>

                                    </div>

                                    {/* Địa chỉ nhận hàng */}
                                    {/* <div className="space-y-2">
                                        <label className="text-xs font-bold text-[#111813] uppercase tracking-wide">Địa chỉ nhận hàng</label>
                                        <input
                                            type="text"
                                            value={userData?.location || "Chưa có địa chỉ"}
                                            readOnly
                                            className="w-full px-4 py-2.5 bg-gray-100 border border-[#e5e7eb] rounded-xl text-sm font-medium text-gray-500 cursor-not-allowed outline-none"
                                        />
                                    </div> */}

                                    {/* Giới thiệu ngắn */}
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-[#111813] uppercase tracking-wide">Giới thiệu ngắn</label>
                                        <textarea
                                            rows="3"
                                            value={userData?.bio || "Thành viên của BikeMarket"}
                                            readOnly
                                            className="w-full px-4 py-3 bg-gray-100 border border-[#e5e7eb] rounded-xl text-sm font-medium text-gray-500 cursor-not-allowed outline-none resize-none"
                                        ></textarea>
                                    </div>

                                    {/* Phần thông báo thay vì nút bấm */}
                                    <div className="pt-4 border-t border-gray-100 flex justify-end">
                                        <span className="text-xs text-gray-400 italic">
                                            * Thông tin hồ sơ được cố định bởi hệ thống.
                                        </span>
                                    </div>
                                </form>
                            ) : (
                                <form className="max-w-md space-y-6" onSubmit={handleUpdatePassword}>
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-[#111813] uppercase tracking-wide">Mật khẩu cũ</label>
                                            <input
                                                type="password"
                                                /* SỬA TẠI ĐÂY: name phải là currentPassword */
                                                name="currentPassword"
                                                /* SỬA TẠI ĐÂY: value phải là passwordData.currentPassword */
                                                value={passwordData.currentPassword}
                                                onChange={handlePasswordInputChange}
                                                placeholder="••••••••"
                                                className="w-full px-4 py-2.5 bg-gray-50 border border-[#e5e7eb] rounded-xl text-sm outline-none focus:border-emerald-500 transition-all"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-[#111813] uppercase tracking-wide">Mật khẩu mới</label>
                                            <input
                                                type="password"
                                                name="newPassword"
                                                value={passwordData.newPassword}
                                                onChange={handlePasswordInputChange}
                                                placeholder="••••••••"
                                                className="w-full px-4 py-2.5 bg-gray-50 border border-[#e5e7eb] rounded-xl text-sm outline-none focus:border-emerald-500 transition-all"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-[#111813] uppercase tracking-wide">Xác nhận mật khẩu mới</label>
                                            <input
                                                type="password"
                                                name="confirmPassword"
                                                value={passwordData.confirmPassword}
                                                onChange={handlePasswordInputChange}
                                                placeholder="••••••••"
                                                className="w-full px-4 py-2.5 bg-gray-50 border border-[#e5e7eb] rounded-xl text-sm outline-none focus:border-emerald-500 transition-all"
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isChanging}
                                        className={`px-6 py-2.5 bg-[#111813] text-white rounded-xl text-sm font-bold hover:bg-black transition-all ${isChanging ? 'opacity-50' : ''}`}
                                    >
                                        {isChanging ? 'Đang xử lý...' : 'Xác nhận đổi mật khẩu'}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}