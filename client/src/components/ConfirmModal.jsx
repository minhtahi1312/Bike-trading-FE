import React from "react";
import { X, AlertCircle, Loader2, CheckCircle2 } from "lucide-react";

const ConfirmModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  description, 
  confirmText = "Xác nhận", 
  cancelText = "Hủy bỏ",
  type = "danger", 
  isLoading = false,
  children 
}) => {
  if (!isOpen) return null;

  // Cấu hình màu sắc dựa trên type
  const styles = {
    danger: {
      icon: <AlertCircle size={24} />,
      iconBg: "bg-red-50",
      iconColor: "text-red-600",
      buttonBg: "bg-red-600 hover:bg-red-700 shadow-red-200",
    },
    success: {
      icon: <CheckCircle2 size={24} />,
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
      buttonBg: "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200",
    }
  }[type];

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => !isLoading && onClose()}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in duration-200">
        <div className="p-6">
          <div className={`flex items-center gap-3 ${styles.iconColor} mb-4`}>
            <div className={`p-2 ${styles.iconBg} rounded-full`}>
              {styles.icon}
            </div>
            <h3 className="text-xl font-black">{title}</h3>
          </div>

          {description && (
            <p className="text-sm text-gray-500 mb-4">{description}</p>
          )}
          {children}
        </div>

        <div className="flex items-center gap-3 p-4 bg-gray-50 border-t border-gray-100">
          <button
            disabled={isLoading}
            onClick={onClose}
            className="flex-1 px-4 py-2.5 text-sm font-bold text-gray-500 hover:text-gray-700 transition-colors"
          >
            {cancelText}
          </button>
          <button
            disabled={isLoading}
            onClick={onConfirm}
            className={`flex-[2] px-4 py-2.5 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 transition-all shadow-lg ${styles.buttonBg} ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            {isLoading ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              confirmText
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;