import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckOut, getCart, getCartItems } from '../../../services/axiosClient';
import { useEffect } from 'react';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [summary, setSummary] = useState({ totalAmount: 0 });
  const [items, setItems] = useState([]);
  // State quản lý thông tin form
  const [formData, setFormData] = useState({
    receiverName: 'Nguyễn Văn A',
    receiverPhone: '0901234567',
    city: 'Hồ Chí Minh',
    district: 'Quận 1',
    ward: 'Phường Bến Nghé',
    addressDetail: ''
  });

  // Hàm xử lý thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckout = async () => {
    // 1. Chuẩn bị request body từ state
    const requestBody = {
      receiverName: formData.receiverName,
      receiverPhone: formData.receiverPhone,
      receiverAddress: `${formData.addressDetail}, ${formData.ward}, ${formData.district}, ${formData.city}`
    };

    try {
      const result = await CheckOut(requestBody);
      console.log("Thanh toán thành công!", result);
      // Chuyển hướng sang trang thanh toán sau khi tạo đơn thành công
      navigate('/homebuyer/payment');
    } catch (error) {
      console.error("Lỗi khi thanh toán", error);
      alert("Có lỗi xảy ra khi xử lý đơn hàng. Vui lòng thử lại.");
    }
  };


  /*---------------------------------------------------------------------*/
  const loadItems = async () => {
    try {
      const data = await getCartItems();

      // Kiểm tra data tồn tại và lọc các item có isSelected === true
      const selectedItems = (data || []).filter(item => item.isSelected === true);

      setItems(selectedItems);
    } catch (err) {
      console.error("Lỗi lấy danh sách:", err);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);


  // Tự động tính tổng tiền từ danh sách items
  const totalAmount = items.reduce((sum, item) => sum + item.unitPrice, 0);
  return (
    <div className="bg-background-light text-[#111813] font-display overflow-x-hidden min-h-screen">
      <div className="relative flex h-auto w-full flex-col">



        {/* Main Content */}
        <main className="w-full max-w-[1440px] mx-auto px-4 lg:px-10 py-8">
          {/* Stepper */}


          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Form Section */}
            <div className="lg:col-span-8">
              <div className="bg-white p-6 lg:p-8 rounded-2xl shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] border border-gray-100">
                <div className="flex items-center gap-3 mb-8">
                  <span
                    className="material-symbols-outlined text-emerald-600"
                    style={{ fontSize: '28px', fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}
                  >
                    local_shipping
                  </span>
                  <h1 className="text-2xl font-bold text-[#111813]">Thông tin người nhận</h1>
                </div>

                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-[#111813]">Họ và tên người nhận</label>
                      <input
                        name="receiverName"
                        value={formData.receiverName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                        placeholder="Nhập họ và tên"
                        type="text"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-[#111813]">Số điện thoại liên hệ</label>
                      <input
                        name="receiverPhone"
                        value={formData.receiverPhone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                        placeholder="Nhập số điện thoại"
                        type="tel"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-[#111813]">Tỉnh/Thành phố</label>
                      <select
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-emerald-500 focus:border-emerald-500 transition-all appearance-none"
                      >
                        <option value="">Chọn Tỉnh/Thành phố</option>
                        <option value="Hồ Chí Minh">Hồ Chí Minh</option>
                        <option value="Hà Nội">Hà Nội</option>
                        <option value="Đà Nẵng">Đà Nẵng</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-[#111813]">Quận/Huyện</label>
                      <select
                        name="district"
                        value={formData.district}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                      >
                        <option value="">Chọn Quận/Huyện</option>
                        <option value="Quận 1">Quận 1</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-[#111813]">Phường/Xã</label>
                      <select
                        name="ward"
                        value={formData.ward}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                      >
                        <option value="">Chọn Phường/Xã</option>
                        <option value="Phường Bến Nghé">Phường Bến Nghé</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#111813]">Địa chỉ chi tiết (Số nhà, tên đường)</label>
                    <input
                      name="addressDetail"
                      value={formData.addressDetail}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                      placeholder="Ví dụ: 123 Lê Lợi"
                      type="text"
                    />
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <input
                      className="w-5 h-5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                      id="save-address"
                      type="checkbox"
                    />
                    <label className="text-sm text-[#61896f] cursor-pointer select-none" htmlFor="save-address">
                      Lưu địa chỉ này cho lần sau
                    </label>
                  </div>
                </form>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  onClick={() => navigate('/homebuyer/cart')}
                  className="flex items-center gap-2 text-gray-600 font-bold hover:text-emerald-700 transition-colors px-6 py-3 border border-gray-300 rounded-xl w-full sm:w-auto justify-center"
                >
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: '20px', fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}
                  >
                    arrow_back
                  </span>
                  Quay lại giỏ hàng
                </button>
                <button
                  onClick={handleCheckout}
                  className="w-full bg-[#2bee6c] hover:bg-[#1fb350] disabled:bg-gray-200 disabled:text-gray-400 py-4 rounded-xl font-black text-lg shadow-lg transition-all"
                >
                  THANH TOÁN NGAY
                </button>
              </div>
            </div>

            {/* Sidebar / Summary */}
            <div className="lg:col-span-4">
              <div className="sticky top-24 space-y-6">
                <div className="bg-white p-6 rounded-2xl shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] border border-gray-100">
                  <h2 className="text-lg font-bold text-[#111813] mb-6 border-b border-gray-50 pb-4">
                    Tóm tắt đơn hàng
                  </h2>

                  <div className="space-y-4 mb-6">
                    {/* Kiểm tra nếu mảng rỗng thì có thể hiển thị thông báo, ngược lại thì dùng map() */}
                    {items.length === 0 ? (
                      <p className="text-sm text-gray-500 text-center py-4">Giỏ hàng trống</p>
                    ) : (
                      items.map((item, index) => (
                        <div key={item.id || index} className="flex gap-3">
                          <div
                            className="w-16 h-16 rounded-lg bg-cover bg-center flex-shrink-0 border border-gray-100"
                            style={{ backgroundImage: `url("${item.imageUrl || 'https://via.placeholder.com/150'}")` }}
                          ></div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-bold text-[#111813] truncate">{item.bikeTitle}</h4>
                            <p className="text-xs text-[#61896f] mt-1">{item.unitPrice}</p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {/* <div className="space-y-3 pt-4 border-t border-gray-50 mb-6">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-[#61896f]">Tổng tiền hàng</span>
                      <span className="font-bold text-[#111813]">{totalAmount}</span>
                    </div>
                  </div> */}
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-[#61896f]">Tổng tiền hàng</span>
                    {/* Format trực tiếp tại đây */}
                    <span className="font-bold text-[#111813]">
                      {totalAmount.toLocaleString('vi-VN')} đ
                    </span>
                  </div>

                  <div className="pt-6 border-t border-gray-100">
                    <div className="flex justify-between items-end">
                      <span className="text-base font-bold text-[#111813]">Tổng cộng</span>
                      <div className="text-right">
                        <p className="text-xl font-black text-emerald-700 leading-none">
                          {totalAmount.toLocaleString('vi-VN')} đ
                        </p>
                        <p className="text-[10px] text-[#61896f] mt-1 font-medium">(Đã bao gồm VAT)</p>
                      </div>
                    </div>
                  </div>
                </div>


              </div>
            </div>
          </div>
        </main>



      </div>
    </div>
  );
};

export default CheckoutPage;
