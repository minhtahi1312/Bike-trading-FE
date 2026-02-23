/* eslint-disable */
import React from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle,
  XCircle,
  Phone,
  Mail,
  MessageCircle,
  MapPin,
  Info,
} from "lucide-react";

export default function OrderDetail() {
  const { id } = useParams();

  // ===== MOCK DATA =====
  const order = {
    id: id,
    status: "pending",
    product: "Trek Marlin 7 (2022) - Size M",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBYHKUb-OXY4LhuARv-D80YSszSzvNiTBpQuWHwV-gRzqpjWM-RxrxGvBn7v9zVwwXeKTuXWKRI7vcrF0Nvo75yMf-v4Qw4EZxoRP5keZ5YTumzmsOQyrp-C247lRr7DERCyY7NLVkXtQq08xDcsJorx6204U3Fk_5bf-aJ5lh0xWFGuESUg3lPCH9KXrFCl3kBq68n7BgLTqDqAOtUrHQNiKFTg1MtPnHZPzWWdDOMEsafN8wF4TBMerT50D6PnKWQ-9pPYkkNur2Q",
    price: 12500000,
    shipping: 150000,
    serviceFee: -250000,
    buyer: {
      name: "Nguyễn Văn A",
      join: "2 tháng trước",
      phone: "0912 *** ***",
      email: "nguyenvana@gmail.com",
      avatar: "https://i.pravatar.cc/100",
    },
    address: {
      name: "Nguyễn Văn A",
      detail: "Số 15, Ngõ 285 Đội Cấn",
      ward: "Phường Liễu Giai",
      district: "Quận Ba Đình",
      city: "Hà Nội",
    },
    note: "Giao giờ hành chính giúp mình nhé.",
    date: "14:30 - 20/05/2024",
  };

  const total = order.price + order.shipping + order.serviceFee;

  const statusMap = {
    pending: {
      label: "Chờ xác nhận",
      style: "bg-yellow-100 text-yellow-700",
    },
    shipping: {
      label: "Đang giao",
      style: "bg-blue-100 text-blue-700",
    },
    done: {
      label: "Hoàn thành",
      style: "bg-emerald-100 text-emerald-700",
    },
  };

  return (
    <div className="space-y-6">
      {/* ===== BREADCRUMB ===== */}
      <div className="text-sm text-gray-500 flex items-center gap-2">
        <Link
          to="/seller/orders"
          className="flex items-center gap-1 hover:text-emerald-600"
        >
          <ArrowLeft size={16} />
          Quay lại danh sách
        </Link>
        <span>/</span>
        <span className="text-gray-700 font-medium">
          Chi tiết đơn hàng #{order.id}
        </span>
      </div>

      {/* ===== HEADER ===== */}
      <div className="flex justify-between items-start flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-extrabold">Đơn hàng #{order.id}</h1>

            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${statusMap[order.status].style}`}
            >
              {statusMap[order.status].label}
            </span>
          </div>

          <p className="text-sm text-gray-500 mt-1">Đặt lúc: {order.date}</p>
        </div>

        <div className="flex gap-3">
          <button className="border border-red-300 text-red-600 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-50">
            <XCircle size={18} />
            Hủy đơn
          </button>

          <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-emerald-700">
            <CheckCircle size={18} />
            Xác nhận đơn hàng
          </button>
        </div>
      </div>

      {/* ===== MAIN GRID ===== */}
      <div className="grid grid-cols-3 gap-6">
        {/* ===== LEFT ===== */}
        <div className="col-span-2 space-y-6">
          {/* PRODUCT */}
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="font-semibold mb-4">Sản phẩm</h3>

            <div className="flex gap-4 items-center">
              <img
                src={order.image}
                alt=""
                className="w-24 h-24 object-cover rounded-lg"
              />

              <div className="flex-1">
                <div className="flex justify-between">
                  <h4 className="font-semibold text-lg">{order.product}</h4>
                  <p className="font-bold text-lg">
                    {order.price.toLocaleString()}đ
                  </p>
                </div>

                <div className="flex gap-2 mt-2">
                  <span className="px-2 py-1 bg-gray-100 text-xs rounded">
                    Mountain Bike
                  </span>
                  <span className="px-2 py-1 bg-gray-100 text-xs rounded">
                    Shimano Deore
                  </span>
                </div>

                <p className="text-sm text-gray-500 mt-2">Tình trạng: 95%</p>
              </div>
            </div>
          </div>

          {/* PAYMENT */}
          <div className="bg-white rounded-xl shadow p-6 space-y-4">
            <h3 className="font-semibold">Thanh toán</h3>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Giá sản phẩm</span>
                <span>{order.price.toLocaleString()}đ</span>
              </div>

              <div className="flex justify-between">
                <span>Phí vận chuyển</span>
                <span>{order.shipping.toLocaleString()}đ</span>
              </div>

              <div className="flex justify-between text-red-500">
                <span>Phí dịch vụ sàn</span>
                <span>{order.serviceFee.toLocaleString()}đ</span>
              </div>
            </div>

            <div className="border-t pt-4 flex justify-between font-bold text-lg">
              <span className="text-emerald-600">Thực nhận</span>
              <span className="text-emerald-600">
                {total.toLocaleString()}đ
              </span>
            </div>

            {/* PAYMENT METHOD BOX */}
            <div className="mt-4 bg-blue-50 border border-blue-100 rounded-lg p-4 flex gap-3">
              <Info className="text-blue-600 mt-1" size={18} />
              <div className="text-sm text-blue-800">
                <p className="font-semibold">
                  Phương thức: Thanh toán qua ví BikeMarket
                </p>
                <p>
                  Số tiền sẽ được chuyển vào ví của bạn sau khi người mua xác
                  nhận đã nhận hàng (tối đa 3 ngày).
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ===== RIGHT ===== */}
        <div className="space-y-6">
          {/* BUYER */}
          <div className="bg-white p-6 rounded-xl shadow space-y-4">
            <h3 className="font-semibold">Người mua</h3>

            <div className="flex items-center gap-3">
              <img
                src={order.buyer.avatar}
                className="w-12 h-12 rounded-full"
                alt=""
              />
              <div>
                <p className="font-semibold">{order.buyer.name}</p>
                <p className="text-sm text-gray-500">
                  Tham gia: {order.buyer.join}
                </p>
              </div>
            </div>

            <div className="space-y-2 text-sm text-gray-600">
              <p className="flex items-center gap-2">
                <Phone size={16} /> {order.buyer.phone}
              </p>
              <p className="flex items-center gap-2">
                <Mail size={16} /> {order.buyer.email}
              </p>
            </div>

            <button className="w-full bg-gray-100 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-200">
              <MessageCircle size={16} />
              Chat với Người mua
            </button>
          </div>

          {/* ADDRESS */}
          <div className="bg-white p-6 rounded-xl shadow space-y-4">
            <h3 className="font-semibold">Địa chỉ nhận hàng</h3>

            <p className="flex items-start gap-2 text-sm text-gray-600">
              <MapPin size={16} className="mt-1 text-emerald-600" />
              <span>
                {order.address.detail},<br />
                {order.address.ward}, {order.address.district},<br />
                {order.address.city}
              </span>
            </p>

            <div className="bg-gray-100 rounded-lg p-3 text-sm text-gray-600">
              <p className="font-semibold mb-1">Ghi chú:</p>
              {order.note}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
