import React, { useEffect, useState } from "react";
import SellerOrderStepper from "../../components/Seller/SellerOrderStepper";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle,
  XCircle,
  Phone,
  Mail,
  MapPin,
  Info,
} from "lucide-react";

export default function OrderDetail() {
  const handleConfirm = () => {
    setOrder((prev) => ({
      ...prev,
      status: "preparing",
    }));
  };

  const handleCancel = () => {
    setOrder((prev) => ({
      ...prev,
      status: "confirmed",
    }));
  };
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  const statusMap = {
    Paid: {
      label: "Đã thanh toán",
      style: "bg-yellow-100 text-yellow-700",
    },
    Confirmed: {
      label: "Đã xác nhận",
      style: "bg-blue-100 text-blue-700",
    },
    Shipping: {
      label: "Đang giao",
      style: "bg-indigo-100 text-indigo-700",
    },
    Completed: {
      label: "Hoàn thành",
      style: "bg-emerald-100 text-emerald-700",
    },
    Cancelled: {
      label: "Đã huỷ",
      style: "bg-gray-200 text-gray-600",
    },
  };

  useEffect(() => {
    const fetchOrder = async () => {
      const res = await fetch(
        `https://bikestore-b7e3gudmenczf8bn.southeastasia-01.azurewebsites.net/api/seller/orders/paid`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        },
      );

      const data = await res.json();

      console.log("ORDER DETAIL:", data);

      setOrder(data.items[0]);
    };

    fetchOrder();
  }, [id]);
  if (!order) {
    return <div className="p-10 text-gray-500">Loading...</div>;
  }
  const total = order.totalAmount || 0;
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
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                statusMap[order.status]?.style || ""
              }`}
            >
              {statusMap[order.status]?.label}
            </span>
          </div>

          <p className="text-sm text-gray-500 mt-1">Đặt lúc: {order.date}</p>
        </div>

        <div className="flex gap-3">
          {order.status === "confirmed" && (
            <>
              <button
                onClick={handleCancel}
                className="border border-red-300 text-red-600 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-50"
              >
                <XCircle size={18} />
                Hủy đơn
              </button>

              <button
                onClick={handleConfirm}
                className="bg-emerald-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-emerald-600"
              >
                <CheckCircle size={18} />
                Xác nhận đơn hàng
              </button>
            </>
          )}
        </div>
      </div>
      <SellerOrderStepper status={order.status} />
      {/* ===== MAIN GRID ===== */}
      <div className="grid grid-cols-3 gap-6">
        {/* ===== LEFT ===== */}
        <div className="col-span-2 space-y-6">
          {/* PRODUCT */}
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="font-semibold mb-4">Sản phẩm</h3>

            <div className="flex gap-4 items-center">
              <img
                src={order.items?.[0]?.image}
                alt=""
                className="w-24 h-24 object-cover rounded-lg"
              />

              <div className="flex-1">
                <div className="flex justify-between">
                  <h4 className="font-semibold text-lg">
                    {order.items?.[0]?.bikeBrand}
                  </h4>
                  <p className="font-bold text-lg">
                    {order.totalAmount?.toLocaleString("vi-VN")}đ
                  </p>
                </div>

                <div className="flex gap-2 mt-2 items-center">
                  <span className="px-2 py-1 bg-gray-100 text-xs rounded">
                    {order.items?.[0]?.bikeCategory}
                  </span>

                  <span className="text-xs text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString("vi-VN")}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* PAYMENT */}
          <div className="bg-white rounded-xl shadow p-6 space-y-4">
            <h3 className="font-semibold">Thanh toán</h3>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Giá sản phẩm</span>
                <span>{order.totalAmount?.toLocaleString("vi-VN")} đ</span>
              </div>

              {/* <div className="flex justify-between text-red-500">
                <span>Phí dịch vụ sàn</span>
                <span>{order.serviceFee.toLocaleString()}đ</span>
              </div> */}
            </div>

            <div className="border-t pt-4 flex justify-between font-bold text-lg">
              <span className="text-emerald-600">Thực nhận</span>
              <span className="text-emerald-600">
                {total.toLocaleString("vi-VN")} đ
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
                src="https://i.pravatar.cc/100"
                className="w-12 h-12 rounded-full"
              />
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <p className="flex items-center gap-2">{order.receiverName}</p>
            </div>

            <div className="space-y-2 text-sm text-gray-600">
              <p className="flex items-center gap-2">
                <Phone size={16} /> {order.receiverPhone}
              </p>
            </div>
          </div>

          {/* ADDRESS */}
          <div className="bg-white p-6 rounded-xl shadow space-y-4">
            <h3 className="font-semibold">Địa chỉ nhận hàng</h3>

            <p className="flex items-start gap-2 text-sm text-gray-600">
              <MapPin size={16} className="mt-1 text-emerald-600" />
              <span>{order.receiverAddress}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
