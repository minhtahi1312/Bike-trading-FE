/* eslint-disable */
import React from "react";
import {
  ShoppingCart,
  ClipboardCheck,
  Package,
  Truck,
  CheckCircle,
} from "lucide-react";

export default function SellerOrderStepper({ status }) {
  const steps = [
    { key: "Ordered", label: "Đã đặt hàng", icon: <ShoppingCart size={15} /> },
    { key: "Paid", label: "Chờ xác nhận", icon: <ClipboardCheck size={15} /> },
    { key: "Confirmed", label: "Đang chuẩn bị", icon: <Package size={15} /> },
    { key: "Shipping", label: "Đang giao", icon: <Truck size={15} /> },
    { key: "Completed", label: "Hoàn tất", icon: <CheckCircle size={15} /> },
  ];

  const statusIndex = {
    Paid: 1,
    Confirmed: 2,
    Shipping: 3,
    Completed: 4,
  };

  const currentIndex = statusIndex[status] ?? 0;

  return (
    <div className="bg-gray-50 rounded-xl p-6 flex items-center justify-between relative">
      {steps.map((step, index) => {
        const active = index <= currentIndex;

        return (
          <div
            key={index}
            className="flex-1 flex flex-col items-center relative"
          >
            {/* LINE */}
            {index !== steps.length - 1 && (
              <div
                className={`absolute top-4 left-1/2 w-full h-[3px] ${
                  index < currentIndex ? "bg-emerald-500" : "bg-gray-200"
                }`}
              />
            )}

            {/* ICON */}
            <div
              className={`z-10 w-10 h-10 flex items-center justify-center rounded-full shadow
              ${
                active
                  ? "bg-emerald-500 text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {step.icon}
            </div>

            {/* LABEL */}
            <span
              className={`mt-2 text-xs font-semibold ${
                active ? "text-emerald-600" : "text-gray-400"
              }`}
            >
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
