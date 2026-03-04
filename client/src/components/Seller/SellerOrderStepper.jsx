/* eslint-disable */
import React from "react";
import {
  ShoppingCart,
  ClipboardCheck,
  Package,
  Truck,
  BadgeCheck,
} from "lucide-react";

const steps = [
  { key: "ordered", label: "Đã đặt hàng", icon: ShoppingCart },
  { key: "confirmed", label: "Chờ xác nhận", icon: ClipboardCheck },
  { key: "preparing", label: "Đang chuẩn bị", icon: Package },
  { key: "shipping", label: "Đang giao", icon: Truck },
  { key: "done", label: "Hoàn tất", icon: BadgeCheck },
];

export default function OrderStepper({ status }) {
  const currentStep = steps.findIndex((s) => s.key === status);

  return (
    <div className="bg-white border rounded-xl p-6">
      <div className="flex items-center justify-between relative">
        {/* LINE */}
        <div className="absolute top-5 left-0 w-full h-1 bg-gray-200" />

        <div
          className="absolute top-5 left-0 h-1 bg-emerald-500 transition-all"
          style={{
            width: `${(currentStep / (steps.length - 1)) * 100}%`,
          }}
        />

        {steps.map((step, index) => {
          const Icon = step.icon;

          const isActive = index === currentStep;
          const isDone = index < currentStep;

          return (
            <div
              key={step.key}
              className="flex flex-col items-center relative z-10"
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center
                ${
                  isDone || isActive
                    ? "bg-emerald-500 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                <Icon size={18} />
              </div>

              <p
                className={`text-xs mt-2 font-medium text-center
                ${isDone || isActive ? "text-emerald-600" : "text-gray-400"}`}
              >
                {step.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
