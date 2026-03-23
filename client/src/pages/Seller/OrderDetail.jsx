/* eslint-disable */
import React, { useEffect, useState } from "react";
import SellerOrderStepper from "../../components/Seller/SellerOrderStepper";
import { useParams, Link } from "react-router-dom";
import toast from "react-hot-toast";
import {
  getCategoryLabel,
  getFrameLabel,
  getBrakeLabel,
  getPaintLabel,
  getDrivetrainConditionLabel,
} from "../../utils/format";
import {
  ArrowLeft,
  Phone,
  MapPin,
  Info,
  Truck,
  CheckCircle,
} from "lucide-react";

export default function OrderDetail() {
  const { id } = useParams();
  const [actionLoading, setActionLoading] = useState(false);

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const API =
    "https://bikestore-b7e3gudmenczf8bn.southeastasia-01.azurewebsites.net";

  const token = localStorage.getItem("accessToken");

  const fetchOrder = async () => {
    try {
      const res = await fetch(`${API}/api/seller/orders/item/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      console.log("createdAt raw:", data.createdAt);
      if (!data) return;
      console.log("order data:", data);
      setOrder(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const confirmOrder = async () => {
    try {
      setActionLoading(true);

      const res = await fetch(`${API}/api/seller/orders/confirm`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          orderId: order.orderId,
        },
      });

      const data = await res.json();
      console.log("confirm response:", data);

      if (!res.ok) throw new Error();

      toast.success("Đã xác nhận đơn hàng");

      await fetchOrder();
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  const shippingOrder = async () => {
    try {
      setActionLoading(true);

      const res = await fetch(`${API}/api/seller/orders/shipping`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          orderId: order.orderId,
        },
      });

      if (!res.ok) throw new Error();

      toast.success("Đã giao cho vận chuyển");

      await fetchOrder();
    } catch {
      toast.error("Không thể cập nhật trạng thái");
    } finally {
      setActionLoading(false);
    }
  };

  const completeOrder = async () => {
    try {
      setActionLoading(true);

      const res = await fetch(`${API}/api/seller/orders/complete`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          orderId: order.orderId,
        },
      });

      if (!res.ok) throw new Error();

      toast.success("Đơn hàng đã hoàn tất");

      await fetchOrder();
    } catch {
      toast.error("Cập nhật thất bại");
    } finally {
      setActionLoading(false);
    }
  };

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
      label: "Hoàn tất",
      style: "bg-emerald-100 text-emerald-700",
    },
  };

  if (loading) {
    return <div className="p-10">Đang tải...</div>;
  }

  if (!order) {
    return <div className="p-10 text-red-500">Không tìm thấy đơn</div>;
  }

  return (
    <div className="space-y-6">
      {/* BREADCRUMB */}
      <div className="text-sm text-gray-500 flex items-center gap-2">
        <Link to="/seller/orders" className="flex items-center gap-1">
          <ArrowLeft size={16} />
          Quay lại danh sách
        </Link>

        <span>/</span>

        <span className="text-gray-700 font-medium">
          Chi tiết đơn hàng #{order.orderId}
        </span>
      </div>

      {/* HEADER */}
      <div className="flex justify-between flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold">Đơn hàng #{order.orderId}</h1>

            <span
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold ${
                statusMap[order.orderStatus]?.style
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-current"></span>
              {statusMap[order.orderStatus]?.label}
            </span>
          </div>

          <p className="text-sm text-gray-500 mt-1">
            Đặt lúc: {new Date(order.createdAt + "Z").toLocaleString("vi-VN")}
          </p>
        </div>

        {/* ACTION BUTTON */}
        <div className="flex gap-3">
          {order.orderStatus === "Paid" && (
            <button
              disabled={actionLoading}
              onClick={confirmOrder}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition disabled:opacity-50"
            >
              <CheckCircle size={16} />
              Xác nhận đơn
            </button>
          )}

          {order.orderStatus === "Confirmed" && (
            <button
              disabled={actionLoading}
              onClick={shippingOrder}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition disabled:opacity-50"
            >
              <Truck size={16} />
              Giao hàng
            </button>
          )}

          {order.orderStatus === "Shipping" && (
            <button
              disabled={actionLoading}
              onClick={completeOrder}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition disabled:opacity-50"
            >
              <CheckCircle size={16} />
              Hoàn tất
            </button>
          )}
        </div>
      </div>

      {/* STEPPER */}

      <SellerOrderStepper status={order.orderStatus} />

      {/* GRID */}
      <div className="grid grid-cols-3 gap-6">
        {/* LEFT */}
        <div className="col-span-2 space-y-6">
          {/* PRODUCT */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="font-semibold mb-4">Sản phẩm</h3>

            <div className="flex gap-5">
              <img
                src={order.images?.[0]}
                className="w-32 h-32 object-cover rounded-xl border"
              />

              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-lg">
                      {order.listingTitle} - Size {order.frameSize}
                    </h4>

                    <p className="text-sm text-gray-500 mt-1">
                      Màu sắc: {getPaintLabel(order.paint)} • Tình trạng:{" "}
                      {getDrivetrainConditionLabel(order.operating)}
                    </p>
                  </div>

                  <span className="font-bold text-xl text-emerald-600">
                    {order.totalAmount?.toLocaleString("vi-VN")} đ
                  </span>
                </div>

                {/* TAGS */}
                <div className="flex gap-2 mt-3 flex-wrap text-xs">
                  <span className="bg-gray-100 px-2 py-1 rounded">
                    {getCategoryLabel(order.bikeCategory)}
                  </span>

                  <span className="bg-gray-100 px-2 py-1 rounded">
                    {order.groupset}
                  </span>

                  <span className="bg-gray-100 px-2 py-1 rounded">
                    {getBrakeLabel(order.brakeType)}
                  </span>

                  <span className="bg-gray-100 px-2 py-1 rounded">
                    {getFrameLabel(order.frameMaterial)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* PAYMENT */}
          <div className="bg-white p-6 rounded-xl shadow space-y-4">
            <h3 className="font-semibold">Thanh toán</h3>

            <div className="flex justify-between text-sm">
              <span>Giá sản phẩm</span>
              <span>{order.unitPrice.toLocaleString("vi-VN")} đ</span>
            </div>

            <div className="border-t pt-4 flex justify-between font-bold text-lg">
              <span className="text-emerald-600">Tổng tiền</span>
              <span className="text-emerald-600">
                {order?.totalAmount?.toLocaleString("vi-VN")} đ
              </span>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex gap-3">
              <Info className="text-blue-600 mt-1" size={18} />

              <div className="text-sm text-blue-800">
                <p className="font-medium">Thanh toán qua ví BikeMarket</p>

                <p className="text-blue-700 mt-1">
                  Số tiền sẽ được giữ trong hệ thống cho đến khi đơn hàng hoàn
                  tất.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="space-y-6">
          {/* BUYER */}
          <div className="bg-white p-6 rounded-xl shadow space-y-4">
            <h3 className="font-semibold">Người mua</h3>

            <p className="text-sm">{order.receiverName}</p>

            <p className="flex items-center gap-2 text-sm text-gray-600">
              <Phone size={16} />
              {order.receiverPhone}
            </p>
          </div>

          {/* ADDRESS */}
          <div className="bg-white p-6 rounded-xl shadow space-y-4">
            <h3 className="font-semibold">Địa chỉ nhận hàng</h3>

            <p className="flex items-start gap-2 text-sm text-gray-600">
              <MapPin size={16} className="mt-1 text-emerald-600" />
              {order.receiverAddress}
            </p>
          </div>

          {/* LISTING */}
          <div className="bg-white p-6 rounded-xl shadow space-y-3">
            <h3 className="font-semibold">Lưu ý xử lý đơn hàng</h3>

            <p className="text-sm text-gray-600">
              Vui lòng chuẩn bị sản phẩm đúng như mô tả trong tin đăng và đóng
              gói cẩn thận trước khi giao cho đơn vị vận chuyển.
            </p>

            <p className="text-sm text-gray-600">
              Sau khi người mua xác nhận đã nhận hàng, số tiền sẽ được chuyển
              vào ví BikeMarket của bạn trong vòng 1–3 ngày làm việc.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
