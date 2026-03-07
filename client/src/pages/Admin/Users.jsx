import React, { useState } from 'react';
import { 
  Search, Plus, Filter, MoreVertical, 
  Lock, Eye, Trash2, Shield, ShoppingBag, User, CheckCircle, XCircle,
  X, Loader2, AlertCircle
} from 'lucide-react';
import axiosClient from "../../services/axiosClient";

const Users = () => {
  // --- STATE CHO MODAL THÊM INSPECTOR ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: ''
  });
  const [errors, setErrors] = useState({});
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

 const handleAddInspector = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 1. Chuẩn bị dữ liệu theo đúng chuẩn API yêu cầu
      const payload = {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        phoneNumber: formData.phone, 
        role: 2 
      };

      
      const response = await axiosClient.post('/api/admin/listing/create-inspector', payload);
      
      // 3. Xử lý khi thành công
      alert(response.data.message || `Tạo tài khoản Inspector thành công cho: ${formData.fullName}`);
      setIsModalOpen(false); 
      setFormData({ fullName: '', email: '', password: '', phone: '' }); 
      

    } catch (error) {
      console.error("Lỗi khi tạo Inspector:", error);
      
      // --- XỬ LÝ BẮT LỖI TỪ BACKEND ---
      if (error.response && error.response.data) {
        const data = error.response.data;

        if (data.errors) {
          const backendErrors = {};
          for (let key in data.errors) {
            let formKey = key.charAt(0).toLowerCase() + key.slice(1);
            if (formKey === 'phoneNumber') formKey = 'phone'; 

            backendErrors[formKey] = Array.isArray(data.errors[key]) 
                                      ? data.errors[key][0] 
                                      : data.errors[key];
          }
          setErrors(backendErrors); 
        } 
        
        else if (data.message) {
          setErrors({ apiError: data.message });
        } 
        
        else {
          setErrors({ apiError: "Có lỗi xảy ra từ máy chủ. Vui lòng kiểm tra lại dữ liệu!" });
        }
      } else {
        
        setErrors({ apiError: "Không thể kết nối đến máy chủ. Vui lòng thử lại sau!" });
      }

    } finally {
      setIsSubmitting(false); // Tắt trạng thái loading
    }
  };
  

  // Mock Data dựa trên hình mẫu image_0b3fe1.png
  const users = [
    {
      id: 1,
      name: "Nguyễn Văn A",
      email: "nguyenvana@gmail.com",
      avatar: "https://ui-avatars.com/api/?name=Nguyen+Van+A&background=random",
      role: "Seller",
      joinDate: "12/10/2023",
      status: "Active"
    },
    {
      id: 2,
      name: "Trần Thị B",
      email: "tranthib@hotmail.com",
      avatar: "https://ui-avatars.com/api/?name=Tran+Thi+B&background=random",
      role: "Buyer",
      joinDate: "15/10/2023",
      status: "Banned"
    },
    {
      id: 3,
      name: "Lê Văn C",
      email: "levanc.inspector@bikemarket.vn",
      avatar: "https://ui-avatars.com/api/?name=Le+Van+C&background=0D8ABC&color=fff",
      role: "Inspector",
      joinDate: "20/10/2023",
      status: "Active"
    },
    {
      id: 4,
      name: "Phạm Thị D",
      email: "phamthid@gmail.com",
      avatar: "https://ui-avatars.com/api/?name=Pham+Thi+D&background=random",
      role: "Buyer",
      joinDate: "22/10/2023",
      status: "Active"
    },
    {
      id: 5,
      name: "Hoàng Văn E",
      email: "hoangvane_bikes@gmail.com",
      avatar: "https://ui-avatars.com/api/?name=Hoang+Van+E&background=random",
      role: "Seller",
      joinDate: "25/10/2023",
      status: "Active"
    },
  ];
  const renderRoleBadge = (role) => {
    switch (role) {
      case 'Seller':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-600 border border-blue-100">
            <ShoppingBag size={12} /> Seller
          </span>
        );
      case 'Inspector':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-50 text-purple-600 border border-purple-100">
            <Shield size={12} /> Inspector
          </span>
        );
      default: // Buyer
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-600 border border-gray-200">
            <User size={12} /> Buyer
          </span>
        );
    }
  };

  const renderStatus = (status) => {
    if (status === 'Active') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600 border border-emerald-100">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          Hoạt động
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-red-50 text-red-600 border border-red-100">
        <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
        Bị khóa
      </span>
    );
  };

  return (
    <div className="flex flex-col gap-6 font-display text-[#111813]">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Quản lý người dùng</h1>
          <p className="text-[#637588] text-sm mt-2">
            Quản lý tài khoản, vai trò và trạng thái thành viên hệ thống.
          </p>
        </div>
        
        {/* Nút thêm mới - Đã gắn sự kiện mở Modal */}
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-sm font-bold transition-colors shadow-lg shadow-emerald-500/20 active:scale-95"
        >
          <Plus size={18} strokeWidth={2.5} /> Thêm Inspector mới
        </button>
      </div>

      {/* --- MAIN CARD --- */}
      <div className="bg-white border border-[#e5e7eb] rounded-xl shadow-sm flex flex-col min-h-[600px]">
        
        {/* TOOLBAR (Search & Filters) */}
        <div className="p-5 flex flex-col md:flex-row gap-3 justify-between items-center bg-[#fcfdfd] border-b border-[#e5e7eb]">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Tìm kiếm theo Tên hoặc Email..." 
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-[#111813]"
            />
          </div>

          <div className="flex gap-2 w-full md:w-auto">
            <div className="relative group flex-1">
              <select className="w-full appearance-none pl-4 pr-10 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-[#637588] hover:bg-gray-50 cursor-pointer focus:outline-none focus:border-emerald-500">
                <option>Tất cả vai trò</option>
                <option>Seller</option>
                <option>Buyer</option>
                <option>Inspector</option>
              </select>
              <Filter className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={14} />
            </div>

            <div className="relative flex-1">
              <select className="w-full appearance-none pl-4 pr-10 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-[#637588] hover:bg-gray-50 cursor-pointer focus:outline-none focus:border-emerald-500">
                <option>Tất cả trạng thái</option>
                <option>Hoạt động</option>
                <option>Bị khóa</option>
              </select>
               <Filter className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={14} />
            </div>
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f9fafb] border-b border-[#e5e7eb]">
                <th className="px-6 py-4 text-xs font-bold text-[#637588] uppercase tracking-wider w-16 text-center">STT</th>
                <th className="px-6 py-4 text-xs font-bold text-[#637588] uppercase tracking-wider">Tên người dùng</th>
                <th className="px-6 py-4 text-xs font-bold text-[#637588] uppercase tracking-wider">Vai trò</th>
                <th className="px-6 py-4 text-xs font-bold text-[#637588] uppercase tracking-wider">Ngày tham gia</th>
                <th className="px-6 py-4 text-xs font-bold text-[#637588] uppercase tracking-wider">Trạng thái</th>
                <th className="px-6 py-4 text-xs font-bold text-[#637588] uppercase tracking-wider text-right">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e7eb]">
              {users.map((user, index) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-6 py-4 text-sm font-bold text-[#637588] text-center">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img 
                        src={user.avatar} 
                        alt="" 
                        className="w-10 h-10 rounded-full object-cover border border-gray-200" 
                      />
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-[#111813]">{user.name}</span>
                        <span className="text-xs font-medium text-[#637588]">{user.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {renderRoleBadge(user.role)}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-[#111813]">
                    {user.joinDate}
                  </td>
                  <td className="px-6 py-4">
                    {renderStatus(user.status)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all" title="Xem chi tiết">
                        <Eye size={18} />
                      </button>
                      {user.status === 'Active' ? (
                         <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all" title="Khóa tài khoản">
                           <Lock size={18} />
                         </button>
                      ) : (
                        <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all" title="Mở khóa">
                           <CheckCircle size={18} />
                         </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="px-6 py-4 border-t border-[#e5e7eb] flex items-center justify-between bg-white rounded-b-xl">
          <span className="text-sm font-medium text-[#637588]">
            Hiển thị <span className="font-bold text-[#111813]">1-5</span> trong số <span className="font-bold text-[#111813]">97</span> kết quả
          </span>
          <div className="flex gap-1">
             <button className="px-3 py-1 text-sm border border-gray-200 rounded hover:bg-gray-50 text-[#637588] font-medium">Trước</button>
             <button className="px-3 py-1 text-sm bg-emerald-600 text-white rounded font-bold shadow-sm shadow-emerald-600/20">1</button>
             <button className="px-3 py-1 text-sm border border-gray-200 rounded hover:bg-gray-50 text-[#637588] font-medium">2</button>
             <button className="px-3 py-1 text-sm border border-gray-200 rounded hover:bg-gray-50 text-[#637588] font-medium">3</button>
             <button className="px-3 py-1 text-sm border border-gray-200 rounded hover:bg-gray-50 text-[#637588] font-medium">Sau</button>
          </div>
        </div>
      </div>

      {/* --- MODAL UI --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-[#111813]/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-opacity">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            
            {/* Header Modal */}
            <div className="flex justify-between items-center p-5 border-b border-gray-100 bg-gray-50/50">
              <div>
                <h2 className="text-lg font-bold text-[#111813]">Thêm Inspector Mới</h2>
                <p className="text-xs text-[#637588] mt-0.5">Tạo tài khoản cấp quyền kiểm định viên</p>
              </div>
              <button 
                onClick={() => !isSubmitting && setIsModalOpen(false)} 
                className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                disabled={isSubmitting}
              >
                <X size={18} />
              </button>
            </div>

            {/* Form */}
<form onSubmit={handleAddInspector} className="p-6 space-y-4">

  {/* 1. HIỂN THỊ LỖI CHUNG (apiError) Ở TRÊN CÙNG FORM */}
  {errors.apiError && (
    <div className="p-3 text-sm text-red-600 bg-red-50 rounded-xl border border-red-100 flex items-start gap-2">
      <AlertCircle size={16} className="mt-0.5 shrink-0" />
      <span>{errors.apiError}</span>
    </div>
  )}

  <div>
    <label className="block text-sm font-bold text-[#111813] mb-1.5">Họ và tên <span className="text-red-500">*</span></label>
    <input 
      type="text" required name="fullName"
      value={formData.fullName} onChange={handleInputChange}
      disabled={isSubmitting}
      className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none transition-all disabled:bg-gray-50 disabled:text-gray-400 ${
        errors.fullName ? 'border-red-500 focus:ring-2 focus:ring-red-500/20' : 'border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20'
      }`}
      placeholder="VD: Lê Văn Kiểm"
    />
    {/* HIỂN THỊ CHỮ MÀU ĐỎ NẾU LỖI */}
    {errors.fullName && <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1"><AlertCircle size={12}/>{errors.fullName}</p>}
  </div>
  
  <div>
    <label className="block text-sm font-bold text-[#111813] mb-1.5">Email làm việc <span className="text-red-500">*</span></label>
    <input 
      type="email" required name="email"
      value={formData.email} onChange={handleInputChange}
      disabled={isSubmitting}
      className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none transition-all disabled:bg-gray-50 disabled:text-gray-400 ${
        errors.email ? 'border-red-500 focus:ring-2 focus:ring-red-500/20' : 'border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20'
      }`}
      placeholder="inspector@bikemarket.vn"
    />
    {errors.email && <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1"><AlertCircle size={12}/>{errors.email}</p>}
  </div>

  <div>
    <label className="block text-sm font-bold text-[#111813] mb-1.5">Mật khẩu khởi tạo <span className="text-red-500">*</span></label>
    <input 
      type="password" required minLength="6" name="password"
      value={formData.password} onChange={handleInputChange}
      disabled={isSubmitting}
      className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none transition-all disabled:bg-gray-50 disabled:text-gray-400 ${
        errors.password ? 'border-red-500 focus:ring-2 focus:ring-red-500/20' : 'border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20'
      }`}
      placeholder="Tối thiểu 6 ký tự"
    />
    {errors.password && <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1"><AlertCircle size={12}/>{errors.password}</p>}
  </div>

  <div>
    <label className="block text-sm font-bold text-[#111813] mb-1.5">Số điện thoại liên hệ</label>
    <input 
      type="tel" name="phone"
      value={formData.phone} onChange={handleInputChange}
      disabled={isSubmitting}
      className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none transition-all disabled:bg-gray-50 disabled:text-gray-400 ${
        errors.phone ? 'border-red-500 focus:ring-2 focus:ring-red-500/20' : 'border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20'
      }`}
      placeholder="09..."
    />
    {errors.phone && <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1"><AlertCircle size={12}/>{errors.phone}</p>}
  </div>

  {/* Footer Buttons */}
  <div className="flex justify-end gap-3 pt-4 mt-2">
    <button 
      type="button" 
      onClick={() => {
        setIsModalOpen(false);
        setErrors({}); // 2. THÊM DÒNG NÀY ĐỂ XÓA LỖI KHI ĐÓNG MODAL
      }}
      disabled={isSubmitting}
      className="px-5 py-2.5 text-sm font-bold text-[#637588] bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50"
    >
      Hủy bỏ
    </button>
    <button 
      type="submit" 
      disabled={isSubmitting}
      className="px-5 py-2.5 text-sm font-bold text-white bg-emerald-600 rounded-xl hover:bg-emerald-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center min-w-[130px]"
    >
      {isSubmitting ? (
        <>
          <Loader2 size={16} className="animate-spin mr-2" />
          Đang tạo...
        </>
      ) : (
        'Tạo tài khoản'
      )}
    </button>
  </div>
</form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Users;